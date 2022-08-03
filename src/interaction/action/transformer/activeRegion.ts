import { Band as BandScale } from '@antv/scale';
import { ActionComponent as AC } from '../../types';
import { ActiveRegionAction } from '../../../spec';
import { isPolar } from '../../../utils/coordinate';
import { getAllElements, getClosestElement } from '../../utils';

export type ActiveRegionOptions = Omit<ActiveRegionAction, 'type'>;

export const ActiveRegion: AC<ActiveRegionOptions> = (options) => {
  const { clear, fill = '#CCD6EC', fillOpacity = 0.3 } = options;
  return (context) => {
    const { coordinate, event, scale, selection, transientLayer } = context;

    // @todo support ActiveRegion in polar coordinate.
    if (isPolar(coordinate)) return;

    const scaleX = scale.x as BandScale;

    const plot = selection.select('.plot').node();
    const [x0, y0] = plot.getBounds().min;
    const { offsetX, offsetY } = event;
    const [value] = coordinate.invert([offsetX - x0, offsetY - y0]);

    const data = [];

    const elements = getAllElements(selection);
    const closestElement = getClosestElement(elements, scaleX, value);
    if (!clear && closestElement) {
      const { x } = closestElement.__data__;
      const invertX = scaleX.invert(x);

      let w1 = 0.01;
      let w2 = 0.01;

      if (scaleX.getBandWidth) {
        const bandW = scaleX.getBandWidth(invertX);
        const step = scaleX.getStep(invertX);
        const gap = (step - bandW) / 2;
        w1 = gap;
        w2 = bandW + gap;
      }

      const [x1, y1] = coordinate.map([x - w1, 0]);
      const [x2, y2] = coordinate.map([x + w2, 1]);
      data.push({ x: x1, y: y1, width: x2 - x1, height: y2 - y1 });
    }

    transientLayer
      .style('zIndex', -1)
      .selectAll('.active-region')
      .data(data, (_, i) => i)
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('className', 'active-region')
            .style('fill', fill)
            .style('fillOpacity', fillOpacity)
            .each(function (datum) {
              this.attr(datum);
            }),
        (update) =>
          update.each(function (datum) {
            this.attr(datum);
          }),
        (exit) => exit.remove(),
      );

    return context;
  };
};

ActiveRegion.props = {};
