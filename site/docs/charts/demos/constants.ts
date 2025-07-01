import {
  AppstoreOutlined,
  BarChartOutlined,
  DotChartOutlined,
  NodeIndexOutlined,
  PieChartOutlined,
  LineChartOutlined,
  ShareAltOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  MoreOutlined,
} from '@ant-design/icons';

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
  icon: React.ComponentType;
}[] = [
  {
    id: 'all',
    nameZh: '全部',
    nameEn: 'All',
    icon: AppstoreOutlined,
  },
  {
    id: 'comparison',
    nameZh: '比较类',
    nameEn: 'Comparison',
    icon: BarChartOutlined,
  },
  {
    id: 'distribution',
    nameZh: '分布类',
    nameEn: 'Distribution',
    icon: DotChartOutlined,
  },
  {
    id: 'flow',
    nameZh: '流程类',
    nameEn: 'Flow',
    icon: NodeIndexOutlined,
  },
  {
    id: 'proportion',
    nameZh: '占比类',
    nameEn: 'Proportion',
    icon: PieChartOutlined,
  },
  {
    id: 'interval',
    nameZh: '区间类',
    nameEn: 'Interval',
    icon: LineChartOutlined,
  },
  {
    id: 'relation',
    nameZh: '关系类',
    nameEn: 'Relation',
    icon: ShareAltOutlined,
  },
  {
    id: 'trend',
    nameZh: '趋势类',
    nameEn: 'Trend',
    icon: RiseOutlined,
  },
  {
    id: 'time',
    nameZh: '时间类',
    nameEn: 'Time',
    icon: ClockCircleOutlined,
  },
  {
    id: 'map',
    nameZh: '地图类',
    nameEn: 'Map',
    icon: GlobalOutlined,
  },
  {
    id: 'other',
    nameZh: '其他',
    nameEn: 'Other',
    icon: MoreOutlined,
  },
];
