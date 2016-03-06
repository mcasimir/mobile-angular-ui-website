'use strict';

let path = require('path');

module.exports = {
  title: 'Mobile Angular UI',
  tagline: 'Angular JS Mobile UI framework with Bootstrap 3 Css',
  host: 'http://mobileangularui.com/',
  assets: {
    js: [
      'node_modules/jquery/jquery.js',
      'node_modules/bootstrap/js/affix.js',
      'node_modules/bootstrap/js/carousel.js',
      'node_modules/bootstrap/js/tab.js',
      'node_modules/bootstrap/js/transition.js',
      'node_modules/bootstrap/js/collapse.js',
      'node_modules/bootstrap/js/modal.js',
      'assets/js/expo.js',
      'assets/js/forum.js',
      'assets/js/main.js'
    ],
    less: [
      path.resolve(__dirname, 'src/less'),
      path.resolve(__dirname, 'node_modules')
    ],
    fonts: [
      'node_modules/font-awesome/fonts/fontawesome-webfont.*',
      'node_modules/roboto-fontface/fonts/*'
    ]
  },
  lint: ['./client/**/*.js', './server/**/*.js', './test/**/*.js', './*.js']
};
