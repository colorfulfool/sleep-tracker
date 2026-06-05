import { describe, it, expect } from "bun:test";
import everyDay from "./every-day";

describe('everyDay', () => {
  it('fills gaps in the middle of the month', () => {
    const gen = everyDay([
      "2026-03-01,6:26,16:14",
      "2026-03-04,7:24,12:55",
      "2026-03-05,6:44,14:06"
    ]);
    expect(gen.next().value).toEqual(["2026-03-01", "6:26", "16:14"])
    expect(gen.next().value).toEqual(["2026-03-02", "", ""])
    expect(gen.next().value).toEqual(["2026-03-03", "", ""])
    expect(gen.next().value).toEqual(["2026-03-04", "7:24", "12:55"])
    expect(gen.next().value).toEqual(["2026-03-05", "6:44", "14:06"])
    expect(gen.next().value).toBeFalsy()
  });

  it('adds missing first day', () => {
    const gen = everyDay([
      "2026-03-02,6:26,16:14",
      "2026-03-03,7:24,12:55",
    ]);
    expect(gen.next().value).toEqual(["2026-03-01", "", ""])
    expect(gen.next().value).toEqual(["2026-03-02", "6:26", "16:14"])
    expect(gen.next().value).toEqual(["2026-03-03", "7:24", "12:55"])
    expect(gen.next().value).toBeFalsy()
  });
});
