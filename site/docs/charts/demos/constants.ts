type Category =
  | 'all'
  | 'comparison'
  | 'distribution'
  | 'flow'
  | 'proportion'
  | 'interval'
  | 'relation'
  | 'trend'
  | 'time'
  | 'map'
  | 'other';

export enum LANGUAGE_MAP {
  ZH = 'zh',
  EN = 'en',
}

export const GRAPH_USAGES: {
  id: Category;
  nameZh: string;
  nameEn: string;
}[] = [
  {
    id: 'all',
    nameZh: '全部',
    nameEn: 'All',
  },
  {
    id: 'comparison',
    nameZh: '比较类',
    nameEn: 'Comparison',
  },
  {
    id: 'distribution',
    nameZh: '分布类',
    nameEn: 'Distribution',
  },
  {
    id: 'flow',
    nameZh: '流程类',
    nameEn: 'Flow',
  },
  {
    id: 'proportion',
    nameZh: '占比类',
    nameEn: 'Proportion',
  },
  {
    id: 'interval',
    nameZh: '区间类',
    nameEn: 'Interval',
  },
  {
    id: 'relation',
    nameZh: '关系类',
    nameEn: 'Relation',
  },
  {
    id: 'trend',
    nameZh: '趋势类',
    nameEn: 'Trend',
  },
  {
    id: 'time',
    nameZh: '时间类',
    nameEn: 'Time',
  },
  {
    id: 'map',
    nameZh: '地图类',
    nameEn: 'Map',
  },
  {
    id: 'other',
    nameZh: '其他',
    nameEn: 'Other',
  },
];
