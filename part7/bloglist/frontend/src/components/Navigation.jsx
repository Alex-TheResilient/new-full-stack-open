import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = ({ user, handleLogout }) => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          BlogApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
          </Nav>
          <Navbar.Text className="me-2">{user.name} logged in</Navbar.Text>
          <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
