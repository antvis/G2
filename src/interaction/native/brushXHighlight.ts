import { BrushHighlight } from './brushHighlight';

export function BrushXHighlight(options) {
  return BrushHighlight({
    ...options,
    brushRegion: (x, y, x1, y1, extent) => {
      const [, minY, , maxY] = extent;
      return [x, minY, x1, maxY];
    },
  });
}
