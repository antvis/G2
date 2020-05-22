import { each, isNil, some } from '@antv/util';
import { Coordinate, getCoordinate, Point } from '../../dependents';
import { CoordinateOption } from '../../interface';

/**
 * coordinate controller，职责：
 * 1. 创建实例
 * 2. 暂存配置
 */
export default class CoordinateController {
  private option: CoordinateOption;
  private coordinate: Coordinate;

  constructor(option?: CoordinateOption) {
    // 设置默认值，并存储配置
    this.option = this.wrapperOption(option);
  }

  /**
   * 更新配置
   * @param option
   */
  public update(option: CoordinateOption) {
    this.option = this.wrapperOption(option);
    return this;
  }

  /**
   * 是否存在某一个 action
   * @param actionName
   */
  public hasAction(actionName: string) {
    const { actions } = this.option;

    return some(actions, (action) => action[0] === actionName);
  }
  /**
   * 创建坐标系对象
   * @param start 起始位置
   * @param end   结束位置
   * @return 坐标系实例
   */
  public create(start: Point, end: Point) {
    const { type, cfg } = this.option;
    const isTheta = type === 'theta';

    // 1. 起始位置
    const props = {
      start,
      end,
      ...cfg,
    };

    // 2. 创建实例
    const C = getCoordinate(isTheta ? 'polar' : type);

    this.coordinate = new C(props);

    // @ts-ignore FIXME coordinate 包问题导致 type 不正确
    this.coordinate.type = type;

    // 3. 添加默认 action
    if (isTheta) {
      // 不存在 transpose，为其自动设置一个 action
      if (!this.hasAction('transpose')) {
        this.transpose();
      }
    }

    // 4. 执行 action
    this.execActions();

    return this.coordinate;
  }

  /**
   * 更新坐标系对象
   * @param start 起始位置
   * @param end   结束位置
   * @return 坐标系实例
   */
  public adjust(start: Point, end: Point) {
    this.coordinate.update({
      start,
      end,
    });

    // 更新坐标系大小的时候，需要：
    // 1. 重置 matrix
    // 2. 重新执行作用于 matrix 的 action
    this.coordinate.resetMatrix();
    this.execActions(['scale', 'rotate', 'translate']);

    return this.coordinate;
  }

  /**
   * 旋转弧度
   * @param angle
   */
  public rotate(angle: number) {
    this.option.actions.push(['rotate', angle]);
    return this;
  }

  /**
   * 镜像
   * @param dim
   */
  public reflect(dim: 'x' | 'y') {
    this.option.actions.push(['reflect', dim]);
    return this;
  }

  /**
   * scale
   * @param sx
   * @param sy
   */
  public scale(sx: number, sy: number) {
    this.option.actions.push(['scale', sx, sy]);
    return this;
  }

  /**
   * 对角变换
   */
  public transpose() {
    this.option.actions.push(['transpose']);
    return this;
  }

  /**
   * 获取配置
   */
  public getOption(): CoordinateOption {
    return this.option;
  }

  /**
   * 获得 coordinate 实例
   */
  public getCoordinate() {
    return this.coordinate;
  }

  /**
   * 包装配置的默认值
   * @param option
   */
  private wrapperOption(option: CoordinateOption): CoordinateOption {
    return {
      type: 'rect',
      actions: [],
      cfg: {},
      ...option,
    };
  }

  /**
   * coordinate 实例执行 actions
   * @params includeActions 如果没有指定，则执行全部，否则，执行指定的 action
   */
  private execActions(includeActions?: string[]) {
    const { actions } = this.option;

    each(actions, (action) => {
      const [actionName, ...args] = action;

      const shouldExec = isNil(includeActions) ? true : includeActions.includes(actionName);

      if (shouldExec) {
        this.coordinate[actionName](...args);
      }
    });
  }
}
