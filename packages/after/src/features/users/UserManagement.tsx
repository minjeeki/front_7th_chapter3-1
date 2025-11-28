import React, { useState } from 'react';
import { DialogContainer } from '../../components/organisms/DialogContainer';
import { UserTable, UserForm, UserStats } from '../../components/organisms';
import { Button } from '../../components/ui/button';
import type { User } from '../../domains/user/types';
import type { CreateUserFormData, UpdateUserFormData } from '../../domains/user/validations';

interface UserManagementProps {
  users: User[];
  onCreate: (data: CreateUserFormData) => Promise<void>;
  onUpdate: (id: number, data: UpdateUserFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCreate = async (data: CreateUserFormData | UpdateUserFormData) => {
    await onCreate(data as CreateUserFormData);
    setIsCreateModalOpen(false);
  };

  const handleUpdate = async (data: CreateUserFormData | UpdateUserFormData) => {
    if (!selectedUser) return;
    await onUpdate(selectedUser.id, data as UpdateUserFormData);
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="mb-4 text-right">
        <DialogContainer
          trigger={<Button>새로 만들기</Button>}
          title="새 사용자 만들기"
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        >
          <UserForm
            onSubmit={handleCreate}
            submitLabel="생성"
            cancelLabel="취소"
          />
        </DialogContainer>
      </div>

      <UserStats users={users} />

      <div className="border border-gray-300 bg-white overflow-auto">
        <UserTable
          users={users}
          onEdit={openEditModal}
          onDelete={onDelete}
          striped
          hover
        />
      </div>

      <DialogContainer
        title="사용자 수정"
        open={isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }
        }}
      >
        {selectedUser && (
          <UserForm
            user={selectedUser}
            onSubmit={handleUpdate}
            submitLabel="수정 완료"
            cancelLabel="취소"
          />
        )}
      </DialogContainer>
    </>
  );
};

