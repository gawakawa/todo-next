'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createTodo = async (title: string) => {
  return await prisma.todo.create({
    data: {
      title,
    },
  })
}

export default createTodo
