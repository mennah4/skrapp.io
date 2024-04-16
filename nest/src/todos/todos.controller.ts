import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todos.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodosController {
    constructor(private todosService: TodosService) { }

    @Get()
    async findAll(@Request() req): Promise<Todo[]> {
        return this.todosService.findAllByUser(req.user.id);
    }

    @Get('done')
    async getTodosByStatus(@Request() req): Promise<Todo[]> {
        return this.todosService.getTodosForUser(req.user.id);
    }

    @Post()
    async create(@Request() req, @Body() createTodoDto: Todo): Promise<Todo> {
        return this.todosService.create({
            text: createTodoDto.text,
            userId: req.user.id
        });
    }

    @Get(':id')
    async getById(@Request() req, @Param('id') todoId: number): Promise<Todo> {
        return this.todosService.findOne({
            id: todoId,
            userId: req.user.id
        });
    }

    @Patch(':id')
    async update(@Request() req, @Body() updateTodoDto: Todo, @Param('id') todoId: number): Promise<Todo> {
        return this.todosService.update({
            id: todoId,
            text: updateTodoDto.text,
            done: updateTodoDto.done,
            userId: req.user.id
        });
    }

    @Delete(':id')
    async delete(@Request() req, @Param('id') todoId: number): Promise<{ id: number }> {
        return this.todosService.delete({
            id: todoId,
            userId: req.user.id
        });
    }
}
