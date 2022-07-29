import { Band as BandScale } from '@antv/scale';
import { ActionComponent as AC } from '../../types';
import { ActiveRegionAction } from '../../../spec';

export type ActiveRegionOptions = Omit<ActiveRegionAction, 'type'>;

export const ActiveRegion: AC<ActiveRegionOptions> = (options) => {
  const { clear, fill = '#CCD6EC', fillOpacity = 0.3 } = options;
  return (context) => {
    const { coordinate, event, scale, selection, transientLayer } = context;
    const scaleX = scale.x as BandScale;
    // If scale.x is not a band scale, do not show shadow activeRegion. @todo Maybe should support it.
    if (!scaleX?.getBandWidth) return context;

    const plot = selection.select('.plot').node();
    const [x0, y0] = plot.getBounds().min;
    const { offsetX, offsetY } = event;
    const [value] = coordinate.invert([offsetX - x0, offsetY - y0]);

    const range = scaleX.getRange();

    const data = [];
    for (let i = 0; !clear && i < range.length; i++) {
      const x = range[i];
      const invertX = scaleX.invert(x);
      const bandW = scaleX.getBandWidth(invertX);
      const step = scaleX.getStep(invertX);
      const gap = (step - bandW) / 2;

      if (value >= x - gap && value < x + bandW + gap) {
        const w1 = gap;
        const w2 = bandW + gap;
        const [x1, y1] = coordinate.map([x - w1, 0]);
        const [x2, y2] = coordinate.map([x + w2, 1]);
        data.push({ x: x1, y: y1, width: x2 - x1, height: y2 - y1 });
        break;
      }
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
