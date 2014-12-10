#### Shared State

##### Description

`SharedState` aims to provide a proper way to create directives and components that previously used scope variables to communicate.

`mobile-angular-ui.core.sharedState` is composed by the homonymous service `SharedState` and a group of directives to access it. 

It acts as a BUS between UI elements to share UI related state that is automatically disposed when all scopes requiring it are destroyed.

eg.

``` js
app.controller('controller1', function($scope, SharedState){
  SharedState.initialize($scope, 'myId');
});

app.controller('controller2', function(SharedState){
  SharedState.toggle('myId');
});
```

Data structures retaining statuses will stay outside angular scopes thus they are not evaluated against digest cycle until its necessary. Also although statuses are sort of global variables `SharedState` will take care of disposing them when no scopes are requiring them anymore.

A set of `ui-*` directives are available to interact with `SharedState` module and will hopefully let you spare your controllers and your time for something that is more meaningful than this:

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

`SharedState` exposes methods to interact with statuses to create, read and update statuses. A state is a global variable identified by an `id`.


###### initialize(scope, id, options)

Initialize, or require if already intialized, a state identified by `id` within the provided `scope`, making it available to the rest of application.

A `SharedState` is bound to one or more scopes. Each time `initialize` is called for an angular `scope` this will be bound to the `SharedState` and a reference count is incremented to allow garbage collection.

This reference count is decremented once the scope is destroyed. When the counter reach 0 the state will be disposed.

Valid `options` are: 

- `defaultValue`: the initialization value, it is taken into account only if the state `id` is not already initialized.

- `exclusionGroup`: specify an exclusion group for the state. This means that for boolean operations (ie. toggle, turnOn, turnOf) when this state is set to `true`, any other state that is in the same `exclusionGroup` will be set to `false`.

###### setOne(id, value)

Set the value of the state identified by `id` to the `value` parameter.

###### setMany(object)

Set multiple statuses at once. ie.

```
SharedState.setMany({ activeTab: 'firstTab', sidebarIn: false });
```

###### set(idOrObject, [value])

Just a shorthand for both `setOne` and `setMany`. When called with only one parameter that is an object it is the same of `setMany`, otherwise is the same of `setOne`.

###### turnOn(id)

Set shared state identified by `id` to `true`. If the shared state has been initialized with `exclusionGroup` option it will also turn off (set to `false`) all other statuses from the same exclusion group.

###### turnOff(id)

Set shared state identified by `id` to `false`.

###### toggle(id)

If current value for shared state identified by `id` evaluates to `true` it calls `turnOff` on it otherwise calls `turnOn`. Be aware that it will take into account `exclusionGroup` option. See `#turnOn` and `#initialize` for more.

###### get(id) → object

Return the current value of the state identified by `id`.

###### isActive(id) → bool

Return `true` if the boolean conversion of `#get(id)` evaluates to `true`.

###### active(id) → bool

Alias for `#isActive`.

###### isUndefined(id) → bool

Return `true` if `#get(id)` evaluates to `true`.

###### equals(id, value) → bool

Return `true` if `#get(id)` is exactly equal (`===`) to `value` param.

###### eq(id, value) → bool

Alias for `#equals`.

###### values () → object

Returns an object with all the status values currently stored. It has the form of `{statusId: statusValue}`.

Bear in mind that in order to spare resources it currently returns just the internal object retaining statuses values. Thus it is not intended to be modified and direct changes to it will be not tracked or notified.

Just clone before apply any change to it.

##### Events

###### mobile-angular-ui.state.initialized.ID → (currentValue)

Broadcasted when `#initialize` is called for a new state not referenced by any scope currently.

###### mobile-angular-ui.state.destroyed.ID

Broadcasted when a state is destroyed.

###### mobile-angular-ui.state.changed.ID → (newValue, previousValue)

Broadcasted when the value of a state changes.

``` js
$scope.$on(`mobile-angular-ui.state.changed.uiSidebarLeft`, function(e, newVal, oldVal) {
  if (newVal === true) {
    console.log('sidebar opened');
  } else {
    console.log('sidebar closed');
  }
});
```

##### Directives

###### uiState

Calls `SharedState#initialize` on the scope relative to the element using it.

Params: 

- `uiState`: Required. (string) the shared state id
- `uiDefault`: (expression) the default value

###### uiToggle

Calls `SharedState#toggle` when triggering events happens on the element using it.

Params:

- `uiToggle`: Required. (string) the target shared state
- `uiTriggers`: (string) the event triggering the call. Defaults to `click tap`


###### uiTurnOn

Calls `SharedState#turnOn` when triggering events happens on the element using it.

Params:

- `uiTurnOn`: Required. (string) the target shared state
- `uiTriggers`: (string) the event triggering the call. Defaults to `click tap`

###### uiTurnOff

Calls `SharedState#turnOff` when triggering events happens on the element using it.

Params:

- `uiTurnOff`: Required. (string) the target shared state
- `uiTriggers`: (string) the event triggering the call. Defaults to `click tap`

###### uiSet

Calls `SharedState#set` when triggering events happens on the element using it.

Params:

- `uiSet`: Required. (expression) the object to pass as parameter to `SharedState#set`
- `uiTriggers`: (string) the event triggering the call. Defaults to `click tap`

###### uiIf

Same as `ngIf` but evaluates condition against `SharedState` statuses too

Params

- `uiIf`: Required. (expression) a condition to decide wether to attach the element to the dom

###### uiHide

Same as `ngHide` but evaluates condition against `SharedState` statuses too

Params

- `uiHide`: Required. (expression) a condition to decide wether to hide the element

###### uiShow

Same as `ngShow` but evaluates condition against `SharedState` statuses too

Params

- `uiShow`: Required. (expression) a condition to decide wether to show the element


###### uiClass

A simplified version of `ngClass` that evaluates in context of `SharedState` too, it only suppors the `{'className': expr}` syntax.

Params

- `uiClass`: Required. (expression) an object of the form `{'className': expr}`, where `expr` decides wether the class should appear to element's class list