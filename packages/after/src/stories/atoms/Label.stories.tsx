import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';

const meta = {
  title: 'UI/Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
shadcn/ui 기반의 Label 컴포넌트입니다. 폼 필드의 레이블을 표시하는 데 사용됩니다.

## Atomic Design 구조
- **Level**: Atoms (UI)
- **Location**: \`components/ui/label.tsx\`
- **Used By**: 
  - Organisms/PostForm, Organisms/UserForm
  - Molecules/FormField (react-hook-form과 함께 사용)

## 특징
- Radix UI 기반 (접근성 내장)
- TailwindCSS 기반 스타일링
- Input과 자동 연결 (htmlFor 속성)
- disabled 상태 지원
- 선택 불가능 (select-none)

## 사용 예시
이 컴포넌트는 Form 컴포넌트와 함께 사용됩니다:
- \`Organisms/PostForm\`: 게시글 폼 필드 레이블
- \`Organisms/UserForm\`: 사용자 폼 필드 레이블
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: '연결할 input 요소의 id',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Label입니다.
 */
export const Default: Story = {
  args: {
    children: 'Label',
  },
};

/**
 * Input과 함께 사용하는 패턴입니다.
 */
export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[350px]">
      <Label htmlFor="email">이메일</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 필수 필드를 표시하는 패턴입니다.
 */
export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <div>
        <Label htmlFor="username">
          사용자명
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Input id="username" placeholder="사용자명을 입력하세요" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="email">
          이메일
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Input id="email" type="email" placeholder="email@example.com" className="mt-1" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '필수 필드를 표시할 때 빨간색 별표(*)를 추가합니다.',
      },
    },
  },
};

/**
 * 실제 서비스에서 사용하는 패턴입니다.
 * PostForm, UserForm에서 사용하는 스타일입니다.
 */
export const InForm: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <div>
        <Label htmlFor="title">
          제목
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Input
          id="title"
          placeholder="게시글 제목을 입력하세요"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="author">
          작성자
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Input
          id="author"
          placeholder="작성자명"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="category">카테고리</Label>
        <Input
          id="category"
          placeholder="카테고리 선택"
          className="mt-1"
          disabled
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Form 컴포넌트와 함께 사용할 때의 패턴입니다.',
      },
    },
  },
};

