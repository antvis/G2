import { Dodge, Jitter, Stack, Symmetric, Identity } from '../visual/adjust';

/**
 * 创建一个 adjust 类型的实例
 * @param type
 * @param cfg
 */
export function createAdjust(type: string, cfg: any) {
  switch (type.toLowerCase()) {
    case 'dodge':
      return new Dodge(cfg);
    case 'jitter':
      return new Jitter(cfg);
    case 'stack':
      return new Stack(cfg);
    case 'symmetric':
      return new Symmetric(cfg);
    default:
      return new Identity();
  }
}
