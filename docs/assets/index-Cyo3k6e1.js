var Et=Object.defineProperty;var Pt=(e,t,a)=>t in e?Et(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var p=(e,t,a)=>Pt(e,typeof t!="symbol"?t+"":t,a);import{C as f,a as dt,T as Oe,M as F,b as de,c as ce,H as kt,P as Lt,d as Ce,L as St,U as E,V as Y,e as ft,f as Ae,g as De,h as je,i as et,j as It,S as Q,I as ut,k as _t,R as zt,l as mt,A as Te,m as Rt,n as fe,o as tt,p as Ht,q as Ft,r as Nt,s as Ot,J as ue,t as Ut,u as Vt,v as Dt}from"./cesium-B_wVQM-O.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const ze="/HLF/",jt=ze.endsWith("/")?ze:ze+"/",Bt=jt+"cesium/";window.CESIUM_BASE_URL=Bt;const xe={longitude:-74.04145021,latitude:4.70207636,height:2572},Re={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},be={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},oe={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},Wt=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,at=-1.5533,it=-.012,Yt=4200,qt=6,ot=1.7;class Gt{constructor(t){p(this,"viewer");p(this,"canvas");p(this,"pivot",new f);p(this,"heading",.5);p(this,"pitch",-.6);p(this,"range",1200);p(this,"targetPivot",new f);p(this,"targetHeading",.5);p(this,"targetPitch",-.6);p(this,"targetRange",1200);p(this,"damping",9);p(this,"drag",null);p(this,"pointers",new Map);p(this,"pinch",null);p(this,"lastTap",0);p(this,"keys",new Set);p(this,"tween",null);p(this,"fov",dt.toRadians(48));p(this,"walking",!1);p(this,"eye",new f);p(this,"eyeTarget",new f);p(this,"wHeading",0);p(this,"wPitch",0);p(this,"wHeadingT",0);p(this,"wPitchT",0);p(this,"onPick",null);p(this,"onModeChange",null);p(this,"groundHeight",null);this.viewer=t,this.canvas=t.scene.canvas,t.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:f.clone(this.targetPivot)}}setPivot(t,a=!0){if(a){const i=f.clone(this.viewer.camera.positionWC),n=f.subtract(i,t,new f),s=f.magnitude(n),c=Oe.eastNorthUpToFixedFrame(t),d=F.inverseTransformation(c,new F),y=F.multiplyByPointAsVector(d,n,new f);if(s>1){const b=-Math.asin(Math.max(-1,Math.min(1,y.z/s)));if(b<it&&b>at){let u=Math.atan2(-y.x,-y.y);for(;u-this.heading>Math.PI;)u-=Math.PI*2;for(;u-this.heading<-Math.PI;)u+=Math.PI*2;this.heading=this.targetHeading=u,this.pitch=this.targetPitch=b,this.range=this.targetRange=this.clamp(s),f.clone(t,this.pivot)}}}this.targetPivot=f.clone(t),this.tween=null}bind(){const t=this.canvas;t.style.touchAction="none",t.addEventListener("pointerdown",i=>{if(t.setPointerCapture(i.pointerId),this.pointers.set(i.pointerId,{x:i.offsetX,y:i.offsetY}),this.pointers.size===2){const[n,s]=[...this.pointers.values()];this.pinch={distance:Math.hypot(n.x-s.x,n.y-s.y),range:this.targetRange,cx:(n.x+s.x)/2,cy:(n.y+s.y)/2},this.drag=null;return}i.button===2||i.button===1||i.shiftKey?this.drag={id:i.pointerId,x:i.offsetX,y:i.offsetY,mode:"pan",moved:!1}:i.button===0&&(this.drag={id:i.pointerId,x:i.offsetX,y:i.offsetY,mode:"orbit",moved:!1}),this.tween=null}),t.addEventListener("pointermove",i=>{if(!this.pointers.has(i.pointerId))return;if(this.pointers.set(i.pointerId,{x:i.offsetX,y:i.offsetY}),this.pointers.size===2&&this.pinch){const[c,d]=[...this.pointers.values()],y=Math.hypot(c.x-d.x,c.y-d.y),b=(c.x+d.x)/2,u=(c.y+d.y)/2;this.walking?this.walk((this.pinch.cy-u)*.06,0):(y>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/y)),this.pan(this.pinch.cx-b,u-this.pinch.cy)),this.pinch.cx=b,this.pinch.cy=u;return}if(!this.drag||i.pointerId!==this.drag.id)return;const n=i.offsetX-this.drag.x,s=i.offsetY-this.drag.y;this.drag.x=i.offsetX,this.drag.y=i.offsetY,Math.abs(n)+Math.abs(s)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=n*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+s*.0028))):this.walk(s*.05,-n*.05):this.drag.mode==="orbit"?(this.targetHeading-=n*.0042,this.targetPitch=this.clampPitch(this.targetPitch-s*.0034)):this.pan(-n,s)});const a=i=>{if(this.pointers.delete(i.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&i.pointerId===this.drag.id){const n=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,n&&i.type==="pointerup"){const s=new de(i.offsetX,i.offsetY),c=performance.now();if(i.pointerType!=="mouse"&&c-this.lastTap<320){this.lastTap=0,this.focusAt(s);return}this.lastTap=c;const d=this.pickWorld(s);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("contextmenu",i=>i.preventDefault()),t.addEventListener("wheel",i=>{i.preventDefault(),this.tween=null;const n=i.deltaMode===1?16:i.deltaMode===2?100:1,s=i.deltaY*n;if(this.walking){this.walk(-s*.02,0);return}const c=Math.exp(Math.max(-.45,Math.min(.45,s*.0016))),d=this.pickWorld(new de(i.offsetX,i.offsetY)),y=this.clamp(this.targetRange*c);if(d&&c<1){const b=Math.min(.45,(this.targetRange-y)/this.targetRange)*.8,u=f.subtract(d,this.targetPivot,new f),m=f.magnitude(u);if(m>1){const g=Math.min(m,this.targetRange)*b/m;f.add(this.targetPivot,f.multiplyByScalar(u,g,u),this.targetPivot)}}this.targetRange=y},{passive:!1}),t.addEventListener("dblclick",i=>{i.preventDefault(),this.focusAt(new de(i.offsetX,i.offsetY))}),addEventListener("keydown",i=>{i.target instanceof HTMLInputElement||(this.keys.add(i.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(i.code)&&i.preventDefault())}),addEventListener("keyup",i=>this.keys.delete(i.code)),addEventListener("blur",()=>this.keys.clear())}clamp(t,a=qt,i=Yt){return Math.max(a,Math.min(i,t))}clampPitch(t){return Math.max(at,Math.min(it,t))}moveHorizontal(t,a,i,n){const s=Oe.eastNorthUpToFixedFrame(t),c=new f(Math.sin(a)*i+Math.cos(a)*n,Math.cos(a)*i-Math.sin(a)*n,0);F.multiplyByPoint(s,c,t)}pan(t,a){const i=this.canvas.clientHeight||1,n=2*this.range*Math.tan(this.fov/2)/i,s=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,a*n/s,t*n),this.tween=null}walk(t,a){this.moveHorizontal(this.eyeTarget,this.wHeading,t,a),this.snapEye()}snapEye(){const t=ce.fromCartesian(this.eyeTarget),a=this.groundHeight?.(t);a!==void 0&&Number.isFinite(a)&&(t.height=a+ot,ce.toCartesian(t,void 0,this.eyeTarget))}pickWorld(t){const a=this.viewer.scene;let i;if(a.pickPositionSupported&&a.pick(t,4,4)&&(i=a.pickPosition(t)),!i){const n=a.camera.getPickRay(t);n&&(i=a.globe.pick(n,a)??void 0)}return i??null}focusAt(t){const a=this.pickWorld(t);if(a){if(this.walking){f.clone(a,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:a,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(t,a=2){this.walking&&this.exitWalk(!1);const i={pivot:t.pivot??f.clone(this.targetPivot),heading:t.heading??this.targetHeading,pitch:t.pitch??this.targetPitch,range:t.range??this.targetRange};let n=i.heading;for(;n-this.targetHeading>Math.PI;)n-=Math.PI*2;for(;n-this.targetHeading<-Math.PI;)n+=Math.PI*2;if(i.heading=n,a<=.02){this.tween=null,this.targetPivot=f.clone(i.pivot),this.pivot=f.clone(i.pivot),this.heading=this.targetHeading=i.heading,this.pitch=this.targetPitch=i.pitch,this.range=this.targetRange=i.range;return}this.tween={from:{pivot:f.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:i,start:performance.now(),duration:a*1e3}}enterWalk(t){f.clone(t??this.targetPivot,this.eyeTarget),this.snapEye(),f.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(t=!0){if(!this.walking)return;this.walking=!1;const a=ce.fromCartesian(this.eyeTarget);a.height-=ot-1;const i=ce.toCartesian(a);this.pivot=f.clone(i),this.targetPivot=i,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,t?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(t){if(!this.keys.size)return;const a=this.keys,i=a.has("ShiftLeft")||a.has("ShiftRight")?3:1;let n=0,s=0;(a.has("KeyW")||a.has("ArrowUp"))&&(n+=1),(a.has("KeyS")||a.has("ArrowDown"))&&(n-=1),(a.has("KeyD")||a.has("ArrowRight"))&&(s+=1),(a.has("KeyA")||a.has("ArrowLeft"))&&(s-=1);let c=0;if(a.has("KeyQ")&&(c+=1),a.has("KeyE")&&(c-=1),this.walking){c&&(this.wHeadingT-=c*1.2*t),(n||s)&&this.walk(n*4.2*i*t,s*3.4*i*t);return}if(c&&(this.targetHeading+=c*.9*t,this.tween=null),(a.has("PageUp")||a.has("Equal")||a.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*t))),(a.has("PageDown")||a.has("Minus")||a.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*t))),a.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*t)),a.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*t)),!n&&!s)return;const d=Math.max(8,this.range*.6)*i*t;this.moveHorizontal(this.targetPivot,this.heading,n*d,s*d),this.tween=null}update(t){this.updateKeys(t);const a=1-Math.exp(-this.damping*t);if(this.walking){f.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*t),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*a,this.wPitch+=(this.wPitchT-this.wPitch)*a,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const i=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),n=Wt(i),{from:s,to:c}=this.tween;f.lerp(s.pivot,c.pivot,n,this.targetPivot),this.targetHeading=s.heading+(c.heading-s.heading)*n,this.targetPitch=s.pitch+(c.pitch-s.pitch)*n,this.targetRange=Math.exp(Math.log(s.range)+(Math.log(c.range)-Math.log(s.range))*n),i>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*a,this.pitch+=(this.targetPitch-this.pitch)*a,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*a),f.lerp(this.pivot,this.targetPivot,a,this.pivot),this.viewer.camera.lookAt(this.pivot,new kt(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(F.IDENTITY)}}function Xt(){return new Ae({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const pt=()=>({uAerial:{type:E.SAMPLER_2D,value:Xt()},uAerialRect:{type:E.VEC4,value:new ft(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:E.FLOAT,value:0}}),gt=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,Ee=`
  vec3 hlfHazeColor(float night, float tarde) {
    vec3 day = vec3(0.66, 0.75, 0.86);
    // tarde bogotana: bruma andina limpia, ligeramente fría en la distancia
    vec3 sunset = vec3(0.66, 0.69, 0.76);
    vec3 nite = vec3(0.03, 0.05, 0.10);
    return mix(mix(day, sunset, tarde), nite, night);
  }
  float hlfHaze(float d) {
    return (1.0 - exp(-max(0.0, d - 380.0) * 0.00022)) * 0.48;
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
`;function Kt(){return new Ce({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uHotelPisos:{type:E.FLOAT,value:99},uLean:{type:E.VEC2,value:new de(0,0)},...pt()},varyings:{vPosM:Y.VEC3,vUpEC:Y.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Ee+gt+`
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
    `})}function Jt(e,t,a){return new Ce({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uTime:{type:E.FLOAT,value:0},uFrame:{type:E.FLOAT,value:t},uTop:{type:E.FLOAT,value:a},uAtlas:{type:E.SAMPLER_2D,value:new Ae({url:e,repeat:!1,minificationFilter:De.LINEAR_MIPMAP_LINEAR,magnificationFilter:je.LINEAR})}},varyings:{vUV:Y.VEC2,vView:Y.VEC3,vRightT:Y.VEC2,vUpT:Y.VEC2,vUpEC:Y.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:Ee+`
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
    `})}function Zt(){return new Ce({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0}},lightingModel:St.UNLIT,fragmentShaderText:Ee+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC)));
      }
    `})}function $t(){return new Lt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0},fragmentShader:`
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
    `})}function Qt(e){const t=a=>({type:E.SAMPLER_2D,value:new Ae({url:e+a,repeat:!0,minificationFilter:De.LINEAR_MIPMAP_LINEAR,magnificationFilter:je.LINEAR})});return new Ce({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uAsfalto:t("tex_asfalto.webp"),uAnden:t("tex_anden.webp"),uPrado:t("tex_prado.webp"),uCiclo:t("tex_ciclo.webp"),...pt()},varyings:{vG:Y.VEC3,vUpEC:Y.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Ee+gt+`
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
    `})}function vt(){return Oe.eastNorthUpToFixedFrame(f.fromDegrees(xe.longitude,xe.latitude,xe.height))}function ne(e,t,a,i=vt()){return F.multiplyByPoint(i,new f(e,t,a),new f)}const ea={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function ta(e,t,a){let i=!1;for(let n=0,s=a.length-1;n<a.length;s=n++){const[c,d]=a[n],[y,b]=a[s];d>t!=b>t&&e<(y-c)*(t-d)/(b-d)+c&&(i=!i)}return i}function aa(e,t,a){let i=1/0;for(let n=0,s=a.length-1;n<a.length;s=n++){const[c,d]=a[s],[y,b]=a[n],u=y-c,m=b-d,g=Math.max(0,Math.min(1,((e-c)*u+(t-d)*m)/(u*u+m*m||1)));i=Math.min(i,Math.hypot(e-c-g*u,t-d-g*m))}return i}async function ia(e,t,a){const i=e.scene,n=vt(),s=F.inverseTransformation(n,new F),c=oe.secciones;t("Contexto urbano",.08);const[d,y,b,u]=await Promise.all([fetch(c+"recorte.json").then(o=>o.json()),fetch(c+"edificios.json").then(o=>o.json()),fetch(c+"arboles.json").then(o=>o.json()),fetch(c+"suelo.json").then(o=>o.json())]),m=()=>d.clips.map(o=>{const l=new _t({positions:f.fromDegreesArray(o.flat())}),x=l.computeRectangle();return l.computeRectangle=I=>zt.clone(x,I),l});i.globe.clippingPolygons=new et({polygons:m()});const g=Zt();let R=null;try{R=await It.fromUrl(oe.googleTiles,{maximumScreenSpaceError:10,shadows:Q.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),R.clippingPolygons=new et({polygons:m()}),R.customShader=g,i.primitives.add(R)}catch(o){console.warn("Tiles de Google no disponibles",o)}const V=[-236,330],D=[];for(const o of y.secciones)D.push({key:o.key,file:o.file,kind:"edificios",label:o.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${o.key}`,dist:o.key==="Hotel"?-2:Math.hypot(o.c[0]-V[0],o.c[1]-V[1])});D.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),D.sort((o,l)=>o.dist-l.dist);const se={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},N=u.secciones.map(o=>({key:o.key,file:o.file,kind:"suelo",capa:se[o.key]?.[0]??0,label:se[o.key]?.[1]??o.key,dist:-3})),re=b.secciones.map(o=>({key:o.key,file:o.file,kind:"arboles",atlas:o.atlas,marco:o.marco,marcoSup:o.marcoSup,label:ea[o.key]??"Vegetación",dist:0})),W=[...N,...D.slice(0,4),...re.slice(0,3),...D.slice(4,9),...re.slice(3),...D.slice(9)],G=Kt(),X=Qt(c);(async()=>{try{const o=await ut.fromAssetId(oe.imageryAssetId),l=18,x=o.tilingScheme,I=(S,B)=>ce.fromCartesian(ne(S,B,0,n)),C=x.positionToTileXY(I(-1010,930),l),j=x.positionToTileXY(I(1010,-940),l),Le=j.x-C.x+1,ge=j.y-C.y+1,te=o.tileWidth,ae=document.createElement("canvas");ae.width=Le*te,ae.height=ge*te;const Se=ae.getContext("2d"),Ie=[];for(let S=C.y;S<=j.y;S++)for(let B=C.x;B<=j.x;B++)Ie.push([B,S]);const Mt=async([S,B])=>{for(let $e=0;$e<40;$e++){const Qe=o.requestImage(S,B,l);if(Qe){try{const _e=await Qe;Se.drawImage(_e,(S-C.x)*te,(B-C.y)*te,te,te)}catch{}return}await new Promise(_e=>setTimeout(_e,120))}};Se.fillStyle="#6a6f62",Se.fillRect(0,0,ae.width,ae.height);const Tt=Array.from({length:6},async()=>{for(;Ie.length;)await Mt(Ie.shift())});await Promise.all(Tt);const ve=document.createElement("canvas");ve.width=ve.height=4096,ve.getContext("2d").drawImage(ae,0,0,4096,4096);const qe=await new Promise(S=>ve.toBlob(S,"image/jpeg",.92));if(!qe)return;const Ct=URL.createObjectURL(qe),Ge=x.tileXYToRectangle(C.x,C.y,l),Xe=x.tileXYToRectangle(j.x,j.y,l),Ke=(S,B)=>F.multiplyByPoint(s,f.fromRadians(S,B,xe.height),new f),Je=Ke(Ge.west,Xe.south),Ze=Ke(Xe.east,Ge.north),At=new ft(Je.x,Je.y,Ze.x,Ze.y);for(const S of[G,X])S.setUniform("uAerial",new Ae({url:Ct,repeat:!1,minificationFilter:De.LINEAR_MIPMAP_LINEAR,magnificationFilter:je.LINEAR})),S.setUniform("uAerialRect",At),S.setUniform("uAerialOn",1)}catch(o){console.warn("Foto aérea no disponible",o)}})();const $=[],r=[];let h=0,k=0;const P={total:W.length,loaded:0,failed:[]},H=async o=>{try{const l=await mt.fromGltfAsync({url:c+o.file,modelMatrix:n,upAxis:Te.Y,forwardAxis:Te.X,shadows:o.kind==="arboles"?Q.CAST_ONLY:o.kind==="suelo"?Q.RECEIVE_ONLY:Q.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:o.kind!=="arboles"});if(o.kind==="suelo")l.customShader=X;else if(o.kind==="arboles"){const x=Jt(c+o.atlas,o.marco,o.marcoSup);x.setUniform("uNight",h),x.setUniform("uTarde",k),$.push(x),l.customShader=x}else l.customShader=G;l.imageBasedLighting.imageBasedLightingFactor=new de(.75,.45),i.primitives.add(l),o.kind==="arboles"&&r.push(l),await new Promise(x=>{if(l.ready)return x();const I=l.readyEvent.addEventListener(()=>{I(),x()});setTimeout(x,2e4)})}catch(l){console.error("Sección no cargada",o.file,l),P.failed.push(o.file)}P.loaded++,a?.(P.loaded,P.total,o.label)},L=N.length+7;for(let o=0;o<Math.min(L,W.length);o++)t(W[o].label,.2+.75*o/L),await H(W[o]);const A=(async()=>{for(let o=L;o<W.length;o++)await H(W[o]),await new Promise(l=>setTimeout(l,60))})();return{matrix:n,inverse:s,tileset:R,buildings:y.edificios,treeCount:b.total,sections:P,done:A,setNight(o){g.setUniform("uNight",o),G.setUniform("uNight",o),h=o,X.setUniform("uNight",o);for(const l of $)l.setUniform("uNight",o)},setTarde(o){g.setUniform("uTarde",o),G.setUniform("uTarde",o),k=o,X.setUniform("uTarde",o);for(const l of $)l.setUniform("uTarde",o)},setTime(o){for(const l of $)l.setUniform("uTime",o)},setHotelFloors(o){G.setUniform("uHotelPisos",o)},setTreesVisible(o){for(const l of r)l.show=o},buildingAt(o){const l=F.multiplyByPoint(s,o,new f);let x=null,I=1.2;for(const C of y.edificios){if(l.x<C.bb[0]-1.5||l.x>C.bb[2]+1.5||l.y<C.bb[1]-1.5||l.y>C.bb[3]+1.5||l.z>C.b+C.h+2.5)continue;if(ta(l.x,l.y,C.r))return C;const j=aa(l.x,l.y,C.r);j<I&&(I=j,x=C)}return x}}}const nt=["#e9e9e6","#d8d9db","#1f2124","#2a2d33","#8c9197","#b8bcc0","#7a1f1c","#27405f","#f1c40f","#c9c2b4","#3b4a3f","#a33b2a"],st=3.2;async function oa(e,t,a=150){const i=oe.secciones;let n,s,c;try{n=await fetch(i+"vias_campo.json").then(h=>h.json());const r=new Uint8Array(await fetch(i+"vias_campo.bin").then(h=>h.arrayBuffer()));s=r.subarray(0,n.w*n.h),c=r.subarray(n.w*n.h)}catch{return null}const{cell:d,x0:y,y0:b,w:u,h:m}=n,g=(r,h)=>{const k=(r-y)/d-.5,P=(h-b)/d-.5,H=Math.floor(k),L=Math.floor(P);if(H<0||L<0||H>=u-1||L>=m-1)return 0;const A=k-H,o=P-L,l=L*u+H;return((s[l]*(1-A)+s[l+1]*A)*(1-o)+(s[l+u]*(1-A)+s[l+u+1]*A)*o)*.5},R=(r,h)=>{const k=Math.max(0,Math.min(u-1,Math.floor((r-y)/d))),P=Math.max(0,Math.min(m-1,Math.floor((h-b)/d)));return c[P*u+k]*.1-2},V=[];for(let r=0;r<s.length;r++){if(s[r]*.5<2.6||s[r]*.5>5)continue;const h=y+(r%u+.5)*d,k=b+(Math.floor(r/u)+.5)*d;Math.hypot(h+180,k-250)<520&&V.push(r)}if(!V.length)return null;const D=(()=>{let r=12345;return()=>(r=r*1664525+1013904223>>>0)/4294967296})(),se=r=>{for(let h=0;h<30;h++){const k=V[Math.floor(D()*V.length)];r.e=y+(k%u+.5)*d,r.n=b+(Math.floor(k/u)+.5)*d;let P=0,H=-1e9;for(let L=0;L<16;L++){const A=L/16*Math.PI*2,o=g(r.e+Math.cos(A)*10,r.n+Math.sin(A)*10),l=g(r.e+Math.sin(A)*2.5,r.n-Math.cos(A)*2.5),x=g(r.e-Math.sin(A)*2.5,r.n+Math.cos(A)*2.5),I=-Math.abs(o-st)+(x>l?1.5:0);o>1.5&&I>H&&(H=I,P=A)}if(H>-1e8){r.th=P;return}}},N=[];for(let r=0;r<a;r++){const h={e:0,n:0,th:0,v:7+D()*6,model:null,u:0};se(h),N.push(h)}const re=new f,W=new tt,G=new F,X=r=>{r.model&&(f.fromElements(r.e,r.n,r.u+.03,re),tt.fromRotationZ(r.th,W),F.fromRotationTranslation(W,re,G),r.model.modelMatrix=F.multiply(t,G,new F))};(async()=>{for(let r=0;r<N.length;r++){try{const h=await mt.fromGltfAsync({url:i+"carro.glb",upAxis:Te.Y,forwardAxis:Te.X,shadows:Q.ENABLED,color:fe.fromCssColorString(nt[r%nt.length]),colorBlendMode:Rt.HIGHLIGHT});e.scene.primitives.add(h),N[r].model=h,N[r].u=R(N[r].e,N[r].n),X(N[r])}catch{}r%8===7&&await new Promise(h=>setTimeout(h,40))}})();let $=!0;return{count:a,debug:()=>N.map(r=>[Math.round(r.e),Math.round(r.n),+r.u.toFixed(1),r.model?1:0]),setVisible(r){$=r;for(const h of N)h.model&&(h.model.show=r)},update(r){if($)for(const h of N){if(!h.model)continue;let k=0,P=-1e9;for(let L=-4;L<=4;L++){const A=L*.13,o=h.th+A,l=h.e+Math.cos(o)*9,x=h.n+Math.sin(o)*9,I=g(l,x);if(I<1.1||g(h.e+Math.cos(o)*4.5,h.n+Math.sin(o)*4.5)<.9)continue;const j=g(l+Math.sin(o)*2.5,x-Math.cos(o)*2.5),Le=g(l-Math.sin(o)*2.5,x+Math.cos(o)*2.5),ge=-Math.abs(Math.min(I,6)-st)-Math.abs(A)*1.6+(Le>=j?.6:0);ge>P&&(P=ge,k=A)}if(P<-1e8||Math.hypot(h.e+180,h.n-250)>600){se(h),h.u=R(h.e,h.n),X(h);continue}h.th+=Math.max(-1.4*r,Math.min(1.4*r,k));const H=1-Math.min(.55,Math.abs(k)*1.4);h.e+=Math.cos(h.th)*h.v*H*r,h.n+=Math.sin(h.th)*h.v*H*r,h.u+=(R(h.e,h.n)-h.u)*Math.min(1,r*6),X(h)}}}}Dt.defaultAccessToken=oe.ionToken;const M=e=>document.getElementById(e),Be=M("cesiumContainer"),rt=M("loading"),na=M("loadBar"),yt=M("loadLabel"),sa=M("loadPct");function He(e,t){yt.textContent=e;const a=Math.round(Math.max(0,Math.min(1,t))*100);na.style.width=a+"%",sa.textContent=a+"%"}const z=new Ht(Be,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:Q.RECEIVE_ONLY,terrain:Nt.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Ft.fromProviderAsync(ut.fromAssetId(oe.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),w=z.scene;w.globe.enableLighting=!0;w.globe.showGroundAtmosphere=!0;w.globe.depthTestAgainstTerrain=!0;w.globe.maximumScreenSpaceError=2;w.fog.enabled=!1;w.fog.density=18e-5;w.fog.minimumBrightness=.04;w.highDynamicRange=!0;w.msaaSamples=4;w.postProcessStages.fxaa.enabled=!0;w.screenSpaceCameraController.enableCollisionDetection=!1;w.light=new Ot({intensity:3,color:fe.fromCssColorString("#fff4e3")});const J=z.shadowMap;J.softShadows=!0;J.size=4096;J.maximumDistance=1200;J.darkness=.24;J.normalOffset=!0;{const e=J;e._primitiveBias.depthBias=8e-4,e._primitiveBias.normalOffsetScale=1.6,e._primitiveBias.normalShadingSmooth=.35}const ee=w.postProcessStages.ambientOcclusion;ee.enabled=!0;ee.uniforms.intensity=2.1;ee.uniforms.bias=.08;ee.uniforms.lengthCap=.35;ee.uniforms.stepSize=1.4;ee.uniforms.blurStepSize=1;const q=w.postProcessStages.bloom;q.enabled=!0;q.uniforms.glowOnly=!1;q.uniforms.contrast=128;q.uniforms.brightness=-.36;q.uniforms.delta=1;q.uniforms.sigma=2.6;q.uniforms.stepSize=1.5;const Ue=$t();w.postProcessStages.add(Ue);z.camera.frustum.fov=dt.toRadians(48);const ct=(()=>{try{const e=w.context._gl,t=e.getExtension("WEBGL_debug_renderer_info");return t?String(e.getParameter(t.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),ra=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(ct)&&!/Arc/i.test(ct);let v=null,_=ra||matchMedia("(pointer: coarse)").matches?.5:1;function me(){const e=Math.min(window.devicePixelRatio||1,2);z.resolutionScale=e*(_>=1?1:_>=.5?.8:.62),J.size=_>=1?4096:_>=.5?2048:1024,J.softShadows=_>=.5,ee.enabled=_>=1,q.enabled=_>=.5,w.msaaSamples=_>=1?4:1,z.shadows=_>=.5,v?.tileset&&(v.tileset.maximumScreenSpaceError=_>=1?8:_>=.5?12:20)}me();z.clock.shouldAnimate=!1;z.clock.currentTime=ue.fromIso8601("2026-06-21T10:10:00-05:00");const T=new Gt(z),Pe=e=>ne(Re[e].e,Re[e].n,Re[e].u),ca=Pe("hotel");T.flyTo({pivot:ca,heading:be.general.heading,pitch:be.general.pitch,range:be.general.range*1.8},0);T.groundHeight=e=>w.globe.getHeight(e);const la=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,tarde:0,fog:18e-5,label:"10:10",sun:3,color:"#fff4e3"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:2.8,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.65,color:"#6b8fd4"}];let le=0,he=0,K=null;const ha=e=>ue.toDate(ue.fromIso8601(e)).getTime();function da(e){K={from:ue.toDate(z.clock.currentTime).getTime(),to:ha(e.iso),start:performance.now(),dur:1600},w.fog.density=e.fog,w.light.intensity=e.sun,w.light.color=fe.fromCssColorString(e.color),q.uniforms.brightness=-.36,w.skyAtmosphere&&(w.skyAtmosphere.hueShift=0,w.skyAtmosphere.saturationShift=e.id==="tarde"?.08:e.id==="noche"?-.25:.06,w.skyAtmosphere.brightnessShift=e.id==="noche"?-.55:e.id==="tarde"?-.04:0);const a=le,i=he,n=performance.now(),s=()=>{const d=Math.min(1,(performance.now()-n)/1400),y=d*d*(3-2*d);le=a+(e.night-a)*y,he=i+(e.tarde-i)*y,v?.setNight(le),v?.setTarde(he),Ue.uniforms.uNight=le,Ue.uniforms.uTarde=he,d<1&&requestAnimationFrame(s)};requestAnimationFrame(s),document.querySelectorAll("[data-light]").forEach(d=>d.classList.toggle("on",d.dataset.light===e.id));const c=M("clockLabel");c&&(c.textContent=e.label)}document.querySelectorAll("[data-light]").forEach(e=>{e.addEventListener("click",()=>{const t=la.find(a=>a.id===e.dataset.light);t&&da(t)})});let ie=!1;const Ve=M("btnOrbit"),We=M("btnPedestrian");function Z(){ie=!1,Ve?.classList.remove("on")}function pe(e,t=2){Z();const a=be[e];T.flyTo({pivot:Pe(a.place),heading:a.heading,pitch:a.pitch,range:a.range},t)}M("btnHome")?.addEventListener("click",()=>pe("general",2.2));M("btnAerial")?.addEventListener("click",()=>pe("aerial"));M("btnArch")?.addEventListener("click",()=>pe("arch"));We?.addEventListener("click",()=>{Z(),T.isWalking?T.exitWalk():T.enterWalk(U?xt(U):void 0)});T.onModeChange=e=>{We?.classList.toggle("on",e);const t=M("hint");t&&e&&(t.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",t.classList.remove("fade"),setTimeout(()=>t.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(e=>{e.addEventListener("click",()=>{Z();const t=e.dataset.place;T.flyTo({pivot:Pe(t),range:t==="hotel"?300:520,pitch:-.5},2)})});Ve?.addEventListener("click",()=>{ie=!ie,Ve.classList.toggle("on",ie),ie&&T.isWalking&&T.exitWalk()});Be.addEventListener("pointerdown",Z);Be.addEventListener("wheel",Z,{passive:!0});addEventListener("keydown",e=>{e.code==="Escape"&&(T.isWalking?T.exitWalk():ke(null)),(e.code==="KeyH"||e.code==="Home")&&pe("general",2.2),e.code==="KeyP"&&We?.click()});let U=null,Ye=null;const fa=9;let Me=null;function wt(){v&&(Me={start:performance.now()},v.setHotelFloors(0))}let ye=null;const we=M("card");function ua(e){return ne((e.bb[0]+e.bb[2])/2,(e.bb[1]+e.bb[3])/2,e.b+e.h*.5)}function xt(e){return ne((e.bb[0]+e.bb[2])/2,e.bb[1]-9,e.b)}function ke(e){const t=U?.s==="Hotel";if(U=e,ye&&(z.entities.remove(ye),ye=null),!e||!v){we&&(we.hidden=!0);return}const a=e.r.map(([m,g])=>ne(m,g,0,v.matrix)),i=2572+e.b-.5;ye=z.entities.add({polygon:{hierarchy:new Vt(a),height:i,extrudedHeight:i+e.h+2.2,material:fe.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:fe.fromCssColorString("#d7ebff"),shadows:Q.DISABLED}});const n=e.s==="Hotel";n&&!t&&(wt(),Z(),T.flyTo({pivot:Pe("hotel"),pitch:-.38,range:290},1.8));const s=n&&v?v.buildings.filter(m=>m.s==="Hotel"):[e],c=m=>Math.abs(m.r.reduce((g,R,V)=>{const D=m.r[(V+1)%m.r.length];return g+R[0]*D[1]-D[0]*R[1]},0)/2),d=s.reduce((m,g)=>m+c(g),0),y=s.reduce((m,g)=>m+c(g)*g.p,0),b=Math.max(...s.map(m=>m.p)),u=Math.max(...s.map(m=>m.h));Math.abs(e.r.reduce((m,g,R)=>{const V=e.r[(R+1)%e.r.length];return m+g[0]*V[1]-V[0]*g[1]},0)/2),M("cardKind").textContent=n?"Proyecto":`Sector ${e.s}`,M("cardTitle").textContent=n?"Hotel La Fontana":`Edificación ${e.id+1}`,M("cardData").innerHTML=`<dt>Pisos</dt><dd>${n?"hasta "+b:e.p}</dd><dt>Altura</dt><dd>${u.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(d).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(y).toLocaleString("es-CO")} m²</dd>`,we&&(we.hidden=!1)}T.onPick=e=>{v&&ke(e?v.buildingAt(e):null)};M("cardClose")?.addEventListener("click",()=>ke(null));M("cardFocus")?.addEventListener("click",()=>{if(!U)return;Z();const e=Math.max(U.bb[2]-U.bb[0],U.bb[3]-U.bb[1],U.h);T.flyTo({pivot:ua(U),pitch:-.42,range:Math.max(60,e*2.1)},1.7)});M("cardWalk")?.addEventListener("click",()=>{U&&(Z(),T.enterWalk(xt(U)))});const Fe=M("status"),lt=M("statusText");async function ma(){He("Contexto geográfico",.04),await new Promise(t=>setTimeout(t,30)),v=await ia(z,(t,a)=>He(t,a),(t,a,i)=>{!Fe||!lt||(Fe.hidden=!1,lt.textContent=t<a?`Cargando secciones ${t}/${a} · ${i}`:`Modelo completo · ${a} secciones`,t>=a&&setTimeout(()=>Fe.classList.add("fade"),2600))}),v.setNight(le),v.setTarde(he),me(),He("Listo",1),pe("general",2.4),rt.classList.add("done"),setTimeout(()=>rt.remove(),900);const e=M("hint");e&&setTimeout(()=>e.classList.add("fade"),9e3),window.__READY__=!0,v.done.then(async()=>{Ye=await oa(z,v.matrix),window.__ALL__=!0})}const O={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Ut,viewer:z,cam:T,getSite:()=>v,enuToWorld:ne,select:ke,stats:O,playHotel:wt,getTrafico:()=>Ye,setQuality:e=>{_=e,me()}};ma().catch(e=>{console.error(e),yt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(e?.message??e)});let ht=performance.now(),Ne=0;function bt(){const e=performance.now(),t=Math.min(.1,(e-ht)/1e3);if(ht=e,K){const a=Math.min(1,(e-K.start)/K.dur),i=a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2;z.clock.currentTime=ue.fromDate(new Date(K.from+(K.to-K.from)*i)),a>=1&&(K=null)}if(Me&&v){const a=(e-Me.start)/550,i=Math.floor(a),n=a-i,s=1-Math.pow(1-Math.min(1,n*1.6),3);i>=fa?(v.setHotelFloors(99),Me=null):v.setHotelFloors(i+s)}if(Ye?.update(t),v?.setTime(e*.001),ie&&!T.isWalking&&T.flyTo({heading:T.state.heading+.16*t},0),T.update(t),O.frames++,e-O.t0>=2e3){O.fps=Math.round(O.frames*1e3/(e-O.t0)),O.frames=0,O.t0=e,window.__FPS__=O.fps;const a=!!v&&v.sections.loaded>=v.sections.total&&e-Ne>8e3;v&&v.sections.loaded>=v.sections.total&&!Ne&&(Ne=e),a&&document.visibilityState==="visible"&&(O.fps<20&&_>.25&&!window.__DBG__.lock?++O.low>=3&&(_=_>=1?.5:.25,O.low=0,me()):O.low=0)}requestAnimationFrame(bt)}requestAnimationFrame(bt);addEventListener("resize",me);
