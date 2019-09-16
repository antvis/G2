import { Group, Shape } from '@antv/g';
import * as Util from '@antv/util';
import { LooseObject, ShapeDrawCFG } from '../interface';
import { ShapeFactory } from './interface';

// TODO: 统一入口
const FIELD_ORIGIN = '_origin';

interface ElementCfg {
  /** 同 data 对应的唯一 ID */
  // id: string;
  /** 原始数据 */
  data: LooseObject;
  /** 映射后的绘图数据 */
  model: ShapeDrawCFG;
  /** 绘制的 shape 类型 */
  shapeType: string;
  /** 用于创建各种 shape 的工厂对象 */
  shapeFactory: ShapeFactory;
  /** 主题 */
  theme: LooseObject;
  /** shape 容器 */
  container: Group;
}

/** @class Element 图形元素 */
export default class Element {
  /** 同 data 对应的唯一 ID */
  // public id: string;
  /** 绘制的 shape 类型 */
  public readonly shapeType: string;
  /** 原始数据 */
  public data: LooseObject;
  /** shape 绘制数据 */
  public model: ShapeDrawCFG;
  /** 用于创建各种 shape 的工厂对象 */
  public shapeFactory: ShapeFactory;
  /** 主题 */
  public theme: LooseObject;
  /** shape 容器 */
  public container: Group;
  /** 最后创建的图形对象 todo: 重命名，因为有可能是 Group */
  public shape: Shape | Group;

  // 存储当前状态
  private states: string[] = [];
  // 存储 shape 的原始样式
  private originStyle: LooseObject;

  constructor(cfg: ElementCfg) {
    Util.mix(this, cfg);

    // 绘制 shape
    this._drawShape();
  }
  /**
   * Sets state
   * @param stateName 状态名
   * @param stateStatus 是否开启状态
   */
  public setState(stateName: string, stateStatus: boolean) {
    const { states, shapeFactory, shapeType } = this;

    const index = states.indexOf(stateName);
    if (index > -1) {
      // 该状态已经开启
      return;
    }

    if (stateStatus) {
      states.push(stateName);
    } else {
      states.splice(index, 1);
    }

    shapeFactory.setState(shapeType, stateName, stateStatus, this);
  }
  /**
   * Updates element
   * @param cfg 更新的绘制数据
   */
  public update(cfg: ShapeDrawCFG) {
    const { shapeType, shapeFactory } = this;

    // 获取默认的图形样式
    const defaultStyle = this.getStateStyle('default');
    cfg.style = Util.mix({}, defaultStyle, cfg.style);

    shapeFactory.updateShape(shapeType, cfg, this);

    // TODO：有可能会返回 Group
    const shape = this.shape;
    this.originStyle = shape.attr();
    this.model = cfg;
    this.data = cfg.origin[FIELD_ORIGIN];
  }
  // TODO
  public updateData(data: object) {}

  /**
   * TODO：更新图形样式
   * @param attrs 图形属性配置
   */
  public style(attrs: object) {
    // const shapeFactory = this.get('shapeFactory');
    // const shapeType = this.get('shapeType');
    // shapeFactory.updateShape(shapeType, attrs);
  }

  public destroy() {
    // if (this.destroyed) {
    //   return;
    // }

    // TODO
    // const shapeFactory = this.get('shapeFactory');
    // const shapeType = this.get('shapeType');
    // shapeFactory.destroy(shapeType);

    const shape = this.shape;
    shape.remove(true);
  }
  /**
   * 清空状量态，恢复至初始状态
   * TODO: 是否应该提供一个 revert() 的方法直接回恢复至出厂状态？
   */
  public clearStates() {
    const states = this.states;

    Util.each(states, (state) => {
      this.setState(state, false);
    });

    this.states = [];
  }

  public hasState(stateName: string) {
    return this.states.indexOf(stateName) !== -1;
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

    return Util.get(theme, `${shapeType}.${stateName}`, {});
  }

  /**
   * 获取初始化样式
   */
  public getOriginStyle(): LooseObject {
    return this.originStyle;
  }

  public getAnimateCfg(animateType: string) {
    const { shapeType, theme } = this;

    const animateCfg = Util.get(theme, `.${shapeType}.animate`, {});
    return animateCfg[animateType];
  }

  private _drawShape() {
    const { shapeType, shapeFactory, model } = this;

    const defaultStyle = this.getStateStyle('default');
    model.style = Util.mix({}, defaultStyle, model.style);

    const shape = shapeFactory.drawShape(shapeType, model, this);

    // TODO: 有可能返回 Group
    this.shape = shape;
    this.originStyle = shape.attr();
  }
}
