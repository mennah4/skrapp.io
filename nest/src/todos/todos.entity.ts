import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @Column({ type: 'boolean', default: false })
  done: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User
}