---
title: Making ui-router work with mobile angular ui
position: 100
---

If issuing `$stateChangeStart` and `$routeChangeStart` won't conflict with your app
you can use this trick to make ui router work with `mobile-angular-ui`

``` js
myApp.run(function($rootScope){
   $rootScope.$on('$stateChangeStart', function(){
      $rootScope.broadcast('$routeChangeStart');
   });
});
```
