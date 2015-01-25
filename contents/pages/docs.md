---
title: 'Docs'
description: "Mobile Angular UI Documentation"
toc: true
template: docs/docs.swig
---

## Start learning Mobile Angular UI

### Introduction

Mobile Angular UI lets you create HTML5 hybrid mobile apps and desktop apps with twitter Bootstrap and Angular JS.

What follows is a walk through documentation concepts. Keeping to read sections below should give you an overview of what you'll need to get familiar with in order to master Mobile Angular UI.

I encourage you to continue reading this and then go on with the more detailed [getting started guide](http://localhost:3002/docs/getting-started).

### Learning by Examples

[Demo](http://mobileangularui.com/demo/) is a great way to learn Mobile Angular UI.

You can download it with sources from here: https://github.com/mcasimir/mobile-angular-ui/tags.

Just open the archive after download ends and browse the `demo` folder inside.

If you're familiar with Angular just looking at `index.html` and `demo.js` will make you ready to start your own application in minutes.

### Learn what to include and how

#### CSS

Mobile Angular UI redistributes parts of Twitter Boostrap css. Bootstrap stylesheets are extended with styles for mobile friendly components and then are passed through a processor to split their rules in 3:

- `mobile-angular-ui-base.css`: Mobile rules
- `mobile-angular-ui-hover.css`: Hover rules
- `mobile-angular-ui-desktop.css`: Desktop rules

This way you will be able to include only what you need to target your devices.

#### JS

Mobile Angular Js is composed of three foundamental angular modules:

- **core**: those features any mobile/desktop app could benefit of. 
- **components**: angular directives and services to support introduced UI components.
- **gestures**: services and directives to handle touches easily.

Both `core` and `components` are part of `mobile-angular-ui.js`, while `gestures` is distributed in a separate file: `mobile-angular-ui.gestures.js`. 

Read [getting-started/#distributed-package-content](/docs/getting-started/#distributed-package-content) for more.

### Main concepts

#### Styling and Components

Mobile Angular UI is a close relative of Twitter Bootstrap.

Mobile Angular UI actually grabs original `bootstrap.css` sources and manipulates them a little to achieve mobile-friendly look and feel. It retains most of components markup so refer to [their documentation](http://getbootstrap.com/) for basic styling and components.

Along with basic components of bootstrap MAUI introduces some newer ones:

- [Sidebars](/docs/module:mobile-angular-ui/module:components/module:sidebars) 
- [Navbars with Absolute positioning](/docs/module:mobile-angular-ui/module:components/module:navbars)
- [Overlays](/docs/module:mobile-angular-ui/module:components/module:modals)
- [Scrollable Areas](/docs/module:mobile-angular-ui/module:components/module:scrollable)
- [Switches](/docs/module:mobile-angular-ui/module:components/module:switch)

And overrides `bootstrap.css` in order to make it more Angular friendly:

All of the components that were hidden by default now are **displayed** by default. This makes it easier to integrate with `ng-if/ng-show/ng-hide`.

So be aware that in Mobile Angular UI bootstrap components like:

- Modals
- Dropdowns

Are always displayed unless you don't do anything.

Read [Differences with Bootstrap 3](/docs/getting-started/#differences-with-bootstrap-3) for more.

#### Layout

Looking to `demo/index.html` will give you a complete picture of how a Mobile Angular UI application layout is structured.

It is very close to any Bootstrap layout. But you may notice some special setup for sidebars, navbars and placeholders for code _"inherited"_ from internal views.

Read [Basic Layout](/docs/getting-started/#basic-layout) for more.

#### Scroll

In Mobile Angular UI global scroll is disabled completely. This way your life will be easier to handle multi-col scroll and fixed navbars.

To make scrollable contents you will use [Scrollable Areas](/docs/module:mobile-angular-ui/module:components/module:scrollable).

#### Master/Details without headhakes

[Capture module](/docs/module:mobile-angular-ui/module:core/module:capture/) exposes services and directives that will help you to reproduce master/details pattern.

The capture module exposes directives to let you extract markup which can be used in other parts of a template using uiContentFor and uiYieldTo directives.

It provides a way to move or clone a block of markup to other parts of the document.

`content-for/yield-to` behaviour is inspired by [Ruby On Rails equivalents](http://guides.rubyonrails.org/layouts_and_rendering.html#understanding-yield), but bear in mind that in Mobile Angular UI those directives do not append: they replaces. 

#### SharedState service and ui-* directives

Mobile Angular UI components are not limited to an enumeration of hundred of directives you'd have to learn and remember.

Unlike many other UI framework you will create most of the components all in the same way. 

This will give you the maximum flexibility to customize the behaviour of your app and widgets without the need to learn different syntax neither having to write js code your own.

Anyone started developing with `angular.js` has been tempted to do something like this:

``` js
app.controller(function($scope){
  $scope.activeTab = 1;
  
  $scope.setActiveTab = function(tab){
    $scope.activeTab = tab;
  };
});
```

``` html
<div class="tab-nav">
  <a ng-click="setActiveTab(1)">Tab1</a>
  <a ng-click="setActiveTab(2)">Tab2</a>
  <a ng-click="setActiveTab(3)">Tab3</a>
</div>
<div class="tabs">
  <div ng-if="activeTab == 1">Tab1</div>
  <div ng-if="activeTab == 2">Tab2</div>
  <div ng-if="activeTab == 3">Tab3</div>  
</div>
```

Mobile Angular UI offers you a more generic and managed way to do that: `SharedState` service and `ui-*` directives.

`SharedState` allows to use elementary angular or angularish directives to create complex components. This way you will be able to:

- create complex components using HTML only
- have your controller free from UI logic
- have `ng-click` available for something else
- trigger UI actions responding to any event
- export state of components to urls
- share the state of a component with the rest of the UI

``` html
<div class="tab-nav" ui-state='activeTab'>
  <a ui-set="{activeTab: 1}">Tab1</a>
  <a ui-set="{activeTab: 2}">Tab2</a>
  <a ui-set="{activeTab: 3}">Tab3</a>
</div>
<div class="tabs">
  <div ui-if="activeTab == 1">Tab1</div>
  <div ui-if="activeTab == 2">Tab2</div>
  <div ui-if="activeTab == 3">Tab3</div>
</div>
```

`ui-state` creates a sort of special global variable that is visible from everywhere but is bound to the scope of the element that declares it.

Looking at docs and other section of demo you should be able to figure out how to recreate most common components like: accordions, tabs, dropdowns and more using `ui-*` directives.

See `demo/toggle.html` and [SharedState docs](/docs/module:mobile-angular-ui/module:core/module:sharedstate/) for more.

### Gestures and Touch

Mobile Angular Ui aims to solve most of common problems while developing with html on mobile devices.

By just requiring `mobile-angular-ui` as a dependency for your app you will get:

- reliable and fast touch-scroll polyfill
- Fastclick
- nobounce hack for IOS

Please note that `ngTouch` as is now, it is not your best option to deal with mobile developement and angular.js.

Mobile Angular Ui offers services to support touch enabled devices at best, and they has a similar interface to `ngTouch` one so you can use it as a drop in replacement.

The `mobile-angular-ui.gestures` module has powerfull directives and services to support `touch`, `swipe` and `drag` gestures, and it does not need any `.css` to work.

Just see how simple it is to create an Android clock like widget:

<iframe src="/examples/clock.html" class='embedded-example'></iframe>