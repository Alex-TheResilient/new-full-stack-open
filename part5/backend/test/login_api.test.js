const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const User = require('../models/user');

// test for login
describe('login', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('login succeeds with valid credentials', async () => {
    const loginDetails = {
      username: 'root',
      password: 'sekret',
    };

    const response = await api
      .post('/api/login')
      .send(loginDetails)
      .expect(200);

    assert(response.body.token);
    assert.strictEqual(response.body.username, 'root');
  });

  after(() => {
    mongoose.connection.close();
  });
});
