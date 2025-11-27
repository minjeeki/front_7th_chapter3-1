import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/ui/button';

const meta = {
  title: 'UI/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
shadcn/ui 기반의 Button 컴포넌트입니다. 다양한 액션을 수행하는 버튼에 사용됩니다.

## Atomic Design 구조
- **Level**: Atoms (UI)
- **Location**: \`components/ui/button.tsx\`
- **Used By**: Features 수준의 컴포넌트들 (UserActions, PostActions 등)

## 특징
- TailwindCSS 기반 스타일링
- \`cn\` 유틸리티를 통한 클래스 병합 지원
- 완전히 커스터마이징 가능한 스타일
- 접근성을 고려한 구조
- 다양한 variant와 size 지원

## 사용 예시
이 컴포넌트는 Features 수준의 컴포넌트에서 사용됩니다:
- \`Features/Users/UserActions\`: 사용자 액션 버튼
- \`Features/Posts/PostActions\`: 게시글 액션 버튼
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: '버튼의 스타일 variant',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: '버튼의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 버튼입니다.
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

/**
 * 다양한 variant 스타일입니다.
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 다양한 크기입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * 비활성화된 버튼입니다.
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button disabled>Disabled</Button>
      <Button variant="destructive" disabled>
        Disabled Destructive
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
    </div>
  ),
};

/**
 * 아이콘 버튼입니다.
 */
export const Icon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button size="icon" variant="outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
      </Button>
      <Button size="icon" variant="ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
        </svg>
      </Button>
    </div>
  ),
};

/**
 * 실제 서비스에서 사용하는 패턴입니다.
 * UserActions에서 사용하는 버튼 스타일입니다.
 */
export const InUserActions: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button size="sm" variant="default">
        수정
      </Button>
      <Button size="sm" variant="destructive">
        삭제
      </Button>
      <Button size="sm" variant="destructive" disabled>
        삭제 (비활성)
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
UserActions 컴포넌트에서 사용하는 버튼 스타일입니다.
- 수정: default variant, sm size
- 삭제: destructive variant, sm size
- 삭제 (비활성): destructive variant, disabled (관리자 등)
        `,
      },
    },
  },
};

/**
 * 커스텀 스타일을 적용한 버튼입니다.
 */
export const CustomStyled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        Gradient Button
      </Button>
      <Button className="w-full max-w-xs">Full Width (max-width)</Button>
      <Button className="rounded-full px-8">Rounded Full</Button>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

