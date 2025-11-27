import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PostTable } from '../features/posts/components/PostTable';
import type { Post } from '../domains/post/types';

const meta = {
  title: 'Features/Posts/PostTable',
  component: PostTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
게시글 목록을 테이블 형태로 표시하는 Features 수준의 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Features
- **Composition**: Organisms/Table 컴포넌트를 사용하여 구현
- **Usage**: ManagementPage에서 사용

## 특징
- 게시글 목록을 테이블 형태로 표시
- 카테고리와 상태를 Badge로 표시
- 조회수를 숫자 형식으로 표시
- 수정, 삭제, 게시, 보관, 복원 액션 버튼 제공
- 검색 및 정렬 기능 지원
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onEdit: fn(),
    onDelete: fn(),
    onPublish: fn(),
    onArchive: fn(),
    onRestore: fn(),
    striped: true,
    hover: true,
    searchable: false,
    sortable: true,
  },
} satisfies Meta<typeof PostTable>;

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
 * 기본 게시글 목록 테이블입니다.
 * 다양한 상태와 카테고리의 게시글을 표시합니다.
 */
export const Default: Story = {
  args: {
    posts: mockPosts,
  },
};

/**
 * 빈 게시글 목록을 표시합니다.
 */
export const Empty: Story = {
  args: {
    posts: [],
  },
  parameters: {
    docs: {
      description: {
        story: '게시글이 없을 때 빈 테이블을 표시합니다.',
      },
    },
  },
};

/**
 * 검색 기능이 활성화된 테이블입니다.
 */
export const WithSearch: Story = {
  args: {
    posts: mockPosts,
    searchable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '검색 입력창이 표시되어 게시글 목록을 필터링할 수 있습니다.',
      },
    },
  },
};

/**
 * 많은 게시글을 표시하는 테이블입니다.
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
    searchable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '많은 게시글을 표시할 때 페이지네이션이 자동으로 적용됩니다.',
      },
    },
  },
};

