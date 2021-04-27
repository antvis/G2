import { Position } from "../../../../src/visual/attribute";
import { Linear, Ordinal } from "@antv/scale";

describe("attribute position", () => {
  test("value", () => {
    expect(Position).toBeDefined();
  });

  test("callback", () => {
    expect(Position).toBeDefined();
  });

  test("test position", () => {
    const scaleCat = new Ordinal({
      domain: ["a", "b", "c", "d", "e"]
    });

    const scaleLinear = new Linear({
      domain: [0, 100]
    });

    const posAttr = new Position({
      scales: [scaleCat, scaleLinear],
      fields: ["name", "age"]
    });


  });
});
