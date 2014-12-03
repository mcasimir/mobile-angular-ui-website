### Tabs

Tabs component is realized via `toggle` and `toggleable` directives using `exclusion-group` parameter to inactivate other tabs but the active one.

``` html
<ul class="nav nav-tabs">
  <li><a href="#Tab1" toggle="on" parent-active-class="active">Tab 1</a></li>
  <li><a href="#Tab2" toggle="on" parent-active-class="active">Tab 2</a></li>
  <li><a href="#Tab3" toggle="on" parent-active-class="active">Tab 3</a></li>
</ul>

<div class="tab-content">
  <div class="tab-pane"
      toggleable
      active-class="active"
      default="active"
      id="Tab1"
      exclusion-group="myTabs">

    <h3 class="page-header">Tab 1</h3>
    <p><!-- ... --></p>
  </div>

  <div class="tab-pane"
      toggleable
      active-class="active"
      id="Tab2"
      exclusion-group="myTabs">
    <h3 class="page-header">Tab 2</h3>
    <p><!-- ... --></p>
  </div>

  <div class="tab-pane"
      toggleable
      active-class="active"
      id="Tab3"
      exclusion-group="myTabs">
    <h3 class="page-header">Tab 3</h3>
    <p><!-- ... --></p>
  </div>
</div>

<div class="btn-group justified nav-tabs">
  <a class="btn btn-default"
     href="#Tab1"
     toggle="on"
     active-class="active">Tab 1
  </a>

  <a class="btn btn-default"
     href="#Tab2"
     toggle="on"
     active-class="active">Tab 2
  </a>

  <a class="btn btn-default"
     href="#Tab3"
     toggle="on"
     active-class="active">Tab 3
  </a>

</div>
```
