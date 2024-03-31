<script lang="ts">
  type ButtonVariants = "xs" | "sm" | "md";

  export let variant: ButtonVariants;
  export let randomIncrease: number;
  export let isMemorizing: boolean;
  export let dimension: "width" | "height";
  export let changeSize: (w: number, h: number) => void;

  let clientWidth: number;
  let clientHeight: number;

  let width = "";
  let height = "";

  $: {
    if (isMemorizing) {
      width = "";
      height = "";
    }
  }

  $: {
    if (clientHeight && clientWidth) {
      console.log("update:", clientWidth, clientHeight);
      changeSize(clientWidth, clientHeight);
    }
  }

  $: {
    if (!isMemorizing && !width && !height) {
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
