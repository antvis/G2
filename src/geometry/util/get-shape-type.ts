import { isArray } from 'util';

/**
 * @ignore
 * 从图形数据中获取 shape 类型
 * @param shapeCfg
 * @param defaultShapeType
 * @returns
 */
export function getShapeType(shapeCfg: any, defaultShapeType: string): string {
  let shapeType = defaultShapeType;
  if (shapeCfg.shape) {
    shapeType = isArray(shapeCfg.shape) ? shapeCfg.shape[0] : shapeCfg.shape;
  }

  return shapeType;
}
