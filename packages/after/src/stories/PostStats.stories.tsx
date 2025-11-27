import type { Meta, StoryObj } from '@storybook/react-vite';
import { PostStats } from '../features/posts/components/PostStats';
import type { Post } from '../domains/post/types';

const meta = {
  title: 'Features/Posts/PostStats',
  component: PostStats,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
게시글 통계를 표시하는 Features 수준의 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Features
- **Composition**: UI/Atoms/Card 컴포넌트를 사용하여 구현
- **Usage**: ManagementPage의 게시글 관리 탭에서 사용

## 특징
- 게시글 통계를 5개의 카드로 표시
- 전체, 게시됨, 임시저장, 보관됨, 총 조회수를 각각 표시
- 색상으로 상태를 구분 (파랑: 전체/조회수, 초록: 게시됨, 주황: 임시저장, 빨강: 보관됨)
- 반응형 그리드 레이아웃 (auto-fit, minmax(130px, 1fr))
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostStats>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 게시글 통계 카드입니다.
 */
export const Default: Story = {
  args: {
    posts: [
      {
        id: 1,
        title: 'React 19 새로운 기능',
        content: 'React 19의 새로운 기능들을 소개합니다.',
        author: '개발자1',
        category: 'development',
        status: 'published',
        views: 1234,
        createdAt: '2024-11-01',
        updatedAt: '2024-11-02',
      },
      {
        id: 2,
        title: '디자인 시스템 구축 가이드',
        content: '효과적인 디자인 시스템을 구축하는 방법을 알아봅니다.',
        author: '디자이너1',
        category: 'design',
        status: 'published',
        views: 856,
        createdAt: '2024-11-05',
        updatedAt: '2024-11-06',
      },
      {
        id: 3,
        title: '작성 중인 글',
        content: '아직 작성 중입니다.',
        author: '개발자2',
        category: 'development',
        status: 'draft',
        views: 0,
        createdAt: '2024-11-10',
      },
      {
        id: 4,
        title: '접근성 개선 방법',
        content: '웹 접근성을 개선하는 방법을 설명합니다.',
        author: '디자이너2',
        category: 'accessibility',
        status: 'published',
        views: 567,
        createdAt: '2024-11-15',
        updatedAt: '2024-11-16',
      },
      {
        id: 5,
        title: '보관된 글',
        content: '이미 보관된 글입니다.',
        author: '개발자1',
        category: 'development',
        status: 'archived',
        views: 234,
        createdAt: '2024-10-01',
        updatedAt: '2024-10-15',
      },
      {
        id: 6,
        title: '또 다른 임시저장 글',
        content: '임시저장 중입니다.',
        author: '개발자3',
        category: 'development',
        status: 'draft',
        views: 0,
        createdAt: '2024-11-20',
      },
    ],
  },
};

/**
 * 빈 게시글 목록일 때의 상태입니다.
 */
export const Empty: Story = {
  args: {
    posts: [],
  },
};

/**
 * 많은 게시글이 있을 때의 상태입니다.
 */
export const ManyPosts: Story = {
  args: {
    posts: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      title: `게시글 ${i + 1}`,
      content: `게시글 ${i + 1}의 내용입니다.`,
      author: `작성자${(i % 5) + 1}`,
      category: ['development', 'design', 'accessibility'][i % 3] as Post['category'],
      status: ['draft', 'published', 'archived'][i % 3] as Post['status'],
      views: i * 10,
      createdAt: `2024-11-${String((i % 30) + 1).padStart(2, '0')}`,
      updatedAt: i % 2 === 0 ? `2024-11-${String((i % 30) + 1).padStart(2, '0')}` : undefined,
    })) as Post[],
  },
};

