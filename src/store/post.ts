import { nanoid } from 'nanoid';
import { GetStoreState, SetStoreState } from './index.store';

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
}

interface CreatePostParams {
  set: SetStoreState;
  get: GetStoreState;
  userId: string;
  content: string;
}

export const createPost = ({ set, get, ...params }: CreatePostParams): Post => {
  const now = new Date();
  
  const post: Post = {
    id: nanoid(),
    userId: params.userId,
    content: params.content,
    createdAt: now,
    updatedAt: now,
    likes: 0
  };

  return post;
};
