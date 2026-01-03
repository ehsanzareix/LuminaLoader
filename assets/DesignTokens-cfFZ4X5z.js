import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as o}from"./index-Be5qzblT.js";import"./index-BO0P4Y5I.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"title-design-tokens",children:"title: 'Design Tokens'"}),`
`,e.jsx(n.h1,{id:"design-tokens",children:"Design tokens"}),`
`,e.jsx(n.p,{children:"Lumina exposes a small set of CSS custom properties for easy theming and sizing."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--lumina-size"})," — base size (px)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--lumina-color"})," — accent color used by most loaders"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--lumina-spin-speed"})," — spin/animation duration (s)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--lumina-ease"})," — easing curve used for animations"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:["Set tokens on ",e.jsx(n.code,{children:":root"})," or a container element to scope them."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`:root {
  --lumina-color: #4fa94d;
  --lumina-size: 48px;
  --lumina-spin-speed: 1s;
}
`})}),`
`,e.jsx(n.h3,{id:"live-demo-interactive",children:"Live demo (interactive)"}),`
`,e.jsxs(n.p,{children:["Try the live demo by opening ",e.jsx(n.strong,{children:"Documentation → Design Tokens → Live Demo"})," (or run the ",e.jsx(n.code,{children:"Live"})," story under this section). This avoids MDX inline story rendering issues in some Storybook setups."]})]})}function d(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{d as default};
