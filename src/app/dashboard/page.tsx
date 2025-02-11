'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { redirect } from 'next/navigation';
import getTodos from './actions/getTodos';
import TodoForm from './components/TodoForm';
import LogoutButton from './components/LogoutButton';
import TodoList from './components/TodoList';
import DownloadCSV from './components/DownloadCSV';
import CSVImportWrapper from './components/ImportCSVWrapper';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const todos = await getTodos();

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
            <h2 className='text-lg font-medium text-gray-900 mb-3'>タスク追加</h2>
            <TodoForm />
          </div>

          <TodoList todos={todos} />
        </div>
      </div>
    </div>
  );
}
