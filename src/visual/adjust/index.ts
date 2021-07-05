/**
 * Adjust 相关模块，没有人力梳理，暂时直接使用旧的模块，性能，功能上无考量！
 */
import { getAdjust, StackCfg, DodgeCfg, AdjustCfg } from '@antv/adjust';

const Dodge = getAdjust('dodge');
const Jitter = getAdjust('jitter');
const Stack = getAdjust('stack');
const Symmetric = getAdjust('symmetric');

type JitterCfg = AdjustCfg;
type SymmetricCfg = AdjustCfg;

export { Dodge, Jitter, Stack, Symmetric };
export { DodgeCfg, JitterCfg, StackCfg, SymmetricCfg };

export { Identity } from './identity';
