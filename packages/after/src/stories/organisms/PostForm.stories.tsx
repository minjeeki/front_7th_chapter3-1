import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PostForm } from '../../components/organisms/PostForm';
import type { Post } from '../../domains/post/types';

const meta = {
  title: 'Organisms/PostForm',
  component: PostForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
게시글 생성 및 수정 폼을 제공하는 Organisms 수준의 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Organisms
- **Composition**: 
  - UI/Form (shadcn/ui) - react-hook-form 통합
  - UI/Input, UI/Select, UI/Textarea, UI/Button (shadcn/ui)
- **Usage**: ManagementPage의 Modal에서 사용

## 특징
- react-hook-form + zod를 사용한 타입 안전한 폼 검증
- shadcn/ui Form 컴포넌트를 직접 사용하여 일관성 있는 폼 관리
- 게시글 생성 및 수정 모드 지원
- 실시간 검증 및 에러 메시지 표시
- 비즈니스 규칙 검증 (금지된 단어 등)
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof PostForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPost: Post = {
  id: 1,
  title: 'React Hook Form 사용하기',
  content: 'React Hook Form을 사용한 폼 관리 방법을 알아봅니다.',
  author: '작성자1',
  category: 'development',
  status: 'published',
  views: 150,
  createdAt: '2024-01-01',
};

/**
 * 게시글 생성 폼입니다.
 * 모든 필드를 입력하여 새 게시글을 생성할 수 있습니다.
 */
export const Create: Story = {
  args: {
    submitLabel: '생성',
    cancelLabel: '취소',
  },
};

/**
 * 게시글 수정 폼입니다.
 * 기존 게시글 정보가 기본값으로 채워져 있습니다.
 */
export const Edit: Story = {
  args: {
    post: mockPost,
    submitLabel: '수정 완료',
    cancelLabel: '취소',
  },
};

/**
 * 임시저장 상태의 게시글 수정 폼입니다.
 */
export const EditDraft: Story = {
  args: {
    post: {
      ...mockPost,
      status: 'draft',
    },
    submitLabel: '수정 완료',
    cancelLabel: '취소',
  },
};

/**
 * 취소 버튼이 없는 폼입니다.
 */
export const WithoutCancel: Story = {
  args: {
    onCancel: undefined,
    submitLabel: '저장',
  },
};

