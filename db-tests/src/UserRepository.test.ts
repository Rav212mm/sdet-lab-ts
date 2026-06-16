import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Client } from 'pg';
import { UserRepository } from './UserRepository';

// Odpowiednik UserRepositoryTest.java — @Testcontainers + @Container → Testcontainers Node.js
describe('UserRepository — testy integracyjne', () => {
  let container: StartedPostgreSqlContainer;
  let client: Client;
  let repository: UserRepository;

  // Jeden kontener dla całej suity — odpowiednik static @Container
  beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:16-alpine').start();
    client = new Client({
      host:     container.getHost(),
      port:     container.getFirstMappedPort(),
      database: container.getDatabase(),
      user:     container.getUsername(),
      password: container.getPassword(),
    });
    await client.connect();
  }, 120_000);

  afterAll(async () => {
    await client.end();
    await container.stop();
  });

  beforeEach(async () => {
    repository = new UserRepository(client);
    await repository.createTable();
  });

  // Odpowiednik @AfterEach cleanup — TRUNCATE RESTART IDENTITY
  afterEach(async () => {
    await client.query('TRUNCATE TABLE users RESTART IDENTITY');
  }, 10_000);

  it('Wstawienie użytkownika i odnalezienie go po email', async () => {
    await repository.insertUser('Jan Kowalski', 'jan@example.com');
    const found = await repository.findByEmail('jan@example.com');
    expect(found).not.toBeNull();
    expect(found!.name).toBe('Jan Kowalski');
    expect(found!.email).toBe('jan@example.com');
  });

  it('Liczba użytkowników po wstawieniu dwóch rekordów wynosi 2', async () => {
    await repository.insertUser('Anna Nowak', 'anna@example.com');
    await repository.insertUser('Piotr Wiśniewski', 'piotr@example.com');
    const count = await repository.countUsers();
    expect(count).toBe(2);
  });

  it('Szukanie nieistniejącego użytkownika zwraca null', async () => {
    const found = await repository.findByEmail('notexist@example.com');
    expect(found).toBeNull();
  });
});