import { deepMix } from '@antv/util';
import { CompositionComponent as CC, G2Mark, G2ViewTree } from '../runtime';
import { RectComposition } from '../spec';
import { calcBBox } from '../utils/vector';

/**
 * BFS view tree and using the last discovered color encode
 * as the top-level encode for this plot. This is useful when
 * color encode and color scale is specified in mark node.
 * It makes sense because the whole facet should shared the same
 * color encoding, but it also can be override with explicity
 * encode and scale specification.
 */
function inferColor(options: G2ViewTree) {
  const discovered = [options];
  let colorEncode;
  let colorScale;
  while (discovered.length) {
    const node = discovered.shift();
    const { children, encode = {}, scale = {} } = node;
    const { color: c } = encode;
    const { color: cs } = scale;
    if (c !== undefined) colorEncode = c;
    if (cs !== undefined) colorScale = cs;
    if (Array.isArray(children)) {
      discovered.push(...children);
    }
  }
  return [colorEncode, colorScale];
}

export type RectOptions = Omit<RectComposition, 'type'>;

/**
 * @todo Nested Rect.
 * @todo Increasing test coverage.
 */
export const Rect: CC<RectOptions> = () => {
  return (options) => {
    const { encode, children } = options;
    const { x: encodeX, y: encodeY } = encode;
    const [colorEncode, colorScale] = inferColor(options);

    // Some default or inferred options for facet mark, including
    // adjusting position of components for better readability and
    // encodings. All of these options can be override be users.
    const defaultOptions = {
      scale: {
        x: {
          paddingOuter: 0,
          guide: encodeX === undefined ? null : { position: 'top' },
          ...(encodeX === undefined && { paddingInner: 0 }),
        },
        y: {
          paddingOuter: 0,
          guide: encodeY === undefined ? null : { position: 'right' },
          ...(encodeY === undefined && { paddingInner: 0 }),
        },
        color: colorScale,
      },
      encode: {
        color: colorEncode,
        shape: 'hollowRect',
      },
      style: {
        lineWidth: 1,
        stroke: 'black',
      },
      animate: {
        enter: {
          type: 'fadeIn',
        },
      },
    };

    // Options to make mark as facet mark, including how to split space
    // domain and data domain for child node. All of these options can not
    // be override by users.
    const facetOptions: G2Mark = {
      type: 'grid',
      children: (data, visualData, scale, layout, key) => {
        const { x: scaleX, y: scaleY } = scale;
        const { paddingLeft, paddingTop } = layout;
        const { domain: domainX, field: fieldsX } = scaleX.getOptions();
        const { domain: domainY, field: fieldsY } = scaleY.getOptions();
        const [fieldX] = fieldsX;
        const [fieldY] = fieldsY;
        return visualData.map((d) => {
          // Split space domain.
          const { points, x: scaledFX, y: scaledFY } = d;
          const fx = scaleX.invert(scaledFX[0]);
          const fy = scaleY.invert(scaledFY[0]);
          const [left, top, width, height] = calcBBox(points);

          // Split data domain.
          const filter = (i) => {
            const { [fieldX]: x, [fieldY]: y } = data[i];
            const inX = encodeX !== undefined ? x === fx : true;
            const inY = encodeY !== undefined ? y === fy : true;
            return inX && inY;
          };

          // Some context for children callback, which
          // is same as G24.0 for now.
          const facet = {
            columnField: fieldX,
            columnIndex: domainX.indexOf(fx),
            columnValue: fx,
            columnValuesLength: domainX.length,
            rowField: fieldY,
            rowIndex: domainY.indexOf(fy),
            rowValue: fy,
            rowValuesLength: domainY.length,
          };
          const normalizedChildren = Array.isArray(children)
            ? children
            : [children(facet)].flat(1);

          return {
            type: 'layer',
            x: left + paddingLeft,
            y: top + paddingTop,
            width,
            height,
            children: normalizedChildren.map(({ scale, ...rest }, i) => ({
              key: `${key}-${i}`,
              filter,
              // Adjust the position of components for each facet for better
              // readability. These can be override by users.
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              scale: deepMix(
                {
                  // Only the left-most facet show axisY.
                  y: {
                    tickCount: 5,
                    ...(fx !== domainX[0]
                      ? { guide: null }
                      : fy !== domainY[domainY.length - 1]
                      ? { guide: { title: false } }
                      : {}),
                  },
                  // Only the bottom-most facet show axisX.
                  x: {
                    tickCount: 5,
                    ...(fy !== domainY[0]
                      ? { guide: null }
                      : fx !== domainX[domainX.length - 1]
                      ? { guide: { title: false } }
                      : {}),
                  },
                  // Hide all legends for child mark by default,
                  // they are displayed in the top-level.
                  color: { guide: null },
                },
                scale,
              ),
              ...rest,
            })),
          };
        });
      },
      statistic: [
        {
          // Filter index to make sure that there is only one grid
          // rendered for each x value and y value. Do not filter value
          // to make the scale obtain right domain(e.g. color scale).
          type:
            () =>
            ({ index, value }) => {
              const keys = new Set();
              const { x: X, y: Y } = value;
              const filteredIndex = index.filter((i) => {
                const x = X[i][0];
                const y = Y[i][0];
                const key = `(${x}, ${y})`;
                if (keys.has(key)) return false;
                keys.add(key);
                return true;
              });
              return {
                index: filteredIndex,
                value,
              };
            },
        },
      ],
    };
    const newOptions = deepMix(defaultOptions, options, facetOptions);
    return [newOptions];
  };
};

Rect.props = {};
