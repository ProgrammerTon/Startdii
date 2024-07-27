import {
  Entity,
  Column,
  ObjectIdColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { BeforeInsert, BeforeUpdate } from 'typeorm';
// import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export enum Role {
  Admin = 'admin',
  Customer = 'customer',
}

@Entity()
@Unique(['email'])
export class User {
  @ObjectIdColumn()
  id?: ObjectId;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'firstname' })
  firstname: string;

  @Column({ name: 'lastname' })
  lastname: string;

  @Column({ name: 'roles' })
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
