import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const meta = {
  title: 'UI/Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
shadcn/ui 기반의 Input 컴포넌트입니다. 텍스트 입력 필드에 사용됩니다.

## Atomic Design 구조
- **Level**: Atoms (UI)
- **Location**: \`components/ui/input.tsx\`
- **Used By**: 
  - Organisms/PostForm, Organisms/UserForm
  - Molecules/FormField (react-hook-form과 함께 사용)

## 특징
- TailwindCSS 기반 스타일링
- 접근성 고려 (aria-invalid 지원)
- 포커스 상태 시각적 피드백
- disabled 상태 지원
- 파일 입력 지원
- 다크 모드 지원

## 사용 예시
이 컴포넌트는 Form 컴포넌트와 함께 사용됩니다:
- \`Organisms/PostForm\`: 게시글 제목, 작성자 입력
- \`Organisms/UserForm\`: 사용자명, 이메일 입력
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'file'],
      description: '입력 필드 타입',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 입력 필드입니다.
 */
export const Default: Story = {
  args: {
    placeholder: '입력하세요...',
  },
};

/**
 * 다양한 입력 타입입니다.
 */
export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <div>
        <Label htmlFor="text">텍스트</Label>
        <Input id="text" type="text" placeholder="텍스트를 입력하세요" />
      </div>
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" placeholder="email@example.com" />
      </div>
      <div>
        <Label htmlFor="password">비밀번호</Label>
        <Input id="password" type="password" placeholder="비밀번호를 입력하세요" />
      </div>
      <div>
        <Label htmlFor="number">숫자</Label>
        <Input id="number" type="number" placeholder="숫자를 입력하세요" />
      </div>
      <div>
        <Label htmlFor="search">검색</Label>
        <Input id="search" type="search" placeholder="검색어를 입력하세요" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 비활성화된 입력 필드입니다.
 */
export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 입력 필드',
    disabled: true,
    defaultValue: '수정할 수 없습니다',
  },
};

/**
 * 에러 상태의 입력 필드입니다.
 */
export const Error: Story = {
  args: {
    placeholder: '에러가 있는 입력 필드',
    'aria-invalid': true,
    defaultValue: '잘못된 값',
  },
  parameters: {
    docs: {
      description: {
        story: 'aria-invalid 속성을 사용하여 에러 상태를 표시합니다.',
      },
    },
  },
};

/**
 * Label과 함께 사용하는 패턴입니다.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[350px]">
      <Label htmlFor="username">사용자명</Label>
      <Input id="username" placeholder="사용자명을 입력하세요" />
    </div>
  ),
  parameters: {
    layout: 'padded',
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

