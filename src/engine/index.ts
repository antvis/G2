import { IG } from '../dependents';

const ENGINES: Record<string, IG> = {};

/**
 * 通过名字获取渲染 engine
 * @param name 渲染引擎名字
 * @returns G engine
 */
export function getEngine(name: string): IG {
  const G = ENGINES[name];

  if (!G) {
    throw new Error(`G engine '${name}' is not exist, please register it at first.`);
  }

  return G;
}

/**
 * 注册渲染引擎
 * @param name
 * @param engine
 */
export function registerEngine(name: string, engine: IG) {
  ENGINES[name] = engine;
}
