import { View } from '../chart';
import { LooseObject } from '../interface';

export type InteractonConstructor = new (view: View, cfg: LooseObject) => Interaction;

class Interaction {
  /** view 或者 chart */
  protected view: View;
  /** 配置项 */
  protected cfg: LooseObject;
  constructor(view: View, cfg: LooseObject) {
    this.view = view;
    this.cfg = cfg;
  }

  public init() {
    this.initEvents();
  }

  protected initEvents() {}

  protected clearEvents() {}

  public destroy() {
    this.clearEvents();
  }
}

export default Interaction;
