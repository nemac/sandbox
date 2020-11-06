!function(e){function t(t){for(var n,r,o=t[0],i=t[1],l=t[2],u=0,c=[];u<o.length;u++)r=o[u],Object.prototype.hasOwnProperty.call(A,r)&&A[r]&&c.push(A[r][0]),A[r]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);for(_&&_(t);c.length;)c.shift()();return R.push.apply(R,l||[]),a()}function a(){for(var e,t=0;t<R.length;t++){for(var a=R[t],n=!0,r=1;r<a.length;r++){var o=a[r];0!==A[o]&&(n=!1)}n&&(R.splice(t--,1),e=M(M.s=a[0]))}return e}var n=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,t){if(!D[e]||!w[e])return;for(var a in w[e]=!1,t)Object.prototype.hasOwnProperty.call(t,a)&&(m[a]=t[a]);0==--b&&0===y&&S()}(e,t),n&&n(e,t)};var r,o=!0,i="9ca311fbccb0cff04bb4",l={},u=[],c=[];function s(t){var a={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:r!==t,active:!0,accept:function(e,t){if(void 0===e)a._selfAccepted=!0;else if("function"==typeof e)a._selfAccepted=e;else if("object"==typeof e)for(var n=0;n<e.length;n++)a._acceptedDependencies[e[n]]=t||function(){};else a._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)a._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)a._declinedDependencies[e[t]]=!0;else a._declinedDependencies[e]=!0},dispose:function(e){a._disposeHandlers.push(e)},addDisposeHandler:function(e){a._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=a._disposeHandlers.indexOf(e);t>=0&&a._disposeHandlers.splice(t,1)},invalidate:function(){switch(this._selfInvalidated=!0,f){case"idle":(m={})[t]=e[t],h("ready");break;case"ready":j(t);break;case"prepare":case"check":case"dispose":case"apply":(v=v||[]).push(t)}},check:C,apply:E,status:function(e){if(!e)return f;p.push(e)},addStatusHandler:function(e){p.push(e)},removeStatusHandler:function(e){var t=p.indexOf(e);t>=0&&p.splice(t,1)},data:l[t]};return r=void 0,a}var p=[],f="idle";function h(e){f=e;for(var t=0;t<p.length;t++)p[t].call(null,e)}var d,m,x,v,b=0,y=0,g={},w={},D={};function T(e){return+e+""===e?+e:e}function C(e){if("idle"!==f)throw new Error("check() is only allowed in idle status");return o=e,h("check"),(t=1e4,t=t||1e4,new Promise((function(e,a){if("undefined"==typeof XMLHttpRequest)return a(new Error("No browser support"));try{var n=new XMLHttpRequest,r=M.p+""+i+".hot-update.json";n.open("GET",r,!0),n.timeout=t,n.send(null)}catch(e){return a(e)}n.onreadystatechange=function(){if(4===n.readyState)if(0===n.status)a(new Error("Manifest request to "+r+" timed out."));else if(404===n.status)e();else if(200!==n.status&&304!==n.status)a(new Error("Manifest request to "+r+" failed."));else{try{var t=JSON.parse(n.responseText)}catch(e){return void a(e)}e(t)}}}))).then((function(e){if(!e)return h(N()?"ready":"idle"),null;w={},g={},D=e.c,x=e.h,h("prepare");var t=new Promise((function(e,t){d={resolve:e,reject:t}}));for(var a in m={},A)O(a);return"prepare"===f&&0===y&&0===b&&S(),t}));var t}function O(e){D[e]?(w[e]=!0,b++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=M.p+""+e+"."+i+".hot-update.js",document.head.appendChild(t)}(e)):g[e]=!0}function S(){h("ready");var e=d;if(d=null,e)if(o)Promise.resolve().then((function(){return E(o)})).then((function(t){e.resolve(t)}),(function(t){e.reject(t)}));else{var t=[];for(var a in m)Object.prototype.hasOwnProperty.call(m,a)&&t.push(T(a));e.resolve(t)}}function E(t){if("ready"!==f)throw new Error("apply() is only allowed in ready status");return function t(a){var n,o,c,s,p;function f(e){for(var t=[e],a={},n=t.map((function(e){return{chain:[e],id:e}}));n.length>0;){var r=n.pop(),o=r.id,i=r.chain;if((s=k[o])&&(!s.hot._selfAccepted||s.hot._selfInvalidated)){if(s.hot._selfDeclined)return{type:"self-declined",chain:i,moduleId:o};if(s.hot._main)return{type:"unaccepted",chain:i,moduleId:o};for(var l=0;l<s.parents.length;l++){var u=s.parents[l],c=k[u];if(c){if(c.hot._declinedDependencies[o])return{type:"declined",chain:i.concat([u]),moduleId:o,parentId:u};-1===t.indexOf(u)&&(c.hot._acceptedDependencies[o]?(a[u]||(a[u]=[]),d(a[u],[o])):(delete a[u],t.push(u),n.push({chain:i.concat([u]),id:u})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:a}}function d(e,t){for(var a=0;a<t.length;a++){var n=t[a];-1===e.indexOf(n)&&e.push(n)}}N();var b={},y=[],g={},w=function(){console.warn("[HMR] unexpected require("+O.moduleId+") to disposed module")};for(var C in m)if(Object.prototype.hasOwnProperty.call(m,C)){var O;p=T(C),O=m[C]?f(p):{type:"disposed",moduleId:C};var S=!1,E=!1,j=!1,R="";switch(O.chain&&(R="\nUpdate propagation: "+O.chain.join(" -> ")),O.type){case"self-declined":a.onDeclined&&a.onDeclined(O),a.ignoreDeclined||(S=new Error("Aborted because of self decline: "+O.moduleId+R));break;case"declined":a.onDeclined&&a.onDeclined(O),a.ignoreDeclined||(S=new Error("Aborted because of declined dependency: "+O.moduleId+" in "+O.parentId+R));break;case"unaccepted":a.onUnaccepted&&a.onUnaccepted(O),a.ignoreUnaccepted||(S=new Error("Aborted because "+p+" is not accepted"+R));break;case"accepted":a.onAccepted&&a.onAccepted(O),E=!0;break;case"disposed":a.onDisposed&&a.onDisposed(O),j=!0;break;default:throw new Error("Unexception type "+O.type)}if(S)return h("abort"),Promise.reject(S);if(E)for(p in g[p]=m[p],d(y,O.outdatedModules),O.outdatedDependencies)Object.prototype.hasOwnProperty.call(O.outdatedDependencies,p)&&(b[p]||(b[p]=[]),d(b[p],O.outdatedDependencies[p]));j&&(d(y,[O.moduleId]),g[p]=w)}var P,L=[];for(o=0;o<y.length;o++)p=y[o],k[p]&&k[p].hot._selfAccepted&&g[p]!==w&&!k[p].hot._selfInvalidated&&L.push({module:p,parents:k[p].parents.slice(),errorHandler:k[p].hot._selfAccepted});h("dispose"),Object.keys(D).forEach((function(e){!1===D[e]&&function(e){delete A[e]}(e)}));var I,_,W=y.slice();for(;W.length>0;)if(p=W.pop(),s=k[p]){var F={},H=s.hot._disposeHandlers;for(c=0;c<H.length;c++)(n=H[c])(F);for(l[p]=F,s.hot.active=!1,delete k[p],delete b[p],c=0;c<s.children.length;c++){var z=k[s.children[c]];z&&((P=z.parents.indexOf(p))>=0&&z.parents.splice(P,1))}}for(p in b)if(Object.prototype.hasOwnProperty.call(b,p)&&(s=k[p]))for(_=b[p],c=0;c<_.length;c++)I=_[c],(P=s.children.indexOf(I))>=0&&s.children.splice(P,1);h("apply"),void 0!==x&&(i=x,x=void 0);for(p in m=void 0,g)Object.prototype.hasOwnProperty.call(g,p)&&(e[p]=g[p]);var V=null;for(p in b)if(Object.prototype.hasOwnProperty.call(b,p)&&(s=k[p])){_=b[p];var B=[];for(o=0;o<_.length;o++)if(I=_[o],n=s.hot._acceptedDependencies[I]){if(-1!==B.indexOf(n))continue;B.push(n)}for(o=0;o<B.length;o++){n=B[o];try{n(_)}catch(e){a.onErrored&&a.onErrored({type:"accept-errored",moduleId:p,dependencyId:_[o],error:e}),a.ignoreErrored||V||(V=e)}}}for(o=0;o<L.length;o++){var G=L[o];p=G.module,u=G.parents,r=p;try{M(p)}catch(e){if("function"==typeof G.errorHandler)try{G.errorHandler(e)}catch(t){a.onErrored&&a.onErrored({type:"self-accept-error-handler-errored",moduleId:p,error:t,originalError:e}),a.ignoreErrored||V||(V=t),V||(V=e)}else a.onErrored&&a.onErrored({type:"self-accept-errored",moduleId:p,error:e}),a.ignoreErrored||V||(V=e)}}if(V)return h("fail"),Promise.reject(V);if(v)return t(a).then((function(e){return y.forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e}));return h("idle"),new Promise((function(e){e(y)}))}(t=t||{})}function N(){if(v)return m||(m={}),v.forEach(j),v=void 0,!0}function j(t){Object.prototype.hasOwnProperty.call(m,t)||(m[t]=e[t])}var k={},A={0:0},R=[];function M(t){if(k[t])return k[t].exports;var a=k[t]={i:t,l:!1,exports:{},hot:s(t),parents:(c=u,u=[],c),children:[]};return e[t].call(a.exports,a,a.exports,function(e){var t=k[e];if(!t)return M;var a=function(a){return t.hot.active?(k[a]?-1===k[a].parents.indexOf(e)&&k[a].parents.push(e):(u=[e],r=a),-1===t.children.indexOf(a)&&t.children.push(a)):(console.warn("[HMR] unexpected require("+a+") from disposed module "+e),u=[]),M(a)},n=function(e){return{configurable:!0,enumerable:!0,get:function(){return M[e]},set:function(t){M[e]=t}}};for(var o in M)Object.prototype.hasOwnProperty.call(M,o)&&"e"!==o&&"t"!==o&&Object.defineProperty(a,o,n(o));return a.e=function(e){return"ready"===f&&h("prepare"),y++,M.e(e).then(t,(function(e){throw t(),e}));function t(){y--,"prepare"===f&&(g[e]||O(e),0===y&&0===b&&S())}},a.t=function(e,t){return 1&t&&(e=a(e)),M.t(e,-2&t)},a}(t)),a.l=!0,a.exports}M.m=e,M.c=k,M.d=function(e,t,a){M.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},M.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},M.t=function(e,t){if(1&t&&(e=M(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(M.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)M.d(a,n,function(t){return e[t]}.bind(null,n));return a},M.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return M.d(t,"a",t),t},M.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},M.p="",M.h=function(){return i};var P=window.webpackJsonp=window.webpackJsonp||[],L=P.push.bind(P);P.push=t,P=P.slice();for(var I=0;I<P.length;I++)t(P[I]);var _=L;R.push([414,1]),a()}({391:function(e,t,a){"use strict";var n=a(392)(e.i,{locals:!1});e.hot.dispose(n),e.hot.accept(void 0,n)},414:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(14),i=a.n(o),l=(a(199),a(5)),u=a.n(l),c=a(447),s=a(451),p=a(455),f=a(183),h=a.n(f),d=a(182),m=a.n(d);function x(e){return(x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function y(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(Object(a),!0).forEach((function(t){g(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function g(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function w(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function D(e,t){return(D=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=O(e);if(t){var r=O(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return C(this,a)}}function C(e,t){return!t||"object"!==x(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&D(e,t)}(i,e);var t,a,n,o=T(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=o.call(this,e)).responsiveChartRef=r.a.createRef(),t.plotlyLayout=e.plotlyLayout,t}return t=i,(a=[{key:"componentDidMount",value:function(){var e=this;this.resizeListener=window.addEventListener("resize",(function(){var t=e.responsiveChartRef.current,a=y({},e.props.plotlyLayout);a.width=t.parentNode.getBoundingClientRect().width,a.height=t.getBoundingClientRect().height-24,e.setState({layout:a})}))}},{key:"componentWillUnmount",value:function(){window.removeEventListener(this.resizeListener)}},{key:"render",value:function(){var e=y({},this.props.plotlyLayout),t=this.props.plotlyData,a=y({},{responsive:!0}),n=this.responsiveChartRef.current;if(n){var o=n;e.width=o.parentNode.getBoundingClientRect().width,e.height=o.getBoundingClientRect().height}return r.a.createElement("div",v({className:"PlotRegionDiv"},{ref:this.responsiveChartRef}),r.a.createElement(m.a,{data:t,layout:e,config:a,revision:Math.floor(1e5*Math.random())}))}}])&&w(t.prototype,a),n&&w(t,n),i}(r.a.Component),E=S;function N(e){return function(e){if(Array.isArray(e))return j(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return j(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return j(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function k(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}S.propTypes={plotlyLayout:u.a.object,plotlyData:u.a.array};var A=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.blue="4, 90, 141",this.red="189, 0, 38",this.green="127, 188, 65",this.brown="153, 52, 4",this.font="Arial",this.zeroLineColor="#000000",this.zerolinewidth=1,this.gridColor="#BFBFBF",this.gridWidth=1,this.fontSizePrimary=14,this.fontSizeLabels=12,this.fontSizeLabelsSecondary=10,this.xmin=t.xmin,this.xmax=t.xmax,this.xvals=t.xvals,this.yvals=t.yvals,this.maxVal=Math.max.apply(Math,N(this.yvals)),this.chartTitle=t.chartTitle,this.legnedText=t.legnedText,this.chartType=t.chartType,this.barColor="Precipitation"===this.chartType?this.blue:this.brown,this.periodGroups=t.periodGroups?t.periodGroups:5,this.useRobust=t.useRobust,this.textAngle=(this.useRobust,0)}var t,a,n;return t=e,n=[{key:"uuidv",value:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}}],(a=[{key:"setXRange",value:function(e){this.xmin=e.xmin,this.xmax=e.xmax}},{key:"setTitle",value:function(e){this.chartTitle=e.chartTitle}},{key:"getXvalues",value:function(){for(var e=[],t=this.xmin;t<=this.xmax;t+=1)e.push(t.toString());return e}},{key:"getYvalues",value:function(){var e=[],t=this.xmin;for(this.yvals=this.yvals.map((function(e){var t=e;return e<0&&(t=void 0),t}));t<parseInt(this.xvals[0],10);)t+=1,e.push("0");for(var a=0;t<=parseInt(this.xvals[this.xvals.length-1],10);)t+=1,a+=1,e.push(this.yvals[a]);for(;t<=this.xmax;)t+=1,e.push("0");return e}},{key:"getData",value:function(){return this.maxVal===-1/0?[{}]:[this.getTrace1(),this.getTrace2()]}},{key:"getTrace1",value:function(){return{uid:e.uuidv(),meta:{columnNames:{x:"Year",y:"Location"}},mode:"lines",name:"".concat(this.legnedText),type:"histogram",xsrc:"dmichels:4:3b282f",x:this.getXvalues(),ysrc:"dmichels:4:060bbe",y:this.getYvalues(),xbins:{end:this.xmax,size:5,start:this.xmin},marker:{line:{color:"rgb(".concat(this.barColor,")")},color:"rgb(".concat(this.barColor,")")},nbinsx:0,histfunc:"avg",cumulative:{enabled:!1},transforms:[{meta:{columnNames:{target:"Year"}},type:"filter",value:[this.xmin.toString(),this.xmax.toString()],operation:"[]",targetsrc:"dmichels:4:3b282f",target:this.getXvalues()}],legendgroup:1,orientation:"v",hovertemplate:""}}},{key:"getTrace2",value:function(){return{uid:e.uuidv(),meta:{columnNames:{x:"Year",y:"Location"}},mode:"markers+lines",name:"Annual ".concat(this.legnedText),type:"scatter",xsrc:"dmichels:4:3b282f",x:this.getXvalues(),ysrc:"dmichels:4:060bbe",y:this.getYvalues(),marker:{color:"rgb(0, 0, 0)"},transforms:[{meta:{columnNames:{target:"Year"}},type:"filter",value:[this.xmin.toString(),this.xmax.toString()],operation:"[]",targetsrc:"dmichels:4:3b282f",target:this.getXvalues()}]}}},{key:"getXLabelText",value:function(){var e=this.periodGroups;return this.xvals.map((function(t){var a=t+e;return"".concat(t,"–").concat(a.toString().slice(-2))}))}},{key:"getXLabelValues",value:function(){var e=0,t=this.periodGroups;return this.xvals.map((function(a){return 0==((e+=1)-1)%t?a+parseInt(t/2,10):null}))}},{key:"getLayout",value:function(){return{showlegend:!0,legend:{autosize:!0,orientation:"h",xanchor:"center",x:.85,y:1.05,font:{family:this.font,size:this.fontSizeLabels}},title:{text:this.chartTitle,font:{family:this.font,size:this.fontSizePrimary},x:.5},xaxis:{type:"linear",title:{text:"".concat(this.periodGroups,"–year period"),font:{family:this.font,size:this.fontSizeLabels}},dtick:this.periodGroups,range:[this.xmin,this.xmax],zeroline:!0,showline:!1,showgrid:!1,zerolinecolor:this.zeroLineColor,zerolinewidth:this.zerolinewidth,tickfont:{family:this.font,size:this.fontSizeLabelsSecondary},tickmode:"array",nticks:5,tickvals:this.getXLabelValues(),ticktext:this.getXLabelText(),autorange:!1,tickangle:this.textAngle,constraintoward:"center",automargin:!1,showspikes:!1,rangemode:"tozero",spikethickness:4,rangeslider:{range:[1900,2020],yaxis:[0,2],visible:!1,autorange:!0}},yaxis:{rangemode:"tozero",type:"linear",title:{text:"Days",font:{family:this.font,size:this.fontSizeLabels}},zerolinecolor:this.zeroLineColor,zerolinewidth:this.zerolinewidth,gridcolor:this.gridColor,gridwidth:this.gridwidth,range:[0,2],ticks:"",tickformat:",d",autorange:!0,showspikes:!1,tickfont:{family:this.font,size:this.fontSizeLabels}},bargap:.28,autosize:!0,height:1,bargroupgap:0,plot_bgcolor:"rgb(251, 252, 254)",paper_bgcolor:"rgb(251, 252, 254)"}}}])&&k(t.prototype,a),n&&k(t,n),e}();function R(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var M=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.climateVariableValue=t,this.climateVariableValueNames=[{value:"1inch",pullDownText:"Days with Precipitation Greater than 1 inch",chartTitle:"Number of Days with Precipitation Greater than 1 inch"},{value:"2inch",pullDownText:"Days with Precipitation Greater than 2 inches",chartTitle:"Number of Days with Precipitation Greater than 2 inches"},{value:"3inch",pullDownText:"Days with Precipitation Greater than 3 inches",chartTitle:"Number of Days with Precipitation Greater than 3 inches"},{value:"4inch",pullDownText:"Days with Precipitation Greater than 4 inches",chartTitle:"Number of Days with Precipitation Greater than 4 inches"},{value:"tmax0F",pullDownText:"Days with Maximum Temperature Below 0°F",chartTitle:"Number of Days with Maximum Temperature Below 0°F"},{value:"tmax100F",pullDownText:"Days with Maximum Temperature Above 100°F",chartTitle:"Number of Days with Maximum Temperature Above 100°F"},{value:"tmax32F",pullDownText:"Days with Maximum Temperature Below 32°F",chartTitle:"Number of Days with Maximum Temperature Below 32°F"},{value:"tmax90F",pullDownText:"Days with Maximum Temperature Above 100°F",chartTitle:"Number of Days with Maximum Temperature Above 100°F"},{value:"tmax95F",pullDownText:"Days with Maximum Temperature Above 95°F",chartTitle:"Number of Days with Maximum Temperature Above 95°F"},{value:"tmin0F",pullDownText:"Days with Minimum Temperature Below 0°F",chartTitle:"Number of Days with Minimum Temperature Below 0°F"},{value:"tmin32F",pullDownText:"Days with Minimum Temperature Below 32°F",chartTitle:"Number of Days with Minimum Temperature Below 32°F"},{value:"tmin70F",pullDownText:"Days with Minimum Temperature Above 70°F",chartTitle:"Number of Days with Minimum Temperature Above 70°F"},{value:"tmin75F",pullDownText:"Days with Minimum Temperature Above 75°",chartTitle:"Number of Days with Minimum Temperature Above 75°"},{value:"tmin80F",pullDownText:"Days with Minimum Temperature Above 80°F",chartTitle:"Number of Days with Minimum Temperature Above 80°F"}],this.LocationNames=[{value:"AK",pullDownText:"Alaska"},{value:"AL",pullDownText:"Alabama"},{value:"AZ",pullDownText:"Arizona"},{value:"AR",pullDownText:"Arkansas"},{value:"CA",pullDownText:"California"},{value:"CO",pullDownText:"Colorado"},{value:"CT",pullDownText:"Connecticut"},{value:"DE",pullDownText:"Delaware"},{value:"FL",pullDownText:"Florida"},{value:"GA",pullDownText:"Georgia"},{value:"HI",pullDownText:"Hawai'i"},{value:"ID",pullDownText:"Idaho"},{value:"IL",pullDownText:"Illinois"},{value:"IN",pullDownText:"Indiana"},{value:"IA",pullDownText:"Iowa"},{value:"KS",pullDownText:"Kansas"},{value:"KY",pullDownText:"Kentucky"},{value:"LA",pullDownText:"Louisiana"},{value:"ME",pullDownText:"Maine"},{value:"MD",pullDownText:"Maryland"},{value:"MA",pullDownText:"Massachusetts"},{value:"MI",pullDownText:"Michigan"},{value:"MN",pullDownText:"Minnesota"},{value:"MS",pullDownText:"Mississippi"},{value:"MO",pullDownText:"Missouri"},{value:"MT",pullDownText:"Montana"},{value:"NE",pullDownText:"Nebraska"},{value:"NV",pullDownText:"Nevada"},{value:"NH",pullDownText:"New Hampshire"},{value:"NJ",pullDownText:"New Jersey"},{value:"NM",pullDownText:"New Mexico"},{value:"NY",pullDownText:"New York"},{value:"NC",pullDownText:"North Carolina"},{value:"ND",pullDownText:"North Dakota"},{value:"OH",pullDownText:"Ohio"},{value:"OK",pullDownText:"Oklahoma"},{value:"OR",pullDownText:"Oregon"},{value:"PA",pullDownText:"Pennsylvania"},{value:"PR",pullDownText:"Puerto Rico"},{value:"RI",pullDownText:"Rhode Island"},{value:"SC",pullDownText:"South Carolina"},{value:"SD",pullDownText:"South Dakota"},{value:"TN",pullDownText:"Tennessee"},{value:"TX",pullDownText:"Texas"},{value:"UT",pullDownText:"Utah"},{value:"VT",pullDownText:"Vermont"},{value:"VA",pullDownText:"Virginia"},{value:"VI",pullDownText:"Virgin Islands"},{value:"WA",pullDownText:"Washington"},{value:"WV",pullDownText:"West Virginia"},{value:"WI",pullDownText:"Wisconsin"},{value:"WY",pullDownText:"Wyoming"},{value:"National",pullDownText:"National"},{value:"Northeast",pullDownText:"Northeast"},{value:"Southeast",pullDownText:"Southeast"},{value:"Midwest",pullDownText:"Midwest"},{value:"Northern Great Plains",pullDownText:"Northern Great Plains"},{value:"Northwest",pullDownText:"Northwest"},{value:"Southwest",pullDownText:"Southwest"},{value:"Southern Great Plains",pullDownText:"Southern Great Plains"},{value:"Alaska",pullDownText:"Alaska"},{value:"Hawaii",pullDownText:"Hawai'i"},{value:"Puerto Rico",pullDownText:"Puerto Rico"}]}var t,a,n;return t=e,(a=[{key:"getChartTitle",value:function(e){if(!e.climatevariable)return"";var t=this.climateVariableValueNames.filter((function(t){return t.value===e.climatevariable}))[0].chartTitle;return"national"===e.region&&(t="".concat(t," (National)")),"regional"===e.region&&(t="".concat(t," (NCA Region ").concat(e.titleLocation,")")),"state"===e.region&&(t="".concat(t," (").concat(e.titleLocation,")")),t}},{key:"getClimateVariablePullDownText",value:function(e){return e?this.climateVariableValueNames.filter((function(t){return t.value===e}))[0].pullDownText:""}},{key:"getLocationDownText",value:function(e){if(!e)return"";var t=this.LocationNames.filter((function(t){return t.value.toUpperCase()===e.toUpperCase()})),a=e;return t[0]&&(a=t[0].pullDownText),a}}])&&R(t.prototype,a),n&&R(t,n),e}(),P=a(449),L=a(458),I=a(452),_=a(184),W=a(453),F=Object(_.a)({overrides:{MuiSlider:{thumb:{color:"#5C5C5C"},track:{color:"#5C5C5C"},rail:{color:"#5C5C5C"}}}}),H=Object(c.a)((function(e){return{formControl:{margin:e.spacing(0),minHeight:95,color:"#5C5C5C"}}})),z=function(e){return"".concat(e)};function V(e){var t=H(),a=e.sliderValues,n=e.disabled,o=e.useRobustClicked,i=e.sliderMinxMaxValues,l=e.onChange;o&&(a[0]=i[0],a[1]=i[1]);return r.a.createElement(P.a,{variant:"outlined",className:t.formControl,fullWidth:!0,disabled:n},r.a.createElement(s.a,{container:!0,spacing:0,justify:"flex-start",direction:"row"},r.a.createElement(s.a,{item:!0,xs:12,width:"100%"},r.a.createElement(I.a,{variant:"middle"})),r.a.createElement(p.a,{fontWeight:"fontWeightRegular",pb:2,display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"center",textAlign:"center"})),r.a.createElement(s.a,{container:!0,spacing:1,justify:"flex-start",direction:"row"},r.a.createElement(s.a,{item:!0,xs:1,width:"100%"},r.a.createElement(p.a,{fontWeight:"fontWeightMedium",p:1,variant:"h3",display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"center",textAlign:"center"},"Start Year ",r.a.createElement("br",null),a[0])),r.a.createElement(s.a,{item:!0,xs:10,width:"100%"},r.a.createElement(p.a,{fontWeight:"fontWeightRegular",p:1,display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"center",textAlign:"center"},r.a.createElement(W.a,{theme:F},r.a.createElement(L.a,{value:a,min:i[0],max:i[1],onChange:function(e,t){l(t)},valueLabelDisplay:"auto","aria-labelledby":"range-slider",getAriaValueText:z,color:"primary"})))),r.a.createElement(s.a,{item:!0,xs:1,width:"100%"},r.a.createElement(p.a,{fontWeight:"fontWeightMedium",p:1,variant:"h3",display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"center",textAlign:"center"},"End Year ",r.a.createElement("br",null),a[1]))))}V.propTypes={sliderValues:u.a.array,disabled:u.a.bool,useRobustClicked:u.a.bool,sliderMinxMaxValues:u.a.array,onChange:u.a.func};var B=a(459),G=a(460),U=a(454),Y=Object(c.a)((function(e){return{formControl:{margin:e.spacing(0),minWidth:120,backgroundColor:"#E6E6E6"},menuItem:{textAlign:"left"},sandboxInputLabel:{color:"#5C5C5C"}}}));function X(e){var t=Y(),a=e.items,n=e.controlName,o=e.value,i=e.disabled,l=e.onChange,u="Climate Variable"===n?e.replaceClimatevariableType:function(e){return e},c="Select a Location"===n?e.replaceLocationAbbreviation:function(e){return e};return r.a.createElement(P.a,{variant:"outlined",className:t.formControl,fullWidth:!0,disabled:i},r.a.createElement(B.a,{id:"demo-simple-select-outlined-label",className:t.sandboxInputLabel},n),r.a.createElement(U.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",value:o,onChange:function(e){l(e.target.value)},label:n,className:t.menuItem},r.a.createElement(G.a,{value:""},r.a.createElement("em",null,"None")),a.map((function(e){return r.a.createElement(G.a,{key:e,value:e,className:t.menuItem},(a=u(c(e)),n=a,"REGIONAL"===a.toUpperCase()&&(n="NCA Region"),n));var a,n}))))}X.propTypes={items:u.a.array,controlName:u.a.string,value:u.a.string,disabled:u.a.bool,replaceClimatevariableType:u.a.func,replaceLocationAbbreviation:u.a.func,onChange:u.a.func};var K=a(461),q=a(456);function J(e){var t=e.useRobust,a=e.onChange;return r.a.createElement(K.a,{control:r.a.createElement(q.a,{checked:t,onChange:function(e){a(e.target.checked)},name:"useRobust",color:"default"}),label:"Use more robust data"})}J.propTypes={useRobust:u.a.bool,onChange:u.a.func};a(391);function Z(e,t,a,n,r,o,i){try{var l=e[o](i),u=l.value}catch(e){return void a(e)}l.done?t(u):Promise.resolve(u).then(n,r)}function $(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,r=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw o}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Q(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return Q(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Q(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function ee(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var te=a(394),ae=Object(c.a)((function(e){return{sandboxRoot:ee({backgroundColor:"#FFFFFF",color:"#5C5C5C",height:"calc(100vh - 10px)"},e.breakpoints.down("xs"),{overflow:"scroll"}),sandboxHeader:{height:"60px",maxHeight:"60px",color:"#5C5C5C"},sandboxHeaderIcon:{display:"inline-flex",marginTop:"-3px"},sandboxVarriableSelectors:{height:"75px",maxHeight:"75px"},sandboxCheckBox:{height:"75px",maxHeight:"75px"},sandboxYearSlider:{height:"95px",maxHeight:"95px"},sandboxSelectionArea:ee({height:"200px",maxHeight:"200px",backgroundColor:"#FBFCFE",border:"1px solid ".concat("#E6E6E6"),borderRadius:"4px"},e.breakpoints.down("xs"),{height:"550px",minHeight:"550px"}),sandboxSelectionAreaHolder:ee({margin:"6px"},e.breakpoints.down("xs"),{height:"100vh",maxHeight:"550px"}),sandboxChartRegion:ee({height:"calc(100% - 225px)",maxHeight:"calc(100% - 225px)"},e.breakpoints.down("xs"),{height:"550px"}),sandboxChartRegionBox:ee({height:"calc(100% - 10px)"},e.breakpoints.down("xs"),{height:"550px"})}})),ne=["National","Regional","State"],re=["Northeast","Southeast","Midwest","Northern Great Plains","Northwest","Southwest","Southern Great Plains","Alaska","Hawaii","Puerto Rico"],oe=["AK","AL","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VT","VA","VI","WA","WV","WI","WY"];function ie(){var e=ae(),t=$(Object(n.useState)([1900,2018]),2),a=t[0],o=t[1],i=$(Object(n.useState)([1900,2018]),2),l=i[0],u=i[1],c=$(Object(n.useState)(!1),2),f=c[0],d=c[1],m=$(Object(n.useState)(!1),2),x=m[0],v=m[1],b=$(Object(n.useState)(""),2),y=b[0],g=b[1],w=$(Object(n.useState)(""),2),D=w[0],T=w[1],C=$(Object(n.useState)(""),2),O=C[0],S=C[1],N=$(Object(n.useState)([{}]),2),j=N[0],k=N[1],R=$(Object(n.useState)({yaxis:{rangemode:"tozero",title:"Days"},xaxis:{rangemode:"tozero"}}),2),P=R[0],L=R[1],I=$(Object(n.useState)([""]),2),_=I[0],W=I[1],F=$(Object(n.useState)([""]),2),H=F[0],z=F[1],B=$(Object(n.useState)([""]),2),G=B[0],U=B[1],Y=$(Object(n.useState)(!0),2),K=Y[0],q=Y[1],Q=$(Object(n.useState)(!0),2),ee=Q[0],ie=Q[1],le=function(){var e,t=(e=regeneratorRuntime.mark((function e(t,a){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,te.get("".concat(window.location.href,"/sandboxdata/TSU_Sandbox_Datafiles/index.json")).then((function(e){var n={};switch(t){case"National":W(e.data.national),n=e.data.national.filter((function(e){return e.robust===a})),U(n.map((function(e){return e.type})));break;case"Regional":W(e.data.regional),n=e.data.regional.filter((function(e){return e.robust===a})),U(n.map((function(e){return e.type})));break;case"State":W(e.data.state),n=e.data.state.filter((function(e){return e.robust===a})),U(n.map((function(e){return e.type})));break;default:W(e.data.national),n=e.data.national.filter((function(e){return e.robust===a})),U(n.map((function(e){return e.type})))}return e.data})).catch((function(e){return console.error("SanboxControls.loadNCADdata() error: ".concat(e)),[""]}));case 2:case"end":return e.stop()}}),e)})),function(){var t=this,a=arguments;return new Promise((function(n,r){var o=e.apply(t,a);function i(e){Z(o,n,r,i,l,"next",e)}function l(e){Z(o,n,r,i,l,"throw",e)}i(void 0)}))});return function(e,a){return t.apply(this,arguments)}}();Object(n.useEffect)((function(){le(y,f),v(!1)}),[y,f]);var ue=function(e){return(new M).getLocationDownText(e)},ce=function(e){var t=e.chartDataRegion,n=e.chartDataLocation,r=e.chartDataClimatevariable,o=e.chartDataUseRobust,i=_.filter((function(e){return e.robust===o&&e.type===r})).map((function(e){return e.name}));te.get("".concat(window.location.href,"/sandboxdata/TSU_Sandbox_Datafiles/").concat(i)).then((function(e){var i=function(e,t,a){for(var n=[],r=[],o=e.split(/\r?\n/),i=o[0].split(","),l=0;l<i.length;l+=1)i[l]=i[l].trim();var u=void 0;if("national"===t)u=1;else if("regional"===t||"state"===t)for(var c=1;c<i.length;c+=2)if(i[c]===a){u=c;break}for(var s=1;s<o.length;s+=1){var p=o[s].split(",");if(p.length<=1)break;var f=parseInt(p[0],10),h=parseFloat(p[u]);n.push(f),r.push(h)}return[n,r]}(e.data,t,n),u=r.includes("inch")?"Precipitation":"Temperature",c=new M(r),s=ue(n),p=c.getChartTitle({climatevariable:r,region:t,titleLocation:s}),f={xvals:i[0],yvals:i[1],xmin:l[0],xmax:l[1],chartTitle:p,legnedText:u,chartType:u,useRobust:o},h=new A(f),d={xmin:a[0],xmax:a[1]};h.setXRange(d),k(h.getData()),L(h.getLayout())})).catch((function(e){console.error("SanboxControls.updatePlotData() error=".concat(e))}))},se=function(e){return(new M).getClimateVariablePullDownText(e)};return r.a.createElement("div",{className:e.sandboxRoot},r.a.createElement(s.a,{container:!0,spacing:0,justify:"flex-start",direction:"row",className:e.sandboxRoot},r.a.createElement(s.a,{item:!0,xs:12,width:"100%",className:e.sandboxSelectionAreaHolder},r.a.createElement(s.a,{container:!0,spacing:0,justify:"flex-start",direction:"row",className:e.sandboxSelectionArea},r.a.createElement(s.a,{item:!0,xs:12,className:"sandboxHeader",width:"100%"},r.a.createElement(p.a,{fontWeight:"fontWeightBold",mt:1,p:0,display:"flex",flexWrap:"nowrap",justifyContent:"flex-start"},r.a.createElement(p.a,{px:1,fontSize:"h4.fontSize"},r.a.createElement(h.a,{fontSize:"large",className:e.sandboxHeaderIcon})),r.a.createElement(p.a,{px:1,fontSize:"h5.fontSize"},"NCA Sandbox - Climate Charts"))),r.a.createElement(s.a,{item:!0,xs:12,sm:3,className:e.sandboxVarriableSelectors},r.a.createElement(p.a,{fontWeight:"fontWeightBold",m:1,display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"flex-start"},r.a.createElement(X,{items:ne,controlName:"Select a Region",onChange:function(e){switch(g(e),e){case"National":z([""]),T(""),q(!0),ie(!1);break;case"Regional":z(re),T(""),q(!1),ie(!1);break;case"State":z(oe),T(""),q(!1),ie(!1);break;default:z([""]),T(""),q(!0),ie(!0)}ce({chartDataRegion:e,chartDataLocation:D,chartDataClimatevariable:O,chartDataUseRobust:f})},value:y,disabled:!1,replaceClimatevariableType:se}))),r.a.createElement(s.a,{item:!0,xs:12,sm:3,className:e.sandboxVarriableSelectors},r.a.createElement(p.a,{fontWeight:"fontWeightBold",m:1,display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"flex-start"},r.a.createElement(X,{items:H,controlName:"Select a Location",onChange:function(e){T(e),ce({chartDataRegion:y.toLowerCase(),chartDataLocation:e,chartDataClimatevariable:O,chartDataUseRobust:f})},value:D,disabled:K,replaceClimatevariableType:se,replaceLocationAbbreviation:ue}))),r.a.createElement(s.a,{item:!0,xs:12,sm:3,className:e.sandboxVarriableSelectors},r.a.createElement(p.a,{fontWeight:"fontWeightBold",m:1,display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"flex-start"},r.a.createElement(X,{items:G,controlName:"Climate Variable",onChange:function(e){return S(e),ce({chartDataRegion:y.toLowerCase(),chartDataLocation:D,chartDataClimatevariable:e,chartDataUseRobust:f}),null},value:O,disabled:ee,replaceClimatevariableType:se}))),r.a.createElement(s.a,{item:!0,xs:12,sm:3,className:e.varriableSelectors},r.a.createElement(p.a,{fontWeight:"fontWeightBold",ml:2,display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"flex-start",className:e.sandboxCheckBox},r.a.createElement(J,{useRobust:f,onChange:function(e){u(e?[1950,2018]:[1900,2018]),d(e),v(!0),ce({chartDataRegion:y.toLowerCase(),chartDataLocation:D,chartDataClimatevariable:O,chartDataUseRobust:e})}}))),r.a.createElement(s.a,{item:!0,xs:12,className:e.sandboxYearSlider},r.a.createElement(p.a,{fontWeight:"fontWeightBold",mx:2,mb:1,className:"SliderBox",display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"center"},r.a.createElement(V,{useRobust:f,useRobustClicked:x,setUseRobustClickedFalse:function(e){return v(!1),null},sliderMinxMaxValues:l,sliderValues:a,onChange:function(e){return o(e),ce({chartDataRegion:y.toLowerCase(),chartDataLocation:D,chartDataClimatevariable:O,chartDataUseRobust:f}),null}}))))),r.a.createElement(s.a,{item:!0,xs:12,display:"flex",flex:1,className:e.sandboxChartRegion},r.a.createElement(p.a,{display:"flex",flexDirection:"row",m:1,justifyContent:"center",flex:1,flexGrow:3,className:e.sandboxChartRegionBox},r.a.createElement(E,{plotlyData:j,plotlyLayout:P})))))}function le(){return r.a.createElement("div",{className:"sandbox-holderofall"},r.a.createElement(ie,null))}ie.propTypes={chartDataRegion:u.a.string,chartDataLocation:u.a.string,chartDataClimatevariable:u.a.string,chartDataUseRobust:u.a.bool},i.a.render(r.a.createElement(le,null),document.querySelector("#root"))}});