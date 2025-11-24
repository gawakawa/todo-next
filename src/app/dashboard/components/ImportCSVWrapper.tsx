"use client";

import createTodo from "../actions/createTodo";
import CSVReader from "./ImportCSV";

export default function CSVImportWrapper() {
	return (
		<CSVReader
			onImport={async (todos) => {
				await Promise.all(todos.map((todo) => createTodo(todo.title)));
				window.location.reload();
			}}
		/>
	);
}
