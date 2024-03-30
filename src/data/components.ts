import type { UIComponent } from "../types/UIComponent";
import Button from "./components/Button.svelte";
import Input from "./components/Input.svelte";

export const buttonData: UIComponent = {
  name: "Button",
  class: "btn",
  variants: [
    {
      class: "xs",
      largest: 65,
      smallest: 44,
      component: () => ({ component: Button, props: { variant: "xs" } }),
    },
    {
      class: "sm",
      largest: 87,
      smallest: 66,
      component: () => ({ component: Button, props: { variant: "sm" } }),
    },
    {
      class: "",
      largest: 103,
      smallest: 88,
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
      largest: 31,
      smallest: 24,
      component: () => ({ component: Input, props: { variant: "xs" } }),
    },
    {
      class: "sm",
      largest: 32,
      smallest: 47,
      component: () => ({ component: Input, props: { variant: "sm" } }),
    },
    {
      class: "md",
      largest: 48,
      smallest: 63,
      component: () => ({ component: Input, props: { variant: "md" } }),
    },
  ],
};

export const components = [buttonData, inputData];
