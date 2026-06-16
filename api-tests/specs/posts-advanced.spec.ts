import { test, expect, expectOk } from '../src/fixtures/apiClient';
import { PostSchema, PostsArraySchema } from '../src/schemas/postSchema';
import type { Post } from '../src/types/Post';

// Odpowiednik PostsAdvancedTest.java — deserializacja, query params, chained requests, Zod schema
test.describe('Posts — zaawansowane techniki', { tag: ['@api', '@regression'] }, () => {

  test('Deserializacja do typu — type-safe assertions', async ({ api }) => {
    const response = await api.get('/posts/1');
    await expectOk(response);
    const post = PostSchema.parse(await response.json());
    expect(post.id).toBe(1);
    expect(post.userId).toBeGreaterThan(0);
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
  });

  test('Query param userId filtruje posty jednego autora', async ({ api }) => {
    const response = await api.get('/posts?userId=1');
    await expectOk(response);
    const posts = PostsArraySchema.parse(await response.json());
    expect(posts.length).toBeGreaterThan(0);
    posts.forEach(p => expect(p.userId).toBe(1));
  });

  test('Query param _limit ogranicza liczbę wyników', async ({ api }) => {
    const response = await api.get('/posts?_limit=5');
    await expectOk(response);
    const posts = await response.json() as Post[];
    expect(posts).toHaveLength(5);
  });

  test('Chained request — id usera z /users użyte do filtrowania /posts', async ({ api }) => {
    const usersResp = await api.get('/users');
    await expectOk(usersResp);
    const users = await usersResp.json() as Array<{ id: number }>;
    const userId = users[0].id;

    const postsResp = await api.get(`/posts?userId=${userId}`);
    await expectOk(postsResp);
    const posts = PostsArraySchema.parse(await postsResp.json());
    posts.forEach(p => expect(p.userId).toBe(userId));
  });

  test('Strict Zod schema — pojedynczy post', async ({ api }) => {
    const response = await api.get('/posts/1');
    await expectOk(response);
    const body = await response.json();
    expect(() => PostSchema.parse(body)).not.toThrow();
  });

  test('Strict Zod schema — tablica postów', async ({ api }) => {
    const response = await api.get('/posts?_limit=3');
    await expectOk(response);
    const body = await response.json();
    expect(() => PostsArraySchema.parse(body)).not.toThrow();
  });
});