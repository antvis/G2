import { deepMix } from '@antv/util';
import { ThemeComponent as TC, Theme } from '../runtime';
import { create } from './create';

const defaults = create({
  colorBlack: '#000',
  colorWhite: '#fff',
  colorStroke: '#888',
  colorDefault: '#4e79a7',
  colorBackground: 'transparent',
  category10: 'tableau10',
  category20: 'tableau10',
  padding1: 8,
  padding2: 12,
  padding3: 20,
  alpha90: 0.9,
  alpha65: 0.65,
  alpha45: 0.45,
  alpha25: 0.25,
  alpha10: 0.1,
});

export type AcademyOptions = Theme;

export const Academy: TC<AcademyOptions> = (options) => {
  return deepMix(
    {},
    defaults,
    {
      text: { text: { fontSize: 10 } },
      axis: {
        gridLineDash: [0, 0],
        gridLineWidth: 1,
        gridStroke: '#ddd',
        gridStrokeOpacity: 1,
        labelOpacity: 1,
        labelStrokeOpacity: 1,
        labelFontSize: 10,
        line: true,
        lineLineWidth: 1,
        lineStroke: '#888',
        lineStrokeOpacity: 1,
        tickLength: 5,
        tickStrokeOpacity: 1,
        titleOpacity: 1,
        titleStrokeOpacity: 1,
        titleFillOpacity: 1,
        titleFontSize: 11,
        titleFontWeight: 'bold',
      },
      axisLeft: {
        gridFilter: (_, i) => i !== 0,
      },
      axisRight: {
        gridFilter: (_, i) => i !== 0,
      },
      legendCategory: {
        itemLabelFillOpacity: 1,
        itemLabelFontSize: 10,
        itemValueFillOpacity: 1,
        itemValueFontSize: 10,
        titleFillOpacity: 1,
        titleFontSize: 11,
        titleFontWeight: 'bold',
      },
      legendContinuous: {
        handleLabelFontSize: 10,
        labelFillOpacity: 0.45,
        labelFontSize: 10,
      },
      label: {
        fontSize: 10,
      },
      innerLabel: {
        fontSize: 10,
      },
      htmlLabel: {
        fontSize: 10,
      },
      slider: {
        handleLabelFontSize: 10,
        trackFillOpacity: 0.05,
      },
    },
    options,
  );
};

Academy.props = {};
