import{S as $,i as ee,s as te,k as l,q,a as P,l as r,m as f,r as w,h as n,c as T,n as s,b as K,G as e,J as g,K as M,H as Z,L as ae}from"../chunks/index.a6332fa3.js";function se(v){let i,E,c,u,a,d,_,C,O,m,S,N,y,U,A,o,D,I,L,V,H,p,F,k,G,J,x;return{c(){i=l("h1"),E=q("Create Room"),c=P(),u=l("section"),a=l("form"),d=l("div"),_=l("label"),C=q("Room Name:"),O=P(),m=l("input"),S=P(),N=l("div"),y=l("label"),U=q("Password:"),A=P(),o=l("input"),D=P(),I=l("div"),L=l("label"),V=q("Nama:"),H=P(),p=l("input"),F=P(),k=l("button"),G=q("Create"),this.h()},l(t){i=r(t,"H1",{class:!0});var h=f(i);E=w(h,"Create Room"),h.forEach(n),c=T(t),u=r(t,"SECTION",{});var z=f(u);a=r(z,"FORM",{method:!0});var b=f(a);d=r(b,"DIV",{});var R=f(d);_=r(R,"LABEL",{for:!0,class:!0});var Q=f(_);C=w(Q,"Room Name:"),Q.forEach(n),O=T(R),m=r(R,"INPUT",{name:!0,type:!0}),R.forEach(n),S=T(b),N=r(b,"DIV",{});var j=f(N);y=r(j,"LABEL",{for:!0,class:!0});var W=f(y);U=w(W,"Password:"),W.forEach(n),A=T(j),o=r(j,"INPUT",{name:!0,type:!0,minlength:!0}),j.forEach(n),D=T(b),I=r(b,"DIV",{});var B=f(I);L=r(B,"LABEL",{for:!0,class:!0});var X=f(L);V=w(X,"Nama:"),X.forEach(n),H=T(B),p=r(B,"INPUT",{name:!0,type:!0}),B.forEach(n),F=T(b),k=r(b,"BUTTON",{});var Y=f(k);G=w(Y,"Create"),Y.forEach(n),b.forEach(n),z.forEach(n),this.h()},h(){s(i,"class","svelte-1grxjhk"),s(_,"for","room-name"),s(_,"class","svelte-1grxjhk"),s(m,"name","room-name"),s(m,"type","text"),m.required=!0,s(y,"for","room-password"),s(y,"class","svelte-1grxjhk"),s(o,"name","room-password"),s(o,"type","password"),s(o,"minlength","6"),o.required=!0,s(L,"for","sahib-name"),s(L,"class","svelte-1grxjhk"),s(p,"name","sahib-name"),s(p,"type","text"),p.required=!0,s(a,"method","POST")},m(t,h){K(t,i,h),e(i,E),K(t,c,h),K(t,u,h),e(u,a),e(a,d),e(d,_),e(_,C),e(d,O),e(d,m),g(m,v[1]),e(a,S),e(a,N),e(N,y),e(y,U),e(N,A),e(N,o),g(o,v[0]),e(a,D),e(a,I),e(I,L),e(L,V),e(I,H),e(I,p),g(p,v[2]),e(a,F),e(a,k),e(k,G),J||(x=[M(m,"input",v[3]),M(o,"input",v[4]),M(p,"input",v[5])],J=!0)},p(t,[h]){h&2&&m.value!==t[1]&&g(m,t[1]),h&1&&o.value!==t[0]&&g(o,t[0]),h&4&&p.value!==t[2]&&g(p,t[2])},i:Z,o:Z,d(t){t&&n(i),t&&n(c),t&&n(u),J=!1,ae(x)}}}function le(v,i,E){let c="",u="",a="";function d(){u=this.value,E(1,u)}function _(){c=this.value,E(0,c)}function C(){a=this.value,E(2,a)}return[c,u,a,d,_,C]}class ne extends ${constructor(i){super(),ee(this,i,le,se,te,{})}}export{ne as component};