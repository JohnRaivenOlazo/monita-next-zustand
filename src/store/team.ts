import { User } from './user';
import { Discussion } from './discussion';

export const createTeam = (props: any) => ({
  _id: props._id || '',
  name: props.name || '',
  slug: props.slug || '',
  avatarUrl: props.avatarUrl || '',
  teamLeaderId: props.teamLeaderId || '',
  memberIds: props.memberIds || [],
  members: [] as User[],
  discussions: [] as Discussion[],
  currentDiscussionSlug: props.currentDiscussionSlug || null,
  isSubscriptionActive: props.isSubscriptionActive || false,

  joinSocketRoom() {
    if (props.store.socket) {
      props.store.socket.emit('joinTeam', { teamId: this._id });
    }
  },

  leaveSocketRoom() {
    if (props.store.socket) {
      props.store.socket.emit('leaveTeam', { teamId: this._id });
    }
  },

  async loadInitialMembers() {
    // Implement if needed
  },

  async loadDiscussions() {
    // Implement if needed
  },

  changeLocalCache(data: any) {
    Object.assign(this, data);
  }
});
