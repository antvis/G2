import { Text, Group } from '@antv/g';
import {
  get,
  deepMix,
  pick,
  keys,
  find,
  size,
  last,
  isArray,
} from '@antv/util';
import type { Node } from 'd3-hierarchy';
import type { DisplayObject } from '@antv/g';
import { subObject } from '../utils/helper';
import { PLOT_CLASS_NAME } from '../runtime';
import { select } from '../utils/selection';

// Get element.
const getElements = (plot) => {
  return plot.querySelectorAll('.element');
};

function selectPlotArea(root: DisplayObject): DisplayObject {
  return select(root).select(`.${PLOT_CLASS_NAME}`).node();
}

export type DrillDownOptions = {
  style?: {
    [key: string]: string;
  };
  originData?: Node[];
  layout?: any;
};

// Default breadCrumb config.
const DEFAULT_BREADCRUMB_STYLE = {
  breadCrumbFill: 'rgba(0, 0, 0, 0.85)',
  breadCrumbFontSize: 12,
  breadCrumbY: 12,
  activeFill: 'rgba(0, 0, 0, 0.5)',
};

/**
 * @todo DrillDown interaction.
 */
export function DrillDown(drillDownOptions: DrillDownOptions = {}) {
  const { style = {}, originData = [], layout } = drillDownOptions;

  const breadCrumb = deepMix({}, DEFAULT_BREADCRUMB_STYLE, style);

  const breadCrumbStyle = subObject(breadCrumb, 'breadCrumb');
  const breadCrumbActiveStyle = subObject(breadCrumb, 'active');

  return (context) => {
    const { update, setState, container, options } = context;
    const plotArea = selectPlotArea(container);
    const mark = options.marks[0];

    const { state } = mark;

    // Create breadCrumbTextsGroup,save textSeparator、drillTexts.
    const textGroup = new Group();
    plotArea.appendChild(textGroup);

    // Modify the data and scale according to the path and the level of the current click, so as to achieve the effect of drilling down and drilling up and initialization.
    const drillDownClick = async (path: string[], depth: number) => {
      // Clear text.
      textGroup.removeChildren();

      // More path creation text.
      if (depth) {
        let name = '';
        let y = breadCrumbStyle.y;
        let x = 0;
        const textPath = [];

        const maxWidth = plotArea.getBBox().width;

        // Create path: 'type1 / type2 / type3' -> '/ type1 / type2 / type3'.
        const drillTexts = path.map((text, index) => {
          name = `${name}${text}/`;
          textPath.push(text);
          const drillText = new Text({
            name: name.replace(/\/$/, ''),
            style: {
              text,
              x,
              // @ts-ignore
              path: [...textPath],
              depth: index,
              ...breadCrumbStyle,
              y,
            },
          });

          textGroup.appendChild(drillText);

          x += drillText.getBBox().width;

          const textSeparator = new Text({
            style: {
              x,
              text: ' / ',
              ...breadCrumbStyle,
              y,
            },
          });

          textGroup.appendChild(textSeparator);

          x += textSeparator.getBBox().width;

          /**
           * Page width exceeds maximum, line feed.
           * | ----maxWidth---- |
           * | / tyep1 / tyep2 / type3 |
           * ->
           * | ----maxWidth---- |
           * | / tyep1 / tyep2  |
           * | / type3 |
           */
          if (x > maxWidth) {
            y = textGroup.getBBox().height + breadCrumbStyle.y;
            x = 0;
            drillText.attr({
              x,
              y,
            });
            x += drillText.getBBox().width;
            textSeparator.attr({
              x,
              y,
            });
            x += textSeparator.getBBox().width;
          }

          if (index === size(path) - 1) {
            textSeparator.remove();
          }

          return drillText;
        });

        // Add Active, Add DrillDown
        drillTexts.forEach((item, index) => {
          // Last drillText
          if (index === size(drillTexts) - 1) return;
          const originalAttrs = { ...item.attributes };
          item.attr('cursor', 'pointer');
          item.addEventListener('mouseenter', () => {
            item.attr(breadCrumbActiveStyle);
          });
          item.addEventListener('mouseleave', () => {
            item.attr(originalAttrs);
          });
          item.addEventListener('click', () => {
            drillDownClick(
              get(item, ['style', 'path']),
              get(item, ['style', 'depth']),
            );
          });
        });
      }

      // Update marks.
      setState('drillDown', (viewOptions) => {
        const { marks } = viewOptions;
        // Add filter transform for every marks,
        // which will skip for mark without color channel.

        const strPath = path.join('/');

        const newMarks = marks.map((mark) => {
          if (mark.type !== 'rect') return mark;
          const {
            scale: { x, y },
            transform,
          } = mark;
          const newData = originData.filter((item) => {
            if (!depth) return item.depth === 1;

            const reg = new RegExp(`^${strPath}.+`);
            return reg.test(item.id) && item.depth === depth + 1;
          });

          const { paddingBottom, paddingLeft, paddingRight, paddingTop } =
            layout;

          const domainX = [];
          const domainY = [];
          const colorDomain = [];
          newData.forEach(({ x0, x1, y0, y1, path }) => {
            colorDomain.push(last(path));
            domainX[0] = Math.min(get(domainX, [0], x0), x0);
            domainX[1] = Math.max(get(domainX, [1], x1), x1);
            domainY[0] = Math.min(get(domainY, [0], y0), y0);
            domainY[1] = Math.max(get(domainY, [1], y1), y1);
          });

          // Get new scale x y, domain.
          const widthRadio =
            (domainX[1] - domainX[0]) / (x.domain[1] - x.domain[0]);
          const heightRadio =
            (domainY[1] - domainY[0]) / (y.domain[1] - y.domain[0]);

          domainX[0] = domainX[0] - paddingLeft * widthRadio;
          domainX[1] = domainX[1] + paddingRight * widthRadio;
          domainY[0] =
            domainY[0] -
            (paddingTop || (depth ? textGroup.getBBox().height + 10 : 0)) *
              heightRadio;
          domainY[1] = domainY[1] + paddingBottom * heightRadio;

          if (isArray(transform)) {
            const { type, color } = last(transform);
            if (type === 'filter' && color) {
              transform.pop();
            }
          }

          // DrillDown by filtering the data and scale.
          return deepMix({}, mark, {
            data: newData,
            scale: {
              x: { domain: domainX },
              y: { domain: domainY },
              color: { domain: colorDomain },
            },
            transform,
          });
        });

        return { ...viewOptions, marks: newMarks };
      });
      await update();
    };

    const createDrillClick = (e) => {
      const item = e.target;
      if (get(item, ['markType']) !== 'rect') return;

      const key = get(item, ['__data__', 'key']);
      const node = find(originData, (d) => d.id === key);

      // Node height = 0 no children
      if (node?.height) {
        drillDownClick(node.path, node.depth);
      }
    };

    // Add click drill interaction.
    plotArea.addEventListener('click', createDrillClick);

    // Change attributes keys.
    const changeStyleKey = keys({ ...state.active, ...state.inactive });

    const createActive = () => {
      const elements = getElements(plotArea);
      elements.forEach((element) => {
        const cursor = get(element, ['style', 'cursor']);
        const node = find(
          originData,
          (d) => d.id === get(element, ['__data__', 'key']),
        );

        if (cursor !== 'pointer' && node?.height) {
          element.style.cursor = 'pointer';
          const originalAttrs = pick(element.attributes, changeStyleKey);

          element.addEventListener('mouseenter', () => {
            element.attr(state.active);
          });

          element.addEventListener('mouseleave', () => {
            element.attr(deepMix(originalAttrs, state.inactive));
          });
        }
      });
    };

    createActive();
    // Animate elements update, Add active.
    plotArea.addEventListener('mousemove', createActive);

    return () => {
      textGroup.remove();
      plotArea.removeEventListener('click', createDrillClick);
      plotArea.removeEventListener('mousemove', createActive);
    };
  };
}
