import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { DatabaseModule } from '../database/database.module';
import { todosProviders } from './todos.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...todosProviders, TodosService],
  controllers: [TodosController]
})
export class TodosModule {}
