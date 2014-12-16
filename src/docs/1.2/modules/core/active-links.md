### Active Links

#### Description

`mobile-angular-ui.activeLinks` module sets up `.active` class for `a` elements those `href` attribute matches the current angular `$location` url. It takes care of excluding both search part and hash part from comparison.

`.active` classes are added/removed each time one of `$locationChangeSuccess` or `$includeContentLoaded` is fired.

#### Usage

Just declare it as a dependency to your app unless you have already included one of its super-modules.

```
angular.module('myApp', ['mobile-angular-ui.core.activeLinks']);
```

**NOTE:** if you are using it without Bootstrap you may need to add some css to your stylesheets to reflect the activation state of links. I.e.

``` css
a.active {
  color: blue;
}
```