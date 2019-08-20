import { BBox, Group, Shape } from '@antv/g';
import { Coord } from '@antv/coord';
import * as _ from '@antv/util';
import Annotation, { AnnotationCfg, Point, SvgAttrs } from './base';

export interface DataRegionCfg extends AnnotationCfg {
  region: {
    lineLength: number;
    style: SvgAttrs;
  };
  text: {
    display: boolean;
    content: string;
    style: SvgAttrs;
  };
}

export default class DataRegion extends Annotation<DataRegionCfg> {
  constructor(cfg: DataRegionCfg) {
    /* istanbul ignore next */
    super(
      _.deepMix(
        {
          type: 'dataRegion',
          start: null,
          end: null,
          region: {
            lineLength: 0,
            style: {
              lineWidth: 0,
              fill: '#000000',
              opacity: 0.04,
            },
          },
          text: {
            display: true,
            content: '',
            style: {
              textAlign: 'center',
              textBaseline: 'bottom',
              fontSize: 12,
              fill: 'rgba(0, 0, 0, .65)',
            },
          },
        },
        cfg,
      ),
    );
  }

  render(coord: Coord, group: Group, data: Point[]) {
    const regionCfg = this.get('region');
    const textCfg = this.get('text');
    const lineLength = regionCfg.lineLength;
    const regionData = this.getRegionData(coord, data);

    if (!regionData.length) return;

    const regionBBox = this.getBBox(regionData);

    const path = [];
    path.push([ 'M', regionData[0].x, regionBBox.minY - lineLength ]);
    for (let i = 0, len = regionData.length; i < len; i++) {
      const p = [ 'L', regionData[i].x, regionData[i].y ];
      path.push(p);
    }
    path.push([ 'L', regionData[regionData.length - 1].x, regionBBox.minY - lineLength ]);

    const regionGroup = group.addGroup();
    regionGroup.addShape('path', {
      attrs: _.mix(
        {
          path,
        },
        regionCfg.style,
      ),
    });

    if (textCfg.display && textCfg.content) {
      regionGroup.addShape('Text', {
        attrs: _.mix(
          {
            x: (regionBBox.minX + regionBBox.maxX) / 2,
            y: regionBBox.minY - lineLength,
            text: textCfg.content,
          },
          textCfg.style,
        ),
      });
    }

    // 用于事件和动画识别
    regionGroup.get('children').forEach((child) => {
      child.name = 'annotation-data-region';
      this.get('appendInfo') && child.setSilent('appendInfo', this.get('appendInfo'));
    });

    this.set('el', regionGroup);
  }

  private getRegionData(coord: Coord, data: Point[]) {
    const start = this.get('start');
    const end = this.get('end');
    const xField = _.head(_.values(this.get('xScales'))).field;
    const yField = _.head(_.values(this.get('yScales'))).field;
    const startXValue = _.isArray(start) ? start[0] : start[xField];
    const endXValue = _.isArray(end) ? end[0] : end[xField];
    let startIndex: number;
    const arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];

      // findIndex
      if (item[xField] === startXValue) {
        startIndex = i;
      }

      if (i >= startIndex) {
        arr.push(this.parsePoint(coord, [ item[xField], item[yField] ]));
      }

      // findLastIndex
      if (item[xField] === endXValue) {
        break;
      }
    }
    return arr;
  }

  private getBBox(data: Point[]) {
    const xs = [];
    const ys = [];
    for (let i = 0; i < data.length; i++) {
      xs.push(data[i].x);
      ys.push(data[i].y);
    }
    const xRange = _.getRange(xs);
    const yRange = _.getRange(ys);

    return BBox.fromRange(xRange.min, yRange.min, xRange.max, yRange.max);
  }
}
