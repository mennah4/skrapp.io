import { Controller, Get } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todos.entity';

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) { }

    @Get()
    async findAll(): Promise<Todo[]> {
        return this.todosService.findAll();
    }

    @Get('create')
    async create(): Promise<Todo> {
        return this.todosService.create();
    }
}
