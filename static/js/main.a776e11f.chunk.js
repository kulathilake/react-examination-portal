(this["webpackJsonpactuator-xms"]=this["webpackJsonpactuator-xms"]||[]).push([[1],{142:function(e,t,a){e.exports=a(233)},232:function(e,t,a){},233:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(4),c=a.n(l),o=a(68),u=a(21),i=a(28),m=a(237),s=a(38),h=a(238),p=a(235),E=a(236);var f=Object(i.c)((function(e){var t=e.firebase,a=e.component,l=Object(n.useState)(!0),c=Object(s.a)(l,2),o=c[0],i=c[1],m=Object(n.useState)(null),f=Object(s.a)(m,2),d=f[0],g=f[1],b=Object(u.g)();return t.auth.onAuthStateChanged((function(e){e?(i(!1),g(e)):(i(!1),g(null))})),o?r.a.createElement(h.a,{icon:r.a.createElement(p.a,{size:"large"})}):d?r.a.createElement(n.Fragment,null,r.a.createElement(E.a,null,b.pathname.split("/").map((function(e,t){return r.a.createElement(E.a.Item,{key:t},String(e).charAt(0).toUpperCase()+String(e).substr(1))}))),r.a.createElement(a,{user:d,firebase:t})):r.a.createElement(h.a,{status:"info",title:"You Are Logged Out"})})),d=a(87),g=a(234),b=a(51),w=a(239);var v=Object(i.c)((function(e){var t=e.firebase,a=Object(n.useState)(!0),l=Object(s.a)(a,2),c=l[0],o=l[1],u=Object(n.useState)(null),i=Object(s.a)(u,2),m=i[0],h=i[1];t.auth.onAuthStateChanged((function(e){o(!1),h(e||null)}));var E=r.a.createElement(d.a,null,r.a.createElement(d.a.Item,null,"Profile"),r.a.createElement(d.a.Item,{onClick:function(){return o(!0),void t.signOut().then((function(){window.location.replace("/")}))}},"Logout"));return r.a.createElement(d.a,{mode:"horizontal"},r.a.createElement(d.a.Item,{onClick:function(){window.location.replace("/")}},r.a.createElement("strong",null,"Actuator XMS")),r.a.createElement(d.a.Item,null,"Help & Support"),r.a.createElement(d.a.Item,{style:{float:"right"}},c?r.a.createElement(p.a,null):m?r.a.createElement(g.a,{overlay:E},r.a.createElement("li",null,m.displayName)):r.a.createElement(b.a,{onClick:function(){return o(!0),void t.signInWithRedirect()}},r.a.createElement(w.a,null),"Sign In With Google")))})),O=a(240),x=function(){return r.a.createElement(h.a,{icon:r.a.createElement(p.a,null)})},S=m.a.Content,j=m.a.Header,y=m.a.Footer,I=r.a.lazy((function(){return Promise.all([a.e(0),a.e(8)]).then(a.bind(null,445))})),k=r.a.lazy((function(){return Promise.all([a.e(0),a.e(5),a.e(7)]).then(a.bind(null,456))})),A=r.a.lazy((function(){return Promise.all([a.e(0),a.e(4),a.e(6)]).then(a.bind(null,454))}));var C=function(){return r.a.createElement(i.a.Provider,{value:new i.b},r.a.createElement("div",{className:"App"},r.a.createElement(m.a,{className:"layout"},r.a.createElement(j,{style:{padding:"0px"}},r.a.createElement(v,null)),r.a.createElement(S,null,r.a.createElement("div",{className:"site-layout-content"},r.a.createElement(n.Suspense,{fallback:r.a.createElement(x,null)},r.a.createElement(o.a,null,r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/",exact:!0,component:I}),r.a.createElement(u.a,{path:"/exam/view/:id",exact:!0,component:I}),r.a.createElement(u.a,{path:"/app",exact:!0},r.a.createElement(f,{component:k})),r.a.createElement(u.a,{path:"/app/exam/new",exact:!0},r.a.createElement(f,{component:A}))))))),r.a.createElement(y,{className:"site-layout-footer"},"ActutatorXMS \xa9",(new Date).getFullYear()," ",r.a.createElement("br",null),r.a.createElement(O.a,null)," ",r.a.createElement("a",{href:"http://www.github.com/shehankule"},"shehankule")))))};a(231),a(232),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},28:function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),a.d(t,"c",(function(){return c}));var n=a(0),r=a.n(n),l=r.a.createContext(null),c=function(e){return function(t){return r.a.createElement(l.Consumer,null,(function(a){return r.a.createElement(e,Object.assign({},t,{firebase:a}))}))}},o=l,u=a(110),i=a(65),m=a.n(i),s=(a(150),a(152),{apiKey:"AIzaSyB9j5EHgcNBHbVZw88TT4UOlw1vDmvh2t8",authDomain:"actuator-exam-portal.firebaseapp.com",databaseURL:"https://actuator-exam-portal.firebaseio.com",projectId:"actuator-exam-portal",storageBucket:"actuator-exam-portal.appspot.com",messagingSenderId:"117499171112",appId:"1:117499171112:web:13314aa69721da279b401d"}),h=function e(){var t=this;Object(u.a)(this,e),this.getUser=function(){return t.auth.currentUser},this.signInWithRedirect=function(){return t.auth.signInWithRedirect(new m.a.auth.GoogleAuthProvider)},this.signOut=function(){return t.auth.signOut()},this.fetchExamList=function(){return t.app.firestore().collection("exams").where("owner","==",t.getUser().email).get()},this.app=m.a.initializeApp(s),this.auth=m.a.auth()};t.b=h}},[[142,2,3]]]);
//# sourceMappingURL=main.a776e11f.chunk.js.map