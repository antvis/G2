import { G2Spec } from '../../../src';

export function mockFacetPieLegend(): G2Spec {
  return {
    type: 'facetRect',
    data: {
      type: 'inline',
      value: [
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 96968.81,
          ff543d1f8d0b4f29bef22d0cbed88def: 28457.53,
          f043bde8c6ec4ed0b125cf45901ff47a: '装订机',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 107777.25,
          ff543d1f8d0b4f29bef22d0cbed88def: 25285.57,
          f043bde8c6ec4ed0b125cf45901ff47a: '收纳具',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 194752177.78,
          ff543d1f8d0b4f29bef22d0cbed88def: 46626257.69,
          f043bde8c6ec4ed0b125cf45901ff47a: '复印机',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 170635564.26,
          ff543d1f8d0b4f29bef22d0cbed88def: 40305299.8,
          f043bde8c6ec4ed0b125cf45901ff47a: '电话',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 5104153.12,
          ff543d1f8d0b4f29bef22d0cbed88def: 1061636.93,
          f043bde8c6ec4ed0b125cf45901ff47a: '桌子',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 96855.78,
          ff543d1f8d0b4f29bef22d0cbed88def: 20490.12,
          f043bde8c6ec4ed0b125cf45901ff47a: '信封',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 81068.67,
          ff543d1f8d0b4f29bef22d0cbed88def: 16255.18,
          f043bde8c6ec4ed0b125cf45901ff47a: '纸张',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 76659.47,
          ff543d1f8d0b4f29bef22d0cbed88def: 18298.37,
          f043bde8c6ec4ed0b125cf45901ff47a: '笔',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 4715752.38,
          ff543d1f8d0b4f29bef22d0cbed88def: 1196462.6,
          f043bde8c6ec4ed0b125cf45901ff47a: '椅子',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 95937.35,
          ff543d1f8d0b4f29bef22d0cbed88def: 21738.01,
          f043bde8c6ec4ed0b125cf45901ff47a: '胶带',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 77825.34,
          ff543d1f8d0b4f29bef22d0cbed88def: 16735.45,
          f043bde8c6ec4ed0b125cf45901ff47a: '橡皮',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 90100.33,
          ff543d1f8d0b4f29bef22d0cbed88def: 16531.52,
          f043bde8c6ec4ed0b125cf45901ff47a: '便签纸',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 199045124.34,
          ff543d1f8d0b4f29bef22d0cbed88def: 45315823.8,
          f043bde8c6ec4ed0b125cf45901ff47a: '配件',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 86760.25,
          ff543d1f8d0b4f29bef22d0cbed88def: 17712.47,
          f043bde8c6ec4ed0b125cf45901ff47a: '本子',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 168698505.65,
          ff543d1f8d0b4f29bef22d0cbed88def: 34857916.67,
          f043bde8c6ec4ed0b125cf45901ff47a: '投影仪',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 4658877.77,
          ff543d1f8d0b4f29bef22d0cbed88def: 1220090.14,
          f043bde8c6ec4ed0b125cf45901ff47a: '柜子',
        },
        {
          '09e62ad4dd204ccda464e7b83db3c43e': 5645597.27,
          ff543d1f8d0b4f29bef22d0cbed88def: 1389893.06,
          f043bde8c6ec4ed0b125cf45901ff47a: '书架',
        },
      ],
      transform: [
        {
          type: 'rename',
          '09e62ad4dd204ccda464e7b83db3c43e': '单价求和',
          ff543d1f8d0b4f29bef22d0cbed88def: '单位成本求和',
        },
        {
          type: 'fold',
          fields: ['单价求和', '单位成本求和'],
          key: 'folded_key',
          value: 'folded_value',
        },
      ],
    },
    encode: { x: 'folded_key' },
    axis: { x: { title: false } },
    children: [
      {
        type: 'view',
        coordinate: { type: 'theta' },
        frame: false,
        children: [
          {
            type: 'interval',
            encode: {
              color: 'f043bde8c6ec4ed0b125cf45901ff47a',
              y: 'folded_value',
            },
            axis: { y: { title: '单价求和' } },
            transform: [{ type: 'stackY' }],
            labels: [
              {
                text: 'f043bde8c6ec4ed0b125cf45901ff47a',
                position: 'outside',
                transform: [{ type: 'overlapHide' }],
              },
            ],
            scale: { y: { facet: false } },
          },
        ],
      },
    ],
  };
}
