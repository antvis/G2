/**
 * @fileOverview The controller of axis
 * @author sima.zhang
 */
const Util = require('../../util');
const { Axis } = require('@antv/component/lib');
const { vec2 } = Util.MatrixUtil;

function formatTicks(ticks) {
  let tmp = [];
  if (ticks.length > 0) {
    tmp = ticks.slice(0);
    const first = tmp[0];
    const last = tmp[tmp.length - 1];
    if (first.value !== 0) {
      tmp.unshift({
        value: 0
      });
    }
    if (last.value !== 1) {
      tmp.push({
        value: 1
      });
    }
  }
  return tmp;
}

function fillAxisTicks(ticks, isLinear, gridCentering) {
  let result = [];
  if (ticks.length < 1) return result;

  if (ticks.length >= 2 && isLinear && gridCentering) {
    result.push({
      text: '',
      tickValue: '',
      value: 0
    });
  }
  if (ticks[0].value !== 0) {
    result.push({
      text: '',
      tickValue: '',
      value: 0
    });
  }
  result = result.concat(ticks);
  if (result[result.length - 1].value !== 1) {
    result.push({
      text: '',
      tickValue: '',
      value: 1
    });
  }
  return result;
}

function getDefaultValueFromPosition(position, val = 0) {
  if (position === 'middle') {
    val = 0.5;
  }
  if (position.includes('%')) {
    val = parseInt(position, 10) / 100;
  }
  return val;
}

class AxisController {
  constructor(cfg) {
    this.visible = true;
    this.canvas = null;
    this.container = null;
    this.coord = null;
    this.options = null;
    this.axes = [];
    Util.mix(this, cfg);
  }

  _isHide(field) { // 对应的坐标轴是否隐藏
    const options = this.options;

    if (options && options[field] === false) {
      return true;
    }
    return false;
  }

