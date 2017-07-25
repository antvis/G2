const Animate = require('./animate');
const { MatrixUtil } = require('@ali/g');
const { mat3 } = MatrixUtil;

class ScaleXY extends Animate {
  getInitMatrix() {
    const rect = this.rect;
    const center = this.getRectCenter(rect);

    const matrix = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
    mat3.translate(matrix, matrix, [ -1 * center.x, -1 * center.y ]);
    mat3.scale(matrix, matrix, [ 0.01, 0.01 ]);
    mat3.translate(matrix, matrix, [ center.x, center.y ]);

    return matrix;
  }

  getAnimMatrix() {
    const rect = this.rect;
    const center = this.getRectCenter(rect);

    const matrix = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
    mat3.translate(matrix, matrix, [ -1 * center.x, -1 * center.y ]);
    mat3.scale(matrix, matrix, [ 1, 1 ]);
    mat3.translate(matrix, matrix, [ center.x, center.y ]);

    return matrix;
  }
}

module.exports = ScaleXY;
