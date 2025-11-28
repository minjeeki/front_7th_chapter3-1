import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';

const meta = {
  title: 'UI/Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
shadcn/ui 기반의 Textarea 컴포넌트입니다. 여러 줄 텍스트 입력에 사용됩니다.

## Atomic Design 구조
- **Level**: Atoms (UI)
- **Location**: \`components/ui/textarea.tsx\`
- **Used By**: 
  - Organisms/PostForm (게시글 내용 입력)

## 특징
- TailwindCSS 기반 스타일링
- 접근성 고려 (aria-invalid 지원)
- 포커스 상태 시각적 피드백
- disabled 상태 지원
- 자동 크기 조절 (field-sizing-content)
- 다크 모드 지원

## 사용 예시
이 컴포넌트는 Form 컴포넌트와 함께 사용됩니다:
- \`Organisms/PostForm\`: 게시글 내용 입력
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    rows: {
      control: 'number',
      description: '초기 행 수',
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Textarea입니다.
 */
export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요...',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * 다양한 크기의 Textarea입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <div>
        <Label htmlFor="small">작은 크기 (3줄)</Label>
        <Textarea
          id="small"
          rows={3}
          placeholder="작은 텍스트 영역"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="medium">중간 크기 (6줄)</Label>
        <Textarea
          id="medium"
          rows={6}
          placeholder="중간 텍스트 영역"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="large">큰 크기 (10줄)</Label>
        <Textarea
          id="large"
          rows={10}
          placeholder="큰 텍스트 영역"
          className="mt-1"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 비활성화된 Textarea입니다.
 */
export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 텍스트 영역',
    disabled: true,
    defaultValue: '이 내용은 수정할 수 없습니다.',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * 에러 상태의 Textarea입니다.
 */
export const Error: Story = {
  args: {
    placeholder: '에러가 있는 텍스트 영역',
    'aria-invalid': true,
    defaultValue: '잘못된 내용',
  },
  parameters: {
    layout: 'padded',
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
      <Label htmlFor="content">내용</Label>
      <Textarea
        id="content"
        rows={6}
        placeholder="내용을 입력하세요"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 실제 서비스에서 사용하는 패턴입니다.
 * PostForm에서 사용하는 스타일입니다.
 */
export const InPostForm: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[350px]">
      <Label htmlFor="post-content">내용</Label>
      <Textarea
        id="post-content"
        rows={6}
        placeholder="게시글 내용을 입력하세요"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'PostForm에서 게시글 내용을 입력할 때 사용합니다.',
      },
    },
  },
};

