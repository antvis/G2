import { Group } from '@antv/g';
import { Coord } from '@antv/coord';
import { Scale } from '@antv/scale';
import * as _ from '@antv/util';
import * as domUtil from '@antv/dom-util';
import Annotation, { AnnotationCfg, Point } from './base';

export interface HtmlCfg extends AnnotationCfg {
  alignX: 'left' | 'middle' | 'right';
  alignY: 'top' | 'middle' | 'bottom';
  html: ((xScales: Scale[] | Record<string, Scale>, yScales: Scale[] | Record<string, Scale>) => string) | string;
  el: HTMLElement;
}

export default class Html extends Annotation<HtmlCfg> {
  constructor(cfg: HtmlCfg) {
    /* istanbul ignore next */
    super({
      type: 'html',
      zIndex: 7,
      position: null,
      alignX: 'middle',
      alignY: 'middle',
      offsetX: null,
      offsetY: null,
      html: null,
      ...cfg,
    });
  }

  render(coord: Coord, container: Group) {
    const position = this.parsePoint(coord, this.get('position'));
    const parentNode: HTMLElement = container.get('canvas').get('el').parentNode;
    const wrapperNode: HTMLElement = domUtil.createDom('<div class="guide-annotation"></div>');
    parentNode.appendChild(wrapperNode);

    let html = this.get('html');
    if (_.isFunction(html)) {
      const xScales = this.get('xScales');
      const yScales = this.get('yScales');
      html = html(xScales, yScales);
    }
    const htmlNode: HTMLElement = domUtil.createDom(html);
    wrapperNode.appendChild(htmlNode);

    domUtil.modifyCSS(wrapperNode, {
      position: 'absolute', // to fix dom in the document stream to get the true width
    });

    this.setDomPosition(wrapperNode, htmlNode, position);
    this.set('el', wrapperNode);
  }

  private setDomPosition(parentDom: HTMLElement, childDom: HTMLElement, point: Point) {
    const alignX = this.get('alignX');
    const alignY = this.get('alignY');
    const domWidth = domUtil.getOuterWidth(childDom);
    const domHeight = domUtil.getOuterHeight(childDom);

    const position: Point = {
      x: point.x, // alignX = left
      y: point.y, // alignY = top
    };

    if (alignX === 'middle') {
      position.x -= Math.round(domWidth / 2);
    } else if (alignX === 'right') {
      position.x -= Math.round(domWidth);
    }

    if (alignY === 'middle') {
      position.y -= Math.round(domHeight / 2);
    } else if (alignY === 'bottom') {
      position.y -= Math.round(domHeight);
    }

    const offsetX = this.get('offsetX');
    if (offsetX) {
      position.x += offsetX;
    }
    const offsetY = this.get('offsetY');
    if (offsetY) {
      position.y += offsetY;
    }

    domUtil.modifyCSS(parentDom, {
      top: `${Math.round(position.y)}px`,
      left: `${Math.round(position.x)}px`,
      visibility: 'visible',
      zIndex: this.get('zIndex'),
    });
  }

  clear() {
    // 由于基类使用了childNode.remove，而IE不支持该方法，需要进行兼容
    const el = this.get('el');
    el && el.parentNode && el.parentNode.removeChild(el);
  }
}
