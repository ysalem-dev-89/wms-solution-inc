import { AnySchema } from 'yup/lib/schema'

export class Validator {
  private schema: AnySchema
  private data: unknown
  constructor(schema: AnySchema, data: unknown) {
    this.schema = schema
    this.data = data
  }

  isValid() {
    return new Promise((resolve, reject) => {
      this.schema
        .validate(this.data)
        .then(result => {
          resolve(true)
        })
        .catch(error => {
          console.error('error', error)
          reject(false)
        })
    })
  }
}
