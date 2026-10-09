import{An as e,Nn as t,On as n,Sn as r,bn as i,hn as a,ln as o,un as s,vn as c,wn as l,xn as u,yn as d}from"./index-FYgD9L-g.js";import{T as f}from"./shared-ButQmPtj.js";var p=t(e()),m=n(),h=`
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`,g=`
  precision highp float;
  uniform float uTime;
  uniform vec2  uRes;
  uniform float uMouse; // eased pointer x, -1..1, 0 when idle or disabled
  uniform float uSteps; // march steps actually taken, <= STEPS (quality ladder)

  // The palette: the --aurora-* tokens in styles.css, uploaded by applyPalette
  // and again whenever the theme flips. No colour is written in here.
  uniform vec3 uBase;   // the ground the fan is painted on: --aurora-base
  uniform vec3 uWash;   // --aurora-wash, the dim end of the emission ramp
  uniform vec3 uViolet; // --aurora-violet, the lit end
  uniform vec3 uIridA;  // --aurora-irid-a / -b, the sawtooth bands on the shell
  uniform vec3 uIridB;

  // Vanishing point just below the bottom edge, a touch right of centre, and
  // the wide, short screen-space ellipse that confines the glow to a band
  // along the bottom. Both sit below the frame on purpose: the glow's centre
  // of mass is off-screen, so what is visible is the upper half of a fan.
  const vec2  VP     = vec2(0.52, -0.196);
  const vec2  MASKC  = vec2(0.52, -0.176);
  const vec2  ELL    = vec2(2.36, 0.84);
  const int   STEPS  = 40;
  const float TMAX   = 2.68;
  const float DRIFT  = 0.07;   // camera speed along z, world units / s
  const float INK_L  = 0.42;   // light theme: luminance of the fully covered edge

  // World -> field frequencies. Features are about as wide as they are tall
  // and roughly ten times longer along the view axis — cigars, not tubes.
  // That ratio is most of the character: pass 1 ran it near 25 and every blob
  // became a straight ray to the vanishing point (the starburst); at 6 the
  // field is a cloud of soft petals. Transverse size sets streak width.
  const vec3  FREQ   = vec3(6.5, 7.0, 0.7);
  // Rotations between octaves (axis-angle, my own axes). Applied AFTER the
  // anisotropic scale so the lattice is hidden but the elongation survives.
  const mat3 RB = mat3(0.4548, 0.5645, -0.6889, -0.2867, 0.8251, 0.4868, 0.8432, -0.0239, 0.5371);
  const mat3 RC = mat3(0.1234, -0.0473, -0.9912, -0.8968, -0.4330, -0.0910, -0.4249, 0.9002, -0.0958);

  // Interleaved gradient noise: the fine diagonal dither, and the march jitter.
  float ign(vec2 st) {
    return fract(52.9829189 * fract(dot(st, vec2(0.06711056, 0.00583715))));
  }

  // 3D value noise (lattice hash + trilinear blend with a cubic fade), the
  // textbook formulation. Cheap enough to run three octaves per march step.
  float hash3(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float vnoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n000 = hash3(i);
    float n100 = hash3(i + vec3(1.0, 0.0, 0.0));
    float n010 = hash3(i + vec3(0.0, 1.0, 0.0));
    float n110 = hash3(i + vec3(1.0, 1.0, 0.0));
    float n001 = hash3(i + vec3(0.0, 0.0, 1.0));
    float n101 = hash3(i + vec3(1.0, 0.0, 1.0));
    float n011 = hash3(i + vec3(0.0, 1.0, 1.0));
    float n111 = hash3(i + vec3(1.0, 1.0, 1.0));
    return mix(mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
               mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y), f.z);
  }

  // Density: a three-octave multifractal. Each octave's amplitude follows the
  // magnitude of the one before it (Musgrave's heterogeneous fBm), so detail
  // gathers on the ridges and the valleys stay smooth. The running signed sum
  // is folded into a positive, squared "mass" per octave, which sharpens the
  // walls of every blob: the field is mostly dense with thin soft valleys, not
  // sparse bright threads in empty space.
  float density(vec3 q) {
    float amp = 1.0;
    float s = 0.0;      // running signed sum
    float mass = 0.0;   // accumulated positive density
    float n = (vnoise(q) - 0.5) * 4.5;
    s += n;
    float v = max(0.0, 0.4 + 0.5 * s);
    mass += v * v;
    amp *= 0.35 + 0.35 * abs(n);
    q = RB * (q * 2.3) + vec3(3.7, 1.9, 5.3);
    n = (vnoise(q) - 0.5) * 4.5;
    s += amp * n;
    v = max(0.0, 0.4 + 0.5 * s);
    mass += amp * v * v;
    amp *= 0.35 + 0.35 * abs(n);
    q = RC * (q * 2.4) + vec3(1.3, 7.1, 2.9);
    n = (vnoise(q) - 0.5) * 4.5;
    s += amp * n;
    v = max(0.0, 0.4 + 0.5 * s);
    mass += amp * v * v;
    return mass;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float aspect = uRes.x / uRes.y;
    vec2 m = uv - MASKC;
    m.x *= aspect;
    float sdf = length(m / ELL) - 1.0;
    float mask = smoothstep(0.1, 0.945, -sdf);
    vec3 col = vec3(0.0);

    if (mask > 0.001) {
      vec2 q = uv - VP;
      q.x *= aspect;
      vec3 ro = vec3(uMouse * 0.03, 0.0, uTime * DRIFT);
      vec3 rd = normalize(vec3(q, 1.0));
      // STEPS is the compile-time bound GLSL ES 1.0 needs; uSteps is how many
      // are taken. dt stretches with it, so a coarser march still spans TMAX
      // and the per-step light/absorb constants keep the same look, just softer.
      float dt = TMAX / uSteps;
      float t = dt * ign(gl_FragCoord.xy);
      float T = 1.0;
      float lightK  = dt * 26.0;
      float absorbK = dt * 7.0;
      for (int i = 0; i < STEPS; i++) {
        if (float(i) >= uSteps || T < 0.01 || t > TMAX) break;
        vec3 p = ro + rd * t;
        float dr = t / TMAX;
        // The near field is faded on DENSITY, not on light. Every ray then
        // climbs through the emitting band on its way in, which is what puts
        // a soft floor under the whole fan; the far fade does the same on
        // the way out. Both act along the ray, not on the screen.
        float fade = smoothstep(0.0, 1.0, rd.z * t) * (1.0 - dr * dr);
        float d = density(p * FREQ) * fade;
        if (d > 0.002) {
          // Emit only from the SHELL of each blob: a band of moderate
          // density, rising from the thin skirts and gone again inside the
          // dense core. Cores still absorb — and strongly — so they read as
          // dark clefts behind a lit edge, the way backlit cloud does.
          float shell = smoothstep(0.02, 0.5, d) * (1.0 - smoothstep(0.3, 0.85, d));
          float k = smoothstep(0.0, 1.0, d);
          vec3 light = mix(uWash, uViolet, k);
          // A sawtooth on density inside the shell: faint colour bands that
          // give the edges their iridescent, slightly oily look.
          light += mix(uIridA, uIridB, fract(d * 1.6 + 0.15)) * shell * 0.4;
          float e = shell * d * mix(1.0, 0.6, dr) * T * lightK;
          col += light * e;
          T *= 1.0 - clamp(d * absorbK, 0.0, 1.0);
        }
        t += dt;
      }
      // Hue-preserving soft knee: linear to 0.5, then luminance saturates
      // toward ~0.78, so the brightest edge stays violet, never white.
      float I = dot(col, vec3(0.299, 0.587, 0.114));
      float knee = I < 0.5 ? I : 0.5 + 0.28 * (1.0 - exp(-(I - 0.5) / 0.28));
      col *= knee / max(I, 1e-4);
      col *= mask;
    }

    // Dither: kills banding and gives the fine diagonal grain. Strongest in
    // the dark skirts, easing off inside the bright edges. Dark ground only:
    // the light skirts are near-white, where there is no banding to hide and
    // the grain reads as a screen-door texture instead.
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    float grain = (11.0 - 8.0 * smoothstep(0.1, 0.5, lum)) * smoothstep(0.0, 0.03, lum);
    float ground = dot(uBase, vec3(0.299, 0.587, 0.114));
    float ink = smoothstep(0.35, 0.65, ground); // 1 on a light ground
    col += (ign(gl_FragCoord.xy) - 0.5) * (grain / 255.0) * (1.0 - ink);

    // Composite over the ground. The fan's luminance is its coverage: where it
    // is bright the ground is gone, where it is faint the ground shows. On the
    // dark theme the ground is black and this is exactly the additive glow it
    // always was; on the light theme the warm-white ground gives way to the
    // (paler) light tokens instead of blowing out to white.
    float cov = clamp(lum / 0.78, 0.0, 1.0);
    // On a light ground the emission is a DYE, not a glow: added at full
    // strength over near-white it can only lighten (the blue channel clips and
    // the fan turns pink), so it is scaled down until the fully covered edge
    // lands at INK_L — a mid-violet — and the skirts are a lilac tint. The
    // ground's own luminance picks the mode (ink); no extra uniform.
    float gain = mix(1.0, INK_L / 0.78, ink);
    gl_FragColor = vec4(uBase * (1.0 - cov) + max(col, 0.0) * gain, 1.0);
  }
`,_=[`--aurora-base`,`--aurora-wash`,`--aurora-violet`,`--aurora-irid-a`,`--aurora-irid-b`];function v(e){let t=s(_),n=(n,r)=>{let i=e[n];i&&(i.value=o(t[r]))};n(`uBase`,`--aurora-base`),n(`uWash`,`--aurora-wash`),n(`uViolet`,`--aurora-violet`),n(`uIridA`,`--aurora-irid-a`),n(`uIridB`,`--aurora-irid-b`)}function y(){let e=(0,p.useRef)(null),t=(0,p.useRef)(null),n=f().resolved;return(0,p.useEffect)(()=>{t.current&&v(t.current)},[n]),(0,p.useEffect)(()=>{let n=e.current;if(!n)return;let o=0,s=!1,f;return(async()=>{let{Renderer:e,Program:p,Mesh:m,Triangle:_}=await a(async()=>{let{Renderer:e,Program:t,Mesh:n,Triangle:r}=await import(`./src-BMcxC5a4.js`);return{Renderer:e,Program:t,Mesh:n,Triangle:r}},[]);if(s)return;let y;try{if(y=new e({alpha:!1,antialias:!1,dpr:u(n.clientWidth,n.clientHeight,c.background)}),!y.gl)return}catch{return}let b=y.gl;if(d(b)===`software`){b.getExtension(`WEBGL_lose_context`)?.loseContext();return}b.canvas.style.cssText=`position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.4s ease`,n.appendChild(b.canvas);let x=new p(b,{vertex:h,fragment:g,uniforms:{uTime:{value:0},uRes:{value:[1,1]},uMouse:{value:0},uSteps:{value:40},uBase:{value:[0,0,0]},uWash:{value:[0,0,0]},uViolet:{value:[0,0,0]},uIridA:{value:[0,0,0]},uIridB:{value:[0,0,0]}}});v(x.uniforms),t.current=x.uniforms;let S=new m(b,{geometry:new _(b),program:x}),C=[[1,40],[.75,40],[.5,40],[.5,24]],w=!1,T=e=>{let t=C[e];if(!t){w=!0,cancelAnimationFrame(o),b.canvas.style.opacity=`0`;return}let{clientWidth:r,clientHeight:i}=n;y.dpr=u(r,i,c.background)*t[0],y.setSize(r,i);let a=y.dpr;b.canvas.style.filter=a<1?`blur(${((1/a-1)*1.2).toFixed(2)}px)`:``,x.uniforms.uRes.value=[b.drawingBufferWidth,b.drawingBufferHeight],x.uniforms.uSteps.value=t[1]},E=i({maxLevel:C.length,onDown:T,onUp:T}),D=()=>T(E.level());D(),window.addEventListener(`resize`,D,{passive:!0});let O=0,k=0,A=window.matchMedia(`(hover: hover) and (pointer: fine)`).matches&&!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,j=e=>{e.pointerType===`mouse`&&(O=e.clientX/window.innerWidth*2-1)};A&&window.addEventListener(`pointermove`,j,{passive:!0});let M=0,N=0,P=!1,F=e=>{if(o=requestAnimationFrame(F),e-M<33)return;M=e;let t=Math.min(e-N,200)*.001;N=e,x.uniforms.uTime.value=e*.001,k+=(O-k)*(1-Math.exp(-t/.4)),x.uniforms.uMouse.value=k,y.render({scene:S}),P||(P=!0,b.canvas.style.opacity=`1`),E.sample(e)},I=r(),L=()=>{cancelAnimationFrame(o),!document.hidden&&!w&&!I&&(o=requestAnimationFrame(F))};L(),document.addEventListener(`visibilitychange`,L);let R=l(e=>{I=e,L()});f=()=>{R(),cancelAnimationFrame(o),window.removeEventListener(`resize`,D),window.removeEventListener(`pointermove`,j),document.removeEventListener(`visibilitychange`,L),b.getExtension(`WEBGL_lose_context`)?.loseContext(),b.canvas.remove(),t.current=null}})(),()=>{s=!0,f?.()}},[]),(0,m.jsx)(`div`,{ref:e,"aria-hidden":`true`,className:`absolute inset-0`})}export{y as default};