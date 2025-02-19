import { useEffect } from 'react';
import useStore from '../store/index.store';

export default function Home() {
  const store = useStore();

  useEffect(() => {
    // Initialize store
    store.initStore();

    // Test user creation
    store.setCurrentUser({
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      isAdmin: true
    });

    // Test teams
    store.setTeams([
      {
        _id: 'team1',
        name: 'Development Team',
        slug: 'dev-team',
        teamLeaderId: '1',
        memberIds: ['1'],
        avatarUrl: 'https://placeholdit.com/50',
        isSubscriptionActive: true
      }
    ]);
  }, []);

  const handleUpdateUser = () => {
    if (store.currentUser) {
      // store.currentUser.updateProfile({
      //   name: 'John Updated'
      // });
    }
  };

  const handleToggleTheme = async () => {
    if (store.currentUser) {
    }
  };

  const handleAddTeam = () => {
    store.setTeams([
      ...store.teams,
      {
        _id: 'team2',
        name: 'Marketing Team',
        slug: 'marketing-team',
        teamLeaderId: '1',
        memberIds: ['1'],
        isSubscriptionActive: true
      }
    ]);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Store Testing Page</h1>

      {/* User Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current User</h2>
        <div className="space-x-2 mb-4">
          <button
            onClick={handleUpdateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update User Name
          </button>
          <button
            onClick={handleToggleTheme}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Toggle Theme
          </button>
        </div>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(store.currentUser, null, 2)}
        </pre>
      </section>

      {/* Teams Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Teams</h2>
        <button
          onClick={handleAddTeam}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add New Team
        </button>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(store.teams, null, 2)}
        </pre>
      </section>

      {/* Store State */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Store State</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify({
            isLoading: store.isLoading,
            currentUrl: store.currentUrl,
            theme: store.theme,
            apiCount: store.apiCount
          }, null, 2)}
        </pre>
      </section>
    </div>
  );
}
