import View from '../chart/view';
import { StateManager } from '../state';

export type InteractionConstructor = new (view: View) => Interaction;

export default abstract class Interaction {
  public readonly type: string = 'base';
  public readonly view: View;
  protected readonly stateManager: StateManager;

  constructor(view: View) {
    this.view = view;
    this.stateManager = view.getStateManager();

    this.init();
  }

  /**
   * Inits interaction
   */
  protected init() {
    this.initEvents();
  }

  /** bind events */
  protected abstract initEvents();
  /** destroy interaction instance */
  public abstract destroy();
}
