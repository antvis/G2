import { deepMix, each, get, isArray, isNull } from '@antv/util';
import { BBox, Coordinate, IGroup, IShape } from '../dependents';
import { LabelItem } from '../geometry/label/interface';
import { AnimateOption, GeometryLabelLayoutCfg } from '../interface';
import { doAnimate } from '../animate';
import { getGeometryLabelLayout } from '../geometry/label';
import { getlLabelBackgroundInfo } from '../geometry/label/util';
import { polarToCartesian } from '../util/graphics';
import { rotate, translate } from '../util/transform';
import { FIELD_ORIGIN } from '../constant';
import { updateLabel } from './update-label';

/**
 * Labels 实例创建时，传入构造函数的参数定义
 */
export interface LabelsGroupCfg {
  /** label 容器 */
  container: IGroup;
  /** label 布局配置 */
  layout?: GeometryLabelLayoutCfg | GeometryLabelLayoutCfg[];
}

/**
 * Geometry labels 渲染组件
 */
export default class Labels {
  /** 用于指定 labels 布局的类型 */
  public layout: GeometryLabelLayoutCfg | GeometryLabelLayoutCfg[];
  /** 图形容器 */
  public container: IGroup;
  /** 动画配置 */
  public animate: AnimateOption | false;
  /** label 绘制的区域 */
  public region: BBox;

  /** 存储当前 shape 的映射表，键值为 shape id */
  public shapesMap: Record<string, IGroup> = {};
  private lastShapesMap: Record<string, IGroup> = {};

