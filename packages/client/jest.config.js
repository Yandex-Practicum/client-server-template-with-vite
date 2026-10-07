import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __EXTERNAL_SERVER_URL__: process.env.EXTERNAL_SERVER_URL,
    __INTERNAL_SERVER_URL__: process.env.INTERNAL_SERVER_URL,
  },
}
