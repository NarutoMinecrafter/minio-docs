import dotenv from 'dotenv'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FileResolver } from './file/file.resolver'
import { FileService } from './file/file.service'
import { FileEntity } from './file/file.entity'

dotenv.config()
const { DB_TYPE, DB_URL, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env
const apolloDriverConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: true
}
const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: DB_TYPE as any,
  url: DB_URL,
  host: !Boolean(DB_URL) && DB_HOST,
  port: !Boolean(DB_URL) && Number(DB_PORT),
  username: !Boolean(DB_URL) && DB_USERNAME,
  password: !Boolean(DB_URL) && DB_PASSWORD,
  database: DB_NAME,
  entities: [FileEntity],
  synchronize: true
}

@Module({
  imports: [GraphQLModule.forRoot(apolloDriverConfig), TypeOrmModule.forRoot(typeOrmModuleOptions)],
  controllers: [AppController],
  providers: [AppService, FileResolver, FileService]
})
export class AppModule {}
