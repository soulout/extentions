!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=438)}({438:function(e,n,t){"use strict";var o=chrome.runtime.connect({name:"content-script"});function r(e){window.postMessage({source:"apollo-devtools-proxy",payload:e},"*")}function a(e){e.data&&"apollo-devtools-backend"===e.data.source&&o.postMessage(e.data.payload)}o.onMessage.addListener(r),window.addEventListener("message",a),o.onDisconnect.addListener(function(){window.removeEventListener("message",a),r("shutdown")}),r("init")}});