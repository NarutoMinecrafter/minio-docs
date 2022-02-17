import { Field, ObjectType } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class FileEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string

  @Field()
  @Column()
  filename!: string

  @Field()
  @Column()
  mimetype!: string

  @Field()
  @Column()
  encoding!: string

  @Field()
  @Column()
  Bucket!: string

  @Field()
  @Column()
  ETag!: string

  @Field()
  @Column()
  Key!: string

  @Field()
  @Column()
  Location!: string

  @Field()
  @Column()
  mainUserId!: string

  @Field()
  @Column({ default: '[]' })
  userIds!: string // TODO: Update to array
}
