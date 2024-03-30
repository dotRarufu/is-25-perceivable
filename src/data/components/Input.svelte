<script lang="ts">
  export let variant: "xs" | "sm" | "md" = "md";
  export let size: number | null = null;

  $: console.log("input size:", size);
</script>

<div bind:clientHeight={size}>
  <input
    type="text"
    class="input input-bordered input-primary"
    class:input-sm={variant === "sm"}
    class:input-xs={variant === "xs"}
    class:input-md={variant === "md"}
  />
</div>
