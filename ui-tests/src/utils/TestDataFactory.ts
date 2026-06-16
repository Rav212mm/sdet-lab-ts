import { faker } from '@faker-js/faker';
import { Role, type SauceDemoUser } from '../model/SauceDemoUser';
import type { CheckoutData } from '../model/CheckoutData';

const SHARED_PASSWORD = 'secret_sauce';

// Odpowiednik TestDataFactory.java
export class TestDataFactory {
  static userForRole(role: string): SauceDemoUser {
    const matched = Object.values(Role).find(
      r => r === role || r.replace('_user', '') === role || role === r.split('_')[0]
    );
    if (!matched) {
      // próba dopasowania po enum key (np. "standard" → STANDARD → "standard_user")
      const byKey = (Role as Record<string, string>)[role.toUpperCase()];
      if (!byKey) throw new Error(`Unknown SauceDemo role: ${role}`);
      return { username: byKey, password: SHARED_PASSWORD, role };
    }
    return { username: matched, password: SHARED_PASSWORD, role };
  }

  static randomCheckoutData(): CheckoutData {
    return {
      firstName: faker.person.firstName(),
      lastName:  faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }
}