/**
 * @description path，路径图，用于绘制无序的线图
 */
import * as _ from '@antv/util';
import Element from './base';
import { splitData } from './util/split-data';
import { DataPointType } from '../interface';
import LineShapeFactory from './shape/line';

export default class Path extends Element {
  constructor(cfg: DataPointType) {
    super({
      type: 'path',
      shapeType: 'line',
      connectNulls: false, // 是否连接空值数据
      showSinglePoint: false, // 折线图、区域图、path 当只有一个数据时，是否显示成点
      ...cfg,
    });
    this.set('shapeFactory', LineShapeFactory); // 设置 path 对应的 shapeFactory
  }

  /**
   * @override
   * 构造绘制 path 需要的属性
   * @param obj 数据
   */
  getDrawCfg(obj: DataPointType) {
    const drawCfg = super.getDrawCfg(obj);
    const isStack = this.hasAdjust('stack');
    return {
      ...drawCfg,
      isStack,
      showSinglePoint: this.get('showSinglePoint'),
    };
  }

  draw(data: DataPointType[], container, shapeFactory, index: number) {
    const splitArray = splitData(data, this.get('connectNulls'), this.getYScale().field);
    const cfg = this.getDrawCfg(data[0]);
    cfg.origin = data; // path,line 等图的 origin 是整个数据序列
    _.each(splitArray, (subData, splitedIndex) => {
      if (!_.isEmpty(subData)) {
        cfg.splitedIndex = splitedIndex; // 传入分割片段索引 用于生成id
        cfg.points = subData;
        const geomShape = shapeFactory.drawShape(cfg.shape, cfg, container);
        this.appendShapeInfo(geomShape, index + splitedIndex);
      }
    });
  }
}
