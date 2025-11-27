import React from 'react';
import { Button } from '../../../components/ui/button';
import type { Post } from '../../../domains/post/types';

interface PostActionsProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const PostActions: React.FC<PostActionsProps> = ({
  post,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button size="sm" variant="default" onClick={() => onEdit(post)}>
        수정
      </Button>
      {post.status === 'draft' && onPublish && (
        <Button
          size="sm"
          variant="default"
          onClick={() => onPublish(post.id)}
        >
          게시
        </Button>
      )}
      {post.status === 'published' && onArchive && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onArchive(post.id)}
        >
          보관
        </Button>
      )}
      {post.status === 'archived' && onRestore && (
        <Button
          size="sm"
          variant="default"
          onClick={() => onRestore(post.id)}
        >
          복원
        </Button>
      )}
      <Button size="sm" variant="destructive" onClick={() => onDelete(post.id)}>
        삭제
      </Button>
    </div>
  );
};

