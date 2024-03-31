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
) => {
  const filteredComponents = components
    .filter((c) => {
      const qualifiedVariants = c.variants.filter((v) => {
        const widthLargest = sortNumbers(v.width, "desc")[0];
        const heightLargest = sortNumbers(v.height, "desc")[0];

        // console.log("widthLargest:", widthLargest);
        // console.log("screenWidth:", screenWidth);

        return widthLargest < screenWidth && heightLargest < screenHeight;
      });

      if (qualifiedVariants.length === 0) return false;

      return true;
    })
    .map((c) => {
      const qualifiedVariants = c.variants.filter((v) => {
        const widthLargest = sortNumbers(v.width, "desc")[0];
        const heightLargest = sortNumbers(v.height, "desc")[0];

        // console.log("widthLargest:", widthLargest);
        // console.log("screenWidth:", screenWidth);

        return widthLargest < screenWidth && heightLargest < screenHeight;
      });

      return { ...c, variants: qualifiedVariants };
    });
  console.log("filteredComponents:", filteredComponents);

  if (filteredComponents.length === 0) return null;

  const componentIndex = getRandomInt(0, filteredComponents.length - 1);
  // console.log("componentIndex:", componentIndex);
  // console.log("filteredComponents:", filteredComponents);
  const selectedComponent = filteredComponents[componentIndex];
  const variantIndex = getRandomInt(0, selectedComponent.variants.length - 1);
  // console.log("selectedComponent:", selectedComponent);
  // console.log("variantIndex:", variantIndex);

  const res = selectedComponent.variants[variantIndex].component();

  return res;
};
