---
title: "Mobile Angular UI 1.3.1 Released"
created_at: 2016-08-28
description: "Mobile Angular UI 1.3.1 release notes"
kind: article
toc: true
comments: true
published: true
---

Not many features in this in this release, but some important fixes and a lot of quality.

From now on Mobile Angular UI releases will be more skinny and frequent thanks to automated tests, CI and a simplified and standardized process.

## Welcome NPM (many thanks to npm support)

In the early stages of maui some random guy took `mobile-angular-ui` package on npm and refused to give it up untill npm support guys forcefully transfered the ownership.

So from now on mobile-angular-ui will be distributed through npm.

```
npm i --save mobile-angular-ui
```

## Features

- support for UI-Router: added `ui-shared-state` and **deprecated** `ui-state` so it does not clash with ui-router directives ([9ad2f57](https://github.com/mcasimir/mobile-angular-ui/commits/9ad2f578a3fb0c68c22a29ee415b04113251ce4f))
- activeLinks module supports html5Mode ([d3cbbbf](https://github.com/mcasimir/mobile-angular-ui/commits/d3cbbbf07c74dc4e3631f0ad3cd22bbc3c3d7b20))
- updated fastclick to version 1.0.6 ([03060e2](https://github.com/mcasimir/mobile-angular-ui/commit/03060e2786800cdfc43c1586da889dffeb9b19e3))
- updated font-awesome to version 4.6.3 ([9f7424c](https://github.com/mcasimir/mobile-angular-ui/commit/9f7424c6c1e5103d8d3c5a195bdc0bd16fe66494))

## Fixes

- removed webdriver postinstall hook  ([2a43565](https://github.com/mcasimir/mobile-angular-ui/commits/2a4356537ed4b2522fb4eb2d2dfd08f7f7a405a5))
- Implemented workaround for jQuery event normalization ([a3bb0e7](https://github.com/breeze4/mobile-angular-ui/commit/a3bb0e77c70fa2bac94de7da1f37abbacc1b6740))
- scrollTo behavior when `scrollableHeader` is present ([54b0e41](https://github.com/mcasimir/mobile-angular-ui/commit/54b0e41df668c6dba5c401e53c47dd704a6ea702))
