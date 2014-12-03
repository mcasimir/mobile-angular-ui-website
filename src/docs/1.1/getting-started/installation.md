### Installation

Either install via `bower` or download it

``` sh
bower install --save mobile-angular-ui
```

#### Html head section setup

##### Distributed package content

| File | Description |
| --- | --- |
| `dist/css/mobile-angular-ui-base.css` | Mobile only css. it has no media queries except for `col-sm-*` grid. It also hasn't :hover styles. It is intended to target phones and tablets. |
| `dist/css/mobile-angular-ui-hover.css` | The `:hover` css rules stripped out from `base.css`. |
| `dist/css/mobile-angular-ui-desktop.css` | Responsive css. Contains `col-md-*`/`col-lg-*` grid along with some pieces of bootstrap.css for components that are only meaningful on large screens (breadcrumbs, pagination..) and a few lines of code to make sidebars always visible. No other responsive stuffs are included from `bootstrap.css`. |
| `dist/js/mobile-angular-ui.min.js` | `mobile-angular-ui` itself as well as overthrow.js and fastclicks.js releases. `angular.js` is not bundled in `mobile-angular-ui`. |
| `dist/fonts/fontawesome*` | Fonts from FontAwesome icons toolkit |

##### Setup a mobile only app

``` html
<link rel="stylesheet" href="mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css" />
<script src="angular.min.js">
</script>
<script src="angular-route.min.js">
</script>
<script src="mobile-angular-ui/dist/js/mobile-angular-ui.min.js">
</script>
```

##### Setup a responsive app

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
