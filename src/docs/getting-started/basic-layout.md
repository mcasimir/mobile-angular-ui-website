### Basic Layout

``` html
<!-- Sidebars -->

<div class="sidebar sidebar-left" toggleable parent-active-class="sidebar-left-in" id="mainSidebar">
  <h1 class="app-name">My App</h1>

  <div class="scrollable">
    <div class="scrollable-content">
      <div class="list-group" toggle="off" bubble target="mainSidebar">
        <a class="list-group-item" href="#/">Home <i class="fa fa-chevron-right pull-right"></i></a>
        <!-- ... -->
      </div>

    </div>
  </div>
</div>

<div class="app">

  <!-- Navbars -->
  <div class="navbar navbar-app navbar-absolute-top">

      <div class="navbar-brand navbar-brand-center" yield-to="title">
        <span>My App</span>
      </div>

      <div class="btn-group pull-left">
        <div ng-click="toggle('mainSidebar')" class="btn btn-navbar sidebar-toggle">
          <i class="fa fa-bars"></i> Menu
        </div>
      </div>

      <div class="btn-group pull-right" yield-to="navbarAction">
        <div class="btn btn-navbar">
          <i class="fa fa-plus"></i> New
        </div>
      </div>
  </div>

  <div class="navbar navbar-app navbar-absolute-bottom">
    <div class="btn-group justified">
      <a href="#/route1" class="btn btn-navbar btn-icon-only"><i class="fa fa-home fa-navbar"></i></a>
      <a href="#/route2" class="btn btn-navbar btn-icon-only"><i class="fa fa-list fa-navbar"></i></a>
    </div>
  </div>

  <div class="app-body">
      <ng-view class="app-content"></ng-view>
  </div>
</div>
```
