import { InternalServerErrorException } from '@nestjs/common';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { IsEmail, IsEnum } from 'class-validator';
import { BeforeInsert, Column, Entity } from 'typeorm';
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
  @Column({ unique: true })
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await argon2.hash(this.password, {
        hashLength: 10,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(passwordFromUserInput: string): Promise<boolean> {
    try {
      return await argon2.verify(this.password, passwordFromUserInput);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
