/**
 * view 中缓存 scale 的类
 */
import { each, get, isNumber, last } from '@antv/util';
import { Scale } from '../../dependents';
import { Data, ScaleOption } from '../../interface';
import { createScaleByField, syncScale } from '../../util/scale';

interface ScaleMeta {
  readonly key: string;
  readonly scale: Scale;
  scaleDef: ScaleOption;
}

export class ScalePool {
  /** 所有的 scales */
  private scales: Record<string, ScaleMeta> = {};
  /** 需要同步的 scale 分组， key: scaleKeyArray */
  private syncScales: Record<string, string[]> = {};

  /**
   * 创建 scale
   * @param field
   * @param data
   * @param scaleDef
   * @param key
   */
  public createScale(field: string, data: Data, scaleDef: ScaleOption, key: string): Scale {
    const scale = createScaleByField(field, data, scaleDef);

    // 缓存起来
    this.cacheScale(scale, scaleDef, key);

    return scale;
  }

  /**
   * 同步 scale
   */
  public sync() {
    // 对于 syncScales 中每一个 syncKey 下面的 scale 数组进行同步处理
    each(this.syncScales, (scaleKeys: string[], syncKey: string) => {
      // min, max, values
      let min = Number.MAX_SAFE_INTEGER;
      let max = Number.MIN_SAFE_INTEGER;
      const values = [];

      // 1. 遍历求得最大最小值，values 等
      each(scaleKeys, (key: string) => {
        const scale = this.getScale(key);

        max = isNumber(scale.max) ? Math.max(max, scale.max) : max;
        min = isNumber(scale.min) ? Math.min(min, scale.min) : min;

        // 去重
        each(scale.values, (v: any) => {
          if (!values.includes(v)) {
            values.push(v);
          }
        });
      });

      // 2. 同步
      each(scaleKeys, (key: string) => {
        const scale = this.getScale(key);

        if (scale.isContinuous) {
          scale.change({
            min,
            max,
            values,
          });
        } else if (scale.isCategory) {
          scale.change({
            values,
          });
        }
      });
    });
  }

  /**
   * 缓存一个 scale
   * @param scale
   * @param scaleDef
   * @param key
   */
  private cacheScale(scale: Scale, scaleDef: ScaleOption, key: string) {
    // 1. 缓存到 scales

    let sm = this.getScaleMeta(key);
    // 存在则更新
    if (sm) {
      syncScale(sm.scale, scale);
      sm.scaleDef = scaleDef;
      // 更新 scaleDef
    } else {
      sm = {
        key,
        scale,
        scaleDef,
      };

      this.scales[key] = sm;
    }

    // 2. 缓存到 syncScales，构造 Record<sync, string[]> 数据结构
    const syncKey = this.getSyncKey(sm);

    // 因为存在更新 scale 机制，所以在缓存之前，先从原 syncScales 中去除 sync 的缓存引用
    this.removeFromSyncScales(key);

    // 存在 sync 标记才进行 sync
    if (syncKey) {
      // 不存在这个 syncKey，则创建一个空数组
      if (!this.syncScales[syncKey]) {
        this.syncScales[syncKey] = [];
      }
      this.syncScales[syncKey].push(key);
    }
  }

  /**
   * 通过 key 获取 scale
   * @param key
   */
  public getScale(key: string): Scale {
    let scaleMeta = this.getScaleMeta(key);
    if (!scaleMeta) {
      const field = last(key.split('-'));
      if (this.syncScales[field] && this.syncScales[field].length) {
        scaleMeta = this.getScaleMeta(this.syncScales[field][0]);
      }
    }
    return scaleMeta && scaleMeta.scale;
  }

  /**
   * 清空
   */
  public clear() {
    this.scales = {};
    this.syncScales = {};
  }

  /**
   * 删除 sync scale 引用
   * @param key
   */
  private removeFromSyncScales(key: string) {
    each(this.syncScales, (scaleKeys: string[], syncKey: string) => {
      const idx = scaleKeys.indexOf(key);

      if (idx !== -1) {
        scaleKeys.splice(idx, 1);

        // 删除空数组值
        if (scaleKeys.length === 0) {
          delete this.syncScales[syncKey];
        }

        return false; // 跳出循环
      }
    });
  }

  /**
   * get sync key
   * @param sm
   */
  private getSyncKey(sm: ScaleMeta): string {
    const { scale, scaleDef } = sm;
    const { field } = scale;
    const sync = get(scaleDef, ['sync']);

    // 如果 sync = true，则直接使用字段名作为 syncKey
    return sync === true ? field : sync === false ? undefined : sync;
  }

  /**
   * 通过 key 获取 scale
   * @param key
   */
  private getScaleMeta(key: string): ScaleMeta {
    return this.scales[key];
  }
}
