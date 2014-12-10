#### Shared State

##### Description

`mobile-angular-ui.core.sharedState` provides the homonymous service: `SharedState` and a group of directives to access it. It acts as a BUS between UI elements to share UI related state that is automatically disposed when all scopes requiring it are destroyed.

eg.

``` js
SharedState.initialize(requiringScope, 'myId');
SharedState.toggle('myId');
```

`SharedState` serves as base to create directives and components that uses variables to interact. 

Data structures retaining states will stay outside angular scopes thus they are not evaluated against digest cycle until its necessary. Also although states are sort of global variables `SharedState` will take care of disposing them when no scopes are requiring them anymore.

A set of `ui-*` directives are available to interact with `SharedState` module and spare your controllers for something more useful than just for stuffs like that:

``` js
$scope.activeTab = 1;

$scope.setActiveTab = function(n) {
  $scope.activeTab = n;
};
```

##### Usage

Declare it as a dependency to your app unless you have already included some of its super-modules.

```
angular.module('myApp', ['mobile-angular-ui.core.sharedState']);
```

Use `ui-state` directive to require/initialize a state from the target element scope

Example: Tabs

``` html

<div class="tabs" ui-state="activeTab">

  <ul class="nav nav-tabs">
    <li ui-class="{'active': activeTab == 1)}">
      <a ui-set="{'activeTab': 1}">Tab 1</a>
    </li>
    <li ui-class="{'active': activeTab == 2)}">
      <a ui-set="{'activeTab': 2}">Tab 2</a>
    </li>
    <li ui-class="{'active': activeTab == 3)}">
      <a ui-set="{'activeTab': 3}">Tab 3</a>
    </li>
  </ul>

  <div ui-if="activeTab == 1">
    Tab 1
  </div>

  <div ui-if="activeTab == 2">
    Tab 2
  </div>

  <div ui-if="activeTab == 3">
    Tab 3
  </div>

</div>
```

NOTE: `ui-toggle/set/turnOn/turnOff` responds to `click/tap` without stopping propagation so you can use them along with ng-click too. You can also change events to respond to with `ui-triggers` attribute.

Any `SharedState` method is exposed through `Ui` object in `$rootScope`. So you could always do `ng-click="Ui.turnOn('myVar')"`.

Since `SharedState` is a service you can initialize/set statuses through controllers too:

``` js
app.controller('myController', function($scope, SharedState){
  SharedState.initialize($scope, "activeTab", 3);
});
```

As well as you can use `ui-default` for that: 

``` html
<div class="tabs" ui-state="activeTab" ui-default="thisIsAnExpression(5 + 1 - 2)"></div>
```

##### `SharedState` Service Api Reference

`SharedState` exposes methods to interact with states to create, read and update states.

###### setOne(id, value) → null

###### setMany(object) → null

###### set(idOrObject, value) → null

###### turnOn(id) → null

###### turnOff(id) → null

###### toggle(id) → null

###### get(id) → object

###### isActive(id) → bool

###### active(id) → bool

###### isUndefined(id) → bool

###### equals(id, value) → bool

###### eq(id, value) → bool

###### values () → object

##### Directives

###### uiState

###### uiToggle

###### uiTurnOn

###### uiTurnOff

###### uiSet

###### uiIf

###### uiHide

###### uiShow

###### uiClass