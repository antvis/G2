import {
  toMatchCanvasSnapshot,
  ToMatchCanvasSnapshotOptions,
} from './toMatchCanvasSnapshot';
import {
  toMatchDOMSnapshot,
  ToMatchDOMSnapshotOptions,
} from './toMatchDOMSnapshot';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchCanvasSnapshot(
        dir: string,
        name: string,
        options?: ToMatchCanvasSnapshotOptions,
      ): R;
      toMatchDOMSnapshot(
        dir: string,
        name: string,
        options?: ToMatchDOMSnapshotOptions,
      ): R;
    }
  }
}

expect.extend({
  toMatchCanvasSnapshot,
  toMatchDOMSnapshot,
});
