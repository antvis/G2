import ActiveRegion from './active-region';
import Action from './base';
import TooltipAction from './component/tooltip';
import ElmentActive from './element/active';
import ElmentHighlight from './element/highlight';
import PieSelected from './element/pie-selected';
import ElementSelected from './element/selected';
import ElementSingleSelected from './element/single-selected';
import { createAction, registerAction } from './register';

registerAction('tooltip', TooltipAction);
registerAction('element-active', ElmentActive);
registerAction('element-highlight', ElmentHighlight);
registerAction('element-selected', ElementSelected);

registerAction('active-region', ActiveRegion);
registerAction('element-single-selected', ElementSingleSelected);
registerAction('pie-selected', PieSelected);

export { Action, registerAction, createAction };
