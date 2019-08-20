import * as Util from '@antv/util';
import * as G from '@antv/g';
import * as Interface from './interface';
export { Util };
export { G };
export { Interface };

export { default as Plot } from './plot/plot';
export { default as View } from './plot/view';

import { registerElement, getElement, Element } from './element';
import * as Shape from './element/shape/base';
import Line from './element/line';
import Path from './element/path';
import Point from './element/point';
import Interval from './element/interval';
import Edge from './element/edge';
import Polygon from './element/polygon';
import Area from './element/area';
import Box from './element/box';
import Kline from './element/k-line';
import Text from './element/text';
import Heatmap from './element/heatmap';
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

import { registerFacet, Facet } from './facet';
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
export { getCoord, Coord } from '@antv/coord';
export { getAttribute, Attribute } from '@antv/attr';

import * as Option from './plot/interface';
export { Option };

export { registerElementLabels, getElementLabels, ElementLabels } from './element/controller/label/';
