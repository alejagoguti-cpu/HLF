var kt=Object.defineProperty;var St=(e,t,a)=>t in e?kt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var w=(e,t,a)=>St(e,typeof t!="symbol"?t+"":t,a);import{C as u,a as wt,T as Ge,M as O,b as Ee,c as Me,H as It,P as _t,d as Oe,L as zt,U as _,V as Z,e as xt,f as Ne,g as $e,h as Qe,i as nt,j as Rt,S as ie,I as bt,k as Ht,R as Ft,l as Ke,A as pe,m as H,n as st,o as rt,p as ct,q as Ot,r as Nt,s as Dt,t as Ut,J as Ae,u as Vt,v as jt,w as Bt}from"./cesium-ICe9G6Ok.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function a(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=a(s);fetch(s.href,l)}})();const Be="/HLF/",Wt=Be.endsWith("/")?Be:Be+"/",Yt=Wt+"cesium/";window.CESIUM_BASE_URL=Yt;const Re={longitude:-74.04145021,latitude:4.70207636,height:2572},We={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},He={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},ve={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},qt=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,lt=-1.5533,ht=-.012,Xt=4200,Gt=6,dt=1.7;class Kt{constructor(t){w(this,"viewer");w(this,"canvas");w(this,"pivot",new u);w(this,"heading",.5);w(this,"pitch",-.6);w(this,"range",1200);w(this,"targetPivot",new u);w(this,"targetHeading",.5);w(this,"targetPitch",-.6);w(this,"targetRange",1200);w(this,"damping",9);w(this,"drag",null);w(this,"pointers",new Map);w(this,"pinch",null);w(this,"lastTap",0);w(this,"keys",new Set);w(this,"tween",null);w(this,"fov",wt.toRadians(48));w(this,"walking",!1);w(this,"eye",new u);w(this,"eyeTarget",new u);w(this,"wHeading",0);w(this,"wPitch",0);w(this,"wHeadingT",0);w(this,"wPitchT",0);w(this,"onPick",null);w(this,"onModeChange",null);w(this,"groundHeight",null);this.viewer=t,this.canvas=t.scene.canvas,t.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:u.clone(this.targetPivot)}}setPivot(t,a=!0){if(a){const i=u.clone(this.viewer.camera.positionWC),s=u.subtract(i,t,new u),l=u.magnitude(s),d=Ge.eastNorthUpToFixedFrame(t),f=O.inverseTransformation(d,new O),x=O.multiplyByPointAsVector(f,s,new u);if(l>1){const C=-Math.asin(Math.max(-1,Math.min(1,x.z/l)));if(C<ht&&C>lt){let p=Math.atan2(-x.x,-x.y);for(;p-this.heading>Math.PI;)p-=Math.PI*2;for(;p-this.heading<-Math.PI;)p+=Math.PI*2;this.heading=this.targetHeading=p,this.pitch=this.targetPitch=C,this.range=this.targetRange=this.clamp(l),u.clone(t,this.pivot)}}}this.targetPivot=u.clone(t),this.tween=null}bind(){const t=this.canvas;t.style.touchAction="none",t.addEventListener("pointerdown",i=>{if(t.setPointerCapture(i.pointerId),this.pointers.set(i.pointerId,{x:i.offsetX,y:i.offsetY}),this.pointers.size===2){const[s,l]=[...this.pointers.values()];this.pinch={distance:Math.hypot(s.x-l.x,s.y-l.y),range:this.targetRange,cx:(s.x+l.x)/2,cy:(s.y+l.y)/2},this.drag=null;return}i.button===2||i.button===1||i.shiftKey?this.drag={id:i.pointerId,x:i.offsetX,y:i.offsetY,mode:"pan",moved:!1}:i.button===0&&(this.drag={id:i.pointerId,x:i.offsetX,y:i.offsetY,mode:"orbit",moved:!1}),this.tween=null}),t.addEventListener("pointermove",i=>{if(!this.pointers.has(i.pointerId))return;if(this.pointers.set(i.pointerId,{x:i.offsetX,y:i.offsetY}),this.pointers.size===2&&this.pinch){const[d,f]=[...this.pointers.values()],x=Math.hypot(d.x-f.x,d.y-f.y),C=(d.x+f.x)/2,p=(d.y+f.y)/2;this.walking?this.walk((this.pinch.cy-p)*.06,0):(x>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/x)),this.pan(this.pinch.cx-C,p-this.pinch.cy)),this.pinch.cx=C,this.pinch.cy=p;return}if(!this.drag||i.pointerId!==this.drag.id)return;const s=i.offsetX-this.drag.x,l=i.offsetY-this.drag.y;this.drag.x=i.offsetX,this.drag.y=i.offsetY,Math.abs(s)+Math.abs(l)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=s*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+l*.0028))):this.walk(l*.05,-s*.05):this.drag.mode==="orbit"?(this.targetHeading-=s*.0042,this.targetPitch=this.clampPitch(this.targetPitch-l*.0034)):this.pan(-s,l)});const a=i=>{if(this.pointers.delete(i.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&i.pointerId===this.drag.id){const s=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,s&&i.type==="pointerup"){const l=new Ee(i.offsetX,i.offsetY),d=performance.now();if(i.pointerType!=="mouse"&&d-this.lastTap<320){this.lastTap=0,this.focusAt(l);return}this.lastTap=d;const f=this.pickWorld(l);f&&!this.walking&&this.setPivot(f,!0),this.onPick?.(f)}}};t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("contextmenu",i=>i.preventDefault()),t.addEventListener("wheel",i=>{i.preventDefault(),this.tween=null;const s=i.deltaMode===1?16:i.deltaMode===2?100:1,l=i.deltaY*s;if(this.walking){this.walk(-l*.02,0);return}const d=Math.exp(Math.max(-.45,Math.min(.45,l*.0016))),f=this.pickWorld(new Ee(i.offsetX,i.offsetY)),x=this.clamp(this.targetRange*d);if(f&&d<1){const C=Math.min(.45,(this.targetRange-x)/this.targetRange)*.8,p=u.subtract(f,this.targetPivot,new u),g=u.magnitude(p);if(g>1){const v=Math.min(g,this.targetRange)*C/g;u.add(this.targetPivot,u.multiplyByScalar(p,v,p),this.targetPivot)}}this.targetRange=x},{passive:!1}),t.addEventListener("dblclick",i=>{i.preventDefault(),this.focusAt(new Ee(i.offsetX,i.offsetY))}),addEventListener("keydown",i=>{i.target instanceof HTMLInputElement||(this.keys.add(i.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(i.code)&&i.preventDefault())}),addEventListener("keyup",i=>this.keys.delete(i.code)),addEventListener("blur",()=>this.keys.clear())}clamp(t,a=Gt,i=Xt){return Math.max(a,Math.min(i,t))}clampPitch(t){return Math.max(lt,Math.min(ht,t))}moveHorizontal(t,a,i,s){const l=Ge.eastNorthUpToFixedFrame(t),d=new u(Math.sin(a)*i+Math.cos(a)*s,Math.cos(a)*i-Math.sin(a)*s,0);O.multiplyByPoint(l,d,t)}pan(t,a){const i=this.canvas.clientHeight||1,s=2*this.range*Math.tan(this.fov/2)/i,l=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,a*s/l,t*s),this.tween=null}walk(t,a){this.moveHorizontal(this.eyeTarget,this.wHeading,t,a),this.snapEye()}snapEye(){const t=Me.fromCartesian(this.eyeTarget),a=this.groundHeight?.(t);a!==void 0&&Number.isFinite(a)&&(t.height=a+dt,Me.toCartesian(t,void 0,this.eyeTarget))}pickWorld(t){const a=this.viewer.scene;let i;if(a.pickPositionSupported&&a.pick(t,4,4)&&(i=a.pickPosition(t)),!i){const s=a.camera.getPickRay(t);s&&(i=a.globe.pick(s,a)??void 0)}return i??null}focusAt(t){const a=this.pickWorld(t);if(a){if(this.walking){u.clone(a,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:a,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(t,a=2){this.walking&&this.exitWalk(!1);const i={pivot:t.pivot??u.clone(this.targetPivot),heading:t.heading??this.targetHeading,pitch:t.pitch??this.targetPitch,range:t.range??this.targetRange};let s=i.heading;for(;s-this.targetHeading>Math.PI;)s-=Math.PI*2;for(;s-this.targetHeading<-Math.PI;)s+=Math.PI*2;if(i.heading=s,a<=.02){this.tween=null,this.targetPivot=u.clone(i.pivot),this.pivot=u.clone(i.pivot),this.heading=this.targetHeading=i.heading,this.pitch=this.targetPitch=i.pitch,this.range=this.targetRange=i.range;return}this.tween={from:{pivot:u.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:i,start:performance.now(),duration:a*1e3}}enterWalk(t){u.clone(t??this.targetPivot,this.eyeTarget),this.snapEye(),u.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(t=!0){if(!this.walking)return;this.walking=!1;const a=Me.fromCartesian(this.eyeTarget);a.height-=dt-1;const i=Me.toCartesian(a);this.pivot=u.clone(i),this.targetPivot=i,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,t?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(t){if(!this.keys.size)return;const a=this.keys,i=a.has("ShiftLeft")||a.has("ShiftRight")?3:1;let s=0,l=0;(a.has("KeyW")||a.has("ArrowUp"))&&(s+=1),(a.has("KeyS")||a.has("ArrowDown"))&&(s-=1),(a.has("KeyD")||a.has("ArrowRight"))&&(l+=1),(a.has("KeyA")||a.has("ArrowLeft"))&&(l-=1);let d=0;if(a.has("KeyQ")&&(d+=1),a.has("KeyE")&&(d-=1),this.walking){d&&(this.wHeadingT-=d*1.2*t),(s||l)&&this.walk(s*4.2*i*t,l*3.4*i*t);return}if(d&&(this.targetHeading+=d*.9*t,this.tween=null),(a.has("PageUp")||a.has("Equal")||a.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*t))),(a.has("PageDown")||a.has("Minus")||a.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*t))),a.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*t)),a.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*t)),!s&&!l)return;const f=Math.max(8,this.range*.6)*i*t;this.moveHorizontal(this.targetPivot,this.heading,s*f,l*f),this.tween=null}update(t){this.updateKeys(t);const a=1-Math.exp(-this.damping*t);if(this.walking){u.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*t),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*a,this.wPitch+=(this.wPitchT-this.wPitch)*a,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const i=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),s=qt(i),{from:l,to:d}=this.tween;u.lerp(l.pivot,d.pivot,s,this.targetPivot),this.targetHeading=l.heading+(d.heading-l.heading)*s,this.targetPitch=l.pitch+(d.pitch-l.pitch)*s,this.targetRange=Math.exp(Math.log(l.range)+(Math.log(d.range)-Math.log(l.range))*s),i>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*a,this.pitch+=(this.targetPitch-this.pitch)*a,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*a),u.lerp(this.pivot,this.targetPivot,a,this.pivot),this.viewer.camera.lookAt(this.pivot,new It(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(O.IDENTITY)}}function Jt(){return new Ne({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const Mt=()=>({uAerial:{type:_.SAMPLER_2D,value:Jt()},uAerialRect:{type:_.VEC4,value:new xt(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:_.FLOAT,value:0}}),Tt=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,De=`
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
`;function Zt(){return new Oe({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uHotelPisos:{type:_.FLOAT,value:99},uLean:{type:_.VEC2,value:new Ee(0,0)},...Mt()},varyings:{vPosM:Z.VEC3,vUpEC:Z.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:De+Tt+`
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
    `})}function $t(e,t,a){return new Oe({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uTime:{type:_.FLOAT,value:0},uFrame:{type:_.FLOAT,value:t},uTop:{type:_.FLOAT,value:a},uAtlas:{type:_.SAMPLER_2D,value:new Ne({url:e,repeat:!1,minificationFilter:$e.LINEAR_MIPMAP_LINEAR,magnificationFilter:Qe.LINEAR})}},varyings:{vUV:Z.VEC2,vView:Z.VEC3,vRightT:Z.VEC2,vUpT:Z.VEC2,vUpEC:Z.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:De+`
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
    `})}function Qt(){return new Oe({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0}},lightingModel:zt.UNLIT,fragmentShaderText:De+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC)));
      }
    `})}function ea(){return new _t({name:"hlf_grade",uniforms:{uNight:0,uTarde:0},fragmentShader:`
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
    `})}function ta(e){const t=a=>({type:_.SAMPLER_2D,value:new Ne({url:e+a,repeat:!0,minificationFilter:$e.LINEAR_MIPMAP_LINEAR,magnificationFilter:Qe.LINEAR})});return new Oe({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uAsfalto:t("tex_asfalto.webp"),uAnden:t("tex_anden.webp"),uPrado:t("tex_prado.webp"),uCiclo:t("tex_ciclo.webp"),...Mt()},varyings:{vG:Z.VEC3,vUpEC:Z.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:De+Tt+`
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
    `})}function Ct(){return Ge.eastNorthUpToFixedFrame(u.fromDegrees(Re.longitude,Re.latitude,Re.height))}function ye(e,t,a,i=Ct()){return O.multiplyByPoint(i,new u(e,t,a),new u)}const aa={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function oa(e,t,a){let i=!1;for(let s=0,l=a.length-1;s<a.length;l=s++){const[d,f]=a[s],[x,C]=a[l];f>t!=C>t&&e<(x-d)*(t-f)/(C-f)+d&&(i=!i)}return i}function ia(e,t,a){let i=1/0;for(let s=0,l=a.length-1;s<a.length;l=s++){const[d,f]=a[l],[x,C]=a[s],p=x-d,g=C-f,v=Math.max(0,Math.min(1,((e-d)*p+(t-f)*g)/(p*p+g*g||1)));i=Math.min(i,Math.hypot(e-d-v*p,t-f-v*g))}return i}async function na(e,t,a){const i=e.scene,s=Ct(),l=O.inverseTransformation(s,new O),d=ve.secciones;t("Contexto urbano",.08);const[f,x,C,p]=await Promise.all([fetch(d+"recorte.json").then(c=>c.json()),fetch(d+"edificios.json").then(c=>c.json()),fetch(d+"arboles.json").then(c=>c.json()),fetch(d+"suelo.json").then(c=>c.json())]),g=()=>f.clips.map(c=>{const o=new Ht({positions:u.fromDegreesArray(c.flat())}),r=o.computeRectangle();return o.computeRectangle=h=>Ft.clone(r,h),o});i.globe.clippingPolygons=new nt({polygons:g()});const v=Qt();let I=null;try{I=await Rt.fromUrl(ve.googleTiles,{maximumScreenSpaceError:10,shadows:ie.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),I.clippingPolygons=new nt({polygons:g()}),I.customShader=v,i.primitives.add(I)}catch(c){console.warn("Tiles de Google no disponibles",c)}const Y=[-236,330],D=[];for(const c of x.secciones)D.push({key:c.key,file:c.file,kind:"edificios",label:c.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${c.key}`,dist:c.key==="Hotel"?-2:Math.hypot(c.c[0]-Y[0],c.c[1]-Y[1])});D.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),D.sort((c,o)=>c.dist-o.dist);const de={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},K=p.secciones.map(c=>({key:c.key,file:c.file,kind:"suelo",capa:de[c.key]?.[0]??0,label:de[c.key]?.[1]??c.key,dist:-3})),fe=C.secciones.map(c=>({key:c.key,file:c.file,kind:"arboles",atlas:c.atlas,marco:c.marco,marcoSup:c.marcoSup,label:aa[c.key]??"Vegetación",dist:0})),U=[...K,...D.slice(0,4),...fe.slice(0,3),...D.slice(4,9),...fe.slice(3),...D.slice(9)],z=Zt(),ue=ta(d);(async()=>{try{const c=await bt.fromAssetId(ve.imageryAssetId),o=18,r=c.tilingScheme,h=(R,J)=>Me.fromCartesian(ye(R,J,0,s)),n=r.positionToTileXY(h(-1010,930),o),m=r.positionToTileXY(h(1010,-940),o),E=m.x-n.x+1,A=m.y-n.y+1,M=c.tileWidth,y=document.createElement("canvas");y.width=E*M,y.height=A*M;const q=y.getContext("2d"),ce=[];for(let R=n.y;R<=m.y;R++)for(let J=n.x;J<=m.x;J++)ce.push([J,R]);const be=async([R,J])=>{for(let ot=0;ot<40;ot++){const it=c.requestImage(R,J,o);if(it){try{const je=await it;q.drawImage(je,(R-n.x)*M,(J-n.y)*M,M,M)}catch{}return}await new Promise(je=>setTimeout(je,120))}};q.fillStyle="#6a6f62",q.fillRect(0,0,y.width,y.height);const k=Array.from({length:6},async()=>{for(;ce.length;)await be(ce.shift())});await Promise.all(k);const X=document.createElement("canvas");X.width=X.height=4096,X.getContext("2d").drawImage(y,0,0,4096,4096);const S=await new Promise(R=>X.toBlob(R,"image/jpeg",.92));if(!S)return;const j=URL.createObjectURL(S),V=r.tileXYToRectangle(n.x,n.y,o),G=r.tileXYToRectangle(m.x,m.y,o),ae=(R,J)=>O.multiplyByPoint(l,u.fromRadians(R,J,Re.height),new u),le=ae(V.west,G.south),Se=ae(G.east,V.north),Ie=new xt(le.x,le.y,Se.x,Se.y);for(const R of[z,ue])R.setUniform("uAerial",new Ne({url:j,repeat:!1,minificationFilter:$e.LINEAR_MIPMAP_LINEAR,magnificationFilter:Qe.LINEAR})),R.setUniform("uAerialRect",Ie),R.setUniform("uAerialOn",1)}catch(c){console.warn("Foto aérea no disponible",c)}})();const re=[],Q=[];let we=0,xe=0;const ee={total:U.length,loaded:0,failed:[]},te=async c=>{try{const o=await Ke.fromGltfAsync({url:d+c.file,modelMatrix:s,upAxis:pe.Y,forwardAxis:pe.X,shadows:c.kind==="arboles"?ie.CAST_ONLY:c.kind==="suelo"?ie.RECEIVE_ONLY:ie.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:c.kind!=="arboles"});if(c.kind==="suelo")o.customShader=ue;else if(c.kind==="arboles"){const r=$t(d+c.atlas,c.marco,c.marcoSup);r.setUniform("uNight",we),r.setUniform("uTarde",xe),re.push(r),o.customShader=r}else o.customShader=z;o.imageBasedLighting.imageBasedLightingFactor=new Ee(.75,.45),i.primitives.add(o),c.kind==="arboles"&&Q.push(o),await new Promise(r=>{if(o.ready)return r();const h=o.readyEvent.addEventListener(()=>{h(),r()});setTimeout(r,2e4)})}catch(o){console.error("Sección no cargada",c.file,o),ee.failed.push(c.file)}ee.loaded++,a?.(ee.loaded,ee.total,c.label)},me=K.length+7;for(let c=0;c<Math.min(me,U.length);c++)t(U[c].label,.2+.75*c/me),await te(U[c]);const ke=(async()=>{for(let c=me;c<U.length;c++)await te(U[c]),await new Promise(o=>setTimeout(o,60))})();return{matrix:s,inverse:l,tileset:I,buildings:x.edificios,treeCount:C.total,sections:ee,done:ke,setNight(c){v.setUniform("uNight",c),z.setUniform("uNight",c),we=c,ue.setUniform("uNight",c);for(const o of re)o.setUniform("uNight",c)},setTarde(c){v.setUniform("uTarde",c),z.setUniform("uTarde",c),xe=c,ue.setUniform("uTarde",c);for(const o of re)o.setUniform("uTarde",c)},setTime(c){for(const o of re)o.setUniform("uTime",c)},setHotelFloors(c){z.setUniform("uHotelPisos",c)},setTreesVisible(c){for(const o of Q)o.show=c},buildingAt(c){const o=O.multiplyByPoint(l,c,new u);let r=null,h=1.2;for(const n of x.edificios){if(o.x<n.bb[0]-1.5||o.x>n.bb[2]+1.5||o.y<n.bb[1]-1.5||o.y>n.bb[3]+1.5||o.z>n.b+n.h+2.5)continue;if(oa(o.x,o.y,n.r))return n;const m=ia(o.x,o.y,n.r);m<h&&(h=m,r=n)}return r}}}const ft=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],ut=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],mt=3.2;async function sa(e,t,a=110){const i=ve.secciones;let s,l,d;try{s=await fetch(i+"vias_campo.json").then(r=>r.json());const o=new Uint8Array(await fetch(i+"vias_campo.bin").then(r=>r.arrayBuffer()));l=o.subarray(0,s.w*s.h),d=o.subarray(s.w*s.h)}catch{return null}const{cell:f,x0:x,y0:C,w:p,h:g}=s,v=(o,r)=>{const h=(o-x)/f-.5,n=(r-C)/f-.5,m=Math.floor(h),E=Math.floor(n);if(m<0||E<0||m>=p-1||E>=g-1)return 0;const A=h-m,M=n-E,y=E*p+m;return((l[y]*(1-A)+l[y+1]*A)*(1-M)+(l[y+p]*(1-A)+l[y+p+1]*A)*M)*.5},I=(o,r)=>{const h=Math.max(0,Math.min(p-1,Math.floor((o-x)/f))),n=Math.max(0,Math.min(g-1,Math.floor((r-C)/f)));return d[n*p+h]*.1-2},Y=[],D=[],de=[];for(let o=2;o<g-2;o++)for(let r=2;r<p-2;r++){const h=o*p+r,n=x+(r+.5)*f,m=C+(o+.5)*f,E=Math.hypot(n+180,m-250);if(E>520)continue;const A=l[h]*.5;if(A>=2.6&&A<=5&&Y.push(h),A>=6&&E<460&&de.push({e:n,n:m,d:A}),l[h]===0&&E<430){let M=!1;for(let y=-2;y<=2&&!M;y++)for(let q=-2;q<=2;q++)if(l[(o+y)*p+(r+q)]>0){M=!0;break}M&&D.push(h)}}if(!Y.length)return null;de.sort((o,r)=>r.d-o.d);const K=[],fe=(o,r,h)=>O.multiplyByPoint(t,new u(o,r,h),new u);for(const o of de){if(K.length>=6)break;if(K.some(M=>Math.hypot(M.e-o.e,M.n-o.n)<90))continue;const r=I(o.e,o.n),h=o.e+6.5,n=o.n+6.5,m=I(h,n);e.entities.add({position:fe(h,n,m+2.4),cylinder:{length:4.8,topRadius:.11,bottomRadius:.14,material:H.fromCssColorString("#242933")}});const E=e.entities.add({position:fe(h-.6,n,m+4.5),box:{dimensions:new u(.45,.45,1.05),material:H.LIME}}),A=e.entities.add({position:fe(h,n-.6,m+4.5),box:{dimensions:new u(.45,.45,1.05),material:H.RED}});K.push({e:o.e,n:o.n,u:r,faseOffset:K.length*4.5,nsLuz:E,ewLuz:A,nsEstado:"green",ewEstado:"red"})}const U=(()=>{let o=12345;return()=>(o=o*1664525+1013904223>>>0)/4294967296})(),z=[],ue=(o,r,h)=>z.some(n=>n!==h&&Math.hypot(n.e-o,n.n-r)<8.5),re=o=>{for(let r=0;r<45;r++){const h=Y[Math.floor(U()*Y.length)],n=x+(h%p+.5)*f,m=C+(Math.floor(h/p)+.5)*f;if(ue(n,m,o))continue;let E=0,A=-1e9;for(let M=0;M<16;M++){const y=M/16*Math.PI*2,q=v(n+Math.cos(y)*10,m+Math.sin(y)*10),ce=v(n+Math.sin(y)*2.5,m-Math.cos(y)*2.5),be=v(n-Math.sin(y)*2.5,m+Math.cos(y)*2.5),k=-Math.abs(q-mt)+(be>ce?1.5:0);q>1.5&&k>A&&(A=k,E=y)}if(A>-1e8){o.e=n,o.n=m,o.th=E,o.vActual=o.v*.5;return}}};for(let o=0;o<a;o++){const r=U(),h=r<.2?"taxi":r<.48?"suv":"sedan",n={e:0,n:0,th:0,v:6.5+U()*5,vActual:0,model:null,u:0,tipo:h};re(n),z.push(n)}const Q=[];if(D.length>0)for(let o=0;o<42;o++){const r=D[Math.floor(U()*D.length)],h=x+(r%p+.5)*f,n=C+(Math.floor(r/p)+.5)*f;Q.push({e:h,n,th:U()*Math.PI*2,v:1.15+U()*.45,model:null,u:I(h,n)+.16,conPerro:o%3===0})}const we=new u,xe=new ct,ee=new O,te=(o,r=.03)=>{o.model&&(u.fromElements(o.e,o.n,o.u+r,we),ct.fromRotationZ(o.th,xe),O.fromRotationTranslation(xe,we,ee),o.model.modelMatrix=O.multiply(t,ee,new O))};(async()=>{for(let o=0;o<z.length;o++){const r=z[o],h=r.tipo==="taxi"?"carro_taxi.glb":r.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const n=await Ke.fromGltfAsync({url:i+h,upAxis:pe.Y,forwardAxis:pe.X,shadows:ie.ENABLED,color:r.tipo==="taxi"?H.WHITE:H.fromCssColorString(ft[o%ft.length]),colorBlendMode:st.MIX,colorBlendAmount:r.tipo==="taxi"?0:.28});e.scene.primitives.add(n),r.model=n,r.u=I(r.e,r.n),te(r)}catch{}o%6===5&&await new Promise(n=>setTimeout(n,35))}for(let o=0;o<Q.length;o++){const r=Q[o];try{const h=await Ke.fromGltfAsync({url:i+(r.conPerro?"persona_perro.glb":"persona.glb"),upAxis:pe.Y,forwardAxis:pe.X,shadows:ie.ENABLED,color:H.fromCssColorString(ut[o%ut.length]),colorBlendMode:st.MIX,colorBlendAmount:.25});e.scene.primitives.add(h),r.model=h,te(r,0)}catch{}o%6===5&&await new Promise(h=>setTimeout(h,35))}})();let me=!0,ke=0;const c=(o,r)=>v(o,r)===0&&v(o+4,r)+v(o-4,r)+v(o,r+4)+v(o,r-4)>.5;return{count:a,debug:()=>z.map(o=>[Math.round(o.e),Math.round(o.n),+o.u.toFixed(1),o.model?1:0]),setVisible(o){me=o;for(const r of z)r.model&&(r.model.show=o);for(const r of Q)r.model&&(r.model.show=o);for(const r of K)r.nsLuz.show=o,r.ewLuz.show=o},update(o){if(!me)return;const r=Math.min(.08,Math.max(.001,o));ke+=r;for(const h of K){const n=(ke+h.faseOffset)%24,m=n<10?"green":n<12?"yellow":"red",E=n>=12&&n<22?"green":n>=22?"yellow":"red";m!==h.nsEstado&&(h.nsEstado=m,h.nsLuz.box.material.color=new rt(m==="green"?H.LIME:m==="yellow"?H.YELLOW:H.RED)),E!==h.ewEstado&&(h.ewEstado=E,h.ewLuz.box.material.color=new rt(E==="green"?H.LIME:E==="yellow"?H.YELLOW:H.RED))}for(let h=0;h<z.length;h++){const n=z[h];if(!n.model)continue;let m=0,E=-1e9;for(let k=-4;k<=4;k++){const X=k*.13,S=n.th+X,j=n.e+Math.cos(S)*9,V=n.n+Math.sin(S)*9,G=v(j,V);if(G<1.1||v(n.e+Math.cos(S)*4.5,n.n+Math.sin(S)*4.5)<.9)continue;const le=v(j+Math.sin(S)*2.5,V-Math.cos(S)*2.5),Se=v(j-Math.sin(S)*2.5,V+Math.cos(S)*2.5),Ie=-Math.abs(Math.min(G,6)-mt)-Math.abs(X)*1.6+(Se>=le?.6:0);Ie>E&&(E=Ie,m=X)}if(E<-1e8||Math.hypot(n.e+180,n.n-250)>600){re(n),n.u=I(n.e,n.n),te(n);continue}const A=Math.cos(n.th),M=Math.sin(n.th);let y=1;for(let k=0;k<z.length;k++){if(k===h||!z[k].model)continue;const X=z[k],S=X.e-n.e,j=X.n-n.n,V=S*S+j*j;if(V>225)continue;const G=S*A+j*M,ae=Math.abs(-S*M+j*A);if(G>0&&G<12.5&&ae<2.35){const le=G<6.4?0:(G-6.4)/6.1;le<y&&(y=le)}else V<22&&k<h&&(y=0)}const q=Math.abs(A)>Math.abs(M);for(const k of K){if((q?k.ewEstado:k.nsEstado)==="green")continue;const S=k.e-n.e,j=k.n-n.n,V=S*A+j*M,G=Math.abs(-S*M+j*A);if(V>7&&V<21&&G<9){const ae=V<10.5?0:(V-10.5)/10.5;ae<y&&(y=ae)}}const ce=1-Math.min(.55,Math.abs(m)*1.4),be=n.v*ce*y;n.vActual+=(be-n.vActual)*Math.min(1,r*4.5),n.vActual>.05&&(n.th+=Math.max(-1.4*r,Math.min(1.4*r,m)),n.e+=Math.cos(n.th)*n.vActual*r,n.n+=Math.sin(n.th)*n.vActual*r,n.u+=(I(n.e,n.n)-n.u)*Math.min(1,r*6)),te(n)}for(const h of Q){if(!h.model)continue;const n=h.e+Math.cos(h.th)*h.v*r,m=h.n+Math.sin(h.th)*h.v*r;c(n,m)&&Math.hypot(n+180,m-250)<430?(h.e=n,h.n=m,h.u+=(I(h.e,h.n)+.16-h.u)*Math.min(1,r*4)):h.th+=.9+U()*1.2,te(h,0)}}}}Bt.defaultAccessToken=ve.ionToken;const L=e=>document.getElementById(e),et=L("cesiumContainer"),pt=L("loading"),ra=L("loadBar"),Et=L("loadLabel"),ca=L("loadPct");function Ye(e,t){Et.textContent=e;const a=Math.round(Math.max(0,Math.min(1,t))*100);ra.style.width=a+"%",ca.textContent=a+"%"}const N=new Ot(et,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:ie.RECEIVE_ONLY,terrain:Dt.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Nt.fromProviderAsync(bt.fromAssetId(ve.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),T=N.scene;T.globe.enableLighting=!0;T.globe.showGroundAtmosphere=!0;T.globe.depthTestAgainstTerrain=!0;T.globe.maximumScreenSpaceError=2;T.fog.enabled=!1;T.fog.density=18e-5;T.fog.minimumBrightness=.04;T.highDynamicRange=!0;T.msaaSamples=4;T.postProcessStages.fxaa.enabled=!0;T.screenSpaceCameraController.enableCollisionDetection=!1;T.light=new Ut({intensity:3,color:H.fromCssColorString("#fff4e3")});const ne=N.shadowMap;ne.softShadows=!0;ne.size=4096;ne.maximumDistance=1200;ne.darkness=.24;ne.normalOffset=!0;{const e=ne;e._primitiveBias.depthBias=8e-4,e._primitiveBias.normalOffsetScale=1.6,e._primitiveBias.normalShadingSmooth=.35}const he=T.postProcessStages.ambientOcclusion;he.enabled=!0;he.uniforms.intensity=2.1;he.uniforms.bias=.08;he.uniforms.lengthCap=.35;he.uniforms.stepSize=1.4;he.uniforms.blurStepSize=1;const $=T.postProcessStages.bloom;$.enabled=!0;$.uniforms.glowOnly=!1;$.uniforms.contrast=128;$.uniforms.brightness=-.36;$.uniforms.delta=1;$.uniforms.sigma=2.6;$.uniforms.stepSize=1.5;const Je=ea();T.postProcessStages.add(Je);N.camera.frustum.fov=wt.toRadians(48);const gt=(()=>{try{const e=T.context._gl,t=e.getExtension("WEBGL_debug_renderer_info");return t?String(e.getParameter(t.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),la=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(gt)&&!/Arc/i.test(gt);let b=null,F=la||matchMedia("(pointer: coarse)").matches?.5:1;function Le(){const e=Math.min(window.devicePixelRatio||1,2);N.resolutionScale=e*(F>=1?1:F>=.5?.8:.62),ne.size=F>=1?4096:F>=.5?2048:1024,ne.softShadows=F>=.5,he.enabled=F>=1,$.enabled=F>=.5,T.msaaSamples=F>=1?4:1,N.shadows=F>=.5,b?.tileset&&(b.tileset.maximumScreenSpaceError=F>=1?8:F>=.5?12:20)}Le();N.clock.shouldAnimate=!1;N.clock.currentTime=Ae.fromIso8601("2026-06-21T10:10:00-05:00");const P=new Kt(N),Ue=e=>ye(We[e].e,We[e].n,We[e].u),ha=Ue("hotel");P.flyTo({pivot:ha,heading:He.general.heading,pitch:He.general.pitch,range:He.general.range*1.8},0);P.groundHeight=e=>T.globe.getHeight(e);const da=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,tarde:0,fog:18e-5,label:"10:10",sun:3,color:"#fff4e3"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:2.8,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.65,color:"#6b8fd4"}];let Te=0,Ce=0,oe=null;const fa=e=>Ae.toDate(Ae.fromIso8601(e)).getTime();function ua(e){oe={from:Ae.toDate(N.clock.currentTime).getTime(),to:fa(e.iso),start:performance.now(),dur:1600},T.fog.density=e.fog,T.light.intensity=e.sun,T.light.color=H.fromCssColorString(e.color),$.uniforms.brightness=-.36,T.skyAtmosphere&&(T.skyAtmosphere.hueShift=0,T.skyAtmosphere.saturationShift=e.id==="tarde"?.08:e.id==="noche"?-.25:.06,T.skyAtmosphere.brightnessShift=e.id==="noche"?-.55:e.id==="tarde"?-.04:0);const a=Te,i=Ce,s=performance.now(),l=()=>{const f=Math.min(1,(performance.now()-s)/1400),x=f*f*(3-2*f);Te=a+(e.night-a)*x,Ce=i+(e.tarde-i)*x,b?.setNight(Te),b?.setTarde(Ce),Je.uniforms.uNight=Te,Je.uniforms.uTarde=Ce,f<1&&requestAnimationFrame(l)};requestAnimationFrame(l),document.querySelectorAll("[data-light]").forEach(f=>f.classList.toggle("on",f.dataset.light===e.id));const d=L("clockLabel");d&&(d.textContent=e.label)}document.querySelectorAll("[data-light]").forEach(e=>{e.addEventListener("click",()=>{const t=da.find(a=>a.id===e.dataset.light);t&&ua(t)})});let ge=!1;const Ze=L("btnOrbit"),tt=L("btnPedestrian");function se(){ge=!1,Ze?.classList.remove("on")}function Pe(e,t=2){se();const a=He[e];P.flyTo({pivot:Ue(a.place),heading:a.heading,pitch:a.pitch,range:a.range},t)}L("btnHome")?.addEventListener("click",()=>Pe("general",2.2));L("btnAerial")?.addEventListener("click",()=>Pe("aerial"));L("btnArch")?.addEventListener("click",()=>Pe("arch"));tt?.addEventListener("click",()=>{se(),P.isWalking?P.exitWalk():P.enterWalk(W?Lt(W):void 0)});P.onModeChange=e=>{tt?.classList.toggle("on",e);const t=L("hint");t&&e&&(t.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",t.classList.remove("fade"),setTimeout(()=>t.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(e=>{e.addEventListener("click",()=>{se();const t=e.dataset.place;P.flyTo({pivot:Ue(t),range:t==="hotel"?300:520,pitch:-.5},2)})});Ze?.addEventListener("click",()=>{ge=!ge,Ze.classList.toggle("on",ge),ge&&P.isWalking&&P.exitWalk()});et.addEventListener("pointerdown",se);et.addEventListener("wheel",se,{passive:!0});addEventListener("keydown",e=>{e.code==="Escape"&&(P.isWalking?P.exitWalk():Ve(null)),(e.code==="KeyH"||e.code==="Home")&&Pe("general",2.2),e.code==="KeyP"&&tt?.click()});let W=null,at=null;const ma=9;let Fe=null;function At(){b&&(Fe={start:performance.now()},b.setHotelFloors(0))}let _e=null;const ze=L("card");function pa(e){return ye((e.bb[0]+e.bb[2])/2,(e.bb[1]+e.bb[3])/2,e.b+e.h*.5)}function Lt(e){return ye((e.bb[0]+e.bb[2])/2,e.bb[1]-9,e.b)}function Ve(e){const t=W?.s==="Hotel";if(W=e,_e&&(N.entities.remove(_e),_e=null),!e||!b){ze&&(ze.hidden=!0);return}const a=e.r.map(([g,v])=>ye(g,v,0,b.matrix)),i=2572+e.b-.5;_e=N.entities.add({polygon:{hierarchy:new jt(a),height:i,extrudedHeight:i+e.h+2.2,material:H.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:H.fromCssColorString("#d7ebff"),shadows:ie.DISABLED}});const s=e.s==="Hotel";s&&!t&&(At(),se(),P.flyTo({pivot:Ue("hotel"),pitch:-.38,range:290},1.8));const l=s&&b?b.buildings.filter(g=>g.s==="Hotel"):[e],d=g=>Math.abs(g.r.reduce((v,I,Y)=>{const D=g.r[(Y+1)%g.r.length];return v+I[0]*D[1]-D[0]*I[1]},0)/2),f=l.reduce((g,v)=>g+d(v),0),x=l.reduce((g,v)=>g+d(v)*v.p,0),C=Math.max(...l.map(g=>g.p)),p=Math.max(...l.map(g=>g.h));Math.abs(e.r.reduce((g,v,I)=>{const Y=e.r[(I+1)%e.r.length];return g+v[0]*Y[1]-Y[0]*v[1]},0)/2),L("cardKind").textContent=s?"Proyecto":`Sector ${e.s}`,L("cardTitle").textContent=s?"Hotel La Fontana":`Edificación ${e.id+1}`,L("cardData").innerHTML=`<dt>Pisos</dt><dd>${s?"hasta "+C:e.p}</dd><dt>Altura</dt><dd>${p.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(f).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(x).toLocaleString("es-CO")} m²</dd>`,ze&&(ze.hidden=!1)}P.onPick=e=>{b&&Ve(e?b.buildingAt(e):null)};L("cardClose")?.addEventListener("click",()=>Ve(null));L("cardFocus")?.addEventListener("click",()=>{if(!W)return;se();const e=Math.max(W.bb[2]-W.bb[0],W.bb[3]-W.bb[1],W.h);P.flyTo({pivot:pa(W),pitch:-.42,range:Math.max(60,e*2.1)},1.7)});L("cardWalk")?.addEventListener("click",()=>{W&&(se(),P.enterWalk(Lt(W)))});const qe=L("status"),vt=L("statusText");async function ga(){Ye("Contexto geográfico",.04),await new Promise(t=>setTimeout(t,30)),b=await na(N,(t,a)=>Ye(t,a),(t,a,i)=>{!qe||!vt||(qe.hidden=!1,vt.textContent=t<a?`Cargando secciones ${t}/${a} · ${i}`:`Modelo completo · ${a} secciones`,t>=a&&setTimeout(()=>qe.classList.add("fade"),2600))}),b.setNight(Te),b.setTarde(Ce),Le(),Ye("Listo",1),Pe("general",2.4),pt.classList.add("done"),setTimeout(()=>pt.remove(),900);const e=L("hint");e&&setTimeout(()=>e.classList.add("fade"),9e3),window.__READY__=!0,b.done.then(async()=>{at=await sa(N,b.matrix),window.__ALL__=!0})}const B={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Vt,viewer:N,cam:P,getSite:()=>b,enuToWorld:ye,select:Ve,stats:B,playHotel:At,getTrafico:()=>at,setQuality:e=>{F=e,Le()}};ga().catch(e=>{console.error(e),Et.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(e?.message??e)});let yt=performance.now(),Xe=0;function Pt(){const e=performance.now(),t=Math.min(.1,(e-yt)/1e3);if(yt=e,oe){const a=Math.min(1,(e-oe.start)/oe.dur),i=a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2;N.clock.currentTime=Ae.fromDate(new Date(oe.from+(oe.to-oe.from)*i)),a>=1&&(oe=null)}if(Fe&&b){const a=(e-Fe.start)/550,i=Math.floor(a),s=a-i,l=1-Math.pow(1-Math.min(1,s*1.6),3);i>=ma?(b.setHotelFloors(99),Fe=null):b.setHotelFloors(i+l)}if(at?.update(t),b?.setTime(e*.001),ge&&!P.isWalking&&P.flyTo({heading:P.state.heading+.16*t},0),P.update(t),B.frames++,e-B.t0>=2e3){B.fps=Math.round(B.frames*1e3/(e-B.t0)),B.frames=0,B.t0=e,window.__FPS__=B.fps;const a=!!b&&b.sections.loaded>=b.sections.total&&e-Xe>8e3;b&&b.sections.loaded>=b.sections.total&&!Xe&&(Xe=e),a&&document.visibilityState==="visible"&&(B.fps<20&&F>.25&&!window.__DBG__.lock?++B.low>=3&&(F=F>=1?.5:.25,B.low=0,Le()):B.low=0)}requestAnimationFrame(Pt)}requestAnimationFrame(Pt);addEventListener("resize",Le);
