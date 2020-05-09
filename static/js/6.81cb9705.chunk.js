(this["webpackJsonpactuator-xms"]=this["webpackJsonpactuator-xms"]||[]).push([[6],{454:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return G}));var n=a(436),i=a(441),s=a(110),l=a(308),u=a(442),c=a(434),r=a(0),o=a.n(r),m=a(38),d=a(438),E=a(439),x=a(457),f=a(458),C=a(455),p=a(452),h=a(446),b=a(447),Q=a(432),v=a(448),T=a(449),y=a(51),S=a(440),O=a(443),g=a(460),D=a(444),j=a(21),k=a(451),I=a(255),P=function(e){var t=e.setExamQuestion,a=e.question,n=e.setQuestion,i=e.active,s=e.setActive,l=e.update,u=e.setUpdate,c=e.updateExamQuestion;return o.a.createElement(k.a,{visible:i,onCancel:function(){n(null),s(!1)},onOk:function(){l?(c(l,a),u(null)):t({id:Object(I.a)(4),title:a}),n(null),s(!1)},title:l?"Update Question":"Create New Question"},o.a.createElement(C.a.TextArea,{value:a,onChange:function(e){return n(e.target.value)},maxLength:300,placeholder:"Question Content. Max Length 300"}))},A=function(e){var t=e.setExamCandidates,a=e.active,n=e.setActive,i=e.candidate,s=e.setCandidate;return o.a.createElement(k.a,{visible:a,onCancel:function(){return n(!1)},onOk:function(){t({email:i,otp:Object(I.a)(5)}),s(null),n(!1)},title:"Add New Candidate"},o.a.createElement(C.a,{type:"email",value:i,onChange:function(e){return s(e.target.value)}}))};function M(e){var t=e.examTitle,a=e.examDate,n=e.examStartTime,i=e.examDuration,s=e.examQuestions,l=e.examCandidates,u=e.examPolicy,c=e.setExamTitle,k=e.setExamDate,I=e.setExamStartTime,M=e.setExamDuration,N=e.setExamQuestions,G=e.setExamCandidates,w=e.setExamPolicy,U=e.deleteExamQuestion,q=e.deleteExamCandidate,B=e.updateExamQuestion,z=(e.updateExamCandidate,Object(j.f)()),J=Object(r.useState)(!1),L=Object(m.a)(J,2),F=L[0],H=L[1],K=Object(r.useState)(null),R=Object(m.a)(K,2),V=R[0],W=R[1],X=Object(r.useState)(null),Y=Object(m.a)(X,2),Z=Y[0],$=Y[1],_=Object(r.useState)(!1),ee=Object(m.a)(_,2),te=ee[0],ae=ee[1],ne=Object(r.useState)(null),ie=Object(m.a)(ne,2),se=ie[0],le=ie[1];return o.a.createElement(d.a,{gutter:[24,24]},o.a.createElement(E.a,{md:5},o.a.createElement(x.a,{onBack:function(){return z.push("/app")},title:"New Exam"}),o.a.createElement("div",{className:""},o.a.createElement(f.a,{status:t?"success":"default",text:"Basic Information"}),o.a.createElement("br",null),o.a.createElement(f.a,{status:a&&n&&i?"success":"default",text:"Schedule"}),o.a.createElement("br",null),o.a.createElement(f.a,{status:s.length?"success":"default",text:"Questions"}),o.a.createElement("br",null),o.a.createElement(f.a,{status:l.length?"success":"default",text:"Candidates"}),o.a.createElement("br",null),o.a.createElement(f.a,{status:"default",text:"Publish"}))),o.a.createElement(E.a,{className:"component-content",md:16},o.a.createElement(C.a.Group,{compact:!0},o.a.createElement(p.a.Title,{level:3},"Basic Information "),o.a.createElement(C.a,{value:t,placeholder:"Examination Title",onChange:function(e){return c(e.target.value)}}),o.a.createElement(h.a,{style:{backgroundColor:"darkGray"}})),o.a.createElement(C.a.Group,null,o.a.createElement(p.a.Title,{level:3},"Schedule"),o.a.createElement(b.a,{onChange:function(e){return w("TIME",e)},className:"btn-section-toggle",defaultChecked:u.TIME}),o.a.createElement(Q.a,{disabled:!u.TIME,onChange:function(e){return k(e)},value:a}),o.a.createElement(v.a,{disabled:!u.TIME,onChange:function(e){return I(e)},value:n}),o.a.createElement(v.a,{disabled:!u.TIME,onChange:function(e){return M(e)},value:i,placeholder:"Select Duration"}),o.a.createElement(h.a,{style:{backgroundColor:"darkGray"}})),o.a.createElement(C.a.Group,null,o.a.createElement(p.a.Title,{level:3},"Questions"),o.a.createElement(T.a,{dataSource:s},o.a.createElement(T.a.Column,{width:"80%",title:"Question",dataIndex:"title"}),o.a.createElement(T.a.Column,{title:"Options",dataIndex:"id",key:"title",render:function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement(y.a,{onClick:function(){W(s.filter((function(t){return t.id===e}))[0].title),$(e),H(!0)},type:"dashed"},o.a.createElement(O.a,null)),o.a.createElement(S.a,{title:"Delete Question?",placement:"bottom",onConfirm:function(){return U(e)}},o.a.createElement(y.a,{type:"dashed"},o.a.createElement(g.a,null))))}})),o.a.createElement(y.a,{className:"btn-add-float-question",type:"primary",size:"large",onClick:function(){return H(!0)}},"Add Questions",o.a.createElement(D.a,null)),o.a.createElement(h.a,{style:{backgroundColor:"darkGray"}})),o.a.createElement(C.a.Group,null,o.a.createElement(p.a.Title,{level:3},"Candidates"),o.a.createElement(T.a,{dataSource:l},o.a.createElement(T.a.Column,{title:"Email",dataIndex:"email"}),o.a.createElement(T.a.Column,{title:"OTP",dataIndex:"otp"}),o.a.createElement(T.a.Column,{title:"Options",dataIndex:"otp",key:"otp",render:function(e){return o.a.createElement(S.a,{title:"Delete Candidate?",placement:"bottom",onConfirm:function(){return q(e)}},o.a.createElement(y.a,{type:"dashed"},o.a.createElement(g.a,null)))}})),o.a.createElement(y.a,{onClick:function(){return ae(!0)},className:"btn-add-float-question",type:"primary",size:"large"},"Add Candidates",o.a.createElement(D.a,null)))),o.a.createElement(P,{active:F,setActive:H,question:V,setQuestion:W,setExamQuestion:N,update:Z,setUpdate:$,updateExamQuestion:B}),o.a.createElement(A,{candidate:se,setCandidate:le,setExamCandidates:G,active:te,setActive:ae}))}var N=a(453),G=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(e){var l,u=e.id,c=e.title;Object(i.a)(e,["id","title"]);return Object(s.a)(this,a),(l=t.call(this)).setExamTitle=function(e){l.setState({examTitle:e})},l.setExamDate=function(e){l.setState((function(){return{examDate:e}}))},l.setExamStartTime=function(e){l.setState((function(){return{examStartTime:e}}))},l.setExamDuration=function(e){l.setState((function(){return{examDuration:e}}))},l.setExamQuestions=function(e){l.setState((function(t){return{examQuestions:t.examQuestions.concat(e)}}),(function(){N.a.success("Question Added")}))},l.setExamCandidates=function(e){l.setState((function(t){return{examCandidates:[].concat(Object(n.a)(t.examCandidates),[e])}}),(function(){N.a.success("Candidate Added")}))},l.setExamPolicy=function(e,t){var a=Object.assign({},l.state.examPolicy);a[e]=t,l.setState((function(e){return{examPolicy:a}}),(function(){console.log(l.state.examPolicy),N.a.success("Exam Policy Updated")}))},l.deleteExamQuestion=function(e){l.setState((function(t){return{examQuestions:t.examQuestions.filter((function(t){return t.id!==e}))}}),(function(){N.a.success("Question Deleted")}))},l.deleteExamCandidate=function(e){l.setState((function(t){return{examCandidates:t.examCandidates.filter((function(t){return t.otp!==e}))}}),(function(){N.a.success("Candidate Deleted")}))},l.updateExamQuestion=function(e,t){l.setState((function(a){return{examQuestions:a.examQuestions.filter((function(t){return t.id!==e})).concat({id:e,title:t})}}),(function(){N.a.success("Question Updated")}))},l.state={examId:u||Object(I.a)(10),examTitle:c,examDate:null,examStartTime:null,examDuration:null,examQuestions:[],examCandidates:[],examPolicy:{TIME:!0}},l}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.a.createElement(M,{examTitle:this.state.examTitle,examDate:this.state.examDate,examStartTime:this.state.examStartTime,examDuration:this.state.examDuration,examQuestions:this.state.examQuestions,examCandidates:this.state.examCandidates,examPolicy:this.state.examPolicy,setExamTitle:this.setExamTitle,setExamDate:this.setExamDate,setExamStartTime:this.setExamStartTime,setExamDuration:this.setExamDuration,setExamQuestions:this.setExamQuestions,setExamCandidates:this.setExamCandidates,setExamPolicy:this.setExamPolicy,deleteExamQuestion:this.deleteExamQuestion,deleteExamCandidate:this.deleteExamCandidate,updateExamQuestion:this.updateExamQuestion})}}]),a}(o.a.Component)}}]);
//# sourceMappingURL=6.81cb9705.chunk.js.map