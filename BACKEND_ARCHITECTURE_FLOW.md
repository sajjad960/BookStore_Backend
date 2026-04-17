# BookStore Backend Architecture and Flow (Easy Guide)

This document explains how this backend works end-to-end in simple terms.

## 1) What architecture is used?

This project follows **Hexagonal Architecture (Ports and Adapters)**.

Core idea:
- `core` contains business logic.
- `adapters/primary` handles incoming requests (HTTP).
- `adapters/secondary` handles outgoing operations (DB, storage).
- `ports` are interfaces between core and implementations.

## 2) High-level flow

```text
Client Request
  -> Express Route (primary adapter)
  -> Middleware (auth/validation/upload)
  -> Controller
  -> Use Case (core)
  -> Port Interface (core contract)
  -> Repository Implementation (secondary adapter)
  -> Database / External Service
  -> Response -> Client
```

## 3) Layer-by-layer responsibilities

### Entry and app boot
- `src/server.ts`
  - Starts app.
  - Connects MongoDB + MySQL.
  - Syncs Sequelize models.
  - Creates default admin user if missing.
- `src/app.ts`
  - Registers routes:
    - `/api/v1/users`
    - `/api/v1/books`
    - `/api/v1/authors`
  - Adds global 404 handler.
  - Adds global error handler.

### Primary adapters (HTTP side)
- Routes: `src/adapters/primary/http/routes/*`
- Controllers: `src/adapters/primary/http/controllers/*`
- Middleware:
  - `auth.ts` -> JWT verify + role restriction
  - `validateRequest.ts` -> express-validator result check
  - `upload.ts` -> uploads `audio` and `poster` to S3
- Validators:
  - `userValidators.ts`
  - `bookValidators.ts`

### Core
- Domain entities: `src/core/domain/entities/*`
- Use cases: `src/core/use-cases/*`
- Port interfaces (contracts): `src/core/ports/*`

### Secondary adapters (infrastructure side)
- MongoDB (Mongoose) for books:
  - `src/adapters/secondary/db/mongoose/*`
- MySQL (Sequelize) for users/authors:
  - `src/adapters/secondary/db/sequlizer/*`

## 4) Database strategy

- **Books** are stored in **MongoDB**.
- **Users + Authors** are stored in **MySQL**.
- In `BookRepository.getAllBooks()`, book `authorIds` are used to fetch full author data from MySQL and attach it to each book response.

So this backend is a **hybrid DB architecture**.

## 5) Real request flows

### A) User register (`POST /api/v1/users/register`)

```text
Route -> userValidationRules -> validateRequest
-> AuthController.register
-> RegisterUser use case
-> CreateUser use case
-> UserRepository.createUser (Sequelize/MySQL)
-> JWT token creation
-> sanitize user fields
-> response { user, token }
```

### B) User login (`POST /api/v1/users/login`)

```text
Route -> login validators -> validateRequest
-> AuthController.login
-> LoginUser use case
-> VerifyUser (find by email)
-> comparePassword (bcrypt)
-> create JWT
-> sanitize user
-> response { user, token }
```

### C) Create author (`POST /api/v1/authors`)

```text
Route -> protect -> restrictTo(admin)
-> AuthorController.createAuthor
-> CreateAuthor use case
-> AuthorRepository.createAuthor (MySQL)
-> response { author }
```

### D) Create book (`POST /api/v1/books`)

```text
Route -> protect -> restrictTo(admin)
-> upload middleware (S3 audio/poster)
-> book validators -> validateRequest
-> BookController.createBook
-> CreateBook use case
-> checks author existence via AuthorRepository (MySQL)
-> BookRepository.createBook (MongoDB)
-> response { book }
```

### E) Get books (`GET /api/v1/books`)

```text
Route -> query validators -> validateRequest
-> BookController.getAllBooks
-> GetAllBooks use case
-> APIfeaturesMongoose (filter/sort/fields/paginate)
-> BookRepository.getAllBooks (MongoDB)
-> fetch author details from MySQL
-> merge data
-> response { books, totalBooks }
```

## 6) Auth and authorization rules

- `protect` middleware:
  - Reads `Authorization: Bearer <token>`.
  - Verifies JWT.
  - Loads current user from DB.
- `restrictTo(...)` middleware:
  - Allows route only for required roles.

Current route behavior:
- Public:
  - `POST /api/v1/users/register`
  - `POST /api/v1/users/login`
  - `GET /api/v1/books`
- Admin only:
  - `POST /api/v1/users`
  - `GET /api/v1/users`
  - `POST /api/v1/authors`
  - `GET /api/v1/authors`
  - `POST /api/v1/books`

## 7) Error handling flow

- Use `AppError` for operational errors.
- Global handler: `ErrorController.ts`.
- Handles:
  - Standard operational errors.
  - Mongoose duplicate key errors.
  - Sequelize unique constraint errors.
- In production/test mode, returns safe messages.

## 8) Startup flow

When app starts (`src/server.ts`):
1. Connect MongoDB
2. Connect MySQL/SQLite
3. Sync Sequelize models
4. Create admin user from env config (if not exists)
5. Start Express server

## 9) Testing flow

- `jest.config.ts` uses `src/testSetup.ts`.
- During tests:
  - MongoDB memory server is used.
  - SQLite in-memory is used for Sequelize.
- Integration tests run from `src/tests/integration`.

## 10) Quick folder map

```text
src/
  app.ts, server.ts
  config/
  core/
    domain/entities/
    ports/
    use-cases/
  adapters/
    primary/http/
      routes/
      controllers/
      middleware/
      validators/
    secondary/db/
      mongoose/
      sequlizer/
  utils/
  tests/
```

## 11) Hexagonal Architecture + DDD Benefits

These are the practical benefits of using Port-and-Adapter (Clean Architecture style) with Domain-Driven Design:

1. **Database switching and DB updates become easier**
   - Because core logic depends on ports (interfaces), you can change DB technology or update DB implementation mostly in adapters/repositories, with minimal core change.

2. **Separated actions for each model**
   - Each model (`User`, `Author`, `Book`) has dedicated use cases and repository actions, so responsibilities stay clean and focused.

3. **Easy to view all actions for any model**
   - If you need to inspect all operations for one model, you can quickly check:
     - use-cases for business actions
     - port for contract
     - repository for DB behavior

4. **Isolated testing for unit and integration**
   - Core logic can be tested independently.
   - Integration tests can target adapters and real DB behavior separately.
   - This reduces test coupling and makes failures easier to debug.

5. **Better parallel work for team members**
   - One teammate can define ports/use-cases.
   - Another can implement DB adapters/repositories.
   - Since ports are clear contracts, multiple members can work in parallel with fewer conflicts.

6. **Infrastructure decisions can be delayed**
   - You can start by developing core/domain logic first.
   - Framework/DB decisions can be finalized later, after learning from core requirements.
   - This usually leads to better long-term infrastructure choices.
