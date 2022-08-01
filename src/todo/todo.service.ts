import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from 'src/models/todos.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo, private sequelize: Sequelize) {
    this.sequelize.sync()
  };

  getTodos(): Promise<Todo[]> {
    return this.todoModel.findAll()
  };

  deleteAllTodos() {
    this.todoModel.truncate()
    return this.todoModel.findAll()
  }

  deleteTodo(data) {
    this.todoModel.destroy({
      where: { todo: data.todo }
    })
  }

  updateTodo(data) {
    this.todoModel.update(
      {
        completed: data.completed
      },
      {
        where: {todo: data.todo}
      }
    )
    console.log(data)
  }

  async createTodo(data) {
    const newTodo = new this.todoModel({
      id: data.id,
      todo: data.todo,
    })
    newTodo.save()
    return newTodo;
  };
}