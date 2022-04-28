import { AdjustComponent as AC } from '../runtime';
import { calcBBox } from '../utils/vector';

export type PackOptions = Record<string, unknown>;

/**
 * Uniform pack to avid overlap.
 * @todo Improve or change algorithm to increase space usage.
 * @todo Take some special case into account.
 */
export const Pack: AC<PackOptions> = () => {
  return (P, count, layout) => {
    const pcount = P.length;
    if (pcount === 0) return [];

    // col * row >= count
    // row is close to col * aspect, so
    // col * (col * aspect) >= count
    const { innerWidth, innerHeight } = layout;
    const aspect = innerHeight / innerWidth;
    let col = Math.ceil(Math.sqrt(count / aspect));

    // Increase col to avoid total height of packed shape
    // being large than height of bbox.
    let size = innerWidth / col;
    let row = Math.ceil(count / col);
    let h0 = row * size;
    while (h0 > innerHeight) {
      col = col + 1;
      size = innerWidth / col;
      row = Math.ceil(count / col);
      h0 = row * size;
    }

    // Some offset to increase the space usage.
    const space = innerHeight - row * size;
    const intervalY = row <= 1 ? 0 : space / (row - 1);
    const [offsetX, offsetY] =
      row <= 1
        ? [
            (innerWidth - pcount * size) / (pcount - 1),
            (innerHeight - size) / 2,
          ]
        : [0, 0];

    return P.map((points, m) => {
      const [x, y, width, height] = calcBBox(points);
      const cx = x + width / 2;
      const cy = y + height / 2;

      const i = m % col;
      const j = Math.floor(m / col);

      const newCX = i * size + size / 2;
      const newCY = (row - j - 1) * size + space + size / 2;

      const sx = size / width;
      const sy = size / height;

      // Translate the shape and mark to make sure the center of
      // shape is overlap before and after scale transformation.
      const tx = newCX - cx + offsetX * i;
      const ty = newCY - cy - intervalY * j - offsetY;
      return `translate(${tx}, ${ty}) scale(${sx}, ${sy})`;
    });
  };
};

Pack.props = {};
