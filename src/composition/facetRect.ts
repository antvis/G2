import { deepMix } from '@antv/util';
import { extent, group, max } from 'd3-array';
import {
  CompositionComponent as CC,
  G2MarkChildrenCallback,
  G2ViewTree,
  Node,
} from '../runtime';
import { FacetRectComposition } from '../spec';
import { calcBBox } from '../utils/vector';
import { Container } from '../utils/container';
import { indexOf } from '../utils/array';
import { useDefaultAdaptor, useOverrideAdaptor } from './utils';

export type SubLayout = (data?: any) => number[];

const setScale = useDefaultAdaptor<G2ViewTree>((options) => {
  const { encode, data, scale, shareSize = false } = options;
  const { x, y } = encode;
  const flexDomain = (encode: string, channel: string) => {
    if (encode === undefined || !shareSize) return {};
    const groups = group(data, (d) => d[encode]);
    const domain = scale?.[channel]?.domain || Array.from(groups.keys());
    const flex = domain.map((key) => {
      if (!groups.has(key)) return 1;
      return groups.get(key).length;
    });
    return { domain, flex };
  };
  return {
    scale: {
      x: {
        paddingOuter: 0,
        paddingInner: 0.1,
        guide: x === undefined ? null : { position: 'top' },
        ...(x === undefined && { paddingInner: 0 }),
        ...flexDomain(x, 'x'),
      },
      y: {
        range: [0, 1],
        paddingOuter: 0,
        paddingInner: 0.1,
        guide: y === undefined ? null : { position: 'right' },
        ...(y === undefined && { paddingInner: 0 }),
        ...flexDomain(y, 'y'),
      },
    },
  };
});

/**
 * BFS view tree and using the last discovered color encode
 * as the top-level encode for this plot. This is useful when
 * color encode and color scale is specified in mark node.
 * It makes sense because the whole facet should shared the same
 * color encoding, but it also can be override with explicity
 * encode and scale specification.
 */
export const inferColor = useOverrideAdaptor<G2ViewTree>(
  (options: G2ViewTree) => {
    const { data, scale, legend } = options;
    const discovered = [options];
    let encodeColor;
    let scaleColor;
    let legendColor;
    while (discovered.length) {
      const node = discovered.shift();
      const { children, encode = {}, scale = {}, legend = {} } = node;
      const { color: c } = encode;
      const { color: cs } = scale;
      const { color: cl } = legend;
      if (c !== undefined) encodeColor = c;
      if (cs !== undefined) scaleColor = cs;
      if (cl !== undefined) legendColor = cl;
      if (Array.isArray(children)) {
        discovered.push(...children);
      }
    }

    const domainColor = () => {
      const domain = scale?.color?.domain;
      if (domain !== undefined) return [domain];
      if (encodeColor === undefined) return [undefined];
      const color =
        typeof encodeColor === 'function' ? encodeColor : (d) => d[encodeColor];
      const values = data.map(color);
      if (values.some((d) => typeof d === 'number')) return [extent(values)];
      return [Array.from(new Set(values)), 'ordinal'];
    };

    const title = typeof encodeColor === 'string' ? encodeColor : '';
    const [domain, type] = domainColor();

    return {
      encode: { color: { type: 'column', value: domain ?? [] } },
      scale: { color: deepMix({}, scaleColor, { domain, type }) },
      ...(legend === undefined && {
        legend: { color: deepMix({ title }, legendColor) },
      }),
    };
  },
);

export const setAnimation = useDefaultAdaptor<G2ViewTree>(() => ({
  animate: {
    enterType: 'fadeIn',
  },
}));

export const setStyle = useOverrideAdaptor<G2ViewTree>(() => ({
  frame: false,
  encode: {
    shape: 'hollow',
  },
  style: {
    lineWidth: 0,
  },
}));

export const toCell = useOverrideAdaptor<G2ViewTree>(() => ({
  type: 'cell',
}));

/**
 * Do not set cell data directly, the children will get wrong do if do
 * so. Use transform to set new data.
 **/
export const setData = useOverrideAdaptor<G2ViewTree>((options) => {
  const { data } = options;
  const connector = {
    type: 'custom',
    callback: () => {
      const { data, encode } = options;
      const { x, y } = encode;
      const X = x ? Array.from(new Set(data.map((d) => d[x]))) : [];
      const Y = y ? Array.from(new Set(data.map((d) => d[y]))) : [];
      const cellData = () => {
        if (X.length && Y.length) {
          const cellData = [];
          for (const vx of X) {
            for (const vy of Y) {
              cellData.push({ [x]: vx, [y]: vy });
            }
          }
          return cellData;
        }
        if (X.length) return X.map((d) => ({ [x]: d }));
        if (Y.length) return Y.map((d) => ({ [y]: d }));
      };
      return cellData();
    },
  };
  return {
    data: { type: 'inline', value: data, transform: [connector] },
  };
});

/**
 * @todo Move some options assignment to runtime.
 */
