import { Resolver, Args, Mutation, Context, Query } from '@nestjs/graphql'
import { ExpressContext } from 'apollo-server-express'
import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { FileService } from './file.service'
import { FileEntity } from './file.entity'

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => String)
  async upload(
    @Args({ name: 'userId', type: () => String }) userId: string,
    @Args({ name: 'file', type: () => GraphQLUpload, nullable: true }) file: FileUpload
  ) {
    return await this.fileService.upload(userId || Math.random().toString(), file)
  }

  @Mutation(() => String)
  async addAccess(
    @Args({ name: 'fileId', type: () => String }) fileId: string,
    @Args({ name: 'accessIDs', type: () => [String] }) accessIDs: string[]
  ) {
    return await this.fileService.addAccess(fileId, accessIDs)
  }

  @Query(() => GraphQLUpload)
  async download(
    @Context() context: ExpressContext,
    @Args({ name: 'userId', type: () => String }) userId: string,
    @Args({ name: 'filename', type: () => String }) filename: string,
    @Args({ name: 'Bucket', type: () => String, nullable: true }) Bucket?: string
  ) {
    return await this.fileService.download(context, userId, filename, Bucket)
  }

  @Mutation(() => String)
  async delete(
    @Args({ name: 'userId', type: () => String }) userId: string,
    @Args({ name: 'filename', type: () => String }) filename: string,
    @Args({ name: 'Bucket', type: () => String, nullable: true }) Bucket?: string
  ) {
    return await this.fileService.delete(userId, filename, Bucket)
  }

  @Query(() => [FileEntity])
  async list(@Args({ name: 'userId', type: () => String }) userId: string) {
    return await this.fileService.list(userId)
  }

  @Query(() => FileEntity)
  async file(@Args({ name: 'fileId', type: () => String }) fileId: string) {
    return await this.fileService.file(fileId)
  }
}
