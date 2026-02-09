import dotenv from 'dotenv'

dotenv.config({ override: true })

export const environment = {
  sauceBaseUrl: process.env.SAUCE_BASE_URL || '',
  fakeStoreBaseUrl: process.env.FAKESTORE_BASE_URL || '',
}