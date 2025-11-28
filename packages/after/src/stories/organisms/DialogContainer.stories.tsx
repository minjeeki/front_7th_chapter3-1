import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogContainer } from '../../components/organisms/DialogContainer';
import { Button } from '../../components/ui/button';

const meta = {
  title: 'Organisms/DialogContainer',
  component: DialogContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Dialog를 감싸는 컨테이너 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Organisms
- **Composition**: UI/Atoms/Dialog (shadcn/ui) 컴포넌트를 사용하여 구현
- **Usage**: PostManagement, UserManagement 등에서 사용

## 특징
- 트리거 버튼 지원
- 제어/비제어 모드 지원
- 지연 마운트 옵션 (성능 최적화)
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DialogContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 트리거 버튼이 있는 Dialog입니다.
 */
export const WithTrigger: Story = {
  args: {
    trigger: <Button>열기</Button>,
    title: 'Dialog 제목',
    children: <div>Dialog 내용입니다.</div>,
  },
};

/**
 * 프로그래밍 방식으로 제어하는 Dialog입니다.
 */
export const Controlled: Story = {
  render: () => {
    const ControlledDialog = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Dialog 열기</Button>
          <DialogContainer
            title="제어되는 Dialog"
            open={open}
            onOpenChange={setOpen}
          >
            <div>이 Dialog는 프로그래밍 방식으로 제어됩니다.</div>
          </DialogContainer>
        </>
      );
    };
    return <ControlledDialog />;
  },
  parameters: {
    docs: {
      description: {
        story: 'open과 onOpenChange prop을 사용하여 Dialog를 제어합니다.',
      },
    },
  },
};

/**
 * 지연 마운트가 비활성화된 Dialog입니다.
 */
export const WithoutLazyMount: Story = {
  args: {
    trigger: <Button>열기 (지연 마운트 없음)</Button>,
    title: 'Dialog 제목',
    lazyMount: false,
    children: <div>이 Dialog는 닫혀있을 때도 DOM에 마운트됩니다.</div>,
  },
};

