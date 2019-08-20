import * as Util from '@antv/util';
import { Shape } from '@antv/g';
import Guide from '../base';
import Label from '../label/base';
import Theme from './theme';
import {
  AxisCfg,
  PointType,
  GridPoints,
  GridPoint,
} from '../interface';

interface ItemType {
  x: number;
  y: number;
  radius: number;
  flag: string;
}

interface Tick {
  text: string;
  value: number;
}

export default abstract class Axis extends Guide {
  constructor(cfg: AxisCfg) {
    super({
      type: 'base',
      id: null, // 用于动画，唯一标识的 id
      line: {
        lineWidth: 1,
        stroke: '#C0D0E0',
      }, // 坐标轴线的配置信息，如果设置成null，则不显示轴线
      tickLine: {
        lineWidth: 1,
        stroke: '#C0D0E0',
        length: 5,
      }, // 坐标轴刻度线的配置,如果设置成null，则不显示刻度线
      subTickCount: 0, // 次刻度线个数配置
      subTickLine: null, // 次刻度线样式配置
      grid: null, // 网格线配置，如果值为 null，则不显示
      label: null, // 坐标轴文本配置
      title: null, // 坐标轴标题配置
      autoRotateLabel: true,
      autoHideLabel: false,
      autoRotateTitle: true, // 渲染标题时，默认会按需旋转标题
      gridType: 'line',
      ticks: [], // 坐标轴上的坐标点
      labelItems: [],
      gridPoints: [], // 网格线的连接点集合
      ...cfg,
    });

    this._processTicks();
  }

  render() {
    const line = this.get('line');
    line && this._renderLine(); // 渲染坐标轴线

    const tickLine = this.get('tickLine');
    tickLine && this._renderTicks(); // 渲染坐标轴刻度线

    const grid = this.get('grid');
    grid && this._renderGrid(); // 渲染坐标轴网格线

    const label = this.get('label');
    label && this._renderLabels(); // 渲染坐标轴文本

    const title = this.get('title');
    if (title) { // 渲染坐标轴标题
      this.set('title', Util.deepMix({}, Theme.title, this.get('title')));
      this.renderTitle();
    }
  }

  destroy() {
    if (!this.destroyed) {
      super.destroy();
      const gridGroup = this.get('gridGroup');
      gridGroup && gridGroup.remove();
      const labelRenderer = this.get('labelRenderer');
      labelRenderer && labelRenderer.destroy();
      const group = this.get('group');
      group.destroy();
      this.destroyed = true;
    }
  }

  clear() {
    const group = this.get('group');
    if (!group.get('destroyed') && group.get('children').length) {
      const gridGroup = this.get('gridGroup');
      gridGroup && gridGroup.clear();
      const labelRenderer = this.get('labelRenderer');
      labelRenderer && labelRenderer.clear();
      // 再飞 mark: 这样就会将所有的 axis 实例中创建的 shapes 和 groups 清空
      // 按照正常的逻辑，应该只负责清空当前实例创建的 shaps 和 groups
      const group = this.get('group');
      group.clear();
    }
  }

  /**
   * 解析 tick 文本
   * @param tick tick 文本值
   * @param index tick 对应的索引值
   * @param length 所有 tick 的总长度
   */
  protected parseTick(tick: string, index: number, length: number): Tick {
    return {
      text: tick,
      value: index / (length - 1),
    };
  }

