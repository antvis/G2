import { Text, Group } from '@antv/g';
import { get, deepMix, pick, keys, find, size, last } from '@antv/util';
import type { Node } from 'd3-hierarchy';
import type { DisplayObject } from '@antv/g';
import { subObject } from '../utils/helper';
import { PLOT_CLASS_NAME } from '../runtime';
import { select } from '../utils/selection';
import { treeDataTransform } from '../utils/treeDataTransform';
import { legendClearSetState } from './legendFilter';
import { getElements } from './utils';

function selectPlotArea(root: DisplayObject): DisplayObject {
  return select(root).select(`.${PLOT_CLASS_NAME}`).node();
}

export type DrillDownOptions = {
  originData?: Node[];
  layout?: any;
  [key: string]: any;
};

// Default breadCrumb config.
const DEFAULT_BREADCRUMB_STYLE = {
  breadCrumbFill: 'rgba(0, 0, 0, 0.85)',
  breadCrumbFontSize: 12,
  breadCrumbY: 12,
  activeFill: 'rgba(0, 0, 0, 0.5)',
};

/**
 * TreemapDrillDown interaction.
 */
export function TreemapDrillDown(drillDownOptions: DrillDownOptions = {}) {
  const { originData = [], layout, ...style } = drillDownOptions;

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

        // Add Active, Add TreemapDrillDown
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

      // LegendFilter interaction and treemapDrillDown clash.
      legendClearSetState(container, setState);

      // Update marks.
      setState('treemapDrillDown', (viewOptions) => {
        const { marks } = viewOptions;
        // Add filter transform for every marks,
        // which will skip for mark without color channel.

        const strPath = path.join('/');

        const newMarks = marks.map((mark) => {
          if (mark.type !== 'rect') return mark;
          let newData = originData;

          if (depth) {
            const filterData = originData
              .filter((item) => {
                const id = get(item, ['id']);
                return id && (id.match(`${strPath}/`) || strPath.match(id));
              })
              .map((item) => ({
                value: item.height === 0 ? get(item, ['value']) : undefined,
                name: get(item, ['id']),
              }));

            const { paddingLeft, paddingBottom, paddingRight } = layout;

            // New drill layout for calculation x y and filtration data.
            const newLayout = {
              ...layout,
              paddingTop:
                (layout.paddingTop || textGroup.getBBox().height + 10) /
                (depth + 1),
              paddingLeft: paddingLeft / (depth + 1),
              paddingBottom: paddingBottom / (depth + 1),
              paddingRight: paddingRight / (depth + 1),
              path: (d) => d.name,
              layer: (d) => d.depth === depth + 1,
            };

            // Transform the new matrix tree data.
            newData = treeDataTransform(filterData, newLayout, {
              value: 'value',
            })[0];
          } else {
            newData = originData.filter((item) => {
              return item.depth === 1;
            });
          }

          const colorDomain = [];
          newData.forEach(({ path }) => {
            colorDomain.push(last(path));
          });

          // TreemapDrillDown by filtering the data and scale.
          return deepMix({}, mark, {
            data: newData,
            scale: {
              color: { domain: colorDomain },
            },
          });
        });

        return { ...viewOptions, marks: newMarks };
      });

      // The second argument is to allow the legendFilter event to be re-added; the update method itself causes legend to lose the interaction event.
      await update(undefined, ['legendFilter']);
    };

    // Elements and BreadCrumb click.
    const createDrillClick = (e) => {
      const item = e.target;
      if (get(item, ['markType']) !== 'rect') return;

      const key = get(item, ['__data__', 'key']);
      const node = find(originData, (d) => d.id === key);

      // Node height = 0 no children
      if (get(node, 'height')) {
        drillDownClick(get(node, 'path'), get(node, 'depth'));
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
