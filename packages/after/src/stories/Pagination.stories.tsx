import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Pagination } from '../components/molecules/Pagination';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
범용 페이지네이션 컨트롤 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Molecules
- **Composition**: Atoms/Button 컴포넌트를 사용하여 구현
- **Usage**: TableContainer, 리스트, 카드 그리드 등 다양한 곳에서 사용 가능

## 특징
- 현재 페이지와 전체 페이지 수 표시
- 이전/다음 버튼 제공
- 첫 페이지와 마지막 페이지에서 버튼 비활성화
- 총 페이지가 1 이하일 때는 렌더링되지 않음
- TailwindCSS로 스타일링
- 범용적으로 사용 가능한 컴포넌트
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 첫 페이지 상태입니다.
 * 이전 버튼이 비활성화되어 있습니다.
 */
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  render: (args) => {
    const PaginationWrapper = () => {
      const [currentPage, setCurrentPage] = useState(args.currentPage);
      return (
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            args.onPageChange?.(page);
          }}
        />
      );
    };
    return <PaginationWrapper />;
  },
};

/**
 * 중간 페이지 상태입니다.
 * 이전/다음 버튼이 모두 활성화되어 있습니다.
 */
export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
  },
  render: (args) => {
    const PaginationWrapper = () => {
      const [currentPage, setCurrentPage] = useState(args.currentPage);
      return (
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            args.onPageChange?.(page);
          }}
        />
      );
    };
    return <PaginationWrapper />;
  },
};

/**
 * 마지막 페이지 상태입니다.
 * 다음 버튼이 비활성화되어 있습니다.
 */
export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
  },
  render: (args) => {
    const PaginationWrapper = () => {
      const [currentPage, setCurrentPage] = useState(args.currentPage);
      return (
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            args.onPageChange?.(page);
          }}
        />
      );
    };
    return <PaginationWrapper />;
  },
};

/**
 * 많은 페이지를 가진 페이지네이션입니다.
 */
export const ManyPages: Story = {
  args: {
    currentPage: 10,
    totalPages: 20,
  },
  render: (args) => {
    const PaginationWrapper = () => {
      const [currentPage, setCurrentPage] = useState(args.currentPage);
      return (
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            args.onPageChange?.(page);
          }}
        />
      );
    };
    return <PaginationWrapper />;
  },
};

/**
 * 단일 페이지 상태입니다.
 * 총 페이지가 1이므로 렌더링되지 않습니다.
 */
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
  render: (args) => {
    const PaginationWrapper = () => {
      const [currentPage, setCurrentPage] = useState(args.currentPage);
      return (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            총 페이지가 1이므로 페이지네이션이 렌더링되지 않습니다.
          </p>
          <Pagination
            {...args}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
              args.onPageChange?.(page);
            }}
          />
        </div>
      );
    };
    return <PaginationWrapper />;
  },
};

