import Dexie, { Table } from 'dexie';
import 'fake-indexeddb/auto';


//import { populate } from './populate';
//import { TodoItem } from './TodoItem';
//import { TodoList } from './TodoList';

export interface Friend {
  id?: number;
  name: string;
  age: number;
}

export class MySubClassedDexie extends Dexie {
  friends!: Table<Friend>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      friends: '++id, name, age' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();