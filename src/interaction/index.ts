import { isObject, lowerCase, mix } from '@antv/util';
import { View } from '../chart';
import { LooseObject } from '../interface';
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
  if (isObject(interaciton)) {
    const steps = mix({}, interaciton, cfg) as InteractionSteps;
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
  end: [{ trigger: 'element:mouseenter', action: 'element-active:reset' }],
});

// 点击选中，允许取消
registerInteraction('element-selected', {
  start: [{ trigger: 'element:click', action: 'element-seleted:toggle' }],
});

// 点击选中，允许取消
registerInteraction('element-highlight', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
});

// legend hover，element active
registerInteraction('legend-active', {
  start: [
    { trigger: 'legend-item:mouseenter', action: 'list-active:active' },
    { trigger: 'legend-item:mouseenter', action: 'element-active:active' },
  ],
  end: [
    { trigger: 'legend-item:mouseleave', action: 'list-active:reset' },
    { trigger: 'legend-item:mouseleave', action: 'element-active:reset' },
  ],
});

// legend hover，element active
registerInteraction('legend-highlight', {
  start: [
    { trigger: 'legend-item:mouseenter', action: 'list-highlight:highlight' },
    { trigger: 'legend-item:mouseenter', action: 'element-highlight:highlight' },
  ],
  end: [
    { trigger: 'legend-item:mouseleave', action: 'list-highlight:reset' },
    { trigger: 'legend-item:mouseleave', action: 'element-highlight:reset' },
  ],
});

// legend hover，element active
registerInteraction('axis-label-highlight', {
  start: [
    { trigger: 'axis-label:mouseenter', action: 'list-highlight:highlight' },
    { trigger: 'axis-label:mouseenter', action: 'element-highlight:highlight' },
  ],
  end: [
    { trigger: 'axis-label:mouseleave', action: 'list-highlight:reset' },
    { trigger: 'axis-label:mouseleave', action: 'element-highlight:reset' },
  ],
});

// legend hover，element active
registerInteraction('element-list-highlight', {
  start: [
    { trigger: 'element:mouseenter', action: 'list-highlight:highlight' },
    { trigger: 'element:mouseenter', action: 'element-highlight:highlight' },
  ],
  end: [
    { trigger: 'element:mouseleave', action: 'list-highlight:reset' },
    { trigger: 'element:mouseleave', action: 'element-highlight:reset' },
  ],
});

// 点击选中，允许取消
registerInteraction('element-single-selected', {
  start: [{ trigger: 'element:click', action: 'element-single-seleted:toggle' }],
});

// 饼图的选中
registerInteraction('pie-selected', {
  start: [{ trigger: 'pie:click', action: 'element-seleted:toggle' }],
});

registerInteraction('active-region', {
  start: [{ trigger: 'plot:mousemove', action: 'active-region:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
});

export { Interaction, Action, registerAction };
