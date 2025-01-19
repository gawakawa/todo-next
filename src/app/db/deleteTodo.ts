'use server';

import { Todo } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const deleteTodo = async (id: number): Promise<Todo> => {
  return await prisma.todo.delete({
    where: { id },
  });
};

export default deleteTodo;
