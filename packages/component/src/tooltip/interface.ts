import { GuideCfg } from '../interface';

export interface TooltipCfg extends GuideCfg {
  readonly enterable?: boolean; // 是否允许鼠标进入 tooltip，默认为 false，即不允许进入。
  readonly inPlot?: boolean; // 是否将 tooltip 限定在绘图区域内。默认为 true，即限定在绘图区域内。
  readonly showTitle?: boolean; // 是否展示提示信息的标题。默认为 true，即展示，通过设置为 false 来隐藏标题。
  readonly offset?: number; // tooltip 距离鼠标的偏移量。
  readonly titleContent?: string;
  readonly x?: number;
  readonly y?: number;
  readonly items?: ToolTipContentItem[];
  readonly markerItems?: ToolTipContentItem[];
  readonly crosshairs?: {
    // tooltip 的辅助线或者辅助框。
    type: string; // x/y/cross，x 表示水平辅助线，y 表示垂直辅助线，cross 表示十字辅助线。
    style: {
      // 图形样式。
      fill: string; // 填充的颜色。
      stroke: string; // 边框的颜色。
      strokeOpacity: number; // 边框颜色的透明度，数值为 0 - 1 范围。
      fillOpacity: number; // 填充的颜色透明度，数值为 0 - 1 范围。
      lineWidth: number; // 边框的粗细。
      lineDash: number | number[]; // 线的虚线样式。
    };
  };
}

export interface ToolTipContentItem {
  title: string;
  name: string;
  value: number;
  color: string;
  size: number;

  x: number;
  y: number;
  point: {
    x: number;
    y: number;
  };

  marker: {
    symbol: string;
    radius: number;
  };
}
