import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { UserForm } from '../features/users/components/UserForm';
import type { User } from '../domains/user/types';

const meta = {
  title: 'Features/Users/UserForm',
  component: UserForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
사용자 생성 및 수정 폼을 제공하는 Features 수준의 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Features
- **Composition**: 
  - UI/Form (shadcn/ui) - react-hook-form 통합
  - UI/Input, UI/Select, UI/Button (shadcn/ui)
- **Usage**: ManagementPage의 Modal에서 사용

## 특징
- react-hook-form + zod를 사용한 타입 안전한 폼 검증
- shadcn/ui Form 컴포넌트를 직접 사용하여 일관성 있는 폼 관리
- 사용자 생성 및 수정 모드 지원
- 실시간 검증 및 에러 메시지 표시
- 비즈니스 규칙 검증 (예약된 사용자명, 이메일 도메인 등)
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser: User = {
  id: 1,
  username: 'john_doe',
  email: 'john@example.com',
  role: 'user',
  status: 'active',
  createdAt: '2024-01-01',
  lastLogin: '2024-12-01',
};

/**
 * 사용자 생성 폼입니다.
 * 모든 필드를 입력하여 새 사용자를 생성할 수 있습니다.
 */
export const Create: Story = {
  args: {
    submitLabel: '생성',
    cancelLabel: '취소',
  },
};

/**
 * 사용자 수정 폼입니다.
 * 기존 사용자 정보가 기본값으로 채워져 있습니다.
 */
export const Edit: Story = {
  args: {
    user: mockUser,
    submitLabel: '수정 완료',
    cancelLabel: '취소',
  },
};

/**
 * 관리자 사용자 수정 폼입니다.
 */
export const EditAdmin: Story = {
  args: {
    user: {
      ...mockUser,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
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

