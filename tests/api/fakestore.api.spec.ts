import { test, expect } from '@playwright/test'
import { ApiClient } from '../../src/api/apiClient'
import { productSchema } from '../../src/api/schemas/product.schema'
import { validateSchema } from '../../src/api/utils/schemaValidator'
import { ApiHelpers } from '../../src/api/utils/helpers'

test.describe('Fake Store API', () => {
  let api: ApiClient

  test.beforeEach(async () => {
    api = new ApiClient()
    await api.init(true)
  })

  test.afterEach(async () => {
    await api.dispose()
  })

  test('Successful login returns token', async () => {
    const randomValidUser = await ApiHelpers.getRandomUserCredentials(api)
    const response = await api.login(randomValidUser)
    expect(response.status()).toBe(201)

    const body = await response.json()
    expect(body.token).toBeTruthy()
  })

  test('Get product and validate response', async () => {
    const productId = await ApiHelpers.getRandomProductId(api)
    const response = await api.getProduct(productId)
    const body = await response.json()

    expect(body.id).toBe(productId)

    validateSchema(productSchema, body)
  })

  test('Create cart with existing product', async () => {
    const firstProductId = await ApiHelpers.getRandomProductId(api)
    const secondProductId = await ApiHelpers.getRandomProductId(api)
    const payload = {
      userId: 1,
      products: [{ id: firstProductId }, {id: secondProductId}],
    }

    const response = await api.createCart(payload)

    expect(response.status()).toBe(201)

    const body = await response.json()
    expect(body.products.length).toBe(2)
    expect(body.products[0].id).toBe(firstProductId)
    expect(body.products[1].id).toBe(secondProductId)
  })

  test('Delete a user', async () => {
    const userDetails = ApiHelpers.generateRandomUserData()
    const newUserResponse = await api.createUser(userDetails)
    expect(newUserResponse.status()).toBe(201)

    const newUser = await newUserResponse.json()
    const userId = newUser.id
    
    const response = await api.deleteUser(userId)
    expect(response.status()).toBe(200)
  })

  test('Invalid login fails', async () => {
    const userDetails = ApiHelpers.generateRandomUserData()
    const response = await api.login({ username: userDetails.name, password: userDetails.password })
    expect(response.status()).toBe(401)
  })

  test('Get non-existing product returns error', async () => {
    const response = await api.getProduct(9999)
    
    const text = await response.text()
    
    expect(response.status()).toBe(200)
    expect(text).toBeFalsy()
  })
})