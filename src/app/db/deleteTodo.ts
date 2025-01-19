'use server';

import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

const deleteTodo = async (id: number): Promise<Todo> => {
  return await prisma.todo.delete({
    where: { id },
  });
};

export default deleteTodo;
