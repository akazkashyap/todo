// src/pages/HomePage.jsx
import { useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import ThemeToggler from '../components/ThemeToggle'; // Make sure the filename is ThemeToggler.jsx

export default function HomePage() {
    const [showForm, setShowForm] = useState(false);

    // This function will be passed to the form so it can close itself
    const handleFormSubmit = () => {
        setShowForm(false);
    };

    return (
        // 1. Main container: Softer background, larger rounded corners, and a more pronounced shadow
        <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg transition-colors duration-300" style={{ width: '500px' }}>

            {/* 2. Header: A distinct section with a bottom border */}
            <header className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    My Todos
                </h1>
                <ThemeToggler />
            </header>

            {/* 3. Main Content Area */}
            <main>
                {/* 4. A cleaner conditional render for the form vs. the button */}
                {showForm ? (
                    <TodoForm onFormSubmit={handleFormSubmit} />
                ) : (
                    <div className="text-center mb-4">
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            + Add New Todo
                        </button>
                    </div>
                )}

                {/* 5. The TodoList component */}
                <TodoList />
            </main>
        </div>
    );
}
