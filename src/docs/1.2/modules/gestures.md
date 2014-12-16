## Gestures

<div class="alert alert-warning">
<p>
<i class="fa fa-warning"></i> This module will not work with `ngTouch` cause it is intended, among offering more features, to be a drop-in replacement for it.  
</p>
<p>
Be aware that `ngTouch` is still not playing well with `fastclick.js` and its usage with `mobile-angular-ui` is currently discouraged anyway.  
</p>
<p>
`mobile-angular-ui.gestures` is still in a early stage of development and is not required by the framework.
</p>
<p>
If you are looking for something more complete and production-ready I suggest you to look for other projects like [angular-hammer](https://github.com/monospaced/angular-hammer).
</p>
</div>

<div class="h5">Usage</div>

`.gestures` module is not required by `mobile-angular-ui` module. It has no dependency on other modules and is intended to be used alone with any other angular framework.

You have to include `mobile-angular-ui.gestures.min.js` to your project in order to use it. Ie.

``` html
<script src="/dist/js/mobile-angular-ui.gestures.min.js"></script>
```

```
angular.module('myApp', ['mobile-angular-ui.gestures']);
```

<div class="h5">Description</div>

It has directives and services to support `swipe` and `drag` gestures.

It does not need any `.css` to work.


