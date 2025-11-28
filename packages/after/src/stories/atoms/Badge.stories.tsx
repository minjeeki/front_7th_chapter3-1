import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../../components/ui/badge';

const meta = {
  title: 'UI/Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
shadcn/ui 기반의 Badge 컴포넌트입니다. 상태, 카테고리, 태그 등을 표시하는 데 사용됩니다.

## Atomic Design 구조
- **Level**: Atoms (UI)
- **Location**: \`components/ui/badge.tsx\`
- **Used By**: 
  - Organisms/PostTable (카테고리, 상태 표시)
  - Organisms/UserTable (역할, 상태 표시)

## 특징
- CVA를 사용한 variant 시스템
- TailwindCSS 기반 스타일링
- 다양한 variant 지원 (default, secondary, destructive, outline)
- 아이콘과 함께 사용 가능
- 링크로 사용 가능 (asChild prop)

## 사용 예시
이 컴포넌트는 테이블에서 상태를 표시하는 데 사용됩니다:
- \`Organisms/PostTable\`: 게시글 카테고리, 상태 표시
- \`Organisms/UserTable\`: 사용자 역할, 상태 표시
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Badge의 스타일 variant',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Badge입니다.
 */
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

/**
 * 다양한 variant 스타일입니다.
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 실제 서비스에서 사용하는 패턴입니다.
 * PostTable에서 사용하는 카테고리 Badge입니다.
 */
export const PostCategories: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">개발</Badge>
      <Badge variant="secondary">디자인</Badge>
      <Badge variant="destructive">접근성</Badge>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'PostTable에서 게시글 카테고리를 표시할 때 사용합니다.',
      },
    },
  },
};

/**
 * 실제 서비스에서 사용하는 패턴입니다.
 * PostTable, UserTable에서 사용하는 상태 Badge입니다.
 */
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">게시글 상태</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">임시저장</Badge>
          <Badge variant="default">게시됨</Badge>
          <Badge variant="outline">보관됨</Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">사용자 상태</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">활성</Badge>
          <Badge variant="secondary">비활성</Badge>
          <Badge variant="destructive">정지</Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">사용자 역할</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="destructive">관리자</Badge>
          <Badge variant="secondary">운영자</Badge>
          <Badge variant="default">사용자</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'PostTable과 UserTable에서 상태와 역할을 표시할 때 사용합니다.',
      },
    },
  },
};

/**
 * 아이콘과 함께 사용하는 Badge입니다.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        새로고침
      </Badge>
      <Badge variant="secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
        </svg>
        좋아요
      </Badge>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

