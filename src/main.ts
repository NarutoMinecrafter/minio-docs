import 'reflect-metadata'
import dotenv from 'dotenv'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { graphqlUploadExpress } from 'graphql-upload'

dotenv.config()
const { PORT = 5000 } = process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(graphqlUploadExpress())
  await app.listen(PORT, () => console.log(`🚀 Server has been started on port: ${PORT}...`))
}
bootstrap()
