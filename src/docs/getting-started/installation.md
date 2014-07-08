### Installation

Either install via `bower` or download it

``` sh
bower install --save mobile-angular-ui
```

Load files in the head section of your html

``` html
<link rel="stylesheet" href="mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css" />
<link rel="stylesheet" href="mobile-angular-ui/dist/css/mobile-angular-ui-desktop.min.css" />
<script src="angular.min.js">
</script>
<script src="angular-route.min.js">
</script>
<script src="mobile-angular-ui/dist/js/mobile-angular-ui.min.js">
</script>
```

`mobile-angular-ui-base.css` includes only the mobile css part, it has no media queries except for `col-sm-*` grid. It is intended to target phones and tablets.

`mobile-angular-ui-desktop.css` contains `col-md-*`/`col-lg-*` grid along with some pieces of bootstrap.css for components that are only meaningful on large screens (breadcrumbs, pagination..) and a few lines of code to make sidebars always visible.

No other responsive stuffs are included from `bootstrap.css`.
