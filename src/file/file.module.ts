import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileResolver } from './file.resolver'
import { FileService } from './file.service'
import { FileEntity } from './file.entity'

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileResolver, FileService]
})
export class FileModule {}
