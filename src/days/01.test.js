import { describe, test, expect } from "vitest";

import { partA, partB } from "./01";

describe("Day 1: Historian Hysteria", () => {
  test("Part 1", () => {
    expect(partA(["3   4", "4   3", "2   5", "1   3", "3   9", "3   3"])).toBe(
      11
    );
  });
  test("Part 2", () => {
    expect(partB(["3   4", "4   3", "2   5", "1   3", "3   9", "3   3"])).toBe(
      31
    );
  });
});
