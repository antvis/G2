import EE from '@antv/event-emitter';
import * as _ from '@antv/util';
import { IGroup, IShape } from '../../dependents';
import { AnimateOption, Datum, LooseObject, ShapeDrawCFG, ShapeFactory, ShapeInfo } from '../../interface';
import { getDefaultAnimateCfg } from '../animate';

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
}

/** @class Element 图形元素 */
export default class Element extends EE {
  /** 绘制的 shape 类型 */
  public readonly shapeType: string;
  /** 原始数据 */
  public data: Datum;
  /** shape 绘制数据 */
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
  // 存储 shape 的原始样式
  private originStyle: LooseObject = {};

  constructor(cfg: ElementCfg) {
    super();
    const { data, model, shapeType, shapeFactory, theme, container, animate } = cfg;
    this.data = data;
    this.model = model;
    this.shapeType = shapeType;
    this.shapeFactory = shapeFactory;
    this.theme = theme;
    this.container = container;
    this.animate = animate;

    if (model) {
      // 只有有数据的时候才进行绘制
      // 绘制 shape
      this.drawShape();
      // 存储初始样式
      this.setOriginStyle();
    }
  }

  /**
   * Updates element
   * @param cfg 更新的绘制数据
   */
  public update(cfg: ShapeInfo) {
    const { shapeType, shapeFactory } = this;
    const drawCfg: ShapeDrawCFG = {
      ...cfg,
      style: {
        ...this.getStateStyle('default'),
        ...cfg.style,
      },
    };
    const animateCfg = this.getAnimateCfg('update');
    if (animateCfg) {
      // 只有获取到动画配置才赋值 animate 属性
      drawCfg.animate = animateCfg;
    }
    // 更新图形
    shapeFactory.updateShape(shapeType, drawCfg, this);
    this.shape.set('origin', drawCfg);
    // 更新原始状态
    this.setOriginStyle();
    // 更新数据
    this.model = cfg;
    this.data = cfg.data;
  }

  public destroy() {
    const { model, shapeFactory, shapeType } = this;
    const drawCfg: ShapeDrawCFG = {
      ...model,
    };
    const animateCfg = this.getAnimateCfg('leave');
    if (animateCfg) {
      // 只有获取到动画配置才赋值 animate 属性
      drawCfg.animate = animateCfg;
    }
    shapeFactory.destroyShape(shapeType, drawCfg, this);

    this.states = [];
    this.originStyle = {};
    this.destroyed = true;

    this.off();
  }

  /**
   * @todo
   * @param data
   */
  public updateData(data: Datum) {}

  /**
   * @todo 更新图形样式
   * @param attrs 图形属性配置
   */
  public style(attrs: LooseObject) {}

  /**
   * Sets state
   * @param stateName 状态名
   * @param stateStatus 是否开启状态
   */
  public setState(stateName: string, stateStatus: boolean) {
    const { states, shapeFactory, shapeType } = this;

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

    shapeFactory.setState(shapeType, stateName, stateStatus, this);
  }

  /**
   * 清空状量态，恢复至初始状态
   * @todo 是否应该提供一个 revert() 的方法直接回恢复至出厂状态？
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

  public getData() {
    return this.data;
  }

  public getModel() {
    return this.model;
  }
  /**
   * 从主题中获取对应状态量的样式
   * @param stateName 状态名
   * @returns  状态样式
   */
  public getStateStyle(stateName: string): LooseObject {
    const { shapeType, theme } = this;

    return _.get(theme, [shapeType, stateName], {});
  }
  /**
   * 获取初始化样式
   */
  public getOriginStyle(): LooseObject {
    return this.originStyle;
  }

  private getAnimateCfg(animateType: string) {
    const animate = this.animate;
    const { geometryType, coordinate } = this.shapeFactory;
    const defaultCfg = getDefaultAnimateCfg(geometryType, animateType, coordinate);

    // 如果动画开启，用户没有配置动画同时又没有默认的动画配置时，返回 null
    if (!animate || (animate === true && _.isEmpty(defaultCfg)) || animate[animateType] === false) {
      return null;
    }

    return {
      ...defaultCfg,
      ...animate[animateType],
    };
  }

  private drawShape() {
    const { shapeType, shapeFactory, model } = this;

    const drawCfg: ShapeDrawCFG = {
      ...model,
      style: {
        ...this.getStateStyle('default'),
        ...model.style,
      },
    };
    const animateCfg = this.getAnimateCfg('enter');
    if (animateCfg) {
      // 只有获取到动画配置才赋值 animate 属性
      drawCfg.animate = animateCfg;
    }
    const shape = shapeFactory.drawShape(shapeType, drawCfg, this);
    // 存储绘图数据
    shape.set('origin', drawCfg);
    if (!shape.get('name')) {
      // 用于支持 name:eventName 事件，如果用户已设置 name 属性则忽略
      shape.set('name', shapeFactory.geometryType);
    }
    this.shape = shape;
  }

  // FIXME: 嵌套 Group 的场景
  private setOriginStyle() {
    const shape = this.shape;
    if ((shape as IGroup).isGroup()) {
      const children = shape.get('children');
      _.each(children, (child, index) => {
        const key = child.name || index;
        this.originStyle[key] = {
          ...child.attr(),
        };
      });
    } else {
      this.originStyle = {
        ...shape.attr(),
      };
    }
  }
}
