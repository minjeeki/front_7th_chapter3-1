import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { UserManagement } from '../../features/users/UserManagement';
import type { User } from '../../domains/user/types';

const meta = {
  title: 'Features/UserManagement',
  component: UserManagement,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
사용자 관리 기능을 제공하는 Features 수준의 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Features (Templates/Pages)
- **Composition**: 
  - Organisms/UserTable
  - Organisms/UserForm
  - Organisms/UserStats
  - Organisms/DialogContainer
- **Usage**: ManagementPage에서 사용

## 특징
- 사용자 CRUD 기능 통합
- 통계 정보 표시
- 생성/수정 모달 관리
- 비즈니스 규칙 적용 (관리자 삭제 불가)
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onCreate: fn(),
    onUpdate: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof UserManagement>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-12-01',
  },
  {
    id: 2,
    username: 'john_doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-19',
  },
  {
    id: 3,
    username: 'jane_smith',
    email: 'jane@example.com',
    role: 'moderator',
    status: 'active',
    createdAt: '2024-01-10',
    lastLogin: '2024-12-01',
  },
  {
    id: 4,
    username: 'bob',
    email: 'bob@example.com',
    role: 'user',
    status: 'suspended',
    createdAt: '2024-01-15',
    lastLogin: '2024-10-01',
  },
  {
    id: 5,
    username: 'alice',
    email: 'alice@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-20',
  },
];

/**
 * 기본 사용자 관리 화면입니다.
 */
export const Default: Story = {
  args: {
    users: mockUsers,
  },
};

/**
 * 빈 사용자 목록 상태입니다.
 */
export const Empty: Story = {
  args: {
    users: [],
  },
};

/**
 * 많은 사용자가 있는 상태입니다.
 */
export const ManyUsers: Story = {
  args: {
    users: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      username: `user${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i === 0 ? 'admin' : i < 3 ? 'moderator' : 'user',
      status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'inactive' : 'suspended',
      createdAt: `2024-01-${String(i + 1).padStart(2, '0')}`,
      lastLogin: i % 2 === 0 ? `2024-12-${String(i + 1).padStart(2, '0')}` : undefined,
    })),
  },
};

