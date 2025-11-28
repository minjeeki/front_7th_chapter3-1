import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatsCard, StatsGrid } from '../../components/molecules/StatsCard';

const meta = {
  title: 'Molecules/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
통계 정보를 표시하는 카드 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Molecules
- **Composition**: UI/Atoms/Card 컴포넌트를 사용하여 구현
- **Usage**: PostStats, UserStats 등에서 사용

## 특징
- 다양한 색상 variant 지원 (blue, green, orange, red, gray)
- 반응형 그리드 레이아웃 지원 (StatsGrid)
- 재사용 가능한 통계 카드 컴포넌트
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'green', 'orange', 'red', 'gray'],
      description: '카드의 색상 variant',
    },
  },
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 통계 카드입니다.
 */
export const Default: Story = {
  args: {
    label: '전체',
    value: 1234,
    variant: 'blue',
  },
};

/**
 * 다양한 variant 스타일입니다.
 */
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      <StatsCard label="전체" value={1234} variant="blue" />
      <StatsCard label="활성" value={856} variant="green" />
      <StatsCard label="대기" value={378} variant="orange" />
      <StatsCard label="정지" value={45} variant="red" />
      <StatsCard label="관리자" value={12} variant="gray" />
    </div>
  ),
};

/**
 * StatsGrid를 사용한 통계 그리드입니다.
 * PostStats, UserStats에서 사용하는 패턴입니다.
 */
export const StatsGridExample: Story = {
  render: () => (
    <StatsGrid
      stats={[
        { label: '전체', value: 1234 },
        { label: '활성', value: 856 },
        { label: '대기', value: 378 },
        { label: '정지', value: 45 },
        { label: '관리자', value: 12 },
      ]}
      variantOrder={['blue', 'green', 'orange', 'red', 'gray']}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'StatsGrid 컴포넌트를 사용하여 여러 통계 카드를 그리드로 배치합니다.',
      },
    },
  },
};