  constructor(cfg: LabelsGroupCfg) {
    const { layout, container } = cfg;

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
    if (items.length) {
      // 如果 items 空的话就不进行绘制调整操作
      // step 1: 在虚拟 group 中创建 shapes
      for (const item of items) {
        if (item) {
          this.renderLabel(item, offscreenGroup);
        }
      }
      // step 2: 根据布局，调整 labels
      this.doLayout(items, shapes);
      // step 3.1: 绘制 labelLine
      this.renderLabelLine(items);
      // step 3.2: 绘制 labelBackground
      this.renderLabelBackground(items);
      // step 4: 根据用户设置的偏移量调整 label
      this.adjustLabel(items);
    }

    // 进行添加、更新、销毁操作
    const lastShapesMap = this.lastShapesMap;
    const shapesMap = this.shapesMap;
    each(shapesMap, (shape, id) => {
      if (shape.destroyed) {
        // label 在布局调整环节被删除了（doLayout）
        delete shapesMap[id];
      } else {
        if (lastShapesMap[id]) {
          // 图形发生更新
          const data = shape.get('data');
          const origin = shape.get('origin');
          const coordinate = shape.get('coordinate');
          const currentAnimateCfg = shape.get('animateCfg');

          const currentShape = lastShapesMap[id]; // 已经在渲染树上的 shape
          updateLabel(currentShape, shapesMap[id], {
            data,
            origin,
            animateCfg: currentAnimateCfg,
            coordinate,
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

  /** 清除当前 labels */
  public clear() {
    this.container.clear();
    this.shapesMap = {};
    this.lastShapesMap = {};
  }

  /** 销毁 */
  public destroy() {
    this.container.destroy();
    this.shapesMap = null;
    this.lastShapesMap = null;
  }

  private renderLabel(cfg: LabelItem, container: IGroup) {
    const { id, elementId, data, mappingData, coordinate, animate, content } = cfg;
    const shapeAppendCfg = {
      id,
      elementId,
      data,
      origin: {
        ...mappingData,
        data: mappingData[FIELD_ORIGIN],
      },
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
    if ((content.isGroup && content.isGroup()) || (content.isShape && content.isShape())) {
      // 如果 content 是 Group 或者 Shape，根据 textAlign 调整位置后，直接将其加入 labelGroup
      const { width, height } = content.getCanvasBBox();
      const textAlign = get(cfg, 'textAlign', 'left');

      let x = cfg.x;
      const y = cfg.y - height / 2;

      if (textAlign === 'center') {
        x = x - width / 2;
      } else if (textAlign === 'right' || textAlign === 'end') {
        x = x - width;
      }

      translate(content, x, y); // 将 label 平移至 x, y 指定的位置
      labelShape = content;
      labelGroup.add(content);
    } else {
      const fill = get(cfg, ['style', 'fill']);
      labelShape = labelGroup.addShape('text', {
        attrs: {
          x: cfg.x,
          y: cfg.y,
          textAlign: cfg.textAlign,
          textBaseline: get(cfg, 'textBaseline', 'middle'),
          text: cfg.content,
          ...cfg.style,
          fill: isNull(fill) ? cfg.color : fill,
        },
        ...shapeAppendCfg,
      });
    }

    if (cfg.rotate) {
      rotate(labelShape, cfg.rotate);
    }
    this.shapesMap[id] = labelGroup;
  }

  // 根据type对label布局
  private doLayout(items: LabelItem[], shapes: Record<string, IShape | IGroup>) {
    if (this.layout) {
      const layouts = isArray(this.layout) ? this.layout : [this.layout];
      each(layouts, (layout: GeometryLabelLayoutCfg) => {
        const layoutFn = getGeometryLabelLayout(get(layout, 'type', ''));
        if (layoutFn) {
          const labelShapes = [];
          const geometryShapes = [];
          each(this.shapesMap, (labelShape, id) => {
            labelShapes.push(labelShape);
            geometryShapes.push(shapes[labelShape.get('elementId')]);
          });

          layoutFn(items, labelShapes, geometryShapes, this.region, layout.cfg);
        }
      });
    }
  }

  private renderLabelLine(labelItems: LabelItem[]) {
    each(labelItems, (labelItem) => {
      const coordinate: Coordinate = get(labelItem, 'coordinate');
      if (!labelItem || !coordinate) {
        return;
      }
      const center = coordinate.getCenter();
      const radius = coordinate.getRadius();
      if (!labelItem.labelLine) {
        // labelLine: null | false，关闭 label 对应的 labelLine
        return;
      }
      const labelLineCfg = get(labelItem, 'labelLine', {});
      const id = labelItem.id;
      let path = labelLineCfg.path;
      if (!path) {
        const start = polarToCartesian(center.x, center.y, radius, labelItem.angle);
        path = [
          ['M', start.x, start.y],
          ['L', labelItem.x, labelItem.y],
        ];
      }
      const labelGroup = this.shapesMap[id];
      if (!labelGroup.destroyed) {
        labelGroup.addShape('path', {
          capture: false, // labelLine 默认不参与事件捕获
          attrs: {
            path,
            stroke: labelItem.color ? labelItem.color : get(labelItem, ['style', 'fill'], '#000'),
            fill: null,
            ...labelLineCfg.style,
          },
          id,
          origin: labelItem.mappingData,
          data: labelItem.data,
          coordinate: labelItem.coordinate,
        });
      }
    });
  }

  /**
   * 绘制标签背景
   * @param labelItems
   */
  private renderLabelBackground(labelItems: LabelItem[]) {
    each(labelItems, (labelItem) => {
      const coordinate: Coordinate = get(labelItem, 'coordinate');
      const background: LabelItem['background'] = get(labelItem, 'background');
      if (!background || !coordinate) {
        return;
      }

      const id = labelItem.id;
      const labelGroup = this.shapesMap[id];
      if (!labelGroup.destroyed) {
        const labelContentShape = labelGroup.getChildren()[0];
        if (labelContentShape) {
          const { rotation, ...box } = getlLabelBackgroundInfo(labelGroup, labelItem, background.padding);
          const backgroundShape = labelGroup.addShape('rect', {
            attrs: {
              ...box,
              ...(background.style || {}),
            },
            id,
            origin: labelItem.mappingData,
            data: labelItem.data,
            coordinate: labelItem.coordinate,
          });
          backgroundShape.setZIndex(-1);

          if (rotation) {
            const matrix = labelContentShape.getMatrix();
            backgroundShape.setMatrix(matrix);
          }
        }
      }
    });
  }

  private createOffscreenGroup() {
    const container = this.container;
    const GroupClass = container.getGroupBase(); // 获取分组的构造函数
    const newGroup = new GroupClass({});
    return newGroup;
  }

  private adjustLabel(items: LabelItem[]) {
    each(items, (item) => {
      if (item) {
        const id = item.id;
        const labelGroup = this.shapesMap[id];
        if (!labelGroup.destroyed) {
          // fix: 如果说开发者的 label content 是一个 group，此处的偏移无法对 整个 content group 生效；场景类似 饼图 spider label 是一个含 2 个 textShape 的 gorup
          const labelShapes = labelGroup.findAll((ele) => ele.get('type') !== 'path');
          each(labelShapes, (labelShape) => {
            if (labelShape) {
              if (item.offsetX) {
                labelShape.attr('x', labelShape.attr('x') + item.offsetX);
              }
              if (item.offsetY) {
                labelShape.attr('y', labelShape.attr('y') + item.offsetY);
              }
            }
          });
        }
      }
    });
  }
}
