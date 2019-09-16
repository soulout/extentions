Okta.AuthenticationMonitor=function(i,o,a,e){var u=_okta.delay,s=_okta.each,t=_okta.find,d=_okta.last,f=Okta.fn.storage.unwrapVal,r=Okta.fn.url.getOktaFederatedRequestMatchPatterns,n=Okta.fn.url.isAllowedOktaRequestForAuthMonitoring,l=false,c=false,m={},g={};var h="recorded_auth_interaction_",p="PLUGIN_SETTINGS",b="OKTA_DOMAIN",v="VERSION",R="SESSION_COOKIE",S=20,L=2e4;function q(){return m&&m.orgSettings&&m.orgSettings.pluginAuthFailureDetectionEnabled}function w(){return m&&m.orgSettings&&m.orgSettings.pluginAuthFailureDetectionShowUrlEnabled}function O(e){return i.get(h+e)}function _(e,t){i.set(h+e,t)}function I(e){i.clear(h+e)}function T(e,t){if(!t||!e){return}t.push({url:e.url,startTimeStamp:e.timeStamp});_(e.tabId,t)}function k(e,t){var r=d(t);r.method=e.method;r.statusCode=e.statusCode;r.endTimeStamp=e.timeStamp;r.responseTimeMs=Math.round(r.endTimeStamp-r.startTimeStamp);r.error=e.error;_(e.tabId,t)}function y(e){var t=f(o.get(b));if(!t){Log.warn("Failed to find Okta domain from persistent storage. Not "+"logging interaction");return}var r=f(o.get(v));if(!r){Log.warn("Failed to find plugin version from persistent storage. Not "+"logging interaction");return}var n=f(i.get(R));if(!n||!n.sid||!n.DT){Log.warn("Failed to find a valid Okta session. Not logging interaction");return}a.ajax({url:t+"/api/plugin/2/log?plugin_version="+r.backgroundVersion+"-"+r.contentVersion,type:"POST",beforeSend:function(e){e.setRequestHeader("Accept","application/json;charset=utf-8");e.setRequestHeader("Plugin-Sid",n.sid);e.setRequestHeader("X-Session-Id",n.sid);e.setRequestHeader("X-Device-Token",n.DT)},data:{message:e,logLevel:"INFO"}})}function A(e){var t=f(o.get(b));if(!t){return false}if(!e||!e.url||e.url.indexOf(t)!==0){return false}if(!n(e.url)){return false}return true}function C(e,t,r){var n="Auth Interaction: ";s(e,function(e,t){e.startTimeStamp=undefined;e.endTimeStamp=undefined;e.url=t===0||w()?encodeURI(e.url):undefined});n+=JSON.stringify(e);I(t);if(!r||c){y(n)}}function E(e){if(!e||!e.transitionQualifiers){return false}if(e.transitionType==="link"&&e.transitionQualifiers.length>0&&e.transitionQualifiers[0]==="server_redirect"){return false}return e.transitionType==="auto_subframe"||!!t(e.transitionQualifiers,function(e){return e==="client_redirect"||e==="server_redirect"})}function M(e){if(!e||!e.transitionQualifiers){return false}return e.transitionType==="typed"||e.transitionType==="auto_bookmark"||e.transitionType==="reload"}function N(){if(e==="edge"){Log.warn("AuthenticationMonitor::isSupported: this functionality "+"is currently not supported on Microsoft Edge");return false}if(!chrome.webRequest.onSendHeaders||!chrome.webRequest.onCompleted||!chrome.webRequest.onBeforeRedirect||!chrome.webRequest.onErrorOccurred||!chrome.webNavigation.onCommitted||!chrome.tabs.onRemoved){Log.warn("AuthenticationMonitor::isSupported: Current version of "+"the browser does not support this functionality");return false}return true}function H(e){if(!A(e)){return}T(e,[])}function F(e){if(!A(e)){return}var t=O(e.tabId);if(!t||t.length===0){return}k(e,t);if(e.statusCode>=400||e.error){C(t,e.tabId,false);return}}function D(e){var t=O(e.tabId);if(!t||t.length===0){return}if(t.length===1&&t[0].url===e.url){return}T(e,t)}function P(t){var e=O(t.tabId);if(!e||e.length===0){return}var r=e.length;if(r===1&&e[0].url===t.url){return}if(r===2&&t.method!=="POST"){I(t.tabId);return}var n=d(e);if(n.url!==t.url){T({timeStamp:n.endTimeStamp,url:t.url},e);n=d(e);r++}if(r===S){n.oktaError="request queue reached maximum capacity of "+S+" web requests"}k(t,e);if(t.statusCode>=400||t.error||r===S){C(e,t.tabId,false);return}if((t.method==="GET"||t.method==="POST")&&t.statusCode<300){u(function(){var e=O(t.tabId);if(!e){return}if(e.length>r){return}C(e,t.tabId,true)},L)}}function Q(e){var t=O(e.tabId);if(!t||t.length<=2){return}if(M(e)){I(e.tabId);return}if(!E(e)){t.pop();C(t,e.tabId,true);return}}function V(e){I(e)}function x(){if(!l){Log.info("AuthenticationMonitor::removeRequestListeners: "+"no listeners are attached to be removed");return}chrome.webRequest.onSendHeaders.removeListener(H);chrome.webRequest.onCompleted.removeListener(F);chrome.webRequest.onErrorOccurred.removeListener(F);chrome.webRequest.onSendHeaders.removeListener(D);chrome.webRequest.onBeforeRedirect.removeListener(P);chrome.webRequest.onCompleted.removeListener(P);chrome.webRequest.onErrorOccurred.removeListener(P);chrome.webNavigation.onCommitted.removeListener(Q);chrome.tabs.onRemoved.removeListener(V);l=false;Log.info("AuthenticationMonitor::removeRequestListeners: "+"removed all listeners")}function B(){if(l){Log.info("AuthenticationMonitor::addRequestListeners: "+"listeners already attached");return}var e=r();chrome.webRequest.onSendHeaders.addListener(H,{urls:e},["requestHeaders"]);chrome.webRequest.onCompleted.addListener(F,{urls:e});chrome.webRequest.onErrorOccurred.addListener(F,{urls:e});chrome.webRequest.onSendHeaders.addListener(D,{urls:["<all_urls>"],types:["main_frame"]},["requestHeaders"]);chrome.webRequest.onBeforeRedirect.addListener(P,{urls:["<all_urls>"],types:["main_frame"]});chrome.webRequest.onCompleted.addListener(P,{urls:["<all_urls>"],types:["main_frame"]});chrome.webRequest.onErrorOccurred.addListener(P,{urls:["<all_urls>"],types:["main_frame"]});chrome.webNavigation.onCommitted.addListener(Q);chrome.tabs.onRemoved.addListener(V);l=true;Log.info("AuthenticationMonitor::addRequestListeners: "+"added all listeners")}g.initialize=function(e){c=!!e;if(!N()){return}m=f(o.get(p));if(!q()){Log.info("AuthenticationMonitor::initialize: Auth monitoring feature "+"is disabled");x();return}B()};return g};