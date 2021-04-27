import { Position } from "../../../../src/visual/attribute";
import { Linear, Ordinal } from "@antv/scale";

describe("attribute position", () => {
  const scaleCat = new Ordinal({
    domain: ["Jim", "Tom", "Tony", "Frank"],
    range: [1, 2, 3, 4]
  });

  const scaleLinear = new Linear({
    domain: [0, 10]
  });

  const posAttr = new Position({
    scales: [scaleCat, scaleLinear],
    fields: ["x", "y"]
  });

  const mapper = posAttr.mapping.bind(posAttr);

  test("map for (x, y)", () => {
    expect(mapper("Jim", 3)).toStrictEqual([1, 0.3]);
    expect(mapper("Tom", 6)).toStrictEqual([2, 0.6]);
    expect(mapper("Tony", 8)).toStrictEqual([3, 0.8]);
    expect(mapper("Frank", 10)).toStrictEqual([4, 1.0]);
  });

  test("map for (x, [y1, y2])", () => {
    expect(mapper("Jim", [4, 7])).toStrictEqual([1, [0.4, 0.7]]);
  });

  test("map for ([x1, x2], y)", () => {
    expect(mapper(["Jim", "Tony"], 10)).toStrictEqual([[1, 3], 1]);
  });

  test("map for ([x1, x2], [y1, y2])", () => {
    const res = mapper(["Jim", "Tom", "Tony"], [4, 6, 10]);
    expect(res).toStrictEqual([
      [1, 2, 3],
      [0.4, 0.6, 1]
    ]);
  });

  test("the args is small than 2", () => {
    expect(mapper(undefined, undefined)).toStrictEqual([]);
    expect(mapper(undefined)).toStrictEqual([]);
    expect(mapper()).toStrictEqual([]);
  });
});
