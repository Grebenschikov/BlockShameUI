let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('src/js/app.js', 'dist/js')
   .less('src/less/app.less', 'dist/css').options({processCssUrls:false})
   .copy('src/index.html', 'dist')
   .browserSync({
      server: {
        baseDir: "dist"
      },
      proxy: false
   })
   .disableNotifications();
