// [legend type, [channels, scale type][][]]
type InferStrategy = [string, [string, string][][]];

/**
 * @examples
 * ✅
 * color - `discrete`, shape - `constant`
 * legendCategory.rule[27] is matched
 *
 * ❎
 * shape - `discrete`, size - `constant`
 * There are no rules to match
 *
 */
export const LEGEND_INFER_STRATEGIES: InferStrategy[] = [
  [
    'legendCategory',
    [
      [
        ['color', 'discrete'],
        ['opacity', 'discrete'],
        ['shape', 'discrete'],
        ['size', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'constant'],
        ['shape', 'discrete'],
        ['size', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'discrete'],
        ['shape', 'constant'],
        ['size', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'constant'],
        ['shape', 'constant'],
        ['size', 'constant'],
      ],
      [
        ['color', 'constant'],
        ['opacity', 'discrete'],
        ['shape', 'discrete'],
        ['size', 'constant'],
      ],
      [
        ['color', 'constant'],
        ['opacity', 'constant'],
        ['shape', 'discrete'],
        ['size', 'constant'],
      ],
      [
        ['color', 'constant'],
        ['opacity', 'discrete'],
        ['shape', 'constant'],
        ['size', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['shape', 'discrete'],
        ['size', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'discrete'],
        ['shape', 'discrete'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'discrete'],
        ['size', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'constant'],
        ['shape', 'discrete'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'constant'],
        ['size', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['shape', 'constant'],
        ['size', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'discrete'],
        ['shape', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'constant'],
        ['shape', 'constant'],
      ],
      [
        ['color', 'constant'],
        ['shape', 'discrete'],
        ['size', 'constant'],
      ],
      [
        ['color', 'constant'],
        ['opacity', 'discrete'],
        ['shape', 'discrete'],
      ],
      [
        ['color', 'constant'],
        ['opacity', 'discrete'],
        ['size', 'constant'],
      ],
      [
        ['color', 'constant'],
        ['opacity', 'constant'],
        ['shape', 'discrete'],
      ],
      // [
      //   ['color', 'constant'],
      //   ['opacity', 'constant'],
      //   ['size', 'constant'],
      // ],
      // [
      //   ['color', 'constant'],
      //   ['shape', 'constant'],
      //   ['size', 'constant'],
      // ],
      [
        ['color', 'constant'],
        ['opacity', 'discrete'],
        ['shape', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['shape', 'discrete'],
      ],
      [
        ['color', 'discrete'],
        ['size', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'discrete'],
      ],
      [
        ['color', 'discrete'],
        ['opacity', 'constant'],
      ],
      [
        ['color', 'discrete'],
        ['shape', 'constant'],
      ],
      [
        ['color', 'constant'],
        ['shape', 'discrete'],
      ],
      [
        ['color', 'constant'],
        ['size', 'constant'],
      ],
      [
        ['color', 'constant'],
        ['opacity', 'discrete'],
      ],
      // [
      //   ['color', 'constant'],
      //   ['opacity', 'constant'],
      // ],
      // [
      //   ['color', 'constant'],
      //   ['shape', 'constant'],
      // ],
      [['color', 'discrete']],
      // [['color', 'constant']],
    ],
  ],
  [
    'legendContinuousSize',
    [
      [
        ['color', 'continuous'],
        ['opacity', 'continuous'],
        ['size', 'continuous'],
      ],
      [
        ['color', 'constant'],
        ['opacity', 'continuous'],
        ['size', 'continuous'],
      ],
      [
        ['color', 'continuous'],
        ['size', 'continuous'],
      ],
      [
        ['color', 'constant'],
        ['size', 'continuous'],
      ],
      [
        ['size', 'continuous'],
        ['opacity', 'continuous'],
      ],
      [['size', 'continuous']],
    ],
  ],
  [
    'legendContinuousBlockSize',
    [
      [
        ['color', 'distribution'],
        ['opacity', 'distribution'],
        ['size', 'distribution'],
      ],
      [
        ['color', 'distribution'],
        ['size', 'distribution'],
      ],
    ],
  ],
  [
    'legendContinuousBlock',
    [
      [
        ['color', 'distribution'],
        ['opacity', 'continuous'],
      ],
      [['color', 'distribution']],
    ],
  ],
  [
    'legendContinuous',
    [
      [
        ['color', 'continuous'],
        ['opacity', 'continuous'],
      ],
      [['color', 'continuous']],
      [['opacity', 'continuous']],
    ],
  ],
];
