import{c as S}from"./api-CiaSeJJR.js";import{d as b,o as z,a as V,w as x,t as A,c as k}from"./runtime-core.esm-bundler-DSll34qI.js";const B=b({__name:"LuminaLoader",props:{show:{type:Boolean},container:{},type:{},size:{},color:{},speed:{},overlay:{type:[Boolean,String]},overlayZIndex:{},backdrop:{},ariaLabel:{},image:{},imageAnimation:{},theme:{},progress:{},progressVariant:{}},setup(v){const r=v;let e=null;function t(){e||(e=S({...r,target:r.container??document.body}),(r.show??!0)&&e.show())}function _(){e==null||e.destroy(),e=null}return z(()=>{t()}),V(()=>{_()}),x(A(r,"show"),i=>{e||t(),i?e==null||e.show():e==null||e.hide()}),(i,I)=>k("",!0)}}),C={title:"Adapters/Vue/LuminaLoader",component:B},o={args:{type:"spinner",show:!0}},s={args:{type:"image",image:"/logo.svg",imageAnimation:"rotate",size:80,show:!0}},a={args:{type:"progress",progressVariant:"linear",progress:45,size:200,show:!0}},n={args:{type:"spinner",overlay:!0,backdrop:{opacity:.5},show:!0}};var p,c,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    type: 'spinner',
    show: true
  }
}`,...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,g,d;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    type: 'image',
    image: '/logo.svg',
    imageAnimation: 'rotate',
    size: 80,
    show: true
  }
}`,...(d=(g=s.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var y,l,h;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    type: 'progress',
    progressVariant: 'linear',
    progress: 45,
    size: 200,
    show: true
  }
}`,...(h=(l=a.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var w,f,L;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    type: 'spinner',
    overlay: true,
    backdrop: {
      opacity: 0.5
    },
    show: true
  }
}`,...(L=(f=n.parameters)==null?void 0:f.docs)==null?void 0:L.source}}};const P=["Spinner","ImageRotate","ProgressLinear","Overlay"];export{s as ImageRotate,n as Overlay,a as ProgressLinear,o as Spinner,P as __namedExportsOrder,C as default};
