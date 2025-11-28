import React from 'react';
import { TableContainer } from '../../../components/organisms/TableContainer';
import { Badge } from '../../../components/ui/badge';
import { UserActions } from './UserActions';
import { getUserTableColumns } from '../../../domains/user/mappers';
import type { User } from '../../../domains/user/types';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  striped?: boolean;
  hover?: boolean;
  searchable?: boolean;
  sortable?: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  striped = true,
  hover = true,
  searchable = false,
  sortable = true,
}) => {
  const columns = getUserTableColumns();

  const renderCell = (row: User, columnKey: string): React.ReactNode => {
    const value = row[columnKey as keyof User];

    if (columnKey === 'role') {
      const role = value as User['role'];
      const roleLabels: Record<User['role'], string> = {
        admin: '관리자',
        moderator: '운영자',
        user: '사용자',
      };
      const roleVariants: Record<User['role'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
        admin: 'destructive',
        moderator: 'secondary',
        user: 'default',
      };
      return <Badge variant={roleVariants[role]}>{roleLabels[role]}</Badge>;
    }

    if (columnKey === 'status') {
      const status = value as User['status'];
      const statusLabels: Record<User['status'], string> = {
        active: '활성',
        inactive: '비활성',
        suspended: '정지',
      };
      const statusVariants: Record<User['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
        active: 'default',
        inactive: 'secondary',
        suspended: 'destructive',
      };
      return <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>;
    }

    if (columnKey === 'lastLogin') {
      return value || '-';
    }

    if (columnKey === 'actions') {
      return (
        <UserActions
          user={row}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    }

    return value;
  };

  return (
    <TableContainer<User>
      columns={columns}
      data={users}
      striped={striped}
      hover={hover}
      searchable={searchable}
      sortable={sortable}
      renderCell={renderCell}
    />
  );
};

