import ActiveRegion from './active-region';
import Action from './base';
import ElmentActive from './element-active';
import ElementMultipleSelected from './element-multiple-selected';
import ElementSelected from './element-selected';
import PieSelected from './pie-selected';
import { createAction, registerAction } from './register';
import TooltipAction from './tooltip';

registerAction('tooltip', TooltipAction);
registerAction('element-active', ElmentActive);
registerAction('active-region', ActiveRegion);
registerAction('element-selected', ElementSelected);
registerAction('element-multiple-selected', ElementMultipleSelected);
registerAction('pie-selected', PieSelected);

export { Action, registerAction, createAction };
