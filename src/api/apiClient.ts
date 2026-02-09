import { APIRequestContext, APIResponse, request } from '@playwright/test'
import { environment } from '../config/environment'
import { API_ENDPOINTS } from './data/apiEndpoints'

export class ApiClient {
  private context!: APIRequestContext

  async init(): Promise<void> {
    console.log('FAKESTORE_BASE_URL:', environment.fakeStoreBaseUrl)//debug log to verify the base URL being used
    this.context = await request.newContext({
      baseURL: environment.fakeStoreBaseUrl,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
         'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
      },
    })
  }

  async dispose(): Promise<void> {
    await this.context.dispose()
  }

  //AUTH
  async login(payload: { username: string; password: string }): Promise<APIResponse> {
    return this.context.post(API_ENDPOINTS.LOGIN, { data: payload })
  }

  //PRODUCTS
  async getProduct(productId: number): Promise<APIResponse> {
    return this.context.get(`${API_ENDPOINTS.PRODUCTS}/${productId}`)
  }

  async getAllProducts(): Promise<APIResponse> {
    return this.context.get(API_ENDPOINTS.PRODUCTS)
  }

  //CARTS
  async createCart(payload: {
    userId: number
    products: { id: number }[]
  }): Promise<APIResponse> {
    return this.context.post(API_ENDPOINTS.CARTS, { data: payload })
  }

  //USERS
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
