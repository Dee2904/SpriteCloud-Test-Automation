import { APIRequestContext, APIResponse, request } from '@playwright/test'
import { environment } from '../config/environment'
import { API_ENDPOINTS } from './data/apiEndpoints'
// import { apiUsers } from './data/apiUsers'

export class ApiClient {
  private context!: APIRequestContext
  private token: string | null = null

  private async authenticate(): Promise<void> {
    // Performs login to get token and validates successful authentication
    const response = await this.login({ 
      username: <string>process.env.FAKESTORE_USERNAME, 
      password: <string>process.env.FAKESTORE_PASSWORD 
    })

    if (!response.ok()) {
      throw new Error(`Authentication failed: ${response.status()}`)
    }

    const body = await response.json()
    this.token = body.token
    console.log('Authentication successful, token acquired')
  }

async init(auth = false): Promise<void> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

    // Create context without baseURL - it comes from playwright.config
    this.context = await request.newContext({
      extraHTTPHeaders: headers,
    })

    if (auth) {
      await this.authenticate()
      
      await this.context.dispose()
      this.context = await request.newContext({
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
      })
    }
  }

  async dispose(): Promise<void> {
    await this.context.dispose()
  }

  // AUTH
  async login(payload: { username: string; password: string }): Promise<APIResponse> {
    return this.context.post(API_ENDPOINTS.LOGIN, { data: payload })
  }

  // PRODUCTS
  async getProduct(productId: number): Promise<APIResponse> {
    return this.context.get(`${API_ENDPOINTS.PRODUCTS}/${productId}`)
  }

  async getAllProducts(): Promise<APIResponse> {
    return this.context.get(API_ENDPOINTS.PRODUCTS)
  }

  // CARTS
  async createCart(payload: {
    userId: number
    products: { id: number }[]
  }): Promise<APIResponse> {
    return this.context.post(API_ENDPOINTS.CARTS, { data: payload })
  }

  // USERS
  async getAllUsers(): Promise<APIResponse> {
    return this.context.get(API_ENDPOINTS.USERS)
  }

  async createUser(payload: {
    name: string;
    email: string;
    password: string;
  }): Promise<APIResponse> {
    return this.context.post(API_ENDPOINTS.USERS, { data: payload })
  }

  async deleteUser(userId: number): Promise<APIResponse> {
    return this.context.delete(`${API_ENDPOINTS.USERS}/${userId}`)
  }

  async getUser(userId: number): Promise<APIResponse> {
    return this.context.get(`${API_ENDPOINTS.USERS}/${userId}`)
  }
}