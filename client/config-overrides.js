const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
      fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'true',
       
      }),

      addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A', '@ant-prefix' : 'ant;', '@btn-primary-color': 'black', '@btn-border-radius-base': '20px', '@btn-border-width': '100px' },
        }),
     );