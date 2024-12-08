import { describe, test, expect } from "vitest";

import {
  partA,
  partB,
  isSolvable,
  getPossibleEquations,
  executeEquation,
} from "./07";
const input = [
  "190: 10 19",
  "3267: 81 40 27",
  "83: 17 5",
  "156: 15 6",
  "7290: 6 8 6 15",
  "161011: 16 10 13",
  "192: 17 8 14",
  "21037: 9 7 18 13",
  "292: 11 6 16 20",
];

describe("Day 7: Bridge Repair", () => {
  describe("MATH", () => {
    test("Get equations", () => {
      expect(getPossibleEquations([10, 19])).toEqual([
        [10, "+", 19],
        [10, "*", 19],
      ]);
      expect(getPossibleEquations([81, 40, 27])).toEqual([
        [81, "+", 40, "+", 27],
        [81, "+", 40, "*", 27],
        [81, "*", 40, "+", 27],
        [81, "*", 40, "*", 27],
      ]);
    });
    test("Execute equations", () => {
      expect(executeEquation([10, "+", 19])).toBe(29);
      expect(executeEquation([10, "*", 19])).toBe(190);
    });
  });
  describe("Part A", () => {
    test("190: 10 19 is solvable", () => {
      expect(isSolvable({ test: 190, values: [10, 19] })).toBe(true);
    });
    test("3267: 81 40 27 is solvable", () => {
      expect(isSolvable({ test: 3267, values: [81, 40, 27] })).toBe(true);
    });
    test("292: 11 6 16 20 is solvable", () => {
      expect(isSolvable({ test: 292, values: [11, 6, 16, 20] })).toBe(true);
    });
    test("83: 17 5 is not solvable", () => {
      expect(isSolvable({ test: 83, values: [17, 5] })).toBe(false);
    });
    test("156: 15 6 is not solvable", () => {
      expect(isSolvable({ test: 156, values: [15, 6] })).toBe(false);
    });
    test("7290: 6 8 6 15 is not solvable", () => {
      expect(isSolvable({ test: 7290, values: [6, 8, 6, 15] })).toBe(false);
    });
    test("161011: 16 10 13 is not solvable", () => {
      expect(isSolvable({ test: 161011, values: [16, 10, 13] })).toBe(false);
    });
    test("192: 17 8 14 is not solvable", () => {
      expect(isSolvable({ test: 192, values: [17, 8, 14] })).toBe(false);
    });
    test("21037: 9 7 18 13 is not solvable", () => {
      expect(isSolvable({ test: 21037, values: [9, 7, 18, 13] })).toBe(false);
    });
    test("Part A", () => {
      expect(partA(input)).toBe(3749);
    });
  });
  describe("Part B", () => {
    test("Part B", () => {
      expect(partB(input)).toBe(11387);
    });
  });
});
