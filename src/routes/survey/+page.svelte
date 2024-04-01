<script lang="ts">
  import { getRandomFrom, getRandomValueOrNull } from "$lib/utils/math";
  import { goto } from "$app/navigation";
  import { getRandomComponentWithin } from "$lib/utils/component";
  import Loading from "../../data/components/Loading.svelte";
  import { onMount, setContext } from "svelte";
  import type { Nullable } from "../../types/utils";
  import { data } from "$lib/stores/data";
  import { number } from "$lib/stores/number";
  import Survey from "$lib/components/Survey.svelte";
  import { writable } from "svelte/store";
  import { viewport } from "$lib/stores/window";

  const maxQuestions = 5;
  const gapSeconds = 2000;

  let isMemorizing = true;
  let componentWidth: Nullable<number> = null;
  let componentHeight: Nullable<number> = null;
  let dimension: Nullable<"height" | "width"> = null;
  let isLoaderVisible = false;
  let randomIncrease: Nullable<number> = null;

  $: randomComponent = getRandomComponentWithin(
    $viewport.width,
    $viewport.height,
    $number,
  );

  $: if ($viewport.width > 0 && $viewport.height > 0) {
    // todo: apply debounce
    console.log("window is resized, re-selecting component");
    showLoader();
    reset();
  }

  $: console.log("component:", componentWidth, componentHeight);
  $: if ($number === maxQuestions) goto("/");

  onMount(() => showLoader());

  const showLoader = () => {
    isLoaderVisible = true;
    setTimeout(() => {
      isLoaderVisible = false;
    }, gapSeconds);
  };

  const moveToQuestion = () => {
    showLoader();

    dimension = getRandomFrom("width", "height");

    const componentSize =
      dimension === "width" ? componentWidth : componentHeight;

    if (componentSize === null) throw Error("Component size is null");

    randomIncrease = getRandomValueOrNull();

    isMemorizing = false;
    data.setOriginal(componentSize);
  };

  const answerQuestion = (isChanged: boolean) => () => {
    showLoader();

    const componentSize =
      dimension === "width" ? componentWidth : componentHeight;

    if (componentSize === null) throw Error("Component size is null");
    console.log("dimension:", dimension);

    const isCorrect = (componentSize === $data.original) === !isChanged;

    data.setChanged(componentSize, isCorrect);

    $number += 1;

    reset();
  };

  const reset = () => {
    isMemorizing = true;
    data.clear();
    componentHeight = null;
    componentWidth = null;
    randomIncrease = null;
    dimension = null;
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

  // pass this as prop instead
  setContext("survey", surveyContext);
</script>

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
