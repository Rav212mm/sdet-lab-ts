import { test, expect } from '../src/fixtures/apiClient';
import type { Post } from '../src/types/Post';

// Odpowiednik PostTest.java
test.describe('POST /posts', { tag: ['@api', '@smoke'] }, () => {

  test('tworzy post i zwraca id > 0', async ({ api }) => {
    const response = await api.post('/posts', {
      data: { title: 'My new post', body: 'This is a test post', userId: 1 },
    });
    expect(response.status()).toBe(201);
    const post = await response.json() as Post;
    expect(post.id).toBeGreaterThan(0);
  });

  test('zwraca tytuł i id po utworzeniu', async ({ api }) => {
    const response = await api.post('/posts', {
      data: { title: 'Test post', body: 'Body', userId: 1 },
    });
    expect(response.status()).toBe(201);
    const post = await response.json() as Post;
    expect(post.id).toBeGreaterThan(0);
    expect(post.title).toBeTruthy();
  });
});
