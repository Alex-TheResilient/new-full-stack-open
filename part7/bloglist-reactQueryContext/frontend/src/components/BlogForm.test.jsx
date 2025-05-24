import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();
  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText('title');
  const inputAuthor = screen.getByPlaceholderText('author');
  const inputUrl = screen.getByPlaceholderText('url');
  const inputLikes = screen.getByPlaceholderText('likes');
  const sendButton = screen.getByText('Save');
  await user.type(inputTitle, 'Test Title');
  await user.type(inputAuthor, 'Test Author');
  await user.type(inputUrl, 'http://testurl.com');
  await user.type(inputLikes, '5');
  await user.click(sendButton);
  expect(createBlog.mock.calls[0][0].title).toBe('Test Title');
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author');
  expect(createBlog.mock.calls[0][0].url).toBe('http://testurl.com');
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].likes).toBe(5);
  console.log(createBlog.mock.calls);
});
