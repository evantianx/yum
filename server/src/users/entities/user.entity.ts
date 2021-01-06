import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';

type UserRole = 'client' | 'owner' | 'delivery';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
