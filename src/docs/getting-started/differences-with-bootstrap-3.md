### Differences with Bootstrap 3

1. It has different mobile-friendly style for default components
2. It adds new components like sidebars, absolute-positioned navbars, switches, overlays, scrollables ..
3. It does not rely on jQuery or bootstrap.js at all (most of the interactions can be reproduced with [toggle] angular directive)
4. It uses font-awesome in place of glyphicons
5. Responsive css rules for components *-sm, *-md, *-lg are moved out of the default bundle
6. Responsive grid is divided in two parts: `.col-xs-*` and `.col-sm-*` classes are included in base.css, `.col-md-*` and `.col-lg-*` classes are included in desktop.css.
7. Breadcrumbs and pagination are just not the best way to navigate a mobile app so their are only included in desktop.css.
8. `.container` is always fluid.
