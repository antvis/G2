import type { AxisTheme } from '../../../types/component';
import type { AxisOption } from '../../../types/view';
import { getAxisThemeStyle } from '../../../theme/util';
import { CC } from './base';

export class Axis extends CC<AxisOption> {
  public init() {
    throw new Error('Method not implemented.');
  }

  public update() {
    throw new Error('Method not implemented.');
  }

  public render() {
    throw new Error('Method not implemented.');
  }

  public layout() {
    throw new Error('Method not implemented.');
  }

  public clear() {
    throw new Error('Method not implemented.');
  }

  /**
   * 获取 axis 主题配置
   */
  protected getTheme(): Required<AxisTheme> {
    return getAxisThemeStyle(this.view.getTheme());
  }
}
