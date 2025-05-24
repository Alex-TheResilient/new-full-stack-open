import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer';
import { loginUser, logoutUser, initializeUser } from './reducers/userReducer';
import Notification from './components/Notification';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import './index.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginVisible, setLoginVisible] = useState(false);

  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const newBlog = await dispatch(createBlog(blogObject));
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          'success'
        )
      );
    } catch (error) {
      dispatch(setNotification('Blog creation failed', 'error'));
    }
  };

  const updateBlog = async (updatedBlog) => {
    try {
      await dispatch(likeBlog(updatedBlog));
      dispatch(setNotification(`You liked '${updatedBlog.title}'`, 'success'));
    } catch (error) {
      // console.log('Error updating blog:', error);
      dispatch(setNotification('Failed to update blog', 'error'));
    }
  };

  const handleRemoveBlog = async (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      try {
        await dispatch(removeBlog(id)); // Ahora llama correctamente al action creator
        dispatch(setNotification(`Blog '${title}' was removed`, 'success'));
      } catch (error) {
        dispatch(setNotification('Failed to remove blog', 'error'));
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await dispatch(
        loginUser({
          username,
          password,
        })
      );

      setUsername('');
      setPassword('');
      dispatch(setNotification(`Welcome ${user.name}`, 'success'));
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error'));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  // console.log('user', user)

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={() => updateBlog(blog)}
              removeBlog={() =>
                handleRemoveBlog(blog.id, blog.title, blog.author)
              }
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
