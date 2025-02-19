import { StateCreator } from 'zustand';
import { StoreState } from './index.store';

export interface Organization {
  _id: string;
  name: string;
  slug: string;
}

export interface OrganizationSlice {
  _id: string;
  name: string;
  slug: string;
  getOrganisation: (businessId: string) => Promise<void>;
}

export const createOrganization = (set: any): OrganizationSlice => {
  return {
    _id: '',
    name: '',
    slug: '',
    
    async getOrganisation(businessId: string) {
      // Implement if needed
      console.log('Getting organisation for:', businessId);
    }
  };
};

export default createOrganization;
