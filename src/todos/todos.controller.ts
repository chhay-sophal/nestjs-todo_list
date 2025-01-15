import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todos.model';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService) {};

    @Post()
    create(@Body() createTodoDto: CreateTodoDto): Todo {
        return this.todoService.create(createTodoDto);
    }

    @Get()
    findAll(): Todo[] {
        return this.todoService.findAll();
    } 

    @Get(':id')
    findOne(@Param('id') id: string): Todo {
        return this.todoService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updatedTodo: Todo
    ): Todo {
        return this.todoService.update(id, updatedTodo);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string): void {
        return this.todoService.remove(id);
    }
}
