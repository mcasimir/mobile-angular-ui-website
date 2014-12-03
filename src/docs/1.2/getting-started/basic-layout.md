#### Basic Layout

``` html
<body ng-app="myApp">

  <!-- Sidebars -->
  <div class="sidebar sidebar-left"><!-- ... --></div>
  <div class="sidebar sidebar-right"><!-- ... --></div>

  <div class="app">
    <div class="navbar navbar-app navbar-absolute-top"><!-- Top Navbar --></div>
    <div class="navbar navbar-app navbar-absolute-bottom"><!-- Bottom Navbar --></div>
    
    <!-- App body -->
    
    <div class='app-body'>
      <div class='app-content'>
        <ng-view></ng-view>
      </div>
    </div>
  </div><!-- ~ .app -->

  <!-- Modals and Overlays -->
  <div ui-yield-to="modals"></div>

</body>
```
