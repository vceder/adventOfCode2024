import { describe, test, expect } from "vitest";
import { checkValidity, createRules, partA, partB, reorderInvalid } from "./05";
const rawRules = [
  "47|53",
  "97|13",
  "97|61",
  "97|47",
  "75|29",
  "61|13",
  "75|53",
  "29|13",
  "97|29",
  "53|29",
  "61|53",
  "97|53",
  "61|29",
  "47|13",
  "75|47",
  "97|75",
  "47|61",
  "75|61",
  "47|29",
  "75|13",
  "53|13",
];

const rawPages = [
  "75,47,61,53,29",
  "97,61,53,29,13",
  "75,29,13",
  "75,97,47,61,53",
  "61,13,29",
  "97,13,75,29,47",
];

describe("Day 5: Print Queue", () => {
  describe("Rules", () => {
    test("rules are created", () => {
      const rules = createRules(rawRules);
      expect(rules).toEqual({
        47: [53, 13, 61, 29],
        97: [13, 61, 47, 29, 53, 75],
        75: [29, 53, 47, 61, 13],
        61: [13, 53, 29],
        29: [13],
        53: [29, 13],
      });
    });
  });
  describe("Pages", () => {
    const rules = createRules(rawRules);
    test(`${rawPages[0]} is valid`, () => {
      expect(checkValidity(rules, rawPages[0].split(",").map(Number))).toBe(
        true
      );
    });
    test(`${rawPages[1]} is valid`, () => {
      expect(checkValidity(rules, rawPages[1].split(",").map(Number))).toBe(
        true
      );
    });
    test(`${rawPages[2]} is valid`, () => {
      expect(checkValidity(rules, rawPages[2].split(",").map(Number))).toBe(
        true
      );
    });
    test(`${rawPages[3]} is not valid`, () => {
      expect(checkValidity(rules, rawPages[3].split(",").map(Number))).toBe(
        false
      );
    });
    test(`${rawPages[4]} is not valid`, () => {
      expect(checkValidity(rules, rawPages[4].split(",").map(Number))).toBe(
        false
      );
    });
    test(`${rawPages[5]} is not valid`, () => {
      expect(checkValidity(rules, rawPages[5].split(",").map(Number))).toBe(
        false
      );
    });
  });
  describe("Part A", () => {
    test("Part A", () => {
      expect(partA([rawRules, rawPages])).toBe(143);
    });
  });
  describe("Part B", () => {
    test("reorderInvalid", () => {
      const rules = createRules(rawRules);
      expect(reorderInvalid(rules, [75, 97, 47, 61, 53])).toEqual([
        97, 75, 47, 61, 53,
      ]);
      expect(reorderInvalid(rules, [61, 13, 29])).toEqual([61, 29, 13]);
      expect(reorderInvalid(rules, [97, 13, 75, 29, 47])).toEqual([
        97, 75, 47, 29, 13,
      ]);
    });
    test("Part B", () => {
      expect(
        partB([
          rawRules,
          ["75, 97, 47, 61, 53", "61, 13, 29", "97, 13, 75, 29, 47"],
        ])
      ).toBe(123);
    });
  });
});