  _getMiddleValue(curValue, ticks, index, isLinear) {
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

  _getLineRange(coord, scale, dimType, index) {
    let start;
    let end;
    let isVertical;
    const field = scale.field;
    const options = this.options;
    let position = '';
    if (options[field] && options[field].position) {
      position = options[field].position;
    }

    // TODO middle & percentage for position
    if (dimType === 'x') { // x轴的坐标轴,底部的横坐标
      let y = (position === 'top') ? 1 : 0;
      y = getDefaultValueFromPosition(position, y);
      start = {
        x: 0,
        y
      };
      end = {
        x: 1,
        y
      };
      isVertical = false;
    } else { // y轴坐标轴
      if (index) { // 多轴的情况
        let x = (position === 'left') ? 0 : 1;
        x = getDefaultValueFromPosition(position, x);
        start = {
          x,
          y: 0
        };
        end = {
          x,
          y: 1
        };
      } else { // 单个y轴，或者第一个y轴
        let x = (position === 'right') ? 1 : 0;
        x = getDefaultValueFromPosition(position, x);
        start = {
          x,
          y: 0
        };
        end = {
          x,
          y: 1
        };
      }
      isVertical = true;
    }

    start = coord.convert(start);
    end = coord.convert(end);

    return {
      start,
      end,
      isVertical
    };
  }

  _getLineCfg(coord, scale, dimType, index) {
    let factor;
    const range = this._getLineRange(coord, scale, dimType, index);
    let isVertical = range.isVertical; // 标识该坐标轴是否是纵坐标
    const start = range.start;
    const end = range.end;
    const center = coord.center;

    if (coord.isTransposed) {
      isVertical = !isVertical;
    }

    if ((isVertical && (start.x > center.x)) || (!isVertical && (start.y > center.y))) {
      factor = 1;
    } else {
      factor = -1;
    }

    return {
      isVertical,
      factor,
      start,
      end
    };
  }

  // 获取圆弧坐标轴配置项信息
  _getCircleCfg(coord) {
    const circleCfg = {};
    const rangeX = coord.x;
    const rangeY = coord.y;
    const isReflectY = rangeY.start > rangeY.end;
    let start;
    if (coord.isTransposed) {
      start = {
        x: isReflectY ? 0 : 1,
        y: 0
      };
    } else {
      start = {
        x: 0,
        y: isReflectY ? 0 : 1
      };
    }

    start = coord.convert(start);
    const center = coord.circleCentre;
    const startVector = [ start.x - center.x, start.y - center.y ];
    const normalVector = [ 1, 0 ];
    let startAngle;
    if (start.y > center.y) {
      startAngle = vec2.angle(startVector, normalVector);
    } else {
      startAngle = vec2.angle(startVector, normalVector) * -1;
    }
    const endAngle = startAngle + (rangeX.end - rangeX.start);

    circleCfg.startAngle = startAngle;
    circleCfg.endAngle = endAngle;
    circleCfg.center = center;
    circleCfg.radius = Math.sqrt((start.x - center.x) ** 2 + (start.y - center.y) ** 2);
    circleCfg.inner = coord.innerRadius || 0;
    return circleCfg;
  }

  _getRadiusCfg(coord) {
    const startAngle = coord.x.start;
    const factor = startAngle < 0 ? -1 : 1;
    let start;
    let end;
    if (coord.isTransposed) {
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 1,
        y: 0
      };
    } else {
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 0,
        y: 1
      };
    }
    return {
      factor,
      start: coord.convert(start),
      end: coord.convert(end)
    };
  }

  // 确定坐标轴的位置
  _getAxisPosition(coord, dimType, index, field) {
    let position = '';
    // 用户自己定义了 position
    const options = this.options;
    // const VALID_POSITIONS = [
    //   'top',
    //   'left',
    //   'right',
    //   'bottom'
    // ];
    if (options[field] && options[field].position) {
      position = options[field].position;
      // if (VALID_POSITIONS.indexOf(position) > -1) {
      //   return position;
      // }
    } else {
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
    }

    return position;
  }

  // 获取坐标轴构成的配置信息
  _getAxisDefaultCfg(coord, scale, type, position) {
    const self = this;
    const viewTheme = self.viewTheme;
    let cfg = {};
    const options = self.options;
    const field = scale.field;

    cfg = Util.deepMix({}, viewTheme.axis[position], cfg, options[field]);
    cfg.viewTheme = viewTheme;
    if (cfg.title) {
      const title = Util.isPlainObject(cfg.title) ? cfg.title : {};
      title.text = title.text || scale.alias || field;
      Util.deepMix(cfg, {
        title
      });
    }

    cfg.ticks = scale.getTicks();

    if (coord.isPolar && !scale.isCategory) {
      if (type === 'x' && Math.abs(coord.endAngle - coord.startAngle) === Math.PI * 2) {
        cfg.ticks.pop();
      }
    }

    cfg.coord = coord;
    if (cfg.label && Util.isNil(cfg.label.autoRotate)) {
      cfg.label.autoRotate = true; // 允许自动旋转，避免重叠
    }

    if (options.hasOwnProperty('xField') && options.xField.hasOwnProperty('grid')) {
      if (cfg.position === 'left') {
        Util.deepMix(cfg, options.xField);
      }
    }

    return cfg;
  }

  // 确定坐标轴的配置信息
  _getAxisCfg(coord, scale, verticalScale, dimType, index = '', viewId) {
    const self = this;
    const position = self._getAxisPosition(coord, dimType, index, scale.field);
    const cfg = self._getAxisDefaultCfg(coord, scale, dimType, position);
    if (!Util.isEmpty(cfg.grid) && verticalScale) { // 生成 gridPoints
      const gridPoints = [];
      const tickValues = [];
      const verticalTicks = formatTicks(verticalScale.getTicks());
      // 没有垂直的坐标点时不会只栅格
      if (verticalTicks.length) {
        const ticks = fillAxisTicks(cfg.ticks, scale.isLinear, cfg.grid.align === 'center');
        Util.each(ticks, (tick, idx) => {
          tickValues.push(tick.tickValue);
          const subPoints = [];
          let value = tick.value;
          if (cfg.grid.align === 'center') {
            value = self._getMiddleValue(value, ticks, idx, scale.isLinear);
          }
          if (!Util.isNil(value)) {
            const rangeX = coord.x;
            const rangeY = coord.y;
            Util.each(verticalTicks, verticalTick => {
              const x = dimType === 'x' ? value : verticalTick.value;
              let y = dimType === 'x' ? verticalTick.value : value;
              const point = coord.convert({
                x,
                y
              });
              if (coord.isPolar) {
                const center = coord.circleCentre;
                if (rangeY.start > rangeY.end) {
                  y = 1 - y;
                }
                point.flag = rangeX.start > rangeX.end ? 0 : 1;
                point.radius = Math.sqrt((point.x - center.x) ** 2 + (point.y - center.y) ** 2);
              }
              subPoints.push(point);
            });
            gridPoints.push({
              _id: viewId + '-' + dimType + index + '-grid-' + tick.tickValue,
              points: subPoints
            });
          }
        });
      }
      cfg.grid.items = gridPoints;
      cfg.grid.tickValues = tickValues;
    }
    cfg.type = scale.type;
    return cfg;
  }

  _getHelixCfg(coord) {
    const helixCfg = {};
    const a = coord.a;
    const startAngle = coord.startAngle;
    const endAngle = coord.endAngle;
    const index = 100;
    const crp = [];
    for (let i = 0; i <= index; i++) {
      const point = coord.convert({
        x: i / 100,
        y: 0
      });
      crp.push(point.x);
      crp.push(point.y);
    }
    const axisStart = coord.convert({
      x: 0,
      y: 0
    });
    helixCfg.a = a;
    helixCfg.startAngle = startAngle;
    helixCfg.endAngle = endAngle;
    helixCfg.crp = crp;
    helixCfg.axisStart = axisStart;
    helixCfg.center = coord.center;
    helixCfg.inner = coord.y.start; // 内半径
    return helixCfg;
  }

  _drawAxis(coord, scale, verticalScale, dimType, viewId, xAxis, index) {
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
    cfg = Util.mix({}, cfg, appendCfg);

    if (dimType === 'y' && xAxis && xAxis.get('type') === 'circle') {
      cfg.circle = xAxis;
    }
    cfg._id = viewId + '-' + dimType;
    if (!Util.isNil(index)) {
      cfg._id = viewId + '-' + dimType + index;
    }

    Util.mix(cfg, {
      canvas,
      // 每个 axis 需要单独的 group，
      // 否则所有的 aixs 的文本都混在一起了
      // 同时无法知道是哪个坐标轴的事件
      group: container.addGroup({
        viewId
      })
    });
    const axis = new C(cfg);
    axis.render();
    this.axes.push(axis);
    return axis;
  }

  createAxis(xScale, yScales, viewId) {
    const self = this;
    const coord = this.coord;
    const coordType = coord.type;

    // theta坐标系默认不绘制坐标轴
    if (coordType !== 'theta' && !(coordType === 'polar' && coord.isTransposed)) {
      let xAxis;
      if (xScale && !self._isHide(xScale.field)) {
        xAxis = self._drawAxis(coord, xScale, yScales[0], 'x', viewId); // 绘制 x 轴
      }
      if (!Util.isEmpty(yScales) && coordType !== 'helix') {
        Util.each(yScales, (yScale, index) => {
          if (!self._isHide(yScale.field)) {
            self._drawAxis(coord, yScale, xScale, 'y', viewId, xAxis, index);
          }
        });
      }
    }
  }

  changeVisible(visible) {
    const axes = this.axes;
    Util.each(axes, axis => {
      axis.set('visible', visible);
    });
  }

  clear() {
    const self = this;
    const axes = self.axes;
    Util.each(axes, axis => {
      axis.destroy();
    });
    self.axes = [];
  }
}

module.exports = AxisController;
