import { test } from '@playwright/test';
import { Verifier } from '@pact-foundation/pact';
import path from 'path';

// Odpowiednik ProviderJSONPlaceholderTest.java
test('Provider verification — JSONPlaceholder spełnia kontrakty', async () => {
  await new Verifier({
    provider: 'JSONPlaceholder',
    providerBaseUrl: 'https://jsonplaceholder.typicode.com',
    pactUrls: [path.resolve(__dirname, '../../pacts/Consumer-JSONPlaceholder.json')],
    stateHandlers: {
      'post with id 1 exists': async () => {
        // JSONPlaceholder zawsze ma post id=1, nic nie robimy
      },
    },
    logLevel: 'warn',
  }).verifyProvider();
});