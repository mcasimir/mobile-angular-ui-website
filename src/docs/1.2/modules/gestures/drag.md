### Drag

<div class="alert alert-warning">
  <i class="fa fa-warning"></i>
  This service is incomplete yet and may be not supported properly on any devices. A better implementation is in progress. Any help regarding this concern will be extremely appreciated! Source code here: https://github.com/mcasimir/mobile-angular-ui/blob/master/src/js/gestures/drag.js
</div>

#### Description

`$drag` Service wraps `$swipe` to extend its behavior moving target element through css transform according to the `$swipe` coords thus creating a drag effect.

`$drag` interface is very close to `$swipe`:

``` js
app.controller('MyController', function($drag, $element){
  var unbindDrag = $drag.bind($element, {
   // drag callbacks
   // - rect is the current result of getBoundingClientRect() for bound element
   // - cancelFn issue a "touchcancel" on element
   // - resetFn restore the initial transform
   // - undoFn undoes the current movement
   // - swipeCoords are the coordinates exposed by the underlying $swipe service
   start: function(rect, cancelFn, resetFn, swipeCoords){},
   move: function(rect, cancelFn, resetFn, swipeCoords){},
   end: function(rect, undoFn, resetFn, swipeCoords) {};
   cancel: function(rect, resetFn){},

   // constraints for the movement
   // you can use a "static" object of the form:
   // {top: .., lelf: .., bottom: .., rigth: ..}
   // or pass a function that is called on each movement 
   // and return it in a dynamic way.
   // This is useful if you have to constraint drag movement while bounduaries are
   // changing over time.

   constraint: function(){ return {top: y1, left: x1, bottom: y2, right: x2}; }, // or just {top: y1, left: x1, bottom: y2, right: x2}

   // instantiates the Trasform according to touch movement (defaults to `t.translate(dx, dy);`)
   // dx, dy are the distances of movement for x and y axis after constraints are applyied
   transform: function(transform, dx, dy, currSwipeX, currSwipeY, startSwipeX, startSwipeY) {},

   // changes the Transform before is applied to element (useful to add something like easing or accelleration)
   adaptTransform: function(transform, dx, dy, currSwipeX, currSwipeY, startSwipeX, startSwipeY) {}

  });
  
  // This is automatically called when element is disposed so it is not necessary
  // that you call this manually but if you have to detatch $drag service before
  // this you could just call:
  unbindDrag();
});
```

Main differences with `$swipe` are:
 - bound elements will move following swipe direction automatically
 - coords param take into account css transform so you can easily detect collision with other elements.
 - start, move, end callback receive a cancel funcion that can be used to cancel the motion and reset
   the transform.
 - you can configure the transform behavior passing a transform function to options.
 - you can constraint the motion through the constraint option (setting relative movement limits)

#### Usage
 
**Example 1.** Drag to dismiss

``` js
app.directive('dragToDismiss', function($drag, $parse, $timeout){
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem, attrs){
        var dismiss = false;

        $drag.bind(elem, {
          constraint: {
            minX: 0, 
            minY: 0, 
            maxY: 0 
          },
          move: function(c) {
            if( c.left >= c.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function(){
            elem.removeClass('dismiss');
          },
          end: function(c, undo, reset) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() { 
                scope.$apply(function() {
                  dismissFn(scope);  
                });
              }, 400);
            } else {
              reset();
            }
          }
        });
      };
    }
  };
});
```

**Example 2.** Touch enabled "deck of cards" carousel directive

``` js
app.directive('carousel', function(){
  return {
    restrict: 'C',
    scope: {},
    controller: function($scope) {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function(){
        var newId = this.itemCount++;
        this.activeItem = this.itemCount == 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem == this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();
      
      var zIndex = function(){
        var res = 0;
        if (id == carousel.activeItem){
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function(){
        return carousel.activeItem;
      }, function(n, o){
        elem[0].style['z-index']=zIndex();
      });
      

      $drag.bind(elem, {
        constraint: { minY: 0, maxY: 0 },
        adaptTransform: function(t, dx, dy, x, y, x0, y0) {
          var maxAngle = 15;
          var velocity = 0.02;
          var r = t.getRotation();
          var newRot = r + Math.round(dx * velocity);
          newRot = Math.min(newRot, maxAngle);
          newRot = Math.max(newRot, -maxAngle);
          t.rotate(-r);
          t.rotate(newRot);
        },
        move: function(c){
          if(c.left >= c.width / 4 || c.left <= -(c.width / 4)) {
            elem.addClass('dismiss');  
          } else {
            elem.removeClass('dismiss');  
          }          
        },
        cancel: function(){
          elem.removeClass('dismiss');
        },
        end: function(c, undo, reset) {
          elem.removeClass('dismiss');
          if(c.left >= c.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          } else if (c.left <= -(c.width / 4)) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          reset();
        }
      });
    }
  };
});
```