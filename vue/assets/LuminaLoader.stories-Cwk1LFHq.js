import{a as e}from"./index-B-lxVbXh.js";import{L as y}from"./LuminaLoader-DlTF6Eup.js";import"./v4-CtRu48qb.js";import"./index-zspRAiHE.js";import"./api-Cro2uN6Z.js";const b={title:"Adapters/React/LuminaLoader",component:y,args:{theme:"auto"},argTypes:{onShow:{table:{disable:!0}},onHide:{table:{disable:!0}},theme:{control:{type:"radio",options:["auto","light","dark"]},description:"Theme to apply (auto adapts to prefers-color-scheme)"}}},o={args:{type:"spinner",show:!0,size:48,speed:1,onShow:e("onShow"),onHide:e("onHide")},argTypes:{size:{control:{type:"range",min:16,max:200}},speed:{control:{type:"number",min:.2,max:5,step:.1}},color:{control:"color"}}},r={args:{type:"image",image:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="100%" height="100%" fill="%23f3f4f6"/><circle cx="40" cy="40" r="24" fill="%234fa94d"/></svg>',imageAnimation:"rotate",size:80,show:!0,onShow:e("onShow"),onHide:e("onHide")}},n={args:{type:"progress",progressVariant:"linear",progress:45,size:200,show:!0,onShow:e("onShow"),onHide:e("onHide")}},a={args:{type:"spinner",overlay:!0,backdrop:{opacity:.5},show:!0,onShow:e("onShow"),onHide:e("onHide")}};var t,s,i;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(i=(s=o.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var p,c,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    type: 'image',
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="100%" height="100%" fill="%23f3f4f6"/><circle cx="40" cy="40" r="24" fill="%234fa94d"/></svg>',
    imageAnimation: 'rotate',
    size: 80,
    show: true,
    onShow: action('onShow'),
    onHide: action('onHide')
  }
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var d,g,h;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    type: 'progress',
    progressVariant: 'linear',
    progress: 45,
    size: 200,
    show: true,
    onShow: action('onShow'),
    onHide: action('onHide')
  }
}`,...(h=(g=n.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var l,w,u;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(u=(w=a.parameters)==null?void 0:w.docs)==null?void 0:u.source}}};const z=["Spinner","ImageRotate","ProgressLinear","Overlay"];export{r as ImageRotate,a as Overlay,n as ProgressLinear,o as Spinner,z as __namedExportsOrder,b as default};
