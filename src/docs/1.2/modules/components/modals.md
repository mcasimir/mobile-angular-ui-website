#### Modals and Overlays

Overlay are similar to modals but looks more native in mobile devices.

This is the basic markup for an `overlay`. An `overlay` directive implicitly sets up a `toggleable` using its argument as `id`.

``` html
<div overlay="myOverlay">
  <h4 class="overlay-title">My Overlay</h4>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ex eaque possimus ipsa ab quasi quos corporis consequatur laudantium? Ab assumenda delectus quo velit voluptates doloribus. Earum odit facilis qui.
  </p>
  <p toggle="off" bubble target="myOverlay">
    <span class="btn btn-primary">Ok</span>
    <span class="btn btn-default">Cancel</span>
  </p>  
</div>
```

You can show an overlay by default adding `default='active'` to the `[overlay]` element.

To interact with overlays from controllers you can use `$rootScope.toggle()` function: i.e `$rootScope.toggle('myOverlay', 'on');` or `$rootScope.toggle('myOverlay', 'off');`.
