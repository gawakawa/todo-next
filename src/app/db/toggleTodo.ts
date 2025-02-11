'use server';

import { Todo } from '@prisma/client';
import { prisma } from '../../lib/prisma';

type ToggleTodoParams = Pick<Todo, 'id' | 'completed'>;

const toggleTodo = async ({ id, completed }: ToggleTodoParams): Promise<Todo> => {
  return await prisma.todo.update({
    where: { id },
    data: { completed },
  });
};

export default toggleTodo;
