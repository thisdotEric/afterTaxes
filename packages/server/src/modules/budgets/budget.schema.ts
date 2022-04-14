import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const budgetSchema = z.object({
  name: z.string(),
  description: z.string(),
  budget_type: z.string(),
  budget: z.number(),
  date_budgeted: z.date(),
  budgetFrom: z.date(),
  budgetUntil: z.date(),
});

const addNewBudgetsSchema = z.array(budgetSchema);

export type BudgetInput = z.infer<typeof budgetSchema>;
export type BudgetListInput = z.infer<typeof budgetSchema>[];

export const { schemas: budgetSchemas, $ref } = buildJsonSchemas({
  budgetSchema,
  addNewBudgetsSchema,
});
