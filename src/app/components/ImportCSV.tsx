'use client';

import { useCSVReader } from 'react-papaparse';
import { Todo } from '../types/Todo';

type ImportCSVProps = {
  onImport: (todos: Omit<Todo, 'id'>[]) => void;
};

type CSVReaderProps = {
  getRootProps: () => Record<string, unknown>;
  acceptedFile: {
    name: string;
  } | null;
  ProgressBar: React.ComponentType<{ className?: string }>;
  getRemoveFileProps: () => Record<string, unknown>;
};

type CSVResults = {
  data: string[][];
  errors: unknown[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  };
};

const ImportCSV = ({ onImport }: ImportCSVProps) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
      onUploadAccepted={(results: CSVResults) => {
        const todos = results.data
          .slice(1)
          .filter((row: string[]) => row[0])
          .map((row: string[]) => ({
            title: row[0],
            completed: row[1] === '完了',
          }));
        onImport(todos);
      }}
    >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }: CSVReaderProps) => (
        <>
          <div className='flex items-center space-x-2'>
            <button
              type='button'
              {...getRootProps()}
              className='px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors duration-200'
            >
              ファイルを選択
            </button>
            <div className='flex-1 px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg'>
              {acceptedFile ? acceptedFile.name : 'ファイルが選択されていません'}
            </div>
            {acceptedFile && (
              <button
                {...getRemoveFileProps()}
                className='px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200'
              >
                削除
              </button>
            )}
          </div>
          <ProgressBar className='h-1 mt-2 bg-blue-500 rounded-full' />
        </>
      )}
    </CSVReader>
  );
};

export default ImportCSV;
