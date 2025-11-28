import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/alert';

const meta = {
  title: 'UI/Atoms/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
shadcn/ui 기반의 Alert 컴포넌트입니다. 사용자에게 중요한 정보나 경고를 표시하는 데 사용됩니다.

## Atomic Design 구조
- **Level**: Atoms (UI)
- **Location**: \`components/ui/alert.tsx\`
- **Used By**: 
  - Pages/ManagementPage (알림 메시지 표시)

## 구성 요소
- \`Alert\`: 메인 컨테이너
- \`AlertTitle\`: 알림 제목
- \`AlertDescription\`: 알림 설명

## 특징
- CVA를 사용한 variant 시스템
- TailwindCSS 기반 스타일링
- 접근성 고려 (role="alert")
- 아이콘과 함께 사용 가능
- 다양한 variant 지원 (default, destructive)

## 사용 예시
이 컴포넌트는 알림 메시지를 표시하는 데 사용됩니다:
- \`Pages/ManagementPage\`: 성공/에러 알림 표시
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Alert의 스타일 variant',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Alert입니다.
 */
export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>알림</AlertTitle>
      <AlertDescription>
        이것은 기본 알림 메시지입니다.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 성공 메시지 Alert입니다.
 */
export const Success: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>성공</AlertTitle>
      <AlertDescription>
        작업이 성공적으로 완료되었습니다.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 에러 메시지 Alert입니다.
 */
export const Error: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[400px]">
      <AlertTitle>오류</AlertTitle>
      <AlertDescription>
        작업을 완료하는 중 오류가 발생했습니다.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 아이콘과 함께 사용하는 Alert입니다.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <Alert>
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
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        <AlertTitle>정보</AlertTitle>
        <AlertDescription>
          이것은 정보를 제공하는 알림입니다.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
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
          <circle cx="12" cy="12" r="10" />
          <path d="m12 8 0 4" />
          <path d="m12 16 0.01 0" />
        </svg>
        <AlertTitle>경고</AlertTitle>
        <AlertDescription>
          이것은 경고 메시지입니다.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 실제 서비스에서 사용하는 패턴입니다.
 * ManagementPage에서 사용하는 알림 스타일입니다.
 */
export const InManagementPage: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[400px]">
      <Alert>
        <AlertTitle>성공</AlertTitle>
        <AlertDescription>
          사용자가 성공적으로 생성되었습니다.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>오류</AlertTitle>
        <AlertDescription>
          사용자 생성 중 오류가 발생했습니다.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'ManagementPage에서 성공/에러 알림을 표시할 때 사용합니다.',
      },
    },
  },
};

