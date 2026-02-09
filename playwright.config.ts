import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') })

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'ui',
      testDir: 'tests/ui',
      use: {
        baseURL: 'https://www.saucedemo.com/',
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'api',
      testDir: 'tests/api',
      use: {
        baseURL: 'https://fakestoreapi.com/',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      },
    },
  ],
})