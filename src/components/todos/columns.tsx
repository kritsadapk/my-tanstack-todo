'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useUpdateTodo, useDeleteTodo } from './hooks';
import { Todo } from './types';

// Action component สำหรับปุ่มต่างๆ
const TodoActions = ({ todo }: { todo: Todo }) => {
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  return (
    <div className="space-x-2">
      <button
        onClick={() => updateTodoMutation.mutate({ id: todo.id, completed: !todo.completed })}
        className={`
                    px-3 py-1 text-xs font-semibold rounded-md text-white transition-colors
                    ${todo.completed
            ? 'bg-gray-400 hover:bg-gray-500' // ปุ่ม Undo
            : 'bg-blue-500 hover:bg-blue-600' // ปุ่ม Complete
          }
                `}
      >
        {todo.completed ? 'Undo' : 'Complete'}
      </button>
      <button
        onClick={() => deleteTodoMutation.mutate(todo.id)}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md text-xs transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

// นิยามคอลัมน์ของเรา
export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: 'completed',
    header: 'Status',
    cell: ({ row }) => (row.original.completed ? '✅ Done' : '⏳ Pending'),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <span className={row.original.completed ? 'line-through text-gray-400' : ''}>
        {row.original.title}
      </span>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <TodoActions todo={row.original} />,
  },
];