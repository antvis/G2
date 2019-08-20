import { Facet } from './base';
import View from '../plot/view';
import { Datum, FacetData } from './interface';

/* 一个自定义分面的示例 */
export class FacetSample extends Facet {

  constructor(view: View, cfg: any) {
    super(view, cfg);
  }

  protected generateFacets(data: Datum[]): FacetData[] {
    // your facet algorithm
    return [];
  }

  // override render
  public render() {
    super.render();
    // do what you want to add into view
  }

  // override clear
  public clear() {
    super.clear();
    // do what you want to add into view
  }

  // override destroy
  public destroy() {
    super.destroy();
    // do what you want to add into view
  }

  // implements
  protected renderTitle(): void {
    // your title component and style
  }

  // implements
  protected renderAxis(): void {
    // your axis component and style
  }
}
