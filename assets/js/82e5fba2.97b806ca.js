"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5482],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),i=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=i(e.components);return n.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=i(r),d=o,f=u["".concat(c,".").concat(d)]||u[d]||b[d]||a;return r?n.createElement(f,s(s({ref:t},p),{},{components:r})):n.createElement(f,s({ref:t},p))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,s[1]=l;for(var i=2;i<a;i++)s[i]=r[i];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},3354:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const a={sidebar_position:10},s="Observable",l={unversionedId:"types/observable",id:"types/observable",isDocsHomePage:!1,title:"Observable",description:"An observable is an object that can be initialized to watch the state of a",source:"@site/docs/types/observable.md",sourceDirName:"types",slug:"/types/observable",permalink:"/docs/types/observable",editUrl:"https://github.com/automerge/automerge.github.io/edit/main/docs/types/observable.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Text",permalink:"/docs/types/text"},next:{title:"Table",permalink:"/docs/types/table"}},c=[],i={toc:c};function p(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"observable"},"Observable"),(0,o.kt)("p",null,"An observable is an object that can be initialized to watch the state of a\ndocument. When a document changes, the callback will fire with the diff and\nchanges that were applied to that document."),(0,o.kt)("p",null,"When you want to observe the changes in a document, pass an observable instance to ",(0,o.kt)("inlineCode",{parentName:"p"},"Automerge.init"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"let observable = new Automerge.Observable()\nlet doc = Automerge.init({ observable })\nobservable.observe(doc, (diff, before, after, local, changes) => {\n  // diff == {\n  //  objectId: '_root', type: 'map', props: {bird: {[`1@${actor}`]: {type: 'value', value: 'Goldfinch'}}}\n  // }\n  // after.bird == 'Goldfinch'\n  // local == true\n  // changes.length == 1\n})\n\ndoc = Automerge.change(doc, doc => doc.bird = 'Goldfinch')\n")),(0,o.kt)("p",null,"You can also apply observables to properties on the Automerge document."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"observable.observe(doc.bird, (diff, before, after, local, changes) => {\n  // before == 'Goldfinch'\n  // after == 'Sparrow'\n})\n\ndoc = Automerge.change(doc, doc => doc.bird = 'Sparrow')\n")),(0,o.kt)("p",null,"As well as nested objects inside lists, text, or rows inside tables. See the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/automerge/automerge/blob/main/test/observable_test.js"},"tests")," for more examples."))}p.isMDXComponent=!0}}]);