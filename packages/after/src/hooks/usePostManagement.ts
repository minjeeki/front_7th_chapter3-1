import { useState, useCallback, useEffect } from 'react';
import { postService } from '../services/postService';
import type { Post, CreatePostInput, UpdatePostInput } from '../domains/post/types';

interface UsePostManagementOptions {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

export const usePostManagement = ({ showSuccess, showError }: UsePostManagementOptions) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await postService.getAll();
      setPosts(result);
    } catch {
      showError('데이터를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const createPost = useCallback(async (postData: CreatePostInput) => {
    try {
      await postService.create({
        ...postData,
        status: postData.status || 'draft',
      });
      await loadPosts();
      showSuccess('게시글이 생성되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '생성에 실패했습니다';
      showError(message);
      throw error;
    }
  }, [loadPosts, showSuccess, showError]);

  const updatePost = useCallback(async (id: number, postData: UpdatePostInput) => {
    try {
      await postService.update(id, postData);
      await loadPosts();
      showSuccess('게시글이 수정되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '수정에 실패했습니다';
      showError(message);
      throw error;
    }
  }, [loadPosts, showSuccess, showError]);

  const deletePost = useCallback(async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await postService.delete(id);
      await loadPosts();
      showSuccess('삭제되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '삭제에 실패했습니다';
      showError(message);
      throw error;
    }
  }, [loadPosts, showSuccess, showError]);

  const publishPost = useCallback(async (id: number) => {
    try {
      await postService.publish(id);
      await loadPosts();
      showSuccess('게시되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      showError(message);
      throw error;
    }
  }, [loadPosts, showSuccess, showError]);

  const archivePost = useCallback(async (id: number) => {
    try {
      await postService.archive(id);
      await loadPosts();
      showSuccess('보관되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      showError(message);
      throw error;
    }
  }, [loadPosts, showSuccess, showError]);

  const restorePost = useCallback(async (id: number) => {
    try {
      await postService.restore(id);
      await loadPosts();
      showSuccess('복원되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      showError(message);
      throw error;
    }
  }, [loadPosts, showSuccess, showError]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    loading,
    loadPosts,
    createPost,
    updatePost,
    deletePost,
    publishPost,
    archivePost,
    restorePost,
  };
};

