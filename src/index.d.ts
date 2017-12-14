export = G2;
export as namespace G2;

declare namespace G2 {
  function track(option: boolean): void;
  const version: string;

  class Global {
    setTheme(option: 'default' | 'dark'): void;
    version: string;
    trackable: boolean;
    animate: boolean;
    snapArray: Array<number>;
    // 指定固定 tick 数的逼近值
    snapCountArray: Array<number>;
    widthRatio: {
      // 宽度所占的分类的比例
      column: number; // 一般的柱状图占比 1/2
      rose: number; // 玫瑰图柱状占比 1
      multiplePie: number; // 多层的饼图、环图
    };
    // 折线图、区域图、path 当只有一个数据时，是否显示成点
    showSinglePoint: boolean;
    connectNulls: boolean;
  }

  /**
   * 图标背景对象
   */
  interface ChartBackground {
    fill: string; // 图表背景色
    fillOpacity: number; // 图表背景透明度
    stroke: string; // 图表边框颜色
    strokeOpacity: number; // 图表边框透明度
    opacity: number; // 图表整体透明度
    lineWidth: number; // 图表边框粗度
    radius: number; // 图表圆角大小
  }

  /**
   * 图标接收的参数
   */
  interface ChartProp {
    container: string | HTMLDivElement;
    width: number;
    height: number;
    padding?:
      | {
          top: number;
          right: number;
          bottom: number;
          left: number;
        }
      | number
      | [number, number, number, number]
      | [string, string];
    background?: ChartBackground;
    plotBackground?: ChartBackground;
    forceFit?: boolean;
    animate?: boolean;
    pixelRatio?: number;
    data?: Object | any;
  }

  interface Coordinate {
    //坐标系旋转，angle 表示旋转的度数，单位为角度。
    rotate(angle: number): Coordinate;
    //坐标系缩放，sx 代表 x 方向缩放比例，sy 代表 y 方向缩放比例，单位为数值。
    scale(sx: number, sy: number): Coordinate;
    //坐标系转置，将 x 或者 y 的起始、结束值倒置。
    reflect(xy?: 'x' | 'y' | 'xy'): Coordinate;
    //将坐标系 x 轴和 y 轴转置。
    transpose(): Coordinate;
  }

  /**
   * 坐标轴标签
   */
  interface AxisChartLabel {
    // 数值，设置坐标轴文本 label 距离坐标轴线的距离
    offset: number;
    // 设置文本的显示样式，还可以是个回调函数，
    // 回调函数的参数为该坐标轴对应字段的数值
    textStyle: (
      text: string,
    ) => void | {
      // 文本对齐方向，可取值为
      textAlign: 'start' | 'middle' | 'end';
      // 文本的颜色
      fill: string;
      // 文本大小
      fontSize: number;
      fontWeight: string;
      // 文本粗细
      rotate: number;
      // 文本基准线，可取 top middle bottom，默认为middle
      textBaseline: 'top' | 'middle' | 'bottom';
    };
    // 文本是否需要自动旋转，默认为 true
    autoRotate: boolean;
    /**
     * 用于格式化坐标轴上显示的文本信息的回调函数
     * @param  {string} text  文本值
     * @param  {object} item  该文本值对应的原始数据记录
     * @param  {number} index 索引值
     * @return {string}       返回格式化后的文本值
     */
    formatter(text: string, item, index: number): string;
    /**
     * 使用 html 渲染文本
     * @param  {string} text  文本值
     * @param  {object} item  该文本值对应的原始数据记录
     * @param  {number} index 索引值
     * @return {string}       返回 html 字符串
     */
    htmlTemplate(text: string, item, index: number): string;
  }
  /**
   * 坐标轴线
   */
  interface AxisChartTile {
    autoRotate: boolean; // 是否需要自动旋转，默认为 true
    offset: number; // 数值，设置坐标轴标题距离坐标轴线的距离
    // 设置标题的文本样式
    textStyle: {
      // 文本对齐方向，可取值为： start middle end
      textAlign: 'start' | 'middle' | 'end';
      // 文本的颜色
      fill: string;
      // 文本大小
      fontSize: string;
      // 文本粗细
      fontWeight: string | number;
      // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
      rotate: number;
      // 文本基准线，可取 top middle bottom，默认为middle
      textBaseline: 'top' | 'middle' | 'bottom';
    };
    // 标题的显示位置（相对于坐标轴线），可取值为 start center end
    position: 'start' | 'center' | 'end';
  }

