import * as _ from '@antv/util';
import { Group } from '@antv/g';
import Element from './base';
import AreaShapeFactory from './shape/area';
import { splitData } from './util/split-data';
import { DataPointType } from '../interface';

export default class Area extends Element {
  constructor(cfg: DataPointType) {
    super({
      type: 'area',
      shapeType: 'area',
      generatePoints: true,
      sortable: true,
      connectNulls: false,
      showSinglePoint: false,
      ...cfg,
    });

    this.set('shapeFactory', AreaShapeFactory);
  }

  draw(data: DataPointType[], container: Group, shapeFactory, index: number) {
    const cfg = this.getDrawCfg(data[0]);
    const splitArray = splitData(data, this.get('connectNulls'), this.getYScale().field);

    cfg.origin = data; // path,line,area 等图的origin 是整个序列
    _.each(splitArray, (subData: DataPointType, splitedIndex: number) => {
      cfg.splitedIndex = splitedIndex; // 传入分割片段索引 用于生成id
      const points = subData.map((obj) => {
        return obj.points;
      });
      cfg.points = points;
      const geomShape = shapeFactory.drawShape(cfg.shape, cfg, container);
      this.appendShapeInfo(geomShape, index + splitedIndex);
    });
  }
}
