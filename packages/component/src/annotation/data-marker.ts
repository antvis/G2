import { Coordinate } from '@antv/coord';
import { Group, Shape } from '@antv/g';
import * as _ from '@antv/util';
import Annotation, { AnnotationCfg, Point, SvgAttrs } from './base';

export interface DataMarkerCfg extends AnnotationCfg {
  point: {
    display: boolean;
    style: SvgAttrs;
  };
  line: {
    display: boolean;
    lineLength: number;
    style: SvgAttrs;
  };
  text: {
    display: boolean;
    content: string;
    style: SvgAttrs;
  };
  direction: 'upward' | 'downward';
  autoAdjust: boolean;
}

export default class DataMarker extends Annotation<DataMarkerCfg> {
  constructor(cfg: DataMarkerCfg) {
    /* istanbul ignore next */
    super(
      _.deepMix(
        {
          type: 'dataMarker',
          zIndex: 1,
          position: null,
          point: {
            display: true,
            style: {
              r: 3,
              fill: '#ffffff',
              stroke: '#1890FF',
              lineWidth: 2,
            },
          },
          line: {
            display: true,
            lineLength: 20,
            style: {
              stroke: '#A3B1BF',
              lineWidth: 1,
            },
          },
          text: {
            display: true,
            style: {
              fill: '#000000',
              opacity: 0.65,
              fontSize: 12,
              textAlign: 'start',
            },
          },
          direction: 'upward',
          autoAdjust: true,
        },
        cfg,
      ),
    );
  }

  public render(coord: Coordinate, group: Group) {
    const point = this.parsePoint(coord, this.get('position'));
    // container
    const markerGroup = group.addGroup();
    const positions = this.getElementPosition(point);
    const lineCfg = this.get('line');
    const pointCfg = this.get('point');
    const textCfg = this.get('text');
    let lineShape: Shape;
    let textShape: Shape;
    // add line
    if (lineCfg.display) {
      const lineData = positions.line;
      lineShape = this.drawLine(lineData, markerGroup);
    }
    // add text
    if (textCfg.display && textCfg.content) {
      const textPosition = positions.text;
      textShape = this.drawText(textPosition, markerGroup);
    }
    // add circle
    if (pointCfg.display) {
      const pointPoisition = positions.point;
      this.drawPoint(pointPoisition, markerGroup);
    }

    if (this.get('autoAdjust')) {
      const bbox = markerGroup.getBBox();
      const { minX, minY, maxX, maxY } = bbox;
      const { start, end } = coord;

      if (textShape) {
        if (minX <= start.x) {
          // 左侧超出
          textShape.attr('textAlign', 'start');
        }
        if (maxX >= end.x) {
          // 右侧超出
          textShape.attr('textAlign', 'end');
        }

        const direction = this.get('direction');
        if ((direction === 'upward' && minY <= end.y) || (direction !== 'upward' && maxY >= start.y)) {
          // 上方或者下方超出
          let textBaseline: 'top' | 'bottom';
          let dir: 1 | -1;
          if (direction === 'upward' && minY <= end.y) {
            textBaseline = 'top';
            dir = 1;
          } else {
            textBaseline = 'bottom';
            dir = -1;
          }

          textShape.attr('textBaseline', textBaseline);
          let lineLength = 0;
          if (lineCfg.display) {
            lineLength = lineCfg.lineLength;
            const linePath = [ [ 'M', point.x, point.y ], [ 'L', point.x, point.y + lineLength * dir ] ];
            lineShape.attr('path', linePath);
          }
          const newY = point.y + (lineLength + 2) * dir;
          textShape.attr('y', newY);
        }
      }
    }

    // 用于事件以及动画识别
    markerGroup.get('children').forEach((child) => {
      child.name = 'annotation-data-marker';
      this.get('appendInfo') && child.setSilent('appendInfo', this.get('appendInfo'));
    });
    this.set('el', markerGroup);
  }

  private getElementPosition(position: Point): { point: Point; line: Point[]; text: Point } {
    const { x, y } = position;
    const lineLength = this.get('line').display ? this.get('line').lineLength : 0;
    const direction = this.get('direction');
    const textStyle = this.get('text').style;
    textStyle.textBaseline = direction === 'upward' ? 'bottom' : 'top';
    const dir = direction === 'upward' ? -1 : 1;
    const pointPoisition = { x, y };
    const lineStart = { x, y };
    const lineEnd = { x, y: lineLength * dir + y };
    const textPosition = { x, y: (lineLength + 2) * dir + y };

    return {
      point: pointPoisition,
      line: [ lineStart, lineEnd ],
      text: textPosition,
    };
  }

  private drawLine(lineData: Point[], g: Group): Shape {
    const lineStyle = this.get('line').style;
    const linePath = [ [ 'M', lineData[0].x, lineData[0].y ], [ 'L', lineData[1].x, lineData[1].y ] ];
    const lineShape = g.addShape('path', {
      attrs: _.assign(
        {
          path: linePath,
        },
        lineStyle,
      ),
    });
    return lineShape;
  }

  private drawText(position: Point, g: Group): Shape {
    const textCfg = this.get('text');
    const textShape = g.addShape('text', {
      attrs: _.assign(
        {
          text: textCfg.content,
        } as any,
        textCfg.style,
        position,
      ),
    });
    return textShape;
  }

  private drawPoint(position: Point, g: Group): Shape {
    const pointStyle = this.get('point').style;
    const pointShape = g.addShape('circle', {
      attrs: _.assign({} as any, pointStyle, position),
    });
    return pointShape;
  }
}
