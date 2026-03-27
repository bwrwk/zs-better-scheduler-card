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

function getRawTimeslotSummary(item) {
    return (item.timeslots ?? []).map((slot) => ({
        start: slot.start,
        stop: slot.stop,
        actions: (slot.actions ?? []).map((action) => [action.service ?? "unknown service", action.entity_id ?? "unknown entity"].join(" -> "))
    }));
}
function makeReadonlyProjection(item, reasonCode, reason, rawSummary, details = [], suggestions = []) {
    return {
        mode: "readonly",
        rawName: item.name ?? "Unknown schedule",
        rawId: item.entity_id,
        reasonCode,
        reason,
        rawSummary,
        details,
        rawTimeslots: getRawTimeslotSummary(item),
        suggestions
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
    const { domain, entityId } = event.target;
    switch (effectiveKind) {
        case "turn_on":
            return { entity_id: entityId, service: `${domain}.turn_on` };
        case "turn_off":
            return { entity_id: entityId, service: `${domain}.turn_off` };
        case "turn_on_for_duration":
            return {
                entity_id: entityId,
                service: `${domain}.turn_on`,
                service_data: event.action.serviceData
            };
        case "run":
            if (domain === "automation") {
                return { entity_id: entityId, service: "automation.trigger", service_data: event.action.serviceData };
            }
            return { entity_id: entityId, service: `${domain}.turn_on`, service_data: event.action.serviceData };
        case "activate":
            return { entity_id: entityId, service: `${domain}.turn_on`, service_data: event.action.serviceData };
        case "custom_service":
            return {
                entity_id: entityId,
                service: event.action.service ?? `${domain}.turn_on`,
                service_data: event.action.serviceData
            };
        default:
            return { entity_id: entityId, service: `${domain}.turn_on` };
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
        if ((event.durationMinutes ?? 0) < 2) {
            errors.push("Na backendzie scheduler-component minimalne pewne duration to 2 minuty.");
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
        repeat_type: "repeat"
    };
}
function eventToEditPayload(event) {
    if (!event.sourceMeta?.backendScheduleId) {
        throw new Error("Brak backendScheduleId dla edycji wpisu.");
    }
    return {
        entity_id: event.sourceMeta.backendScheduleId,
        ...eventToAddPayload(event)
    };
}
function sameConditions(left, right) {
    return JSON.stringify(left ?? []) === JSON.stringify(right ?? []);
}
function asWeekdays(days) {
    const supported = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    return (days ?? []).filter((day) => supported.includes(day));
}
function actionLabelForService(service, durationMinutes) {
    if (service === "automation.trigger") {
        return "Uruchom";
    }
    if (service.endsWith(".turn_off")) {
        return "Wylacz";
    }
    if (durationMinutes) {
        return `Wlacz na ${durationMinutes} min`;
    }
    if (service.startsWith("script.")) {
        return "Uruchom";
    }
    if (service.startsWith("scene.")) {
        return "Aktywuj";
    }
    return "Wlacz";
}
function backendItemToProjection(item) {
    const timeslots = item.timeslots ?? [];
    const weekdays = asWeekdays(item.weekdays);
    if (!timeslots.length) {
        return makeReadonlyProjection(item, "no_timeslots", "Brak timeslotow", "Harmonogram nie zawiera zadnych timeslotow.", ["Ten wpis nie ma zadnego momentu startu do pokazania w prostym modelu eventu."], ["Sprawdz wpis w oryginalnym schedulerze lub utworz go ponownie w tej karcie."]);
    }
    if (!weekdays.length) {
        return makeReadonlyProjection(item, "unsupported_weekdays", "Nietypowe dni", "Ten harmonogram uzywa dni spoza prostego modelu UI.", [`Odebrane dni: ${(item.weekdays ?? []).join(", ") || "brak"}`], ["Obecna karta wspiera tylko mon-sun w prostym modelu event-first."]);
    }
    if (timeslots.length > 2) {
        return makeReadonlyProjection(item, "too_many_timeslots", "Za duzo timeslotow", "MVP obsluguje tylko pojedynczy event lub pare start/stop.", [`Liczba timeslotow: ${timeslots.length}`], ["Ten wpis wyglada na bardziej zlozony scenariusz niz prosty event."]);
    }
    const first = timeslots[0];
    const firstAction = first.actions?.[0];
    if (!first.start || !firstAction?.service || !firstAction.entity_id) {
        return makeReadonlyProjection(item, "missing_required_fields", "Brak wymaganych pol", "Timeslot nie ma kompletnego start/service/entity_id.", [
            `start: ${first.start ?? "brak"}`,
            `service: ${firstAction?.service ?? "brak"}`,
            `entity_id: ${firstAction?.entity_id ?? "brak"}`
        ], ["UI event-first wymaga jednoznacznego startu, uslugi i targetu."]);
    }
    if ((first.actions?.length ?? 0) !== 1) {
        return makeReadonlyProjection(item, "multiple_actions", "Wiele akcji", "MVP nie edytuje harmonogramow z wieloma akcjami w jednym timeslocie.", [`Liczba akcji w pierwszym timeslocie: ${first.actions?.length ?? 0}`], ["Rozwaz rozbicie tego wpisu na prostsze harmonogramy lub skrypt."]);
    }
    if (timeslots.length === 2) {
        const second = timeslots[1];
        const secondAction = second.actions?.[0];
        if (!second.start ||
            !secondAction?.service ||
            !secondAction.entity_id ||
            secondAction.entity_id !== firstAction.entity_id ||
            !firstAction.service.endsWith(".turn_on") ||
            !secondAction.service.endsWith(".turn_off") ||
            !sameConditions(first.conditions, second.conditions)) {
            return makeReadonlyProjection(item, "incompatible_duration_pair", "Niekompatybilna para start/stop", "Nie udalo sie bezpiecznie rozpoznac jednego eventu z duration.", [
                `Start entity: ${firstAction.entity_id}`,
                `Stop entity: ${secondAction?.entity_id ?? "brak"}`,
                `Start service: ${firstAction.service}`,
                `Stop service: ${secondAction?.service ?? "brak"}`
            ], ["Para start/stop nie spelnia prostego wzorca jednego eventu 'na czas'."]);
        }
        const durationMinutes = parseTimeToMinutes(second.start) - parseTimeToMinutes(first.start);
        if (durationMinutes < 1) {
            return makeReadonlyProjection(item, "invalid_duration", "Nieprawidlowe duration", "Duration nie miesci sie w prostym modelu MVP.", [`start: ${first.start}`, `stop: ${second.start}`, `wyliczone duration: ${durationMinutes}`], ["Obecna karta nie wspiera duration rownego 0, ujemnego ani przechodzacego przez polnoc."]);
        }
        const domain = firstAction.entity_id.split(".")[0] ?? "unknown";
        return {
            mode: "editable",
            warnings: ["Duration jest wyprowadzone z pary start/stop w backendzie."],
            event: {
                id: item.schedule_id ?? item.entity_id ?? `${item.name ?? "schedule"}-derived`,
                name: item.name ?? "Schedule",
                enabled: item.enabled ?? true,
                weekdays,
                startTime: first.start,
                durationMinutes,
                target: {
                    entityId: firstAction.entity_id,
                    domain,
                    label: firstAction.entity_id
                },
                action: {
                    kind: "turn_on_for_duration",
                    label: actionLabelForService(firstAction.service, durationMinutes),
                    serviceData: firstAction.service_data
                },
                tags: item.tags ?? [],
                conditions: first.conditions?.map((condition) => ({
                    entityId: condition.entity_id ?? "",
                    value: condition.value ?? "",
                    matchType: (condition.match_type ?? "is")
                })),
                sourceMeta: {
                    backendScheduleId: item.entity_id,
                    compatibility: "derived"
                }
            }
        };
    }
    const domain = firstAction.entity_id.split(".")[0] ?? "unknown";
    const service = firstAction.service;
    let actionKind = "custom_service";
    if (service === "automation.trigger") {
        actionKind = "run";
    }
    else if (service.endsWith(".turn_on")) {
        actionKind = domain === "script" ? "run" : domain === "scene" ? "activate" : "turn_on";
    }
    else if (service.endsWith(".turn_off")) {
        actionKind = "turn_off";
    }
    return {
        mode: "editable",
        warnings: [],
        event: {
            id: item.schedule_id ?? item.entity_id ?? `${item.name ?? "schedule"}-native`,
            name: item.name ?? "Schedule",
            enabled: item.enabled ?? true,
            weekdays,
            startTime: first.start,
            target: {
                entityId: firstAction.entity_id,
                domain,
                label: firstAction.entity_id
            },
            action: {
                kind: actionKind,
                label: actionLabelForService(service),
                service: actionKind === "custom_service" ? service : undefined,
                serviceData: firstAction.service_data
            },
            tags: item.tags ?? [],
            conditions: first.conditions?.map((condition) => ({
                entityId: condition.entity_id ?? "",
                value: condition.value ?? "",
                matchType: (condition.match_type ?? "is")
            })),
            sourceMeta: {
                backendScheduleId: item.entity_id,
                compatibility: "native"
            }
        }
    };
}

class SchedulerService {
    constructor(hass) {
        this.hass = hass;
    }
    async fetchSchedules() {
        const response = await this.hass.callWS({ type: "scheduler" });
        const baseItems = Array.isArray(response) ? response : response.schedules ?? [];
        const detailedItems = await Promise.all(baseItems.map(async (item) => {
            const scheduleRef = item.schedule_id ?? item.entity_id;
            if (!scheduleRef) {
                return item;
            }
            try {
                return await this.hass.callWS({
                    type: "scheduler/item",
                    schedule_id: item.schedule_id,
                    entity_id: item.entity_id ?? scheduleRef
                });
            }
            catch {
                return item;
            }
        }));
        return detailedItems;
    }
    async fetchTags() {
        try {
            const tags = await this.hass.callWS({ type: "scheduler/tags" });
            return Array.isArray(tags) ? tags : tags.tags ?? [];
        }
        catch {
            return [];
        }
    }
    async createSchedule(payload) {
        await this.hass.callService("scheduler", "add", payload);
    }
    async editSchedule(payload) {
        await this.hass.callService("scheduler", "edit", payload);
    }
    async removeSchedule(entityId) {
        await this.hass.callService("scheduler", "remove", { entity_id: entityId });
    }
    async setScheduleEnabled(entityId, enabled) {
        await this.hass.callService("switch", enabled ? "turn_on" : "turn_off", {
            entity_id: entityId
        });
    }
    async subscribeToUpdates(callback) {
        if (!this.hass.connection?.subscribeMessage) {
            return () => undefined;
        }
        return this.hass.connection.subscribeMessage(callback, { type: "scheduler_updated" });
    }
}

async function loadSchedulerSnapshot(service) {
    const [items, tags] = await Promise.all([service.fetchSchedules(), service.fetchTags()]);
    return {
        items,
        projections: items.map((item) => backendItemToProjection(item)),
        tags
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

const SUPPORTED_TARGET_DOMAINS = [
    "light",
    "switch",
    "script",
    "automation",
    "scene",
    "input_boolean"
];
const ACTION_OPTIONS = {
    light: ["turn_on", "turn_off", "turn_on_for_duration"],
    switch: ["turn_on", "turn_off", "turn_on_for_duration"],
    input_boolean: ["turn_on", "turn_off", "turn_on_for_duration"],
    script: ["run"],
    automation: ["run", "turn_on", "turn_off"],
    scene: ["activate"]
};
function isSupportedTargetDomain(domain) {
    return SUPPORTED_TARGET_DOMAINS.includes(domain);
}
function getActionOptionsForDomain(domain) {
    if (!isSupportedTargetDomain(domain)) {
        return ["custom_service"];
    }
    return ACTION_OPTIONS[domain];
}
function getActionLabel(kind) {
    switch (kind) {
        case "turn_on":
            return "Wlacz";
        case "turn_off":
            return "Wylacz";
        case "turn_on_for_duration":
            return "Wlacz na czas";
        case "run":
            return "Uruchom";
        case "activate":
            return "Aktywuj";
        case "custom_service":
            return "Custom service";
        default:
            return kind;
    }
}
function getActionKindsForTarget(target) {
    return getActionOptionsForDomain(target.domain);
}
function buildTargetOptions(states) {
    return Object.values(states)
        .filter((state) => isSupportedTargetDomain(state.entity_id.split(".")[0] ?? ""))
        .map((state) => {
        const domain = state.entity_id.split(".")[0] ?? "";
        return {
            entityId: state.entity_id,
            domain,
            label: String(state.attributes.friendly_name ?? state.entity_id)
        };
    })
        .sort((left, right) => left.label.localeCompare(right.label, "pl"));
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
const DEMO_PROJECTIONS = DEMO_EVENTS.map((event) => ({
    mode: "editable",
    event,
    warnings: ["Tryb demo: karta nie jest jeszcze podpieta do Home Assistanta."]
}));
let ZsBetterSchedulerCard = class ZsBetterSchedulerCard extends i {
    constructor() {
        super(...arguments);
        this.projections = DEMO_PROJECTIONS;
        this.availableTags = [];
        this.availableTargets = [];
        this.draft = this.createEmptyDraft();
        this.editingId = null;
        this.loading = false;
        this.saving = false;
        this.error = "";
        this.notice = "Tryb demo: karta czeka na obiekt hass.";
        this.filterSearch = "";
        this.filterStatus = "all";
        this.filterTag = "all";
        this.showReadonly = true;
        this.targetSearch = "";
        this.expandedReadonlyIds = [];
        this.isInitializedForHass = false;
        this.handleCreateNew = () => {
            this.editingId = null;
            this.draft = this.createEmptyDraft();
            this.notice = "Tworzenie nowego harmonogramu.";
        };
        this.handleResetEditor = () => {
            if (!this.editingId) {
                this.draft = this.createEmptyDraft();
                return;
            }
            const current = this.projections
                .filter((projection) => projection.mode === "editable")
                .find((projection) => projection.event.id === this.editingId);
            if (current) {
                this.draft = structuredClone(current.event);
            }
        };
        this.handleDeleteCurrent = async () => {
            const current = this.projections
                .filter((projection) => projection.mode === "editable")
                .find((projection) => projection.event.id === this.editingId);
            if (current) {
                await this.handleDeleteEvent(current.event);
            }
        };
        this.handleSave = async () => {
            if (!this.schedulerService) {
                this.error = "Brak polaczenia z Home Assistant. Nie mozna zapisac zmian w trybie demo.";
                return;
            }
            const errors = validateUiEvent(this.draft);
            if (errors.length) {
                return;
            }
            this.saving = true;
            this.error = "";
            try {
                if (this.editingId) {
                    await this.schedulerService.editSchedule(eventToEditPayload(this.draft));
                }
                else {
                    await this.schedulerService.createSchedule(eventToAddPayload(this.draft));
                }
                await this.refreshFromBackend(this.editingId ? "Zapisano zmiany harmonogramu." : "Dodano nowy harmonogram.");
                if (!this.editingId) {
                    this.draft = this.createEmptyDraft();
                }
            }
            catch (error) {
                this.error = error instanceof Error ? error.message : "Nie udalo sie zapisac harmonogramu.";
            }
            finally {
                this.saving = false;
            }
        };
        this.handleSearchInput = (event) => {
            this.filterSearch = event.target.value;
        };
        this.handleStatusFilterChange = (event) => {
            this.filterStatus = event.target.value;
        };
        this.handleTagFilterChange = (event) => {
            this.filterTag = event.target.value;
        };
        this.handleReadonlyFilterChange = (event) => {
            this.showReadonly = event.target.value === "show";
        };
        this.handleTargetSearchInput = (event) => {
            this.targetSearch = event.target.value;
        };
        this.handleNameInput = (event) => {
            this.draft = { ...this.draft, name: event.target.value };
        };
        this.handleTargetSelectionChange = (event) => {
            const entityId = event.target.value;
            const target = this.availableTargets.find((item) => item.entityId === entityId);
            if (!target) {
                return;
            }
            const nextKind = getActionKindsForTarget(target)[0];
            this.draft = {
                ...this.draft,
                target,
                action: {
                    ...this.draft.action,
                    kind: nextKind,
                    label: getActionLabel(nextKind),
                    service: nextKind === "custom_service" ? this.draft.action.service : undefined
                },
                durationMinutes: nextKind === "turn_on_for_duration" ? this.draft.durationMinutes ?? 30 : undefined
            };
            this.targetSearch = target.label;
        };
        this.handleTargetInput = (event) => {
            const entityId = event.target.value.trim();
            const domain = entityId.split(".")[0] ?? this.draft.target.domain;
            const supportedDomain = isSupportedTargetDomain(domain) ? domain : this.draft.target.domain;
            this.draft = {
                ...this.draft,
                target: {
                    ...this.draft.target,
                    entityId,
                    domain: supportedDomain
                }
            };
        };
        this.handleTargetLabelInput = (event) => {
            this.draft = {
                ...this.draft,
                target: {
                    ...this.draft.target,
                    label: event.target.value
                }
            };
        };
        this.handleDomainChange = (event) => {
            const domain = event.target.value;
            const nextKind = getActionKindsForTarget({ ...this.draft.target, domain })[0];
            this.draft = {
                ...this.draft,
                target: {
                    ...this.draft.target,
                    domain
                },
                action: {
                    ...this.draft.action,
                    kind: nextKind,
                    label: getActionLabel(nextKind),
                    service: nextKind === "custom_service" ? this.draft.action.service : undefined
                },
                durationMinutes: nextKind === "turn_on_for_duration" ? this.draft.durationMinutes ?? 30 : undefined
            };
        };
        this.handleActionChange = (event) => {
            const kind = event.target.value;
            this.draft = {
                ...this.draft,
                action: {
                    ...this.draft.action,
                    kind,
                    label: getActionLabel(kind),
                    service: kind === "custom_service" ? this.draft.action.service ?? "" : undefined
                },
                durationMinutes: kind === "turn_on_for_duration" ? this.draft.durationMinutes ?? 30 : undefined
            };
        };
        this.handleStartTimeInput = (event) => {
            this.draft = { ...this.draft, startTime: event.target.value };
        };
        this.handleDurationInput = (event) => {
            const raw = event.target.value;
            this.draft = { ...this.draft, durationMinutes: raw ? Number(raw) : undefined };
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
        this.handleServiceInput = (event) => {
            this.draft = {
                ...this.draft,
                action: {
                    ...this.draft.action,
                    service: event.target.value
                }
            };
        };
        this.handleNoteInput = (event) => {
            this.draft = { ...this.draft, note: event.target.value };
        };
    }
    setConfig(config) {
        this.config = config;
    }
    getCardSize() {
        return 7;
    }
    willUpdate(changedProperties) {
        if (changedProperties.has("hass")) {
            void this.handleHassChanged();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        void this.teardownSubscription();
    }
    render() {
        const validationErrors = validateUiEvent(this.draft);
        const filtered = this.getFilteredProjections();
        let payloadPreview = "";
        try {
            payloadPreview = JSON.stringify(this.editingId ? eventToEditPayload(this.draft) : eventToAddPayload(this.draft), null, 2);
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
                    Lista i formularz pracuja teraz na prawdziwym store schedulerow, jesli karta ma dostep do
                    <code>hass</code>. Niekompatybilne wpisy pokazywane sa jako readonly.
                  </p>
                </div>
                <button @click=${this.handleCreateNew} ?disabled=${this.saving}>Dodaj harmonogram</button>
              </div>

              ${this.error ? b `<div class="notice error">${this.error}</div>` : A}
              ${this.notice ? b `<div class="notice">${this.notice}</div>` : A}

              <section class="list-card">
                <div class="toolbar">
                  <h3>Harmonogramy</h3>
                  <span class="helper">${filtered.length} z ${this.projections.length} wpisow</span>
                </div>

                <div class="field-grid filters">
                  <label>
                    Szukaj
                    <input .value=${this.filterSearch} @input=${this.handleSearchInput} placeholder="Salon, scena, skrypt..." />
                  </label>
                  <label>
                    Status
                    <select .value=${this.filterStatus} @change=${this.handleStatusFilterChange}>
                      <option value="all">Wszystkie</option>
                      <option value="active">Tylko aktywne</option>
                      <option value="inactive">Tylko nieaktywne</option>
                    </select>
                  </label>
                  <label>
                    Tag
                    <select .value=${this.filterTag} @change=${this.handleTagFilterChange}>
                      <option value="all">Wszystkie tagi</option>
                      ${this.availableTags.map((tag) => b `<option value=${tag}>${tag}</option>`)}
                    </select>
                  </label>
                  <label>
                    Readonly
                    <select .value=${this.showReadonly ? "show" : "hide"} @change=${this.handleReadonlyFilterChange}>
                      <option value="show">Pokazuj readonly</option>
                      <option value="hide">Ukryj readonly</option>
                    </select>
                  </label>
                </div>

                <div class="list">
                  ${this.loading ? b `<div class="notice">Ladowanie harmonogramow z Home Assistanta...</div>` : A}
                  ${!this.loading && filtered.length === 0
            ? b `<div class="notice warning">Brak harmonogramow pasujacych do filtrow.</div>`
            : A}
                  ${filtered.map((projection) => this.renderProjectionRow(projection))}
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
                    <input .value=${this.draft.name} @input=${this.handleNameInput} ?disabled=${this.saving} />
                  </label>

                  <div class="field-grid two">
                    <label>
                      Szukaj targetu
                      <input
                        .value=${this.targetSearch}
                        @input=${this.handleTargetSearchInput}
                        placeholder="szukaj po nazwie lub entity_id"
                        ?disabled=${this.saving}
                      />
                    </label>
                    <label>
                      Target
                      <select .value=${this.draft.target.entityId} @change=${this.handleTargetSelectionChange} ?disabled=${this.saving}>
                        ${this.getFilteredTargets().length === 0
            ? b `<option value="">Brak pasujacych encji</option>`
            : this.getFilteredTargets().map((target) => b `
                                <option value=${target.entityId}>
                                  ${target.label} | ${target.entityId}
                                </option>
                              `)}
                      </select>
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Entity ID / custom
                      <input .value=${this.draft.target.entityId} @input=${this.handleTargetInput} ?disabled=${this.saving} />
                    </label>
                    <label>
                      Label
                      <input .value=${this.draft.target.label} @input=${this.handleTargetLabelInput} ?disabled=${this.saving} />
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Domena
                      <select .value=${this.draft.target.domain} @change=${this.handleDomainChange} ?disabled=${this.saving}>
                        <option value="light">light</option>
                        <option value="switch">switch</option>
                        <option value="script">script</option>
                        <option value="automation">automation</option>
                        <option value="scene">scene</option>
                        <option value="input_boolean">input_boolean</option>
                      </select>
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Akcja
                      <select .value=${this.draft.action.kind} @change=${this.handleActionChange} ?disabled=${this.saving}>
                        ${this.getCurrentActionOptions().map((kind) => b `<option value=${kind}>${getActionLabel(kind)}</option>`)}
                      </select>
                    </label>
                    <label>
                      Status
                      <select .value=${this.draft.enabled ? "on" : "off"} @change=${this.handleEnabledChange} ?disabled=${this.saving}>
                        <option value="on">Aktywny</option>
                        <option value="off">Nieaktywny</option>
                      </select>
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Start
                      <input type="time" .value=${this.draft.startTime} @input=${this.handleStartTimeInput} ?disabled=${this.saving} />
                    </label>
                    <label>
                      Duration (min)
                      <input
                        type="number"
                        min="1"
                        .value=${String(this.draft.durationMinutes ?? "")}
                        ?disabled=${this.draft.action.kind !== "turn_on_for_duration" || this.saving}
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
                            ?disabled=${this.saving}
                          >
                            ${day.label}
                          </button>
                        `)}
                    </div>
                  </label>

                  <div class="field-grid two">
                    <label>
                      Tagi
                      <input
                        .value=${this.draft.tags.join(", ")}
                        @input=${this.handleTagsInput}
                        list="scheduler-tags"
                        placeholder="daily, evening"
                        ?disabled=${this.saving}
                      />
                    </label>
                    <label>
                      Service
                      <input
                        .value=${this.draft.action.service ?? ""}
                        @input=${this.handleServiceInput}
                        ?disabled=${this.draft.action.kind !== "custom_service" || this.saving}
                        placeholder="np. light.turn_on"
                      />
                    </label>
                  </div>

                  ${this.availableTags.length
            ? b `
                        <div class="tag-list">
                          ${this.availableTags.map((tag) => b `
                              <button type="button" class="ghost" @click=${() => this.addTagToDraft(tag)} ?disabled=${this.saving}>
                                #${tag}
                              </button>
                            `)}
                        </div>
                      `
            : A}
                  <datalist id="scheduler-tags">
                    ${this.availableTags.map((tag) => b `<option value=${tag}></option>`)}
                  </datalist>

                  <label>
                    Notatka
                    <textarea .value=${this.draft.note ?? ""} @input=${this.handleNoteInput} ?disabled=${this.saving}></textarea>
                  </label>

                  <div class="helper">
                    Widok uproszczony: ${formatWeekdays(this.draft.weekdays)} ${this.draft.startTime} |
                    ${this.draft.target.label || this.draft.target.entityId || "Brak targetu"} |
                    ${formatActionSummary(this.draft)}
                  </div>

                  ${this.draft.action.kind === "turn_on_for_duration"
            ? b `
                        <div class="warning">
                          Dla obecnego backendu bezpieczne minimum dla "na czas" to 2 minuty. Slot po 1 minucie
                          bywa pomijany przez scheduler-component.
                        </div>
                      `
            : A}

                  ${validationErrors.length
            ? b `<div class="warning">${validationErrors.map((error) => b `<div>${error}</div>`)}</div>`
            : A}

                  <div class="button-row">
                    <button @click=${this.handleSave} ?disabled=${this.saving || validationErrors.length > 0}>
                      ${this.saving ? "Zapisywanie..." : this.editingId ? "Zapisz zmiany" : "Dodaj harmonogram"}
                    </button>
                    <button class="secondary" @click=${this.handleResetEditor} ?disabled=${this.saving}>Reset</button>
                    ${this.editingId
            ? b `
                          <button class="ghost" @click=${this.handleDeleteCurrent} ?disabled=${this.saving}>
                            Usun
                          </button>
                        `
            : A}
                  </div>
                </div>
              </section>

              <section class="payload-card">
                <div class="toolbar">
                  <h3>Podglad adaptera</h3>
                  <span class="helper">${this.editingId ? "edit payload" : "add payload"}</span>
                </div>
                <pre>${payloadPreview}</pre>
              </section>
            </div>
          </div>
        </div>
      </ha-card>
    `;
    }
    renderProjectionRow(projection) {
        if (projection.mode === "readonly") {
            const readonlyKey = projection.rawId ?? projection.rawName;
            const expanded = this.expandedReadonlyIds.includes(readonlyKey);
            return b `
        <article class="row readonly">
          <div class="row-top">
            <div class="summary">${projection.rawName}</div>
            <span class="status readonly">Readonly</span>
          </div>
          <div class="meta">${projection.rawSummary}</div>
          <div class="warning">Powod: ${projection.reason}</div>
          ${projection.suggestions.length ? b `<div class="meta">${projection.suggestions[0]}</div>` : A}
          ${projection.rawId ? b `<div class="meta">${projection.rawId}</div>` : A}
          <div class="button-row">
            <button class="ghost" @click=${() => this.toggleReadonlyDetails(readonlyKey)}>
              ${expanded ? "Ukryj szczegoly" : "Pokaz szczegoly"}
            </button>
          </div>
          ${expanded
                ? b `
                <div class="stack">
                  ${projection.details.length
                    ? b `
                        <div class="readonly-box">
                          <div class="summary">Detale</div>
                          ${projection.details.map((detail) => b `<div class="meta">${detail}</div>`)}
                        </div>
                      `
                    : A}
                  ${projection.rawTimeslots.length
                    ? b `
                        <div class="readonly-box">
                          <div class="summary">Timesloty backendu</div>
                          ${projection.rawTimeslots.map((slot) => b `
                              <div class="meta mono">
                                ${slot.start ?? "--:--"}${slot.stop ? ` -> ${slot.stop}` : ""} |
                                ${slot.actions.join(" | ")}
                              </div>
                            `)}
                        </div>
                      `
                    : A}
                  ${projection.suggestions.length
                    ? b `
                        <div class="readonly-box">
                          <div class="summary">Co dalej</div>
                          ${projection.suggestions.map((suggestion) => b `<div class="meta">${suggestion}</div>`)}
                        </div>
                      `
                    : A}
                </div>
              `
                : A}
        </article>
      `;
        }
        const { event, warnings } = projection;
        const scheduleEntityId = event.sourceMeta?.backendScheduleId;
        return b `
      <article class="row">
        <div class="row-top">
          <div class="summary">${formatEventSummary(event)}</div>
          <span class="status ${event.enabled ? "" : "off"}">${event.enabled ? "Aktywny" : "Nieaktywny"}</span>
        </div>
        <div class="row-meta">
          <div class="meta">${event.name}</div>
          <div class="meta">${event.target.entityId}</div>
        </div>
        <div class="row-meta">
          <div class="tag-list">
            ${event.tags.map((tag) => b `<span class="chip">#${tag}</span>`)}
            <span class="pill">${event.sourceMeta?.compatibility ?? "native"}</span>
          </div>
          <div class="meta">${warnings[0] ?? ""}</div>
        </div>
        <div class="button-row">
          <button class="secondary" @click=${() => this.handleEdit(event)} ?disabled=${this.saving}>Edytuj</button>
          <button class="ghost" @click=${() => this.handleToggleEnabled(event)} ?disabled=${this.saving || !scheduleEntityId}>
            ${event.enabled ? "Wylacz" : "Wlacz"}
          </button>
          <button class="ghost" @click=${() => this.handleDeleteEvent(event)} ?disabled=${this.saving || !scheduleEntityId}>
            Usun
          </button>
        </div>
      </article>
    `;
    }
    async handleHassChanged() {
        this.availableTargets = this.hass ? buildTargetOptions(this.hass.states) : [];
        this.ensureDraftTargetValidity();
        if (!this.hass || this.isInitializedForHass) {
            return;
        }
        this.schedulerService = new SchedulerService(this.hass);
        this.isInitializedForHass = true;
        this.notice = "Laczenie z scheduler-component...";
        await this.refreshFromBackend();
        await this.setupSubscription();
    }
    async setupSubscription() {
        if (!this.schedulerService) {
            return;
        }
        await this.teardownSubscription();
        this.unsubscribeUpdates = await this.schedulerService.subscribeToUpdates(() => {
            void this.refreshFromBackend("Odebrano aktualizacje schedulera.");
        });
    }
    async teardownSubscription() {
        if (!this.unsubscribeUpdates) {
            return;
        }
        await this.unsubscribeUpdates();
        this.unsubscribeUpdates = undefined;
    }
    async refreshFromBackend(successNotice = "Harmonogramy odswiezone.") {
        if (!this.schedulerService) {
            return;
        }
        this.loading = true;
        this.error = "";
        try {
            const snapshot = await loadSchedulerSnapshot(this.schedulerService);
            this.projections = snapshot.projections.length ? snapshot.projections : [];
            this.availableTags = snapshot.tags.sort((left, right) => left.localeCompare(right, "pl"));
            this.notice = successNotice;
            this.syncDraftAfterRefresh();
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : "Nie udalo sie pobrac harmonogramow.";
            this.notice = "";
        }
        finally {
            this.loading = false;
        }
    }
    syncDraftAfterRefresh() {
        if (!this.editingId) {
            return;
        }
        const editable = this.projections
            .filter((projection) => projection.mode === "editable")
            .find((projection) => projection.event.id === this.editingId);
        if (editable) {
            this.draft = structuredClone(editable.event);
            return;
        }
        this.editingId = null;
        this.draft = this.createEmptyDraft();
    }
    createEmptyDraft() {
        const target = this.availableTargets[0];
        const inferredDomain = target?.domain ?? "";
        const domain = isSupportedTargetDomain(inferredDomain) ? inferredDomain : "light";
        const actionKind = getActionKindsForTarget(target ?? { domain})[0];
        return {
            id: `draft-${Date.now()}`,
            name: "",
            enabled: true,
            weekdays: ["mon", "tue", "wed", "thu", "fri"],
            startTime: "18:00",
            durationMinutes: actionKind === "turn_on_for_duration" ? 30 : undefined,
            target: target ?? { entityId: "", domain, label: "" },
            action: {
                kind: actionKind,
                label: getActionLabel(actionKind)
            },
            tags: [],
            note: "",
            sourceMeta: {
                compatibility: "native"
            }
        };
    }
    ensureDraftTargetValidity() {
        if (!this.availableTargets.length) {
            return;
        }
        const existing = this.availableTargets.find((target) => target.entityId === this.draft.target.entityId);
        if (!existing && !this.draft.target.entityId) {
            this.draft = this.createEmptyDraft();
        }
    }
    getCurrentActionOptions() {
        return getActionKindsForTarget(this.draft.target);
    }
    getFilteredTargets() {
        const query = this.targetSearch.trim().toLowerCase();
        if (!query) {
            return this.availableTargets;
        }
        return this.availableTargets.filter((target) => target.label.toLowerCase().includes(query) ||
            target.entityId.toLowerCase().includes(query) ||
            target.domain.toLowerCase().includes(query));
    }
    getFilteredProjections() {
        return this.projections.filter((projection) => {
            if (projection.mode === "readonly") {
                if (!this.showReadonly || this.filterStatus !== "all" || this.filterTag !== "all") {
                    return false;
                }
                const query = this.filterSearch.trim().toLowerCase();
                return !query || projection.rawName.toLowerCase().includes(query) || projection.rawSummary.toLowerCase().includes(query);
            }
            const { event } = projection;
            const query = this.filterSearch.trim().toLowerCase();
            const matchesSearch = !query ||
                event.name.toLowerCase().includes(query) ||
                event.target.label.toLowerCase().includes(query) ||
                event.target.entityId.toLowerCase().includes(query);
            const matchesStatus = this.filterStatus === "all" ||
                (this.filterStatus === "active" && event.enabled) ||
                (this.filterStatus === "inactive" && !event.enabled);
            const matchesTag = this.filterTag === "all" || event.tags.includes(this.filterTag);
            return matchesSearch && matchesStatus && matchesTag;
        });
    }
    handleEdit(event) {
        this.editingId = event.id;
        this.draft = structuredClone(event);
        this.notice = `Edytujesz: ${event.name || event.target.label}`;
    }
    async handleToggleEnabled(event) {
        const entityId = event.sourceMeta?.backendScheduleId;
        if (!entityId || !this.schedulerService) {
            return;
        }
        this.saving = true;
        this.error = "";
        try {
            await this.schedulerService.setScheduleEnabled(entityId, !event.enabled);
            await this.refreshFromBackend(`Zmieniono status harmonogramu ${event.name || entityId}.`);
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : "Nie udalo sie zmienic statusu.";
        }
        finally {
            this.saving = false;
        }
    }
    async handleDeleteEvent(event) {
        const entityId = event.sourceMeta?.backendScheduleId;
        if (!entityId || !this.schedulerService) {
            return;
        }
        if (!window.confirm(`Usunac harmonogram "${event.name || event.target.label}"?`)) {
            return;
        }
        this.saving = true;
        this.error = "";
        try {
            await this.schedulerService.removeSchedule(entityId);
            if (this.editingId === event.id) {
                this.editingId = null;
                this.draft = this.createEmptyDraft();
            }
            await this.refreshFromBackend(`Usunieto harmonogram ${event.name || entityId}.`);
        }
        catch (error) {
            this.error = error instanceof Error ? error.message : "Nie udalo sie usunac harmonogramu.";
        }
        finally {
            this.saving = false;
        }
    }
    toggleWeekday(day) {
        const exists = this.draft.weekdays.includes(day);
        this.draft = {
            ...this.draft,
            weekdays: exists ? this.draft.weekdays.filter((entry) => entry !== day) : [...this.draft.weekdays, day]
        };
    }
    addTagToDraft(tag) {
        if (this.draft.tags.includes(tag)) {
            return;
        }
        this.draft = {
            ...this.draft,
            tags: [...this.draft.tags, tag]
        };
    }
    toggleReadonlyDetails(key) {
        this.expandedReadonlyIds = this.expandedReadonlyIds.includes(key)
            ? this.expandedReadonlyIds.filter((entry) => entry !== key)
            : [...this.expandedReadonlyIds, key];
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
        radial-gradient(circle at top left, rgba(28, 91, 64, 0.16), transparent 32%),
        linear-gradient(160deg, rgba(28, 91, 64, 0.08), rgba(180, 133, 52, 0.14)),
        var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
    }

    .shell {
      display: grid;
      gap: 18px;
    }

    @media (min-width: 980px) {
      .shell {
        grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.95fr);
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

    .eyebrow,
    .pill,
    .status {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.77rem;
      font-weight: 600;
    }

    .eyebrow {
      background: rgba(24, 84, 62, 0.12);
      color: #1c5b40;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .pill {
      background: rgba(24, 84, 62, 0.08);
      color: var(--primary-text-color);
    }

    .status.off {
      background: rgba(120, 120, 120, 0.14);
      color: var(--secondary-text-color);
    }

    .status.readonly {
      background: rgba(158, 91, 0, 0.13);
      color: #9e5b00;
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
      background: rgba(255, 255, 255, 0.74);
      box-shadow: inset 0 0 0 1px rgba(127, 127, 127, 0.12);
    }

    .toolbar,
    .row-top,
    .row-meta,
    .button-row,
    .filters {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: center;
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

    .row.readonly {
      background: rgba(250, 246, 238, 0.9);
      border-color: rgba(158, 91, 0, 0.18);
    }

    .row.readonly .summary {
      color: #6f4100;
    }

    .summary {
      font-weight: 600;
      line-height: 1.4;
    }

    .meta,
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

    .notice {
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(24, 84, 62, 0.08);
      color: var(--primary-text-color);
      font-size: 0.9rem;
    }

    .notice.error {
      background: rgba(170, 52, 52, 0.11);
      color: #8d2323;
    }

    .notice.warning {
      background: rgba(158, 91, 0, 0.11);
      color: #9e5b00;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .stack {
      display: grid;
      gap: 8px;
    }

    .readonly-box {
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.72);
      border: 1px dashed rgba(158, 91, 0, 0.24);
    }

    .mono {
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.82rem;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      padding: 5px 10px;
      border-radius: 999px;
      font-size: 0.78rem;
      background: rgba(24, 84, 62, 0.1);
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

    button[disabled] {
      opacity: 0.55;
      cursor: not-allowed;
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
      .field-grid.two,
      .filters {
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
], ZsBetterSchedulerCard.prototype, "projections", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "availableTags", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "availableTargets", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "draft", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "editingId", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "loading", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "saving", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "error", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "notice", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "filterSearch", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "filterStatus", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "filterTag", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "showReadonly", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "targetSearch", void 0);
__decorate([
    r()
], ZsBetterSchedulerCard.prototype, "expandedReadonlyIds", void 0);
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