  /**
   * 添加 labelItems
   * @param tick 坐标轴刻度信息
   * @param point 位置点信息
   * @param index 对应的索引值
   * @param tickCount 全部坐标轴刻度的个数
   */
  protected addLabel(tick: Tick, point, index: number, tickCount: number) {
    const theme = this.get('theme') || {};
    const label = this.get('label');
    let labelCfg = label;

    if (Util.isFunction(labelCfg)) { // 如果用户定义的 label 属性是回调函数
      const executedLabel = label(tick.text, index, tickCount);
      labelCfg = executedLabel ? Util.deepMix({}, theme.label, executedLabel) : null;
    }

    if (labelCfg) {
      labelCfg = Util.deepMix({ text: tick.text }, Theme.label, labelCfg);

      const vector = this.getSideVector(labelCfg.offset, point, index);
      const newPoint = {
        x: point.x + vector[0] + labelCfg.offsetX,
        y: point.y + vector[1] + labelCfg.offsetY,
      };

      labelCfg.x = newPoint.x;
      labelCfg.y = newPoint.y;
      labelCfg.point = newPoint;
      labelCfg.textAlign = this.getTextAnchor(vector);
      if (!Util.isNil(point.rotate)) {
        labelCfg.rotate = point.rotate;
      }

      if (labelCfg.useHtml) {
        labelCfg.text = labelCfg.htmlTemplate; // TODO: 是否直接在 text 中定义 html 模板？
      }

      this.get('labelItems').push(labelCfg);
    }
  }

  /**
   * 根据向量值获取文本的对齐方式
   * @param vector 文本的向量值
   */
  protected getTextAnchor(vector) {
    const ratio = Math.abs(vector[1] / vector[0]);
    if (ratio >= 1) { // 上面或者下面
      return 'center';
    }
    if (vector[0] > 0) { // 右侧
      return 'start';
    }
    return 'end'; // 左侧
  }

  protected getMaxLabelWidthOrHeight(labelRenderer, property: 'height' | 'width') {
    const labels = labelRenderer.getLabels();
    let max = 0;
    Util.each(labels, (label: Shape) => {
      const bbox = label.getBBox();
      const value = bbox[property];
      if (max < value) {
        max = value;
      }
    });
    return max;
  }

  /**
   * 自动旋转文本
   * @override
   */
  protected autoRotateLabels() {}

  /**
   * 文本自动防遮罩
   * @override
   */
  protected autoHideLabels() {}

  /**
   * 渲染标题
   * @override
   */
  protected renderTitle() {}

  /**
   * 获取坐标轴线的 path
   * @abstract
   * @return {[type]} [description]
   */
  abstract getLinePath(): any[];

  /**
   * 获取 tick 在画布上的位置
   * @abstract
   * @return {[type]} [description]
   */
  abstract getTickPoint(p: number, index?: number): PointType;

  /**
   * 获取标示坐标点的线的终点
   * @abstract
   */
  abstract getTickEnd(point?: any, length?: number, index?: number): PointType;

  /**
   * 获取距离坐标轴的向量
   * @abstract
   * @return {[type]} [description]
   */
  abstract getSideVector(offset: number, point: PointType, index: number): number[];

  // 渲染坐标轴线
  private _renderLine() {
    const path = this.getLinePath();
    const lineCfg = {
      path,
      ...this.get('line'),
    };
    const group = this.get('group'); // 获取容器
    const lineShape = group.addShape('path', {
      attrs: lineCfg,
      zIndex: 1, // 位于上层
    });
    lineShape.name = 'axis-line';
    this.get('appendInfo') && lineShape.setSilent('appendInfo', this.get('appendInfo'));
    this.set('lineShape', lineShape);
  }

  // 渲染坐标轴线
  private _renderTicks() {
    const tickLineCfg = this.get('tickLine');
    const tickItems = this.get('tickItems');
    const subTickItems = this.get('subTickItems');
    if (tickItems && tickItems.length) {
      this._addTickLine(tickItems, tickLineCfg);
    }

    if (subTickItems && subTickItems.length) {
      const subTickLineCfg = this.get('subTickLine') || tickLineCfg;
      this._addTickLine(subTickItems, subTickLineCfg);
    }
  }

