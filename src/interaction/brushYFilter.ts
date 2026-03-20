import { BrushFilter } from './brushFilter';
import { brushYRegion } from './brushYHighlight';

export function BrushYFilter(options) {
  return BrushFilter({
    hideX: false,
    hideY: true,
    filterX: false,
    filterY: true,
    ...options,
    brushRegion: brushYRegion,
  });
}
