import { IElement } from '@antv/g';
import { Tooltip as TooltipComponent } from '@antv/gui';
import { ActionComponent as AC, G2Theme } from '../../runtime';
import { TooltipAction } from '../../spec';

function getContainer(group: IElement) {
  // @ts-ignore
  return group.getRootNode().defaultView.getConfig().container;
}

function updateTooltip(
  datum: any,
  mouseX: number,
  mouseY: number,
  tooltipElement: TooltipComponent,
  scale: any,
  theme: G2Theme,
) {
  const { defaultColor } = theme;
  const { title, tooltip, color = defaultColor } = datum;
  const { field } = scale.tooltip.getOptions();
  const items = tooltip.map((d, i) => {
    const isObject = typeof d === 'object' && !(d instanceof Date);
    const item = isObject ? d : { value: `${d}` };
    return {
      name: field[i],
      color,
      ...item,
    };
  });
  tooltipElement.update({
    x: mouseX,
    y: mouseY,
    title,
    position: 'bottom-right',
    offset: [10, 10],
    items,
  });
  tooltipElement.show();
}

export type TooltipOptions = Omit<TooltipAction, 'type'>;

/**
 * @todo Tooltip for line and area geometry.
 * @todo Tooltip for group or stack interval.
 * @todo Using the color(fill or stroke) attribute of each
 * shape as the item.
 */
export const Tooltip: AC<TooltipOptions> = () => {
  return (context) => {
    const { scale, coordinate, theme, selection, shared } = context;
    const { mouseX, mouseY, selectedElements = [] } = shared;
    const data = selectedElements.map((d) => d.__data__);
    const { tooltip } = scale;
    if (tooltip === undefined) return;

    selection
      .select('.selection')
      .selectAll('.tooltip')
      .data(data, (_, i) => i)
      .join(
        (enter) =>
          enter
            .append(() => {
              // Find the first of main layers.
              const mainLayer = selection.select('.main').node();
              const container = getContainer(mainLayer);
              const { x, y, width, height } = coordinate.getOptions();
              const [x0, y0] = mainLayer.getBounds().min;
              const newTooltip = new TooltipComponent({
                style: {
                  container: { x: 0, y: 0 },
                  items: [],
                  bounding: {
                    x: x0 + x,
                    y: y0 + y,
                    width,
                    height,
                  },
                },
              });
              container.appendChild(newTooltip.HTMLTooltipElement);
              return newTooltip;
            })
            .attr('className', 'tooltip')
            .each(function (d) {
              updateTooltip(d, mouseX, mouseY, this, scale, theme);
            }),
        (update) =>
          update.each(function (d) {
            updateTooltip(d, mouseX, mouseY, this, scale, theme);
          }),
        (exit) =>
          exit.each(function () {
            this.hide();
          }),
      );
    return context;
  };
};

Tooltip.props = {};