  // 生成 ticks
  private _processTicks() {
    const labelCfg = this.get('label');
    const subTickCount = this.get('subTickCount');
    const tickLineCfg = this.get('tickLine');

    const ticks = this._parseTicks(this.get('ticks'));
    const tickCount = ticks.length;
    Util.each(ticks, (tick: Tick, index: number) => {
      const tickPoint = this.getTickPoint(tick.value, index);
      if (tickLineCfg) {
        this._addTickItem(index, tickPoint, tickLineCfg.length);
      }
      if (labelCfg) {
        this.addLabel(tick, tickPoint, index, tickCount);
      }
    });

    if (subTickCount) { // 如果有设置次级分点，添加次级tick
      const subTickLineCfg = this.get('subTickLine');
      Util.each(ticks, (tick: Tick, index: number) => {
        if (index > 0) {
          let diff = tick.value - ticks[index - 1].value;
          diff = diff / (this.get('subTickCount') + 1);

          for (let i = 1; i <= subTickCount; i++) {
            const subTick = {
              text: '',
              value: index ? ticks[index - 1].value + i * diff : i * diff,
            };

            const tickPoint = this.getTickPoint(subTick.value);
            let subTickLength;
            if (subTickLineCfg && subTickLineCfg.length) {
              subTickLength = subTickLineCfg.length;
            } else {
              subTickLength = Math.floor(tickLineCfg.length * (3 / 5));
            }
            this._addTickItem(i - 1, tickPoint, subTickLength, 'sub');
          }
        }
      });
    }
  }

  private _parseTicks(ticks = []) {
    const ticksLength = ticks.length;
    for (let i = 0; i < ticksLength; i++) {
      const item = ticks[i];
      if (!Util.isObject(item)) {
        ticks[i] = this.parseTick(item, i, ticksLength);
      }
    }
    this.set('ticks', ticks);
    return ticks;
  }

  private _addTickItem(index, point, length, type = '') {
    const tickItems = this.get('tickItems') || [];
    const subTickItems = this.get('subTickItems') || [];

    const end = this.getTickEnd(point, length, index);
    const cfg = {
      x1: point.x,
      y1: point.y,
      x2: end.x,
      y2: end.y,
    };

    if (type === 'sub') {
      subTickItems.push(cfg);
    } else {
      tickItems.push(cfg);
    }

    this.set('tickItems', tickItems);
    this.set('subTickItems', subTickItems);
  }

  private _addTickLine(ticks, lineCfg) {
    const cfg = Util.mix({}, lineCfg);
    const path = [];
    Util.each(ticks, (item: any) => {
      path.push([ 'M', item.x1, item.y1 ]);
      path.push([ 'L', item.x2, item.y2 ]);
    });
    delete cfg.length;
    cfg.path = path;
    const group = this.get('group');
    const tickShape = group.addShape('path', {
      attrs: cfg,
      zIndex: 1, // 位于上层
    });
    tickShape.name = 'axis-ticks';
    tickShape.id = `${this.get('id')}-ticks`;
    tickShape.set('coord', this.get('coord'));
    this.get('appendInfo') && tickShape.setSilent('appendInfo', this.get('appendInfo'));
  }

  private _renderGrid() {
    const coord = this.get('coord');
    const appendInfo = this.get('appendInfo');
    const group = this.get('group');
    const gridPoints = this.get('gridPoints');
    const grid = this.get('grid');
    const gridType = this.get('gridType');
    const theme = this.get('theme') || {};
    const ticks = this.get('ticks');
    const count = gridPoints.length;

    const gridGroup = group.addGroup({
      class: 'axis-grid',
      zIndex: 0, // 位于下层，line 下面
    });
    this.set('gridGroup', gridGroup);

    // 渲染网格线
    let gridCfg = grid;
    Util.each(gridPoints, (subPoints: any, index) => {
      if (Util.isFunction(grid)) { // grid 是回调函数
        const tick = ticks[index];
        const executedGrid = grid(tick.text, index, count);
        gridCfg = executedGrid ? Util.mix({}, theme.grid, executedGrid) : null;
      }

      if (gridCfg) {
        const points = subPoints.points;
        const path = [];

        if (gridType === 'arc') { // 弧形
          Util.each(points, (point: ItemType, idx: number) => {
            const { radius, x, y, flag } = point;
            if (idx === 0) {
              path.push([ 'M', x, y ]);
            } else {
              path.push([ 'A', radius, radius, 0, 0, flag, x, y ]);
            }
          });
        } else {
          Util.each(points, (point: PointType, idx: number) => {
            const { x, y } = point;
            if (idx === 0) {
              path.push([ 'M', x, y ]);
            } else {
              path.push([ 'L', x, y ]);
            }
          });
        }
        const gridLineShape = gridGroup.addShape('path', {
          attrs: Util.mix({ path }, Theme.grid, gridCfg),
        });

        gridLineShape.name = 'axis-grid';
        gridLineShape.id = subPoints.id;
        gridLineShape.set('coord', coord);
        appendInfo && gridLineShape.setSilent('appendInfo', gridLineShape);
      }
    });

    // 用户设置了网格的交替填充色
    const gridAlternateColor = this.get('gridAlternateColor');
    if (gridAlternateColor) {
      let preItem;
      Util.each(gridPoints, (item: GridPoints, index: number) => {
        if (preItem) {
          this._drawAlternativeBg(item, preItem, index);
        }
        preItem = item;
      });
    }
  }

