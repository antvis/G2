import {
  regressionLinear,
  regressionExp,
  regressionLoess,
  regressionLog,
  regressionPoly,
  regressionPow,
  regressionQuad,
} from 'd3-regression';
import { each, minBy, maxBy } from '@antv/util';
import { getScale } from '@antv/scale';
import { IGroup, IShape, Scale, Coordinate } from '../dependents';
import { View } from '../chart/view';
import { Data } from '../interface';
import { getSplinePath } from '../geometry/shape/util/path';

const REGRESSION_MAP = {
  exp: regressionExp,
  linear: regressionLinear,
  loess: regressionLoess,
  log: regressionLog,
  poly: regressionPoly,
  pow: regressionPow,
  quad: regressionQuad,
};

export default class TrendLine {
  protected view: View;
  protected container: IGroup;
  protected shape: IShape;
  public data: { trendlineData: any[]; confidenceData: any[] };
  protected options: Record<string, any>;

  constructor(view: View, cfg: any) {
    this.view = view;
    this.container = cfg.container;
  }

  public render() {
    this.clear();
    this.createTrendLine();
  }

  public layout() {}

  public update() {
    this.initOptions();
  }

  public init() {
    this.initOptions();
  }

  public get(): string {
    return 'trendline';
  }

  private initOptions() {
    const { scales } = this.view.geometries[0].getAttribute('position');
    const [xField, yField] = [scales[0]?.field, scales[1]?.field];
    this.options = {
      ...this.view.getOptions(),
      xField,
      yField,
    };
    const { data, lineType = 'exp' } = this.options;
    // 调用 d3 对应回归函数
    const reg = REGRESSION_MAP[lineType]()
      .x((d) => d[xField])
      .y((d) => d[yField]);
    this.data = this.processData(reg(data));
  }

  public createTrendLine() {
    const { xField, yField } = this.options;
    const xscale_view = this.view.getScaleByField(xField);
    const yscale_view = this.view.getScaleByField(yField);
    const coord = this.view.getCoordinate();

    const { trendlineData } = this.data;
    // 创建图形绘制的scale
    const LinearScale = getScale('linear');
    const xRange = this.adjustScale(xscale_view, trendlineData, 'x');

    const xScale = new LinearScale({
      min: xRange.min,
      max: xRange.max,
    });
    const yRange = this.adjustScale(yscale_view, trendlineData, 'y');
    const yScale = new LinearScale({
      min: yRange.min,
      max: yRange.max,
    });
    // 绘制置信区间曲线
    if (this.options.confidenceStyle) {
      const confidencePath = this.getConfidencePath(xScale, yScale, coord);
      this.container.addShape('path', {
        attrs: {
          path: confidencePath,
          fill: '#ccc',
          opacity: 0.1,
          ...this.options.confidenceStyle,
        },
        name: 'confidence',
      });
    }
    // 绘制trendline
    const points = this.getTrendlinePoints(xScale, yScale, coord);
    const constraint = [
      [0, 0],
      [1, 1],
    ];
    // @ts-ignore
    const path = getSplinePath(points, false, constraint);

    this.shape = this.container.addShape('path', {
      attrs: {
        path,
        stroke: '#9ba29a',
        lineWidth: 2,
        opacity: 0.5,
        lineJoin: 'round',
        lineCap: 'round',
        ...this.options.style,
      },
      name: 'trendline',
    });
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public destroy() {
    if (this.container) {
      this.container.destroy();
    }
  }

  private processData(data) {
    const trendlineData = [];
    const confidenceData = [];
    const { confidence = 0.2 } = this.options;
    each(data, (d: [number, number]) => {
      trendlineData.push({ x: d[0], y: d[1] });
      // 设置置信上下限
      const conf = Math.sqrt((data.rSquared * (1 - data.rSquared)) / d[1]) * confidence;
      confidenceData.push({ x: d[0], y0: d[1] - conf, y1: d[1] + conf });
    });
    return { trendlineData, confidenceData };
  }

  private getTrendlinePoints(xScale: Scale, yScale: Scale, coord: Coordinate) {
    const points = [];
    each(this.data.trendlineData, (d) => {
      const xRatio = xScale.scale(d.x);
      const yRatio = yScale.scale(d.y);
      const x = coord.start.x + coord.width * xRatio;
      const y = coord.start.y - coord.height * yRatio;
      points.push({ x, y });
    });
    return points;
  }

  private getConfidencePath(xScale: Scale, yScale: Scale, coord: Coordinate) {
    const upperPoints = [];
    const lowerPoints = [];
    const path = [];
    each(this.data.confidenceData, (d) => {
      const xRatio = xScale.scale(d.x);
      const y0Ratio = yScale.scale(d.y0);
      const y1Ratio = yScale.scale(d.y1);
      const x = coord.start.x + coord.width * xRatio;
      const y0 = coord.start.y - coord.height * y0Ratio;
      const y1 = coord.start.y - coord.height * y1Ratio;
      upperPoints.push({ x, y: y0 });
      lowerPoints.push({ x, y: y1 });
    });
    for (let i = 0; i < upperPoints.length; i++) {
      const flag = i === 0 ? 'M' : 'L';
      const p = upperPoints[i];
      if (!isNaN(p.x) && !isNaN(p.y)) {
        path.push([flag, p.x, p.y]);
      }
    }
    for (let j = lowerPoints.length - 1; j > 0; j--) {
      const p = lowerPoints[j];
      if (!isNaN(p.x) && !isNaN(p.y)) {
        path.push(['L', p.x, p.y]);
      }
    }
    return path;
  }

  /**
   * 处理用户自行配置min max的情况
   */
  private adjustScale(viewScale: Scale, trendlineData: Data, dim: string) {
    const { min, max } = viewScale;
    const { data, xField, yField } = this.options;
    const field = dim === 'x' ? xField : yField;
    const dataMin = minBy(data, field)[field];
    const dataMax = maxBy(data, field)[field];
    const minRatio = (min - dataMin) / (dataMax - dataMin);
    const maxRatio = (max - dataMax) / (dataMax - dataMin);
    const trendMin = minBy(trendlineData, dim)[dim];
    const trendMax = maxBy(trendlineData, dim)[dim];
    return {
      min: trendMin + minRatio * (trendMax - trendMin),
      max: trendMax + maxRatio * (trendMax - trendMin),
    };
  }
}
