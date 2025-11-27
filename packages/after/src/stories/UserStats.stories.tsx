import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserStats } from '../features/users/components/UserStats';
import type { User } from '../domains/user/types';

const meta = {
  title: 'Features/Users/UserStats',
  component: UserStats,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
사용자 통계를 표시하는 Features 수준의 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Features
- **Composition**: UI/Atoms/Card 컴포넌트를 사용하여 구현
- **Usage**: ManagementPage의 사용자 관리 탭에서 사용

## 특징
- 사용자 통계를 5개의 카드로 표시
- 전체, 활성, 비활성, 정지, 관리자 수를 각각 표시
- 색상으로 상태를 구분 (파랑: 전체, 초록: 활성, 주황: 비활성, 빨강: 정지, 회색: 관리자)
- 반응형 그리드 레이아웃 (auto-fit, minmax(130px, 1fr))
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserStats>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 사용자 통계 카드입니다.
 */
export const Default: Story = {
  args: {
    users: [
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
        username: 'user1',
        email: 'user1@example.com',
        role: 'user',
        status: 'active',
        createdAt: '2024-01-02',
        lastLogin: '2024-11-30',
      },
      {
        id: 3,
        username: 'user2',
        email: 'user2@example.com',
        role: 'user',
        status: 'inactive',
        createdAt: '2024-01-03',
        lastLogin: '2024-11-15',
      },
      {
        id: 4,
        username: 'moderator1',
        email: 'moderator1@example.com',
        role: 'moderator',
        status: 'active',
        createdAt: '2024-01-04',
        lastLogin: '2024-12-01',
      },
      {
        id: 5,
        username: 'suspended_user',
        email: 'suspended@example.com',
        role: 'user',
        status: 'suspended',
        createdAt: '2024-01-05',
        lastLogin: '2024-10-01',
      },
    ],
  },
};

/**
 * 빈 사용자 목록일 때의 상태입니다.
 */
export const Empty: Story = {
  args: {
    users: [],
  },
};

/**
 * 많은 사용자가 있을 때의 상태입니다.
 */
export const ManyUsers: Story = {
  args: {
    users: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      username: `user${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i === 0 ? 'admin' : i < 5 ? 'moderator' : 'user',
      status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'inactive' : 'suspended',
      createdAt: `2024-01-${String(i + 1).padStart(2, '0')}`,
      lastLogin: `2024-11-${String(i + 1).padStart(2, '0')}`,
    })) as User[],
  },
};