  // Grid 的背景层绘制逻辑
  private _drawAlternativeBg(item: GridPoints, preItem: GridPoints, index: number) {
    const alternateColor = this.get('gridAlternateColor');
    let attrs;
    let oddColor;
    let evenColor;

    if (Util.isString(alternateColor)) {
      oddColor = alternateColor;
    } else if (Util.isArray(alternateColor)) {
      oddColor = alternateColor[0];
      evenColor = alternateColor[1];
    }

    if (index % 2 === 0) {
      if (evenColor) {
        attrs = this._getBackItem(preItem.points, item.points, evenColor);
      }
    } else if (oddColor) {
      attrs = this._getBackItem(preItem.points, item.points, oddColor);
    }

    const gridGroup = this.get('gridGroup');
    const shape = gridGroup.addShape('Path', {
      attrs,
    });
    shape.name = 'axis-grid-rect'; // TODO： 需要区分 -rect 吗？还是统一叫做 axis-grid
    shape.id = item.id && item.id.replace('grid', 'grid-rect');
    shape.set('coord', this.get('coord'));
    this.get('appendInfo') && shape.setSilent('appendInfo', this.get('appendInfo'));
  }

  private _getBackItem(start: GridPoint[], end: GridPoint[], bgColor: string) {
    const path = [];
    const gridType = this.get('gridType');
    if (gridType === 'arc') {
      Util.each(start, (subItem: GridPoint, index: number) => {
        const { x, y, radius, flag } = subItem;
        if (index === 0) {
          path.push([ 'M', x, y ]);
        } else {
          path.push([ 'A', radius, radius, 0, 0, flag, x, y ]);
        }
      });
      for (let j = end.length - 1; j >= 0; j--) {
        const endSubItem = end[j];
        const { x, y, radius, flag } = endSubItem;
        if (j === end.length - 1) {
          path.push([ 'M', x, y ]);
        } else {
          path.push([ 'A', radius, radius, 0, 0, flag === 1 ? 0 : 1, x, y ]);
        }
      }
    } else {
      Util.each(start, (subItem: GridPoint, index: number) => {
        const { x, y } = subItem;
        if (index === 0) {
          path.push([ 'M', x, y ]);
        } else {
          path.push([ 'L', x, y ]);
        }
      });
      for (let i = end.length - 1; i >= 0; i--) {
        path.push([ 'L', end[i].x, end[i].y ]);
      }
      path.push([ 'Z' ]);
    }

    return {
      fill: bgColor,
      path,
    };
  }

  private _renderLabels() {
    const group = this.get('group');
    const labelRenderer = new Label({ name:'axis-label' });
    labelRenderer.set('coord', this.get('coord'));
    labelRenderer.set('group', group.addGroup({
      class: 'axis-labels',
    }));
    labelRenderer.set('canvas', this.get('canvas'));
    labelRenderer.set('items', this.get('labelItems'));

    labelRenderer.draw(false);
    this.set('labelRenderer', labelRenderer);

    if (this.get('autoRotateLabel')) {
      this.autoRotateLabels();
    }
    if (this.get('autoHideLabel')) {
      this.autoHideLabels();
    }
  }
}
