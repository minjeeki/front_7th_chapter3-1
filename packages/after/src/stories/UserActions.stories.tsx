import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { UserActions } from '../features/users/components/UserActions';

const meta = {
  title: 'Features/Users/UserActions',
  component: UserActions,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
사용자 액션 버튼을 표시하는 Features 수준의 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Features
- **Composition**: Atoms/Button 컴포넌트를 사용하여 구현
- **Usage**: UserTable에서 사용

## 특징
- 수정, 삭제 버튼 제공
- 비즈니스 규칙: 관리자(admin)는 삭제 불가
- 도메인별 비즈니스 로직 포함
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onEdit: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof UserActions>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 일반 사용자의 액션 버튼입니다.
 * 수정과 삭제 버튼이 모두 활성화되어 있습니다.
 */
export const RegularUser: Story = {
  args: {
    user: {
      id: 1,
      username: 'user1',
      email: 'user1@example.com',
      role: 'user',
      status: 'active',
      createdAt: '2024-01-01',
      lastLogin: '2024-12-01',
    },
  },
};

/**
 * 운영자(moderator)의 액션 버튼입니다.
 * 수정과 삭제 버튼이 모두 활성화되어 있습니다.
 */
export const Moderator: Story = {
  args: {
    user: {
      id: 2,
      username: 'moderator1',
      email: 'moderator1@example.com',
      role: 'moderator',
      status: 'active',
      createdAt: '2024-01-02',
      lastLogin: '2024-12-01',
    },
  },
};

/**
 * 관리자(admin)의 액션 버튼입니다.
 * 삭제 버튼이 비활성화되어 있습니다 (비즈니스 규칙).
 */
export const Admin: Story = {
  args: {
    user: {
      id: 3,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-01',
      lastLogin: '2024-12-01',
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
관리자는 삭제할 수 없습니다. 이는 비즈니스 규칙에 따라 구현된 기능입니다.
삭제 버튼이 비활성화(disabled) 상태로 표시됩니다.
        `,
      },
    },
  },
};

/**
 * 비활성 상태의 사용자 액션 버튼입니다.
 */
export const InactiveUser: Story = {
  args: {
    user: {
      id: 4,
      username: 'inactive_user',
      email: 'inactive@example.com',
      role: 'user',
      status: 'inactive',
      createdAt: '2024-01-03',
      lastLogin: '2024-11-15',
    },
  },
};

/**
 * 정지된 사용자의 액션 버튼입니다.
 */
export const SuspendedUser: Story = {
  args: {
    user: {
      id: 5,
      username: 'suspended_user',
      email: 'suspended@example.com',
      role: 'user',
      status: 'suspended',
      createdAt: '2024-01-04',
      lastLogin: '2024-10-01',
    },
  },
};

