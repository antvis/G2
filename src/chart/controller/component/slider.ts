import type { SliderTheme } from '../../../types/component';
import type { SliderOption } from '../../../types/view';
import { CC } from './base';

export class Slider extends CC<SliderOption> {
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
   * 获取 slider 主题配置
   */
  protected getTheme(): Required<SliderTheme> {
    return {};
  }
}
