import React, { useState, useEffect } from 'react';
import { Button, Badge } from '../components/atoms';
import { Alert, Table, Modal } from '../components/organisms';
import { FormInput, FormSelect, FormTextarea } from '../components/molecules';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../domains/user/types';
import type { Post } from '../domains/post/types';
import { USER_ROLES, USER_STATUSES, calculateUserStats, getUserTableColumns } from '../domains/user';
import { POST_CATEGORIES, calculatePostStats, getPostTableColumns } from '../domains/post';
import { useNotification } from '../hooks/useNotification';
import '../styles/components.css';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [formData, setFormData] = useState<any>({});

  const { notifications, showSuccess, showError, removeNotification } = useNotification();

  useEffect(() => {
    loadData();
    setFormData({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const loadData = async () => {
    try {
      let result: Entity[];

      if (entityType === 'user') {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: any) {
      showError('데이터를 불러오는데 실패했습니다');
    }
  };

  const handleCreate = async () => {
    try {
      if (entityType === 'user') {
        await userService.create({
          username: formData.username,
          email: formData.email,
          role: formData.role || 'user',
          status: formData.status || 'active',
        });
      } else {
        await postService.create({
          title: formData.title,
          content: formData.content || '',
          author: formData.author,
          category: formData.category,
          status: formData.status || 'draft',
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      showSuccess(`${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`);
    } catch (error: any) {
      showError(error.message || '생성에 실패했습니다');
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

    if (entityType === 'user') {
      const user = item as User;
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      });
    }

    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === 'user') {
        await userService.update(selectedItem.id, formData);
      } else {
        await postService.update(selectedItem.id, formData);
      }

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      showSuccess(`${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`);
    } catch (error: any) {
      showError(error.message || '수정에 실패했습니다');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      showSuccess('삭제되었습니다');
    } catch (error: any) {
      showError(error.message || '삭제에 실패했습니다');
    }
  };

  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    if (entityType !== 'post') return;

    try {
      if (action === 'publish') {
        await postService.publish(id);
      } else if (action === 'archive') {
        await postService.archive(id);
      } else if (action === 'restore') {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === 'publish' ? '게시' :
        action === 'archive' ? '보관' :
        '복원';
      showSuccess(`${message}되었습니다`);
    } catch (error: any) {
      showError(error.message || '작업에 실패했습니다');
    }
  };

  const getStats = () => {
    if (entityType === 'user') {
      return calculateUserStats(data as User[]);
    } else {
      return calculatePostStats(data as Post[]);
    }
  };

  const renderTableColumns = () => {
    if (entityType === 'user') {
      return getUserTableColumns();
    } else {
      return getPostTableColumns();
    }
  };

  const stats = getStats();

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

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '10px',
              marginBottom: '15px'
            }}>
              <div style={{
                padding: '12px 15px',
                background: '#e3f2fd',
                border: '1px solid #90caf9',
                borderRadius: '3px'
              }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>전체</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>{stats.total}</div>
              </div>

              <div style={{
                padding: '12px 15px',
                background: '#e8f5e9',
                border: '1px solid #81c784',
                borderRadius: '3px'
              }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{stats.stat1.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>{stats.stat1.value}</div>
              </div>

              <div style={{
                padding: '12px 15px',
                background: '#fff3e0',
                border: '1px solid #ffb74d',
                borderRadius: '3px'
              }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{stats.stat2.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>{stats.stat2.value}</div>
              </div>

              <div style={{
                padding: '12px 15px',
                background: '#ffebee',
                border: '1px solid #e57373',
                borderRadius: '3px'
              }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{stats.stat3.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f' }}>{stats.stat3.value}</div>
              </div>

              <div style={{
                padding: '12px 15px',
                background: '#f5f5f5',
                border: '1px solid #bdbdbd',
                borderRadius: '3px'
              }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{stats.stat4.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#424242' }}>{stats.stat4.value}</div>
              </div>
            </div>

            <div style={{ border: '1px solid #ddd', background: 'white', overflow: 'auto' }}>
              <Table
                columns={renderTableColumns()}
                data={data}
                striped
                hover
                entityType={entityType}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={(id) => handleStatusAction(id, 'publish')}
                onArchive={(id) => handleStatusAction(id, 'archive')}
                onRestore={(id) => handleStatusAction(id, 'restore')}
              />
            </div>
          </div>
        </div>

      </div>

        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setFormData({});
          }}
          title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
          size="large"
          showFooter
          footerContent={
            <>
              <Button variant="secondary" size="md" onClick={() => {
                setIsCreateModalOpen(false);
                setFormData({});
              }}>
                취소
              </Button>
              <Button variant="primary" size="md" onClick={handleCreate}>
                생성
              </Button>
            </>
          }
        >
          <div>
            {entityType === 'user' ? (
              <>
                <FormInput
                  name="username"
                  value={formData.username || ''}
                  onChange={(value) => setFormData({ ...formData, username: value })}
                  label="사용자명"
                  placeholder="사용자명을 입력하세요"
                  required
                  width="full"
                  fieldType="username"
                />
                <FormInput
                  name="email"
                  value={formData.email || ''}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  label="이메일"
                  placeholder="이메일을 입력하세요"
                  type="email"
                  required
                  width="full"
                  fieldType="email"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormSelect
                    name="role"
                    value={formData.role || 'user'}
                    onChange={(value) => setFormData({ ...formData, role: value })}
                    options={USER_ROLES}
                    label="역할"
                    size="md"
                  />
                  <FormSelect
                    name="status"
                    value={formData.status || 'active'}
                    onChange={(value) => setFormData({ ...formData, status: value })}
                    options={USER_STATUSES}
                    label="상태"
                    size="md"
                  />
                </div>
              </>
            ) : (
              <>
                <FormInput
                  name="title"
                  value={formData.title || ''}
                  onChange={(value) => setFormData({ ...formData, title: value })}
                  label="제목"
                  placeholder="게시글 제목을 입력하세요"
                  required
                  width="full"
                  fieldType="postTitle"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormInput
                    name="author"
                    value={formData.author || ''}
                    onChange={(value) => setFormData({ ...formData, author: value })}
                    label="작성자"
                    placeholder="작성자명"
                    required
                    width="full"
                  />
                  <FormSelect
                    name="category"
                    value={formData.category || ''}
                    onChange={(value) => setFormData({ ...formData, category: value })}
                    options={POST_CATEGORIES}
                    label="카테고리"
                    placeholder="카테고리 선택"
                    size="md"
                  />
                </div>
                <FormTextarea
                  name="content"
                  value={formData.content || ''}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  label="내용"
                  placeholder="게시글 내용을 입력하세요"
                  rows={6}
                />
              </>
            )}
          </div>
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setFormData({});
            setSelectedItem(null);
          }}
          title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
          size="large"
          showFooter
          footerContent={
            <>
              <Button variant="secondary" size="md" onClick={() => {
                setIsEditModalOpen(false);
                setFormData({});
                setSelectedItem(null);
              }}>
                취소
              </Button>
              <Button variant="primary" size="md" onClick={handleUpdate}>
                수정 완료
              </Button>
            </>
          }
        >
          <div>
            {selectedItem && (
              <Alert variant="info">
                ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                {entityType === 'post' && ` | 조회수: ${(selectedItem as Post).views}`}
              </Alert>
            )}

            {entityType === 'user' ? (
              <>
                <FormInput
                  name="username"
                  value={formData.username || ''}
                  onChange={(value) => setFormData({ ...formData, username: value })}
                  label="사용자명"
                  placeholder="사용자명을 입력하세요"
                  required
                  width="full"
                  fieldType="username"
                />
                <FormInput
                  name="email"
                  value={formData.email || ''}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  label="이메일"
                  placeholder="이메일을 입력하세요"
                  type="email"
                  required
                  width="full"
                  fieldType="email"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormSelect
                    name="role"
                    value={formData.role || 'user'}
                    onChange={(value) => setFormData({ ...formData, role: value })}
                    options={USER_ROLES}
                    label="역할"
                    size="md"
                  />
                  <FormSelect
                    name="status"
                    value={formData.status || 'active'}
                    onChange={(value) => setFormData({ ...formData, status: value })}
                    options={USER_STATUSES}
                    label="상태"
                    size="md"
                  />
                </div>
              </>
            ) : (
              <>
                <FormInput
                  name="title"
                  value={formData.title || ''}
                  onChange={(value) => setFormData({ ...formData, title: value })}
                  label="제목"
                  placeholder="게시글 제목을 입력하세요"
                  required
                  width="full"
                  fieldType="postTitle"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormInput
                    name="author"
                    value={formData.author || ''}
                    onChange={(value) => setFormData({ ...formData, author: value })}
                    label="작성자"
                    placeholder="작성자명"
                    required
                    width="full"
                  />
                  <FormSelect
                    name="category"
                    value={formData.category || ''}
                    onChange={(value) => setFormData({ ...formData, category: value })}
                    options={POST_CATEGORIES}
                    label="카테고리"
                    placeholder="카테고리 선택"
                    size="md"
                  />
                </div>
                <FormTextarea
                  name="content"
                  value={formData.content || ''}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  label="내용"
                  placeholder="게시글 내용을 입력하세요"
                  rows={6}
                />
              </>
            )}
          </div>
        </Modal>
    </div>
  );
};
