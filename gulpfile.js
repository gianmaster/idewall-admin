const elixir = require('laravel-elixir');

require('laravel-elixir-vue');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.webpack('build.js');
    /*
    mix.sass('app.scss')
        .webpack('build.js');
    mix.browserSync({
        proxy: 'http://ug_laravel_vue.dev/'
    });
    */
});
/*

elixir(function(mix) {
    mix.less('app.less');
    mix.less('admin-lte/AdminLTE.less');
    mix.less('bootstrap/bootstrap.less');
    mix.browserify('build.js');
    mix.browserSync({
        proxy: 'http://ug_laravel_vue.dev/'
    });
});
*/