import { describe, it, expect } from "bun:test";
import { linear } from "./scaling-functions";

describe('scaling functions', () => {
  it('linear with 4hr as worst', () => {
    expect(linear(4, 8, 120, 4, 0)).toEqual(0);
    expect(linear(5, 8, 120, 4, 0)).toEqual(30);
    expect(linear(8, 8, 120, 4, 0)).toEqual(120);
    expect(linear(10, 8, 120, 4, 0)).toEqual(120);
  });

  it('linear with 5hr as worst', () => {
    expect(linear(4, 8, 120, 5, 0)).toEqual(0);
    expect(linear(5, 8, 120, 5, 0)).toEqual(0);
    expect(linear(6.23, 8, 120, 5, 0)).toBeWithin(49, 50);
    expect(linear(8, 8, 120, 5, 0)).toEqual(120);
    expect(linear(10, 8, 120, 5, 0)).toEqual(120);
  });
});
