import { Color, Indentity, Position, Shape, Size } from '../geometry/attribute';

/**
 * 创建一个 attribute 类型的实例
 * // TODO https://github.com/antvis/G2/blob/master/src/geometry/base.ts#L1612
 * @param type
 * @param cfg
 */
export function createAttribute(type: string, cfg: any) {
  switch (type) {
    case 'color':
      return new Color(cfg);
    case 'position':
      return new Position(cfg);
    case 'shape':
      return new Shape(cfg);
    case 'size':
      return new Size(cfg);
    default:
      return new Indentity(cfg);
  }
}
