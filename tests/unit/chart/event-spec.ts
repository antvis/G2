import { Event, View } from '../../../src';
import { Event as GEvent } from '../../../src/dependents';

// @ts-ignore
const v = {};
const gEvent = new GEvent('test-event', {});

gEvent.x = 1;
gEvent.y = 2;
gEvent.clientX = 3;
gEvent.clientY = 4;
gEvent.target = { target: 2 };

// @ts-ignore
gEvent.domEvent = { event: 3 };

describe('Event', () => {
  it('constructor', () => {
    // @ts-ignore
    const e = new Event(v, gEvent, { data: 1 });

    expect(e.type).toBe('test-event');

    expect(e.x).toBe(1);
    expect(e.y).toBe(2);
    expect(e.clientX).toBe(3);
    expect(e.clientY).toBe(4);

    expect(e.data).toEqual({ data: 1 });
    expect(e.target).toEqual({ target: 2 });
    expect(e.event).toEqual({ event: 3 });

    expect(e.toString()).toBe('[Event (type=test-event)]');
  });
});
