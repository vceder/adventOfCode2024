import { readFileSync } from "fs";

function search({ matrix, target, found, x, y, dx, dy }) {
  if (matrix[y]?.[x] !== target[found.length]) {
    return false;
  }

  const foundNow = found + matrix[y][x];
  if (foundNow === target) {
    return true;
  }

  return search({
    matrix,
    target,
    found: foundNow,
    x: x + dx,
    y: y + dy,
    dx,
    dy,
  });
}
export function findHorizontal(matrix) {
  return matrix
    .map((row, y) =>
      row.map(
        (_, x) =>
          [
            search({
              matrix,
              target: "XMAS",
              found: "",
              x,
              y,
              dx: 1,
              dy: 0,
            }),
            search({
              matrix,
              target: "XMAS",
              found: "",
              x,
              y,
              dx: -1,
              dy: 0,
            }),
          ].filter(Boolean).length
      )
    )
    .flat()
    .reduce((acc, curr) => acc + curr, 0);
}

export function findVertical(matrix) {
  return matrix
    .map((row, y) =>
      row.map(
        (_, x) =>
          [
            search({
              matrix,
              target: "XMAS",
              found: "",
              x,
              y,
              dx: 0,
              dy: 1,
            }),
            search({
              matrix,
              target: "XMAS",
              found: "",
              x,
              y,
              dx: 0,
              dy: -1,
            }),
          ].filter(Boolean).length
      )
    )
    .flat()
    .reduce((acc, curr) => acc + curr, 0);
}

export function findDiagonal(matrix) {
  return matrix
    .map((row, y) =>
      row.map(
        (_, x) =>
          [
            search({
              matrix,
              target: "XMAS",
              found: "",
              x,
              y,
              dx: 1,
              dy: 1,
            }),
            search({
              matrix,
              target: "XMAS",
              found: "",
              x,
              y,
              dx: 1,
              dy: -1,
            }),
            search({
              matrix,
              target: "XMAS",
              found: "",
              x,
              y,
              dx: -1,
              dy: 1,
            }),
            search({
              matrix,
              target: "XMAS",
              found: "",
              x,
              y,
              dx: -1,
              dy: -1,
            }),
          ].filter(Boolean).length
      )
    )
    .flat()
    .reduce((acc, curr) => acc + curr, 0);
}

export function partA(input) {
  return findHorizontal(input) + findVertical(input) + findDiagonal(input);
}

export function checkIfCrossMas(matrix) {
  return (
    ((matrix[0][0] === "M" && matrix[2][2] === "S") ||
      (matrix[0][0] === "S" && matrix[2][2] === "M")) &&
    ((matrix[0][2] === "M" && matrix[2][0] === "S") ||
      (matrix[0][2] === "S" && matrix[2][0] === "M"))
  );
}

function makeSubsetMatrix(matrix, x, y) {
  return [
    [matrix[y - 1]?.[x - 1], matrix[y - 1]?.[x], matrix[y - 1]?.[x + 1]],
    [matrix[y]?.[x - 1], matrix[y]?.[x], matrix[y]?.[x + 1]],
    [matrix[y + 1]?.[x - 1], matrix[y + 1]?.[x], matrix[y + 1]?.[x + 1]],
  ];
}

export function partB(input) {
  return input
    .map((row, y) =>
      row.map((char, x) =>
        char === "A" ? checkIfCrossMas(makeSubsetMatrix(input, x, y)) : false
      )
    )
    .flat()
    .filter(Boolean).length;
}

if (import.meta.url.endsWith(process.argv[1])) {
  const data = readFileSync("../data/04.txt", "utf-8")
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  console.log(partA(data));
  console.log(partB(data));
}
