var Se=Object.defineProperty;var Ae=(a,e,t)=>e in a?Se(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var l=(a,e,t)=>Ae(a,typeof e!="symbol"?e+"":e,t);import{C as c,a as Te,T as ae,M as C,b as G,c as V,H as He,d as ne,L as Re,V as O,U as se,e as _e,S as j,f as ze,R as je,g as Oe,h as Ne,A as ge,i as De,I as We,j as Fe,k as Ve,l as Ye,J as N,m as Be,P as Ue,n as ve,o as qe}from"./cesium-CWgI4Np_.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();const Z="/HLF/",Xe=Z.endsWith("/")?Z:Z+"/",Je=Xe+"cesium/";window.CESIUM_BASE_URL=Je;const Q={longitude:-74.04145021,latitude:4.70207636,height:2572},ee={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},U={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},X={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},Ke=a=>a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2,we=-1.5533,ye=-.012,$e=4200,Ge=6,xe=1.7;class Ze{constructor(e){l(this,"viewer");l(this,"canvas");l(this,"pivot",new c);l(this,"heading",.5);l(this,"pitch",-.6);l(this,"range",1200);l(this,"targetPivot",new c);l(this,"targetHeading",.5);l(this,"targetPitch",-.6);l(this,"targetRange",1200);l(this,"damping",9);l(this,"drag",null);l(this,"pointers",new Map);l(this,"pinch",null);l(this,"lastTap",0);l(this,"keys",new Set);l(this,"tween",null);l(this,"fov",Te.toRadians(48));l(this,"walking",!1);l(this,"eye",new c);l(this,"eyeTarget",new c);l(this,"wHeading",0);l(this,"wPitch",0);l(this,"wHeadingT",0);l(this,"wPitchT",0);l(this,"onPick",null);l(this,"onModeChange",null);l(this,"groundHeight",null);this.viewer=e,this.canvas=e.scene.canvas,e.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:c.clone(this.targetPivot)}}setPivot(e,t=!0){if(t){const i=c.clone(this.viewer.camera.positionWC),o=c.subtract(i,e,new c),n=c.magnitude(o),s=ae.eastNorthUpToFixedFrame(e),h=C.inverseTransformation(s,new C),p=C.multiplyByPointAsVector(h,o,new c);if(n>1){const v=-Math.asin(Math.max(-1,Math.min(1,p.z/n)));if(v<ye&&v>we){let u=Math.atan2(-p.x,-p.y);for(;u-this.heading>Math.PI;)u-=Math.PI*2;for(;u-this.heading<-Math.PI;)u+=Math.PI*2;this.heading=this.targetHeading=u,this.pitch=this.targetPitch=v,this.range=this.targetRange=this.clamp(n),c.clone(e,this.pivot)}}}this.targetPivot=c.clone(e),this.tween=null}bind(){const e=this.canvas;e.style.touchAction="none",e.addEventListener("pointerdown",i=>{if(e.setPointerCapture(i.pointerId),this.pointers.set(i.pointerId,{x:i.offsetX,y:i.offsetY}),this.pointers.size===2){const[o,n]=[...this.pointers.values()];this.pinch={distance:Math.hypot(o.x-n.x,o.y-n.y),range:this.targetRange,cx:(o.x+n.x)/2,cy:(o.y+n.y)/2},this.drag=null;return}i.button===2||i.button===1||i.shiftKey?this.drag={id:i.pointerId,x:i.offsetX,y:i.offsetY,mode:"pan",moved:!1}:i.button===0&&(this.drag={id:i.pointerId,x:i.offsetX,y:i.offsetY,mode:"orbit",moved:!1}),this.tween=null}),e.addEventListener("pointermove",i=>{if(!this.pointers.has(i.pointerId))return;if(this.pointers.set(i.pointerId,{x:i.offsetX,y:i.offsetY}),this.pointers.size===2&&this.pinch){const[s,h]=[...this.pointers.values()],p=Math.hypot(s.x-h.x,s.y-h.y),v=(s.x+h.x)/2,u=(s.y+h.y)/2;this.walking?this.walk((this.pinch.cy-u)*.06,0):(p>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/p)),this.pan(this.pinch.cx-v,u-this.pinch.cy)),this.pinch.cx=v,this.pinch.cy=u;return}if(!this.drag||i.pointerId!==this.drag.id)return;const o=i.offsetX-this.drag.x,n=i.offsetY-this.drag.y;this.drag.x=i.offsetX,this.drag.y=i.offsetY,Math.abs(o)+Math.abs(n)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=o*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+n*.0028))):this.walk(n*.05,-o*.05):this.drag.mode==="orbit"?(this.targetHeading-=o*.0042,this.targetPitch=this.clampPitch(this.targetPitch-n*.0034)):this.pan(-o,n)});const t=i=>{if(this.pointers.delete(i.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&i.pointerId===this.drag.id){const o=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,o&&i.type==="pointerup"){const n=new G(i.offsetX,i.offsetY),s=performance.now();if(i.pointerType!=="mouse"&&s-this.lastTap<320){this.lastTap=0,this.focusAt(n);return}this.lastTap=s;const h=this.pickWorld(n);h&&!this.walking&&this.setPivot(h,!0),this.onPick?.(h)}}};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("contextmenu",i=>i.preventDefault()),e.addEventListener("wheel",i=>{i.preventDefault(),this.tween=null;const o=i.deltaMode===1?16:i.deltaMode===2?100:1,n=i.deltaY*o;if(this.walking){this.walk(-n*.02,0);return}const s=Math.exp(Math.max(-.45,Math.min(.45,n*.0016))),h=this.pickWorld(new G(i.offsetX,i.offsetY)),p=this.clamp(this.targetRange*s);if(h&&s<1){const v=Math.min(.45,(this.targetRange-p)/this.targetRange)*.8,u=c.subtract(h,this.targetPivot,new c),w=c.magnitude(u);if(w>1){const L=Math.min(w,this.targetRange)*v/w;c.add(this.targetPivot,c.multiplyByScalar(u,L,u),this.targetPivot)}}this.targetRange=p},{passive:!1}),e.addEventListener("dblclick",i=>{i.preventDefault(),this.focusAt(new G(i.offsetX,i.offsetY))}),addEventListener("keydown",i=>{i.target instanceof HTMLInputElement||(this.keys.add(i.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(i.code)&&i.preventDefault())}),addEventListener("keyup",i=>this.keys.delete(i.code)),addEventListener("blur",()=>this.keys.clear())}clamp(e,t=Ge,i=$e){return Math.max(t,Math.min(i,e))}clampPitch(e){return Math.max(we,Math.min(ye,e))}moveHorizontal(e,t,i,o){const n=ae.eastNorthUpToFixedFrame(e),s=new c(Math.sin(t)*i+Math.cos(t)*o,Math.cos(t)*i-Math.sin(t)*o,0);C.multiplyByPoint(n,s,e)}pan(e,t){const i=this.canvas.clientHeight||1,o=2*this.range*Math.tan(this.fov/2)/i,n=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,t*o/n,e*o),this.tween=null}walk(e,t){this.moveHorizontal(this.eyeTarget,this.wHeading,e,t),this.snapEye()}snapEye(){const e=V.fromCartesian(this.eyeTarget),t=this.groundHeight?.(e);t!==void 0&&Number.isFinite(t)&&(e.height=t+xe,V.toCartesian(e,void 0,this.eyeTarget))}pickWorld(e){const t=this.viewer.scene;let i;if(t.pickPositionSupported&&t.pick(e,4,4)&&(i=t.pickPosition(e)),!i){const o=t.camera.getPickRay(e);o&&(i=t.globe.pick(o,t)??void 0)}return i??null}focusAt(e){const t=this.pickWorld(e);if(t){if(this.walking){c.clone(t,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:t,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(e,t=2){this.walking&&this.exitWalk(!1);const i={pivot:e.pivot??c.clone(this.targetPivot),heading:e.heading??this.targetHeading,pitch:e.pitch??this.targetPitch,range:e.range??this.targetRange};let o=i.heading;for(;o-this.targetHeading>Math.PI;)o-=Math.PI*2;for(;o-this.targetHeading<-Math.PI;)o+=Math.PI*2;if(i.heading=o,t<=.02){this.tween=null,this.targetPivot=c.clone(i.pivot),this.pivot=c.clone(i.pivot),this.heading=this.targetHeading=i.heading,this.pitch=this.targetPitch=i.pitch,this.range=this.targetRange=i.range;return}this.tween={from:{pivot:c.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:i,start:performance.now(),duration:t*1e3}}enterWalk(e){c.clone(e??this.targetPivot,this.eyeTarget),this.snapEye(),c.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(e=!0){if(!this.walking)return;this.walking=!1;const t=V.fromCartesian(this.eyeTarget);t.height-=xe-1;const i=V.toCartesian(t);this.pivot=c.clone(i),this.targetPivot=i,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,e?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(e){if(!this.keys.size)return;const t=this.keys,i=t.has("ShiftLeft")||t.has("ShiftRight")?3:1;let o=0,n=0;(t.has("KeyW")||t.has("ArrowUp"))&&(o+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(o-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(n+=1),(t.has("KeyA")||t.has("ArrowLeft"))&&(n-=1);let s=0;if(t.has("KeyQ")&&(s+=1),t.has("KeyE")&&(s-=1),this.walking){s&&(this.wHeadingT-=s*1.2*e),(o||n)&&this.walk(o*4.2*i*e,n*3.4*i*e);return}if(s&&(this.targetHeading+=s*.9*e,this.tween=null),(t.has("PageUp")||t.has("Equal")||t.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*e))),(t.has("PageDown")||t.has("Minus")||t.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*e))),t.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*e)),t.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*e)),!o&&!n)return;const h=Math.max(8,this.range*.6)*i*e;this.moveHorizontal(this.targetPivot,this.heading,o*h,n*h),this.tween=null}update(e){this.updateKeys(e);const t=1-Math.exp(-this.damping*e);if(this.walking){c.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*e),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*t,this.wPitch+=(this.wPitchT-this.wPitch)*t,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const i=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),o=Ke(i),{from:n,to:s}=this.tween;c.lerp(n.pivot,s.pivot,o,this.targetPivot),this.targetHeading=n.heading+(s.heading-n.heading)*o,this.targetPitch=n.pitch+(s.pitch-n.pitch)*o,this.targetRange=Math.exp(Math.log(n.range)+(Math.log(s.range)-Math.log(n.range))*o),i>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*t,this.pitch+=(this.targetPitch-this.pitch)*t,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*t),c.lerp(this.pivot,this.targetPivot,t,this.pivot),this.viewer.camera.lookAt(this.pivot,new He(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(C.IDENTITY)}}function Qe(){return new ne({uniforms:{uNight:{type:se.FLOAT,value:0}},varyings:{vPosM:O.VEC3,vNrmM:O.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vNrmM = vsInput.attributes.normalMC;
      }
    `,fragmentShaderText:`
      float h11(float n) { return fract(sin(n * 127.1 + 311.7) * 43758.5453); }
      float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vnoise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float fbm(vec2 p) { return 0.55 * vnoise(p) + 0.3 * vnoise(p * 2.3) + 0.15 * vnoise(p * 5.1); }
      // rectángulo suavizado en una celda 0..1
      float box(vec2 f, vec2 lo, vec2 hi, vec2 aa) {
        vec2 a = smoothstep(lo - aa, lo + aa, f);
        vec2 b = 1.0 - smoothstep(hi - aa, hi + aa, f);
        return a.x * a.y * b.x * b.y;
      }

      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec4 vc = fsInput.attributes.color_0;
        vec2 uv = fsInput.attributes.texCoord_0;
        float rnd = vc.r;
        float rnd2 = vc.a;
        float pisos = max(1.0, floor(vc.g * 32.0 + 0.5));
        float tipo = vc.b;

        vec3 viewDir = normalize(-fsInput.attributes.positionEC);
        vec3 nEC = normalize(material.normalEC);
        float ndv = clamp(abs(dot(nEC, viewDir)), 0.0, 1.0);
        float fres = pow(1.0 - ndv, 5.0);

        vec3 col;
        float rough = 0.86;
        vec3 spec = vec3(0.04);
        vec3 emis = vec3(0.0);
        float occ = 1.0;

        if (tipo > 0.9) {
          /* ---------- cubierta plana ---------- */
          float n = fbm(uv * 0.35);
          float fine = vnoise(uv * 3.1);
          vec3 concreto = mix(vec3(0.36, 0.36, 0.35), vec3(0.50, 0.49, 0.47), rnd2);
          vec3 manto = mix(vec3(0.30, 0.30, 0.31), vec3(0.42, 0.40, 0.38), rnd);
          vec3 barro = mix(vec3(0.52, 0.25, 0.16), vec3(0.62, 0.33, 0.21), rnd2);
          col = mix(concreto, manto, step(0.5, fract(rnd * 7.31)));
          // casas bajas: buena parte con teja de barro, como el sector real
          float esTeja = step(pisos, 2.5) * step(0.42, fract(rnd * 3.17));
          float hilada = 0.82 + 0.18 * smoothstep(0.0, 0.5, abs(fract((uv.x * (0.3 + rnd2) + uv.y) * 3.2) - 0.5));
          col = mix(col, barro * hilada, esTeja);
          col *= 0.80 + 0.32 * n;
          col *= 0.94 + 0.10 * fine;
          // manchas de agua y juntas de impermeabilización
          float junta = smoothstep(0.03, 0.0, abs(fract(uv.x / 6.0 + rnd) - 0.5) - 0.47) * (1.0 - esTeja);
          col *= 1.0 - 0.14 * junta;
          rough = mix(0.9, 0.78, esTeja);
        } else if (tipo > 0.65) {
          /* ---------- alero ---------- */
          col = vec3(0.72, 0.68, 0.61) * (0.9 + 0.12 * vnoise(vPosM.xz * 1.5));
          rough = 0.8;
        } else if (tipo > 0.3) {
          /* ---------- teja de barro del hotel ---------- */
          vec2 t = uv * vec2(3.0, 2.6);                 // ~33 cm de canal, ~38 cm de hilada
          float canal = abs(fract(t.x) - 0.5) * 2.0;    // 0 lomo, 1 canal
          float hil = fract(t.y);
          float id = h21(floor(t));
          vec3 a = vec3(0.60, 0.29, 0.18), b = vec3(0.71, 0.39, 0.24), c = vec3(0.47, 0.22, 0.15);
          col = mix(a, b, id);
          col = mix(col, c, smoothstep(0.75, 1.0, h21(floor(t) + 7.3)));
          col *= 0.62 + 0.38 * (1.0 - canal * canal);   // sombra en el canal
          col *= 0.86 + 0.14 * smoothstep(0.0, 0.12, hil); // borde de cada teja
          col *= 0.86 + 0.26 * fbm(vPosM.xz * 0.22);    // pátina
          rough = 0.84;
          // relieve: inclina la normal según el lomo
          float bump = (fract(t.x) - 0.5) * 1.1;
          vec3 tx = normalize(cross(nEC, vec3(0.0, 1.0, 0.0)) + 1e-4);
          material.normalEC = normalize(nEC + tx * bump * (1.0 - canal));
        } else {
          /* ---------- muro ---------- */
          float torre = step(8.5, pisos);
          float sel = fract(rnd * 5.37);
          // paleta del sector: ladrillo a la vista, pañete claro, concreto, piedra
          vec3 ladrillo = mix(vec3(0.50, 0.24, 0.15), vec3(0.63, 0.34, 0.21), rnd2);
          vec3 ladrOsc = mix(vec3(0.36, 0.19, 0.14), vec3(0.45, 0.24, 0.17), rnd2);
          vec3 panete = mix(vec3(0.80, 0.78, 0.72), vec3(0.90, 0.88, 0.84), rnd2);
          vec3 concreto = mix(vec3(0.52, 0.52, 0.50), vec3(0.66, 0.65, 0.62), rnd2);
          vec3 arena = mix(vec3(0.70, 0.62, 0.50), vec3(0.78, 0.71, 0.60), rnd2);
          vec3 wall = ladrillo;
          float esLadrillo = 1.0;
          if (sel > 0.52) { wall = panete; esLadrillo = 0.0; }
          if (sel > 0.72) { wall = concreto; esLadrillo = 0.0; }
          if (sel > 0.84) { wall = arena; esLadrillo = 0.0; }
          if (sel > 0.93) { wall = ladrOsc; esLadrillo = 1.0; }
          float cortina = torre * step(0.62, rnd2);     // torres con muro cortina

          float v = uv.y;
          float piso = floor(v);
          vec2 f = vec2(fract(uv.x), fract(v));
          vec2 aa = clamp(fwidth(vec2(uv.x, v)) * 1.2, vec2(0.004), vec2(0.5));
          float lejos = clamp(max(aa.x, aa.y) * 3.0, 0.0, 1.0);   // 1 = muy lejos: se promedia

          float enCuerpo = step(0.0, v) * (1.0 - step(pisos, v));
          float bajo = step(0.0, v) * (1.0 - step(1.0, v));       // primer piso
          float zocalo = 1.0 - step(0.0, v);
          float remate = step(pisos, v);

          // proporciones de vano por edificio
          float ww = mix(0.50, 0.78, fract(rnd * 9.7));
          float wh0 = mix(0.26, 0.36, fract(rnd * 3.3));
          float wh1 = mix(0.80, 0.90, fract(rnd * 6.1));
          ww = mix(ww, 0.94, cortina); wh0 = mix(wh0, 0.06, cortina); wh1 = mix(wh1, 0.97, cortina);
          // locales en primer piso de los edificios altos
          float local = bajo * step(3.5, pisos);
          ww = mix(ww, 0.88, local); wh0 = mix(wh0, 0.05, local); wh1 = mix(wh1, 0.84, local);

          vec2 lo = vec2(0.5 - ww * 0.5, wh0), hi = vec2(0.5 + ww * 0.5, wh1);
          float vano = box(f, lo, hi, aa) * enCuerpo;
          float marco = box(f, lo - vec2(0.022, 0.03), hi + vec2(0.022, 0.03), aa) * enCuerpo - vano;
          // parteluces
          float parte = (1.0 - smoothstep(0.0, 0.012 + aa.x, abs(f.x - 0.5))) * step(0.6, ww);
          parte = max(parte, (1.0 - smoothstep(0.0, 0.012 + aa.y, abs(f.y - mix(wh0, wh1, 0.68)))) * (1.0 - cortina));
          parte *= vano * (1.0 - lejos);

          // ---- muro ----
          vec2 wp = vec2(uv.x * 3.3, v * 3.0);          // metros aproximados sobre el paño
          float grano = fbm(wp * 0.6 + rnd * 40.0);
          col = wall * (0.86 + 0.26 * grano);
          // hiladas de ladrillo (se desvanecen con la distancia para no hacer muaré)
          float hil = fract(wp.y / 0.075);
          float trab = fract(wp.x / 0.25 + step(1.0, mod(floor(wp.y / 0.075), 2.0)) * 0.5);
          float junta = max(1.0 - smoothstep(0.0, 0.16, hil), 1.0 - smoothstep(0.0, 0.06, trab));
          float cerca = 1.0 - smoothstep(0.004, 0.022, fwidth(wp.y));
          col = mix(col, col * vec3(0.80, 0.78, 0.76), junta * esLadrillo * cerca * 0.85);
          col *= mix(1.0, 0.90 + 0.2 * h21(floor(vec2(wp.x / 0.25, wp.y / 0.075))), esLadrillo * cerca);
          // placas de entrepiso y dinteles
          float placa = (1.0 - smoothstep(0.0, 0.035 + aa.y, f.y)) * enCuerpo * step(0.5, v);
          col = mix(col, mix(concreto, panete, 0.4) * 0.92, placa * mix(0.75, 0.25, esLadrillo * (1.0 - torre)));
          // escurrimientos bajo los vanos y suciedad en la base
          float chorreo = smoothstep(wh0, wh0 - 0.22, f.y) * box(f, vec2(lo.x, -1.0), vec2(hi.x, 2.0), aa) * enCuerpo;
          col *= 1.0 - 0.10 * chorreo * vnoise(vec2(uv.x * 9.0, 0.0));
          col *= mix(1.0, 0.80, smoothstep(0.9, 0.0, v) * (1.0 - zocalo));
          // zócalo y remate
          col = mix(col, vec3(0.30, 0.30, 0.30) * (0.85 + 0.3 * grano), zocalo);
          col = mix(col, mix(wall, concreto, 0.55) * 1.04, remate * 0.8);
          col = mix(col, col * 0.72, remate * (1.0 - smoothstep(0.0, 0.05, v - pisos)));
          rough = mix(0.9, 0.82, esLadrillo);

          // ---- marco ----
          vec3 cMarco = mix(vec3(0.16, 0.16, 0.17), vec3(0.86, 0.86, 0.84), step(0.55, fract(rnd * 13.7)));
          col = mix(col, cMarco, clamp(marco, 0.0, 1.0) * (1.0 - cortina * 0.6));

          // ---- vidrio ----
          vec2 celda = vec2(floor(uv.x), piso);
          float wid = h21(celda + rnd * 91.0);
          vec3 cielo = mix(vec3(0.62, 0.72, 0.84), vec3(0.30, 0.47, 0.72), clamp(reflect(-viewDir, nEC).y * 0.5 + 0.5, 0.0, 1.0));
          cielo = mix(cielo, vec3(0.02, 0.03, 0.06), uNight);
          vec3 tinte = mix(vec3(0.045, 0.065, 0.085), vec3(0.03, 0.075, 0.07), fract(rnd * 2.9));
          tinte = mix(tinte, vec3(0.08, 0.10, 0.13), cortina);
          // interior: cortinas y persianas distintas por ventana
          float cortinaTela = step(0.55, wid) * (1.0 - cortina) * (1.0 - local);
          float baja = mix(0.25, 0.95, h21(celda + 3.1));
          float tela = cortinaTela * step((f.y - wh0) / max(0.01, wh1 - wh0), baja);
          vec3 interior = mix(tinte, mix(vec3(0.42, 0.40, 0.36), vec3(0.62, 0.60, 0.55), h21(celda + 9.4)), tela * 0.8);
          // vitrina iluminada de los locales
          interior = mix(interior, vec3(0.34, 0.30, 0.24) * (0.6 + 0.8 * h21(celda + 1.7)), local * 0.75);
          vec3 vidrio = mix(interior, cielo, clamp(0.10 + 0.72 * fres, 0.0, 1.0));
          vidrio = mix(vidrio, cMarco * 0.9, parte);
          // lejos: el paño se resuelve como promedio de muro y vidrio, sin parpadeo
          col = mix(col, vidrio, vano);
          rough = mix(rough, 0.07, vano * (1.0 - parte));
          spec = mix(spec, vec3(0.06), vano);

          // ---- noche: ventanas encendidas ----
          float on = step(0.52, h21(celda + 17.0 + rnd * 53.0));
          on = mix(on, step(0.25, wid), local);
          vec3 luz = mix(vec3(1.0, 0.66, 0.34), vec3(1.0, 0.90, 0.74), h21(celda + 5.5));
          luz = mix(luz, vec3(0.82, 0.90, 1.0), step(0.82, wid) * torre);
          emis = luz * on * vano * (1.0 - parte) * (0.55 + 0.5 * (1.0 - tela)) * uNight * 1.25;
          // oclusión de esquina con la rasante
          occ = mix(0.72, 1.0, smoothstep(-0.4, 0.9, v));
        }

        material.diffuse = col * mix(1.0, 0.42, uNight);
        material.roughness = rough;
        material.specular = spec;
        material.occlusion = occ;
        material.emissive = emis;
      }
    `})}function et(){return new ne({uniforms:{uNight:{type:se.FLOAT,value:0}},varyings:{vTreeP:O.VEC3,vTreeW:O.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vTreeP = vsInput.attributes.positionMC;
        vTreeW = (czm_model * vec4(vsOutput.positionMC, 1.0)).xyz;
      }
    `,fragmentShaderText:`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // variación de tono por árbol (posición en el mundo)
        float id = fract(sin(dot(floor(vTreeW.xy * 0.13) + floor(vTreeW.z * 0.13), vec2(12.9898, 78.233))) * 43758.5453);
        c *= mix(vec3(0.84, 0.92, 0.80), vec3(1.06, 1.08, 0.92), id);
        // más oscuro abajo y hacia el tronco, más claro en la copa exterior
        float r = length(vTreeP.xz);
        float copa = smoothstep(0.0, 4.0, r + vTreeP.y * 0.35);
        c *= mix(0.62, 1.08, copa);
        material.diffuse = c * mix(1.0, 0.30, uNight);
        material.roughness = 0.9;
        material.specular = vec3(0.02);
        // algo de luz atraviesa la hoja: evita copas negras a contraluz
        material.emissive = c * 0.10 * (1.0 - uNight);
        material.occlusion = mix(0.75, 1.0, copa);
      }
    `})}function tt(){return new ne({uniforms:{uNight:{type:se.FLOAT,value:0}},lightingModel:Re.UNLIT,varyings:{vCityPos:O.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vCityPos = vsInput.attributes.positionMC;
      }
    `,fragmentShaderText:`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float grain = fract(sin(dot(floor(vCityPos.xz * 0.35), vec2(12.9898, 78.233))) * 43758.5453);
        vec3 c = material.diffuse;
        vec3 night = c * vec3(0.15, 0.18, 0.25);
        night += vec3(1.0, 0.72, 0.40) * step(0.968, grain) * 0.30;
        material.diffuse = mix(c, night, uNight);
      }
    `})}function Ce(){return ae.eastNorthUpToFixedFrame(c.fromDegrees(Q.longitude,Q.latitude,Q.height))}function D(a,e,t,i=Ce()){return C.multiplyByPoint(i,new c(a,e,t),new c)}const it={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function at(a,e,t){let i=!1;for(let o=0,n=t.length-1;o<t.length;n=o++){const[s,h]=t[o],[p,v]=t[n];h>e!=v>e&&a<(p-s)*(e-h)/(v-h)+s&&(i=!i)}return i}function ot(a,e,t){let i=1/0;for(let o=0,n=t.length-1;o<t.length;n=o++){const[s,h]=t[n],[p,v]=t[o],u=p-s,w=v-h,L=Math.max(0,Math.min(1,((a-s)*u+(e-h)*w)/(u*u+w*w||1)));i=Math.min(i,Math.hypot(a-s-L*u,e-h-L*w))}return i}async function nt(a,e,t){const i=a.scene,o=Ce(),n=C.inverseTransformation(o,new C),s=X.secciones;e("Contexto urbano",.08);const[h,p,v]=await Promise.all([fetch(s+"recorte.json").then(r=>r.json()),fetch(s+"edificios.json").then(r=>r.json()),fetch(s+"arboles.json").then(r=>r.json())]),u=tt();let w=null;try{w=await _e.fromUrl(X.googleTiles,{maximumScreenSpaceError:14,shadows:j.RECEIVE_ONLY,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024});const r=new ze({positions:c.fromDegreesArray(h.clip.flat())}),d=r.computeRectangle();r.computeRectangle=k=>je.clone(d,k),w.clippingPolygons=new Oe({polygons:[r]}),w.customShader=u,i.primitives.add(w)}catch(r){console.warn("Tiles de Google no disponibles",r)}const L=[-236,330],H=[];for(const r of p.secciones)H.push({key:r.key,file:r.file,kind:"edificios",label:r.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${r.key}`,dist:r.key==="Hotel"?-2:Math.hypot(r.c[0]-L[0],r.c[1]-L[1])});H.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),H.sort((r,d)=>r.dist-d.dist);const he=v.secciones.map(r=>({key:r.key,file:r.file,kind:"arboles",label:it[r.key]??"Vegetación",dist:0})),R=[...H.slice(0,4),...he.slice(0,3),...H.slice(4,9),...he.slice(3),...H.slice(9)],de=Qe(),fe=et(),ue=[],z={total:R.length,loaded:0,failed:[]},pe=async r=>{try{const d=await Ne.fromGltfAsync({url:s+r.file,modelMatrix:o,upAxis:ge.Y,forwardAxis:ge.X,shadows:r.kind==="arboles"?j.CAST_ONLY:j.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:r.kind!=="arboles"});d.customShader=r.kind==="arboles"?fe:de,i.primitives.add(d),r.kind==="arboles"&&ue.push(d),await new Promise(k=>{if(d.ready)return k();const F=d.readyEvent.addEventListener(()=>{F(),k()});setTimeout(k,2e4)})}catch(d){console.error("Sección no cargada",r.file,d),z.failed.push(r.file)}z.loaded++,t?.(z.loaded,z.total,r.label)},$=7;for(let r=0;r<Math.min($,R.length);r++)e(R[r].label,.2+.75*r/$),await pe(R[r]);const Ie=(async()=>{for(let r=$;r<R.length;r++)await pe(R[r]),await new Promise(d=>setTimeout(d,60))})();return{matrix:o,inverse:n,tileset:w,buildings:p.edificios,treeCount:v.total,sections:z,done:Ie,setNight(r){u.setUniform("uNight",r),de.setUniform("uNight",r),fe.setUniform("uNight",r)},setTreesVisible(r){for(const d of ue)d.show=r},buildingAt(r){const d=C.multiplyByPoint(n,r,new c);let k=null,F=1.2;for(const P of p.edificios){if(d.x<P.bb[0]-1.5||d.x>P.bb[2]+1.5||d.y<P.bb[1]-1.5||d.y>P.bb[3]+1.5||d.z>P.b+P.h+2.5)continue;if(at(d.x,d.y,P.r))return P;const me=ot(d.x,d.y,P.r);me<F&&(F=me,k=P)}return k}}}qe.defaultAccessToken=X.ionToken;const f=a=>document.getElementById(a),re=f("cesiumContainer"),be=f("loading"),st=f("loadBar"),ke=f("loadLabel"),rt=f("loadPct");function te(a,e){ke.textContent=a;const t=Math.round(Math.max(0,Math.min(1,e))*100);st.style.width=t+"%",rt.textContent=t+"%"}const x=new De(re,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:j.RECEIVE_ONLY,terrain:Ve.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:We.fromProviderAsync(Fe.fromAssetId(X.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),g=x.scene;g.globe.enableLighting=!0;g.globe.showGroundAtmosphere=!0;g.globe.depthTestAgainstTerrain=!0;g.globe.maximumScreenSpaceError=1.5;g.fog.enabled=!0;g.fog.density=22e-5;g.fog.minimumBrightness=.04;g.highDynamicRange=!0;g.msaaSamples=4;g.postProcessStages.fxaa.enabled=!0;g.screenSpaceCameraController.enableCollisionDetection=!1;g.light=new Ye({intensity:2.4});const I=x.shadowMap;I.softShadows=!0;I.size=2048;I.maximumDistance=900;I.darkness=.42;I.normalOffset=!0;const S=g.postProcessStages.ambientOcclusion;S.enabled=!0;S.uniforms.intensity=2.2;S.uniforms.bias=.12;S.uniforms.lengthCap=.28;S.uniforms.stepSize=1.6;S.uniforms.blurStepSize=.9;x.camera.frustum.fov=Te.toRadians(48);let M=1;function J(){const a=Math.min(window.devicePixelRatio||1,2);x.resolutionScale=a*(M>=1?1:M>=.5?.8:.62),I.size=M>=1?2048:1024,I.softShadows=M>=.5,S.enabled=M>=1,g.msaaSamples=M>=1?4:M>=.5?2:1}J();x.clock.shouldAnimate=!1;x.clock.currentTime=N.fromIso8601("2026-06-21T10:10:00-05:00");const m=new Ze(x),ce=a=>D(ee[a].e,ee[a].n,ee[a].u),ct=ce("hotel");m.flyTo({pivot:ct,heading:U.general.heading,pitch:U.general.pitch,range:U.general.range*1.8},0);m.groundHeight=a=>g.globe.getHeight(a);const lt=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,fog:22e-5,label:"10:10",sun:2.4},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.1,fog:3e-4,label:"16:50",sun:2.6},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,fog:2e-4,label:"19:35",sun:1}];let T=null,q=0,E=null;const ht=a=>N.toDate(N.fromIso8601(a)).getTime();function dt(a){E={from:N.toDate(x.clock.currentTime).getTime(),to:ht(a.iso),start:performance.now(),dur:1600},g.fog.density=a.fog,g.light.intensity=a.sun;const t=q,i=performance.now(),o=()=>{const s=Math.min(1,(performance.now()-i)/1400);q=t+(a.night-t)*(s*s*(3-2*s)),T?.setNight(q),s<1&&requestAnimationFrame(o)};requestAnimationFrame(o),document.querySelectorAll("[data-light]").forEach(s=>s.classList.toggle("on",s.dataset.light===a.id));const n=f("clockLabel");n&&(n.textContent=a.label)}document.querySelectorAll("[data-light]").forEach(a=>{a.addEventListener("click",()=>{const e=lt.find(t=>t.id===a.dataset.light);e&&dt(e)})});let _=!1;const oe=f("btnOrbit"),le=f("btnPedestrian");function A(){_=!1,oe?.classList.remove("on")}function W(a,e=2){A();const t=U[a];m.flyTo({pivot:ce(t.place),heading:t.heading,pitch:t.pitch,range:t.range},e)}f("btnHome")?.addEventListener("click",()=>W("general",2.2));f("btnAerial")?.addEventListener("click",()=>W("aerial"));f("btnArch")?.addEventListener("click",()=>W("arch"));le?.addEventListener("click",()=>{A(),m.isWalking?m.exitWalk():m.enterWalk(b?Ee(b):void 0)});m.onModeChange=a=>{le?.classList.toggle("on",a);const e=f("hint");e&&a&&(e.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",e.classList.remove("fade"),setTimeout(()=>e.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(a=>{a.addEventListener("click",()=>{A();const e=a.dataset.place;m.flyTo({pivot:ce(e),range:e==="hotel"?300:520,pitch:-.5},2)})});oe?.addEventListener("click",()=>{_=!_,oe.classList.toggle("on",_),_&&m.isWalking&&m.exitWalk()});re.addEventListener("pointerdown",A);re.addEventListener("wheel",A,{passive:!0});addEventListener("keydown",a=>{a.code==="Escape"&&(m.isWalking?m.exitWalk():K(null)),(a.code==="KeyH"||a.code==="Home")&&W("general",2.2),a.code==="KeyP"&&le?.click()});let b=null,Y=null;const B=f("card");function ft(a){return D((a.bb[0]+a.bb[2])/2,(a.bb[1]+a.bb[3])/2,a.b+a.h*.5)}function Ee(a){return D((a.bb[0]+a.bb[2])/2,a.bb[1]-9,a.b)}function K(a){if(b=a,Y&&(x.entities.remove(Y),Y=null),!a||!T){B&&(B.hidden=!0);return}const e=a.r.map(([n,s])=>D(n,s,0,T.matrix)),t=2572+a.b-.5;Y=x.entities.add({polygon:{hierarchy:new Ue(e),height:t,extrudedHeight:t+a.h+2.2,material:ve.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:ve.fromCssColorString("#d7ebff"),shadows:j.DISABLED}});const i=a.s==="Hotel",o=Math.abs(a.r.reduce((n,s,h)=>{const p=a.r[(h+1)%a.r.length];return n+s[0]*p[1]-p[0]*s[1]},0)/2);f("cardKind").textContent=i?"Proyecto":`Sector ${a.s}`,f("cardTitle").textContent=i?"Hotel La Fontana":`Edificación ${a.id+1}`,f("cardData").innerHTML=`<dt>Pisos</dt><dd>${a.p}</dd><dt>Altura</dt><dd>${a.h.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(o).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(o*a.p).toLocaleString("es-CO")} m²</dd>`,B&&(B.hidden=!1)}m.onPick=a=>{T&&K(a?T.buildingAt(a):null)};f("cardClose")?.addEventListener("click",()=>K(null));f("cardFocus")?.addEventListener("click",()=>{if(!b)return;A();const a=Math.max(b.bb[2]-b.bb[0],b.bb[3]-b.bb[1],b.h);m.flyTo({pivot:ft(b),pitch:-.42,range:Math.max(60,a*2.1)},1.7)});f("cardWalk")?.addEventListener("click",()=>{b&&(A(),m.enterWalk(Ee(b)))});const ie=f("status"),Me=f("statusText");async function ut(){te("Contexto geográfico",.04),await new Promise(e=>setTimeout(e,30)),T=await nt(x,(e,t)=>te(e,t),(e,t,i)=>{!ie||!Me||(ie.hidden=!1,Me.textContent=e<t?`Cargando secciones ${e}/${t} · ${i}`:`Modelo completo · ${t} secciones`,e>=t&&setTimeout(()=>ie.classList.add("fade"),2600))}),T.setNight(q),te("Listo",1),W("general",2.4),be.classList.add("done"),setTimeout(()=>be.remove(),900);const a=f("hint");a&&setTimeout(()=>a.classList.add("fade"),9e3),window.__READY__=!0,T.done.then(()=>{window.__ALL__=!0})}const y={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Be,viewer:x,cam:m,getSite:()=>T,enuToWorld:D,select:K,stats:y,setQuality:a=>{M=a,J()}};ut().catch(a=>{console.error(a),ke.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(a?.message??a)});let Pe=performance.now();function Le(){const a=performance.now(),e=Math.min(.1,(a-Pe)/1e3);if(Pe=a,E){const t=Math.min(1,(a-E.start)/E.dur),i=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;x.clock.currentTime=N.fromDate(new Date(E.from+(E.to-E.from)*i)),t>=1&&(E=null)}_&&!m.isWalking&&m.flyTo({heading:m.state.heading+.16*e},0),m.update(e),y.frames++,a-y.t0>=2e3&&(y.fps=Math.round(y.frames*1e3/(a-y.t0)),y.frames=0,y.t0=a,window.__FPS__=y.fps,T&&document.visibilityState==="visible"&&(y.fps<20&&M>.25?++y.low>=2&&(M=M>=1?.5:.25,y.low=0,J()):y.low=0)),requestAnimationFrame(Le)}requestAnimationFrame(Le);addEventListener("resize",J);
