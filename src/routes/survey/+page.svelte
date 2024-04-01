<script lang="ts">
  import { getRandomInt } from "$lib/utils/math";
  import { goto } from "$app/navigation";
  import { getRandomComponentWithin } from "$lib/utils/component";
  import Loading from "../../data/components/Loading.svelte";
  type Nullable<T> = T | null;
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
  let currentNumber = 1;
  let isMemorizing = true;
  let componentWidth: number;
  let componentHeight: Nullable<number> = null;
  let windowHeight = 0;
  let windowWidth = 0;
  let dimension: "height" | "width" | null = null;
  // let shouldIncrease: boolean;
  let isLoaderVisible = false;
  const gapSeconds = 2000;
  let randomIncrease: number | null;

  $: randomComponent = getRandomComponentWithin(
    windowWidth,
    windowHeight,
    currentNumber,
  );

  $: console.log("randomIncrease:", randomIncrease);

  $: {
    if (isMemorizing) {
      isLoaderVisible = false;
    } else {
      isLoaderVisible = true;
      setTimeout(() => {
        isLoaderVisible = false;
      }, gapSeconds);
    }
  }

  $: {
    console.log(currentNumber);
    isLoaderVisible = true;
    setTimeout(() => {
      isLoaderVisible = false;
    }, gapSeconds);
  }

  const moveToQuestion = () => {
    if (currentNumber === maxQuestions) goto("/");

    const shouldIncrease = !!getRandomInt(0, 1);

    randomIncrease = shouldIncrease ? getRandomInt(1, 100) : null;
    dimension = getRandomInt(0, 1) ? "width" : "height";

    const componentSize =
      dimension === "width" ? componentWidth : componentHeight;
    isMemorizing = false;
    data = { ...data, original: componentSize };
  };

  const answerQuestion = (isChanged: boolean) => () => {
    const componentSize =
      dimension === "width" ? componentWidth : componentHeight;
    const isSame = componentSize === data.original;

    data = {
      ...data,
      changed: componentSize,
      isCorrect: isSame === !isChanged,
    };
    console.log("save data:", data);

    currentNumber += 1;
    data = defaultData;
    isMemorizing = true;
  };

  const updateSize = (width: number, height: number) => {
    componentWidth = width;
    componentHeight = height;
  };
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

{#if isLoaderVisible}
  <div class="h-full flex items-center">
    <Loading />
  </div>
{:else}
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div>
      {#if randomComponent}
        <svelte:component
          this={randomComponent.component}
          {...randomComponent.props}
          {dimension}
          {randomIncrease}
          changeSize={updateSize}
        />
      {/if}
    </div>
  </div>

  <!-- Survey -->
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
{/if}
