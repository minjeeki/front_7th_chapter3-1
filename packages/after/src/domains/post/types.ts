export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: 'development' | 'design' | 'accessibility';
  status: 'draft' | 'published' | 'archived';
  views: number;
  createdAt: string;
  updatedAt?: string;
}

export type PostStatus = Post['status'];
export type PostCategory = Post['category'];

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
  category: PostCategory;
  status?: PostStatus;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  author?: string;
  category?: PostCategory;
  status?: PostStatus;
}

