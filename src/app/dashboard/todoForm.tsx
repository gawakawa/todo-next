'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TodoFormSchema, TodoFormData } from './types';
import createTodo from './createTodo';

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(TodoFormSchema),
  });

  const onSubmit = async (data: TodoFormData) => {
    await createTodo(data.title);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='flex gap-4'>
        <input
          {...register('title')}
          placeholder='Todo を入力してください'
          className='flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        <button
          type='submit'
          className='px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          追加
        </button>
      </div>
      {errors.title && <span className='block text-sm text-red-500'>{errors.title.message}</span>}
    </form>
  );
};

export default TodoForm;
