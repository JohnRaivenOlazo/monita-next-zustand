export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isAdmin?: boolean;
  darkTheme?: boolean;
  businessId?: string;
}

export interface UserState {
  user: User | null;
  settings: {
    theme: 'light' | 'dark';
    timezone?: string;
  };
}

export const createUser = (props: any) => {
  const user = {
    _id: props._id || '',
    name: props.name || '',
    email: props.email || '',
    avatarUrl: props.avatarUrl || '',
    isAdmin: props.isAdmin || false,
    darkTheme: props.darkTheme || false,
    businessId: props.businessId || null,

    // Simple methods for testing
    updateProfile: async (data: Partial<User>) => {
      if (props.set) {
        props.set((state: any) => ({
          users: state.users.map((u: User) => 
            u._id === user._id ? { ...u, ...data } : u
          )
        }));
      }
    },

    toggleTheme: async () => {
      const newTheme = !user.darkTheme;
      if (props.set) {
        props.set((state: any) => ({
          users: state.users.map((u: User) => 
            u._id === user._id ? { ...u, darkTheme: newTheme } : u
          )
        }));
      }
      return newTheme;
    },

    getState: () => {
      if (props.get) {
        const state = props.get();
        return state.users.find((u: User) => u._id === user._id);
      }
      return null;
    }
  };

  return user;
};
