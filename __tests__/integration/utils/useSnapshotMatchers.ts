import {
  toMatchCanvasSnapshot,
  ToMatchCanvasSnapshotOptions,
} from './toMatchCanvasSnapshot';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchCanvasSnapshot(
        dir: string,
        name: string,
        options?: ToMatchCanvasSnapshotOptions,
      ): R;
    }
  }
}

expect.extend({
  toMatchCanvasSnapshot,
});
