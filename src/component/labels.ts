import { deepMix, each, get } from '@antv/util';
import { doAnimate } from '../animate';
import { AbstractGroup, AbstractShape, BBox, IGroup, IShape } from '../dependents';
import { getGeometryLabelLayout } from '../geometry/label';
import { LabelItem } from '../geometry/label/interface';
import { AnimateOption } from '../interface';
import { getReplaceAttrs } from '../util/graphics';
import { rotate, translate } from '../util/transform';

export interface LabelsGroupCfg {
  container: IGroup;
  layout?: string;
}

/**
 * Geometry labels 渲染组件
 */
export default class Labels {
  /** 用于指定 labels 布局的类型 */
  public layout: string;
  /** 图形容器 */
  public container: IGroup;
  /** 动画配置 */
  public animate: AnimateOption | false;
  public region: BBox;

  /** 存储当前 shape 的映射表，键值为 shape id */
  public shapesMap: Record<string, IGroup> = {};
  private lastShapesMap: Record<string, IGroup> = {};

  constructor(cfg: LabelsGroupCfg) {
    const { layout = 'default', container } = cfg;

    this.layout = layout;
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
      if (shape.destroyed) {
        // label 在布局调整环节被删除了（adjustLabels）
        delete shapesMap[id];
      } else {
        if (lastShapesMap[id]) {
          // 图形发生更新
          const data = shape.get('data');
          const orogin = shape.get('origin');
          const coordinate = shape.get('coordinate');
          const currentShape = lastShapesMap[id]; // 已经在渲染树上的 shape
          const currentAnimateCfg = shape.get('animateCfg');
          currentShape.set('data', data);
          currentShape.set('orogin', orogin);
          currentShape.set('animateCfg', currentAnimateCfg);
          currentShape.set('coordinate', coordinate);

          const updateAnimateCfg = get(currentAnimateCfg, 'update');
          const currentChildren = currentShape.getChildren();
          shape.getChildren().map((child, index) => {
            const currentChild = currentChildren[index] as IShape;
            currentChild.set('data', data);
            currentChild.set('orogin', orogin);
            currentChild.set('animateCfg', currentAnimateCfg);
            currentChild.set('coordinate', coordinate);

            const newAttrs = getReplaceAttrs(currentChild, child);
            if (updateAnimateCfg) {
              doAnimate(currentChild, updateAnimateCfg, {
                toAttrs: newAttrs,
                coordinate,
              });
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
            doAnimate(shape, animateCfg, {
              toAttrs: {
                ...shape.attr(),
              },
              coordinate: shape.get('coordinate'),
            });
          }
        }
        delete lastShapesMap[id];
      }
    });

    // 移除
    each(lastShapesMap, (deleteShape) => {
      const animateCfg = get(deleteShape.get('animateCfg'), 'leave');
      if (animateCfg) {
        doAnimate(deleteShape, animateCfg, {
          toAttrs: null,
          coordinate: deleteShape.get('coordinate'),
        });
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
    const { id, data, mappingData, coordinate, animate, content } = cfg;
    const shapeAppendCfg = {
      id,
      data,
      origin: mappingData,
      coordinate,
    };
    const labelGroup = container.addGroup({
      name: 'label',
      // 如果 this.animate === false 或者 cfg.animate === false/null 则不进行动画，否则进行动画配置的合并
      animateCfg:
        this.animate === false || animate === null || animate === false ? false : deepMix({}, this.animate, animate),
      ...shapeAppendCfg,
    });
    let labelShape;
    if (content instanceof AbstractShape || content instanceof AbstractGroup) {
      // 如果 content 是 Group 或者 Shape，根据 textAlign 调整位置后，直接将其加入 labelGroup
      const { width, height } = content.getCanvasBBox();
      const textAlign = cfg.textAlign || 'left';

      let x = cfg.x;
      const y = cfg.y - (height / 2);

      if (textAlign === 'center') {
        x = x - (width / 2);
      } else if (textAlign === 'right' || textAlign === 'end') {
        x = x - width;
      }

      translate(content, x, y); // 将 label 平移至 x, y 指定的位置
      labelShape = content;
      labelGroup.add(content);
    } else {
      labelShape = labelGroup.addShape('text', {
        attrs: {
          x: cfg.x,
          y: cfg.y,
          textAlign: cfg.textAlign,
          text: cfg.content,
          ...cfg.style,
        },
        ...shapeAppendCfg,
      });
    }

    if (cfg.rotate) {
      rotate(labelShape, cfg.rotate);
    }
    this.drawLabelLine(cfg, labelGroup);
    this.shapesMap[id] = labelGroup;
  }

  // 根据type对label布局
  private adjustLabels(shapes) {
    const layoutFn = getGeometryLabelLayout(this.layout);
    if (layoutFn) {
      const labelShapes = [];
      const geometryShapes = [];
      each(this.shapesMap, (labelShape, id) => {
        labelShapes.push(labelShape);
        geometryShapes.push(shapes[id]);
      });

      layoutFn(labelShapes, geometryShapes, this.region);
    }
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
      coordinate: labelCfg.coordinate,
    });
  }

  private createOffscreenGroup() {
    const container = this.container;
    const GroupClass = container.getGroupBase(); // 获取分组的构造函数
    const newGroup = new GroupClass({});
    return newGroup;
  }
}
