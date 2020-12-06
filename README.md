<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

Definxi project.

## ENV variables
In the root of the project there is an
.env.example file, you need to copy and rename it to .env in the root
of the project. After that you need to setup the env variables before run the project.
The next values are examples.

```bash
SERVER_PORT=3000 # Port Number
SERVER_AUTH_KEY=example  # String for the authkey token
SERVER_AUTH_SESSION_EXPIRATION=60000 # Integer number for session expiration

DB_PORT=2707 # Database port, in this project uses mongodb.
DB_NAME=example # Database name as String.
DB_SERVER_NAME=localhost # Database host as a String.
DB_USER=example # Database user as String.
DB_USER_PASSWORD=example # Database password as String.
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support the Nest framework

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
