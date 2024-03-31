import type { ComponentProps, ComponentType } from "svelte";

export type UIComponent = {
  name: string;
  variants: {
    class: string;
    width: [number, number];
    height: [number, number];
    component: () => { component: ComponentType; props: object };
  }[];
  class: string;
};
