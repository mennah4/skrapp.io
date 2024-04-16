import { IsEmail } from 'class-validator';
import { Todo } from 'src/todos/todos.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';

@Entity('users')
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[]
}