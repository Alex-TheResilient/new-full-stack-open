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
      likes: valueLikes,
    });
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={valueTitle}
            onChange={({ target }) => setValueTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={valueAuthor}
            onChange={({ target }) => setValueAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={valueUrl}
            onChange={({ target }) => setValueUrl(target.value)}
          />
        </div>
        <div>
          Likes:
          <input
            type="number"
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
