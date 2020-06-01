// import colors from 'vuetify/es5/util/colors'
//
// export default {
//   mode: 'universal',
//   /*
//   ** Headers of the page
//   */
//   head: {
//     titleTemplate: '%s - ' + process.env.npm_package_name,
//     title: process.env.npm_package_name || '',
//     meta: [
//       { charset: 'utf-8' },
//       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
//       { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
//     ],
//     link: [
//       { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
//     ]
//   },
//   /*
//   ** Customize the progress-bar color
//   */
//   loading: { color: '#fff' },
//   /*
//   ** Global CSS
//   */
//   css: [
//   ],
//   /*
//   ** Plugins to load before mounting the App
//   */
//   plugins: [
//   ],
//   /*
//   ** Nuxt.js dev-modules
//   */
//   buildModules: [
//     '@nuxtjs/vuetify',
//     '@nuxtjs/moment',
//   ],
//   /*
//   ** Nuxt.js modules
//   */
//   modules: [
//       '@nuxtjs/axios',
//       '@nuxtjs/pwa'
//   ],
//   /*
//   ** Build configuration
//   */
//   build: {
//     /*
//     ** You can extend webpack config here
//     */
//     extend (config, ctx) {
//     }
//   }
// }


import webpack from 'webpack'

module.exports = {

  server: {
    host: 'localhost',
    port: 3001
  },
  head: {
    meta: [{
      charset: 'utf-8',
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
    }],
    cookie: {}
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],
  plugins: [
    {src: '~/plugins/axios.js', mode: 'client'}
  ],

  // pwa: {
  //     icon: {
  //         iconSrc: 'static/icon.png'
  //     },
  //     manifest: {
  //         name: 'node_express_study_final'
  //     },
  //     workbox: {
  //         dev: true,
  //         runtimeCaching: [{
  //             urlPattern: 'http://localhost:4001/.*',
  //             method: 'GET'
  //         }, {
  //             urlPattern: 'http://localhost:5001/.*',
  //             method: 'GET'
  //         }]
  //     },
  // }
};
