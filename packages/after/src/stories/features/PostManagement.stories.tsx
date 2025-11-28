import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PostManagement } from '../../features/posts/PostManagement';
import type { Post } from '../../domains/post/types';

const meta = {
  title: 'Features/PostManagement',
  component: PostManagement,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
게시글 관리 기능을 제공하는 Features 수준의 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Features (Templates/Pages)
- **Composition**: 
  - Organisms/PostTable
  - Organisms/PostForm
  - Organisms/PostStats
  - Organisms/DialogContainer
- **Usage**: ManagementPage에서 사용

## 특징
- 게시글 CRUD 기능 통합
- 통계 정보 표시
- 생성/수정 모달 관리
- 게시글 상태 관리 (게시, 보관, 복원)
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onCreate: fn(),
    onUpdate: fn(),
    onDelete: fn(),
    onPublish: fn(),
    onArchive: fn(),
    onRestore: fn(),
  },
} satisfies Meta<typeof PostManagement>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'React Hook Form 사용하기',
    content: 'React Hook Form을 사용한 폼 관리 방법을 알아봅니다.',
    author: '작성자1',
    category: 'development',
    status: 'published',
    views: 150,
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    title: '디자인 시스템 구축',
    content: '일관된 디자인 시스템을 구축하는 방법을 소개합니다.',
    author: '작성자2',
    category: 'design',
    status: 'draft',
    views: 0,
    createdAt: '2024-01-02',
  },
  {
    id: 3,
    title: '웹 접근성 개선',
    content: '웹 접근성을 개선하는 방법을 알아봅니다.',
    author: '작성자3',
    category: 'accessibility',
    status: 'archived',
    views: 80,
    createdAt: '2024-01-03',
  },
  {
    id: 4,
    title: 'TypeScript 활용하기',
    content: 'TypeScript를 활용한 타입 안전한 개발 방법을 소개합니다.',
    author: '작성자1',
    category: 'development',
    status: 'published',
    views: 200,
    createdAt: '2024-01-04',
  },
];

/**
 * 기본 게시글 관리 화면입니다.
 */
export const Default: Story = {
  args: {
    posts: mockPosts,
  },
};

/**
 * 빈 게시글 목록 상태입니다.
 */
export const Empty: Story = {
  args: {
    posts: [],
  },
};

/**
 * 많은 게시글이 있는 상태입니다.
 */
export const ManyPosts: Story = {
  args: {
    posts: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `게시글 ${i + 1}`,
      content: `내용 ${i + 1}`,
      author: `작성자${(i % 3) + 1}`,
      category: ['development', 'design', 'accessibility'][i % 3] as Post['category'],
      status: ['draft', 'published', 'archived'][i % 3] as Post['status'],
      views: i * 10,
      createdAt: `2024-01-${String(i + 1).padStart(2, '0')}`,
    })),
  },
};

