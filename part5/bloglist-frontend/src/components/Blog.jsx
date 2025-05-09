import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: likes + 1,
        user:
          typeof blog.user === 'object'
            ? blog.user.id || blog.user._id
            : blog.user,
      };

      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      setLikes(returnedBlog.likes);

      updateBlog(returnedBlog);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id);
        removeBlog(blog.id);
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const isOwner =
    user &&
    blog.user &&
    (user.username === blog.user.username ||
      user.id === blog.user.id ||
      user.id === blog.user);

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {isOwner && <button onClick={handleDelete}>delete</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
