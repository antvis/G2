import { Attribute, AttributeCfg } from "./attribute";
import { isArray, isNil } from "@antv/util";

export type Value = number | string;
export type MappingValue = Value[] | Value;

export class Position extends Attribute {
  constructor(config: AttributeCfg) {
    super(config);

    this.fields = ["x", "y"];
    this.type = "position";
  }

  public mapping(...params: MappingValue[]) {
    // 取 params 的前两项
    const [x, y] = params;

    // 有一个为空则返回 []
    if (isNil(x) || isNil(y)) {
      return [];
    }

    // 对两项进行 map
    const mappedX = this.mapValue(x, "x");
    const mappedY = this.mapValue(y, "y");

    return [mappedX, mappedY];
  }

  private mapValue(val: MappingValue, coordinate: "x" | "y") {
    const scale = coordinate === "x" ? this.scales[0] : this.scales[1];
    const v = val;
    if (isArray(v)) {
      const len = v.length;
      let mappedArr = new Array(len);
      for (let i = 0; i < len; i++) {
        mappedArr[i] = scale.map(v[i]);
      }
      return mappedArr;
    } else {
      return scale.map(v);
    }
  }
}
