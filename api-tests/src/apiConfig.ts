// Jedno źródło prawdy dla bazowego URL i nagłówków API.
// Importowane zarówno przez playwright.config.ts, jak i przez fixture apiClient.ts,
// żeby uniknąć rozjazdu konfiguracji (custom request context nie dziedziczy use{} z configu).
export const API_BASE_URL =
  process.env['API_BASE_URL'] ?? 'https://jsonplaceholder.typicode.com';

export const API_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
} as const;