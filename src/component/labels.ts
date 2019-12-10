import { each, get } from '@antv/util';
import { IGroup, IShape } from '../dependents';
import { LabelItem } from '../geometry/label/base';
import { bboxAdjust, positionAdjust, spiralAdjust } from '../util/adjust-labels';
import { getReplaceAttrs } from '../util/graphics';
import { rotate } from '../util/transform';

export interface LabelsGroupCfg {
  container: IGroup;
  adjustType?: string;
}

const LAYOUTS = {
  scatter: positionAdjust,
  map: spiralAdjust,
  treemap: bboxAdjust,
};

/**
 * Geometry labels 渲染组件
 */
export default class Labels {
  /** 用于指定 label 布局的类型 */
  public adjustType: string;
  /** 图形容器 */
  public container: IGroup;

  public shapesMap: Record<string, IGroup> = {};
  private lastShapesMap: Record<string, IGroup> = {};

  constructor(cfg: LabelsGroupCfg) {
    const { adjustType = 'default', container } = cfg;

    this.adjustType = adjustType;
    this.container = container;
  }

  /**
   * TODO: 动画支持
   * Renders labels group
   */
  public render(items: LabelItem[], shapes: Record<string, IShape | IGroup>) {
    this.shapesMap = {};
    const container = this.container;
    const offscreenGroup = this.createOffscreenGroup(); // 创建虚拟分组
    // 在虚拟 group 中创建 shapes
    for (const item of items) {
      if (item) {
        this.renderLabel(item, offscreenGroup);
      }
    }
    this.adjustLabels(shapes);

    // 进行添加、更新、销毁操作
    const lastShapesMap = this.lastShapesMap;
    const shapesMap = this.shapesMap;
    each(shapesMap, (shape, id) => {
      if (lastShapesMap[id]) {
        // 图形发生更新
        const currentShape = lastShapesMap[id]; // 已经在渲染树上的 shape
        const currentChildren = currentShape.getChildren();
        shape.getChildren().map((child, index) => {
          const currentChild = currentChildren[index] as IShape;
          const newAttrs = getReplaceAttrs(currentChild, child);
          currentChild.attr(newAttrs);
        });

        this.shapesMap[id] = currentShape; // 保存引用
      } else {
        // 新生成的 shape
        container.add(shape);
      }
      delete lastShapesMap[id];
    });

    // 移除
    each(lastShapesMap, (deleteShape) => {
      deleteShape.remove(true); // 移除
    });

    this.lastShapesMap = shapesMap;
    offscreenGroup.destroy();
  }

  public clear() {
    this.container.clear();
    this.shapesMap = {};
    this.lastShapesMap = {};
  }

  public destroy() {
    this.container.destroy();
    this.shapesMap = null;
    this.lastShapesMap = null;
  }

  private renderLabel(cfg: LabelItem, container: IGroup) {
    const { id, data, mappingData } = cfg;
    const labelGroup = container.addGroup({
      id,
      origin: mappingData,
      data,
      name: 'label',
    });
    const labelShape = labelGroup.addShape('text', {
      capture: true,
      attrs: {
        x: cfg.x,
        y: cfg.y,
        textAlign: cfg.textAlign,
        text: cfg.content,
        ...cfg.style,
      },
      id,
      origin: mappingData,
      data,
      name: 'label',
    });

    if (cfg.rotate) {
      rotate(labelShape, cfg.rotate);
    }
    this.drawLabelLine(cfg, labelGroup);
    this.shapesMap[id] = labelGroup;
  }

  // 根据type对label布局
  private adjustLabels(shapes) {
    const type = this.adjustType;
    const layout = LAYOUTS[type];
    if (!layout) {
      return;
    }
    layout(this.shapesMap, shapes);
  }

  private drawLabelLine(labelCfg: LabelItem, container: IGroup) {
    if (!labelCfg.labelLine) {
      // labelLine: null | false，关闭 label 对应的 labelLine
      return;
    }
    const labelLineCfg = get(labelCfg, 'labelLine', {});
    let path = labelLineCfg.path;
    if (!path) {
      const start = labelCfg.start;
      path = [
        ['M', start.x, start.y],
        ['L', labelCfg.x, labelCfg.y],
      ];
    }
    container.addShape('path', {
      capture: false, // labelLine 默认不参与事件捕获
      attrs: {
        path,
        stroke: labelCfg.color ? labelCfg.color : get(labelCfg, ['style', 'fill'], '#000'),
        fill: null,
        ...labelLineCfg.style,
      },
      id: labelCfg.id,
      origin: labelCfg.mappingData,
      data: labelCfg.data,
      name: 'labelLine',
    });
  }

  private createOffscreenGroup() {
    const container = this.container;
    const GroupClass = container.getGroupBase(); // 获取分组的构造函数
    const newGroup = new GroupClass({});
    return newGroup;
  }
}
