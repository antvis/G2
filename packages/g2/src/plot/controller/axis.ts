import * as _ from '@antv/util';
import { vec2 } from '@antv/matrix-util';
import { Group } from '@antv/g';
import { Axis, Interface } from '@antv/component';
import { Scale, Coord } from '../../dependents';
import { AxesOption } from '../interface';

interface CircleCFG {
  startAngle?: number;
  endAngle?: number;
  center?: any;
  radius?: number;
  inner?: number;
}

interface HelixCFG {
  a?: number;
  startAngle?: number;
  endAngle?: number;
  crp?: number[];
  axisStart?: any;
  center?: any;
  inner?: number; // 内半径
}

function formatTicks(ticks) {
  let tmp = [];
  if (ticks.length) {
    tmp = ticks.slice(0);
    const first = tmp[0];
    const last = tmp[tmp.length - 1];
    if (first.value !== 0) {
      tmp.unshift({
        value: 0,
      });
    }
    if (last.value !== 1) {
      tmp.push({
        value: 1,
      });
    }
  }
  return tmp;
}

function fillAxisTicks(ticks, isLinear, gridCentering) {
  let result = [];
  if (!ticks.length) return result;

  if (ticks.length >= 2 && isLinear && gridCentering) {
    result.push({
      text: '',
      tickValue: '',
      value: 0,
    });
  }
  if (ticks[0].value !== 0) {
    result.push({
      text: '',
      tickValue: '',
      value: 0,
    });
  }
  result = result.concat(ticks);
  if (result[result.length - 1].value !== 1) {
    result.push({
      text: '',
      tickValue: '',
      value: 1,
    });
  }
  return result;
}

function getDefaultValueFromPosition(position, v = 0) {
  let val = v;
  if (position === 'middle') {
    val = 0.5;
  }
  if (position.indexOf('%') !== -1) {
    val = parseInt(position, 10) / 100;
  }
  return val;
}

type AxisControllerCFG = Partial<{
  visible: boolean;
  canvas: Group;
  container: Group;
  coord: Coord;
  options: AxesOption;
  axes: any[];
  theme: { axis: any };
  title: { text: any };
}>;

export default class AxisController {
  title: AxisControllerCFG['title'] = null;
  visible: AxisControllerCFG['visible'] = true;
  canvas: AxisControllerCFG['canvas'] = null;
  container: AxisControllerCFG['canvas'] = null;
  coord: AxisControllerCFG['coord'] = null;
  options: AxisControllerCFG['options'] = null;
  axes: AxisControllerCFG['axes'] = [];
  theme: AxisControllerCFG['theme'] = null;

  constructor(cfg: AxisControllerCFG) {
    _.mix(this, cfg);
  }

  createAxis(xScale: Scale, yScales: Scale[], viewId) {
    const coord = this.coord;
    const coordType = coord.type;

    // theta坐标系默认不绘制坐标轴
    if (coordType !== 'theta' && !(coordType === 'polar' && coord.isTransposed)) {
      let xAxis;
      if (xScale && !this._isHide(xScale.field)) {
        xAxis = this._drawAxis(coord, xScale, yScales[0], 'x', viewId); // 绘制 x 轴
      }
      if (!_.isEmpty(yScales) && coordType !== 'helix') {
        _.each(yScales, (yScale, index) => {
          if (!this._isHide(yScale.field)) {
            this._drawAxis(coord, yScale, xScale, 'y', viewId, xAxis, index);
          }
        });
      }
    }
  }

  changeVisible(visible) {
    const axes = this.axes;
    _.each(axes, (axis) => {
      axis.set('visible', visible);
    });
  }

  clear() {
    const axes = this.axes;
    _.each(axes, (axis) => {
      axis.clear();
    });
    this.axes = [];
  }

  // 根据字段名获取对应的坐标轴配置
  private _getAxisOptionByField(field: string, defaultValue = {}) {
    return _.get(this.options, `fields.${field}`, defaultValue);
  }

  // 对应的坐标轴是否隐藏
  private _isHide(field: string) {
    return this._getAxisOptionByField(field) === false;
  }

  private _getMiddleValue(curValue, ticks, index, isLinear) {
    if (curValue === 0 && !isLinear) {
      return 0;
    }
    if (curValue === 1) {
      return 1;
    }
    const nextValue = ticks[index + 1].value;
    if (!isLinear && nextValue === 1) {
      return 1;
    }
    return (curValue + nextValue) / 2;
  }

