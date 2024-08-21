import {
    Entity,
    Column,
    ObjectIdColumn,
    Unique,
    CreateDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
@Unique(['name'])
export class Tag {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn()
  created_at: Date;
}
