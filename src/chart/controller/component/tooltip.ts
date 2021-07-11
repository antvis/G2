import { getTooltipThemeStyle } from 'src/theme/util';
import type { TooltipTheme } from '../../../types/component';
import type { TooltipOption } from '../../../types/view';
import { CC } from './base';

export class Tooltip extends CC<TooltipOption> {
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
   * 获取 tooltip 主题配置
   */
  protected getTheme(): Required<TooltipTheme> {
    return getTooltipThemeStyle(this.view.getTheme());
  }
}
