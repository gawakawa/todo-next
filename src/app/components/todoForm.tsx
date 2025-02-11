'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TodoFormSchema, TodoFormData } from '../types/Todo';
import createTodo from '../db/createTodo';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../components/ui/form';

const TodoForm = () => {
  const form = useForm<TodoFormData>({
    resolver: zodResolver(TodoFormSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (data: TodoFormData) => {
    await createTodo(data.title);
    form.reset();
    window.location.reload();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex gap-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Input placeholder='Todo を入力してください' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>追加</Button>
        </div>
      </form>
    </Form>
  );
};

export default TodoForm;
