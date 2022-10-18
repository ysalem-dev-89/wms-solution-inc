import instance from './axios'

const signInApi = (data: { username: string; password: string }) =>
  instance
    .post('/signin', data)
    .then(result => {
      console.log('result', result.data)
    })
    .catch(error => {
      console.log('error')
    })

export default signInApi
