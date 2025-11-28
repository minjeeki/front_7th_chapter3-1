import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { FormSelect } from '../../../components/ui/form-select';
import { Button } from '../../../components/ui/button';
import { createPostSchema, updatePostSchema, type CreatePostFormData, type UpdatePostFormData } from '../../../domains/post/validations';
import { POST_CATEGORIES, POST_STATUSES } from '../../../domains/post/constants';
import type { Post } from '../../../domains/post/types';

interface PostFormProps {
  post?: Post;
  onSubmit: (data: CreatePostFormData | UpdatePostFormData) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export const PostForm: React.FC<PostFormProps> = ({
  post,
  onSubmit,
  onCancel,
  submitLabel = '저장',
  cancelLabel = '취소',
}) => {
  const isEditMode = !!post;
  const schema = isEditMode ? updatePostSchema : createPostSchema;

  const form = useForm<CreatePostFormData | UpdatePostFormData>({
    resolver: zodResolver(schema),
    defaultValues: post
      ? {
          title: post.title,
          content: post.content,
          author: post.author,
          category: post.category,
          status: post.status,
        }
      : {
          status: 'draft',
        },
  });

  const onSubmitForm = async (data: CreatePostFormData | UpdatePostFormData) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                제목
                <span className="text-destructive ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="게시글 제목을 입력하세요"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  작성자
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="작성자명"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <FormControl>
                  <FormSelect
                    name="category"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={POST_CATEGORIES}
                    placeholder="카테고리 선택"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="게시글 내용을 입력하세요"
                  rows={6}
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상태</FormLabel>
              <FormControl>
                <FormSelect
                  name="status"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={POST_STATUSES}
                  placeholder="상태 선택"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(onCancel || submitLabel) && (
          <div className="flex gap-2 justify-end mt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={form.formState.isSubmitting}
              >
                {cancelLabel}
              </Button>
            )}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? '저장 중...' : submitLabel}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
