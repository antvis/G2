import { BrushHighlight } from './brushHighlight';

export function BrushYHighlight(options) {
  return BrushHighlight({
    ...options,
    brushRegion: (x, y, x1, y1, extent) => {
      const [minX, , maxX] = extent;
      return [minX, y, maxX, y1];
    },
  });
}
