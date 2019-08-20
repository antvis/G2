import * as _ from '@antv/util';
import { BBox } from '@antv/g';

interface GreedyCfg {
  readonly xGap?: number;
  readonly yGap?: number;
}

export default class Greedy {
  private bitmap: {
    [key: number] : {
      [key: number] : boolean;
    };
  } = {};
  readonly xGap: number = 1;
  readonly yGap: number = 8; // optimizing for text overlapping detection: use a min text height as gap

  constructor(cfg?: GreedyCfg) {
    if (cfg) {
      _.mix(this, cfg);
    }
  }

  public hasGap(bbox: BBox): boolean {
    let hasGap = true;
    const bitmap = this.bitmap;
    const minX = Math.round(bbox.minX);
    const maxX = Math.round(bbox.maxX);
    const minY = Math.round(bbox.minY);
    const maxY = Math.round(bbox.maxY);
    for (let i = minX; i <= maxX; i += 1) {
      if (!bitmap[i]) {
        bitmap[i] = {};
        continue;
      }
      if (i === minX || i === maxX) {
        for (let j = minY; j <= maxY; j++) {
          if (bitmap[i][j]) {
            hasGap = false;
            break;
          }
        }
      } else {
        if (bitmap[i][minY] || bitmap[i][maxY]) {
          hasGap = false;
          break;
        }
      }
    }
    return hasGap;
  }

  public fillGap(bbox: BBox): void {
    const bitmap = this.bitmap;
    const minX = Math.round(bbox.minX);
    const maxX = Math.round(bbox.maxX);
    const minY = Math.round(bbox.minY);
    const maxY = Math.round(bbox.maxY);
    // filling grid
    for (let i = minX; i <= maxX; i += 1) {
      if (!bitmap[i]) {
        bitmap[i] = {};
      }
    }
    for (let i = minX; i <= maxX; i += this.xGap) {
      for (let j = minY; j <= maxY; j += this.yGap) {
        bitmap[i][j] = true;
      }
      bitmap[i][maxY] = true;
    }

    // filling y edges
    if (this.yGap !== 1) {
      for (let i = minY; i <= maxY; i += 1) {
        bitmap[minX][i] = true;
        bitmap[maxX][i] = true;
      }
    }

    // filling x edges
    if (this.xGap !== 1) {
      for (let i = minX; i <= maxX; i += 1) {
        bitmap[i][minY] = true;
        bitmap[i][maxY] = true;
      }
    }
  }

  public destroy(): void {
    this.bitmap = {};
  }
}
