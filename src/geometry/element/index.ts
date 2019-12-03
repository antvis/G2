import EE from '@antv/event-emitter';
import * as _ from '@antv/util';
import { IGroup, IShape } from '../../dependents';
import { AnimateOption, Datum, LooseObject, ShapeFactory, ShapeInfo } from '../../interface';
import { doAnimate, getDefaultAnimateCfg } from '../animate';

interface ElementCfg {
  /** 原始数据 */
  data?: Datum;
  /** 映射后的绘图数据 */
  model?: ShapeInfo;
  /** 绘制的 shape 类型 */
  shapeType: string;
  /** 用于创建各种 shape 的工厂对象 */
  shapeFactory: ShapeFactory;
  /** 主题 */
  theme: LooseObject;
  /** shape 容器 */
  container: IGroup;
  /** 动画配置 */
  animate?: AnimateOption | boolean;
  /** 虚拟 group，用户可以不传入 */
  offscreenGroup?: IGroup;
}
/**
 * Element 图形元素
 * 定义：在 G2 中，我们会将数据通过图形语法映射成不同的图形，比如点图，数据集中的每条数据会对应一个点，柱状图每条数据对应一个柱子，线图则是一组数据对应一条折线，Element 即一条/一组数据对应的图形元素，它代表一条数据或者一个数据集，在图形层面，它可以是单个 Shape 也可以是多个 Shape，我们称之为图形元素。
 */
export default class Element extends EE {
  /** 绘制的 shape 类型 */
  public readonly shapeType: string;
  /** 原始数据 */
  public data: Datum;
  /** shape 绘制需要的数据 */
  public model: ShapeInfo;
  /** 用于创建各种 shape 的工厂对象 */
  public shapeFactory: ShapeFactory;
  /** 主题 */
  public theme: LooseObject;
  /** shape 容器 */
  public container: IGroup;
  /** 最后创建的图形对象 todo: 重命名，因为有可能是 Group */
  public shape: IShape | IGroup;
  /** shape 的动画配置 */
  public animate: AnimateOption | boolean;
  /** 是否已经被销毁 */
  public destroyed: boolean = false;

  // 存储当前开启的状态
  private states: string[] = [];
  // 虚拟 Group
  private offscreenGroup: IGroup;

  constructor(cfg: ElementCfg) {
    super();
    const { data, model, shapeType, shapeFactory, theme, container, animate, offscreenGroup } = cfg;
    this.data = data;
    this.model = model;
    this.shapeType = shapeType;
    this.shapeFactory = shapeFactory;
    this.theme = theme;
    this.container = container;
    this.animate = animate;
    this.offscreenGroup = offscreenGroup;

    if (model) {
      // 只有有数据的时候才绘制 Shape
      this.drawShape();
    }
  }

  /**
   * Updates element
   * @param model 更新的绘制数据
   */
  public update(model: ShapeInfo) {
    const { shapeType, shapeFactory, shape } = this;
    // step 1: 更新 shape 携带的信息
    const drawCfg = this.getShapeDrawCfg(model);
    this.setShapeInfo(shape, drawCfg);

    // step 2: 使用虚拟 Group 重新绘制 shape，然后更新当前 shape
    const offscreenGroup = this.getOffscreenGroup();
    const newShape = shapeFactory.drawShape(shapeType, drawCfg, offscreenGroup);

    // step 3: 同步 shape 样式
    this.syncShapeStyle(shape, newShape, '', this.getAnimateCfg('update'));

    // 更新数据
    this.model = model;
    this.data = model.data;
    newShape.remove(true); // 销毁，减少内存占用
  }

  /**
   * Destroys element
   */
  public destroy() {
    const { shapeFactory, shape } = this;

    const animateCfg = this.getAnimateCfg('leave');
    if (animateCfg) {
      // 指定了动画配置则执行销毁动画
      doAnimate(shape, animateCfg, shapeFactory.coordinate);
    } else {
      // 否则直接销毁
      shape.remove(true);
    }

    this.states = [];
    this.destroyed = true;

    this.off();
  }

  /**
   * 设置 Element 的状态。
   * 目前 Element 开放三种状态：
   * 1. active
   * 2. selected
   * 3. inactive
   *
   * 这三种状态的样式可在 [[Theme]] 主题中进行配置
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
    const { states, shapeFactory, shapeType, model, shape } = this;

    const index = states.indexOf(stateName);
    if (stateStatus) {
      // 开启状态
      if (index > -1) {
        // 该状态已经开启，则返回
        return;
      }
      states.push(stateName);
    } else {
      if (index === -1) {
        // 关闭状态，但是状态未设置过
        return;
      }
      states.splice(index, 1);
    }

    // 使用虚拟 group 重新绘制 shape，然后对这个 shape 应用状态样式后，更新当前 shape。
    const drawCfg = this.getShapeDrawCfg(model);
    const offscreenShape = shapeFactory.drawShape(shapeType, drawCfg, this.getOffscreenGroup());
    if (states.length) {
      // 应用当前状态
      states.forEach((state) => {
        this.syncShapeStyle(shape, offscreenShape, state, null);
      });
    } else {
      // 如果没有状态，则需要恢复至原始状态
      this.syncShapeStyle(shape, offscreenShape, '', null);
    }

    offscreenShape.remove(true); // 销毁，减少内存占用
  }

  /**
   * 清空状量态，恢复至初始状态
   */
  public clearStates() {
    const states = this.states;

    _.each(states, (state) => {
      this.setState(state, false);
    });

    this.states = [];
  }

