const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Polygon = require('../../../../src/geom/shape/polygon');
const Coord = require('@antv/coord/lib/');

const div = document.createElement('div');
div.id = 'cspolygon';
document.body.appendChild(div);

const coord = new Coord.Cartesian({
  start: {
    x: 0,
    y: 500
  },
  end: {
    x: 500,
    y: 0
  }
});

const canvas = new Canvas({
  containerId: 'cspolygon',
  width: 500,
  height: 500
});

describe('polygon shapes', () => {
  Polygon._coord = coord;
  describe('default', () => {
    it('default shape type', () => {
      expect(Polygon.defaultShapeType).equal('polygon');
    });
  });

  describe('polygon', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'polygon';
      const points = Polygon.getShapePoints(type, {
        x: [ 0.1, 0.3, 0.3, 0.4 ],
        y: [ 0.2, 0.5, 0.12, 0.88 ]
      });
      expect(points[0].x).eql(0.1);
      expect(points[0].y).eql(0.2);
      expect(points[1].x).eql(0.3);
      expect(points[1].y).eql(0.5);
      expect(points[2].x).eql(0.3);
      expect(points[2].y).eql(0.12);
      expect(points[3].x).eql(0.4);
      expect(points[3].y).eql(0.88);
      const shape = Polygon.drawShape(type, {
        points,
        color: 'red'
      }, canvas);
      expect(shape.attr('fill')).eql('red');
      expect(shape.attr('path').length).eql(6);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
      expect(shape.attr('path')[3].length).eql(3);
      expect(shape.attr('path')[4].length).eql(3);
      expect(shape.attr('path')[5].length).eql(1);
    });
    it('getMarkerCfg', () => {
      const markerCfg = Polygon.getMarkerCfg('polygon', {
        color: '#f80'
      });
      expect(markerCfg.symbol).eql('square');
    });
    // xit('getActiveCfg', function() {
    //   const activeCfg = Polygon.getActiveCfg('polygon');
    //
    //   expect(activeCfg).eql({
    //     fill: '#fff',
    //     fillOpacity: 0.3
    //   });
    // });
  });

  describe('hollow', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'hollow';
      const points = Polygon.getShapePoints(type, {
        x: [ 0.1, 0.3, 0.3, 0.4, 0.1 ],
        y: [ 0.2, 0.5, 0.12, 0.88, 0.2 ]
      });
      expect(points[0].x).eql(0.1);
      expect(points[0].y).eql(0.2);
      expect(points[1].x).eql(0.3);
      expect(points[1].y).eql(0.5);
      expect(points[2].x).eql(0.3);
      expect(points[2].y).eql(0.12);
      expect(points[3].x).eql(0.4);
      expect(points[3].y).eql(0.88);
      const shape = Polygon.drawShape(type, {
        points,
        color: 'blue'
      }, canvas);
      expect(shape.attr('stroke')).eql('blue');
      expect(shape.attr('path').length).eql(7);
      expect(shape.attr('path')[0].length).eql(3);
      expect(shape.attr('path')[1].length).eql(3);
      expect(shape.attr('path')[2].length).eql(3);
      expect(shape.attr('path')[3].length).eql(3);
      expect(shape.attr('path')[4].length).eql(3);
      expect(shape.attr('path')[5].length).eql(3);
      expect(shape.attr('path')[6].length).eql(1);
      canvas.draw();
    });
  });

  describe('multi', () => {
    it('getShapePoints && drawShape', () => {
      const type = 'polygon';
      const points = Polygon.getShapePoints(type, {
        x: [ 0.21263260173587847, 0.17709419711191304, 0.15365098112799627, 0.13692712583388766, 0.10960143478241949, 0.13125286973453648, 0.13453800364901844, 0.12811707110832443, 0.12990909456753963, 0.14752871916383872, 0.16470058032274681, 0.17246528803043767, 0.2720622282085636, 0.30476326235543455, 0.3213380247886886, 0.32686270317235794, 0.35344196020990215, 0.39823794056940287, 0.4376585778335043, 0.4552784448572188, 0.47722855038587225, 0.49858155718887165, 0.5281470351369459, 0.5698074592976501, 0.5771241611405346, 0.5929520047050304, 0.5523369275622021, 0.5514409158325962, 0.563834532621759, 0.5621920868782292, 0.5436762081249054, 0.5035091368468835, 0.5073913694870195, 0.4981335513240652, 0.4742423294753421, 0.4637898290062456, 0.44811107830260083, 0.45184421808188574, 0.4373601496843833, 0.4261609727739474, 0.3888307871181822, 0.35553241181823836, 0.32686270317235794, 0.32507092214055816, 0.31506642753626457, 0.3167091157072133, 0.2751977844073602, 0.26295350290646047, 0.26041504543332133, 0.24324318427441322, 0.21263260173587847, 0.019262312767244327, 0.010303165180830014, 0, 0.027027020474935184, 0.019262312767244327, 0.9514708798612144, 0.9528146550282112, 0.9523666491634082, 0.9522173138751383, 0.9517695504377508, 0.9489324223880752, 0.9487830870998086, 0.9453486178970602, 0.9451992826087903, 0.9514708798612144, 0.9655069423939139, 0.9655069423939139, 0.9647602659525745, 0.9647602659525745, 0.9655069423939139, 0.9997013294234636, 1, 0.9998506647117335, 0.9998506647117335, 0.9997013294234636, 0.968045399867053, 0.968045399867053, 0.9653576071056439, 0.9655069423939139, 0.968045399867053, 0.4712558661374, 0.48648661097624185, 0.4915635259225202, 0.4712558661374, 0.968045399867053, 0.968194735155323, 0.968194735155323, 0.968045399867053, 0.968045399867053 ],
        y: [ 0.1350233871789078, 0.15740751320885069, 0.20459993392469905, 0.2744450047320851, 0.29208884892354436, 0.3586132632504578, 0.3992540446281526, 0.41982805517536037, 0.4480111582801544, 0.4744020309460945, 0.48269572323888227, 0.5043035886837356, 0.6715056474510094, 0.6932548544231955, 0.7129644211828479, 0.7371119628587256, 0.7807720874081839, 0.8023094062910642, 0.810382019569219, 0.8379473434499758, 0.847085358855954, 0.8438603376795648, 0.8109203097093434, 0.8048659739524208, 0.7786174364273634, 0.7710751643809415, 0.7299641553912231, 0.7045962078738908, 0.6758296052124971, 0.6537977151856446, 0.6064373737800292, 0.5465262028313017, 0.5239962640130567, 0.5025374406005402, 0.4077032374413465, 0.3539730879770278, 0.3225671993263301, 0.30794667276083054, 0.2948235218135442, 0.26035084494412214, 0.20514840860369968, 0.18704775058312698, 0.10066323704390037, 0.033770192090339365, 0.02164413233938894, 0, 0.007308276055652992, 0.033770192090339365, 0.08539661326821875, 0.11537368563557733, 0.1350233871789078, 0.41070096951842094, 0.3989815461123634, 0.41914718149096675, 0.4229609186950875, 0.41070096951842094, 0.9562566603158201, 0.9542485673334642, 0.9539807884820318, 0.9539807884820318, 0.9538468990563157, 0.9539807884820318, 0.9538468990563157, 0.9526418942248701, 0.9526418942248701, 0.9562566603158201, 0.9507674422648429, 0.9507674422648429, 0.9518385576705731, 0.951704668244857, 0.9507674422648429, 1, 0.9995988285296264, 0.9985294519476068, 0.9983958109252782, 1, 0.9491607691562488, 0.9490268797305327, 0.9496963268591135, 0.9496963268591135, 0.9491607691562488, 0.04713156188597836, 0.04685608252954196, 0.024262800847552952, 0.04713156188597836, 0.9491607691562488, 0.9491607691562488, 0.9490268797305327, 0.9490268797305327, 0.9491607691562488 ]
      });

      const shape = Polygon.drawShape(type, {
        points,
        color: 'blue'
      }, canvas);

      expect(shape.attr('fill')).eql('blue');
      expect(shape.attr('path').length).eql(98);
      expect(shape.attr('path')[51].length).eql(1);
      expect(shape.attr('path')[57].length).eql(1);
      expect(shape.attr('path')[68].length).eql(1);
      expect(shape.attr('path')[73].length).eql(1);
      expect(shape.attr('path')[79].length).eql(1);
      expect(shape.attr('path')[85].length).eql(1);
      expect(shape.attr('path')[90].length).eql(1);
      expect(shape.attr('path')[97].length).eql(1);
      canvas.draw();
    });
  });


});
