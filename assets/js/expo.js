/* jshint browser: true */
/* global $ */

'use strict';

$.expo = {
  velocity: 7,
  velocityMax: 20,
  accelerationFrequency: 50,
  acceleration: function(i, v) {
    return v + Math.min(this.velocityMax, Math.floor(i / this.accelerationFrequency));
  },
  interval: 1
};

$(window).load(function() {

  $(document).on('click tap', '.expo-prev, .expo-next', function(e) {
    e.preventDefault();
    return false;
  });

  $('.expo').each(function(i, e) {
    $(e).css('display', 'block');
    var expo = $(e);
    var viewport = expo.find('.expo-viewport');
    var track = expo.find('.expo-track');
    var prev = expo.find('.expo-prev');
    var next = expo.find('.expo-next');
    var lastImg = viewport.find('.expo-item:last');
    var maxWidth = lastImg.offset().left + lastImg.outerWidth(true) - track.offset().left;
    var prevMousedownInterval;
    var nextMousedownInterval;

    // Set right width
    viewport.css('max-width', maxWidth);

    // Handle prev, next
    prev.on('mousedown touchstart', function() {
      var i = 0;
      var velocity = $.expo.velocity;

      prevMousedownInterval = setInterval(function() {
        velocity = $.expo.acceleration(i++, velocity);
        track.scrollLeft(track.scrollLeft() - velocity);
      }, $.expo.interval);
    }).on('mouseup touchend mouseleave', function() {
      clearInterval(prevMousedownInterval);
    });

    next.on('mousedown touchstart', function() {
      var i = 0;
      var velocity = $.expo.velocity;

      nextMousedownInterval = setInterval(function() {
        velocity = $.expo.acceleration(i++, velocity);
        track.scrollLeft(track.scrollLeft() + velocity);
      }, $.expo.interval);
    }).on('mouseup touchend mouseleave', function() {
      clearInterval(nextMousedownInterval);
    });

  });

});
