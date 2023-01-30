"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4193],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(r),m=o,h=u["".concat(s,".").concat(m)]||u[m]||d[m]||a;return r?n.createElement(h,i(i({ref:t},p),{},{components:r})):n.createElement(h,i({ref:t},p))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[u]="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},5418:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var n=r(7462),o=(r(7294),r(3905));const a={sidebar_position:5},i="Text",c={unversionedId:"types/text",id:"types/text",isDocsHomePage:!1,title:"Text",description:"Automerge.Text provides support for collaborative text editing. Under the hood, text is",source:"@site/docs/types/text.md",sourceDirName:"types",slug:"/types/text",permalink:"/docs/types/text",editUrl:"https://github.com/automerge/automerge.github.io/edit/main/docs/types/text.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Lists",permalink:"/docs/types/lists"},next:{title:"Modeling Data",permalink:"/docs/cookbook/modeling-data"}},s=[],l={toc:s};function p(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"text"},"Text"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Automerge.Text")," provides support for collaborative text editing. Under the hood, text is\nrepresented as a list of characters, which is edited by inserting or deleting individual characters.\nCompared to using a regular JavaScript array, ",(0,o.kt)("inlineCode",{parentName:"p"},"Automerge.Text")," offers better performance."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"Note:")," Technically, text should be represented as a list of\n",(0,o.kt)("a",{parentName:"p",href:"http://www.unicode.org/reports/tr29/"},"Unicode ",(0,o.kt)("em",{parentName:"a"},"grapheme clusters")),'. What the user thinks of as a\n"character" may actually be a series of several Unicode code points, including accents,\ndiacritics, and other combining marks. A grapheme cluster is the smallest editable unit of text:\nthat is, the thing that gets deleted if you press the delete key once, or the thing that the\ncursor skips over if you press the right-arrow key once. Emoji make a good test case, since many\nemoji consist of a sequence of several Unicode code points (for example, the\n',(0,o.kt)("a",{parentName:"p",href:"http://www.unicode.org/reports/tr51/"},"skintone modifier")," is a combining mark).\nYou can create a Text object inside a change callback. Then you can use ",(0,o.kt)("inlineCode",{parentName:"p"},"insertAt()")," and\n",(0,o.kt)("inlineCode",{parentName:"p"},"deleteAt()")," to insert and delete characters (same API as for list modifications, shown\n",(0,o.kt)("a",{parentName:"p",href:"#updating-a-document"},"above"),"):")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"newDoc = Automerge.change(currentDoc, doc => {\n  doc.text = new Automerge.Text()\n  doc.text.insertAt(0, 'h', 'e', 'l', 'l', 'o')\n  doc.text.deleteAt(0)\n  doc.text.insertAt(0, 'H')\n})\n")),(0,o.kt)("p",null,"To inspect a text object and render it, you can use the following methods (outside of a change\ncallback):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"newDoc.text.length // returns 5, the number of characters\nnewDoc.text.get(0) // returns 'H', the 0th character in the text\nnewDoc.text.toString() // returns 'Hello', the concatenation of all characters\nfor (let char of newDoc.text) console.log(char) // iterates over all characters\n")),(0,o.kt)("p",null,"To figure out which regions were inserted by which users, you can use the elementId. The ElementID gives is a string of the form ",(0,o.kt)("inlineCode",{parentName:"p"},"${actorId}@${counter}"),". Here, actorId is the ID of the actor who inserted that character."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"let elementId = newDoc.text.getElemId(index)\n// '2@369125d35a934292b6acb580e31f3613'\n")),(0,o.kt)("p",null,"Note that the actorId changes with each call to ",(0,o.kt)("inlineCode",{parentName:"p"},"Automerge.init()"),"."))}p.isMDXComponent=!0}}]);