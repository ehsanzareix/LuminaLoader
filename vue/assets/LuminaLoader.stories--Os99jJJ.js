import{a as r}from"./index-B-lxVbXh.js";import{c as A}from"./api-1RnDu7Lw.js";import{s as B,t as I,u as T,v as C,x as O,w as u,y as E,z as P,A as R}from"./runtime-core.esm-bundler-AHdXwogA.js";import"./v4-CtRu48qb.js";const M=B({__name:"LuminaLoader",props:{show:{type:Boolean,default:!0},container:{},type:{},size:{},color:{},speed:{},overlay:{type:[Boolean,String]},overlayZIndex:{},backdrop:{},ariaLabel:{},image:{},imageAnimation:{},theme:{},progress:{},progressVariant:{},text:{}},emits:["show","hide"],setup(n,{emit:l}){const e=n,t=l;let o=null;const a=I(null);T(()=>!e.overlay);function m(){if(o)return;const s=!!(a.value&&a.value.isConnected),h=e.container??(s?a.value:document.body),V=e.overlay&&!e.container?document.body:h;o=A({...e,target:V}),e.show&&(o.show(),t("show"))}function g(){o&&(o.destroy(),o=null)}return C(()=>{m()}),O(()=>{g()}),u(()=>e.show,s=>{if(!o){m();return}s?(o.show(),t("show")):(o.hide(),t("hide"))}),u(()=>({type:e.type,size:e.size,color:e.color,speed:e.speed,overlay:e.overlay,theme:e.theme,progress:e.progress,progressVariant:e.progressVariant}),()=>{g(),m()},{deep:!0}),(s,h)=>n.overlay?P("",!0):(R(),E("div",{key:0,ref_key:"host",ref:a,class:"lumina-loader-host"},null,512))}}),N=(n,l)=>{const e=n.__vccOpts||n;for(const[t,o]of l)e[t]=o;return e},U=N(M,[["__scopeId","data-v-0533c68d"]]),F={title:"Adapters/Vue/LuminaLoader",component:U,args:{theme:"auto"},argTypes:{onShow:{table:{disable:!0}},onHide:{table:{disable:!0}},theme:{control:{type:"radio",options:["auto","light","dark"]},description:"Theme to apply (auto adapts to prefers-color-scheme)"}}},i={args:{type:"spinner",show:!0,size:48,speed:1,onShow:r("onShow"),onHide:r("onHide")},argTypes:{size:{control:{type:"range",min:16,max:200}},speed:{control:{type:"number",min:.2,max:5,step:.1}},color:{control:"color"}}},c={args:{type:"image",image:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="100%" height="100%" fill="%23f3f4f6"/><circle cx="40" cy="40" r="24" fill="%234fa94d"/></svg>',imageAnimation:"rotate",size:80,show:!0,onShow:r("onShow"),onHide:r("onHide")}},p={args:{type:"progress",progressVariant:"linear",progress:45,size:200,show:!0,onShow:r("onShow"),onHide:r("onHide")}},d={args:{type:"spinner",overlay:!0,backdrop:{opacity:.5},show:!0,onShow:r("onShow"),onHide:r("onHide")}};var w,y,f;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    type: 'spinner',
    show: true,
    size: 48,
    speed: 1,
    onShow: action('onShow'),
    onHide: action('onHide')
  },
  argTypes: {
    size: {
      control: {
        type: 'range',
        min: 16,
        max: 200
      }
    },
    speed: {
      control: {
        type: 'number',
        min: 0.2,
        max: 5,
        step: 0.1
      }
    },
    color: {
      control: 'color'
    }
  }
}`,...(f=(y=i.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var v,S,x;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    type: 'image',
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="100%" height="100%" fill="%23f3f4f6"/><circle cx="40" cy="40" r="24" fill="%234fa94d"/></svg>',
    imageAnimation: 'rotate',
    size: 80,
    show: true,
    onShow: action('onShow'),
    onHide: action('onHide')
  }
}`,...(x=(S=c.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var H,_,b;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    type: 'progress',
    progressVariant: 'linear',
    progress: 45,
    size: 200,
    show: true,
    onShow: action('onShow'),
    onHide: action('onHide')
  }
}`,...(b=(_=p.parameters)==null?void 0:_.docs)==null?void 0:b.source}}};var z,L,k;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    type: 'spinner',
    overlay: true,
    backdrop: {
      opacity: 0.5
    },
    show: true,
    onShow: action('onShow'),
    onHide: action('onHide')
  }
}`,...(k=(L=d.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};const G=["Spinner","ImageRotate","ProgressLinear","Overlay"];export{c as ImageRotate,d as Overlay,p as ProgressLinear,i as Spinner,G as __namedExportsOrder,F as default};
