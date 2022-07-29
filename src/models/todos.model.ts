import { UUIDV4 } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column({primaryKey: true})
  id: string;

  @Column
  todo: string
  
  @Column({defaultValue: false})
  completed: boolean
}