
module.exports = api => {
  api.cache(() => process.env.NODE_ENV);

  if (process.env.GATSBY === 'true') {
    return {
      presets: [
        '@babel/preset-env',
        'babel-preset-gatsby'
      ]
    };
  }
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: false
        }
      ]
    ]
  };
};
