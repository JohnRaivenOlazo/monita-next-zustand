import useStore from './index.store';

// Using the store
const Example = () => {
  const { 
    addUser, 
    addPost, 
    setCurrentUser, 
    getUserPosts,
    currentUser,
    users,
    posts 
  } = useStore();

  // Add a user
  addUser({
    name: "John Doe",
    email: "john@example.com",
    username: '',
    createdAt: new Date(),
    isActive: false
  });

  // Set current user
  setCurrentUser(users[0].id);

  // Add a post for current user
  if (currentUser) {
    addPost({
      userId: currentUser.id,
      content: "Hello, World!"
    });

    // Get user's posts
    const userPosts = getUserPosts(currentUser.id);
    console.log(userPosts);
  }
};
