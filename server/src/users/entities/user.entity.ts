import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  @Field(() => UserRole)
  role: UserRole;
}