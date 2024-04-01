import { writable } from "svelte/store";
import type { Data } from "../../types/data";

const defaultData: Data = {
  original: null,
  changed: null,
  isCorrect: null,
};

const createData = () => {
  const { set, subscribe, update } = writable(defaultData);

  return {
    subscribe,
    clear: () => set(defaultData),
    setOriginal: (v: number) => update((d) => ({ ...d, original: v })),
    setChanged: (changed: number, isCorrect: boolean) => {
      update((d) => {
        const save = { ...d, changed, isCorrect };
        console.log("save data:", save);

        return save;
      });
    },
  };
};

export const data = createData();
