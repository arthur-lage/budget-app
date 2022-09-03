import { v4 as uuid } from 'uuid'

export class VerifyEmailToken {
  public readonly id: string
  public token: string
  public userId: string
  public expiresIn: number

  constructor(token: string, userId: string, expiresIn: number = 600000) {
    this.id = uuid()
    this.token = token
    this.userId = userId
    this.expiresIn = expiresIn
  }
}