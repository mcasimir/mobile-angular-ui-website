### Support and Compatibility

Mobile Angular UI 1.2 is compatible with:
- AngularJs 1.2 and 1.3
- Boostrap 3.x sources *

<div class="alert alert-info">
\* = Mobile Angular UI is automatically built from Bootstrap `.less` sources. Bootstrap less are compiled with mobile-angular-ui stylesheets and then passed to a pipeline that transforms them to __mobilified__ stylesheets.
</div>


#### Browser Support

Anything that can run Bootstrap 3 and Angular 1.3 and supports CSS3
transitions and transforms should fit:

- Chrome
- Firefox
- Safari/IOS Safari
- Android Browser 2.3+
- Chrome for Android
- Blackberry Browser
- IE Mobile
- Opera/Opera Mobile
- IE10+

**Note n.1**: Some visual effects may be only available in some of the browsers above (ie. blur effect in overlays). A decent fallback is provided in any case.

**Note n.2**: It may work even with IE9 (although not supported), but it may require a lot of effort:

- Forget about transitions: sidebars use transitions events to hide show. Adding `.sidebar-left-in, .sidebar-right-in { display: block !important; }` should fix this.
- Be sure to <a target='blank' href="http://stackoverflow.com/questions/6418139/media-query-not-working-in-ie9">enable Media Queries</a>.
- Replace/override any 3d transforms with equivalent `margin` or 2d transforms prefixed with `-ms-`
- Polyfill any other missing features

**Note n.3**: Currently some experimental features like those from `gestures` module are not supported by all of the browsers above, hopefully support will be the broadest possibile as these features will stabilize.

**Note n.4**: If you notice frozen application on older devices be aware that this may be mainly due to device resources scarcity and not due to your application or framework you are using. If you have to forcefully support them try to lower your application footprint as much as you can.