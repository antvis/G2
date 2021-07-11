import type { TimelineTheme } from '../../../types/component';
import type { TimelineOption } from '../../../types/view';
import { CC } from './base';

export class Timeline extends CC<TimelineOption> {
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
   * 获取 timeline 主题配置
   */
  protected getTheme(): Required<TimelineTheme> {
    return {};
  }
}
