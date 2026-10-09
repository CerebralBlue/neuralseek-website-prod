import{An as e,Nn as t,On as n,bn as r,hn as ee,ln as i,un as a,vn as o,xn as s,yn as te}from"./index-FYgD9L-g.js";import{T as c}from"./shared-ButQmPtj.js";var l=t(e()),u=n(),d=`
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`,f=`
  precision highp float;
  uniform vec2  uRes;
  uniform vec2  uTilt;    // pitch, x-travel turn (radians)
  uniform float uSpread;  // 0 closed .. 1 exploded
  uniform float uSeed;

  // The core's light and the cube faces: --fracture-core / --fracture-face in
  // styles.css, uploaded at mount and on a theme flip. The figure has its own
  // colour on purpose — it is not one of the aurora tokens. Faces are black on
  // the dark theme (uFace = 0, and the screen below is a no-op).
  uniform vec3 uCore;
  uniform vec3 uFace;

  // Geometry in units of one dark cube's half-extent, rounding included.
  const float H      = 1.0;
  const float HR     = 0.13;   // corner rounding of the dark cubes
  const float CH     = 0.57;   // core half-extent
  const float CR     = 0.095;  // core rounding
  const float CLOSED = 0.95;   // centre offset when closed: the cubes overlap into a crease
  const float OPEN   = 2.17;   // centre offset when fully exploded
  const float BOUND  = 6.0;    // bounding sphere of the whole cluster
  const float CAMD   = 24.0;
  const float FOCAL  = 1.77;
  const int   STEPS  = 72;

  // Base view with the pointer centred: nearly face-on, from a little above
  // and a hair to the left, with a slight anticlockwise roll, so the back row
  // peeks out above the front row and the whole cluster leans up to the right.
  const float BASE_PITCH = 0.30;
  const float BASE_YAW   = 0.027;
  const float BASE_ROLL  = -0.0675;
  // Camera-frame axis the pointer's horizontal travel turns the cluster about:
  // mostly the view direction (a roll), leaning toward vertical (some yaw).
  // Signed so that the pointer moving right rolls the cluster clockwise on
  // screen, as the mockup does — pass 1 had it mirrored.
  const vec3  TURN_AXIS  = vec3(0.0, 0.4511, 0.8925);

  const float GLOW_L     = 0.7;    // decay length of the core's light
  const float GLOW_K     = 0.15;   // light gathered per march step
  const float CORE_GAIN  = 2.2;
  const float RIM_GAIN   = 0.4;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c); }
  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c); }
  mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0); }

  // Rodrigues' rotation about a unit axis.
  mat3 rotAxis(vec3 a, float t) {
    float c = cos(t), s = sin(t), k = 1.0 - c;
    return mat3(
      c + a.x * a.x * k,        a.y * a.x * k + a.z * s,  a.z * a.x * k - a.y * s,
      a.x * a.y * k - a.z * s,  c + a.y * a.y * k,        a.z * a.y * k + a.x * s,
      a.x * a.z * k + a.y * s,  a.y * a.z * k - a.x * s,  c + a.z * a.z * k);
  }

  // Rounded box, Inigo Quilez's formulation.
  float sdBox(vec3 p, vec3 b, float r) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
  }

  float dCore(vec3 p) { return sdBox(p, vec3(CH - CR), CR); }
  // All eight dark cubes at once through octant mirroring.
  float dShell(vec3 p, float off) { return sdBox(abs(p) - vec3(off), vec3(H - HR), HR); }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;   // -0.5..0.5 on the short axis
    float off = mix(CLOSED, OPEN, uSpread);

    // Base view, then the pointer's tilt applied in the camera frame.
    mat3 R = rotX(BASE_PITCH) * rotY(BASE_YAW) * rotZ(BASE_ROLL) * rotX(uTilt.x) * rotAxis(TURN_AXIS, uTilt.y);
    vec3 ro = R * vec3(0.0, 0.0, -CAMD);
    vec3 rd = R * normalize(vec3(uv, FOCAL));

    // Ray vs bounding sphere: empty pixels cost nothing, and the march is bounded.
    float b = dot(ro, rd);
    float disc = b * b - (dot(ro, ro) - BOUND * BOUND);
    vec3 col = vec3(0.0);
    float glow = 0.0;
    float hit = 0.0;
    float isCore = 0.0;
    vec3 p = vec3(0.0);

    if (disc > 0.0) {
      float t = -b - sqrt(disc);
      float tEnd = -b + sqrt(disc);
      for (int i = 0; i < STEPS; i++) {
        p = ro + rd * t;
        float dc = dCore(p);
        float ds = dShell(p, off);
        float d = min(dc, ds);
        // The core's light, gathered per step along the ray up to the hit,
        // decaying exponentially with the distance to the core: tight and
        // bright at the core, a long soft tail. Per step, not per unit
        // length, on purpose: a ray that closes on a surface near the core
        // spends many small steps there, which is what lights the inner
        // faces of the cubes and tints the crease.
        glow += exp(-dc / GLOW_L) * GLOW_K;
        if (d < 0.002) { hit = 1.0; isCore = dc < ds ? 1.0 : 0.0; break; }
        t += d * 0.85;
        if (t > tEnd) break;
      }
    }

    if (hit > 0.5) {
      if (isCore > 0.5) {
        col = uCore * CORE_GAIN;
      } else {
        // Faces are black and only the grazing rim catches light. They stay
        // OPAQUE (see the alpha below) so the cubes read as solid bodies on
        // the glass card rather than as floating outlines.
        vec2 e = vec2(0.002, 0.0);
        vec3 n = normalize(vec3(
          dShell(p + e.xyy, off) - dShell(p - e.xyy, off),
          dShell(p + e.yxy, off) - dShell(p - e.yxy, off),
          dShell(p + e.yyx, off) - dShell(p - e.yyx, off)));
        float f = pow(1.0 - max(dot(n, -rd), 0.0), 3.5);
        col = vec3(RIM_GAIN) * f;
      }
    }
    col += uCore * glow;

    // Exposure tonemap, then a hair of noise against banding in the glow.
    col = 1.0 - exp(-col * 1.4);
    // Face colour screened under the lit parts of a covered pixel: the light
    // theme's pale faces with the rim as a highlight; on dark uFace is black.
    col += uFace * hit * (1.0 - col);
    col += (hash12(gl_FragCoord.xy + uSeed) - 0.5) / 255.0;
    // Premultiplied alpha. Opacity is COVERAGE, not brightness: a pixel the
    // geometry covers is fully opaque however dark it is, so the cubes read as
    // solid bodies; everywhere else the halo's own brightness is its opacity,
    // so the glow fades into the card with no box around it. rgb <= a holds
    // in both branches, which is what a premultiplied canvas expects.
    vec3 lit = max(col, 0.0);
    float a = max(hit, clamp(max(lit.r, max(lit.g, lit.b)), 0.0, 1.0));
    gl_FragColor = vec4(lit, a);
  }
`,p=5.24;function m(e){let t=e=>{let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)},n=((e/p+.5)%1+1)%1;return t(t(1-Math.abs(2*n-1)))}var h=1.478,g=.757,_=3,v=.85,ne=.75;function y({paused:e=!1,still:t,onPainted:n,onLost:p}){let y=(0,l.useRef)(null),b=(0,l.useRef)(e);b.current=e;let x=(0,l.useRef)(()=>{}),S=(0,l.useRef)(null),C=(0,l.useRef)(p);C.current=p;let w=c().resolved;return(0,l.useEffect)(()=>{e||x.current()},[e]),(0,l.useEffect)(()=>{S.current?.()},[w]),(0,l.useEffect)(()=>{let e=y.current;if(!e)return;let c=0,l=!1,u;return(async()=>{let{Renderer:p,Program:y,Mesh:w,Triangle:T}=await ee(async()=>{let{Renderer:e,Program:t,Mesh:n,Triangle:r}=await import(`./src-BMcxC5a4.js`);return{Renderer:e,Program:t,Mesh:n,Triangle:r}},[]);if(l)return;let E;try{if(E=new p({alpha:!0,antialias:!1,dpr:s(e.clientWidth,e.clientHeight,o.fracture)}),!E.gl)return}catch{return}let D=E.gl;if(te(D)===`software`){D.getExtension(`WEBGL_lose_context`)?.loseContext();return}D.canvas.style.cssText=`position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 0.9s ease`,e.appendChild(D.canvas);let O=new y(D,{vertex:d,fragment:f,uniforms:{uRes:{value:[1,1]},uTilt:{value:[0,0]},uSpread:{value:1},uSeed:{value:0},uCore:{value:[0,0,0]},uFace:{value:[0,0,0]}}}),k=new w(D,{geometry:new T(D),program:O}),A,j=()=>{let e=a([`--fracture-core`,`--fracture-face`]);O.uniforms.uCore.value=i(e[`--fracture-core`]),O.uniforms.uFace.value=i(e[`--fracture-face`]),A?.()};j(),S.current=j;let M=[1,.75,.5],N=t=>{let{clientWidth:n,clientHeight:r}=e;E.dpr=s(n,r,o.fracture)*(M[t]??.5),E.setSize(n,r),O.uniforms.uRes.value=[D.drawingBufferWidth,D.drawingBufferHeight]},P=r({maxLevel:M.length-1,onDown:N,onUp:N}),F=()=>N(P.level());F(),window.addEventListener(`resize`,F,{passive:!0});let I=!1,L=()=>{I||(I=!0,D.canvas.style.opacity=`1`,n?.())};if(t){O.uniforms.uTilt.value=t.tilt,O.uniforms.uSpread.value=t.spread,A=()=>E.render({scene:k}),A(),L(),u=()=>{window.removeEventListener(`resize`,F),D.getExtension(`WEBGL_lose_context`)?.loseContext(),D.canvas.remove(),S.current=null};return}let R=0,z=0,B=0,V=0,H=0,U=0,W=e.getBoundingClientRect(),re=window.matchMedia(`(hover: hover) and (pointer: fine)`).matches&&!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,G=e=>Math.max(-.75,Math.min(ne,e)),K=e=>{e.pointerType===`mouse`&&(R=G((e.clientX-W.left)/Math.max(W.width,1)-.5),z=G((e.clientY-W.top)/Math.max(W.height,1)-.5))};re&&window.addEventListener(`pointermove`,K,{passive:!0});let q=0,J=0,Y=0,ie=0,X=t=>{if(c=requestAnimationFrame(X),b.current){cancelAnimationFrame(c),c=0;return}if(t-q<33)return;q=t;let n=Math.min(t-J,100)*.001;J=t,Y+=n,++ie%15==0&&(W=e.getBoundingClientRect());let r=n/4;for(let e=0;e<4;e++)H+=(9*(R-B)-2*v*_*H)*r,B+=H*r,U+=(9*(z-V)-2*v*_*U)*r,V+=U*r;O.uniforms.uTilt.value=[V*g,B*h],O.uniforms.uSpread.value=m(Y),O.uniforms.uSeed.value=Y*60%97,E.render({scene:k}),L(),P.sample(t)},Z=()=>{c||l||document.hidden||b.current||(J=performance.now(),c=requestAnimationFrame(X))};x.current=Z,Z();let Q=()=>{cancelAnimationFrame(c),c=0,Z()};document.addEventListener(`visibilitychange`,Q);let $=()=>{cancelAnimationFrame(c),c=0,x.current=()=>{},D.canvas.style.visibility=`hidden`,C.current?.()};D.canvas.addEventListener(`webglcontextlost`,$),u=()=>{D.canvas.removeEventListener(`webglcontextlost`,$),cancelAnimationFrame(c),c=0,x.current=()=>{},window.removeEventListener(`resize`,F),window.removeEventListener(`pointermove`,K),document.removeEventListener(`visibilitychange`,Q),D.getExtension(`WEBGL_lose_context`)?.loseContext(),D.canvas.remove(),S.current=null}})(),()=>{l=!0,u?.()}},[]),(0,u.jsx)(`div`,{ref:y,className:`absolute inset-0`})}export{p as PERIOD,y as default,m as spreadAt};