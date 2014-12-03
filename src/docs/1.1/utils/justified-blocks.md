### Justified Blocks

Mobile screens are small and it's common to have 2 or three buttons justified. To achieve this behaviour you can use the `.justified` class in any parent block of a group of items. This will apply a `table` layout to parent and a `table-cell` layout to its children.

<figure class="full-width-figure">
  <img src="/assets/img/figs/justify.png" alt=""/>
</figure>

Example:

``` html
<div class="btn-group justified nav-tabs">
  <a class="btn">Tab 1</a>
  <a class="btn">Tab 2</a>
  <a class="btn">Tab 3</a>
</div>
```
