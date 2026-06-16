import { defineConfig } from '@playwright/test';
import { API_BASE_URL, API_HEADERS } from './src/apiConfig';

export default defineConfig({
  testDir: './specs',
  timeout: 30_000,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL: API_BASE_URL,
    extraHTTPHeaders: API_HEADERS,
  },
});
