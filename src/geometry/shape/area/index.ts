import { isArray } from '@antv/util';
import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../interface';
import { registerShape, registerShapeFactory } from '../base';
import { getShapeAttrs } from './util';

const AreaShapeFactory = registerShapeFactory('area', {
  defaultShapeType: 'area',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    // area 基本标记的绘制需要获取上下两边的顶点
    const { x, y0 } = pointInfo;
    const y = isArray(pointInfo.y) ? pointInfo.y : [y0, pointInfo.y];

    return y.map((yItem: number) => {
      return {
        x: x as number,
        y: yItem,
      };
    });
  },
});

// Area 几何标记默认的 shape：填充的区域图
registerShape('area', 'area', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const attrs = getShapeAttrs(cfg, false, false, this);
    const shape = container.addShape({
      type: 'path',
      attrs,
      name: 'area',
    });

    return shape;
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: (x: number, y: number, r: number = 5.5) => {
        return [['M', x - r, y - 4], ['L', x + r, y - 4], ['L', x + r, y + 4], ['L', x - r, y + 4], ['Z']];
      },
      style: {
        r: 5,
        fill: color,
        fillOpacity: 1,
      },
    };
  },
});

export default AreaShapeFactory;
