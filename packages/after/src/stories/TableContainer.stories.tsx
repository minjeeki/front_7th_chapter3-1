import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TableContainer } from '../components/organisms/TableContainer';

const meta = {
  title: 'Organisms/TableContainer',
  component: TableContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
검색, 정렬, 페이지네이션 기능을 포함한 테이블 컨테이너 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Organisms
- **Composition**: 
  - UI/Atoms/Table (shadcn/ui)
  - UI/Atoms/Input (shadcn/ui)
  - Molecules/Pagination
  - hooks/useTableSort
- **Usage**: UserTable, PostTable에서 사용

## 특징
- shadcn/ui Table 컴포넌트 사용
- 검색, 정렬, 페이지네이션 기능 통합
- 커스텀 셀 렌더링 지원
- 스트라이프 및 호버 효과 지원
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onRowClick: fn(),
  },
} satisfies Meta<typeof TableContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

interface SampleData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleColumns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'name', header: '이름' },
  { key: 'email', header: '이메일' },
  { key: 'role', header: '역할', width: '120px' },
  { key: 'status', header: '상태', width: '120px' },
];

const sampleData: SampleData[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자', status: '활성' },
  { id: 2, name: '김철수', email: 'kim@example.com', role: '사용자', status: '활성' },
  { id: 3, name: '이영희', email: 'lee@example.com', role: '사용자', status: '비활성' },
  { id: 4, name: '박민수', email: 'park@example.com', role: '운영자', status: '활성' },
  { id: 5, name: '정수진', email: 'jung@example.com', role: '사용자', status: '활성' },
];

/**
 * 기본 테이블입니다.
 * 검색, 정렬, 페이지네이션 기능이 모두 비활성화되어 있습니다.
 */
export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    searchable: false,
    sortable: false,
    striped: false,
    hover: false,
  },
};

/**
 * 검색 기능이 활성화된 테이블입니다.
 */
export const WithSearch: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    searchable: true,
    sortable: false,
    striped: true,
    hover: true,
  },
};

/**
 * 정렬 기능이 활성화된 테이블입니다.
 */
export const WithSorting: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    searchable: false,
    sortable: true,
    striped: true,
    hover: true,
  },
};

/**
 * 검색과 정렬 기능이 모두 활성화된 테이블입니다.
 */
export const WithSearchAndSorting: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    searchable: true,
    sortable: true,
    striped: true,
    hover: true,
  },
};

/**
 * 페이지네이션이 적용된 테이블입니다.
 * pageSize를 3으로 설정하여 페이지네이션이 표시됩니다.
 */
export const WithPagination: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    searchable: false,
    sortable: false,
    striped: true,
    hover: true,
    pageSize: 3,
  },
};

/**
 * 모든 기능이 활성화된 테이블입니다.
 */
export const FullFeatured: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    searchable: true,
    sortable: true,
    striped: true,
    hover: true,
    pageSize: 3,
  },
};

/**
 * 빈 데이터 테이블입니다.
 */
export const Empty: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    searchable: true,
    sortable: true,
    striped: true,
    hover: true,
  },
};

/**
 * 많은 데이터를 가진 테이블입니다.
 */
export const ManyRows: Story = {
  args: {
    columns: sampleColumns,
    data: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `사용자 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? '관리자' : i % 3 === 1 ? '운영자' : '사용자',
      status: i % 2 === 0 ? '활성' : '비활성',
    })),
    searchable: true,
    sortable: true,
    striped: true,
    hover: true,
    pageSize: 10,
  },
};

/**
 * 커스텀 셀 렌더링을 사용하는 테이블입니다.
 */
export const WithCustomRender: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    searchable: true,
    sortable: true,
    striped: true,
    hover: true,
    renderCell: (row, columnKey) => {
      const data = row as SampleData;
      if (columnKey === 'status') {
        const status = data[columnKey as keyof SampleData] as string;
        const color = status === '활성' ? 'text-green-600' : 'text-gray-600';
        return <span className={color}>{status}</span>;
      }
      return data[columnKey as keyof SampleData];
    },
  },
};