  private _getLineRange(coord, scale, dimType, index) {
    let start;
    let end;
    let isVertical;
    const field = scale.field;
    const position = this._getAxisOptionByField(field).position || ''; // 获取用户自己配置的 position

    // TODO middle & percentage for position
    if (dimType === 'x') { // x轴的坐标轴,底部的横坐标
      let y = (position === 'top') ? 1 : 0;
      y = getDefaultValueFromPosition(position, y);
      start = { x: 0, y };
      end = { x: 1, y };
      isVertical = false;
    } else { // y轴坐标轴
      if (index) { // 多轴的情况
        let x = (position === 'left') ? 0 : 1;
        x = getDefaultValueFromPosition(position, x);
        start = { x, y: 0 };
        end = { x, y: 1 };
      } else { // 单个y轴，或者第一个y轴
        let x = (position === 'right') ? 1 : 0;
        x = getDefaultValueFromPosition(position, x);
        start = { x, y: 0 };
        end = { x, y: 1 };
      }
      isVertical = true;
    }

    start = coord.convert(start);
    end = coord.convert(end);

    return {
      start,
      end,
      isVertical,
    };
  }

  private _getLineCfg(coord, scale, dimType, index) {
    let factor;
    const range = this._getLineRange(coord, scale, dimType, index);
    const { start, end } = range;
    const { center, isTransposed } = coord;
    const isVertical = isTransposed ? !range.isVertical : range.isVertical; // 标识该坐标轴是否是纵坐标

    if ((isVertical && (start.x > center.x)) || (!isVertical && (start.y > center.y))) {
      factor = 1;
    } else {
      factor = -1;
    }

    return {
      isVertical,
      factor,
      start,
      end,
    };
  }

  // 获取圆弧坐标轴配置项信息
  private _getCircleCfg(coord): CircleCFG {
    const { x: rangeX, y: rangeY, isTransposed, circleCenter: center, innerRadius } = coord;
    const isReflectY = rangeY.start > rangeY.end;
    let start;
    if (isTransposed) {
      start = { x: isReflectY ? 0 : 1, y: 0 };
    } else {
      start = { x: 0, y: isReflectY ? 0 : 1 };
    }

    start = coord.convert(start);
    const startVector = [ start.x - center.x, start.y - center.y ];
    const normalVector = [ 1, 0 ];
    let startAngle;
    if (start.y > center.y) {
      startAngle = vec2.angle(startVector, normalVector);
    } else {
      startAngle = vec2.angle(startVector, normalVector) * -1;
    }
    const endAngle = startAngle + (rangeX.end - rangeX.start);

    return {
      startAngle,
      endAngle,
      center,
      radius: Math.sqrt(Math.pow(start.x - center.x, 2) + Math.pow(start.y - center.y, 2)),
      inner: innerRadius || 0,
    };
  }

  private _getRadiusCfg(coord) {
    const startAngle = coord.x.start;
    const factor = startAngle < 0 ? -1 : 1;
    let start;
    let end;
    if (coord.isTransposed) {
      start = { x: 0, y: 0 };
      end = { x: 1, y: 0 };
    } else {
      start = { x: 0, y: 0 };
      end = { x: 0, y: 1 };
    }
    return {
      factor,
      start: coord.convert(start),
      end: coord.convert(end),
    };
  }

  private _getHelixCfg(coord): HelixCFG {
    const helixCfg: HelixCFG = {};
    const { a, startAngle, endAngle, center, y } = coord;
    const index = 100;
    const crp = [];
    for (let i = 0; i <= index; i++) {
      const point = coord.convert({ x: i / 100, y: 0 });
      crp.push(point.x);
      crp.push(point.y);
    }
    const axisStart = coord.convert({ x: 0, y: 0 });

    return {
      a,
      startAngle,
      endAngle,
      crp,
      axisStart,
      center,
      inner: y.start, // 内半径
    };
  }

  // 确定坐标轴的位置
  private _getAxisPosition(coord, dimType, index, field) {
    if (this._getAxisOptionByField(field).position) { // 用户自己定义了 position
      return this._getAxisOptionByField(field).position;
    }

    let position = '';
    const coordType = coord.type;
    if (coord.isRect) {
      if (dimType === 'x') {
        position = 'bottom';
      } else if (dimType === 'y') {
        if (index) {
          position = 'right';
        } else {
          position = 'left';
        }
      }
    } else if (coordType === 'helix') {
      position = 'helix';
    } else if (dimType === 'x') {
      position = coord.isTransposed ? 'radius' : 'circle';
    } else {
      position = coord.isTransposed ? 'circle' : 'radius';
    }

    return position;
  }

