import { deepMix, each, get, isArray, isEmpty, isEqual, isFunction, isString } from '@antv/util';
// 暂未发包
// @ts-ignore
import { propagationDelegate } from '@antv/component';
import { doAnimate } from '../../animate';
import Base from '../../base';
import { BBox, IGroup, IShape } from '../../dependents';
import { AnimateOption, Datum, ShapeFactory, ShapeInfo, StateCfg } from '../../interface';
import { getReplaceAttrs } from '../../util/graphics';
import Geometry from '../base';
import { GEOMETRY_LIFE_CIRCLE } from '../../constant';
import { BACKGROUND_SHAPE } from '../shape/constant';

/** Element 构造函数传入参数类型 */
interface ElementCfg {
  /** 用于创建各种 shape 的工厂对象 */
  shapeFactory: ShapeFactory;
  /** shape 容器 */
  container: IGroup;
  /** 虚拟 group，用户可以不传入 */
  offscreenGroup?: IGroup;
  /** 是否可见 */
  visible?: boolean;
}

/**
 * Element 图形元素。
 * 定义：在 G2 中，我们会将数据通过图形语法映射成不同的图形，比如点图，数据集中的每条数据会对应一个点，柱状图每条数据对应一个柱子，线图则是一组数据对应一条折线，Element 即一条/一组数据对应的图形元素，它代表一条数据或者一个数据集，在图形层面，它可以是单个 Shape 也可以是多个 Shape，我们称之为图形元素。
 */
export default class Element extends Base {
  /** 用于创建各种 shape 的工厂对象 */
  public shapeFactory: ShapeFactory;
  /** shape 容器 */
  public container: IGroup;
  /** 最后创建的图形对象 */
  public shape: IShape | IGroup;
  /** shape 的动画配置 */
  public animate: AnimateOption | boolean;

  // 非构造函数属性，需要外部赋值
  /** element 对应的 Geometry 实例 */
  public geometry: Geometry;
  /** 保存 shape 对应的 label */
  public labelShape: IGroup[];

  /** 绘制的 shape 类型 */
  private shapeType: string;

  /** shape 绘制需要的数据 */
  private model: ShapeInfo;
  /** 原始数据 */
  private data: Datum;
  // 存储当前开启的状态
  private states: string[] = [];
  private statesStyle;
  // 虚拟 Group
  private offscreenGroup: IGroup;

  constructor(cfg: ElementCfg) {
    super(cfg);

    const { shapeFactory, container, offscreenGroup, visible = true } = cfg;
    this.shapeFactory = shapeFactory;
    this.container = container;
    this.offscreenGroup = offscreenGroup;
    this.visible = visible;
  }

  /**
   * 绘制图形。
   * @param model 绘制数据。
   * @param isUpdate 可选，是否是更新发生后的绘制。
   */
  public draw(model: ShapeInfo, isUpdate: boolean = false) {
    this.model = model;
    this.data = model.data; // 存储原始数据
    this.shapeType = this.getShapeType(model);

    // 绘制图形
    this.drawShape(model, isUpdate);

    if (this.visible === false) {
      // 用户在初始化的时候声明 visible: false
      this.changeVisible(false);
    }
  }

  /**
   * 更新图形。
   * @param model 更新的绘制数据。
   */
  public update(model: ShapeInfo) {
    const { shapeFactory, shape } = this;
    if (!shape) {
      return;
    }

    // 更新数据
    this.model = model;
    this.data = model.data;
    this.shapeType = this.getShapeType(model);

    // step 1: 更新 shape 携带的信息
    this.setShapeInfo(shape, model);

    // step 2: 使用虚拟 Group 重新绘制 shape，然后更新当前 shape
    const offscreenGroup = this.getOffscreenGroup();
    const newShape = shapeFactory.drawShape(this.shapeType, model, offscreenGroup);
    // @ts-ignore
    newShape.cfg.data = this.data;
    // @ts-ignore
    newShape.cfg.origin = model;
    // label 需要使用
    newShape.cfg.element = this;

    // step 3: 同步 shape 样式
    this.syncShapeStyle(shape, newShape, this.getStates(), this.getAnimateCfg('update'));
  }

  /**
   * 销毁 element 实例。
   */
  public destroy() {
    const { shapeFactory, shape } = this;

    if (shape) {
      const animateCfg = this.getAnimateCfg('leave');
      if (animateCfg) {
        // 指定了动画配置则执行销毁动画
        doAnimate(shape, animateCfg, {
          coordinate: shapeFactory.coordinate,
          toAttrs: {
            ...shape.attr(),
          },
        });
      } else {
        // 否则直接销毁
        shape.remove(true);
      }
    }

    // reset
    this.states = [];
    this.shapeFactory = undefined;
    this.container = undefined;
    this.shape = undefined;
    this.animate = undefined;
    this.geometry = undefined;
    this.labelShape = undefined;
    this.model = undefined;
    this.data = undefined;
    this.offscreenGroup = undefined;
    this.statesStyle = undefined;

    super.destroy();
  }

