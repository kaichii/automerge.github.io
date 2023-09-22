"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3823],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=p(n),d=r,h=m["".concat(o,".").concat(d)]||m[d]||c[d]||i;return n?a.createElement(h,s(s({ref:t},u),{},{components:n})):a.createElement(h,s({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=d;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[m]="string"==typeof e?e:r,s[1]=l;for(var p=2;p<i;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4515:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const i={},s="Document Data Model",l={unversionedId:"documents/index",id:"documents/index",title:"Document Data Model",description:"Automerge documents are quite similar to JSON objects. A document always consists of a root map which is a map from strings to other automerge values, which can themselves be composite types.",source:"@site/docs/documents/index.md",sourceDirName:"documents",slug:"/documents/",permalink:"/docs/documents/",draft:!1,editUrl:"https://github.com/automerge/automerge.github.io/edit/main/docs/documents/index.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"The JavaScript packages",permalink:"/docs/the_js_packages"},next:{title:"Simple Values",permalink:"/docs/documents/values"}},o={},p=[{value:"Maps",id:"maps",level:2},{value:"Lists",id:"lists",level:2},{value:"Text",id:"text",level:2},{value:"Timestamps",id:"timestamps",level:2},{value:"Counter",id:"counter",level:2},{value:"Javascript language mapping",id:"javascript-language-mapping",level:2}],u={toc:p},m="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"document-data-model"},"Document Data Model"),(0,r.kt)("p",null,"Automerge documents are quite similar to JSON objects. A document always consists of a root map which is a map from strings to other automerge values, which can themselves be composite types."),(0,r.kt)("p",null,"The types in automerge are:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Composite types",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Maps"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"lists"},"List")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./text"},"Text")))),(0,r.kt)("li",{parentName:"ul"},"Scalar (non-composite) types:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"IEEE 754 64 bit floating point numbers"),(0,r.kt)("li",{parentName:"ul"},"Unsigned integers"),(0,r.kt)("li",{parentName:"ul"},"Signed integers"),(0,r.kt)("li",{parentName:"ul"},"Booleans Strings"),(0,r.kt)("li",{parentName:"ul"},"Timestamps"),(0,r.kt)("li",{parentName:"ul"},"Counters"),(0,r.kt)("li",{parentName:"ul"},"Byte arrays")))),(0,r.kt)("p",null,"See ",(0,r.kt)("a",{parentName:"p",href:"#javascript-language-mapping"},"below")," for how these types map to JavaScript types."),(0,r.kt)("h2",{id:"maps"},"Maps"),(0,r.kt)("p",null,'Maps have string keys and any automerge type as a value. "string" here means a unicode string. The underlying representation in automerge is as UTF-8 byte sequences but they are exposed as utf-16 strings in javascript.'),(0,r.kt)("h2",{id:"lists"},"Lists"),(0,r.kt)("p",null,"A list is an ordered sequence of automerge values. The underlying data structure is an RGA sequence, which means that concurrent insertions and deletions can be merged in a manner which attempts to preserve user intent."),(0,r.kt)("h2",{id:"text"},"Text"),(0,r.kt)("p",null,"Text is an implementation of the ",(0,r.kt)("a",{parentName:"p",href:"https://www.inkandswitch.com/peritext/"},"peritext")," CRDT. This is conceptually similar to a ",(0,r.kt)("a",{parentName:"p",href:"#lists"},"list")," where each element is a single unicode scalar value representing a single character. In addition to the characters ",(0,r.kt)("inlineCode",{parentName:"p"},"Text"),' also supports "marks". Marks are tuples of the form ',(0,r.kt)("inlineCode",{parentName:"p"},"(start, end, name, value)")," which have the following meanings:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"start")," - the index of the beginning of the mark"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"end")," - the index of the end of the mark"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"name")," - the name of the mark"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"value")," - any scalar (as in automerge scalar) value")),(0,r.kt)("p",null,"For example, a bold mark from charaters 1 to 5 might be represented as ",(0,r.kt)("inlineCode",{parentName:"p"},'(1, 5, "bold", true)'),"."),(0,r.kt)("p",null,"Note that the restriction to scalar values for the value of a mark will be lifted in future, although mark values will never be mutable - instead you should always create a new mark when updating a value. For now, if you need complex values in a mark you should serialize the value to a string."),(0,r.kt)("h2",{id:"timestamps"},"Timestamps"),(0,r.kt)("p",null,"Timestamps are the integer number of milliseconds since the unix epoch (midnight 1970, UTC)."),(0,r.kt)("h2",{id:"counter"},"Counter"),(0,r.kt)("p",null,"Counters are a simple CRDT which just merges by adding all concurrent operations. They can be incremented and decremented."),(0,r.kt)("h2",{id:"javascript-language-mapping"},"Javascript language mapping"),(0,r.kt)("p",null,"The mapping to javascript is accomplished with the use of proxies. This means that in the javascript library maps appear as ",(0,r.kt)("inlineCode",{parentName:"p"},"object"),"s and lists appear as ",(0,r.kt)("inlineCode",{parentName:"p"},"Array"),"s. There is only one numeric type in javascript - ",(0,r.kt)("inlineCode",{parentName:"p"},"number")," - so the javascript library guesses a bit. If you insert a javascript ",(0,r.kt)("inlineCode",{parentName:"p"},"number")," for which ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger"},(0,r.kt)("inlineCode",{parentName:"a"},"Number.isInteger"))," returns ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," then the number will be inserted as an integer, otherwise it will be a floating point value."),(0,r.kt)("p",null,"How ",(0,r.kt)("inlineCode",{parentName:"p"},"Text")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"String")," are represented will depend on whether you are using ",(0,r.kt)("a",{parentName:"p",href:"/docs/working_with_js#the-next-api"},"the ",(0,r.kt)("inlineCode",{parentName:"a"},"next")," API")),(0,r.kt)("p",null,"Timestamps are represented as javascript ",(0,r.kt)("inlineCode",{parentName:"p"},"Date"),"s."),(0,r.kt)("p",null,"Counters are represented as instances of the ",(0,r.kt)("inlineCode",{parentName:"p"},"Counter")," class."),(0,r.kt)("p",null,"Putting it all together, here's an example of an automerge document containing all the value types:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import  * as A  from "@automerge/automerge/next"\n\nlet doc = A.from({\n    map: { \n        key: "value",\n        nested_map: {key: "value"},\n        nested_list: [1]\n    },\n    list: ["a", "b", "c", {nested: "map"}, ["nested list"]],\n    // Note we are using the `next` API for text, so text sequences are strings\n    text: "some text",\n    // In the `next` API non mergable strings are instances of `RawString`.\n    // You should generally not need to use these. They are retained for backwards\n    // compatibility\n    raw_string: new A.RawString("rawstring"), \n    integer: 1,\n    float: 2.3,\n    boolean: true,\n    bytes: new Uint8Array([1, 2, 3]),\n    date: new Date(),\n    counter: new A.Counter(1),\n    none: null,\n})\n\ndoc = A.change(doc, d => {\n    // Insert \'Hello\' at the begnning of the string\n    A.splice(d, ["text"], 0, 0, "Hello ")\n    d.counter.increment(20)\n    d.map.key = "new value"\n    d.map.nested_map.key = "new nested value"\n    d.list[0] = "A"\n    d.list.insertAt(0, "Z")\n    d.list[4].nested = "MAP"\n    d.list[5][0] = "NESTED LIST"\n})\n\nconsole.log(doc)\n\n// Prints\n// {\n//   map: {\n//     key: \'new value\',\n//     nested_map: { key: \'new nested value\' },\n//     nested_list: [ 1 ]\n//   },\n//   list: [ \'Z\', \'A\', \'b\', \'c\', { nested: \'MAP\' }, [ \'NESTED LIST\' ] ],\n//   text: \'Hello world\',\n//   raw_string: RawString { val: \'rawstring\' },\n//   integer: 1,\n//   float: 2.3,\n//   boolean: true,\n//   bytes: Uint8Array(3) [ 1, 2, 3 ],\n//   date: 2023-09-11T13:35:12.229Z,\n//   counter: Counter { value: 21 },\n//   none: null\n// }\n')))}c.isMDXComponent=!0}}]);