"use server";

import { Checkbox } from "../../../components/ui/checkbox";
import toggleTodo from "../actions/toggleTodo";
import type { Todo } from "../types/Todo";
import { DeleteTodoDialog } from "./DeleteTodoDialog";
import { EditTodoDialog } from "./EditTodoDialog";

const TodoItem = ({ todo }: { todo: Todo }) => {
	const handleToggle = async () => {
		await toggleTodo({
			id: todo.id,
			completed: !todo.completed,
		});
		window.location.reload();
	};

	return (
		<li className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
			<div className="flex items-center gap-3 flex-1">
				<Checkbox checked={todo.completed} onCheckedChange={handleToggle} />
				<p
					className={`text-gray-700 ${todo.completed ? "line-through text-gray-400" : ""}`}
				>
					{todo.title}
				</p>
			</div>
			<div className="flex gap-2">
				<EditTodoDialog todo={todo} />
				<DeleteTodoDialog todo={todo} />
			</div>
		</li>
	);
};

export default TodoItem;
