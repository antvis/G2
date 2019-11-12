import { LAYER } from '../../constant';
import { IGroup } from '../../dependents';
import { Controller } from './base';

/**
 * G2 Axis controller, will create:
 *  - axis
 *  - grid
 */
export class Axis extends Controller {
  public init() {}

  public render() {}

  public update() {}

  public destroy() {
    super.destroy();
  }

  protected getContainer(): IGroup {
    return this.view.getLayer(LAYER.FORE);
  }
}
