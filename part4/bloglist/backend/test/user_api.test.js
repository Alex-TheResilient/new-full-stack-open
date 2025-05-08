const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const helper = require('./test_helper');

const User = require('../models/user');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'alex',
      name: 'Alex Huaracha',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'password',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(result.body.error.includes('expected `username` to be unique'));

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test('creation fails if password is too short', async () => {
    const newUser = {
      username: 'shortpass',
      name: 'Test User',
      password: 'pw', // two characters
    };

    const result = await api.post('/api/users').send(newUser).expect(400);

    assert(
      result.body.error.includes('password must be at least 3 characters long')
    );

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, 1);
  });

  after(() => {
    mongoose.connection.close();
  });
});
