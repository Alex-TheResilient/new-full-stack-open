const { test, describe, expect, beforeEach } = require('@playwright/test');
const { loginWith } = require('./helper');
const { createBlog } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'sekret',
      },
    });

    await page.goto('/');
  });

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('blogs');
    await expect(locator).toBeVisible();
    await expect(page.getByText('blogs')).toBeVisible();
  });

  test('user can login with correct credentials', async ({ page }) => {
    await loginWith(page, 'testuser', 'sekret');
    await expect(page.getByText('Test User logged in')).toBeVisible();
  });

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'testuser', 'wrong');

    const errorDiv = await page.locator('.error');
    await expect(errorDiv).toContainText('Wrong username or password');
    await expect(errorDiv).toHaveCSS('border-style', 'solid');
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(
      page.getByText('Matti Luukkainen logged in')
    ).not.toBeVisible();
  });

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'sekret');
    });

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'A new blog created',
        'Playwright',
        'https://playwright.dev/',
        '1'
      );

      const locator = await page.getByText('A new blog created by Playwright');
      await expect(locator).toBeVisible();
    });

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'First blog created',
          'Playwright',
          'https://playwright.dev/',
          '1'
        );
        await createBlog(
          page,
          'Second blog created',
          'Playwright',
          'https://playwright.dev/',
          '2'
        );
        await createBlog(
          page,
          'Third blog created',
          'Playwright',
          'https://playwright.dev/',
          '3'
        );
      });

      test('a blog can be liked', async ({ page }) => {
        const otherBlogText = await page.getByText('Second blog created');
        const otherBlogElement = await otherBlogText.locator('..');
        await otherBlogElement.getByRole('button', { name: 'view' }).click();
        await otherBlogElement.getByRole('button', { name: 'like' }).click();
        await expect(page.getByText('likes 2')).toBeVisible();
      });
    });

    test('user who created a blog can delete it', async ({ page }) => {
      await createBlog(
        page,
        'Test Delete Blog',
        'Playwright',
        'https://example.com',
        '0'
      );

      const blogElement = await page
        .getByText('Test Delete Blog')
        .locator('..');
      await blogElement.getByRole('button', { name: 'view' }).click();

      const deleteButton = await blogElement.getByRole('button', {
        name: 'delete',
      });
      await expect(deleteButton).toBeVisible();

      page.on('dialog', (dialog) => dialog.accept());
      await deleteButton.click();

      await expect(
        page.getByText('Test Delete Blog Playwright')
      ).not.toBeVisible({ timeout: 5000 });
    });

    test('only the creator can see the delete button', async ({
      page,
      request,
    }) => {
      await createBlog(
        page,
        'Blog with delete button',
        'Playwright',
        'https://example.com',
        '0'
      );

      const blogElement = await page
        .getByText('Blog with delete button')
        .locator('..');
      await blogElement.getByRole('button', { name: 'view' }).click();
      await expect(
        blogElement.getByRole('button', { name: 'delete' })
      ).toBeVisible();

      await page.getByRole('button', { name: 'logout' }).click();

      await request.post('/api/users', {
        data: {
          name: 'Another User',
          username: 'another',
          password: 'secret',
        },
      });

      await loginWith(page, 'another', 'secret');

      const blogElementForSecondUser = await page
        .getByText('Blog with delete button')
        .locator('..');
      await blogElementForSecondUser
        .getByRole('button', { name: 'view' })
        .click();

      await expect(
        blogElementForSecondUser.getByRole('button', { name: 'delete' })
      ).not.toBeVisible();
    });

    test('blogs are ordered according to likes, most likes first', async ({
      page,
    }) => {
      // Crear blogs con diferentes cantidades de likes
      await createBlog(
        page,
        'Blog with least likes',
        'Playwright',
        'https://playwright.dev/',
        '5'
      );

      await createBlog(
        page,
        'Blog with most likes',
        'Playwright',
        'https://playwright.dev/',
        '15'
      );

      await createBlog(
        page,
        'Blog with medium likes',
        'Playwright',
        'https://playwright.dev/',
        '10'
      );

      // Obtener todos los elementos de blog en el orden que aparecen en la página
      const blogElements = await page.locator('.blog').all();

      // Verificar el orden por los títulos de los blogs (asumiendo que están ordenados por likes)
      const firstBlogTitle = await blogElements[0].textContent();
      const secondBlogTitle = await blogElements[1].textContent();
      const thirdBlogTitle = await blogElements[2].textContent();

      // Comprobar que están en el orden correcto
      await expect(firstBlogTitle).toContain('Blog with most likes');
      await expect(secondBlogTitle).toContain('Blog with medium likes');
      await expect(thirdBlogTitle).toContain('Blog with least likes');
    });
  });
});
