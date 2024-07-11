/*
 * Synchronous version of d3-cloud
 * Word cloud layout by Jason Davies, https://www.jasondavies.com/wordcloud/
 * Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf
 */
interface Item {
  value: number;
  text: string;
  sprite: boolean;
}

const cloudRadians = Math.PI / 180,
  cw = (1 << 11) >> 5,
  ch = 1 << 11;

function cloudText(d: Item) {
  return d.text;
}

function cloudFont() {
  return 'serif';
}

function cloudFontNormal() {
  return 'normal';
}

function cloudFontSize(d: Item) {
  return d.value;
}

function cloudRotate() {
  return ~~(Math.random() * 2) * 90;
}

function cloudPadding() {
  return 1;
}

function cloudDispatch() {
  return;
}
// Fetches a monochrome sprite bitmap for the specified text.
// Load in batches for speed.
function cloudSprite(contextAndRatio, d, data, di) {
  if (d.sprite) return;
  const c = contextAndRatio.context,
    ratio = contextAndRatio.ratio;

  c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
  let x = 0,
    y = 0,
    maxh = 0;
  const n = data.length;
  --di;
  while (++di < n) {
    d = data[di];
    c.save();
    c.font =
      d.style +
      ' ' +
      d.weight +
      ' ' +
      ~~((d.size + 1) / ratio) +
      'px ' +
      d.font;
    let w = c.measureText(d.text + 'm').width * ratio,
      h = d.size << 1;
    if (d.rotate) {
      const sr = Math.sin(d.rotate * cloudRadians),
        cr = Math.cos(d.rotate * cloudRadians),
        wcr = w * cr,
        wsr = w * sr,
        hcr = h * cr,
        hsr = h * sr;
      w =
        ((Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f) >> 5) << 5;
      h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
    } else {
      w = ((w + 0x1f) >> 5) << 5;
    }
    if (h > maxh) maxh = h;
    if (x + w >= cw << 5) {
      x = 0;
      y += maxh;
      maxh = 0;
    }
    if (y + h >= ch) break;
    c.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
    if (d.rotate) c.rotate(d.rotate * cloudRadians);
    c.fillText(d.text, 0, 0);
    if (d.padding) {
      c.lineWidth = 2 * d.padding;
      c.strokeText(d.text, 0, 0);
    }
    c.restore();
    d.width = w;
    d.height = h;
    d.xoff = x;
    d.yoff = y;
    d.x1 = w >> 1;
    d.y1 = h >> 1;
    d.x0 = -d.x1;
    d.y0 = -d.y1;
    d.hasText = true;
    x += w;
  }
  const pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
    sprite = [];
  while (--di >= 0) {
    d = data[di];
    if (!d.hasText) continue;
    const w = d.width,
      w32 = w >> 5;
    let h = d.y1 - d.y0;
    // Zero the buffer
    for (let i = 0; i < h * w32; i++) sprite[i] = 0;
    x = d.xoff;
    if (x == null) return;
    y = d.yoff;
    let seen = 0,
      seenRow = -1;
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        const k = w32 * j + (i >> 5),
          m = pixels[((y + j) * (cw << 5) + (x + i)) << 2]
            ? 1 << (31 - (i % 32))
            : 0;
        sprite[k] |= m;
        seen |= m;
      }
      if (seen) seenRow = j;
      else {
        d.y0++;
        h--;
        j--;
        y++;
      }
    }
    d.y1 = d.y0 + seenRow;
    d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
  }
}

// Use mask-based collision detection.
function cloudCollide(tag, board, sw) {
  sw >>= 5;
  const sprite = tag.sprite,
    w = tag.width >> 5,
    lx = tag.x - (w << 4),
    sx = lx & 0x7f,
    msx = 32 - sx,
    h = tag.y1 - tag.y0;
  let x = (tag.y + tag.y0) * sw + (lx >> 5),
    last;
  for (let j = 0; j < h; j++) {
    last = 0;
    for (let i = 0; i <= w; i++) {
      if (
        ((last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0)) &
        board[x + i]
      )
        return true;
    }
    x += sw;
  }
  return false;
}

