import { defineProps, nodeProps } from '../props';
import { CompositionNode } from './base';
import { View } from './view';
import { SpaceLayer } from './spaceLayer';
import { SpaceFlex } from './spaceFlex';
import { FacetRect } from './facetRect';
import { FacetCircle } from './facetCircle';
import { RepeatMatrix } from './repeatMatrix';
import { TimingKeyframe } from './timingKeyframe';
import { GeoView } from './geoView';
import { GeoPath } from './geoPath';

export const composition = {
  view: View,
  spaceLayer: SpaceLayer,
  spaceFlex: SpaceFlex,
  facetRect: FacetRect,
  facetCircle: FacetCircle,
  repeatMatrix: RepeatMatrix,
  timingKeyframe: TimingKeyframe,
  geoView: GeoView,
  geoPath: GeoPath,
};

export interface Composition {
  view(): View;
  spaceLayer(): SpaceLayer;
  spaceFlex(): SpaceFlex;
  facetRect(): FacetRect;
  facetCircle(): FacetCircle;
  repeatMatrix(): RepeatMatrix;
  timingKeyframe(): TimingKeyframe;
  geoView(): GeoView;
  geoPath(): GeoPath;
}

export {
  CompositionNode,
  View,
  SpaceLayer,
  SpaceFlex,
  FacetRect,
  FacetCircle,
  RepeatMatrix,
  TimingKeyframe,
  GeoView,
  GeoPath,
};

/**
 * Define composition node api for composition node dynamically,
 * which can avoid circular dependency.
 * @todo Remove view as composition.
 */
for (const Ctor of Object.values(composition)) {
  defineProps(nodeProps(composition))(Ctor);
}
