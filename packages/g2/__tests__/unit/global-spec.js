import { expect } from 'chai';
import Global from '../../src/global';
import Theme from '../../src/theme/default';
import { registerTheme } from '../../src/theme';
import * as pkg from '../../package.json';

describe('Global', () => {
  it('setTheme(object)', () => {
    const myTheme = {
      colors: [ 'red', 'blue', 'yellow' ],
      axis: {
        left: {
          tickLine: {
            length: 5,
            stroke: '#999',
            lineWidth: 1,
          },
        },
      },
    };
    Global.setTheme(myTheme);

    expect(myTheme).eqls({
      colors: [ 'red', 'blue', 'yellow' ],
      axis: {
        left: {
          tickLine: {
            length: 5,
            stroke: '#999',
            lineWidth: 1,
          },
        },
      },
    });
    expect(Global.theme.colors).eqls([ 'red', 'blue', 'yellow' ]);
    expect(Global.theme.axis.left.tickLine).not.to.be.empty;
  });

  it('setTheme(string)', () => {
    registerTheme('test', {
      colors: [ '#1890ff' ],
    });

    Global.setTheme('test');
    expect(Global.theme.colors).eqls([ '#1890ff' ]);

    Global.setTheme('new'); // 不存在的主题名
    expect(Global.theme.colors).eqls(Theme.colors);
  });

  it('version sync', () => {
    expect(Global.version).equal(pkg.version);
  });
});
