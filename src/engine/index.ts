import { IG } from '../dependents';

const ENGINES: Record<string, IG> = {};

/**
 * 通过名字获取渲染 engine
 * @param name
 * @returns G engine
 */
export function getEngine(name: string): IG {
  const G = ENGINES[name];

  if (!G) {
    console.error('G engine %s is not exist, please register it at first.', name);
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
