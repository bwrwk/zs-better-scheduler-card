/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

const DEMO_EVENTS = [
    {
        id: "demo-salon-light",
        name: "Salon po poludniu",
        enabled: true,
        weekdays: ["tue", "wed"],
        startTime: "15:00",
        durationMinutes: 30,
        target: {
            entityId: "light.salon",
            domain: "light",
            label: "Salon"
        },
        action: {
            kind: "turn_on_for_duration",
            label: "Wlacz na 30 min"
        },
        tags: ["daily"],
        sourceMeta: {
            compatibility: "derived"
        }
    },
    {
        id: "demo-scene-evening",
        name: "Wieczorna scena",
        enabled: true,
        weekdays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        startTime: "20:30",
        target: {
            entityId: "scene.evening_relax",
            domain: "scene",
            label: "Scena wieczorna"
        },
        action: {
            kind: "activate",
            label: "Aktywuj"
        },
        tags: ["evening"],
        sourceMeta: {
            compatibility: "native"
        }
    },
    {
        id: "demo-presence-script",
        name: "Symulacja obecnosci",
        enabled: false,
        weekdays: ["fri", "sat"],
        startTime: "18:45",
        target: {
            entityId: "script.presence_simulation",
            domain: "script",
            label: "Skrypt obecnosci"
        },
        action: {
            kind: "run",
            label: "Uruchom"
        },
        tags: ["holiday"],
        note: "Przyklad zlozonego scenariusza odpalonego przez scheduler",
        sourceMeta: {
            compatibility: "native"
        }
    }
];

