import ActiveRegion from './active-region';
import Action from './base';
import TooltipAction from './component/tooltip';
import ElmentActive from './element/active';
import ElmentRangeActive from './element/range-active';
import ElmentSingleActive from './element/single-active';

import ElmentHighlight from './element/highlight';
import ElmentRangeHighlight from './element/range-highlight';
import ElmentSingleHighlight from './element/single-highlight';

import PieSelected from './element/pie-selected';
import ElementRangeSelected from './element/range-selected';
import ElementSelected from './element/selected';
import ElementSingleSelected from './element/single-selected';

import ListActive from './component/list-active';
import ListHighlight from './component/list-highlight';
import ListSelected from './component/list-selected';
import ListUnchecked from './component/list-unchecked';

import CursorAction from './cursor';
import { createAction, registerAction } from './register';

registerAction('tooltip', TooltipAction);
registerAction('element-active', ElmentActive);
registerAction('element-single-active', ElmentSingleActive);
registerAction('element-range-active', ElmentRangeActive);

registerAction('element-highlight', ElmentHighlight);
registerAction('element-single-highlight', ElmentSingleHighlight);
registerAction('element-range-highlight', ElmentRangeHighlight);

registerAction('element-selected', ElementSelected);
registerAction('element-single-selected', ElementSingleSelected);
registerAction('element-range-selected', ElementRangeSelected);
registerAction('pie-selected', PieSelected);

registerAction('active-region', ActiveRegion);
registerAction('list-active', ListActive);
registerAction('list-selected', ListSelected);
registerAction('list-highlight', ListHighlight);
registerAction('list-unchecked', ListUnchecked);

registerAction('cursor', CursorAction);
export { Action, registerAction, createAction };
