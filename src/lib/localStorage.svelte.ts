import type { InferSelectModel } from "drizzle-orm";
import { todos } from "../db/schema";
import { browser } from "$app/environment";

type Todo = InferSelectModel<typeof todos>

export class LocalTodos {
  todos = $state<Todo[]>([]);
  key = 'todos';

  constructor() {
    if (browser) {
      const item = localStorage.getItem(this.key);
      if (item) this.todos = this.deserialize(item);
    }

    $effect(() => {
      localStorage.setItem(this.key, this.serialize(this.todos));
    });
  }

  getAll() {
    if (!browser) {
      return [];
    };
    return this.todos.filter(td => !td.deleted_at);
  }

  persist(todos: Todo[]) {
    localStorage.setItem('todos', this.serialize(todos));
    this.todos = todos;
  }

  add(text: string) {
    const newTodo: Todo = {
      text,
      id: Date.now(),
      completed: false,
      ownerId: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    const newList = [... this.todos, newTodo];
    this.persist(newList);
  }

  toggle(id: number) {
    const todos: Todo[] = this.getAll();
    const todo = todos.find(v => v.id === id);
    if (!todo) return;
    todo.completed = !todo.completed;
    todo.updated_at = new Date();
    this.persist(todos);
  }

  update(id: number, text: string) {
    const todos: Todo[] = this.getAll();
    const todo = todos.find(v => v.id === id);
    if (!todo) return;
    todo.text = text;
    this.persist(todos);
  }

  delete(id: number) {
    const todos: Todo[] = this.getAll();
    const todo = todos.find(v => v.id === id);
    if (!todo) return;
    todo.deleted_at = new Date();
    this.persist(todos);
  }

  serialize(value: Todo[]): string {
    return JSON.stringify(value);
  }

  deserialize(item: string): Todo[] {
    return JSON.parse(item);
  }
}
