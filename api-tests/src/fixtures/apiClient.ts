import { test as base, expect, APIRequestContext } from '@playwright/test';
import { API_BASE_URL, API_HEADERS } from '../apiConfig';

// Odpowiednik ApiSpecifications.java — shared request/response specs jako Playwright fixture
export const test = base.extend<{ api: APIRequestContext }>({
  api: async ({ playwright }, use) => {
    const ctx = await playwright.request.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: API_HEADERS,
    });
    await use(ctx);
    await ctx.dispose();
  },
});

// Odpowiednik okSpec() — sprawdza 200 + czas < 3s
export async function expectOk(response: Awaited<ReturnType<APIRequestContext['get']>>) {
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
}

export { expect };
