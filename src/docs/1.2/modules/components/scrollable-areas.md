#### Scrollable Areas

First of all: one thing you'll always have to deal with approaching mobile web app development is scroll and `position:fixed` bugs.

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
