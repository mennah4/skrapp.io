import { Controller, Get, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todos.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todos')
@UseGuards(AuthGuard)
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
