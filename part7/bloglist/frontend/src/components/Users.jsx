import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';
import { Table, Badge } from 'react-bootstrap';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <h2 className="mb-4">Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                <Badge bg="secondary">{user.blogs.length}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
