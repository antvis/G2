import { find } from '@antv/util';
import { Annotation } from '../chart/plugin/annotation';
import { Axis } from '../chart/plugin/axis';
import { Plugin } from '../chart/plugin/base';
import { Legend } from '../chart/plugin/legend';
import { Tooltip } from '../chart/plugin/tooltip';

function getPlugin(plugins: Plugin[], name: string): unknown {
  return find(plugins, (p: Plugin) => p.name === name) as unknown;
}

/**
 * 从 plugin 数组中找到 tooltip plugin
 * @param plugins
 */
export function getTooltip(plugins: Plugin[]): Tooltip {
  return getPlugin(plugins, 'tooltip') as Tooltip;
}

/**
 * 从 plugin 数组中找到 legend plugin
 * @param plugins
 */
export function getLegend(plugins: Plugin[]): Legend {
  return getPlugin(plugins, 'legend') as Legend;
}

/**
 * 从 plugin 数组中找到 axis plugin
 * @param plugins
 */
export function getAxis(plugins: Plugin[]): Axis {
  return getPlugin(plugins, 'axis') as Axis;
}

/**
 * 从 plugin 数组中找到 annotation plugin
 * @param plugins
 */
export function getAnnotation(plugins: Plugin[]): Annotation {
  return getPlugin(plugins, 'annotation') as Annotation;
}
