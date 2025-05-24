import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Link
          to={`/blogs/${blog.id}`}
          style={{ textDecoration: 'none' }}
          className="text-dark"
        >
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            by {blog.author}
          </Card.Subtitle>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Blog;
