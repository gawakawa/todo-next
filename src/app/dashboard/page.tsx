'use client';

import { useState, useEffect } from 'react';
import getTodos from '../db/getTodos';
import { Todo } from '../types/Todo';
import TodoForm from '../components/TodoForm';
import LogoutWrapper from '../components/LogoutWrapper';
import TodoList from '../components/TodoList';
import DownloadCSV from '../components/DownloadCSV';
import CSVImportWrapper from '../components/ImportCSVWrapper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const { data, status } = useSession();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    status === 'unauthenticated' && router.push('/login');
    status === 'authenticated' && !data.user?.email && router.push('/register');
    status === 'authenticated' && data.user?.email && fetchTodos();
  }, [data, router, status]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <LogoutWrapper />

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
            <h2 className='text-lg font-medium text-gray-900 mb-3'>タスク追加</h2>
            <TodoForm />
          </div>

          {isLoading ? (
            <div className='text-center py-4'>Loading...</div>
          ) : (
            <TodoList todos={todos} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
