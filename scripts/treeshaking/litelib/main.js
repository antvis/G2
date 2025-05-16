import { Runtime, extend, litelib } from '@antv/g2';
import { Interval } from '@antv/g2/esm/mark/interval';
import { bar } from '../common/bar';

bar(
  extend(Runtime, {
    ...litelib(),
    'mark.interval': Interval,
  }),
);
