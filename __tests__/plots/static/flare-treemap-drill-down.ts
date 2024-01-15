import { G2Spec } from '../../../src';

export function flareTreemapDrillDown(): G2Spec {
  return {
    type: 'treemap',
    width: 600,
    height: 400,
    layout: { tile: 'treemapBinary', paddingInner: 5 },
    data: {
      value: {
        name: '商品',
        children: [
          {
            name: '文具',
            children: [
              {
                name: '笔',
                children: [
                  { name: '铅笔', value: 430 },
                  { name: '圆珠笔', value: 530 },
                  { name: '钢笔', value: 80 },
                  { name: '水彩', value: 130 },
                ],
              },
              { name: '铅笔盒', value: 30 },
              { name: '直尺', value: 60 },
              { name: '笔记本', value: 160 },
              { name: '其他', value: 80 },
            ],
          },
          {
            name: '零食',
            children: [
              { name: '饼干', value: 280 },
              { name: '辣条', value: 150 },
              { name: '牛奶糖', value: 210 },
              { name: '泡泡糖', value: 80 },
              {
                name: '饮品',
                children: [
                  { name: '可乐', value: 122 },
                  { name: '矿泉水', value: 244 },
                  { name: '果汁', value: 49 },
                  { name: '牛奶', value: 82 },
                ],
              },
              { name: '其他', value: 40 },
            ],
          },
          { name: '其他', value: 450 },
        ],
      },
    },
    encode: { value: 'value' },
    style: {
      labelFill: '#000',
      labelStroke: '#fff',
      labelLineWidth: 1.5,
      labelFontSize: 14,
      labelPosition: 'top-left',
      labelDx: 5,
      labelDy: 5,
    },
    interaction: {
      treemapDrillDown: { breadCrumbY: 12, activeFill: '#873bf4' },
    },
  };
}
