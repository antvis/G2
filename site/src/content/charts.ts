import {
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
import { getCollection } from 'astro:content';

export const categories = [
  { id: 'comparison', icon: BarChartOutlined, zh: '比较类', en: 'Comparison' },
  {
    id: 'distribution',
    icon: DotChartOutlined,
    zh: '分布类',
    en: 'Distribution',
  },
  { id: 'flow', icon: NodeIndexOutlined, zh: '流程类', en: 'Flow' },
  { id: 'proportion', icon: PieChartOutlined, zh: '占比类', en: 'Proportion' },
  { id: 'interval', icon: LineChartOutlined, zh: '区间类', en: 'Interval' },
  { id: 'relation', icon: ShareAltOutlined, zh: '关系类', en: 'Relation' },
  { id: 'trend', icon: RiseOutlined, zh: '趋势类', en: 'Trend' },
  { id: 'time', icon: ClockCircleOutlined, zh: '时间类', en: 'Time' },
  { id: 'map', icon: GlobalOutlined, zh: '地图类', en: 'Map' },
  { id: 'other', icon: MoreOutlined, zh: '其他', en: 'Other' },
];

export async function getCharts(pathname: string) {
  const id = decodeURI(pathname).replace(/^\/|\/$/g, '');
  const locale = id.startsWith('en/') ? 'en' : 'zh';
  const entries = await getCollection('docs');
  const current = entries.find((entry) => entry.id === id);
  const charts = entries
    .filter(
      (entry) =>
        entry.id.startsWith(`${locale}/charts/`) &&
        entry.data.screenshot &&
        !entry.data.draft,
    )
    .map((entry) => ({
      ...entry.data,
      slug: entry.id.split('/').at(-1)!,
      href: `/${entry.id}/`,
      category: (entry.data.category ?? []) as string[],
    }))
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title),
    );
  return { locale, current, charts };
}
