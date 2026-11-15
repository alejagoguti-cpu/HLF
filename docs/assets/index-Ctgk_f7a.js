var It=Object.defineProperty;var _t=(e,t,a)=>t in e?It(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var C=(e,t,a)=>_t(e,typeof t!="symbol"?t+"":t,a);import{C as p,a as Tt,T as Je,M as O,b as Ae,c as Ee,H as Rt,P as Ct,d as Fe,L as Ht,U as N,V as te,e as et,f as De,g as tt,h as ot,i as lt,j as Nt,S as le,I as Et,k as Ft,R as Dt,l as Ze,A as ye,m as D,n as ht,o as dt,p as ut,q as Ot,r as Ut,s as Vt,t as jt,J as Le,u as Wt,v as Bt,w as Yt}from"./cesium-ICe9G6Ok.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const h of s)if(h.type==="childList")for(const d of h.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function a(s){const h={};return s.integrity&&(h.integrity=s.integrity),s.referrerPolicy&&(h.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?h.credentials="include":s.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(s){if(s.ep)return;s.ep=!0;const h=a(s);fetch(s.href,h)}})();const Be="/HLF/",qt=Be.endsWith("/")?Be:Be+"/",Xt=qt+"cesium/";window.CESIUM_BASE_URL=Xt;const _e={longitude:-74.04145021,latitude:4.70207636,height:2572},Ye={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},Re={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},we={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},Gt=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,ft=-1.5533,mt=-.012,Kt=4200,Jt=6,pt=1.7;class Zt{constructor(t){C(this,"viewer");C(this,"canvas");C(this,"pivot",new p);C(this,"heading",.5);C(this,"pitch",-.6);C(this,"range",1200);C(this,"targetPivot",new p);C(this,"targetHeading",.5);C(this,"targetPitch",-.6);C(this,"targetRange",1200);C(this,"damping",9);C(this,"drag",null);C(this,"pointers",new Map);C(this,"pinch",null);C(this,"lastTap",0);C(this,"keys",new Set);C(this,"tween",null);C(this,"fov",Tt.toRadians(48));C(this,"walking",!1);C(this,"eye",new p);C(this,"eyeTarget",new p);C(this,"wHeading",0);C(this,"wPitch",0);C(this,"wHeadingT",0);C(this,"wPitchT",0);C(this,"onPick",null);C(this,"onModeChange",null);C(this,"groundHeight",null);this.viewer=t,this.canvas=t.scene.canvas,t.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:p.clone(this.targetPivot)}}setPivot(t,a=!0){if(a){const o=p.clone(this.viewer.camera.positionWC),s=p.subtract(o,t,new p),h=p.magnitude(s),d=Je.eastNorthUpToFixedFrame(t),u=O.inverseTransformation(d,new O),E=O.multiplyByPointAsVector(u,s,new p);if(h>1){const P=-Math.asin(Math.max(-1,Math.min(1,E.z/h)));if(P<mt&&P>ft){let g=Math.atan2(-E.x,-E.y);for(;g-this.heading>Math.PI;)g-=Math.PI*2;for(;g-this.heading<-Math.PI;)g+=Math.PI*2;this.heading=this.targetHeading=g,this.pitch=this.targetPitch=P,this.range=this.targetRange=this.clamp(h),p.clone(t,this.pivot)}}}this.targetPivot=p.clone(t),this.tween=null}bind(){const t=this.canvas;t.style.touchAction="none",t.addEventListener("pointerdown",o=>{if(t.setPointerCapture(o.pointerId),this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2){const[s,h]=[...this.pointers.values()];this.pinch={distance:Math.hypot(s.x-h.x,s.y-h.y),range:this.targetRange,cx:(s.x+h.x)/2,cy:(s.y+h.y)/2},this.drag=null;return}o.button===2||o.button===1||o.shiftKey?this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"pan",moved:!1}:o.button===0&&(this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"orbit",moved:!1}),this.tween=null}),t.addEventListener("pointermove",o=>{if(!this.pointers.has(o.pointerId))return;if(this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2&&this.pinch){const[d,u]=[...this.pointers.values()],E=Math.hypot(d.x-u.x,d.y-u.y),P=(d.x+u.x)/2,g=(d.y+u.y)/2;this.walking?this.walk((this.pinch.cy-g)*.06,0):(E>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/E)),this.pan(this.pinch.cx-P,g-this.pinch.cy)),this.pinch.cx=P,this.pinch.cy=g;return}if(!this.drag||o.pointerId!==this.drag.id)return;const s=o.offsetX-this.drag.x,h=o.offsetY-this.drag.y;this.drag.x=o.offsetX,this.drag.y=o.offsetY,Math.abs(s)+Math.abs(h)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=s*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+h*.0028))):this.walk(h*.05,-s*.05):this.drag.mode==="orbit"?(this.targetHeading-=s*.0042,this.targetPitch=this.clampPitch(this.targetPitch-h*.0034)):this.pan(-s,h)});const a=o=>{if(this.pointers.delete(o.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&o.pointerId===this.drag.id){const s=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,s&&o.type==="pointerup"){const h=new Ae(o.offsetX,o.offsetY),d=performance.now();if(o.pointerType!=="mouse"&&d-this.lastTap<320){this.lastTap=0,this.focusAt(h);return}this.lastTap=d;const u=this.pickWorld(h);u&&!this.walking&&this.setPivot(u,!0),this.onPick?.(u)}}};t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("contextmenu",o=>o.preventDefault()),t.addEventListener("wheel",o=>{o.preventDefault(),this.tween=null;const s=o.deltaMode===1?16:o.deltaMode===2?100:1,h=o.deltaY*s;if(this.walking){this.walk(-h*.02,0);return}const d=Math.exp(Math.max(-.45,Math.min(.45,h*.0016))),u=this.pickWorld(new Ae(o.offsetX,o.offsetY)),E=this.clamp(this.targetRange*d);if(u&&d<1){const P=Math.min(.45,(this.targetRange-E)/this.targetRange)*.8,g=p.subtract(u,this.targetPivot,new p),v=p.magnitude(g);if(v>1){const y=Math.min(v,this.targetRange)*P/v;p.add(this.targetPivot,p.multiplyByScalar(g,y,g),this.targetPivot)}}this.targetRange=E},{passive:!1}),t.addEventListener("dblclick",o=>{o.preventDefault(),this.focusAt(new Ae(o.offsetX,o.offsetY))}),addEventListener("keydown",o=>{o.target instanceof HTMLInputElement||(this.keys.add(o.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(o.code)&&o.preventDefault())}),addEventListener("keyup",o=>this.keys.delete(o.code)),addEventListener("blur",()=>this.keys.clear())}clamp(t,a=Jt,o=Kt){return Math.max(a,Math.min(o,t))}clampPitch(t){return Math.max(ft,Math.min(mt,t))}moveHorizontal(t,a,o,s){const h=Je.eastNorthUpToFixedFrame(t),d=new p(Math.sin(a)*o+Math.cos(a)*s,Math.cos(a)*o-Math.sin(a)*s,0);O.multiplyByPoint(h,d,t)}pan(t,a){const o=this.canvas.clientHeight||1,s=2*this.range*Math.tan(this.fov/2)/o,h=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,a*s/h,t*s),this.tween=null}walk(t,a){this.moveHorizontal(this.eyeTarget,this.wHeading,t,a),this.snapEye()}snapEye(){const t=Ee.fromCartesian(this.eyeTarget),a=this.groundHeight?.(t);a!==void 0&&Number.isFinite(a)&&(t.height=a+pt,Ee.toCartesian(t,void 0,this.eyeTarget))}pickWorld(t){const a=this.viewer.scene;let o;if(a.pickPositionSupported&&a.pick(t,4,4)&&(o=a.pickPosition(t)),!o){const s=a.camera.getPickRay(t);s&&(o=a.globe.pick(s,a)??void 0)}return o??null}focusAt(t){const a=this.pickWorld(t);if(a){if(this.walking){p.clone(a,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:a,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(t,a=2){this.walking&&this.exitWalk(!1);const o={pivot:t.pivot??p.clone(this.targetPivot),heading:t.heading??this.targetHeading,pitch:t.pitch??this.targetPitch,range:t.range??this.targetRange};let s=o.heading;for(;s-this.targetHeading>Math.PI;)s-=Math.PI*2;for(;s-this.targetHeading<-Math.PI;)s+=Math.PI*2;if(o.heading=s,a<=.02){this.tween=null,this.targetPivot=p.clone(o.pivot),this.pivot=p.clone(o.pivot),this.heading=this.targetHeading=o.heading,this.pitch=this.targetPitch=o.pitch,this.range=this.targetRange=o.range;return}this.tween={from:{pivot:p.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:o,start:performance.now(),duration:a*1e3}}enterWalk(t){p.clone(t??this.targetPivot,this.eyeTarget),this.snapEye(),p.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(t=!0){if(!this.walking)return;this.walking=!1;const a=Ee.fromCartesian(this.eyeTarget);a.height-=pt-1;const o=Ee.toCartesian(a);this.pivot=p.clone(o),this.targetPivot=o,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,t?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(t){if(!this.keys.size)return;const a=this.keys,o=a.has("ShiftLeft")||a.has("ShiftRight")?3:1;let s=0,h=0;(a.has("KeyW")||a.has("ArrowUp"))&&(s+=1),(a.has("KeyS")||a.has("ArrowDown"))&&(s-=1),(a.has("KeyD")||a.has("ArrowRight"))&&(h+=1),(a.has("KeyA")||a.has("ArrowLeft"))&&(h-=1);let d=0;if(a.has("KeyQ")&&(d+=1),a.has("KeyE")&&(d-=1),this.walking){d&&(this.wHeadingT-=d*1.2*t),(s||h)&&this.walk(s*4.2*o*t,h*3.4*o*t);return}if(d&&(this.targetHeading+=d*.9*t,this.tween=null),(a.has("PageUp")||a.has("Equal")||a.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*t))),(a.has("PageDown")||a.has("Minus")||a.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*t))),a.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*t)),a.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*t)),!s&&!h)return;const u=Math.max(8,this.range*.6)*o*t;this.moveHorizontal(this.targetPivot,this.heading,s*u,h*u),this.tween=null}update(t){this.updateKeys(t);const a=1-Math.exp(-this.damping*t);if(this.walking){p.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*t),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*a,this.wPitch+=(this.wPitchT-this.wPitch)*a,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const o=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),s=Gt(o),{from:h,to:d}=this.tween;p.lerp(h.pivot,d.pivot,s,this.targetPivot),this.targetHeading=h.heading+(d.heading-h.heading)*s,this.targetPitch=h.pitch+(d.pitch-h.pitch)*s,this.targetRange=Math.exp(Math.log(h.range)+(Math.log(d.range)-Math.log(h.range))*s),o>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*a,this.pitch+=(this.targetPitch-this.pitch)*a,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*a),p.lerp(this.pivot,this.targetPivot,a,this.pivot),this.viewer.camera.lookAt(this.pivot,new Rt(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(O.IDENTITY)}}function $t(){return new De({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const At=()=>({uAerial:{type:N.SAMPLER_2D,value:$t()},uAerialRect:{type:N.VEC4,value:new et(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:N.FLOAT,value:0}}),Lt=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,Oe=`
  vec3 hlfHazeColor(float night, float tarde) {
    vec3 day = vec3(0.66, 0.75, 0.86);
    // tarde bogotana: bruma andina limpia, ligeramente fría en la distancia
    vec3 sunset = vec3(0.66, 0.69, 0.76);
    vec3 nite = vec3(0.03, 0.05, 0.10);
    return mix(mix(day, sunset, tarde), nite, night);
  }
  float hlfHaze(float d) {
    return (1.0 - exp(-max(0.0, d - 1200.0) * 0.00010)) * 0.08;
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
`;function Qt(){return new Fe({uniforms:{uNight:{type:N.FLOAT,value:0},uTarde:{type:N.FLOAT,value:0},uHotelPisos:{type:N.FLOAT,value:99},uLean:{type:N.VEC2,value:new Ae(0,0)},...At()},varyings:{vPosM:te.VEC3,vUpEC:te.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Oe+Lt+`
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
    `})}function eo(e,t,a){return new Fe({uniforms:{uNight:{type:N.FLOAT,value:0},uTarde:{type:N.FLOAT,value:0},uTime:{type:N.FLOAT,value:0},uFrame:{type:N.FLOAT,value:t},uTop:{type:N.FLOAT,value:a},uAtlas:{type:N.SAMPLER_2D,value:new De({url:e,repeat:!1,minificationFilter:tt.LINEAR_MIPMAP_LINEAR,magnificationFilter:ot.LINEAR})}},varyings:{vUV:te.VEC2,vView:te.VEC3,vRightT:te.VEC2,vUpT:te.VEC2,vUpEC:te.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:Oe+`
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
    `})}function to(){return new Fe({uniforms:{uNight:{type:N.FLOAT,value:0},uTarde:{type:N.FLOAT,value:0}},lightingModel:Ht.UNLIT,fragmentShaderText:Oe+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC)));
      }
    `})}function oo(e,t,a){return new Ct({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:e,uNorth:t,uUp:a},fragmentShader:`
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
        if (depth < 0.999999) {
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
        if (rd.z > 0.002) {
          vec2 uv = rd.xy / (rd.z + 0.12);
          vec2 wind = vec2(uTime * 0.008, uTime * 0.003);
          float n1 = fbm(uv * 0.48 + wind);
          float n2 = fbm(uv * 1.15 - wind * 0.6 + vec2(4.2, 9.1));
          float density = smoothstep(0.45, 0.74, n1 * 0.72 + n2 * 0.34);

          // Sombreado propio de la nube hacia el sol
          float nSun = fbm((uv + vec2(0.05, 0.03)) * 0.48 + wind);
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
          float horizonFade = smoothstep(0.002, 0.055, rd.z);
          sky = mix(sky, cloudCol, density * horizonFade * 0.85);
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
    `})}function io(e){const t=a=>({type:N.SAMPLER_2D,value:new De({url:e+a,repeat:!0,minificationFilter:tt.LINEAR_MIPMAP_LINEAR,magnificationFilter:ot.LINEAR})});return new Fe({uniforms:{uNight:{type:N.FLOAT,value:0},uTarde:{type:N.FLOAT,value:0},uAsfalto:t("tex_asfalto.webp"),uAnden:t("tex_anden.webp"),uPrado:t("tex_prado.webp"),uCiclo:t("tex_ciclo.webp"),...At()},varyings:{vG:te.VEC3,vUpEC:te.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Oe+Lt+`
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
    `})}function at(){return Je.eastNorthUpToFixedFrame(p.fromDegrees(_e.longitude,_e.latitude,_e.height))}function be(e,t,a,o=at()){return O.multiplyByPoint(o,new p(e,t,a),new p)}const no={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function so(e,t,a){let o=!1;for(let s=0,h=a.length-1;s<a.length;h=s++){const[d,u]=a[s],[E,P]=a[h];u>t!=P>t&&e<(E-d)*(t-u)/(P-u)+d&&(o=!o)}return o}function ro(e,t,a){let o=1/0;for(let s=0,h=a.length-1;s<a.length;h=s++){const[d,u]=a[h],[E,P]=a[s],g=E-d,v=P-u,y=Math.max(0,Math.min(1,((e-d)*g+(t-u)*v)/(g*g+v*v||1)));o=Math.min(o,Math.hypot(e-d-y*g,t-u-y*v))}return o}async function co(e,t,a){const o=e.scene,s=at(),h=O.inverseTransformation(s,new O),d=we.secciones;t("Contexto urbano",.08);const[u,E,P,g]=await Promise.all([fetch(d+"recorte.json").then(c=>c.json()),fetch(d+"edificios.json").then(c=>c.json()),fetch(d+"arboles.json").then(c=>c.json()),fetch(d+"suelo.json").then(c=>c.json())]),v=()=>u.clips.map(c=>{const f=new Ft({positions:p.fromDegreesArray(c.flat())}),i=f.computeRectangle();return f.computeRectangle=r=>Dt.clone(i,r),f});o.globe.clippingPolygons=new lt({polygons:v()});const y=to();let I=null;try{I=await Nt.fromUrl(we.googleTiles,{maximumScreenSpaceError:10,shadows:le.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),I.clippingPolygons=new lt({polygons:v()}),I.customShader=y,o.primitives.add(I)}catch(c){console.warn("Tiles de Google no disponibles",c)}const K=[-236,330],B=[];for(const c of E.secciones)B.push({key:c.key,file:c.file,kind:"edificios",label:c.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${c.key}`,dist:c.key==="Hotel"?-2:Math.hypot(c.c[0]-K[0],c.c[1]-K[1])});B.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),B.sort((c,f)=>c.dist-f.dist);const fe={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},Z=g.secciones.map(c=>({key:c.key,file:c.file,kind:"suelo",capa:fe[c.key]?.[0]??0,label:fe[c.key]?.[1]??c.key,dist:-3})),me=P.secciones.map(c=>({key:c.key,file:c.file,kind:"arboles",atlas:c.atlas,marco:c.marco,marcoSup:c.marcoSup,label:no[c.key]??"Vegetación",dist:0})),Y=[...Z,...B.slice(0,4),...me.slice(0,3),...B.slice(4,9),...me.slice(3),...B.slice(9)],ae=Qt(),F=io(d);(async()=>{try{const c=await Et.fromAssetId(we.imageryAssetId),f=18,i=c.tilingScheme,r=(H,q)=>Ee.fromCartesian(be(H,q,0,s)),l=i.positionToTileXY(r(-1010,930),f),n=i.positionToTileXY(r(1010,-940),f),m=n.x-l.x+1,M=n.y-l.y+1,x=c.tileWidth,w=document.createElement("canvas");w.width=m*x,w.height=M*x;const b=w.getContext("2d"),_=[];for(let H=l.y;H<=n.y;H++)for(let q=l.x;q<=n.x;q++)_.push([q,H]);const $=async([H,q])=>{for(let rt=0;rt<40;rt++){const ct=c.requestImage(H,q,f);if(ct){try{const We=await ct;b.drawImage(We,(H-l.x)*x,(q-l.y)*x,x,x)}catch{}return}await new Promise(We=>setTimeout(We,120))}};b.fillStyle="#6a6f62",b.fillRect(0,0,w.width,w.height);const ee=Array.from({length:6},async()=>{for(;_.length;)await $(_.shift())});await Promise.all(ee);const T=document.createElement("canvas");T.width=T.height=4096,T.getContext("2d").drawImage(w,0,0,4096,4096);const U=await new Promise(H=>T.toBlob(H,"image/jpeg",.92));if(!U)return;const k=URL.createObjectURL(U),R=i.tileXYToRectangle(l.x,l.y,f),V=i.tileXYToRectangle(n.x,n.y,f),J=(H,q)=>O.multiplyByPoint(h,p.fromRadians(H,q,_e.height),new p),se=J(R.west,V.south),re=J(V.east,R.north),je=new et(se.x,se.y,re.x,re.y);for(const H of[ae,F])H.setUniform("uAerial",new De({url:k,repeat:!1,minificationFilter:tt.LINEAR_MIPMAP_LINEAR,magnificationFilter:ot.LINEAR})),H.setUniform("uAerialRect",je),H.setUniform("uAerialOn",1)}catch(c){console.warn("Foto aérea no disponible",c)}})();const pe=[],Me=[];let ie=0,Te=0;const ne={total:Y.length,loaded:0,failed:[]},Ce=async c=>{try{const f=await Ze.fromGltfAsync({url:d+c.file,modelMatrix:s,upAxis:ye.Y,forwardAxis:ye.X,shadows:c.kind==="arboles"?le.CAST_ONLY:c.kind==="suelo"?le.RECEIVE_ONLY:le.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:c.kind!=="arboles"});if(c.kind==="suelo")f.customShader=F;else if(c.kind==="arboles"){const i=eo(d+c.atlas,c.marco,c.marcoSup);i.setUniform("uNight",ie),i.setUniform("uTarde",Te),pe.push(i),f.customShader=i}else f.customShader=ae;f.imageBasedLighting.imageBasedLightingFactor=new Ae(.75,.45),o.primitives.add(f),c.kind==="arboles"&&Me.push(f),await new Promise(i=>{if(f.ready)return i();const r=f.readyEvent.addEventListener(()=>{r(),i()});setTimeout(i,2e4)})}catch(f){console.error("Sección no cargada",c.file,f),ne.failed.push(c.file)}ne.loaded++,a?.(ne.loaded,ne.total,c.label)},Q=Z.length+7;for(let c=0;c<Math.min(Q,Y.length);c++)t(Y[c].label,.2+.75*c/Q),await Ce(Y[c]);const Se=(async()=>{for(let c=Q;c<Y.length;c++)await Ce(Y[c]),await new Promise(f=>setTimeout(f,60))})();return{matrix:s,inverse:h,tileset:I,buildings:E.edificios,treeCount:P.total,sections:ne,done:Se,setNight(c){y.setUniform("uNight",c),ae.setUniform("uNight",c),ie=c,F.setUniform("uNight",c);for(const f of pe)f.setUniform("uNight",c)},setTarde(c){y.setUniform("uTarde",c),ae.setUniform("uTarde",c),Te=c,F.setUniform("uTarde",c);for(const f of pe)f.setUniform("uTarde",c)},setTime(c){for(const f of pe)f.setUniform("uTime",c)},setHotelFloors(c){ae.setUniform("uHotelPisos",c)},setTreesVisible(c){for(const f of Me)f.show=c},buildingAt(c){const f=O.multiplyByPoint(h,c,new p);let i=null,r=1.2;for(const l of E.edificios){if(f.x<l.bb[0]-1.5||f.x>l.bb[2]+1.5||f.y<l.bb[1]-1.5||f.y>l.bb[3]+1.5||f.z>l.b+l.h+2.5)continue;if(so(f.x,f.y,l.r))return l;const n=ro(f.x,f.y,l.r);n<r&&(r=n,i=l)}return i}}}const gt=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],vt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],yt=3.2;async function lo(e,t,a=110){const o=we.secciones;let s,h,d;try{s=await fetch(o+"vias_campo.json").then(r=>r.json());const i=new Uint8Array(await fetch(o+"vias_campo.bin").then(r=>r.arrayBuffer()));h=i.subarray(0,s.w*s.h),d=i.subarray(s.w*s.h)}catch{return null}const{cell:u,x0:E,y0:P,w:g,h:v}=s,y=(i,r)=>{const l=(i-E)/u-.5,n=(r-P)/u-.5,m=Math.floor(l),M=Math.floor(n);if(m<0||M<0||m>=g-1||M>=v-1)return 0;const x=l-m,w=n-M,b=M*g+m;return((h[b]*(1-x)+h[b+1]*x)*(1-w)+(h[b+g]*(1-x)+h[b+g+1]*x)*w)*.5},I=(i,r)=>{const l=Math.max(0,Math.min(g-1,Math.floor((i-E)/u))),n=Math.max(0,Math.min(v-1,Math.floor((r-P)/u))),m=n*g+l;if(h[m]>0)return d[m]*.1-2;let M=0,x=0;for(let w=-2;w<=2;w++){const b=n+w;if(!(b<0||b>=v))for(let _=-2;_<=2;_++){const $=l+_;if($<0||$>=g)continue;const ee=b*g+$;if(h[ee]===0)continue;const T=1/(_*_+w*w+.5);M+=T,x+=(d[ee]*.1-2)*T}}return M>0?x/M:1},K=[],B=[],fe=[];for(let i=2;i<v-2;i++)for(let r=2;r<g-2;r++){const l=i*g+r,n=E+(r+.5)*u,m=P+(i+.5)*u,M=Math.hypot(n+180,m-250);if(M>520)continue;const x=h[l]*.5;if(x>=2.6&&x<=5&&K.push(l),x>=6&&M<460&&fe.push({e:n,n:m,d:x}),h[l]===0&&M<430){let w=!1;for(let b=-2;b<=2&&!w;b++)for(let _=-2;_<=2;_++)if(h[(i+b)*g+(r+_)]>0){w=!0;break}w&&B.push(l)}}if(!K.length)return null;fe.sort((i,r)=>r.d-i.d);const Z=[],me=(i,r,l)=>O.multiplyByPoint(t,new p(i,r,l),new p);for(const i of fe){if(Z.length>=6)break;if(Z.some(w=>Math.hypot(w.e-i.e,w.n-i.n)<90))continue;const r=I(i.e,i.n),l=i.e+6.5,n=i.n+6.5,m=I(l,n);e.entities.add({position:me(l,n,m+2.4),cylinder:{length:4.8,topRadius:.11,bottomRadius:.14,material:D.fromCssColorString("#242933")}});const M=e.entities.add({position:me(l-.6,n,m+4.5),box:{dimensions:new p(.45,.45,1.05),material:D.LIME}}),x=e.entities.add({position:me(l,n-.6,m+4.5),box:{dimensions:new p(.45,.45,1.05),material:D.RED}});Z.push({e:i.e,n:i.n,u:r,faseOffset:Z.length*4.5,nsLuz:M,ewLuz:x,nsEstado:"green",ewEstado:"red"})}const Y=(()=>{let i=12345;return()=>(i=i*1664525+1013904223>>>0)/4294967296})(),ae=(i,r,l)=>{const n=Math.cos(l),m=Math.sin(l);if(i>=-168&&i<=-118&&Math.abs(m)>.35)return i<-143?m<-.2?12:-1e6:m>.2?12:-1e6;const M=263-(i+420)*(51/380);return Math.abs(r-M)<26&&Math.abs(n)>.35?r>M?n>.2?12:-1e6:n<-.2?12:-1e6:i>=-255&&i<=-210&&r<222&&Math.abs(m)>.35?m<-.2?10:-1e6:r<175&&i<-215&&Math.abs(n)>.35?n>.2?10:-1e6:i<-385&&r<265&&Math.abs(m)>.35?m<-.2?10:-1e6:0},F=[],pe=(i,r,l)=>F.some(n=>n!==l&&Math.hypot(n.e-i,n.n-r)<8.5),Me=i=>{for(let r=0;r<45;r++){const l=K[Math.floor(Y()*K.length)],n=E+(l%g+.5)*u,m=P+(Math.floor(l/g)+.5)*u;if(pe(n,m,i))continue;let M=0,x=-1e9;for(let w=0;w<16;w++){const b=w/16*Math.PI*2,_=n+Math.cos(b)*10,$=m+Math.sin(b)*10,ee=y(_,$),T=ae(_,$,b);if(T<-1e4)continue;const U=y(n+Math.sin(b)*2.5,m-Math.cos(b)*2.5),k=y(n-Math.sin(b)*2.5,m+Math.cos(b)*2.5),R=-Math.abs(ee-yt)+(k>U?1.5:0)+T;ee>1.5&&R>x&&(x=R,M=b)}if(x>-1e8){i.e=n,i.n=m,i.th=M,i.vActual=i.v*.5;return}}};for(let i=0;i<a;i++){const r=Y(),l=r<.2?"taxi":r<.48?"suv":"sedan",n={e:0,n:0,th:0,v:6.5+Y()*5,vActual:0,model:null,u:0,tipo:l};Me(n),F.push(n)}const ie=[];if(B.length>0)for(let i=0;i<42;i++){const r=B[Math.floor(Y()*B.length)],l=E+(r%g+.5)*u,n=P+(Math.floor(r/g)+.5)*u;ie.push({e:l,n,th:Y()*Math.PI*2,v:1.15+Y()*.45,model:null,u:I(l,n)+.16,conPerro:i%3===0})}const Te=new p,ne=new ut,Ce=new O,Q=(i,r=.08)=>{i.model&&(p.fromElements(i.e,i.n,i.u+r,Te),ut.fromRotationZ(i.th,ne),O.fromRotationTranslation(ne,Te,Ce),i.model.modelMatrix=O.multiply(t,Ce,new O))};(async()=>{for(let i=0;i<F.length;i++){const r=F[i],l=r.tipo==="taxi"?"carro_taxi.glb":r.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const n=await Ze.fromGltfAsync({url:o+l,upAxis:ye.Y,forwardAxis:ye.X,shadows:le.ENABLED,color:r.tipo==="taxi"?D.WHITE:D.fromCssColorString(gt[i%gt.length]),colorBlendMode:ht.MIX,colorBlendAmount:r.tipo==="taxi"?0:.28});e.scene.primitives.add(n),r.model=n,r.u=I(r.e,r.n),Q(r)}catch{}i%6===5&&await new Promise(n=>setTimeout(n,35))}for(let i=0;i<ie.length;i++){const r=ie[i];try{const l=await Ze.fromGltfAsync({url:o+(r.conPerro?"persona_perro.glb":"persona.glb"),upAxis:ye.Y,forwardAxis:ye.X,shadows:le.ENABLED,color:D.fromCssColorString(vt[i%vt.length]),colorBlendMode:ht.MIX,colorBlendAmount:.25});e.scene.primitives.add(l),r.model=l,Q(r,0)}catch{}i%6===5&&await new Promise(l=>setTimeout(l,35))}})();let Se=!0,c=0;const f=(i,r)=>y(i,r)===0&&y(i+4,r)+y(i-4,r)+y(i,r+4)+y(i,r-4)>.5;return{count:a,debug:()=>F.map(i=>[Math.round(i.e),Math.round(i.n),+i.u.toFixed(1),i.model?1:0]),setVisible(i){Se=i;for(const r of F)r.model&&(r.model.show=i);for(const r of ie)r.model&&(r.model.show=i);for(const r of Z)r.nsLuz.show=i,r.ewLuz.show=i},update(i){if(!Se)return;const r=Math.min(.08,Math.max(.001,i));c+=r;for(const l of Z){const n=(c+l.faseOffset)%24,m=n<10?"green":n<12?"yellow":"red",M=n>=12&&n<22?"green":n>=22?"yellow":"red";m!==l.nsEstado&&(l.nsEstado=m,l.nsLuz.box.material.color=new dt(m==="green"?D.LIME:m==="yellow"?D.YELLOW:D.RED)),M!==l.ewEstado&&(l.ewEstado=M,l.ewLuz.box.material.color=new dt(M==="green"?D.LIME:M==="yellow"?D.YELLOW:D.RED))}for(let l=0;l<F.length;l++){const n=F[l];if(!n.model)continue;let m=0,M=-1e9;for(let T=-4;T<=4;T++){const U=T*.13,k=n.th+U,R=n.e+Math.cos(k)*9,V=n.n+Math.sin(k)*9,J=y(R,V);if(J<1.1||y(n.e+Math.cos(k)*4.5,n.n+Math.sin(k)*4.5)<.9)continue;const re=ae(R,V,k);if(re<-1e4)continue;const je=y(R+Math.sin(k)*2.5,V-Math.cos(k)*2.5),H=y(R-Math.sin(k)*2.5,V+Math.cos(k)*2.5),q=-Math.abs(Math.min(J,6)-yt)-Math.abs(U)*1.6+(H>=je?.6:0)+re;q>M&&(M=q,m=U)}if(M<-1e8||Math.hypot(n.e+180,n.n-250)>580){Me(n),n.u=I(n.e,n.n),Q(n);continue}const x=Math.cos(n.th),w=Math.sin(n.th);let b=1;for(let T=0;T<F.length;T++){if(T===l||!F[T].model)continue;const U=F[T],k=U.e-n.e,R=U.n-n.n,V=k*k+R*R;if(V>225)continue;const J=k*x+R*w,se=Math.abs(-k*w+R*x);if(J>0&&J<12.5&&se<2.35){const re=J<6.4?0:(J-6.4)/6.1;re<b&&(b=re)}else V<22&&T<l&&(b=0)}const _=Math.abs(x)>Math.abs(w);for(const T of Z){if((_?T.ewEstado:T.nsEstado)==="green")continue;const k=T.e-n.e,R=T.n-n.n,V=k*x+R*w,J=Math.abs(-k*w+R*x);if(V>7&&V<21&&J<9){const se=V<10.5?0:(V-10.5)/10.5;se<b&&(b=se)}}const $=1-Math.min(.55,Math.abs(m)*1.4),ee=n.v*$*b;if(n.vActual+=(ee-n.vActual)*Math.min(1,r*4.5),n.vActual>.05){n.th+=Math.max(-1.4*r,Math.min(1.4*r,m));const T=n.e+Math.cos(n.th)*n.vActual*r,U=n.n+Math.sin(n.th)*n.vActual*r;y(T,U)>=.7?(n.e=T,n.n=U):n.th+=.6;const k=Math.max(I(n.e,n.n),I(n.e+Math.cos(n.th)*1.4,n.n+Math.sin(n.th)*1.4),I(n.e-Math.cos(n.th)*1.4,n.n-Math.sin(n.th)*1.4));n.u+=(k-n.u)*Math.min(1,r*8)}Q(n)}for(const l of ie){if(!l.model)continue;const n=l.e+Math.cos(l.th)*l.v*r,m=l.n+Math.sin(l.th)*l.v*r;f(n,m)&&Math.hypot(n+180,m-250)<430?(l.e=n,l.n=m,l.u+=(I(l.e,l.n)+.16-l.u)*Math.min(1,r*4)):l.th+=.9+Y()*1.2,Q(l,0)}}}}Yt.defaultAccessToken=we.ionToken;const S=e=>document.getElementById(e),it=S("cesiumContainer"),xt=S("loading"),ho=S("loadBar"),Pt=S("loadLabel"),uo=S("loadPct");function qe(e,t){Pt.textContent=e;const a=Math.round(Math.max(0,Math.min(1,t))*100);ho.style.width=a+"%",uo.textContent=a+"%"}const W=new Ot(it,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:le.RECEIVE_ONLY,terrain:Vt.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Ut.fromProviderAsync(Et.fromAssetId(we.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),L=W.scene;L.globe.enableLighting=!0;L.globe.showGroundAtmosphere=!0;L.globe.depthTestAgainstTerrain=!0;L.globe.maximumScreenSpaceError=2;L.fog.enabled=!1;L.fog.density=18e-5;L.fog.minimumBrightness=.04;L.highDynamicRange=!0;L.msaaSamples=4;L.postProcessStages.fxaa.enabled=!0;L.screenSpaceCameraController.enableCollisionDetection=!1;L.light=new jt({intensity:3,color:D.fromCssColorString("#fff4e3")});const he=W.shadowMap;he.softShadows=!0;he.size=4096;he.maximumDistance=1200;he.darkness=.24;he.normalOffset=!0;{const e=he;e._primitiveBias.depthBias=8e-4,e._primitiveBias.normalOffsetScale=1.6,e._primitiveBias.normalShadingSmooth=.35}const ue=L.postProcessStages.ambientOcclusion;ue.enabled=!0;ue.uniforms.intensity=2.1;ue.uniforms.bias=.08;ue.uniforms.lengthCap=.35;ue.uniforms.stepSize=1.4;ue.uniforms.blurStepSize=1;const oe=L.postProcessStages.bloom;oe.enabled=!0;oe.uniforms.glowOnly=!1;oe.uniforms.contrast=128;oe.uniforms.brightness=-.36;oe.uniforms.delta=1;oe.uniforms.sigma=2.6;oe.uniforms.stepSize=1.5;const fo=at(),Xe=e=>{const t=O.getColumn(fo,e,new et);return new p(t.x,t.y,t.z)},Ne=oo(Xe(0),Xe(1),Xe(2));L.postProcessStages.add(Ne);const $e=ao();L.postProcessStages.add($e);W.camera.frustum.fov=Tt.toRadians(48);const wt=(()=>{try{const e=L.context._gl,t=e.getExtension("WEBGL_debug_renderer_info");return t?String(e.getParameter(t.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),mo=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(wt)&&!/Arc/i.test(wt);let A=null,j=mo||matchMedia("(pointer: coarse)").matches?.5:1;function Pe(){const e=Math.min(window.devicePixelRatio||1,2);W.resolutionScale=e*(j>=1?1:j>=.5?.8:.62),he.size=j>=1?4096:j>=.5?2048:1024,he.softShadows=j>=.5,ue.enabled=j>=1,oe.enabled=j>=.5,L.msaaSamples=j>=1?4:1,W.shadows=j>=.5,A?.tileset&&(A.tileset.maximumScreenSpaceError=j>=1?8:j>=.5?12:20)}Pe();W.clock.shouldAnimate=!1;W.clock.currentTime=Le.fromIso8601("2026-06-21T10:10:00-05:00");const z=new Zt(W),Ue=e=>be(Ye[e].e,Ye[e].n,Ye[e].u),po=Ue("hotel");z.flyTo({pivot:po,heading:Re.general.heading,pitch:Re.general.pitch,range:Re.general.range*1.8},0);z.groundHeight=e=>L.globe.getHeight(e);const go=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,tarde:0,fog:18e-5,label:"10:10",sun:3,color:"#fff4e3"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:2.8,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.65,color:"#6b8fd4"}];let ge=0,ve=0,ce=null;const vo=e=>Le.toDate(Le.fromIso8601(e)).getTime();function yo(e){ce={from:Le.toDate(W.clock.currentTime).getTime(),to:vo(e.iso),start:performance.now(),dur:1600},L.fog.density=e.fog,L.light.intensity=e.sun,L.light.color=D.fromCssColorString(e.color),oe.uniforms.brightness=-.36,L.skyAtmosphere&&(L.skyAtmosphere.hueShift=0,L.skyAtmosphere.saturationShift=e.id==="tarde"?.08:e.id==="noche"?-.25:.06,L.skyAtmosphere.brightnessShift=e.id==="noche"?-.55:e.id==="tarde"?-.04:0);const a=ge,o=ve,s=performance.now(),h=()=>{const u=Math.min(1,(performance.now()-s)/1400),E=u*u*(3-2*u);ge=a+(e.night-a)*E,ve=o+(e.tarde-o)*E,A?.setNight(ge),A?.setTarde(ve),Ne.uniforms.uNight=ge,Ne.uniforms.uTarde=ve,$e.uniforms.uNight=ge,$e.uniforms.uTarde=ve,u<1&&requestAnimationFrame(h)};requestAnimationFrame(h),document.querySelectorAll("[data-light]").forEach(u=>u.classList.toggle("on",u.dataset.light===e.id));const d=S("clockLabel");d&&(d.textContent=e.label)}document.querySelectorAll("[data-light]").forEach(e=>{e.addEventListener("click",()=>{const t=go.find(a=>a.id===e.dataset.light);t&&yo(t)})});let xe=!1;const Qe=S("btnOrbit"),nt=S("btnPedestrian");function de(){xe=!1,Qe?.classList.remove("on")}function ke(e,t=2){de();const a=Re[e];z.flyTo({pivot:Ue(a.place),heading:a.heading,pitch:a.pitch,range:a.range},t)}S("btnHome")?.addEventListener("click",()=>ke("general",2.2));S("btnAerial")?.addEventListener("click",()=>ke("aerial"));S("btnArch")?.addEventListener("click",()=>ke("arch"));nt?.addEventListener("click",()=>{de(),z.isWalking?z.exitWalk():z.enterWalk(G?St(G):void 0)});z.onModeChange=e=>{nt?.classList.toggle("on",e);const t=S("hint");t&&e&&(t.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",t.classList.remove("fade"),setTimeout(()=>t.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(e=>{e.addEventListener("click",()=>{de();const t=e.dataset.place;z.flyTo({pivot:Ue(t),range:t==="hotel"?300:520,pitch:-.5},2)})});Qe?.addEventListener("click",()=>{xe=!xe,Qe.classList.toggle("on",xe),xe&&z.isWalking&&z.exitWalk()});it.addEventListener("pointerdown",de);it.addEventListener("wheel",de,{passive:!0});addEventListener("keydown",e=>{e.code==="Escape"&&(z.isWalking?z.exitWalk():Ve(null)),(e.code==="KeyH"||e.code==="Home")&&ke("general",2.2),e.code==="KeyP"&&nt?.click()});let G=null,st=null;const xo=9;let He=null;function kt(){A&&(He={start:performance.now()},A.setHotelFloors(0))}let ze=null;const Ie=S("card");function wo(e){return be((e.bb[0]+e.bb[2])/2,(e.bb[1]+e.bb[3])/2,e.b+e.h*.5)}function St(e){return be((e.bb[0]+e.bb[2])/2,e.bb[1]-9,e.b)}function Ve(e){const t=G?.s==="Hotel";if(G=e,ze&&(W.entities.remove(ze),ze=null),!e||!A){Ie&&(Ie.hidden=!0);return}const a=e.r.map(([v,y])=>be(v,y,0,A.matrix)),o=2572+e.b-.5;ze=W.entities.add({polygon:{hierarchy:new Bt(a),height:o,extrudedHeight:o+e.h+2.2,material:D.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:D.fromCssColorString("#d7ebff"),shadows:le.DISABLED}});const s=e.s==="Hotel";s&&!t&&(kt(),de(),z.flyTo({pivot:Ue("hotel"),pitch:-.38,range:290},1.8));const h=s&&A?A.buildings.filter(v=>v.s==="Hotel"):[e],d=v=>Math.abs(v.r.reduce((y,I,K)=>{const B=v.r[(K+1)%v.r.length];return y+I[0]*B[1]-B[0]*I[1]},0)/2),u=h.reduce((v,y)=>v+d(y),0),E=h.reduce((v,y)=>v+d(y)*y.p,0),P=Math.max(...h.map(v=>v.p)),g=Math.max(...h.map(v=>v.h));Math.abs(e.r.reduce((v,y,I)=>{const K=e.r[(I+1)%e.r.length];return v+y[0]*K[1]-K[0]*y[1]},0)/2),S("cardKind").textContent=s?"Proyecto":`Sector ${e.s}`,S("cardTitle").textContent=s?"Hotel La Fontana":`Edificación ${e.id+1}`,S("cardData").innerHTML=`<dt>Pisos</dt><dd>${s?"hasta "+P:e.p}</dd><dt>Altura</dt><dd>${g.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(u).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(E).toLocaleString("es-CO")} m²</dd>`,Ie&&(Ie.hidden=!1)}z.onPick=e=>{A&&Ve(e?A.buildingAt(e):null)};S("cardClose")?.addEventListener("click",()=>Ve(null));S("cardFocus")?.addEventListener("click",()=>{if(!G)return;de();const e=Math.max(G.bb[2]-G.bb[0],G.bb[3]-G.bb[1],G.h);z.flyTo({pivot:wo(G),pitch:-.42,range:Math.max(60,e*2.1)},1.7)});S("cardWalk")?.addEventListener("click",()=>{G&&(de(),z.enterWalk(St(G)))});const Ge=S("status"),bt=S("statusText");async function bo(){qe("Contexto geográfico",.04),await new Promise(t=>setTimeout(t,30)),A=await co(W,(t,a)=>qe(t,a),(t,a,o)=>{!Ge||!bt||(Ge.hidden=!1,bt.textContent=t<a?`Cargando secciones ${t}/${a} · ${o}`:`Modelo completo · ${a} secciones`,t>=a&&setTimeout(()=>Ge.classList.add("fade"),2600))}),A.setNight(ge),A.setTarde(ve),Pe(),qe("Listo",1),ke("general",2.4),xt.classList.add("done"),setTimeout(()=>xt.remove(),900);const e=S("hint");e&&setTimeout(()=>e.classList.add("fade"),9e3),window.__READY__=!0,A.done.then(async()=>{st=await lo(W,A.matrix),window.__ALL__=!0})}const X={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Wt,viewer:W,cam:z,getSite:()=>A,enuToWorld:be,select:Ve,stats:X,playHotel:kt,getTrafico:()=>st,setQuality:e=>{j=e,Pe()}};bo().catch(e=>{console.error(e),Pt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(e?.message??e)});let Mt=performance.now(),Ke=0;function zt(){const e=performance.now(),t=Math.min(.1,(e-Mt)/1e3);if(Mt=e,ce){const o=Math.min(1,(e-ce.start)/ce.dur),s=o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2;W.clock.currentTime=Le.fromDate(new Date(ce.from+(ce.to-ce.from)*s)),o>=1&&(ce=null)}if(He&&A){const o=(e-He.start)/550,s=Math.floor(o),h=o-s,d=1-Math.pow(1-Math.min(1,h*1.6),3);s>=xo?(A.setHotelFloors(99),He=null):A.setHotelFloors(s+d)}st?.update(t);const a=e*.001;if(A?.setTime(a),Ne.uniforms.uTime=a,xe&&!z.isWalking&&z.flyTo({heading:z.state.heading+.16*t},0),z.update(t),X.frames++,e-X.t0>=2e3){X.fps=Math.round(X.frames*1e3/(e-X.t0)),X.frames=0,X.t0=e,window.__FPS__=X.fps;const o=!!A&&A.sections.loaded>=A.sections.total&&e-Ke>8e3;A&&A.sections.loaded>=A.sections.total&&!Ke&&(Ke=e),o&&document.visibilityState==="visible"&&(X.fps<20&&j>.25&&!window.__DBG__.lock?++X.low>=3&&(j=j>=1?.5:.25,X.low=0,Pe()):X.low=0)}requestAnimationFrame(zt)}requestAnimationFrame(zt);addEventListener("resize",Pe);
