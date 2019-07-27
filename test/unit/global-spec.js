const expect = require('chai').expect;
const { Global } = require('../../src/index');
const pkg = require('../../package.json');


describe('Global', () => {
  it('setTheme', () => {
    const myTheme = {
      colors: [ 'red', 'blue', 'yellow' ],
      axis: {
        left: {
          tickLine: {
            length: 5,
            stroke: '#999',
            lineWidth: 1
          }
        }
      }
    };
    Global.setTheme(myTheme);

    expect(myTheme).eqls({
      colors: [ 'red', 'blue', 'yellow' ],
      axis: {
        left: {
          tickLine: {
            length: 5,
            stroke: '#999',
            lineWidth: 1
          }
        }
      }
    });
    expect(Global.colors).eqls([ 'red', 'blue', 'yellow' ]);
    expect(Global.axis.left.tickLine).not.to.be.empty;
  });

  it('version sync', () => {
    expect(Global.version).equal(pkg.version);
  });
});
