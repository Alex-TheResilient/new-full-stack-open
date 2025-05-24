import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form, ListGroup, Badge } from 'react-bootstrap';

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

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

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addComment(blog.id, comment));
      dispatch(setNotification('Comment added successfully', 'success'));
      setComment('');
    } catch (error) {
      dispatch(setNotification('Failed to add comment', 'error'));
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
    <Card>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          by {blog.author}
        </Card.Subtitle>

        <Card.Text>
          <a href={blog.url}>{blog.url}</a>
        </Card.Text>

        <div className="mb-3">
          <Badge bg="primary" className="me-2">
            {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
          </Badge>
          <Button variant="outline-primary" size="sm" onClick={handleLike}>
            Like
          </Button>
        </div>

        <Card.Text className="text-muted">
          Added by {blog.user?.name || 'unknown'}
        </Card.Text>

        {isOwner() && (
          <Button variant="danger" size="sm" onClick={handleRemove}>
            Remove
          </Button>
        )}

        <h5 className="mt-4">Comments</h5>
        <Form onSubmit={handleAddComment} className="mb-3">
          <Form.Group className="mb-2 d-flex">
            <Form.Control
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              placeholder="Add a comment..."
            />
            <Button variant="primary" type="submit" className="ms-2">
              Add
            </Button>
          </Form.Group>
        </Form>

        {blog.comments && blog.comments.length > 0 ? (
          <ListGroup>
            {blog.comments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">No comments yet.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default BlogView;
