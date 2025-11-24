"use client";

import type { Todo } from "../types/Todo";

type TodoListProps = {
	todos: Todo[];
};

const TodoList = ({ todos }: TodoListProps) => {
	return (
		<div className="space-y-4">
			{todos.map((todo) => (
				<div
					key={todo.id}
					className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
				>
					<div className="flex-1">
						<h3 className="font-medium">{todo.title}</h3>
						{todo.title && (
							<p className="text-sm text-gray-500">{todo.title}</p>
						)}
					</div>
				</div>
			))}
			{todos.length === 0 && (
				<p className="text-center text-gray-500">タスクが見つかりません</p>
			)}
		</div>
	);
};

export default TodoList;
