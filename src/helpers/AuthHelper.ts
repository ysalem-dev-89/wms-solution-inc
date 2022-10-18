import config from '../config/environment'
import { User } from '../interfaces/UserInterface'
import jwt from 'jsonwebtoken'

export class TokenGen {
  payload: User
  constructor(payload: User) {
    this.payload = payload
  }

  create() {
    return new Promise((resolve, reject) => {
      jwt.sign(
        this.payload,
        config.secretKey as string,
        { algorithm: 'HS256', expiresIn: '8h' },
        (error, token) => {
          return error ? reject(error) : resolve(token)
        }
      )
    })
  }

  verify(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        config.secretKey as string,
        { algorithms: ['HS256'] },
        (error, decoded) => {
          return error ? reject(error) : resolve(decoded)
        }
      )
    })
  }
}
