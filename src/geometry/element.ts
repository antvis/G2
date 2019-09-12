import { Group } from '@antv/g';
import * as Util from '@antv/util';
import { ShapeDrawCFG } from 'interface';

interface ElementCfg {
  id: string;
  data: object;
  model: object;
  shapeType: string;
  // geometryType: string;
  // TODO: shapeFactory 类型定义
  shapeFactory: object;
  theme: object;
}

const FIELD_ORIGIN = '_origin';

/** @class Element 图形元素 */
export default class Element extends Group {

  // 存储当前状态
  private states: string[] = [];
  private originStyle: object;

  constructor(cfg: ElementCfg) {
    super(cfg);

    // 绘制 shape
    this._drawShape();
  }

  public setState(stateName: string, stateStatus: boolean) {
    const states = this.states;
    const shapeFactory = this.get('shapeFactory');
    const shapeType = this.get('shapeType');

    const index = states.indexOf(stateName);
    if (index > -1) { // 状态已经存在
      return;
    }

    if (stateStatus) {
      states.push(stateName);
    } else {
      states.splice(index, 1);
    }

    shapeFactory.setState(shapeType, stateStatus);
  }

  /**
   * TODO：更新图形样式
   * @param attrs 图形属性配置
   */
  public style(attrs: object) {
    // const shapeFactory = this.get('shapeFactory');
    // const shapeType = this.get('shapeType');

    // shapeFactory.updateShape(shapeType, attrs);
  }

  public update(cfg: ShapeDrawCFG) {
    const shapeFactory = this.get('shapeFactory');
    const shapeType = this.get('shapeType');

    const defaultStyle = this.getStateStyle('default');
    // 获取默认的图形样式
    cfg.style = Util.mix({}, defaultStyle, cfg.style);

    shapeFactory.updateShape(shapeType, cfg, this);
    const shape = this.get('shape');

    this.originStyle = shape.attr();
    this.set('model', cfg);
    this.set('data', cfg.origin[FIELD_ORIGIN]);
  }
  // TODO
  public updateData(data: object) {}

  public destroy() {
    if (this.destroyed) {
      return;
    }

    // TODO
    // const shapeFactory = this.get('shapeFactory');
    // const shapeType = this.get('shapeType');
    // shapeFactory.destroy(shapeType);

    super.destroy();
  }

  public clearStates() {
    this.states = [];
  }

  public hasState(stateName: string) {
    return this.states.indexOf(stateName) !== -1;
  }

  public getStates() {
    return this.states;
  }

  public getData() {
    return this.get('data');
  }

  public getModel() {
    return this.get('model');
  }

  public getStateStyle(stateName: string) {
    const shapeType = this.get('shapeType');
    // const geometryType = this.get('geometryType');
    const theme = this.get('theme');

    // return Util.get(theme, `${geometryType}.${shapeType}.${stateName}`, {});
    return Util.get(theme, `${shapeType}.${stateName}`, {});
  }

  /**
   * 获取初始化样式
   */
  public getOriginStyle() {
    return this.originStyle;
  }

  public getAnimateCfg(animateType: string) {
    const shapeType = this.get('shapeType');
    const theme = this.get('theme');

    const animateCfg = Util.get(theme, `.${shapeType}.animate`, {});
    return animateCfg[animateType];
  }

  private _drawShape() {
    const shapeFactory = this.get('shapeFactory');
    const shapeType = this.get('shapeType');
    const model = this.get('model');

    const defaultStyle = this.getStateStyle('default');
    model.style = Util.mix({}, defaultStyle, model.style);

    const shape = shapeFactory.drawShape(shapeType, model, this);

    // TODO: 有可能返回 Group
    this.set('shape', shape);
    this.originStyle = shape.attr();
  }
}
