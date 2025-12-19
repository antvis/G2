import { G2Mark } from './types/options';

/**
 * Default interaction rule configuration.
 */
export type DefaultInteractionRule = {
  /** Mark type to match (e.g., 'interval', 'line', 'point') */
  markType: string;
  /** Coordinate type to match (e.g., 'theta', 'polar', undefined for cartesian) */
  coordinateType?: string;
  /** Interaction name to apply */
  interaction: string;
  /** Interaction configuration (true for default, or custom config object) */
  config: boolean | Record<string, any>;
};

/**
 * Default interaction rules configuration.
 * Each rule defines conditions (mark type, coordinate type) and the interaction to enable.
 *
 * @example
 * // Add a new rule for bar chart highlight
 * {
 *   markType: 'interval',
 *   coordinateType: undefined,
 *   interaction: 'elementHighlight',
 *   config: true,
 * }
 */
export const DEFAULT_INTERACTION_RULES: DefaultInteractionRule[] = [
  {
    // Pie/Donut charts: interval mark + theta coordinate
    markType: 'interval',
    coordinateType: 'theta',
    interaction: 'elementHoverScale',
    config: true,
  },
  {
    // Bar charts: interval mark without coordinate transform
    markType: 'interval',
    coordinateType: undefined,
    interaction: 'elementHighlight',
    config: {
      region: true,
      background: true,
    },
  },
];

/**
 * Infer default interactions for marks based on their type and coordinate.
 * This function applies configured rules to determine which interactions should be
 * enabled by default, while respecting user's explicit configurations.
 *
 * @param marks - Array of marks to process
 * @param coordinate - The final coordinate configuration (after bubbling)
 * @returns Array of inferred interaction configurations for each mark
 */
export function inferDefaultInteractions(
  marks: G2Mark[],
  coordinate: Record<string, any>,
): Record<string, any>[] {
  const coordinateType = coordinate.type;

  return marks.map((mark) => {
    const markType = typeof mark.type === 'string' ? mark.type : 'unknown';
    const markInteraction = mark.interaction || {};

    // Start with user's configuration (highest priority)
    const inferredInteraction = { ...markInteraction };

    for (const rule of DEFAULT_INTERACTION_RULES) {
      const {
        markType: ruleMarkType,
        coordinateType: ruleCoordinateType,
        interaction,
        config,
      } = rule;

      // Check if rule matches current mark
      if (markType === ruleMarkType && coordinateType === ruleCoordinateType) {
        // Only add if user hasn't explicitly configured this interaction
        // Using === undefined ensures user can set false to disable default
        if (inferredInteraction[interaction] === undefined) {
          inferredInteraction[interaction] = config;
        }
      }
    }

    return inferredInteraction;
  });
}
