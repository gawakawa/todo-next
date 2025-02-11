'use client';

import { useState } from 'react';
import { Todo } from '../types/Todo';
import { Pencil } from 'lucide-react';
import editTodo from '../actions/editTodo';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

export function EditTodoDialog({ todo }: { todo: Todo }) {
  const [title, setTitle] = useState(todo.title);
  const [open, setOpen] = useState(false);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editTodo({
        id: todo.id,
        title,
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='p-2 text-blue-600 hover:bg-blue-50 rounded-full'>
          <Pencil size={20} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>タスクを編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEdit} className='space-y-4'>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='タスクを入力...'
          />
          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              キャンセル
            </Button>
            <Button type='submit' variant='default'>
              保存
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
