import { clone, isPlainObject, lowerCase, mix } from '@antv/util';
import { View } from '../chart';
import { IInteractionContext, LooseObject } from '../interface';
import { Action, registerAction } from './action/';
import GrammarInteraction, { InteractionSteps } from './grammar-interaction';
import Interaction from './interaction';
import { InteractonConstructor } from './interaction';

const Interactions: LooseObject = {};

/**
 * Gets interaction by name
 * @param name the name of interaction
 * @returns the interaction which extends [[Interaction]] or [[InteractionSteps]]
 */
export function getInteraction(name: string): InteractionSteps | InteractonConstructor {
  return Interactions[lowerCase(name)];
}

/**
 * Register interaction
 * @param name the registered interaciton name
 * @param interaction the interaction which extends [[Interaction]] or [[InteractionSteps]]
 */
export function registerInteraction(name: string, interaction: InteractionSteps | InteractonConstructor) {
  Interactions[lowerCase(name)] = interaction;
}

/**
 *
 * @param name the registered interaciton name
 * @param view the view applied interaction
 * @param cfg the interaction cfg
 */
export function createInteraction(name: string, view: View, cfg?: LooseObject) {
  const interaciton = getInteraction(name);
  if (!interaciton) {
    return null;
  }
  if (isPlainObject(interaciton)) {
    // 如果不 clone 则会多个 interaction 实例共享 step 的定义
    const steps = mix(clone(interaciton), cfg) as InteractionSteps;
    return new GrammarInteraction(view, steps);
  } else {
    const cls = interaciton as InteractonConstructor;
    return new cls(view, cfg);
  }
}

// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});

// 移动到 elment 上 active
registerInteraction('element-active', {
  start: [{ trigger: 'element:mouseenter', action: 'element-active:active' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-active:reset' }],
});

// 点击选中，允许取消
registerInteraction('element-selected', {
  start: [{ trigger: 'element:click', action: 'element-selected:toggle' }],
});

// 点击选中，允许取消
registerInteraction('element-highlight', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
});

// legend hover，element active
registerInteraction('legend-active', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-active:active', 'element-active:active'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-active:reset', 'element-active:reset'] }],
});

// legend hover，element active
registerInteraction('legend-highlight', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});

// legend hover，element active
registerInteraction('axis-label-highlight', {
  start: [{ trigger: 'axis-label:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'axis-label:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});

// legend hover，element active
registerInteraction('element-list-highlight', {
  start: [{ trigger: 'element:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'element:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});

function isPointInView(context: IInteractionContext) {
  return context.isInView();
}
// 框选
registerInteraction('element-range-highlight', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'mousedown',
      isEnable: isPointInView,
      action: ['element-range-highlight:start', 'rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'mousemove',
      isEnable: isPointInView,
      action: ['element-range-highlight:highlight', 'rect-mask:resize'],
    },
  ],
  end: [{ trigger: 'mouseup', isEnable: isPointInView, action: ['element-range-highlight:end', 'rect-mask:end'] }],
  rollback: [{ trigger: 'dblclick', action: ['element-range-highlight:clear', 'rect-mask:hide'] }],
});

registerInteraction('element-brush', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'mousedown',
      isEnable: isPointInView,
      action: ['brush:start', 'rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'mousemove',
      isEnable: isPointInView,
      action: ['rect-mask:resize'],
    },
  ],
  end: [
    {
      trigger: 'mouseup',
      isEnable: isPointInView,
      action: ['brush:filter', 'brush:end', 'rect-mask:end', 'rect-mask:hide'],
    },
  ],
  rollback: [{ trigger: 'dblclick', action: ['brush:reset'] }],
});

registerInteraction('element-brush-x', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'mousedown',
      isEnable: isPointInView,
      action: ['brush-x:start', 'rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'mousemove',
      isEnable: isPointInView,
      action: ['rect-mask:resize'],
    },
  ],
  end: [
    {
      trigger: 'mouseup',
      isEnable: isPointInView,
      action: ['brush-x:filter', 'brush-x:end', 'rect-mask:end', 'rect-mask:hide'],
    },
  ],
  rollback: [{ trigger: 'dblclick', action: ['brush-x:reset'] }],
});

registerInteraction('element-path-highlight', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    { trigger: 'mousedown', isEnable: isPointInView, action: 'path-mask:start' },
    { trigger: 'mousedown', isEnable: isPointInView, action: 'path-mask:show' },
  ],
  processing: [{ trigger: 'mousemove', action: 'path-mask:addPoint' }],
  end: [{ trigger: 'mouseup', action: 'path-mask:end' }],
  rollback: [{ trigger: 'dblclick', action: 'path-mask:hide' }],
});

// 点击选中，允许取消
registerInteraction('element-single-selected', {
  start: [{ trigger: 'element:click', action: 'element-single-selected:toggle' }],
});

// 饼图的选中
registerInteraction('pie-selected', {
  start: [
    {
      trigger: 'interval:click',
      isEnable(context) {
        const coord = context.view.getCoordinate();
        return coord.type === 'theta';
      },
      action: 'pie-selected:toggle',
    },
  ],
});

// 筛选数据
registerInteraction('legend-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' },
  ],
  start: [
    { trigger: 'legend-item:click', action: 'list-unchecked:toggle' },
    { trigger: 'legend-item:click', action: 'data-filter:filter' },
  ],
});

// 筛选数据
registerInteraction('continuous-filter', {
  start: [{ trigger: 'legend:valuechanged', action: 'data-filter:filter' }],
});
// 筛选数据
registerInteraction('continuous-visible-filter', {
  start: [{ trigger: 'legend:valuechanged', action: 'element-filter:filter' }],
});

// 筛选图形
registerInteraction('legend-visible-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' },
  ],
  start: [
    { trigger: 'legend-item:click', action: 'list-unchecked:toggle' },
    { trigger: 'legend-item:click', action: 'element-filter:filter' },
  ],
});

// 出现背景框
registerInteraction('active-region', {
  start: [{ trigger: 'plot:mousemove', action: 'active-region:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
});

export { Interaction, Action, registerAction };
