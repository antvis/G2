import { BrushFilter } from './brushFilter';
import { brushYRegion } from './brushYHighlight';

export function BrushYFilter(options) {
  return BrushFilter({
    hideY: true,
    ...options,
    brushRegion: brushYRegion,
  });
}
