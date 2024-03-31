<script lang="ts">
  import { components } from "../../data/components";
  import { getRandomInt } from "$lib/utils/math";
  import { goto } from "$app/navigation";
  import { getRandomComponentWithin } from "$lib/utils/component";

  const defaultData = {
    original: null,
    changed: null,
    isCorrect: null,
  };
  let data: {
    original: null | number;
    changed: number | null;
    isCorrect: boolean | null;
  } = defaultData;
  const maxQuestions = 5;
  let currentNumber = 0;
  let isMemorizing = true;
  let componentSize: number | null = null;
  let randomNumberVariant = 0;
  let randomNumberComponent = 0;
  let innerHeight = 0;
  let innerWidth = 0;

  $: randomComponent = getRandomComponentWithin(innerWidth, innerHeight);

  $: console.log("randomComponent:", randomComponent);

  const moveToQuestion = () => {
    if (currentNumber === maxQuestions) {
      goto("/");
    }

    isMemorizing = false;
    data = { ...data, original: componentSize };
    randomNumberVariant = getRandomInt(0, 2);

    currentNumber += 1;
  };

  const answerQuestion = (isChanged: boolean) => () => {
    isMemorizing = true;
    const isSame = componentSize === data.original;
    randomNumberComponent = getRandomInt(0, 1);
    data = {
      ...data,
      changed: componentSize,
      isCorrect: isSame === !isChanged,
    };
    console.log("save data:", data);

    data = defaultData;
  };
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div class="w-full h-full flex flex-col justify-center items-center">
  <div>
    {#if randomComponent}
      <svelte:component
        this={randomComponent.component}
        bind:size={componentSize}
        {...randomComponent.props}
      />
    {/if}
  </div>
</div>

<!-- Survey -->
<div class="w-full gap-[2rem] flex items-center flex-col py-[2rem]">
  <h1 class="text-lg font-bold">
    {isMemorizing ? "Try to remember this" : "Did it change"}
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
