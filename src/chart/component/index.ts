import { find } from '@antv/util';
import { ComponentCtor } from './base';

const LOAD_COMPONENT_PLUGINS: Record<string, ComponentCtor> = {};

/**
 * 全局注册插件
 * @param name
 * @param plugin
 * @returns void
 */
export function registerComponent(name: string, plugin: ComponentCtor) {
  LOAD_COMPONENT_PLUGINS[name] = plugin;
}

/**
 * 删除全局插件
 * @param name
 * @returns void
 */
export function unregisterComponent(name: string) {
  delete LOAD_COMPONENT_PLUGINS[name];
}

/**
 * 获取全局插件
 * @returns string[]
 */
export function getComponentNames(): string[] {
  return Object.keys(LOAD_COMPONENT_PLUGINS);
}

/**
 * 获得组件插件
 * @param name
 */
export function getComponent(name: string): ComponentCtor {
  return LOAD_COMPONENT_PLUGINS[name];
}
