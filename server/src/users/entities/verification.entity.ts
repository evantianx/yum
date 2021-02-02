import { Field, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, JoinColumn, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';
import { User } from './user.entity';
import { v4 } from 'uuid';

@ObjectType()
@Entity()
export class Verification extends BaseEntity {
  @Column()
  @Field()
  code: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode() {
    this.code = v4();
  }
}
