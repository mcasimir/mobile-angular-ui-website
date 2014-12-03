#### Toggle Switch

<figure class="full-width-figure">
  <img src="/assets/img/figs/switch.png" alt=""/>
</figure>

The `switch` directive (not to be confused with `ng-switch`) lets you create a toggle switch control bound to a boolean `ngModel` value.

It requires `ngModel`. You can also use `ngChange` in conjunction with `[switch]` to trigger functions in response to model changes.

``` html
<switch  ng-model="invoice.paid"></switch>
```
