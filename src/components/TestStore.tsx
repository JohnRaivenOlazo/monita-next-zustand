import React, { useState } from "react";
import useStore from "../store/index.store";

const TestStore = () => {
  const [username, setUsername] = useState("");
  const [postContent, setPostContent] = useState("");
  const [editingPost, setEditingPost] = useState<{
    id: string;
    content: string;
  } | null>(null);

  const {
    users,
    posts,
    currentUser,
    addUser,
    removeUser,
    setCurrentUser,
    addPost,
    removePost,
    editPost,
    getUserPosts,
  } = useStore();

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      addUser({
        name: username,
        username,
        email: `${username}@example.com`,
        createdAt: new Date(),
        isActive: true,
      });
      setUsername("");
    }
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && postContent.trim()) {
      addPost({ userId: currentUser.id, content: postContent });
      setPostContent("");
    }
  };

  const handleEditPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      editPost(editingPost.id, editingPost.content);
      setEditingPost(null);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <button type="submit">Add User</button>
        </form>

        <div>
          {users.map((user) => (
            <div key={user.id}>
              <span>{user.username}</span>
              <button onClick={() => setCurrentUser(user.id)}>
                {currentUser?.id === user.id ? "Current" : "Set Current"}
              </button>
              <button onClick={() => removeUser(user.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      {currentUser && (
        <div>
          <h2>Post Management</h2>
          <form onSubmit={handleAddPost}>
            <input
              type="text"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Enter post content"
            />
            <button type="submit">Add Post</button>
          </form>

          <div>
            {getUserPosts(currentUser.id).map((post) => (
              <div key={post.id}>
                {editingPost?.id === post.id ? (
                  <form onSubmit={handleEditPost}>
                    <input
                      type="text"
                      value={editingPost.content}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          content: e.target.value,
                        })
                      }
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <>
                    <p>{post.content}</p>
                    <div>
                      <button
                        onClick={() =>
                          setEditingPost({ id: post.id, content: post.content })
                        }
                      >
                        Edit
                      </button>
                      <button onClick={() => removePost(post.id)}>Remove</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestStore;
