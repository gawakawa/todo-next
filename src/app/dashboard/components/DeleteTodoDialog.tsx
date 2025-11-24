"use client";

import { Trash2 } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import deleteTodo from "../actions/deleteTodo";
import type { Todo } from "../types/Todo";

export function DeleteTodoDialog({ todo }: { todo: Todo }) {
	const handleDelete = async () => {
		try {
			await deleteTodo(todo.id);
			window.location.reload();
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
					<Trash2 size={20} />
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>タスクを削除しますか？</AlertDialogTitle>
					<AlertDialogDescription>
						この操作は取り消せません。
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>キャンセル</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
					>
						削除
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
