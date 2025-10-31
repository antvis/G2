import type { TextStyleProps, DisplayObject } from '@antv/g';
import { get, deepMix, pick, keys } from '@antv/util';
import { select, PLOT_CLASS_NAME } from '@antv/g2';
import {
  CHILD_NODE_COUNT,
  HIERARCHY_TYPE,
  HIERARCHY_TYPE_FIELD,
  HIERARCHY_ANCESTOR_FIELD,
} from '../mark/hierarchy';

// Get hierarchy element.
const getElementsHierarchy = (plot: DisplayObject) => {
  return plot.querySelectorAll('.element').filter((item) => {
    const itemStyle = (item as any).style || {};
    return itemStyle[HIERARCHY_TYPE_FIELD] === HIERARCHY_TYPE;
  });
};

function selectPlotArea(root: DisplayObject): DisplayObject {
  return select(root).select(`.${PLOT_CLASS_NAME}`).node();
}

export type DrillDownOptions = {
  breadCrumb?: {
    rootText: string;
    style: TextStyleProps;
    active: TextStyleProps;
  };
};

// Default breadCrumb config.
const DEFAULT_BREADCRUMB = {
  rootText: 'root',
  style: {
    fill: 'rgba(0, 0, 0, 0.6)',
    fontSize: 11,
  },
  y: 4,
  x: 8, // Add left spacing
  active: {
    fill: 'rgba(0, 0, 0, 0.4)',
  },
};

/**
 * DrillDown interaction for hierarchy visualization.
 * Based on the proven sunburst drilldown implementation.
 */
export function DrillDown(drillDownOptions: DrillDownOptions = {}) {
  const { breadCrumb: textConfig = {} } = drillDownOptions;
  const breadCrumb = deepMix({}, DEFAULT_BREADCRUMB, textConfig);

  return (context: any) => {
    const { update, setState, container, view, options: viewOptions } = context;

    const document = container.ownerDocument;

    const plotArea = selectPlotArea(container);

    const hierarchyMark = viewOptions.marks.find(
      ({ id }: any) => id === HIERARCHY_TYPE,
    );
    if (!hierarchyMark) return;
    const { state } = hierarchyMark;

    // Create breadCrumbTextsGroup to save textSeparator and drillTexts.
    const textGroup = document.createElement('g');
    textGroup.style.transform = `translate(${breadCrumb.x || 0}px, ${
      breadCrumb.y || 0
    }px)`;

    textGroup.setAttribute('x', 'drilldown-breadcrumb');
    plotArea.appendChild(textGroup);

    // Modify data and scale according to the path and level of current click to achieve drilling down, drilling up and initialization effects.
    const drillDownClick = async (path: string[]) => {
      // Clear text.
      textGroup.removeChildren();

      // More path creation text.
      if (path && path.length > 0) {
        // Create root text.
        const rootText = document.createElement('text', {
          style: {
            text: breadCrumb.rootText,
            ...breadCrumb.style,
          },
        });

        textGroup.appendChild(rootText);

        let name = '';
        const pathArray = path;
        let y = breadCrumb.style.y;
        let x = rootText.getBBox().width;

        const maxWidth = plotArea.getBBox().width;

        // Create path: 'type1 / type2 / type3' -> '/ type1 / type2 / type3'.
        const drillTexts = pathArray.map((text, index) => {
          const textSeparator = document.createElement('text', {
            style: {
              x,
              text: ' / ',
              ...breadCrumb.style,
              y,
            },
          });

          textGroup.appendChild(textSeparator);

          x += textSeparator.getBBox().width;

          name = `${name}${text} / `;

          const drillText = document.createElement('text', {
            name: name.replace(/\s\/\s$/, ''),
            style: {
              text,
              x,
              ...breadCrumb.style,
              y,
            },
          });

          textGroup.appendChild(drillText);

          x += drillText.getBBox().width;

          /**
           * Page width exceeds maximum, line feed.
           * | ----maxWidth---- |
           * | / type1 / type2 / type3 |
           * ->
           * | ----maxWidth---- |
           * | / type1 / type2  |
           * | / type3 |
           */
          if (x > maxWidth) {
            y = textGroup.getBBox().height;
            x = 0;
            textSeparator.attr({
              x,
              y,
            });
            x += textSeparator.getBBox().width;
            drillText.attr({
              x,
              y,
            });
            x += drillText.getBBox().width;
          }

          return drillText;
        });

        // Add active state and drilldown interaction
        const textStack = [rootText, ...drillTexts];
        textStack.forEach((item, index) => {
          // Skip the last drillText
          if (index === drillTexts.length) return;
          const originalAttrs = { ...item.attributes };
          item.attr('cursor', 'pointer');
          item.addEventListener('mouseenter', () => {
            item.attr(breadCrumb.active);
          });
          item.addEventListener('mouseleave', () => {
            item.attr(originalAttrs);
          });
          item.addEventListener('click', () => {
            drillDownClick(path.slice(0, index));
          });
        });
      }

      // Update marks.
      setState('drillDown', (viewOptions: any) => {
        const { marks } = viewOptions;
        // Add filter transform for every mark,
        // which will skip for mark without color channel.
        const newMarks = marks.map((mark: any) => {
          if (mark.id !== HIERARCHY_TYPE && mark.type !== 'rect') return mark;

          // Inset after aggregate transform, such as group and bin.
          const { data } = mark;

          const newData = data.filter((item: any) => {
            const itemPath = item.path;

            return path.every((item) => itemPath.includes(item));
          });

          // DrillDown by filtering the data and scale.
          return deepMix({}, mark, {
            data: newData,
          });
        });
        return { ...viewOptions, marks: newMarks };
      });

      await update();
    };

    const createDrillClick = (e: Event) => {
      const item = e.target as DisplayObject;

      // Get properties directly from DOM element attributes instead of using get function.
      const markType = (item as any).markType;
      const itemStyle = (item as any).style || {};
      const hierarchyType = itemStyle[HIERARCHY_TYPE_FIELD];
      const childNodeCount = itemStyle[CHILD_NODE_COUNT];
      const itemData = (item as any).__data__;

      if (
        markType !== 'rect' ||
        hierarchyType !== HIERARCHY_TYPE ||
        !childNodeCount
      ) {
        return;
      }

      const path = itemData?.data?.path ?? [];
      itemStyle.cursor = 'pointer';
      drillDownClick(path);
    };

    // Add click drill interaction.
    plotArea.addEventListener('click', createDrillClick);

    // Change attribute keys.
    const changeStyleKey = keys({ ...state.active, ...state.inactive });

    const createActive = () => {
      const elements = getElementsHierarchy(plotArea);
      elements.forEach((element: DisplayObject) => {
        const childNodeCount = get(element, ['style', CHILD_NODE_COUNT]);
        const cursor = get(element, ['style', 'cursor']);
        if (cursor !== 'pointer' && childNodeCount) {
          (element as any).style.cursor = 'pointer';
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

    // Animate elements update and add active state.
    plotArea.addEventListener('mousemove', createActive);

    return () => {
      textGroup.remove();
      plotArea.removeEventListener('click', createDrillClick);
      plotArea.removeEventListener('mousemove', createActive);
    };
  };
}
