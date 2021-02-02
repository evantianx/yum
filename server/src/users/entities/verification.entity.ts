import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne } from 'typeorm';
import { JoinColumn } from 'typeorm/browser';
import { BaseEntity } from '../../base/entities/base.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Verification extends BaseEntity {
  @Column()
  @Field()
  code: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
