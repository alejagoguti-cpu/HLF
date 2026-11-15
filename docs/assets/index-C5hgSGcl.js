var _e=Object.defineProperty;var ze=(i,e,t)=>e in i?_e(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var h=(i,e,t)=>ze(i,typeof e!="symbol"?e+"":e,t);import{C as c,a as Le,T as oe,M as k,b as X,c as B,H as Re,d as se,L as Ne,U as z,V as O,e as De,f as Oe,g as Fe,h as Ve,S as F,i as je,R as We,j as Ue,k as Be,A as we,l as Ye,I as qe,m as Xe,n as Ke,o as Je,J as V,p as Ge,P as $e,q as ye,r as Ze}from"./cesium-D3uyyBRH.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();const Q="/HLF/",Qe=Q.endsWith("/")?Q:Q+"/",et=Qe+"cesium/";window.CESIUM_BASE_URL=et;const ee={longitude:-74.04145021,latitude:4.70207636,height:2572},te={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},K={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},G={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},tt=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,xe=-1.5533,be=-.012,it=4200,at=6,Me=1.7;class ot{constructor(e){h(this,"viewer");h(this,"canvas");h(this,"pivot",new c);h(this,"heading",.5);h(this,"pitch",-.6);h(this,"range",1200);h(this,"targetPivot",new c);h(this,"targetHeading",.5);h(this,"targetPitch",-.6);h(this,"targetRange",1200);h(this,"damping",9);h(this,"drag",null);h(this,"pointers",new Map);h(this,"pinch",null);h(this,"lastTap",0);h(this,"keys",new Set);h(this,"tween",null);h(this,"fov",Le.toRadians(48));h(this,"walking",!1);h(this,"eye",new c);h(this,"eyeTarget",new c);h(this,"wHeading",0);h(this,"wPitch",0);h(this,"wHeadingT",0);h(this,"wPitchT",0);h(this,"onPick",null);h(this,"onModeChange",null);h(this,"groundHeight",null);this.viewer=e,this.canvas=e.scene.canvas,e.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:c.clone(this.targetPivot)}}setPivot(e,t=!0){if(t){const a=c.clone(this.viewer.camera.positionWC),o=c.subtract(a,e,new c),n=c.magnitude(o),r=oe.eastNorthUpToFixedFrame(e),d=k.inverseTransformation(r,new k),g=k.multiplyByPointAsVector(d,o,new c);if(n>1){const v=-Math.asin(Math.max(-1,Math.min(1,g.z/n)));if(v<be&&v>xe){let u=Math.atan2(-g.x,-g.y);for(;u-this.heading>Math.PI;)u-=Math.PI*2;for(;u-this.heading<-Math.PI;)u+=Math.PI*2;this.heading=this.targetHeading=u,this.pitch=this.targetPitch=v,this.range=this.targetRange=this.clamp(n),c.clone(e,this.pivot)}}}this.targetPivot=c.clone(e),this.tween=null}bind(){const e=this.canvas;e.style.touchAction="none",e.addEventListener("pointerdown",a=>{if(e.setPointerCapture(a.pointerId),this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2){const[o,n]=[...this.pointers.values()];this.pinch={distance:Math.hypot(o.x-n.x,o.y-n.y),range:this.targetRange,cx:(o.x+n.x)/2,cy:(o.y+n.y)/2},this.drag=null;return}a.button===2||a.button===1||a.shiftKey?this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"pan",moved:!1}:a.button===0&&(this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"orbit",moved:!1}),this.tween=null}),e.addEventListener("pointermove",a=>{if(!this.pointers.has(a.pointerId))return;if(this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2&&this.pinch){const[r,d]=[...this.pointers.values()],g=Math.hypot(r.x-d.x,r.y-d.y),v=(r.x+d.x)/2,u=(r.y+d.y)/2;this.walking?this.walk((this.pinch.cy-u)*.06,0):(g>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/g)),this.pan(this.pinch.cx-v,u-this.pinch.cy)),this.pinch.cx=v,this.pinch.cy=u;return}if(!this.drag||a.pointerId!==this.drag.id)return;const o=a.offsetX-this.drag.x,n=a.offsetY-this.drag.y;this.drag.x=a.offsetX,this.drag.y=a.offsetY,Math.abs(o)+Math.abs(n)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=o*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+n*.0028))):this.walk(n*.05,-o*.05):this.drag.mode==="orbit"?(this.targetHeading-=o*.0042,this.targetPitch=this.clampPitch(this.targetPitch-n*.0034)):this.pan(-o,n)});const t=a=>{if(this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&a.pointerId===this.drag.id){const o=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,o&&a.type==="pointerup"){const n=new X(a.offsetX,a.offsetY),r=performance.now();if(a.pointerType!=="mouse"&&r-this.lastTap<320){this.lastTap=0,this.focusAt(n);return}this.lastTap=r;const d=this.pickWorld(n);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("contextmenu",a=>a.preventDefault()),e.addEventListener("wheel",a=>{a.preventDefault(),this.tween=null;const o=a.deltaMode===1?16:a.deltaMode===2?100:1,n=a.deltaY*o;if(this.walking){this.walk(-n*.02,0);return}const r=Math.exp(Math.max(-.45,Math.min(.45,n*.0016))),d=this.pickWorld(new X(a.offsetX,a.offsetY)),g=this.clamp(this.targetRange*r);if(d&&r<1){const v=Math.min(.45,(this.targetRange-g)/this.targetRange)*.8,u=c.subtract(d,this.targetPivot,new c),w=c.magnitude(u);if(w>1){const E=Math.min(w,this.targetRange)*v/w;c.add(this.targetPivot,c.multiplyByScalar(u,E,u),this.targetPivot)}}this.targetRange=g},{passive:!1}),e.addEventListener("dblclick",a=>{a.preventDefault(),this.focusAt(new X(a.offsetX,a.offsetY))}),addEventListener("keydown",a=>{a.target instanceof HTMLInputElement||(this.keys.add(a.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(a.code)&&a.preventDefault())}),addEventListener("keyup",a=>this.keys.delete(a.code)),addEventListener("blur",()=>this.keys.clear())}clamp(e,t=at,a=it){return Math.max(t,Math.min(a,e))}clampPitch(e){return Math.max(xe,Math.min(be,e))}moveHorizontal(e,t,a,o){const n=oe.eastNorthUpToFixedFrame(e),r=new c(Math.sin(t)*a+Math.cos(t)*o,Math.cos(t)*a-Math.sin(t)*o,0);k.multiplyByPoint(n,r,e)}pan(e,t){const a=this.canvas.clientHeight||1,o=2*this.range*Math.tan(this.fov/2)/a,n=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,t*o/n,e*o),this.tween=null}walk(e,t){this.moveHorizontal(this.eyeTarget,this.wHeading,e,t),this.snapEye()}snapEye(){const e=B.fromCartesian(this.eyeTarget),t=this.groundHeight?.(e);t!==void 0&&Number.isFinite(t)&&(e.height=t+Me,B.toCartesian(e,void 0,this.eyeTarget))}pickWorld(e){const t=this.viewer.scene;let a;if(t.pickPositionSupported&&t.pick(e,4,4)&&(a=t.pickPosition(e)),!a){const o=t.camera.getPickRay(e);o&&(a=t.globe.pick(o,t)??void 0)}return a??null}focusAt(e){const t=this.pickWorld(e);if(t){if(this.walking){c.clone(t,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:t,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(e,t=2){this.walking&&this.exitWalk(!1);const a={pivot:e.pivot??c.clone(this.targetPivot),heading:e.heading??this.targetHeading,pitch:e.pitch??this.targetPitch,range:e.range??this.targetRange};let o=a.heading;for(;o-this.targetHeading>Math.PI;)o-=Math.PI*2;for(;o-this.targetHeading<-Math.PI;)o+=Math.PI*2;if(a.heading=o,t<=.02){this.tween=null,this.targetPivot=c.clone(a.pivot),this.pivot=c.clone(a.pivot),this.heading=this.targetHeading=a.heading,this.pitch=this.targetPitch=a.pitch,this.range=this.targetRange=a.range;return}this.tween={from:{pivot:c.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:a,start:performance.now(),duration:t*1e3}}enterWalk(e){c.clone(e??this.targetPivot,this.eyeTarget),this.snapEye(),c.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(e=!0){if(!this.walking)return;this.walking=!1;const t=B.fromCartesian(this.eyeTarget);t.height-=Me-1;const a=B.toCartesian(t);this.pivot=c.clone(a),this.targetPivot=a,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,e?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(e){if(!this.keys.size)return;const t=this.keys,a=t.has("ShiftLeft")||t.has("ShiftRight")?3:1;let o=0,n=0;(t.has("KeyW")||t.has("ArrowUp"))&&(o+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(o-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(n+=1),(t.has("KeyA")||t.has("ArrowLeft"))&&(n-=1);let r=0;if(t.has("KeyQ")&&(r+=1),t.has("KeyE")&&(r-=1),this.walking){r&&(this.wHeadingT-=r*1.2*e),(o||n)&&this.walk(o*4.2*a*e,n*3.4*a*e);return}if(r&&(this.targetHeading+=r*.9*e,this.tween=null),(t.has("PageUp")||t.has("Equal")||t.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*e))),(t.has("PageDown")||t.has("Minus")||t.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*e))),t.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*e)),t.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*e)),!o&&!n)return;const d=Math.max(8,this.range*.6)*a*e;this.moveHorizontal(this.targetPivot,this.heading,o*d,n*d),this.tween=null}update(e){this.updateKeys(e);const t=1-Math.exp(-this.damping*e);if(this.walking){c.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*e),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*t,this.wPitch+=(this.wPitchT-this.wPitch)*t,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const a=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),o=tt(a),{from:n,to:r}=this.tween;c.lerp(n.pivot,r.pivot,o,this.targetPivot),this.targetHeading=n.heading+(r.heading-n.heading)*o,this.targetPitch=n.pitch+(r.pitch-n.pitch)*o,this.targetRange=Math.exp(Math.log(n.range)+(Math.log(r.range)-Math.log(n.range))*o),a>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*t,this.pitch+=(this.targetPitch-this.pitch)*t,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*t),c.lerp(this.pivot,this.targetPivot,t,this.pivot),this.viewer.camera.lookAt(this.pivot,new Re(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(k.IDENTITY)}}const re=`
  vec3 hlfHazeColor(float night) { return mix(vec3(0.70, 0.72, 0.74), vec3(0.03, 0.04, 0.07), night); }
  float hlfHaze(float d) { return clamp(1.0 - exp(-max(0.0, d - 500.0) * 0.00009), 0.0, 0.6); }
`;function nt(){return new se({uniforms:{uNight:{type:z.FLOAT,value:0}},varyings:{vPosM:O.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
      }
    `,fragmentShaderText:re+`
      float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vnoise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
      }
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
        float dist = length(fsInput.attributes.positionEC);
        float near = 1.0 - smoothstep(120.0, 420.0, dist);     // 1 cerca, 0 lejos

        vec3 col;
        float rough = 0.88;
        vec3 spec = vec3(0.04);
        vec3 emis = vec3(0.0);
        float occ = 1.0;

        if (tipo > 0.9) {
          /* ---------- cubierta plana: gris claro, como la losa real vista desde el aire ---------- */
          vec3 losa = mix(vec3(0.66, 0.64, 0.59), vec3(0.78, 0.76, 0.71), rnd2);
          vec3 manto = mix(vec3(0.56, 0.55, 0.52), vec3(0.66, 0.64, 0.60), rnd);
          vec3 barro = mix(vec3(0.62, 0.42, 0.33), vec3(0.70, 0.49, 0.38), rnd2);
          col = mix(losa, manto, step(0.62, fract(rnd * 7.31)));
          float esTeja = step(pisos, 2.5) * step(0.55, fract(rnd * 3.17));
          col = mix(col, barro, esTeja);
          col *= 0.90 + 0.16 * vnoise(uv * 0.3);
          if (near > 0.0) {
            float junta = smoothstep(0.03, 0.0, abs(fract(uv.x / 6.0 + rnd) - 0.5) - 0.47) * (1.0 - esTeja);
            float hilada = smoothstep(0.0, 0.5, abs(fract((uv.x * (0.3 + rnd2) + uv.y) * 3.2) - 0.5));
            col *= 1.0 - near * (0.10 * junta + 0.14 * esTeja * (1.0 - hilada));
            col *= 1.0 - near * 0.06 * (vnoise(uv * 3.1) - 0.5);
          }
        } else if (tipo > 0.65) {
          /* ---------- alero ---------- */
          col = vec3(0.74, 0.71, 0.66);
        } else if (tipo > 0.3) {
          /* ---------- teja de barro del hotel ---------- */
          vec2 t = uv * vec2(3.0, 2.6);                 // ~33 cm de canal, ~38 cm de hilada
          vec3 a = vec3(0.63, 0.40, 0.30), b = vec3(0.72, 0.49, 0.37), c = vec3(0.54, 0.34, 0.27);
          col = mix(a, b, vnoise(vPosM.xz * 0.35));
          if (near > 0.0) {
            float canal = abs(fract(t.x) - 0.5) * 2.0;
            float id = h21(floor(t));
            vec3 fino = mix(a, b, id);
            fino = mix(fino, c, smoothstep(0.78, 1.0, h21(floor(t) + 7.3)));
            fino *= 0.70 + 0.30 * (1.0 - canal * canal);
            fino *= 0.88 + 0.12 * smoothstep(0.0, 0.12, fract(t.y));
            col = mix(col * 0.9, fino, near);
          } else col *= 0.9;
          rough = 0.86;
        } else {
          /* ---------- muro ---------- */
          float torre = step(8.5, pisos);
          float sel = fract(rnd * 5.37);
          float hotel = step(0.06, tipo);
          vec3 ladrillo = mix(vec3(0.56, 0.31, 0.22), vec3(0.65, 0.39, 0.28), rnd2);
          vec3 ladrOsc = mix(vec3(0.44, 0.26, 0.20), vec3(0.51, 0.31, 0.24), rnd2);
          vec3 panete = mix(vec3(0.80, 0.79, 0.75), vec3(0.89, 0.88, 0.85), rnd2);
          vec3 concreto = mix(vec3(0.62, 0.62, 0.60), vec3(0.72, 0.71, 0.69), rnd2);
          vec3 arena = mix(vec3(0.74, 0.69, 0.60), vec3(0.80, 0.76, 0.68), rnd2);
          vec3 wall = ladrillo;
          float esLadrillo = 1.0;
          if (sel > 0.46) { wall = panete; esLadrillo = 0.0; }
          if (sel > 0.74) { wall = concreto; esLadrillo = 0.0; }
          if (sel > 0.86) { wall = arena; esLadrillo = 0.0; }
          if (sel > 0.94) { wall = ladrOsc; esLadrillo = 1.0; }
          if (hotel > 0.5) { wall = vec3(0.60, 0.34, 0.24); esLadrillo = 1.0; }   // Hotel La Fontana: ladrillo a la vista
          float cortina = torre * step(0.72, rnd2) * (1.0 - hotel);     // algunas torres con muro cortina

          float v = uv.y;
          vec2 f = vec2(fract(uv.x), fract(v));
          vec2 aa = clamp(fwidth(vec2(uv.x, v)) * 1.2, vec2(0.004), vec2(0.5));

          float enCuerpo = step(0.0, v) * (1.0 - step(pisos, v));
          float bajo = step(0.0, v) * (1.0 - step(1.0, v));
          float zocalo = 1.0 - step(0.0, v);
          float remate = step(pisos, v);

          float ww = mix(0.46, 0.72, fract(rnd * 9.7));
          float wh0 = mix(0.28, 0.38, fract(rnd * 3.3));
          float wh1 = mix(0.80, 0.90, fract(rnd * 6.1));
          ww = mix(ww, 0.92, cortina); wh0 = mix(wh0, 0.08, cortina); wh1 = mix(wh1, 0.96, cortina);
          if (hotel > 0.5) { ww = 0.52; wh0 = 0.30; wh1 = 0.86; }
          float local = bajo * step(3.5, pisos) * (1.0 - hotel);
          ww = mix(ww, 0.86, local); wh0 = mix(wh0, 0.06, local); wh1 = mix(wh1, 0.84, local);

          vec2 lo = vec2(0.5 - ww * 0.5, wh0), hi = vec2(0.5 + ww * 0.5, wh1);
          float vano = box(f, lo, hi, aa) * enCuerpo;

          col = wall * (0.93 + 0.12 * vnoise(vec2(uv.x * 1.7, v * 1.5) + rnd * 40.0));
          // placa de entrepiso
          float placa = (1.0 - smoothstep(0.0, 0.035 + aa.y, f.y)) * enCuerpo * step(0.5, v);
          col = mix(col, mix(concreto, panete, 0.5), placa * mix(0.7, 0.2, esLadrillo * (1.0 - torre)));
          col = mix(col, vec3(0.46, 0.46, 0.45), zocalo);
          col = mix(col, mix(wall, concreto, 0.5) * 1.03, remate * 0.7);

          vec3 cMarco = mix(vec3(0.30, 0.31, 0.32), vec3(0.88, 0.88, 0.86), max(hotel, step(0.5, fract(rnd * 13.7))));
          // vidrio: gris azulado suave, sin contraste duro
          vec3 tinte = mix(vec3(0.30, 0.32, 0.33), vec3(0.27, 0.30, 0.30), fract(rnd * 2.9));
          tinte = mix(tinte, vec3(0.40, 0.44, 0.47), cortina);
          vec3 vidrio = tinte;
          vec2 celda = vec2(floor(uv.x), floor(v));
          float wid = h21(celda + rnd * 91.0);
          float parte = 0.0;
          float tela = 0.0;

          if (near > 0.0) {
            vec3 viewDir = normalize(-fsInput.attributes.positionEC);
            vec3 nEC = normalize(material.normalEC);
            float fres = pow(1.0 - clamp(abs(dot(nEC, viewDir)), 0.0, 1.0), 5.0);
            // hiladas de ladrillo
            vec2 wp = vec2(uv.x * 3.3, v * 3.0);
            float cerca = (1.0 - smoothstep(0.004, 0.022, fwidth(wp.y))) * esLadrillo;
            if (cerca > 0.0) {
              float hil = fract(wp.y / 0.075);
              float trab = fract(wp.x / 0.25 + step(1.0, mod(floor(wp.y / 0.075), 2.0)) * 0.5);
              float junta = max(1.0 - smoothstep(0.0, 0.16, hil), 1.0 - smoothstep(0.0, 0.06, trab));
              col = mix(col, col * vec3(0.86, 0.85, 0.84), junta * cerca * 0.8);
              col *= mix(1.0, 0.93 + 0.14 * h21(floor(vec2(wp.x / 0.25, wp.y / 0.075))), cerca);
            }
            // marco y parteluces
            float marco = box(f, lo - vec2(0.022, 0.03), hi + vec2(0.022, 0.03), aa) * enCuerpo - vano;
            col = mix(col, cMarco, clamp(marco, 0.0, 1.0) * near * (1.0 - cortina * 0.6));
            parte = (1.0 - smoothstep(0.0, 0.012 + aa.x, abs(f.x - 0.5))) * step(0.6, ww);
            parte = max(parte, (1.0 - smoothstep(0.0, 0.012 + aa.y, abs(f.y - mix(wh0, wh1, 0.68)))) * (1.0 - cortina));
            parte *= near;
            // cortinas distintas por ventana, vitrinas en los locales
            float baja = mix(0.25, 0.95, h21(celda + 3.1));
            tela = step(0.55, wid) * (1.0 - cortina) * (1.0 - local) * step((f.y - wh0) / max(0.01, wh1 - wh0), baja);
            vec3 interior = mix(tinte * 0.8, mix(vec3(0.60, 0.58, 0.54), vec3(0.74, 0.72, 0.68), h21(celda + 9.4)), tela * 0.8 * near);
            interior = mix(interior, vec3(0.50, 0.46, 0.40), local * 0.6);
            vec3 cielo = mix(vec3(0.74, 0.79, 0.84), vec3(0.52, 0.63, 0.76), clamp(reflect(-viewDir, nEC).y * 0.5 + 0.5, 0.0, 1.0));
            cielo = mix(cielo, vec3(0.03, 0.04, 0.07), uNight);
            vidrio = mix(tinte, mix(interior, cielo, clamp(0.16 + 0.7 * fres, 0.0, 1.0)), near);
            vidrio = mix(vidrio, cMarco, parte);
            rough = mix(rough, 0.12, vano * near * (1.0 - parte));
            // suciedad en la base
            col *= mix(1.0, 0.88, smoothstep(0.9, 0.0, v) * (1.0 - zocalo) * near);
          }
          col = mix(col, vidrio, vano);

          // noche: ventanas encendidas
          if (uNight > 0.01) {
            float on = step(0.52, h21(celda + 17.0 + rnd * 53.0));
            on = mix(on, step(0.25, wid), local);
            vec3 luz = mix(vec3(1.0, 0.66, 0.34), vec3(1.0, 0.90, 0.74), h21(celda + 5.5));
            emis = luz * on * vano * (1.0 - parte) * (0.55 + 0.5 * (1.0 - tela)) * uNight * 1.25;
          }
          occ = mix(0.8, 1.0, smoothstep(-0.4, 0.9, v));
        }

        float hz = hlfHaze(dist);
        material.diffuse = col * mix(1.0, 0.42, uNight) * (1.0 - hz);
        material.roughness = rough;
        material.specular = spec * (1.0 - hz);
        material.occlusion = occ;
        // relleno de cielo: las caras en sombra no se van a negro azulado
        material.emissive = (emis + col * 0.22 * (1.0 - uNight)) * (1.0 - hz) + hlfHazeColor(uNight) * hz;
      }
    `})}function st(i,e,t){return new se({uniforms:{uNight:{type:z.FLOAT,value:0},uFrame:{type:z.FLOAT,value:e},uTop:{type:z.FLOAT,value:t},uAtlas:{type:z.SAMPLER_2D,value:new De({url:i,repeat:!1,minificationFilter:Oe.LINEAR_MIPMAP_LINEAR,magnificationFilter:Fe.LINEAR})}},varyings:{vUV:O.VEC2,vView:O.VEC3,vRightT:O.VEC2,vUpT:O.VEC2},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vec3 base = vsInput.attributes.positionMC;
        vec2 corner = vsInput.attributes.texCoord_0;
        vec2 sc = vsInput.attributes.texCoord_1;
        vec4 col = vsInput.attributes.color_0;
        float W = uFrame * sc.x;
        float H = uFrame * sc.y;
        vec3 C = base + vec3(0.0, 0.5 * H, 0.0);
        vec3 cam = (czm_inverseModelView * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        vec3 toCam = normalize(cam - C);
        vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), toCam) + vec3(1.0e-4, 0.0, 0.0));
        vec3 up = cross(toCam, right);
        vsOutput.positionMC = C + right * (corner.x * 0.5 * W) + up * ((corner.y - 0.5) * H);

        float yaw = col.r * 6.2831853;
        float cy = cos(yaw);
        float sy = sin(yaw);
        // al marco propio del árbol (deshace su giro alrededor de +Y)
        vec2 t = vec2(toCam.x * cy - toCam.z * sy, toCam.x * sy + toCam.z * cy);
        float ang = atan(-t.x, t.y);
        if (ang < 0.0) ang += 6.2831853;
        vView = vec3(ang / 0.78539816, toCam.y, col.g);
        vUV = vec2(corner.x * 0.5 + 0.5, corner.y);
        vRightT = vec2(right.x * cy - right.z * sy, right.x * sy + right.z * cy);
        vUpT = vec2(up.x * cy - up.z * sy, up.x * sy + up.z * cy);
      }
    `,fragmentShaderText:re+`
      vec4 lado(float i, vec2 uv) {
        float flip = step(3.5, i);
        float cell = i - 4.0 * flip;
        float u = clamp(mix(uv.x, 1.0 - uv.x, flip), 0.004, 0.996);
        float v = clamp(uv.y, 0.004, 0.996);
        return texture(uAtlas, vec2((cell + u) * 0.25, 0.5 + 0.5 * v));
      }
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float a8 = mod(vView.x, 8.0);
        float i0 = floor(a8);
        float w = smoothstep(0.3, 0.7, a8 - i0);
        vec4 c = mix(lado(i0, vUV), lado(mod(i0 + 1.0, 8.0), vUV), w);

        float k = smoothstep(0.60, 0.90, vView.y);
        if (k > 0.0) {
          vec2 p = (vRightT * (vUV.x - 0.5) + vUpT * (vUV.y - 0.5)) * (uFrame / uTop);
          vec2 q = clamp(p + 0.5, 0.004, 0.996);
          float dentro = step(abs(p.x), 0.5) * step(abs(p.y), 0.5);
          vec4 sup = texture(uAtlas, vec2(q.x * 0.25, 0.5 - 0.5 * q.y)) * dentro;
          c = mix(c, sup, k);
        }

        vec3 rgb = czm_srgbToLinear(c.rgb);
        // verde natural, apagado; cada árbol con un tono algo distinto
        float l = dot(rgb, vec3(0.3, 0.59, 0.11));
        rgb = mix(vec3(l), rgb, 0.74) * mix(vec3(0.74, 0.86, 0.68), vec3(0.94, 1.0, 0.78), vView.z);
        // copa: más densa y oscura hacia el centro y la base
        vec2 d = (vUV - vec2(0.5, 0.55)) * 2.0;
        float borde = clamp(length(d), 0.0, 1.0);
        rgb *= mix(0.72, 1.06, borde * borde) * mix(0.80, 1.0, smoothstep(0.05, 0.6, vUV.y));

        float hz = hlfHaze(length(fsInput.attributes.positionEC));
        material.diffuse = rgb * mix(1.0, 0.28, uNight) * (1.0 - hz);
        material.alpha = clamp(c.a * 1.3, 0.0, 1.0);
        // normal abombada (en coordenadas de ojo): el sol modela la copa
        vec3 n = normalize(vec3(d.x * 0.9, d.y * 0.9 + 0.25, 0.85));
        material.normalEC = n;
        material.roughness = 0.94;
        material.specular = vec3(0.02);
        material.occlusion = 1.0;
        material.emissive = rgb * 0.20 * (1.0 - uNight) * (1.0 - hz) + hlfHazeColor(uNight) * hz;
      }
    `})}function rt(){return new se({uniforms:{uNight:{type:z.FLOAT,value:0}},lightingModel:Ne.UNLIT,fragmentShaderText:re+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        c = mix(c, c * vec3(0.15, 0.18, 0.25), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight), hlfHaze(length(fsInput.attributes.positionEC)));
      }
    `})}function Ee(){return oe.eastNorthUpToFixedFrame(c.fromDegrees(ee.longitude,ee.latitude,ee.height))}function j(i,e,t,a=Ee()){return k.multiplyByPoint(a,new c(i,e,t),new c)}const ct={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function lt(i,e,t){let a=!1;for(let o=0,n=t.length-1;o<t.length;n=o++){const[r,d]=t[o],[g,v]=t[n];d>e!=v>e&&i<(g-r)*(e-d)/(v-d)+r&&(a=!a)}return a}function ht(i,e,t){let a=1/0;for(let o=0,n=t.length-1;o<t.length;n=o++){const[r,d]=t[n],[g,v]=t[o],u=g-r,w=v-d,E=Math.max(0,Math.min(1,((i-r)*u+(e-d)*w)/(u*u+w*w||1)));a=Math.min(a,Math.hypot(i-r-E*u,e-d-E*w))}return a}async function dt(i,e,t){const a=i.scene,o=Ee(),n=k.inverseTransformation(o,new k),r=G.secciones;e("Contexto urbano",.08);const[d,g,v]=await Promise.all([fetch(r+"recorte.json").then(s=>s.json()),fetch(r+"edificios.json").then(s=>s.json()),fetch(r+"arboles.json").then(s=>s.json())]),u=rt();let w=null;try{w=await Ve.fromUrl(G.googleTiles,{maximumScreenSpaceError:10,shadows:F.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024});const s=d.clips.map(l=>{const y=new je({positions:c.fromDegreesArray(l.flat())}),_=y.computeRectangle();return y.computeRectangle=T=>We.clone(_,T),y});w.clippingPolygons=new Ue({polygons:s}),w.customShader=u,a.primitives.add(w)}catch(s){console.warn("Tiles de Google no disponibles",s)}const E=[-236,330],N=[];for(const s of g.secciones)N.push({key:s.key,file:s.file,kind:"edificios",label:s.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${s.key}`,dist:s.key==="Hotel"?-2:Math.hypot(s.c[0]-E[0],s.c[1]-E[1])});N.sort((s,l)=>s.dist-l.dist);const de=v.secciones.map(s=>({key:s.key,file:s.file,kind:"arboles",atlas:s.atlas,marco:s.marco,marcoSup:s.marcoSup,label:ct[s.key]??"Vegetación",dist:0})),H=[...N.slice(0,4),...de.slice(0,3),...N.slice(4,9),...de.slice(3),...N.slice(9)],fe=nt(),ue=[],ge=[];let pe=0;const D={total:H.length,loaded:0,failed:[]},me=async s=>{try{const l=await Be.fromGltfAsync({url:r+s.file,modelMatrix:o,upAxis:we.Y,forwardAxis:we.X,shadows:s.kind==="arboles"?F.CAST_ONLY:F.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:s.kind!=="arboles"});if(s.kind==="arboles"){const y=st(r+s.atlas,s.marco,s.marcoSup);y.setUniform("uNight",pe),ue.push(y),l.customShader=y}else l.customShader=fe;l.imageBasedLighting.imageBasedLightingFactor=new X(.45,.25),a.primitives.add(l),s.kind==="arboles"&&ge.push(l),await new Promise(y=>{if(l.ready)return y();const _=l.readyEvent.addEventListener(()=>{_(),y()});setTimeout(y,2e4)})}catch(l){console.error("Sección no cargada",s.file,l),D.failed.push(s.file)}D.loaded++,t?.(D.loaded,D.total,s.label)},Z=7;for(let s=0;s<Math.min(Z,H.length);s++)e(H[s].label,.2+.75*s/Z),await me(H[s]);const He=(async()=>{for(let s=Z;s<H.length;s++)await me(H[s]),await new Promise(l=>setTimeout(l,60))})();return{matrix:o,inverse:n,tileset:w,buildings:g.edificios,treeCount:v.total,sections:D,done:He,setNight(s){u.setUniform("uNight",s),fe.setUniform("uNight",s),pe=s;for(const l of ue)l.setUniform("uNight",s)},setTreesVisible(s){for(const l of ge)l.show=s},buildingAt(s){const l=k.multiplyByPoint(n,s,new c);let y=null,_=1.2;for(const T of g.edificios){if(l.x<T.bb[0]-1.5||l.x>T.bb[2]+1.5||l.y<T.bb[1]-1.5||l.y>T.bb[3]+1.5||l.z>T.b+T.h+2.5)continue;if(lt(l.x,l.y,T.r))return T;const ve=ht(l.x,l.y,T.r);ve<_&&(_=ve,y=T)}return y}}}Ze.defaultAccessToken=G.ionToken;const f=i=>document.getElementById(i),ce=f("cesiumContainer"),Te=f("loading"),ft=f("loadBar"),Se=f("loadLabel"),ut=f("loadPct");function ie(i,e){Se.textContent=i;const t=Math.round(Math.max(0,Math.min(1,e))*100);ft.style.width=t+"%",ut.textContent=t+"%"}const x=new Ye(ce,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:F.RECEIVE_ONLY,terrain:Ke.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:qe.fromProviderAsync(Xe.fromAssetId(G.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),m=x.scene;m.globe.enableLighting=!0;m.globe.showGroundAtmosphere=!0;m.globe.depthTestAgainstTerrain=!0;m.globe.maximumScreenSpaceError=2;m.fog.enabled=!0;m.fog.density=18e-5;m.fog.minimumBrightness=.04;m.highDynamicRange=!0;m.msaaSamples=4;m.postProcessStages.fxaa.enabled=!0;m.screenSpaceCameraController.enableCollisionDetection=!1;m.light=new Je({intensity:2.3});const S=x.shadowMap;S.softShadows=!0;S.size=2048;S.maximumDistance=900;S.darkness=.42;S.normalOffset=!0;const I=m.postProcessStages.ambientOcclusion;I.enabled=!0;I.uniforms.intensity=1.6;I.uniforms.bias=.12;I.uniforms.lengthCap=.28;I.uniforms.stepSize=1.6;I.uniforms.blurStepSize=.9;x.camera.frustum.fov=Le.toRadians(48);const Ce=(()=>{try{const i=m.context._gl,e=i.getExtension("WEBGL_debug_renderer_info");return e?String(i.getParameter(e.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),gt=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Ce)&&!/Arc/i.test(Ce);let P=null,M=gt||matchMedia("(pointer: coarse)").matches?.5:1;function W(){const i=Math.min(window.devicePixelRatio||1,2);x.resolutionScale=i*(M>=1?1:M>=.5?.8:.62),S.size=M>=1?2048:1024,S.softShadows=M>=.5,I.enabled=M>=1,m.msaaSamples=M>=1?4:1,x.shadows=M>=.5,P?.tileset&&(P.tileset.maximumScreenSpaceError=M>=1?8:M>=.5?12:20)}W();x.clock.shouldAnimate=!1;x.clock.currentTime=V.fromIso8601("2026-06-21T10:10:00-05:00");const p=new ot(x),le=i=>j(te[i].e,te[i].n,te[i].u),pt=le("hotel");p.flyTo({pivot:pt,heading:K.general.heading,pitch:K.general.pitch,range:K.general.range*1.8},0);p.groundHeight=i=>m.globe.getHeight(i);const mt=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,fog:22e-5,label:"10:10",sun:2.3},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.1,fog:3e-4,label:"16:50",sun:2.1},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,fog:2e-4,label:"19:35",sun:1}];let J=0,L=null;const vt=i=>V.toDate(V.fromIso8601(i)).getTime();function wt(i){L={from:V.toDate(x.clock.currentTime).getTime(),to:vt(i.iso),start:performance.now(),dur:1600},m.fog.density=i.fog,m.light.intensity=i.sun;const t=J,a=performance.now(),o=()=>{const r=Math.min(1,(performance.now()-a)/1400);J=t+(i.night-t)*(r*r*(3-2*r)),P?.setNight(J),r<1&&requestAnimationFrame(o)};requestAnimationFrame(o),document.querySelectorAll("[data-light]").forEach(r=>r.classList.toggle("on",r.dataset.light===i.id));const n=f("clockLabel");n&&(n.textContent=i.label)}document.querySelectorAll("[data-light]").forEach(i=>{i.addEventListener("click",()=>{const e=mt.find(t=>t.id===i.dataset.light);e&&wt(e)})});let R=!1;const ne=f("btnOrbit"),he=f("btnPedestrian");function A(){R=!1,ne?.classList.remove("on")}function U(i,e=2){A();const t=K[i];p.flyTo({pivot:le(t.place),heading:t.heading,pitch:t.pitch,range:t.range},e)}f("btnHome")?.addEventListener("click",()=>U("general",2.2));f("btnAerial")?.addEventListener("click",()=>U("aerial"));f("btnArch")?.addEventListener("click",()=>U("arch"));he?.addEventListener("click",()=>{A(),p.isWalking?p.exitWalk():p.enterWalk(C?Ie(C):void 0)});p.onModeChange=i=>{he?.classList.toggle("on",i);const e=f("hint");e&&i&&(e.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",e.classList.remove("fade"),setTimeout(()=>e.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(i=>{i.addEventListener("click",()=>{A();const e=i.dataset.place;p.flyTo({pivot:le(e),range:e==="hotel"?300:520,pitch:-.5},2)})});ne?.addEventListener("click",()=>{R=!R,ne.classList.toggle("on",R),R&&p.isWalking&&p.exitWalk()});ce.addEventListener("pointerdown",A);ce.addEventListener("wheel",A,{passive:!0});addEventListener("keydown",i=>{i.code==="Escape"&&(p.isWalking?p.exitWalk():$(null)),(i.code==="KeyH"||i.code==="Home")&&U("general",2.2),i.code==="KeyP"&&he?.click()});let C=null,Y=null;const q=f("card");function yt(i){return j((i.bb[0]+i.bb[2])/2,(i.bb[1]+i.bb[3])/2,i.b+i.h*.5)}function Ie(i){return j((i.bb[0]+i.bb[2])/2,i.bb[1]-9,i.b)}function $(i){if(C=i,Y&&(x.entities.remove(Y),Y=null),!i||!P){q&&(q.hidden=!0);return}const e=i.r.map(([n,r])=>j(n,r,0,P.matrix)),t=2572+i.b-.5;Y=x.entities.add({polygon:{hierarchy:new $e(e),height:t,extrudedHeight:t+i.h+2.2,material:ye.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:ye.fromCssColorString("#d7ebff"),shadows:F.DISABLED}});const a=i.s==="Hotel",o=Math.abs(i.r.reduce((n,r,d)=>{const g=i.r[(d+1)%i.r.length];return n+r[0]*g[1]-g[0]*r[1]},0)/2);f("cardKind").textContent=a?"Proyecto":`Sector ${i.s}`,f("cardTitle").textContent=a?"Hotel La Fontana":`Edificación ${i.id+1}`,f("cardData").innerHTML=`<dt>Pisos</dt><dd>${i.p}</dd><dt>Altura</dt><dd>${i.h.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(o).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(o*i.p).toLocaleString("es-CO")} m²</dd>`,q&&(q.hidden=!1)}p.onPick=i=>{P&&$(i?P.buildingAt(i):null)};f("cardClose")?.addEventListener("click",()=>$(null));f("cardFocus")?.addEventListener("click",()=>{if(!C)return;A();const i=Math.max(C.bb[2]-C.bb[0],C.bb[3]-C.bb[1],C.h);p.flyTo({pivot:yt(C),pitch:-.42,range:Math.max(60,i*2.1)},1.7)});f("cardWalk")?.addEventListener("click",()=>{C&&(A(),p.enterWalk(Ie(C)))});const ae=f("status"),Pe=f("statusText");async function xt(){ie("Contexto geográfico",.04),await new Promise(e=>setTimeout(e,30)),P=await dt(x,(e,t)=>ie(e,t),(e,t,a)=>{!ae||!Pe||(ae.hidden=!1,Pe.textContent=e<t?`Cargando secciones ${e}/${t} · ${a}`:`Modelo completo · ${t} secciones`,e>=t&&setTimeout(()=>ae.classList.add("fade"),2600))}),P.setNight(J),W(),ie("Listo",1),U("general",2.4),Te.classList.add("done"),setTimeout(()=>Te.remove(),900);const i=f("hint");i&&setTimeout(()=>i.classList.add("fade"),9e3),window.__READY__=!0,P.done.then(()=>{window.__ALL__=!0})}const b={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Ge,viewer:x,cam:p,getSite:()=>P,enuToWorld:j,select:$,stats:b,setQuality:i=>{M=i,W()}};xt().catch(i=>{console.error(i),Se.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(i?.message??i)});let ke=performance.now();function Ae(){const i=performance.now(),e=Math.min(.1,(i-ke)/1e3);if(ke=i,L){const t=Math.min(1,(i-L.start)/L.dur),a=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;x.clock.currentTime=V.fromDate(new Date(L.from+(L.to-L.from)*a)),t>=1&&(L=null)}R&&!p.isWalking&&p.flyTo({heading:p.state.heading+.16*e},0),p.update(e),b.frames++,i-b.t0>=2e3&&(b.fps=Math.round(b.frames*1e3/(i-b.t0)),b.frames=0,b.t0=i,window.__FPS__=b.fps,P&&document.visibilityState==="visible"&&(b.fps<20&&M>.25&&!window.__DBG__.lock?++b.low>=2&&(M=M>=1?.5:.25,b.low=0,W()):b.low=0)),requestAnimationFrame(Ae)}requestAnimationFrame(Ae);addEventListener("resize",W);