function cloudBounds(bounds, d) {
  const b0 = bounds[0],
    b1 = bounds[1];
  if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
  if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
  if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
  if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
}

function collideRects(a, b) {
  return (
    a.x + a.x1 > b[0].x &&
    a.x + a.x0 < b[1].x &&
    a.y + a.y1 > b[0].y &&
    a.y + a.y0 < b[1].y
  );
}

function archimedeanSpiral(size) {
  const e = size[0] / size[1];
  return function (t) {
    return [e * (t *= 0.1) * Math.cos(t), t * Math.sin(t)];
  };
}

function rectangularSpiral(size) {
  const dy = 4,
    dx = (dy * size[0]) / size[1];
  let x = 0,
    y = 0;
  return function (t) {
    const sign = t < 0 ? -1 : 1;
    // See triangular numbers: T_n = n * (n + 1) / 2.
    switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
      case 0:
        x += dx;
        break;
      case 1:
        y += dy;
        break;
      case 2:
        x -= dx;
        break;
      default:
        y -= dy;
        break;
    }
    return [x, y];
  };
}

// TODO reuse arrays?
function zeroArray(n) {
  const a = [];
  let i = -1;
  while (++i < n) a[i] = 0;
  return a;
}

function cloudCanvas() {
  return document.createElement('canvas');
}

function functor(d) {
  return typeof d === 'function'
    ? d
    : function () {
        return d;
      };
}

const spirals = {
  archimedean: archimedeanSpiral,
  rectangular: rectangularSpiral,
};

