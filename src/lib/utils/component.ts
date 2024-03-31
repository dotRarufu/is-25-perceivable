import { components } from "../../data/components";
import { getRandomInt, sortNumbers } from "./math";

export const getRandomComponent = () => {
  const lastIndex = components.length - 1;
  const randomIndex = getRandomInt(0, lastIndex);

  return components[randomIndex];
};

export const getRandomComponentWithin = (
  // This used for picking a component to use in each level
  screenWidth: number,
  screenHeight: number,
  // TODO: currentNumber should affect returned components
  currentNumber: number,
) => {
  const filteredComponents = [components[0]]
    .filter((c) => {
      const qualifiedVariants = c.variants.filter((v) => {
        const widthLargest = sortNumbers(v.width, "desc")[0];
        const heightLargest = sortNumbers(v.height, "desc")[0];

        // Within screen
        return widthLargest < screenWidth && heightLargest < screenHeight;
      });

      if (qualifiedVariants.length === 0) return false;

      return true;
    })
    .map((c) => {
      const qualifiedVariants = c.variants.filter((v) => {
        const widthLargest = sortNumbers(v.width, "desc")[0];
        const heightLargest = sortNumbers(v.height, "desc")[0];

        return widthLargest < screenWidth && heightLargest < screenHeight;
      });

      return { ...c, variants: qualifiedVariants };
    });

  if (filteredComponents.length === 0) return null;

  const componentIndex = getRandomInt(0, filteredComponents.length - 1);

  const selectedComponent = filteredComponents[componentIndex];
  const variantIndex = getRandomInt(0, selectedComponent.variants.length - 1);

  const res = selectedComponent.variants[variantIndex].component();

  return res;
};
