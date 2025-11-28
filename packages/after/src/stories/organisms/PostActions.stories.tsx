import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PostActions } from '../../components/organisms/PostActions';

const meta = {
  title: 'Organisms/PostActions',
  component: PostActions,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
게시글 액션 버튼을 표시하는 Organisms 수준의 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Organisms
- **Composition**: Atoms/Button 컴포넌트를 사용하여 구현
- **Usage**: PostTable에서 사용

## 특징
- 수정, 삭제 버튼 제공
- 상태별 액션 버튼:
  - draft: 게시 버튼
  - published: 보관 버튼
  - archived: 복원 버튼
- 도메인별 비즈니스 로직 포함
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
  },
} satisfies Meta<typeof PostActions>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 임시저장 상태의 게시글 액션 버튼입니다.
 * 게시 버튼이 표시됩니다.
 */
export const Draft: Story = {
  args: {
    post: {
      id: 1,
      title: '임시저장 게시글',
      content: '내용',
      author: '작성자',
      category: 'development',
      status: 'draft',
      views: 0,
      createdAt: '2024-01-01',
    },
  },
};

/**
 * 게시된 상태의 게시글 액션 버튼입니다.
 * 보관 버튼이 표시됩니다.
 */
export const Published: Story = {
  args: {
    post: {
      id: 2,
      title: '게시된 게시글',
      content: '내용',
      author: '작성자',
      category: 'design',
      status: 'published',
      views: 100,
      createdAt: '2024-01-02',
    },
  },
};

/**
 * 보관된 상태의 게시글 액션 버튼입니다.
 * 복원 버튼이 표시됩니다.
 */
export const Archived: Story = {
  args: {
    post: {
      id: 3,
      title: '보관된 게시글',
      content: '내용',
      author: '작성자',
      category: 'accessibility',
      status: 'archived',
      views: 50,
      createdAt: '2024-01-03',
    },
  },
};

