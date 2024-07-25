import { Entity, Column, ObjectIdColumn, Unique } from 'typeorm';
// import { BeforeInsert, BeforeUpdate } from 'typeorm';
// import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export type UserRoleType = 'admin' | 'default';

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

  @Column({ name: 'role' })
  role: UserRoleType;

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword() {
  //   if (this.password) {
  //     const saltRounds = 10;
  //     this.password = await bcrypt.hash(this.password, saltRounds);
  //   }
  // }
}
