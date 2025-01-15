import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) {}

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const newTodo = this.todoRepository.create(createTodoDto);
        return await this.todoRepository.save(newTodo);
    }

    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async findOne(id: string): Promise<Todo> {
        try {
          const todo = await this.todoRepository.findOneOrFail({ where: { id } });
          return todo;
        } catch (error) {
          throw new NotFoundException(`Todo with ID ${id} not found`);
        }
      }      

    async update(id: string, updatedTodo: Todo): Promise<Todo> {
        await this.todoRepository.update(id, updatedTodo);
        return this.todoRepository.findOneOrFail({ where: { id } });
    }

    async remove(id: string): Promise<void> {
        await this.todoRepository.delete(id);
    }
}
