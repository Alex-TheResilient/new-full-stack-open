import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const BlogForm = ({ createBlog }) => {
  const [valueTitle, setValueTitle] = useState('');
  const [valueAuthor, setValueAuthor] = useState('');
  const [valueUrl, setValueUrl] = useState('');
  const [valueLikes, setValueLikes] = useState(0);

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: valueTitle,
      author: valueAuthor,
      url: valueUrl,
      likes: Number(valueLikes),
    });

    // Reset form
    setValueTitle('');
    setValueAuthor('');
    setValueUrl('');
    setValueLikes(0);
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={valueTitle}
            onChange={({ target }) => setValueTitle(target.value)}
            placeholder="title"
            data-testid="title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={valueAuthor}
            onChange={({ target }) => setValueAuthor(target.value)}
            placeholder="author"
            data-testid="author"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            value={valueUrl}
            onChange={({ target }) => setValueUrl(target.value)}
            placeholder="url"
            data-testid="url"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Likes</Form.Label>
          <Form.Control
            type="number"
            value={valueLikes}
            onChange={({ target }) => setValueLikes(target.value)}
            placeholder="likes"
            data-testid="likes"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
