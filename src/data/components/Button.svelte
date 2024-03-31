<script lang="ts">
  type ButtonVariants = "xs" | "sm" | "md";
  export let variant: ButtonVariants | null = null;
  export let size: number | null = null;
  export let randomIncrease: number | null = null;
  export let isMemorizing: boolean = false;

  let width = "";
  $: {
    if (!isMemorizing && size && randomIncrease && !width) {
      const increase = size * (randomIncrease / 100);
      const newWidth = size + increase;

      // This does not work because w-[...] class is not generated at runtime, only when tailwind compiles
      // width = `w-[${newWidth}px]`;

      width = `${newWidth}px`;
    }
  }
</script>

<button
  class="btn btn-primary"
  class:btn-xs={variant === "xs"}
  class:btn-sm={variant === "sm"}
  style:width
  bind:clientWidth={size}
>
  Read more
</button>
