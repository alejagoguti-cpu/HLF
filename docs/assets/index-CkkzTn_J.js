var Dt=Object.defineProperty;var Ut=(t,o,a)=>o in t?Dt(t,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[o]=a;var k=(t,o,a)=>Ut(t,typeof o!="symbol"?o+"":o,a);import{C as p,a as Lt,T as at,M as j,b as ze,c as Le,H as Vt,P as zt,d as je,L as Bt,U as S,V as ie,e as st,f as We,g as rt,h as lt,i as pt,j as jt,S as fe,I as Pt,k as Wt,R as qt,l as it,A as we,m as B,n as gt,o as vt,p as yt,q as Yt,r as Gt,s as Xt,t as Kt,J as Pe,u as Jt,v as Zt,w as $t}from"./cesium-ICe9G6Ok.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(r){if(r.ep)return;r.ep=!0;const l=a(r);fetch(r.href,l)}})();const Je="/HLF/",Qt=Je.endsWith("/")?Je:Je+"/",eo=Qt+"cesium/";window.CESIUM_BASE_URL=eo;const De={longitude:-74.04145021,latitude:4.70207636,height:2572},Ze={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},Ue={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Ce={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},to=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,xt=-1.5533,wt=-.012,oo=4200,ao=6,bt=1.7;class io{constructor(o){k(this,"viewer");k(this,"canvas");k(this,"pivot",new p);k(this,"heading",.5);k(this,"pitch",-.6);k(this,"range",1200);k(this,"targetPivot",new p);k(this,"targetHeading",.5);k(this,"targetPitch",-.6);k(this,"targetRange",1200);k(this,"damping",9);k(this,"drag",null);k(this,"pointers",new Map);k(this,"pinch",null);k(this,"lastTap",0);k(this,"keys",new Set);k(this,"tween",null);k(this,"fov",Lt.toRadians(48));k(this,"walking",!1);k(this,"eye",new p);k(this,"eyeTarget",new p);k(this,"wHeading",0);k(this,"wPitch",0);k(this,"wHeadingT",0);k(this,"wPitchT",0);k(this,"onPick",null);k(this,"onModeChange",null);k(this,"groundHeight",null);this.viewer=o,this.canvas=o.scene.canvas,o.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:p.clone(this.targetPivot)}}setPivot(o,a=!0){if(a){const i=p.clone(this.viewer.camera.positionWC),r=p.subtract(i,o,new p),l=p.magnitude(r),d=at.eastNorthUpToFixedFrame(o),h=j.inverseTransformation(d,new j),x=j.multiplyByPointAsVector(h,r,new p);if(l>1){const C=-Math.asin(Math.max(-1,Math.min(1,x.z/l)));if(C<wt&&C>xt){let g=Math.atan2(-x.x,-x.y);for(;g-this.heading>Math.PI;)g-=Math.PI*2;for(;g-this.heading<-Math.PI;)g+=Math.PI*2;this.heading=this.targetHeading=g,this.pitch=this.targetPitch=C,this.range=this.targetRange=this.clamp(l),p.clone(o,this.pivot)}}}this.targetPivot=p.clone(o),this.tween=null}bind(){const o=this.canvas;o.style.touchAction="none",o.addEventListener("pointerdown",i=>{if(o.setPointerCapture(i.pointerId),this.pointers.set(i.pointerId,{x:i.offsetX,y:i.offsetY}),this.pointers.size===2){const[r,l]=[...this.pointers.values()];this.pinch={distance:Math.hypot(r.x-l.x,r.y-l.y),range:this.targetRange,cx:(r.x+l.x)/2,cy:(r.y+l.y)/2},this.drag=null;return}i.button===2||i.button===1||i.shiftKey?this.drag={id:i.pointerId,x:i.offsetX,y:i.offsetY,mode:"pan",moved:!1}:i.button===0&&(this.drag={id:i.pointerId,x:i.offsetX,y:i.offsetY,mode:"orbit",moved:!1}),this.tween=null}),o.addEventListener("pointermove",i=>{if(!this.pointers.has(i.pointerId))return;if(this.pointers.set(i.pointerId,{x:i.offsetX,y:i.offsetY}),this.pointers.size===2&&this.pinch){const[d,h]=[...this.pointers.values()],x=Math.hypot(d.x-h.x,d.y-h.y),C=(d.x+h.x)/2,g=(d.y+h.y)/2;this.walking?this.walk((this.pinch.cy-g)*.06,0):(x>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/x)),this.pan(this.pinch.cx-C,g-this.pinch.cy)),this.pinch.cx=C,this.pinch.cy=g;return}if(!this.drag||i.pointerId!==this.drag.id)return;const r=i.offsetX-this.drag.x,l=i.offsetY-this.drag.y;this.drag.x=i.offsetX,this.drag.y=i.offsetY,Math.abs(r)+Math.abs(l)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=r*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+l*.0028))):this.walk(l*.05,-r*.05):this.drag.mode==="orbit"?(this.targetHeading-=r*.0042,this.targetPitch=this.clampPitch(this.targetPitch-l*.0034)):this.pan(-r,l)});const a=i=>{if(this.pointers.delete(i.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&i.pointerId===this.drag.id){const r=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,r&&i.type==="pointerup"){const l=new ze(i.offsetX,i.offsetY),d=performance.now();if(i.pointerType!=="mouse"&&d-this.lastTap<320){this.lastTap=0,this.focusAt(l);return}this.lastTap=d;const h=this.pickWorld(l);h&&!this.walking&&this.setPivot(h,!0),this.onPick?.(h)}}};o.addEventListener("pointerup",a),o.addEventListener("pointercancel",a),o.addEventListener("contextmenu",i=>i.preventDefault()),o.addEventListener("wheel",i=>{i.preventDefault(),this.tween=null;const r=i.deltaMode===1?16:i.deltaMode===2?100:1,l=i.deltaY*r;if(this.walking){this.walk(-l*.02,0);return}const d=Math.exp(Math.max(-.45,Math.min(.45,l*.0016))),h=this.pickWorld(new ze(i.offsetX,i.offsetY)),x=this.clamp(this.targetRange*d);if(h&&d<1){const C=Math.min(.45,(this.targetRange-x)/this.targetRange)*.8,g=p.subtract(h,this.targetPivot,new p),v=p.magnitude(g);if(v>1){const u=Math.min(v,this.targetRange)*C/v;p.add(this.targetPivot,p.multiplyByScalar(g,u,g),this.targetPivot)}}this.targetRange=x},{passive:!1}),o.addEventListener("dblclick",i=>{i.preventDefault(),this.focusAt(new ze(i.offsetX,i.offsetY))}),addEventListener("keydown",i=>{i.target instanceof HTMLInputElement||(this.keys.add(i.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(i.code)&&i.preventDefault())}),addEventListener("keyup",i=>this.keys.delete(i.code)),addEventListener("blur",()=>this.keys.clear())}clamp(o,a=ao,i=oo){return Math.max(a,Math.min(i,o))}clampPitch(o){return Math.max(xt,Math.min(wt,o))}moveHorizontal(o,a,i,r){const l=at.eastNorthUpToFixedFrame(o),d=new p(Math.sin(a)*i+Math.cos(a)*r,Math.cos(a)*i-Math.sin(a)*r,0);j.multiplyByPoint(l,d,o)}pan(o,a){const i=this.canvas.clientHeight||1,r=2*this.range*Math.tan(this.fov/2)/i,l=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,a*r/l,o*r),this.tween=null}walk(o,a){this.moveHorizontal(this.eyeTarget,this.wHeading,o,a),this.snapEye()}snapEye(){const o=Le.fromCartesian(this.eyeTarget),a=this.groundHeight?.(o);a!==void 0&&Number.isFinite(a)&&(o.height=a+bt,Le.toCartesian(o,void 0,this.eyeTarget))}pickWorld(o){const a=this.viewer.scene;let i;if(a.pickPositionSupported&&a.pick(o,4,4)&&(i=a.pickPosition(o)),!i){const r=a.camera.getPickRay(o);r&&(i=a.globe.pick(r,a)??void 0)}return i??null}focusAt(o){const a=this.pickWorld(o);if(a){if(this.walking){p.clone(a,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:a,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(o,a=2){this.walking&&this.exitWalk(!1);const i={pivot:o.pivot??p.clone(this.targetPivot),heading:o.heading??this.targetHeading,pitch:o.pitch??this.targetPitch,range:o.range??this.targetRange};let r=i.heading;for(;r-this.targetHeading>Math.PI;)r-=Math.PI*2;for(;r-this.targetHeading<-Math.PI;)r+=Math.PI*2;if(i.heading=r,a<=.02){this.tween=null,this.targetPivot=p.clone(i.pivot),this.pivot=p.clone(i.pivot),this.heading=this.targetHeading=i.heading,this.pitch=this.targetPitch=i.pitch,this.range=this.targetRange=i.range;return}this.tween={from:{pivot:p.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:i,start:performance.now(),duration:a*1e3}}enterWalk(o){p.clone(o??this.targetPivot,this.eyeTarget),this.snapEye(),p.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(o=!0){if(!this.walking)return;this.walking=!1;const a=Le.fromCartesian(this.eyeTarget);a.height-=bt-1;const i=Le.toCartesian(a);this.pivot=p.clone(i),this.targetPivot=i,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,o?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(o){if(!this.keys.size)return;const a=this.keys,i=a.has("ShiftLeft")||a.has("ShiftRight")?3:1;let r=0,l=0;(a.has("KeyW")||a.has("ArrowUp"))&&(r+=1),(a.has("KeyS")||a.has("ArrowDown"))&&(r-=1),(a.has("KeyD")||a.has("ArrowRight"))&&(l+=1),(a.has("KeyA")||a.has("ArrowLeft"))&&(l-=1);let d=0;if(a.has("KeyQ")&&(d+=1),a.has("KeyE")&&(d-=1),this.walking){d&&(this.wHeadingT-=d*1.2*o),(r||l)&&this.walk(r*4.2*i*o,l*3.4*i*o);return}if(d&&(this.targetHeading+=d*.9*o,this.tween=null),(a.has("PageUp")||a.has("Equal")||a.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*o))),(a.has("PageDown")||a.has("Minus")||a.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*o))),a.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*o)),a.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*o)),!r&&!l)return;const h=Math.max(8,this.range*.6)*i*o;this.moveHorizontal(this.targetPivot,this.heading,r*h,l*h),this.tween=null}update(o){this.updateKeys(o);const a=1-Math.exp(-this.damping*o);if(this.walking){p.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*o),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*a,this.wPitch+=(this.wPitchT-this.wPitch)*a,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const i=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),r=to(i),{from:l,to:d}=this.tween;p.lerp(l.pivot,d.pivot,r,this.targetPivot),this.targetHeading=l.heading+(d.heading-l.heading)*r,this.targetPitch=l.pitch+(d.pitch-l.pitch)*r,this.targetRange=Math.exp(Math.log(l.range)+(Math.log(d.range)-Math.log(l.range))*r),i>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*a,this.pitch+=(this.targetPitch-this.pitch)*a,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*a),p.lerp(this.pivot,this.targetPivot,a,this.pivot),this.viewer.camera.lookAt(this.pivot,new Vt(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(j.IDENTITY)}}function no(){return new We({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const It=()=>({uAerial:{type:S.SAMPLER_2D,value:no()},uAerialRect:{type:S.VEC4,value:new st(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:S.FLOAT,value:0}}),Ft=`
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
`;function so(){return new je({uniforms:{uNight:{type:S.FLOAT,value:0},uTarde:{type:S.FLOAT,value:0},uSkyFill:{type:S.FLOAT,value:.24},uHazeAmount:{type:S.FLOAT,value:.08},uHazeStart:{type:S.FLOAT,value:1200},uHotelPisos:{type:S.FLOAT,value:99},uLean:{type:S.VEC2,value:new ze(0,0)},...It()},varyings:{vPosM:ie.VEC3,vUpEC:ie.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:qe+Ft+`
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
    `})}function ro(t,o,a){return new je({uniforms:{uNight:{type:S.FLOAT,value:0},uTarde:{type:S.FLOAT,value:0},uSkyFill:{type:S.FLOAT,value:.22},uHazeAmount:{type:S.FLOAT,value:.08},uHazeStart:{type:S.FLOAT,value:1200},uTime:{type:S.FLOAT,value:0},uFrame:{type:S.FLOAT,value:o},uTop:{type:S.FLOAT,value:a},uAtlas:{type:S.SAMPLER_2D,value:new We({url:t,repeat:!1,minificationFilter:rt.LINEAR_MIPMAP_LINEAR,magnificationFilter:lt.LINEAR})}},varyings:{vUV:ie.VEC2,vView:ie.VEC3,vRightT:ie.VEC2,vUpT:ie.VEC2,vUpEC:ie.VEC3},vertexShaderText:`
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
    `})}function lo(){return new je({uniforms:{uNight:{type:S.FLOAT,value:0},uTarde:{type:S.FLOAT,value:0},uHazeAmount:{type:S.FLOAT,value:.08},uHazeStart:{type:S.FLOAT,value:1200}},lightingModel:Bt.UNLIT,fragmentShaderText:qe+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function co(t,o,a){return new zt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:t,uNorth:o,uUp:a,uSkyZenith:new p(.16,.42,.82),uSkyHorizon:new p(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function uo(){return new zt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new p(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function ho(t){const o=a=>({type:S.SAMPLER_2D,value:new We({url:t+a,repeat:!0,minificationFilter:rt.LINEAR_MIPMAP_LINEAR,magnificationFilter:lt.LINEAR})});return new je({uniforms:{uNight:{type:S.FLOAT,value:0},uTarde:{type:S.FLOAT,value:0},uGroundFill:{type:S.FLOAT,value:.12},uHazeAmount:{type:S.FLOAT,value:.08},uHazeStart:{type:S.FLOAT,value:1200},uAsfalto:o("tex_asfalto.webp"),uAnden:o("tex_anden.webp"),uPrado:o("tex_prado.webp"),uCiclo:o("tex_ciclo.webp"),...It()},varyings:{vG:ie.VEC3,vUpEC:ie.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:qe+Ft+`
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
    `})}function ct(){return at.eastNorthUpToFixedFrame(p.fromDegrees(De.longitude,De.latitude,De.height))}function Me(t,o,a,i=ct()){return j.multiplyByPoint(i,new p(t,o,a),new p)}const fo={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function mo(t,o,a){let i=!1;for(let r=0,l=a.length-1;r<a.length;l=r++){const[d,h]=a[r],[x,C]=a[l];h>o!=C>o&&t<(x-d)*(o-h)/(C-h)+d&&(i=!i)}return i}function po(t,o,a){let i=1/0;for(let r=0,l=a.length-1;r<a.length;l=r++){const[d,h]=a[l],[x,C]=a[r],g=x-d,v=C-h,u=Math.max(0,Math.min(1,((t-d)*g+(o-h)*v)/(g*g+v*v||1)));i=Math.min(i,Math.hypot(t-d-u*g,o-h-u*v))}return i}async function go(t,o,a){const i=t.scene,r=ct(),l=j.inverseTransformation(r,new j),d=Ce.secciones;o("Contexto urbano",.08);const[h,x,C,g]=await Promise.all([fetch(d+"recorte.json").then(e=>e.json()),fetch(d+"edificios.json").then(e=>e.json()),fetch(d+"arboles.json").then(e=>e.json()),fetch(d+"suelo.json").then(e=>e.json())]),v=()=>h.clips.map(e=>{const s=new Wt({positions:p.fromDegreesArray(e.flat())}),n=s.computeRectangle();return s.computeRectangle=f=>qt.clone(n,f),s});i.globe.clippingPolygons=new pt({polygons:v()});const u=lo();let w=null;try{w=await jt.fromUrl(Ce.googleTiles,{maximumScreenSpaceError:10,shadows:fe.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),w.clippingPolygons=new pt({polygons:v()}),w.customShader=u,i.primitives.add(w)}catch(e){console.warn("Tiles de Google no disponibles",e)}const D=[-236,330],b=[];for(const e of x.secciones)b.push({key:e.key,file:e.file,kind:"edificios",label:e.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${e.key}`,dist:e.key==="Hotel"?-2:Math.hypot(e.c[0]-D[0],e.c[1]-D[1])});b.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),b.sort((e,s)=>e.dist-s.dist);const X={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},N=g.secciones.map(e=>({key:e.key,file:e.file,kind:"suelo",capa:X[e.key]?.[0]??0,label:X[e.key]?.[1]??e.key,dist:-3})),O=C.secciones.map(e=>({key:e.key,file:e.file,kind:"arboles",atlas:e.atlas,marco:e.marco,marcoSup:e.marcoSup,label:fo[e.key]??"Vegetación",dist:0})),I=[...N,...b.slice(0,4),...O.slice(0,3),...b.slice(4,9),...O.slice(3),...b.slice(9)],U=so(),z=ho(d);(async()=>{try{const e=await Pt.fromAssetId(Ce.imageryAssetId),s=18,n=e.tilingScheme,f=(V,oe)=>Le.fromCartesian(Me(V,oe,0,r)),m=n.positionToTileXY(f(-1010,930),s),y=n.positionToTileXY(f(1010,-940),s),E=y.x-m.x+1,M=y.y-m.y+1,H=e.tileWidth,W=document.createElement("canvas");W.width=E*H,W.height=M*H;const ee=W.getContext("2d"),A=[];for(let V=m.y;V<=y.y;V++)for(let oe=m.x;oe<=y.x;oe++)A.push([oe,V]);const K=async([V,oe])=>{for(let ft=0;ft<40;ft++){const mt=e.requestImage(V,oe,s);if(mt){try{const Ke=await mt;ee.drawImage(Ke,(V-m.x)*H,(oe-m.y)*H,H,H)}catch{}return}await new Promise(Ke=>setTimeout(Ke,120))}};ee.fillStyle="#6a6f62",ee.fillRect(0,0,W.width,W.height);const P=Array.from({length:6},async()=>{for(;A.length;)await K(A.shift())});await Promise.all(P);const R=document.createElement("canvas");R.width=R.height=4096,R.getContext("2d").drawImage(W,0,0,4096,4096);const q=await new Promise(V=>R.toBlob(V,"image/jpeg",.92));if(!q)return;const te=URL.createObjectURL(q),ce=n.tileXYToRectangle(m.x,m.y,s),de=n.tileXYToRectangle(y.x,y.y,s),He=(V,oe)=>j.multiplyByPoint(l,p.fromRadians(V,oe,De.height),new p),_e=He(ce.west,de.south),Ee=He(de.east,ce.north),Ot=new st(_e.x,_e.y,Ee.x,Ee.y);for(const V of[U,z])V.setUniform("uAerial",new We({url:te,repeat:!1,minificationFilter:rt.LINEAR_MIPMAP_LINEAR,magnificationFilter:lt.LINEAR})),V.setUniform("uAerialRect",Ot),V.setUniform("uAerialOn",1)}catch(e){console.warn("Foto aérea no disponible",e)}})();const J=[],ke=[];let re=0,Te=0,ve=.22,ae=.08,Q=1200;const le={total:I.length,loaded:0,failed:[]},Se=async e=>{try{const s=await it.fromGltfAsync({url:d+e.file,modelMatrix:r,upAxis:we.Y,forwardAxis:we.X,shadows:e.kind==="arboles"?fe.CAST_ONLY:e.kind==="suelo"?fe.RECEIVE_ONLY:fe.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:e.kind!=="arboles"});if(e.kind==="suelo")s.customShader=z;else if(e.kind==="arboles"){const n=ro(d+e.atlas,e.marco,e.marcoSup);n.setUniform("uNight",re),n.setUniform("uTarde",Te),n.setUniform("uSkyFill",ve),n.setUniform("uHazeAmount",ae),n.setUniform("uHazeStart",Q),J.push(n),s.customShader=n}else s.customShader=U;s.imageBasedLighting.imageBasedLightingFactor=new ze(.75,.45),i.primitives.add(s),e.kind==="arboles"&&ke.push(s),await new Promise(n=>{if(s.ready)return n();const f=s.readyEvent.addEventListener(()=>{f(),n()});setTimeout(n,2e4)})}catch(s){console.error("Sección no cargada",e.file,s),le.failed.push(e.file)}le.loaded++,a?.(le.loaded,le.total,e.label)},Ae=N.length+7;for(let e=0;e<Math.min(Ae,I.length);e++)o(I[e].label,.2+.75*e/Ae),await Se(I[e]);const c=(async()=>{for(let e=Ae;e<I.length;e++)await Se(I[e]),await new Promise(s=>setTimeout(s,60))})();return{matrix:r,inverse:l,tileset:w,buildings:x.edificios,treeCount:C.total,sections:le,done:c,setNight(e){u.setUniform("uNight",e),U.setUniform("uNight",e),re=e,z.setUniform("uNight",e);for(const s of J)s.setUniform("uNight",e)},setTarde(e){u.setUniform("uTarde",e),U.setUniform("uTarde",e),Te=e,z.setUniform("uTarde",e);for(const s of J)s.setUniform("uTarde",e)},setTime(e){for(const s of J)s.setUniform("uTime",e)},setLook(e){if(e.skyFill!==void 0){ve=e.skyFill,U.setUniform("uSkyFill",ve);for(const s of J)s.setUniform("uSkyFill",ve)}if(e.groundFill!==void 0&&z.setUniform("uGroundFill",e.groundFill),e.hazeAmount!==void 0){ae=e.hazeAmount,U.setUniform("uHazeAmount",ae),z.setUniform("uHazeAmount",ae),u.setUniform("uHazeAmount",ae);for(const s of J)s.setUniform("uHazeAmount",ae)}if(e.hazeStart!==void 0){Q=e.hazeStart,U.setUniform("uHazeStart",Q),z.setUniform("uHazeStart",Q),u.setUniform("uHazeStart",Q);for(const s of J)s.setUniform("uHazeStart",Q)}},setHotelFloors(e){U.setUniform("uHotelPisos",e)},setTreesVisible(e){for(const s of ke)s.show=e},buildingAt(e){const s=j.multiplyByPoint(l,e,new p);let n=null,f=1.2;for(const m of x.edificios){if(s.x<m.bb[0]-1.5||s.x>m.bb[2]+1.5||s.y<m.bb[1]-1.5||s.y>m.bb[3]+1.5||s.z>m.b+m.h+2.5)continue;if(mo(s.x,s.y,m.r))return m;const y=po(s.x,s.y,m.r);y<f&&(f=y,n=m)}return n}}}const Ct=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Mt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],kt=3.2;async function vo(t,o,a=110){const i=Ce.secciones;let r,l,d;try{r=await fetch(i+"vias_campo.json").then(e=>e.json());const c=new Uint8Array(await fetch(i+"vias_campo.bin").then(e=>e.arrayBuffer()));l=c.subarray(0,r.w*r.h),d=c.subarray(r.w*r.h)}catch{return null}const{cell:h,x0:x,y0:C,w:g,h:v}=r,u=(c,e)=>{const s=(c-x)/h-.5,n=(e-C)/h-.5,f=Math.floor(s),m=Math.floor(n);if(f<0||m<0||f>=g-1||m>=v-1)return 0;const y=s-f,E=n-m,M=m*g+f;return((l[M]*(1-y)+l[M+1]*y)*(1-E)+(l[M+g]*(1-y)+l[M+g+1]*y)*E)*.5},w=(c,e)=>{const s=Math.max(0,Math.min(g-1,Math.floor((c-x)/h))),n=Math.max(0,Math.min(v-1,Math.floor((e-C)/h))),f=n*g+s;if(l[f]>0)return d[f]*.1-2;let m=0,y=0;for(let E=-2;E<=2;E++){const M=n+E;if(!(M<0||M>=v))for(let H=-2;H<=2;H++){const W=s+H;if(W<0||W>=g)continue;const ee=M*g+W;if(l[ee]===0)continue;const A=1/(H*H+E*E+.5);m+=A,y+=(d[ee]*.1-2)*A}}return m>0?y/m:1},D=[],b=[],X=[];for(let c=2;c<v-2;c++)for(let e=2;e<g-2;e++){const s=c*g+e,n=x+(e+.5)*h,f=C+(c+.5)*h,m=Math.hypot(n+180,f-250);if(m>520)continue;const y=l[s]*.5;if(y>=2.6&&y<=5&&D.push(s),y>=6&&m<460&&X.push({e:n,n:f,d:y}),l[s]===0&&m<430){let E=!1;for(let M=-2;M<=2&&!E;M++)for(let H=-2;H<=2;H++)if(l[(c+M)*g+(e+H)]>0){E=!0;break}E&&b.push(s)}}if(!D.length)return null;X.sort((c,e)=>e.d-c.d);const N=[],O=(c,e,s)=>j.multiplyByPoint(o,new p(c,e,s),new p);for(const c of X){if(N.length>=6)break;if(N.some(E=>Math.hypot(E.e-c.e,E.n-c.n)<90))continue;const e=w(c.e,c.n),s=c.e+6.5,n=c.n+6.5,f=w(s,n);t.entities.add({position:O(s,n,f+2.4),cylinder:{length:4.8,topRadius:.11,bottomRadius:.14,material:B.fromCssColorString("#242933")}});const m=t.entities.add({position:O(s-.6,n,f+4.5),box:{dimensions:new p(.45,.45,1.05),material:B.LIME}}),y=t.entities.add({position:O(s,n-.6,f+4.5),box:{dimensions:new p(.45,.45,1.05),material:B.RED}});N.push({e:c.e,n:c.n,u:e,faseOffset:N.length*4.5,nsLuz:m,ewLuz:y,nsEstado:"green",ewEstado:"red"})}const I=(()=>{let c=12345;return()=>(c=c*1664525+1013904223>>>0)/4294967296})(),U=(c,e,s)=>{const n=Math.cos(s),f=Math.sin(s);if(c>=-168&&c<=-118&&Math.abs(f)>.35)return c<-143?f<-.2?12:-1e6:f>.2?12:-1e6;const m=263-(c+420)*(51/380);return Math.abs(e-m)<26&&Math.abs(n)>.35?e>m?n>.2?12:-1e6:n<-.2?12:-1e6:c>=-255&&c<=-210&&e<222&&Math.abs(f)>.35?f<-.2?10:-1e6:e<175&&c<-215&&Math.abs(n)>.35?n>.2?10:-1e6:c<-385&&e<265&&Math.abs(f)>.35?f<-.2?10:-1e6:0},z=[],J=(c,e,s)=>z.some(n=>n!==s&&Math.hypot(n.e-c,n.n-e)<8.5),ke=c=>{for(let e=0;e<45;e++){const s=D[Math.floor(I()*D.length)],n=x+(s%g+.5)*h,f=C+(Math.floor(s/g)+.5)*h;if(J(n,f,c))continue;let m=0,y=-1e9;for(let E=0;E<16;E++){const M=E/16*Math.PI*2,H=n+Math.cos(M)*10,W=f+Math.sin(M)*10,ee=u(H,W),A=U(H,W,M);if(A<-1e4)continue;const K=u(n+Math.sin(M)*2.5,f-Math.cos(M)*2.5),P=u(n-Math.sin(M)*2.5,f+Math.cos(M)*2.5),R=-Math.abs(ee-kt)+(P>K?1.5:0)+A;ee>1.5&&R>y&&(y=R,m=M)}if(y>-1e8){c.e=n,c.n=f,c.th=m,c.vActual=c.v*.5;return}}};for(let c=0;c<a;c++){const e=I(),s=e<.2?"taxi":e<.48?"suv":"sedan",n={e:0,n:0,th:0,v:6.5+I()*5,vActual:0,model:null,u:0,tipo:s};ke(n),z.push(n)}const re=[];if(b.length>0)for(let c=0;c<42;c++){const e=b[Math.floor(I()*b.length)],s=x+(e%g+.5)*h,n=C+(Math.floor(e/g)+.5)*h;re.push({e:s,n,th:I()*Math.PI*2,v:1.15+I()*.45,model:null,u:w(s,n)+.16,conPerro:c%3===0})}const Te=new p,ve=new yt,ae=new j,Q=(c,e=.08)=>{c.model&&(p.fromElements(c.e,c.n,c.u+e,Te),yt.fromRotationZ(c.th,ve),j.fromRotationTranslation(ve,Te,ae),c.model.modelMatrix=j.multiply(o,ae,new j))};(async()=>{for(let c=0;c<z.length;c++){const e=z[c],s=e.tipo==="taxi"?"carro_taxi.glb":e.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const n=await it.fromGltfAsync({url:i+s,upAxis:we.Y,forwardAxis:we.X,shadows:fe.ENABLED,color:e.tipo==="taxi"?B.WHITE:B.fromCssColorString(Ct[c%Ct.length]),colorBlendMode:gt.MIX,colorBlendAmount:e.tipo==="taxi"?0:.28});t.scene.primitives.add(n),e.model=n,e.u=w(e.e,e.n),Q(e)}catch{}c%6===5&&await new Promise(n=>setTimeout(n,35))}for(let c=0;c<re.length;c++){const e=re[c];try{const s=await it.fromGltfAsync({url:i+(e.conPerro?"persona_perro.glb":"persona.glb"),upAxis:we.Y,forwardAxis:we.X,shadows:fe.ENABLED,color:B.fromCssColorString(Mt[c%Mt.length]),colorBlendMode:gt.MIX,colorBlendAmount:.25});t.scene.primitives.add(s),e.model=s,Q(e,0)}catch{}c%6===5&&await new Promise(s=>setTimeout(s,35))}})();let le=!0,Se=0;const Ae=(c,e)=>u(c,e)===0&&u(c+4,e)+u(c-4,e)+u(c,e+4)+u(c,e-4)>.5;return{count:a,debug:()=>z.map(c=>[Math.round(c.e),Math.round(c.n),+c.u.toFixed(1),c.model?1:0]),setVisible(c){le=c;for(const e of z)e.model&&(e.model.show=c);for(const e of re)e.model&&(e.model.show=c);for(const e of N)e.nsLuz.show=c,e.ewLuz.show=c},update(c){if(!le)return;const e=Math.min(.08,Math.max(.001,c));Se+=e;for(const s of N){const n=(Se+s.faseOffset)%24,f=n<10?"green":n<12?"yellow":"red",m=n>=12&&n<22?"green":n>=22?"yellow":"red";f!==s.nsEstado&&(s.nsEstado=f,s.nsLuz.box.material.color=new vt(f==="green"?B.LIME:f==="yellow"?B.YELLOW:B.RED)),m!==s.ewEstado&&(s.ewEstado=m,s.ewLuz.box.material.color=new vt(m==="green"?B.LIME:m==="yellow"?B.YELLOW:B.RED))}for(let s=0;s<z.length;s++){const n=z[s];if(!n.model)continue;let f=0,m=-1e9;for(let A=-4;A<=4;A++){const K=A*.13,P=n.th+K,R=n.e+Math.cos(P)*9,q=n.n+Math.sin(P)*9,te=u(R,q);if(te<1.1||u(n.e+Math.cos(P)*4.5,n.n+Math.sin(P)*4.5)<.9)continue;const de=U(R,q,P);if(de<-1e4)continue;const He=u(R+Math.sin(P)*2.5,q-Math.cos(P)*2.5),_e=u(R-Math.sin(P)*2.5,q+Math.cos(P)*2.5),Ee=-Math.abs(Math.min(te,6)-kt)-Math.abs(K)*1.6+(_e>=He?.6:0)+de;Ee>m&&(m=Ee,f=K)}if(m<-1e8||Math.hypot(n.e+180,n.n-250)>580){ke(n),n.u=w(n.e,n.n),Q(n);continue}const y=Math.cos(n.th),E=Math.sin(n.th);let M=1;for(let A=0;A<z.length;A++){if(A===s||!z[A].model)continue;const K=z[A],P=K.e-n.e,R=K.n-n.n,q=P*P+R*R;if(q>225)continue;const te=P*y+R*E,ce=Math.abs(-P*E+R*y);if(te>0&&te<12.5&&ce<2.35){const de=te<6.4?0:(te-6.4)/6.1;de<M&&(M=de)}else q<22&&A<s&&(M=0)}const H=Math.abs(y)>Math.abs(E);for(const A of N){if((H?A.ewEstado:A.nsEstado)==="green")continue;const P=A.e-n.e,R=A.n-n.n,q=P*y+R*E,te=Math.abs(-P*E+R*y);if(q>7&&q<21&&te<9){const ce=q<10.5?0:(q-10.5)/10.5;ce<M&&(M=ce)}}const W=1-Math.min(.55,Math.abs(f)*1.4),ee=n.v*W*M;if(n.vActual+=(ee-n.vActual)*Math.min(1,e*4.5),n.vActual>.05){n.th+=Math.max(-1.4*e,Math.min(1.4*e,f));const A=n.e+Math.cos(n.th)*n.vActual*e,K=n.n+Math.sin(n.th)*n.vActual*e;u(A,K)>=.7?(n.e=A,n.n=K):n.th+=.6;const P=Math.max(w(n.e,n.n),w(n.e+Math.cos(n.th)*1.4,n.n+Math.sin(n.th)*1.4),w(n.e-Math.cos(n.th)*1.4,n.n-Math.sin(n.th)*1.4));n.u+=(P-n.u)*Math.min(1,e*8)}Q(n)}for(const s of re){if(!s.model)continue;const n=s.e+Math.cos(s.th)*s.v*e,f=s.n+Math.sin(s.th)*s.v*e;Ae(n,f)&&Math.hypot(n+180,f-250)<430?(s.e=n,s.n=f,s.u+=(w(s.e,s.n)+.16-s.u)*Math.min(1,e*4)):s.th+=.9+I()*1.2,Q(s,0)}}}}const Re={dia:{sunIntensity:3,sunColor:"#fff4e3",shadowDarkness:.24,aoIntensity:2.1,skyFill:.24,groundFill:.12,exposure:1,contrast:.22,saturation:1.06,tintColor:"#ffffff",vignette:.24,bloomBrightness:-.36,skyZenith:"#296bd1",skyHorizon:"#b8d4f0",cloudDensity:.85,cloudSpeed:1,hazeAmount:.08,hazeStart:1200},tarde:{sunIntensity:2.8,sunColor:"#ffe3c4",shadowDarkness:.24,aoIntensity:2.1,skyFill:.24,groundFill:.12,exposure:1,contrast:.22,saturation:1.04,tintColor:"#ffffff",vignette:.24,bloomBrightness:-.36,skyZenith:"#2e5cad",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:.08,hazeStart:1200},noche:{sunIntensity:.65,sunColor:"#6b8fd4",shadowDarkness:.24,aoIntensity:2.1,skyFill:.22,groundFill:.1,exposure:1,contrast:.22,saturation:.95,tintColor:"#d6e6ff",vignette:.28,bloomBrightness:-.36,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.65,cloudSpeed:.8,hazeAmount:.08,hazeStart:1200}};function $e(t){const o=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(!o)return[1,1,1];const a=parseInt(o[1],16);return[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]}const yo=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function xo(t){const o={dia:{...Re.dia},tarde:{...Re.tarde},noche:{...Re.noche}};let a="dia";const i=document.querySelector(".dock"),r=document.createElement("button");if(r.id="btnLookStudio",r.textContent="Ajustar luz",r.title="Abrir editor de iluminación y color (L)",i){const u=document.createElement("span");u.className="sep",u.setAttribute("aria-hidden","true"),i.appendChild(u);const w=document.createElement("div");w.className="group",w.appendChild(r),i.appendChild(w)}const l=document.createElement("aside");l.id="lookPanel",l.className="look-panel",l.hidden=!0,l.innerHTML=`
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
  `,document.body.appendChild(l);const d=l.querySelector("#lpBody"),h=new Map;for(const u of yo){const w=document.createElement("section");w.className="lp-sec";const D=document.createElement("h4");D.textContent=u.title,w.appendChild(D);for(const b of u.items){const X=document.createElement("label");X.className="lp-row";const N=document.createElement("span");N.className="lp-lbl",N.textContent=b.label,X.appendChild(N);const O=document.createElement("input");O.type=b.type,b.type==="range"&&(O.min=String(b.min),O.max=String(b.max),O.step=String(b.step));const I=b.type==="range"?document.createElement("span"):void 0;I&&(I.className="lp-val"),O.addEventListener("input",()=>{const z=o[a];if(b.type==="range"){const J=parseFloat(O.value);z[b.key]=J,I&&(I.textContent=b.step&&b.step>=1?String(Math.round(J)):J.toFixed(2))}else z[b.key]=O.value;t(a,z)});const U=document.createElement("div");U.className="lp-ctrl",U.appendChild(O),I&&U.appendChild(I),X.appendChild(U),w.appendChild(X),h.set(b.key,{input:O,val:I})}d.appendChild(w)}const x={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function C(){const u=o[a],w=l.querySelector("#lpPresetName");w&&(w.textContent=x[a]);for(const[D,{input:b,val:X}]of h){const N=u[D];if(b.value=String(N),X&&typeof N=="number"){const O=parseFloat(b.step||"0.01");X.textContent=O>=1?String(Math.round(N)):N.toFixed(2)}}}const g=()=>{l.hidden=!l.hidden,r.classList.toggle("on",!l.hidden)};r.addEventListener("click",g),l.querySelector("#lpClose")?.addEventListener("click",g);const v=l.querySelector("#lpCopy");return v.addEventListener("click",async()=>{const u=JSON.stringify({active:a,presets:o},null,2);try{await navigator.clipboard.writeText(u),v.textContent="¡JSON copiado!",setTimeout(()=>v.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",u)}}),l.querySelector("#lpReset")?.addEventListener("click",()=>{o[a]={...Re[a]},C(),t(a,o[a])}),addEventListener("keydown",u=>{u.code==="KeyL"&&!u.ctrlKey&&!u.metaKey&&!u.altKey&&g()}),C(),{setActivePreset(u){a=u,C()},getPreset(u){return o[u]},toggle:g}}$t.defaultAccessToken=Ce.ionToken;const F=t=>document.getElementById(t),dt=F("cesiumContainer"),Tt=F("loading"),wo=F("loadBar"),Ht=F("loadLabel"),bo=F("loadPct");function Qe(t,o){Ht.textContent=t;const a=Math.round(Math.max(0,Math.min(1,o))*100);wo.style.width=a+"%",bo.textContent=a+"%"}const G=new Yt(dt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:fe.RECEIVE_ONLY,terrain:Xt.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Gt.fromProviderAsync(Pt.fromAssetId(Ce.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),L=G.scene;L.globe.enableLighting=!0;L.globe.showGroundAtmosphere=!0;L.globe.depthTestAgainstTerrain=!0;L.globe.maximumScreenSpaceError=2;L.fog.enabled=!1;L.fog.density=18e-5;L.fog.minimumBrightness=.04;L.highDynamicRange=!0;L.msaaSamples=4;L.postProcessStages.fxaa.enabled=!0;L.screenSpaceCameraController.enableCollisionDetection=!1;L.light=new Kt({intensity:3,color:B.fromCssColorString("#fff4e3")});const ne=G.shadowMap;ne.softShadows=!0;ne.size=4096;ne.maximumDistance=1200;ne.darkness=.24;ne.normalOffset=!0;{const t=ne;t._primitiveBias.depthBias=8e-4,t._primitiveBias.normalOffsetScale=1.6,t._primitiveBias.normalShadingSmooth=.35}const pe=L.postProcessStages.ambientOcclusion;pe.enabled=!0;pe.uniforms.intensity=2.1;pe.uniforms.bias=.08;pe.uniforms.lengthCap=.35;pe.uniforms.stepSize=1.4;pe.uniforms.blurStepSize=1;const se=L.postProcessStages.bloom;se.enabled=!0;se.uniforms.glowOnly=!1;se.uniforms.contrast=128;se.uniforms.brightness=-.36;se.uniforms.delta=1;se.uniforms.sigma=2.6;se.uniforms.stepSize=1.5;const Co=ct(),et=t=>{const o=j.getColumn(Co,t,new st);return new p(o.x,o.y,o.z)},me=co(et(0),et(1),et(2));L.postProcessStages.add(me);const he=uo();L.postProcessStages.add(he);G.camera.frustum.fov=Lt.toRadians(48);const St=(()=>{try{const t=L.context._gl,o=t.getExtension("WEBGL_debug_renderer_info");return o?String(t.getParameter(o.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),Mo=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(St)&&!/Arc/i.test(St);let T=null,Y=Mo||matchMedia("(pointer: coarse)").matches?.5:1;function Ie(){const t=Math.min(window.devicePixelRatio||1,2);G.resolutionScale=t*(Y>=1?1:Y>=.5?.8:.62),ne.size=Y>=1?4096:Y>=.5?2048:1024,ne.softShadows=Y>=.5,pe.enabled=Y>=1,se.enabled=Y>=.5,L.msaaSamples=Y>=1?4:1,G.shadows=Y>=.5,T?.tileset&&(T.tileset.maximumScreenSpaceError=Y>=1?8:Y>=.5?12:20)}Ie();G.clock.shouldAnimate=!1;G.clock.currentTime=Pe.fromIso8601("2026-06-21T10:10:00-05:00");const _=new io(G),Ye=t=>Me(Ze[t].e,Ze[t].n,Ze[t].u),ko=Ye("hotel");_.flyTo({pivot:ko,heading:Ue.general.heading,pitch:Ue.general.pitch,range:Ue.general.range*1.8},0);_.groundHeight=t=>L.globe.getHeight(t);const To=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,tarde:0,fog:18e-5,label:"10:10",sun:3,color:"#fff4e3"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:2.8,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.65,color:"#6b8fd4"}];let ye=0,xe=0,ue=null;const So=t=>Pe.toDate(Pe.fromIso8601(t)).getTime();function Ge(t){L.light.intensity=t.sunIntensity,L.light.color=B.fromCssColorString(t.sunColor),ne.darkness=t.shadowDarkness,pe.uniforms.intensity=t.aoIntensity,se.uniforms.brightness=t.bloomBrightness,he.uniforms.uExposure=t.exposure,he.uniforms.uContrast=t.contrast,he.uniforms.uSaturation=t.saturation;const[o,a,i]=$e(t.tintColor);he.uniforms.uTint=new p(o,a,i),he.uniforms.uVignette=t.vignette;const[r,l,d]=$e(t.skyZenith);me.uniforms.uSkyZenith=new p(r,l,d);const[h,x,C]=$e(t.skyHorizon);me.uniforms.uSkyHorizon=new p(h,x,C),me.uniforms.uCloudDensity=t.cloudDensity,me.uniforms.uCloudSpeed=t.cloudSpeed,T?.setLook({skyFill:t.skyFill,groundFill:t.groundFill,hazeAmount:t.hazeAmount,hazeStart:t.hazeStart})}const Be=xo((t,o)=>Ge(o));Ge(Be.getPreset("dia"));function Ao(t){ue={from:Pe.toDate(G.clock.currentTime).getTime(),to:So(t.iso),start:performance.now(),dur:1600},L.fog.density=t.fog,Be.setActivePreset(t.id),Ge(Be.getPreset(t.id)),L.skyAtmosphere&&(L.skyAtmosphere.hueShift=0,L.skyAtmosphere.saturationShift=t.id==="tarde"?.08:t.id==="noche"?-.25:.06,L.skyAtmosphere.brightnessShift=t.id==="noche"?-.55:t.id==="tarde"?-.04:0);const a=ye,i=xe,r=performance.now(),l=()=>{const h=Math.min(1,(performance.now()-r)/1400),x=h*h*(3-2*h);ye=a+(t.night-a)*x,xe=i+(t.tarde-i)*x,T?.setNight(ye),T?.setTarde(xe),me.uniforms.uNight=ye,me.uniforms.uTarde=xe,he.uniforms.uNight=ye,he.uniforms.uTarde=xe,h<1&&requestAnimationFrame(l)};requestAnimationFrame(l),document.querySelectorAll("[data-light]").forEach(h=>h.classList.toggle("on",h.dataset.light===t.id));const d=F("clockLabel");d&&(d.textContent=t.label)}document.querySelectorAll("[data-light]").forEach(t=>{t.addEventListener("click",()=>{const o=To.find(a=>a.id===t.dataset.light);o&&Ao(o)})});let be=!1;const nt=F("btnOrbit"),ut=F("btnPedestrian");function ge(){be=!1,nt?.classList.remove("on")}function Fe(t,o=2){ge();const a=Ue[t];_.flyTo({pivot:Ye(a.place),heading:a.heading,pitch:a.pitch,range:a.range},o)}F("btnHome")?.addEventListener("click",()=>Fe("general",2.2));F("btnAerial")?.addEventListener("click",()=>Fe("aerial"));F("btnArch")?.addEventListener("click",()=>Fe("arch"));ut?.addEventListener("click",()=>{ge(),_.isWalking?_.exitWalk():_.enterWalk($?Rt($):void 0)});_.onModeChange=t=>{ut?.classList.toggle("on",t);const o=F("hint");o&&t&&(o.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",o.classList.remove("fade"),setTimeout(()=>o.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(t=>{t.addEventListener("click",()=>{ge();const o=t.dataset.place;_.flyTo({pivot:Ye(o),range:o==="hotel"?300:520,pitch:-.5},2)})});nt?.addEventListener("click",()=>{be=!be,nt.classList.toggle("on",be),be&&_.isWalking&&_.exitWalk()});dt.addEventListener("pointerdown",ge);dt.addEventListener("wheel",ge,{passive:!0});addEventListener("keydown",t=>{t.code==="Escape"&&(_.isWalking?_.exitWalk():Xe(null)),(t.code==="KeyH"||t.code==="Home")&&Fe("general",2.2),t.code==="KeyP"&&ut?.click()});let $=null,ht=null;const Eo=9;let Ve=null;function _t(){T&&(Ve={start:performance.now()},T.setHotelFloors(0))}let Ne=null;const Oe=F("card");function Lo(t){return Me((t.bb[0]+t.bb[2])/2,(t.bb[1]+t.bb[3])/2,t.b+t.h*.5)}function Rt(t){return Me((t.bb[0]+t.bb[2])/2,t.bb[1]-9,t.b)}function Xe(t){const o=$?.s==="Hotel";if($=t,Ne&&(G.entities.remove(Ne),Ne=null),!t||!T){Oe&&(Oe.hidden=!0);return}const a=t.r.map(([v,u])=>Me(v,u,0,T.matrix)),i=2572+t.b-.5;Ne=G.entities.add({polygon:{hierarchy:new Zt(a),height:i,extrudedHeight:i+t.h+2.2,material:B.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:B.fromCssColorString("#d7ebff"),shadows:fe.DISABLED}});const r=t.s==="Hotel";r&&!o&&(_t(),ge(),_.flyTo({pivot:Ye("hotel"),pitch:-.38,range:290},1.8));const l=r&&T?T.buildings.filter(v=>v.s==="Hotel"):[t],d=v=>Math.abs(v.r.reduce((u,w,D)=>{const b=v.r[(D+1)%v.r.length];return u+w[0]*b[1]-b[0]*w[1]},0)/2),h=l.reduce((v,u)=>v+d(u),0),x=l.reduce((v,u)=>v+d(u)*u.p,0),C=Math.max(...l.map(v=>v.p)),g=Math.max(...l.map(v=>v.h));Math.abs(t.r.reduce((v,u,w)=>{const D=t.r[(w+1)%t.r.length];return v+u[0]*D[1]-D[0]*u[1]},0)/2),F("cardKind").textContent=r?"Proyecto":`Sector ${t.s}`,F("cardTitle").textContent=r?"Hotel La Fontana":`Edificación ${t.id+1}`,F("cardData").innerHTML=`<dt>Pisos</dt><dd>${r?"hasta "+C:t.p}</dd><dt>Altura</dt><dd>${g.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(h).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(x).toLocaleString("es-CO")} m²</dd>`,Oe&&(Oe.hidden=!1)}_.onPick=t=>{T&&Xe(t?T.buildingAt(t):null)};F("cardClose")?.addEventListener("click",()=>Xe(null));F("cardFocus")?.addEventListener("click",()=>{if(!$)return;ge();const t=Math.max($.bb[2]-$.bb[0],$.bb[3]-$.bb[1],$.h);_.flyTo({pivot:Lo($),pitch:-.42,range:Math.max(60,t*2.1)},1.7)});F("cardWalk")?.addEventListener("click",()=>{$&&(ge(),_.enterWalk(Rt($)))});const tt=F("status"),At=F("statusText");async function zo(){Qe("Contexto geográfico",.04),await new Promise(a=>setTimeout(a,30)),T=await go(G,(a,i)=>Qe(a,i),(a,i,r)=>{!tt||!At||(tt.hidden=!1,At.textContent=a<i?`Cargando secciones ${a}/${i} · ${r}`:`Modelo completo · ${i} secciones`,a>=i&&setTimeout(()=>tt.classList.add("fade"),2600))}),T.setNight(ye),T.setTarde(xe);const t=document.querySelector("[data-light].on")?.dataset.light||"dia";Ge(Be.getPreset(t)),Ie(),Qe("Listo",1),Fe("general",2.4),Tt.classList.add("done"),setTimeout(()=>Tt.remove(),900);const o=F("hint");o&&setTimeout(()=>o.classList.add("fade"),9e3),window.__READY__=!0,T.done.then(async()=>{ht=await vo(G,T.matrix),window.__ALL__=!0})}const Z={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Jt,viewer:G,cam:_,getSite:()=>T,enuToWorld:Me,select:Xe,stats:Z,playHotel:_t,getTrafico:()=>ht,setQuality:t=>{Y=t,Ie()}};zo().catch(t=>{console.error(t),Ht.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(t?.message??t)});let Et=performance.now(),ot=0;function Nt(){const t=performance.now(),o=Math.min(.1,(t-Et)/1e3);if(Et=t,ue){const i=Math.min(1,(t-ue.start)/ue.dur),r=i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;G.clock.currentTime=Pe.fromDate(new Date(ue.from+(ue.to-ue.from)*r)),i>=1&&(ue=null)}if(Ve&&T){const i=(t-Ve.start)/550,r=Math.floor(i),l=i-r,d=1-Math.pow(1-Math.min(1,l*1.6),3);r>=Eo?(T.setHotelFloors(99),Ve=null):T.setHotelFloors(r+d)}ht?.update(o);const a=t*.001;if(T?.setTime(a),me.uniforms.uTime=a,be&&!_.isWalking&&_.flyTo({heading:_.state.heading+.16*o},0),_.update(o),Z.frames++,t-Z.t0>=2e3){Z.fps=Math.round(Z.frames*1e3/(t-Z.t0)),Z.frames=0,Z.t0=t,window.__FPS__=Z.fps;const i=!!T&&T.sections.loaded>=T.sections.total&&t-ot>8e3;T&&T.sections.loaded>=T.sections.total&&!ot&&(ot=t),i&&document.visibilityState==="visible"&&(Z.fps<20&&Y>.25&&!window.__DBG__.lock?++Z.low>=3&&(Y=Y>=1?.5:.25,Z.low=0,Ie()):Z.low=0)}requestAnimationFrame(Nt)}requestAnimationFrame(Nt);addEventListener("resize",Ie);
