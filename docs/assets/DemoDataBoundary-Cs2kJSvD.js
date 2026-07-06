import{c as a,j as e,G as o}from"./index-DFdZgv_q.js";/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],i=a("circle-alert",n);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],u=a("rotate-ccw",c);function x({state:r,repoUrl:s,minHeight:t="min-h-64",children:l}){return r.status==="loading"?e.jsx("div",{className:`w-full ${t} rounded-lg border border-slate-800 bg-slate-800/20 motion-safe:animate-pulse`,role:"status","aria-busy":"true","aria-label":"Loading demo data"}):r.status==="error"?e.jsxs("div",{className:`w-full ${t} rounded-lg border border-red-500/30 bg-red-500/5 flex flex-col items-center justify-center gap-3 p-6 text-center`,role:"alert",children:[e.jsx(i,{className:"text-red-400",size:24,"aria-hidden":"true"}),e.jsx("p",{className:"text-sm text-slate-300",children:"Couldn't load this demo's data."}),e.jsx("p",{className:"text-xs text-slate-500 font-mono",children:r.message}),e.jsxs("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded",children:[e.jsx(o,{size:14,"aria-hidden":"true"}),"View the repo"]})]}):e.jsx(e.Fragment,{children:l(r.data)})}export{x as D,u as R};
