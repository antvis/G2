import { BrushFilter } from './brushFilter';
import { brushXRegion } from './brushXHighlight';

export function BrushXFilter(options) {
  return BrushFilter({
    ...options,
    brushRegion: brushXRegion,
  });
}