  const markerAction: (
    x: number,
    y: number,
    r: number,
    ctx: CanvasRenderingContext2D,
  ) => void;

  interface LegendConfig {
    position?: 'top' | 'bottom' | 'left' | 'right';
    layout?: 'vertica' | 'horizontal';
    title?: {
      // 文本对齐方向，可取值为： start middle end
      textAlign: 'start' | 'middle' | 'end';
      // 文本的颜色
      fill: string;
      // 文本大小
      fontSize: string;
      // 文本粗细
      fontWeight: string | number;
      // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
      rotate: number;
      // 文本基准线，可取 top middle bottom，默认为middle
      textBaseline: 'top' | 'middle' | 'bottom';
    };
    offsetX?: number;
    offsetY?: number;
    itemGap?: number;
    itemMarginBottom?: number;
    itemWidth?: number;
    unCheckColor?: string;
    background?: {
      fill?: string;
      fillOpacity?: number;
    };
    allowAllCanceled: number;
    itemFormatter: (value: string) => string;
    marker?: string | Function;
    textStyle?: {
      // 文本对齐方向，可取值为： start middle end
      textAlign: 'start' | 'middle' | 'end';
      // 文本的颜色
      fill: string;
      // 文本大小
      fontSize: string;
      // 文本粗细
      fontWeight: string | number;
      // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
      rotate: number;
      // 文本基准线，可取 top middle bottom，默认为middle
      textBaseline: 'top' | 'middle' | 'bottom';
    };
    clickable?: boolean;
    hoverable?: boolean;
    selectedMode?: 'single' | 'multiple';
    onHover?: (e: MouseEvent) => void;
    onClick?: (e: MouseEvent) => void;
    useHtml?: boolean;
    container?: string;
    containerTpl?: string;
    itemTpl: string;
    slidable: boolean;
    width: number;
    height: number;
    custom: number;
    items: Array<{
      value: string; // 图例项的文本内容
      fill: string; // 该图例项 marker 的填充颜色
      marker?: string | Function;
    }>;
  }

  interface TooltipConfig {
    triggerOn: 'mousemove' | 'click' | 'none';
    showTitle: boolean;
    title: string;
    crosshairs: {
      // rect 表示矩形框，x 表示水平辅助线，y 表示垂直辅助线，cross 表示十字辅助线
      type: 'rect' | 'x' | 'y' | 'cross';
      style: {
        // 图形样式
        fill: { string }; // 填充的颜色
        stroke: { string }; // 边框的颜色
        strokeOpacity: { number }; // 边框颜色的透明度，数值为 0 - 1 范围
        fillOpacity: { number }; // 填充的颜色透明度，数值为 0 - 1 范围
        lineWidth: { number }; // 边框的粗细
        lineDash: { number } | { array }; // 线的虚线样式
      };
    };
    offset?: number;
    inPlot?: boolean;
    follow?: boolean;
    shared?: boolean;
    enterable?: boolean;
    position?: 'left' | 'righ' | 'top' | 'bottom';
    hideMarkers?: boolean;
    containerTpl?: string;
    itemTpl?: string;
    'g2-tooltip'?: any;
    'g2-tooltip-title'?: any;
    'g2-tooltip-list-item'?: any;
    'g2-tooltip-list'?: any;
    'g2-tooltip-marker'?: any;
  }

