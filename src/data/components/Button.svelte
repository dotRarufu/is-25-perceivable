<script lang="ts">
  import type { Nullable } from "../../types/utils";

  type ButtonVariants = "xs" | "sm" | "md";

  export let variant: ButtonVariants;
  export let randomIncrease: number | null;
  export let dimension: "width" | "height" | null;

  export let clientWidth: number | null = null;
  export let clientHeight: number | null = null;

  let offsetHeight: Nullable<number> = null;
  let offsetWidth: Nullable<number> = null;

  // One way binding for offsetWidth, offsetHeight
  $: clientWidth = offsetWidth;
  $: clientHeight = offsetHeight;

  let width = "";
  let height = "";

  $: {
    if (!width && !height && randomIncrease && dimension) {
      const size = dimension === "width" ? clientWidth : clientHeight;
      if (size !== null) {
        const increase = size * (randomIncrease / 100);
        const newSize = size + increase;

        // This does not work because w-[...] class is not generated at runtime, only when tailwind compiles
        // width = `w-[${newWidth}px]`;

        width = dimension === "width" ? `${newSize}px` : " ";
        height = dimension === "height" ? `${newSize}px` : " ";
      }
    }
  }
</script>

<button
  class="btn btn-primary"
  class:btn-xs={variant === "xs"}
  class:btn-sm={variant === "sm"}
  style:width
  style:height
  bind:offsetWidth
  bind:offsetHeight
>
  Read more
</button>
