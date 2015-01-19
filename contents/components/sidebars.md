---
title: Sidebars
---

#### Creating sidebars

Sidebars can be placed either in left side or right side adding respectively `.sidebar-left` and `.sidebar-right` classes.

``` html
<div class="sidebar sidebar-left">
  <div class="scrollable">
    <h1 class="scrollable-header app-name">My App</h1>  
    <div class="scrollable-content">
      <div class="list-group" ui-turn-off='uiSidebarLeft'>
        <a class="list-group-item" href="#/link1">Link 1 
          <i class="fa fa-chevron-right pull-right"></i></a>
        <a class="list-group-item" href="#/link2">Link 2
          <i class="fa fa-chevron-right pull-right"></i></a>
      </div>
    </div>
  </div>
</div>

<div class="sidebar sidebar-rigth">
  <!-- -->
</div>
```

#### Interacting with sidebars

Under the hood sidebar uses `SharedState` exposing respective statuses: `uiSidebarLeft` and `uiSidebarRight` unless you define different state name through `id` attribute on sidebar elements.

``` html
<a href ui-toggle='uiSidebarLeft'>Toggle sidebar left</a>

<a href ui-toggle='uiSidebarRight'>Toggle sidebar right</a>
```

You can put `ui-turn-off='uiSidebarLeft'` or `ui-turn-off='uiSidebarLeft'` inside the sidebar to make it close after clicking links inside them.

By default sidebar are closed by clicking/tapping outside them.