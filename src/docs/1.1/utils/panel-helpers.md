### Panel Helpers

#### `bs-panel`

A super simple directive minimizing the markup to use bootstrap panels.

``` html
<div bs-panel title="My Panel">
  <!-- Content -->
</div>
```

That translates to

``` html

<div class="panel">
  <div class="panel-heading">
    <h2 class="panel-title">
      My Panel
    </h2>
  </div>
  <div class="panel-body">
     <!-- Content -->
  </div>
</div>

```
