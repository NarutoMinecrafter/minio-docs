import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  filename!: string

  @Column()
  mimetype!: string

  @Column()
  encoding!: string

  @Column()
  Bucket!: string

  @Column()
  ETag!: string

  @Column()
  Key!: string

  @Column()
  Location!: string

  @Column()
  mainUserId!: string

  @Column('text', { array: true, default: [], nullable: false })
  userIDs!: string[]
}
