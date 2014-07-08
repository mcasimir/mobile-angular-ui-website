### Carousels

Carousels have the same markup of bootstrap but their behaviour is achieved with 2 functions available to `$rootScope`: `carouselPrev(id)` and `carouselNext(id)`.

This is a basic example that uses `ngSwipeLeft` and `ngSwipeRight` from `ngTouch`.

``` html
<div id="carousel-example" class="carousel">
      <div class="carousel-inner" ng-swipe-left="carouselPrev('carousel-example')"
      ng-swipe-right="carouselNext('carousel-example')">
        <div href="" class="item active">
          <div class="carousel-example-content">1</div>
        </div>
        <div href="" class="item">
          <div class="carousel-example-content">2</div>
        </div>
        <div href="" class="item">
          <div class="carousel-example-content">3</div>
        </div>
      </div>
</div>
```

To create more fancy effects and touch friendly experience you can use `$swipe` service direclty. `$swipe` service is provided by `angular-touch`.

This is a more complete example to explain how to build a swipe friendly carousel.

``` html
<div id="carousel-example" class="carousel">
      <div class="carousel-inner">
        <div href="" class="item active" carousel-example-item>
          <div class="carousel-example-content">1
            <br/><small>Swipe me!</small>
          </div>
        </div>
        <div href="" class="item" carousel-example-item>
          <div class="carousel-example-content">2
            <br/><small>Swipe me!</small>
          </div>
        </div>
        <div href="" class="item" carousel-example-item>
          <div class="carousel-example-content">3
            <br/><small>Swipe me!</small>
          </div>
        </div>
      </div>
</div>
```

Lets define the `carouselExampleItem` directive.

``` javascript
app.directive( "carouselExampleItem", function($rootScope, $swipe){
  return function(scope, element, attrs){
      var startX = null;
      var startY = null;
      var endAction = "cancel";
      var carouselId = element.parent().parent().attr("id");

      var translateAndRotate = function(x, y, z, deg){
        element[0].style["-webkit-transform"] =
           "translate3d("+x+"px,"+ y +"px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-moz-transform"] =
           "translate3d("+x+"px," + y +"px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-ms-transform"] =
           "translate3d("+x+"px," + y + "px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-o-transform"] =
           "translate3d("+x+"px," + y  + "px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["transform"] =
           "translate3d("+x+"px," + y + "px," + z + "px) rotate("+ deg +"deg)";
      }

      $swipe.bind(element, {
        start: function(coords) {
          startX = coords.x;
          startY = coords.y;
        },

        cancel: function(e) {
          translateAndRotate(0, 0, 0, 0);
          e.stopPropagation();
        },

        end: function(coords, e) {
          if (endAction == "prev") {
            $rootScope.carouselPrev(carouselId);
          } else if (endAction == "next") {
            $rootScope.carouselNext(carouselId);
          }
          translateAndRotate(0, 0, 0, 0);
          e.stopPropagation();
        },

        move: function(coords) {
          if( startX != null) {
            var deltaX = coords.x - startX;
            var deltaXRatio = deltaX / element[0].clientWidth;
            if (deltaXRatio &gt; 0.3) {
              endAction = "next";
            } else if (deltaXRatio &lt; -0.3){
              endAction = "prev";
            }
            translateAndRotate(deltaXRatio * 200, 0, 0, deltaXRatio * 15);
          }
        }
      });
    }
});

```

Now swiping items we will see them moving and rotating. When releasing an item if the swipe lenght was at least 3/10 of the item width then carouselPrev/carouselNext are invoked according to swipe direction.
