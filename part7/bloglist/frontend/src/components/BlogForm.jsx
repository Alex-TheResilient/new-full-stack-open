import { useState } from 'react';

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
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            data-testid="title"
            type="text"
            placeholder="title"
            value={valueTitle}
            onChange={({ target }) => setValueTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            data-testid="author"
            type="text"
            placeholder="author"
            value={valueAuthor}
            onChange={({ target }) => setValueAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            data-testid="url"
            type="text"
            placeholder="url"
            value={valueUrl}
            onChange={({ target }) => setValueUrl(target.value)}
          />
        </div>
        <div>
          Likes:
          <input
            data-testid="likes"
            type="number"
            placeholder="likes"
            value={valueLikes}
            onChange={({ target }) => setValueLikes(target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BlogForm;
