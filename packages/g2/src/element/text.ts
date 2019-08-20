import * as _ from '@antv/util';
import { Group } from '@antv/g';
import { FIELD_ORIGIN, AttributeCfg } from './base';
import Point from './point';
import { DataPointType } from '../interface';
import TextShapeFactory from './shape/text';
import { parseFields } from './util/parse-fields';

interface ContentCfg {
  fields: string[];
  callback?: Function;
}
type ContentCallback = (...args) => string;

/**
 * Text 类型的几何图形
 */
export default class Text extends Point {
  constructor(cfg: DataPointType) {
    super({
      type: 'text', // geom type
      shapeType: 'text', // shape type
      ...cfg,
    });

    // 每一个 Element 对应一个确定的 shapeFactory
    this.set('shapeFactory', TextShapeFactory);
  }

  /**
   * Element-Text特有的图形属性映射：内容
   * @param cfg Text文本内容的映射规则
   */
  public content(field: ContentCfg): Text;
  public content(field: string): Text;
  public content(field: string, callback: ContentCallback): Text;
  public content(field: string | ContentCfg, callback?: ContentCallback): Text {
    if (_.isObject(field)) {
      this.set('contentOptions', field);
    } else {
      const fields = parseFields(<string>field);
      this.set('contentOptions', {
        fields,
        callback,
      });
    }

    return this;
  }

  // 获取 content 配置
  private _getContent(contentOptions: ContentCfg, origin: DataPointType) {
    const fields = contentOptions.fields || [];
    const callback = contentOptions.callback;

    if (callback) { // content({ fields: [ 'a', 'b' ], callback(a, b) {} })
      const params = fields.map((field) => {
        return origin[field];
      });

      return callback(...params);
    }
    return origin[fields[0]]; // content({ fields: [ 'a' ] })
  }

  /**
   * @override
   * @desc 添加content内容,复写cfg.text
   */
  getDrawCfg(obj) {
    const cfg = super.getDrawCfg(obj);
    const contentOptions = this.get('contentOptions');
    if (contentOptions) {
      cfg.text = this._getContent(contentOptions, obj[FIELD_ORIGIN]);
    }

    return cfg;
  }
}
