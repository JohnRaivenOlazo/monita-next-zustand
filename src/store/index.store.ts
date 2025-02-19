import { create, StateCreator } from 'zustand';
import { createUser, User } from './user';
import { createPost, Post } from './post';

export interface StoreState {
  users: User[];
  posts: Post[];
  currentUser: User | null;
  isLoading: boolean;
  
  // User actions
  addUser: (userData: Omit<User, "id">) => void;
  removeUser: (id: string) => void;
  setCurrentUser: (id: string) => void;
  
  // Post actions
  addPost: (postData: { userId: string; content: string }) => void;
  removePost: (id: string) => void;
  editPost: (id: string, content: string) => void;
  getUserPosts: (userId: string) => Post[];
}

export type SetStoreState = {
  (partial: StoreState | Partial<StoreState> | ((state: StoreState) => StoreState | Partial<StoreState>), replace?: false | undefined): void;
  (state: StoreState | ((state: StoreState) => StoreState), replace: true): void;
};

export type GetStoreState = () => StoreState;

const useStore = create<StoreState>((set, get) => ({
  users: [],
  posts: [],
  currentUser: null,
  isLoading: false,

  // User actions
  addUser: (userData) => {
    const user = createUser({ set, get, ...userData });
    set((state) => ({ users: [...state.users, user] }));
  },

  removeUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
      posts: state.posts.filter((post) => post.userId !== id),
    }));
  },

  setCurrentUser: (id) => {
    const user = get().users.find((u) => u.id === id);
    set({ currentUser: user || null });
  },

  // Post actions
  addPost: ({ userId, content }) => {
    const post = createPost({ set, get, userId, content });
    set((state) => ({ posts: [...state.posts, post] }));
  },

  removePost: (id) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    }));
  },

  editPost: (id, content) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, content, updatedAt: new Date() } : post
      ),
    }));
  },

  getUserPosts: (userId) => {
    return get().posts.filter((post) => post.userId === userId);
  },
}));

export default useStore;
