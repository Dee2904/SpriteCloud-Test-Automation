import Ajv from 'ajv'
import addFormats from 'ajv-formats'

 //Used AI to accelerate setup of Ajv with formats support and error reporting
 
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

export function validateSchema(schema: object, data: unknown): void {
  const validate = ajv.compile(schema)
  const valid = validate(data)

  if (!valid) {
    throw new Error(
      `Schema validation failed:\n${ajv.errorsText(validate.errors)}`
    )
  }
}
