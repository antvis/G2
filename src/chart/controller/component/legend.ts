import type { LegendTheme } from '../../../types/component';
import type { LegendOption } from '../../../types/view';
import { getLegendThemeStyle } from '../../../theme/util';
import { CC } from './base';

export class Legend extends CC<LegendOption> {
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
   * 获取 legend 主题配置
   */
  protected getTheme(): Required<LegendTheme> {
    return getLegendThemeStyle(this.view.getTheme());
  }
}
