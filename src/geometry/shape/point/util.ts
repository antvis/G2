import { IGroup, IShape } from '../../../dependents';
import { ShapeInfo } from '../../../interface';
import { getStyle } from '../util/get-style';

export const SHAPES = ['circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down'];
export const HOLLOW_SHAPES = ['cross', 'tick', 'plus', 'hyphen', 'line'];

export function drawPoints(shape, cfg: ShapeInfo, container: IGroup, shapeName: string, isStroke: boolean): IShape | IGroup {
  const style = getStyle(cfg, isStroke, !isStroke, 'r');
  const points = shape.parsePoints(cfg.points);

  if (points.length > 1) {
    const group = container.addGroup();
    for (const point of points) {
      group.addShape({
        type: 'marker',
        attrs: {
          ...style,
          symbol: shapeName,
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
      symbol: shapeName,
      ...points[0],
    },
  });
}
