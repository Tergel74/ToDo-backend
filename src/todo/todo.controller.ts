import { Controller, Get, Post, Delete, Body, Put } from '@nestjs/common';
import { TodoService } from './todo.service';

type todoBody = {todo: string, completed: boolean}

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  todos: any[] = [];

  @Get('/todos')
  getTodos() {
    console.log('Getting all todos.')
    return this.todoService.getTodos()
  };

  @Delete('/todos')
  deletedAllTodos() {
    console.log('Deleting all todos.')
    return this.todoService.deleteAllTodos()
  }

  @Put('/todos')
  updateTodo(@Body() body: todoBody) {
    console.log('Updating a todo.')
    console.log(body)
    return this.todoService.updateTodo(body)
  }

  @Post('/delete')
  deleteTodo(@Body() body: todoBody) {
    console.log('Deleting a todo.')
    return this.todoService.deleteTodo(body)
  }

  @Post('/create')
  async createTodo(@Body() body: todoBody) {
    console.log('Creating a todo.')
    this.todoService.createTodo(body);
    return {message: "Successfully created new To Do!", body}
  }
}