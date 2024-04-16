import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todos.entity';

@Injectable()
export class TodosService {
    constructor(
        @Inject('TODO_REPOSITORY')
        private todoRepository: Repository<Todo>,
    ) { }

    async findAllByUser(userId: number): Promise<Todo[]> {
        return this.todoRepository.find({
            where: { user: { id: userId } }
        });
    }

    async create({ text, userId }): Promise<Todo> {
        const todo = this.todoRepository.create({
            text,
            user: { id: userId }
        });

        return this.todoRepository.save(todo);
    }

    async findOne({ id, userId }): Promise<Todo> {
        const todo = await this.todoRepository.findOneBy({id, user: { id: userId }});
        if(!todo) throw new NotFoundException('Todo not found');
        return todo;
    }

    async update({ id, text, done, userId }): Promise<Todo> {   
        const todo = await this.todoRepository.findOneBy({id, user: { id: userId }});
        if(!todo) throw new NotFoundException('Todo not found');

        todo.text = text;
        todo.done = done;

        return this.todoRepository.save(todo);
    }

    async delete({ id, userId }): Promise<{ id: number }> {   
        const todo = await this.todoRepository.findOneBy({id, user: { id: userId }});

        if(!todo) throw new NotFoundException('Todo not found');
        this.todoRepository.delete(todo);

        return { id };
    }

    async getTodosForUser(userId: number): Promise<Todo[]> {
        const queryBuilder = this.todoRepository.createQueryBuilder('todo');
        queryBuilder.leftJoinAndSelect('todo.user', 'user'); // Left join to include user details
        queryBuilder.where('user.id = :userId', { userId });
        queryBuilder.where('done = :done', { done: true });
        return await queryBuilder.getMany();
      }
}
