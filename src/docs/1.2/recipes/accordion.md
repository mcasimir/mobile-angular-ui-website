### Accordion

``` html
<div class="panel-group" ui-state='myAccordion' ui-default='2'>
  <div class="panel panel-default" ng-repeat="i in [1,2,3]">
    <div class="panel-heading" ui-set="{'myAccordion': i}">
      <h4 class="panel-title">
          Collapsible Group Item #{{i}}
      </h4>
    </div>
    <div ui-if="myAccordion == i">
      <div class="panel-body">
        <!-- -->
      </div>
    </div>
  </div>
</div>
```