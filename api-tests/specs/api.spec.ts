import { test, expect, expectOk } from '../src/fixtures/apiClient';
import { PostSchema } from '../src/schemas/postSchema';
import type { Post } from '../src/types/Post';

// Odpowiednik ApiTest.java — smoke, GET/POST/PUT/DELETE
test.describe('API — smoke', { tag: ['@api', '@smoke'] }, () => {

  test('GET /posts zwraca niepustą listę', async ({ api }) => {
    const response = await api.get('/posts');
    await expectOk(response);
    const posts = await response.json() as Post[];
    expect(posts.map(p => p.id)).not.toHaveLength(0);
  });

  test('GET /posts/1 zawiera oczekiwany tytuł', async ({ api }) => {
    const response = await api.get('/posts/1');
    await expectOk(response);
    const post = await response.json() as Post;
    expect(post.title).toContain('sunt aut facere repellat');
  });

  test('GET /posts/1 przechodzi walidację Zod schema', async ({ api }) => {
    const response = await api.get('/posts/1');
    await expectOk(response);
    const body = await response.json();
    PostSchema.parse(body);
  });

  test('POST /users tworzy użytkownika i zwraca id', async ({ api }) => {
    const response = await api.post('/users', {
      data: { name: 'Jan Kowalski', job: 'SDET' },
    });
    expect(response.status()).toBe(201);
    const body = await response.json() as Record<string, unknown>;
    expect(body['id']).toBeTruthy();
  });

  test('PUT /users/2 aktualizuje dane', async ({ api }) => {
    const response = await api.put('/users/2', {
      data: { name: 'Jan Nowak', job: 'Senior SDET' },
    });
    await expectOk(response);
    const body = await response.json() as Record<string, unknown>;
    expect(body['name']).toBe('Jan Nowak');
  });

  test('DELETE /users/2 zwraca 200', async ({ api }) => {
    const response = await api.delete('/users/2');
    await expectOk(response);
  });
});
