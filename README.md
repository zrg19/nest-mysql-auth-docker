<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS MySQL Authentication & Authorization With Docker Containerized

## Overview

This project is built using the NestJS framework and connects with MySQL for data persistence. It incorporates essential features like authentication and authorization using JWT and passport, CRUD operations for tasks, and Docker configuration for easy deployment.

## Features

- **Authentication & Authorization**: Secured using JWT (JSON Web Tokens) and the passport package.
- **Tasks Module**: Implements full CRUD (Create, Read, Update, Delete) operations for task management.
- **User & Authentication Module**: Manages user data and handles authentication processes.
- **Docker Integration**: Provides a Docker configuration to ensure the application runs consistently across various environments.

## Getting Started

### Prerequisites

- Node.js
- Docker
- MySQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zrg19/nest-mysql-auth-docker.git
   cd nest-mysql-auth-docker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure MySQL:**
   - Ensure MySQL is running and create a database.
   - Update the database connection settings in `config/default.yml` or `config/development.yml` file.

4. **Run the application:**
   ```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
   ```
5. **Test the application:**
   ```bash
    # unit tests
    $ npm run test

    # e2e tests
    $ npm run test:e2e

    # test coverage
    $ npm run test:cov
   ```
### Docker Setup with Dockerfile

1. **Build Docker image:**
   ```bash
   docker build -t nest-mysql-auth-docker .
   ```

2. **Run Docker container:**
   ```bash
   docker run -p 3000:3000 nest-mysql-auth-docker
   ```

### Docker Setup with Docker Compose
1. **Docker Compose UP:**
   ```bash
   docker-compose up --build
   ```
2. **Docker Compose Down:**
   ```bash
   docker-compose down
   ```
### API Endpoints

- **User Registration:**
  - `POST /auth/register`
- **User Login:**
  - `POST /auth/login`
- **Create Task:**
  - `POST /tasks`
- **Get Tasks:**
  - `GET /tasks?status=OPEN&search=Title`
- **Update Task:**
  - `PUT /tasks/:id`
- **Delete Task:**
  - `DELETE /tasks/:id`

## Contributing

Feel free to fork the repository and submit pull requests. All contributions are welcome!

## License

[Nest](https://github.com/nestjs/nest) framework is [MIT licensed](LICENSE).

---
