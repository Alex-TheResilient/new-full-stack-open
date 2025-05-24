const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const favorite = blogs.reduce(
    (favorite, blog) => (favorite.likes > blog.likes ? favorite : blog),
    blogs[0]
  );
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // Returns the composed aggregate object.
  const authors = _.countBy(blogs, 'author');
  // Transform the object into an array of objects with author and blog counts
  const authorBlogCounts = _.map(authors, (count, author) => ({
    author,
    blogs: count,
  }));
  // Returns the object with the highest blog count
  return _.maxBy(authorBlogCounts, 'blogs');
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // Returns the composed aggregate object.
  const authors = _.groupBy(blogs, 'author');
  // Transform the object into an array of objects with author and like counts
  const authorLikeCounts = _.map(authors, (blogs, author) => ({
    author,
    likes: totalLikes(blogs),
  }));
  // Returns the object with the highest like count
  return _.maxBy(authorLikeCounts, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
