### Outer Click

#### Description

Provides a directive to specifiy a behaviour when click/tap events happen outside an element. This can be easily used to implement eg. __close on outer click__ feature for a dropdown.

#### Usage

Declare it as a dependency to your app unless you have already included some of its super-modules.

```
angular.module('myApp', ['mobile-angular-ui.core.outerClick']);
```

Use `ui-outer-click` to define an expression to evaluate when an _Outer Click_ event happens.
Use `ui-outer-click-if` parameter to define a condition to enable/disable the listener.

``` html
<div class="btn-group">
  <a ui-turn-on='myDropdown' class='btn'>
    <i class="fa fa-ellipsis-v"></i>
  </a>
  <ul 
    class="dropdown-menu"
    ui-outer-click="Ui.turnOff('myDropdown')"
    ui-outer-click-if="Ui.active('myDropdown')"
    role="menu"
    ui-show="myDropdown" 
    ui-state="myDropdown"
    ui-turn-off="myDropdown">

    <li><a>Action</a></li>
    <li><a>Another action</a></li>
    <li><a>Something else here</a></li>
    <li class="divider"></li>
    <li><a>Separated link</a></li>
  </ul>
</div>
```

<table class="table table-bordered">
  <thead>
    <tr><th colspan="2">`uiOuterClick` directive parameters</th></tr>
  </thead>
  <tbody>
    <tr>
      <th>uiOuterClick</th><td>
        Expression to evaluate when an _Outer Click_ event happens.
      </td>
    </tr>
    <tr>
      <th>uiOuterClickIf</th><td>
        Condition to enable/disable the listener. Defaults to `true`.
      </td>
    </tr>
  </tbody>
</table>
