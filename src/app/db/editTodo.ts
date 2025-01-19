'use server';

import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

type EditTodoParams = Pick<Todo, 'id' | 'title'>;

const editTodo = async ({ id, title }: EditTodoParams): Promise<Todo> => {
  return await prisma.todo.update({
    where: { id },
    data: { title },
  });
};

export default editTodo;
