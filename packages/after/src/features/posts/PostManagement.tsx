import React, { useState } from 'react';
import { DialogContainer } from '../../components/organisms/DialogContainer';
import { PostTable, PostForm, PostStats } from '../../components/organisms';
import { Button } from '../../components/ui/button';
import type { Post } from '../../domains/post/types';
import type { CreatePostFormData, UpdatePostFormData } from '../../domains/post/validations';

interface PostManagementProps {
  posts: Post[];
  onCreate: (data: CreatePostFormData) => Promise<void>;
  onUpdate: (id: number, data: UpdatePostFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onPublish: (id: number) => Promise<void>;
  onArchive: (id: number) => Promise<void>;
  onRestore: (id: number) => Promise<void>;
}

export const PostManagement: React.FC<PostManagementProps> = ({
  posts,
  onCreate,
  onUpdate,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openEditModal = (post: Post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleCreate = async (data: CreatePostFormData | UpdatePostFormData) => {
    await onCreate(data as CreatePostFormData);
    setIsCreateModalOpen(false);
  };

  const handleUpdate = async (data: CreatePostFormData | UpdatePostFormData) => {
    if (!selectedPost) return;
    await onUpdate(selectedPost.id, data as UpdatePostFormData);
    setIsEditModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <div className="mb-4 text-right">
        <DialogContainer
          trigger={<Button>새로 만들기</Button>}
          title="새 게시글 만들기"
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        >
          <PostForm
            onSubmit={handleCreate}
            submitLabel="생성"
            cancelLabel="취소"
          />
        </DialogContainer>
      </div>

      <PostStats posts={posts} />

      <div className="border border-gray-300 bg-white overflow-auto">
        <PostTable
          posts={posts}
          onEdit={openEditModal}
          onDelete={onDelete}
          onPublish={onPublish}
          onArchive={onArchive}
          onRestore={onRestore}
          striped
          hover
        />
      </div>

      <DialogContainer
        title="게시글 수정"
        open={isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsEditModalOpen(false);
            setSelectedPost(null);
          }
        }}
      >
        {selectedPost && (
          <PostForm
            post={selectedPost}
            onSubmit={handleUpdate}
            submitLabel="수정 완료"
            cancelLabel="취소"
          />
        )}
      </DialogContainer>
    </>
  );
};

