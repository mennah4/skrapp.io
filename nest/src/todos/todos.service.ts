import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todos.entity';

@Injectable()
export class TodosService {
    constructor(
        @Inject('TODO_REPOSITORY')
        private todoRepository: Repository<Todo>,
    ) { }

    async findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    async create(): Promise<Todo> {
        const todo = this.todoRepository.create({
            title: 'test',
            description: 'test',
            date: 'test',
            done: false,
        });

        return this.todoRepository.save(todo);
    }
}
