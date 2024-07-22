import { Entity, Column, ObjectIdColumn, Unique } from 'typeorm';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

@Entity()
@Unique(['email'])
export class User {
  @ObjectIdColumn()
  id?: ObjectId;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }

  @Column({ name: 'firstname' })
  firstname: string;

  @Column({ name: 'lastname' })
  lastname: string;
}
