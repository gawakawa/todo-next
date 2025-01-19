import getTodos from '../db/getTodos';
import { Todo } from '../types/Todo';
import TodoForm from '../components/TodoForm';
import LogoutWrapper from '../components/LogoutWrapper';
import TodoList from '../components/TodoList';
import DownloadCSV from '../components/DownloadCSV';
import CSVImportWrapper from '../components/ImportCSVWrapper';

const Page = async () => {
  const todos: Todo[] = await getTodos();

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

          <TodoList todos={todos} />
        </div>
      </div>
    </div>
  );
};

export default Page;
