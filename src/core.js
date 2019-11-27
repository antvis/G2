import Scale from '@antv/scale/lib';
import G from './renderer';
import Animate from './animate/animate';
import Chart from './chart/chart';
import Global from './global';
import Shape from './geom/shape/shape';
import Util from './util';

const G2 = {
  // version
  version: Global.version,
  // visual encoding
  Animate,
  Chart,
  Global,
  Scale,
  Shape,
  Util,
  // render engine
  G,
  DomUtil: Util.DomUtil,
  MatrixUtil: Util.MatrixUtil,
  PathUtil: Util.PathUtil,
};

// G2.track = function(enable) {
//   Global.trackable = enable;
// };
// require('./track');
G2.track = () => {
  console.warn('G2 tracks nothing ;-)');
};

// 保证两个版本共存
if (typeof window !== 'undefined') {
  if (window.G2) {
    console.warn(
      `There are multiple versions of G2. Version ${G2.version}'s reference is 'window.G2_3'`
    );
  } else {
    window.G2 = G2;
  }
}

export default G2;
