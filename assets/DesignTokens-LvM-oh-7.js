import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as t}from"./index-Be5qzblT.js";import"./index-BO0P4Y5I.js";function i(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.hr,{}),`
`,s.jsx(e.h2,{id:"title-design-tokens",children:"title: 'Design Tokens'"}),`
`,s.jsx(e.h1,{id:"design-tokens",children:"Design tokens"}),`
`,s.jsx(e.p,{children:"Lumina exposes a small set of CSS custom properties for easy theming and sizing."}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"--lumina-size"})," — base size (px)"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"--lumina-color"})," — accent color used by most loaders"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"--lumina-spin-speed"})," — spin/animation duration (s)"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"--lumina-ease"})," — easing curve used for animations"]}),`
`]}),`
`,s.jsx(e.h2,{id:"usage",children:"Usage"}),`
`,s.jsxs(e.p,{children:["Set tokens on ",s.jsx(e.code,{children:":root"})," or a container element to scope them."]}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-css",children:`:root {
  --lumina-color: #4fa94d;
  --lumina-size: 48px;
  --lumina-spin-speed: 1s;
}
`})}),`
`,s.jsx(e.h2,{id:"visual-previews",children:"Visual previews"}),`
`,s.jsx(e.p,{children:"Below are small preview illustrations for each loader type — use them to quickly recognize styles in the docs and storybook."}),`
`,s.jsxs("div",{style:"display:flex;gap:16px;flex-wrap:wrap",children:[s.jsx("img",{src:"/docs/assets/spinner-anim.svg",alt:"spinner",width:"100"}),s.jsx("img",{src:"/docs/assets/dots-anim.svg",alt:"dots",width:"100"}),s.jsx("img",{src:"/docs/assets/bars-anim.svg",alt:"bars",width:"100"}),s.jsx("img",{src:"/docs/assets/pulse-anim.svg",alt:"pulse",width:"100"}),s.jsx("img",{src:"/docs/assets/gradient-ring-anim.svg",alt:"gradient ring",width:"100"}),s.jsx("img",{src:"/docs/assets/orbit-anim.svg",alt:"orbit",width:"100"}),s.jsx("img",{src:"/docs/assets/wave-anim.svg",alt:"wave",width:"100"}),s.jsx("img",{src:"/docs/assets/image.svg",alt:"image",width:"100"}),s.jsx("img",{src:"/docs/assets/progress-anim.svg",alt:"progress",width:"100"})]}),`
`,s.jsx(e.h3,{id:"live-demo-interactive",children:"Live demo (interactive)"}),`
`,s.jsxs(e.p,{children:["Try the live demo by opening ",s.jsx(e.strong,{children:"Documentation → Design Tokens → Live Demo"})," (or run the ",s.jsx(e.code,{children:"Live"})," story under this section). This avoids MDX inline story rendering issues in some Storybook setups."]})]})}function d(n={}){const{wrapper:e}={...t(),...n.components};return e?s.jsx(e,{...n,children:s.jsx(i,{...n})}):i(n)}export{d as default};
