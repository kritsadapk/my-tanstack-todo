import { NextResponse } from "next/server";

let todos: { id: number, title: string, completed: boolean }[] = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Learn React", completed: false },
  { id: 3, title: "Learn TypeScript", completed: false },
  { id: 4, title: "Learn GraphQL", completed: false }
]

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { title } = await request.json();
  const newTodo = { id: Date.now(), title, completed: false };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PATCH(request: Request) {
  const { id, completed } = await request.json();
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  todo.completed = completed;
  return NextResponse.json(todo);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  todos.splice(index, 1);
  return NextResponse.json({}, { status: 200 });
}