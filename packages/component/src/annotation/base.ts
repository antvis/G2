import * as _ from '@antv/util';
import { Scale } from '@antv/scale';
import { Coord } from '@antv/coord';
import { Group, Element } from '@antv/g';
import { GuideCfg } from '../interface';
import Guide from '../base';

type PositionCallback = (
  xScales: Scale[] | Record<string, Scale>,
  yScales: Scale[] | Record<string, Scale>,
) => [number, number];

export type Position = [number | string, number | string] | Record<string, number | string> | PositionCallback;

export type Point = {
  x: number;
  y: number;
};

// Q: 为什么使用React类型定义呢？
// A: 因为在g提供类型定义前，目前我只找到它有比较多的svg属性定义，原生的CSSStyleDeclaration & CanvasPathDrawingStyles会有类型冲突
export type SvgAttrs = Partial<
  {
    path: any;
    textAlign: string;
    lineWidth: number;
    text: string;
    textBaseline: 'top' | 'bottom';
    [key: string]: any;
  }
>;

// https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-414782407
// type KnownKeys = {
//   [K in keyof GuideCfg]: string extends K ? never : K
// } extends {
//   [_ in keyof GuideCfg]: infer U
// } ? U : never;

export interface AnnotationCfg extends GuideCfg {
  readonly type: string;
  xScales: Scale[] | Record<string, Scale>;
  yScales: Scale[] | Record<string, Scale>;
  el: HTMLElement | Element; // Shape或者Group
  appendInfo: any;

  // position: Position; // todo 基类修改影响面比较广
  start: Position;
  end: Position;

  style: SvgAttrs | Record<string, SvgAttrs>;
}

export default abstract class Annotation<T extends AnnotationCfg = AnnotationCfg> extends Guide {
  cfg: Partial<T>;

  constructor(cfg: Partial<T>) {
    /* istanbul ignore next */
    super({
      xScales: null,
      yScales: null,
      el: null,
      ...cfg,
    });
  }

  abstract render(coord: Coord, group: Group, data?: Point[]): void;

  public clear() {
    const el = this.get('el');

    if (el) {
      el.remove();
    }
  }

  public changeVisible(visible: boolean) {
    this.set('visible', visible);
    const el = this.get('el');

    if (el instanceof Element) {
      el.set('visible', visible);
    } else if (el instanceof HTMLElement) {
      el.style.display = visible ? '' : 'none';
    }
  }

  /** 批量修改内部状态 */
  public change(cfg: Partial<T>) {
    this.cfg = _.deepMix({}, this.cfg, cfg);
  }

  // 修改基类会导致label中大量不严谨的类型写法需要重构
  get<K extends keyof T>(name: K) {
    return this.cfg[name];
  }

  set<K extends keyof T>(name: K, value: T[K]) {
    this.cfg[name] = value;
    return this;
  }

  protected parsePoint(coord: Coord, _position: Position): Point {
    const xScales = this.get('xScales');
    const yScales = this.get('yScales');
    const position: Position = _.isFunction(_position) ? _position.call(null, xScales, yScales) : _position;

    let x = 0;
    let y = 0;
    // 入参是['50%', '50%']时
    if (_.isArray(position) && _.includes(position[0] as any, '%')) {
      return this.parsePercentPoint(coord, position as [string, string]);
    }

    if (_.isArray(position)) {
      x = this.getNormalizedValue(position[0], _.head(_.values(xScales)));
      y = this.getNormalizedValue(position[1], _.head(_.values(yScales)));
    } else if (!_.isNil(position)) {
      for (const key of _.keys(position)) {
        const value = position[key];
        if (xScales[key]) {
          x = this.getNormalizedValue(value, xScales[key]);
        }
        if (yScales[key]) {
          y = this.getNormalizedValue(value, yScales[key]);
        }
      }
    }
    return coord.convert({ x, y });
  }

  private getNormalizedValue(val: number | string, scale: Scale) {
    let result: number;

    switch (val) {
      case 'start':
        result = 0;
        break;
      case 'end':
        result = 1;
        break;
      case 'median': {
        const scaled = scale.isCategory ? (scale.values.length - 1) / 2 : (scale.min + scale.max) / 2;
        result = scale.scale(scaled);
        break;
      }
      case 'min':
      case 'max':
        let scaled: number;
        if (scale.isCategory) {
          scaled = val === 'min' ? 0 : scale.values.length - 1;
        } else {
          scaled = scale[val];
        }
        result = scale.scale(scaled);
        break;
      default:
        result = scale.scale(val);
    }

    return result;
  }

  private parsePercentPoint(coord: Coord, position: [string, string]): Point {
    const xPercent = parseFloat(position[0]) / 100;
    const yPercent = parseFloat(position[1]) / 100;
    const { start, end } = coord;
    const topLeft = {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
    };
    const x = coord.width * xPercent + topLeft.x;
    const y = coord.height * yPercent + topLeft.y;
    return { x, y };
  }
}
