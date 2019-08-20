
import Greedy from './util/greedy';
import { LabelType } from '../../interface';

const MAX_TIMES = 100;

function spiralFill(label: LabelType, greedy: Greedy, maxTimes: number = MAX_TIMES) {
  const dt = -1;
  const x = label.attr('x');
  const y = label.attr('y');
  const bbox = label.getBBox();
  const maxDelta = Math.sqrt(bbox.width * bbox.width + bbox.height * bbox.height);
  let dxdy;
  let t = -dt;
  let dx = 0;
  let dy = 0;
  const f = function (t: number) {
    const nt = t * 0.1;
    return [ nt * Math.cos(nt), nt * Math.sin(nt) ];
  };

  if (greedy.hasGap(bbox)) {
    greedy.fillGap(bbox);
    return true;
  }
  let canFill = false;
  let times = 0;
  const accessedCache = {};
  while (Math.min(Math.abs(dx), Math.abs(dy)) < maxDelta && times < maxTimes) {
    dxdy = f(t += dt);
    dx = ~~dxdy[0];
    dy = ~~dxdy[1];
    if ((!dx && !dy) || accessedCache[`${dx}-${dy}`]) {
      continue;
    }
    label.attr({ x: x + dx, y: y + dy });
    if (dx + dy < 0) {
      label.attr('textAlign', 'right');
    }
    times++;
    if (greedy.hasGap(label.getBBox())) {
      greedy.fillGap(label.getBBox());
      canFill = true;
      accessedCache[`${dx}-${dy}`] = true;
      break;
    }
  }
  return canFill;
}

export default function (labels: LabelType[], maxTimes: number = MAX_TIMES) {
  let label;
  const greedy = new Greedy();
  const toBeRemoved = [];
  for (let i = 0; i < labels.length; i++) {
    label = labels[i];
    if (!spiralFill(label, greedy, maxTimes)) {
      toBeRemoved.push(label);
    }
  }
  for (let i = 0; i < toBeRemoved.length; i++) {
    toBeRemoved[i].remove();
  }
}
