### Capture

#### Description

The `capture` module exposes directives to let you extract markup which can be used in other parts of a template using `uiContentFor` and `uiYieldTo` directives.

It provides a way to move or clone a block of markup to other parts of the document.

This method is particularly useful to setup parts of the layout within an angular view. Since blocks of html are transplanted within their original `$scope` is easy to create layout interactions depending on the context. Some tipical task you can accomplish with these directives are: _setup the navbar title depending on the view_ or _place a submit button for a form inside a navbar_.

#### Usage

Declare it as a dependency to your app unless you have already included some of its super-modules.

```
angular.module('myApp', ['mobile-angular-ui.core.capture']);
```

Use `ui-yield-to` as a placeholder.

``` html
<!-- index.html -->

<div class="navbar">
  <div ui-yield-to="title" class="navbar-brand">
    <span>Default Title</span>
  </div>
</div>

<div class="app-body">
  <ng-view class="app-content"></ng-view>
</div>
```

Use `ui-content-for` inside any view to populate the `ui-yield-to` content.

``` html
<!-- myView.html -->

<div ui-content-for="title">
  <span>My View Title</span>
</div>
```

Since the original scope is preserved you can use directives inside `ui-content-for` blocks to interact with the current scope. In the following example we will add a navbar button to submit a form inside a nested view.  


``` html
<!-- index.html -->

<div class="navbar">
  <div ui-yield-to="navbarAction">
  </div>
</div>

<div class="app-body">
  <ng-view class="app-content"></ng-view>
</div>
```

``` html
<!-- newCustomer.html -->

<form ng-controller="newCustomerController">

  <div class="inputs">
    <input type="text" ng-model="customer.name" />  
  </div>

  <div ui-content-for="navbarAction">
    <button ng-click="createCustomer()">
      Save
    </button>
  </div>

</form>
```

``` javascript
app.controller('newCustomerController', function($scope, Store){
  $scope.customer = {};
  $scope.createCustomer = function(){
    Store.create($scope.customer);
    // ...
  }
});
```

If you wish you can also duplicate markup instead of move it. Just add `duplicate` parameter to `uiContentFor` directive to specify this behaviour.

``` html
<div ui-content-for="navbarAction" duplicate>
  <button ng-click="createCustomer()">
    Save
  </button>
</div>
```

<table class="table table-bordered">
  <thead>
    <tr><th colspan="2">`uiYieldTo` directive parameters</th></tr>
  </thead>
  <tbody>
    <tr>
      <th>uiYieldTo</th><td>
        An unique name to reference the placeholder.
      </td>
    </tr>
    <tr>
      <th>[content]</th><td>
        The default content. Default content is restored each time on `$routeChangeStart`.
      </td>
    </tr>
  </tbody>
</table>


<table class="table table-bordered">
  <thead>
    <tr><th colspan="2">`uiContentFor` directive parameters</th></tr>
  </thead>
  <tbody>
    <tr>
      <th>uiContentFor</th><td>
        An unique name to reference the placeholder.
      </td>
    </tr>
    <tr>
      <th>duplicate</th><td>
        Indicates whether the content should be duplicated instead of moved.
      </td>
    </tr>
    <tr>
      <th>[content]</th><td>
        The content to take place in the placeholder.
      </td>
    </tr>
  </tbody>
</table>
