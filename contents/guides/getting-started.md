---
title: Getting Started
position: 0
---

### Installation

Either install via `bower` or download it

``` sh
bower install --save mobile-angular-ui
```

#### Using the boilerplate

If you want to have your Mobile Angular UI project bootstrapped in a minute you can use the `generator-mobileangularui` generator for Yeoman.

``` sh
npm install -g bower yo gulp generator-mobileangularui
```

Using the generator is super-easy and fast

``` sh
mkdir myApp
cd myApp
yo mobileangularui
```

You can find a complete tutorial to start a Phonegap project with mobile-angular-ui <a href="/blog/your-first-phonegap-app-with-mobile-angular-ui/">here</a>.

### Support and Compatibility

Mobile Angular UI 1.2 is compatible with:
- AngularJs 1.2 and 1.3
- Boostrap 3.x sources *

<div class="alert alert-info">
\* = Mobile Angular UI is automatically built from Bootstrap `.less` sources. Bootstrap less are compiled with mobile-angular-ui stylesheets and then passed to a pipeline that transforms them to __mobilified__ stylesheets.
</div>


#### Browser Support

Anything that can run Bootstrap 3 and Angular 1.3 and supports CSS3
transitions and transforms should fit:

- Chrome
- Firefox
- Safari/IOS Safari
- Android Browser 2.3+
- Chrome for Android
- Blackberry Browser
- IE Mobile
- Opera/Opera Mobile
- IE10+
- IEMobile 10+

**Note n.1**: Some visual effects may be only available in some of the browsers above (ie. blur effect in overlays). A decent fallback is provided in any case.

**Note n.2**: It may work even with IE9 (although not supported), but it may require a lot of effort:

- Forget about transitions: sidebars use transitions events to hide show. Adding `.sidebar-left-in, .sidebar-right-in { display: block !important; }` should fix this.
- Be sure to <a target='blank' href="http://stackoverflow.com/questions/6418139/media-query-not-working-in-ie9">enable Media Queries</a>.
- Replace/override any 3d transforms with equivalent `margin` or 2d transforms prefixed with `-ms-`
- Polyfill any other missing features

**Note n.3**: Currently some experimental features like those from `gestures` module are not supported by all of the browsers above, hopefully support will be the broadest possibile as these features will stabilize.

**Note n.4**: If you notice frozen application on older devices be aware that this may be mainly due to device resources scarcity and not due to your application or framework you are using. If you have to forcefully support them try to lower your application footprint as much as you can.

See also:
 
 - http://getbootstrap.com/getting-started/#support
 - https://docs.angularjs.org/guide/ie

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
  'mobile-angular-ui.core.activeLinks',       /* adds .active class to current links */
  'mobile-angular-ui.core.fastclick',         /* polyfills overflow: auto */
  'mobile-angular-ui.core.sharedState',       /* SharedState service and directives */
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

###### Setting up a mobile only app

``` html
<link rel="stylesheet" href="mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css" />
<script src="angular.min.js">
</script>
<script src="angular-route.min.js">
</script>
<script src="mobile-angular-ui/dist/js/mobile-angular-ui.min.js">
</script>
```

###### Setting up a responsive app

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
<link rel="stylesheet" href="mobile-angular-ui/dist/css/mobile-angular-ui-migrate.min.css" />
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

#### Basic Layout

``` html
<body ng-app="myApp">

  <!-- Sidebars -->
  <div class="sidebar sidebar-left"><!-- ... --></div>
  <div class="sidebar sidebar-right"><!-- ... --></div>

  <div class="app">
    <div class="navbar navbar-app navbar-absolute-top"><!-- Top Navbar --></div>
    <div class="navbar navbar-app navbar-absolute-bottom"><!-- Bottom Navbar --></div>
    
    <!-- App body -->
    
    <div class='app-body'>
      <div class='app-content'>
        <ng-view></ng-view>
      </div>
    </div>
  </div><!-- ~ .app -->

  <!-- Modals and Overlays -->
  <div ui-yield-to="modals"></div>

</body>
```

#### Differences with Bootstrap 3

1. Although Mobile Angular UI aims to retain most of Bootstrap CSS style, some minor changes are employed to achieve a more mobile-friendly look and feel for default components.
2. It adds new components like sidebars, absolute-positioned navbars, switches, overlays, scrollables ..
3. It does not rely on jQuery or bootstrap.js at all (all of the interactions is reproduced without coding through core module directives)
4. It uses font-awesome in place of glyphicons
5. Responsive css rules for components *-sm, *-md, *-lg are moved out of the default bundle
6. Responsive grid is divided in two parts: `.col-xs-*` and `.col-sm-*` classes are included in base.css, `.col-md-*` and `.col-lg-*` classes are included in desktop.css.
7. Breadcrumbs and pagination are just not the best way to navigate a mobile app so their are only included in desktop.css.
8. `.container` is always fluid.

