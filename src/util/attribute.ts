import { Identity } from '@antv/scale';
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
      return new Identity(cfg);
  }
}
