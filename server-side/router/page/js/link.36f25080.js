(window.webpackJsonp=window.webpackJsonp||[]).push([["link"],{ef85:function(t,i,n){"use strict";n.r(i);var s=n("fd03"),e={name:"Link",data:function(){return{dataList:[]}},methods:{getLinks:function(){var t=this;Object(s.f)({id:this.$route.params.id}).then((function(i){"1"==i.code&&(t.dataList=i.data)}))},goWeb:function(t){window.open(t)}},mounted:function(){this.getLinks()}};n("f079"),n=n("2877"),e=Object(n.a)(e,(function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"link"},t._l(t.dataList,(function(i){return n("div",{key:i.id,staticClass:"link-item"},[n("div",{staticClass:"type"},[n("h3",[t._v(t._s(i.type))])]),n("ul",{staticClass:"link-content"},t._l(i.resource_list,(function(i){return n("li",{key:i.id,staticClass:"content-item",on:{click:function(n){return t.goWeb(i.link)}}},[n("div",{staticClass:"content-title"},[i.icon?n("img",{staticClass:"icon-link",attrs:{src:i.icon}}):n("div",{staticClass:"icon-link no-link"},[t._v("H")]),n("h4",{staticClass:"title"},[t._v(t._s(i.title))])]),n("div",{staticClass:"content-text"},[t._v(t._s(i.text))])])})),0)])})),0)}),[],!1,null,"241831ca",null);i.default=e.exports},f079:function(t,i,n){"use strict";n("fdeb")},fdeb:function(t,i,n){}}]);