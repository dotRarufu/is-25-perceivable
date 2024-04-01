<script lang="ts">
  import type { Nullable } from "../../types/utils";

  type InputVariants = "xs" | "sm" | "md";

  export let variant: InputVariants;
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

<div bind:offsetWidth bind:offsetHeight>
  <input
    style:width
    style:height
    type="text"
    class="input input-bordered input-primary"
    class:input-sm={variant === "sm"}
    class:input-xs={variant === "xs"}
    class:input-md={variant === "md"}
  />
</div>
