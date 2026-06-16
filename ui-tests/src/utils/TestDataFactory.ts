import { faker } from '@faker-js/faker';
import { Role, type SauceDemoUser } from '../model/SauceDemoUser';
import type { CheckoutData } from '../model/CheckoutData';

const SHARED_PASSWORD = 'secret_sauce';

// Jawna mapa alias → Role. Klucze: krótka nazwa roli (z feature'a),
// pełny username (np. Role.STANDARD) oraz nazwa enuma (STANDARD).
const ROLE_ALIASES: ReadonlyMap<string, Role> = new Map(
  Object.entries(Role).flatMap(([key, value]) => [
    [key.toLowerCase(), value] as const,          // "standard"
    [value, value] as const,                      // "standard_user"
    [value.replace(/_user$/, ''), value] as const, // "locked_out", "standard"
  ]),
);

// Odpowiednik TestDataFactory.java
export class TestDataFactory {
  static userForRole(role: string): SauceDemoUser {
    const username = ROLE_ALIASES.get(role.toLowerCase());
    if (!username) throw new Error(`Unknown SauceDemo role: ${role}`);
    return { username, password: SHARED_PASSWORD, role };
  }

  static randomCheckoutData(): CheckoutData {
    return {
      firstName: faker.person.firstName(),
      lastName:  faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }
}