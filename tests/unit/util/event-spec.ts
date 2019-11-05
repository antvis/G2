import { getEventName } from '../../../src/util/event';

describe('util event', () => {
  it('getEventName', () => {
    expect(getEventName('click', 'line')).toEqual('line:click');
    expect(getEventName('click', '')).toEqual('click');
    expect(getEventName('click')).toEqual('click');
    expect(getEventName('interval:click', 'line')).toEqual('interval:click');
  });
});
