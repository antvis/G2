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
import { groupedBox } from './groupedBox';
import { treemap } from './treemap';
// import { barAggregated } from './bar-aggregated';
// import { sankey } from './sankey';

export const examples = {
  'general/interval': [
    { title: '分组柱状图', render: BarDodged },
    { title: '区间柱状图', render: BarRange },
  ],
  'general/line': [
    { title: '数据缺失折线图', render: lineConnectNulls },
    { title: '归一化折线图', render: lineNormalized },
  ],
  'general/area': [
    { title: '数据缺失面积图', render: missingDataArea },
    { title: '堆叠面积图', render: stackedArea },
  ],
  'general/point': [{ title: '对数气泡图', render: pointLog }],
  'general/radial': [
    { title: '饼图', render: spiderLabel },
    { title: '', render: roseLabel },
  ],
  'general/dual': [{ title: '柱线混合图', render: lineBar }],
  'general/box': [{ title: '分组箱线图', render: groupedBox }],
  'graph/hierarchy': [{ title: 'Treemap', render: treemap }],
};
