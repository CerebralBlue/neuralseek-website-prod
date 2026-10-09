import{An as e,Nn as t,On as n,dn as r,hn as i,ln as a,sn as o,un as s,vn as c,xn as l,yn as u}from"./index-FYgD9L-g.js";import{T as d}from"./shared-ButQmPtj.js";import{FORMS as f,hash as p,sample as ee}from"./trust-forms-CAfQcZn4.js";var m=t(e()),h=Math.PI*2,g=[0,7919,104729,1299709,15485863,32452843,49979687],_=(e,t)=>p(e+(g[t]??0)),v=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],y=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],b=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n],x=(e,t)=>{let n=Math.cos(t),r=Math.sin(t);return[e[0]*n-e[2]*r,e[1],e[0]*r+e[2]*n]},S=(e,t)=>{let n=Math.cos(t),r=Math.sin(t);return[e[0],e[1]*n-e[2]*r,e[1]*r+e[2]*n]},C=(e,t,n)=>[e[0]+(_(t,4)-.5)*n,e[1]+(_(t,5)-.5)*n,e[2]+(_(t,6)-.5)*n];function w(e,t){let n=t.reduce((e,t)=>e+t,0),r=0;for(let i=0;i<t.length;i++){let a=(t[i]??0)/n;if(e<r+a||i===t.length-1)return{i,u:a>0?(e-r)/a:0};r+=a}return{i:0,u:0}}function T(e,t,n,r=0,i=.55){let[a,o,s]=n,c=_(e,1)<.5?-1:1,l=_(e,2)<.5?-1:1,u;if(_(e,0)<i){let{i:t}=w(_(e,3),[a,o,s]),n=_(e,4)*2-1;u=t===0?[n*a,c*o,l*s]:t===1?[c*a,n*o,l*s]:[c*a,l*o,n*s]}else{let{i:t}=w(_(e,3),[o*s,a*s,a*o]),n=_(e,4)*2-1,r=_(e,5)*2-1;u=t===0?[c*a,n*o,r*s]:t===1?[n*a,c*o,r*s]:[n*a,r*o,c*s]}return v(x(u,r),t)}function E(e,t,n,r,i,a,o=0,s=h){let c=o+_(e,1)*(s-o);return C(v(t,v(y(r,Math.cos(c)*n),y(i,Math.sin(c)*n))),e,a)}var D=(e,t,n,r)=>C(b(t,n,_(e,1)),e,r);function O(e,t,n,r){let i=Math.sqrt(_(e,1)),a=_(e,2);return v(v(y(t,1-i),y(n,i*(1-a))),y(r,i*a))}function k(e,t,n){let r=n*Math.cbrt(_(e,1)),i=_(e,2)*2-1,a=Math.sqrt(Math.max(0,1-i*i)),o=_(e,3)*h;return v(t,[r*a*Math.cos(o),r*i,r*a*Math.sin(o)])}function A(e,t,n,r,i,a,o){let s=_(e,1)*h,c=_(e,2)*h;return v(t,v(y(v(y(i,Math.cos(s)),y(a,Math.sin(s))),n+r*Math.cos(c)),y(o,r*Math.sin(c))))}function j(e){let t=(t,n,r)=>{let i=t*r+n,a=e(i,i/(8*r));return[a[0],-a[1],a[2]]},n=[];for(let e=0;e<8;e++)for(let r=0;r<16;r++)n.push(t(e,r*55,880));return{anchors:n,volume:t}}var M=[1,0,0],N=[0,1,0],P=[0,0,1],F=[1.1,.05,0],I=[-.8,.12,0],L=[-.75,-.5,0],R=[-.95,.5,.72],z=[-.95,.5,-.72],B=j((e,t)=>y(V(e,t),1.2));function V(e,t){let{i:n,u:r}=w(t,[.3,.3,.12,.16,.12]);if(n===0)return C(O(e,F,I,R),e,.01);if(n===1)return C(O(e,F,I,z),e,.01);if(n===2)return C(O(e,F,I,L),e,.01);if(n===3){let t=w(_(e,0),[1,1,1,1]).i,[n,r]=t===0?[F,R]:t===1?[F,z]:t===2?[F,L]:[R,z];return D(e,n,r,.018)}let i=Math.floor(r*14)/14+_(e,1)*.03;return C([-1-i*.5,.05-.55*i*i,-.35*Math.sin(i*Math.PI)],e,.03)}var te=6,ne=j((e,t)=>{let{i:n,u:r}=w(t,[.1,.8,.1]);if(n===0)return D(e,[0,-.95,0],[0,.95,0],.03);if(n===2)return k(e,x([.62,.95,0],h/7*5),.13);let i=Math.min(5,Math.floor(r*te)),a=h/7*i;return T(e,x([.58,-.85+i*.32,0],a),[.4,.06,.2],-a,.6)}),H=0,U=j(e=>{let t=S(M,H),n=S(N,H),r=S(P,H);if(_(e,0)<.14){let n=_(e,1)*h,i=Math.floor(n/h*32)%2==0?1.08:1.02;return C(v(y(t,Math.cos(n)*i),y(r,Math.sin(n)*i)),e,.02)}let i=A(e,[0,0,0],.72,.24,t,r,n);return(Math.atan2(i[0]*r[0]+i[1]*r[1]+i[2]*r[2],i[0]*t[0]+i[1]*t[1]+i[2]*t[2])/h*8%2+2)%2<1||_(e,3)<.35?i:A(e+17,[0,0,0],.72,.24,t,r,n)}),re=j((e,t)=>{let{i:n}=w(t,[.31,.31,.31,.07]);if(n===3)return k(e,[0,0,0],.12);let r=h/3*n;return A(e,x([.36,0,0],r),.62,.05,x(M,r),S(N,.35*(n-1)),x(P,r))}),W=j((e,t)=>{let{i:n,u:r}=w(t,[.08,.08,.34,.28,.22]),i=[0,.3,0];if(n===0)return D(e,[0,-1,0],i,.025);if(n===1)return k(e,i,.14);let a=n-2,o=.42+a*.36,s=.3-a*.12,c=_(e,1)*h;return a===2&&Math.floor(c/h*40)%2==1?C([Math.cos(c)*o,s,Math.sin(c)*o],e+3,.2):C([Math.cos(c)*o,s+(r-.5)*.01,Math.sin(c)*o],e,.03)}),G=[{x:0,z:0,h:1.35,w:.18},{x:.46,z:.12,h:.95,w:.15},{x:-.44,z:-.1,h:1.05,w:.16},{x:.12,z:.5,h:.7,w:.14},{x:-.16,z:-.52,h:.8,w:.14},{x:.5,z:-.38,h:.55,w:.13},{x:-.52,z:.4,h:.6,w:.13},{x:.78,z:.02,h:.4,w:.11},{x:-.8,z:.02,h:.45,w:.11}],K=-.75,q=j((e,t)=>{let{i:n}=w(t,[...G.map(e=>e.h*e.w*6),.9]),r=G[n];return r?T(e,[r.x,K+r.h/2,r.z],[r.w,r.h/2,r.w],.2,.6):E(e,[0,K,0],1.05,M,P,.025)}),J=j((e,t)=>{let{i:n,u:r}=w(t,[.28,.28,.2,.16,.08]);if(n===4)return D(e,[0,-.24,-.66],[0,-.24,.66],.02);let i=n===0||n===2&&_(e,0)<.5||n===3&&_(e,0)<.5?1:-1,a=.05+_(e,1)*.95,o=e=>-.2+.32*Math.sqrt(e)-.12*e*e,s=_(e,2)*1.3-.65;if(n<=1){let t=_(e,3)<.45,n=t&&_(e,4)<.5?1:a,r=t&&_(e,4)>=.5?_(e,5)<.5?-.65:.65:s;return C([i*n,o(n),r],e,.012)}if(n===2){let t=-.5+Math.floor(r*9)*.125,n=.18+_(e,3)*.7;return Math.floor(n*22)%4==3?C([i*n,o(n),t],e,.2):C([i*n,o(n)+.015,t],e,.01)}let c=_(e,3)*.14;return C([i*(1-c*.3),o(1)-c,s],e,.01)}),ie=j((e,t)=>{let{i:n,u:r}=w(t,[.46,.3,.04,.12,.08]),i=Math.PI/4;if(n===0)return T(e,[0,.3,0],[.82,.035,.82],i,.6);if(n===1){let t=_(e,1)*h,n=_(e,2)<.4?_(e,3)<.5?0:1:_(e,3),r=.5+.06*n;return C([Math.cos(t)*r,.25-(1-n)*.5,Math.sin(t)*r],e,.015)}if(n===2)return k(e,[0,.36,0],.07);let a=x([.8,0,0],i);if(n===3){let t=[a[0],-.25000000000000006,a[2]];return r<.5?D(e,[0,.35,0],[a[0],.33999999999999997,a[2]],.015):D(e,[a[0],.33999999999999997,a[2]],t,.015)}let o=_(e,1),s=_(e,2)*h,c=.03+o*.08;return C([a[0]+Math.cos(s)*c,-.25000000000000006-o*.28,a[2]+Math.sin(s)*c],e,.01)}),ae=1.1,oe=j((e,t)=>{let{i:n}=w(t,[.16,.24,.24,.24,.12]);if(n===0)return k(e,[0,0,0],.26);let r=ae,i=(n-1)*(h/3),a=x(M,i),o=x(S(P,r),i),s=.72+(n-1)*.16;if(n===4){let t=Math.floor(_(e,0)*3),n=ae,r=h/3*t,i=.9+t*2.1,a=.72+t*.16;return k(e,v(y(x(M,r),Math.cos(i)*a),y(x(S(P,n),r),Math.sin(i)*a)),.09)}return E(e,[0,0,0],s,a,o,.025)}),se=[{x:-.55,z:.15,n:7},{x:.1,z:-.4,n:11},{x:.62,z:.3,n:5},{x:-.1,z:.62,n:3}],ce=.3,Y=.11,le=j((e,t)=>{let{i:n}=w(t,se.map(e=>e.n)),r=se[n]??se[0],i=Math.min(r.n-1,Math.floor(_(e,0)*r.n)),a=-.8+i*Y,o=_(e,1)*h,s=_(e,2)<.85?a+(_(e,3)<.5?0:Y*.6):a+_(e,3)*Y*.6;if(i===r.n-1&&_(e,4)<.35){let t=ce*Math.sqrt(_(e,5));return[r.x+Math.cos(o)*t,a+Y*.6,r.z+Math.sin(o)*t]}return C([r.x+Math.cos(o)*ce,s,r.z+Math.sin(o)*ce],e,.012)}),ue=.6,de=j((e,t)=>{let{i:n}=w(t,[.46,.34,.2]),r=.62,i=.36,a;if(n===2){let t=_(e,1)*h;a=C([Math.cos(t)*.38,0,Math.sin(t)*.38],e,.015)}else{let t=n===0,o=_(e,1)*h;if(_(e,2)<r*2/1.96){let n=(t?1:-1)*_(e,3)*r;a=[Math.cos(o)*i,n,Math.sin(o)*i]}else{let n=_(e,3),s=Math.sqrt(Math.max(0,1-n*n));a=[Math.cos(o)*i*s,(t?1:-1)*(r+n*i),Math.sin(o)*i*s]}!t&&_(e,4)<.45&&(a=y(a,.97+_(e,5)*.06)),a=C(a,e,t?.01:.03)}let o=Math.cos(ue),s=Math.sin(ue);return S([a[0]*o-a[1]*s,a[0]*s+a[1]*o,a[2]],.25)}),fe=5,pe=j((e,t)=>y(me(e,t),.82));function me(e,t){let{i:n,u:r}=w(t,[.78,.1,.12]);if(n===0){let t=Math.min(4,Math.floor(r*fe)),n=1-t*.17,i=.12;return T(e,[0,-.75+t*.25+i,0],[n,i,n],0,.7)}if(n===1){let t=Math.floor(_(e,1)*14)/14;return C([(_(e,2)-.5)*.3,-.75+t*1.3,1-t*.72],e,.015)}return T(e,[0,.62,0],[.2,.13,.2],0,.7)}var X=(1+Math.sqrt(5))/2,Z=[[-1,X,0],[1,X,0],[-1,-X,0],[1,-X,0],[0,-1,X],[0,1,X],[0,-1,-X],[0,1,-X],[X,0,-1],[X,0,1],[-X,0,-1],[-X,0,1]].map(e=>y(e,.95/Math.hypot(1,X))),he=[];for(let e=0;e<Z.length;e++)for(let t=e+1;t<Z.length;t++){let[n,r]=[Z[e],Z[t]],i=Math.hypot(n[0]-r[0],n[1]-r[1],n[2]-r[2]);Math.abs(i-1.9/Math.hypot(1,X))<.01&&he.push([e,t])}var ge=j((e,t)=>{let{i:n}=w(t,[.3,.7]);if(n===0)return k(e,Z[Math.floor(_(e,0)*Z.length)]??[0,0,0],.075);let[r,i]=he[Math.floor(_(e,0)*he.length)]??[0,1];return D(e,Z[r],Z[i],.018)}),_e=j((e,t)=>{let{i:n}=w(t,[.1,.08,.12,.3,.3,.1]),r=[0,.7,0];if(n===0)return D(e,[0,-.85,0],r,.03);if(n===1)return E(e,[0,-.85,0],.4,M,P,.02);if(n===2)return D(e,[-.85,.62,0],[.85,.62,0],.025);if(n===5){let t=_(e,0)<.5?-1:1,n=Math.floor(_(e,2)*3)*(h/3);return D(e,[t*.85,.62,0],[t*.85+Math.cos(n)*.32,-.05,Math.sin(n)*.32],.012)}let i=n===3?-1:1,a=_(e,1)*h,o=_(e,2)<.55?1:Math.sqrt(_(e,3)),s=.32*o;return C([i*.85+Math.cos(a)*s,-.05-(1-o*o)*.12,Math.sin(a)*s],e,.012)}),ve=j((e,t)=>{let{i:n}=w(t,[.62,.14,.24]);if(n===0){let t=_(e,1)*2-1,n=Math.sqrt(Math.max(0,1-t*t)),r=_(e,2)*h;return C([1*n*Math.cos(r),.1+.68*t,.8*n*Math.sin(r)],e,.02)}if(n===1){let t=_(e,1),n=_(e,2)*h,r=.22*(1-t);return C(v(b([-.45,-.45,.2],[-.85,-.98,.35],t),[Math.cos(n)*r,0,Math.sin(n)*r]),e,.015)}return k(e,[(Math.floor(_(e,0)*3)-1)*.36,.12,0],.11)}),ye=j((e,t)=>{let{i:n}=w(t,[.27,.27,.05,.05,.2,.16]),r=.26,i=[-.88,-.2,.28],a=[.88,-.35,-.28],o=[0,1.2,.6],s=v(i,[0,r,0]),c=v(a,[0,r,0]),l=e=>{let t=1-e;return v(v(y(s,t*t),y(o,2*t*e)),y(c,e*e))};if(n===0||n===1){let t=_(e,1)*2-1,o=Math.sqrt(Math.max(0,1-t*t)),s=_(e,2)*h;return C(v(n===0?i:a,[r*o*Math.cos(s),r*t,r*o*Math.sin(s)]),e,.02)}return n===2?k(e,i,.08):n===3?k(e,a,.08):n===4?C(l(_(e,1)),e,.022):k(e,l(.5),.13)}),be=j((e,t)=>{let{i:n}=w(t,[.22,.24,.24,.18,.12]),r=[0,-.2,0],i=[.9,.5,.35],a=[-.88,.38,-.4],o=(e,t,n)=>{let r=[t[0]*.35,e[1]+.5,t[2]*.35],i=1-n;return v(v(y(e,i*i),y(r,2*i*n)),y(t,n*n))};return n===0?D(e,[0,-.95,0],r,.03):n===1?C(o(r,i,_(e,1)),e,.03):n===2?C(o(r,a,_(e,1)),e,.03):n===3?k(e,i,.17):k(e,a,.11)}),Q=null;function xe(){if(Q)return Q;if(typeof document>`u`)return null;let e=document.createElement(`canvas`);e.width=600,e.height=598;let t=e.getContext(`2d`,{willReadFrequently:!0});if(!t)return null;t.scale(2,2);for(let e of o)t.fill(new Path2D(e));let n=t.getImageData(0,0,600,598).data,r=(e,t)=>e>=0&&t>=0&&e<600&&t<598&&(n[(t*600+e)*4+3]??0)>127,i=[],a=[];for(let e=0;e<598;e++)for(let t=0;t<600;t++)r(t,e)&&(i.push(e*600+t),(!r(t-1,e)||!r(t+1,e)||!r(t,e-1)||!r(t,e+1))&&a.push(e*600+t));return Q={fill:Int32Array.from(i),edge:Int32Array.from(a),w:600,h:598},Q}var Se=.1,$=j((e,t)=>{let n=xe();if(!n||n.fill.length===0)return[0,0,0];let{i:r}=w(t,[.28,.44,.28]),i=r===0?n.fill:n.edge,a=i[Math.floor(_(e,0)*i.length)]??0,o=a%n.w+_(e,1)-.5,s=Math.floor(a/n.w)+_(e,2)-.5,c=2.1/Math.max(n.w,n.h);return[(o-n.w/2)*c,(n.h/2-s)*c,r===2?(_(e,3)*2-1)*Se:(_(e,3)<.5?-1:1)*Se]}),Ce={...$,motion:`sway`},we=j(e=>{let t=_(e,0)*h,n=_(e,1)*2-1,r=Math.sqrt(Math.max(0,1-n*n)),i=1.6+Math.sqrt(_(e,2))*2.8;return[Math.cos(t)*r*i*1.5,n*i*.75,Math.sin(t)*r*i*.2]}),Te={...$,volume:(e,t,n)=>y($.volume(e,t,n),.62),motion:`sway`},Ee={paperplane:B,spiral:ne,lifebuoy:U,rings:re,broadcast:W,skyline:q,book:J,mortarboard:ie,orbit:oe,coins:le,capsule:de,pyramid:pe,network:ge,scale:_e,bubble:ve,bridge:ye,fork:be,icon:Ce,"icon-spin":{...$,motion:`spin`},arrival:we,"icon-intro":Te},De={...f,...Ee},Oe=n(),ke=880,Ae=8*ke,je=.55,Me=.6,Ne=.34,Pe=.11,Fe=2.9,Ie=`
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec2 aSeed;

  uniform float uMix;
  uniform float uStagger;
  uniform float uSwirl;
  uniform float uVortex;
  uniform float uTime;
  uniform float uAngle;
  uniform float uAspect;
  uniform float uScale;
  uniform float uPx;
  uniform float uPointScale;
  uniform vec2 uPointer;
  uniform float uPointerOn;
  uniform float uRepelRadius;
  uniform float uRepelStrength;

  varying float vDepth;
  varying float vSeed;

  void main() {
    // The morph: exactly the SVG version's lerp, one point per vertex. uMix is
    // a scroll position, not a clock.
    // uStagger (0 = off, every figure but the intro): each point leaves on its
    // own delay, so a form builds up rather than arriving all at once.
    float m = clamp((uMix - aSeed.y * uStagger) / max(0.0001, 1.0 - uStagger), 0.0, 1.0);
    m = m * m * (3.0 - 2.0 * m);
    vec3 p = mix(aFrom, aTo, m);

    // uSwirl (0 = off): points spiral in about y while in flight and settle
    // as they land — the intro's arrival.
    // uVortex (rad/s, 0 = off): until a point lands it circles the centre at
    // speed — waiting points whirl instead of floating still, and each one
    // unwinds out of the whirl as it lands (the (1 - m) factor), so the form
    // still settles exactly.
    // The whirl starts fast and eases off: its rate is uVortex * (2.8 at t=0,
    // falling toward 1) — the burst is at the beginning, the landing is calm.
    float vt = 1.8 * (1.0 - exp(-uTime * 1.1)) / 1.1 + uTime;
    float sw = (1.0 - m) * (uSwirl * (0.6 + aSeed.x) + uVortex * vt * (0.55 + aSeed.x));
    // In the SCREEN plane (about z), not about y: turning about y swings the
    // wide-spread arrival points toward the camera, where perspective blows
    // them up into huge blurred discs (measured). About z, depth never changes
    // — a galaxy whirl, and the tails draw as clean arcs.
    float cw = cos(sw), swn = sin(sw);
    p = vec3(p.x * cw - p.y * swn, p.x * swn + p.y * cw, p.z);

    // A breath outward while in flight, so the change reads as the object
    // coming apart and re-forming rather than sliding between two poses.
    float flight = sin(m * 3.14159);
    p *= 1.0 + flight * 0.24 * (0.4 + aSeed.x);

    float ca = cos(uAngle), sa = sin(uAngle);
    vec3 r = vec3(p.x * ca - p.z * sa, p.y, p.x * sa + p.z * ca);

    float ct = cos(0.34), st = sin(0.34);
    vec3 t = vec3(r.x, r.y * ct - r.z * st, r.y * st + r.z * ct);

    // Pointer repulsion, measured AFTER the rotation and tilt so the hole sits
    // where the cursor is on screen. The distance is deliberately taken in the
    // SCREEN plane only, ignoring depth: these shapes are hollow skins, so a
    // true 3D distance puts the cursor in the empty middle of the object and
    // reaches nothing at all.
    vec2 away = t.xy - uPointer;
    float dist = length(away) + 0.0001;
    float fall = smoothstep(uRepelRadius, 0.0, dist) * uPointerOn;
    vec3 dir = vec3(away / dist, 0.0);
    // A little per-point scatter, so the disturbed cloud does not read as a
    // clean circular bite taken out of the figure.
    vec3 chaos = normalize(vec3(aSeed.x, aSeed.y, fract(aSeed.x * 7.13)) - 0.5 + 0.0001);
    t += mix(dir, chaos, 0.3) * fall * uRepelStrength;

    float s = 1.0 / max(0.6, ${Fe.toFixed(1)} - t.z);
    vDepth = t.z;
    vSeed = aSeed.y;

    // uScale 1.96 reproduces the SVG's framing exactly: it mapped x * s * 470
    // into a 480 box, i.e. x * s * 1.958 in clip space. Y is negated because
    // SVG counts downward and clip space counts up.
    gl_Position = vec4(t.x * s * uScale / uAspect, -t.y * s * uScale, 0.0, 1.0);
    gl_PointSize = (0.9 + aSeed.y * 1.3) * s * uPx * 6.0 * uPointScale;
  }
`,Le=1.7,Re=`
  precision highp float;

  uniform vec3 uColor;
  uniform vec3 uHot;
  uniform float uOpacity; // 1 additive (dark); >1 on the light ground, where
                          // alpha blending needs denser points to read as colour

  varying float vDepth;
  varying float vSeed;

  void main() {
    // Round, soft-edged point. Square dots read as noise at this density.
    vec2 d = gl_PointCoord - 0.5;
    float r = dot(d, d);
    if (r > 0.25) discard;
    float falloff = smoothstep(0.25, 0.0, r);

    // Depth does the shading: points at the back sit further from the hot
    // colour and carry less alpha, which is what makes the cloud read as solid.
    float near = clamp((vDepth + 1.0) * 0.5, 0.0, 1.0);
    vec3 col = mix(uColor, uHot, near * (0.35 + vSeed * 0.65));
    float alpha = min(1.0, falloff * (0.16 + near * 0.58) * uOpacity);

    gl_FragColor = vec4(col, alpha);
  }
`,ze=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2;function Be({chain:e,progress:t,onPainted:n,onLost:o,tempo:f=1,stagger:p=0,swirl:h=0,vortex:g=0,trail:_=0,interactive:v=!0}){let y=(0,m.useRef)(null),b=(0,m.useRef)(e);b.current=e;let x=(0,m.useRef)(t);x.current=t;let S=(0,m.useRef)(n);S.current=n;let C=(0,m.useRef)(o);C.current=o;let w=(0,m.useRef)(f);w.current=f;let T=(0,m.useRef)({stagger:p,swirl:h,vortex:g});T.current={stagger:p,swirl:h,vortex:g};let E=(0,m.useRef)(_).current,D=(0,m.useRef)(v).current,O=(0,m.useRef)(null),k=d().resolved;return(0,m.useEffect)(()=>{O.current?.(k)},[k]),(0,m.useEffect)(()=>{let e=y.current;if(!e)return;let t=()=>{},n=!1;return(async()=>{let{Renderer:o,Program:d,Mesh:f,Geometry:p}=await i(async()=>{let{Renderer:e,Program:t,Mesh:n,Geometry:r}=await import(`./src-BMcxC5a4.js`);return{Renderer:e,Program:t,Mesh:n,Geometry:r}},[]);if(n)return;let m;try{if(m=new o({alpha:!0,antialias:!1,...E>0?{preserveDrawingBuffer:!0,autoClear:!1,premultipliedAlpha:!0}:{},dpr:l(e.clientWidth,e.clientHeight,c.particles)}),!m.gl)return}catch{return}let h=m.gl;if(u(h)===`software`){h.getExtension(`WEBGL_lose_context`)?.loseContext();return}h.clearColor(0,0,0,0),h.canvas.style.cssText=`position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 600ms`,e.appendChild(h.canvas);let g=[...new Set(b.current)],_=new Map;for(let e of g)_.set(e,ee(De[e]??De.shell,ke));let v=e=>(e?_.get(e):void 0)??_.values().next().value,y=new Float32Array(Ae*2);for(let e=0;e<Ae;e++){let t=Math.sin(e*12.9898)*43758.5453,n=Math.sin(e*78.233)*43758.5453;y[e*2]=t-Math.floor(t),y[e*2+1]=n-Math.floor(n)}let k=new p(h,{aFrom:{size:3,data:v(b.current[0]).slice()},aTo:{size:3,data:v(b.current[1]).slice()},aSeed:{size:2,data:y}}),A=new d(h,{vertex:Ie,fragment:Re,transparent:!0,depthTest:!1,uniforms:{uMix:{value:0},uAngle:{value:0},uAspect:{value:1},uScale:{value:1.96},uStagger:{value:0},uSwirl:{value:0},uVortex:{value:0},uPointScale:{value:E>0?.55:1},uTime:{value:0},uPx:{value:1.6},uColor:{value:[0,0,0]},uHot:{value:[0,0,0]},uOpacity:{value:1},uPointer:{value:[0,0]},uPointerOn:{value:0},uRepelRadius:{value:je},uRepelStrength:{value:Me}}}),j=e=>{let t=s([`--particle`,`--particle-hot`]);A.uniforms.uColor.value=a(t[`--particle`]),A.uniforms.uHot.value=a(t[`--particle-hot`]),E>0?A.setBlendFunc(h.SRC_ALPHA,e===`dark`?h.ONE:h.ONE_MINUS_SRC_ALPHA,h.ONE,e===`dark`?h.ONE:h.ONE_MINUS_SRC_ALPHA):A.setBlendFunc(h.SRC_ALPHA,e===`dark`?h.ONE:h.ONE_MINUS_SRC_ALPHA),A.uniforms.uOpacity.value=e===`dark`?1:Le};j(r()),O.current=j;let M=new f(h,{geometry:k,program:A,mode:h.POINTS}),N=null;if(E>0){let e=new p(h,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])}}),t=new d(h,{vertex:`attribute vec2 position; void main(){ gl_Position = vec4(position, 0.0, 1.0); }`,fragment:`precision mediump float; uniform float uFade; void main(){ gl_FragColor = vec4(0.0, 0.0, 0.0, uFade); }`,uniforms:{uFade:{value:1-E}},transparent:!0,depthTest:!1,depthWrite:!1});t.setBlendFunc(h.ONE,h.ONE_MINUS_SRC_ALPHA,h.ZERO,h.ONE_MINUS_SRC_ALPHA),N=new f(h,{geometry:e,program:t})}let P=()=>{let t=e.clientWidth||1,n=e.clientHeight||1;m.setSize(t,n),A.uniforms.uAspect.value=t/n,A.uniforms.uPx.value=h.canvas.height/480};P(),window.addEventListener(`resize`,P,{passive:!0});let F=D&&typeof window.matchMedia==`function`&&window.matchMedia(`(hover: hover) and (pointer: fine)`).matches,I=0,L=0,R=!1,z=0,B=0,V=0,te=e=>{I=e.clientX,L=e.clientY,R=!0};F&&window.addEventListener(`pointermove`,te,{passive:!0});let ne=-1,H=!1,U=0,re=0,W=0,G=0,K=0,q=t=>{if(U=requestAnimationFrame(q),T.current.vortex===0&&t-re<33)return;re=t;let n=b.current,r=n.length,i=Math.max(0,Math.min(r-1,x.current.current)),a=Math.min(Math.floor(i),Math.max(0,r-2));if(a!==ne){let e=k.attributes.aFrom,t=k.attributes.aTo;e.data.set(v(n[a])),t.data.set(v(n[a+1])),e.needsUpdate=!0,t.needsUpdate=!0,ne=a}A.uniforms.uMix.value=ze(Math.max(0,Math.min(1,i-a))),A.uniforms.uStagger.value=T.current.stagger,A.uniforms.uSwirl.value=T.current.swirl,A.uniforms.uVortex.value=T.current.vortex,K||=t,A.uniforms.uTime.value=(t-K)/1e3;let o=G?t-G:0;if(G=t,De[n[Math.min(r-1,a+1)]??``]?.motion===`sway`){W=Math.atan2(Math.sin(W),Math.cos(W));let e=Math.sin(t/3200)*.35;W+=(e-W)*Math.min(1,o/450)}else W+=o/6e3*w.current;if(A.uniforms.uAngle.value=W,F&&(R||V>.002)){let t=e.getBoundingClientRect(),n=t.width||1,r=t.height||1,i=(I-t.left)/n,a=(L-t.top)/r,o=i>-.2&&i<1.2&&a>-.2&&a<1.2,s=A.uniforms.uAspect.value,c=A.uniforms.uScale.value,l=(i*2-1)*s*Fe/c,u=(a*2-1)*Fe/c;z+=(l-z)*Ne,B+=(u-B)*Ne,V+=(+!!o-V)*Pe;let d=A.uniforms.uPointer.value;d[0]=z,d[1]=B,A.uniforms.uPointerOn.value=V,R=!1}if(N){let e=Math.max(0,Math.min(1,i-a)),t=Math.max(0,Math.min(1,(e-.8)/.2));N.program.uniforms.uFade.value=1-E*(1-t*t*(3-2*t)),m.render({scene:N,clear:!1}),m.render({scene:M,clear:!1})}else m.render({scene:M});H||(H=!0,h.canvas.style.opacity=`1`,S.current?.())};U=requestAnimationFrame(q);let J=()=>{document.hidden?cancelAnimationFrame(U):U=requestAnimationFrame(q)};document.addEventListener(`visibilitychange`,J);let ie=()=>{cancelAnimationFrame(U),document.removeEventListener(`visibilitychange`,J),h.canvas.style.visibility=`hidden`,C.current?.()};h.canvas.addEventListener(`webglcontextlost`,ie),t=()=>{h.canvas.removeEventListener(`webglcontextlost`,ie),cancelAnimationFrame(U),window.removeEventListener(`resize`,P),window.removeEventListener(`pointermove`,te),document.removeEventListener(`visibilitychange`,J),h.getExtension(`WEBGL_lose_context`)?.loseContext(),h.canvas.remove(),O.current=null}})(),()=>{n=!0,t()}},[]),(0,Oe.jsx)(`div`,{ref:y,"aria-hidden":`true`,className:`absolute inset-0`})}export{Be as default};