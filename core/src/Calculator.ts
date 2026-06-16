// TypeScript discriminated union = odpowiednik Java sealed interface + records
export type OperationResult = Success | Failure;

export type Success = { readonly kind: 'success'; readonly result: number };
export type Failure = { readonly kind: 'failure'; readonly reason: string };

export class Calculator {
  add(a: number, b: number): OperationResult {
    return { kind: 'success', result: a + b };
  }

  sub(a: number, b: number): OperationResult {
    return { kind: 'success', result: a - b };
  }

  mul(a: number, b: number): OperationResult {
    return { kind: 'success', result: a * b };
  }

  div(a: number, b: number): OperationResult {
    if (b === 0) return { kind: 'failure', reason: 'Dzielenie przez zero' };
    return { kind: 'success', result: a / b };
  }
}
