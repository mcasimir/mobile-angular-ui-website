### Transform

<div class="alert alert-warning">
  <i class="fa fa-warning"></i>
  This service is incomplete yet and works only with 2d transforms. Although this can be enough for many use cases a better implementation is in progress. Any help regarding this concern will be extremely appreciated! Source code here: https://github.com/mcasimir/mobile-angular-ui/blob/master/src/js/gestures/transform.js
</div>

#### Description

`Transform` is the underlying service used by `$drag` to deal with css trasform matrix in a simpler and vendor-angnostic way.

#### Usage

Consider the following html:

``` html
<div id="myElem" style="transform: translateX: 20px;"></div>
```

``` js
var e = document.getElementById('myElem');
var t0 = Transform.fromElement(e);

// It takes into account current transform applyed to elems
console.log(t0.getTranslation().x);
// -> 20;

t0.rotate(90);

// Set t0 to element ignoring previous transform.
t0.set(e);

var t1 = new Transform();

t1.translate(12, 40);

// merges t1 with current trasformation matrix applied to element.
t1.apply(e);
```