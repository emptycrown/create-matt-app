module.exports = function config(api) {
  api.cache(true);
  const presets = [
    // "targets node true" is to fix:
    // https://github.com/sequelize/sequelize/issues/7840
    ['@babel/preset-env', { targets: { node: true } }],
    '@babel/preset-react',
  ];
  const plugins = [
    // https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining
    '@babel/plugin-proposal-optional-chaining',
    // https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    [
      'babel-plugin-root-import',
      {
        paths: [
          // Intended to route to each workspace's root
          {
            rootPathSuffix: './',
            rootPathPrefix: '~',
          },
          // Route to global root
          {
            rootPathSuffix: '../',
            rootPathPrefix: '#',
          },
        ],
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
