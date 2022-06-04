import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const createExpensesSchema = z.object({
  name: z.string(),
  description: z.string(),
  amount: z.number(),
  date: z.date(),
});

export type ExpensesInput = z.infer<typeof createExpensesSchema>;

export const { schemas: expensesSchema, $ref } = buildJsonSchemas({
  createExpensesSchema,
});
