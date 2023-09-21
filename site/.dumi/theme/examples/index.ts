import { lineNormalized } from './line-normalized';
import { lineConnectNulls } from './line-connect-nulls';
import { missingDataArea } from './missing-data-area';
import { stackedArea } from './stacked-area';
import { pointLog } from './point-log';
import { BarDodged } from './bar-dodged';
import { BarRange } from './bar-range';
import { lineBar } from './line-bar';
import { spiderLabel } from './spider-label';
import { roseLabel } from './rose-label';
import { groupedBox } from './grouped-box';
import { treemap } from './treemap';
// import { barAggregated } from './bar-aggregated';
// import { sankey } from './sankey';

export const examples = [
  {
    title: '分组柱状图',
    render: BarDodged,
    link: 'general/interval/#bar-dodged',
  },
  {
    title: '区间柱状图',
    render: BarRange,
    link: 'general/interval/#bar-range',
  },
  {
    title: '数据缺失折线图',
    render: lineConnectNulls,
    link: 'general/line/#line-connect-nulls',
  },
  {
    title: '归一化折线图',
    render: lineNormalized,
    link: 'general/line/#line-normalized',
  },
  {
    title: '数据缺失面积图',
    render: missingDataArea,
    link: 'general/area/#missing-data-area',
  },
  {
    title: '堆叠面积图',
    render: stackedArea,
    link: 'general/area/#stacked-area',
  },
  { title: '对数气泡图', render: pointLog, link: 'general/point/#point-log' },
  { title: '饼图', render: spiderLabel, link: 'general/pie/#spider-label' },
  { title: '玫瑰图', render: roseLabel, link: 'general/rose/#rose-label' },
  { title: '柱线混合图', render: lineBar, link: 'general/dual/#line-bar' },
  {
    title: '分组箱线图',
    render: groupedBox,
    link: 'general/box/#grouped-box',
  },
  { title: '矩阵树图', render: treemap, link: 'graph/hierarchy/#treemap' },
];
