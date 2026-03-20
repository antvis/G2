import { BrushFilter } from './brushFilter';
import { brushXRegion } from './brushXHighlight';

export function BrushXFilter(options) {
  return BrushFilter({
    hideX: true,
    hideY: false,
    filterX: true,
    filterY: false,
    ...options,
    brushRegion: brushXRegion,
  });
}
