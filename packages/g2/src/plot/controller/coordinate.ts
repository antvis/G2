/**
 * @description coord 的控制器
 */
import * as _ from '@antv/util';
import { getCoordinate } from '../../dependents';
import { PointObject } from '../../interface';
import { CoordinateCfg, CoordinateOption, CoordinateType } from '../interface';

export default class CoordController {
  public type: CoordinateType = 'rect';
  public actions: any[][] = [];
  public cfg: CoordinateCfg = {};
  public options: CoordinateOption = {};

  constructor(option: CoordinateOption = {}) {
    _.mix(this, option);
    this.options = option; // ugly！！！通过浅拷贝 view.get('options').coord 来动态更改该属性值，见 view.ts#L917
  }

  public reset(option) {
    this.type = option.type || 'rect';
    this.actions = option.actions || [];
    this.cfg = option.cfg;

    // 更新 view.get('options').coord，见view.ts#L917
    this.options.type = this.type;
    this.options.actions = this.actions;
    this.options.cfg = this.cfg;
    return this;
  }

  /**
   * 创建坐标系对象
   * @param  {Object} start 坐标系起始点
   * @param  {Object} end   坐标系结束点
   * @return {Function} 坐标系的构造函数
   */
  public createCoord(start: PointObject, end: PointObject) {
    const type = this.type;
    const cfg = this.cfg;
    let C; // 构造函数
    let coord;

    const coordCfg = {
      start,
      end,
      ...cfg,
    };

    if (type === 'theta') { // definition of theta coord
      C = getCoordinate('polar');

      if (!this._hasAction('transpose')) {
        this.transpose(); // 极坐标，同时transpose
      }
      coord = new C(coordCfg);
      coord.type = type;
    } else {
      C = getCoordinate(type);
      coord = new C(coordCfg);
    }

    this._execActions(coord);
    return coord;
  }

  /**
   * 围绕坐标系中心点旋转对应的角度
   * @param angle 旋转角度
   */
  public rotate(angle: number) {
    const _angle = angle * Math.PI / 180;
    this.actions.push([ 'rotate', _angle ]);
    return this;
  }

  /**
   * 将坐标系沿 x 方向或者沿 y 轴方向进行镜像映射
   * @param dim 镜像方向，可选值 'x' 和 'y'，默认为 'x'
   */
  public reflect(dim: 'x' | 'y' = 'y') {
    this.actions.push([ 'reflect', dim ]);
    return this;
  }

  /**
   * 根据坐标系中心点进行相应的缩放
   * @param sx x 轴缩放值
   * @param sy y 轴缩放值
   */
  public scale(sx: number, sy: number) {
    this.actions.push([ 'scale', sx, sy ]);
    return this;
  }

  /**
   * x，y 轴交换
   */
  public transpose() {
    this.actions.push([ 'transpose' ]);
    return this;
  }

  private _execActions(coord) {
    _.each(this.actions, (action: any[]) => {
      const m = action[0];
      coord[m](action[1], action[2]);
    });
  }

  private _hasAction(actionName) {
    const actions = this.actions;
    let rst = false;
    _.each(actions, (action) => {
      if (actionName === action[0]) {
        rst = true;
        return false;
      }
    });
    return rst;
  }
}
