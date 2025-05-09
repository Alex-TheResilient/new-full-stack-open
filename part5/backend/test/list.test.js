const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const blogs = [
  {
    _id: '1',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '2',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com/',
    likes: 5,
    __v: 0,
  },
  {
    _id: '3',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com/',
    likes: 12,
    __v: 0,
  },
  {
    _id: '4',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://example.com/',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://example.com/',
    likes: 0,
    __v: 0,
  },
  {
    _id: '6',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://example.com/',
    likes: 2,
    __v: 0,
  },
];

describe('dummy', () => {
  test('returns one', () => {
    const result = listHelper.dummy([]);
    assert.strictEqual(result, 1);
  });
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[1]]);
    assert.strictEqual(result, 5);
  });

  test('when list has multiple blogs, equals the likes of all', () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

describe('favorite blog', () => {
  test('a blog with most likes is the favorite', () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });

  test('empty list returns null', () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });
});

describe('most blogs', () => {
  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('most likes', () => {
  test('author with most likes', () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