export const setChildren = useOverrideAdaptor<G2ViewTree>(
  (
    options,
    subLayout: SubLayout = subLayoutRect,
    createGuideX = createGuideXRect,
    createGuideY = createGuideYRect,
    childOptions = {},
  ) => {
    const {
      data: dataValue,
      encode,
      children,
      scale: facetScale,
      x: originX = 0,
      y: originY = 0,
      shareData = false,
      key: viewKey,
    } = options;
    const { value: data } = dataValue;
    // Only support field encode now.
    const { x: encodeX, y: encodeY } = encode;
    const { color: facetScaleColor } = facetScale;
    const { domain: facetDomainColor } = facetScaleColor;
    const createChildren: G2MarkChildrenCallback = (
      visualData,
      scale,
      layout,
    ) => {
      const { x: scaleX, y: scaleY } = scale;
      const { paddingLeft, paddingTop, marginLeft, marginTop } = layout;
      const { domain: domainX } = scaleX.getOptions();
      const { domain: domainY } = scaleY.getOptions();
      const index = indexOf(visualData);
      const bboxs = visualData.map(subLayout);
      const values = visualData.map(({ x, y }) => [
        scaleX.invert(x),
        scaleY.invert(y),
      ]);
      const filters = values.map(([fx, fy]) => (d) => {
        const { [encodeX]: x, [encodeY]: y } = d;
        const inX = encodeX !== undefined ? x === fx : true;
        const inY = encodeY !== undefined ? y === fy : true;
        return inX && inY;
      });
      const facetData2d = filters.map((f) => data.filter(f));
      const maxDataDomain = shareData
        ? max(facetData2d, (data) => data.length)
        : undefined;
      const facets = values.map(([fx, fy]) => ({
        columnField: encodeX,
        columnIndex: domainX.indexOf(fx),
        columnValue: fx,
        columnValuesLength: domainX.length,
        rowField: encodeY,
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
        const facet = facets[i];
        const facetData = facetData2d[i];
        const children = normalizedChildren[i];
        return children.map(
          ({
            scale,
            key,
            facet: isFacet = true,
            axis = {},
            legend = {},
            ...rest
          }) => {
            const guideY = scale?.y?.guide || axis.y;
            const guideX = scale?.x?.guide || axis.x;
            const defaultScale = {
              x: { tickCount: encodeX ? 5 : undefined },
              y: { tickCount: encodeY ? 5 : undefined },
            };
            const newData = isFacet
              ? facetData
              : facetData.length === 0
              ? []
              : data;
            const newScale = {
              color: { domain: facetDomainColor },
            };
            const newAxis = {
              x: createGuide(guideX, createGuideX)(facet, newData),
              y: createGuide(guideY, createGuideY)(facet, newData),
            };
            return {
              key: `${key}-${i}`,
              data: newData,
              margin: 0,
              x: left + paddingLeft + originX + marginLeft,
              y: top + paddingTop + originY + marginTop,
              parentKey: viewKey,
              width,
              height,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              frame: newData.length ? true : false,
              dataDomain: maxDataDomain,
              scale: deepMix(defaultScale, scale, newScale),
              axis: deepMix({}, axis, newAxis),
              // Hide all legends for child mark by default,
              // they are displayed in the top-level.
              legend: false,
              ...rest,
              ...childOptions,
            };
          },
        );
      });
    };
    return {
      children: createChildren,
    };
  },
);

function subLayoutRect(data) {
  const { points } = data;
  return calcBBox(points);
}

/**
 * Inner guide not show title, tickLine, label and subTickLine,
 * if data is empty, do not show guide.
 */
export function createInnerGuide(guide, data) {
  return data.length
    ? deepMix(
        {
          title: false,
          tick: null,
          label: null,
        },
        guide,
      )
    : deepMix(
        {
          title: false,
          tick: null,
          label: null,
          grid: null,
        },
        guide,
      );
}

function createGuideXRect(guide) {
  return (facet, data) => {
    const { rowIndex, rowValuesLength, columnIndex, columnValuesLength } =
      facet;
    // Only the bottom-most facet show axisX.
    if (rowIndex !== rowValuesLength - 1) return createInnerGuide(guide, data);
    // Only the bottom-left facet show title.
    const title = columnIndex !== columnValuesLength - 1 ? false : undefined;
    // If data is empty, do not show cell.
    const grid = data.length ? undefined : null;
    return deepMix({ title, grid }, guide);
  };
}

function createGuideYRect(guide) {
  return (facet, data) => {
    const { rowIndex, columnIndex } = facet;
    // Only the left-most facet show axisY.
    if (columnIndex !== 0) return createInnerGuide(guide, data);
    // Only the left-top facet show title.
    const title = rowIndex !== 0 ? false : undefined;
    // If data is empty, do not show cell.
    const grid = data.length ? undefined : null;
    return deepMix({ title, grid }, guide);
  };
}

function createGuide(guide, factory) {
  if (typeof guide === 'function') return guide;
  if (guide === null || guide === false) return () => null;
  return factory(guide);
}

export type FacetRectOptions = Omit<FacetRectComposition, 'type'>;

export const FacetRect: CC<FacetRectOptions> = () => {
  return (options) => {
    const newOptions = Container.of<G2ViewTree>(options)
      .call(toCell)
      .call(inferColor)
      .call(setAnimation)
      .call(setScale)
      .call(setStyle)
      .call(setData)
      .call(setChildren)
      .value();
    return [newOptions];
  };
};

FacetRect.props = {};