  class ChartGuide {
    line: (
      option: {
        top?: boolean; // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
        // 辅助线起始位置，值为原始数据值，支持 callback
        start?: any | Function | Array<string | number>;
        // 辅助线结束位置，值为原始数据值，支持 callback
        end?: any | Function | Array<string | number>;
        lineStyle?: {
          stroke?: string; // 线的颜色
          lineDash?: [number, number, number]; // 虚线的设置
          lineWidth?: number; // 线的宽度
        }; // 图形样式配置
        text?: {
          // 文本的显示位置
          position?: 'start' | 'center' | 'end' | '39%' | 0.5;
          // 是否沿线的角度排布，默认为 true
          autoRotate?: boolean;
          // 文本图形样式配置
          style?: any;
          // 文本的内容
          content?: string;
          // x 方向的偏移量
          offsetX?: number;
          // y 方向的偏移量
          offsetY?: number;
        };
      },
    ) => void;
    text: (
      option: {
        // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
        top?: { boolean };
        // 文本的起始位置，值为原始数据值，支持 callback
        position?: any | Function | Array<string | number>;
        // 显示的文本内容
        content?: string;
        style?: {
          // 文本的颜色
          fill?: string;
          // 文本大小
          fontSize?: string;
          // 文本粗细
          fontWeight?: string | number;
          rotate?: number;
        }; // 文本的图形样式属性
        offsetX?: number; // x 方向的偏移量
        offsetY?: number; // y 方向偏移量
      },
    ) => void;
    image: (
      option: {
        // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
        top?: boolean;
        // 图片起始位置， 值为原始数据值，支持 callback
        start?: any | Function | Array<string | number>;
        // 图片结束位置， 值为原始数据值，支持 callback
        end?: any | Function | Array<string | number>;
        // 图片路径
        src?: string;
        // x 方向的偏移量
        offsetX?: number;
        // y 方向偏移量
        offsetY?: number;
        width?: number;
        height?: number;
      },
    ) => void;
    region: (
      option: {
        // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
        top?: boolean;
        // 辅助框起始位置，值为原始数据值，支持 callback
        start?: any | Function | Array<string | number>;
        // 辅助框结束位置，值为原始数据值，支持 callback
        end?: any | Function | Array<string | number>;
        style?: {
          // 辅助框的边框宽度
          lineWidth?: number;
          // 辅助框填充的颜色
          fill?: string;
          // 辅助框的背景透明度
          fillOpacity?: number;
          stroke?: string;
        };
      },
    ) => void;
    html: (
      option: {
        // html的起始位置，值为原始数据值，支持 callback
        position?: any | Function | Array<string | number>;
        alignX?: 'left' | 'middle' | 'right';
        alignY?: 'top' | 'middle' | 'bottom';
        offsetX?: number;
        offsetY?: number;
        // html 代码
        html?: string;
        zIndex?: number;
      },
    ) => void;

    arc: (
      option: {
        top?: boolean;
        // 辅助框起始位置，值为原始数据值，支持 callback
        start?: any | Function | Array<string | number>;
        // 辅助框结束位置，值为原始数据值，支持 callback
        end?: any | Function | Array<string | number>;
      },
    ) => void;
    facet: (
      option: {
        fileds: Array<String>;
        showTitle: boolean; // 显示标题
        autoSetAxis: boolean; // 自动设置坐标轴的文本，避免重复和遮挡
        padding: string; // 每个 view 之间的间距
        /**
         * 创建每个分面中的视图
         * @param  {object} view  视图对象
         * @param  {object} facet
         * @return {null}
         */
        eachView: any;
        // 列标题
        colTitle: {
          offsetY: number;
          style: {
            fontSize: number;
            textAlign: 'center' | 'left' | 'right';
            fill: string;
          };
        };
        // 行标题
        rowTitle: {
          offsetX: number;
          style: {
            fontSize: number;
            textAlign: 'center' | 'left' | 'right';
            fill: string;
            rotate: number;
          };
        };
      },
    ) => void;
  }

  class ChartAxisConfig {
    position?: 'top' | 'bottom' | 'left' | 'right';
    line?: {
      // 坐标轴线的颜色
      stroke?: string;
      // 坐标轴线的透明度，数值范围为 0 - 1
      strokeOpacity?: number;
      /*设置虚线的样式
        * 如 [2, 3]第一个用来表示实线的像素，
        * 第二个用来表示空白的像素。
        * 如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
        */
      lineDash?: [number, number];
      lineWidth?: number;
    } | null;
    label?: AxisChartLabel;
    title?: AxisChartTile;
    tickLine?: {
      // 刻度线宽
      lineWidth: number;
      // 刻度线的颜色
      stroke: string;
      // 刻度线颜色的透明度
      strokeOpacity: number;
      // 刻度线的长度，可以为负值（表示反方向渲染）
      length: number;
    };
    subTickCount?: number;
    subTickLine?: {
      // 次刻度线宽
      lineWidth: number;
      // 次刻度线颜色
      stroke: string;
      // 次刻度线颜色的透明度
      strokeOpacity: number;
      // 次刻度线的长度，可以为负值（表示反方向渲染）
      length: number;
    };
    grid?: {
      // 声明网格顶点从两个刻度中间开始，默认从刻度点开始
      align?: 'center';
      // 声明网格的类型，line 表示线，polygon 表示矩形框
      type?: 'line' | 'polygon';
      // 当网格类型 type 为 line 时，使用 lineStyle 设置样式
      lineStyle?: {
        // 网格线的颜色
        stroke?: string;
        // 网格线的粗细
        lineWidth?: number;
        // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
        lineDash?: [number, number];
      };
      // 当网格类型 type 为 polygon 时，使用 alternateColor 为网格设置交替的颜色
      // 指定一个值则先渲染奇数层，两个值则交替渲染
      alternateColor?: string | [string, string];
      // 是否隐藏第一条网格线，默认为 false
      hideFirstLine: boolean;
      // 是否隐藏最后一条网格线，默认为 false
      hideLastLine: boolean;
    };
  }

