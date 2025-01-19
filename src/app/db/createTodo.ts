'use server';

import { prisma } from '@/lib/prisma';

const createTodo = async (title: string) => {
  return await prisma.todo.create({
    data: {
      title,
    },
  });
};

export default createTodo;
