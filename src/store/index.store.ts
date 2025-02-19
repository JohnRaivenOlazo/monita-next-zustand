import { create, StateCreator } from 'zustand';
// import io from 'socket.io-client';
// import { URL_API } from '../consts';
import Router from 'next/router';

import { Discussion } from './discussion';
import { Post } from './post';
import { createTeam } from './team';
import { createUser, User } from './user';
import createProjects, { ProjectsState } from './projects';
import createOrganization, { OrganizationSlice } from './organization';
import createMonitoring, { MonitoringState } from './monitoring';
import createUserSetting, { UserSettingState } from './usersetting';
import createStripe, { StripeState } from './stripe';

export interface StoreState {
  isServer: boolean;
  teams: ReturnType<typeof createTeam>[];
  currentUser: User | null;
  currentTeam: ReturnType<typeof createTeam> | null;
  organisation: OrganizationSlice;
  currentUrl: string;
  isLoading: boolean;
  socket: any;
  projects: ProjectsState | null;
  userSettings: UserSettingState;
  monitoring: MonitoringState;
  stripe: StripeState;
  theme: 'light' | 'dark';
  apiCount: number;

  // Core methods
  initStore: (initialState?: any) => void;
  setCurrentUser: (user: User | null) => void;
  setTeams: (teams: any[]) => void;
  setCurrentTeam: (team: any) => void;
  setLoading: (val?: boolean) => void;
  changeCurrentUrl: (url: string) => void;
}

const useStore = create<StoreState>((set, get) => ({
  isServer: typeof window === 'undefined',
  teams: [],
  currentUser: null,
  currentTeam: null,
  organisation: createOrganization(set),
  currentUrl: '',
  isLoading: false,
  socket: null,
  projects: null,
  userSettings: createUserSetting({
    set,
    get,
    initialised: false,
  }),
  monitoring: createMonitoring({ 
    store: {
      set,
      get
    }
  }),
  stripe: createStripe({
    set,
    get,
    userBillingLimits: null,
    plans: [],
    userPlans: [],
    invoices: [],
  }),
  theme: 'light',
  apiCount: 0,

  initStore: (initialState = {}) => {
    const isServer = typeof window === 'undefined';
    let socket = null;

    if (!isServer) {
      
    //   socket.on('connect', () => {
        console.log('Connected to socket');
        const currentTeam = get().currentTeam;
    //   });
    }

    set({
      isServer,
      socket,
      currentUrl: initialState.currentUrl || '',
    });
  },

  setCurrentUser: (user) => {
    set({ currentUser: user ? createUser({ set, get, ...user }) : null });
  },

  setTeams: (teams) => {
    const teamObjs = teams.map(t => createTeam({
      set,
      get,
      ...t,
      store: get()
    }));
    set({ teams: teamObjs });

    if (teams.length > 0 && !get().currentTeam) {
      get().setCurrentTeam(teamObjs[0]);
    }
  },

  setCurrentTeam: (team) => {
    set({ currentTeam: team });
    if (team && get().socket) {
      get().socket.emit('joinTeam', { teamId: team._id });
    }
  },

  setLoading: (val = true) => {
    const currentCount = get().apiCount;
    const newCount = val ? currentCount + 1 : currentCount - 1;
    set({ apiCount: newCount, isLoading: newCount > 0 });
  },

  changeCurrentUrl: (url) => {
    set({ currentUrl: url });
  }
}));

export const { getState, setState } = useStore;
export default useStore;
