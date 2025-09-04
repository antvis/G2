import { Path } from '@antv/g';
import { get, deepMix, set } from '@antv/util';
import type { PathStyleProps } from '@antv/g';
import {
  BREAK_GROUP_CLASS_NAME,
  PLOT_CLASS_NAME,
} from '../../runtime/constant';

export const BREAKS_GAP = 0.03; // Default gap ratio for axis breaks

export type BreakOptions = {
  /** Start position of the break. */
  start: number;
  /** End position of the break. */
  end: number;
  /** Gap ratio of the break, default is 0.1. */
  gap?: number;
  /** Number of wave vertices, default is 50. */
  vertices?: number;
  /** Offset of each vertex, default is 3. */
  verticeOffset?: number;
  /** Compression type of the break, default is 'middle'. */
  compress?: 'start' | 'end' | 'middle';
  /** Custom styles of the break. */
  [key: string]: any;
};

const DEFAULT_STYLE = {
  fill: '#fff',
  stroke: '#aaa',
  lineDash: '4 3',
  lineWidth: 0.5,
  fillOpacity: 1,
  strokeOpacity: 1,
};

const PADDING = 0;

/**
 * Create path points and corresponding clip paths.
 * @param y baseline Y coordinate
 * @param width total width of the path
 * @param offset vertical offset of wave
 * @param vertices number of generated points
 * @param isLowerBoundary whether it is the lower boundary
 * @param lineWidth line width of path
 * @returns tuple of [pathPoints, clipPoints]
 */
const createPathPoints = (
  y: number,
  width: number,
  offset: number,
  vertices: number,
  isLowerBoundary: boolean,
  lineWidth: number,
) => {
  const pathPoints: string[] = [];
  const clipPoints: string[] = [];
  const segments = vertices - 1;

  for (let i = 1; i < segments; i++) {
    const x = (i / segments) * width;
    const offsetY = y + (i % 2 === 0 ? offset : -offset);

    pathPoints.push(`${x},${offsetY}`);
    clipPoints.push(
      `${x},${isLowerBoundary ? offsetY - lineWidth : offsetY + lineWidth}`,
    );
  }

  // Ensure last point reaches width
  pathPoints.push(`${width},${y}`);
  clipPoints.push(`${width + lineWidth},${y}`);

  return [pathPoints, clipPoints] as const;
};

export const AxisBreaks = (_, params) => {
  const { context, selection, view } = params;
  const layer = selection.select(`.${PLOT_CLASS_NAME}`).node();
  const { document } = context.canvas;
  const { scale } = view;

  const collapsed = new Map<string, BreakOptions>();

  const handleCollapseToggle = async (
    key: string,
    start: number,
    end: number,
  ) => {
    const { update, setState } = context.externals;
    setState('options', (prev) => {
      const { marks } = prev;
      if (!marks || !marks.length) return prev;
      const newMarks = marks.map((mark) => {
        const breaks = get(mark, 'scale.y.breaks', []);

        const newBreaks = breaks.filter(
          (b) => b.start !== start && b.end !== end && !b.collapsed,
        );
        // add collapsed: true flag to the corresponding breaks
        breaks.forEach((b) => {
          if (b.start === start && b.end === end) {
            b.collapsed = true;
          }
        });
        console.log('breaks group:', breaks, newBreaks);
        return deepMix({}, mark, { scale: { y: { breaks: newBreaks } } });
      });
      collapsed.set(key, { start, end });
      return { ...prev, marks: newMarks };
    });
    await update();
  };

  const resetCollapsed = async () => {
    if (!collapsed.size) return;
    const { update, setState } = context.externals;
    setState('options', (prev) => {
      const { marks } = prev;
      const newMarks = marks.map((mark) => {
        const breaks = get(mark, 'scale.y.breaks', []);
        set(
          mark,
          'scale.y.breaks',
          breaks.map((b) => ({
            ...b,
            collapsed: false,
          })),
        );
        return mark;
      });
      collapsed.clear();
      return { ...prev, marks: newMarks };
    });
    await update();
  };

  return (option: BreakOptions) => {
    const {
      key,
      start,
      end,
      gap = BREAKS_GAP,
      vertices = 50,
      lineWidth = 0.5,
      verticeOffset = 3,
      ...style
    } = option;

    const g = document.createElement('g', {
      id: `break-group-${key}`,
      className: BREAK_GROUP_CLASS_NAME,
    });

    const xDomain = get(scale, 'x.sortedDomain', []);
    const yScale = scale['y'].getOptions();
    const { range, domain } = yScale;
    const startIndex = domain.indexOf(start);
    const endIndex = domain.indexOf(end);
    const { width: plotWidth, height: plotHeight } = layer.getBBox();
    if (startIndex === -1 || endIndex === -1 || !xDomain.length) return g;
    const reverse = range[0] > range[1];
    const lowerY = range[startIndex] * plotHeight;
    const upperY = range[endIndex] * plotHeight;

    let linePath = '';
    let clipPath = '';

    for (const [boundaryIndex, { y, isLower }] of [
      { y: upperY, isLower: false },
      { y: lowerY, isLower: true },
    ].entries()) {
      const clipOffset = reverse ? lineWidth : -lineWidth;
      const [pathPoints, clipPoints] = createPathPoints(
        y,
        plotWidth - PADDING,
        verticeOffset,
        vertices,
        isLower,
        clipOffset,
      );
      if (boundaryIndex === 0) {
        // start point + Top boundary path
        linePath = `M ${PADDING},${y} L ${pathPoints.join(' L ')} `;
        clipPath = `M ${PADDING - lineWidth},${
          y + clipOffset
        } L ${clipPoints.join(' L ')} `;
      } else {
        // Bottom boundary path + close point
        linePath += `L ${plotWidth - PADDING},${y} L ${[...pathPoints]
          .reverse()
          .join(' L ')} L ${PADDING},${y} Z`;
        clipPath += `L ${plotWidth - PADDING + lineWidth + 2},${
          y - clipOffset
        } L ${[...clipPoints].reverse().join(' L ')} L ${PADDING - lineWidth},${
          y - clipOffset
        } Z`;
      }
    }

    const pathAttrs = { ...DEFAULT_STYLE, ...style } as PathStyleProps;

    try {
      const path1 = new Path({ style: { ...pathAttrs, d: linePath } });
      const path2 = new Path({
        style: { ...pathAttrs, d: clipPath, lineWidth: 0, cursor: 'pointer' },
      });
      // double click to remove break
      path2.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (e.detail === 2) {
          await handleCollapseToggle(key, start, end);
        }
      });
      g.appendChild(path1);
      g.appendChild(path2);

      // reset collapsed breaks on double click the plot background
      layer.addEventListener('click', async (e) => {
        if (e.detail === 2) {
          await resetCollapsed();
        }
      });

      layer.appendChild(g);
    } catch (e) {
      console.error('Failed to create break path:', e);
    }

    return g;
  };
};

AxisBreaks.props = {};
