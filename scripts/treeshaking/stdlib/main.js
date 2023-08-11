import { Runtime, extend, stdlib } from '@antv/g2';
import { bar } from '../common/bar';

bar(extend(Runtime, stdlib()));
