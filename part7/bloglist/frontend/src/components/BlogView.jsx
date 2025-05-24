import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useNavigate } from 'react-router-dom';

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const user = useSelector((state) => state.user);

  if (!blog) {
    return null;
  }

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog));
      dispatch(setNotification(`You liked '${blog.title}'`, 'success'));
    } catch (error) {
      dispatch(setNotification('Failed to update blog', 'error'));
    }
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await dispatch(removeBlog(blog.id));
        dispatch(
          setNotification(`Blog '${blog.title}' was removed`, 'success')
        );
        navigate('/');
      } catch (error) {
        dispatch(setNotification('Failed to remove blog', 'error'));
      }
    }
  };

  const isOwner = () => {
    if (!user || !blog.user) return false;

    if (typeof blog.user === 'string') {
      return user.id === blog.user;
    }

    if (blog.user.username) {
      return user.username === blog.user.username;
    } else if (blog.user.id) {
      return user.id === blog.user.id;
    }

    return false;
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user?.name || 'unknown'}</div>
      {isOwner() && <button onClick={handleRemove}>remove</button>}
    </div>
  );
};

export default BlogView;
