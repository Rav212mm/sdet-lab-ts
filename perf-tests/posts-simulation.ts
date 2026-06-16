// Odpowiednik PostsSimulation.java (Gatling) — k6 jako TypeScript-native narzędzie perf
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Options } from 'k6/options';

const SCENARIO = __ENV['SCENARIO'] ?? 'smoke';

// Odpowiednik smokeAssertions / loadAssertions z Gatling
const smokeThresholds = {
  http_req_duration: ['p(95)<2000'],
  http_req_failed:   ['rate<0.01'],
};

const loadThresholds = {
  http_req_duration: ['p(95)<1000', 'avg<500'],
  http_req_failed:   ['rate<0.01'],
  http_reqs:         ['rate>10'],
};

// Odpowiednik setUp() z Gatling + PopulationBuilder
export const options: Options = SCENARIO === 'load'
  ? {
      // rampUsers(50).during(10s) → ramping-vus
      scenarios: {
        load: {
          executor: 'ramping-vus',
          startVUs: 0,
          stages: [{ duration: '10s', target: 50 }],
          gracefulRampDown: '5s',
        },
      },
      maxDuration: '1m',
      thresholds: loadThresholds,
    }
  : {
      // atOnceUsers(1) + repeat(5) → shared-iterations
      scenarios: {
        smoke: {
          executor: 'shared-iterations',
          vus: 1,
          iterations: 5,
        },
      },
      maxDuration: '30s',
      thresholds: smokeThresholds,
    };

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts', {
    headers: { Accept: 'application/json' },
  });

  check(res, { 'status is 200': (r) => r.status === 200 });

  if (SCENARIO === 'load') sleep(1);
}