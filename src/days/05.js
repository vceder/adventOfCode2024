import { readFileSync } from "fs";

export function createRules(data) {
  return data.reduce((rules, rule) => {
    const [key, values] = rule.split("|").map(Number);
    rules[key] = rules[key] ?? [];
    rules[key].push(values);
    return rules;
  }, {});
}
export function checkValidity(rules, pages) {
  const result = pages.map((page, i) => {
    return !pages.slice(0, i).some((p) => rules[page]?.includes(p));
  });
  return result.every(Boolean);
}

export function partA(data) {
  const rules = createRules(data[0]);
  const pages = data[1].map((page) => page.split(",").map(Number));
  return pages
    .filter((page) => checkValidity(rules, page))
    .map((page) => page[Math.round((page.length - 1) / 2)])
    .reduce((acc, curr) => acc + curr, 0);
}

export function reorderInvalid(rules, pages) {
  const invalids = pages
    .map((page, i) => pages.slice(0, i).some((p) => rules[page]?.includes(p)))
    .map((invalid, i) => (invalid ? pages[i] : null))
    .filter(Boolean);

  const valid = pages.filter((page) => !invalids.includes(page));

  const brokenRules = invalids.map((invalid) => ({
    page: invalid,
    rule: rules[invalid],
  }));

  for (let i = 0; i < brokenRules.length; i++) {
    const { page, rule } = brokenRules[i];
    const index = valid.findIndex((v) => rule.includes(v));
    valid.splice(index, 0, page);
  }
  return valid;
}

export function partB(data) {
  const rules = createRules(data[0]);
  const pages = data[1].map((page) => page.split(",").map(Number));
  return pages
    .filter((page) => !checkValidity(rules, page))
    .map((page) => reorderInvalid(rules, page))
    .map((page) => page[Math.round((page.length - 1) / 2)])
    .reduce((acc, curr) => acc + curr, 0);
}

if (import.meta.url.endsWith(process.argv[1])) {
  const data = readFileSync("../data/05.txt", "utf-8")
    .trim()
    .split("\n\n")
    .map((data) => data.split("\n"));

  console.log(partA(data));
  console.log(partB(data));
}
