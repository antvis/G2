/**
 * Simplified from https://github.com/zertosh/invariant.
 */

export enum LEVEL {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'log',
}

const BRAND = 'AntV_G2';

/**
 * 获取错误消息
 * @param format
 * @param args
 */
function getMessage(format: string, ...args: any[]): string {
  let argIndex = 0;
  return `${BRAND}: ${format.replace(
    /%s/g,
    (): string => `${args[argIndex++]}`,
  )}`;
}

/**
 * invariant error
 * @param condition
 * @param format
 * @param args
 */
export function invariant(
  condition: boolean,
  format: string,
  ...args: any[]
): void {
  if (!condition) {
    const error = new Error(getMessage(format, ...args));
    error.name = BRAND;
    // error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

/**
 * 打印语句
 * @param level
 * @param condition
 * @param format
 * @param args
 */
export function log(
  level: LEVEL,
  condition: boolean,
  format,
  ...args: any[]
): void {
  if (!condition) {
    console[level](getMessage(format, ...args));
  }
}
