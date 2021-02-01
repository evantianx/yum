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

check [env schema file](https://github.com/evantianx/yum/blob/master/server/src/config/envValidationSchema.ts#L3~L15)

## QA

### As you build out features like CRUD it's often useful to construct variants on a base entity type, so how to do it in Nest.js?

> [Mapped types](https://docs.nestjs.com/graphql/mapped-types)

This is how the original entity file looks like:

```js
// restaurant.entity.ts
@ObjectType()
@Entity()
export class Restaurant {
  // omit everything inside
}
```

- Use the third parameter

  ```js
  // createRestaurant.dto.ts

  /*
    here because the child class type(CreateRestaurantDto => ArgsType) is
    different with the parent class type(Restaurant => ObjectType).
    By default, the generated class will inherit parant class type. So we need to pass
    the third parameter to make sure the child class type is still what we want.
  */
  @ArgsType()
  export class CreateRestaurantDto extends OmitType(
    Restaurant,
    ['id'],
    ArgsType,
  ) {}
  ```

- Or use `isAbstract: true`

  ```js
  /*
    notice here! we tell nestjs that we only want this class
    can also be extends as a ArgsType, so we don't need to pass 
    the third parameter
  */
  @ArgsType({ isAbstract: true })
  @ObjectType()
  @Entity()
  export class Restaurant {
    // omit everything inside
  }
  ```

  > The `isAbstract: true` property indicates that SDL (Schema Definition Language statements) shouldn't be generated for this class. Note, you can set this property for other types as well to suppress SDL generation.

### `defaultValue` vs `nullable`

```js
// inside one entity

@Field(() => Boolean, { defaultValue: true })  // for graphql schema
@Column({ default: true })                     // for database
@IsBoolean()
@IsOptional()                                  // for validation
isVegan: boolean;
```

`defaultValue` means it can be omit but has a defaultValue
`nullable` means it can be omit

### Middleware

- Global middleware

  use `use()` method at `INestApplication` instance:

  ```ts
  // main.ts
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(new JwtMiddleware());
    await app.listen(3000);
  }
  bootstrap();
  ```

- Local middleware

  ```ts
  // app.module.ts
  export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtMiddleware).forRoutes({
        path: '/graphql',
        method: RequestMethod.POST,
      });
    }
  }
  ```

About class middleware and function middleware:

- if you need dependecy injection, then you can only use class type middleware
- if you want register at global scope, then you can only use function type middleware


### TypeORM repo's `update` & `save` methods

`update` won't trigger `beforeUpdate` event hook. So we should use `save` method if we need to do some tricks before database update.
## Reference

- [typeorm-naming-strategies](https://github.com/tonivj5/typeorm-naming-strategies#readme)

## License

This project is [MIT licensed](LICENSE).
