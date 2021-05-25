import { deepMix, each, get, isNumber, isString, last } from '@antv/util';
import { createScaleByField } from '../../util/scale';
import { ScaleDef } from '.';
import { Data, PlainObject } from '../../types/common';
import { ScaleOption } from '../../types';

export type ScaleMeta = {
  key: string;
  scaleDef: ScaleDef;
  scaleOption: ScaleOption;
  syncKey?: string;
};

export const SEP_KEY = '^_^';

/**
 * 整个 chart 的所有 scale 都集中存储到一起，便于做同步和实例复用
 */
export class ScalePool {
  /**
   * 所有的 scale 信息，k-v 存储。
   * key: scale 对应的 key（从 view 冒泡上来的，直接使用 view_id + field）
   * ScaleMeta: scale 实例、同步的 key、scaleDef 配置
   */
  private scaleMap = new Map<string, ScaleMeta>();

  /**
   * scale 同步的数据结构
   * scale 同步的意思是，不同字段的 scale 对应的 scale 映射采用相同的配置。比如双轴图中，左边成本，右边利润，虽然数据量级是不同，到时需要放到一个坐标系大小中去对比，所以需要进行 scale 的同步
   * 主要处理的逻辑是将 scale 的 min max domain 保持一致
   * 数据结构：syncKey ----> scaleKey
   */
  private syncScaleKeys = new Map<string, string[]>();

  /**
   * 通过 key 获取 scale
   */
  public get(key: string): ScaleDef {
    let scaleMeta = this.getScaleMeta(key);
    if (!scaleMeta) {
      // 这里耦合有 key 的生成规则
      const field = last(key.split(SEP_KEY));
      const scaleKeys = this.syncScaleKeys.get(field);
      if (scaleKeys?.length) {
        scaleMeta = this.getScaleMeta(scaleKeys[0]);
      }
    }
    return scaleMeta?.scaleDef;
  }

  /**
   * 创建一个新的 scale，并缓存起来
   * @param field
   * @param data
   * @param scaleOption
   * @param key
   */
  public create(field: string, data: Data, scaleOption: ScaleOption, key: string): ScaleDef {
    let finalScaleDef = scaleOption;

    const cacheScaleMeta = this.getScaleMeta(key);
    if (data.length === 0 && cacheScaleMeta) {
      // 在更新过程中数据变为空，同时 key 对应的 scale 已存在则保持 scale 同类型
      const cacheScale = cacheScaleMeta.scaleDef;
      const cacheScaleDef: PlainObject = {
        type: cacheScale.type,
        // 如果是分类类型，保持 values，防止图形跳变
        domain: cacheScale.isCategory ? cacheScale.getOption('domain') : undefined,
      };
      finalScaleDef = deepMix(cacheScaleDef, cacheScaleMeta.scaleDef, scaleOption);
    }

    const scaleDef = createScaleByField(field, data, finalScaleDef);

    // 缓存起来
    this.cacheScale(key, scaleDef, scaleOption);

    return scaleDef;
  }

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
   * 核心 API：同步 scale
   */
  public sync(defaultCategoryRange: number[]) {
    // 对于 syncScales 中每一个 syncKey 下面的 scale 数组进行同步处理
    this.syncScaleKeys.forEach((scaleKeys: string[]) => {
      // min, max, values, ranges
      let min = Number.MAX_SAFE_INTEGER;
      let max = Number.MIN_SAFE_INTEGER;
      const domain = [];

      // 1. 遍历求得最大最小值，values 等
      each(scaleKeys, (key: string) => {
        const scale = this.get(key);

        max = isNumber(scale.getOption('max')) ? Math.max(max, scale.getOption('max')) : max;
        min = isNumber(scale.getOption('min')) ? Math.min(min, scale.getOption('min')) : min;

        // 去重
        each(scale.getOption('domain'), (v: any) => {
          if (!domain.includes(v)) {
            domain.push(v);
          }
        });
      });

      // 2. 同步
      each(scaleKeys, (key: string) => {
        const scale = this.get(key);

        if (scale.isLinear) {
          scale.update({
            min,
            max,
            domain,
          });
        } else if (scale.isCategory) {
          let range = scale.getOption('range');
          const cacheScaleMeta = this.getScaleMeta(key);

          // 存在 value 值，且用户没有配置 range 配置 to fix https://github.com/antvis/G2/issues/2996
          if (domain && !get(cacheScaleMeta, ['scaleOption', 'range'])) {
            // 更新 range
            range = defaultCategoryRange;
          }
          scale.update({
            domain,
            range,
          });
        }
      });
    });
  }

  /**
   * 通过 key 获取 scale
   * @param key
   */
  private getScaleMeta(key: string): ScaleMeta {
    return this.scaleMap.get(key);
  }

  /**
   * 将生成的 scale 存储起来
   * @param key
   * @param scaleDef
   * @param scaleOption
   */
  private cacheScale(key: string, scaleDef: ScaleDef, scaleOption: ScaleOption) {
    // 1. 缓存到 scales
    let sm = this.getScaleMeta(key);
    // 存在则更新，同时检测类型是否一致
    const oldScaleDef = sm?.scaleDef;
    if (oldScaleDef?.type === scaleDef.type) {
      sm.scaleOption = scaleOption;
      sm.scaleDef = scaleDef;
    } else {
      sm = {
        key,
        scaleDef,
        scaleOption,
      };

      this.scaleMap.set(key, sm);
    }

    // 2. 缓存到 syncScales，构造 Record<sync, string[]> 数据结构
    const syncKey = this.getSyncKey(sm);
    sm.syncKey = syncKey; // 设置 sync 同步的 key

    // 因为存在更新 scale 机制，所以在缓存之前，先从原 syncScales 中去除 sync 的缓存引用
    this.removeFromSyncScales(key);

    // 存在 sync 标记才进行 sync
    if (syncKey) {
      // 不存在这个 syncKey，则创建一个空数组
      let scaleKeys = this.syncScaleKeys.get(syncKey);
      if (!scaleKeys) {
        scaleKeys = [];
        this.syncScaleKeys.set(syncKey, scaleKeys);
      }
      scaleKeys.push(key);
    }
  }

  /**
   * get scale sync key
   * @param sm
   */
  private getSyncKey(sm: ScaleMeta): string {
    const { scaleDef, scaleOption } = sm;
    const { field } = scaleDef;
    const sync = get(scaleOption, ['sync']);

    // 如果 sync = true，则直接使用字段名作为 syncKey
    if (isString(sync)) return sync;
    if (sync === true) return field;
    return undefined;
  }

  /**
   * 删除 sync scale 引用
   * @param key
   */
  private removeFromSyncScales(key: string) {
    this.syncScaleKeys.forEach((scaleKeys: string[], syncKey: string) => {
      const idx = scaleKeys.indexOf(key);

      if (idx !== -1) {
        scaleKeys.splice(idx, 1);

        // 删除空数组值
        if (scaleKeys.length === 0) {
          this.scaleMap.delete(syncKey);
        }
        return false; // 跳出循环
      }
    });
  }
}
