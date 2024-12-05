import { readFileSync } from "fs";

export function findExpressions(input) {
  return input.match(/mul\(\d{1,3},\d{1,3}\)/g) ?? [];
}

export function partA(input) {
  const data = input
    .flatMap(findExpressions)
    .map((expression) => expression.match(/\d{1,3}/g).map(Number))
    .reduce((acc, [a, b]) => acc + a * b, 0);

  return data;
}

export function partB(input) {
  const data = input
    .join()
    .split("do()")
    .map((line) => line.split("don't()")[0])
    .flatMap(findExpressions)
    .map((expression) => expression.match(/\d{1,3}/g).map(Number))
    .reduce((acc, [a, b]) => acc + a * b, 0);

  return data;
}

if (import.meta.url.endsWith(process.argv[1])) {
  const data = readFileSync("../data/03.txt", "utf-8").trim().split("\n");
  console.log(partA(data));
  console.log(partB(data));
}
