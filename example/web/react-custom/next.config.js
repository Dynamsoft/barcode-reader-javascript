const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  /* config options here */
  //cssModules:true
  //assetPrefix: process.env.NODE_ENV === 'production' ? '/{reponame}' : '',
})