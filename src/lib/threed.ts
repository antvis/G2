import { Cartesian3D } from '../coordinate';
import { AxisZ } from '../component';
import { Point3D } from '../mark';

export function threedlib() {
  return {
    'coordinate.cartesian3D': Cartesian3D,
    'component.axisZ': AxisZ,
    'mark.point3D': Point3D,
  } as const;
}
