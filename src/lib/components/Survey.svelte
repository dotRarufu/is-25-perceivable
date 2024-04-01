<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { Nullable } from "../../types/utils";

  // todo: export this from +page.svelte
  type SurveyContext = Writable<{
    isMemorizing: boolean;
    dimension: Nullable<"height" | "width">;
    answerQuestion: (isChanged: boolean) => () => void;
    moveToQuestion: () => void;
  }>;

  const context = getContext<SurveyContext>("survey");

  const { answerQuestion, dimension, isMemorizing, moveToQuestion } = $context;
</script>

<div class="w-full gap-[2rem] flex items-center flex-col py-[2rem]">
  <h1 class="text-lg font-bold">
    {isMemorizing ? "Try to remember this" : `Did the ${dimension} change?`}
  </h1>

  <div class="flex gap-[2rem]">
    {#if isMemorizing}
      <button class="btn btn-primary" on:click={moveToQuestion}
        >Okay, next</button
      >
    {:else}
      <button class="btn btn-primary" on:click={answerQuestion(true)}
        >Yes</button
      >
      <button class="btn btn-primary" on:click={answerQuestion(false)}
        >No</button
      >
    {/if}
  </div>
</div>
