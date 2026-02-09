import dotenv from 'dotenv'

dotenv.config({ override: true })

console.log('=== ENVIRONMENT DEBUG ===')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('CI:', process.env.CI)
console.log('FAKESTORE_BASE_URL from process.env:', process.env.FAKESTORE_BASE_URL)
console.log('SAUCE_BASE_URL from process.env:', process.env.SAUCE_BASE_URL)
console.log('=== END DEBUG ===')

export const environment = {
  sauceBaseUrl: process.env.SAUCE_BASE_URL || '',
  fakeStoreBaseUrl: process.env.FAKESTORE_BASE_URL || '',
}

console.log('Exported environment.fakeStoreBaseUrl:', environment.fakeStoreBaseUrl)