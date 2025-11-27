import React, { useState, useEffect } from 'react';
import { Button } from '../components/atoms';
import { Alert, Modal } from '../components/organisms';
import type { User } from '../domains/user/types';
import type { Post } from '../domains/post/types';
import { useNotification, useUserManagement, usePostManagement } from '../hooks';
import { UserStats, UserTable, UserForm } from '../features/users';
import { PostStats, PostTable, PostForm } from '../features/posts';
import '../styles/components.css';

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

  useEffect(() => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const handleCreateUser = async (data: Parameters<typeof createUser>[0] | Parameters<typeof updateUser>[1]) => {
    try {
      await createUser(data as Parameters<typeof createUser>[0]);
      setIsCreateModalOpen(false);
    } catch {
      // hooks에서 이미 에러 처리를 하므로 여기서는 처리하지 않음
    }
  };

  const handleCreatePost = async (data: Parameters<typeof createPost>[0] | Parameters<typeof updatePost>[1]) => {
    try {
      await createPost(data as Parameters<typeof createPost>[0]);
      setIsCreateModalOpen(false);
    } catch {
      // hooks에서 이미 에러 처리를 하므로 여기서는 처리하지 않음
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (data: Parameters<typeof updateUser>[1]) => {
    if (!selectedItem) return;

    try {
      await updateUser(selectedItem.id, data);
      setIsEditModalOpen(false);
      setSelectedItem(null);
    } catch {
      // hooks에서 이미 에러 처리를 하므로 여기서는 처리하지 않음
    }
  };

  const handleUpdatePost = async (data: Parameters<typeof updatePost>[1]) => {
    if (!selectedItem) return;

    try {
      await updatePost(selectedItem.id, data);
      setIsEditModalOpen(false);
      setSelectedItem(null);
    } catch {
      // hooks에서 이미 에러 처리를 하므로 여기서는 처리하지 않음
    }
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
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '5px',
            color: '#333'
          }}>
            관리 시스템
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div style={{
          background: 'white',
          border: '1px solid #ddd',
          padding: '10px'
        }}>
          <div style={{
            marginBottom: '15px',
            borderBottom: '2px solid #ccc',
            paddingBottom: '5px'
          }}>
            <button
              onClick={() => setEntityType('post')}
              style={{
                padding: '8px 16px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: entityType === 'post' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'post' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'post' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px'
              }}
            >
              게시글
            </button>
            <button
              onClick={() => setEntityType('user')}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: entityType === 'user' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'user' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'user' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px'
              }}
            >
              사용자
            </button>
          </div>

          <div>
            <div style={{ marginBottom: '15px', textAlign: 'right' }}>
              <Button variant="primary" size="md" onClick={() => setIsCreateModalOpen(true)}>
                새로 만들기
              </Button>
            </div>

            {notifications.map((notification) => (
              <div key={notification.id} style={{ marginBottom: '10px' }}>
                <Alert
                  variant={notification.type === 'success' ? 'success' : 'error'}
                  title={notification.type === 'success' ? '성공' : '오류'}
                  onClose={() => removeNotification(notification.id)}
                >
                  {notification.message}
                </Alert>
              </div>
            ))}

            {entityType === 'user' ? (
              <UserStats users={users} />
            ) : (
              <PostStats posts={posts} />
            )}

            <div style={{ border: '1px solid #ddd', background: 'white', overflow: 'auto' }}>
              {entityType === 'user' ? (
                <UserTable
                  users={users}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  striped
                  hover
                />
              ) : (
                <PostTable
                  posts={posts}
                  onEdit={handleEdit}
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

        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
          title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
          size="large"
          showFooter={false}
        >
          {entityType === 'user' ? (
            <UserForm
              onSubmit={handleCreateUser}
              onCancel={() => setIsCreateModalOpen(false)}
              submitLabel="생성"
              cancelLabel="취소"
            />
          ) : (
            <PostForm
              onSubmit={handleCreatePost}
              onCancel={() => setIsCreateModalOpen(false)}
              submitLabel="생성"
              cancelLabel="취소"
            />
          )}
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedItem(null);
          }}
          title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
          size="large"
          showFooter={false}
        >
          {selectedItem && (
            <div style={{ marginBottom: '16px' }}>
              <Alert variant="info">
                ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                {entityType === 'post' && ` | 조회수: ${(selectedItem as Post).views}`}
              </Alert>
            </div>
          )}

          {entityType === 'user' && selectedItem ? (
            <UserForm
              user={selectedItem as User}
              onSubmit={handleUpdateUser}
              onCancel={() => {
                setIsEditModalOpen(false);
                setSelectedItem(null);
              }}
              submitLabel="수정 완료"
              cancelLabel="취소"
            />
          ) : selectedItem ? (
            <PostForm
              post={selectedItem as Post}
              onSubmit={handleUpdatePost}
              onCancel={() => {
                setIsEditModalOpen(false);
                setSelectedItem(null);
              }}
              submitLabel="수정 완료"
              cancelLabel="취소"
            />
          ) : null}
        </Modal>
    </div>
  );
};
