import { components } from "../../data/components";
import { getRandomInt } from "./math";

export const getRandomComponent = () => {
  const lastIndex = components.length - 1;
  const randomIndex = getRandomInt(0, lastIndex);

  return components[randomIndex];
};
