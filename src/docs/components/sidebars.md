### Sidebars

``` html
<div class="sidebar sidebar-left" toggleable parent-active-class="sidebar-left-in" id="mainSidebar">

<h1 class="app-name">Mobile Angular UI</h1>

<div class="scrollable">
  <div class="scrollable-content">
    <div class="list-group" toggle="off" bubble target="mainSidebar">
      <a class="list-group-item" href="#/">Home <i class="fa fa-chevron-right pull-right"></i></a>
      <a class="list-group-item" href="#/scroll">Scroll <i class="fa fa-chevron-right pull-right"></i></a>
      <a class="list-group-item" href="#/toggle">Toggle <i class="fa fa-chevron-right pull-right"></i></a>
      <a class="list-group-item" href="#/tabs">Tabs <i class="fa fa-chevron-right pull-right"></i></a>
      <a class="list-group-item" href="#/accordion">Accordion <i class="fa fa-chevron-right pull-right"></i></a>
      <a class="list-group-item" href="#/overlay">Overlay <i class="fa fa-chevron-right pull-right"></i></a>
      <a class="list-group-item" href="#/forms">Forms <i class="fa fa-chevron-right pull-right"></i></a>
    </div>

  </div>
</div>

</div>
```

As you can see sidebars can be placed either in left side or right side adding respectively `.sidebar-left` and `.sidebar-right` classes.

You should also notice that a sidebar is a toggleable. A sidebar is shown when parent has the `.sidebar-[left|right]-in` class moving the above `.app` element left or right. `.sidebar` and `.app` are supposed to be siblings.

The purpose of the `toggle` directive for `.list-group` is to make the sidebar disappear when a link is clicked or tapped, the `bubble` parameter is infact used to let click events be propagated to inner links.

``` html
<div class="list-group" toggle="off" bubble target="mainSidebar">
  <!-- ... -->
</div>
```

Sidebars can be toggled using the `toggle` directive either as an attribute or programmatically via `toggle('sidebarId')`

``` html
<div class="btn-group pull-left">
  <div ng-click="toggle('mainSidebar')" class="btn btn-navbar sidebar-toggle">
    <i class="fa fa-bars"></i> Menu
  </div>
</div>
```

By default sidebar are closed by clicking/tapping outside them. To prevent this behavior just add `close-on-outer-clicks='false'` to `.sidebar` element.
