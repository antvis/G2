import { CC } from './base';

export class Annotation extends CC<any> {
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
   * 获取 annotation 主题配置
   */
  protected getTheme() {
    return {};
  }
}
