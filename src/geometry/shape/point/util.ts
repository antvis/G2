import { IGroup, IShape } from '../../../dependents';
import { ShapeInfo } from '../../../interface';
import { MarkerSymbols } from '../../../util/marker';
import { getStyle } from '../util/get-style';

export const SHAPES = ['circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down'];
export const HOLLOW_SHAPES = ['cross', 'tick', 'plus', 'hyphen', 'line'];

/**
 * @ignore
 * Draws points
 * @param shape
 * @param cfg
 * @param container
 * @param shapeName
 * @param isStroke
 * @returns points
 */
export function drawPoints(
  shape,
  cfg: ShapeInfo,
  container: IGroup,
  shapeName: string,
  isStroke: boolean
): IShape | IGroup {
  const style = getStyle(cfg, isStroke, !isStroke, 'r');
  const points = shape.parsePoints(cfg.points);
  let pointPosition = points[0];
  if (cfg.isStack) {
    pointPosition = points[1];
  } else if (points.length > 1) {
    const group = container.addGroup();
    for (const point of points) {
      group.addShape({
        type: 'marker',
        attrs: {
          ...style,
          symbol: MarkerSymbols[shapeName] || shapeName,
          ...point,
        },
      });
    }
    return group;
  }

  return container.addShape({
    type: 'marker',
    attrs: {
      ...style,
      symbol: MarkerSymbols[shapeName] || shapeName,
      ...pointPosition,
    },
  });
}
