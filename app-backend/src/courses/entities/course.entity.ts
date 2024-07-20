import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Course {
  @ObjectIdColumn()
  id?: ObjectId;

  @Column()
  number: string;

  @Column()
  title: string;
}
