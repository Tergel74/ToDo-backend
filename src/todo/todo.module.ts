import { Module } from "@nestjs/common";
import { Todo } from "src/models/todos.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: '13.215.139.119',
            port: 3306,
            username: 'rtd',
            password: 'Tiny722$',
            database: 'Tergel',
            models: [Todo],
        }),
        SequelizeModule.forFeature([Todo]),
    ],
    providers: [TodoService],
    controllers: [TodoController]
})

export class TodoModule {}