(this["webpackJsonpactuator-xms"]=this["webpackJsonpactuator-xms"]||[]).push([[7],{456:function(e,t,a){"use strict";a.r(t),a.d(t,"Dashboard",(function(){return j}));var n=a(38),c=a(0),r=a.n(c),l=a(28),m=a(438),o=a(235),s=a(439),u=a(51),i=a(450),d=a(440),E=a(452),f=a(443),p=a(459),b=function(e){var t=e.data,a=e.deleteExam;return r.a.createElement(i.a,{className:"component-exam-card",actions:[r.a.createElement(f.a,null),r.a.createElement(d.a,{title:"Delete Exam?",placement:"bottom",onConfirm:function(){return a()}},r.a.createElement(p.a,null))]},r.a.createElement(E.a.Title,{level:3},"  ",t.title||"Untitled"))},h=a(444),x=a(68);function j(e){var t=e.firebase,a=Object(c.useState)([]),l=Object(n.a)(a,2),i=l[0],d=l[1],E=Object(c.useState)(!0),f=Object(n.a)(E,2),p=f[0],j=f[1];return Object(c.useEffect)((function(){t.fetchExamList().then((function(e){d(e.docs.map((function(e){return e.data()}))),j(!1),console.log("ddd")}))}),[t]),r.a.createElement("div",null,r.a.createElement(m.a,{justify:"center",gutter:[24,24]},p&&r.a.createElement(o.a,{tip:"Fetching Your Exams"}),i.map((function(e,t){return r.a.createElement(s.a,{xs:24,sm:12,md:4,key:t,span:4},r.a.createElement(b,{data:e}))}))),r.a.createElement(x.b,{to:"app/exam/new"},r.a.createElement(u.a,{className:"btn-add-float  component-shadow",type:"primary",size:"large",shape:"circle"},r.a.createElement(h.a,null))))}var v=Object(l.c)(j);t.default=v}}]);
//# sourceMappingURL=7.4c840528.chunk.js.map