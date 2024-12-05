import { describe, test, expect } from "vitest";

import {
  partA,
  partB,
  findDiagonal,
  findHorizontal,
  findVertical,
  checkIfCrossMas,
} from "./04";

describe("Day 4: Ceres Search", () => {
  describe("Find XMAS", () => {
    test("Find horizontal", () => {
      const matrix = [
        [".", ".", ".", "."],
        ["X", "M", "A", "S"],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
      ];
      expect(findHorizontal(matrix)).toEqual(1);
    });
    test("Find vertical", () => {
      const matrix = [
        [".", "X", ".", "."],
        [".", "M", ".", "."],
        [".", "A", ".", "."],
        [".", "S", ".", "."],
      ];
      expect(findVertical(matrix)).toEqual(1);
    });
    test("Find diagonal", () => {
      const matrix = [
        ["X", ".", ".", "."],
        [".", "M", ".", "."],
        [".", ".", "A", "."],
        [".", ".", ".", "S"],
      ];
      expect(findDiagonal(matrix)).toEqual(1);
    });
    test("Find backwards", () => {
      const matrixHorizontal = [
        ["S", "A", "M", "X"],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
      ];
      const matrixVertical = [
        [".", ".", ".", "S"],
        [".", ".", ".", "A"],
        [".", ".", ".", "M"],
        [".", ".", ".", "X"],
      ];
      const matrixDiagonal = [
        ["S", ".", ".", "X"],
        [".", "A", "M", "."],
        [".", "A", "M", "."],
        ["S", ".", ".", "X"],
      ];

      expect(findHorizontal(matrixHorizontal)).toEqual(1);
      expect(findVertical(matrixVertical)).toEqual(1);
      expect(findDiagonal(matrixDiagonal)).toEqual(2);
    });
    test("Find overlapping", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", "."],
        ["S", ".", ".", ".", ".", ".", "S"],
        [".", "A", ".", ".", ".", "A", "."],
        [".", ".", "M", ".", "M", ".", "."],
        [".", ".", ".", "X", ".", ".", "."],
      ];
      expect(findHorizontal([["X", "M", "A", "S", "A", "M", "X"]])).toEqual(2);
      expect(findDiagonal(matrix)).toEqual(2);
    });
  });
  describe("Part A", () => {
    const smallMatrix = [
      [".", ".", "X", ".", ".", "."],
      [".", "S", "A", "M", "X", "."],
      [".", "A", ".", ".", "A", "."],
      ["X", "M", "A", "S", ".", "S"],
      [".", "X", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", "."],
    ];
    const matrix = [
      ["M", "M", "M", "S", "X", "X", "M", "A", "S", "M"],
      ["M", "S", "A", "M", "X", "M", "S", "M", "S", "A"],
      ["A", "M", "X", "S", "X", "M", "A", "A", "M", "M"],
      ["M", "S", "A", "M", "A", "S", "M", "S", "M", "X"],
      ["X", "M", "A", "S", "A", "M", "X", "A", "M", "M"],
      ["X", "X", "A", "M", "M", "X", "X", "A", "M", "A"],
      ["S", "M", "S", "M", "S", "A", "S", "X", "S", "S"],
      ["S", "A", "X", "A", "M", "A", "S", "A", "A", "A"],
      ["M", "A", "M", "M", "M", "X", "M", "M", "M", "M"],
      ["M", "X", "M", "X", "A", "X", "M", "A", "S", "X"],
    ];
    // const matrix = [
    //   [".", ".", ".", ".", "X", ".", ".", ".", ".", "."],
    //   [".", ".", ".", "M", ".", "M", "S", ".", ".", "."],
    //   [".", ".", ".", "S", ".", ".", "A", ".", ".", "."],
    //   [".", ".", "A", ".", "A", ".", "M", "S", ".", "X"],
    //   [".", "M", "A", "S", ".", "M", ".", ".", "M", "."],
    //   ["X", ".", ".", ".", ".", ".", "X", "A", ".", "."],
    //   [".", ".", "S", ".", "S", ".", "S", ".", "S", "."],
    //   [".", ".", ".", "A", ".", "A", ".", "A", ".", "."],
    //   [".", ".", "M", ".", "M", ".", "M", ".", "M", "."],
    //   [".", "X", ".", "X", ".", "X", ".", ".", ".", "X"],
    // ];
    // const matrix = [
    //   [".", ".", ".", ".", "X", "X", "M", "A", "S", "."],
    //   [".", "S", "A", "M", "X", "M", "S", ".", ".", "."],
    //   [".", ".", ".", "S", ".", ".", "A", ".", ".", "."],
    //   [".", ".", "A", ".", "A", ".", "M", "S", ".", "X"],
    //   ["X", "M", "A", "S", "A", "M", "X", ".", "M", "M"],
    //   ["X", ".", ".", ".", ".", ".", "X", "A", ".", "A"],
    //   ["S", ".", "S", ".", "S", ".", "S", ".", "S", "S"],
    //   [".", "A", ".", "A", ".", "A", ".", "A", ".", "A"],
    //   [".", ".", "M", ".", "M", ".", "M", ".", "M", "M"],
    //   [".", "X", ".", "X", ".", "X", "M", "A", "S", "X"],
    // ];
    test("Horizontal", () => {
      expect(findHorizontal(smallMatrix)).toBe(2);
      expect(findHorizontal(matrix)).toBe(5);
    });
    test("Vertical", () => {
      expect(findVertical(smallMatrix)).toBe(1);
      expect(findVertical(matrix)).toBe(3);
    });
    test("Diagonal", () => {
      expect(findDiagonal(smallMatrix)).toBe(1);
      expect(findDiagonal(matrix)).toBe(10);
    });
    test("Total", () => {
      expect(partA(smallMatrix)).toBe(4);
      expect(partA(matrix)).toBe(18);
    });
  });
  describe("Part B", () => {
    test("check X-MAS in 3x3", () => {
      const matrix = [
        ["M", ".", "S"],
        [".", "A", "."],
        ["M", ".", "S"],
      ];
      expect(checkIfCrossMas(matrix)).toBe(true);
    });
    test("check X-MAS in 5x5", () => {
      const matrix = [
        ["M", ".", "S", ".", "X"],
        [".", "A", ".", "M", "."],
        ["M", ".", "S", ".", "S"],
        [".", "A", ".", "M", "."],
        ["M", ".", "S", ".", "X"],
      ];
      expect(checkIfCrossMas(matrix)).toBe(true);
    });
    test("small X-mas matrix", () => {
      const matrix = [
        ["M", ".", "S"],
        [".", "A", "."],
        ["M", ".", "S"],
      ];

      expect(partB(matrix)).toBe(1);
    });
    test("big X-mas matrix", () => {
      const matrix = [
        [".", "M", ".", "S", ".", ".", ".", ".", ".", "."],
        [".", ".", "A", ".", ".", "M", "S", "M", "S", "."],
        [".", "M", ".", "S", ".", "M", "A", "A", ".", "."],
        [".", ".", "A", ".", "A", "S", "M", "S", "M", "."],
        [".", "M", ".", "S", ".", "M", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["S", ".", "S", ".", "S", ".", "S", ".", "S", "."],
        [".", "A", ".", "A", ".", "A", ".", "A", ".", "."],
        ["M", ".", "M", ".", "M", ".", "M", ".", "M", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      expect(partB(matrix)).toBe(9);
    });
  });
});
