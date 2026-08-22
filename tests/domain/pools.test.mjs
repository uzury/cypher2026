import { describe, expect, it } from "vitest";
import {
  adjustPoolBase,
  adjustPoolCurrent,
  adjustPoolEdge,
  clampPoolCurrent,
  resetPoolCurrent
} from "../../scripts/domain/pools.mjs";

describe("pool domain operations", () => {
  it("clamps current pool to zero and total", () => {
    expect(clampPoolCurrent(-2, 10)).toBe(0);
    expect(clampPoolCurrent(15, 10)).toBe(10);
    expect(clampPoolCurrent(7, 10)).toBe(7);
  });

  it("adjusts current pool without exceeding bounds", () => {
    expect(adjustPoolCurrent(5, 10, 3)).toBe(8);
    expect(adjustPoolCurrent(5, 10, -8)).toBe(0);
    expect(adjustPoolCurrent(9, 10, 5)).toBe(10);
  });

  it("resets current pool to total", () => {
    expect(resetPoolCurrent(10)).toBe(10);
    expect(resetPoolCurrent(-5)).toBe(0);
  });

  it("does not allow base below zero", () => {
    expect(adjustPoolBase(5, -2)).toBe(3);
    expect(adjustPoolBase(5, -10)).toBe(0);
  });

  it("does not allow edge below zero", () => {
    expect(adjustPoolEdge(2, -1)).toBe(1);
    expect(adjustPoolEdge(2, -5)).toBe(0);
  });
});
