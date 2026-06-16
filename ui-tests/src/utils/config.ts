// Odpowiednik ConfigReader.java — bazuje na zmiennych env + wartościach domyślnych
export const config = {
  baseUrl: process.env['BASE_URL'] ?? 'https://www.saucedemo.com/',
  headless: process.env['HEADLESS'] !== 'false',
};