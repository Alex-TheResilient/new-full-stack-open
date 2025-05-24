import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';
import { Card, ListGroup } from 'react-bootstrap';

const UserView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === id);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <h5 className="mt-3">Added blogs</h5>

        {user.blogs.length > 0 ? (
          <ListGroup variant="flush">
            {user.blogs.map((blog) => (
              <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">No blogs added yet</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserView;
