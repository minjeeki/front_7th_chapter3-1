import { z } from 'zod';
import type { CreatePostInput, UpdatePostInput } from './types';
import { BANNED_WORDS } from './constants';

// Title 검증
const titleSchema = z
  .string()
  .min(5, '제목은 5자 이상이어야 합니다')
  .max(100, '제목은 100자 이하여야 합니다')
  .refine(
    (val) => !BANNED_WORDS.some((word) => val.includes(word)),
    '제목에 금지된 단어가 포함되어 있습니다'
  );

// Post 생성 스키마
export const createPostSchema = z.object({
  title: titleSchema,
  content: z.string().default(''),
  author: z.string().min(1, '작성자를 입력해주세요'),
  category: z.enum(['development', 'design', 'accessibility']),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
}) satisfies z.ZodType<CreatePostInput>;

// Post 수정 스키마
export const updatePostSchema = z.object({
  title: titleSchema.optional(),
  content: z.string().optional(),
  author: z.string().min(1, '작성자를 입력해주세요').optional(),
  category: z.enum(['development', 'design', 'accessibility']).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
}) satisfies z.ZodType<UpdatePostInput>;

// 타입 추론
export type CreatePostFormData = z.infer<typeof createPostSchema>;
export type UpdatePostFormData = z.infer<typeof updatePostSchema>;

