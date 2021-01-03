## Description

Yum backend made with `Nest.js`, `TypeORM` etc.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## ENV file demo

```bash
TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_PORT = 5432
TYPEORM_USERNAME = postgres
TYPEORM_PASSWORD = 123456
TYPEORM_DATABASE = yum
TYPEORM_SYNCHRONIZE = true
TYPEORM_LOGGING = true
```

## License

This project is [MIT licensed](LICENSE).
