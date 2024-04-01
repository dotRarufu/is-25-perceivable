<script lang="ts">
  type ButtonVariants = "xs" | "sm" | "md";

  export let variant: ButtonVariants;
  export let randomIncrease: number | null;
  export let dimension: "width" | "height" | null;
  export let changeSize: (w: number, h: number) => void;

  let clientWidth: number | null = null;
  let clientHeight: number | null = null;

  let width = "";
  let height = "";

  $: {
    if (clientHeight && clientWidth) {
      changeSize(clientWidth, clientHeight);
    }
  }

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
  bind:offsetWidth={clientWidth}
  bind:offsetHeight={clientHeight}
>
  Read more
</button>
