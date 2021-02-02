import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { IsEmail, IsEnum } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';
import { JwtService } from '../../jwt/jwt.service';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity()
export class User extends BaseEntity {
  constructor(
    @Inject()
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    super();
  }

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

  @Column({ default: false })
  @Field()
  verified: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password, {
      hashLength: 10,
    });
  }

  checkPassword(attempt: string): Promise<boolean> {
    return argon2.verify(this.password, attempt);
  }
}
