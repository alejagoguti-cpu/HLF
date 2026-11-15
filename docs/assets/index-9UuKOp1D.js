var It=Object.defineProperty;var _t=(e,t,i)=>t in e?It(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var x=(e,t,i)=>_t(e,typeof t!="symbol"?t+"":t,i);import{C as f,a as Tt,T as Je,M as N,b as Ee,c as Ce,H as Rt,P as Ct,d as De,L as Ht,U as I,V as Z,e as et,f as Oe,g as tt,h as ot,i as lt,j as Nt,S as ie,I as Et,k as Ft,R as Dt,l as Ze,A as ve,m as H,n as ht,o as dt,p as ut,q as Ot,r as Ut,s as Vt,t as jt,J as Ae,u as Wt,v as Bt,w as Yt}from"./cesium-ICe9G6Ok.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function i(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(s){if(s.ep)return;s.ep=!0;const l=i(s);fetch(s.href,l)}})();const Be="/HLF/",qt=Be.endsWith("/")?Be:Be+"/",Xt=qt+"cesium/";window.CESIUM_BASE_URL=Xt;const Re={longitude:-74.04145021,latitude:4.70207636,height:2572},Ye={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},He={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},xe={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},Gt=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,ft=-1.5533,mt=-.012,Kt=4200,Jt=6,pt=1.7;class Zt{constructor(t){x(this,"viewer");x(this,"canvas");x(this,"pivot",new f);x(this,"heading",.5);x(this,"pitch",-.6);x(this,"range",1200);x(this,"targetPivot",new f);x(this,"targetHeading",.5);x(this,"targetPitch",-.6);x(this,"targetRange",1200);x(this,"damping",9);x(this,"drag",null);x(this,"pointers",new Map);x(this,"pinch",null);x(this,"lastTap",0);x(this,"keys",new Set);x(this,"tween",null);x(this,"fov",Tt.toRadians(48));x(this,"walking",!1);x(this,"eye",new f);x(this,"eyeTarget",new f);x(this,"wHeading",0);x(this,"wPitch",0);x(this,"wHeadingT",0);x(this,"wPitchT",0);x(this,"onPick",null);x(this,"onModeChange",null);x(this,"groundHeight",null);this.viewer=t,this.canvas=t.scene.canvas,t.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:f.clone(this.targetPivot)}}setPivot(t,i=!0){if(i){const o=f.clone(this.viewer.camera.positionWC),s=f.subtract(o,t,new f),l=f.magnitude(s),d=Je.eastNorthUpToFixedFrame(t),u=N.inverseTransformation(d,new N),w=N.multiplyByPointAsVector(u,s,new f);if(l>1){const C=-Math.asin(Math.max(-1,Math.min(1,w.z/l)));if(C<mt&&C>ft){let p=Math.atan2(-w.x,-w.y);for(;p-this.heading>Math.PI;)p-=Math.PI*2;for(;p-this.heading<-Math.PI;)p+=Math.PI*2;this.heading=this.targetHeading=p,this.pitch=this.targetPitch=C,this.range=this.targetRange=this.clamp(l),f.clone(t,this.pivot)}}}this.targetPivot=f.clone(t),this.tween=null}bind(){const t=this.canvas;t.style.touchAction="none",t.addEventListener("pointerdown",o=>{if(t.setPointerCapture(o.pointerId),this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2){const[s,l]=[...this.pointers.values()];this.pinch={distance:Math.hypot(s.x-l.x,s.y-l.y),range:this.targetRange,cx:(s.x+l.x)/2,cy:(s.y+l.y)/2},this.drag=null;return}o.button===2||o.button===1||o.shiftKey?this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"pan",moved:!1}:o.button===0&&(this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"orbit",moved:!1}),this.tween=null}),t.addEventListener("pointermove",o=>{if(!this.pointers.has(o.pointerId))return;if(this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2&&this.pinch){const[d,u]=[...this.pointers.values()],w=Math.hypot(d.x-u.x,d.y-u.y),C=(d.x+u.x)/2,p=(d.y+u.y)/2;this.walking?this.walk((this.pinch.cy-p)*.06,0):(w>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/w)),this.pan(this.pinch.cx-C,p-this.pinch.cy)),this.pinch.cx=C,this.pinch.cy=p;return}if(!this.drag||o.pointerId!==this.drag.id)return;const s=o.offsetX-this.drag.x,l=o.offsetY-this.drag.y;this.drag.x=o.offsetX,this.drag.y=o.offsetY,Math.abs(s)+Math.abs(l)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=s*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+l*.0028))):this.walk(l*.05,-s*.05):this.drag.mode==="orbit"?(this.targetHeading-=s*.0042,this.targetPitch=this.clampPitch(this.targetPitch-l*.0034)):this.pan(-s,l)});const i=o=>{if(this.pointers.delete(o.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&o.pointerId===this.drag.id){const s=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,s&&o.type==="pointerup"){const l=new Ee(o.offsetX,o.offsetY),d=performance.now();if(o.pointerType!=="mouse"&&d-this.lastTap<320){this.lastTap=0,this.focusAt(l);return}this.lastTap=d;const u=this.pickWorld(l);u&&!this.walking&&this.setPivot(u,!0),this.onPick?.(u)}}};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i),t.addEventListener("contextmenu",o=>o.preventDefault()),t.addEventListener("wheel",o=>{o.preventDefault(),this.tween=null;const s=o.deltaMode===1?16:o.deltaMode===2?100:1,l=o.deltaY*s;if(this.walking){this.walk(-l*.02,0);return}const d=Math.exp(Math.max(-.45,Math.min(.45,l*.0016))),u=this.pickWorld(new Ee(o.offsetX,o.offsetY)),w=this.clamp(this.targetRange*d);if(u&&d<1){const C=Math.min(.45,(this.targetRange-w)/this.targetRange)*.8,p=f.subtract(u,this.targetPivot,new f),g=f.magnitude(p);if(g>1){const v=Math.min(g,this.targetRange)*C/g;f.add(this.targetPivot,f.multiplyByScalar(p,v,p),this.targetPivot)}}this.targetRange=w},{passive:!1}),t.addEventListener("dblclick",o=>{o.preventDefault(),this.focusAt(new Ee(o.offsetX,o.offsetY))}),addEventListener("keydown",o=>{o.target instanceof HTMLInputElement||(this.keys.add(o.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(o.code)&&o.preventDefault())}),addEventListener("keyup",o=>this.keys.delete(o.code)),addEventListener("blur",()=>this.keys.clear())}clamp(t,i=Jt,o=Kt){return Math.max(i,Math.min(o,t))}clampPitch(t){return Math.max(ft,Math.min(mt,t))}moveHorizontal(t,i,o,s){const l=Je.eastNorthUpToFixedFrame(t),d=new f(Math.sin(i)*o+Math.cos(i)*s,Math.cos(i)*o-Math.sin(i)*s,0);N.multiplyByPoint(l,d,t)}pan(t,i){const o=this.canvas.clientHeight||1,s=2*this.range*Math.tan(this.fov/2)/o,l=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,i*s/l,t*s),this.tween=null}walk(t,i){this.moveHorizontal(this.eyeTarget,this.wHeading,t,i),this.snapEye()}snapEye(){const t=Ce.fromCartesian(this.eyeTarget),i=this.groundHeight?.(t);i!==void 0&&Number.isFinite(i)&&(t.height=i+pt,Ce.toCartesian(t,void 0,this.eyeTarget))}pickWorld(t){const i=this.viewer.scene;let o;if(i.pickPositionSupported&&i.pick(t,4,4)&&(o=i.pickPosition(t)),!o){const s=i.camera.getPickRay(t);s&&(o=i.globe.pick(s,i)??void 0)}return o??null}focusAt(t){const i=this.pickWorld(t);if(i){if(this.walking){f.clone(i,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:i,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(t,i=2){this.walking&&this.exitWalk(!1);const o={pivot:t.pivot??f.clone(this.targetPivot),heading:t.heading??this.targetHeading,pitch:t.pitch??this.targetPitch,range:t.range??this.targetRange};let s=o.heading;for(;s-this.targetHeading>Math.PI;)s-=Math.PI*2;for(;s-this.targetHeading<-Math.PI;)s+=Math.PI*2;if(o.heading=s,i<=.02){this.tween=null,this.targetPivot=f.clone(o.pivot),this.pivot=f.clone(o.pivot),this.heading=this.targetHeading=o.heading,this.pitch=this.targetPitch=o.pitch,this.range=this.targetRange=o.range;return}this.tween={from:{pivot:f.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:o,start:performance.now(),duration:i*1e3}}enterWalk(t){f.clone(t??this.targetPivot,this.eyeTarget),this.snapEye(),f.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(t=!0){if(!this.walking)return;this.walking=!1;const i=Ce.fromCartesian(this.eyeTarget);i.height-=pt-1;const o=Ce.toCartesian(i);this.pivot=f.clone(o),this.targetPivot=o,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,t?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(t){if(!this.keys.size)return;const i=this.keys,o=i.has("ShiftLeft")||i.has("ShiftRight")?3:1;let s=0,l=0;(i.has("KeyW")||i.has("ArrowUp"))&&(s+=1),(i.has("KeyS")||i.has("ArrowDown"))&&(s-=1),(i.has("KeyD")||i.has("ArrowRight"))&&(l+=1),(i.has("KeyA")||i.has("ArrowLeft"))&&(l-=1);let d=0;if(i.has("KeyQ")&&(d+=1),i.has("KeyE")&&(d-=1),this.walking){d&&(this.wHeadingT-=d*1.2*t),(s||l)&&this.walk(s*4.2*o*t,l*3.4*o*t);return}if(d&&(this.targetHeading+=d*.9*t,this.tween=null),(i.has("PageUp")||i.has("Equal")||i.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*t))),(i.has("PageDown")||i.has("Minus")||i.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*t))),i.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*t)),i.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*t)),!s&&!l)return;const u=Math.max(8,this.range*.6)*o*t;this.moveHorizontal(this.targetPivot,this.heading,s*u,l*u),this.tween=null}update(t){this.updateKeys(t);const i=1-Math.exp(-this.damping*t);if(this.walking){f.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*t),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*i,this.wPitch+=(this.wPitchT-this.wPitch)*i,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const o=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),s=Gt(o),{from:l,to:d}=this.tween;f.lerp(l.pivot,d.pivot,s,this.targetPivot),this.targetHeading=l.heading+(d.heading-l.heading)*s,this.targetPitch=l.pitch+(d.pitch-l.pitch)*s,this.targetRange=Math.exp(Math.log(l.range)+(Math.log(d.range)-Math.log(l.range))*s),o>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*i,this.pitch+=(this.targetPitch-this.pitch)*i,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*i),f.lerp(this.pivot,this.targetPivot,i,this.pivot),this.viewer.camera.lookAt(this.pivot,new Rt(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(N.IDENTITY)}}function $t(){return new Oe({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const At=()=>({uAerial:{type:I.SAMPLER_2D,value:$t()},uAerialRect:{type:I.VEC4,value:new et(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:I.FLOAT,value:0}}),Lt=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,Ue=`
  vec3 hlfHazeColor(float night, float tarde) {
    vec3 day = vec3(0.66, 0.75, 0.86);
    // tarde bogotana: bruma andina limpia, ligeramente fría en la distancia
    vec3 sunset = vec3(0.66, 0.69, 0.76);
    vec3 nite = vec3(0.03, 0.05, 0.10);
    return mix(mix(day, sunset, tarde), nite, night);
  }
  float hlfHaze(float d) {
    return (1.0 - exp(-max(0.0, d - 800.0) * 0.00012)) * 0.14;
  }
  // Luz indirecta hemisférica (estilo Lumen SkyLight): cielo frío arriba, rebote cálido abajo
  vec3 hlfSkyFill(vec3 nEC, vec3 upEC, float night, float tarde) {
    float hemi = dot(normalize(nEC), normalize(upEC)) * 0.5 + 0.5;
    vec3 groundDay = vec3(0.46, 0.41, 0.36);
    vec3 skyDay = vec3(0.56, 0.74, 0.98);
    // en la tarde de Bogotá las sombras conservan el azul frío del cielo de montaña
    vec3 groundSunset = vec3(0.44, 0.40, 0.38);
    vec3 skySunset = vec3(0.54, 0.68, 0.90);
    vec3 dayFill = mix(mix(groundDay, skyDay, hemi), mix(groundSunset, skySunset, hemi), tarde);
    vec3 nightFill = mix(vec3(0.04, 0.05, 0.09), vec3(0.08, 0.12, 0.22), hemi);
    return mix(dayFill, nightFill, night);
  }
`;function Qt(){return new De({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uHotelPisos:{type:I.FLOAT,value:99},uLean:{type:I.VEC2,value:new Ee(0,0)},...At()},varyings:{vPosM:Z.VEC3,vUpEC:Z.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Ue+Lt+`
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

        // hotel en construcción: cubiertas y aleros solo cuando ya subieron todos los pisos
        if (uHotelPisos < 98.0 && tipo > 0.3 && tipo < 0.95) discard;

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
          if (hotel > 0.5 && v > uHotelPisos) discard;          // pisos que aún no se han apilado
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

          // sombra de dintel / nicho dentro del vano para dar profundidad 3D
          float dintel = smoothstep(hi.y - 0.15, hi.y, f.y) * vano * (1.0 - cortina * 0.5);
          float jamba = smoothstep(lo.x + 0.08, lo.x, f.x) * vano * (1.0 - cortina * 0.5);
          float nicho = max(dintel * 0.55, jamba * 0.35);

          if (near > 0.0) {
            vec3 viewDir = normalize(-fsInput.attributes.positionEC);
            vec3 nEC = normalize(material.normalEC);
            float fres = pow(1.0 - clamp(abs(dot(nEC, viewDir)), 0.0, 1.0), 4.0);
            // hiladas de ladrillo
            vec2 wp = vec2(uv.x * 3.3, v * 3.0);
            float cerca = (1.0 - smoothstep(0.004, 0.022, fwidth(wp.y))) * esLadrillo;
            if (cerca > 0.0) {
              float hil = fract(wp.y / 0.075);
              float trab = fract(wp.x / 0.25 + step(1.0, mod(floor(wp.y / 0.075), 2.0)) * 0.5);
              float junta = max(1.0 - smoothstep(0.0, 0.16, hil), 1.0 - smoothstep(0.0, 0.06, trab));
              col = mix(col, col * vec3(0.84, 0.83, 0.82), junta * cerca * 0.85);
              col *= mix(1.0, 0.92 + 0.16 * h21(floor(vec2(wp.x / 0.25, wp.y / 0.075))), cerca);
            }
            // marco y parteluces
            float marco = box(f, lo - vec2(0.024, 0.032), hi + vec2(0.024, 0.032), aa) * enCuerpo - vano;
            col = mix(col, cMarco, clamp(marco, 0.0, 1.0) * near * (1.0 - cortina * 0.6));
            parte = (1.0 - smoothstep(0.0, 0.012 + aa.x, abs(f.x - 0.5))) * step(0.6, ww);
            parte = max(parte, (1.0 - smoothstep(0.0, 0.012 + aa.y, abs(f.y - mix(wh0, wh1, 0.68)))) * (1.0 - cortina));
            parte *= near;
            // cortinas distintas por ventana, vitrinas en los locales
            float baja = mix(0.25, 0.95, h21(celda + 3.1));
            tela = step(0.55, wid) * (1.0 - cortina) * (1.0 - local) * step((f.y - wh0) / max(0.01, wh1 - wh0), baja);
            vec3 interior = mix(tinte * 0.72, mix(vec3(0.58, 0.56, 0.52), vec3(0.74, 0.72, 0.68), h21(celda + 9.4)), tela * 0.82 * near);
            interior = mix(interior, vec3(0.52, 0.46, 0.38), local * 0.65);
            float reflY = clamp(dot(reflect(-viewDir, nEC), normalize(vUpEC)) * 0.5 + 0.5, 0.0, 1.0);
            vec3 cieloDia = mix(vec3(0.72, 0.78, 0.84), vec3(0.42, 0.60, 0.85), reflY);
            vec3 cieloTarde = mix(vec3(0.76, 0.74, 0.76), vec3(0.40, 0.54, 0.78), reflY);
            vec3 cielo = mix(mix(cieloDia, cieloTarde, uTarde), vec3(0.03, 0.05, 0.10), uNight);
            vidrio = mix(tinte, mix(interior, cielo, clamp(0.22 + 0.72 * fres, 0.0, 1.0)), near);
            vidrio *= 1.0 - nicho * 0.55;
            vidrio = mix(vidrio, cMarco, parte);
          } else {
            vidrio *= 1.0 - nicho * 0.45;
          }
          float esVidrio = vano * (1.0 - parte);
          rough = mix(rough, 0.06, esVidrio);
          spec = mix(spec, vec3(0.44), esVidrio);
          // suciedad y contacto en la base
          col *= mix(1.0, 0.84, smoothstep(0.95, 0.0, v) * (1.0 - zocalo) * near);
          col = mix(col, vidrio, vano);

          // noche: ventanas encendidas con calidez ámbar para bloom sutil
          if (uNight > 0.01) {
            float on = step(0.52, h21(celda + 17.0 + rnd * 53.0));
            on = mix(on, step(0.25, wid), local);
            vec3 luz = mix(vec3(1.0, 0.56, 0.22), vec3(1.0, 0.78, 0.45), h21(celda + 5.5));
            emis = luz * on * esVidrio * (0.55 + 0.5 * (1.0 - tela)) * uNight * 1.05;
          }
          float bajoPlaca = (1.0 - smoothstep(0.86, 1.0, f.y)) * enCuerpo;
          occ = mix(0.58, 1.0, smoothstep(-0.35, 0.85, v)) * mix(0.84, 1.0, bajoPlaca) * (1.0 - nicho * 0.35);
          // el piso que está entrando se enciende un momento
          if (hotel > 0.5 && uHotelPisos < 98.0) emis += vec3(0.55, 0.75, 1.0) * smoothstep(1.0, 0.0, uHotelPisos - v) * 0.65;
        }

        float hz = hlfHaze(dist);
        vec3 skyFill = hlfSkyFill(material.normalEC, vUpEC, uNight, uTarde);
        material.diffuse = col * mix(1.0, 0.32, uNight) * (1.0 - hz);
        material.roughness = rough;
        material.specular = spec * (1.0 - hz);
        material.occlusion = occ;
        material.emissive = (emis + col * skyFill * occ * 0.24) * (1.0 - hz) + hlfHazeColor(uNight, uTarde) * hz;
      }
    `})}function eo(e,t,i){return new De({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uTime:{type:I.FLOAT,value:0},uFrame:{type:I.FLOAT,value:t},uTop:{type:I.FLOAT,value:i},uAtlas:{type:I.SAMPLER_2D,value:new Oe({url:e,repeat:!1,minificationFilter:tt.LINEAR_MIPMAP_LINEAR,magnificationFilter:ot.LINEAR})}},varyings:{vUV:Z.VEC2,vView:Z.VEC3,vRightT:Z.VEC2,vUpT:Z.VEC2,vUpEC:Z.VEC3},vertexShaderText:`
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
        // brisa natural en la copa (base fija en el suelo, ráfagas suaves por posición)
        float swayMask = smoothstep(0.08, 1.0, corner.y);
        swayMask *= swayMask;
        float phase = base.x * 0.07 + base.z * 0.05 + col.g * 6.2831853;
        float gust = sin(uTime * 1.15 + phase) * 0.65 + sin(uTime * 2.35 + phase * 1.7) * 0.35;
        float flutter = sin(uTime * 3.8 + base.z * 0.25 + col.r * 12.0) * 0.18;
        float sway = (gust + flutter) * swayMask * (0.042 * H);
        vsOutput.positionMC = C + right * (corner.x * 0.5 * W + sway) + up * ((corner.y - 0.5) * H);

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
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Ue+`
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
        material.diffuse = rgb * mix(1.0, 0.24, uNight) * (1.0 - hz);
        material.alpha = clamp(c.a * 1.3, 0.0, 1.0);
        // normal abombada (en coordenadas de ojo): el sol modela la copa
        vec3 n = normalize(vec3(d.x * 0.9, d.y * 0.9 + 0.25, 0.85));
        material.normalEC = n;
        material.roughness = 0.92;
        material.specular = vec3(0.03);
        float occCopa = mix(0.68, 1.0, smoothstep(0.05, 0.7, vUV.y));
        material.occlusion = occCopa;
        vec3 skyFill = hlfSkyFill(n, vUpEC, uNight, uTarde);
        material.emissive = rgb * skyFill * occCopa * 0.22 * (1.0 - hz) + hlfHazeColor(uNight, uTarde) * hz;
      }
    `})}function to(){return new De({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0}},lightingModel:Ht.UNLIT,fragmentShaderText:Ue+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC)));
      }
    `})}function oo(e,t,i){return new Ct({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:e,uNorth:t,uUp:i},fragmentShader:`
      uniform sampler2D colorTexture;
      uniform sampler2D depthTexture;
      uniform float uNight;
      uniform float uTarde;
      uniform float uTime;
      uniform vec3 uEast;
      uniform vec3 uNorth;
      uniform vec3 uUp;
      in vec2 v_textureCoordinates;

      float sh(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float sn(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(sh(i), sh(i + vec2(1.0, 0.0)), f.x), mix(sh(i + vec2(0.0, 1.0)), sh(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
        for (int i = 0; i < 5; i++) {
          v += a * sn(p);
          p = rot * p * 2.04 + vec2(13.7, 7.3);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec4 src = texture(colorTexture, v_textureCoordinates);
        float depth = czm_readDepth(depthTexture, v_textureCoordinates);
        if (depth < 0.99995) {
          out_FragColor = src;
          return;
        }

        vec4 ndc = vec4(v_textureCoordinates * 2.0 - 1.0, 1.0, 1.0);
        vec4 eye = czm_inverseProjection * ndc;
        vec3 dirEC = normalize(eye.xyz / eye.w);
        vec3 dirWC = normalize(czm_inverseViewRotation * dirEC);
        vec3 rd = vec3(dot(dirWC, uEast), dot(dirWC, uNorth), dot(dirWC, uUp));
        float elev = max(0.0, rd.z);

        // Cielo andino limpio: azul profundo arriba, celeste en horizonte; tarde fresca de Bogotá
        vec3 zenDia = vec3(0.16, 0.42, 0.82);
        vec3 horDia = vec3(0.72, 0.83, 0.94);
        vec3 zenTarde = vec3(0.18, 0.36, 0.68);
        vec3 horTarde = vec3(0.76, 0.76, 0.82);
        vec3 zenNoche = vec3(0.015, 0.025, 0.065);
        vec3 horNoche = vec3(0.04, 0.06, 0.12);

        vec3 zen = mix(mix(zenDia, zenTarde, uTarde), zenNoche, uNight);
        vec3 hor = mix(mix(horDia, horTarde, uTarde), horNoche, uNight);
        vec3 sky = mix(hor, zen, pow(elev, 0.52));

        // Halo y disco solar sutil
        float sunDot = max(0.0, dot(dirWC, normalize(czm_sunDirectionWC)));
        vec3 sunGlowCol = mix(vec3(1.0, 0.96, 0.88), vec3(1.0, 0.84, 0.64), uTarde);
        sky += sunGlowCol * pow(sunDot, 10.0) * 0.28 * (1.0 - uNight);
        sky += vec3(1.0, 0.98, 0.92) * smoothstep(0.9992, 0.99985, sunDot) * 1.4 * (1.0 - uNight);

        // Nubes cúmulos proyectadas en cúpula, con desplazamiento lento por el viento
        if (rd.z > 0.005) {
          vec2 uv = rd.xy / (rd.z + 0.16);
          vec2 wind = vec2(uTime * 0.008, uTime * 0.003);
          float n1 = fbm(uv * 0.75 + wind);
          float n2 = fbm(uv * 1.65 - wind * 0.6 + vec2(4.2, 9.1));
          float density = smoothstep(0.47, 0.76, n1 * 0.72 + n2 * 0.34);

          // Sombreado propio de la nube hacia el sol
          float nSun = fbm((uv + vec2(0.05, 0.03)) * 0.75 + wind);
          float lit = clamp(0.55 + (n1 - nSun) * 3.2 + sunDot * 0.25, 0.0, 1.0);

          vec3 cLitDia = vec3(0.99, 0.99, 1.0);
          vec3 cShdDia = vec3(0.62, 0.71, 0.84);
          vec3 cLitTarde = vec3(0.98, 0.92, 0.86);
          vec3 cShdTarde = vec3(0.48, 0.54, 0.68);
          vec3 cNoche = vec3(0.04, 0.06, 0.11);

          vec3 cloudCol = mix(
            mix(mix(cShdDia, cLitDia, lit), mix(cShdTarde, cLitTarde, lit), uTarde),
            cNoche,
            uNight
          );
          float horizonFade = smoothstep(0.005, 0.14, rd.z);
          sky = mix(sky, cloudCol, density * horizonFade * 0.88);
        }

        out_FragColor = vec4(sky, src.a);
      }
    `})}function ao(){return new Ct({name:"hlf_grade",uniforms:{uNight:0,uTarde:0},fragmentShader:`
      uniform sampler2D colorTexture;
      uniform float uNight;
      uniform float uTarde;
      in vec2 v_textureCoordinates;
      void main() {
        vec4 src = texture(colorTexture, v_textureCoordinates);
        vec3 c = src.rgb;
        // contraste fílmico suave (curva en S en rango 0..1)
        vec3 s = c * c * (3.0 - 2.0 * c);
        c = mix(c, s, 0.22);
        // gradación sutil por hora: luz limpia de montaña en tarde, azul cinematográfico en noche
        c *= mix(vec3(1.01, 1.0, 0.98), vec3(1.01, 1.00, 0.98), uTarde);
        c *= mix(vec3(1.0), vec3(0.84, 0.90, 1.04), uNight);
        // vibrance sutil
        float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
        c = mix(vec3(l), c, mix(1.06, 0.95, uNight));
        // viñeta muy sutil de visor Unreal
        vec2 q = v_textureCoordinates - 0.5;
        float vig = 1.0 - dot(q, q) * 0.24;
        c *= vig;
        out_FragColor = vec4(clamp(c, 0.0, 1.0), src.a);
      }
    `})}function io(e){const t=i=>({type:I.SAMPLER_2D,value:new Oe({url:e+i,repeat:!0,minificationFilter:tt.LINEAR_MIPMAP_LINEAR,magnificationFilter:ot.LINEAR})});return new De({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uAsfalto:t("tex_asfalto.webp"),uAnden:t("tex_anden.webp"),uPrado:t("tex_prado.webp"),uCiclo:t("tex_ciclo.webp"),...At()},varyings:{vG:Z.VEC3,vUpEC:Z.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Ue+Lt+`
      float gh(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float gn(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(gh(i), gh(i + vec2(1.0, 0.0)), f.x), mix(gh(i + vec2(0.0, 1.0)), gh(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      // relieve y dibujo de la foto del material (su luminancia relativa a su promedio); el color lo da el tono real medido
      float detalle(sampler2D t, vec2 uv) {
        float l = dot(texture(t, uv).rgb, vec3(0.3333));
        float m = dot(textureLod(t, uv, 9.0).rgb, vec3(0.3333));
        return clamp(l / max(m, 0.02), 0.55, 1.6);
      }
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float capa = floor(fsInput.attributes.color_0.r * 8.0 + 0.5);
        vec2 p = vG.xz;
        vec2 en = vec2(vG.x, -vG.z);
        float big = gn(p * 0.03);
        vec3 foto = uAerialOn > 0.5 ? hlfAerial(en) : vec3(0.36, 0.40, 0.30);
        vec3 col;
        float rough = 0.95;
        vec3 spec = vec3(0.03);
        if (capa < 0.5) {             // terreno: tal cual es en la realidad
          col = foto;
        } else if (capa < 1.5) {      // vía: asfalto real, con el desgaste que muestra la foto
          col = vec3(0.105, 0.105, 0.11) * detalle(uAsfalto, p / 5.0) * (0.86 + 0.28 * big);
          col = mix(col, foto, 0.25 * uAerialOn);
          rough = 0.58;
          spec = vec3(0.10);
        } else if (capa < 2.5) {      // andén: adoquín de concreto
          col = vec3(0.46, 0.45, 0.42) * detalle(uAnden, p / 2.4) * (0.92 + 0.16 * big);
          col = mix(col, foto, 0.15 * uAerialOn);
          rough = 0.85;
        } else if (capa < 3.5) {      // separador: prado
          col = vec3(0.115, 0.20, 0.07) * detalle(uPrado, p / 3.0) * (0.80 + 0.30 * big);
        } else if (capa < 4.5) {      // ciclorruta
          col = vec3(0.30, 0.10, 0.08) * detalle(uCiclo, p / 4.0) * (0.92 + 0.16 * big);
        } else if (capa < 5.5) {      // agua del canal
          col = mix(vec3(0.10, 0.15, 0.15), vec3(0.15, 0.20, 0.19), gn(p * 0.4));
          rough = 0.08;
          spec = vec3(0.35);
        } else {                      // canal y puentes: concreto
          col = mix(vec3(0.42, 0.41, 0.39), vec3(0.50, 0.49, 0.47), big);
        }
        float hz = hlfHaze(length(fsInput.attributes.positionEC));
        vec3 skyFill = hlfSkyFill(material.normalEC, vUpEC, uNight, uTarde);
        material.diffuse = col * mix(1.0, 0.28, uNight) * (1.0 - hz);
        material.roughness = rough;
        material.specular = spec * (1.0 - hz);
        material.emissive = col * skyFill * 0.12 * (1.0 - hz) + hlfHazeColor(uNight, uTarde) * hz;
      }
    `})}function at(){return Je.eastNorthUpToFixedFrame(f.fromDegrees(Re.longitude,Re.latitude,Re.height))}function we(e,t,i,o=at()){return N.multiplyByPoint(o,new f(e,t,i),new f)}const no={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function so(e,t,i){let o=!1;for(let s=0,l=i.length-1;s<i.length;l=s++){const[d,u]=i[s],[w,C]=i[l];u>t!=C>t&&e<(w-d)*(t-u)/(C-u)+d&&(o=!o)}return o}function ro(e,t,i){let o=1/0;for(let s=0,l=i.length-1;s<i.length;l=s++){const[d,u]=i[l],[w,C]=i[s],p=w-d,g=C-u,v=Math.max(0,Math.min(1,((e-d)*p+(t-u)*g)/(p*p+g*g||1)));o=Math.min(o,Math.hypot(e-d-v*p,t-u-v*g))}return o}async function co(e,t,i){const o=e.scene,s=at(),l=N.inverseTransformation(s,new N),d=xe.secciones;t("Contexto urbano",.08);const[u,w,C,p]=await Promise.all([fetch(d+"recorte.json").then(c=>c.json()),fetch(d+"edificios.json").then(c=>c.json()),fetch(d+"arboles.json").then(c=>c.json()),fetch(d+"suelo.json").then(c=>c.json())]),g=()=>u.clips.map(c=>{const a=new Ft({positions:f.fromDegreesArray(c.flat())}),r=a.computeRectangle();return a.computeRectangle=h=>Dt.clone(r,h),a});o.globe.clippingPolygons=new lt({polygons:g()});const v=to();let z=null;try{z=await Nt.fromUrl(xe.googleTiles,{maximumScreenSpaceError:10,shadows:ie.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),z.clippingPolygons=new lt({polygons:g()}),z.customShader=v,o.primitives.add(z)}catch(c){console.warn("Tiles de Google no disponibles",c)}const Y=[-236,330],O=[];for(const c of w.secciones)O.push({key:c.key,file:c.file,kind:"edificios",label:c.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${c.key}`,dist:c.key==="Hotel"?-2:Math.hypot(c.c[0]-Y[0],c.c[1]-Y[1])});O.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),O.sort((c,a)=>c.dist-a.dist);const de={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},K=p.secciones.map(c=>({key:c.key,file:c.file,kind:"suelo",capa:de[c.key]?.[0]??0,label:de[c.key]?.[1]??c.key,dist:-3})),ue=C.secciones.map(c=>({key:c.key,file:c.file,kind:"arboles",atlas:c.atlas,marco:c.marco,marcoSup:c.marcoSup,label:no[c.key]??"Vegetación",dist:0})),U=[...K,...O.slice(0,4),...ue.slice(0,3),...O.slice(4,9),...ue.slice(3),...O.slice(9)],_=Qt(),fe=io(d);(async()=>{try{const c=await Et.fromAssetId(xe.imageryAssetId),a=18,r=c.tilingScheme,h=(R,J)=>Ce.fromCartesian(we(R,J,0,s)),n=r.positionToTileXY(h(-1010,930),a),m=r.positionToTileXY(h(1010,-940),a),E=m.x-n.x+1,A=m.y-n.y+1,M=c.tileWidth,y=document.createElement("canvas");y.width=E*M,y.height=A*M;const q=y.getContext("2d"),ce=[];for(let R=n.y;R<=m.y;R++)for(let J=n.x;J<=m.x;J++)ce.push([J,R]);const Te=async([R,J])=>{for(let rt=0;rt<40;rt++){const ct=c.requestImage(R,J,a);if(ct){try{const We=await ct;q.drawImage(We,(R-n.x)*M,(J-n.y)*M,M,M)}catch{}return}await new Promise(We=>setTimeout(We,120))}};q.fillStyle="#6a6f62",q.fillRect(0,0,y.width,y.height);const k=Array.from({length:6},async()=>{for(;ce.length;)await Te(ce.shift())});await Promise.all(k);const X=document.createElement("canvas");X.width=X.height=4096,X.getContext("2d").drawImage(y,0,0,4096,4096);const S=await new Promise(R=>X.toBlob(R,"image/jpeg",.92));if(!S)return;const j=URL.createObjectURL(S),V=r.tileXYToRectangle(n.x,n.y,a),G=r.tileXYToRectangle(m.x,m.y,a),oe=(R,J)=>N.multiplyByPoint(l,f.fromRadians(R,J,Re.height),new f),le=oe(V.west,G.south),Se=oe(G.east,V.north),ze=new et(le.x,le.y,Se.x,Se.y);for(const R of[_,fe])R.setUniform("uAerial",new Oe({url:j,repeat:!1,minificationFilter:tt.LINEAR_MIPMAP_LINEAR,magnificationFilter:ot.LINEAR})),R.setUniform("uAerialRect",ze),R.setUniform("uAerialOn",1)}catch(c){console.warn("Foto aérea no disponible",c)}})();const re=[],Q=[];let be=0,Me=0;const ee={total:U.length,loaded:0,failed:[]},te=async c=>{try{const a=await Ze.fromGltfAsync({url:d+c.file,modelMatrix:s,upAxis:ve.Y,forwardAxis:ve.X,shadows:c.kind==="arboles"?ie.CAST_ONLY:c.kind==="suelo"?ie.RECEIVE_ONLY:ie.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:c.kind!=="arboles"});if(c.kind==="suelo")a.customShader=fe;else if(c.kind==="arboles"){const r=eo(d+c.atlas,c.marco,c.marcoSup);r.setUniform("uNight",be),r.setUniform("uTarde",Me),re.push(r),a.customShader=r}else a.customShader=_;a.imageBasedLighting.imageBasedLightingFactor=new Ee(.75,.45),o.primitives.add(a),c.kind==="arboles"&&Q.push(a),await new Promise(r=>{if(a.ready)return r();const h=a.readyEvent.addEventListener(()=>{h(),r()});setTimeout(r,2e4)})}catch(a){console.error("Sección no cargada",c.file,a),ee.failed.push(c.file)}ee.loaded++,i?.(ee.loaded,ee.total,c.label)},me=K.length+7;for(let c=0;c<Math.min(me,U.length);c++)t(U[c].label,.2+.75*c/me),await te(U[c]);const ke=(async()=>{for(let c=me;c<U.length;c++)await te(U[c]),await new Promise(a=>setTimeout(a,60))})();return{matrix:s,inverse:l,tileset:z,buildings:w.edificios,treeCount:C.total,sections:ee,done:ke,setNight(c){v.setUniform("uNight",c),_.setUniform("uNight",c),be=c,fe.setUniform("uNight",c);for(const a of re)a.setUniform("uNight",c)},setTarde(c){v.setUniform("uTarde",c),_.setUniform("uTarde",c),Me=c,fe.setUniform("uTarde",c);for(const a of re)a.setUniform("uTarde",c)},setTime(c){for(const a of re)a.setUniform("uTime",c)},setHotelFloors(c){_.setUniform("uHotelPisos",c)},setTreesVisible(c){for(const a of Q)a.show=c},buildingAt(c){const a=N.multiplyByPoint(l,c,new f);let r=null,h=1.2;for(const n of w.edificios){if(a.x<n.bb[0]-1.5||a.x>n.bb[2]+1.5||a.y<n.bb[1]-1.5||a.y>n.bb[3]+1.5||a.z>n.b+n.h+2.5)continue;if(so(a.x,a.y,n.r))return n;const m=ro(a.x,a.y,n.r);m<h&&(h=m,r=n)}return r}}}const gt=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],vt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],yt=3.2;async function lo(e,t,i=110){const o=xe.secciones;let s,l,d;try{s=await fetch(o+"vias_campo.json").then(r=>r.json());const a=new Uint8Array(await fetch(o+"vias_campo.bin").then(r=>r.arrayBuffer()));l=a.subarray(0,s.w*s.h),d=a.subarray(s.w*s.h)}catch{return null}const{cell:u,x0:w,y0:C,w:p,h:g}=s,v=(a,r)=>{const h=(a-w)/u-.5,n=(r-C)/u-.5,m=Math.floor(h),E=Math.floor(n);if(m<0||E<0||m>=p-1||E>=g-1)return 0;const A=h-m,M=n-E,y=E*p+m;return((l[y]*(1-A)+l[y+1]*A)*(1-M)+(l[y+p]*(1-A)+l[y+p+1]*A)*M)*.5},z=(a,r)=>{const h=Math.max(0,Math.min(p-1,Math.floor((a-w)/u))),n=Math.max(0,Math.min(g-1,Math.floor((r-C)/u)));return d[n*p+h]*.1-2},Y=[],O=[],de=[];for(let a=2;a<g-2;a++)for(let r=2;r<p-2;r++){const h=a*p+r,n=w+(r+.5)*u,m=C+(a+.5)*u,E=Math.hypot(n+180,m-250);if(E>520)continue;const A=l[h]*.5;if(A>=2.6&&A<=5&&Y.push(h),A>=6&&E<460&&de.push({e:n,n:m,d:A}),l[h]===0&&E<430){let M=!1;for(let y=-2;y<=2&&!M;y++)for(let q=-2;q<=2;q++)if(l[(a+y)*p+(r+q)]>0){M=!0;break}M&&O.push(h)}}if(!Y.length)return null;de.sort((a,r)=>r.d-a.d);const K=[],ue=(a,r,h)=>N.multiplyByPoint(t,new f(a,r,h),new f);for(const a of de){if(K.length>=6)break;if(K.some(M=>Math.hypot(M.e-a.e,M.n-a.n)<90))continue;const r=z(a.e,a.n),h=a.e+6.5,n=a.n+6.5,m=z(h,n);e.entities.add({position:ue(h,n,m+2.4),cylinder:{length:4.8,topRadius:.11,bottomRadius:.14,material:H.fromCssColorString("#242933")}});const E=e.entities.add({position:ue(h-.6,n,m+4.5),box:{dimensions:new f(.45,.45,1.05),material:H.LIME}}),A=e.entities.add({position:ue(h,n-.6,m+4.5),box:{dimensions:new f(.45,.45,1.05),material:H.RED}});K.push({e:a.e,n:a.n,u:r,faseOffset:K.length*4.5,nsLuz:E,ewLuz:A,nsEstado:"green",ewEstado:"red"})}const U=(()=>{let a=12345;return()=>(a=a*1664525+1013904223>>>0)/4294967296})(),_=[],fe=(a,r,h)=>_.some(n=>n!==h&&Math.hypot(n.e-a,n.n-r)<8.5),re=a=>{for(let r=0;r<45;r++){const h=Y[Math.floor(U()*Y.length)],n=w+(h%p+.5)*u,m=C+(Math.floor(h/p)+.5)*u;if(fe(n,m,a))continue;let E=0,A=-1e9;for(let M=0;M<16;M++){const y=M/16*Math.PI*2,q=v(n+Math.cos(y)*10,m+Math.sin(y)*10),ce=v(n+Math.sin(y)*2.5,m-Math.cos(y)*2.5),Te=v(n-Math.sin(y)*2.5,m+Math.cos(y)*2.5),k=-Math.abs(q-yt)+(Te>ce?1.5:0);q>1.5&&k>A&&(A=k,E=y)}if(A>-1e8){a.e=n,a.n=m,a.th=E,a.vActual=a.v*.5;return}}};for(let a=0;a<i;a++){const r=U(),h=r<.2?"taxi":r<.48?"suv":"sedan",n={e:0,n:0,th:0,v:6.5+U()*5,vActual:0,model:null,u:0,tipo:h};re(n),_.push(n)}const Q=[];if(O.length>0)for(let a=0;a<42;a++){const r=O[Math.floor(U()*O.length)],h=w+(r%p+.5)*u,n=C+(Math.floor(r/p)+.5)*u;Q.push({e:h,n,th:U()*Math.PI*2,v:1.15+U()*.45,model:null,u:z(h,n)+.16,conPerro:a%3===0})}const be=new f,Me=new ut,ee=new N,te=(a,r=.03)=>{a.model&&(f.fromElements(a.e,a.n,a.u+r,be),ut.fromRotationZ(a.th,Me),N.fromRotationTranslation(Me,be,ee),a.model.modelMatrix=N.multiply(t,ee,new N))};(async()=>{for(let a=0;a<_.length;a++){const r=_[a],h=r.tipo==="taxi"?"carro_taxi.glb":r.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const n=await Ze.fromGltfAsync({url:o+h,upAxis:ve.Y,forwardAxis:ve.X,shadows:ie.ENABLED,color:r.tipo==="taxi"?H.WHITE:H.fromCssColorString(gt[a%gt.length]),colorBlendMode:ht.MIX,colorBlendAmount:r.tipo==="taxi"?0:.28});e.scene.primitives.add(n),r.model=n,r.u=z(r.e,r.n),te(r)}catch{}a%6===5&&await new Promise(n=>setTimeout(n,35))}for(let a=0;a<Q.length;a++){const r=Q[a];try{const h=await Ze.fromGltfAsync({url:o+(r.conPerro?"persona_perro.glb":"persona.glb"),upAxis:ve.Y,forwardAxis:ve.X,shadows:ie.ENABLED,color:H.fromCssColorString(vt[a%vt.length]),colorBlendMode:ht.MIX,colorBlendAmount:.25});e.scene.primitives.add(h),r.model=h,te(r,0)}catch{}a%6===5&&await new Promise(h=>setTimeout(h,35))}})();let me=!0,ke=0;const c=(a,r)=>v(a,r)===0&&v(a+4,r)+v(a-4,r)+v(a,r+4)+v(a,r-4)>.5;return{count:i,debug:()=>_.map(a=>[Math.round(a.e),Math.round(a.n),+a.u.toFixed(1),a.model?1:0]),setVisible(a){me=a;for(const r of _)r.model&&(r.model.show=a);for(const r of Q)r.model&&(r.model.show=a);for(const r of K)r.nsLuz.show=a,r.ewLuz.show=a},update(a){if(!me)return;const r=Math.min(.08,Math.max(.001,a));ke+=r;for(const h of K){const n=(ke+h.faseOffset)%24,m=n<10?"green":n<12?"yellow":"red",E=n>=12&&n<22?"green":n>=22?"yellow":"red";m!==h.nsEstado&&(h.nsEstado=m,h.nsLuz.box.material.color=new dt(m==="green"?H.LIME:m==="yellow"?H.YELLOW:H.RED)),E!==h.ewEstado&&(h.ewEstado=E,h.ewLuz.box.material.color=new dt(E==="green"?H.LIME:E==="yellow"?H.YELLOW:H.RED))}for(let h=0;h<_.length;h++){const n=_[h];if(!n.model)continue;let m=0,E=-1e9;for(let k=-4;k<=4;k++){const X=k*.13,S=n.th+X,j=n.e+Math.cos(S)*9,V=n.n+Math.sin(S)*9,G=v(j,V);if(G<1.1||v(n.e+Math.cos(S)*4.5,n.n+Math.sin(S)*4.5)<.9)continue;const le=v(j+Math.sin(S)*2.5,V-Math.cos(S)*2.5),Se=v(j-Math.sin(S)*2.5,V+Math.cos(S)*2.5),ze=-Math.abs(Math.min(G,6)-yt)-Math.abs(X)*1.6+(Se>=le?.6:0);ze>E&&(E=ze,m=X)}if(E<-1e8||Math.hypot(n.e+180,n.n-250)>600){re(n),n.u=z(n.e,n.n),te(n);continue}const A=Math.cos(n.th),M=Math.sin(n.th);let y=1;for(let k=0;k<_.length;k++){if(k===h||!_[k].model)continue;const X=_[k],S=X.e-n.e,j=X.n-n.n,V=S*S+j*j;if(V>225)continue;const G=S*A+j*M,oe=Math.abs(-S*M+j*A);if(G>0&&G<12.5&&oe<2.35){const le=G<6.4?0:(G-6.4)/6.1;le<y&&(y=le)}else V<22&&k<h&&(y=0)}const q=Math.abs(A)>Math.abs(M);for(const k of K){if((q?k.ewEstado:k.nsEstado)==="green")continue;const S=k.e-n.e,j=k.n-n.n,V=S*A+j*M,G=Math.abs(-S*M+j*A);if(V>7&&V<21&&G<9){const oe=V<10.5?0:(V-10.5)/10.5;oe<y&&(y=oe)}}const ce=1-Math.min(.55,Math.abs(m)*1.4),Te=n.v*ce*y;n.vActual+=(Te-n.vActual)*Math.min(1,r*4.5),n.vActual>.05&&(n.th+=Math.max(-1.4*r,Math.min(1.4*r,m)),n.e+=Math.cos(n.th)*n.vActual*r,n.n+=Math.sin(n.th)*n.vActual*r,n.u+=(z(n.e,n.n)-n.u)*Math.min(1,r*6)),te(n)}for(const h of Q){if(!h.model)continue;const n=h.e+Math.cos(h.th)*h.v*r,m=h.n+Math.sin(h.th)*h.v*r;c(n,m)&&Math.hypot(n+180,m-250)<430?(h.e=n,h.n=m,h.u+=(z(h.e,h.n)+.16-h.u)*Math.min(1,r*4)):h.th+=.9+U()*1.2,te(h,0)}}}}Yt.defaultAccessToken=xe.ionToken;const L=e=>document.getElementById(e),it=L("cesiumContainer"),xt=L("loading"),ho=L("loadBar"),Pt=L("loadLabel"),uo=L("loadPct");function qe(e,t){Pt.textContent=e;const i=Math.round(Math.max(0,Math.min(1,t))*100);ho.style.width=i+"%",uo.textContent=i+"%"}const D=new Ot(it,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:ie.RECEIVE_ONLY,terrain:Vt.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Ut.fromProviderAsync(Et.fromAssetId(xe.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),T=D.scene;T.globe.enableLighting=!0;T.globe.showGroundAtmosphere=!0;T.globe.depthTestAgainstTerrain=!0;T.globe.maximumScreenSpaceError=2;T.fog.enabled=!1;T.fog.density=18e-5;T.fog.minimumBrightness=.04;T.highDynamicRange=!0;T.msaaSamples=4;T.postProcessStages.fxaa.enabled=!0;T.screenSpaceCameraController.enableCollisionDetection=!1;T.light=new jt({intensity:3,color:H.fromCssColorString("#fff4e3")});const ne=D.shadowMap;ne.softShadows=!0;ne.size=4096;ne.maximumDistance=1200;ne.darkness=.24;ne.normalOffset=!0;{const e=ne;e._primitiveBias.depthBias=8e-4,e._primitiveBias.normalOffsetScale=1.6,e._primitiveBias.normalShadingSmooth=.35}const he=T.postProcessStages.ambientOcclusion;he.enabled=!0;he.uniforms.intensity=2.1;he.uniforms.bias=.08;he.uniforms.lengthCap=.35;he.uniforms.stepSize=1.4;he.uniforms.blurStepSize=1;const $=T.postProcessStages.bloom;$.enabled=!0;$.uniforms.glowOnly=!1;$.uniforms.contrast=128;$.uniforms.brightness=-.36;$.uniforms.delta=1;$.uniforms.sigma=2.6;$.uniforms.stepSize=1.5;const fo=at(),Xe=e=>{const t=N.getColumn(fo,e,new et);return new f(t.x,t.y,t.z)},Fe=oo(Xe(0),Xe(1),Xe(2));T.postProcessStages.add(Fe);const $e=ao();T.postProcessStages.add($e);D.camera.frustum.fov=Tt.toRadians(48);const wt=(()=>{try{const e=T.context._gl,t=e.getExtension("WEBGL_debug_renderer_info");return t?String(e.getParameter(t.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),mo=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(wt)&&!/Arc/i.test(wt);let b=null,F=mo||matchMedia("(pointer: coarse)").matches?.5:1;function Le(){const e=Math.min(window.devicePixelRatio||1,2);D.resolutionScale=e*(F>=1?1:F>=.5?.8:.62),ne.size=F>=1?4096:F>=.5?2048:1024,ne.softShadows=F>=.5,he.enabled=F>=1,$.enabled=F>=.5,T.msaaSamples=F>=1?4:1,D.shadows=F>=.5,b?.tileset&&(b.tileset.maximumScreenSpaceError=F>=1?8:F>=.5?12:20)}Le();D.clock.shouldAnimate=!1;D.clock.currentTime=Ae.fromIso8601("2026-06-21T10:10:00-05:00");const P=new Zt(D),Ve=e=>we(Ye[e].e,Ye[e].n,Ye[e].u),po=Ve("hotel");P.flyTo({pivot:po,heading:He.general.heading,pitch:He.general.pitch,range:He.general.range*1.8},0);P.groundHeight=e=>T.globe.getHeight(e);const go=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,tarde:0,fog:18e-5,label:"10:10",sun:3,color:"#fff4e3"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:2.8,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.65,color:"#6b8fd4"}];let pe=0,ge=0,ae=null;const vo=e=>Ae.toDate(Ae.fromIso8601(e)).getTime();function yo(e){ae={from:Ae.toDate(D.clock.currentTime).getTime(),to:vo(e.iso),start:performance.now(),dur:1600},T.fog.density=e.fog,T.light.intensity=e.sun,T.light.color=H.fromCssColorString(e.color),$.uniforms.brightness=-.36,T.skyAtmosphere&&(T.skyAtmosphere.hueShift=0,T.skyAtmosphere.saturationShift=e.id==="tarde"?.08:e.id==="noche"?-.25:.06,T.skyAtmosphere.brightnessShift=e.id==="noche"?-.55:e.id==="tarde"?-.04:0);const i=pe,o=ge,s=performance.now(),l=()=>{const u=Math.min(1,(performance.now()-s)/1400),w=u*u*(3-2*u);pe=i+(e.night-i)*w,ge=o+(e.tarde-o)*w,b?.setNight(pe),b?.setTarde(ge),Fe.uniforms.uNight=pe,Fe.uniforms.uTarde=ge,$e.uniforms.uNight=pe,$e.uniforms.uTarde=ge,u<1&&requestAnimationFrame(l)};requestAnimationFrame(l),document.querySelectorAll("[data-light]").forEach(u=>u.classList.toggle("on",u.dataset.light===e.id));const d=L("clockLabel");d&&(d.textContent=e.label)}document.querySelectorAll("[data-light]").forEach(e=>{e.addEventListener("click",()=>{const t=go.find(i=>i.id===e.dataset.light);t&&yo(t)})});let ye=!1;const Qe=L("btnOrbit"),nt=L("btnPedestrian");function se(){ye=!1,Qe?.classList.remove("on")}function Pe(e,t=2){se();const i=He[e];P.flyTo({pivot:Ve(i.place),heading:i.heading,pitch:i.pitch,range:i.range},t)}L("btnHome")?.addEventListener("click",()=>Pe("general",2.2));L("btnAerial")?.addEventListener("click",()=>Pe("aerial"));L("btnArch")?.addEventListener("click",()=>Pe("arch"));nt?.addEventListener("click",()=>{se(),P.isWalking?P.exitWalk():P.enterWalk(B?St(B):void 0)});P.onModeChange=e=>{nt?.classList.toggle("on",e);const t=L("hint");t&&e&&(t.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",t.classList.remove("fade"),setTimeout(()=>t.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(e=>{e.addEventListener("click",()=>{se();const t=e.dataset.place;P.flyTo({pivot:Ve(t),range:t==="hotel"?300:520,pitch:-.5},2)})});Qe?.addEventListener("click",()=>{ye=!ye,Qe.classList.toggle("on",ye),ye&&P.isWalking&&P.exitWalk()});it.addEventListener("pointerdown",se);it.addEventListener("wheel",se,{passive:!0});addEventListener("keydown",e=>{e.code==="Escape"&&(P.isWalking?P.exitWalk():je(null)),(e.code==="KeyH"||e.code==="Home")&&Pe("general",2.2),e.code==="KeyP"&&nt?.click()});let B=null,st=null;const xo=9;let Ne=null;function kt(){b&&(Ne={start:performance.now()},b.setHotelFloors(0))}let Ie=null;const _e=L("card");function wo(e){return we((e.bb[0]+e.bb[2])/2,(e.bb[1]+e.bb[3])/2,e.b+e.h*.5)}function St(e){return we((e.bb[0]+e.bb[2])/2,e.bb[1]-9,e.b)}function je(e){const t=B?.s==="Hotel";if(B=e,Ie&&(D.entities.remove(Ie),Ie=null),!e||!b){_e&&(_e.hidden=!0);return}const i=e.r.map(([g,v])=>we(g,v,0,b.matrix)),o=2572+e.b-.5;Ie=D.entities.add({polygon:{hierarchy:new Bt(i),height:o,extrudedHeight:o+e.h+2.2,material:H.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:H.fromCssColorString("#d7ebff"),shadows:ie.DISABLED}});const s=e.s==="Hotel";s&&!t&&(kt(),se(),P.flyTo({pivot:Ve("hotel"),pitch:-.38,range:290},1.8));const l=s&&b?b.buildings.filter(g=>g.s==="Hotel"):[e],d=g=>Math.abs(g.r.reduce((v,z,Y)=>{const O=g.r[(Y+1)%g.r.length];return v+z[0]*O[1]-O[0]*z[1]},0)/2),u=l.reduce((g,v)=>g+d(v),0),w=l.reduce((g,v)=>g+d(v)*v.p,0),C=Math.max(...l.map(g=>g.p)),p=Math.max(...l.map(g=>g.h));Math.abs(e.r.reduce((g,v,z)=>{const Y=e.r[(z+1)%e.r.length];return g+v[0]*Y[1]-Y[0]*v[1]},0)/2),L("cardKind").textContent=s?"Proyecto":`Sector ${e.s}`,L("cardTitle").textContent=s?"Hotel La Fontana":`Edificación ${e.id+1}`,L("cardData").innerHTML=`<dt>Pisos</dt><dd>${s?"hasta "+C:e.p}</dd><dt>Altura</dt><dd>${p.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(u).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(w).toLocaleString("es-CO")} m²</dd>`,_e&&(_e.hidden=!1)}P.onPick=e=>{b&&je(e?b.buildingAt(e):null)};L("cardClose")?.addEventListener("click",()=>je(null));L("cardFocus")?.addEventListener("click",()=>{if(!B)return;se();const e=Math.max(B.bb[2]-B.bb[0],B.bb[3]-B.bb[1],B.h);P.flyTo({pivot:wo(B),pitch:-.42,range:Math.max(60,e*2.1)},1.7)});L("cardWalk")?.addEventListener("click",()=>{B&&(se(),P.enterWalk(St(B)))});const Ge=L("status"),bt=L("statusText");async function bo(){qe("Contexto geográfico",.04),await new Promise(t=>setTimeout(t,30)),b=await co(D,(t,i)=>qe(t,i),(t,i,o)=>{!Ge||!bt||(Ge.hidden=!1,bt.textContent=t<i?`Cargando secciones ${t}/${i} · ${o}`:`Modelo completo · ${i} secciones`,t>=i&&setTimeout(()=>Ge.classList.add("fade"),2600))}),b.setNight(pe),b.setTarde(ge),Le(),qe("Listo",1),Pe("general",2.4),xt.classList.add("done"),setTimeout(()=>xt.remove(),900);const e=L("hint");e&&setTimeout(()=>e.classList.add("fade"),9e3),window.__READY__=!0,b.done.then(async()=>{st=await lo(D,b.matrix),window.__ALL__=!0})}const W={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Wt,viewer:D,cam:P,getSite:()=>b,enuToWorld:we,select:je,stats:W,playHotel:kt,getTrafico:()=>st,setQuality:e=>{F=e,Le()}};bo().catch(e=>{console.error(e),Pt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(e?.message??e)});let Mt=performance.now(),Ke=0;function zt(){const e=performance.now(),t=Math.min(.1,(e-Mt)/1e3);if(Mt=e,ae){const o=Math.min(1,(e-ae.start)/ae.dur),s=o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2;D.clock.currentTime=Ae.fromDate(new Date(ae.from+(ae.to-ae.from)*s)),o>=1&&(ae=null)}if(Ne&&b){const o=(e-Ne.start)/550,s=Math.floor(o),l=o-s,d=1-Math.pow(1-Math.min(1,l*1.6),3);s>=xo?(b.setHotelFloors(99),Ne=null):b.setHotelFloors(s+d)}st?.update(t);const i=e*.001;if(b?.setTime(i),Fe.uniforms.uTime=i,ye&&!P.isWalking&&P.flyTo({heading:P.state.heading+.16*t},0),P.update(t),W.frames++,e-W.t0>=2e3){W.fps=Math.round(W.frames*1e3/(e-W.t0)),W.frames=0,W.t0=e,window.__FPS__=W.fps;const o=!!b&&b.sections.loaded>=b.sections.total&&e-Ke>8e3;b&&b.sections.loaded>=b.sections.total&&!Ke&&(Ke=e),o&&document.visibilityState==="visible"&&(W.fps<20&&F>.25&&!window.__DBG__.lock?++W.low>=3&&(F=F>=1?.5:.25,W.low=0,Le()):W.low=0)}requestAnimationFrame(zt)}requestAnimationFrame(zt);addEventListener("resize",Le);
