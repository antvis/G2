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

export const mockSnapshot = [
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-NYwTrAdwZ4AAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GeijRY75QHgAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0E-aSpAPPtwAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*j_DBRKze77QAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*SdKuRYFVCOIAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*20fLR5dh4SYAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*34m0QZPUjxMAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*extpT4E09xUAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z8JFRLxrs_IAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*mezjR7Iy-TYAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*trHIR7xKaAcAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*rhhlRLxuUYYAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QWC3RqPzWdEAAAAAAAAAAAAAemJ7AQ/original',
];

export const mockCategory: Category[][] = [
  ['comparison', 'distribution'],
  ['flow', 'interval'],
  ['map', 'other'],
  ['proportion', 'relation'],
  ['time', 'trend'],
  ['comparison', 'trend', 'flow', 'interval'],
  ['time'],
  ['proportion'],
  ['other'],
  ['trend'],
  ['flow'],
];
