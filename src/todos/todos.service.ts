import { Injectable } from '@nestjs/common';
import { Todo } from './todos.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodosService {
    private todos: Todo[] =[];

    create(createTodoDto: CreateTodoDto): Todo {
        const newTodo: Todo = {
            id: uuidv4(),
            ...createTodoDto,
        }
        this.todos.push(newTodo);
        return newTodo;
    }

    findAll(): Todo[] {
        return this.todos;
    }

    findOne(id: string): Todo {
        return this.todos.find(todo => todo.id === id);
    }

    update(id: string, updatedTodo: Todo): Todo {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            return null;
        }
        this.todos[todoIndex] = updatedTodo;
        return updatedTodo;
    }

    remove(id: string): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}
