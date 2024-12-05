import { describe, test, expect } from "vitest";

import { partA, partB, findExpressions } from "./03";

describe("Day 3: Mull It Over", () => {
  describe("Part A", () => {
    test("findExpressions", () => {
      expect(findExpressions("mul(2,4)")).toEqual(["mul(2,4)"]);
      expect(findExpressions("mul(2,4)%&mul[3,7]")).toEqual(["mul(2,4)"]);
      expect(findExpressions("mul(2,4)%&mul[3,7]!@^do_not_mul(5,5)")).toEqual([
        "mul(2,4)",
        "mul(5,5)",
      ]);
      expect(
        findExpressions(
          "mul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
        )
      ).toEqual(["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"]);
    });
    test("Part A", () => {
      expect(
        partA([
          "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
        ])
      ).toBe(161);
    });
  });
  test("Part B", () => {
    // expect(partB(["mul(1,5)do()mul(2,5)don't()mul(3,5)do()mul(4,5)"])).toBe(30);
    // expect(
    //   partB(["mul(1,5)do()mul(2,5)don't()mul(3,5)don't()mul(4,5)do()mul(5,5)"])
    // ).toBe(50);
    expect(partB(["mul(1,5)do()mul(2,5)don't()mul(3,5)don't()mul(4,5)"])).toBe(
      15
    );
    expect(
      partB([
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
      ])
    ).toBe(48);
  });
});
