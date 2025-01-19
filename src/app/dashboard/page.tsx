'use server';

import getTodos from '../../db/getTodos';
import { Todo } from '../types/Todo';
import TodoForm from '../components/todoForm';
import LogoutWrapper from '../components/LogoutWrapper';

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

        <ul className='space-y-4'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200'
            >
              <p className='text-gray-700'>{todo.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
