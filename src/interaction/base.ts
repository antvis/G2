import View from '../chart/view';
import { LooseObject } from '../interface';
import { StateManager } from '../state';

export type InteractionConstructor = new (view: View, stateManager: StateManager, cfg: LooseObject) => Interaction;

export default abstract class Interaction {
  public readonly type: string = 'base';
  public readonly view: View;
  public cfg: LooseObject;

  protected readonly stateManager: StateManager;

  constructor(view: View, stateManager: StateManager, cfg: LooseObject) {
    this.view = view;
    this.stateManager = stateManager;
    this.cfg = cfg;

    // this.init();
  }

  /**
   * Inits interaction
   */
  public init() {
    this.initEvents();
  }

  /** bind events */
  protected abstract initEvents();
  /** destroy interaction instance */
  public abstract destroy();
}
