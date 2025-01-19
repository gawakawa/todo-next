'use server';

import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

type ToggleTodoParams = Pick<Todo, 'id' | 'completed'>;

const toggleTodo = async ({ id, completed }: ToggleTodoParams): Promise<Todo> => {
  return await prisma.todo.update({
    where: { id },
    data: { completed },
  });
};

export default toggleTodo;
