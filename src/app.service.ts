import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return '<a href="/graphql">GraphQL API</a>'
  }
}
