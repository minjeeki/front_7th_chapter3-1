import React, { useState } from 'react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { DialogContainer } from '../components/organisms/DialogContainer';
import { UserForm } from '../features/users/components/UserForm';
import { PostForm } from '../features/posts/components/PostForm';
import type { User } from '../domains/user/types';
import type { Post } from '../domains/post/types';
import type { CreateUserFormData, UpdateUserFormData } from '../domains/user/validations';
import type { CreatePostFormData, UpdatePostFormData } from '../domains/post/validations';
import { useNotification, useUserManagement, usePostManagement } from '../hooks';
import { UserStats, UserTable } from '../features/users';
import { PostStats, PostTable } from '../features/posts';
import '../styles/components.css';
import { XIcon } from 'lucide-react';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);

  const { notifications, showSuccess, showError, removeNotification } = useNotification();
  const { users, createUser, updateUser, deleteUser } = useUserManagement({ showSuccess, showError });
  const { posts, createPost, updatePost, deletePost, publishPost, archivePost, restorePost } = usePostManagement({ showSuccess, showError });

  const openEditModal = (item: Entity) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  // 공통 생성 핸들러
  const handleCreate = async (
    data: CreateUserFormData | UpdateUserFormData | CreatePostFormData | UpdatePostFormData
  ) => {
    if (entityType === 'user') {
      await createUser(data as CreateUserFormData);
    } else {
      await createPost(data as CreatePostFormData);
    }
    setIsCreateModalOpen(false);
  };

  // 공통 수정 핸들러
  const handleUpdate = async (
    data: CreateUserFormData | UpdateUserFormData | CreatePostFormData | UpdatePostFormData
  ) => {
    if (!selectedItem) return;
    
    if (entityType === 'user') {
      await updateUser(selectedItem.id, data as UpdateUserFormData);
    } else {
      await updatePost(selectedItem.id, data as UpdatePostFormData);
    }
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async (id: number) => {
    if (entityType === 'user') {
      await deleteUser(id);
    } else {
      await deletePost(id);
    }
  };

  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    if (entityType !== 'post') return;

    try {
      if (action === 'publish') {
        await publishPost(id);
      } else if (action === 'archive') {
        await archivePost(id);
      } else if (action === 'restore') {
        await restorePost(id);
      }
    } catch {
      // usePostManagement에서 이미 에러 처리를 하므로 여기서는 처리하지 않음
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-5">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1 text-gray-800">
            관리 시스템
          </h1>
          <p className="text-gray-600 text-sm">
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div className="bg-white border border-gray-300 p-2.5">
          <div className="mb-4 border-b-2 border-gray-300 pb-1 flex gap-1">
            <Button
              onClick={() => setEntityType('post')}
              variant={entityType === 'post' ? 'default' : 'outline'}
              size="sm"
            >
              게시글
            </Button>
            <Button
              onClick={() => setEntityType('user')}
              variant={entityType === 'user' ? 'default' : 'outline'}
              size="sm"
            >
              사용자
            </Button>
          </div>

          <div>
            <div className="mb-4 text-right">
              <DialogContainer
                trigger={<Button>새로 만들기</Button>}
                title={entityType === 'user' ? '새 사용자 만들기' : '새 게시글 만들기'}
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
              >
                {entityType === 'user' ? (
                  <UserForm
                    onSubmit={handleCreate}
                    submitLabel="생성"
                    cancelLabel="취소"
                  />
                ) : (
                  <PostForm
                    onSubmit={handleCreate}
                    submitLabel="생성"
                    cancelLabel="취소"
                  />
                )}
              </DialogContainer>
            </div>

            {notifications.map((notification) => (
              <div key={notification.id} className="mb-2.5">
                <Alert
                  variant={notification.type === 'error' ? 'destructive' : 'default'}
                  className="relative"
                >
                  <AlertTitle>
                    {notification.type === 'success' ? '성공' : '오류'}
                  </AlertTitle>
                  <AlertDescription>
                    {notification.message}
                  </AlertDescription>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    <XIcon className="size-4" />
                  </button>
                </Alert>
              </div>
            ))}

            {entityType === 'user' ? (
              <UserStats users={users} />
            ) : (
              <PostStats posts={posts} />
            )}

            <div className="border border-gray-300 bg-white overflow-auto">
              {entityType === 'user' ? (
                <UserTable
                  users={users}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                  striped
                  hover
                />
              ) : (
                <PostTable
                  posts={posts}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                  onPublish={(id) => handleStatusAction(id, 'publish')}
                  onArchive={(id) => handleStatusAction(id, 'archive')}
                  onRestore={(id) => handleStatusAction(id, 'restore')}
                  striped
                  hover
                />
              )}
            </div>
          </div>
        </div>

      </div>

      <DialogContainer
        title={entityType === 'user' ? '사용자 수정' : '게시글 수정'}
        open={isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsEditModalOpen(false);
            setSelectedItem(null);
          }
        }}
      >
        {selectedItem && (
          <div className="mb-4">
            <Alert variant="default">
              <AlertDescription>
                ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                {entityType === 'post' && ` | 조회수: ${(selectedItem as Post).views}`}
              </AlertDescription>
            </Alert>
          </div>
        )}
        {entityType === 'user' ? (
          <UserForm
            user={selectedItem as User}
            onSubmit={handleUpdate}
            submitLabel="수정 완료"
            cancelLabel="취소"
          />
        ) : (
          <PostForm
            post={selectedItem as Post}
            onSubmit={handleUpdate}
            submitLabel="수정 완료"
            cancelLabel="취소"
          />
        )}
      </DialogContainer>
    </div>
  );
};
