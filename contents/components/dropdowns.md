---
title: Dropdowns
---

**Note** `.dropdown-menu` is always visible with mobile-angular-ui css. Thus you should use `ui-show`/`ui-hide`/`ui-if` or `ng-*` relatives to display or hide it, and `ngAnimate` or similar for animations.

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