import React from 'react';
import { Table } from '../../../components/organisms/Table';
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

  return (
    <Table
      columns={columns}
      data={users}
      striped={striped}
      hover={hover}
      searchable={searchable}
      sortable={sortable}
      entityType="user"
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

