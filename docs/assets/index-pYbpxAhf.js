var mt=Object.defineProperty;var pt=(i,e,t)=>e in i?mt(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var h=(i,e,t)=>pt(i,typeof e!="symbol"?e+"":e,t);import{C as l,a as Qe,T as xe,M as k,b as G,c as X,H as vt,d as ne,L as wt,U as L,V as j,e as et,f as se,g as Me,h as Te,i as We,j as yt,S as U,I as tt,k as xt,R as bt,l as Mt,A as Be,m as Tt,n as At,o as Ct,p as Lt,J,q as Pt,P as Et,r as Ye,s as kt}from"./cesium-OxtDdFLM.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const me="/HLF/",It=me.endsWith("/")?me:me+"/",St=It+"cesium/";window.CESIUM_BASE_URL=St;const ie={longitude:-74.04145021,latitude:4.70207636,height:2572},pe={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},ae={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},K={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},_t=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,qe=-1.5533,Xe=-.012,Rt=4200,zt=6,Ge=1.7;class Ht{constructor(e){h(this,"viewer");h(this,"canvas");h(this,"pivot",new l);h(this,"heading",.5);h(this,"pitch",-.6);h(this,"range",1200);h(this,"targetPivot",new l);h(this,"targetHeading",.5);h(this,"targetPitch",-.6);h(this,"targetRange",1200);h(this,"damping",9);h(this,"drag",null);h(this,"pointers",new Map);h(this,"pinch",null);h(this,"lastTap",0);h(this,"keys",new Set);h(this,"tween",null);h(this,"fov",Qe.toRadians(48));h(this,"walking",!1);h(this,"eye",new l);h(this,"eyeTarget",new l);h(this,"wHeading",0);h(this,"wPitch",0);h(this,"wHeadingT",0);h(this,"wPitchT",0);h(this,"onPick",null);h(this,"onModeChange",null);h(this,"groundHeight",null);this.viewer=e,this.canvas=e.scene.canvas,e.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:l.clone(this.targetPivot)}}setPivot(e,t=!0){if(t){const a=l.clone(this.viewer.camera.positionWC),o=l.subtract(a,e,new l),s=l.magnitude(o),r=xe.eastNorthUpToFixedFrame(e),d=k.inverseTransformation(r,new k),u=k.multiplyByPointAsVector(d,o,new l);if(s>1){const x=-Math.asin(Math.max(-1,Math.min(1,u.z/s)));if(x<Xe&&x>qe){let g=Math.atan2(-u.x,-u.y);for(;g-this.heading>Math.PI;)g-=Math.PI*2;for(;g-this.heading<-Math.PI;)g+=Math.PI*2;this.heading=this.targetHeading=g,this.pitch=this.targetPitch=x,this.range=this.targetRange=this.clamp(s),l.clone(e,this.pivot)}}}this.targetPivot=l.clone(e),this.tween=null}bind(){const e=this.canvas;e.style.touchAction="none",e.addEventListener("pointerdown",a=>{if(e.setPointerCapture(a.pointerId),this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2){const[o,s]=[...this.pointers.values()];this.pinch={distance:Math.hypot(o.x-s.x,o.y-s.y),range:this.targetRange,cx:(o.x+s.x)/2,cy:(o.y+s.y)/2},this.drag=null;return}a.button===2||a.button===1||a.shiftKey?this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"pan",moved:!1}:a.button===0&&(this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"orbit",moved:!1}),this.tween=null}),e.addEventListener("pointermove",a=>{if(!this.pointers.has(a.pointerId))return;if(this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2&&this.pinch){const[r,d]=[...this.pointers.values()],u=Math.hypot(r.x-d.x,r.y-d.y),x=(r.x+d.x)/2,g=(r.y+d.y)/2;this.walking?this.walk((this.pinch.cy-g)*.06,0):(u>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/u)),this.pan(this.pinch.cx-x,g-this.pinch.cy)),this.pinch.cx=x,this.pinch.cy=g;return}if(!this.drag||a.pointerId!==this.drag.id)return;const o=a.offsetX-this.drag.x,s=a.offsetY-this.drag.y;this.drag.x=a.offsetX,this.drag.y=a.offsetY,Math.abs(o)+Math.abs(s)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=o*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+s*.0028))):this.walk(s*.05,-o*.05):this.drag.mode==="orbit"?(this.targetHeading-=o*.0042,this.targetPitch=this.clampPitch(this.targetPitch-s*.0034)):this.pan(-o,s)});const t=a=>{if(this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&a.pointerId===this.drag.id){const o=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,o&&a.type==="pointerup"){const s=new G(a.offsetX,a.offsetY),r=performance.now();if(a.pointerType!=="mouse"&&r-this.lastTap<320){this.lastTap=0,this.focusAt(s);return}this.lastTap=r;const d=this.pickWorld(s);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("contextmenu",a=>a.preventDefault()),e.addEventListener("wheel",a=>{a.preventDefault(),this.tween=null;const o=a.deltaMode===1?16:a.deltaMode===2?100:1,s=a.deltaY*o;if(this.walking){this.walk(-s*.02,0);return}const r=Math.exp(Math.max(-.45,Math.min(.45,s*.0016))),d=this.pickWorld(new G(a.offsetX,a.offsetY)),u=this.clamp(this.targetRange*r);if(d&&r<1){const x=Math.min(.45,(this.targetRange-u)/this.targetRange)*.8,g=l.subtract(d,this.targetPivot,new l),P=l.magnitude(g);if(P>1){const z=Math.min(P,this.targetRange)*x/P;l.add(this.targetPivot,l.multiplyByScalar(g,z,g),this.targetPivot)}}this.targetRange=u},{passive:!1}),e.addEventListener("dblclick",a=>{a.preventDefault(),this.focusAt(new G(a.offsetX,a.offsetY))}),addEventListener("keydown",a=>{a.target instanceof HTMLInputElement||(this.keys.add(a.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(a.code)&&a.preventDefault())}),addEventListener("keyup",a=>this.keys.delete(a.code)),addEventListener("blur",()=>this.keys.clear())}clamp(e,t=zt,a=Rt){return Math.max(t,Math.min(a,e))}clampPitch(e){return Math.max(qe,Math.min(Xe,e))}moveHorizontal(e,t,a,o){const s=xe.eastNorthUpToFixedFrame(e),r=new l(Math.sin(t)*a+Math.cos(t)*o,Math.cos(t)*a-Math.sin(t)*o,0);k.multiplyByPoint(s,r,e)}pan(e,t){const a=this.canvas.clientHeight||1,o=2*this.range*Math.tan(this.fov/2)/a,s=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,t*o/s,e*o),this.tween=null}walk(e,t){this.moveHorizontal(this.eyeTarget,this.wHeading,e,t),this.snapEye()}snapEye(){const e=X.fromCartesian(this.eyeTarget),t=this.groundHeight?.(e);t!==void 0&&Number.isFinite(t)&&(e.height=t+Ge,X.toCartesian(e,void 0,this.eyeTarget))}pickWorld(e){const t=this.viewer.scene;let a;if(t.pickPositionSupported&&t.pick(e,4,4)&&(a=t.pickPosition(e)),!a){const o=t.camera.getPickRay(e);o&&(a=t.globe.pick(o,t)??void 0)}return a??null}focusAt(e){const t=this.pickWorld(e);if(t){if(this.walking){l.clone(t,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:t,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(e,t=2){this.walking&&this.exitWalk(!1);const a={pivot:e.pivot??l.clone(this.targetPivot),heading:e.heading??this.targetHeading,pitch:e.pitch??this.targetPitch,range:e.range??this.targetRange};let o=a.heading;for(;o-this.targetHeading>Math.PI;)o-=Math.PI*2;for(;o-this.targetHeading<-Math.PI;)o+=Math.PI*2;if(a.heading=o,t<=.02){this.tween=null,this.targetPivot=l.clone(a.pivot),this.pivot=l.clone(a.pivot),this.heading=this.targetHeading=a.heading,this.pitch=this.targetPitch=a.pitch,this.range=this.targetRange=a.range;return}this.tween={from:{pivot:l.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:a,start:performance.now(),duration:t*1e3}}enterWalk(e){l.clone(e??this.targetPivot,this.eyeTarget),this.snapEye(),l.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(e=!0){if(!this.walking)return;this.walking=!1;const t=X.fromCartesian(this.eyeTarget);t.height-=Ge-1;const a=X.toCartesian(t);this.pivot=l.clone(a),this.targetPivot=a,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,e?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(e){if(!this.keys.size)return;const t=this.keys,a=t.has("ShiftLeft")||t.has("ShiftRight")?3:1;let o=0,s=0;(t.has("KeyW")||t.has("ArrowUp"))&&(o+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(o-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(s+=1),(t.has("KeyA")||t.has("ArrowLeft"))&&(s-=1);let r=0;if(t.has("KeyQ")&&(r+=1),t.has("KeyE")&&(r-=1),this.walking){r&&(this.wHeadingT-=r*1.2*e),(o||s)&&this.walk(o*4.2*a*e,s*3.4*a*e);return}if(r&&(this.targetHeading+=r*.9*e,this.tween=null),(t.has("PageUp")||t.has("Equal")||t.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*e))),(t.has("PageDown")||t.has("Minus")||t.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*e))),t.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*e)),t.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*e)),!o&&!s)return;const d=Math.max(8,this.range*.6)*a*e;this.moveHorizontal(this.targetPivot,this.heading,o*d,s*d),this.tween=null}update(e){this.updateKeys(e);const t=1-Math.exp(-this.damping*e);if(this.walking){l.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*e),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*t,this.wPitch+=(this.wPitchT-this.wPitch)*t,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const a=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),o=_t(a),{from:s,to:r}=this.tween;l.lerp(s.pivot,r.pivot,o,this.targetPivot),this.targetHeading=s.heading+(r.heading-s.heading)*o,this.targetPitch=s.pitch+(r.pitch-s.pitch)*o,this.targetRange=Math.exp(Math.log(s.range)+(Math.log(r.range)-Math.log(s.range))*o),a>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*t,this.pitch+=(this.targetPitch-this.pitch)*t,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*t),l.lerp(this.pivot,this.targetPivot,t,this.pivot),this.viewer.camera.lookAt(this.pivot,new vt(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(k.IDENTITY)}}function Nt(){return new se({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const it=()=>({uAerial:{type:L.SAMPLER_2D,value:Nt()},uAerialRect:{type:L.VEC4,value:new et(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:L.FLOAT,value:0}}),at=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,re=`
  vec3 hlfHazeColor(float night) { return mix(vec3(0.70, 0.72, 0.74), vec3(0.03, 0.04, 0.07), night); }
  float hlfHaze(float d) { return 0.0; }   // sin neblina
`;function Ot(){return new ne({uniforms:{uNight:{type:L.FLOAT,value:0},uLean:{type:L.VEC2,value:new G(0,0)},...it()},varyings:{vPosM:j.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
      }
    `,fragmentShaderText:re+at+`
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
          // cubierta real: la foto aérea, corrida según la altura del edificio
          if (uAerialOn > 0.5) {
            vec3 foto = hlfAerial(uv + uLean * pisos * 3.0);
            col = mix(col, foto, 0.94);
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
          if (uAerialOn > 0.5) {
            // el color lo pone la cubierta real fotografiada; la teja modelada aporta el relieve
            vec3 foto = hlfAerial(vec2(vPosM.x, -vPosM.z) + uLean * 21.0);
            float lum = dot(col, vec3(0.3333)) / 0.42;
            col = mix(col, foto * mix(1.0, lum, 0.55 * near), 0.9);
          }
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
    `})}function Ft(i,e,t){return new ne({uniforms:{uNight:{type:L.FLOAT,value:0},uFrame:{type:L.FLOAT,value:e},uTop:{type:L.FLOAT,value:t},uAtlas:{type:L.SAMPLER_2D,value:new se({url:i,repeat:!1,minificationFilter:Me.LINEAR_MIPMAP_LINEAR,magnificationFilter:Te.LINEAR})}},varyings:{vUV:j.VEC2,vView:j.VEC3,vRightT:j.VEC2,vUpT:j.VEC2},vertexShaderText:`
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
    `})}function Vt(){return new ne({uniforms:{uNight:{type:L.FLOAT,value:0}},lightingModel:wt.UNLIT,fragmentShaderText:re+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(0.15, 0.18, 0.25), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight), hlfHaze(length(fsInput.attributes.positionEC)));
      }
    `})}function Dt(i){const e=t=>({type:L.SAMPLER_2D,value:new se({url:i+t,repeat:!0,minificationFilter:Me.LINEAR_MIPMAP_LINEAR,magnificationFilter:Te.LINEAR})});return new ne({uniforms:{uNight:{type:L.FLOAT,value:0},uAsfalto:e("tex_asfalto.webp"),uAnden:e("tex_anden.webp"),uPrado:e("tex_prado.webp"),uCiclo:e("tex_ciclo.webp"),...it()},varyings:{vG:j.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
      }
    `,fragmentShaderText:re+at+`
      float gh(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float gn(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(gh(i), gh(i + vec2(1.0, 0.0)), f.x), mix(gh(i + vec2(0.0, 1.0)), gh(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float capa = floor(fsInput.attributes.color_0.r * 8.0 + 0.5);
        vec2 p = vG.xz;
        vec2 en = vec2(vG.x, -vG.z);
        float big = gn(p * 0.03);
        vec3 foto = uAerialOn > 0.5 ? hlfAerial(en) : vec3(0.36, 0.40, 0.30);
        vec3 col;
        float rough = 0.95;
        if (capa < 0.5) {             // terreno: tal cual es en la realidad
          col = foto;
        } else if (capa < 1.5) {      // vía: asfalto real, con el desgaste que muestra la foto
          col = czm_srgbToLinear(texture(uAsfalto, p / 5.0).rgb) * (0.86 + 0.28 * big);
          col = mix(col, foto, 0.22 * uAerialOn);
          rough = 0.88;
        } else if (capa < 2.5) {      // andén: adoquín de concreto
          col = czm_srgbToLinear(texture(uAnden, p / 2.4).rgb) * (0.92 + 0.16 * big);
          col = mix(col, foto, 0.18 * uAerialOn);
        } else if (capa < 3.5) {      // separador: prado
          col = czm_srgbToLinear(texture(uPrado, p / 3.0).rgb) * (0.80 + 0.30 * big);
        } else if (capa < 4.5) {      // ciclorruta
          col = czm_srgbToLinear(texture(uCiclo, p / 4.0).rgb) * (0.92 + 0.16 * big);
        } else if (capa < 5.5) {      // agua del canal
          col = mix(vec3(0.10, 0.15, 0.15), vec3(0.15, 0.20, 0.19), gn(p * 0.4));
          rough = 0.15;
        } else {                      // canal y puentes: concreto
          col = mix(vec3(0.42, 0.41, 0.39), vec3(0.50, 0.49, 0.47), big);
        }
        material.diffuse = col * mix(1.0, 0.35, uNight);
        material.roughness = rough;
        material.specular = vec3(0.03);
        material.emissive = col * 0.14 * (1.0 - uNight);
      }
    `})}function ot(){return xe.eastNorthUpToFixedFrame(l.fromDegrees(ie.longitude,ie.latitude,ie.height))}function B(i,e,t,a=ot()){return k.multiplyByPoint(a,new l(i,e,t),new l)}const jt={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function Ut(i,e,t){let a=!1;for(let o=0,s=t.length-1;o<t.length;s=o++){const[r,d]=t[o],[u,x]=t[s];d>e!=x>e&&i<(u-r)*(e-d)/(x-d)+r&&(a=!a)}return a}function Wt(i,e,t){let a=1/0;for(let o=0,s=t.length-1;o<t.length;s=o++){const[r,d]=t[s],[u,x]=t[o],g=u-r,P=x-d,z=Math.max(0,Math.min(1,((i-r)*g+(e-d)*P)/(g*g+P*P||1)));a=Math.min(a,Math.hypot(i-r-z*g,e-d-z*P))}return a}async function Bt(i,e,t){const a=i.scene,o=ot(),s=k.inverseTransformation(o,new k),r=K.secciones;e("Contexto urbano",.08);const[d,u,x,g]=await Promise.all([fetch(r+"recorte.json").then(n=>n.json()),fetch(r+"edificios.json").then(n=>n.json()),fetch(r+"arboles.json").then(n=>n.json()),fetch(r+"suelo.json").then(n=>n.json())]),P=()=>d.clips.map(n=>{const c=new xt({positions:l.fromDegreesArray(n.flat())}),w=c.computeRectangle();return c.computeRectangle=I=>bt.clone(w,I),c});a.globe.clippingPolygons=new We({polygons:P()});const z=Vt();let Y=null;try{Y=await yt.fromUrl(K.googleTiles,{maximumScreenSpaceError:10,shadows:U.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),Y.clippingPolygons=new We({polygons:P()}),Y.customShader=z,a.primitives.add(Y)}catch(n){console.warn("Tiles de Google no disponibles",n)}const Pe=[-236,330],O=[];for(const n of u.secciones)O.push({key:n.key,file:n.file,kind:"edificios",label:n.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${n.key}`,dist:n.key==="Hotel"?-2:Math.hypot(n.c[0]-Pe[0],n.c[1]-Pe[1])});O.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),O.sort((n,c)=>n.dist-c.dist);const Ee={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},ke=g.secciones.map(n=>({key:n.key,file:n.file,kind:"suelo",capa:Ee[n.key]?.[0]??0,label:Ee[n.key]?.[1]??n.key,dist:-3})),Ie=x.secciones.map(n=>({key:n.key,file:n.file,kind:"arboles",atlas:n.atlas,marco:n.marco,marcoSup:n.marcoSup,label:jt[n.key]??"Vegetación",dist:0})),F=[...ke,...O.slice(0,4),...Ie.slice(0,3),...O.slice(4,9),...Ie.slice(3),...O.slice(9)],le=Ot(),he=Dt(r);(async()=>{try{const n=await tt.fromAssetId(K.imageryAssetId),c=18,w=n.tilingScheme,I=(b,E)=>X.fromCartesian(B(b,E,0,o)),p=w.positionToTileXY(I(-1010,930),c),S=w.positionToTileXY(I(1010,-940),c),lt=S.x-p.x+1,ht=S.y-p.y+1,V=n.tileWidth,D=document.createElement("canvas");D.width=lt*V,D.height=ht*V;const fe=D.getContext("2d"),ue=[];for(let b=p.y;b<=S.y;b++)for(let E=p.x;E<=S.x;E++)ue.push([E,b]);const dt=async([b,E])=>{for(let je=0;je<40;je++){const Ue=n.requestImage(b,E,c);if(Ue){try{const ge=await Ue;fe.drawImage(ge,(b-p.x)*V,(E-p.y)*V,V,V)}catch{}return}await new Promise(ge=>setTimeout(ge,120))}};fe.fillStyle="#6a6f62",fe.fillRect(0,0,D.width,D.height);const ft=Array.from({length:6},async()=>{for(;ue.length;)await dt(ue.shift())});await Promise.all(ft);const Q=document.createElement("canvas");Q.width=Q.height=4096,Q.getContext("2d").drawImage(D,0,0,4096,4096);const He=await new Promise(b=>Q.toBlob(b,"image/jpeg",.92));if(!He)return;const ut=URL.createObjectURL(He),Ne=w.tileXYToRectangle(p.x,p.y,c),Oe=w.tileXYToRectangle(S.x,S.y,c),Fe=(b,E)=>k.multiplyByPoint(s,l.fromRadians(b,E,ie.height),new l),Ve=Fe(Ne.west,Oe.south),De=Fe(Oe.east,Ne.north),gt=new et(Ve.x,Ve.y,De.x,De.y);for(const b of[le,he])b.setUniform("uAerial",new se({url:ut,repeat:!1,minificationFilter:Me.LINEAR_MIPMAP_LINEAR,magnificationFilter:Te.LINEAR})),b.setUniform("uAerialRect",gt),b.setUniform("uAerialOn",1)}catch(n){console.warn("Foto aérea no disponible",n)}})();const Se=[],_e=[];let Re=0;const q={total:F.length,loaded:0,failed:[]},ze=async n=>{try{const c=await Mt.fromGltfAsync({url:r+n.file,modelMatrix:o,upAxis:Be.Y,forwardAxis:Be.X,shadows:n.kind==="arboles"?U.CAST_ONLY:n.kind==="suelo"?U.RECEIVE_ONLY:U.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:n.kind!=="arboles"});if(n.kind==="suelo")c.customShader=he;else if(n.kind==="arboles"){const w=Ft(r+n.atlas,n.marco,n.marcoSup);w.setUniform("uNight",Re),Se.push(w),c.customShader=w}else c.customShader=le;c.imageBasedLighting.imageBasedLightingFactor=new G(.45,.25),a.primitives.add(c),n.kind==="arboles"&&_e.push(c),await new Promise(w=>{if(c.ready)return w();const I=c.readyEvent.addEventListener(()=>{I(),w()});setTimeout(w,2e4)})}catch(c){console.error("Sección no cargada",n.file,c),q.failed.push(n.file)}q.loaded++,t?.(q.loaded,q.total,n.label)},de=ke.length+7;for(let n=0;n<Math.min(de,F.length);n++)e(F[n].label,.2+.75*n/de),await ze(F[n]);const ct=(async()=>{for(let n=de;n<F.length;n++)await ze(F[n]),await new Promise(c=>setTimeout(c,60))})();return{matrix:o,inverse:s,tileset:Y,buildings:u.edificios,treeCount:x.total,sections:q,done:ct,setNight(n){z.setUniform("uNight",n),le.setUniform("uNight",n),Re=n,he.setUniform("uNight",n);for(const c of Se)c.setUniform("uNight",n)},setTreesVisible(n){for(const c of _e)c.show=n},buildingAt(n){const c=k.multiplyByPoint(s,n,new l);let w=null,I=1.2;for(const p of u.edificios){if(c.x<p.bb[0]-1.5||c.x>p.bb[2]+1.5||c.y<p.bb[1]-1.5||c.y>p.bb[3]+1.5||c.z>p.b+p.h+2.5)continue;if(Ut(c.x,c.y,p.r))return p;const S=Wt(c.x,c.y,p.r);S<I&&(I=S,w=p)}return w}}}kt.defaultAccessToken=K.ionToken;const f=i=>document.getElementById(i),Ae=f("cesiumContainer"),Ke=f("loading"),Yt=f("loadBar"),nt=f("loadLabel"),qt=f("loadPct");function ve(i,e){nt.textContent=i;const t=Math.round(Math.max(0,Math.min(1,e))*100);Yt.style.width=t+"%",qt.textContent=t+"%"}const M=new Tt(Ae,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:U.RECEIVE_ONLY,terrain:Ct.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:At.fromProviderAsync(tt.fromAssetId(K.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),v=M.scene;v.globe.enableLighting=!0;v.globe.showGroundAtmosphere=!0;v.globe.depthTestAgainstTerrain=!0;v.globe.maximumScreenSpaceError=2;v.fog.enabled=!1;v.fog.density=18e-5;v.fog.minimumBrightness=.04;v.highDynamicRange=!0;v.msaaSamples=4;v.postProcessStages.fxaa.enabled=!0;v.screenSpaceCameraController.enableCollisionDetection=!1;v.light=new Lt({intensity:2.3});const R=M.shadowMap;R.softShadows=!0;R.size=2048;R.maximumDistance=900;R.darkness=.42;R.normalOffset=!0;{const i=R;i._primitiveBias.depthBias=.0012,i._primitiveBias.normalOffsetScale=2.2,i._primitiveBias.normalShadingSmooth=.25}const H=v.postProcessStages.ambientOcclusion;H.enabled=!0;H.uniforms.intensity=1.6;H.uniforms.bias=.12;H.uniforms.lengthCap=.28;H.uniforms.stepSize=1.6;H.uniforms.blurStepSize=.9;M.camera.frustum.fov=Qe.toRadians(48);const Je=(()=>{try{const i=v.context._gl,e=i.getExtension("WEBGL_debug_renderer_info");return e?String(i.getParameter(e.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),Xt=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Je)&&!/Arc/i.test(Je);let y=null,A=Xt||matchMedia("(pointer: coarse)").matches?.5:1;function $(){const i=Math.min(window.devicePixelRatio||1,2);M.resolutionScale=i*(A>=1?1:A>=.5?.8:.62),R.size=A>=1?2048:1024,R.softShadows=A>=.5,H.enabled=A>=1,v.msaaSamples=A>=1?4:1,M.shadows=A>=.5,y?.tileset&&(y.tileset.maximumScreenSpaceError=A>=1?8:A>=.5?12:20)}$();M.clock.shouldAnimate=!1;M.clock.currentTime=J.fromIso8601("2026-06-21T10:10:00-05:00");const m=new Ht(M),Ce=i=>B(pe[i].e,pe[i].n,pe[i].u),Gt=Ce("hotel");m.flyTo({pivot:Gt,heading:ae.general.heading,pitch:ae.general.pitch,range:ae.general.range*1.8},0);m.groundHeight=i=>v.globe.getHeight(i);const Kt=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,fog:22e-5,label:"10:10",sun:2.3},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.1,fog:3e-4,label:"16:50",sun:2.1},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,fog:2e-4,label:"19:35",sun:1}];let oe=0,_=null;const Jt=i=>J.toDate(J.fromIso8601(i)).getTime();function $t(i){_={from:J.toDate(M.clock.currentTime).getTime(),to:Jt(i.iso),start:performance.now(),dur:1600},v.fog.density=i.fog,v.light.intensity=i.sun;const t=oe,a=performance.now(),o=()=>{const r=Math.min(1,(performance.now()-a)/1400);oe=t+(i.night-t)*(r*r*(3-2*r)),y?.setNight(oe),r<1&&requestAnimationFrame(o)};requestAnimationFrame(o),document.querySelectorAll("[data-light]").forEach(r=>r.classList.toggle("on",r.dataset.light===i.id));const s=f("clockLabel");s&&(s.textContent=i.label)}document.querySelectorAll("[data-light]").forEach(i=>{i.addEventListener("click",()=>{const e=Kt.find(t=>t.id===i.dataset.light);e&&$t(e)})});let W=!1;const be=f("btnOrbit"),Le=f("btnPedestrian");function N(){W=!1,be?.classList.remove("on")}function Z(i,e=2){N();const t=ae[i];m.flyTo({pivot:Ce(t.place),heading:t.heading,pitch:t.pitch,range:t.range},e)}f("btnHome")?.addEventListener("click",()=>Z("general",2.2));f("btnAerial")?.addEventListener("click",()=>Z("aerial"));f("btnArch")?.addEventListener("click",()=>Z("arch"));Le?.addEventListener("click",()=>{N(),m.isWalking?m.exitWalk():m.enterWalk(C?st(C):void 0)});m.onModeChange=i=>{Le?.classList.toggle("on",i);const e=f("hint");e&&i&&(e.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",e.classList.remove("fade"),setTimeout(()=>e.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(i=>{i.addEventListener("click",()=>{N();const e=i.dataset.place;m.flyTo({pivot:Ce(e),range:e==="hotel"?300:520,pitch:-.5},2)})});be?.addEventListener("click",()=>{W=!W,be.classList.toggle("on",W),W&&m.isWalking&&m.exitWalk()});Ae.addEventListener("pointerdown",N);Ae.addEventListener("wheel",N,{passive:!0});addEventListener("keydown",i=>{i.code==="Escape"&&(m.isWalking?m.exitWalk():ce(null)),(i.code==="KeyH"||i.code==="Home")&&Z("general",2.2),i.code==="KeyP"&&Le?.click()});let C=null,ee=null;const te=f("card");function Zt(i){return B((i.bb[0]+i.bb[2])/2,(i.bb[1]+i.bb[3])/2,i.b+i.h*.5)}function st(i){return B((i.bb[0]+i.bb[2])/2,i.bb[1]-9,i.b)}function ce(i){if(C=i,ee&&(M.entities.remove(ee),ee=null),!i||!y){te&&(te.hidden=!0);return}const e=i.r.map(([s,r])=>B(s,r,0,y.matrix)),t=2572+i.b-.5;ee=M.entities.add({polygon:{hierarchy:new Et(e),height:t,extrudedHeight:t+i.h+2.2,material:Ye.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:Ye.fromCssColorString("#d7ebff"),shadows:U.DISABLED}});const a=i.s==="Hotel",o=Math.abs(i.r.reduce((s,r,d)=>{const u=i.r[(d+1)%i.r.length];return s+r[0]*u[1]-u[0]*r[1]},0)/2);f("cardKind").textContent=a?"Proyecto":`Sector ${i.s}`,f("cardTitle").textContent=a?"Hotel La Fontana":`Edificación ${i.id+1}`,f("cardData").innerHTML=`<dt>Pisos</dt><dd>${i.p}</dd><dt>Altura</dt><dd>${i.h.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(o).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(o*i.p).toLocaleString("es-CO")} m²</dd>`,te&&(te.hidden=!1)}m.onPick=i=>{y&&ce(i?y.buildingAt(i):null)};f("cardClose")?.addEventListener("click",()=>ce(null));f("cardFocus")?.addEventListener("click",()=>{if(!C)return;N();const i=Math.max(C.bb[2]-C.bb[0],C.bb[3]-C.bb[1],C.h);m.flyTo({pivot:Zt(C),pitch:-.42,range:Math.max(60,i*2.1)},1.7)});f("cardWalk")?.addEventListener("click",()=>{C&&(N(),m.enterWalk(st(C)))});const we=f("status"),$e=f("statusText");async function Qt(){ve("Contexto geográfico",.04),await new Promise(e=>setTimeout(e,30)),y=await Bt(M,(e,t)=>ve(e,t),(e,t,a)=>{!we||!$e||(we.hidden=!1,$e.textContent=e<t?`Cargando secciones ${e}/${t} · ${a}`:`Modelo completo · ${t} secciones`,e>=t&&setTimeout(()=>we.classList.add("fade"),2600))}),y.setNight(oe),$(),ve("Listo",1),Z("general",2.4),Ke.classList.add("done"),setTimeout(()=>Ke.remove(),900);const i=f("hint");i&&setTimeout(()=>i.classList.add("fade"),9e3),window.__READY__=!0,y.done.then(()=>{window.__ALL__=!0})}const T={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Pt,viewer:M,cam:m,getSite:()=>y,enuToWorld:B,select:ce,stats:T,setQuality:i=>{A=i,$()}};Qt().catch(i=>{console.error(i),nt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(i?.message??i)});let Ze=performance.now(),ye=0;function rt(){const i=performance.now(),e=Math.min(.1,(i-Ze)/1e3);if(Ze=i,_){const t=Math.min(1,(i-_.start)/_.dur),a=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;M.clock.currentTime=J.fromDate(new Date(_.from+(_.to-_.from)*a)),t>=1&&(_=null)}if(W&&!m.isWalking&&m.flyTo({heading:m.state.heading+.16*e},0),m.update(e),T.frames++,i-T.t0>=2e3){T.fps=Math.round(T.frames*1e3/(i-T.t0)),T.frames=0,T.t0=i,window.__FPS__=T.fps;const t=!!y&&y.sections.loaded>=y.sections.total&&i-ye>8e3;y&&y.sections.loaded>=y.sections.total&&!ye&&(ye=i),t&&document.visibilityState==="visible"&&(T.fps<20&&A>.25&&!window.__DBG__.lock?++T.low>=3&&(A=A>=1?.5:.25,T.low=0,$()):T.low=0)}requestAnimationFrame(rt)}requestAnimationFrame(rt);addEventListener("resize",$);
