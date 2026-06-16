import { test, expect, expectOk } from '../src/fixtures/apiClient';
import type { Post } from '../src/types/Post';

// Odpowiednik UpdateDeleteTest.java
test.describe('PUT / DELETE /posts', () => {
  test.describe.configure({ tag: ['@api', '@smoke'] });

  test('PUT /posts/1 aktualizuje tytuł', async ({ api }) => {
    const response = await api.put('/posts/1', {
      data: { id: 1, title: 'Updated title', body: 'Updated body', userId: 1 },
    });
    await expectOk(response);
    const post = await response.json() as Post;
    expect(post.title).toBe('Updated title');
  });

  test('DELETE /posts/1 zwraca pusty obiekt', async ({ api }) => {
    const response = await api.delete('/posts/1');
    await expectOk(response);
    const body = await response.text();
    expect(body.trim()).toBe('{}');
  });
});
