import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';

type UserRole = 'client' | 'owner' | 'delivery';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  role: UserRole;
}
