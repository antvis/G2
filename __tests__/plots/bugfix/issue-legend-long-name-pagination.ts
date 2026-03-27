import { Chart } from '../../../src';

// Regression test: when legend names are long enough to trigger pagination,
// items with widths close to the available width (between availWidth-55 and
// availWidth) would be inline in the first layout pass but wrap after the
// navigator takes 55px. This caused uneven page distribution (e.g. 1 item on
// page 1, 2 items on page 2). The fix recomputes row count with the reduced
// width so G2's component size matches the actual second-pass layout.
export function issueLegendLongNamePagination(context) {
  const { container, canvas } = context;

  const data = [
    {
      time: '202501',
      value: 0.4846,
      type: 'prediction_score_2ca3d1cb/通用3m30d_身份证号/整体/yx_mybk_rm_dev.x_375693_dq_v6_pred_1204_2_0_30_2.prediction_score',
    },
    {
      time: '202501',
      value: 0.5241,
      type: 'prediction_score_2ca3d1cb/通用1m30d_身份证号/整体/yx_mybk_rm_dev.x_375693_dq_v6_pred_1204_2_0_30_2.prediction_score',
    },
    {
      time: '202501',
      value: 0.4073,
      type: 'final_prob_2ca3d1cb/通用3m30d_身份证号/整体/yx_mybk_rm_dev.x_375693_dq_v6_pred_1204_2_0_30_2.final_prob',
    },
    {
      time: '202502',
      value: 0.4855,
      type: 'prediction_score_2ca3d1cb/通用3m30d_身份证号/整体/yx_mybk_rm_dev.x_375693_dq_v6_pred_1204_2_0_30_2.prediction_score',
    },
    {
      time: '202502',
      value: 0.5119,
      type: 'prediction_score_2ca3d1cb/通用1m30d_身份证号/整体/yx_mybk_rm_dev.x_375693_dq_v6_pred_1204_2_0_30_2.prediction_score',
    },
    {
      time: '202502',
      value: 0.4065,
      type: 'final_prob_2ca3d1cb/通用3m30d_身份证号/整体/yx_mybk_rm_dev.x_375693_dq_v6_pred_1204_2_0_30_2.final_prob',
    },
  ];

  const chart = new Chart({
    container,
    canvas,
    width: 800,
    height: 300,
  });

  chart
    .line()
    .data(data)
    .encode('x', 'time')
    .encode('y', 'value')
    .encode('color', 'type');

  const finished = chart.render();

  return { chart, finished };
}
