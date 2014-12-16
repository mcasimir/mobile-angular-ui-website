### Swipe

#### Description

An adaptation of ngTouch.$swipe. It is basically the same despite of:

1. It does not require ngTouch thus is better compatible with fastclick.js 
2. It allows to unbind

#### Usage

``` js
var unbind = $swipe.bind(elem, options);

// Call this if you need to detatch `$swipe` 
// before the element is destroyed.
unbind();
```