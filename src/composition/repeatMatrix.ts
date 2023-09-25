import { deepMix } from '@antv/util';
import {
  CompositionComponent as CC,
  G2View,
  G2ViewTree,
  Node,
} from '../runtime';
import { RepeatMatrixComposition } from '../spec';
import { Container } from '../utils/container';
import { calcBBox } from '../utils/vector';
import { indexOf } from '../utils/array';
import {
  createInnerGuide,
  inferColor,
  setAnimation,
  setStyle,
  toCell,
} from './facetRect';
import { useDefaultAdaptor, useOverrideAdaptor } from './utils';

export type RepeatMatrixOptions = Omit<RepeatMatrixComposition, 'type'>;

const setScale = useDefaultAdaptor<G2ViewTree>((options) => {
  return {
    scale: {
      x: { guide: null, paddingOuter: 0, paddingInner: 0.1 },
      y: { guide: null, range: [0, 1], paddingOuter: 0, paddingInner: 0.1 },
    },
  };
});

const setChildren = useOverrideAdaptor<G2ViewTree>((options) => {
  const {
    data,
    children,
    x: originX = 0,
    y: originY = 0,
    key: viewKey,
  } = options;
  const createChildren = (visualData, scale, layout) => {
    const { x: scaleX, y: scaleY } = scale;
    const { paddingLeft, paddingTop, marginLeft, marginTop } = layout;
    const { domain: domainX } = scaleX.getOptions();
    const { domain: domainY } = scaleY.getOptions();
    const index = indexOf(visualData);
    const bboxs = visualData.map(({ points }) => calcBBox(points));
    const values = visualData.map(({ x, y }) => [
      scaleX.invert(x),
      scaleY.invert(y),
    ]);
    const facets = values.map(([fx, fy]) => ({
      columnField: fx,
      columnIndex: domainX.indexOf(fx),
      columnValue: fx,
      columnValuesLength: domainX.length,
      rowField: fy,
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
        const { scale, key, encode, axis, interaction, ...rest } = d;
        const guideY = scale?.y?.guide;
        const guideX = scale?.x?.guide;
        const defaultScale = {
          // Do not sync position scales among facets by default.
          x: { facet: false },
          // Do not sync position scales among facets by default.
          y: { facet: false },
        };
        const newAxis = {
          x: createGuideX(guideX)(facet, data),
          y: createGuideY(guideY)(facet, data),
        };
        const defaultAxis = {
          x: { tickCount: 5 },
          y: { tickCount: 5 },
        };
        return {
          data,
          parentKey: viewKey,
          key: `${key}-${i}`,
          x: left + paddingLeft + originX + marginLeft,
          y: top + paddingTop + originY + marginTop,
          width,
          height,
          margin: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          frame: true,
          scale: deepMix(defaultScale, scale),
          axis: deepMix(defaultAxis, axis, newAxis),
          // Hide all legends for child mark by default,
          // they are displayed in the top-level.
          legend: false,
          encode: deepMix({}, encode, {
            x: fx,
            y: fy,
          }),
          interaction: deepMix({}, interaction, {
            // Register this interaction in parent node.
            legendFilter: false,
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
const setData = useOverrideAdaptor<G2ViewTree>((options: G2ViewTree) => {
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
    scale: {
      ...([X].flat(1).length === 1 && { x: { paddingInner: 0 } }),
      ...([Y].flat(1).length === 1 && { y: { paddingInner: 0 } }),
    },
  };
});

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
export const RepeatMatrix: CC<RepeatMatrixComposition> = () => {
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
