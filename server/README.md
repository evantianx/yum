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
TYPEORM_ENTITIES = **/entities/*.entity.js
```

## QA

### As you build out features like CRUD it's often useful to construct variants on a base entity type, so how to do it in Nest.js?

This is how the original entity file looks like:

```js
// restaurant.entity.ts
@ObjectType()
@Entity()
export class Restaurant {
  // omit everything inside
}
```

- Use [Mapped types](https://docs.nestjs.com/graphql/mapped-types):

  ```js
  // createRestaurant.dto.ts
  @ArgsType()
  export class CreateRestaurantDto extends OmitType(
    Restaurant,
    ['id'],
    ArgsType,
  ) {}
  ```

- Use `isAbstract: true`

  ```js
  /*
    notice here! we tell nestjs that we only want this class
    can also be extends as a ArgsType
  */
  @ArgsType({ isAbstract: true })
  @ObjectType()
  @Entity()
  export class Restaurant {
    // omit everything inside
  }
  ```

  > The `isAbstract: true` property indicates that SDL (Schema Definition Language statements) shouldn't be generated for this class. Note, you can set this property for other types as well to suppress SDL generation.

## Reference

- [typeorm-naming-strategies](https://github.com/tonivj5/typeorm-naming-strategies#readme)

## License

This project is [MIT licensed](LICENSE).
