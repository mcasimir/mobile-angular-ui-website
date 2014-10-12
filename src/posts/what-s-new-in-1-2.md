---
title: "Mobile Angular UI 1.2: Getting Started and Migrating"
created_at: 2014-10-11
description: "All you need to know to about the new Mobile Angular UI 1.2"
kind: article
toc: true
comments: true
published: false
---

Version 1.2 is still a work in progress but for those who wish to try it here is a tutorial to move from 1.1.

## What's new

### Core

Mobile Angular UI 1.2 is a rewriting of 1.1 core functionalities in order to allow higher levels to be more flexible and powerful.

The main change is the replacement of `Toggle/Toggleable` directives with `SharedState` service and `ui-*` directives.

I took this painful decision after i realized that was too difficult to interact programmatically with UI component using `Toggle/Toggleable`.

`SharedState` better leverages Angular functionalities and allows to reflect and initialize UI components state in url thus allowing stuffs like "back-button closes sidebars" or "bookmarkable tabs".

### Drag gestures support

One of the biggest introduction is the support for drag gestures. It is built on top of native `$swipe` service and borrows its syntax.

`$drag` service translates movement detected by `$swipe` into css transform matrix and apply it to bound element. 

`$drag` is designed to be easy to customize: constraint movement, cancel, detect clashes with other elements.

A new `Transform` service is delegate to compute the CSS transform matrix and apply it to DOM elements.

Using them both you can easily build directives and components that requires drag interaction.

I.e.

``` js
app.directive('dragToDismiss', function($drag, $parse, $timeout){
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem, attrs){
        var dismiss = false;

        $drag.bind(elem, {
          constraint: {
            minX: 0, 
            minY: 0, 
            maxY: 0 
          },
          move: function(c) {
            if( c.left >= c.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function(){
            elem.removeClass('dismiss');
          },
          end: function(c, undo, reset) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() { 
                scope.$apply(function() {
                  dismissFn(scope);  
                });
              }, 400);
            } else {
              reset();
            }
          }
        });
      };
    }
  };
});
``` 

``` html
<div drag-to-dismiss="deleteNotice(notice)"
  class="section section-break">
    Dismiss me dragging to the right
</div>
```

### Scrollable Headers and Footers

## Migrating from 1.1

### Scrollable

Before

```
 <div class="scrollable">
  <div class="scrollable-content">
	...
  </div>
 </div>
```

After

```
 <div class="scrollable">
  <div class="scrollable-header">
	...
  </div>
  <div class="scrollable-body">
	...
  </div>
  <div class="scrollable-footer">
	...
  </div>
 </div>

```

#### Migrating old predefined scrollable headers

##### `.app-search`

Before

```
  <input type="search" class="form-control app-search" placeholder="Search.." />

  <div class="scrollable">
    <div class="scrollable-content">
      ...
    </div>
  </div>
```

After

```
  <div class="scrollable">
    <input
      type="search"
      class="form-control scrollable-header"
      placeholder="Search.." />

    <div class="scrollable-body">
      ...
    </div>
  </div>
```

##### `.app-name`

Before

```
  <h1 class="app-name">App Name</h1>

  <div class="scrollable sidebar-scrollable">
    <div class="scrollable-content">
      ...
    </div>
  </div>
```

After

```
  <div class="scrollable">
    <h1 class="scrollable-header app-name">App Name</h1>  
    <div class="scrollable-body">
      ...
    </div>
  </div>
```