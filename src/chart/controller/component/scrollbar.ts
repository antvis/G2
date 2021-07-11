import { Group } from '@antv/g';
import type { ScrollbarTheme } from '../../../types/component';
import type { ScrollbarOption } from '../../../types/view';
import { getScrollbarThemeStyle } from '../../../theme/util';
import { CC } from './base';

export class Scrollbar extends CC<ScrollbarOption> {
  /**
   * 组件所在容器
   */
  private container: Group;

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
   * 获取 scrollbar 主题配置
   */
  protected getTheme(): Required<ScrollbarTheme> {
    return getScrollbarThemeStyle(this.view.getTheme());
  }
}
