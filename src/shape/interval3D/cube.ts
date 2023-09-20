import { MeshLambertMaterial, CubeGeometry, Mesh } from '@antv/g-plugin-3d';
import { applyStyle, getOrigin, toOpacityKey } from '../utils';
import { ShapeComponent as SC, Vector3 } from '../../runtime';
import { select } from '../../utils/selection';

export type CubeOptions = Record<string, any>;

/**
 * @see https://g.antv.antgroup.com/api/3d/geometry#cubegeometry
 */
export const Cube: SC<CubeOptions> = (options, context) => {
  // Render border only when colorAttribute is stroke.
  const { ...style } = options;

  // @ts-ignore
  if (!context.cubeGeometry) {
    const renderer = context.canvas.getConfig().renderer;
    const plugin = renderer.getPlugin('device-renderer');
    const device = plugin.getDevice();
    // create a cube geometry
    // @ts-ignore
    context.cubeGeometry = new CubeGeometry(device, {
      width: 1,
      height: 1,
      depth: 1,
    });
    // create a material with Lambert lighting model
    // @ts-ignore
    context.cubeMaterial = new MeshLambertMaterial(device);
  }

  return (_points, value, defaults) => {
    const points = _points as unknown as Vector3[];
    const { color: defaultColor } = defaults;
    const { color = defaultColor, transform, opacity } = value;
    const [cx, cy, cz] = getOrigin(points);

    const width = Math.abs(points[1][0] - points[0][0]);
    const height = Math.abs(points[1][1] - points[0][1]);
    const depth = Math.abs(points[1][2] - points[0][2]);

    const cube = new Mesh({
      style: {
        x: cx,
        y: cy,
        z: cz,
        // @ts-ignore
        geometry: context.cubeGeometry,
        // @ts-ignore
        material: context.cubeMaterial,
      },
    });
    cube.setOrigin(0, 0, 0);
    cube.scale([width, height, depth]);

    const selection = select(cube)
      .call(applyStyle, defaults)
      .style('fill', color)
      .style('transform', transform)
      .style(toOpacityKey(options), opacity)
      .call(applyStyle, style)
      .node();
    return selection;
  };
};

Cube.props = {
  defaultMarker: 'cube',
};
