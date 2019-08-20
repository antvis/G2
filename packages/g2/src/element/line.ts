/**
 * @description Line，有序的线图
 */

import Path from './path';
import { DataPointType } from '../interface';

export default class Line extends Path {
  constructor(cfg: DataPointType) {
    super({
      type: 'line',
      sortable: true,
      ...cfg,
    });
  }
}
