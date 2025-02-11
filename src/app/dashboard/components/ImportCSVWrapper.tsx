'use client';

import CSVReader from './ImportCSV';
import createTodo from '../actions/createTodo';

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
