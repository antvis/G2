import { last } from '@antv/util';
import { Data } from '../../types/common';
import { ScaleOption } from '../../types/view';

export type ScaleMeta = {
  key: string;
  scale: any;
  scaleDef: ScaleOption;
  syncKey?: string;
};

export const SEP_KEY = '^_^';

/**
 * 整个 chart 的所有 scale 都集中存储到一起，便于做同步和复用
 * // todo 补全
 */
export class ScalePool {
  /**
   * 所有的 scale 信息，k-v 存储
   */
  private scaleMap = new Map<string, ScaleMeta>();

  private syncScaleKeys = new Map<string, string[]>();

  /**
   * 获取 scale
   */
  public get(key: string) {
    let scaleMeta = this.getScaleMeta(key);
    if (!scaleMeta) {
      const field = last(key.split(SEP_KEY));
      const scaleKeys = this.syncScaleKeys.get(field);
      if (scaleKeys && scaleKeys.length) {
        scaleMeta = this.getScaleMeta(scaleKeys[0]);
      }
    }
    return scaleMeta && scaleMeta.scale;
  }

  /**
   * 创建一个新的 scale，并缓存起来
   * @param field
   * @param data
   * @param scaleOption
   * @param key
   */
  public create(field: string, data: Data, scaleOption: ScaleOption, key: string) {}

  /**
   * 移除一个 scale
   * @param key
   */
  public delete(key: string) {
    const scaleMeta = this.getScaleMeta(key);

    if (scaleMeta) {
      const { syncKey } = scaleMeta;

      const scaleKeys = this.syncScaleKeys.get(syncKey);

      // 移除同步的关系
      if (scaleKeys && scaleKeys.length) {
        const idx = scaleKeys.indexOf(key);

        if (idx !== -1) {
          scaleKeys.splice(idx, 1);
        }
      }
    }

    // 删除 scale 实例
    this.scaleMap.delete(key);
  }

  /**
   * 清空所有 scale
   */
  public clear() {
    this.scaleMap.clear();
    this.syncScaleKeys.clear();
  }

  /**
   * scale 同步
   */
  public sync() {
    // todo 执行同步逻辑，保持一致
  }

  /**
   * 通过 key 获取 scale
   * @param key
   */
  private getScaleMeta(key: string): ScaleMeta {
    return this.scaleMap.get(key);
  }
}
