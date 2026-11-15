var Ve=Object.defineProperty;var je=(e,t,i)=>t in e?Ve(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var h=(e,t,i)=>je(e,typeof t!="symbol"?t+"":t,i);import{C as l,a as He,T as le,M as k,b as G,c as Y,H as Ue,d as Z,L as We,U as L,V as N,e as Be,f as Ye,g as qe,h as Te,i as Xe,S as O,j as Ge,R as Ke,k as Je,A as Pe,l as $e,I as Ze,m as Qe,n as et,o as tt,J as j,p as it,P as at,q as ke,r as ot}from"./cesium-BgL5HbRC.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const ae="/HLF/",nt=ae.endsWith("/")?ae:ae+"/",st=nt+"cesium/";window.CESIUM_BASE_URL=st;const oe={longitude:-74.04145021,latitude:4.70207636,height:2572},ne={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},K={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},$={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},rt=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Ee=-1.5533,Le=-.012,ct=4200,lt=6,Se=1.7;class ht{constructor(t){h(this,"viewer");h(this,"canvas");h(this,"pivot",new l);h(this,"heading",.5);h(this,"pitch",-.6);h(this,"range",1200);h(this,"targetPivot",new l);h(this,"targetHeading",.5);h(this,"targetPitch",-.6);h(this,"targetRange",1200);h(this,"damping",9);h(this,"drag",null);h(this,"pointers",new Map);h(this,"pinch",null);h(this,"lastTap",0);h(this,"keys",new Set);h(this,"tween",null);h(this,"fov",He.toRadians(48));h(this,"walking",!1);h(this,"eye",new l);h(this,"eyeTarget",new l);h(this,"wHeading",0);h(this,"wPitch",0);h(this,"wHeadingT",0);h(this,"wPitchT",0);h(this,"onPick",null);h(this,"onModeChange",null);h(this,"groundHeight",null);this.viewer=t,this.canvas=t.scene.canvas,t.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:l.clone(this.targetPivot)}}setPivot(t,i=!0){if(i){const a=l.clone(this.viewer.camera.positionWC),o=l.subtract(a,t,new l),s=l.magnitude(o),r=le.eastNorthUpToFixedFrame(t),d=k.inverseTransformation(r,new k),u=k.multiplyByPointAsVector(d,o,new l);if(s>1){const w=-Math.asin(Math.max(-1,Math.min(1,u.z/s)));if(w<Le&&w>Ee){let g=Math.atan2(-u.x,-u.y);for(;g-this.heading>Math.PI;)g-=Math.PI*2;for(;g-this.heading<-Math.PI;)g+=Math.PI*2;this.heading=this.targetHeading=g,this.pitch=this.targetPitch=w,this.range=this.targetRange=this.clamp(s),l.clone(t,this.pivot)}}}this.targetPivot=l.clone(t),this.tween=null}bind(){const t=this.canvas;t.style.touchAction="none",t.addEventListener("pointerdown",a=>{if(t.setPointerCapture(a.pointerId),this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2){const[o,s]=[...this.pointers.values()];this.pinch={distance:Math.hypot(o.x-s.x,o.y-s.y),range:this.targetRange,cx:(o.x+s.x)/2,cy:(o.y+s.y)/2},this.drag=null;return}a.button===2||a.button===1||a.shiftKey?this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"pan",moved:!1}:a.button===0&&(this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"orbit",moved:!1}),this.tween=null}),t.addEventListener("pointermove",a=>{if(!this.pointers.has(a.pointerId))return;if(this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2&&this.pinch){const[r,d]=[...this.pointers.values()],u=Math.hypot(r.x-d.x,r.y-d.y),w=(r.x+d.x)/2,g=(r.y+d.y)/2;this.walking?this.walk((this.pinch.cy-g)*.06,0):(u>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/u)),this.pan(this.pinch.cx-w,g-this.pinch.cy)),this.pinch.cx=w,this.pinch.cy=g;return}if(!this.drag||a.pointerId!==this.drag.id)return;const o=a.offsetX-this.drag.x,s=a.offsetY-this.drag.y;this.drag.x=a.offsetX,this.drag.y=a.offsetY,Math.abs(o)+Math.abs(s)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=o*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+s*.0028))):this.walk(s*.05,-o*.05):this.drag.mode==="orbit"?(this.targetHeading-=o*.0042,this.targetPitch=this.clampPitch(this.targetPitch-s*.0034)):this.pan(-o,s)});const i=a=>{if(this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&a.pointerId===this.drag.id){const o=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,o&&a.type==="pointerup"){const s=new G(a.offsetX,a.offsetY),r=performance.now();if(a.pointerType!=="mouse"&&r-this.lastTap<320){this.lastTap=0,this.focusAt(s);return}this.lastTap=r;const d=this.pickWorld(s);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i),t.addEventListener("contextmenu",a=>a.preventDefault()),t.addEventListener("wheel",a=>{a.preventDefault(),this.tween=null;const o=a.deltaMode===1?16:a.deltaMode===2?100:1,s=a.deltaY*o;if(this.walking){this.walk(-s*.02,0);return}const r=Math.exp(Math.max(-.45,Math.min(.45,s*.0016))),d=this.pickWorld(new G(a.offsetX,a.offsetY)),u=this.clamp(this.targetRange*r);if(d&&r<1){const w=Math.min(.45,(this.targetRange-u)/this.targetRange)*.8,g=l.subtract(d,this.targetPivot,new l),T=l.magnitude(g);if(T>1){const I=Math.min(T,this.targetRange)*w/T;l.add(this.targetPivot,l.multiplyByScalar(g,I,g),this.targetPivot)}}this.targetRange=u},{passive:!1}),t.addEventListener("dblclick",a=>{a.preventDefault(),this.focusAt(new G(a.offsetX,a.offsetY))}),addEventListener("keydown",a=>{a.target instanceof HTMLInputElement||(this.keys.add(a.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(a.code)&&a.preventDefault())}),addEventListener("keyup",a=>this.keys.delete(a.code)),addEventListener("blur",()=>this.keys.clear())}clamp(t,i=lt,a=ct){return Math.max(i,Math.min(a,t))}clampPitch(t){return Math.max(Ee,Math.min(Le,t))}moveHorizontal(t,i,a,o){const s=le.eastNorthUpToFixedFrame(t),r=new l(Math.sin(i)*a+Math.cos(i)*o,Math.cos(i)*a-Math.sin(i)*o,0);k.multiplyByPoint(s,r,t)}pan(t,i){const a=this.canvas.clientHeight||1,o=2*this.range*Math.tan(this.fov/2)/a,s=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,i*o/s,t*o),this.tween=null}walk(t,i){this.moveHorizontal(this.eyeTarget,this.wHeading,t,i),this.snapEye()}snapEye(){const t=Y.fromCartesian(this.eyeTarget),i=this.groundHeight?.(t);i!==void 0&&Number.isFinite(i)&&(t.height=i+Se,Y.toCartesian(t,void 0,this.eyeTarget))}pickWorld(t){const i=this.viewer.scene;let a;if(i.pickPositionSupported&&i.pick(t,4,4)&&(a=i.pickPosition(t)),!a){const o=i.camera.getPickRay(t);o&&(a=i.globe.pick(o,i)??void 0)}return a??null}focusAt(t){const i=this.pickWorld(t);if(i){if(this.walking){l.clone(i,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:i,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(t,i=2){this.walking&&this.exitWalk(!1);const a={pivot:t.pivot??l.clone(this.targetPivot),heading:t.heading??this.targetHeading,pitch:t.pitch??this.targetPitch,range:t.range??this.targetRange};let o=a.heading;for(;o-this.targetHeading>Math.PI;)o-=Math.PI*2;for(;o-this.targetHeading<-Math.PI;)o+=Math.PI*2;if(a.heading=o,i<=.02){this.tween=null,this.targetPivot=l.clone(a.pivot),this.pivot=l.clone(a.pivot),this.heading=this.targetHeading=a.heading,this.pitch=this.targetPitch=a.pitch,this.range=this.targetRange=a.range;return}this.tween={from:{pivot:l.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:a,start:performance.now(),duration:i*1e3}}enterWalk(t){l.clone(t??this.targetPivot,this.eyeTarget),this.snapEye(),l.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(t=!0){if(!this.walking)return;this.walking=!1;const i=Y.fromCartesian(this.eyeTarget);i.height-=Se-1;const a=Y.toCartesian(i);this.pivot=l.clone(a),this.targetPivot=a,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,t?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(t){if(!this.keys.size)return;const i=this.keys,a=i.has("ShiftLeft")||i.has("ShiftRight")?3:1;let o=0,s=0;(i.has("KeyW")||i.has("ArrowUp"))&&(o+=1),(i.has("KeyS")||i.has("ArrowDown"))&&(o-=1),(i.has("KeyD")||i.has("ArrowRight"))&&(s+=1),(i.has("KeyA")||i.has("ArrowLeft"))&&(s-=1);let r=0;if(i.has("KeyQ")&&(r+=1),i.has("KeyE")&&(r-=1),this.walking){r&&(this.wHeadingT-=r*1.2*t),(o||s)&&this.walk(o*4.2*a*t,s*3.4*a*t);return}if(r&&(this.targetHeading+=r*.9*t,this.tween=null),(i.has("PageUp")||i.has("Equal")||i.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*t))),(i.has("PageDown")||i.has("Minus")||i.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*t))),i.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*t)),i.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*t)),!o&&!s)return;const d=Math.max(8,this.range*.6)*a*t;this.moveHorizontal(this.targetPivot,this.heading,o*d,s*d),this.tween=null}update(t){this.updateKeys(t);const i=1-Math.exp(-this.damping*t);if(this.walking){l.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*t),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*i,this.wPitch+=(this.wPitchT-this.wPitch)*i,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const a=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),o=rt(a),{from:s,to:r}=this.tween;l.lerp(s.pivot,r.pivot,o,this.targetPivot),this.targetHeading=s.heading+(r.heading-s.heading)*o,this.targetPitch=s.pitch+(r.pitch-s.pitch)*o,this.targetRange=Math.exp(Math.log(s.range)+(Math.log(r.range)-Math.log(s.range))*o),a>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*i,this.pitch+=(this.targetPitch-this.pitch)*i,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*i),l.lerp(this.pivot,this.targetPivot,i,this.pivot),this.viewer.camera.lookAt(this.pivot,new Ue(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(k.IDENTITY)}}const Q=`
  vec3 hlfHazeColor(float night) { return mix(vec3(0.70, 0.72, 0.74), vec3(0.03, 0.04, 0.07), night); }
  float hlfHaze(float d) { return 0.0; }   // sin neblina
`;function dt(){return new Z({uniforms:{uNight:{type:L.FLOAT,value:0}},varyings:{vPosM:N.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
      }
    `,fragmentShaderText:Q+`
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
    `})}function ft(e,t,i){return new Z({uniforms:{uNight:{type:L.FLOAT,value:0},uFrame:{type:L.FLOAT,value:t},uTop:{type:L.FLOAT,value:i},uAtlas:{type:L.SAMPLER_2D,value:new Be({url:e,repeat:!1,minificationFilter:Ye.LINEAR_MIPMAP_LINEAR,magnificationFilter:qe.LINEAR})}},varyings:{vUV:N.VEC2,vView:N.VEC3,vRightT:N.VEC2,vUpT:N.VEC2},vertexShaderText:`
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
    `,fragmentShaderText:Q+`
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
    `})}function ut(){return new Z({uniforms:{uNight:{type:L.FLOAT,value:0}},lightingModel:We.UNLIT,fragmentShaderText:Q+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(0.15, 0.18, 0.25), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight), hlfHaze(length(fsInput.attributes.positionEC)));
      }
    `})}function gt(e){return new Z({uniforms:{uNight:{type:L.FLOAT,value:0},uCapa:{type:L.FLOAT,value:e}},varyings:{vG:N.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
      }
    `,fragmentShaderText:Q+`
      float gh(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float gn(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(gh(i), gh(i + vec2(1.0, 0.0)), f.x), mix(gh(i + vec2(0.0, 1.0)), gh(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec2 p = vG.xz;
        float dist = length(fsInput.attributes.positionEC);
        float near = 1.0 - smoothstep(60.0, 260.0, dist);
        float big = gn(p * 0.035);
        float mid = gn(p * 0.35);
        vec3 col;
        float rough = 0.95;
        if (uCapa < 0.5) {            // terreno: prado y tierra
          col = mix(vec3(0.27, 0.36, 0.20), vec3(0.36, 0.44, 0.25), big);
          col = mix(col, vec3(0.42, 0.40, 0.30), smoothstep(0.70, 0.95, gn(p * 0.08 + 7.0)) * 0.5);
          col *= 0.92 + 0.16 * mid;
          col *= 1.0 - near * 0.18 * (gn(p * 3.0) - 0.5);
        } else if (uCapa < 1.5) {     // vía: asfalto
          col = mix(vec3(0.20, 0.20, 0.21), vec3(0.27, 0.27, 0.27), big);
          col *= 0.94 + 0.12 * mid;
          col *= 1.0 - near * 0.10 * (gh(floor(p * 14.0)) - 0.5);
          rough = 0.9;
        } else if (uCapa < 2.5) {     // andén: adoquín y concreto claro
          col = mix(vec3(0.62, 0.60, 0.56), vec3(0.70, 0.68, 0.63), big);
          col *= 0.95 + 0.10 * mid;
          vec2 g = abs(fract(p / vec2(0.4, 0.2)) - 0.5);
          col *= 1.0 - near * 0.16 * smoothstep(0.44, 0.5, max(g.x, g.y));
        } else if (uCapa < 3.5) {     // separador: prado cuidado
          col = mix(vec3(0.30, 0.42, 0.22), vec3(0.38, 0.50, 0.27), big) * (0.92 + 0.16 * mid);
        } else if (uCapa < 4.5) {     // ciclorruta
          col = vec3(0.50, 0.27, 0.22) * (0.92 + 0.14 * mid);
        } else if (uCapa < 5.5) {     // agua del canal
          col = mix(vec3(0.16, 0.24, 0.24), vec3(0.22, 0.30, 0.29), mid);
          rough = 0.18;
        } else {                      // canal y puentes: concreto
          col = mix(vec3(0.56, 0.55, 0.52), vec3(0.64, 0.63, 0.60), big) * (0.94 + 0.10 * mid);
        }
        float hz = hlfHaze(dist);
        material.diffuse = col * mix(1.0, 0.35, uNight) * (1.0 - hz);
        material.roughness = rough;
        material.specular = vec3(0.03) * (1.0 - hz);
        material.emissive = col * 0.16 * (1.0 - uNight) * (1.0 - hz) + hlfHazeColor(uNight) * hz;
      }
    `})}function Re(){return le.eastNorthUpToFixedFrame(l.fromDegrees(oe.longitude,oe.latitude,oe.height))}function U(e,t,i,a=Re()){return k.multiplyByPoint(a,new l(e,t,i),new l)}const pt={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function mt(e,t,i){let a=!1;for(let o=0,s=i.length-1;o<i.length;s=o++){const[r,d]=i[o],[u,w]=i[s];d>t!=w>t&&e<(u-r)*(t-d)/(w-d)+r&&(a=!a)}return a}function vt(e,t,i){let a=1/0;for(let o=0,s=i.length-1;o<i.length;s=o++){const[r,d]=i[s],[u,w]=i[o],g=u-r,T=w-d,I=Math.max(0,Math.min(1,((e-r)*g+(t-d)*T)/(g*g+T*T||1)));a=Math.min(a,Math.hypot(e-r-I*g,t-d-I*T))}return a}async function wt(e,t,i){const a=e.scene,o=Re(),s=k.inverseTransformation(o,new k),r=$.secciones;t("Contexto urbano",.08);const[d,u,w,g]=await Promise.all([fetch(r+"recorte.json").then(n=>n.json()),fetch(r+"edificios.json").then(n=>n.json()),fetch(r+"arboles.json").then(n=>n.json()),fetch(r+"suelo.json").then(n=>n.json())]),T=()=>d.clips.map(n=>{const c=new Ge({positions:l.fromDegreesArray(n.flat())}),y=c.computeRectangle();return c.computeRectangle=R=>Ke.clone(y,R),c});a.globe.clippingPolygons=new Te({polygons:T()});const I=ut();let D=null;try{D=await Xe.fromUrl($.googleTiles,{maximumScreenSpaceError:10,shadows:O.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),D.clippingPolygons=new Te({polygons:T()}),D.customShader=I,a.primitives.add(D)}catch(n){console.warn("Tiles de Google no disponibles",n)}const ge=[-236,330],z=[];for(const n of u.secciones)z.push({key:n.key,file:n.file,kind:"edificios",label:n.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${n.key}`,dist:n.key==="Hotel"?-2:Math.hypot(n.c[0]-ge[0],n.c[1]-ge[1])});z.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),z.sort((n,c)=>n.dist-c.dist);const pe={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},me=g.secciones.map(n=>({key:n.key,file:n.file,kind:"suelo",capa:pe[n.key]?.[0]??0,label:pe[n.key]?.[1]??n.key,dist:-3})),ve=w.secciones.map(n=>({key:n.key,file:n.file,kind:"arboles",atlas:n.atlas,marco:n.marco,marcoSup:n.marcoSup,label:pt[n.key]??"Vegetación",dist:0})),H=[...me,...z.slice(0,4),...ve.slice(0,3),...z.slice(4,9),...ve.slice(3),...z.slice(9)],we=dt(),ye=[],xe=[];let te=0;const be=[],V={total:H.length,loaded:0,failed:[]},Me=async n=>{try{const c=await Je.fromGltfAsync({url:r+n.file,modelMatrix:o,upAxis:Pe.Y,forwardAxis:Pe.X,shadows:n.kind==="arboles"?O.CAST_ONLY:n.kind==="suelo"?O.RECEIVE_ONLY:O.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:n.kind!=="arboles"});if(n.kind==="suelo"){const y=gt(n.capa??0);y.setUniform("uNight",te),be.push(y),c.customShader=y}else if(n.kind==="arboles"){const y=ft(r+n.atlas,n.marco,n.marcoSup);y.setUniform("uNight",te),ye.push(y),c.customShader=y}else c.customShader=we;c.imageBasedLighting.imageBasedLightingFactor=new G(.45,.25),a.primitives.add(c),n.kind==="arboles"&&xe.push(c),await new Promise(y=>{if(c.ready)return y();const R=c.readyEvent.addEventListener(()=>{R(),y()});setTimeout(y,2e4)})}catch(c){console.error("Sección no cargada",n.file,c),V.failed.push(n.file)}V.loaded++,i?.(V.loaded,V.total,n.label)},ie=me.length+7;for(let n=0;n<Math.min(ie,H.length);n++)t(H[n].label,.2+.75*n/ie),await Me(H[n]);const De=(async()=>{for(let n=ie;n<H.length;n++)await Me(H[n]),await new Promise(c=>setTimeout(c,60))})();return{matrix:o,inverse:s,tileset:D,buildings:u.edificios,treeCount:w.total,sections:V,done:De,setNight(n){I.setUniform("uNight",n),we.setUniform("uNight",n),te=n;for(const c of be)c.setUniform("uNight",n);for(const c of ye)c.setUniform("uNight",n)},setTreesVisible(n){for(const c of xe)c.show=n},buildingAt(n){const c=k.multiplyByPoint(s,n,new l);let y=null,R=1.2;for(const P of u.edificios){if(c.x<P.bb[0]-1.5||c.x>P.bb[2]+1.5||c.y<P.bb[1]-1.5||c.y>P.bb[3]+1.5||c.z>P.b+P.h+2.5)continue;if(mt(c.x,c.y,P.r))return P;const Ce=vt(c.x,c.y,P.r);Ce<R&&(R=Ce,y=P)}return y}}}ot.defaultAccessToken=$.ionToken;const f=e=>document.getElementById(e),de=f("cesiumContainer"),Ie=f("loading"),yt=f("loadBar"),Ne=f("loadLabel"),xt=f("loadPct");function se(e,t){Ne.textContent=e;const i=Math.round(Math.max(0,Math.min(1,t))*100);yt.style.width=i+"%",xt.textContent=i+"%"}const x=new $e(de,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:O.RECEIVE_ONLY,terrain:et.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Ze.fromProviderAsync(Qe.fromAssetId($.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),m=x.scene;m.globe.enableLighting=!0;m.globe.showGroundAtmosphere=!0;m.globe.depthTestAgainstTerrain=!0;m.globe.maximumScreenSpaceError=2;m.fog.enabled=!1;m.fog.density=18e-5;m.fog.minimumBrightness=.04;m.highDynamicRange=!0;m.msaaSamples=4;m.postProcessStages.fxaa.enabled=!0;m.screenSpaceCameraController.enableCollisionDetection=!1;m.light=new tt({intensity:2.3});const S=x.shadowMap;S.softShadows=!0;S.size=2048;S.maximumDistance=900;S.darkness=.42;S.normalOffset=!0;{const e=S;e._primitiveBias.depthBias=.0012,e._primitiveBias.normalOffsetScale=2.2,e._primitiveBias.normalShadingSmooth=.25}const A=m.postProcessStages.ambientOcclusion;A.enabled=!0;A.uniforms.intensity=1.6;A.uniforms.bias=.12;A.uniforms.lengthCap=.28;A.uniforms.stepSize=1.6;A.uniforms.blurStepSize=.9;x.camera.frustum.fov=He.toRadians(48);const Ae=(()=>{try{const e=m.context._gl,t=e.getExtension("WEBGL_debug_renderer_info");return t?String(e.getParameter(t.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),bt=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Ae)&&!/Arc/i.test(Ae);let v=null,M=bt||matchMedia("(pointer: coarse)").matches?.5:1;function W(){const e=Math.min(window.devicePixelRatio||1,2);x.resolutionScale=e*(M>=1?1:M>=.5?.8:.62),S.size=M>=1?2048:1024,S.softShadows=M>=.5,A.enabled=M>=1,m.msaaSamples=M>=1?4:1,x.shadows=M>=.5,v?.tileset&&(v.tileset.maximumScreenSpaceError=M>=1?8:M>=.5?12:20)}W();x.clock.shouldAnimate=!1;x.clock.currentTime=j.fromIso8601("2026-06-21T10:10:00-05:00");const p=new ht(x),fe=e=>U(ne[e].e,ne[e].n,ne[e].u),Mt=fe("hotel");p.flyTo({pivot:Mt,heading:K.general.heading,pitch:K.general.pitch,range:K.general.range*1.8},0);p.groundHeight=e=>m.globe.getHeight(e);const Ct=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,fog:22e-5,label:"10:10",sun:2.3},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.1,fog:3e-4,label:"16:50",sun:2.1},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,fog:2e-4,label:"19:35",sun:1}];let J=0,E=null;const Tt=e=>j.toDate(j.fromIso8601(e)).getTime();function Pt(e){E={from:j.toDate(x.clock.currentTime).getTime(),to:Tt(e.iso),start:performance.now(),dur:1600},m.fog.density=e.fog,m.light.intensity=e.sun;const i=J,a=performance.now(),o=()=>{const r=Math.min(1,(performance.now()-a)/1400);J=i+(e.night-i)*(r*r*(3-2*r)),v?.setNight(J),r<1&&requestAnimationFrame(o)};requestAnimationFrame(o),document.querySelectorAll("[data-light]").forEach(r=>r.classList.toggle("on",r.dataset.light===e.id));const s=f("clockLabel");s&&(s.textContent=e.label)}document.querySelectorAll("[data-light]").forEach(e=>{e.addEventListener("click",()=>{const t=Ct.find(i=>i.id===e.dataset.light);t&&Pt(t)})});let F=!1;const he=f("btnOrbit"),ue=f("btnPedestrian");function _(){F=!1,he?.classList.remove("on")}function B(e,t=2){_();const i=K[e];p.flyTo({pivot:fe(i.place),heading:i.heading,pitch:i.pitch,range:i.range},t)}f("btnHome")?.addEventListener("click",()=>B("general",2.2));f("btnAerial")?.addEventListener("click",()=>B("aerial"));f("btnArch")?.addEventListener("click",()=>B("arch"));ue?.addEventListener("click",()=>{_(),p.isWalking?p.exitWalk():p.enterWalk(C?Oe(C):void 0)});p.onModeChange=e=>{ue?.classList.toggle("on",e);const t=f("hint");t&&e&&(t.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",t.classList.remove("fade"),setTimeout(()=>t.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(e=>{e.addEventListener("click",()=>{_();const t=e.dataset.place;p.flyTo({pivot:fe(t),range:t==="hotel"?300:520,pitch:-.5},2)})});he?.addEventListener("click",()=>{F=!F,he.classList.toggle("on",F),F&&p.isWalking&&p.exitWalk()});de.addEventListener("pointerdown",_);de.addEventListener("wheel",_,{passive:!0});addEventListener("keydown",e=>{e.code==="Escape"&&(p.isWalking?p.exitWalk():ee(null)),(e.code==="KeyH"||e.code==="Home")&&B("general",2.2),e.code==="KeyP"&&ue?.click()});let C=null,q=null;const X=f("card");function kt(e){return U((e.bb[0]+e.bb[2])/2,(e.bb[1]+e.bb[3])/2,e.b+e.h*.5)}function Oe(e){return U((e.bb[0]+e.bb[2])/2,e.bb[1]-9,e.b)}function ee(e){if(C=e,q&&(x.entities.remove(q),q=null),!e||!v){X&&(X.hidden=!0);return}const t=e.r.map(([s,r])=>U(s,r,0,v.matrix)),i=2572+e.b-.5;q=x.entities.add({polygon:{hierarchy:new at(t),height:i,extrudedHeight:i+e.h+2.2,material:ke.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:ke.fromCssColorString("#d7ebff"),shadows:O.DISABLED}});const a=e.s==="Hotel",o=Math.abs(e.r.reduce((s,r,d)=>{const u=e.r[(d+1)%e.r.length];return s+r[0]*u[1]-u[0]*r[1]},0)/2);f("cardKind").textContent=a?"Proyecto":`Sector ${e.s}`,f("cardTitle").textContent=a?"Hotel La Fontana":`Edificación ${e.id+1}`,f("cardData").innerHTML=`<dt>Pisos</dt><dd>${e.p}</dd><dt>Altura</dt><dd>${e.h.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(o).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(o*e.p).toLocaleString("es-CO")} m²</dd>`,X&&(X.hidden=!1)}p.onPick=e=>{v&&ee(e?v.buildingAt(e):null)};f("cardClose")?.addEventListener("click",()=>ee(null));f("cardFocus")?.addEventListener("click",()=>{if(!C)return;_();const e=Math.max(C.bb[2]-C.bb[0],C.bb[3]-C.bb[1],C.h);p.flyTo({pivot:kt(C),pitch:-.42,range:Math.max(60,e*2.1)},1.7)});f("cardWalk")?.addEventListener("click",()=>{C&&(_(),p.enterWalk(Oe(C)))});const re=f("status"),_e=f("statusText");async function Et(){se("Contexto geográfico",.04),await new Promise(t=>setTimeout(t,30)),v=await wt(x,(t,i)=>se(t,i),(t,i,a)=>{!re||!_e||(re.hidden=!1,_e.textContent=t<i?`Cargando secciones ${t}/${i} · ${a}`:`Modelo completo · ${i} secciones`,t>=i&&setTimeout(()=>re.classList.add("fade"),2600))}),v.setNight(J),W(),se("Listo",1),B("general",2.4),Ie.classList.add("done"),setTimeout(()=>Ie.remove(),900);const e=f("hint");e&&setTimeout(()=>e.classList.add("fade"),9e3),window.__READY__=!0,v.done.then(()=>{window.__ALL__=!0})}const b={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:it,viewer:x,cam:p,getSite:()=>v,enuToWorld:U,select:ee,stats:b,setQuality:e=>{M=e,W()}};Et().catch(e=>{console.error(e),Ne.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(e?.message??e)});let ze=performance.now(),ce=0;function Fe(){const e=performance.now(),t=Math.min(.1,(e-ze)/1e3);if(ze=e,E){const i=Math.min(1,(e-E.start)/E.dur),a=i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;x.clock.currentTime=j.fromDate(new Date(E.from+(E.to-E.from)*a)),i>=1&&(E=null)}if(F&&!p.isWalking&&p.flyTo({heading:p.state.heading+.16*t},0),p.update(t),b.frames++,e-b.t0>=2e3){b.fps=Math.round(b.frames*1e3/(e-b.t0)),b.frames=0,b.t0=e,window.__FPS__=b.fps;const i=!!v&&v.sections.loaded>=v.sections.total&&e-ce>8e3;v&&v.sections.loaded>=v.sections.total&&!ce&&(ce=e),i&&document.visibilityState==="visible"&&(b.fps<20&&M>.25&&!window.__DBG__.lock?++b.low>=3&&(M=M>=1?.5:.25,b.low=0,W()):b.low=0)}requestAnimationFrame(Fe)}requestAnimationFrame(Fe);addEventListener("resize",W);
