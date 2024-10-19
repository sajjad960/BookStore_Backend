// userAndAuthorIntegration.test.ts
import { authorsTests } from './author/Author.test'
import { authTests } from './user/Auth.test'

describe('BookStore Integration Tests', () => {
  authTests()
  authorsTests()
})
