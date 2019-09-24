import * as G from '@antv/g';
import * as Util from '@antv/util';
import * as Interface from './interface';
export { Util };
export { G };
export { Interface };

export { default as Plot } from './plot/plot';
export { default as View } from './plot/view';

import { Element, getElement, registerElement } from './element';
import Area from './element/area';
import Box from './element/box';
import Edge from './element/edge';
import Heatmap from './element/heatmap';
import Interval from './element/interval';
import Kline from './element/k-line';
import Line from './element/line';
import Path from './element/path';
import Point from './element/point';
import Polygon from './element/polygon';
import * as Shape from './element/shape/base';
import Text from './element/text';
// 注册 element
registerElement('Line', Line);
registerElement('Path', Path);
registerElement('Point', Point);
registerElement('Interval', Interval);
registerElement('Edge', Edge);
registerElement('Polygon', Polygon);
registerElement('Area', Area);
registerElement('Box', Box);
registerElement('Kline', Kline);
registerElement('Text', Text);
registerElement('Heatmap', Heatmap);
export { registerElement, getElement, Element };
export { registerShape, registerShapeFactory, getShapeFactory } from './element/shape/base';
export { Shape };

import { Facet, registerFacet } from './facet';
import { Rect } from './facet/rect';
registerFacet('rect', Rect);
export { registerFacet, Facet };

export { registerInteraction, getInteraction, Interaction } from './interaction';
export { default as Global, setTheme, version } from './global';
export { registerTheme, getTheme } from './theme';

import Animate from './animate/animate';
export { Animate };

export { registerScale, getScale, Scale } from '@antv/scale';
export { registerAdjust, getAdjust, Adjust } from '@antv/adjust';
export { getCoordinate, Coordinate} from '@antv/coord';
export { getAttribute, Attribute } from '@antv/attr';

import * as Option from './plot/interface';
export { Option };

export { registerElementLabels, getElementLabels, ElementLabels } from './element/controller/label/';
