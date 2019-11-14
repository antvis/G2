fetch('../data/population.json')
  .then(res => res.json())
  .then(data => {
    const tmp = [];
    const dates = [];
    data.male.values.forEach(function(obj) {
      if (dates.indexOf(obj.date) === -1) {
        dates.push(obj.date);
      }
      obj.age_groups.forEach(function(subObject) {
        subObject.gender = 'male';
        subObject.date = obj.date;
        tmp.push(subObject);
      });
    });
    data.female.values.forEach(function(obj) {
      obj.age_groups.forEach(function(subObject) {
        subObject.gender = 'female';
        subObject.date = obj.date;
        tmp.push(subObject);
      });
    });
    const ds = new DataSet();
    const dv = ds.createView()
      .source(tmp)
      .transform({
        type: 'filter',
        callback(row) { // 判断某一行是否保留，默认返回true
          return new Date(row.date * 1000).getFullYear() === new Date(dates[0] * 1000).getFullYear();
        }
      });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });

    chart.source(dv, {
      age: {
        sync: true,
        tickCount: 11
      },
      total_percentage: {
        sync: true,
        formatter(v) {
          return v + '%';
        }
      },
      gender: {
        sync: true
      }
    });
    chart.facet('mirror', {
      fields: [ 'gender' ],
      transpose: false,
      padding: [ 0, 0, 40, 0 ], // 分面间的
      eachView(view) {
        view.interval().position('age*total_percentage')
          .color('gender', [ '#1890ff', '#f04864' ]);
      }
    });
    chart.render();
  });
