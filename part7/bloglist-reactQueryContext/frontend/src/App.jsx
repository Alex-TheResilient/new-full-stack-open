import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { useNotification } from './contexts/NotificationContext.jsx';
import './index.css';

import './index.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const { notificationDispatch } = useNotification();

  const blogFormRef = useRef();
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success'
      );
      blogFormRef.current.toggleVisibility();
    },
    onError: () => {
      showNotification('Blog creation failed', 'error');
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showNotification(`Blog ${updatedBlog.title} was updated`, 'success');
    },
    onError: () => {
      showNotification('Blog update failed', 'error');
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showNotification('Blog was deleted successfully', 'success');
    },
    onError: () => {
      showNotification('Blog deletion failed', 'error');
    },
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message, type) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, type },
    });
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };

  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject);
  };

  const updateBlog = (updatedBlog) => {
    updateBlogMutation.mutate({
      id: updatedBlog.id,
      updatedBlog,
    });
  };

  const removeBlog = (id) => {
    if (window.confirm(`Remove blog?`)) {
      deleteBlogMutation.mutate(id);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      showNotification(`Welcome ${user.name}`, 'success');
    } catch (exception) {
      showNotification('Wrong username or password', 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
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

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return <div>Error loading blogs: {result.error.message}</div>;
  }

  const blogs = result.data;
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
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
