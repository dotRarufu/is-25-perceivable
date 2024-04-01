<script lang="ts">
  import { getRandomInt } from "$lib/utils/math";
  import { goto } from "$app/navigation";
  import { getRandomComponentWithin } from "$lib/utils/component";
  import Loading from "../../data/components/Loading.svelte";
  import { onMount, setContext } from "svelte";
  import type { Nullable } from "../../types/utils";
  import type { Data } from "../../types/data";
  import Survey from "$lib/components/Survey.svelte";
  import { writable } from "svelte/store";

  const defaultData: Data = {
    original: null,
    changed: null,
    isCorrect: null,
  };
  const maxQuestions = 5;
  const gapSeconds = 2000;

  let data: Data = defaultData;
  let currentNumber = 1;
  let isMemorizing = true;
  let componentWidth: Nullable<number> = null;
  let componentHeight: Nullable<number> = null;
  let windowHeight = 0;
  let windowWidth = 0;
  let dimension: Nullable<"height" | "width"> = null;
  let isLoaderVisible = false;
  let randomIncrease: Nullable<number> = null;

  $: randomComponent = getRandomComponentWithin(
    windowWidth,
    windowHeight,
    currentNumber,
  );

  $: if (currentNumber === maxQuestions) goto("/");

  onMount(() => showLoader());

  const showLoader = () => {
    isLoaderVisible = true;
    setTimeout(() => {
      isLoaderVisible = false;
    }, gapSeconds);
  };

  const moveToQuestion = () => {
    showLoader();
    console.log("move to question");
    const randomDimension = getRandomInt(0, 1) ? "width" : "height";
    const shouldIncrease = !!getRandomInt(0, 1);
    const componentSize =
      randomDimension === "width" ? componentWidth : componentHeight;

    dimension = randomDimension;
    randomIncrease = shouldIncrease ? getRandomInt(1, 100) : null;

    isMemorizing = false;
    data = { ...data, original: componentSize };
  };

  const answerQuestion = (isChanged: boolean) => () => {
    const componentSize =
      dimension === "width" ? componentWidth : componentHeight;
    const isCorrect = (componentSize === data.original) === !isChanged;

    const save = {
      ...data,
      changed: componentSize,
      isCorrect,
    };
    console.log("save data:", save);

    currentNumber += 1;
    data = defaultData;
    isMemorizing = true;
    showLoader();
  };

  const surveyContext = writable({
    isMemorizing,
    // weird, why do i have to cast type here
    dimension: dimension as Nullable<"height" | "width">,
    answerQuestion,
    moveToQuestion,
  });

  $: $surveyContext = {
    isMemorizing,
    dimension,
    answerQuestion,
    moveToQuestion,
  };

  setContext("survey", surveyContext);
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
          bind:clientWidth={componentWidth}
          bind:clientHeight={componentHeight}
        />
      {/if}
    </div>
  </div>

  <Survey />
{/if}
