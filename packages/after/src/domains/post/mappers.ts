import type { Post } from './types';

/**
 * Post 통계 계산
 */
export function calculatePostStats(posts: Post[]) {
  return {
    total: posts.length,
    stat1: { label: '게시됨', value: posts.filter((p) => p.status === 'published').length, color: '#2e7d32' },
    stat2: { label: '임시저장', value: posts.filter((p) => p.status === 'draft').length, color: '#ed6c02' },
    stat3: { label: '보관됨', value: posts.filter((p) => p.status === 'archived').length, color: 'rgba(0, 0, 0, 0.6)' },
    stat4: { label: '총 조회수', value: posts.reduce((sum, p) => sum + p.views, 0), color: '#1976d2' },
  };
}

/**
 * Post 테이블 컬럼 정의
 */
export function getPostTableColumns() {
  return [
    { key: 'id', header: 'ID', width: '60px' },
    { key: 'title', header: '제목' },
    { key: 'author', header: '작성자', width: '120px' },
    { key: 'category', header: '카테고리', width: '140px' },
    { key: 'status', header: '상태', width: '120px' },
    { key: 'views', header: '조회수', width: '100px' },
    { key: 'createdAt', header: '작성일', width: '120px' },
    { key: 'actions', header: '관리', width: '250px' },
  ];
}

