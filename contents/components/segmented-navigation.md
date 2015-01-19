---
title: Segmented Navigation
---

Mobile screens are small and it's common to have 2 or three buttons justified. To achieve this behaviour you can use the `.justified` class in any parent block of a group of items. This will apply a `table` layout to parent and a `table-cell` layout to its children.

<figure class="full-width-figure">
  <img src="/assets/img/figs/justify.png" alt=""/>
</figure>

Example:

``` html
<div class="btn-group justified">
  <a href="#/page1">Page 1</a>
  <a href="#/page2">Page 2</a>
  <a href="#/page3">Page 3</a>
</div>
```
