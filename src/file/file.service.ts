import dotenv from 'dotenv'
import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'
import { FileUpload } from 'graphql-upload'
import { ApolloError, ExpressContext } from 'apollo-server-express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FileEntity } from './file.entity'

dotenv.config()
const { S3_ACCESS_KEY, S3_SECRET_KEY, S3_END_POINT, S3_BUCKET } = process.env

@Injectable()
export class FileService {
  private readonly S3Stream: S3

  constructor(@InjectRepository(FileEntity) private fileRepository: Repository<FileEntity>) {
    this.S3Stream = new S3({
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_KEY,
      endpoint: S3_END_POINT,
      s3ForcePathStyle: true,
      signatureVersion: 'v4'
    })
  }

  async upload(userId: string, file: FileUpload) {
    console.log(file, userId)
    const promise = await this.S3Stream.upload({
      Bucket: S3_BUCKET,
      Key: `${userId}:${file.filename}`,
      Body: file
    }).promise()

    const repositoryFile = await this.fileRepository.findOne({ mainUserId: userId, filename: file.filename })

    if (repositoryFile) {
      throw new ApolloError(`File with name ${file.filename} already exists!`)
    }

    await this.fileRepository.create({
      filename: file.filename,
      mimetype: file.mimetype,
      encoding: file.encoding,
      Bucket: promise.Bucket,
      ETag: promise.ETag,
      Key: promise.Key,
      Location: promise.Location,
      mainUserId: userId
    })

    return `File ${file.filename} successfully uploaded!`
  }

  async addAccess(fileId: string, accessIDs: string[]) {
    const file = await this.fileRepository.findOne(fileId)
    const newIDs = file.userIDs.concat(accessIDs)
    await this.fileRepository.update(fileId, { userIDs: newIDs })

    return `Access for file ${file.filename} successfully updated!`
  }

  async download(context: ExpressContext, userId: string, filename: string, Bucket?: string) {
    const file = await this.S3Stream.getObject({ Bucket: Bucket || S3_BUCKET, Key: `${userId}:${filename}` }).promise()

    return context.res.send(file)
  }

  async delete(userId: string, filename: string, Bucket?: string) {
    await this.S3Stream.deleteObject({ Bucket: Bucket || S3_BUCKET, Key: `${userId}:${filename}` }).promise()

    return `File ${filename} successfully deleted!`
  }

  async list(userId: string) {
    const files = await this.fileRepository.find({ mainUserId: userId })
    return files
  }

  async file(fileId: string) {
    const file = await this.fileRepository.findOne(fileId)
    return file
  }
}
