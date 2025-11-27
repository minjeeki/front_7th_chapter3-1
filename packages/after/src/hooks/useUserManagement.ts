import { useState, useCallback, useEffect } from 'react';
import { userService } from '../services/userService';
import type { User, CreateUserInput, UpdateUserInput } from '../domains/user/types';
import { useNotification } from './useNotification';

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await userService.getAll();
      setUsers(result);
    } catch {
      showError('데이터를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const createUser = useCallback(async (userData: CreateUserInput) => {
    try {
      await userService.create({
        ...userData,
        role: userData.role || 'user',
        status: userData.status || 'active',
      });
      await loadUsers();
      showSuccess('사용자가 생성되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '생성에 실패했습니다';
      showError(message);
      throw error;
    }
  }, [loadUsers, showSuccess, showError]);

  const updateUser = useCallback(async (id: number, userData: UpdateUserInput) => {
    try {
      await userService.update(id, userData);
      await loadUsers();
      showSuccess('사용자가 수정되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '수정에 실패했습니다';
      showError(message);
      throw error;
    }
  }, [loadUsers, showSuccess, showError]);

  const deleteUser = useCallback(async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await userService.delete(id);
      await loadUsers();
      showSuccess('삭제되었습니다');
    } catch (error) {
      const message = error instanceof Error ? error.message : '삭제에 실패했습니다';
      showError(message);
      throw error;
    }
  }, [loadUsers, showSuccess, showError]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

