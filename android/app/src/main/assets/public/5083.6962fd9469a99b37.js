"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5083],{5083:(at,f,r)=>{r.r(f),r.d(f,{HomeworkModule:()=>Xe});var m=r(6814),d=r(6223),_=r(9843),x=r(1021),e=r(5879),p=r(6825);const v="400ms cubic-bezier(0.4,0.0,0.2,1)",b=[(0,p.oB)({height:0,visibility:"hidden"}),(0,p.jt)(v,(0,p.oB)({height:"*",visibility:"visible"}))],k=[(0,p.oB)({height:"*",visibility:"visible"}),(0,p.jt)(v,(0,p.oB)({height:0,visibility:"hidden"}))];let Z=(()=>{var i;class s{set display(t){this._display=t,"none"!==t?this.isAnimated?this.toggle():this.show():this.hide()}set collapse(t){this.collapseNewValue=t,(!this._player||this._isAnimationDone)&&(this.isExpanded=t,this.toggle())}get collapse(){return this.isExpanded}constructor(t,n,a){this._el=t,this._renderer=n,this.collapsed=new e.vpe,this.collapses=new e.vpe,this.expanded=new e.vpe,this.expands=new e.vpe,this.isExpanded=!0,this.collapseNewValue=!0,this.isCollapsed=!1,this.isCollapse=!0,this.isCollapsing=!1,this.isAnimated=!1,this._display="block",this._stylesLoaded=!1,this._COLLAPSE_ACTION_NAME="collapse",this._EXPAND_ACTION_NAME="expand",this._factoryCollapseAnimation=a.build(k),this._factoryExpandAnimation=a.build(b)}ngAfterViewChecked(){this._stylesLoaded=!0,this._player&&this._isAnimationDone&&(this._player.reset(),this._renderer.setStyle(this._el.nativeElement,"height","*"))}toggle(){this.isExpanded?this.hide():this.show()}hide(){this.isCollapsing=!0,this.isExpanded=!1,this.isCollapsed=!0,this.isCollapsing=!1,this.collapses.emit(this),this._isAnimationDone=!1,this.animationRun(this.isAnimated,this._COLLAPSE_ACTION_NAME)(()=>{this._isAnimationDone=!0,this.collapseNewValue!==this.isCollapsed&&this.isAnimated?this.show():(this.collapsed.emit(this),this._renderer.setStyle(this._el.nativeElement,"display","none"))})}show(){this._renderer.setStyle(this._el.nativeElement,"display",this._display),this.isCollapsing=!0,this.isExpanded=!0,this.isCollapsed=!1,this.isCollapsing=!1,this.expands.emit(this),this._isAnimationDone=!1,this.animationRun(this.isAnimated,this._EXPAND_ACTION_NAME)(()=>{this._isAnimationDone=!0,this.collapseNewValue!==this.isCollapsed&&this.isAnimated?this.hide():(this.expanded.emit(this),this._renderer.removeStyle(this._el.nativeElement,"overflow"))})}animationRun(t,n){if(!t||!this._stylesLoaded)return l=>l();this._renderer.setStyle(this._el.nativeElement,"overflow","hidden"),this._renderer.addClass(this._el.nativeElement,"collapse");const a=n===this._EXPAND_ACTION_NAME?this._factoryExpandAnimation:this._factoryCollapseAnimation;return this._player&&this._player.reset(),this._player=a.create(this._el.nativeElement),this._player.play(),l=>{var c;return null===(c=this._player)||void 0===c?void 0:c.onDone(l)}}}return(i=s).\u0275fac=function(t){return new(t||i)(e.Y36(e.SBq),e.Y36(e.Qsj),e.Y36(p._j))},i.\u0275dir=e.lG2({type:i,selectors:[["","collapse",""]],hostVars:9,hostBindings:function(t,n){2&t&&(e.uIk("aria-hidden",n.isCollapsed),e.ekj("collapse",n.isCollapse)("in",n.isExpanded)("show",n.isExpanded)("collapsing",n.isCollapsing))},inputs:{display:"display",isAnimated:"isAnimated",collapse:"collapse"},outputs:{collapsed:"collapsed",collapses:"collapses",expanded:"expanded",expands:"expands"},exportAs:["bs-collapse"]}),s})(),A=(()=>{var i;class s{static forRoot(){return{ngModule:s,providers:[]}}}return(i=s).\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({}),s})();const T=["*"],H=function(i){return{"text-muted":i}};function y(i,s){if(1&i&&(e.TgZ(0,"button",7),e._uU(1),e.qZA()),2&i){const o=e.oxw();e.Q6J("ngClass",e.VKq(2,H,o.isDisabled)),e.xp6(1),e.hij(" ",o.heading," ")}}const J=[[["","accordion-heading",""]],"*"],M=["[accordion-heading]","*"];let N=(()=>{var i;class s{constructor(){this.closeOthers=!1,this.isAnimated=!1}}return(i=s).\u0275fac=function(t){return new(t||i)},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),s})(),w=(()=>{var i;class s{constructor(t){this.isAnimated=!1,this.closeOthers=!1,this.groups=[],Object.assign(this,t)}closeOtherPanels(t){this.closeOthers&&this.groups.forEach(n=>{n!==t&&(n.isOpen=!1)})}addGroup(t){t.isAnimated=this.isAnimated,this.groups.push(t)}removeGroup(t){const n=this.groups.indexOf(t);-1!==n&&this.groups.splice(n,1)}}return(i=s).\u0275fac=function(t){return new(t||i)(e.Y36(N))},i.\u0275cmp=e.Xpm({type:i,selectors:[["accordion"]],hostAttrs:["role","tablist",1,"panel-group",2,"display","block"],hostVars:1,hostBindings:function(t,n){2&t&&e.uIk("aria-multiselectable",n.closeOthers)},inputs:{isAnimated:"isAnimated",closeOthers:"closeOthers"},ngContentSelectors:T,decls:1,vars:0,template:function(t,n){1&t&&(e.F$t(),e.Hsn(0))},encapsulation:2}),s})(),D=(()=>{var i;class s{get isOpen(){return this._isOpen}set isOpen(t){t!==this.isOpen&&(t&&this.accordion.closeOtherPanels(this),this._isOpen=t,Promise.resolve(null).then(()=>{this.isOpenChange.emit(t)}))}constructor(t){this.isAnimated=!1,this.panelClass="panel-default",this.isDisabled=!1,this.isOpenChange=new e.vpe,this._isOpen=!1,this.accordion=t}ngOnInit(){this.accordion.addGroup(this)}ngOnDestroy(){this.accordion.removeGroup(this)}toggleOpen(){this.isDisabled||(this.isOpen=!this.isOpen)}}return(i=s).\u0275fac=function(t){return new(t||i)(e.Y36(w))},i.\u0275cmp=e.Xpm({type:i,selectors:[["accordion-group"],["accordion-panel"]],hostAttrs:[1,"panel",2,"display","block"],hostVars:2,hostBindings:function(t,n){2&t&&e.ekj("panel-open",n.isOpen)},inputs:{heading:"heading",panelClass:"panelClass",isDisabled:"isDisabled",isOpen:"isOpen"},outputs:{isOpenChange:"isOpenChange"},ngContentSelectors:M,decls:9,vars:6,consts:[[1,"panel","card",3,"ngClass"],["role","tab",1,"panel-heading","card-header",3,"ngClass","click"],[1,"panel-title"],["role","button",1,"accordion-toggle"],["class","btn btn-link","type","button",3,"ngClass",4,"ngIf"],["role","tabpanel",1,"panel-collapse","collapse",3,"collapse","isAnimated"],[1,"panel-body","card-block","card-body"],["type","button",1,"btn","btn-link",3,"ngClass"]],template:function(t,n){1&t&&(e.F$t(J),e.TgZ(0,"div",0)(1,"div",1),e.NdJ("click",function(){return n.toggleOpen()}),e.TgZ(2,"div",2)(3,"div",3),e.YNc(4,y,2,4,"button",4),e.Hsn(5),e.qZA()()(),e.TgZ(6,"div",5)(7,"div",6),e.Hsn(8,1),e.qZA()()()),2&t&&(e.Q6J("ngClass",n.panelClass),e.xp6(1),e.Q6J("ngClass",n.isDisabled?"panel-disabled":"panel-enabled"),e.xp6(2),e.uIk("aria-expanded",n.isOpen),e.xp6(1),e.Q6J("ngIf",n.heading),e.xp6(2),e.Q6J("collapse",!n.isOpen)("isAnimated",n.isAnimated))},dependencies:[m.mk,m.O5,Z],styles:["[_nghost-%COMP%]   .card-header.panel-enabled[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]   .card-header.panel-disabled[_ngcontent-%COMP%]   .btn.btn-link[_ngcontent-%COMP%]{cursor:default;text-decoration:none}"]}),s})(),S=(()=>{var i;class s{static forRoot(){return{ngModule:s,providers:[]}}}return(i=s).\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[m.ez,A]}),s})();var g=r(612),O=r(2629),h=r(9068),I=r(5861),Q=r(2341),Y=r(6460),q=r(9716),U=r(9322),E=r(465),j=r(6593),F=r(6101),G=r(723),L=r(1243),$=r(9692),P=r(3999);const K=["portComponent"];function B(i,s){1&i&&(e.TgZ(0,"ion-header",44)(1,"ion-toolbar")(2,"ion-buttons",45)(3,"ion-menu-button"),e._UZ(4,"ion-icon",43),e.qZA()(),e.TgZ(5,"ion-title"),e._uU(6),e.ALo(7,"translate"),e.qZA()()()),2&i&&(e.Q6J("translucent",!0),e.xp6(4),e.Q6J("ios","menu-sharp")("md","menu-sharp"),e.xp6(2),e.Oqu(e.lcZ(7,4,"homework")))}function R(i,s){1&i&&(e.TgZ(0,"ion-header",46)(1,"ion-toolbar",47)(2,"ion-buttons",45)(3,"ion-menu-button"),e._UZ(4,"ion-icon",48),e.qZA()(),e.TgZ(5,"ion-title"),e._uU(6),e.ALo(7,"translate"),e.qZA()()()),2&i&&(e.xp6(4),e.Q6J("ios","menu-sharp")("md","menu-sharp"),e.xp6(2),e.Oqu(e.lcZ(7,3,"homework")))}function V(i,s){if(1&i&&(e.TgZ(0,"div",49),e._uU(1),e.qZA()),2&i){const o=e.oxw();e.xp6(1),e.hij(" ",o.formatPorts(o.select_datas.class)," ")}}function z(i,s){1&i&&e._UZ(0,"ion-icon",50),2&i&&e.Q6J("md","close-circle")("ios","close-circle")}function X(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"ion-toolbar")(1,"ion-row")(2,"ion-col",51)(3,"ion-button",52),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.toggleItems(!0))}),e._uU(4," Select All "),e.qZA()(),e.TgZ(5,"ion-col",51)(6,"ion-button",52),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.toggleItems(!1))}),e._uU(7," Deselect All "),e.qZA()(),e.TgZ(8,"ion-col",51)(9,"ion-button",52),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.confirm())}),e._uU(10," OK "),e.qZA()()()()}2&i&&(e.xp6(2),e.Q6J("size",4),e.xp6(3),e.Q6J("size",4),e.xp6(3),e.Q6J("size",4))}function W(i,s){1&i&&(e.TgZ(0,"span",53),e._uU(1,"Select Class"),e.qZA())}function ee(i,s){if(1&i&&(e.TgZ(0,"ion-label",54)(1,"span",55),e._uU(2),e.ALo(3,"translate"),e.qZA(),e.TgZ(4,"span",56),e._uU(5),e.qZA()()),2&i){const o=e.oxw();e.xp6(2),e.Oqu(e.lcZ(3,2,"date")),e.xp6(3),e.hij(" ",o.formatDate(o.select_datas.s_date),"")}}function te(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",45)(3,"ion-button",57),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.cancel_date())}),e._uU(4),e.ALo(5,"translate"),e.qZA()(),e.TgZ(6,"ion-title"),e._uU(7),e.ALo(8,"translate"),e.qZA(),e.TgZ(9,"ion-buttons",58)(10,"ion-button",59),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.confirm_date())}),e._uU(11),e.ALo(12,"translate"),e.qZA()()()(),e.TgZ(13,"ion-content",60)(14,"ion-datetime",61,62),e.NdJ("ngModelChange",function(n){e.CHM(o);const a=e.oxw();return e.KtG(a.select_datas.s_date=n)})("ionChange",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.showHideDatePicker())}),e.qZA()()}if(2&i){const o=e.oxw();e.xp6(4),e.Oqu(e.lcZ(5,5,"cancel")),e.xp6(3),e.Oqu(e.lcZ(8,7,"select_date")),e.xp6(3),e.Q6J("strong",!0),e.xp6(1),e.Oqu(e.lcZ(12,9,"confirm")),e.xp6(3),e.Q6J("ngModel",o.select_datas.s_date)}}function ie(i,s){1&i&&e._UZ(0,"ion-icon",50),2&i&&e.Q6J("md","close-circle")("ios","close-circle")}function oe(i,s){1&i&&(e.TgZ(0,"span",53),e._uU(1,"Select Subject"),e.qZA())}function ne(i,s){1&i&&(e.TgZ(0,"span",53),e._uU(1,"Enter Message"),e.qZA())}function se(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",63)(1,"img",64),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.open())}),e.qZA()()}}function ae(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"img",69),e.NdJ("click",function(){e.CHM(o);const n=e.oxw(2);return e.KtG(n.startRecord())}),e.qZA()}}function le(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"span",70),e.NdJ("click",function(){e.CHM(o);const n=e.oxw(2);return e.KtG(n.startRecord())}),e._uU(1," Start"),e.qZA()}}function ce(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"img",71),e.NdJ("click",function(){e.CHM(o);const n=e.oxw(2);return e.KtG(n.stopRecord())}),e.qZA()}}function re(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"span",72),e.NdJ("click",function(){e.CHM(o);const n=e.oxw(2);return e.KtG(n.stopRecord())}),e._uU(1," Stop"),e.qZA()}}function _e(i,s){if(1&i&&(e.TgZ(0,"div",63),e.YNc(1,ae,1,0,"img",65),e.YNc(2,le,2,0,"span",66),e.YNc(3,ce,1,0,"img",67),e.YNc(4,re,2,0,"span",68),e.qZA()),2&i){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",!o.recording),e.xp6(1),e.Q6J("ngIf",!o.recording),e.xp6(1),e.Q6J("ngIf",o.recording),e.xp6(1),e.Q6J("ngIf",o.recording)}}function de(i,s){if(1&i&&(e.TgZ(0,"div",73),e._uU(1),e.qZA()),2&i){const o=e.oxw();e.xp6(1),e.hij(" ",o.select_datas.filename," ")}}function pe(i,s){if(1&i&&(e.TgZ(0,"div",73)(1,"audio",74),e._UZ(2,"source",75),e.qZA()()),2&i){const o=e.oxw();e.xp6(2),e.Q6J("src",o.select_datas.image,e.LSH)}}function me(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",76)(1,"button",77),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.deletefile())}),e._UZ(2,"ion-icon",43),e.qZA()()}2&i&&(e.xp6(2),e.Q6J("ios","trash-sharp")("md","trash-sharp"))}function ge(i,s){1&i&&(e.TgZ(0,"div",78),e._uU(1," only allow jpg, jpeg, png, pdf, mp3, xls, xlsx. "),e.qZA())}function he(i,s){1&i&&e._UZ(0,"br")}function ue(i,s){if(1&i&&e._UZ(0,"img",91),2&i){const o=e.oxw().$implicit;e.Q6J("src",o.event_image,e.LSH)}}function fe(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",92)(1,"div",93),e._uU(2),e.qZA(),e.TgZ(3,"div",93)(4,"button",94),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(3);return e.KtG(a.authservice.open(n.event_image))}),e._UZ(5,"img",95),e._uU(6," Download "),e.qZA()()()}if(2&i){const o=e.oxw().$implicit,t=e.oxw(3);e.xp6(2),e.hij(" ",t.getfilename(o.event_image)," ")}}function xe(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",92)(1,"div",93),e._uU(2),e.qZA(),e.TgZ(3,"div",93)(4,"button",94),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(3);return e.KtG(a.authservice.open(n.event_image))}),e._UZ(5,"img",96),e._uU(6," Download "),e.qZA()()()}if(2&i){const o=e.oxw().$implicit,t=e.oxw(3);e.xp6(2),e.hij(" ",t.getfilename(o.event_image)," ")}}function ve(i,s){if(1&i&&(e.TgZ(0,"div")(1,"audio",74),e._UZ(2,"source",75),e.qZA()()),2&i){const o=e.oxw().$implicit;e.xp6(2),e.s9C("src",o.event_image,e.LSH)}}function we(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"tbody")(1,"tr")(2,"td",84),e._uU(3),e.qZA(),e.TgZ(4,"td",85),e._uU(5),e.YNc(6,he,1,0,"br",33),e.YNc(7,ue,1,1,"img",86),e.YNc(8,fe,7,1,"div",87),e.YNc(9,xe,7,1,"div",87),e.YNc(10,ve,3,1,"div",33),e.qZA(),e.TgZ(11,"td",88)(12,"button",89)(13,"ion-icon",90),e.NdJ("click",function(){const a=e.CHM(o).$implicit,l=e.oxw(3);return e.KtG(l.deletehomework(a.MSG_ID))}),e.qZA()()()()()}if(2&i){const o=s.$implicit,t=e.oxw(3);e.xp6(3),e.AsE("",o.CLASS," - ",o.subject,""),e.xp6(2),e.hij(" ",o.MESSAGE," "),e.xp6(1),e.Q6J("ngIf",o.event_image&&o.event_image.length>0),e.xp6(1),e.Q6J("ngIf",t.checkimage(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkpdf(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkxls(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkmp3(o.event_image)),e.xp6(3),e.Q6J("md","trash-sharp")}}function Ce(i,s){if(1&i&&(e.TgZ(0,"accordion-group",81)(1,"table",82),e.YNc(2,we,14,9,"tbody",83),e.qZA()()),2&i){const o=s.$implicit,t=s.index,n=e.oxw(2);e.s9C("heading",o),e.Q6J("isOpen",0===t),e.xp6(2),e.Q6J("ngForOf",n.recentdata1[o])}}function be(i,s){if(1&i&&(e.TgZ(0,"div",31)(1,"accordion",79),e.YNc(2,Ce,3,3,"accordion-group",80),e.qZA()()),2&i){const o=e.oxw();e.xp6(1),e.Q6J("closeOthers",!0)("isAnimated",!0),e.xp6(1),e.Q6J("ngForOf",o.recentdates)}}function ke(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",4)(1,"div",6)(2,"button",97),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.movehomeworktofinal())}),e._uU(3," Send All Homework "),e.qZA()()()}}function Ze(i,s){1&i&&e._UZ(0,"br")}function Ae(i,s){if(1&i&&e._UZ(0,"img",91),2&i){const o=e.oxw().$implicit;e.Q6J("src",o.event_image,e.LSH)}}function Te(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",92)(1,"div",93),e._uU(2),e.qZA(),e.TgZ(3,"div",93)(4,"button",94),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(3);return e.KtG(a.authservice.open(n.event_image))}),e._UZ(5,"img",95),e._uU(6," Download "),e.qZA()()()}if(2&i){const o=e.oxw().$implicit,t=e.oxw(3);e.xp6(2),e.hij(" ",t.getfilename(o.event_image)," ")}}function He(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",92)(1,"div",93),e._uU(2),e.qZA(),e.TgZ(3,"div",93)(4,"button",94),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(3);return e.KtG(a.authservice.open(n.event_image))}),e._UZ(5,"img",96),e._uU(6," Download "),e.qZA()()()}if(2&i){const o=e.oxw().$implicit,t=e.oxw(3);e.xp6(2),e.hij(" ",t.getfilename(o.event_image)," ")}}function ye(i,s){if(1&i&&(e.TgZ(0,"div")(1,"audio",74),e._UZ(2,"source",75),e.qZA()()),2&i){const o=e.oxw().$implicit;e.xp6(2),e.s9C("src",o.event_image,e.LSH)}}function Je(i,s){if(1&i&&(e.TgZ(0,"tbody")(1,"tr")(2,"td",84),e._uU(3),e.qZA(),e.TgZ(4,"td",98),e._uU(5),e.YNc(6,Ze,1,0,"br",33),e.YNc(7,Ae,1,1,"img",86),e.YNc(8,Te,7,1,"div",87),e.YNc(9,He,7,1,"div",87),e.YNc(10,ye,3,1,"div",33),e.qZA()()()),2&i){const o=s.$implicit,t=e.oxw(3);e.xp6(3),e.AsE("",o.CLASS," - ",o.subject,""),e.xp6(2),e.hij(" ",o.MESSAGE," "),e.xp6(1),e.Q6J("ngIf",o.event_image&&o.event_image.length>0),e.xp6(1),e.Q6J("ngIf",t.checkimage(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkpdf(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkxls(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkmp3(o.event_image))}}function Me(i,s){if(1&i&&(e.TgZ(0,"accordion-group",81)(1,"table",82),e.YNc(2,Je,11,8,"tbody",83),e.qZA()()),2&i){const o=s.$implicit,t=s.index,n=e.oxw(2);e.s9C("heading",o),e.Q6J("isOpen",0===t),e.xp6(2),e.Q6J("ngForOf",n.gethw[o])}}function Ne(i,s){if(1&i&&(e.TgZ(0,"div")(1,"accordion",79),e.YNc(2,Me,3,3,"accordion-group",80),e.qZA()()),2&i){const o=e.oxw();e.xp6(1),e.Q6J("closeOthers",!0)("isAnimated",!0),e.xp6(1),e.Q6J("ngForOf",o.getwhdates)}}function De(i,s){1&i&&e._UZ(0,"br")}function Se(i,s){if(1&i&&e._UZ(0,"img",91),2&i){const o=e.oxw().$implicit;e.Q6J("src",o.event_image,e.LSH)}}function Oe(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",92)(1,"div",93),e._uU(2),e.qZA(),e.TgZ(3,"div",93)(4,"button",94),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(3);return e.KtG(a.authservice.open(n.event_image))}),e._UZ(5,"img",95),e._uU(6," Download "),e.qZA()()()}if(2&i){const o=e.oxw().$implicit,t=e.oxw(3);e.xp6(2),e.hij(" ",t.getfilename(o.event_image)," ")}}function Ie(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",92)(1,"div",93),e._uU(2),e.qZA(),e.TgZ(3,"div",93)(4,"button",94),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(3);return e.KtG(a.authservice.open(n.event_image))}),e._UZ(5,"img",96),e._uU(6," Download "),e.qZA()()()}if(2&i){const o=e.oxw().$implicit,t=e.oxw(3);e.xp6(2),e.hij(" ",t.getfilename(o.event_image)," ")}}function Qe(i,s){if(1&i&&(e.TgZ(0,"div")(1,"audio",74),e._UZ(2,"source",75),e.qZA()()),2&i){const o=e.oxw().$implicit;e.xp6(2),e.s9C("src",o.event_image,e.LSH)}}function Ye(i,s){if(1&i&&(e.TgZ(0,"tbody")(1,"tr")(2,"td",84),e._uU(3),e.qZA(),e.TgZ(4,"td",98),e._uU(5),e.YNc(6,De,1,0,"br",33),e.YNc(7,Se,1,1,"img",86),e.YNc(8,Oe,7,1,"div",87),e.YNc(9,Ie,7,1,"div",87),e.YNc(10,Qe,3,1,"div",33),e.qZA()()()),2&i){const o=s.$implicit,t=e.oxw(3);e.xp6(3),e.AsE("",o.CLASS," - ",o.subject,""),e.xp6(2),e.hij(" ",o.MESSAGE," "),e.xp6(1),e.Q6J("ngIf",o.event_image&&o.event_image.length>0),e.xp6(1),e.Q6J("ngIf",t.checkimage(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkpdf(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkxls(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkmp3(o.event_image))}}function qe(i,s){if(1&i&&(e.TgZ(0,"accordion-group",81)(1,"table",82),e.YNc(2,Ye,11,8,"tbody",83),e.qZA()()),2&i){const o=s.$implicit,t=s.index,n=e.oxw(2);e.s9C("heading",o),e.Q6J("isOpen",0===t),e.xp6(2),e.Q6J("ngForOf",n.last3days[o])}}function Ue(i,s){if(1&i&&(e.TgZ(0,"div")(1,"accordion",79),e.YNc(2,qe,3,3,"accordion-group",80),e.qZA()()),2&i){const o=e.oxw();e.xp6(1),e.Q6J("closeOthers",!0)("isAnimated",!0),e.xp6(1),e.Q6J("ngForOf",o.last3daysdates)}}function Ee(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"ion-label",99),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.toggleDateSelection())}),e._uU(1),e.qZA()}if(2&i){const o=e.oxw();e.xp6(1),e.hij(" ",o.formatDate(o.select_datas1.s_date)," ")}}function je(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",45)(3,"ion-button",57),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.toggleDateSelection())}),e._uU(4),e.ALo(5,"translate"),e.qZA()(),e.TgZ(6,"ion-title"),e._uU(7),e.ALo(8,"translate"),e.qZA(),e.TgZ(9,"ion-buttons",58)(10,"ion-button",59),e.NdJ("click",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.toggleDateSelection())}),e._uU(11),e.ALo(12,"translate"),e.qZA()()()(),e.TgZ(13,"ion-content",60)(14,"ion-datetime",61,62),e.NdJ("ngModelChange",function(n){e.CHM(o);const a=e.oxw();return e.KtG(a.select_datas1.s_date=n)})("ionChange",function(){e.CHM(o);const n=e.oxw();return e.KtG(n.showHideDatePicker())}),e.qZA()()}if(2&i){const o=e.oxw();e.xp6(4),e.Oqu(e.lcZ(5,5,"cancel")),e.xp6(3),e.Oqu(e.lcZ(8,7,"select_date")),e.xp6(3),e.Q6J("strong",!0),e.xp6(1),e.Oqu(e.lcZ(12,9,"confirm")),e.xp6(3),e.Q6J("ngModel",o.select_datas1.s_date)}}function Fe(i,s){1&i&&e._UZ(0,"br")}function Ge(i,s){if(1&i&&e._UZ(0,"img",91),2&i){const o=e.oxw().$implicit;e.Q6J("src",o.event_image,e.LSH)}}function Le(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",92)(1,"div",93),e._uU(2),e.qZA(),e.TgZ(3,"div",93)(4,"button",94),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(3);return e.KtG(a.authservice.open(n.event_image))}),e._UZ(5,"img",95),e._uU(6," Download "),e.qZA()()()}if(2&i){const o=e.oxw().$implicit,t=e.oxw(3);e.xp6(2),e.hij(" ",t.getfilename(o.event_image)," ")}}function $e(i,s){if(1&i){const o=e.EpF();e.TgZ(0,"div",92)(1,"div",93),e._uU(2),e.qZA(),e.TgZ(3,"div",93)(4,"button",94),e.NdJ("click",function(){e.CHM(o);const n=e.oxw().$implicit,a=e.oxw(3);return e.KtG(a.authservice.open(n.event_image))}),e._UZ(5,"img",96),e._uU(6," Download "),e.qZA()()()}if(2&i){const o=e.oxw().$implicit,t=e.oxw(3);e.xp6(2),e.hij(" ",t.getfilename(o.event_image)," ")}}function Pe(i,s){if(1&i&&(e.TgZ(0,"div")(1,"audio",74),e._UZ(2,"source",75),e.qZA()()),2&i){const o=e.oxw().$implicit;e.xp6(2),e.s9C("src",o.event_image,e.LSH)}}function Ke(i,s){if(1&i&&(e.TgZ(0,"tbody")(1,"tr")(2,"td",84),e._uU(3),e.qZA(),e.TgZ(4,"td",98),e._uU(5),e.YNc(6,Fe,1,0,"br",33),e.YNc(7,Ge,1,1,"img",86),e.YNc(8,Le,7,1,"div",87),e.YNc(9,$e,7,1,"div",87),e.YNc(10,Pe,3,1,"div",33),e.qZA()()()),2&i){const o=s.$implicit,t=e.oxw(3);e.xp6(3),e.AsE("",o.CLASS," - ",o.subject,""),e.xp6(2),e.hij(" ",o.MESSAGE," "),e.xp6(1),e.Q6J("ngIf",o.event_image&&o.event_image.length>0),e.xp6(1),e.Q6J("ngIf",t.checkimage(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkpdf(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkxls(o.event_image)),e.xp6(1),e.Q6J("ngIf",t.checkmp3(o.event_image))}}function Be(i,s){if(1&i&&(e.TgZ(0,"accordion-group",81)(1,"table",82),e.YNc(2,Ke,11,8,"tbody",83),e.qZA()()),2&i){const o=s.$implicit,t=s.index,n=e.oxw(2);e.s9C("heading",o),e.Q6J("isOpen",0===t),e.xp6(2),e.Q6J("ngForOf",n.senditems1[o])}}function Re(i,s){if(1&i&&(e.TgZ(0,"div")(1,"accordion",79),e.YNc(2,Be,3,3,"accordion-group",80),e.qZA()()),2&i){const o=e.oxw();e.xp6(1),e.Q6J("closeOthers",!0)("isAnimated",!0),e.xp6(1),e.Q6J("ngForOf",o.senditems1dates)}}const C=function(){return[0,.25,.5,.75]},Ve=[{path:"",component:(()=>{var i;class s{constructor(t,n,a,l,c,u,We,et,tt,it,ot,nt,st){this.serfile=t,this.media=n,this.fileChooser=a,this.filePath=l,this.base64=c,this.sanitizer=u,this.alertCtrl=We,this.storage=et,this.platform=tt,this.router=it,this.translate=ot,this.loading=nt,this.authservice=st,this.ios=!1,this.classs=[],this.subjects=[],this.select_datas={},this.select_datas1={},this.getwhdates=[],this.gethw=[],this.last3daysdates=[],this.last3days=[],this.recentdata=[],this.recentdata1=[],this.recentdates=[],this.senditems1dates=[],this.senditems1=[],this.recording=!1,this.error=!1,this.showDatePicker=!1,this.isPickerOpen=!1,this.platform.backButton.subscribe(()=>{this.router.navigate(["/dashboard"])})}ngOnInit(){this.ios=this.authservice.isiso(),this.translate.set(),this.translate.getparam("delete_circulars").then(t=>this.delete_homework=t),this.translate.getparam("cancel").then(t=>this.cancel=t),this.translate.getparam("delete").then(t=>this.delete=t),this.reset(),this.getSaveHomeworkDraft(),this.getallsubject(),this.getSaveHomework()}reset(){this.select_datas.s_date=(new Date).toISOString(),this.select_datas.staff_id=this.storage.getjson("teachersDetail")[0].staff_id,this.select_datas.Is_Admin=this.storage.getjson("teachersDetail")[0].Is_Admin,this.classs=this.storage.getjson("classlist"),this.select_datas1.s_date=(new Date).toISOString(),this.select_datas.image="",this.select_datas.type="",this.select_datas.filename=""}toggleItems(t){t?(this.portComponent.toggleItems(!1),this.portComponent.toggleItems(t),this.confirm()):this.portComponent.toggleItems(t)}confirm(){this.portComponent.confirm(),this.portComponent.close()}classChange(t){}getSaveHomeworkDraft(){this.recentdata1={},this.recentdates=[],this.loading.present(),this.authservice.post("getSaveHomeworkDraft",{Is_Admin:this.storage.getjson("teachersDetail")[0].Is_Admin,staff_id:this.storage.getjson("teachersDetail")[0].staff_id,classid:this.authservice.classids()}).subscribe(t=>{if(this.loading.dismissAll(),t.status){this.recentdata=t.data;let n=t.data;for(let a=0;a<n.length;a++){let l=n[a].MSG_DATE;-1==this.recentdates.indexOf(l)&&(this.recentdates.push(l),this.recentdata1[l]=[]),this.recentdata1[l].push(n[a])}}},t=>{this.loading.dismissAll(),console.log(t)})}getSaveHomework(){this.gethw={},this.getwhdates=[],this.last3days={},this.last3daysdates=[],this.loading.present(),this.authservice.post("getSaveHomework",{Is_Admin:this.storage.getjson("teachersDetail")[0].Is_Admin,staff_id:this.storage.getjson("teachersDetail")[0].staff_id,classid:this.authservice.classids()}).subscribe(t=>{if(this.loading.dismissAll(),t.status){let n=t.data,a=t.last3senditem;for(let l=0;l<n.length;l++){let c=n[l].MSG_DATE;-1==this.getwhdates.indexOf(c)&&(this.getwhdates.push(c),this.gethw[c]=[]),this.gethw[c].push(n[l])}for(let l=0;l<a.length;l++){let c=a[l].MSG_DATE;-1==this.last3daysdates.indexOf(c)&&(this.last3daysdates.push(c),this.last3days[c]=[]),this.last3days[c].push(a[l])}}},t=>{this.loading.dismissAll(),console.log(t)})}getallsubject(){this.loading.present(),this.authservice.get("getallsubject").subscribe(t=>{this.loading.dismissAll(),t.status&&(this.subjects=t.data)},t=>{this.loading.dismissAll(),console.log(t)})}onSubmit(t){this.loading.present(),this.authservice.post("saveHomeworkMessage",this.select_datas).subscribe(n=>{this.loading.dismissAll(),n.status&&(t.resetForm(),this.reset(),this.getSaveHomeworkDraft())},n=>{this.loading.dismissAll(),console.log(n)})}deletehomework(t){var n=this;return(0,I.Z)(function*(){yield(yield n.alertCtrl.create({header:n.delete_homework,buttons:[{text:n.cancel,role:"cancel",handler:l=>{console.log("Cancel clicked")}},{text:n.delete,handler:l=>{n.loading.present(),n.authservice.post("deletehomework",{id:t}).subscribe(c=>{n.loading.dismissAll(),n.getSaveHomeworkDraft()},c=>{n.loading.dismissAll()})}}]})).present()})()}formatPorts(t){return t.map(n=>n.name).join(", ")}open(){this.fileChooser.open().then(t=>{console.log(t),this.filePath.resolveNativePath(t).then(n=>{console.log(n);let a=n.split("/");this.select_datas.filename=a[a.length-1].toLowerCase();let l=n.split(".");l=l[l.length-1].toLowerCase(),"jpg"==l||"jpeg"==l||"png"==l||"pdf"==l||"mp3"==l||"xls"==l||"xlsx"==l?(this.select_datas.type=l,this.error=!1,l="mp3"==l?"data:audio/mpeg;base64,":`data:image/${l};base64,`,this.base64.encodeFile(n).then(c=>{this.select_datas.image=this.sanitizer.bypassSecurityTrustUrl(l+c.split("ase64,")[1]),console.log(this.select_datas.image)},c=>{console.log(c)})):this.error=!0},n=>{console.log(n)})}).catch(t=>console.log(t))}checkimage(t){return!t||(t=(t=t.split("."))[t.length-1].toLowerCase(),console.log(t),"pdf"!=t&&"mp3"!=t&&"xls"!=t&&"xlsx"!=t)}checkmp3(t){return!!t&&"mp3"==(t=t.split("."))[t.length-1].toLowerCase()}checkxls(t){return!!t&&("xls"==(t=(t=t.split("."))[t.length-1].toLowerCase())||"xlsx"==t)}checkpdf(t){return!!t&&"pdf"==(t=t.split("."))[t.length-1].toLowerCase()}getfilename(t){return(t=t.split("/"))[t.length-1]}startRecord(){this.fileName="record"+(new Date).getDate()+(new Date).getMonth()+(new Date).getFullYear()+(new Date).getHours()+(new Date).getMinutes()+(new Date).getSeconds()+".mp3",this.Path=this.serfile.filepath()+this.fileName,console.log(this.Path),this.audio=this.media.create(this.Path),this.select_datas.type="",this.select_datas.image="",this.select_datas.filename="",this.audio.startRecord(),this.recording=!0}stopRecord(){this.audio.stopRecord(),this.recording=!1,this.serfile.read(this.fileName).then(t=>{console.log(t);let n=t.split("base64,");0!=n[1].length&&(this.select_datas.filename=this.fileName,this.select_datas.type="mp3",this.error=!1,this.select_datas.image=this.sanitizer.bypassSecurityTrustUrl("data:audio/mpeg;base64,"+n[1]))},t=>{console.log(t)})}deletefile(){this.select_datas.type="",this.select_datas.image="",this.select_datas.filename=""}onSubmit1(){this.senditems1dates=[],this.senditems1={},this.loading.present(),this.authservice.post("searchSaveHomework",{Is_Admin:this.storage.getjson("teachersDetail")[0].Is_Admin,staff_id:this.storage.getjson("teachersDetail")[0].staff_id,classid:this.authservice.classids(),s_date:this.select_datas1.s_date}).subscribe(t=>{if(this.loading.dismissAll(),t.status){let n=t.data;for(let a=0;a<n.length;a++){let l=n[a].MSG_DATE;-1==this.senditems1dates.indexOf(l)&&(this.senditems1dates.push(l),this.senditems1[l]=[]),this.senditems1[l].push(n[a])}}},t=>{this.loading.dismissAll(),console.log(t)})}movehomeworktofinal(){let t=[];for(let n=0;n<this.recentdata.length;n++)t.push({CLASSSEC:this.recentdata[n].CLASS,ID:this.recentdata[n].MSG_ID});t={CLASSSEC:t},this.authservice.post("movehomeworktofinal",t).subscribe(n=>{this.loading.dismissAll(),n.status&&(this.getSaveHomeworkDraft(),this.getSaveHomework())},n=>{this.loading.dismissAll(),console.log(n)})}showHideDatePicker(){this.showDatePicker=!this.showDatePicker}formatDate(t=new Date){const n=new Date(t),a=n.getFullYear();let l=`${n.getMonth()+1}`,c=`${n.getDate()}`;return+c<10&&(c="0"+c),+l<10&&(l="0"+l),c+"/"+l+"/"+a}cancel_date(){this.modal.dismiss(null,"confirm")}confirm_date(){console.log("confirm"),this.modal.dismiss(null,"confirm")}toggleDateSelection(){this.isPickerOpen=!this.isPickerOpen}onWillDismiss(t,n){"cancel"===t.detail.role&&("first"==n?this.select_datas.s_date=null:this.select_datas1.s_date=null)}}return(i=s).\u0275fac=function(t){return new(t||i)(e.Y36(Q.n),e.Y36(Y.pU),e.Y36(q.M),e.Y36(U.y),e.Y36(E.D),e.Y36(j.H7),e.Y36(_.Br),e.Y36(F.V),e.Y36(_.t4),e.Y36(h.F0),e.Y36(G.w),e.Y36(L.b),e.Y36($.e))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-homework"]],viewQuery:function(t,n){if(1&t&&(e.Gf(K,5),e.Gf(_.ki,5)),2&t){let a;e.iGM(a=e.CRH())&&(n.portComponent=a.first),e.iGM(a=e.CRH())&&(n.modal=a.first)}},decls:76,vars:53,consts:[[3,"translucent",4,"ngIf"],[3,"fullscreen"],["collapse","condense","class","mt-4",4,"ngIf"],[1,"homework"],[1,""],[1,"card-header"],[1,"card-body","card_body"],["name","form","novalidate","",1,"border","border-primary",3,"ngSubmit"],["f","ngForm"],["name","class","item-content","","itemValueField","id","itemTextField","name","required","",3,"ngModel","items","canSearch","hasVirtualScroll","isMultiple","ngModelChange","onChange"],["portComponent","","class","ngModel"],["ionicSelectableValueTemplate",""],["ionicSelectableCloseButtonTemplate",""],["ionicSelectableFooterTemplate",""],["class","text-danger",4,"ngIf"],["lines","full"],["id","open-modal","class","selected-date",4,"ngIf"],["trigger","open-modal","animated","true",3,"initialBreakpoint","breakpoints","willDismiss"],["name","subject","item-content","","itemValueField","id","itemTextField","name","required","",3,"ngModel","items","canSearch","ngModelChange"],["subject","ngModel"],["type","text","name","message","placeholder","Type Here",3,"ngModel","required","ngModelChange"],["message","ngModel"],[1,"row","w-100","align-items-center","text-center"],["class","col-6",4,"ngIf"],["class","col-10",4,"ngIf"],["class","col-2",4,"ngIf"],["class","col-12 text-danger",4,"ngIf"],[1,"p-1"],["type","submit",1,"btn","btn-primary"],["class","m-3",4,"ngIf"],["class","",4,"ngIf"],[1,"m-3"],["heading","Today"],[4,"ngIf"],["heading","Last 3 Days"],["heading","Search By Date"],["f1","ngForm"],[1,"row","text-center","align-items-center"],[1,"col-8"],["id","open-modal1","class","selected-date",3,"click",4,"ngIf"],["animated","true",3,"isOpen","initialBreakpoint","breakpoints","willDismiss"],[1,"col-4"],["type","button",1,"btn","btn-success",3,"click"],[3,"ios","md"],[3,"translucent"],["slot","start"],["collapse","condense",1,"mt-4"],[1,"p-0"],[1,"text-white",3,"ios","md"],[1,"ionic-selectable-value-item"],[2,"font-size","24px",3,"md","ios"],[3,"size"],["expand","full",3,"click"],[1,"text-danger"],["id","open-modal",1,"selected-date"],[2,"float","left"],[2,"float","right"],[3,"click"],["slot","end"],[3,"strong","click"],[1,"ion-padding"],["name","dob","displayFormat","DD/MM/YYYY","pickerFormat","DD/MM/YYYY","presentation","date","mode","md","required","",3,"ngModel","ngModelChange","ionChange"],["dob","ngModel","datetime",""],[1,"col-6"],["alt","","src","../../assets/imgs/speakers/attachment.png",2,"width","30px",3,"click"],["alt","","style","\n                    width: 30px;\n                    filter: invert(58%) sepia(16%) saturate(2009%)\n                      hue-rotate(81deg) brightness(88%) contrast(86%);\n                  ","src","../../assets/imgs/speakers/microphone.png",3,"click",4,"ngIf"],["class","text-success",3,"click",4,"ngIf"],["alt","","style","\n                    width: 30px;\n                    filter: invert(13%) sepia(100%) saturate(6859%)\n                      hue-rotate(358deg) brightness(119%) contrast(120%);\n                  ","src","../../assets/imgs/speakers/microphone-off.png",3,"click",4,"ngIf"],["style","color: #ff0000",3,"click",4,"ngIf"],["alt","","src","../../assets/imgs/speakers/microphone.png",2,"width","30px","filter","invert(58%) sepia(16%) saturate(2009%)\n                      hue-rotate(81deg) brightness(88%) contrast(86%)",3,"click"],[1,"text-success",3,"click"],["alt","","src","../../assets/imgs/speakers/microphone-off.png",2,"width","30px","filter","invert(13%) sepia(100%) saturate(6859%)\n                      hue-rotate(358deg) brightness(119%) contrast(120%)",3,"click"],[2,"color","#ff0000",3,"click"],[1,"col-10"],["controls","","controlsList","noplaybackrate nodownload",1,"w-100"],["type","audio/mpeg",3,"src"],[1,"col-2"],["type","button",1,"btn","btn-danger",3,"click"],[1,"col-12","text-danger"],[3,"closeOthers","isAnimated"],[3,"heading","isOpen",4,"ngFor","ngForOf"],[3,"heading","isOpen"],[1,"table","table-bordered"],[4,"ngFor","ngForOf"],["width","20%"],["width","70%",1,"textleft","multi_lines_text"],["alt","","class","w-100",3,"src",4,"ngIf"],["class","row w-100 align-items-center m-0 p-0",4,"ngIf"],[1,"text-right"],["type","button",1,"btn","bg-white","ml-1"],[1,"text-danger",3,"md","click"],["alt","",1,"w-100",3,"src"],[1,"row","w-100","align-items-center","m-0","p-0"],[1,"col-12"],["type","button",1,"btn","btn-primary","m-0","px-0",3,"click"],["src","../../assets/imgs/speakers/pdf.png",1,"logo_img"],["src","../../assets/imgs/speakers/xls.png",1,"logo_img"],["type","button",1,"btn","btn-primary","btn-lg","btn-block",3,"click"],["width","80%",1,"textleft","multi_lines_text"],["id","open-modal1",1,"selected-date",3,"click"]],template:function(t,n){if(1&t){const a=e.EpF();e.YNc(0,B,8,6,"ion-header",0),e.TgZ(1,"ion-content",1),e.YNc(2,R,8,5,"ion-header",2),e.TgZ(3,"div",3)(4,"div",4)(5,"div",5),e._uU(6),e.ALo(7,"translate"),e.qZA(),e.TgZ(8,"div",6)(9,"form",7,8),e.NdJ("ngSubmit",function(){e.CHM(a);const c=e.MAs(10);return e.KtG(c.form.valid&&n.onSubmit(c))}),e.TgZ(11,"ion-item")(12,"ion-label"),e._uU(13),e.ALo(14,"translate"),e.qZA(),e.TgZ(15,"ionic-selectable",9,10),e.NdJ("ngModelChange",function(c){return n.select_datas.class=c})("onChange",function(c){return n.classChange(c)}),e.YNc(18,V,2,1,"ng-template",11),e.YNc(19,z,1,2,"ng-template",12),e.YNc(20,X,11,3,"ng-template",13),e.qZA()(),e.YNc(21,W,2,0,"span",14),e.TgZ(22,"ion-item",15),e.YNc(23,ee,6,4,"ion-label",16),e.TgZ(24,"ion-modal",17),e.NdJ("willDismiss",function(c){return n.onWillDismiss(c,"first")}),e.YNc(25,te,17,11,"ng-template"),e.qZA()(),e.TgZ(26,"ion-item")(27,"ion-label"),e._uU(28),e.ALo(29,"translate"),e.qZA(),e.TgZ(30,"ionic-selectable",18,19),e.NdJ("ngModelChange",function(c){return n.select_datas.subject=c}),e.YNc(32,ie,1,2,"ng-template",12),e.qZA()(),e.YNc(33,oe,2,0,"span",14),e.TgZ(34,"ion-item")(35,"ion-label"),e._uU(36),e.ALo(37,"translate"),e.qZA()(),e.TgZ(38,"ion-item",15)(39,"ion-textarea",20,21),e.NdJ("ngModelChange",function(c){return n.select_datas.message=c}),e.qZA()(),e.YNc(41,ne,2,0,"span",14),e.TgZ(42,"ion-item",15)(43,"div",22),e.YNc(44,se,2,0,"div",23),e.YNc(45,_e,5,4,"div",23),e.YNc(46,de,2,1,"div",24),e.YNc(47,pe,3,1,"div",24),e.YNc(48,me,3,2,"div",25),e.YNc(49,ge,2,0,"div",26),e.qZA()(),e.TgZ(50,"div",27)(51,"button",28),e._uU(52),e.ALo(53,"translate"),e.qZA()()()()(),e.YNc(54,be,3,3,"div",29),e.YNc(55,ke,4,0,"div",30),e.TgZ(56,"div",31)(57,"tabset")(58,"tab",32),e.YNc(59,Ne,3,3,"div",33),e.qZA(),e.TgZ(60,"tab",34),e.YNc(61,Ue,3,3,"div",33),e.qZA(),e.TgZ(62,"tab",35)(63,"form",7,36),e.NdJ("ngSubmit",function(){e.CHM(a);const c=e.MAs(10);return e.KtG(c.form.valid&&n.onSubmit1())}),e.TgZ(65,"div",37)(66,"div",38)(67,"ion-item",15),e.YNc(68,Ee,2,1,"ion-label",39),e.TgZ(69,"ion-modal",40),e.NdJ("willDismiss",function(c){return n.onWillDismiss(c,"second")}),e.YNc(70,je,17,11,"ng-template"),e.qZA()()(),e.TgZ(71,"div",41)(72,"button",42),e.NdJ("click",function(){return n.onSubmit1()}),e._uU(73," Get "),e._UZ(74,"ion-icon",43),e.qZA()()()(),e.YNc(75,Re,3,3,"div",33),e.qZA()()()()()}if(2&t){const a=e.MAs(10),l=e.MAs(17),c=e.MAs(31),u=e.MAs(40);e.Q6J("ngIf",!n.ios),e.xp6(1),e.Q6J("fullscreen",!0),e.xp6(1),e.Q6J("ngIf",n.ios),e.xp6(4),e.hij(" ",e.lcZ(7,41,"send_homework_to_classes")," "),e.xp6(7),e.Oqu(e.lcZ(14,43,"class")),e.xp6(2),e.Q6J("ngModel",n.select_datas.class)("items",n.classs)("canSearch",!0)("hasVirtualScroll",!0)("isMultiple",!0),e.xp6(6),e.Q6J("ngIf",a.submitted&&l.invalid),e.xp6(2),e.Q6J("ngIf",n.select_datas.s_date),e.xp6(1),e.Q6J("initialBreakpoint",.5)("breakpoints",e.DdM(51,C)),e.xp6(4),e.Oqu(e.lcZ(29,45,"subject")),e.xp6(2),e.Q6J("ngModel",n.select_datas.subject)("items",n.subjects)("canSearch",!0),e.xp6(3),e.Q6J("ngIf",a.submitted&&c.invalid),e.xp6(3),e.Oqu(e.lcZ(37,47,"message")),e.xp6(3),e.Q6J("ngModel",n.select_datas.message)("required",0===n.select_datas.filename.length),e.xp6(2),e.Q6J("ngIf",a.submitted&&u.invalid),e.xp6(3),e.Q6J("ngIf",0===n.select_datas.filename.length),e.xp6(1),e.Q6J("ngIf",0===n.select_datas.filename.length),e.xp6(1),e.Q6J("ngIf",n.select_datas.filename.length>0&&"mp3"!==n.select_datas.type),e.xp6(1),e.Q6J("ngIf",n.select_datas.filename.length>0&&"mp3"===n.select_datas.type),e.xp6(1),e.Q6J("ngIf",n.select_datas.filename.length>0),e.xp6(1),e.Q6J("ngIf",n.error),e.xp6(3),e.hij(" ",e.lcZ(53,49,"save")," "),e.xp6(2),e.Q6J("ngIf",n.recentdates.length>0),e.xp6(1),e.Q6J("ngIf",n.recentdata.length>0),e.xp6(4),e.Q6J("ngIf",n.getwhdates.length>0),e.xp6(2),e.Q6J("ngIf",n.last3daysdates.length>0),e.xp6(7),e.Q6J("ngIf",n.select_datas1.s_date),e.xp6(1),e.Q6J("isOpen",n.isPickerOpen)("initialBreakpoint",.5)("breakpoints",e.DdM(52,C)),e.xp6(5),e.Q6J("ios","arrow-forward-sharp")("md","arrow-forward-sharp"),e.xp6(1),e.Q6J("ngIf",n.senditems1dates.length>0)}},dependencies:[m.sg,m.O5,_.YG,_.Sm,_.wI,_.W2,_.x4,_.Gu,_.gu,_.Ie,_.Q$,_.fG,_.Nd,_.g2,_.wd,_.sr,_.ki,_.QI,_.j9,x.Rl,d._Y,d.JJ,d.JL,d.Q7,d.On,d.F,g.wW,g.AH,w,D,P.X$],styles:[".homework[_ngcontent-%COMP%]   .card_body[_ngcontent-%COMP%]{padding-top:0!important;margin-left:5px!important;margin-right:5px!important}.homework[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]{padding:12px 12px 12px 20px!important}"]}),s})()}];let ze=(()=>{var i;class s{}return(i=s).\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[h.Bz.forChild(Ve),h.Bz]}),s})(),Xe=(()=>{var i;class s{}return(i=s).\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[m.ez,ze,_.Pc,O.b,x.Rl,d.u5,g.P4.forRoot(),S.forRoot()]}),s})()}}]);