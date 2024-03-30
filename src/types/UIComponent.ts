import type { ComponentProps, ComponentType } from "svelte";

export type UIComponent = {
  name: string;
  variants: {
    class: string;
    smallest: number;
    largest: number;
    component: () => { component: ComponentType; props: object };
  }[];
  class: string;
};
