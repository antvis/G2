import { Coordinate } from '@antv/coord';
import { G2Theme, GuideComponentComponent as GCC, Scale } from '../runtime';
import { angleOf } from '../utils/coordinate';
import { AxisOptions, LinearAxis } from './axis';

export type AxisRadarOptions = AxisOptions & {
  radar: {
    count: number;
    index: number;
  };
};

function inferTitleTransform(orientation: number) {
  const internalOrientation = orientation % (Math.PI * 2);

  if (internalOrientation === Math.PI / 2) {
    return { titleTransform: 'translate(0, 50%)' };
  }
  if (internalOrientation > -Math.PI / 2 && internalOrientation < Math.PI / 2) {
    return { titleTransform: 'translate(50%, 0)' };
  }
  if (
    internalOrientation > Math.PI / 2 &&
    internalOrientation < (Math.PI * 3) / 2
  ) {
    return { titleTransform: 'translate(-50%, 0)' };
  }
  return {};
}

function inferAxisStyle(
  options: AxisRadarOptions,
  theme: G2Theme,
  coordinate: Coordinate,
  scales: Scale[],
) {
  const { radar } = options;
  const [scale] = scales;
  const name = scale.getOptions().name;
  const [startAngle, endAngle] = angleOf(coordinate);
  const { axisRadar: radarTheme = {} } = theme;

  return {
    ...radarTheme,
    grid: name === 'position',
    gridConnect: 'line',
    gridControlAngles: new Array(radar.count).fill(0).map((_, i) => {
      const angle = (endAngle - startAngle) / radar.count;
      return angle * i;
    }),
  };
}

export const AxisRadar: GCC<AxisRadarOptions> = (options) => {
  const { important = {}, ...restOptions } = options;
  return (context) => {
    const { theme, coordinate, scales } = context;
    return LinearAxis({
      ...restOptions,
      ...inferTitleTransform(options.orientation),
      important: {
        ...inferAxisStyle(options, theme, coordinate, scales),
        ...important,
      },
    })(context);
  };
};

AxisRadar.props = {
  ...LinearAxis.props,
  defaultPosition: 'center',
};
