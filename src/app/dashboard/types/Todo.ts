import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string().min(1, '1文字以上で入力してください'),
  completed: z.boolean().default(false),
});

export const TodoFormSchema = TodoSchema.pick({ title: true });

export type Todo = z.infer<typeof TodoSchema>;
export type TodoFormData = z.infer<typeof TodoFormSchema>;

export type SearchFormValues = Pick<Todo, 'title'>;
