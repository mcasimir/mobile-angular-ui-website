#### Differences with Bootstrap 3

1. Although Mobile Angular UI aims to retain most of Bootstrap CSS style, some minor changes are employed to achieve a more mobile-friendly look and feel for default components.
2. It adds new components like sidebars, absolute-positioned navbars, switches, overlays, scrollables ..
3. It does not rely on jQuery or bootstrap.js at all (all of the interactions is reproduced without coding through core module directives)
4. It uses font-awesome in place of glyphicons
5. Responsive css rules for components *-sm, *-md, *-lg are moved out of the default bundle
6. Responsive grid is divided in two parts: `.col-xs-*` and `.col-sm-*` classes are included in base.css, `.col-md-*` and `.col-lg-*` classes are included in desktop.css.
7. Breadcrumbs and pagination are just not the best way to navigate a mobile app so their are only included in desktop.css.
8. `.container` is always fluid.