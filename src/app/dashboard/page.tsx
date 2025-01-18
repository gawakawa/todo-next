import getTodos from '../db/getTodos';
import { Todo } from '../types/Todo';
import TodoForm from '../components/TodoForm';
import LogoutWrapper from '../components/LogoutWrapper';
import TodoList from '../components/TodoList';
import DownloadCSV from '../components/DownloadCSV';
import CSVImportWrapper from '../components/ImportCSVWrapper';

// src/app/todo/page.tsx
const Page = async () => {
  const todos: Todo[] = await getTodos();

  return (
    <div className='min-h-screen bg-gray-50'>
      <LogoutWrapper />

      <div className='max-w-4xl mx-auto px-4 py-12'>
        <div className='bg-white rounded-xl shadow-lg p-8'>
          <div className='flex items-center justify-between mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>TODOリスト</h1>
            <div className='flex gap-2'>
              <DownloadCSV todos={todos} />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6 mb-8'>
            <div>
              <h2 className='text-lg font-medium text-gray-900 mb-3'>新規タスク追加</h2>
              <TodoForm />
            </div>
            <div>
              <h2 className='text-lg font-medium text-gray-900 mb-3'>CSVインポート</h2>
              <CSVImportWrapper />
            </div>
          </div>

          <TodoList todos={todos} />
        </div>
      </div>
    </div>
  );
};

export default Page;
