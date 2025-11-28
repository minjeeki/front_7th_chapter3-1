import React from 'react';
import { TableContainer } from '../../../components/organisms/TableContainer';
import { Badge } from '../../../components/ui/badge';
import { PostActions } from './PostActions';
import { getPostTableColumns } from '../../../domains/post/mappers';
import type { Post } from '../../../domains/post/types';

interface PostTableProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
  striped?: boolean;
  hover?: boolean;
  searchable?: boolean;
  sortable?: boolean;
}

export const PostTable: React.FC<PostTableProps> = ({
  posts,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
  striped = true,
  hover = true,
  searchable = false,
  sortable = true,
}) => {
  const columns = getPostTableColumns();

  const renderCell = (row: Post, columnKey: string): React.ReactNode => {
    const value = row[columnKey as keyof Post];

    if (columnKey === 'category') {
      const category = value as Post['category'];
      const categoryLabels: Record<Post['category'], string> = {
        development: '개발',
        design: '디자인',
        accessibility: '접근성',
      };
      const categoryVariants: Record<Post['category'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
        development: 'default',
        design: 'secondary',
        accessibility: 'destructive',
      };
      return <Badge variant={categoryVariants[category]}>{categoryLabels[category]}</Badge>;
    }

    if (columnKey === 'status') {
      const status = value as Post['status'];
      const statusLabels: Record<Post['status'], string> = {
        draft: '임시저장',
        published: '게시됨',
        archived: '보관됨',
      };
      const statusVariants: Record<Post['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
        draft: 'secondary',
        published: 'default',
        archived: 'outline',
      };
      return <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>;
    }

    if (columnKey === 'views') {
      return typeof value === 'number' ? value.toLocaleString() : '0';
    }

    if (columnKey === 'actions') {
      return (
        <PostActions
          post={row}
          onEdit={onEdit}
          onDelete={onDelete}
          onPublish={onPublish}
          onArchive={onArchive}
          onRestore={onRestore}
        />
      );
    }

    return value;
  };

  return (
    <TableContainer<Post>
      columns={columns}
      data={posts}
      striped={striped}
      hover={hover}
      searchable={searchable}
      sortable={sortable}
      renderCell={renderCell}
    />
  );
};

