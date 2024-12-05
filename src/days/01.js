import { readFileSync } from "node:fs";

export function partA(input) {
  const [left, right] = input
    .map((line) => line.split("   ").map(Number))
    .reduce(
      ([left, right], [leftItem, rightItem]) => [
        [...left, leftItem],
        [...right, rightItem],
      ],
      [[], []]
    )
    .map((list) => list.sort((a, b) => a - b));

  const data = left
    .map((value, i) => Math.abs(value - right[i]))
    .reduce((a, b) => a + b, 0);

  return data;
}

export function partB(input) {
  const [left, right] = input
    .map((line) => line.split("   ").map(Number))
    .reduce(
      ([left, right], [leftItem, rightItem]) => [
        [...left, leftItem],
        [...right, rightItem],
      ],
      [[], []]
    );
  const occurrences = right.reduce((occurrences, value) => {
    occurrences[value] = (occurrences[value] || 0) + 1;
    return occurrences;
  }, {});

  const data = left
    .map((value) => (occurrences[value] || 0) * value)
    .reduce((a, b) => a + b, 0);
  return data;
}

function main() {
  const data = readFileSync("../data/01.txt", "utf-8").split("\n");
  console.log(partA(data));
  console.log(partB(data));
}
if (import.meta.url.endsWith(process.argv[1])) {
  main();
}
