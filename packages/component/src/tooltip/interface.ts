import { GuideCfg } from '../interface';

export interface TooltipCfg extends GuideCfg {
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
