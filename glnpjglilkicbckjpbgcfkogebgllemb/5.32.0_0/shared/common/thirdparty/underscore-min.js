(function(){var n=this;var r=n._;var e=Array.prototype,a=Object.prototype,f="Function",t=Okta.window[f].prototype;var i=e.push,c=e.slice,s=a.toString,u=a.hasOwnProperty;var o=Array.isArray,l=Object.keys,v=t.bind,p=Object.create;var h=function(){};var y=function(n){if(n instanceof y)return n;if(!(this instanceof y))return new y(n);this._wrapped=n};n._okta=y;y.VERSION="1.8.3";var d=function(i,u,n){if(u===void 0)return i;switch(n==null?3:n){case 1:return function(n){return i.call(u,n)};case 2:return function(n,r){return i.call(u,n,r)};case 3:return function(n,r,t){return i.call(u,n,r,t)};case 4:return function(n,r,t,e){return i.call(u,n,r,t,e)}}return function(){return i.apply(u,arguments)}};var g=function(n,r,t){if(n==null)return y.identity;if(y.isFunction(n))return d(n,r,t);if(y.isObject(n))return y.matcher(n);return y.property(n)};y.iteratee=function(n,r){return g(n,r,Infinity)};var m=function(f,c){return function(n){var r=arguments.length;if(r<2||n==null)return n;for(var t=1;t<r;t++){var e=arguments[t],i=f(e),u=i.length;for(var a=0;a<u;a++){var o=i[a];if(!c||n[o]===void 0)n[o]=e[o]}}return n}};var b=function(n){if(!y.isObject(n))return{};if(p)return p(n);h.prototype=n;var r=new h;h.prototype=null;return r};var w=function(r){return function(n){return n==null?void 0:n[r]}};var _=Math.pow(2,53)-1;var j=w("length");var x=function(n){var r=j(n);return typeof r=="number"&&r>=0&&r<=_};y.each=y.forEach=function(n,r,t){r=d(r,t);var e,i;if(x(n)){for(e=0,i=n.length;e<i;e++){r(n[e],e,n)}}else{var u=y.keys(n);for(e=0,i=u.length;e<i;e++){r(n[u[e]],u[e],n)}}return n};y.map=y.collect=function(n,r,t){r=g(r,t);var e=!x(n)&&y.keys(n),i=(e||n).length,u=Array(i);for(var a=0;a<i;a++){var o=e?e[a]:a;u[a]=r(n[o],o,n)}return u};function k(o){function f(n,r,t,e,i,u){for(;i>=0&&i<u;i+=o){var a=e?e[i]:i;t=r(t,n[a],a,n)}return t}return function(n,r,t,e){r=d(r,e,4);var i=!x(n)&&y.keys(n),u=(i||n).length,a=o>0?0:u-1;if(arguments.length<3){t=n[i?i[a]:a];a+=o}return f(n,r,t,i,a,u)}}y.reduce=y.foldl=y.inject=k(1);y.reduceRight=y.foldr=k(-1);y.find=y.detect=function(n,r,t){var e;if(x(n)){e=y.findIndex(n,r,t)}else{e=y.findKey(n,r,t)}if(e!==void 0&&e!==-1)return n[e]};y.filter=y.select=function(n,e,r){var i=[];e=g(e,r);y.each(n,function(n,r,t){if(e(n,r,t))i.push(n)});return i};y.reject=function(n,r,t){return y.filter(n,y.negate(g(r)),t)};y.every=y.all=function(n,r,t){r=g(r,t);var e=!x(n)&&y.keys(n),i=(e||n).length;for(var u=0;u<i;u++){var a=e?e[u]:u;if(!r(n[a],a,n))return false}return true};y.some=y.any=function(n,r,t){r=g(r,t);var e=!x(n)&&y.keys(n),i=(e||n).length;for(var u=0;u<i;u++){var a=e?e[u]:u;if(r(n[a],a,n))return true}return false};y.contains=y.includes=y.include=function(n,r,t,e){if(!x(n))n=y.values(n);if(typeof t!="number"||e)t=0;return y.indexOf(n,r,t)>=0};y.invoke=function(n,t){var e=c.call(arguments,2);var i=y.isFunction(t);return y.map(n,function(n){var r=i?t:n[t];return r==null?r:r.apply(n,e)})};y.pluck=function(n,r){return y.map(n,y.property(r))};y.where=function(n,r){return y.filter(n,y.matcher(r))};y.findWhere=function(n,r){return y.find(n,y.matcher(r))};y.max=function(n,e,r){var i=-Infinity,u=-Infinity,t,a;if(e==null&&n!=null){n=x(n)?n:y.values(n);for(var o=0,f=n.length;o<f;o++){t=n[o];if(t>i){i=t}}}else{e=g(e,r);y.each(n,function(n,r,t){a=e(n,r,t);if(a>u||a===-Infinity&&i===-Infinity){i=n;u=a}})}return i};y.min=function(n,e,r){var i=Infinity,u=Infinity,t,a;if(e==null&&n!=null){n=x(n)?n:y.values(n);for(var o=0,f=n.length;o<f;o++){t=n[o];if(t<i){i=t}}}else{e=g(e,r);y.each(n,function(n,r,t){a=e(n,r,t);if(a<u||a===Infinity&&i===Infinity){i=n;u=a}})}return i};y.shuffle=function(n){var r=x(n)?n:y.values(n);var t=r.length;var e=Array(t);for(var i=0,u;i<t;i++){u=y.random(0,i);if(u!==i)e[i]=e[u];e[u]=r[i]}return e};y.sample=function(n,r,t){if(r==null||t){if(!x(n))n=y.values(n);return n[y.random(n.length-1)]}return y.shuffle(n).slice(0,Math.max(0,r))};y.sortBy=function(n,e,r){e=g(e,r);return y.pluck(y.map(n,function(n,r,t){return{value:n,index:r,criteria:e(n,r,t)}}).sort(function(n,r){var t=n.criteria;var e=r.criteria;if(t!==e){if(t>e||t===void 0)return 1;if(t<e||e===void 0)return-1}return n.index-r.index}),"value")};var O=function(a){return function(e,i,n){var u={};i=g(i,n);y.each(e,function(n,r){var t=i(n,r,e);a(u,n,t)});return u}};y.groupBy=O(function(n,r,t){if(y.has(n,t))n[t].push(r);else n[t]=[r]});y.indexBy=O(function(n,r,t){n[t]=r});y.countBy=O(function(n,r,t){if(y.has(n,t))n[t]++;else n[t]=1});y.toArray=function(n){if(!n)return[];if(y.isArray(n))return c.call(n);if(x(n))return y.map(n,y.identity);return y.values(n)};y.size=function(n){if(n==null)return 0;return x(n)?n.length:y.keys(n).length};y.partition=function(n,e,r){e=g(e,r);var i=[],u=[];y.each(n,function(n,r,t){(e(n,r,t)?i:u).push(n)});return[i,u]};y.first=y.head=y.take=function(n,r,t){if(n==null)return void 0;if(r==null||t)return n[0];return y.initial(n,n.length-r)};y.initial=function(n,r,t){return c.call(n,0,Math.max(0,n.length-(r==null||t?1:r)))};y.last=function(n,r,t){if(n==null)return void 0;if(r==null||t)return n[n.length-1];return y.rest(n,Math.max(0,n.length-r))};y.rest=y.tail=y.drop=function(n,r,t){return c.call(n,r==null||t?1:r)};y.compact=function(n){return y.filter(n,y.identity)};var A=function(n,r,t,e){var i=[],u=0;for(var a=e||0,o=j(n);a<o;a++){var f=n[a];if(x(f)&&(y.isArray(f)||y.isArguments(f))){if(!r)f=A(f,r,t);var c=0,l=f.length;i.length+=l;while(c<l){i[u++]=f[c++]}}else if(!t){i[u++]=f}}return i};y.flatten=function(n,r){return A(n,r,false)};y.without=function(n){return y.difference(n,c.call(arguments,1))};y.uniq=y.unique=function(n,r,t,e){if(!y.isBoolean(r)){e=t;t=r;r=false}if(t!=null)t=g(t,e);var i=[];var u=[];for(var a=0,o=j(n);a<o;a++){var f=n[a],c=t?t(f,a,n):f;if(r){if(!a||u!==c)i.push(f);u=c}else if(t){if(!y.contains(u,c)){u.push(c);i.push(f)}}else if(!y.contains(i,f)){i.push(f)}}return i};y.union=function(){return y.uniq(A(arguments,true,true))};y.intersection=function(n){var r=[];var t=arguments.length;for(var e=0,i=j(n);e<i;e++){var u=n[e];if(y.contains(r,u))continue;for(var a=1;a<t;a++){if(!y.contains(arguments[a],u))break}if(a===t)r.push(u)}return r};y.difference=function(n){var r=A(arguments,true,true,1);return y.filter(n,function(n){return!y.contains(r,n)})};y.zip=function(){return y.unzip(arguments)};y.unzip=function(n){var r=n&&y.max(n,j).length||0;var t=Array(r);for(var e=0;e<r;e++){t[e]=y.pluck(n,e)}return t};y.object=function(n,r){var t={};for(var e=0,i=j(n);e<i;e++){if(r){t[n[e]]=r[e]}else{t[n[e][0]]=n[e][1]}}return t};function I(u){return function(n,r,t){r=g(r,t);var e=j(n);var i=u>0?0:e-1;for(;i>=0&&i<e;i+=u){if(r(n[i],i,n))return i}return-1}}y.findIndex=I(1);y.findLastIndex=I(-1);y.sortedIndex=function(n,r,t,e){t=g(t,e,1);var i=t(r);var u=0,a=j(n);while(u<a){var o=Math.floor((u+a)/2);if(t(n[o])<i)u=o+1;else a=o}return u};function S(u,a,o){return function(n,r,t){var e=0,i=j(n);if(typeof t=="number"){if(u>0){e=t>=0?t:Math.max(t+i,e)}else{i=t>=0?Math.min(t+1,i):t+i+1}}else if(o&&t&&i){t=o(n,r);return n[t]===r?t:-1}if(r!==r){t=a(c.call(n,e,i),y.isNaN);return t>=0?t+e:-1}for(t=u>0?e:i-1;t>=0&&t<i;t+=u){if(n[t]===r)return t}return-1}}y.indexOf=S(1,y.findIndex,y.sortedIndex);y.lastIndexOf=S(-1,y.findLastIndex);y.range=function(n,r,t){if(r==null){r=n||0;n=0}t=t||1;var e=Math.max(Math.ceil((r-n)/t),0);var i=Array(e);for(var u=0;u<e;u++,n+=t){i[u]=n}return i};var F=function(n,r,t,e,i){if(!(e instanceof r))return n.apply(t,i);var u=b(n.prototype);var a=n.apply(u,i);if(y.isObject(a))return a;return u};y.bind=function(n,r){if(v&&n.bind===v)return v.apply(n,c.call(arguments,1));if(!y.isFunction(n))throw new TypeError("Bind must be called on a function");var t=c.call(arguments,2);var e=function(){return F(n,e,r,this,t.concat(c.call(arguments)))};return e};y.partial=function(i){var u=c.call(arguments,1);var a=function(){var n=0,r=u.length;var t=Array(r);for(var e=0;e<r;e++){t[e]=u[e]===y?arguments[n++]:u[e]}while(n<arguments.length)t.push(arguments[n++]);return F(i,a,this,this,t)};return a};y.bindAll=function(n){var r,t=arguments.length,e;if(t<=1)throw new Error("bindAll must be passed function names");for(r=1;r<t;r++){e=arguments[r];n[e]=y.bind(n[e],n)}return n};y.memoize=function(e,i){var u=function(n){var r=u.cache;var t=""+(i?i.apply(this,arguments):n);if(!y.has(r,t))r[t]=e.apply(this,arguments);return r[t]};u.cache={};return u};y.delay=function(n,r){var t=c.call(arguments,2);return setTimeout(function(){return n.apply(null,t)},r)};y.defer=y.partial(y.delay,y,1);y.throttle=function(t,e,i){var u,a,o;var f=null;var c=0;if(!i)i={};var l=function(){c=i.leading===false?0:y.now();f=null;o=t.apply(u,a);if(!f)u=a=null};return function(){var n=y.now();if(!c&&i.leading===false)c=n;var r=e-(n-c);u=this;a=arguments;if(r<=0||r>e){if(f){clearTimeout(f);f=null}c=n;o=t.apply(u,a);if(!f)u=a=null}else if(!f&&i.trailing!==false){f=Okta.WindowUtil.setTimeout(l,r)}return o}};y.debounce=function(r,t,e){var i,u,a,o,f;var c=function(){var n=y.now()-o;if(n<t&&n>=0){i=Okta.WindowUtil.setTimeout(c,t-n)}else{i=null;if(!e){f=r.apply(a,u);if(!i)a=u=null}}};return function(){a=this;u=arguments;o=y.now();var n=e&&!i;if(!i)i=Okta.WindowUtil.setTimeout(c,t);if(n){f=r.apply(a,u);a=u=null}return f}};y.wrap=function(n,r){return y.partial(r,n)};y.negate=function(n){return function(){return!n.apply(this,arguments)}};y.compose=function(){var t=arguments;var e=t.length-1;return function(){var n=e;var r=t[e].apply(this,arguments);while(n--)r=t[n].call(this,r);return r}};y.after=function(n,r){return function(){if(--n<1){return r.apply(this,arguments)}}};y.before=function(n,r){var t;return function(){if(--n>0){t=r.apply(this,arguments)}if(n<=1)r=null;return t}};y.once=y.partial(y.before,2);var E=!{toString:null}.propertyIsEnumerable("toString");var M=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];function N(n,r){var t=M.length;var e=n.constructor;var i=y.isFunction(e)&&e.prototype||a;var u="constructor";if(y.has(n,u)&&!y.contains(r,u))r.push(u);while(t--){u=M[t];if(u in n&&n[u]!==i[u]&&!y.contains(r,u)){r.push(u)}}}y.keys=function(n){if(!y.isObject(n))return[];if(l)return l(n);var r=[];for(var t in n)if(y.has(n,t))r.push(t);if(E)N(n,r);return r};y.allKeys=function(n){if(!y.isObject(n))return[];var r=[];for(var t in n)r.push(t);if(E)N(n,r);return r};y.values=function(n){var r=y.keys(n);var t=r.length;var e=Array(t);for(var i=0;i<t;i++){e[i]=n[r[i]]}return e};y.mapObject=function(n,r,t){r=g(r,t);var e=y.keys(n),i=e.length,u={},a;for(var o=0;o<i;o++){a=e[o];u[a]=r(n[a],a,n)}return u};y.pairs=function(n){var r=y.keys(n);var t=r.length;var e=Array(t);for(var i=0;i<t;i++){e[i]=[r[i],n[r[i]]]}return e};y.invert=function(n){var r={};var t=y.keys(n);for(var e=0,i=t.length;e<i;e++){r[n[t[e]]]=t[e]}return r};y.functions=y.methods=function(n){var r=[];for(var t in n){if(y.isFunction(n[t]))r.push(t)}return r.sort()};y.extend=m(y.allKeys);y.extendOwn=y.assign=m(y.keys);y.findKey=function(n,r,t){r=g(r,t);var e=y.keys(n),i;for(var u=0,a=e.length;u<a;u++){i=e[u];if(r(n[i],i,n))return i}};y.pick=function(n,r,t){var e={},i=n,u,a;if(i==null)return e;if(y.isFunction(r)){a=y.allKeys(i);u=d(r,t)}else{a=A(arguments,false,false,1);u=function(n,r,t){return r in t};i=Object(i)}for(var o=0,f=a.length;o<f;o++){var c=a[o];var l=i[c];if(u(l,c,i))e[c]=l}return e};y.omit=function(n,r,t){if(y.isFunction(r)){r=y.negate(r)}else{var e=y.map(A(arguments,false,false,1),String);r=function(n,r){return!y.contains(e,r)}}return y.pick(n,r,t)};y.defaults=m(y.allKeys,true);y.create=function(n,r){var t=b(n);if(r)y.extendOwn(t,r);return t};y.clone=function(n){if(!y.isObject(n))return n;return y.isArray(n)?n.slice():y.extend({},n)};y.tap=function(n,r){r(n);return n};y.isMatch=function(n,r){var t=y.keys(r),e=t.length;if(n==null)return!e;var i=Object(n);for(var u=0;u<e;u++){var a=t[u];if(r[a]!==i[a]||!(a in i))return false}return true};var B=function(n,r,t,e){if(n===r)return n!==0||1/n===1/r;if(n==null||r==null)return n===r;if(n instanceof y)n=n._wrapped;if(r instanceof y)r=r._wrapped;var i=s.call(n);if(i!==s.call(r))return false;switch(i){case"[object RegExp]":case"[object String]":return""+n===""+r;case"[object Number]":if(+n!==+n)return+r!==+r;return+n===0?1/+n===1/r:+n===+r;case"[object Date]":case"[object Boolean]":return+n===+r}var u=i==="[object Array]";if(!u){if(typeof n!="object"||typeof r!="object")return false;var a=n.constructor,o=r.constructor;if(a!==o&&!(y.isFunction(a)&&a instanceof a&&y.isFunction(o)&&o instanceof o)&&("constructor"in n&&"constructor"in r)){return false}}t=t||[];e=e||[];var f=t.length;while(f--){if(t[f]===n)return e[f]===r}t.push(n);e.push(r);if(u){f=n.length;if(f!==r.length)return false;while(f--){if(!B(n[f],r[f],t,e))return false}}else{var c=y.keys(n),l;f=c.length;if(y.keys(r).length!==f)return false;while(f--){l=c[f];if(!(y.has(r,l)&&B(n[l],r[l],t,e)))return false}}t.pop();e.pop();return true};y.isEqual=function(n,r){return B(n,r)};y.isEmpty=function(n){if(n==null)return true;if(x(n)&&(y.isArray(n)||y.isString(n)||y.isArguments(n)))return n.length===0;return y.keys(n).length===0};y.isElement=function(n){return!!(n&&n.nodeType===1)};y.isArray=o||function(n){return s.call(n)==="[object Array]"};y.isObject=function(n){var r=typeof n;return r==="function"||r==="object"&&!!n};y.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(r){y["is"+r]=function(n){return s.call(n)==="[object "+r+"]"}});if(!y.isArguments(arguments)){y.isArguments=function(n){return y.has(n,"callee")}}if(typeof/./!="function"&&typeof Int8Array!="object"){y.isFunction=function(n){return typeof n=="function"||false}}y.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))};y.isNaN=function(n){return y.isNumber(n)&&n!==+n};y.isBoolean=function(n){return n===true||n===false||s.call(n)==="[object Boolean]"};y.isNull=function(n){return n===null};y.isUndefined=function(n){return n===void 0};y.has=function(n,r){return n!=null&&u.call(n,r)};y.noConflict=function(){n._=r;return this};y.identity=function(n){return n};y.constant=function(n){return function(){return n}};y.noop=function(){};y.property=w;y.propertyOf=function(r){return r==null?function(){}:function(n){return r[n]}};y.matcher=y.matches=function(r){r=y.extendOwn({},r);return function(n){return y.isMatch(n,r)}};y.times=function(n,r,t){var e=Array(Math.max(0,n));r=d(r,t,1);for(var i=0;i<n;i++)e[i]=r(i);return e};y.random=function(n,r){if(r==null){r=n;n=0}return n+Math.floor(Math.random()*(r-n+1))};y.now=Date.now||function(){return(new Date).getTime()};var T={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};var R=y.invert(T);var q=function(r){var t=function(n){return r[n]};var n="(?:"+y.keys(r).join("|")+")";var e=RegExp(n);var i=RegExp(n,"g");return function(n){n=n==null?"":""+n;return e.test(n)?n.replace(i,t):n}};y.escape=q(T);y.unescape=q(R);y.result=function(n,r,t){var e=n==null?void 0:n[r];if(e===void 0){e=t}return y.isFunction(e)?e.call(n):e};var K=0;y.uniqueId=function(n){var r=++K+"";return n?n+r:r};y.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var z=/(.)^/;var D={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"};var U=/\\|'|\r|\n|\u2028|\u2029/g;var W=function(n){return"\\"+D[n]};y.template=function(u,n,r){if(!n&&r)n=r;n=y.defaults({},n,y.templateSettings);var t=RegExp([(n.escape||z).source,(n.interpolate||z).source,(n.evaluate||z).source].join("|")+"|$","g");var a=0;var o="__p+='";u.replace(t,function(n,r,t,e,i){o+=u.slice(a,i).replace(U,W);a=i+n.length;if(r){o+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"}else if(t){o+="'+\n((__t=("+t+"))==null?'':__t)+\n'"}else if(e){o+="';\n"+e+"\n__p+='"}return n});o+="';\n";if(!n.variable)o="with(obj||{}){\n"+o+"}\n";o="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{render=new Okta.window[f](n.variable||"obj","_",o)}catch(n){n.source=o;throw n}var e=function(n){return render.call(this,n,y)};var i=n.variable||"obj";e.source="function("+i+"){\n"+o+"}";return e};y.chain=function(n){var r=y(n);r._chain=true;return r};var L=function(n,r){return n._chain?y(r).chain():r};y.mixin=function(t){y.each(y.functions(t),function(n){var r=y[n]=t[n];y.prototype[n]=function(){var n=[this._wrapped];i.apply(n,arguments);return L(this,r.apply(y,n))}})};y.mixin(y);y.each(["pop","push","reverse","shift","sort","splice","unshift"],function(r){var t=e[r];y.prototype[r]=function(){var n=this._wrapped;t.apply(n,arguments);if((r==="shift"||r==="splice")&&n.length===0)delete n[0];return L(this,n)}});y.each(["concat","join","slice"],function(n){var r=e[n];y.prototype[n]=function(){return L(this,r.apply(this._wrapped,arguments))}});y.prototype.value=function(){return this._wrapped};y.prototype.valueOf=y.prototype.toJSON=y.prototype.value;y.prototype.toString=function(){return""+this._wrapped}}).call(Okta.window);