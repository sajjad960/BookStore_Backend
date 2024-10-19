// userAndAuthorIntegration.test.ts
import { authorsTests } from './author/AuthorTests'
import { authTests } from './user/AuthTests'

describe('BookStore Integration Tests', () => {
  authTests()
  authorsTests()
})
