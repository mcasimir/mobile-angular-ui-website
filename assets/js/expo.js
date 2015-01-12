$.expo = {
  velocity: 7,
  velocityMax: 20,
  accelerationFrequency: 50,
  acceleration: function(i, v) {
    return v + Math.min(this.velocityMax, Math.floor(i / this.accelerationFrequency));
  },
  interval: 1
}

$(window).load(function(){

  $(document).on("click tap", '.expo-prev, .expo-next', function(e){
    e.preventDefault();
    return false;
  })

  $(".expo").each(function(i,e){
    $(e).css('display', 'block');
    var expo = $(e),
        viewport = expo.find('.expo-viewport'),
        track = expo.find('.expo-track'),
        prev = expo.find('.expo-prev'),
        next = expo.find('.expo-next'),
        lastImg = viewport.find('.expo-item:last'),
        maxWidth = lastImg.offset().left + lastImg.outerWidth(true) - track.offset().left,
        prevMousedownInterval, nextMousedownInterval;
        
    // Set right width
    viewport.css('max-width', maxWidth);

    // Handle prev, next
    prev.on('mousedown touchstart', function(e){
      var i = 0, 
          velocity = $.expo.velocity;

      prevMousedownInterval = setInterval(function(){
        velocity = $.expo.acceleration(i++, velocity);
        track.scrollLeft(track.scrollLeft() - velocity);
      }, $.expo.interval);
    }).on('mouseup touchend mouseleave', function(){
      clearInterval(prevMousedownInterval);
    });

    next.on('mousedown touchstart', function(e){
      var i = 0, 
          velocity = $.expo.velocity;

      nextMousedownInterval = setInterval(function(){
        velocity = $.expo.acceleration(i++, velocity);
        track.scrollLeft(track.scrollLeft() + velocity);
      }, $.expo.interval);
    }).on('mouseup touchend mouseleave', function(){
      clearInterval(nextMousedownInterval);
    });


  });

});