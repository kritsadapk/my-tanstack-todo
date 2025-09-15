'use client';
import { useState } from 'react';
import { useGetTodos, useAddTodo } from 'pk/components/todos/hooks';
import { columns } from 'pk/components/todos/columns';
import { DataTable } from 'pk/components/todos/data-table';
import { RegisterForm } from 'pk/components/register-form';

export default function HomePage() {
  const [newTodo, setNewTodo] = useState('');
  const { data: todos, isLoading, isError } = useGetTodos();
  const addTodoMutation = useAddTodo();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodoMutation.mutate(newTodo.trim());
      setNewTodo('');
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (isError) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>Error loading todos.</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            TanStack To-Do List
          </span>
        </h1>

        <div className="mb-8">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            />
            <button
              onClick={handleAddTodo}
              disabled={addTodoMutation.isPending}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
            >
              {addTodoMutation.isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : 'Add To-Do'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-12">
          <DataTable columns={columns} data={todos || []} />
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
