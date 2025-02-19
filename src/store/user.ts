import { nanoid } from 'nanoid';
import { GetStoreState, SetStoreState } from './index.store';
import { ReactNode } from 'react';

export interface User {
  username: string;
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
}

interface CreateUserParams {
  set: SetStoreState;
  get: GetStoreState;
  username: string;
  name: string;
  email: string;
}

export const createUser = ({ set, get, ...params }: CreateUserParams): User => {
  const user: User = {
    username: params.username,
    id: nanoid(),
    name: params.name,
    email: params.email,
    createdAt: new Date(),
    isActive: true
  };

  return user;
};
