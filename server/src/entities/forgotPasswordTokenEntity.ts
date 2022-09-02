import { v4 as uuid } from 'uuid'

export class ForgotPasswordToken {
  public readonly id: string
  public token: string
  public userId: string

  constructor(token: string, userId: string) {
    this.id = uuid()
    this.token = token
    this.userId = userId
  }
}