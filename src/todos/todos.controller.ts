import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService) {};

    @Post()
    async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return await this.todoService.create(createTodoDto);
    }

    @Get()
    findAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    } 

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Todo> {
        console.log(`Calling service to find Todo with ID: ${id}`);
        return this.todoService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updatedTodo: Todo
    ): Promise<Todo> {
        return this.todoService.update(id, updatedTodo);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.todoService.remove(id);
    }
}
