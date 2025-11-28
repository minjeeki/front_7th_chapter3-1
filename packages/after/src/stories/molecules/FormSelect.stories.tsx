import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { FormSelect } from '../../components/molecules/FormSelect';
import { Label } from '../../components/ui/label';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../components/ui/form';

const meta = {
  title: 'Molecules/FormSelect',
  component: FormSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
테스트 가능한 Select wrapper 컴포넌트입니다.

## Atomic Design 구조
- **Level**: Molecules
- **Location**: \`components/molecules/FormSelect.tsx\`
- **Composition**: 
  - UI/Atoms/Select (shadcn/ui)
  - 테스트를 위한 hidden select 요소
- **Used By**: 
  - Organisms/PostForm (카테고리, 상태 선택)
  - Organisms/UserForm (역할, 상태 선택)

## 특징
- shadcn/ui Select를 감싼 wrapper 컴포넌트
- 테스트 가능하도록 hidden select 요소 포함
- options 배열을 받아 자동으로 SelectItem 생성
- react-hook-form과 함께 사용 가능
- name prop을 통한 폼 제출 지원

## 사용 예시
이 컴포넌트는 Form 컴포넌트와 함께 사용됩니다:
- \`Organisms/PostForm\`: 게시글 카테고리, 상태 선택
- \`Organisms/UserForm\`: 사용자 역할, 상태 선택
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '폼 제출 시 사용할 필드 이름',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

/**
 * 기본 FormSelect입니다.
 */
export const Default: Story = {
  args: {
    name: 'select',
    options: sampleOptions,
    placeholder: '선택하세요',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * Label과 함께 사용하는 패턴입니다.
 */
export const WithLabel: Story = {
  args: {
    name: 'category',
    options: sampleOptions,
    placeholder: '카테고리 선택',
  },
  render: () => (
    <div className="flex flex-col gap-2 w-[350px]">
      <Label htmlFor="category">카테고리</Label>
      <FormSelect
        name="category"
        options={sampleOptions}
        placeholder="카테고리 선택"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 실제 서비스에서 사용하는 패턴입니다.
 * PostForm에서 사용하는 카테고리 선택입니다.
 */
export const PostCategories: Story = {
  args: {
    name: 'category',
    options: [
      { value: 'development', label: '개발' },
      { value: 'design', label: '디자인' },
      { value: 'accessibility', label: '접근성' },
    ],
    placeholder: '카테고리 선택',
  },
  render: () => (
    <div className="flex flex-col gap-2 w-[350px]">
      <Label htmlFor="category">카테고리</Label>
      <FormSelect
        name="category"
        options={[
          { value: 'development', label: '개발' },
          { value: 'design', label: '디자인' },
          { value: 'accessibility', label: '접근성' },
        ]}
        placeholder="카테고리 선택"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'PostForm에서 게시글 카테고리를 선택할 때 사용합니다.',
      },
    },
  },
};

/**
 * 실제 서비스에서 사용하는 패턴입니다.
 * PostForm에서 사용하는 상태 선택입니다.
 */
export const PostStatuses: Story = {
  args: {
    name: 'status',
    options: [
      { value: 'draft', label: '임시저장' },
      { value: 'published', label: '게시됨' },
      { value: 'archived', label: '보관됨' },
    ],
    placeholder: '상태 선택',
  },
  render: () => (
    <div className="flex flex-col gap-2 w-[350px]">
      <Label htmlFor="status">상태</Label>
      <FormSelect
        name="status"
        options={[
          { value: 'draft', label: '임시저장' },
          { value: 'published', label: '게시됨' },
          { value: 'archived', label: '보관됨' },
        ]}
        placeholder="상태 선택"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'PostForm에서 게시글 상태를 선택할 때 사용합니다.',
      },
    },
  },
};

/**
 * 실제 서비스에서 사용하는 패턴입니다.
 * UserForm에서 사용하는 역할 선택입니다.
 */
export const UserRoles: Story = {
  args: {
    name: 'role',
    options: [
      { value: 'admin', label: '관리자' },
      { value: 'moderator', label: '운영자' },
      { value: 'user', label: '사용자' },
    ],
    placeholder: '역할 선택',
  },
  render: () => (
    <div className="flex flex-col gap-2 w-[350px]">
      <Label htmlFor="role">역할</Label>
      <FormSelect
        name="role"
        options={[
          { value: 'admin', label: '관리자' },
          { value: 'moderator', label: '운영자' },
          { value: 'user', label: '사용자' },
        ]}
        placeholder="역할 선택"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'UserForm에서 사용자 역할을 선택할 때 사용합니다.',
      },
    },
  },
};

/**
 * 비활성화된 FormSelect입니다.
 */
export const Disabled: Story = {
  args: {
    name: 'select',
    options: sampleOptions,
    placeholder: '비활성화된 선택',
    disabled: true,
    value: 'option1',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * 값이 선택된 상태입니다.
 */
export const WithValue: Story = {
  args: {
    name: 'select',
    options: sampleOptions,
    placeholder: '선택하세요',
    value: 'option2',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * 많은 옵션이 있는 FormSelect입니다.
 */
export const ManyOptions: Story = {
  args: {
    name: 'select',
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `옵션 ${i + 1}`,
    })),
    placeholder: '옵션을 선택하세요',
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * react-hook-form과 함께 사용하는 패턴입니다.
 * 실제 PostForm, UserForm에서 사용하는 방식입니다.
 */
export const WithReactHookForm: Story = {
  args: {
    name: 'category',
    options: sampleOptions,
    placeholder: '선택하세요',
  },
  render: () => {
    const FormExample = () => {
      const form = useForm({
        defaultValues: {
          category: '',
          status: '',
        },
      });

      return (
        <Form {...form}>
          <form className="space-y-4 w-[350px]">
            <FormField
              control={form.control}
              name="category"
              rules={{ required: '카테고리를 선택해주세요' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    카테고리
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <FormSelect
                      name="category"
                      value={field.value}
                      onValueChange={field.onChange}
                      options={[
                        { value: 'development', label: '개발' },
                        { value: 'design', label: '디자인' },
                        { value: 'accessibility', label: '접근성' },
                      ]}
                      placeholder="카테고리 선택"
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
                      options={[
                        { value: 'draft', label: '임시저장' },
                        { value: 'published', label: '게시됨' },
                        { value: 'archived', label: '보관됨' },
                      ]}
                      placeholder="상태 선택"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    };

    return <FormExample />;
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'react-hook-form의 FormField와 함께 사용하는 실제 패턴입니다. PostForm과 UserForm에서 이 방식으로 사용됩니다.',
      },
    },
  },
};

/**
 * 에러 상태가 있는 FormSelect입니다.
 * react-hook-form의 validation과 함께 사용할 때의 패턴입니다.
 */
export const WithError: Story = {
  args: {
    name: 'category',
    options: [
      { value: 'development', label: '개발' },
      { value: 'design', label: '디자인' },
      { value: 'accessibility', label: '접근성' },
    ],
    placeholder: '카테고리 선택',
  },
  render: () => {
    const FormWithError = () => {
      const form = useForm({
        defaultValues: {
          category: '',
        },
        mode: 'onChange',
      });

      React.useEffect(() => {
        form.setError('category', {
          type: 'required',
          message: '카테고리를 선택해주세요',
        });
      }, [form]);

      return (
        <Form {...form}>
          <form className="w-[350px]">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    카테고리
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <FormSelect
                      name="category"
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.clearErrors('category');
                      }}
                      options={[
                        { value: 'development', label: '개발' },
                        { value: 'design', label: '디자인' },
                        { value: 'accessibility', label: '접근성' },
                      ]}
                      placeholder="카테고리 선택"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    };

    return <FormWithError />;
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '에러 상태가 있는 FormSelect입니다. FormMessage를 통해 에러 메시지가 표시됩니다.',
      },
    },
  },
};

/**
 * 실제 PostForm에서 사용하는 패턴입니다.
 * 카테고리와 상태를 함께 선택하는 예시입니다.
 */
export const InPostForm: Story = {
  args: {
    name: 'category',
    options: [
      { value: 'development', label: '개발' },
      { value: 'design', label: '디자인' },
      { value: 'accessibility', label: '접근성' },
    ],
    placeholder: '카테고리 선택',
  },
  render: () => {
    const PostFormExample = () => {
      const form = useForm({
        defaultValues: {
          category: '',
          status: 'draft',
        },
      });

      return (
        <Form {...form}>
          <form className="space-y-4 w-[350px]">
            <div className="grid grid-cols-2 gap-4">
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
                        options={[
                          { value: 'development', label: '개발' },
                          { value: 'design', label: '디자인' },
                          { value: 'accessibility', label: '접근성' },
                        ]}
                        placeholder="카테고리 선택"
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
                        options={[
                          { value: 'draft', label: '임시저장' },
                          { value: 'published', label: '게시됨' },
                          { value: 'archived', label: '보관됨' },
                        ]}
                        placeholder="상태 선택"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      );
    };

    return <PostFormExample />;
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'PostForm에서 실제로 사용하는 패턴입니다. 카테고리와 상태를 2열 그리드로 배치합니다.',
      },
    },
  },
};

