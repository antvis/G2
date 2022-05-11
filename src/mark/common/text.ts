import { Mark, Vector2 } from '../../runtime';

export const PointMark: Mark = (index, scale, value, coordinate) => {
  const { x: X, y: Y } = value;
  const { x } = scale;
  const P = Array.from(index, (i) => {
    const px = +X[i][0];
    const py = +Y[i][0];
    const xoffset = x?.getBandWidth?.() || 0;
    return [coordinate.map([px + xoffset / 2, py])] as Vector2[];
  });
  return [index, P];
};
