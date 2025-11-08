import React from 'react';
import { useTodos, useUpdateTodo, useDeleteTodo } from '../hooks/useTodo';


export default function TodoList() {
    const { data: todos, isPending, isError } = useTodos();
    const updateTodoMutation = useUpdateTodo();
    const deleteTodoMutation = useDeleteTodo();

    const handleToggle = (todo) => {
        // Use the mutation to update the 'done' status
        updateTodoMutation.mutate({ ...todo, done: !todo.done });
    };

    // 1. Styled Loading State
    if (isPending) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-500">Loading your todos...</p>
            </div>
        );
    }

    // 2. Styled Error State
    if (isError) {
        return (
            <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
                <p>Something went wrong. Could not fetch todos.</p>
            </div>
        );
    }

    // 3. Styled Empty State
    if (!todos || todos.length === 0) {
        return (
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <p className="text-gray-500">No todos yet. Add one above!</p>
            </div>
        );
    }


    return (
        <ul className="space-y-3 mt-4">
            {todos?.map((todo) => (
                <li
                    key={todo.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                    <div className="flex-grow flex items-center min-w-0 mr-4">
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => handleToggle(todo)}
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="ml-4">
                            <p
                                className={`font-semibold ${todo.done ? 'line-through text-gray-400' : 'text-gray-800'
                                    }`}
                            >
                                {todo.title}
                            </p>
                            {todo.description && (
                                <p
                                    className={`text-sm ${todo.done ? 'line-through text-gray-400' : 'text-gray-600'
                                        }`}
                                >
                                    {todo.description}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => deleteTodoMutation.mutate(todo.id)}
                        disabled={deleteTodoMutation.isPending}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        title="Delete Todo"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </li>
            ))}
        </ul>
    );
}
