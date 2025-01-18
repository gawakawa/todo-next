'use server';

import getTodos from '../../db/getTodos';
import { Todo } from '../types/Todo';
import TodoForm from '../components/TodoForm';
import LogoutWrapper from '../components/LogoutWrapper';
import TodoList from '../components/TodoList';

const Page = async () => {
  const todos: Todo[] = await getTodos();

  return (
    <div>
      <LogoutWrapper />

      <div className='max-w-2xl mx-auto p-6'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>TODOリスト</h1>

        <div className='mb-8'>
          <TodoForm />
        </div>

        <TodoList todos={todos} />
      </div>
    </div>
  );
};

export default Page;
