import type { UserRole, UserStatus } from './types';

export const USER_ROLES: { value: UserRole; label: string }[] = [
  { value: 'user', label: '사용자' },
  { value: 'moderator', label: '운영자' },
  { value: 'admin', label: '관리자' },
];

export const USER_STATUSES: { value: UserStatus; label: string }[] = [
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'suspended', label: '정지' },
];

// 검증에 사용되는 상수
export const RESERVED_USERNAMES = ['admin', 'root', 'system', 'administrator'];
export const ALLOWED_EMAIL_DOMAINS = ['@company.com', '@example.com'];
