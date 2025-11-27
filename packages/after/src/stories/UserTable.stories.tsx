import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { UserTable } from '../features/users/components/UserTable';
import type { User } from '../domains/user/types';

const meta = {
  title: 'Features/Users/UserTable',
  component: UserTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
사용자 목록을 테이블 형태로 표시하는 Features 수준의 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Features
- **Composition**: Organisms/Table 컴포넌트를 사용하여 구현
- **Usage**: ManagementPage에서 사용

## 특징
- 사용자 목록을 테이블 형태로 표시
- 역할(role)과 상태(status)를 Badge로 표시
- 수정, 삭제 액션 버튼 제공
- 검색 및 정렬 기능 지원
- 비즈니스 규칙: 관리자는 삭제 불가
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onEdit: fn(),
    onDelete: fn(),
    striped: true,
    hover: true,
    searchable: false,
    sortable: true,
  },
} satisfies Meta<typeof UserTable>;

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
 * 기본 사용자 목록 테이블입니다.
 * 다양한 역할과 상태의 사용자를 표시합니다.
 */
export const Default: Story = {
  args: {
    users: mockUsers,
  },
};

/**
 * 빈 사용자 목록을 표시합니다.
 */
export const Empty: Story = {
  args: {
    users: [],
  },
  parameters: {
    docs: {
      description: {
        story: '사용자가 없을 때 빈 테이블을 표시합니다.',
      },
    },
  },
};

/**
 * 검색 기능이 활성화된 테이블입니다.
 */
export const WithSearch: Story = {
  args: {
    users: mockUsers,
    searchable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '검색 입력창이 표시되어 사용자 목록을 필터링할 수 있습니다.',
      },
    },
  },
};

/**
 * 정렬 기능이 비활성화된 테이블입니다.
 */
export const WithoutSorting: Story = {
  args: {
    users: mockUsers,
    sortable: false,
  },
  parameters: {
    docs: {
      description: {
        story: '컬럼 헤더를 클릭해도 정렬되지 않습니다.',
      },
    },
  },
};

/**
 * 스트라이프와 호버 효과가 없는 테이블입니다.
 */
export const Plain: Story = {
  args: {
    users: mockUsers,
    striped: false,
    hover: false,
  },
  parameters: {
    docs: {
      description: {
        story: '스트라이프 배경과 호버 효과가 없는 단순한 테이블입니다.',
      },
    },
  },
};

/**
 * 많은 사용자를 표시하는 테이블입니다.
 */
export const ManyUsers: Story = {
  args: {
    users: [
      ...mockUsers,
      {
        id: 6,
        username: 'charlie',
        email: 'charlie@example.com',
        role: 'user',
        status: 'active',
        createdAt: '2024-02-01',
        lastLogin: '2024-12-01',
      },
      {
        id: 7,
        username: 'diana',
        email: 'diana@example.com',
        role: 'moderator',
        status: 'active',
        createdAt: '2024-02-05',
        lastLogin: '2024-12-01',
      },
      {
        id: 8,
        username: 'eve',
        email: 'eve@example.com',
        role: 'user',
        status: 'suspended',
        createdAt: '2024-02-10',
        lastLogin: '2024-11-15',
      },
      {
        id: 9,
        username: 'frank',
        email: 'frank@example.com',
        role: 'user',
        status: 'inactive',
        createdAt: '2024-02-15',
      },
      {
        id: 10,
        username: 'grace',
        email: 'grace@example.com',
        role: 'user',
        status: 'active',
        createdAt: '2024-02-20',
        lastLogin: '2024-12-01',
      },
    ],
    searchable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '많은 사용자를 표시할 때 페이지네이션이 자동으로 적용됩니다.',
      },
    },
  },
};