  class BashView {
    source(data: any): this;
    source(data: any, scaleConfig: any): this;
    getXScale: () => number;
    getYScales: () => number;
    getXY: () => {
      x: number; // 画布上的横坐标
      y: number; // 画布上的纵坐标
    };
    filter(field: string, callback: (value: string | number) => boolean): this;
    axis(option: boolean): this;
    axis(field: string, option: boolean): this;
    axis(field: string, axisConfig: ChartAxisConfig): this;
    guide(): ChartGuide;
    scale(scaleConfig: any): this;
    scale(field: string, scaleConfig: any): this;
    coord(
      type: 'rect' | 'polar' | 'theta' | 'helix',
      coordConfig?: {
        // 设置半径，值范围为 0 至 1
        radius: number;
        // 空心圆的半径，值范围为 0 至 1
        innerRadius: number;
        // 极坐标的起始角度，单位为弧度
        startAngle: number;
        // 极坐标的结束角度，单位为弧度
        endAngle: number;
      },
    ): Coordinate;
    animate: (option: boolean) => void;
    clear: () => void;
    changeData: (data: any) => void;
    changeVisible: (visible: string) => void;
    repaint: () => void;
    destroy: () => void;
    line: () => any;
    path: () => any;
    area: () => any;
    point: () => any;
    interval: () => any;
    polygon: () => any;
    schema: () => any;
    edge: () => any;
    heatmap: () => any;
  }

  class View extends BashView {
    tooltip(option: boolean): this;
  }

  class Chart extends BashView {
    constructor(ChartProp: {});
    legend(option: boolean): this;
    legend(field: string, option: boolean): this;
    legend(field: string, legendConfig: ChartAxisConfig): this;
    tooltip(tooltipConfig: TooltipConfig): this;
    view: (
      option: {
        start: { x: number; y: number };
        end: { x: number; y: number };
        padding: number;
        animate: boolean;
      },
    ) => View;
    forceFit: () => void;
    render: () => void;
    changeSize: (width: number, height: number) => void;
    changeWidth: (width: number) => void;
    getSnapRecords: (ponit: { x: number; y: number }) => Array<number>;
    getAllGeoms: () => Array<any>;
    toDataURL: () => string;
    downloadImage: (name: string) => string;
    showTooltip: (ponit: { x: number; y: number }) => any;
    hideTooltip: (ponit: { x: number; y: number }) => any;
    on: (eventNane: string, event: any) => any;
  }

  class Scale {
    type: 'identity' | 'linear' | 'cat' | 'time' | 'timeCat' | 'log' | 'pow';
    formatter: (value: string) => string;
    range: [number, number];
    alias: string;
    tickCount: number;
    ticks: Array<any>;
  }

  class Shape {
    registerShape: (
      chartType: string,
      shapeName: string,
      config: {
        getPoints: any;
        draw: any;
      },
    ) => {
      parsePoint: any;
      parsePoints: any;
      parsePath: any;
    };
  }

  class Animate {
    registerAnimation(
      animationType: string,
      animationName: string,
      animationFun: any,
    );
  }

  class DomUtil {
    getBoundingClientRect: (
      node,
    ) => { top: number; bottom: number; left: number; right: number };
    getStyle: (dom: HTMLElement, name: string) => any;
    modifyCSS(dom: HTMLElement, css: any): HTMLElement;
    createDom(str: string): HTMLElement;
    getRatio(): number;
    getWidth(el: HTMLElement): number;
    getHeight(el: HTMLElement): number;
    getOuterWidth(el: HTMLElement): number;
    getOuterHeight(el: HTMLElement): number;
    addEventListener(
      target: HTMLElement,
      eventType: string,
      callback: (e: any) => void,
    );
    requestAnimationFrame(fn: () => void);
  }

  class MatrixUtil {
    mat3: any;
    vec2: any;
    vec3: any;
    transform: any;
  }
  class PathUtil {
    parsePathString(pathString: string): Array<any>;
    parsePathArray(pathArray): any;
    pathTocurve(path: Array<any>): any;
    pathToAbsolute(path: Array<any>): any;
    catmullRomToBezier(pointsArray: Array<any>): any;
    intersection(path1: Array<any>, path2: Array<any>): any;
  }
}