export function tagCloud() {
  let size = [256, 256],
    text = cloudText,
    font = cloudFont,
    fontSize = cloudFontSize,
    fontWeight = cloudFontNormal,
    rotate = cloudRotate,
    padding = cloudPadding,
    spiral = archimedeanSpiral,
    random = Math.random,
    event = cloudDispatch,
    words = [],
    timer = null,
    timeInterval = Infinity,
    canvas = cloudCanvas;

  const fontStyle = cloudFontNormal;
  const cloud: any = {};

  cloud.start = function () {
    const [width, height] = size;
    const contextAndRatio = getContext(canvas()),
      board = cloud.board ? cloud.board : zeroArray((size[0] >> 5) * size[1]),
      n = words.length,
      tags = [],
      data = words
        .map(function (d, i, data) {
          d.text = text.call(this, d, i, data);
          d.font = font.call(this, d, i, data);
          d.style = fontStyle.call(this, d, i, data);
          d.weight = fontWeight.call(this, d, i, data);
          d.rotate = rotate.call(this, d, i, data);
          d.size = ~~fontSize.call(this, d, i, data);
          d.padding = padding.call(this, d, i, data);
          return d;
        })
        .sort(function (a, b) {
          return b.size - a.size;
        });
    let i = -1,
      bounds = !cloud.board
        ? undefined
        : [
            {
              x: 0,
              y: 0,
            },
            {
              x: width,
              y: height,
            },
          ];

    if (timer) clearInterval(timer);
    timer = setInterval(step, 0);
    step();

    function step() {
      const start = Date.now();
      while (Date.now() - start < timeInterval && ++i < n) {
        const d = data[i];
        d.x = (width * (random() + 0.5)) >> 1;
        d.y = (height * (random() + 0.5)) >> 1;
        cloudSprite(contextAndRatio, d, data, i);
        if (d.hasText && place(board, d, bounds)) {
          event.call(null, 'word', { cloud, word: d });
          tags.push(d);
          if (bounds) {
            if (!cloud.hasImage) {
              // update bounds if image mask not set
              cloudBounds(bounds, d);
            }
          } else {
            bounds = [
              { x: d.x + d.x0, y: d.y + d.y0 },
              { x: d.x + d.x1, y: d.y + d.y1 },
            ];
          }
          // Temporary hack
          d.x -= size[0] >> 1;
          d.y -= size[1] >> 1;
        }
      }
      cloud._tags = tags;
      cloud._bounds = bounds;

      if (i >= n) {
        cloud.stop();
        event.call(null, 'end', { cloud, words: tags, bounds });
      }
    }

    return cloud;
  };

  cloud.stop = function () {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    return cloud;
  };

  function getContext(canvas: HTMLCanvasElement) {
    canvas.width = canvas.height = 1;
    const ratio = Math.sqrt(
      canvas.getContext('2d')!.getImageData(0, 0, 1, 1).data.length >> 2,
    );
    canvas.width = (cw << 5) / ratio;
    canvas.height = ch / ratio;

    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.fillStyle = context.strokeStyle = 'red';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    return { context, ratio };
  }

  function place(board, tag, bounds) {
    // const perimeter = [{ x: 0, y: 0 }, { x: size[0], y: size[1] }],
    const startX = tag.x,
      startY = tag.y,
      maxDelta = Math.sqrt(size[0] * size[0] + size[1] * size[1]),
      s = spiral(size),
      dt = random() < 0.5 ? 1 : -1;
    let dxdy,
      t = -dt,
      dx,
      dy;

    while ((dxdy = s((t += dt)))) {
      dx = ~~dxdy[0];
      dy = ~~dxdy[1];

      if (Math.min(Math.abs(dx), Math.abs(dy)) >= maxDelta) break;

      tag.x = startX + dx;
      tag.y = startY + dy;

      if (
        tag.x + tag.x0 < 0 ||
        tag.y + tag.y0 < 0 ||
        tag.x + tag.x1 > size[0] ||
        tag.y + tag.y1 > size[1]
      )
        continue;
      // TODO only check for collisions within current bounds.
      if (!bounds || !cloudCollide(tag, board, size[0])) {
        if (!bounds || collideRects(tag, bounds)) {
          const sprite = tag.sprite,
            w = tag.width >> 5,
            sw = size[0] >> 5,
            lx = tag.x - (w << 4),
            sx = lx & 0x7f,
            msx = 32 - sx,
            h = tag.y1 - tag.y0;
          let last,
            x = (tag.y + tag.y0) * sw + (lx >> 5);
          for (let j = 0; j < h; j++) {
            last = 0;
            for (let i = 0; i <= w; i++) {
              board[x + i] |=
                (last << msx) | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
            }
            x += sw;
          }
          delete tag.sprite;
          return true;
        }
      }
    }
    return false;
  }

  cloud.createMask = (img: HTMLImageElement) => {
    const can: HTMLCanvasElement = document.createElement('canvas');
    const [width, height] = size;

    // 当 width 或 height 为 0 时，调用 cxt.getImageData 会报错
    if (!width || !height) {
      return;
    }
    const w32 = width >> 5;
    const board = zeroArray((width >> 5) * height);
    can.width = width;
    can.height = height;
    const cxt = can.getContext('2d') as CanvasRenderingContext2D;
    cxt.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
    const imageData = cxt.getImageData(0, 0, width, height).data;
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        const k = w32 * j + (i >> 5);
        const tmp = (j * width + i) << 2;
        const flag =
          imageData[tmp] >= 250 &&
          imageData[tmp + 1] >= 250 &&
          imageData[tmp + 2] >= 250;
        const m = flag ? 1 << (31 - (i % 32)) : 0;
        board[k] |= m;
      }
    }
    cloud.board = board;
    cloud.hasImage = true;
  };

  cloud.timeInterval = function (_) {
    timeInterval = _ == null ? Infinity : _;
  };

  cloud.words = function (_) {
    words = _;
  };

  cloud.size = function (_ = []) {
    size = [+_[0], +_[1]];
  };

  cloud.text = function (_) {
    text = functor(_);
  };

  cloud.font = function (_) {
    font = functor(_);
  };

  cloud.fontWeight = function (_) {
    fontWeight = functor(_);
  };

  cloud.rotate = function (_) {
    rotate = functor(_);
  };

  cloud.canvas = function (_) {
    canvas = functor(_);
  };

  cloud.spiral = function (_) {
    spiral = spirals[_] || _;
  };

  cloud.fontSize = function (_) {
    fontSize = functor(_);
  };

  cloud.padding = function (_) {
    padding = functor(_);
  };

  cloud.random = function (_) {
    random = functor(_);
  };

  cloud.on = function (_) {
    event = functor(_);
  };

  return cloud;
}
