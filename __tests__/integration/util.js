const fs = require('fs');
const pixelmatch = require('pixelmatch');
const PNG = require('pngjs').PNG;

const sleep = (n) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, n);
  });
};

/**
 * diff between PNGs
 */
const diff = (src, target) => {
  const img1 = PNG.sync.read(fs.readFileSync(src));
  const img2 = PNG.sync.read(fs.readFileSync(target));
  const { width, height } = img1;
  return pixelmatch(img1.data, img2.data, null, width, height, {
    threshold: 0.1,
  });
};

/**
 * create PNG with rawdata
 * @see https://github.com/lukeapage/pngjs/blob/master/examples/newfile.js
 */
const createPNGFromRawdata = async (target, width, height, data) => {
  let newfile = new PNG({ width, height });
  for (let y = 0; y < newfile.height; y++) {
    for (let x = 0; x < newfile.width; x++) {
      let idx = (newfile.width * y + x) << 2;
      newfile.data[idx] = data[idx];
      newfile.data[idx + 1] = data[idx + 1];
      newfile.data[idx + 2] = data[idx + 2];
      newfile.data[idx + 3] = data[idx + 3];
    }
  }

  return new Promise((resolve) => {
    newfile
      .pack()
      .pipe(fs.createWriteStream(target))
      .on('finish', function () {
        resolve(newfile);
      });
  });
};

module.exports = { sleep, diff, createPNGFromRawdata };
