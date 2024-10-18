import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // For Node.js testing
  verbose: true, // Show detailed test information
  setupFilesAfterEnv: ['<rootDir>/src/testSetup.ts'], // Global setup file for tests
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // File types to process
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        isolatedModules: true, // Moved ts-jest config here (faster compilation)
      },
    ],
  },
  testMatch: ['<rootDir>/src/tests/**/*.test.ts'], // Match test files in the tests folder
  testPathIgnorePatterns: ['/node_modules/'], // Ignore node_modules folder
}

export default config
