import type { ComponentProps, ComponentType } from "svelte";

export type UIComponentVariant = {
  class: string;
  width: [number, number];
  height: [number, number];
  component: () => { component: ComponentType; props: object };
};
export type UIComponent = {
  name: string;
  variants: UIComponentVariant[];
  class: string;
};
