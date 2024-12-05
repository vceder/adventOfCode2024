import { describe, test, expect } from "vitest";

import { partA, partB, checkSameDirection, getDistances } from "./02";

describe("Day 2: Red-Nosed Reports", () => {
  test("checkSameDirection", () => {
    expect(checkSameDirection([1, 0, 1, 1])).toBe(true);
    expect(checkSameDirection([1, 0, 1, -2])).toBe(false);
  });

  test("getDistances", () => {
    expect(getDistances([1, 2, 3, 4])).toEqual([1, 1, 1, 0]);
    expect(getDistances([1, 2, 3])).toEqual([1, 1, 0]);
  });

  test("Part 1", () => {
    expect(
      partA([
        "7 6 4 2 1",
        "1 2 7 8 9",
        "9 7 6 2 1",
        "1 3 2 4 5",
        "8 6 4 4 1",
        "1 3 6 7 9",
      ])
    ).toEqual(2);
  });
  test("Part 2", () => {
    expect(
      partB([
        "7 6 4 2 1",
        "1 2 7 8 9",
        "9 7 6 2 1",
        "1 3 2 4 5",
        "8 6 4 4 1",
        "1 3 6 7 9",
        "2 1 2 4 5",
      ])
    ).toBe(5);
  });
});
