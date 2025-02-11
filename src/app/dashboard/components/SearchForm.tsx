'use client';

import { useForm } from 'react-hook-form';
import { Todo } from '@prisma/client';
import getTodos from '../actions/getTodos';
import { SearchFormValues } from '../types/Todo';

type SearchFormProps = {
  onSearch: (todos: Todo[]) => void;
};

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const { register, handleSubmit } = useForm<SearchFormValues>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (data: SearchFormValues) => {
    const todos = await getTodos(data);
    onSearch(todos);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
      <div className='flex gap-2'>
        <input
          {...register('title')}
          type='text'
          placeholder='タスクを検索...'
          className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        />
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        >
          検索
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
