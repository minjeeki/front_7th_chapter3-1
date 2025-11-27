import React from 'react';
import { TableContainer } from '../../../components/organisms/TableContainer';
import { Badge } from '../../../components/atoms/Badge';
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
      return <Badge userRole={value as User['role']} showIcon />;
    }

    if (columnKey === 'status') {
      // User status를 Badge status로 변환
      const badgeStatus =
        value === 'active' ? 'published' :
        value === 'inactive' ? 'draft' : 'rejected';
      return <Badge status={badgeStatus} showIcon />;
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

