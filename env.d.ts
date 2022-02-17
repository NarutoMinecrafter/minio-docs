/* eslint-disable @typescript-eslint/no-empty-interface */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export interface Env {
  PORT?: string
  MODE?: 'dev' | 'prod'

  // S3
  S3_ACCESS_KEY: string
  S3_SECRET_KEY: string
  S3_ENDPOINT?: string
  S3_REGION: string
  S3_BUCKET: string

  // DB
  DB_TYPE: TypeOrmModuleOptions['type']
  DB_URL?: string
  DB_HOST?: string
  DB_PORT?: string
  DB_USERNAME?: string
  DB_PASSWORD?: string
  DB_NAME: string
}

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
