"use server";

import { prisma } from "../../../lib/prisma";
import type { SearchFormValues } from "../types/Todo";

export const getTodos = async (params?: SearchFormValues) => {
	return await prisma.todo.findMany({
		where: params,
	});
};

export default getTodos;
