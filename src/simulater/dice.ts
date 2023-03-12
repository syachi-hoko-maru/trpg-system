const dice = (num: number) => {
  return Math.ceil(Math.random() * num);
};
const ndice = (count: number, num: number) => {
  const resultArray: number[] = [];
  for (let i = 0; i < count; i++) {
    resultArray.push(dice(num));
  }
  return resultArray;
};
type Target = {
  type: "=" | "<" | ">" | "<=" | ">=";
  value: number;
  func?: (value: number) => boolean;
};
const checkTarget = (value: number, target: Target): boolean => {
  switch (target.type) {
    case "=":
      return value === target.value;
    case "<":
      return value < target.value;
    case ">":
      return value > target.value;
    case "<=":
      return value <= target.value;
    case ">=":
      return value >= target.value;
  }
};
const nd = (count: number, num: number, target?: Target): NdResult => {
  const ndiceArray = ndice(count, num);
  const sum = ndiceArray.reduce((sum, num) => (sum += num), 0);
  if (!target) return { ndiceArray, sum };
  else return { ndiceArray, sum, check: checkTarget(sum, target) };
};
const nb = (count: number, num: number, target: Target) => {
  const ndiceArray = ndice(count, num);
  const checkArray = ndiceArray.map((value) => checkTarget(value, target));
  return { ndiceArray, checkArray };
};

export default {
  dice,
  ndice,
  nd,
  nb,
};
