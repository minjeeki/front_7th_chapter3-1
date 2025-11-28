import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from '../../components/organisms/Header';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
애플리케이션의 헤더 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Organisms
- **Composition**: UI/Atoms 컴포넌트들을 조합하여 구현
- **Usage**: ManagementPage 등에서 사용

## 특징
- 고정 헤더 (sticky)
- 로고 및 브랜딩 정보
- 사용자 정보 표시
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 헤더입니다.
 */
export const Default: Story = {};

