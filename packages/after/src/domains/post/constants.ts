import type { PostCategory, PostStatus } from './types';

export const POST_CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'accessibility', label: 'Accessibility' },
];

export const POST_STATUSES: { value: PostStatus; label: string }[] = [
  { value: 'draft', label: '임시저장' },
  { value: 'published', label: '게시됨' },
  { value: 'archived', label: '보관됨' },
];

