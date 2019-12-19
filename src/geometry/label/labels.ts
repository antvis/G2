import { deepMix, each, get, isEmpty } from '@antv/util';
import { doAnimate } from '../../animate';
import { IGroup, IShape } from '../../dependents';
import { AnimateOption } from '../../interface';
import { bboxAdjust, positionAdjust, spiralAdjust } from '../../util/adjust-labels';
import { getReplaceAttrs } from '../../util/graphics';
import { rotate } from '../../util/transform';
import { LabelItem } from './interface';

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
  /** 用于指定 labels 布局的类型 */
  public adjustType: string;
  /** 图形容器 */
  public container: IGroup;
  /** 动画配置 */
  public animate: AnimateOption | false;

  /** 存储当前 shape 的映射表，键值为 shape id */
  public shapesMap: Record<string, IGroup> = {};
  private lastShapesMap: Record<string, IGroup> = {};

  constructor(cfg: LabelsGroupCfg) {
    const { adjustType = 'default', container } = cfg;

    this.adjustType = adjustType;
    this.container = container;
  }

  /**
   * 渲染文本
   */
  public render(items: LabelItem[], shapes: Record<string, IShape | IGroup>, isUpdate: boolean = false) {
    this.shapesMap = {};
    const container = this.container;
    const offscreenGroup = this.createOffscreenGroup(); // 创建虚拟分组
    // 在虚拟 group 中创建 shapes
    for (const item of items) {
      if (item) {
        this.renderLabel(item, offscreenGroup);
      }
    }
    this.adjustLabels(shapes); // 调整 labels

    // 进行添加、更新、销毁操作
    const lastShapesMap = this.lastShapesMap;
    const shapesMap = this.shapesMap;
    each(shapesMap, (shape, id) => {
      if (lastShapesMap[id]) {
        // 图形发生更新
        const data = shape.get('data');
        const mappingData = shape.get('mappingData');
        const currentShape = lastShapesMap[id]; // 已经在渲染树上的 shape
        const currentAnimateCfg = shape.get('animateCfg');
        currentShape.set('data', data);
        currentShape.set('mappingData', mappingData);
        currentShape.set('animateCfg', currentAnimateCfg);

        const updateAnimateCfg = get(currentAnimateCfg, 'update');
        const currentChildren = currentShape.getChildren();
        shape.getChildren().map((child, index) => {
          const currentChild = currentChildren[index] as IShape;
          currentChild.set('data', data);
          currentChild.set('mappingData', mappingData);
          currentChild.set('animateCfg', currentAnimateCfg);

          const newAttrs = getReplaceAttrs(currentChild, child);
          if (updateAnimateCfg) {
            doAnimate(currentChild, updateAnimateCfg, { toAttrs: newAttrs });
          } else {
            currentChild.attr(newAttrs);
          }
        });

        this.shapesMap[id] = currentShape; // 保存引用
      } else {
        // 新生成的 shape
        container.add(shape);

        const animateCfg = get(shape.get('animateCfg'), isUpdate ? 'enter' : 'appear');
        if (animateCfg) {
          doAnimate(shape, animateCfg, {});
        }
      }
      delete lastShapesMap[id];
    });

    // 移除
    each(lastShapesMap, (deleteShape) => {
      const animateCfg = get(deleteShape.get('animateCfg'), 'leave');
      if (animateCfg) {
        doAnimate(deleteShape, animateCfg, {});
      } else {
        deleteShape.remove(true); // 移除
      }
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
      // 如果 this.animate === false 或者 cfg.animate === false/null 则不进行动画，否则进行动画配置的合并
      animateCfg:
        this.animate === false || cfg.animate === null || cfg.animate === false
          ? false
          : deepMix({}, this.animate, cfg.animate),
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
