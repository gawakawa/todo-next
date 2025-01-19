'use client';

import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <ul className='space-y-4'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