  public hasState(stateName: string) {
    return this.states.includes(stateName);
  }

  public getStates() {
    return this.states;
  }

  /** 获取 Element 对应的原始数据 */
  public getData() {
    return this.data;
  }

  /** 获取 Element 对应的图形绘制数据 */
  public getModel() {
    return this.model;
  }

  /**
   * 从主题中获取对应状态量的样式
   * @param stateName 状态名
   * @returns  状态样式
   */
  private getStateStyle(stateName: string, shapeKey?: string): LooseObject {
    const { theme, shapeFactory } = this;
    let shapeType = this.shapeType;
    // 如果用户自定义 shape，则使用默认 shape 的配置
    if (!theme[shapeType]) {
      shapeType = shapeFactory.defaultShapeType;
    }

    const keys = shapeKey ? [shapeType, stateName, shapeKey] : [shapeType, stateName];
    return _.get(theme, keys, {});
  }

  // 获取动画配置
  private getAnimateCfg(animateType: string) {
    const animate = this.animate;
    const { geometryType, coordinate } = this.shapeFactory;
    const defaultCfg = getDefaultAnimateCfg(geometryType, animateType, coordinate);

    // 1. animate === false, 用户关闭动画
    // 2. 动画默认开启，用户没有对动画进行配置同时有没有内置的默认动画
    // 3. 用户关闭对应的动画  animate: { enter: false }
    if (!animate || (animate === true && _.isEmpty(defaultCfg)) || animate[animateType] === false) {
      return null;
    }

    return {
      ...defaultCfg,
      ...animate[animateType],
    };
  }

  // 绘制图形
  private drawShape() {
    const { shapeType, shapeFactory, model, container } = this;
    const drawCfg = this.getShapeDrawCfg(model);
    const shape = shapeFactory.drawShape(shapeType, drawCfg, container);
    this.setShapeInfo(shape, drawCfg); // 存储绘图数据
    this.shape = shape;
    if (!shape.get('name')) {
      // TODO: 当用户设置了 name 后，为了保证 geometry:eventName 这样的事件能够正常触发，需要加一个 inheritName
      // 等 G 事件改造完成后加上
      shape.set('name', this.shapeFactory.geometryType);
    }

    // 执行入场动画
    const animateCfg = this.getAnimateCfg('enter');
    if (animateCfg) {
      doAnimate(shape, animateCfg, shapeFactory.coordinate);
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
    shape.set('origin', data);
    shape.set('element', this); // 考虑是否可以使用 G 事件的 delegationObject
    if (shape.isGroup()) {
      const children = shape.get('children');
      children.forEach((child) => {
        this.setShapeInfo(child, data);
      });
    }
  }

  // 获取 shape 的绘制属性
  private getShapeDrawCfg(cfg: ShapeInfo): ShapeInfo {
    return {
      ...cfg,
      style: {
        ...this.getStateStyle('default'),
        ...cfg.style,
      },
    };
  }

  // 更新当前 shape 的样式
  private syncShapeStyle(
    sourceShape: IGroup | IShape,
    targetShape: IGroup | IShape,
    state: string = '',
    animateCfg,
    index: number = 0
  ) {
    if (sourceShape.isGroup()) {
      const children = sourceShape.get('children');
      const newChildren = targetShape.get('children');
      for (let i = 0; i < children.length; i++) {
        this.syncShapeStyle(children[i], newChildren[i], state, animateCfg, index + i);
      }
    } else {
      if (state) {
        const stateStyle = this.getStateStyle(state, sourceShape.get('name') || index); // 如果用户没有设置 name，则默认根据索引值
        targetShape.attr(stateStyle);
      }
      const newAttrs = this.getReplaceAttrs(sourceShape as IShape, targetShape as IShape);

      if (animateCfg) {
        // 需要进行动画
        doAnimate(sourceShape, animateCfg, this.shapeFactory.coordinate, newAttrs);
      } else {
        sourceShape.attr(newAttrs);
      }
    }
  }

  // 获取需要替换的属性，如果原先图形元素存在，而新图形不存在，则设置 undefined
  private getReplaceAttrs(sourceShape: IShape, targetShape: IShape) {
    const originAttrs = sourceShape.attr();
    const newAttrs = targetShape.attr();
    _.each(originAttrs, (v, k) => {
      if (newAttrs[k] === undefined) {
        newAttrs[k] = undefined;
      }
    });
    return newAttrs;
  }
}