  /**
   * 显示或者隐藏 element。
   * @param visible 是否可见。
   */
  public changeVisible(visible: boolean) {
    super.changeVisible(visible);

    if (visible) {
      if (this.shape) {
        this.shape.show();
      }
      if (this.labelShape) {
        this.labelShape.forEach((label: IGroup) => {
          label.show();
        });
      }
    } else {
      if (this.shape) {
        this.shape.hide();
      }
      if (this.labelShape) {
        this.labelShape.forEach((label: IGroup) => {
          label.hide();
        });
      }
    }
  }

  /**
   * 设置 Element 的状态。
   *
   * 目前 Element 开放三种状态：
   * 1. active
   * 2. selected
   * 3. inactive
   *
   * 这三种状态相互独立，可以进行叠加。
   *
   * 这三种状态的样式可在 [[Theme]] 主题中或者通过 `geometry.state()` 接口进行配置。
   *
   * ```ts
   * // 激活 active 状态
   * setState('active', true);
   * ```
   *
   * @param stateName 状态名
   * @param stateStatus 是否开启状态
   */
  public setState(stateName: string, stateStatus: boolean) {
    const { states, shapeFactory, model, shape, shapeType } = this;

    const index = states.indexOf(stateName);
    if (stateStatus) {
      // 开启状态
      if (index > -1) {
        // 该状态已经开启，则返回
        return;
      }
      states.push(stateName);
      if (stateName === 'active' || stateName === 'selected') {
        shape.toFront();
      }
    } else {
      if (index === -1) {
        // 关闭状态，但是状态未设置过
        return;
      }
      states.splice(index, 1);
      if (stateName === 'active' || stateName === 'selected') {
        shape.toBack();
      }
    }

    // 使用虚拟 group 重新绘制 shape，然后对这个 shape 应用状态样式后，更新当前 shape。
    const offscreenShape = shapeFactory.drawShape(shapeType, model, this.getOffscreenGroup());
    if (states.length) {
      // 应用当前状态
      this.syncShapeStyle(shape, offscreenShape, states, null);
    } else {
      // 如果没有状态，则需要恢复至原始状态
      this.syncShapeStyle(shape, offscreenShape, ['reset'], null);
    }

    offscreenShape.remove(true); // 销毁，减少内存占用

    const eventObject = {
      state: stateName,
      stateStatus,
      element: this,
      target: this.container,
    };
    this.container.emit('statechange', eventObject);
    // @ts-ignore
    propagationDelegate(this.shape, 'statechange', eventObject);
  }

  /**
   * 清空状量态，恢复至初始状态。
   */
  public clearStates() {
    const states = this.states;

    each(states, (state) => {
      this.setState(state, false);
    });

    this.states = [];
  }

  /**
   * 查询当前 Element 上是否已设置 `stateName` 对应的状态。
   * @param stateName 状态名称。
   * @returns true 表示存在，false 表示不存在。
   */
  public hasState(stateName: string): boolean {
    return this.states.includes(stateName);
  }

  /**
   * 获取当前 Element 上所有的状态。
   * @returns 当前 Element 上所有的状态数组。
   */
  public getStates(): string[] {
    return this.states;
  }

  /**
   * 获取 Element 对应的原始数据。
   * @returns 原始数据。
   */
  public getData(): Datum {
    return this.data;
  }

  /**
   * 获取 Element 对应的图形绘制数据。
   * @returns 图形绘制数据。
   */
  public getModel(): ShapeInfo {
    return this.model;
  }

  /**
   * 返回 Element 元素整体的 bbox，包含文本及文本连线（有的话）。
   * @returns 整体包围盒。
   */
  public getBBox(): BBox {
    const { shape, labelShape } = this;
    let bbox = {
      x: 0,
      y: 0,
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
      width: 0,
      height: 0,
    };
    if (shape) {
      bbox = shape.getCanvasBBox();
    }
    if (labelShape) {
      labelShape.forEach((label: IGroup) => {
        const labelBBox = label.getCanvasBBox();
        bbox.x = Math.min(labelBBox.x, bbox.x);
        bbox.y = Math.min(labelBBox.y, bbox.y);
        bbox.minX = Math.min(labelBBox.minX, bbox.minX);
        bbox.minY = Math.min(labelBBox.minY, bbox.minY);
        bbox.maxX = Math.max(labelBBox.maxX, bbox.maxX);
        bbox.maxY = Math.max(labelBBox.maxY, bbox.maxY);
      });
    }

    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;

    return bbox;
  }

  private getStatesStyle() {
    if (!this.statesStyle) {
      const { shapeType, geometry, shapeFactory } = this;
      const stateOption = geometry.stateOption;
      const defaultShapeType = shapeFactory.defaultShapeType;
      const stateTheme = shapeFactory.theme[shapeType] || shapeFactory.theme[defaultShapeType];
      this.statesStyle = deepMix({}, stateTheme, stateOption);
    }

    return this.statesStyle;
  }

