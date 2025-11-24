"use server";

import type { Todo } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

type EditTodoParams = Pick<Todo, "id" | "title">;

const editTodo = async ({ id, title }: EditTodoParams): Promise<Todo> => {
	return await prisma.todo.update({
		where: { id },
		data: { title },
	});
};

export default editTodo;
