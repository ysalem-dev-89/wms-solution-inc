import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUserQuery, getUserQuery } from '../queries/UserQuery'
import authSchema from '../validation/userValidation'
import { TokenGen } from '../helpers/AuthHelper'
import { Validator } from '../validation/validator'

// export const createUser = () => {createUserQuery}

export const login = (req: Request, res: Response) => {
  const tokenGen = new TokenGen({
    id: -1,
    username: 'default',
    email: 'default'
  })

  const { password, username } = req.body

  const validator = new Validator(authSchema, req.body)

  validator
    .isValid()
    .then(valid => {
      if (valid) return getUserQuery(username)
      throw new Error('Invalid credentials')
    })
    .then(user => {
      if (user) {
        tokenGen.payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
        return bcrypt.compare(password, user.password)
      }
      throw new Error('Invalid credentials')
    })
    .then(same => {
      if (same) {
        return tokenGen.create()
      }
      throw new Error('Invalid credentials')
    })
    .then(token => {
      res
        .status(200)
        .cookie('token', token)
        .json({
          statusCode: 200,
          message: 'success',
          user: {
            id: tokenGen.payload.id,
            username: tokenGen.payload.username,
            email: tokenGen.payload.email,
            createdAt: tokenGen.payload.createdAt,
            updatedAt: tokenGen.payload.updatedAt
          }
        })
    })
    .catch(error => {
      res.json({
        statusCode: 400,
        error: error.message
      })
    })
}
