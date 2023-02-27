import { DisplayObject } from '@antv/g';
import { Coordinate } from '@antv/coord';
import { Node } from '../node';
import { G2Theme, G2ViewDescriptor } from '../../runtime';

export class CompositionNode<
  Value extends Record<string, any> = Record<string, any>,
  ParentValue extends Record<string, any> = Record<string, any>,
  ChildValue extends Record<string, any> = Record<string, any>,
> extends Node<Value, ParentValue, ChildValue> {
  /**
   * Get view instance by key.
   */
  getView(): G2ViewDescriptor {
    const chart = this.getRoot();
    const { views } = chart.getContext();
    if (!views?.length) return undefined;
    return views.find((view) => view.key === this.attr('key'));
  }

  getCoordinate(): Coordinate {
    return this.getView()?.coordinate;
  }

  getTheme(): G2Theme {
    return this.getView()?.theme;
  }

  getGroup(): DisplayObject {
    const key = this.attr('key');
    if (!key) return undefined;
    const chart = this.getRoot();
    const chartGroup = chart.getContext().canvas.getRoot();
    return chartGroup.getElementById(key);
  }

  /**
   * Show the view.
   */
  show() {
    const group = this.getGroup();
    if (!group) return;
    !group.isVisible() && group.setAttribute('visibility', 'visible');
  }

  /**
   * Hide the view.
   */
  hide() {
    const group = this.getGroup();
    if (!group) return;
    group.isVisible() && group.setAttribute('visibility', 'hidden');
  }
}
