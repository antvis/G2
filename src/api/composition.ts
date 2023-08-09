import { Coordinate } from '@antv/coord';
import { DisplayObject } from '@antv/g';
import { Scale, G2Theme, G2ViewDescriptor } from '../runtime';
import { hide, show } from '../utils/style';
import { Composition as Spec } from '../spec';
import { Node } from './node';
import { defineProps } from './define';
import { compositionProps } from './props';
import { PropsOf } from './types';

export interface CompositionNode<T = any>
  extends PropsOf<
    typeof compositionProps,
    any, // todo Remove this when update types of Spec.
    CompositionNode & T
  > {}

@defineProps(compositionProps)
export class CompositionNode extends Node<Spec & { [key: string]: any }> {
  protected _key: string;

  /**
   * Change current node data and its children data.
   */
  changeData(data: any) {
    const chart = this.getRoot();
    if (!chart) return;
    this.attr('data', data);
    if (this.children?.length) {
      this.children.forEach((child) => {
        child.attr('data', data);
      });
    }
    return chart?.render();
  }

  /**
   * Get view instance by key.
   */
  getView(): G2ViewDescriptor {
    const chart = this.getRoot();
    const { views } = chart.getContext();
    if (!views?.length) return undefined;
    return views.find((view) => view.key === this._key);
  }

  getScale(): Record<string, Scale> {
    return this.getView()?.scale;
  }

  getScaleByChannel(channel: string): Scale {
    const scale = this.getScale();
    if (scale) return scale[channel];
    return;
  }

  getCoordinate(): Coordinate {
    return this.getView()?.coordinate;
  }

  getTheme(): G2Theme {
    return this.getView()?.theme;
  }

  getGroup(): DisplayObject {
    const key = this._key;
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
    !group.isVisible() && show(group);
  }

  /**
   * Hide the view.
   */
  hide() {
    const group = this.getGroup();
    if (!group) return;
    group.isVisible() && hide(group);
  }
}
