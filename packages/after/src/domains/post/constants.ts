import type { PostCategory, PostStatus } from './types';

export const POST_CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'development', label: '개발' },
  { value: 'design', label: '디자인' },
  { value: 'accessibility', label: '접근성' },
];

export const POST_STATUSES: { value: PostStatus; label: string }[] = [
  { value: 'draft', label: '임시저장' },
  { value: 'published', label: '게시됨' },
  { value: 'archived', label: '보관됨' },
];

// 검증에 사용되는 상수
export const BANNED_WORDS = ['광고', '스팸', '홍보'];
