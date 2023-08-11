import { Runtime, extend, corelib } from '@antv/g2';
import { bar } from '../common/bar';

bar(extend(Runtime, corelib()));
