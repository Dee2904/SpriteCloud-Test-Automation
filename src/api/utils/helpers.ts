//Used AI to help design reusable API helper utilities that fetch live data instead of relying on hardcoded IDs
import { ApiClient } from '../apiClient'
import { faker } from '@faker-js/faker'

export class ApiHelpers {
  static async getRandomProductId(api: ApiClient): Promise<number> {
    const response = await api.getAllProducts()

    if (!response.ok()) {
      throw new Error(`Failed to fetch products: ${response.status()}`)
    }

    const products = await response.json()

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('No products returned from API')
    }

    const randomIndex = Math.floor(Math.random() * products.length)
    return products[randomIndex].id
  }

  static async getRandomUserId(api: ApiClient): Promise<number> {
    const response = await api.getAllUsers()

    if (!response.ok()) {
      throw new Error(`Failed to fetch users: ${response.status()}`)
    }

    const users = await response.json()

    if (!Array.isArray(users) || users.length === 0) {
      throw new Error('No users returned from API')
    }

    const randomIndex = Math.floor(Math.random() * users.length)
    return users[randomIndex].id
  }

  static generateRandomUserData(): {
    name: string
    email: string
    password: string
  } {
    return {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  }

  static async getRandomUserCredentials(
  api: ApiClient
): Promise<{ username: string; password: string }> {
  const response = await api.getAllUsers()

  if (!response.ok()) {
    throw new Error(`Failed to fetch users: ${response.status()}`)
  }

  const users = await response.json()

  if (!Array.isArray(users) || users.length === 0) {
    throw new Error('No users returned from API')
  }

  const randomUser = users[Math.floor(Math.random() * users.length)]

  return {
    username: randomUser.username,
    password: randomUser.password,
  }
}

}
