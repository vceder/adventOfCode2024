import { readFileSync } from "fs";

/**
 * genereate all possible equations with the given values and operators
 * @param {number[]} values
 * @param {string[]} operators
 * @returns {Array<Array<string|number>>}
 */
export function getPossibleEquations(values, operators = ["+", "*"]) {
  if (values.length === 1) {
    return [[values[0]]];
  }
  const equations = [];
  for (const operator of operators) {
    const first = values[0];
    const rest = values.slice(1);
    const restEquations = getPossibleEquations(rest, operators);
    for (const equation of restEquations) {
      equations.push([first, operator, ...equation]);
    }
  }
  return equations;
}
/**
 * @param {Array<string|number} equation
 */
export function executeEquation(equation) {
  let total = 0;
  let operator = "+";
  for (const value of equation) {
    if (typeof value === "number") {
      if (operator === "+") {
        total += value;
      } else if (operator === "||") {
        total = Number(String(total) + String(value));
      } else {
        total *= value;
      }
    } else {
      operator = value;
    }
  }
  return total;
}

/**
 * @param {Object} testCase
 * @param {number} testCase.test
 * @param {number[]} testCase.values
 * @returns {boolean}
 */
export function isSolvable(testCase, operators = ["+", "*"]) {
  const equations = getPossibleEquations(testCase.values, operators);
  return equations.some(
    (equation) => executeEquation(equation) === testCase.test
  );
}

export function partA(input) {
  return input
    .map((row) => row.split(":"))
    .map(([test, values]) => ({
      test: Number(test),
      values: values.split(" ").map(Number),
    }))
    .filter((testCase) => isSolvable(testCase))
    .reduce((total, { test }) => total + test, 0);
}
export function partB(input) {
  return input
    .map((row) => row.split(":"))
    .map(([test, values]) => ({
      test: Number(test),
      values: values.split(" ").map(Number),
    }))
    .filter((testCase) => isSolvable(testCase, ["+", "*", "||"]))
    .reduce((total, { test }) => total + test, 0);
}

if (import.meta.url.endsWith(process.argv[1])) {
  const input = readFileSync("../data/07.txt", "utf-8").split("\n");
  console.log(partA(input));
  console.log(partB(input));
}