function parseTimeToMinutes(value) {
    const match = /^(\d{2}):(\d{2})$/.exec(value.trim());
    if (!match) {
        throw new Error(`Invalid time format: ${value}`);
    }
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    if (hours > 23 || minutes > 59) {
        throw new Error(`Invalid time value: ${value}`);
    }
    return hours * 60 + minutes;
}
function formatMinutesToTime(totalMinutes) {
    const normalized = ((totalMinutes % 1440) + 1440) % 1440;
    const hours = Math.floor(normalized / 60);
    const minutes = normalized % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
function addMinutesToTime(value, minutesToAdd) {
    const start = parseTimeToMinutes(value);
    const total = start + minutesToAdd;
    return {
        time: formatMinutesToTime(total),
        crossesMidnight: total >= 1440
    };
}

function mapConditions(conditions) {
    if (!conditions?.length) {
        return undefined;
    }
    return conditions.map((condition) => ({
        entity_id: condition.entityId,
        value: condition.value,
        match_type: condition.matchType
    }));
}
function buildActionPayload(event, kindOverride) {
    const effectiveKind = kindOverride ?? event.action.kind;
    switch (effectiveKind) {
        case "turn_on":
            return { entity_id: event.target.entityId, service: `${event.target.domain}.turn_on` };
        case "turn_off":
            return { entity_id: event.target.entityId, service: `${event.target.domain}.turn_off` };
        case "turn_on_for_duration":
            return {
                entity_id: event.target.entityId,
                service: `${event.target.domain}.turn_on`,
                service_data: event.action.serviceData
            };
        case "run":
            return { entity_id: event.target.entityId, service: `${event.target.domain}.turn_on` };
        case "activate":
            return { entity_id: event.target.entityId, service: `${event.target.domain}.turn_on` };
        case "custom_service":
            return {
                entity_id: event.target.entityId,
                service: event.action.service ?? `${event.target.domain}.turn_on`,
                service_data: event.action.serviceData
            };
        default:
            return { entity_id: event.target.entityId, service: `${event.target.domain}.turn_on` };
    }
}
function supportsDuration(event) {
    if (event.action.kind !== "turn_on_for_duration") {
        return false;
    }
    return ["light", "switch", "input_boolean"].includes(event.target.domain);
}
function validateUiEvent(event) {
    const errors = [];
    if (!event.name.trim()) {
        errors.push("Nazwa harmonogramu jest wymagana.");
    }
    if (!event.target.entityId.trim()) {
        errors.push("Target jest wymagany.");
    }
    if (!event.target.label.trim()) {
        errors.push("Label targetu jest wymagany.");
    }
    if (!event.weekdays.length) {
        errors.push("Wybierz przynajmniej jeden dzien.");
    }
    if (event.action.kind === "turn_on_for_duration") {
        if (!supportsDuration(event)) {
            errors.push("Duration w MVP jest wspierane tylko dla light, switch i input_boolean.");
        }
        if (!event.durationMinutes || event.durationMinutes < 1) {
            errors.push("Duration musi byc wieksze od 0.");
        }
        if (event.durationMinutes) {
            const result = addMinutesToTime(event.startTime, event.durationMinutes);
            if (result.crossesMidnight) {
                errors.push("Przejscie przez polnoc nie jest jeszcze wspierane w MVP.");
            }
        }
    }
    return errors;
}
function eventToAddPayload(event) {
    const errors = validateUiEvent(event);
    if (errors.length) {
        throw new Error(errors.join(" "));
    }
    const baseTimeslot = {
        start: event.startTime,
        actions: [buildActionPayload(event)],
        conditions: mapConditions(event.conditions),
        condition_type: event.conditions?.length ? "and" : undefined
    };
    const timeslots = event.action.kind === "turn_on_for_duration" && event.durationMinutes
        ? [
            baseTimeslot,
            {
                start: addMinutesToTime(event.startTime, event.durationMinutes).time,
                actions: [buildActionPayload(event, "turn_off")],
                conditions: mapConditions(event.conditions),
                condition_type: event.conditions?.length ? "and" : undefined
            }
        ]
        : [baseTimeslot];
    return {
        name: event.name,
        weekdays: event.weekdays,
        timeslots,
        tags: event.tags.length ? event.tags : undefined,
        enabled: event.enabled
    };
}

const WEEKDAY_LABELS = {
    mon: "Pn",
    tue: "Wt",
    wed: "Sr",
    thu: "Cz",
    fri: "Pt",
    sat: "Sb",
    sun: "Nd"
};
function formatWeekdays(weekdays) {
    if (weekdays.length === 7) {
        return "Codziennie";
    }
    return weekdays.map((day) => WEEKDAY_LABELS[day]).join(", ");
}
function formatActionSummary(event) {
    switch (event.action.kind) {
        case "turn_on_for_duration":
            return `Wlacz na ${event.durationMinutes ?? 0} min`;
        case "turn_on":
            return "Wlacz";
        case "turn_off":
            return "Wylacz";
        case "run":
            return "Uruchom";
        case "activate":
            return "Aktywuj";
        case "custom_service":
            return event.action.label || "Wlasna akcja";
        default:
            return event.action.label;
    }
}
function formatEventSummary(event) {
    return `${formatWeekdays(event.weekdays)} ${event.startTime} | ${event.target.label} | ${formatActionSummary(event)}`;
}

const WEEKDAYS = [
    { key: "mon", label: "Pn" },
    { key: "tue", label: "Wt" },
    { key: "wed", label: "Sr" },
    { key: "thu", label: "Cz" },
    { key: "fri", label: "Pt" },
    { key: "sat", label: "Sb" },
    { key: "sun", label: "Nd" }
];
let ZsBetterSchedulerCard = class ZsBetterSchedulerCard extends i {
    constructor() {
        super(...arguments);
        this.events = DEMO_EVENTS;
        this.draft = this.createEmptyDraft();
        this.editingId = null;
        this.handleCreateNew = () => {
            this.editingId = null;
            this.draft = this.createEmptyDraft();
        };
        this.handleResetEditor = () => {
            if (!this.editingId) {
                this.draft = this.createEmptyDraft();
                return;
            }
            const current = this.events.find((event) => event.id === this.editingId);
            if (current) {
                this.draft = structuredClone(current);
            }
        };
        this.handleSave = () => {
            const errors = validateUiEvent(this.draft);
            if (errors.length) {
                return;
            }
            if (this.editingId) {
                this.events = this.events.map((event) => event.id === this.editingId ? structuredClone(this.draft) : event);
            }
            else {
                this.events = [...this.events, structuredClone(this.draft)];
                this.editingId = this.draft.id;
            }
        };
        this.handleNameInput = (event) => {
            const value = event.target.value;
            this.draft = { ...this.draft, name: value };
        };
        this.handleTargetInput = (event) => {
            const value = event.target.value;
            this.draft = {
                ...this.draft,
                target: {
                    ...this.draft.target,
                    entityId: value
                }
            };
        };
        this.handleTargetLabelInput = (event) => {
            const value = event.target.value;
            this.draft = {
                ...this.draft,
                target: {
                    ...this.draft.target,
                    label: value
                }
            };
        };
        this.handleDomainChange = (event) => {
            const domain = event.target.value;
            this.draft = {
                ...this.draft,
                target: {
                    ...this.draft.target,
                    domain
                }
            };
        };
        this.handleActionChange = (event) => {
            const kind = event.target.value;
            const labelMap = {
                turn_on: "Wlacz",
                turn_off: "Wylacz",
                turn_on_for_duration: "Wlacz na czas",
                run: "Uruchom",
                activate: "Aktywuj",
                custom_service: "Custom service"
            };
            this.draft = {
                ...this.draft,
                action: {
                    ...this.draft.action,
                    kind,
                    label: labelMap[kind]
                },
                durationMinutes: kind === "turn_on_for_duration" ? this.draft.durationMinutes ?? 30 : undefined
            };
        };
        this.handleStartTimeInput = (event) => {
            const value = event.target.value;
            this.draft = { ...this.draft, startTime: value };
        };
        this.handleDurationInput = (event) => {
            const raw = event.target.value;
            this.draft = {
                ...this.draft,
                durationMinutes: raw ? Number(raw) : undefined
            };
        };
        this.handleTagsInput = (event) => {
            const value = event.target.value;
            this.draft = {
                ...this.draft,
                tags: value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
            };
        };
        this.handleEnabledChange = (event) => {
            this.draft = {
                ...this.draft,
                enabled: event.target.value === "on"
            };
        };
        this.handleNoteInput = (event) => {
            this.draft = {
                ...this.draft,
                note: event.target.value
            };
        };
    }
    setConfig(config) {
        this.config = config;
    }
    getCardSize() {
        return 6;
    }
    render() {
        const validationErrors = validateUiEvent(this.draft);
        let payloadPreview = "";
        try {
            payloadPreview = JSON.stringify(eventToAddPayload(this.draft), null, 2);
        }
        catch (error) {
            payloadPreview = error instanceof Error ? error.message : "Nie udalo sie przygotowac payloadu.";
        }
        return b `
      <ha-card>
        <div class="card">
          <div class="shell">
            <div class="column">
              <div class="intro">
                <div>
                  <span class="eyebrow">Event-first MVP</span>
                  <h2>ZS Better Scheduler Card</h2>
                  <p>
                    Pierwszy UI listy i formularza. Karta pracuje jeszcze na lokalnym stanie
                    demonstracyjnym, ale pokazuje docelowy model: target, akcja, start, duration i dni.
                  </p>
                </div>
                <button @click=${this.handleCreateNew}>Dodaj harmonogram</button>
              </div>

              <section class="list-card">
                <div class="toolbar">
                  <h3>Harmonogramy</h3>
                  <span class="helper">${this.events.length} wpisy</span>
                </div>
                <div class="list">
                  ${this.events.map((event) => b `
                      <article class="row">
                        <div class="row-top">
                          <div class="summary">${formatEventSummary(event)}</div>
                          <span class="status ${event.enabled ? "" : "off"}">
                            ${event.enabled ? "Aktywny" : "Nieaktywny"}
                          </span>
                        </div>
                        <div class="row-meta">
                          <div class="meta">${event.name}</div>
                          <div class="meta">${event.target.entityId}</div>
                        </div>
                        <div class="row-meta">
                          <div class="tag-list">
                            ${event.tags.map((tag) => b `<span class="chip">#${tag}</span>`)}
                          </div>
                          <div class="meta">${event.sourceMeta?.compatibility ?? "native"}</div>
                        </div>
                        <div class="button-row">
                          <button class="secondary" @click=${() => this.handleEdit(event)}>Edytuj</button>
                          <button class="ghost" @click=${() => this.toggleEnabled(event.id)}>
                            ${event.enabled ? "Wylacz" : "Wlacz"}
                          </button>
                        </div>
                      </article>
                    `)}
                </div>
              </section>
            </div>

            <div class="column">
              <section class="editor-card">
                <div class="toolbar">
                  <h3>${this.editingId ? "Edytuj event" : "Nowy event"}</h3>
                  <span class="helper">${formatEventSummary(this.draft)}</span>
                </div>

                <div class="form">
                  <label>
                    Nazwa harmonogramu
                    <input .value=${this.draft.name} @input=${this.handleNameInput} />
                  </label>

                  <div class="field-grid two">
                    <label>
                      Target
                      <input .value=${this.draft.target.entityId} @input=${this.handleTargetInput} />
                    </label>
                    <label>
                      Label
                      <input .value=${this.draft.target.label} @input=${this.handleTargetLabelInput} />
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Domena
                      <select .value=${this.draft.target.domain} @change=${this.handleDomainChange}>
                        <option value="light">light</option>
                        <option value="switch">switch</option>
                        <option value="script">script</option>
                        <option value="automation">automation</option>
                        <option value="scene">scene</option>
                        <option value="input_boolean">input_boolean</option>
                      </select>
                    </label>
                    <label>
                      Akcja
                      <select .value=${this.draft.action.kind} @change=${this.handleActionChange}>
                        <option value="turn_on">Wlacz</option>
                        <option value="turn_off">Wylacz</option>
                        <option value="turn_on_for_duration">Wlacz na czas</option>
                        <option value="run">Uruchom</option>
                        <option value="activate">Aktywuj</option>
                        <option value="custom_service">Custom service</option>
                      </select>
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Start
                      <input type="time" .value=${this.draft.startTime} @input=${this.handleStartTimeInput} />
                    </label>
                    <label>
                      Duration (min)
                      <input
                        type="number"
                        min="1"
                        .value=${String(this.draft.durationMinutes ?? "")}
                        ?disabled=${this.draft.action.kind !== "turn_on_for_duration"}
                        @input=${this.handleDurationInput}
                      />
                    </label>
                  </div>

                  <label>
                    Dni
                    <div class="weekday-row">
                      ${WEEKDAYS.map((day) => b `
                          <button
                            type="button"
                            class=${this.draft.weekdays.includes(day.key) ? "selected" : ""}
                            @click=${() => this.toggleWeekday(day.key)}
                          >
                            ${day.label}
                          </button>
                        `)}
                    </div>
                  </label>

                  <div class="field-grid two">
                    <label>
                      Tagi
                      <input .value=${this.draft.tags.join(", ")} @input=${this.handleTagsInput} />
                    </label>
                    <label>
                      Status
                      <select .value=${this.draft.enabled ? "on" : "off"} @change=${this.handleEnabledChange}>
                        <option value="on">Aktywny</option>
                        <option value="off">Nieaktywny</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Notatka
                    <textarea .value=${this.draft.note ?? ""} @input=${this.handleNoteInput}></textarea>
                  </label>

                  <div class="helper">
                    Widok uproszczony: ${formatWeekdays(this.draft.weekdays)} ${this.draft.startTime} |
                    ${this.draft.target.label || this.draft.target.entityId} | ${formatActionSummary(this.draft)}
                  </div>

                  ${validationErrors.length
            ? b `
                        <div class="warning">
                          ${validationErrors.map((error) => b `<div>${error}</div>`)}
                        </div>
                      `
            : null}

                  <div class="button-row">
                    <button @click=${this.handleSave}>${this.editingId ? "Zapisz zmiany" : "Dodaj do listy"}</button>
                    <button class="secondary" @click=${this.handleResetEditor}>Reset</button>
                  </div>
                </div>
              </section>

              <section class="payload-card">
                <div class="toolbar">
                  <h3>Podglad adaptera</h3>
                  <span class="helper">UI model -> scheduler payload</span>
                </div>
                <pre>${payloadPreview}</pre>
              </section>
            </div>
          </div>
        </div>
      </ha-card>
    `;
    }
    createEmptyDraft() {
        return {
            id: `draft-${Date.now()}`,
            name: "",
            enabled: true,
            weekdays: ["mon", "tue", "wed", "thu", "fri"],
            startTime: "18:00",
            target: {
                entityId: "",
                domain: "light",
                label: ""
            },
            action: {
                kind: "turn_on",
                label: "Wlacz"
            },
            tags: [],
            note: "",
            sourceMeta: {
                compatibility: "native"
            }
        };
    }
    handleEdit(event) {
        this.editingId = event.id;
        this.draft = structuredClone(event);
    }
    toggleEnabled(id) {
        this.events = this.events.map((event) => event.id === id ? { ...event, enabled: !event.enabled } : event);
        if (this.editingId === id) {
            this.draft = {
                ...this.draft,
                enabled: !this.draft.enabled
            };
        }
    }
    toggleWeekday(day) {
        const exists = this.draft.weekdays.includes(day);
        this.draft = {
            ...this.draft,
            weekdays: exists
                ? this.draft.weekdays.filter((entry) => entry !== day)
                : [...this.draft.weekdays, day]
        };
    }
};
ZsBetterSchedulerCard.styles = i$3 `
    :host {
      display: block;
    }

    .card {
      padding: 18px;
      border-radius: 22px;
      background:
        linear-gradient(160deg, rgba(28, 91, 64, 0.1), rgba(180, 133, 52, 0.12)),
        var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
    }

    .shell {
      display: grid;
      gap: 18px;
    }

    @media (min-width: 920px) {
      .shell {
        grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
      }
    }

    .intro {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(127, 127, 127, 0.18);
    }

    .eyebrow {
      display: inline-flex;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(24, 84, 62, 0.12);
      color: #1c5b40;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .column {
      display: grid;
      gap: 14px;
    }

    .list-card,
    .editor-card,
    .payload-card {
      padding: 14px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.72);
      box-shadow: inset 0 0 0 1px rgba(127, 127, 127, 0.12);
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .list {
      display: grid;
      gap: 10px;
    }

    .row {
      display: grid;
      gap: 10px;
      padding: 12px;
      border-radius: 16px;
      background: rgba(248, 246, 240, 0.86);
      border: 1px solid rgba(127, 127, 127, 0.14);
    }

    .row-top,
    .row-meta,
    .button-row {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }

    .summary {
      font-weight: 600;
      line-height: 1.4;
    }

    .meta {
      color: var(--secondary-text-color);
      font-size: 0.92rem;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip,
    .status {
      display: inline-flex;
      align-items: center;
      padding: 5px 10px;
      border-radius: 999px;
      font-size: 0.78rem;
      background: rgba(24, 84, 62, 0.1);
    }

    .status.off {
      background: rgba(120, 120, 120, 0.14);
      color: var(--secondary-text-color);
    }

    button {
      border: 0;
      border-radius: 12px;
      padding: 10px 12px;
      font: inherit;
      cursor: pointer;
      background: #1c5b40;
      color: white;
    }

    button.secondary {
      background: rgba(24, 84, 62, 0.08);
      color: var(--primary-text-color);
    }

    button.ghost {
      background: transparent;
      color: var(--primary-text-color);
      border: 1px solid rgba(127, 127, 127, 0.2);
    }

    .form {
      display: grid;
      gap: 12px;
    }

    .field-grid {
      display: grid;
      gap: 12px;
    }

    @media (min-width: 560px) {
      .field-grid.two {
        grid-template-columns: 1fr 1fr;
      }
    }

    label {
      display: grid;
      gap: 6px;
      font-size: 0.93rem;
      font-weight: 600;
    }

    input,
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid rgba(127, 127, 127, 0.22);
      border-radius: 12px;
      padding: 10px 12px;
      font: inherit;
      background: rgba(255, 255, 255, 0.96);
      color: var(--primary-text-color);
    }

    textarea {
      resize: vertical;
      min-height: 84px;
    }

    .weekday-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .weekday-row button {
      min-width: 42px;
      padding: 9px 0;
      background: rgba(24, 84, 62, 0.08);
      color: var(--primary-text-color);
    }

    .weekday-row button.selected {
      background: #1c5b40;
      color: white;
    }

    .helper,
    .warning,
    p {
      margin: 0;
      line-height: 1.5;
      color: var(--secondary-text-color);
    }

    .warning {
      color: #9e5b00;
    }

    h2,
    h3 {
      margin: 0;
      font-size: 1.05rem;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-size: 0.84rem;
      line-height: 1.5;
    }
  `;
__decorate([
    n({ attribute: false })
], ZsBetterSchedulerCard.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], ZsBetterSchedulerCard.prototype, "config", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "events", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "draft", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "editingId", void 0);
ZsBetterSchedulerCard = __decorate([
    t("zs-better-scheduler-card")
], ZsBetterSchedulerCard);
window.customCards = window.customCards || [];
window.customCards.push({
    type: "zs-better-scheduler-card",
    name: "ZS Better Scheduler Card",
    description: "Event-first scheduler card for Home Assistant"
});
//# sourceMappingURL=zs-better-scheduler-card.js.map
