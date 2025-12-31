import{r as S}from"./index-CtNveh2g.js";import{c as v}from"./api-CiaSeJJR.js";const z=({show:o=!0,container:t,...n})=>(S.useEffect(()=>{const p=v({...n,target:t??document.body});return o&&p.show(),()=>p.destroy()},[o,t,JSON.stringify(n)]),null),b={title:"Adapters/React/LuminaLoader",component:z},r={args:{type:"spinner",show:!0}},e={args:{type:"image",image:"/logo.svg",imageAnimation:"rotate",size:80,show:!0}},s={args:{type:"progress",progressVariant:"linear",progress:45,size:200,show:!0}},a={args:{type:"spinner",overlay:!0,backdrop:{opacity:.5},show:!0}};var c,i,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    type: 'spinner',
    show: true
  }
}`,...(m=(i=r.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var g,u,d;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    type: 'image',
    image: '/logo.svg',
    imageAnimation: 'rotate',
    size: 80,
    show: true
  }
}`,...(d=(u=e.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var l,y,h;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    type: 'progress',
    progressVariant: 'linear',
    progress: 45,
    size: 200,
    show: true
  }
}`,...(h=(y=s.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var w,f,L;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    type: 'spinner',
    overlay: true,
    backdrop: {
      opacity: 0.5
    },
    show: true
  }
}`,...(L=(f=a.parameters)==null?void 0:f.docs)==null?void 0:L.source}}};const x=["Spinner","ImageRotate","ProgressLinear","Overlay"];export{e as ImageRotate,a as Overlay,s as ProgressLinear,r as Spinner,x as __namedExportsOrder,b as default};
