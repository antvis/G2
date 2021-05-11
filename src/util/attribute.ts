import { Position } from '../visual/attribute';

/**
 * 创建一个 attribute 类型的实例
 * // TODO https://github.com/antvis/G2/blob/master/src/geometry/base.ts#L1612
 * @param type
 * @param cfg
 */
export function createAttribute(type: string, cfg: any) {
  switch (type) {
    case 'position':
      return new Position(cfg);
    default:
      // TODO: 后面再修改, Identity 还没有
      return new Position(cfg);
  }
}
