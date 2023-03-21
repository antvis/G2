import { ShapeComponent as SC } from '../../runtime';

//@todo
export type ShapeOptions = Record<string, any>;

/**
 * Draw a custom shape.
 */
export const Shape: SC<ShapeOptions> = (options) => {
  const { render, ...rest } = options;
  return (points, value, coordinate, theme) => {
    const [[x0, y0]] = points;
    return render({
      ...rest,
      x: x0,
      y: y0,
    });
  };
};

Shape.props = {
  defaultMarker: 'point',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
