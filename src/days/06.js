import { readFileSync } from "fs";

export function buildMatrix(input) {
  return input.map((row, y) =>
    row.map((value, x) => ({
      x,
      y,
      value,
      visited: false,
      previousDirections: [],
    }))
  );
}
export function isGuard(cell) {
  // console.log("Checking cell", cell);
  switch (cell.value) {
    case "^":
    case "v":
    case "<":
    case ">":
      return true;
    default:
      return false;
  }
}

function getDirection(cell) {
  switch (cell.value) {
    case "^":
      return { dx: 0, dy: -1 };
    case "v":
      return { dx: 0, dy: 1 };
    case "<":
      return { dx: -1, dy: 0 };
    case ">":
      return { dx: 1, dy: 0 };
    default:
      return { dx: 0, dy: 0 };
  }
}

function turnRight(cell) {
  switch (cell.value) {
    case "^":
      cell.value = ">";
      break;
    case "v":
      cell.value = "<";
      break;
    case "<":
      cell.value = "^";
      break;
    case ">":
      cell.value = "v";
      break;
    default:
      break;
  }
}

function isWall(cell) {
  return cell?.value === "#";
}

export function findGuard(matrix) {
  return matrix.flat().find(isGuard);
  // return matrix.find((row) => row.some(isGuard));
}

export function moveGuard(matrix, checkForLoops = false) {
  const currentGuard = findGuard(matrix);

  if (!currentGuard) {
    // console.log("No guard found");
    return false;
  }

  const direction = getDirection(currentGuard);
  const nextCell =
    matrix[currentGuard.y + direction.dy]?.[currentGuard.x + direction.dx];

  if (isWall(nextCell)) {
    turnRight(currentGuard);
    // console.log("Turning right");
    return true;
  }
  const nextGuard =
    matrix[currentGuard.y + direction.dy]?.[currentGuard.x + direction.dx];
  if (nextGuard) {
    // console.log("Moving guard");
    nextGuard.value = currentGuard.value;
    if (!currentGuard.previousDirections.includes(currentGuard.value)) {
      currentGuard.previousDirections.push(currentGuard.value);
    }
    if (checkForLoops) {
      const tmpGuard = { value: currentGuard.value };
      // turnRight(tmpGuard);
      // console.log("Possible loop", nextGuard, tmpGuard.value);
      if (
        nextGuard.visited &&
        nextGuard.previousDirections.includes(tmpGuard.value)
      ) {
        // INFINITE LOOP BREAK
        // console.log("Infinite loop detected");
        throw new Error("Infinite loop detected");
      }
    }
    currentGuard.value = ".";
    currentGuard.visited = true;
    return true;
  } else {
    // console.log("No next guard");
    // console.log("Current guard", currentGuard);
    // console.log(
    //   "Next guard",
    //   nextGuard,
    //   currentGuard.y + direction.dy,
    //   currentGuard.x + direction.dx
    // );
    return false;
  }
}

export function countVisited(matrix) {
  return matrix.flat().filter((cell) => cell.visited).length;
}

function drawMatrix(matrix) {
  console.log(
    matrix
      .map((row) =>
        row.map((cell) => (cell.visited ? "X" : cell.value)).join("")
      )
      .join("\n")
  );
}

export function partA(input) {
  const matrix = buildMatrix(input);
  let steps = 0;
  while (moveGuard(matrix)) {
    steps++;
    process.stdout.write(`Building matrix ${steps}\r`);
  }
  // drawMatrix(matrix);
  return countVisited(matrix) + 1;
}

function copyMatrix(matrix) {
  return matrix.map((row) =>
    row.map((cell) => ({
      ...cell,
      previousDirections: [...cell.previousDirections],
    }))
  );
}

function addStone(matrix) {
  const guard = findGuard(matrix);
  if (!guard) {
    return;
  }
  const direction = getDirection(guard);
  const nextCell = matrix[guard.y + direction.dy]?.[guard.x + direction.dx];
  if (nextCell) {
    nextCell.value = "#";
  }
}

export function partB(input) {
  const baseMatrix = buildMatrix(input);
  let steps = 0;
  const matricesToTry = [];
  let loops = 0;
  while (moveGuard(baseMatrix)) {
    steps++;
    // matricesToTry.push(copyMatrix(baseMatrix));
    process.stdout.write(`Trying matrix ${steps} out of 5641\r`);
    try {
      const matrix = copyMatrix(baseMatrix);
      addStone(matrix);
      while (moveGuard(matrix, true)) {
        // drawMatrix(matrix);
        // console.log("Steps", steps, "\n");
      }
    } catch (e) {
      loops++;
      continue;
    }
    // process.stdout.write(`Building matrix ${steps}\r`);
  }
  console.log(`Trying matrix ${steps} out of 5641`);
  // console.log("Built", matricesToTry.length, "matrices");
  // drawMatrix(matrix);
  // const loopMatrices = [];
  // for (let i = 0; i < matricesToTry.length; i++) {
  //   const matrix = matricesToTry[i];
  //   addStone(matrix);
  //   let steps = 0;
  //   // process.stdout.write(`Trying matrix ${i} of ${matricesToTry.length}\r`);
  //   try {
  //     // console.log("Trying matrix", i, "of", matricesToTry.length);
  //     while (moveGuard(matrix, true)) {
  //       // console.log(i);
  //       // drawMatrix(matrix);
  //       steps++;
  //       // console.log("Steps", steps, "\n");
  //     }
  //   } catch (e) {
  //     loops++;
  //     // console.log("found loop!");
  //     // loopMatrices.push(matrix);
  //     continue;
  //   }
  //   // drawMatrix(matrix);
  // }

  // for (const matrix of loopMatrices) {
  //   drawMatrix(matrix);
  //   console.log("\n");
  // }

  return loops;
}

if (import.meta.url.endsWith(process.argv[1])) {
  const data = readFileSync("../data/06.txt", "utf-8")
    .split("\n")
    .map((line) => line.split(""));
  // console.log(partA(data));
  const matrix = [
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
  ];
  // console.log(partB(matrix));
  console.log(partB(data));
}
