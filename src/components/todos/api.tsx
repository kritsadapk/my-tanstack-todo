import { Todo } from "./types";
// --- API Functions ---

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch('/api/todos');
  return res.json();
};

export const addTodo = async (title: string): Promise<Todo> => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTodo = async (todo: Pick<Todo, 'id' | 'completed'>): Promise<Todo> => {
  const res = await fetch('/api/todos', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return res.json();
}

export const deleteTodo = async (id: number): Promise<{ message: string }> => {
  const res = await fetch('/api/todos', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return res.json();
};
