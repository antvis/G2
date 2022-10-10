import { deepMix } from '@antv/util';
import { CompositionComponent as CC, G2ViewTree, Node } from '../runtime';
import { MatrixComposition } from '../spec';
import { Container } from '../utils/container';
import { calcBBox } from '../utils/vector';
import { indexOf } from '../utils/array';
import {
  createInnerGuide,
  inferColor,
  setAnimation,
  setStyle,
  toCell,
} from './square';
import { useDefaultAdaptor, useOverrideAdaptor } from './utils';

export type MatrixOptions = Omit<MatrixComposition, 'type'>;

const setScale = useDefaultAdaptor<G2ViewTree>((options) => {
  return {
    scale: {
      x: { guide: null, paddingOuter: 0, paddingInner: 0.1 },
      y: { guide: null, range: [0, 1], paddingOuter: 0, paddingInner: 0.1 },
    },
  };
});

const setChildren = useOverrideAdaptor<G2ViewTree>((options) => {
  const { data, children, x: originX = 0, y: originY = 0 } = options;
  const createChildren = (visualData, scale, layout) => {
    const { x: scaleX, y: scaleY } = scale;
    const { paddingLeft, paddingTop } = layout;
    const { domain: domainX, field: fieldX } = scaleX.getOptions();
    const { domain: domainY, field: fieldY } = scaleY.getOptions();
    const index = indexOf(visualData);
    const bboxs = visualData.map(({ points }) => calcBBox(points));
    const values = visualData.map(({ x, y }) => [
      scaleX.invert(x),
      scaleY.invert(y),
    ]);
    const facets = values.map(([fx, fy]) => ({
      columnField: fieldX,
      columnIndex: domainX.indexOf(fx),
      columnValue: fx,
      columnValuesLength: domainX.length,
      rowField: fieldY,
      rowIndex: domainY.indexOf(fy),
      rowValue: fy,
      rowValuesLength: domainY.length,
    }));
    const normalizedChildren: Node[][] = facets.map((facet) => {
      if (Array.isArray(children)) return children;
      return [children(facet)].flat(1);
    });
    return index.flatMap((i) => {
      const [left, top, width, height] = bboxs[i];
      const [fx, fy] = values[i];
      const facet = facets[i];
      const children = normalizedChildren[i];
      return children.map((d) => {
        const { scale, key, encode, ...rest } = d;
        const guideY = scale?.y?.guide;
        const guideX = scale?.x?.guide;
        const defaultScale = {
          color: { guide: null },
          x: {
            guide: { title: { titleAnchor: 'center' } },
            tickCount: 5,
            // Do not sync position scales among facets by default.
            facet: false,
          },
          y: {
            guide: { title: { titleAnchor: 'center' } },
            // Do not sync position scales among facets by default.
            tickCount: 5,
            facet: false,
          },
        };
        const newScale = {
          x: { guide: createGuideX(guideX)(facet, data) },
          y: { guide: createGuideY(guideY)(facet, data) },
        };
        return {
          data,
          key: `${key}-${i}`,
          x: left + paddingLeft + originX,
          y: top + paddingTop + originY,
          width,
          height,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          frame: true,
          scale: deepMix(defaultScale, scale, newScale),
          encode: deepMix({}, encode, {
            x: fx,
            y: fy,
          }),
          ...rest,
        };
      });
    });
  };
  return {
    children: createChildren,
  };
});

/**
 * @todo Use transform instead of override data directly.
 */
const setData = (options: G2ViewTree) => {
  const { encode, ...rest } = options;
  const {
    position: P = [],
    x: X = P,
    y: Y = [...P].reverse(),
    ...restEncode
  } = encode;
  const data = [];
  for (const $x of [X].flat(1)) {
    for (const $y of [Y].flat(1)) {
      data.push({ $x, $y });
    }
  }
  return {
    ...rest,
    data,
    encode: { ...restEncode, x: '$x', y: '$y' },
  };
};

function createGuideX(guideX) {
  if (typeof guideX === 'function') return guideX;
  if (guideX === null) return () => null;
  return (facet, data) => {
    const { rowIndex, rowValuesLength } = facet;
    // Only the bottom-most facet show axisX.
    if (rowIndex !== rowValuesLength - 1) return createInnerGuide(guideX, data);
  };
}

function createGuideY(guideY) {
  if (typeof guideY === 'function') return guideY;
  if (guideY === null) return () => null;
  return (facet, data) => {
    const { columnIndex } = facet;
    // Only the left-most facet show axisY.
    if (columnIndex !== 0) return createInnerGuide(guideY, data);
  };
}

/**
 * @todo Layout mode: layer, row, col...
 * @todo Specify show axis or not.
 */
export const Matrix: CC<MatrixComposition> = () => {
  return (options) => {
    const newOptions = Container.of<G2ViewTree>(options)
      .call(toCell)
      .call(inferColor)
      .call(setChildren)
      .call(setData)
      .call(setAnimation)
      .call(setStyle)
      .call(setScale)
      .value();
    return [newOptions];
  };
};