  // 从主题中获取对应状态量的样式
  private getStateStyle(stateName: string, shapeKey?: string): StateCfg {
    const statesStyle = this.getStatesStyle();
    const stateCfg = get(statesStyle, [stateName, 'style'], {});
    const shapeStyle = stateCfg[shapeKey] || stateCfg;
    if (isFunction(shapeStyle)) {
      return shapeStyle(this);
    }

    return shapeStyle;
  }

  // 获取动画配置
  private getAnimateCfg(animateType: string) {
    const animate = this.animate;
    if (animate) {
      const cfg = animate[animateType];

      if (cfg) {
        // 增加动画的回调函数，如果外部传入了，则先执行外部，然后发射 geometry 的 animate 事件
        return {
          ...cfg,
          callback: () => {
            isFunction(cfg.callback) && cfg.callback();
            this.geometry?.emit(GEOMETRY_LIFE_CIRCLE.AFTER_DRAW_ANIMATE);
          },
        };
      }
      return cfg;
    }

    return null;
  }

  // 绘制图形
  private drawShape(model: ShapeInfo, isUpdate: boolean = false) {
    const { shapeFactory, container, shapeType } = this;

    // 自定义 shape 有可能返回空 shape
    this.shape = shapeFactory.drawShape(shapeType, model, container);

    if (this.shape) {
      this.setShapeInfo(this.shape, model); // 存储绘图数据
      // @ts-ignore
      const name = this.shape.cfg.name;
      // 附加 element 的 name, name 现在支持数组了，很好用了
      if (!name) {
        // 这个地方如果用户添加了 name, 则附加 name ，否则就添加自己的 name
        // @ts-ignore
        this.shape.cfg.name = ['element', this.shapeFactory.geometryType];
      } else if (isString(name)) {
        // @ts-ignore
        this.shape.cfg.name = ['element', name];
      }
      // 执行入场动画
      const animateType = isUpdate ? 'enter' : 'appear';
      const animateCfg = this.getAnimateCfg(animateType);
      if (animateCfg) {
        // 开始执行动画的生命周期
        this.geometry?.emit(GEOMETRY_LIFE_CIRCLE.BEFORE_DRAW_ANIMATE);

        doAnimate(this.shape, animateCfg, {
          coordinate: shapeFactory.coordinate,
          toAttrs: {
            ...this.shape.attr(),
          },
        });
      }
    }
  }

  // 获取虚拟 Group
  private getOffscreenGroup() {
    if (!this.offscreenGroup) {
      const GroupCtor = this.container.getGroupBase(); // 获取分组的构造函数
      this.offscreenGroup = new GroupCtor({});
    }

    return this.offscreenGroup;
  }

  // 设置 shape 上需要携带的信息
  private setShapeInfo(shape: IShape | IGroup, data: ShapeInfo) {
    // @ts-ignore
    shape.cfg.origin = data;
    // @ts-ignore
    shape.cfg.element = this;
    if (shape.isGroup()) {
      const children = shape.get('children');
      children.forEach((child) => {
        this.setShapeInfo(child, data);
      });
    }
  }

  // 更新当前 shape 的样式
  private syncShapeStyle(
    sourceShape: IGroup | IShape,
    targetShape: IGroup | IShape,
    states: string[] = [],
    animateCfg,
    index: number = 0
  ) {
    if (!sourceShape || !targetShape) {
      return;
    }
    // 所有的 shape 都需要同步 clip
    const clip = sourceShape.get('clipShape');
    const newClip = targetShape.get('clipShape');

    this.syncShapeStyle(clip, newClip, states, animateCfg);

    if (sourceShape.isGroup()) {
      const children = sourceShape.get('children');
      const newChildren = targetShape.get('children');
      for (let i = 0; i < children.length; i++) {
        this.syncShapeStyle(children[i], newChildren[i], states, animateCfg, index + i);
      }
    } else {
      if (!isEmpty(states) && !isEqual(states, ['reset'])) {
        let name = sourceShape.get('name');
        if (isArray(name)) {
          // 会附加 element 的 name
          name = name[1];
        }

        each(states, (state) => {
          // background shape 不进行状态样式设置
          if (targetShape.get('name') !== BACKGROUND_SHAPE) {
            const style = this.getStateStyle(state, name || index); // 如果用户没有设置 name，则默认根据索引值
            targetShape.attr(style);
          }
        });
      }
      const newAttrs = getReplaceAttrs(sourceShape as IShape, targetShape as IShape);

      if (this.animate) {
        if (animateCfg) {
          this.geometry?.emit(GEOMETRY_LIFE_CIRCLE.BEFORE_DRAW_ANIMATE);
          // 需要进行动画
          doAnimate(sourceShape, animateCfg, {
            coordinate: this.shapeFactory.coordinate,
            toAttrs: newAttrs,
            shapeModel: this.model,
          });
        } else if (isEmpty(states)) {
          sourceShape.stopAnimate();
          sourceShape.animate(newAttrs, {
            duration: 300,
          });
        } else {
          sourceShape.attr(newAttrs);
        }
      } else {
        sourceShape.attr(newAttrs);
      }
    }
  }

  private getShapeType(model: ShapeInfo) {
    const shape = get(model, 'shape');
    return isArray(shape) ? shape[0] : shape;
  }
}
