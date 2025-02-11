'use client';

import { useCSVReader } from 'react-papaparse';
import { Todo } from '../types/Todo';
import { Button } from '../../../components/ui/button';
import { Upload } from 'lucide-react';

type ImportCSVProps = {
  onImport: (todos: Omit<Todo, 'id'>[]) => void;
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

type CSVReaderProps = {
  getRootProps: () => Record<string, unknown>;
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
      {({ getRootProps }: CSVReaderProps) => (
        <Button variant='outline' {...getRootProps()}>
          <Upload className='mr-2 h-4 w-4' />
          CSV Import
        </Button>
      )}
    </CSVReader>
  );
};

export default ImportCSV;
