!function(e){var t=window.webpackHotUpdate;window.webpackHotUpdate=function(e,n){!function(e,t){if(!y[e]||!x[e])return;for(var n in x[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(h[n]=t[n]);0==--m&&0===D&&g()}(e,n),t&&t(e,n)};var n,r=!0,a="3e4d034ecf8ee40094a0",o={},l=[],i=[];function u(e){var t=_[e];if(!t)return I;var r=function(r){return t.hot.active?(_[r]?-1===_[r].parents.indexOf(e)&&_[r].parents.push(e):(l=[e],n=r),-1===t.children.indexOf(r)&&t.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),l=[]),I(r)},a=function(e){return{configurable:!0,enumerable:!0,get:function(){return I[e]},set:function(t){I[e]=t}}};for(var o in I)Object.prototype.hasOwnProperty.call(I,o)&&"e"!==o&&"t"!==o&&Object.defineProperty(r,o,a(o));return r.e=function(e){return"ready"===s&&d("prepare"),D++,I.e(e).then(t,(function(e){throw t(),e}));function t(){D--,"prepare"===s&&(T[e]||N(e),0===D&&0===m&&g())}},r.t=function(e,t){return 1&t&&(e=r(e)),I.t(e,-2&t)},r}function c(t){var r={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:n!==t,active:!0,accept:function(e,t){if(void 0===e)r._selfAccepted=!0;else if("function"==typeof e)r._selfAccepted=e;else if("object"==typeof e)for(var n=0;n<e.length;n++)r._acceptedDependencies[e[n]]=t||function(){};else r._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)r._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)r._declinedDependencies[e[t]]=!0;else r._declinedDependencies[e]=!0},dispose:function(e){r._disposeHandlers.push(e)},addDisposeHandler:function(e){r._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=r._disposeHandlers.indexOf(e);t>=0&&r._disposeHandlers.splice(t,1)},invalidate:function(){switch(this._selfInvalidated=!0,s){case"idle":(h={})[t]=e[t],d("ready");break;case"ready":P(t);break;case"prepare":case"check":case"dispose":case"apply":(w=w||[]).push(t)}},check:M,apply:O,status:function(e){if(!e)return s;p.push(e)},addStatusHandler:function(e){p.push(e)},removeStatusHandler:function(e){var t=p.indexOf(e);t>=0&&p.splice(t,1)},data:o[t]};return n=void 0,r}var p=[],s="idle";function d(e){s=e;for(var t=0;t<p.length;t++)p[t].call(null,e)}var f,h,v,w,m=0,D=0,T={},x={},y={};function b(e){return+e+""===e?+e:e}function M(e){if("idle"!==s)throw new Error("check() is only allowed in idle status");return r=e,d("check"),(t=1e4,t=t||1e4,new Promise((function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var r=new XMLHttpRequest,o=I.p+""+a+".hot-update.json";r.open("GET",o,!0),r.timeout=t,r.send(null)}catch(e){return n(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)n(new Error("Manifest request to "+o+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)n(new Error("Manifest request to "+o+" failed."));else{try{var t=JSON.parse(r.responseText)}catch(e){return void n(e)}e(t)}}}))).then((function(e){if(!e)return d(A()?"ready":"idle"),null;x={},T={},y=e.c,v=e.h,d("prepare");var t=new Promise((function(e,t){f={resolve:e,reject:t}}));h={};return N(5),"prepare"===s&&0===D&&0===m&&g(),t}));var t}function N(e){y[e]?(x[e]=!0,m++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=I.p+""+e+"."+a+".hot-update.js",document.head.appendChild(t)}(e)):T[e]=!0}function g(){d("ready");var e=f;if(f=null,e)if(r)Promise.resolve().then((function(){return O(r)})).then((function(t){e.resolve(t)}),(function(t){e.reject(t)}));else{var t=[];for(var n in h)Object.prototype.hasOwnProperty.call(h,n)&&t.push(b(n));e.resolve(t)}}function O(t){if("ready"!==s)throw new Error("apply() is only allowed in ready status");return function t(r){var i,u,c,p,s;function f(e){for(var t=[e],n={},r=t.map((function(e){return{chain:[e],id:e}}));r.length>0;){var a=r.pop(),o=a.id,l=a.chain;if((p=_[o])&&(!p.hot._selfAccepted||p.hot._selfInvalidated)){if(p.hot._selfDeclined)return{type:"self-declined",chain:l,moduleId:o};if(p.hot._main)return{type:"unaccepted",chain:l,moduleId:o};for(var i=0;i<p.parents.length;i++){var u=p.parents[i],c=_[u];if(c){if(c.hot._declinedDependencies[o])return{type:"declined",chain:l.concat([u]),moduleId:o,parentId:u};-1===t.indexOf(u)&&(c.hot._acceptedDependencies[o]?(n[u]||(n[u]=[]),m(n[u],[o])):(delete n[u],t.push(u),r.push({chain:l.concat([u]),id:u})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];-1===e.indexOf(r)&&e.push(r)}}A();var D={},T=[],x={},M=function(){console.warn("[HMR] unexpected require("+g.moduleId+") to disposed module")};for(var N in h)if(Object.prototype.hasOwnProperty.call(h,N)){var g;s=b(N),g=h[N]?f(s):{type:"disposed",moduleId:N};var O=!1,P=!1,F=!1,k="";switch(g.chain&&(k="\nUpdate propagation: "+g.chain.join(" -> ")),g.type){case"self-declined":r.onDeclined&&r.onDeclined(g),r.ignoreDeclined||(O=new Error("Aborted because of self decline: "+g.moduleId+k));break;case"declined":r.onDeclined&&r.onDeclined(g),r.ignoreDeclined||(O=new Error("Aborted because of declined dependency: "+g.moduleId+" in "+g.parentId+k));break;case"unaccepted":r.onUnaccepted&&r.onUnaccepted(g),r.ignoreUnaccepted||(O=new Error("Aborted because "+s+" is not accepted"+k));break;case"accepted":r.onAccepted&&r.onAccepted(g),P=!0;break;case"disposed":r.onDisposed&&r.onDisposed(g),F=!0;break;default:throw new Error("Unexception type "+g.type)}if(O)return d("abort"),Promise.reject(O);if(P)for(s in x[s]=h[s],m(T,g.outdatedModules),g.outdatedDependencies)Object.prototype.hasOwnProperty.call(g.outdatedDependencies,s)&&(D[s]||(D[s]=[]),m(D[s],g.outdatedDependencies[s]));F&&(m(T,[g.moduleId]),x[s]=M)}var j,E=[];for(u=0;u<T.length;u++)s=T[u],_[s]&&_[s].hot._selfAccepted&&x[s]!==M&&!_[s].hot._selfInvalidated&&E.push({module:s,parents:_[s].parents.slice(),errorHandler:_[s].hot._selfAccepted});d("dispose"),Object.keys(y).forEach((function(e){!1===y[e]&&function(e){delete installedChunks[e]}(e)}));var H,S,C=T.slice();for(;C.length>0;)if(s=C.pop(),p=_[s]){var V={},G=p.hot._disposeHandlers;for(c=0;c<G.length;c++)(i=G[c])(V);for(o[s]=V,p.hot.active=!1,delete _[s],delete D[s],c=0;c<p.children.length;c++){var R=_[p.children[c]];R&&((j=R.parents.indexOf(s))>=0&&R.parents.splice(j,1))}}for(s in D)if(Object.prototype.hasOwnProperty.call(D,s)&&(p=_[s]))for(S=D[s],c=0;c<S.length;c++)H=S[c],(j=p.children.indexOf(H))>=0&&p.children.splice(j,1);d("apply"),void 0!==v&&(a=v,v=void 0);for(s in h=void 0,x)Object.prototype.hasOwnProperty.call(x,s)&&(e[s]=x[s]);var L=null;for(s in D)if(Object.prototype.hasOwnProperty.call(D,s)&&(p=_[s])){S=D[s];var U=[];for(u=0;u<S.length;u++)if(H=S[u],i=p.hot._acceptedDependencies[H]){if(-1!==U.indexOf(i))continue;U.push(i)}for(u=0;u<U.length;u++){i=U[u];try{i(S)}catch(e){r.onErrored&&r.onErrored({type:"accept-errored",moduleId:s,dependencyId:S[u],error:e}),r.ignoreErrored||L||(L=e)}}}for(u=0;u<E.length;u++){var B=E[u];s=B.module,l=B.parents,n=s;try{I(s)}catch(e){if("function"==typeof B.errorHandler)try{B.errorHandler(e)}catch(t){r.onErrored&&r.onErrored({type:"self-accept-error-handler-errored",moduleId:s,error:t,originalError:e}),r.ignoreErrored||L||(L=t),L||(L=e)}else r.onErrored&&r.onErrored({type:"self-accept-errored",moduleId:s,error:e}),r.ignoreErrored||L||(L=e)}}if(L)return d("fail"),Promise.reject(L);if(w)return t(r).then((function(e){return T.forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e}));return d("idle"),new Promise((function(e){e(T)}))}(t=t||{})}function A(){if(w)return h||(h={}),w.forEach(P),w=void 0,!0}function P(t){Object.prototype.hasOwnProperty.call(h,t)||(h[t]=e[t])}var _={};function I(t){if(_[t])return _[t].exports;var n=_[t]={i:t,l:!1,exports:{},hot:c(t),parents:(i=l,l=[],i),children:[]};return e[t].call(n.exports,n,n.exports,u(t)),n.l=!0,n.exports}I.m=e,I.c=_,I.d=function(e,t,n){I.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},I.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},I.t=function(e,t){if(1&t&&(e=I(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(I.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)I.d(n,r,function(t){return e[t]}.bind(null,r));return n},I.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return I.d(t,"a",t),t},I.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},I.p="",I.h=function(){return a},u(51)(I.s=51)}({51:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.r(t),n.d(t,"default",(function(){return a}));var a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.climateVariableValue=t,this.climateVariableValueNames=[{value:"1inch",pullDownText:"Days with Precipitation Greater than 1 inch",chartTitle:"Number of Days with Precipitation Greater than 1 inch"},{value:"2inch",pullDownText:"Days with Precipitation Greater than 2 inches",chartTitle:"Number of Days with Precipitation Greater than 2 inches"},{value:"3inch",pullDownText:"Days with Precipitation Greater than 3 inches",chartTitle:"Number of Days with Precipitation Greater than 3 inches"},{value:"4inch",pullDownText:"Days with Precipitation Greater than 4 inches",chartTitle:"Number of Days with Precipitation Greater than 4 inches"},{value:"tmax0F",pullDownText:"Days with Maximum Temperature Below 0°F",chartTitle:"Number of Days with Maximum Temperature Below 0°F"},{value:"tmax100F",pullDownText:"Days with Maximum Temperature Above 100°F",chartTitle:"Number of Days with Maximum Temperature Above 100°F"},{value:"tmax32F",pullDownText:"Days with Maximum Temperature Below 32°F",chartTitle:"Number of Days with Maximum Temperature Below 32°F"},{value:"tmax90F",pullDownText:"Days with Maximum Temperature Above 100°F",chartTitle:"Number of Days with Maximum Temperature Above 100°F"},{value:"tmax95F",pullDownText:"Days with Maximum Temperature Above 95°F",chartTitle:"Number of Days with Maximum Temperature Above 95°F"},{value:"tmin0F",pullDownText:"Days with Minimum Temperature Below 0°F",chartTitle:"Number of Days with Minimum Temperature Below 0°F"},{value:"tmin32F",pullDownText:"Days with Minimum Temperature Below 32°F",chartTitle:"Number of Days with Minimum Temperature Below 32°F"},{value:"tmin70F",pullDownText:"Days with Minimum Temperature Above 70°F",chartTitle:"Number of Days with Minimum Temperature Above 70°F"},{value:"tmin75F",pullDownText:"Days with Minimum Temperature Above 75°",chartTitle:"Number of Days with Minimum Temperature Above 75°"},{value:"tmin80F",pullDownText:"Days with Minimum Temperature Above 80°F",chartTitle:"Number of Days with Minimum Temperature Above 80°F"}],this.LocationNames=[{value:"AK",pullDownText:"Alaska"},{value:"AL",pullDownText:"Aalabama"},{value:"AZ",pullDownText:"Arizona"},{value:"AR",pullDownText:"Arkansas"},{value:"CA",pullDownText:"California"},{value:"CO",pullDownText:"Colorado"},{value:"CT",pullDownText:"Connecticut"},{value:"DE",pullDownText:"Delaware"},{value:"FL",pullDownText:"Florida"},{value:"GA",pullDownText:"Georgia"},{value:"HI",pullDownText:"Hawai'i"},{value:"ID",pullDownText:"Idaho"},{value:"IL",pullDownText:"Illinois"},{value:"IN",pullDownText:"Indiana"},{value:"IA",pullDownText:"Iowa"},{value:"KS",pullDownText:"Kansas"},{value:"KY",pullDownText:"Kentucky"},{value:"LA",pullDownText:"Louisiana"},{value:"ME",pullDownText:"Maine"},{value:"MD",pullDownText:"Maryland"},{value:"MA",pullDownText:"Massachusetts"},{value:"MI",pullDownText:"Michigan"},{value:"MN",pullDownText:"Minnesota"},{value:"MS",pullDownText:"Mississippi"},{value:"MO",pullDownText:"Missouri"},{value:"MT",pullDownText:"Montana"},{value:"NE",pullDownText:"Nebraska"},{value:"NV",pullDownText:"Nevada"},{value:"NH",pullDownText:"New Hampshire"},{value:"NJ",pullDownText:"New Jersey"},{value:"NM",pullDownText:"New Mexico"},{value:"NY",pullDownText:"New York"},{value:"NC",pullDownText:"North Carolina"},{value:"ND",pullDownText:"North Dakota"},{value:"OH",pullDownText:"Ohio"},{value:"OK",pullDownText:"Oklahoma"},{value:"OR",pullDownText:"Oregon"},{value:"PA",pullDownText:"Pennsylvania"},{value:"PR",pullDownText:"Puerto Rico"},{value:"RI",pullDownText:"Rhode Island"},{value:"SC",pullDownText:"South Carolina"},{value:"SD",pullDownText:"South Dakota"},{value:"TN",pullDownText:"Tennessee"},{value:"TX",pullDownText:"Texas"},{value:"UT",pullDownText:"Utah"},{value:"VT",pullDownText:"Vermont"},{value:"VA",pullDownText:"Virginia"},{value:"VI",pullDownText:"Virgin Islands"},{value:"WA",pullDownText:"Washington"},{value:"WV",pullDownText:"West Virginia"},{value:"WI",pullDownText:"Wisconsin"},{value:"WY",pullDownText:"Wyoming"},{value:"National",pullDownText:"National"},{value:"Northeast",pullDownText:"Northeast"},{value:"Southeast",pullDownText:"Southeast"},{value:"Midwest",pullDownText:"Midwest"},{value:"Northern Great Plains",pullDownText:"Northern Great Plains"},{value:"Northwest",pullDownText:"Northwest"},{value:"Southwest",pullDownText:"Southwest"},{value:"Southern Great Plains",pullDownText:"Southern Great Plains"},{value:"Alaska",pullDownText:"Alaska"},{value:"Hawaii",pullDownText:"Hawai'i"},{value:"Puerto Rico",pullDownText:"Puerto Rico"}]}var t,n,a;return t=e,(n=[{key:"getChartTitle",value:function(e){if(!e.climatevariable)return"";var t=this.climateVariableValueNames.filter((function(t){return t.value===e.climatevariable}))[0].chartTitle;return"national"===e.region&&(t="".concat(t," (National)")),"regional"===e.region&&(t="".concat(t," (NCA Region ").concat(e.titleLocation,")")),"state"===e.region&&(t="".concat(t," (").concat(e.titleLocation,")")),t}},{key:"getClimateVariablePullDownText",value:function(e){return e?this.climateVariableValueNames.filter((function(t){return t.value===e}))[0].pullDownText:""}},{key:"getLocationDownText",value:function(e){if(!e)return"";var t=this.LocationNames.filter((function(t){return t.value.toUpperCase()===e.toUpperCase()})),n=e;return t[0]&&(n=t[0].pullDownText),n}}])&&r(t.prototype,n),a&&r(t,a),e}()}});