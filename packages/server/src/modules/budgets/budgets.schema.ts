import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const budgetSchema = z.object({
  description: z.string(),
  amount: z.number(),
  created_at: z.date(),
});

const addNewBudgetsSchema = z.array(budgetSchema);

export type BudgetInput = z.infer<typeof budgetSchema>;

export const { schemas: budgetSchemas, $ref } = buildJsonSchemas({
  budgetSchema,
  addNewBudgetsSchema,
});
