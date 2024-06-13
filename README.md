# Bookstore Application

**Note: Not all features/Functionality are implemented. Application development is ongoing.**

This project is a Bookstore application following Hexagonal Architecture (Ports and Adapters) with TypeScript. The application uses MongoDB for managing books and MySQL for managing authors and users.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
  - [Hexagonal Architecture](#hexagonal-architecture)
  - [SOLID Principles](#solid-principles)
- [Technologies Used](#technologies-used)
<!-- - [Directory Structure](#directory-structure) -->
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Example Code Snippets](#example-code-snippets)
  - [Mongoose Repository for Books](#mongoose-repository-for-books)
  - [Sequelize Repository for Users](#sequelize-repository-for-users)
- [Conclusion](#conclusion)

## Overview

This application follows the Hexagonal Architecture to ensure a clean separation of concerns, making it easier to maintain and test. The core business logic is decoupled from external systems like databases, making it flexible to change the underlying technology without affecting the core logic.

## Architecture

### Hexagonal Architecture

Hexagonal Architecture, or Ports and Adapters, ensures that the core business logic is isolated from external dependencies. The architecture consists of the following parts:

- **Core**: Contains the business logic and domain entities.
  - **Entities**: Represents core business objects (e.g., `Book`, `User`, `Author`).
  - **Use Cases**: Orchestrates the interaction between domain entities and repositories.
  - **Ports**: Interfaces that define the operations required by the use cases.
- **Adapters**: Implements the ports to interact with external systems.
  - **Primary Adapters**: Handles input into the application (e.g., HTTP controllers).
  - **Secondary Adapters**: Handles output from the application (e.g., database repositories).

### SOLID Principles

This application also adheres to the SOLID principles, which are fundamental to building maintainable and scalable software:

1. **Single Responsibility Principle (SRP)**

   - Each module/class has one, and only one, reason to change. For example, the `BookRepository` class is responsible solely for database interactions related to books.

2. **Open/Closed Principle (OCP)**

   - Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. This is achieved by defining interfaces (ports) that allow new implementations (adapters) without changing the existing code.

3. **Liskov Substitution Principle (LSP)**

   - Objects of a superclass should be replaceable with objects of a subclass without affecting the functionality. By relying on interfaces, we can swap out implementations without affecting the system.

4. **Interface Segregation Principle (ISP)**

   - Clients should not be forced to depend on interfaces they do not use. Ports define narrow, specific interfaces that are implemented by adapters, ensuring clients only depend on relevant methods.

5. **Dependency Inversion Principle (DIP)**
   - High-level modules should not depend on low-level modules but on abstractions. This principle is naturally followed by the ports and adapters pattern, where the core business logic depends on interfaces rather than concrete implementations.

## Technologies Used

- **Node.js** with **Express.js**: For building the server and handling HTTP requests.
- **TypeScript**: For static typing.
- **Mongoose**: For MongoDB interactions.
- **Sequelize**: For MySQL interactions.
- **Jest**: For testing.

## Installation
