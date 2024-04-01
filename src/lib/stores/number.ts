import { writable } from "svelte/store";

const createNumber = () => {
  const { set, subscribe, update } = writable(1);

  return {
    subscribe,
    set,
    clear: () => set(1),
    setIncrease: () => update((n) => n + 1),
  };
};

export const number = createNumber();
