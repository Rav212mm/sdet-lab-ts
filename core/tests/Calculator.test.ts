import { describe, it, expect } from 'vitest';
import { Calculator } from '../src/Calculator';

describe('Calculator', () => {
  const calc = new Calculator();

  it('Dodawanie dwóch liczb', () => {
    const result = calc.add(5, 3);
    if (result.kind !== 'success') throw new Error(`Oczekiwano sukcesu, ale otrzymano błąd: ${result.reason}`);
    expect(result.result).toBe(8);
  });

  it('Dzielenie przez zero zwraca błąd', () => {
    const result = calc.div(10, 0);
    if (result.kind !== 'failure') throw new Error(`Oczekiwano błędu, ale otrzymano sukces z wynikiem: ${result.result}`);
    expect(result.reason).toBe('Dzielenie przez zero');
  });

  // Odpowiednik @ParameterizedTest @CsvSource
  it.each([
    [2, 3, 6],
    [0, 5, 0],
    [-2, 3, -6],
    [10, 0.5, 5],
  ])('Mnożenie %d * %d = %d', (a, b, expected) => {
    const result = calc.mul(a, b);
    if (result.kind !== 'success') throw new Error(`Oczekiwano sukcesu: ${result.reason}`);
    expect(result.result).toBe(expected);
  });

  // Odpowiednik @TestFactory (dynamiczne testy)
  it.each([
    [10, 5, 15],
    [20, 30, 50],
    [-5, 5, 0],
    [0, 0, 0],
  ])('Dynamiczne testy: %d + %d = %d', (a, b, expected) => {
    const result = calc.add(a, b);
    if (result.kind !== 'success') throw new Error(`Oczekiwano sukcesu: ${result.reason}`);
    expect(result.result).toBe(expected);
  });
});