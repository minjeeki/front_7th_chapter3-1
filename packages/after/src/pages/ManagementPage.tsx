import React, { useState } from 'react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { useNotification, useUserManagement, usePostManagement } from '../hooks';
import { UserManagement } from '../features/users';
import { PostManagement } from '../features/posts';
import '../styles/components.css';
import { XIcon } from 'lucide-react';

type EntityType = 'user' | 'post';

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');

  const { notifications, showSuccess, showError, removeNotification } = useNotification();
  const { users, createUser, updateUser, deleteUser } = useUserManagement({ showSuccess, showError });
  const { posts, createPost, updatePost, deletePost, publishPost, archivePost, restorePost } = usePostManagement({ showSuccess, showError });


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
              <UserManagement
                users={users}
                onCreate={createUser}
                onUpdate={updateUser}
                onDelete={deleteUser}
              />
            ) : (
              <PostManagement
                posts={posts}
                onCreate={createPost}
                onUpdate={updatePost}
                onDelete={deletePost}
                onPublish={publishPost}
                onArchive={archivePost}
                onRestore={restorePost}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
