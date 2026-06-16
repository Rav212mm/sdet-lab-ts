import { test, expect } from '@playwright/test';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import path from 'path';

// Odpowiednik ConsumerPostsTest.java
const provider = new PactV3({
  consumer: 'Consumer',
  provider: 'JSONPlaceholder',
  dir: path.resolve(__dirname, '../../pacts'),
  logLevel: 'warn',
});

// Pact FFI nie toleruje równoległych mock serwerów — serial wymagane
test.describe.configure({ mode: 'serial' });

test.describe('Pact Consumer — Posts', () => {
  test('GET /posts/1 zwraca post z 4 polami', async () => {
    await provider
      .given('post with id 1 exists')
      .uponReceiving('GET /posts/1')
      .withRequest({ method: 'GET', path: '/posts/1' })
      .willRespondWith({
        status: 200,
        body: {
          id:     MatchersV3.integer(1),
          title:  MatchersV3.string('sunt aut facere repellat'),
          body:   MatchersV3.string('quia et suscipit'),
          userId: MatchersV3.integer(1),
        },
      })
      .executeTest(async (mockServer) => {
        const response = await fetch(`${mockServer.url}/posts/1`);
        expect(response.status).toBe(200);
        const body = await response.json() as Record<string, unknown>;
        expect(typeof body['id']).toBe('number');
        expect(body['title']).toBeTruthy();
        expect(body['body']).toBeTruthy();
        expect(typeof body['userId']).toBe('number');
      });
  });

  test('POST /posts tworzy nowy post i zwraca 201 z id', async () => {
    await provider
      .uponReceiving('POST /posts')
      .withRequest({
        method: 'POST',
        path: '/posts',
        headers: { 'Content-Type': 'application/json' },
        body: {
          title:  MatchersV3.string('My new post'),
          body:   MatchersV3.string('This is a test post'),
          userId: MatchersV3.integer(1),
        },
      })
      .willRespondWith({
        status: 201,
        body: {
          id:    MatchersV3.integer(101),
          title: MatchersV3.string('My new post'),
        },
      })
      .executeTest(async (mockServer) => {
        const response = await fetch(`${mockServer.url}/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'My new post', body: 'This is a test post', userId: 1 }),
        });
        expect(response.status).toBe(201);
        const body = await response.json() as Record<string, unknown>;
        expect(typeof body['id']).toBe('number');
        expect(body['title']).toBeTruthy();
      });
  });
});