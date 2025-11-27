import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Search } from '../components/molecules/Search';

const meta = {
  title: 'Molecules/Search',
  component: Search,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
범용 검색 입력 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Molecules
- **Composition**: UI/Atoms/Input 컴포넌트를 사용하여 구현
- **Usage**: TableContainer, 리스트, 카드 그리드 등 다양한 곳에서 사용 가능

## 특징
- shadcn/ui Input 컴포넌트 사용
- 검색어 입력 및 변경 이벤트 처리
- TailwindCSS로 스타일링
- 범용적으로 사용 가능한 컴포넌트
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 검색 입력 컴포넌트입니다.
 */
export const Default: Story = {
  args: {
    value: '',
    placeholder: '검색...',
  },
  render: (args) => {
    const SearchWrapper = () => {
      const [value, setValue] = useState(args.value || '');
      return (
        <Search
          {...args}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            args.onChange?.(newValue);
          }}
        />
      );
    };
    return <SearchWrapper />;
  },
};

/**
 * 검색어가 입력된 상태입니다.
 */
export const WithValue: Story = {
  args: {
    value: '사용자',
    placeholder: '검색...',
  },
  render: (args) => {
    const SearchWrapper = () => {
      const [value, setValue] = useState('사용자');
      return (
        <Search
          {...args}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            args.onChange?.(newValue);
          }}
        />
      );
    };
    return <SearchWrapper />;
  },
};

/**
 * 커스텀 placeholder를 사용하는 검색 입력입니다.
 */
export const CustomPlaceholder: Story = {
  args: {
    value: '',
    placeholder: '사용자명, 이메일로 검색...',
  },
  render: (args) => {
    const SearchWrapper = () => {
      const [value, setValue] = useState('');
      return (
        <Search
          {...args}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            args.onChange?.(newValue);
          }}
        />
      );
    };
    return <SearchWrapper />;
  },
};

