### Initialization

You can initialize your Angular application declaring `mobile-angular-ui` as a dependence.

``` javascript
angular.module('myApp', ["mobile-angular-ui"]);
```

Here is a more complete example including ngRoute:

``` javascript
angular.module('myApp', [
  "ngRoute",
  "mobile-angular-ui",
]).config(function($routeProvider) {
      $routeProvider.when('/', {
        // ...
      });
      // ...
  });
```



If you wish you can avoid to load whole `mobile-angular-ui` modules at all and pick a subset of the loaded modules to fit your needs. This is how the `mobile-angular-ui` module is defined with its dependencies.

``` javascript
angular.module("mobile-angular-ui", [
  'mobile-angular-ui.pointer-events',     /* prevents actions on disabled elements */
  'mobile-angular-ui.active-links',       /* add .active class to active links */
  'mobile-angular-ui.fastclick',          /* provides touch events with fastclick */
  'mobile-angular-ui.scrollable',         /* polyfills overflow:auto with overthrow */
  'mobile-angular-ui.directives.toggle',
  'mobile-angular-ui.directives.overlay',
  'mobile-angular-ui.directives.forms',
  'mobile-angular-ui.directives.panels',
  'mobile-angular-ui.directives.capture',
  'mobile-angular-ui.directives.sidebars',
  'mobile-angular-ui.directives.navbars',
  'mobile-angular-ui.directives.carousel'
 ]);
```
