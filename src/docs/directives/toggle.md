### `toggle` and `toggleable`

Toggle module is the basic to implement tabs, accordions, collapsibles and all the other components that need to be selectively or exclusively switched on or off.

Toggle module defines two directives: `toggle` and `toggleable`. These two directives replaces almost all of the bootstrap 3 jquery stuffs.

A `[toggle]` node will works as a trigger to turn `on` or `off` one or more targeted `[toggleable]` nodes by translating clicks into _toggle events_.


<table class="table table-bordered">
  <thead>
    <tr><th colspan="2">`toggle` directive parameters</th></tr>
  </thead>
  <tbody>
    <tr>
      <th>toggle</th><td>
        Possible values are `on`, `off` or `toggle` (default to `toggle`)
      </td>
    </tr>
    <tr>
      <th>target</th><td>The `id` of the corresponding toggleable. One of `target` or `targetClass` is required.</td>
    </tr>
    <tr>
      <th>targetClass</th><td>The `class` of the corresponding toggleable. One of `target` or `targetClass` is required. Notice that this wont select nodes with dom methods.</td>
    </tr>
    <tr>
      <th>bubble</th><td>If `bubble` is set `[toggle]` does not capture the click event and let it to be propagated to dom.</td>
    </tr>
    <tr>
      <th>activeClass</th><td>The `class` the element will acquire when corresponding target is active and that will be removed when target is inactive. Does not affect `targetClass`.</td>
    </tr>
    <tr>
      <th>inactiveClass</th><td>The `class` the element will acquire when corresponding target is inactive and that will be removed when target is active. Does not affect `targetClass`.</td>
    </tr>
    <tr>
      <th>parentActiveClass</th><td>The `class` the parent of the element will acquire when corresponding target is inactive and that will be removed when target is active. Does not affect `targetClass`.</td>
    </tr>
    <tr>
      <th>parentInactiveClass</th><td>The `class` the parent of the element will acquire when corresponding target is inactive and that will be removed when target is active. Does not affect `targetClass`.</td>
    </tr>
  </tbody>
</table>

<table class="table table-bordered">
  <thead>
    <tr><th colspan="2">`toggleable` directive parameters</th></tr>
  </thead>
  <tbody>
    <tr>
      <th>exclusionGroup</th><td>
        Instruct the element to _"turn itself off"_ when another element of the same `exclusionGroup` is activated.
      </td>
    </tr>
    <tr>
      <th>default</th><td>The initial state of the element `active` or `inactive` (default to `inactive`).</td>
    </tr>
    <tr>
      <th>activeClass</th><td>The `class` the element will acquire when is active and that will be removed when is inactive.</td>
    </tr>
    <tr>
      <th>inactiveClass</th><td>The `class` the element will acquire when is inactive and that will be removed when is active.</td>
    </tr>
    <tr>
      <th>parentActiveClass</th><td>The `class` the parent of the element will acquire when is inactive and that will be removed when is active.</td>
    </tr>
    <tr>
      <th>parentInactiveClass</th><td>The `class` the parent of the element will acquire when is inactive and that will be removed when is active.</td>
    </tr>
  </tbody>
</table>

To understand how it works consider the following example:

``` html
<p toggleable id="lightbulb" active-class="text-primary" class="text-default">
  <i class="fa fa-lightbulb-o"></i>
</p>

<div class="btn-group justified nav-tabs">
  <a  
     toggle="toggle"
     target="lightbulb"
     active-class="active"
     class="btn btn-default" href>
      Toggle
  </a>
  <a  
     toggle="on"
     target="lightbulb"
     class="btn btn-default" href>
      Turn On
  </a>
  <a  
     toggle="off"
     target="lightbulb"
     class="btn btn-default" href>
      Turn Off
  </a>
</div>
```

The purpose of this code is to create a black `lightbulb` icon getting colored when it turns on. The `lightbulb` should be turned on and off by three switches. The first alternates its state, the second turns it on and the latter turns it off.

`#lightbulb` is a `[toggleable]` that wraps a lightbulb icon in form of font icon. When activated it acquires the `text-primary` class, thus being highlighted with the primary color.

The first `[toggle]` turns on and off the `#lightbulb` depending of its state. It also reflects the `#lightbulb` activation since when lightbulb is active it takes the `active` class.

Second and third `[toggle]` are only sending `on` or `off` commands to `#lightbulb`.

<a href="demo/#/toggle">Try this example in the demo</a>

#### Programmatic API

Toggle module exposes the `toggle` and `toggleByClass` functions through `$rootScope` to interact with `[toggleable]` in a programmatic way. This will let you do something like that:

``` html
<div ng-swipe-left="toggle('mainSidebar', 'off')"
        ng-swipe-right="toggle('mainSidebar', 'on')">
<div>
```

`toggle` method takes 2 parameters: the `[toggleable]` id and the command to send (one of `toggle`, `on` or `off`).

`toggleByClass` method takes also 2 parameters: the `[toggleable]` class and the command to send.
