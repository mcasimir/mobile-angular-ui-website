### Accordion and Collapse

Accordion component is achieved via `toggle` and `toggleable` directives. `exclusion-group` parameter is used to inactivate other panels but the active one.

``` html
<div class="panel-group" id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading" toggle target="collapseOne">
      <h4 class="panel-title">
          Collapsible Group Item #1
      </h4>
    </div>
    <div id="collapseOne" toggleable active-class="in" exclusion-group="accordion1" default="active" class="panel-collapse collapse">
      <div class="panel-body">
        <!-- ... -->
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" toggle target="collapseTwo">
      <h4 class="panel-title">
          Collapsible Group Item #2
      </h4>
    </div>
    <div id="collapseTwo" toggleable active-class="in" exclusion-group="accordion1" class="panel-collapse collapse">
      <div class="panel-body">
        <!-- ... -->
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" toggle target="collapseThree">
      <h4 class="panel-title">
          Collapsible Group Item #3
      </h4>
    </div>
    <div id="collapseThree" toggleable active-class="in" exclusion-group="accordion1" class="panel-collapse collapse">
      <div class="panel-body">
        <!-- ... -->
      </div>
    </div>
  </div>
</div>
```
