---
title: Modals and Overlays
---

Modals are basically the same of Bootstrap 3 but you have to use uiState with `ngIf/uiIf` or `ngHide/uiHide` to `activate/dismiss` it. By default both modals and overlay are made always showing up by css rule `.modal {display:block}`, so you can use it with `ngAnimate` and other angular directives in a simpler way.

**Note:**

For modals and overlays to cover the whole page you have to attach them as child of `body` element. To achieve this from a view is a common use for `contentFor/yieldTo` directives:

``` html
<body ng-app="myApp">
  
  <!-- ... -->

  <!-- Modals and Overlays -->
  <div ui-yield-to="modals"></div>

</body>
```

Then you can wrap your modals and overlays in `contentFor`:

``` html
<div ui-content-for="modals">
  <div class="modal"><!-- ... --></div>
</div>
```

#### Modals

``` html
<div ui-content-for="modals">
  <div class="modal" ui-if="modal1" ui-state='modal1'>
    <div class="modal-backdrop in"></div>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" 
                  ui-turn-off="modal1">&times;</button>
          <h4 class="modal-title">Modal title</h4>
        </div>
        <div class="modal-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio quo illum nihil voluptatem earum optio repellendus, molestias illo facere, ea non. Possimus assumenda illo accusamus voluptatibus, vel corporis maxime quam.</p>
        </div>
        <div class="modal-footer">
          <button ui-turn-off="modal1" class="btn btn-default">Close</button>
          <button ui-turn-off="modal1" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### Overlays

Overlay are just like to modals except they looks more native in mobile devices with a blurred overlay in background.

You can create an overlay adding `.modal-overlay` class to a modal:

``` html
<div ui-content-for="modals">
  <div class="modal modal-overlay" ui-if='modal2' ui-state='modal2'>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close"
                  ui-turn-off="modal2">&times;</button>
          <h4 class="modal-title">Modal title</h4>
        </div>
        <div class="modal-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet harum reiciendis enim adipisci magni fugit suscipit eaque corporis? Saepe eius ipsum optio dolorum a qui adipisci, reprehenderit totam temporibus!</p>
        </div>
        <div class="modal-footer">
          <button ui-turn-off="modal2" class="btn btn-default">Close</button>
          <button ui-turn-off="modal2" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>
```