import { User } from '../models/UserModel'

export const getUserQuery = (username: string) =>
  User.findOne({ where: { username } })
    .then(result => {
      if (result) {
        return result.toJSON()
      }
    })
    .catch(error => {
      console.log('Error', error)
    })

export const createUserQuery = () => {
  User.create()
}
