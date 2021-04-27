import { Position } from "../../../../src/visual/attribute";
import { Linear, Ordinal } from "@antv/scale";

describe("attribute position", () => {
  const scaleCat = new Ordinal({
    domain: ["Jim", "Tom", "Tony", "Frank"],
    range: [20, 21, 20, 24]
  });

  const scaleLinear = new Linear({
    domain: [0, 10]
  });

  const posAttr = new Position({
    scales: [scaleCat, scaleLinear],
    fields: ["name", "age"]
  });

  const mapper = posAttr.mapping.bind(posAttr);

  test("map for (x, y)", () => {
    expect(mapper("Jim", 3)).toStrictEqual([20, 0.3]);
    expect(mapper("Tom", 6)).toStrictEqual([21, 0.6]);
    expect(mapper("Tony", 8)).toStrictEqual([20, 0.8]);
    expect(mapper("Frank", 10)).toStrictEqual([24, 1.0]);
  });

  test("map for (x, [y1, y2])", () => {
    expect(mapper("Jim", [4, 7])).toStrictEqual([20, [0.4, 0.7]]);
  });

  test("map for ([x1, x2], y)", () => {
    expect(mapper(["Jim", "Tony"], 10)).toStrictEqual([[20, 20], 1]);
  });

  test("map for ([x1, x2], [y1, y2])", () => {
    const res = mapper(["Jim", "Tom", "Tony"], [4, 6, 10]);
    expect(res).toStrictEqual([
      [20, 21, 20],
      [0.4, 0.6, 1]
    ]);
  });
});
