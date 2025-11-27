import { z } from 'zod';
import type { CreateUserInput, UpdateUserInput } from './types';
import { RESERVED_USERNAMES, ALLOWED_EMAIL_DOMAINS } from './constants';

// Username 검증
const usernameSchema = z
  .string()
  .min(3, '사용자명은 3자 이상이어야 합니다')
  .max(20, '사용자명은 20자 이하여야 합니다')
  .regex(/^[a-zA-Z0-9_]+$/, '영문, 숫자, 언더스코어만 사용 가능합니다')
  .refine(
    (val) => !RESERVED_USERNAMES.includes(val.toLowerCase()),
    '예약된 사용자명입니다'
  );

// Email 검증
const emailSchema = z
  .string()
  .email('올바른 이메일 형식이 아닙니다')
  .refine(
    (val) => ALLOWED_EMAIL_DOMAINS.some((domain) => val.endsWith(domain)),
    '회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다'
  );

// User 생성 스키마
export const createUserSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  role: z.enum(['admin', 'moderator', 'user']).default('user'),
  status: z.enum(['active', 'inactive', 'suspended']).default('active'),
}) satisfies z.ZodType<CreateUserInput>;

// User 수정 스키마
export const updateUserSchema = z.object({
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  role: z.enum(['admin', 'moderator', 'user']).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
}) satisfies z.ZodType<UpdateUserInput>;

// 타입 추론
export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

