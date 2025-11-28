import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { cn } from '@/lib/utils';

interface DialogContainerProps {
  /**
   * Dialog를 여는 트리거 버튼
   * 제공되지 않으면 트리거 없이 Dialog만 렌더링 (프로그래밍 방식으로 제어)
   */
  trigger?: React.ReactNode;
  /**
   * Dialog 제목
   */
  title: string;
  /**
   * Dialog 열림/닫힘 상태
   */
  open: boolean;
  /**
   * Dialog 상태 변경 핸들러
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Dialog 내용
   */
  children: React.ReactNode;
  /**
   * DialogContent에 전달할 className
   */
  contentClassName?: string;
  /**
   * Dialog가 닫혀있을 때 children을 렌더링하지 않음 (성능 최적화)
   * @default true
   */
  lazyMount?: boolean;
}

export const DialogContainer: React.FC<DialogContainerProps> = React.memo(({
  trigger,
  title,
  open,
  onOpenChange,
  children,
  contentClassName,
  lazyMount = true,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      {(!lazyMount || open) && (
        <DialogContent className={cn('max-w-2xl', contentClassName)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      )}
    </Dialog>
  );
});

DialogContainer.displayName = 'DialogContainer';

