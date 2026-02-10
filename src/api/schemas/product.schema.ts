import { format } from "node:path";

export const productSchema = {
  type: 'object',
  required: ['id', 'title', 'price', 'category', 'description'], // assuming image and rating can be optional
  properties: {
    id: { type: 'number' },
    title: { type: 'string', minLength: 1 },
    price: { type: 'number', exclusiveMinimum: 0 },
    category: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    image: { type: 'string', format: 'uri' },
    rating: {
      type: 'object',
      properties: {
        rate: { type: 'number' },
        count: { type: 'number' },
      },
    },
  },
} as const
