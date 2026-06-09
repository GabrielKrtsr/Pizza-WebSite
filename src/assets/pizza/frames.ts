// Eagerly import the optimized WebP frames and expose them as an ordered array.
// Sorted by filename so frame-01 → frame-40 stay in sequence.
const modules = import.meta.glob<{ default: string }>("./frame-*.webp", {
  eager: true,
});

export const pizzaFrames: string[] = Object.keys(modules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => modules[key].default);

export const FRAME_COUNT = pizzaFrames.length;
