### Form helpers

Mobile angular Ui provides some markup savers to create form inputs.

#### `bs-form-control`

NOTE: former `bs-input`.

``` html
<input
 bs-form-control

 type="text"
 ng-model="invoice.customer"
 label="Customer"
 label-class="col-xs-3 col-sm-2 col-lg-1"
 class="col-xs-9 col-sm-10 col-lg-11"
 placeholder="Customer Name"
/>
```

That translates to

``` html
<div class="form-group row">
  <label for="invoice_customer_input" class="control-label col-xs-3 col-sm-2 col-lg-1" />Customer</label>
  <div class="form-control-wrapper col-xs-9 col-sm-10 col-lg-11">
    <input type="text" ng-model="invoice.customer" class="form-control" placeholder="Customer Name" id="invoice_customer_input" />
  </div>
</div>
```

If you don't assing a grid class to label or element they will get `.col-xs-12`. This way you're always able to mix horizontal and vertical controls without the need to use `form-horizontal` or change markup and style.

Note that this directive only wraps target element with some html. This lets you apply it to any type of control, even custom one.

So for instance you can apply it to `textarea` or `switch` as well.

```html
<switch            ng-model="invoice.paid"     label="Paid" bs-form-control></switch>
<textarea type="text" ng-model="customer.mailing_address" label="Address" bs-form-control></textarea>
```
