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
    // generate random 4 digit number for the id
    let randomId = Math.floor(1000 + Math.random() * 9000);
    const isIdUnique = Todo.findOne({
      where: { id: randomId },
    });

    while (await isIdUnique != null) {
      randomId = Math.floor(1000 + Math.random() * 9000);
      const isIdUnique = Todo.findOne({
        where: { id: randomId },
      });
    }

    const newTodo = new this.todoModel({
      id: randomId,
      todo: data.todo,
    })
    newTodo.save()
    return newTodo;
  };
}