### Swipe

<div class="alert alert-success">
  <p><i class="fa fa-thumbs-up"></i> Swipe module is stable and ready to use. It is intended to be a drop-in replacement of `ngTouch` `$swipe` service and `ng-swipe-*` directives, that offers better interface and improvements.</p>
  <p>It is recomended to use this in place of `ngTouch` in order to avoid conflicts with fastclick.</p>
</div>

#### Description

An adaptation of ngTouch.$swipe. It is basically the same despite of:

1. It does not require ngTouch thus is better compatible with fastclick.js 
2. It allows to unbind

It also provides `ng-swipe-left` and `ng-swipe-right`. The only difference
with ngTouch ones is that they allow for nesting.

#### Usage

$swipe service:

``` js
var unbind = $swipe.bind(elem, options);

// Call this only if you need to detatch `$swipe`
// before the element is destroyed:
unbind();
```

ng-swipe-* directives:

Swiping the inner element wont call the outer handler (just f2 is executed and not f1).

``` html
<div ng-swipe-left='fn1()'>
  <!-- ... -->
  <div ng-swipe-left='fn2()'>
    <!-- ... -->
  </div>
  <!-- ... -->
</div>
```

Example: Opening left sidebar on swipe-right.

``` html
<div class="app" ng-swipe-right='Ui.turnOn("uiSidebarLeft")'>
  <!-- ... -->
</div>
```