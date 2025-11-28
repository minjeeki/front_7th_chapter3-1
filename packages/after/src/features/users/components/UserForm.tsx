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
import { FormSelect } from '../../../components/ui/form-select';
import { Button } from '../../../components/ui/button';
import { createUserSchema, updateUserSchema, type CreateUserFormData, type UpdateUserFormData } from '../../../domains/user/validations';
import { USER_ROLES, USER_STATUSES } from '../../../domains/user/constants';
import type { User } from '../../../domains/user/types';

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserFormData | UpdateUserFormData) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
  submitLabel = '저장',
  cancelLabel = '취소',
}) => {
  const isEditMode = !!user;
  const schema = isEditMode ? updateUserSchema : createUserSchema;

  const form = useForm<CreateUserFormData | UpdateUserFormData>({
    resolver: zodResolver(schema),
    defaultValues: user
      ? {
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
        }
      : {
          role: 'user',
          status: 'active',
        },
  });

  const onSubmitForm = async (data: CreateUserFormData | UpdateUserFormData) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                사용자명
                <span className="text-destructive ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="사용자명을 입력하세요"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                이메일
                <span className="text-destructive ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="이메일을 입력하세요"
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>역할</FormLabel>
                <FormControl>
                  <FormSelect
                    name="role"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={USER_ROLES}
                    placeholder="역할 선택"
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
                    options={USER_STATUSES}
                    placeholder="상태 선택"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
