import type { User } from './types';

/**
 * User 통계 계산
 */
export function calculateUserStats(users: User[]) {
  return {
    total: users.length,
    stat1: { label: '활성', value: users.filter((u) => u.status === 'active').length, color: '#2e7d32' },
    stat2: { label: '비활성', value: users.filter((u) => u.status === 'inactive').length, color: '#ed6c02' },
    stat3: { label: '정지', value: users.filter((u) => u.status === 'suspended').length, color: '#d32f2f' },
    stat4: { label: '관리자', value: users.filter((u) => u.role === 'admin').length, color: '#1976d2' },
  };
}

/**
 * User 테이블 컬럼 정의
 */
export function getUserTableColumns() {
  return [
    { key: 'id', header: 'ID', width: '60px' },
    { key: 'username', header: '사용자명', width: '150px' },
    { key: 'email', header: '이메일' },
    { key: 'role', header: '역할', width: '120px' },
    { key: 'status', header: '상태', width: '120px' },
    { key: 'createdAt', header: '생성일', width: '120px' },
    { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
    { key: 'actions', header: '관리', width: '200px' },
  ];
}

