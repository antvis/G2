import { find, findIndex } from '@antv/util';
import { PluginCtor } from './base';

const LOAD_COMPONENT_PLUGINS: PluginCtor[] = [];

/**
 * 全局注册插件
 * @param plugin
 */
export function registerComponent(plugin: PluginCtor) {
  if (!find(LOAD_COMPONENT_PLUGINS, plugin)) {
    LOAD_COMPONENT_PLUGINS.push(plugin);
  }
}

/**
 * 删除全局插件
 * @param plugin
 * @returns void
 */
export function removeComponent(plugin: PluginCtor) {
  const idx = findIndex(LOAD_COMPONENT_PLUGINS, (p: PluginCtor) => p === plugin);

  // 找到则移除
  if (idx !== -1) {
    LOAD_COMPONENT_PLUGINS.splice(idx, 1);
  }
}

/**
 * 获取全局插件
 * @returns PluginCtor[]
 */
export function getComponents(): PluginCtor[] {
  return LOAD_COMPONENT_PLUGINS;
}
