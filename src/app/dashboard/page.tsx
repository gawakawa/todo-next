'use client';

import { useEffect, useState } from 'react';
import getTodos from './actions/getTodos';
import TodoForm from './components/TodoForm';
import LogoutButton from './components/LogoutButton';
import TodoList from './components/TodoList';
import DownloadCSV from './components/DownloadCSV';
import CSVImportWrapper from './components/ImportCSVWrapper';
import { Todo } from '@prisma/client';
import SearchForm from './components/SearchForm';

export default function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialTodos = await getTodos();
      setTodos(initialTodos);
    };

    fetchInitialData();
  }, []);

  const handleSearch = (searchResults: Todo[]) => {
    setTodos(searchResults);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <LogoutButton />

      <div className='max-w-4xl mx-auto px-4 py-12'>
        <div className='bg-white rounded-xl shadow-lg p-8'>
          <div className='flex items-center justify-between mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Todo List</h1>
            <div className='flex items-center gap-2'>
              <CSVImportWrapper />
              <DownloadCSV todos={todos} />
            </div>
          </div>

          <div className='mb-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-3'>タスク検索</h2>
            <SearchForm onSearch={handleSearch} />
          </div>

          <div className='mb-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-3'>タスク追加</h2>
            <TodoForm />
          </div>

          <TodoList todos={todos} />
        </div>
      </div>
    </div>
  );
}
