### Dropdowns

Dropdowns are also achieved using `toggle` and `toggleable`.

``` html
<div class="btn-group pull-right toggleable-dropdown" active-class="open" id="myDropdown" toggleable>
  <button type="button"
    class="btn btn-default dropdown-toggle" toggle
    target="myDropdown">
    <i class="fa fa-gear"></i> <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu" toggle="off" bubble target="myDropdown">
    <li><a href>Action</a></li>
    <li><a href>Another action</a></li>
    <li><a href>Something else here</a></li>
    <li class="divider"></li>
    <li><a href>Separated link</a></li>
  </ul>
</div>
```
