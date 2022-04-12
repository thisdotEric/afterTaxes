import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email address is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  user_id: z.number(),
  email: z.string().email(),
});

/**
 * Inferred input types
 */
export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: sessionsSchema, $ref } = buildJsonSchemas({
  loginSchema,
  loginResponseSchema,
});
