import type { UIComponent } from "../types/UIComponent";
import Button from "./components/Button.svelte";
import Input from "./components/Input.svelte";

export const buttonData: UIComponent = {
  name: "Button",
  class: "btn",
  variants: [
    {
      class: "xs",
      width: [44, 65],
      height: [24, 24],
      component: () => ({ component: Button, props: { variant: "xs" } }),
    },
    {
      class: "sm",
      width: [66, 87],
      height: [32, 32],
      component: () => ({ component: Button, props: { variant: "sm" } }),
    },
    {
      class: "",
      width: [88, 103],
      height: [48, 48],
      component: () => ({ component: Button, props: { variant: "md" } }),
    },
  ],
};

export const inputData: UIComponent = {
  name: "Input",
  class: "input",
  variants: [
    {
      class: "xs",
      height: [24, 31],
      width: [320, 320],
      component: () => ({ component: Input, props: { variant: "xs" } }),
    },
    {
      class: "sm",
      height: [32, 47],
      width: [320, 320],
      component: () => ({ component: Input, props: { variant: "sm" } }),
    },
    {
      class: "md",
      height: [48, 63],
      width: [320, 320],
      component: () => ({ component: Input, props: { variant: "md" } }),
    },
  ],
};

export const components = [buttonData, inputData];
