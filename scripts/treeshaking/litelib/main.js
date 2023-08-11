import { Runtime, extend, litelib, Interval } from '@antv/g2';
import { bar } from '../common/bar';

bar(
  extend(Runtime, {
    ...litelib(),
    'mark.interval': Interval,
  }),
);
