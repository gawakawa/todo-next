'use server';

import { prisma } from '../../../lib/prisma';

const getTodos = async () => {
  return await prisma.todo.findMany();
};

export default getTodos;
