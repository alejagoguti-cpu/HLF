var Vt=Object.defineProperty;var Bt=(t,o,i)=>o in t?Vt(t,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[o]=i;var M=(t,o,i)=>Bt(t,typeof o!="symbol"?o+"":o,i);import{C as p,a as Pt,T as at,M as B,b as Ce,c as Pe,H as jt,P as It,d as We,L as Wt,U as T,V as ie,e as st,f as Ye,g as rt,h as lt,i as vt,j as Yt,S as fe,I as _t,k as qt,R as Gt,l as it,A as we,m as V,n as yt,o as xt,p as wt,q as Xt,r as Kt,s as Jt,t as Zt,J as Ie,u as $t,v as Qt,w as eo}from"./cesium-ICe9G6Ok.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function i(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(r){if(r.ep)return;r.ep=!0;const c=i(r);fetch(r.href,c)}})();const Je="/HLF/",to=Je.endsWith("/")?Je:Je+"/",oo=to+"cesium/";window.CESIUM_BASE_URL=oo;const Ue={longitude:-74.04145021,latitude:4.70207636,height:2572},Ze={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},Ve={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Me={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},ao=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,bt=-1.5533,Ct=-.012,io=4200,no=6,Mt=1.7;class so{constructor(o){M(this,"viewer");M(this,"canvas");M(this,"pivot",new p);M(this,"heading",.5);M(this,"pitch",-.6);M(this,"range",1200);M(this,"targetPivot",new p);M(this,"targetHeading",.5);M(this,"targetPitch",-.6);M(this,"targetRange",1200);M(this,"damping",9);M(this,"drag",null);M(this,"pointers",new Map);M(this,"pinch",null);M(this,"lastTap",0);M(this,"keys",new Set);M(this,"tween",null);M(this,"fov",Pt.toRadians(48));M(this,"walking",!1);M(this,"eye",new p);M(this,"eyeTarget",new p);M(this,"wHeading",0);M(this,"wPitch",0);M(this,"wHeadingT",0);M(this,"wPitchT",0);M(this,"onPick",null);M(this,"onModeChange",null);M(this,"groundHeight",null);this.viewer=o,this.canvas=o.scene.canvas,o.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:p.clone(this.targetPivot)}}setPivot(o,i=!0){if(i){const a=p.clone(this.viewer.camera.positionWC),r=p.subtract(a,o,new p),c=p.magnitude(r),d=at.eastNorthUpToFixedFrame(o),u=B.inverseTransformation(d,new B),x=B.multiplyByPointAsVector(u,r,new p);if(c>1){const w=-Math.asin(Math.max(-1,Math.min(1,x.z/c)));if(w<Ct&&w>bt){let v=Math.atan2(-x.x,-x.y);for(;v-this.heading>Math.PI;)v-=Math.PI*2;for(;v-this.heading<-Math.PI;)v+=Math.PI*2;this.heading=this.targetHeading=v,this.pitch=this.targetPitch=w,this.range=this.targetRange=this.clamp(c),p.clone(o,this.pivot)}}}this.targetPivot=p.clone(o),this.tween=null}bind(){const o=this.canvas;o.style.touchAction="none",o.addEventListener("pointerdown",a=>{if(o.setPointerCapture(a.pointerId),this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2){const[r,c]=[...this.pointers.values()];this.pinch={distance:Math.hypot(r.x-c.x,r.y-c.y),range:this.targetRange,cx:(r.x+c.x)/2,cy:(r.y+c.y)/2},this.drag=null;return}a.button===2||a.button===1||a.shiftKey?this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"pan",moved:!1}:a.button===0&&(this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"orbit",moved:!1}),this.tween=null}),o.addEventListener("pointermove",a=>{if(!this.pointers.has(a.pointerId))return;if(this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2&&this.pinch){const[d,u]=[...this.pointers.values()],x=Math.hypot(d.x-u.x,d.y-u.y),w=(d.x+u.x)/2,v=(d.y+u.y)/2;this.walking?this.walk((this.pinch.cy-v)*.06,0):(x>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/x)),this.pan(this.pinch.cx-w,v-this.pinch.cy)),this.pinch.cx=w,this.pinch.cy=v;return}if(!this.drag||a.pointerId!==this.drag.id)return;const r=a.offsetX-this.drag.x,c=a.offsetY-this.drag.y;this.drag.x=a.offsetX,this.drag.y=a.offsetY,Math.abs(r)+Math.abs(c)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=r*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+c*.0028))):this.walk(c*.05,-r*.05):this.drag.mode==="orbit"?(this.targetHeading-=r*.0042,this.targetPitch=this.clampPitch(this.targetPitch-c*.0034)):this.pan(-r,c)});const i=a=>{if(this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&a.pointerId===this.drag.id){const r=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,r&&a.type==="pointerup"){const c=new Ce(a.offsetX,a.offsetY),d=performance.now();if(a.pointerType!=="mouse"&&d-this.lastTap<320){this.lastTap=0,this.focusAt(c);return}this.lastTap=d;const u=this.pickWorld(c);u&&!this.walking&&this.setPivot(u,!0),this.onPick?.(u)}}};o.addEventListener("pointerup",i),o.addEventListener("pointercancel",i),o.addEventListener("contextmenu",a=>a.preventDefault()),o.addEventListener("wheel",a=>{a.preventDefault(),this.tween=null;const r=a.deltaMode===1?16:a.deltaMode===2?100:1,c=a.deltaY*r;if(this.walking){this.walk(-c*.02,0);return}const d=Math.exp(Math.max(-.45,Math.min(.45,c*.0016))),u=this.pickWorld(new Ce(a.offsetX,a.offsetY)),x=this.clamp(this.targetRange*d);if(u&&d<1){const w=Math.min(.45,(this.targetRange-x)/this.targetRange)*.8,v=p.subtract(u,this.targetPivot,new p),h=p.magnitude(v);if(h>1){const g=Math.min(h,this.targetRange)*w/h;p.add(this.targetPivot,p.multiplyByScalar(v,g,v),this.targetPivot)}}this.targetRange=x},{passive:!1}),o.addEventListener("dblclick",a=>{a.preventDefault(),this.focusAt(new Ce(a.offsetX,a.offsetY))}),addEventListener("keydown",a=>{a.target instanceof HTMLInputElement||(this.keys.add(a.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(a.code)&&a.preventDefault())}),addEventListener("keyup",a=>this.keys.delete(a.code)),addEventListener("blur",()=>this.keys.clear())}clamp(o,i=no,a=io){return Math.max(i,Math.min(a,o))}clampPitch(o){return Math.max(bt,Math.min(Ct,o))}moveHorizontal(o,i,a,r){const c=at.eastNorthUpToFixedFrame(o),d=new p(Math.sin(i)*a+Math.cos(i)*r,Math.cos(i)*a-Math.sin(i)*r,0);B.multiplyByPoint(c,d,o)}pan(o,i){const a=this.canvas.clientHeight||1,r=2*this.range*Math.tan(this.fov/2)/a,c=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,i*r/c,o*r),this.tween=null}walk(o,i){this.moveHorizontal(this.eyeTarget,this.wHeading,o,i),this.snapEye()}snapEye(){const o=Pe.fromCartesian(this.eyeTarget),i=this.groundHeight?.(o);i!==void 0&&Number.isFinite(i)&&(o.height=i+Mt,Pe.toCartesian(o,void 0,this.eyeTarget))}pickWorld(o){const i=this.viewer.scene;let a;if(i.pickPositionSupported&&i.pick(o,4,4)&&(a=i.pickPosition(o)),!a){const r=i.camera.getPickRay(o);r&&(a=i.globe.pick(r,i)??void 0)}return a??null}focusAt(o){const i=this.pickWorld(o);if(i){if(this.walking){p.clone(i,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:i,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(o,i=2){this.walking&&this.exitWalk(!1);const a={pivot:o.pivot??p.clone(this.targetPivot),heading:o.heading??this.targetHeading,pitch:o.pitch??this.targetPitch,range:o.range??this.targetRange};let r=a.heading;for(;r-this.targetHeading>Math.PI;)r-=Math.PI*2;for(;r-this.targetHeading<-Math.PI;)r+=Math.PI*2;if(a.heading=r,i<=.02){this.tween=null,this.targetPivot=p.clone(a.pivot),this.pivot=p.clone(a.pivot),this.heading=this.targetHeading=a.heading,this.pitch=this.targetPitch=a.pitch,this.range=this.targetRange=a.range;return}this.tween={from:{pivot:p.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:a,start:performance.now(),duration:i*1e3}}enterWalk(o){p.clone(o??this.targetPivot,this.eyeTarget),this.snapEye(),p.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(o=!0){if(!this.walking)return;this.walking=!1;const i=Pe.fromCartesian(this.eyeTarget);i.height-=Mt-1;const a=Pe.toCartesian(i);this.pivot=p.clone(a),this.targetPivot=a,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,o?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(o){if(!this.keys.size)return;const i=this.keys,a=i.has("ShiftLeft")||i.has("ShiftRight")?3:1;let r=0,c=0;(i.has("KeyW")||i.has("ArrowUp"))&&(r+=1),(i.has("KeyS")||i.has("ArrowDown"))&&(r-=1),(i.has("KeyD")||i.has("ArrowRight"))&&(c+=1),(i.has("KeyA")||i.has("ArrowLeft"))&&(c-=1);let d=0;if(i.has("KeyQ")&&(d+=1),i.has("KeyE")&&(d-=1),this.walking){d&&(this.wHeadingT-=d*1.2*o),(r||c)&&this.walk(r*4.2*a*o,c*3.4*a*o);return}if(d&&(this.targetHeading+=d*.9*o,this.tween=null),(i.has("PageUp")||i.has("Equal")||i.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*o))),(i.has("PageDown")||i.has("Minus")||i.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*o))),i.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*o)),i.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*o)),!r&&!c)return;const u=Math.max(8,this.range*.6)*a*o;this.moveHorizontal(this.targetPivot,this.heading,r*u,c*u),this.tween=null}update(o){this.updateKeys(o);const i=1-Math.exp(-this.damping*o);if(this.walking){p.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*o),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*i,this.wPitch+=(this.wPitchT-this.wPitch)*i,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const a=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),r=ao(a),{from:c,to:d}=this.tween;p.lerp(c.pivot,d.pivot,r,this.targetPivot),this.targetHeading=c.heading+(d.heading-c.heading)*r,this.targetPitch=c.pitch+(d.pitch-c.pitch)*r,this.targetRange=Math.exp(Math.log(c.range)+(Math.log(d.range)-Math.log(c.range))*r),a>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*i,this.pitch+=(this.targetPitch-this.pitch)*i,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*i),p.lerp(this.pivot,this.targetPivot,i,this.pivot),this.viewer.camera.lookAt(this.pivot,new jt(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(B.IDENTITY)}}function ro(){return new Ye({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const Ft=()=>({uAerial:{type:T.SAMPLER_2D,value:ro()},uAerialRect:{type:T.VEC4,value:new st(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:T.FLOAT,value:0}}),Ht=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,qe=`
  vec3 hlfHazeColor(float night, float tarde) {
    vec3 day = vec3(0.66, 0.75, 0.86);
    // tarde bogotana: bruma andina limpia, ligeramente fría en la distancia
    vec3 sunset = vec3(0.66, 0.69, 0.76);
    vec3 nite = vec3(0.03, 0.05, 0.10);
    return mix(mix(day, sunset, tarde), nite, night);
  }
  float hlfHaze(float d, float startD, float amt) {
    return (1.0 - exp(-max(0.0, d - startD) * 0.00015)) * amt;
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
`;function lo(){return new We({uniforms:{uNight:{type:T.FLOAT,value:0},uTarde:{type:T.FLOAT,value:0},uSkyFill:{type:T.FLOAT,value:.24},uHazeAmount:{type:T.FLOAT,value:.08},uHazeStart:{type:T.FLOAT,value:1200},uHotelPisos:{type:T.FLOAT,value:99},uLean:{type:T.VEC2,value:new Ce(0,0)},...Ft()},varyings:{vPosM:ie.VEC3,vUpEC:ie.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:qe+Ht+`
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

        float hz = hlfHaze(dist, uHazeStart, uHazeAmount);
        vec3 skyFill = hlfSkyFill(material.normalEC, vUpEC, uNight, uTarde);
        material.diffuse = col * mix(1.0, 0.32, uNight) * (1.0 - hz);
        material.roughness = rough;
        material.specular = spec * (1.0 - hz);
        material.occlusion = occ;
        material.emissive = (emis + col * skyFill * occ * uSkyFill) * (1.0 - hz) + hlfHazeColor(uNight, uTarde) * hz;
      }
    `})}function co(t,o,i){return new We({uniforms:{uNight:{type:T.FLOAT,value:0},uTarde:{type:T.FLOAT,value:0},uSkyFill:{type:T.FLOAT,value:.22},uHazeAmount:{type:T.FLOAT,value:.08},uHazeStart:{type:T.FLOAT,value:1200},uTime:{type:T.FLOAT,value:0},uFrame:{type:T.FLOAT,value:o},uTop:{type:T.FLOAT,value:i},uAtlas:{type:T.SAMPLER_2D,value:new Ye({url:t,repeat:!1,minificationFilter:rt.LINEAR_MIPMAP_LINEAR,magnificationFilter:lt.LINEAR})}},varyings:{vUV:ie.VEC2,vView:ie.VEC3,vRightT:ie.VEC2,vUpT:ie.VEC2,vUpEC:ie.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:qe+`
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

        float hz = hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount);
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
        material.emissive = rgb * skyFill * occCopa * uSkyFill * (1.0 - hz) + hlfHazeColor(uNight, uTarde) * hz;
      }
    `})}function uo(){return new We({uniforms:{uNight:{type:T.FLOAT,value:0},uTarde:{type:T.FLOAT,value:0},uHazeAmount:{type:T.FLOAT,value:.08},uHazeStart:{type:T.FLOAT,value:1200}},lightingModel:Wt.UNLIT,fragmentShaderText:qe+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function ho(t,o,i){return new It({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:t,uNorth:o,uUp:i,uSkyZenith:new p(.16,.42,.82),uSkyHorizon:new p(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
      uniform sampler2D colorTexture;
      uniform sampler2D depthTexture;
      uniform float uNight;
      uniform float uTarde;
      uniform float uTime;
      uniform vec3 uEast;
      uniform vec3 uNorth;
      uniform vec3 uUp;
      uniform vec3 uSkyZenith;
      uniform vec3 uSkyHorizon;
      uniform float uCloudDensity;
      uniform float uCloudSpeed;
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

        vec3 sky = mix(uSkyHorizon, uSkyZenith, pow(elev, 0.52));

        // Halo y disco solar sutil
        float sunDot = max(0.0, dot(dirWC, normalize(czm_sunDirectionWC)));
        vec3 sunGlowCol = mix(vec3(1.0, 0.96, 0.88), vec3(1.0, 0.84, 0.64), uTarde);
        sky += sunGlowCol * pow(sunDot, 10.0) * 0.28 * (1.0 - uNight);
        sky += vec3(1.0, 0.98, 0.92) * smoothstep(0.9992, 0.99985, sunDot) * 1.4 * (1.0 - uNight);

        // Nubes cúmulos proyectadas en cúpula, con desplazamiento lento por el viento
        if (rd.z > 0.002 && uCloudDensity > 0.01) {
          vec2 uv = rd.xy / (rd.z + 0.12);
          vec2 wind = vec2(uTime * 0.008, uTime * 0.003) * uCloudSpeed;
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
          sky = mix(sky, cloudCol, density * horizonFade * uCloudDensity);
        }

        out_FragColor = vec4(sky, src.a);
      }
    `})}function fo(){return new It({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new p(1,1,1),uVignette:.24},fragmentShader:`
      uniform sampler2D colorTexture;
      uniform float uNight;
      uniform float uTarde;
      uniform float uExposure;
      uniform float uContrast;
      uniform float uSaturation;
      uniform vec3 uTint;
      uniform float uVignette;
      in vec2 v_textureCoordinates;
      void main() {
        vec4 src = texture(colorTexture, v_textureCoordinates);
        vec3 c = src.rgb * uExposure;
        // contraste fílmico suave (curva en S en rango 0..1)
        vec3 s = c * c * (3.0 - 2.0 * c);
        c = mix(c, s, uContrast);
        c *= uTint;
        // saturación / vibrance
        float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
        c = mix(vec3(l), c, uSaturation);
        // viñeta muy sutil de visor Unreal
        vec2 q = v_textureCoordinates - 0.5;
        float vig = 1.0 - dot(q, q) * uVignette;
        c *= vig;
        out_FragColor = vec4(clamp(c, 0.0, 1.0), src.a);
      }
    `})}function mo(t){const o=i=>({type:T.SAMPLER_2D,value:new Ye({url:t+i,repeat:!0,minificationFilter:rt.LINEAR_MIPMAP_LINEAR,magnificationFilter:lt.LINEAR})});return new We({uniforms:{uNight:{type:T.FLOAT,value:0},uTarde:{type:T.FLOAT,value:0},uGroundFill:{type:T.FLOAT,value:.12},uHazeAmount:{type:T.FLOAT,value:.08},uHazeStart:{type:T.FLOAT,value:1200},uAsfalto:o("tex_asfalto.webp"),uAnden:o("tex_anden.webp"),uPrado:o("tex_prado.webp"),uCiclo:o("tex_ciclo.webp"),...Ft()},varyings:{vG:ie.VEC3,vUpEC:ie.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:qe+Ht+`
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
        float hz = hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount);
        vec3 skyFill = hlfSkyFill(material.normalEC, vUpEC, uNight, uTarde);
        material.diffuse = col * mix(1.0, 0.28, uNight) * (1.0 - hz);
        material.roughness = rough;
        material.specular = spec * (1.0 - hz);
        material.emissive = col * skyFill * uGroundFill * (1.0 - hz) + hlfHazeColor(uNight, uTarde) * hz;
      }
    `})}function ct(){return at.eastNorthUpToFixedFrame(p.fromDegrees(Ue.longitude,Ue.latitude,Ue.height))}function ke(t,o,i,a=ct()){return B.multiplyByPoint(a,new p(t,o,i),new p)}const po={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function go(t,o,i){let a=!1;for(let r=0,c=i.length-1;r<i.length;c=r++){const[d,u]=i[r],[x,w]=i[c];u>o!=w>o&&t<(x-d)*(o-u)/(w-u)+d&&(a=!a)}return a}function vo(t,o,i){let a=1/0;for(let r=0,c=i.length-1;r<i.length;c=r++){const[d,u]=i[c],[x,w]=i[r],v=x-d,h=w-u,g=Math.max(0,Math.min(1,((t-d)*v+(o-u)*h)/(v*v+h*h||1)));a=Math.min(a,Math.hypot(t-d-g*v,o-u-g*h))}return a}async function yo(t,o,i){const a=t.scene,r=ct(),c=B.inverseTransformation(r,new B),d=Me.secciones;o("Contexto urbano",.08);const[u,x,w,v]=await Promise.all([fetch(d+"recorte.json").then(e=>e.json()),fetch(d+"edificios.json").then(e=>e.json()),fetch(d+"arboles.json").then(e=>e.json()),fetch(d+"suelo.json").then(e=>e.json())]),h=()=>u.clips.map(e=>{const s=new qt({positions:p.fromDegreesArray(e.flat())}),n=s.computeRectangle();return s.computeRectangle=f=>Gt.clone(n,f),s});a.globe.clippingPolygons=new vt({polygons:h()});const g=uo();let L=null;try{L=await Yt.fromUrl(Me.googleTiles,{maximumScreenSpaceError:10,shadows:fe.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),L.clippingPolygons=new vt({polygons:h()}),L.customShader=g,a.primitives.add(L)}catch(e){console.warn("Tiles de Google no disponibles",e)}const C=[-236,330],P=[];for(const e of x.secciones)P.push({key:e.key,file:e.file,kind:"edificios",label:e.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${e.key}`,dist:e.key==="Hotel"?-2:Math.hypot(e.c[0]-C[0],e.c[1]-C[1])});P.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),P.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),P.sort((e,s)=>e.dist-s.dist);const j={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},F=v.secciones.map(e=>({key:e.key,file:e.file,kind:"suelo",capa:j[e.key]?.[0]??0,label:j[e.key]?.[1]??e.key,dist:-3})),K=w.secciones.map(e=>({key:e.key,file:e.file,kind:"arboles",atlas:e.atlas,marco:e.marco,marcoSup:e.marcoSup,label:po[e.key]??"Vegetación",dist:0})),O=[...F,...P.slice(0,4),...K.slice(0,3),...P.slice(4,9),...K.slice(3),...P.slice(9)],W=lo(),I=mo(d);(async()=>{try{const e=await _t.fromAssetId(Me.imageryAssetId),s=18,n=e.tilingScheme,f=(U,te)=>Pe.fromCartesian(ke(U,te,0,r)),m=n.positionToTileXY(f(-1010,930),s),y=n.positionToTileXY(f(1010,-940),s),A=y.x-m.x+1,b=y.y-m.y+1,z=e.tileWidth,Y=document.createElement("canvas");Y.width=A*z,Y.height=b*z;const D=Y.getContext("2d"),S=[];for(let U=m.y;U<=y.y;U++)for(let te=m.x;te<=y.x;te++)S.push([te,U]);const J=async([U,te])=>{for(let ft=0;ft<40;ft++){const mt=e.requestImage(U,te,s);if(mt){try{const ze=await mt,pt=(U-m.x)*z,gt=(te-m.y)*z;typeof ImageBitmap<"u"&&ze instanceof ImageBitmap?(D.save(),D.translate(pt,gt+z),D.scale(1,-1),D.drawImage(ze,0,0,z,z),D.restore()):D.drawImage(ze,pt,gt,z,z)}catch{}return}await new Promise(ze=>setTimeout(ze,120))}};D.fillStyle="#6a6f62",D.fillRect(0,0,Y.width,Y.height);const _=Array.from({length:6},async()=>{for(;S.length;)await J(S.shift())});await Promise.all(_);const N=document.createElement("canvas");N.width=N.height=4096,N.getContext("2d").drawImage(Y,0,0,4096,4096);const q=await new Promise(U=>N.toBlob(U,"image/jpeg",.92));if(!q)return;const ee=URL.createObjectURL(q);window.__AERIAL_URL__=ee;const ce=n.tileXYToRectangle(m.x,m.y,s),de=n.tileXYToRectangle(y.x,y.y,s),He=(U,te)=>B.multiplyByPoint(c,p.fromRadians(U,te,Ue.height),new p),Re=He(ce.west,de.south),Le=He(de.east,ce.north),Ut=new st(Re.x,Re.y,Le.x,Le.y);for(const U of[W,I])U.setUniform("uAerial",new Ye({url:ee,repeat:!1,minificationFilter:rt.LINEAR_MIPMAP_LINEAR,magnificationFilter:lt.LINEAR})),U.setUniform("uAerialRect",Ut),U.setUniform("uAerialOn",1)}catch(e){console.warn("Foto aérea no disponible",e)}})();const oe=[],Te=[];let re=0,Se=0,ve=.22,ae=.08,Q=1200;const le={total:O.length,loaded:0,failed:[]},Ae=async e=>{try{const s=await it.fromGltfAsync({url:d+e.file,modelMatrix:r,upAxis:we.Y,forwardAxis:we.X,shadows:e.kind==="arboles"?fe.CAST_ONLY:e.kind==="suelo"?fe.RECEIVE_ONLY:fe.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:e.kind!=="arboles"});if(e.kind==="suelo")s.customShader=I;else if(e.kind==="arboles"){const n=co(d+e.atlas,e.marco,e.marcoSup);n.setUniform("uNight",re),n.setUniform("uTarde",Se),n.setUniform("uSkyFill",ve),n.setUniform("uHazeAmount",ae),n.setUniform("uHazeStart",Q),oe.push(n),s.customShader=n}else e.kind!=="cubierta_pbr"&&(s.customShader=W);s.imageBasedLighting.imageBasedLightingFactor=e.kind==="cubierta_pbr"?new Ce(.85,.55):new Ce(.75,.45),a.primitives.add(s),e.kind==="arboles"&&Te.push(s),await new Promise(n=>{if(s.ready)return n();const f=s.readyEvent.addEventListener(()=>{f(),n()});setTimeout(n,2e4)})}catch(s){console.error("Sección no cargada",e.file,s),le.failed.push(e.file)}le.loaded++,i?.(le.loaded,le.total,e.label)},Ee=F.length+7;for(let e=0;e<Math.min(Ee,O.length);e++)o(O[e].label,.2+.75*e/Ee),await Ae(O[e]);const l=(async()=>{for(let e=Ee;e<O.length;e++)await Ae(O[e]),await new Promise(s=>setTimeout(s,60))})();return{matrix:r,inverse:c,tileset:L,buildings:x.edificios,treeCount:w.total,sections:le,done:l,setNight(e){g.setUniform("uNight",e),W.setUniform("uNight",e),re=e,I.setUniform("uNight",e);for(const s of oe)s.setUniform("uNight",e)},setTarde(e){g.setUniform("uTarde",e),W.setUniform("uTarde",e),Se=e,I.setUniform("uTarde",e);for(const s of oe)s.setUniform("uTarde",e)},setTime(e){for(const s of oe)s.setUniform("uTime",e)},setLook(e){if(e.skyFill!==void 0){ve=e.skyFill,W.setUniform("uSkyFill",ve);for(const s of oe)s.setUniform("uSkyFill",ve)}if(e.groundFill!==void 0&&I.setUniform("uGroundFill",e.groundFill),e.hazeAmount!==void 0){ae=e.hazeAmount,W.setUniform("uHazeAmount",ae),I.setUniform("uHazeAmount",ae),g.setUniform("uHazeAmount",ae);for(const s of oe)s.setUniform("uHazeAmount",ae)}if(e.hazeStart!==void 0){Q=e.hazeStart,W.setUniform("uHazeStart",Q),I.setUniform("uHazeStart",Q),g.setUniform("uHazeStart",Q);for(const s of oe)s.setUniform("uHazeStart",Q)}},setHotelFloors(e){W.setUniform("uHotelPisos",e)},setTreesVisible(e){for(const s of Te)s.show=e},buildingAt(e){const s=B.multiplyByPoint(c,e,new p);let n=null,f=1.2;for(const m of x.edificios){if(s.x<m.bb[0]-1.5||s.x>m.bb[2]+1.5||s.y<m.bb[1]-1.5||s.y>m.bb[3]+1.5||s.z>m.b+m.h+2.5)continue;if(go(s.x,s.y,m.r))return m;const y=vo(s.x,s.y,m.r);y<f&&(f=y,n=m)}return n}}}const kt=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Tt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],St=3.2;async function xo(t,o,i=110){const a=Me.secciones;let r,c,d;try{r=await fetch(a+"vias_campo.json").then(e=>e.json());const l=new Uint8Array(await fetch(a+"vias_campo.bin").then(e=>e.arrayBuffer()));c=l.subarray(0,r.w*r.h),d=l.subarray(r.w*r.h)}catch{return null}const{cell:u,x0:x,y0:w,w:v,h}=r,g=(l,e)=>{const s=(l-x)/u-.5,n=(e-w)/u-.5,f=Math.floor(s),m=Math.floor(n);if(f<0||m<0||f>=v-1||m>=h-1)return 0;const y=s-f,A=n-m,b=m*v+f;return((c[b]*(1-y)+c[b+1]*y)*(1-A)+(c[b+v]*(1-y)+c[b+v+1]*y)*A)*.5},L=(l,e)=>{const s=Math.max(0,Math.min(v-1,Math.floor((l-x)/u))),n=Math.max(0,Math.min(h-1,Math.floor((e-w)/u))),f=n*v+s;if(c[f]>0)return d[f]*.1-2;let m=0,y=0;for(let A=-2;A<=2;A++){const b=n+A;if(!(b<0||b>=h))for(let z=-2;z<=2;z++){const Y=s+z;if(Y<0||Y>=v)continue;const D=b*v+Y;if(c[D]===0)continue;const S=1/(z*z+A*A+.5);m+=S,y+=(d[D]*.1-2)*S}}return m>0?y/m:1},C=[],P=[],j=[];for(let l=2;l<h-2;l++)for(let e=2;e<v-2;e++){const s=l*v+e,n=x+(e+.5)*u,f=w+(l+.5)*u,m=Math.hypot(n+180,f-250);if(m>520)continue;const y=c[s]*.5;if(y>=2.6&&y<=5&&C.push(s),y>=6&&m<460&&j.push({e:n,n:f,d:y}),c[s]===0&&m<430){let A=!1;for(let b=-2;b<=2&&!A;b++)for(let z=-2;z<=2;z++)if(c[(l+b)*v+(e+z)]>0){A=!0;break}A&&P.push(s)}}if(!C.length)return null;j.sort((l,e)=>e.d-l.d);const F=[],K=(l,e,s)=>B.multiplyByPoint(o,new p(l,e,s),new p);for(const l of j){if(F.length>=6)break;if(F.some(A=>Math.hypot(A.e-l.e,A.n-l.n)<90))continue;const e=L(l.e,l.n),s=l.e+6.5,n=l.n+6.5,f=L(s,n);t.entities.add({position:K(s,n,f+2.4),cylinder:{length:4.8,topRadius:.11,bottomRadius:.14,material:V.fromCssColorString("#242933")}});const m=t.entities.add({position:K(s-.6,n,f+4.5),box:{dimensions:new p(.45,.45,1.05),material:V.LIME}}),y=t.entities.add({position:K(s,n-.6,f+4.5),box:{dimensions:new p(.45,.45,1.05),material:V.RED}});F.push({e:l.e,n:l.n,u:e,faseOffset:F.length*4.5,nsLuz:m,ewLuz:y,nsEstado:"green",ewEstado:"red"})}const O=(()=>{let l=12345;return()=>(l=l*1664525+1013904223>>>0)/4294967296})(),W=(l,e,s)=>{const n=Math.cos(s),f=Math.sin(s);if(l>=-168&&l<=-118&&Math.abs(f)>.35)return l<-143?f<-.2?12:-1e6:f>.2?12:-1e6;const m=263-(l+420)*(51/380);return Math.abs(e-m)<26&&Math.abs(n)>.35?e>m?n>.2?12:-1e6:n<-.2?12:-1e6:l>=-255&&l<=-210&&e<222&&Math.abs(f)>.35?f<-.2?10:-1e6:e<175&&l<-215&&Math.abs(n)>.35?n>.2?10:-1e6:l<-385&&e<265&&Math.abs(f)>.35?f<-.2?10:-1e6:0},I=[],oe=(l,e,s)=>I.some(n=>n!==s&&Math.hypot(n.e-l,n.n-e)<8.5),Te=l=>{for(let e=0;e<45;e++){const s=C[Math.floor(O()*C.length)],n=x+(s%v+.5)*u,f=w+(Math.floor(s/v)+.5)*u;if(oe(n,f,l))continue;let m=0,y=-1e9;for(let A=0;A<16;A++){const b=A/16*Math.PI*2,z=n+Math.cos(b)*10,Y=f+Math.sin(b)*10,D=g(z,Y),S=W(z,Y,b);if(S<-1e4)continue;const J=g(n+Math.sin(b)*2.5,f-Math.cos(b)*2.5),_=g(n-Math.sin(b)*2.5,f+Math.cos(b)*2.5),N=-Math.abs(D-St)+(_>J?1.5:0)+S;D>1.5&&N>y&&(y=N,m=b)}if(y>-1e8){l.e=n,l.n=f,l.th=m,l.vActual=l.v*.5;return}}};for(let l=0;l<i;l++){const e=O(),s=e<.2?"taxi":e<.48?"suv":"sedan",n={e:0,n:0,th:0,v:6.5+O()*5,vActual:0,model:null,u:0,tipo:s};Te(n),I.push(n)}const re=[];if(P.length>0)for(let l=0;l<42;l++){const e=P[Math.floor(O()*P.length)],s=x+(e%v+.5)*u,n=w+(Math.floor(e/v)+.5)*u;re.push({e:s,n,th:O()*Math.PI*2,v:1.15+O()*.45,model:null,u:L(s,n)+.16,conPerro:l%3===0})}const Se=new p,ve=new wt,ae=new B,Q=(l,e=.08)=>{l.model&&(p.fromElements(l.e,l.n,l.u+e,Se),wt.fromRotationZ(l.th,ve),B.fromRotationTranslation(ve,Se,ae),l.model.modelMatrix=B.multiply(o,ae,new B))};(async()=>{for(let l=0;l<I.length;l++){const e=I[l],s=e.tipo==="taxi"?"carro_taxi.glb":e.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const n=await it.fromGltfAsync({url:a+s,upAxis:we.Y,forwardAxis:we.X,shadows:fe.ENABLED,color:e.tipo==="taxi"?V.WHITE:V.fromCssColorString(kt[l%kt.length]),colorBlendMode:yt.MIX,colorBlendAmount:e.tipo==="taxi"?0:.28});t.scene.primitives.add(n),e.model=n,e.u=L(e.e,e.n),Q(e)}catch{}l%6===5&&await new Promise(n=>setTimeout(n,35))}for(let l=0;l<re.length;l++){const e=re[l];try{const s=await it.fromGltfAsync({url:a+(e.conPerro?"persona_perro.glb":"persona.glb"),upAxis:we.Y,forwardAxis:we.X,shadows:fe.ENABLED,color:V.fromCssColorString(Tt[l%Tt.length]),colorBlendMode:yt.MIX,colorBlendAmount:.25});t.scene.primitives.add(s),e.model=s,Q(e,0)}catch{}l%6===5&&await new Promise(s=>setTimeout(s,35))}})();let le=!0,Ae=0;const Ee=(l,e)=>g(l,e)===0&&g(l+4,e)+g(l-4,e)+g(l,e+4)+g(l,e-4)>.5;return{count:i,debug:()=>I.map(l=>[Math.round(l.e),Math.round(l.n),+l.u.toFixed(1),l.model?1:0]),setVisible(l){le=l;for(const e of I)e.model&&(e.model.show=l);for(const e of re)e.model&&(e.model.show=l);for(const e of F)e.nsLuz.show=l,e.ewLuz.show=l},update(l){if(!le)return;const e=Math.min(.08,Math.max(.001,l));Ae+=e;for(const s of F){const n=(Ae+s.faseOffset)%24,f=n<10?"green":n<12?"yellow":"red",m=n>=12&&n<22?"green":n>=22?"yellow":"red";f!==s.nsEstado&&(s.nsEstado=f,s.nsLuz.box.material.color=new xt(f==="green"?V.LIME:f==="yellow"?V.YELLOW:V.RED)),m!==s.ewEstado&&(s.ewEstado=m,s.ewLuz.box.material.color=new xt(m==="green"?V.LIME:m==="yellow"?V.YELLOW:V.RED))}for(let s=0;s<I.length;s++){const n=I[s];if(!n.model)continue;let f=0,m=-1e9;for(let S=-4;S<=4;S++){const J=S*.13,_=n.th+J,N=n.e+Math.cos(_)*9,q=n.n+Math.sin(_)*9,ee=g(N,q);if(ee<1.1||g(n.e+Math.cos(_)*4.5,n.n+Math.sin(_)*4.5)<.9)continue;const de=W(N,q,_);if(de<-1e4)continue;const He=g(N+Math.sin(_)*2.5,q-Math.cos(_)*2.5),Re=g(N-Math.sin(_)*2.5,q+Math.cos(_)*2.5),Le=-Math.abs(Math.min(ee,6)-St)-Math.abs(J)*1.6+(Re>=He?.6:0)+de;Le>m&&(m=Le,f=J)}if(m<-1e8||Math.hypot(n.e+180,n.n-250)>580){Te(n),n.u=L(n.e,n.n),Q(n);continue}const y=Math.cos(n.th),A=Math.sin(n.th);let b=1;for(let S=0;S<I.length;S++){if(S===s||!I[S].model)continue;const J=I[S],_=J.e-n.e,N=J.n-n.n,q=_*_+N*N;if(q>225)continue;const ee=_*y+N*A,ce=Math.abs(-_*A+N*y);if(ee>0&&ee<12.5&&ce<2.35){const de=ee<6.4?0:(ee-6.4)/6.1;de<b&&(b=de)}else q<22&&S<s&&(b=0)}const z=Math.abs(y)>Math.abs(A);for(const S of F){if((z?S.ewEstado:S.nsEstado)==="green")continue;const _=S.e-n.e,N=S.n-n.n,q=_*y+N*A,ee=Math.abs(-_*A+N*y);if(q>7&&q<21&&ee<9){const ce=q<10.5?0:(q-10.5)/10.5;ce<b&&(b=ce)}}const Y=1-Math.min(.55,Math.abs(f)*1.4),D=n.v*Y*b;if(n.vActual+=(D-n.vActual)*Math.min(1,e*4.5),n.vActual>.05){n.th+=Math.max(-1.4*e,Math.min(1.4*e,f));const S=n.e+Math.cos(n.th)*n.vActual*e,J=n.n+Math.sin(n.th)*n.vActual*e;g(S,J)>=.7?(n.e=S,n.n=J):n.th+=.6;const _=Math.max(L(n.e,n.n),L(n.e+Math.cos(n.th)*1.4,n.n+Math.sin(n.th)*1.4),L(n.e-Math.cos(n.th)*1.4,n.n-Math.sin(n.th)*1.4));n.u+=(_-n.u)*Math.min(1,e*8)}Q(n)}for(const s of re){if(!s.model)continue;const n=s.e+Math.cos(s.th)*s.v*e,f=s.n+Math.sin(s.th)*s.v*e;Ee(n,f)&&Math.hypot(n+180,f-250)<430?(s.e=n,s.n=f,s.u+=(L(s.e,s.n)+.16-s.u)*Math.min(1,e*4)):s.th+=.9+O()*1.2,Q(s,0)}}}}const Ne={dia:{sunIntensity:5.55,sunColor:"#dad1c3",shadowDarkness:.3,aoIntensity:0,skyFill:0,groundFill:0,exposure:1.12,contrast:.6,saturation:.68,tintColor:"#ffffff",vignette:.5,bloomBrightness:.2,skyZenith:"#7f92ad",skyHorizon:"#c0cfdd",cloudDensity:1,cloudSpeed:1.75,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.65,sunColor:"#6b8fd4",shadowDarkness:.24,aoIntensity:2.1,skyFill:.22,groundFill:.1,exposure:1,contrast:.22,saturation:.95,tintColor:"#d6e6ff",vignette:.28,bloomBrightness:-.36,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.65,cloudSpeed:.8,hazeAmount:.08,hazeStart:1200}};function $e(t){const o=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(!o)return[1,1,1];const i=parseInt(o[1],16);return[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}const wo=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function bo(t){const o={dia:{...Ne.dia},tarde:{...Ne.tarde},noche:{...Ne.noche}};let i="dia";const a=document.createElement("button");a.id="btnLookStudio",a.className="look-toggle",a.textContent="⚙ Ajustar luz",a.title="Abrir editor de iluminación y color (L)",document.body.appendChild(a);const r=document.createElement("aside");r.id="lookPanel",r.className="look-panel",r.hidden=!0,r.innerHTML=`
    <div class="lp-head">
      <div>
        <small>Editor de escena</small>
        <strong id="lpPresetName">Día · 10:10</strong>
      </div>
      <button id="lpClose" aria-label="Cerrar">×</button>
    </div>
    <div class="lp-body" id="lpBody"></div>
    <div class="lp-foot">
      <button id="lpCopy" class="lp-primary">Copiar JSON</button>
      <button id="lpReset">Restablecer</button>
    </div>
  `,document.body.appendChild(r);const c=r.querySelector("#lpBody"),d=new Map;for(const h of wo){const g=document.createElement("section");g.className="lp-sec";const L=document.createElement("h4");L.textContent=h.title,g.appendChild(L);for(const C of h.items){const P=document.createElement("label");P.className="lp-row";const j=document.createElement("span");j.className="lp-lbl",j.textContent=C.label,P.appendChild(j);const F=document.createElement("input");F.type=C.type,C.type==="range"&&(F.min=String(C.min),F.max=String(C.max),F.step=String(C.step));const K=C.type==="range"?document.createElement("span"):void 0;K&&(K.className="lp-val"),F.addEventListener("input",()=>{const W=o[i];if(C.type==="range"){const I=parseFloat(F.value);W[C.key]=I,K&&(K.textContent=C.step&&C.step>=1?String(Math.round(I)):I.toFixed(2))}else W[C.key]=F.value;t(i,W)});const O=document.createElement("div");O.className="lp-ctrl",O.appendChild(F),K&&O.appendChild(K),P.appendChild(O),g.appendChild(P),d.set(C.key,{input:F,val:K})}c.appendChild(g)}const u={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function x(){const h=o[i],g=r.querySelector("#lpPresetName");g&&(g.textContent=u[i]);for(const[L,{input:C,val:P}]of d){const j=h[L];if(C.value=String(j),P&&typeof j=="number"){const F=parseFloat(C.step||"0.01");P.textContent=F>=1?String(Math.round(j)):j.toFixed(2)}}}const w=()=>{r.hidden=!r.hidden,a.classList.toggle("on",!r.hidden)};a.addEventListener("click",w),r.querySelector("#lpClose")?.addEventListener("click",w);const v=r.querySelector("#lpCopy");return v.addEventListener("click",async()=>{const h=JSON.stringify({active:i,presets:o},null,2);try{await navigator.clipboard.writeText(h),v.textContent="¡JSON copiado!",setTimeout(()=>v.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",h)}}),r.querySelector("#lpReset")?.addEventListener("click",()=>{o[i]={...Ne[i]},x(),t(i,o[i])}),addEventListener("keydown",h=>{h.code==="KeyL"&&!h.ctrlKey&&!h.metaKey&&!h.altKey&&w()}),x(),{setActivePreset(h){i=h,x()},getPreset(h){return o[h]},toggle:w}}eo.defaultAccessToken=Me.ionToken;const H=t=>document.getElementById(t),dt=H("cesiumContainer"),At=H("loading"),Co=H("loadBar"),Rt=H("loadLabel"),Mo=H("loadPct");function Qe(t,o){Rt.textContent=t;const i=Math.round(Math.max(0,Math.min(1,o))*100);Co.style.width=i+"%",Mo.textContent=i+"%"}const X=new Xt(dt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:fe.RECEIVE_ONLY,terrain:Jt.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Kt.fromProviderAsync(_t.fromAssetId(Me.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),E=X.scene;E.globe.enableLighting=!0;E.globe.showGroundAtmosphere=!0;E.globe.depthTestAgainstTerrain=!0;E.globe.maximumScreenSpaceError=2;E.fog.enabled=!1;E.fog.density=18e-5;E.fog.minimumBrightness=.04;E.highDynamicRange=!0;E.msaaSamples=4;E.postProcessStages.fxaa.enabled=!0;E.screenSpaceCameraController.enableCollisionDetection=!1;E.light=new Zt({intensity:3,color:V.fromCssColorString("#fff4e3")});const ne=X.shadowMap;ne.softShadows=!0;ne.size=4096;ne.maximumDistance=1200;ne.darkness=.24;ne.normalOffset=!0;{const t=ne;t._primitiveBias.depthBias=8e-4,t._primitiveBias.normalOffsetScale=1.6,t._primitiveBias.normalShadingSmooth=.35}const pe=E.postProcessStages.ambientOcclusion;pe.enabled=!0;pe.uniforms.intensity=2.1;pe.uniforms.bias=.08;pe.uniforms.lengthCap=.35;pe.uniforms.stepSize=1.4;pe.uniforms.blurStepSize=1;const se=E.postProcessStages.bloom;se.enabled=!0;se.uniforms.glowOnly=!1;se.uniforms.contrast=128;se.uniforms.brightness=-.36;se.uniforms.delta=1;se.uniforms.sigma=2.6;se.uniforms.stepSize=1.5;const ko=ct(),et=t=>{const o=B.getColumn(ko,t,new st);return new p(o.x,o.y,o.z)},me=ho(et(0),et(1),et(2));E.postProcessStages.add(me);const he=fo();E.postProcessStages.add(he);X.camera.frustum.fov=Pt.toRadians(48);const Et=(()=>{try{const t=E.context._gl,o=t.getExtension("WEBGL_debug_renderer_info");return o?String(t.getParameter(o.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),To=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Et)&&!/Arc/i.test(Et);let k=null,G=To||matchMedia("(pointer: coarse)").matches?.5:1;function _e(){const t=Math.min(window.devicePixelRatio||1,2);X.resolutionScale=t*(G>=1?1:G>=.5?.8:.62),ne.size=G>=1?4096:G>=.5?2048:1024,ne.softShadows=G>=.5,pe.enabled=G>=1,se.enabled=G>=.5,E.msaaSamples=G>=1?4:1,X.shadows=G>=.5,k?.tileset&&(k.tileset.maximumScreenSpaceError=G>=1?8:G>=.5?12:20)}_e();X.clock.shouldAnimate=!1;X.clock.currentTime=Ie.fromIso8601("2026-06-21T10:10:00-05:00");const R=new so(X),Ge=t=>ke(Ze[t].e,Ze[t].n,Ze[t].u),So=Ge("hotel");R.flyTo({pivot:So,heading:Ve.general.heading,pitch:Ve.general.pitch,range:Ve.general.range*1.8},0);R.groundHeight=t=>E.globe.getHeight(t);const Ao=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,tarde:0,fog:18e-5,label:"10:10",sun:5.55,color:"#dad1c3"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.65,color:"#6b8fd4"}];let ye=0,xe=0,ue=null;const Eo=t=>Ie.toDate(Ie.fromIso8601(t)).getTime();function Xe(t){E.light.intensity=t.sunIntensity,E.light.color=V.fromCssColorString(t.sunColor),ne.darkness=t.shadowDarkness,pe.uniforms.intensity=t.aoIntensity,se.uniforms.brightness=t.bloomBrightness,he.uniforms.uExposure=t.exposure,he.uniforms.uContrast=t.contrast,he.uniforms.uSaturation=t.saturation;const[o,i,a]=$e(t.tintColor);he.uniforms.uTint=new p(o,i,a),he.uniforms.uVignette=t.vignette;const[r,c,d]=$e(t.skyZenith);me.uniforms.uSkyZenith=new p(r,c,d);const[u,x,w]=$e(t.skyHorizon);me.uniforms.uSkyHorizon=new p(u,x,w),me.uniforms.uCloudDensity=t.cloudDensity,me.uniforms.uCloudSpeed=t.cloudSpeed,k?.setLook({skyFill:t.skyFill,groundFill:t.groundFill,hazeAmount:t.hazeAmount,hazeStart:t.hazeStart})}const je=bo((t,o)=>Xe(o));Xe(je.getPreset("dia"));function Lo(t){ue={from:Ie.toDate(X.clock.currentTime).getTime(),to:Eo(t.iso),start:performance.now(),dur:1600},E.fog.density=t.fog,je.setActivePreset(t.id),Xe(je.getPreset(t.id)),E.skyAtmosphere&&(E.skyAtmosphere.hueShift=0,E.skyAtmosphere.saturationShift=t.id==="tarde"?.08:t.id==="noche"?-.25:.06,E.skyAtmosphere.brightnessShift=t.id==="noche"?-.55:t.id==="tarde"?-.04:0);const i=ye,a=xe,r=performance.now(),c=()=>{const u=Math.min(1,(performance.now()-r)/1400),x=u*u*(3-2*u);ye=i+(t.night-i)*x,xe=a+(t.tarde-a)*x,k?.setNight(ye),k?.setTarde(xe),me.uniforms.uNight=ye,me.uniforms.uTarde=xe,he.uniforms.uNight=ye,he.uniforms.uTarde=xe,u<1&&requestAnimationFrame(c)};requestAnimationFrame(c),document.querySelectorAll("[data-light]").forEach(u=>u.classList.toggle("on",u.dataset.light===t.id));const d=H("clockLabel");d&&(d.textContent=t.label)}document.querySelectorAll("[data-light]").forEach(t=>{t.addEventListener("click",()=>{const o=Ao.find(i=>i.id===t.dataset.light);o&&Lo(o)})});let be=!1;const nt=H("btnOrbit"),ut=H("btnPedestrian");function ge(){be=!1,nt?.classList.remove("on")}function Fe(t,o=2){ge();const i=Ve[t];R.flyTo({pivot:Ge(i.place),heading:i.heading,pitch:i.pitch,range:i.range},o)}H("btnHome")?.addEventListener("click",()=>Fe("general",2.2));H("btnAerial")?.addEventListener("click",()=>Fe("aerial"));H("btnArch")?.addEventListener("click",()=>Fe("arch"));ut?.addEventListener("click",()=>{ge(),R.isWalking?R.exitWalk():R.enterWalk($?Ot($):void 0)});R.onModeChange=t=>{ut?.classList.toggle("on",t);const o=H("hint");o&&t&&(o.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",o.classList.remove("fade"),setTimeout(()=>o.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(t=>{t.addEventListener("click",()=>{ge();const o=t.dataset.place;R.flyTo({pivot:Ge(o),range:o==="hotel"?300:520,pitch:-.5},2)})});nt?.addEventListener("click",()=>{be=!be,nt.classList.toggle("on",be),be&&R.isWalking&&R.exitWalk()});dt.addEventListener("pointerdown",ge);dt.addEventListener("wheel",ge,{passive:!0});addEventListener("keydown",t=>{t.code==="Escape"&&(R.isWalking?R.exitWalk():Ke(null)),(t.code==="KeyH"||t.code==="Home")&&Fe("general",2.2),t.code==="KeyP"&&ut?.click()});let $=null,ht=null;const zo=9;let Be=null;function Nt(){k&&(Be={start:performance.now()},k.setHotelFloors(0))}let Oe=null;const De=H("card");function Po(t){return ke((t.bb[0]+t.bb[2])/2,(t.bb[1]+t.bb[3])/2,t.b+t.h*.5)}function Ot(t){return ke((t.bb[0]+t.bb[2])/2,t.bb[1]-9,t.b)}function Ke(t){const o=$?.s==="Hotel";if($=t,Oe&&(X.entities.remove(Oe),Oe=null),!t||!k){De&&(De.hidden=!0);return}const i=t.r.map(([h,g])=>ke(h,g,0,k.matrix)),a=2572+t.b-.5;Oe=X.entities.add({polygon:{hierarchy:new Qt(i),height:a,extrudedHeight:a+t.h+2.2,material:V.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:V.fromCssColorString("#d7ebff"),shadows:fe.DISABLED}});const r=t.s==="Hotel";r&&!o&&(Nt(),ge(),R.flyTo({pivot:Ge("hotel"),pitch:-.38,range:290},1.8));const c=r&&k?k.buildings.filter(h=>h.s==="Hotel"):[t],d=h=>Math.abs(h.r.reduce((g,L,C)=>{const P=h.r[(C+1)%h.r.length];return g+L[0]*P[1]-P[0]*L[1]},0)/2),u=c.reduce((h,g)=>h+d(g),0),x=c.reduce((h,g)=>h+d(g)*g.p,0),w=Math.max(...c.map(h=>h.p)),v=Math.max(...c.map(h=>h.h));Math.abs(t.r.reduce((h,g,L)=>{const C=t.r[(L+1)%t.r.length];return h+g[0]*C[1]-C[0]*g[1]},0)/2),H("cardKind").textContent=r?"Proyecto":`Sector ${t.s}`,H("cardTitle").textContent=r?"Hotel La Fontana":`Edificación ${t.id+1}`,H("cardData").innerHTML=`<dt>Pisos</dt><dd>${r?"hasta "+w:t.p}</dd><dt>Altura</dt><dd>${v.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(u).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(x).toLocaleString("es-CO")} m²</dd>`,De&&(De.hidden=!1)}R.onPick=t=>{k&&Ke(t?k.buildingAt(t):null)};H("cardClose")?.addEventListener("click",()=>Ke(null));H("cardFocus")?.addEventListener("click",()=>{if(!$)return;ge();const t=Math.max($.bb[2]-$.bb[0],$.bb[3]-$.bb[1],$.h);R.flyTo({pivot:Po($),pitch:-.42,range:Math.max(60,t*2.1)},1.7)});H("cardWalk")?.addEventListener("click",()=>{$&&(ge(),R.enterWalk(Ot($)))});const tt=H("status"),Lt=H("statusText");async function Io(){Qe("Contexto geográfico",.04),await new Promise(i=>setTimeout(i,30)),k=await yo(X,(i,a)=>Qe(i,a),(i,a,r)=>{!tt||!Lt||(tt.hidden=!1,Lt.textContent=i<a?`Cargando secciones ${i}/${a} · ${r}`:`Modelo completo · ${a} secciones`,i>=a&&setTimeout(()=>tt.classList.add("fade"),2600))}),k.setNight(ye),k.setTarde(xe);const t=document.querySelector("[data-light].on")?.dataset.light||"dia";Xe(je.getPreset(t)),_e(),Qe("Listo",1),Fe("general",2.4),At.classList.add("done"),setTimeout(()=>At.remove(),900);const o=H("hint");o&&setTimeout(()=>o.classList.add("fade"),9e3),window.__READY__=!0,k.done.then(async()=>{ht=await xo(X,k.matrix),window.__ALL__=!0})}const Z={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:$t,viewer:X,cam:R,getSite:()=>k,enuToWorld:ke,select:Ke,stats:Z,playHotel:Nt,getTrafico:()=>ht,setQuality:t=>{G=t,_e()}};Io().catch(t=>{console.error(t),Rt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(t?.message??t)});let zt=performance.now(),ot=0;function Dt(){const t=performance.now(),o=Math.min(.1,(t-zt)/1e3);if(zt=t,ue){const a=Math.min(1,(t-ue.start)/ue.dur),r=a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2;X.clock.currentTime=Ie.fromDate(new Date(ue.from+(ue.to-ue.from)*r)),a>=1&&(ue=null)}if(Be&&k){const a=(t-Be.start)/550,r=Math.floor(a),c=a-r,d=1-Math.pow(1-Math.min(1,c*1.6),3);r>=zo?(k.setHotelFloors(99),Be=null):k.setHotelFloors(r+d)}ht?.update(o);const i=t*.001;if(k?.setTime(i),me.uniforms.uTime=i,be&&!R.isWalking&&R.flyTo({heading:R.state.heading+.16*o},0),R.update(o),Z.frames++,t-Z.t0>=2e3){Z.fps=Math.round(Z.frames*1e3/(t-Z.t0)),Z.frames=0,Z.t0=t,window.__FPS__=Z.fps;const a=!!k&&k.sections.loaded>=k.sections.total&&t-ot>8e3;k&&k.sections.loaded>=k.sections.total&&!ot&&(ot=t),a&&document.visibilityState==="visible"&&(Z.fps<20&&G>.25&&!window.__DBG__.lock?++Z.low>=3&&(G=G>=1?.5:.25,Z.low=0,_e()):Z.low=0)}requestAnimationFrame(Dt)}requestAnimationFrame(Dt);addEventListener("resize",_e);
