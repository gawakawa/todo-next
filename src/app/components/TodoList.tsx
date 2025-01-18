'use client';

import { Todo } from '../types/Todo';

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
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
  );
};

export default TodoList;
