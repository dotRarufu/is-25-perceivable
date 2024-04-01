import { readable } from "svelte/store";
import { browser } from "$app/environment";

export const viewport = readable({ width: 0, height: 0 }, (set) => {
  if (!browser) return;

  const initialHeight = document.documentElement.clientHeight;
  const initialWidth = document.documentElement.clientWidth;

  const initial = { width: initialWidth, height: initialHeight };

  set(initial);

  const callback = () => {
    set({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  };
  window.addEventListener("resize", callback);

  return () => window.removeEventListener("resize", callback);
});
