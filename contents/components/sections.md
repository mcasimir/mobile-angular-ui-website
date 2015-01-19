---
title: Sections
---

Sections are containers for application body. By default `.app` container will have no padding and no background. To add them you should use sections.

You can make any element a section adding `.section` class on it.

``` html
<div class="section">
  <!-- contents -->  
</div>
```

Section acts as `.container-fluid` and has padding and background.

#### Layout Variations

- `.section-wide` removes horizontal padding
- `.section-condensed` removes vertical padding
- `.section-break` adds a `margin-bottom` and shadow (useful if you have more than a section on the same view)
- `.section-default` uses 

#### Theming

You can use any of `.section-default`, `.section-primary`, `.section-success`, `.section-info`, `.section-warning` or `.section-danger` to change the appearance of sections according to bootstrap style variations.

Example:

``` html
<div class="section section-wide section-info">
  <!-- contents -->  
</div>
```