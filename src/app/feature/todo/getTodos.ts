'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getTodos = async () => {
  return await prisma.todo.findMany();
}

export default getTodos;