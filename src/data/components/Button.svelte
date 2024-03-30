<script lang="ts">
  type ButtonVariants = "xs" | "sm" | "md";
  export let variant: ButtonVariants | null = null;
  export let size: number | null = null;
</script>

<!-- {#if variant === "md"}
  <button class="btn btn-primary" bind:clientWidth={width}> Read more 1</button>
{:else}
  <button class="btn btn-primary btn-{variant}" bind:clientWidth={width}>
    Read more 2
  </button>
{/if} -->

<button
  class="btn btn-primary"
  class:btn-xs={variant === "xs"}
  class:btn-sm={variant === "sm"}
  bind:clientWidth={size}
>
  Read more 3
</button>
