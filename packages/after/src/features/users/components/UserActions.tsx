import React from 'react';
import { Button } from '../../../components/ui/button';
import type { User } from '../../../domains/user/types';

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UserActions: React.FC<UserActionsProps> = ({ user, onEdit, onDelete }) => {
  // 비즈니스 규칙: 관리자는 삭제 불가
  const canDelete = user.role !== 'admin';

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="default" onClick={() => onEdit(user)}>
        수정
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => onDelete(user.id)}
        disabled={!canDelete}
      >
        삭제
      </Button>
    </div>
  );
};

