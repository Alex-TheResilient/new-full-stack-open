import { Link } from 'react-router-dom';

const Navigation = ({ user, handleLogout }) => {
  const navStyle = {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #dee2e6',
  };

  const linkStyle = {
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    color: '#0d6efd',
    fontWeight: 500,
    marginRight: '1rem',
  };

  const userInfoStyle = {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  };

  const logoutButtonStyle = {
    marginLeft: '1rem',
    padding: '0.25rem 0.5rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  };

  return (
    <div style={navStyle}>
      <div>
        <Link style={linkStyle} to="/">
          blogs
        </Link>
        <Link style={linkStyle} to="/users">
          users
        </Link>
      </div>
      <div style={userInfoStyle}>
        {user.name} logged in
        <button style={logoutButtonStyle} onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Navigation;
