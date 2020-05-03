# Micro Frontends Sample Code
## Overview

![micro_frontends_sample](https://res.cloudinary.com/silverbirder/image/upload/v1588512356/micro-frontends-sample-code/micro_frontends_sample.jpg)
http://team-page.fly.dev

|Team|Javascript Framework|Concept|Component|Endpoint|
|----|----|----|----|----|
|Page|None|Provides the function to integrate all team services.|None|https://team-page.fly.dev|
|Search|Vue.js|Provides the ability to easily find products.|Search Box|https://team-search.fly.dev|
|Product|React.js|Provides a great product appeal.|Items|https://team-product.fly.dev|

## Frontend Building Library

It's the [Podium](https://podium-lib.io). 

> Podium is a library for building micro frontends.

※ https://podium-lib.io/docs/podium/conceptual_overview

* @podium/podlet
  * Module for building page fragment servers for micro frontend architectures.
  * https://podium-lib.io/docs/api/podlet
* @podium/layout
  * In Podium a layout server is mainly responsible for fetching HTML fragments (podlets) and stitching these fragments together into an HTML page (a layout).
  * https://podium-lib.io/docs/api/layout
* @podium/browser
  * The @podium/browser package contains classes to provide browser based functionality when building Podium micro-frontends.
  * https://podium-lib.io/docs/api/browser

```bash
$ curl https://team-search.fly.dev/manifest.json | jq .
  {
    "name": "search",
    "version": "1.0.0",
    "content": "/",
    "fallback": "",
    "assets": {
      "js": "/search/static/fragment.js",
      "css": ""
    },
    "css": [],
    "js": [
      {
        "value": "/search/static/fragment.js",
        "async": true,
        "defer": true,
        "type": "default"
      }
    ],
    "proxy": {}
  }
$ curl https://team-product.fly.dev/manifest.json | jq .
  {
    "name": "product",
    "version": "1.0.0",
    "content": "/",
    "fallback": "",
    "assets": {
      "js": "/product/static/fragment.js",
      "css": ""
    },
    "css": [],
    "js": [
      {
        "value": "/product/static/fragment.js",
        "async": true,
        "type": "default"
      }
    ],
    "proxy": {}
  }
```