export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const sortNumbers = (
  numbers: number[],
  direction: "asc" | "desc",
): number[] => {
  const sortedNumbers = numbers.slice();
  if (direction === "asc") {
    return sortedNumbers.sort((a, b) => a - b);
  } else if (direction === "desc") {
    return sortedNumbers.sort((a, b) => b - a);
  } else {
    throw new Error("Invalid direction. Use 'asc' or 'desc'.");
  }
};

export const getRandomValueOrNull = () => {
  const shouldIncrease = !!getRandomInt(0, 1);

  return shouldIncrease ? getRandomInt(1, 100) : null;
};

export const getRandomFrom = <T>(...params: T[]): T => {
  if (params.length === 0) throw Error("No params passed");

  const randomIndex = getRandomInt(0, params.length - 1);
  return params[randomIndex];
};
