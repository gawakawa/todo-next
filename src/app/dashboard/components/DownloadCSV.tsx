"use client";

import { useState } from "react";
import { CSVDownload } from "react-csv";
import type { Todo } from "../types/Todo";

const DownloadCSV = ({ todos }: { todos: Todo[] }) => {
	const [isDownloading, setIsDownloading] = useState(false);

	const headers = [
		{ label: "タイトル", key: "title" },
		{ label: "ステータス", key: "status" },
	];

	const data = todos.map((todo) => {
		return {
			title: todo.title,
			status: todo.completed ? "完了" : "未完了",
		};
	});

	return (
		<>
			<button
				onClick={() => setIsDownloading(true)}
				className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md"
			>
				<svg
					className="w-4 h-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
				CSV Download
			</button>
			{isDownloading && (
				<CSVDownload data={data} headers={headers} target="_blank" />
			)}
		</>
	);
};

export default DownloadCSV;
