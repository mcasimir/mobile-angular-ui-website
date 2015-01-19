---
title: Tabs
---

``` html
<ul class="nav nav-tabs" ui-state='activeTab' ui-default='1'>
  <li ui-class="{'active': activeTab == 1}">
    <a ui-set="{'activeTab': 1}">Tab 1</a>
  </li>
  <li ui-class="{'active': activeTab == 2}">
    <a ui-set="{'activeTab': 2}">Tab 2</a>
  </li>
  <li ui-class="{'active': activeTab == 3}">
    <a ui-set="{'activeTab': 3}">Tab 3</a>
  </li>
</ul>

<div ui-if="activeTab == 1">
  <h3 class="page-header">Tab 1</h3>
  <!-- ... -->
</div>

<div ui-if="activeTab == 2">
  <h3 class="page-header">Tab 2</h3>
  <!-- ... -->
</div>

<div ui-if="activeTab == 3">
  <h3 class="page-header">Tab 3</h3>
  <!-- ... -->
</div>
```