### Initial Setup

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
angular.module('mobile-angular-ui', [
  'mobile-angular-ui.core.pointerEvents',     /* prevents actions on disabled elements */
  'mobile-angular-ui.core.activeLinks',       /* adds .active class to current links */
  'mobile-angular-ui.core.fastclick',         /* polyfills overflow: auto */
  'mobile-angular-ui.core.sharedState',       /* SharedState service */
  'mobile-angular-ui.core.ui',                /* ui-* directives */
  'mobile-angular-ui.core.outerClick',        /* outerClick directives */
  'mobile-angular-ui.components.modals',            /* modals and overlays */
  'mobile-angular-ui.components.switch',            /* switch form input */
  'mobile-angular-ui.components.sidebars',          /* sidebars */
  'mobile-angular-ui.components.scrollable',        /* uiScrollable directives */
  'mobile-angular-ui.components.capture',           /* uiYieldTo and uiContentFor directives */
  'mobile-angular-ui.components.navbars'            /* navbars */
]);
```

#### Html head section setup

##### Distributed package content

###### Regular usage files

| File | Description |
| --- | --- |
| `dist/css/mobile-angular-ui-base.css` | Mobile only css. it has no media queries except for `col-sm-*` grid. It also hasn't :hover styles. It is intended to target phones and tablets |
| `dist/css/mobile-angular-ui-hover.css` | The `:hover` css rules stripped out from `base.css` |
| `dist/css/mobile-angular-ui-desktop.css` | Responsive css. Contains `col-md-*`/`col-lg-*` grid along with some pieces of bootstrap.css for components that are only meaningful on large screens (breadcrumbs, pagination..) and a few lines of code to make sidebars always visible. No other responsive stuffs are included from `bootstrap.css` |
| `dist/js/mobile-angular-ui.min.js` | `mobile-angular-ui` itself bundled with overthrow.js and fastclicks.js |
| `dist/js/mobile-angular-ui.gestures.min.js` | Gesture handling services: `$drag`, `$swipe`, `Transform`  |
| `dist/js/mobile-angular-ui.migrate.min.js` | Adapters to migrate from 1.1 to 1.2 without too much hurt |
| `dist/fonts/fontawesome*` | Fonts from FontAwesome icons toolkit |

###### Stand-alone modules files

| File | Description |
| --- | --- |
| `dist/js/mobile-angular-ui.core.min.js` | Core Module |
| `dist/js/mobile-angular-ui.components.min.js` | Components |

##### Examples

###### Seting up a mobile only app

``` html
<link rel="stylesheet" href="mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css" />
<script src="angular.min.js">
</script>
<script src="angular-route.min.js">
</script>
<script src="mobile-angular-ui/dist/js/mobile-angular-ui.min.js">
</script>
```

###### Seting up a responsive app

``` html
<link rel="stylesheet" href="mobile-angular-ui/dist/css/mobile-angular-ui-hover.min.css" />
<link rel="stylesheet" href="mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css" />
<link rel="stylesheet" href="mobile-angular-ui/dist/css/mobile-angular-ui-desktop.min.css" />
<script src="angular.min.js">
</script>
<script src="angular-route.min.js">
</script>
<script src="mobile-angular-ui/dist/js/mobile-angular-ui.min.js">
</script>
```

###### Enabling built-in gestures modules (not stable yet)

``` html
<!-- Required to use $drag, $swipe and Translate services -->
<script src="/dist/js/mobile-angular-ui.gestures.min.js"></script>
```

###### Use the migration module to move from v1.1 to v1.2

``` html
<!-- Only required to import legacy syntax and directives. You won't need it 
unless you are attempting to move an app from Mobile Angular UI 1.1 to 1.2 -->
<script src="/dist/js/mobile-angular-ui.migrate.min.js"></script>
```

###### Use with other css frameworks (ie. [Topcoat](http://topcoat.io/))

``` html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/css/topcoat-mobile-dark.css" />
<script src="angular.min.js">
</script>
<script src="angular-route.min.js">
</script>
<script src="mobile-angular-ui/dist/js/mobile-angular-ui.core.min.js">
</script>
<script src="/dist/js/mobile-angular-ui.gestures.min.js"></script>
```