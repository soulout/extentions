!function(e){var n={};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=422)}({422:function(e,n,o){"use strict";var t=!1,r=0,l=void 0;function i(){chrome.runtime.sendMessage("apollo-panel-shown"),!0}function s(){chrome.runtime.sendMessage("apollo-panel-hidden"),!1}function a(){t||r++>120||(!1,!1,chrome.devtools.inspectedWindow.eval("!!(window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__.ApolloClient || window.__APOLLO_DEVTOOLS_SHOULD_DISPLAY_PANEL__);",function(e,n){n&&console.warn(n),e&&!t&&(l&&clearInterval(l),t=!0,chrome.devtools.panels.create("Apollo","./imgs/logo_devtools.png","devtools.html",function(e){e.onShown.addListener(i),e.onHidden.addListener(s)}))}))}chrome.devtools.network.onNavigated.addListener(a),l=setInterval(a,1e3),a()}});