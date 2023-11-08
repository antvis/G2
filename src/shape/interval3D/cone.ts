import { MeshLambertMaterial, ConeGeometry, Mesh } from '@antv/g-plugin-3d';
import { applyStyle, getOrigin, toOpacityKey } from '../utils';
import { ShapeComponent as SC, Vector3 } from '../../runtime';
import { select } from '../../utils/selection';

export type ConeOptions = Record<string, any>;

export const Cone: SC<ConeOptions> = (options, context) => {
  // Render border only when colorAttribute is stroke.
  const { ...style } = options;

  if (!context.coneGeometry) {
    const renderer = context.canvas.getConfig().renderer;
    const plugin = renderer.getPlugin('device-renderer');
    const device = plugin.getDevice();
    // create a cone geometry
    context.coneGeometry = new ConeGeometry(device, {
      peakRadius: 0,
      baseRadius: 0.5,
      height: 1,
    });
    // create a material with Lambert lighting model
    context.coneMaterial = new MeshLambertMaterial(device);
  }

  return (_points, value, defaults) => {
    const points = _points as unknown as Vector3[];
    const { color: defaultColor } = defaults;
    const { color = defaultColor, transform, opacity } = value;
    const [cx, cy, cz] = getOrigin(points);

    const width = Math.abs(points[1][0] - points[0][0]);
    const height = Math.abs(points[1][1] - points[0][1]);
    const depth = Math.abs(points[1][2] - points[0][2]);

    const cone = new Mesh({
      style: {
        x: cx,
        y: cy,
        z: cz,
        geometry: context.coneGeometry,
        material: context.coneMaterial,
      },
    });
    cone.setOrigin(0, 0, 0);
    cone.scale([width, height, depth]);

    const selection = select(cone)
      .call(applyStyle, defaults)
      .style('fill', color)
      .style('transform', transform)
      .style(toOpacityKey(options), opacity)
      .call(applyStyle, style)
      .node();
    return selection;
  };
};

Cone.props = {
  defaultMarker: 'cone',
};