  // 获取坐标轴构成的配置信息
  private _getAxisDefaultCfg(coord, scale, type, position) {
    const theme = this.theme;
    const field = scale.field;

    let cfg = {
      coord,
      theme: theme.axis[position], // 传入默认的坐标系配置
    } as Interface.GuideCfg;
    cfg = _.deepMix({}, theme.axis[position], cfg, this._getAxisOptionByField(field));

    if (cfg.showTitle) { // 展示坐标轴标题
      const title = _.get(cfg, 'title', {});
      title.text = title.text || scale.alias || field;
      _.deepMix(cfg, { title });
    }

    cfg.ticks = scale.getTicks();
    if (coord.isPolar && !scale.isCategory) {
      if (type === 'x' && Math.abs(coord.endAngle - coord.startAngle) === Math.PI * 2) {
        cfg.ticks.pop();
      }
    }

    return cfg;
  }

  // 确定坐标轴的配置信息
  private _getAxisCfg(coord, scale, verticalScale, dimType, index = '', viewId) {
    const position = this._getAxisPosition(coord, dimType, index, scale.field);
    const cfg = this._getAxisDefaultCfg(coord, scale, dimType, position);

    if (cfg.grid && verticalScale) { // 生成 gridPoints
      const gridPoints = [];
      const verticalTicks = formatTicks(verticalScale.getTicks());
      // 没有垂直的坐标点时不绘制栅格
      if (verticalTicks.length) {
        const ticks = fillAxisTicks(cfg.ticks, scale.isLinear, cfg.gridAlign === 'center');
        _.each(ticks, (tick, idx) => {
          const subPoints = [];
          let value = tick.value;
          if (cfg.gridAlign === 'center') {
            value = this._getMiddleValue(value, ticks, idx, scale.isLinear);
          }
          if (!_.isNil(value)) {
            const rangeX = coord.x;
            const rangeY = coord.y;
            _.each(verticalTicks, (verticalTick) => {
              const x = dimType === 'x' ? value : verticalTick.value;
              let y = dimType === 'x' ? verticalTick.value : value;
              const point = coord.convert({ x, y });
              if (coord.isPolar) {
                const center = coord.circleCenter;
                if (rangeY.start > rangeY.end) {
                  y = 1 - y;
                }
                point.flag = rangeX.start > rangeX.end ? 0 : 1;
                point.radius = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
              }
              subPoints.push(point);
            });
            gridPoints.push({
              id: `${viewId}-${dimType}${index}-grid-${tick.tickValue}`,
              points: subPoints,
            });
          }
        });
      }
      cfg.gridPoints = gridPoints;
    }
    return cfg;
  }

  private _drawAxis(coord, scale, verticalScale, dimType, viewId, xAxis?, index?) {
    const container = this.container;
    const canvas = this.canvas;
    let C; // 坐标轴类
    let appendCfg; // 每个坐标轴 start end 等绘制边界的信息

    if (coord.type === 'cartesian') {
      C = Axis.Line;
      appendCfg = this._getLineCfg(coord, scale, dimType, index);
    } else if (coord.type === 'helix' && dimType === 'x') {
      C = Axis.Helix;
      appendCfg = this._getHelixCfg(coord);
    } else if (dimType === 'x') {
      C = Axis.Circle;
      appendCfg = this._getCircleCfg(coord);
    } else {
      C = Axis.Line;
      appendCfg = this._getRadiusCfg(coord);
    }
    let cfg = this._getAxisCfg(coord, scale, verticalScale, dimType, index, viewId);
    cfg = _.mix({}, cfg, appendCfg);

    if (dimType === 'y' && xAxis && xAxis.get('type') === 'circle') {
      cfg.circle = xAxis;
    }
    cfg.id = !_.isNil(index) ? `${viewId}-${dimType}${index}` : `${viewId}-${dimType}`;

    _.mix(cfg, {
      canvas,
      group: container.addGroup(),
    } as Interface.GuideCfg);
    const axis = new C(cfg);
    axis.render();
    this.axes.push(axis);
    return axis;
  }
}
