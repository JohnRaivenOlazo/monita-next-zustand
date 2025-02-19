import { StateCreator } from 'zustand';
import { StoreState } from './index.store';

export interface UserSettingState {
  initialised: boolean;
  timezone: string | null;
  dismissVolumeOnly: boolean;
  defaultDashboard: string | null;
  dismissAddTeamMember: boolean;
  defaultRulesView: string | undefined;
  getSettings: () => Promise<void>;
}

export const createUserSetting = (props: {
  set: any;
  get: any;
  initialised: boolean;
}): UserSettingState => {
  return {
    initialised: props.initialised || false,
    timezone: null,
    dismissVolumeOnly: false,
    defaultDashboard: null,
    dismissAddTeamMember: true,
    defaultRulesView: undefined,

    async getSettings() {
      // Implementation for testing
      console.log('Getting user settings');
    }
  };
};

export default createUserSetting;
