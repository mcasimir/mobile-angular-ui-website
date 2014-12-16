### Scrollable

One thing you'll always have to deal with approaching mobile web app development is scroll and `position:fixed` bugs.

Due to the lack of support in some devices fixed positioned elements may bounce or disappear during scroll. Also mobile interaction often leverages horizontal scroll eg. in carousels or sliders.

We use `overflow:auto` to create scrollable areas and solve any problems related to scroll.

Since `overflow:auto` is not always available in touch devices we use [Overthrow](http://filamentgroup.github.io/Overthrow/) to polyfill that.

Markup for any scrollable areas is as simple as:

``` html
<div class="scrollable">
  <div class="scrollable-content">...</div>
</div>
```

This piece of code will trigger a directive that properly setup a new `Overthrow` instance for the `.scrollable` node.

#### Headers and footers

`.scrollable-header/.scrollable-footer` can be used to add fixed header/footer to a scrollable area without having to deal with css height and positioning to avoid breaking scroll.

``` html
<div class="scrollable">
  <div class="scrollable-header"><!-- ... --></div>
  <div class="scrollable-content"><!-- ... --></div>
  <div class="scrollable-footer"><!-- ... --></div>
</div>
```

#### scrollTo

`.scrollable-content` controller exposes a `scrollTo` function: `scrollTo(offsetOrElement, margin)` 

You have to require it in your directives to use it or obtain through `element().controller`:

``` js
var elem = element(document.getElementById('myScrollableContent'));
var scrollableContentController = elem.controller('scrollableContent');

// - Scroll to top of containedElement
scrollableContentController.scrollTo(containedElement);

// - Scroll to top of containedElement with a margin of 10px;
scrollableContentController.scrollTo(containedElement, 10);

// - Scroll top by 200px;
scrollableContentController.scrollTo(200);
```

#### `ui-scroll-bottom/ui-scroll-top`

You can use `ui-scroll-bottom/ui-scroll-top` directives handle that events and implement features like _infinite scroll_.

``` html
<div class="scrollable">
  <div class="scrollable-content section" ui-scroll-bottom="loadMore()">
    <ul>
      <li ng-repeat="item in items">
        {{item.name}}
      </li>
    </ul>
  </div>
</div>
```