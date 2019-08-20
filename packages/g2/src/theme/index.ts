import { registerTheme } from './factory';
import DefaultTheme from './default';

registerTheme('default', DefaultTheme); // 注册默认的主题

export * from './factory';
