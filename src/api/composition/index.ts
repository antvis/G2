import { defineProps, nodeProps } from '../props';
import { View } from './view';
import { SpaceLayer } from './spaceLayer';
import { SpaceFlex } from './spaceFlex';
import { FacetRect } from './facetRect';
import { FacetCircle } from './facetCircle';
import { RepeatMatrix } from './repeatMatrix';
import { TimingKeyframe } from './timingKeyframe';

export const composition = {
  view: View,
  spaceLayer: SpaceLayer,
  spaceFlex: SpaceFlex,
  facetRect: FacetRect,
  facetCircle: FacetCircle,
  repeatMatrix: RepeatMatrix,
  timingKeyframe: TimingKeyframe,
};

export interface Composition {
  view(): View;
  spaceLayer(): SpaceLayer;
  spaceFlex(): SpaceFlex;
  facetRect(): FacetRect;
  facetCircle(): FacetCircle;
  repeatMatrix(): RepeatMatrix;
  timingKeyframe(): TimingKeyframe;
}

export {
  View,
  SpaceLayer,
  SpaceFlex,
  FacetRect,
  FacetCircle,
  RepeatMatrix,
  TimingKeyframe,
};

/**
 * Define composition node api for composition node dynamically,
 * which can avoid circular dependency.
 * @todo Remove view as composition.
 */
for (const Ctor of Object.values(composition)) {
  defineProps(nodeProps(composition))(Ctor);
}
