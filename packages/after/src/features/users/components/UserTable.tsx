import React from 'react';
import { TableContainer } from '../../../components/organisms/TableContainer';
import { Badge } from '../../../components/ui/badge';
import { UserActions } from './UserActions';
import {
  getUserTableColumns,
  getUserRoleLabel,
  getUserRoleVariant,
  getUserStatusLabel,
  getUserStatusVariant,
} from '../../../domains/user/mappers';
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
      return <Badge variant={getUserRoleVariant(role)}>{getUserRoleLabel(role)}</Badge>;
    }

    if (columnKey === 'status') {
      const status = value as User['status'];
      return <Badge variant={getUserStatusVariant(status)}>{getUserStatusLabel(status)}</Badge>;
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

