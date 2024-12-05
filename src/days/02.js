import { readFileSync } from "fs";

export function checkSameDirection(list) {
  // return list.every((value, index) => value === list[index + 1]);
  return list.every((value) => value >= 0) || list.every((value) => value <= 0);
}

export function getDistances(list) {
  return list.map((value, index) => (list[index + 1] ?? value) - value);
}

function checkNoStagnation(list) {
  return list.every((value, index) => value !== 0 || index === list.length - 1);
}

/**
 * Checks if the line is safe.
 * @param {number[]} line - An array of numbers representing a line.
 * @returns {boolean} - Returns true if the line is safe, false otherwise.
 */
function checkSafeDistance(line) {
  return !line.some((value) => Math.abs(value) > 3);
}

export function partA(input) {
  const data = input
    .map((line) => line.split(" ").map(Number))
    .map(getDistances)
    .filter(checkSafeDistance)
    .filter(checkSameDirection)
    .filter(checkNoStagnation);

  return data.length;
}

export function testWithMargin(list) {
  if (
    checkSafeDistance(getDistances(list)) &&
    checkSameDirection(getDistances(list)) &&
    checkNoStagnation(getDistances(list))
  ) {
    return true;
  }
  console.log("Testing:", list);
  const tempLines = new Array(list.length)
    .fill(0)
    .map((_, i) => [...list.slice(0, i), ...list.slice(i + 1)]);

  const isSafe = tempLines.findIndex((rawLine) => {
    const line = getDistances(rawLine);

    return (
      checkSafeDistance(line) &&
      checkSameDirection(line) &&
      checkNoStagnation(line)
    );
  });

  return isSafe >= 0;
}

export function partB(input) {
  const data = input
    .map((line) => line.split(" ").map(Number))
    .filter(testWithMargin);

  return data.length;
}

if (import.meta.url.endsWith(process.argv[1])) {
  const data = readFileSync("../data/02.txt", "utf-8").split("\n");
  console.log(partA(data));
  console.log(partB(data));
}
