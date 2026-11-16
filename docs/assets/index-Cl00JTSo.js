var ko=Object.defineProperty;var So=(e,a,t)=>a in e?ko(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t;var N=(e,a,t)=>So(e,typeof a!="symbol"?a+"":a,t);import{C as w,a as uo,T as It,M as B,b as He,c as Je,H as zo,P as Dt,d as Xe,L as To,U as _,V as le,e as Ye,f as Ge,g as bt,h as wt,i as ut,j as Po,S as Ce,I as ho,k as Eo,l as Ao,m as O,n as dt,R as Lo,o as Qe,A as be,p as Yt,q as Ro,r as _o,s as Io,t as et,u as Gt,v as Ht,G as Ho,B as Fo,w as zt,J as fo,x as No,y as Do,z as Oo,D as Uo,E as Bo,F as Vo,K as jo}from"./cesium-NqgYyKJC.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const Tt="/HLF/",Wo=Tt.endsWith("/")?Tt:Tt+"/",qo=Wo+"cesium/";window.CESIUM_BASE_URL=qo;const gt={longitude:-74.04145021,latitude:4.70207636,height:2572},Pt={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},vt={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Oe={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},Yo=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Xt=-1.5533,Zt=-.012,Go=4200,Xo=6,Jt=1.7;class Zo{constructor(a){N(this,"viewer");N(this,"canvas");N(this,"pivot",new w);N(this,"heading",.5);N(this,"pitch",-.6);N(this,"range",1200);N(this,"targetPivot",new w);N(this,"targetHeading",.5);N(this,"targetPitch",-.6);N(this,"targetRange",1200);N(this,"damping",9);N(this,"drag",null);N(this,"pointers",new Map);N(this,"pinch",null);N(this,"lastTap",0);N(this,"keys",new Set);N(this,"tween",null);N(this,"fov",uo.toRadians(48));N(this,"walking",!1);N(this,"eye",new w);N(this,"eyeTarget",new w);N(this,"wHeading",0);N(this,"wPitch",0);N(this,"wHeadingT",0);N(this,"wPitchT",0);N(this,"onPick",null);N(this,"onModeChange",null);N(this,"groundHeight",null);this.viewer=a,this.canvas=a.scene.canvas,a.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:w.clone(this.targetPivot)}}setPivot(a,t=!0){if(t){const o=w.clone(this.viewer.camera.positionWC),n=w.subtract(o,a,new w),s=w.magnitude(n),c=It.eastNorthUpToFixedFrame(a),d=B.inverseTransformation(c,new B),g=B.multiplyByPointAsVector(d,n,new w);if(s>1){const h=-Math.asin(Math.max(-1,Math.min(1,g.z/s)));if(h<Zt&&h>Xt){let f=Math.atan2(-g.x,-g.y);for(;f-this.heading>Math.PI;)f-=Math.PI*2;for(;f-this.heading<-Math.PI;)f+=Math.PI*2;this.heading=this.targetHeading=f,this.pitch=this.targetPitch=h,this.range=this.targetRange=this.clamp(s),w.clone(a,this.pivot)}}}this.targetPivot=w.clone(a),this.tween=null}bind(){const a=this.canvas;a.style.touchAction="none",a.addEventListener("pointerdown",o=>{if(a.setPointerCapture(o.pointerId),this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2){const[n,s]=[...this.pointers.values()];this.pinch={distance:Math.hypot(n.x-s.x,n.y-s.y),range:this.targetRange,cx:(n.x+s.x)/2,cy:(n.y+s.y)/2},this.drag=null;return}o.button===2||o.button===1||o.shiftKey?this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"pan",moved:!1}:o.button===0&&(this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"orbit",moved:!1}),this.tween=null}),a.addEventListener("pointermove",o=>{if(!this.pointers.has(o.pointerId))return;if(this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2&&this.pinch){const[c,d]=[...this.pointers.values()],g=Math.hypot(c.x-d.x,c.y-d.y),h=(c.x+d.x)/2,f=(c.y+d.y)/2;this.walking?this.walk((this.pinch.cy-f)*.06,0):(g>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/g)),this.pan(this.pinch.cx-h,f-this.pinch.cy)),this.pinch.cx=h,this.pinch.cy=f;return}if(!this.drag||o.pointerId!==this.drag.id)return;const n=o.offsetX-this.drag.x,s=o.offsetY-this.drag.y;this.drag.x=o.offsetX,this.drag.y=o.offsetY,Math.abs(n)+Math.abs(s)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=n*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+s*.0028))):this.walk(s*.05,-n*.05):this.drag.mode==="orbit"?(this.targetHeading-=n*.0042,this.targetPitch=this.clampPitch(this.targetPitch-s*.0034)):this.pan(-n,s)});const t=o=>{if(this.pointers.delete(o.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&o.pointerId===this.drag.id){const n=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,n&&o.type==="pointerup"){const s=new He(o.offsetX,o.offsetY),c=performance.now();if(o.pointerType!=="mouse"&&c-this.lastTap<320){this.lastTap=0,this.focusAt(s);return}this.lastTap=c;const d=this.pickWorld(s);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};a.addEventListener("pointerup",t),a.addEventListener("pointercancel",t),a.addEventListener("contextmenu",o=>o.preventDefault()),a.addEventListener("wheel",o=>{o.preventDefault(),this.tween=null;const n=o.deltaMode===1?16:o.deltaMode===2?100:1,s=o.deltaY*n;if(this.walking){this.walk(-s*.02,0);return}const c=Math.exp(Math.max(-.45,Math.min(.45,s*.0016))),d=this.pickWorld(new He(o.offsetX,o.offsetY)),g=this.clamp(this.targetRange*c);if(d&&c<1){const h=Math.min(.45,(this.targetRange-g)/this.targetRange)*.8,f=w.subtract(d,this.targetPivot,new w),b=w.magnitude(f);if(b>1){const C=Math.min(b,this.targetRange)*h/b;w.add(this.targetPivot,w.multiplyByScalar(f,C,f),this.targetPivot)}}this.targetRange=g},{passive:!1}),a.addEventListener("dblclick",o=>{o.preventDefault(),this.focusAt(new He(o.offsetX,o.offsetY))}),addEventListener("keydown",o=>{o.target instanceof HTMLInputElement||(this.keys.add(o.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(o.code)&&o.preventDefault())}),addEventListener("keyup",o=>this.keys.delete(o.code)),addEventListener("blur",()=>this.keys.clear())}clamp(a,t=Xo,o=Go){return Math.max(t,Math.min(o,a))}clampPitch(a){return Math.max(Xt,Math.min(Zt,a))}moveHorizontal(a,t,o,n){const s=It.eastNorthUpToFixedFrame(a),c=new w(Math.sin(t)*o+Math.cos(t)*n,Math.cos(t)*o-Math.sin(t)*n,0);B.multiplyByPoint(s,c,a)}pan(a,t){const o=this.canvas.clientHeight||1,n=2*this.range*Math.tan(this.fov/2)/o,s=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,t*n/s,a*n),this.tween=null}walk(a,t){this.moveHorizontal(this.eyeTarget,this.wHeading,a,t),this.snapEye()}snapEye(){const a=Je.fromCartesian(this.eyeTarget),t=this.groundHeight?.(a);t!==void 0&&Number.isFinite(t)&&(a.height=t+Jt,Je.toCartesian(a,void 0,this.eyeTarget))}pickWorld(a){const t=this.viewer.scene;let o;if(t.pickPositionSupported&&t.pick(a,4,4)&&(o=t.pickPosition(a)),!o){const n=t.camera.getPickRay(a);n&&(o=t.globe.pick(n,t)??void 0)}return o??null}focusAt(a){const t=this.pickWorld(a);if(t){if(this.walking){w.clone(t,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:t,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(a,t=2){this.walking&&this.exitWalk(!1);const o={pivot:a.pivot??w.clone(this.targetPivot),heading:a.heading??this.targetHeading,pitch:a.pitch??this.targetPitch,range:a.range??this.targetRange};let n=o.heading;for(;n-this.targetHeading>Math.PI;)n-=Math.PI*2;for(;n-this.targetHeading<-Math.PI;)n+=Math.PI*2;if(o.heading=n,t<=.02){this.tween=null,this.targetPivot=w.clone(o.pivot),this.pivot=w.clone(o.pivot),this.heading=this.targetHeading=o.heading,this.pitch=this.targetPitch=o.pitch,this.range=this.targetRange=o.range;return}this.tween={from:{pivot:w.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:o,start:performance.now(),duration:t*1e3}}enterWalk(a){w.clone(a??this.targetPivot,this.eyeTarget),this.snapEye(),w.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(a=!0){if(!this.walking)return;this.walking=!1;const t=Je.fromCartesian(this.eyeTarget);t.height-=Jt-1;const o=Je.toCartesian(t);this.pivot=w.clone(o),this.targetPivot=o,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,a?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(a){if(!this.keys.size)return;const t=this.keys,o=t.has("ShiftLeft")||t.has("ShiftRight")?3:1;let n=0,s=0;(t.has("KeyW")||t.has("ArrowUp"))&&(n+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(n-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(s+=1),(t.has("KeyA")||t.has("ArrowLeft"))&&(s-=1);let c=0;if(t.has("KeyQ")&&(c+=1),t.has("KeyE")&&(c-=1),this.walking){c&&(this.wHeadingT-=c*1.2*a),(n||s)&&this.walk(n*4.2*o*a,s*3.4*o*a);return}if(c&&(this.targetHeading+=c*.9*a,this.tween=null),(t.has("PageUp")||t.has("Equal")||t.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*a))),(t.has("PageDown")||t.has("Minus")||t.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*a))),t.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*a)),t.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*a)),!n&&!s)return;const d=Math.max(8,this.range*.6)*o*a;this.moveHorizontal(this.targetPivot,this.heading,n*d,s*d),this.tween=null}update(a){this.updateKeys(a);const t=1-Math.exp(-this.damping*a);if(this.walking){w.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*a),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*t,this.wPitch+=(this.wPitchT-this.wPitch)*t,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const o=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),n=Yo(o),{from:s,to:c}=this.tween;w.lerp(s.pivot,c.pivot,n,this.targetPivot),this.targetHeading=s.heading+(c.heading-s.heading)*n,this.targetPitch=s.pitch+(c.pitch-s.pitch)*n,this.targetRange=Math.exp(Math.log(s.range)+(Math.log(c.range)-Math.log(s.range))*n),o>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*t,this.pitch+=(this.targetPitch-this.pitch)*t,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*t),w.lerp(this.pivot,this.targetPivot,t,this.pivot),this.viewer.camera.lookAt(this.pivot,new zo(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(B.IDENTITY)}}function Jo(){return new Ge({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const mo=()=>({uAerial:{type:_.SAMPLER_2D,value:Jo()},uAerialRect:{type:_.VEC4,value:new Ye(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:_.FLOAT,value:0}}),po=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,nt=`
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
`;function Ko(){return new Xe({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uSkyFill:{type:_.FLOAT,value:.24},uHazeAmount:{type:_.FLOAT,value:.08},uHazeStart:{type:_.FLOAT,value:1200},uHotelPisos:{type:_.FLOAT,value:99},uRevitBox:{type:_.VEC4,value:new Ye(0,0,0,0)},uLean:{type:_.VEC2,value:new He(0,0)},...mo()},varyings:{vPosM:le.VEC3,vUpEC:le.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:nt+po+`
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
        if (uRevitBox.z > uRevitBox.x && tipo > 0.06 && tipo < 0.95) {
          vec2 enR = vec2(vPosM.x, -vPosM.z);
          if (enR.x > uRevitBox.x && enR.x < uRevitBox.z && enR.y > uRevitBox.y && enR.y < uRevitBox.w) discard;
        }

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
          float hotelUltimo = hotel * step(pisos - 1.05, v) * enCuerpo;
          if (hotel > 0.5) {
            ww = mix(0.50, 0.96, hotelUltimo);
            wh0 = mix(0.32, 0.24, hotelUltimo);
            wh1 = mix(0.86, 0.88, hotelUltimo);
          }
          float local = bajo * step(3.5, pisos);
          ww = mix(ww, 0.78, local * (1.0 - hotel) + local * hotel * 0.85);
          wh0 = mix(wh0, 0.06, local);
          wh1 = mix(wh1, 0.84, local);

          vec2 lo = vec2(0.5 - ww * 0.5, wh0), hi = vec2(0.5 + ww * 0.5, wh1);
          float vano = box(f, lo, hi, aa) * enCuerpo;

          col = wall * (0.93 + 0.12 * vnoise(vec2(uv.x * 1.7, v * 1.5) + rnd * 40.0));
          // placa de entrepiso
          float placa = (1.0 - smoothstep(0.0, 0.035 + aa.y, f.y)) * enCuerpo * step(0.5, v);
          col = mix(col, mix(concreto, panete, 0.5), placa * mix(0.7, mix(0.2, 0.42, hotel), esLadrillo * (1.0 - torre)));
          col = mix(col, vec3(0.46, 0.46, 0.45), zocalo);
          col = mix(col, mix(wall, concreto, 0.5) * 1.03, remate * 0.7);
          // Franja blanca característica bajo la teja en el último piso del Hotel La Fontana
          col = mix(col, vec3(0.90, 0.90, 0.88), hotelUltimo);

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
            // Parteluces verticales tupidos en la franja superior del hotel
            if (hotelUltimo > 0.5) {
              float m3 = 1.0 - smoothstep(0.0, 0.025 + aa.x, abs(fract(f.x * 3.0) - 0.5));
              parte = max(parte, m3 * 0.9);
            }
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
          // Jardineras verdes en los antepechos de las ventanas medias del hotel
          if (hotel > 0.5 && enCuerpo > 0.5 && hotelUltimo < 0.5 && bajo < 0.5) {
            float jard = box(f, vec2(lo.x - 0.03, wh0 - 0.13), vec2(hi.x + 0.03, wh0 + 0.01), aa);
            float hoja = 0.72 + 0.48 * vnoise(vec2(uv.x * 9.0, v * 9.0) + rnd * 17.0);
            vec3 verdeJard = vec3(0.13, 0.27, 0.10) * hoja;
            col = mix(col, verdeJard, jard * 0.92);
          }
          // suciedad y contacto en la base
          col *= mix(1.0, 0.84, smoothstep(0.95, 0.0, v) * (1.0 - zocalo) * near);
          col = mix(col, vidrio, vano);

          // Bañado cálido arquitectónico en la base del hotel (estilo fachada real)
          if (hotel > 0.5 && v > -0.1 && v < 1.35) {
            float wash = smoothstep(1.35, 0.05, v) * (1.0 - vano * 0.65);
            float foco = 0.65 + 0.35 * cos(f.x * 6.2831853);
            emis += vec3(1.0, 0.58, 0.22) * wash * foco * (0.20 + 0.75 * max(uTarde * 0.55, uNight));
          }

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
    `})}function $o(e,a,t){return new Xe({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uSkyFill:{type:_.FLOAT,value:.22},uHazeAmount:{type:_.FLOAT,value:.08},uHazeStart:{type:_.FLOAT,value:1200},uTime:{type:_.FLOAT,value:0},uFrame:{type:_.FLOAT,value:a},uTop:{type:_.FLOAT,value:t},uAtlas:{type:_.SAMPLER_2D,value:new Ge({url:e,repeat:!1,minificationFilter:wt.LINEAR_MIPMAP_LINEAR,magnificationFilter:bt.LINEAR})}},varyings:{vUV:le.VEC2,vView:le.VEC3,vRightT:le.VEC2,vUpT:le.VEC2,vUpEC:le.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:nt+`
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
    `})}function Qo(){return new Xe({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uHazeAmount:{type:_.FLOAT,value:.08},uHazeStart:{type:_.FLOAT,value:1200}},lightingModel:To.UNLIT,fragmentShaderText:nt+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function ea(e,a,t){return new Dt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:e,uNorth:a,uUp:t,uSkyZenith:new w(.16,.42,.82),uSkyHorizon:new w(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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

      float sh(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
      float sn(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(sh(i), sh(i + vec2(1.0, 0.0)), f.x), mix(sh(i + vec2(0.0, 1.0)), sh(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
        for (int i = 0; i < 6; i++) {
          v += a * sn(p);
          p = rot * p * 2.03 + vec2(13.7, 7.3);
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
        vec3 rd = normalize(vec3(dot(dirWC, uEast), dot(dirWC, uNorth), dot(dirWC, uUp)));
        float elev = max(0.0, rd.z);

        vec3 sunWC = normalize(czm_sunDirectionWC);
        vec3 sunENU = normalize(vec3(dot(sunWC, uEast), dot(sunWC, uNorth), dot(sunWC, uUp)));
        float sunDot = max(0.0, dot(rd, sunENU));

        // Dispersión atmosférica estilo Unreal SkyAtmosphere (Rayleigh + Mie)
        vec3 rayleigh = mix(uSkyHorizon, uSkyZenith, pow(elev, 0.48));
        float horizonBand = exp(-elev * 12.0);
        vec3 mieCol = mix(vec3(1.0, 0.95, 0.86), vec3(1.0, 0.78, 0.58), uTarde);
        vec3 sky = rayleigh + mieCol * (pow(sunDot, 6.0) * 0.34 + horizonBand * pow(sunDot, 2.0) * 0.25) * (1.0 - uNight);
        sky = mix(sky, uSkyHorizon * 1.08, horizonBand * 0.45 * (1.0 - uNight));
        sky += vec3(1.0, 0.98, 0.92) * smoothstep(0.99935, 0.99988, sunDot) * 1.8 * (1.0 - uNight);

        // Estrellas sutiles de noche
        if (uNight > 0.15 && elev > 0.05) {
          vec2 starUV = rd.xy / (elev + 0.35) * 180.0;
          float st = sh(floor(starUV));
          vec2 sf = fract(starUV) - 0.5;
          float star = smoothstep(0.992, 0.999, st) * smoothstep(0.32, 0.0, length(sf));
          sky += vec3(0.85, 0.90, 1.0) * star * uNight * smoothstep(0.05, 0.3, elev) * 1.4;
        }

        // Nubes con perspectiva de plano infinito (curvatura terrestre) + doble capa
        if (rd.z > 0.002 && uCloudDensity > 0.01) {
          float tCum = 1.0 / (rd.z + 0.065);
          vec2 p = rd.xy * tCum * 0.55;
          vec2 wind = vec2(uTime * 0.012, uTime * 0.004) * uCloudSpeed;

          vec2 warp = vec2(fbm(p * 0.65 + wind), fbm(p * 0.65 - wind + vec2(5.2, 1.3)));
          float nBase = fbm(p + warp * 0.42 + wind);
          float detail = fbm(p * 2.6 - wind * 0.8 + vec2(3.1, 7.4));
          float shape = nBase * 0.78 + detail * 0.26;
          float cov = mix(0.62, 0.36, clamp(uCloudDensity, 0.0, 1.0));
          float alpha = smoothstep(cov, cov + 0.24, shape);

          vec2 sunStep = sunENU.xy * 0.08;
          float nSun = fbm(p + sunStep + warp * 0.42 + wind);
          float directLit = clamp(0.52 + (nBase - nSun) * 4.5, 0.0, 1.0);
          float silver = pow(sunDot, 8.0) * (1.0 - alpha * 0.55) * 0.65;

          vec3 topDia = vec3(1.0, 0.99, 0.98);
          vec3 botDia = mix(uSkyHorizon * 0.72, vec3(0.46, 0.53, 0.64), 0.5);
          vec3 topTarde = vec3(1.0, 0.91, 0.82);
          vec3 botTarde = mix(uSkyHorizon * 0.65, vec3(0.38, 0.43, 0.54), 0.5);
          vec3 cNoche = vec3(0.05, 0.07, 0.13);

          vec3 cloudCol = mix(
            mix(mix(botDia, topDia, directLit), mix(botTarde, topTarde, directLit), uTarde),
            cNoche,
            uNight
          );
          cloudCol += mieCol * silver * (1.0 - uNight);

          vec2 pCir = rd.xy * (1.0 / (rd.z + 0.04)) * 0.28;
          float cir = smoothstep(0.56, 0.82, fbm(vec2(pCir.x * 0.7, pCir.y * 1.9) + wind * 0.45));
          vec3 cirCol = mix(mix(vec3(0.96, 0.98, 1.0), vec3(0.98, 0.88, 0.80), uTarde), cNoche * 1.2, uNight);

          float distFade = smoothstep(0.002, 0.075, rd.z);
          sky = mix(sky, cirCol, cir * 0.28 * distFade * uCloudDensity);
          sky = mix(sky, cloudCol, alpha * distFade * min(1.0, uCloudDensity * 0.96));
        }

        out_FragColor = vec4(sky, src.a);
      }
    `})}function ta(){return new Dt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new w(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function oa(e){const a=t=>({type:_.SAMPLER_2D,value:new Ge({url:e+t,repeat:!0,minificationFilter:wt.LINEAR_MIPMAP_LINEAR,magnificationFilter:bt.LINEAR})});return new Xe({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uGroundFill:{type:_.FLOAT,value:.12},uHazeAmount:{type:_.FLOAT,value:.08},uHazeStart:{type:_.FLOAT,value:1200},uAsfalto:a("tex_asfalto.webp"),uAnden:a("tex_anden.webp"),uPrado:a("tex_prado.webp"),uCiclo:a("tex_ciclo.webp"),...mo()},varyings:{vG:le.VEC3,vUpEC:le.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:nt+po+`
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
    `})}function aa(){return new Xe({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uSkyFill:{type:_.FLOAT,value:.24},uHazeAmount:{type:_.FLOAT,value:.08},uHazeStart:{type:_.FLOAT,value:1200}},varyings:{vPosM:le.VEC3,vUpEC:le.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:nt+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float dist = length(fsInput.attributes.positionEC);
        float hz = hlfHaze(dist, uHazeStart, uHazeAmount);
        vec3 col = material.diffuse;
        vec3 nEC = normalize(material.normalEC);
        vec3 upEC = normalize(vUpEC);
        vec3 skyFill = hlfSkyFill(nEC, upEC, uNight, uTarde);

        // Iluminación protagonista del Hotel Estelar La Fontana (destaca sobre todo el contexto):
        vec3 viewDirEC = normalize(-fsInput.attributes.positionEC);
        float fresnel = pow(1.0 - max(0.0, dot(nEC, viewDirEC)), 2.6);

        // 1. Luz clave arquitectónica + rim de silueta (realza ladrillo, molduras 3D y relieves PBR)
        vec3 keyDirEC = normalize(czm_viewRotation * vec3(0.45, -0.72, 0.52));
        float keyDiff = max(0.0, dot(nEC, keyDirEC)) * 0.60 + 0.40;
        vec3 heroFill = col * mix(vec3(1.14, 1.00, 0.88), vec3(0.24, 0.32, 0.48), uNight) * keyDiff * mix(0.78, 0.50, uNight);
        vec3 rimGlow = mix(vec3(1.0, 0.88, 0.72), vec3(0.32, 0.55, 0.95), uNight) * fresnel * mix(0.35, 0.55, uNight);

        // 2. Bañadores verticales cálidos (2900K) en machones + zócalo de plazoleta + cornisa/torre
        float pierWave = pow(0.5 + 0.5 * cos((vPosM.x + vPosM.z) * 1.45), 2.2);
        float heightFade = smoothstep(3.8, 5.2, vPosM.y) * smoothstep(24.5, 6.0, vPosM.y);
        float baseWash = smoothstep(9.5, 4.0, vPosM.y) * step(3.6, vPosM.y);
        float eaveGlow = (smoothstep(18.0, 21.5, vPosM.y) * smoothstep(25.5, 22.0, vPosM.y))
                       + smoothstep(26.0, 29.5, vPosM.y) * 0.9;
        float esOpaco = step(0.18, material.roughness);
        vec3 warmColor = vec3(1.0, 0.64, 0.26);
        vec3 warmBeam = warmColor * col * esOpaco * (
          pierWave * heightFade * mix(0.38, 1.45, uNight) +
          baseWash * mix(0.48, 1.55, uNight) +
          eaveGlow * mix(0.22, 1.10, uNight)
        );

        // 3. Calidez interior en habitaciones y ventanales
        float esVidrio = 1.0 - esOpaco;
        float winSeed = fract(sin(dot(floor(vec2(vPosM.x + vPosM.z, vPosM.y) * 0.32), vec2(12.9898, 78.233))) * 43758.5453);
        float winOn = step(0.38, winSeed);
        vec3 winGlow = vec3(1.0, 0.76, 0.42) * esVidrio * winOn * mix(0.18, 1.65, uNight);

        material.diffuse = col * mix(1.22, 0.54, uNight) * (1.0 - hz);
        material.emissive = (material.emissive + heroFill + rimGlow + col * skyFill * 0.26 + warmBeam + winGlow) * (1.0 - hz) + hlfHazeColor(uNight, uTarde) * hz;
      }
    `})}function Ot(){return It.eastNorthUpToFixedFrame(w.fromDegrees(gt.longitude,gt.latitude,gt.height))}function ce(e,a,t,o=Ot()){return B.multiplyByPoint(o,new w(e,a,t),new w)}const ia={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function na(e,a,t){let o=!1;for(let n=0,s=t.length-1;n<t.length;s=n++){const[c,d]=t[n],[g,h]=t[s];d>a!=h>a&&e<(g-c)*(a-d)/(h-d)+c&&(o=!o)}return o}function sa(e,a,t){let o=1/0;for(let n=0,s=t.length-1;n<t.length;s=n++){const[c,d]=t[s],[g,h]=t[n],f=g-c,b=h-d,C=Math.max(0,Math.min(1,((e-c)*f+(a-d)*b)/(f*f+b*b||1)));o=Math.min(o,Math.hypot(e-c-C*f,a-d-C*b))}return o}async function ra(e,a,t){const o=e.scene,n=Ot(),s=B.inverseTransformation(n,new B),c=Oe.secciones;a("Contexto urbano",.08);const[d,g,h,f]=await Promise.all([fetch(c+"recorte.json").then(i=>i.json()),fetch(c+"edificios.json").then(i=>i.json()),fetch(c+"arboles.json").then(i=>i.json()),fetch(c+"suelo.json").then(i=>i.json())]),b=()=>d.clips.map(i=>{const u=new dt({positions:w.fromDegreesArray(i.flat())}),P=u.computeRectangle();return u.computeRectangle=k=>Lo.clone(P,k),u});o.globe.clippingPolygons=new ut({polygons:b()});const C=Qo();let A=null;try{A=await Po.fromUrl(Oe.googleTiles,{maximumScreenSpaceError:10,shadows:Ce.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),A.clippingPolygons=new ut({polygons:b()}),A.customShader=C,o.primitives.add(A)}catch(i){console.warn("Tiles de Google no disponibles",i)}const L=[-236,330],v=[];for(const i of g.secciones){const u=i.key==="Hotel";v.push({key:i.key,file:u?"hotel_fachadas.glb":i.file,kind:u?"cubierta_pbr":"edificios",label:u?"Hotel La Fontana 3D":`Edificaciones · sector ${i.key}`,dist:u?-2:Math.hypot(i.c[0]-L[0],i.c[1]-L[1])})}v.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),v.push({key:"hotel_plazoleta",file:"hotel_plazoleta.glb",kind:"cubierta_pbr",label:"Plazoleta y acceso · Hotel",dist:-.8}),v.push({key:"torres_vecinas",file:"torres_vecinas.glb",kind:"cubierta_pbr",label:"Torres vecinas PBR",dist:-.6}),v.push({key:"esquina_ak15",file:"esquina_ak15.glb",kind:"cubierta_pbr",label:"Esquina Ak 15 PBR",dist:-.55}),v.push({key:"metro127",file:"metro127.glb",kind:"cubierta_pbr",label:"Metro 127 · Sonesta PBR",dist:-.52}),v.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),v.sort((i,u)=>i.dist-u.dist);const T={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},p=f.secciones.map(i=>({key:i.key,file:i.file,kind:"suelo",capa:T[i.key]?.[0]??0,label:T[i.key]?.[1]??i.key,dist:-3})),S=h.secciones.map(i=>({key:i.key,file:i.file,kind:"arboles",atlas:i.atlas,marco:i.marco,marcoSup:i.marcoSup,label:ia[i.key]??"Vegetación",dist:0})),E=[...p,...v.slice(0,4),...S.slice(0,3),...v.slice(4,9),...S.slice(3),...v.slice(9)],x=Ko(),z=aa(),I=oa(c),Z=(async()=>{try{const i=await ho.fromAssetId(Oe.imageryAssetId),u=18,P=i.tilingScheme,k=(ee,ye)=>Je.fromCartesian(ce(ee,ye,0,n)),M=P.positionToTileXY(k(-1010,930),u),H=P.positionToTileXY(k(1010,-940),u),W=H.x-M.x+1,G=H.y-M.y+1,V=i.tileWidth,oe=document.createElement("canvas");oe.width=W*V,oe.height=G*V;const J=oe.getContext("2d"),D=[];for(let ee=M.y;ee<=H.y;ee++)for(let ye=M.x;ye<=H.x;ye++)D.push([ye,ee]);const ne=async([ee,ye])=>{for(let Vt=0;Vt<40;Vt++){const jt=i.requestImage(ee,ye,u);if(jt){try{const Ze=await jt,Wt=(ee-M.x)*V,qt=(ye-M.y)*V;typeof ImageBitmap<"u"&&Ze instanceof ImageBitmap?(J.save(),J.translate(Wt,qt+V),J.scale(1,-1),J.drawImage(Ze,0,0,V,V),J.restore()):J.drawImage(Ze,Wt,qt,V,V)}catch{}return}await new Promise(Ze=>setTimeout(Ze,120))}};J.fillStyle="#6a6f62",J.fillRect(0,0,oe.width,oe.height);const q=Array.from({length:6},async()=>{for(;D.length;)await ne(D.shift())});await Promise.all(q);const K=document.createElement("canvas");K.width=K.height=4096,K.getContext("2d").drawImage(oe,0,0,4096,4096);const ae=await new Promise(ee=>K.toBlob(ee,"image/jpeg",.92));if(!ae)return;const pe=URL.createObjectURL(ae);window.__AERIAL_URL__=pe;const ve=P.tileXYToRectangle(M.x,M.y,u),Ae=P.tileXYToRectangle(H.x,H.y,u),ze=(ee,ye)=>B.multiplyByPoint(s,w.fromRadians(ee,ye,gt.height),new w),je=ze(ve.west,Ae.south),Le=ze(Ae.east,ve.north),Mo=new Ye(je.x,je.y,Le.x,Le.y);for(const ee of[x,I])ee.setUniform("uAerial",new Ge({url:pe,repeat:!1,minificationFilter:wt.LINEAR_MIPMAP_LINEAR,magnificationFilter:bt.LINEAR})),ee.setUniform("uAerialRect",Mo),ee.setUniform("uAerialOn",1)}catch(i){console.warn("Foto aérea no disponible",i)}})(),Y=[],te=[],Q=[];let Se=null;const me=new Eo(new w(0,-1,0),1e3);let Ne=0,Ee=0,ue=.22,ge=.08,de=1200;const De={total:E.length,loaded:0,failed:[]},lt=async i=>{try{const u=await Qe.fromGltfAsync({url:c+i.file,modelMatrix:n,upAxis:be.Y,forwardAxis:be.X,shadows:i.kind==="arboles"?Ce.CAST_ONLY:i.kind==="suelo"?Ce.RECEIVE_ONLY:Ce.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:i.kind!=="arboles"});if(i.kind==="suelo")u.customShader=I;else if(i.kind==="arboles"){const k=$o(c+i.atlas,i.marco,i.marcoSup);k.setUniform("uNight",Ne),k.setUniform("uTarde",Ee),k.setUniform("uSkyFill",ue),k.setUniform("uHazeAmount",ge),k.setUniform("uHazeStart",de),Y.push(k),u.customShader=k}else i.key==="Hotel"||i.key==="hotel_plazoleta"||i.key==="hotel_cubiertas"?u.customShader=z:i.kind!=="cubierta_pbr"&&(u.customShader=x);const P=i.key==="Hotel"||i.key==="hotel_plazoleta"||i.key==="hotel_cubiertas";u.imageBasedLighting.imageBasedLightingFactor=P?new He(1,.75):i.kind==="cubierta_pbr"?new He(.85,.55):new He(.68,.38),o.primitives.add(u),i.kind==="arboles"&&te.push(u),(i.key==="Hotel"||i.key==="hotel_cubiertas")&&Q.push(u),await new Promise(k=>{if(u.ready)return k();const M=u.readyEvent.addEventListener(()=>{M(),k()});setTimeout(k,2e4)})}catch(u){console.error("Sección no cargada",i.file,u),De.failed.push(i.file)}De.loaded++,t?.(De.loaded,De.total,i.label)},Ve=p.length+7,ct=async(i,u,P)=>{let k=0,M=0;await Promise.all(Array.from({length:Math.min(u,i.length)},async()=>{for(;k<i.length;){const H=i[k++];await lt(H),P?.(++M)}}))},r=E.slice(0,Ve);await ct(r,5,i=>a(r[Math.min(i,r.length-1)].label,.2+.75*i/r.length));let m=()=>{};const y=new Promise(i=>{m=i,setTimeout(i,16e3)}),l=(async()=>{await y,await ct(E.slice(Ve),3),await Z})();return{startBackground:()=>m(),matrix:n,inverse:s,tileset:A,buildings:g.edificios,treeCount:h.total,sections:De,done:l,setNight(i){C.setUniform("uNight",i),x.setUniform("uNight",i),z.setUniform("uNight",i),Ne=i,I.setUniform("uNight",i);for(const u of Y)u.setUniform("uNight",i)},setTarde(i){C.setUniform("uTarde",i),x.setUniform("uTarde",i),z.setUniform("uTarde",i),Ee=i,I.setUniform("uTarde",i);for(const u of Y)u.setUniform("uTarde",i)},setTime(i){for(const u of Y)u.setUniform("uTime",i)},setLook(i){if(i.skyFill!==void 0){ue=i.skyFill,x.setUniform("uSkyFill",ue),z.setUniform("uSkyFill",ue);for(const u of Y)u.setUniform("uSkyFill",ue)}if(i.groundFill!==void 0&&I.setUniform("uGroundFill",i.groundFill),i.hazeAmount!==void 0){ge=i.hazeAmount,x.setUniform("uHazeAmount",ge),z.setUniform("uHazeAmount",ge),I.setUniform("uHazeAmount",ge),C.setUniform("uHazeAmount",ge);for(const u of Y)u.setUniform("uHazeAmount",ge)}if(i.hazeStart!==void 0){de=i.hazeStart,x.setUniform("uHazeStart",de),z.setUniform("uHazeStart",de),I.setUniform("uHazeStart",de),C.setUniform("uHazeStart",de);for(const u of Y)u.setUniform("uHazeStart",de)}},setRevitBlocks(i,u=[]){const P=g.edificios.filter(k=>i.includes(k.id)).map(k=>{const M=k.r.reduce((W,G)=>W+G[0],0)/k.r.length,H=k.r.reduce((W,G)=>W+G[1],0)/k.r.length;return new dt({positions:k.r.map(([W,G])=>{const V=W-M,oe=G-H,J=Math.hypot(V,oe)||1;return ce(W+V/J*1,G+oe/J*1,0,n)})})});for(const k of u)P.push(new dt({positions:k.map(([M,H])=>ce(M,H,0,n))}));for(const k of Q)k.clippingPolygons=P.length?new ut({polygons:P}):void 0},setRevitZone(i){if(!i){Se=i?[[i[0],i[1]],[i[2],i[1]],[i[2],i[3]],[i[0],i[3]]].map(([u,P])=>ce(u,P,0,n)):null;for(const u of Q)u.clippingPolygons=Se?new ut({polygons:[new dt({positions:Se})]}):void 0;x.setUniform("uRevitBox",i?new Ye(i[0]-1,i[1]-1,i[2]+1,i[3]+1):new Ye(0,0,0,0))}},setHotelFloors(i){const u=i<98;me.distance=3.2+i*3.05;for(const P of Q)u&&!P.clippingPlanes&&(P.clippingPlanes=new Ao({planes:[me],edgeWidth:2,edgeColor:O.fromCssColorString("#d7ebff")})),P.clippingPlanes&&(P.clippingPlanes.enabled=u);x.setUniform("uHotelPisos",i)},setTreesVisible(i){for(const u of te)u.show=i},buildingAt(i){const u=B.multiplyByPoint(s,i,new w);let P=null,k=1.2;for(const M of g.edificios){if(u.x<M.bb[0]-1.5||u.x>M.bb[2]+1.5||u.y<M.bb[1]-1.5||u.y>M.bb[3]+1.5||u.z>M.b+M.h+2.5)continue;if(na(u.x,u.y,M.r))return M;const H=sa(u.x,u.y,M.r);H<k&&(k=H,P=M)}return P}}}const la=O.fromCssColorString("#ff2b1a"),ca=O.fromCssColorString("#ffc400"),ua=O.fromCssColorString("#00e862"),We=O.fromCssColorString("#1a1d22");function Et(e){const a=document.createElement("canvas");a.width=128,a.height=128;const t=a.getContext("2d");if(t.clearRect(0,0,128,128),e==="pare"){t.beginPath();for(let o=0;o<8;o++){const n=(o+.5)*Math.PI/4,s=64+Math.cos(n)*58,c=64+Math.sin(n)*58;o===0?t.moveTo(s,c):t.lineTo(s,c)}t.closePath(),t.fillStyle="#c81e1e",t.fill(),t.lineWidth=5,t.strokeStyle="#ffffff",t.stroke(),t.fillStyle="#ffffff",t.font="bold 31px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("PARE",64,66)}else e==="peaton"?(t.beginPath(),t.moveTo(64,6),t.lineTo(122,64),t.lineTo(64,122),t.lineTo(6,64),t.closePath(),t.fillStyle="#f5b800",t.fill(),t.lineWidth=4,t.strokeStyle="#18181b",t.stroke(),t.fillStyle="#18181b",t.beginPath(),t.arc(64,38,7,0,Math.PI*2),t.fill(),t.fillRect(59,47,10,22),t.fillRect(54,69,7,20),t.fillRect(67,69,7,20)):(t.beginPath(),t.arc(64,64,56,0,Math.PI*2),t.fillStyle="#ffffff",t.fill(),t.lineWidth=11,t.strokeStyle="#c81e1e",t.stroke(),t.fillStyle="#111827",t.font="bold 46px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("30",64,67));return a.toDataURL("image/png")}function da(e,a,t,o,n){const s=(p,S,E)=>B.multiplyByPoint(a,new w(p,S,E),new w),c=[],d=t+7.2,g=o+7.2,h=n(d,g),f=O.fromCssColorString("#2a303a"),b=O.fromCssColorString("#14171c"),C=O.fromCssColorString("#eab308"),A=(p,S,E,x)=>{const z=x?.42:.3,I=x?.3:.42;c.push(e.entities.add({position:s(p,S,E),box:{dimensions:new w(z,I,1.18),material:b}}));const Z=(me,Ne)=>{const Ee=e.entities.add({position:s(p,S,E+me),box:{dimensions:new w(x?.24:.33,x?.33:.24,.24),material:Ne}});return c.push(Ee),Ee},Y=Z(.36,We),te=Z(0,We),Q=Z(-.36,We);return{red:Y,yellow:te,green:Q,setState:me=>{Y.box.material=new et(me==="red"?la:We),te.box.material=new et(me==="yellow"?ca:We),Q.box.material=new et(me==="green"?ua:We)}}};if(Math.abs(t+148.8)<12&&Math.abs(o-216.3)<12){const p=[{px:-159.5,py:232,dx:4.2,dy:0,isNS:!0},{px:-163.5,py:226.5,dx:0,dy:-4,isNS:!1},{px:-163,py:203,dx:0,dy:4,isNS:!1},{px:-133.5,py:231.5,dx:4.2,dy:0,isNS:!0},{px:-133,py:202.5,dx:0,dy:4,isNS:!1}],S=[],E=[];for(const z of p){const I=n(z.px,z.py);c.push(e.entities.add({position:s(z.px,z.py,I+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:f}}),e.entities.add({position:s(z.px,z.py,I+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:C}}),e.entities.add({position:s(z.px+z.dx*.5,z.py+z.dy*.5,I+5.65),box:{dimensions:new w(Math.max(.14,Math.abs(z.dx)),Math.max(.14,Math.abs(z.dy)),.14),material:f}}));const Z=A(z.px+z.dx*.78,z.py+z.dy*.78,I+5.1,z.isNS);(z.isNS?S:E).push(Z)}const x=z=>({red:z[0].red,yellow:z[0].yellow,green:z[0].green,setState:I=>{for(const Z of z)Z.setState(I)}});return{ns:x(S),ew:x(E),setVisible(z){for(const I of c)I.show=z}}}c.push(e.entities.add({position:s(d,g,h+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:f}}),e.entities.add({position:s(d,g,h+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:C}}));const L=4.6;c.push(e.entities.add({position:s(d-L*.5,g,h+5.65),box:{dimensions:new w(L,.14,.14),material:f}}),e.entities.add({position:s(d,g-L*.5,h+5.65),box:{dimensions:new w(.14,L,.14),material:f}}));const v=A(d-3.4,g,h+5.1,!0),T=A(d,g-3.4,h+5.1,!1);return{ns:v,ew:T,setVisible(p){for(const S of c)S.show=p}}}function ha(e,a,t,o,n){const s=(p,S,E)=>B.multiplyByPoint(a,new w(p,S,E),new w),c=[],d=Yt.fromColor(O.fromCssColorString("#f3f4f6").withAlpha(.92)),g=Yt.fromColor(O.fromCssColorString("#f5b800").withAlpha(.92)),h=(p,S,E,x,z,I)=>{if(o(p,S)<.8)return;const Z=n(p,S)+.07;s(p,S,Z);const Y=Ht.fromRotationZ(z),te=B.fromRotationTranslation(Y,new w(p,S,Z)),Q=B.multiply(a,te,new B);c.push(new Ho({geometry:Fo.fromDimensions({dimensions:new w(E,x,.04)}),modelMatrix:Q,attributes:{color:I}}))},f=Math.atan2(-51,380);for(const p of t){if(Math.abs(p.e+148.8)<12&&Math.abs(p.n-216.3)<12){const E=[{bx:-154,by:230,horiz:!0,ang:0},{bx:-164.5,by:221.5,horiz:!1,ang:f},{bx:-164.5,by:210.5,horiz:!1,ang:f},{bx:-154,by:202.5,horiz:!0,ang:0},{bx:-129,by:229,horiz:!1,ang:f},{bx:-128.5,by:211.5,horiz:!1,ang:f},{bx:-136.5,by:202.5,horiz:!0,ang:0}];for(const x of E)for(let z=-3;z<=3;z++){const I=x.horiz?x.bx+z*1.1:x.bx,Z=x.horiz?x.by:x.by+z*1.05;h(I,Z,x.horiz?.52:2.8,x.horiz?2.8:.52,x.ang,d)}continue}const S=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const E of S){const x=p.e+E.de,z=p.n+E.dn;if(o(x,z)<1.2)continue;for(let Y=-3;Y<=3;Y++){const te=E.horiz?x+Y*1.15:x,Q=E.horiz?z:z+Y*1.15;h(te,Q,E.horiz?.52:2.8,E.horiz?2.8:.52,0,d)}const I=x+(E.de===0?0:Math.sign(E.de)*2.1),Z=z+(E.dn===0?0:Math.sign(E.dn)*2.1);h(I,Z,E.horiz?6.8:.42,E.horiz?.42:6.8,0,d)}}for(let p=-80;p<=440;p+=8)h(-154,p,.18,3.2,0,d),h(-132,p,.18,3.2,0,d);for(let p=-420;p<=160;p+=8){const S=263-(p+420)*.13421052631578947;h(p,S+7.5,3.2,.18,f,d),h(p,S-7.5,3.2,.18,f,d),h(p,S,4.5,.18,f,g)}for(let p=-160;p<=360;p+=8)h(158,p,.18,3.2,0,d);let b=null;c.length>0&&(b=new Ro({geometryInstances:c,appearance:new _o({flat:!0,translucent:!0}),asynchronous:!1}),e.scene.primitives.add(b));const C=[],A=Et("pare"),L=Et("peaton"),v=Et("vel30"),T=O.fromCssColorString("#9ca3af");return t.forEach((p,S)=>{const E=[{e:p.e-7.2,n:p.n-7.2,tex:A},{e:p.e+7.2,n:p.n-7.2,tex:S%2===0?L:v}];for(const x of E){const z=n(x.e,x.n);C.push(e.entities.add({position:s(x.e,x.n,z+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:T}}),e.entities.add({position:s(x.e,x.n,z+2.45),billboard:{image:x.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:Io.CENTER}}))}}),{setVisible(p){b&&(b.show=p);for(const S of C)S.show=p}}}function fa(e,a){const t=(v,T,p)=>B.multiplyByPoint(a,new w(v,T,p),new w),o=[],d=O.fromCssColorString("#7a7771"),g=O.fromCssColorString("#3d3833"),h=O.fromCssColorString("#24471b"),f=O.fromCssColorString("#3d7f8f").withAlpha(.88),b=O.fromCssColorString("#ffbe55");o.push(e.entities.add({position:t(-225,263.5,4.17+.32),cylinder:{length:.64,topRadius:3.3,bottomRadius:3.6,material:d,slices:12}}),e.entities.add({position:t(-225,263.5,4.17+.56),cylinder:{length:.24,topRadius:3.45,bottomRadius:3.55,material:h,slices:12}}),e.entities.add({position:t(-225,263.5,4.17+.66),cylinder:{length:.08,topRadius:2.95,bottomRadius:2.95,material:f,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+1.35),cylinder:{length:1.9,topRadius:.34,bottomRadius:.48,material:g}}),e.entities.add({position:t(-225,263.5,4.17+1.35),cylinder:{length:.18,topRadius:1.95,bottomRadius:1.55,material:g,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+2.2),cylinder:{length:.16,topRadius:1.15,bottomRadius:.85,material:g,slices:24}}));let C=0;const A=new et(new Gt(()=>{const v=.62+.18*Math.sin(C*7);return O.fromCssColorString("#d9f4ff").withAlpha(v)},!1)),L=new et(new Gt(()=>{const v=.46+.16*Math.cos(C*5.5);return O.fromCssColorString("#bce8f7").withAlpha(v)},!1));o.push(e.entities.add({position:t(-225,263.5,4.17+2.85),cylinder:{length:1.25,topRadius:.08,bottomRadius:.36,material:A,slices:16}}),e.entities.add({position:t(-225,263.5,4.17+1.78),cylinder:{length:.85,topRadius:1.08,bottomRadius:1.22,material:L,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+1.02),cylinder:{length:.72,topRadius:1.88,bottomRadius:2.08,material:L,slices:24}}));for(let v=-246;v<=-202;v+=8.5)o.push(e.entities.add({position:t(v,255.8,4.17+1.1),cylinder:{length:2.2,topRadius:.04,bottomRadius:.05,material:g}}),e.entities.add({position:t(v,255.8,4.17+2.3),ellipsoid:{radii:new w(.16,.16,.22),material:b}}));return{update(v){C=v},setVisible(v){for(const T of o)T.show=v}}}const ht=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Kt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],$t=3.2;async function ma(e,a,t=110){const o=Oe.secciones;let n,s,c;try{n=await fetch(o+"vias_campo.json").then(m=>m.json());const r=new Uint8Array(await fetch(o+"vias_campo.bin").then(m=>m.arrayBuffer()));s=r.subarray(0,n.w*n.h),c=r.subarray(n.w*n.h)}catch{return null}const{cell:d,x0:g,y0:h,w:f,h:b}=n,C=(r,m)=>{const y=(r-g)/d-.5,l=(m-h)/d-.5,i=Math.floor(y),u=Math.floor(l);if(i<0||u<0||i>=f-1||u>=b-1)return 0;const P=y-i,k=l-u,M=u*f+i;return((s[M]*(1-P)+s[M+1]*P)*(1-k)+(s[M+f]*(1-P)+s[M+f+1]*P)*k)*.5},A=(r,m)=>{const y=Math.max(0,Math.min(f-1,Math.floor((r-g)/d))),l=Math.max(0,Math.min(b-1,Math.floor((m-h)/d))),i=l*f+y;if(s[i]>0)return c[i]*.1-2;let u=0,P=0;for(let k=-2;k<=2;k++){const M=l+k;if(!(M<0||M>=b))for(let H=-2;H<=2;H++){const W=y+H;if(W<0||W>=f)continue;const G=M*f+W;if(s[G]===0)continue;const V=1/(H*H+k*k+.5);u+=V,P+=(c[G]*.1-2)*V}}return u>0?P/u:1},L=[],v=[],T=[];for(let r=2;r<b-2;r++)for(let m=2;m<f-2;m++){const y=r*f+m,l=g+(m+.5)*d,i=h+(r+.5)*d,u=Math.hypot(l+180,i-250);if(u>520)continue;const P=s[y]*.5;if(P>=2.6&&P<=5&&L.push(y),P>=6&&u<460&&T.push({e:l,n:i,d:P}),s[y]===0&&u<430){let k=!1;for(let M=-2;M<=2&&!k;M++)for(let H=-2;H<=2;H++)if(s[(r+M)*f+(m+H)]>0){k=!0;break}k&&v.push(y)}}if(!L.length)return null;T.sort((r,m)=>m.d-r.d);const p=[];for(const r of T){if(p.length>=6)break;if(p.some(l=>Math.hypot(l.e-r.e,l.n-r.n)<90))continue;const m=A(r.e,r.n),y=da(e,a,r.e,r.n,A);y.ns.setState("green"),y.ew.setState("red"),p.push({e:r.e,n:r.n,u:m,faseOffset:p.length*4.5,rig:y,nsEstado:"green",ewEstado:"red"})}const S=ha(e,a,p,C,A),E=fa(e,a),x=(()=>{let r=12345;return()=>(r=r*1664525+1013904223>>>0)/4294967296})(),z=(r,m,y)=>{const l=Math.cos(y),i=Math.sin(y);if(r>=-168&&r<=-118&&Math.abs(i)>.35)return r<-143?i<-.2?12:-1e6:i>.2?12:-1e6;const u=263-(r+420)*(51/380);return Math.abs(m-u)<26&&Math.abs(l)>.35?m>u?l>.2?12:-1e6:l<-.2?12:-1e6:r>=-255&&r<=-210&&m<222&&Math.abs(i)>.35?i<-.2?10:-1e6:m<175&&r<-215&&Math.abs(l)>.35?l>.2?10:-1e6:r<-385&&m<265&&Math.abs(i)>.35?i<-.2?10:-1e6:0},I=[],Z=(r,m,y)=>I.some(l=>l!==y&&Math.hypot(l.e-r,l.n-m)<8.5),Y=r=>{for(let m=0;m<45;m++){const y=L[Math.floor(x()*L.length)],l=g+(y%f+.5)*d,i=h+(Math.floor(y/f)+.5)*d;if(Z(l,i,r))continue;let u=0,P=-1e9;for(let k=0;k<16;k++){const M=k/16*Math.PI*2,H=l+Math.cos(M)*10,W=i+Math.sin(M)*10,G=C(H,W),V=z(H,W,M);if(V<-1e4)continue;const oe=C(l+Math.sin(M)*2.5,i-Math.cos(M)*2.5),J=C(l-Math.sin(M)*2.5,i+Math.cos(M)*2.5),D=-Math.abs(G-$t)+(J>oe?1.5:0)+V;G>1.5&&D>P&&(P=D,u=M)}if(P>-1e8){r.e=l,r.n=i,r.th=u,r.vActual=r.v*.5;return}}};for(let r=0;r<t;r++){const m=x(),y=m<.12?"sitp_azul":m<.2?"sitp_amarillo":m<.38?"taxi":m<.54?"moto":m<.68?"hatch":m<.84?"suv":"sedan",u={e:0,n:0,th:0,v:y==="moto"?8+x()*4.5:y==="sitp_azul"||y==="sitp_amarillo"?5.2+x()*3:6.5+x()*5,vActual:0,model:null,u:0,tipo:y};Y(u),I.push(u)}const te=[];if(v.length>0)for(let r=0;r<42;r++){const m=v[Math.floor(x()*v.length)],y=g+(m%f+.5)*d,l=h+(Math.floor(m/f)+.5)*d;te.push({e:y,n:l,th:x()*Math.PI*2,v:1.15+x()*.45,model:null,u:A(y,l)+.16,conPerro:r%3===0})}const Q=[],Se=(r,m,y,l,i,u,P,k=.68)=>{for(let M=0;M<i;M++){const H=i===1?(r+m)*.5:r+M/(i-1)*(m-r);for(let W=0;W<u;W++){if(x()>k)continue;const G=u===1?(y+l)*.5:y+W/(u-1)*(l-y);if(C(H,G)>.3)continue;const V=x(),oe=V<.08?"taxi":V<.42?"suv":"sedan",J=x()<.5?0:Math.PI,D=A(H,G);Q.push({e:H+(x()-.5)*.25,n:G+(x()-.5)*.25,u:D>-1.5?D:3.55,th:P+J+(x()-.5)*.07,tipo:oe,model:null})}}};Se(92,134,-22,62,4,15,.05,.7),Se(52,108,114,146,5,4,.12,.62),Se(58,106,-104,-56,4,6,.1,.65),Se(-132,-98,-46,32,3,12,.04,.68);const me=new w,Ne=new Ht,Ee=new B,ue=(r,m=.08)=>{r.model&&(w.fromElements(r.e,r.n,r.u+m,me),Ht.fromRotationZ(r.th,Ne),B.fromRotationTranslation(Ne,me,Ee),r.model.modelMatrix=B.multiply(a,Ee,new B))},ge={sedan:"carro.glb",suv:"carro_suv.glb",hatch:"carro_hatch.glb",taxi:"carro_taxi.glb",moto:"carro_moto.glb",sitp_azul:"sitp_azul.glb",sitp_amarillo:"sitp_amarillo.glb"},de=r=>r==="taxi"||r==="sitp_azul"||r==="sitp_amarillo",De=(async()=>{for(let r=0;r<I.length;r++){const m=I[r],y=ge[m.tipo];try{const l=await Qe.fromGltfAsync({url:o+y,upAxis:be.Y,forwardAxis:be.X,shadows:Ce.ENABLED,color:de(m.tipo)?O.WHITE:O.fromCssColorString(ht[r%ht.length]),colorBlendMode:zt.MIX,colorBlendAmount:de(m.tipo)?0:.32});e.scene.primitives.add(l),m.model=l,m.u=A(m.e,m.n),ue(m)}catch{}r%6===5&&await new Promise(l=>setTimeout(l,35))}for(let r=0;r<te.length;r++){const m=te[r];try{const y=await Qe.fromGltfAsync({url:o+(m.conPerro?"persona_perro.glb":"persona.glb"),upAxis:be.Y,forwardAxis:be.X,shadows:Ce.ENABLED,color:O.fromCssColorString(Kt[r%Kt.length]),colorBlendMode:zt.MIX,colorBlendAmount:.25});e.scene.primitives.add(y),m.model=y,ue(m,0)}catch{}r%6===5&&await new Promise(y=>setTimeout(y,35))}for(let r=0;r<Q.length;r++){const m=Q[r],y=ge[m.tipo];try{const l=await Qe.fromGltfAsync({url:o+y,upAxis:be.Y,forwardAxis:be.X,shadows:Ce.ENABLED,color:de(m.tipo)?O.WHITE:O.fromCssColorString(ht[r*3%ht.length]),colorBlendMode:zt.MIX,colorBlendAmount:de(m.tipo)?0:.32});e.scene.primitives.add(l),m.model=l,ue(m)}catch{}r%8===7&&await new Promise(l=>setTimeout(l,30))}})();let lt=!0,Ve=0;const ct=(r,m)=>C(r,m)===0&&C(r+4,m)+C(r-4,m)+C(r,m+4)+C(r,m-4)>.5;return{ready:De,count:t,debug:()=>I.map(r=>[Math.round(r.e),Math.round(r.n),+r.u.toFixed(1),r.model?1:0]),setVisible(r){lt=r;for(const m of I)m.model&&(m.model.show=r);for(const m of Q)m.model&&(m.model.show=r);for(const m of te)m.model&&(m.model.show=r);for(const m of p)m.rig.setVisible(r);S.setVisible(r),E.setVisible(r)},update(r){if(!lt)return;const m=Math.min(.08,Math.max(.001,r));Ve+=m,E.update(Ve);for(const y of p){const l=(Ve+y.faseOffset)%24,i=l<10?"green":l<12?"yellow":"red",u=l>=12&&l<22?"green":l>=22?"yellow":"red";i!==y.nsEstado&&(y.nsEstado=i,y.rig.ns.setState(i)),u!==y.ewEstado&&(y.ewEstado=u,y.rig.ew.setState(u))}for(let y=0;y<I.length;y++){const l=I[y];if(!l.model)continue;let i=0,u=-1e9;for(let D=-4;D<=4;D++){const ne=D*.13,q=l.th+ne,K=l.e+Math.cos(q)*9,ae=l.n+Math.sin(q)*9,pe=C(K,ae);if(pe<1.1||C(l.e+Math.cos(q)*4.5,l.n+Math.sin(q)*4.5)<.9)continue;const Ae=z(K,ae,q);if(Ae<-1e4)continue;const ze=C(K+Math.sin(q)*2.5,ae-Math.cos(q)*2.5),je=C(K-Math.sin(q)*2.5,ae+Math.cos(q)*2.5),Le=-Math.abs(Math.min(pe,6)-$t)-Math.abs(ne)*1.6+(je>=ze?.6:0)+Ae;Le>u&&(u=Le,i=ne)}if(u<-1e8||Math.hypot(l.e+180,l.n-250)>580){Y(l),l.u=A(l.e,l.n),ue(l);continue}const P=Math.cos(l.th),k=Math.sin(l.th);let M=1;const H=l.tipo==="sitp_azul"||l.tipo==="sitp_amarillo",W=H?9.5:6.4,G=H?16.5:12.5;for(let D=0;D<I.length;D++){if(D===y||!I[D].model)continue;const ne=I[D],q=ne.e-l.e,K=ne.n-l.n,ae=q*q+K*K;if(ae>320)continue;const pe=ne.tipo==="sitp_azul"||ne.tipo==="sitp_amarillo",ve=W+(pe?3:0),Ae=G+(pe?3:0),ze=q*P+K*k,je=Math.abs(-q*k+K*P);if(ze>0&&ze<Ae&&je<2.45){const Le=ze<ve?0:(ze-ve)/(Ae-ve);Le<M&&(M=Le)}else ae<(H||pe?42:22)&&D<y&&(M=0)}const V=Math.abs(P)>Math.abs(k);for(const D of p){if((V?D.ewEstado:D.nsEstado)==="green")continue;const q=D.e-l.e,K=D.n-l.n,ae=q*P+K*k,pe=Math.abs(-q*k+K*P);if(ae>7&&ae<21&&pe<9){const ve=ae<10.5?0:(ae-10.5)/10.5;ve<M&&(M=ve)}}const oe=1-Math.min(.55,Math.abs(i)*1.4),J=l.v*oe*M;if(l.vActual+=(J-l.vActual)*Math.min(1,m*4.5),l.vActual>.05){l.th+=Math.max(-1.4*m,Math.min(1.4*m,i));const D=l.e+Math.cos(l.th)*l.vActual*m,ne=l.n+Math.sin(l.th)*l.vActual*m;C(D,ne)>=.7?(l.e=D,l.n=ne):l.th+=.6;const q=Math.max(A(l.e,l.n),A(l.e+Math.cos(l.th)*1.4,l.n+Math.sin(l.th)*1.4),A(l.e-Math.cos(l.th)*1.4,l.n-Math.sin(l.th)*1.4));l.u+=(q-l.u)*Math.min(1,m*8)}ue(l)}for(const y of te){if(!y.model)continue;const l=y.e+Math.cos(y.th)*y.v*m,i=y.n+Math.sin(y.th)*y.v*m;ct(l,i)&&Math.hypot(l+180,i-250)<430?(y.e=l,y.n=i,y.u+=(A(y.e,y.n)+.16-y.u)*Math.min(1,m*4)):y.th+=.9+x()*1.2,ue(y,0)}}}}async function Qt(e,a){try{const t=new Image;t.decoding="async",t.src=e,await t.decode();const o=document.createElement("canvas");o.width=t.naturalWidth,o.height=t.naturalHeight;const n=o.getContext("2d");n.drawImage(t,0,0);const s=n.getImageData(0,0,o.width,o.height);return new Ge({typedArray:new Uint8Array(s.data.buffer),width:o.width,height:o.height,repeat:!0,minificationFilter:wt.LINEAR_MIPMAP_LINEAR,magnificationFilter:bt.LINEAR})}catch{return new Ge({typedArray:new Uint8Array([...a,255]),width:1,height:1})}}function pa(e,a){return new Xe({uniforms:{uNight:{type:_.FLOAT,value:0},uLadrillo:{type:_.SAMPLER_2D,value:e},uTeja:{type:_.SAMPLER_2D,value:a}},varyings:{vRP:le.VEC3,vRN:le.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vRP = vsInput.attributes.positionMC;
        vRN = vsInput.attributes.normalMC;
      }
    `,fragmentShaderText:`
      float rh(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float rn(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(rh(i), rh(i + vec2(1.0, 0.0)), f.x), mix(rh(i + vec2(0.0, 1.0)), rh(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      // foto del material: se conserva su dibujo y parte de su color, llevada al tono real del hotel
      vec3 foto(sampler2D t, vec2 uv, vec3 tono, float croma) {
        vec3 c = czm_srgbToLinear(texture(t, uv).rgb);
        vec3 m = czm_srgbToLinear(textureLod(t, uv, 9.0).rgb);
        float lum = dot(c, vec3(0.3333)) / max(dot(m, vec3(0.3333)), 0.01);
        vec3 tinte = c / max(m, vec3(0.01));
        return tono * mix(vec3(lum), tinte, croma);
      }
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec4 c = fsInput.attributes.color_0;
        float cat = floor(c.a * 255.0 + 0.5);
        vec3 col = czm_srgbToLinear(c.rgb);
        float rough = 0.85;
        vec3 spec = vec3(0.04);
        vec3 n = normalize(vRN);
        float vertical = 1.0 - smoothstep(0.3, 0.7, abs(n.y));
        float big = rn(vRP.xz * 0.12 + vRP.y * 0.2);

        if (cat < 20.0) {
          // fachada: ladrillo a la vista real (foto), con variación de tono por paños
          float along = abs(n.x) > abs(n.z) ? vRP.z : vRP.x;
          vec3 ladr = foto(uLadrillo, vec2(along, vRP.y) / 1.5, vec3(0.34, 0.135, 0.075), 0.75);
          ladr *= 0.88 + 0.24 * big;
          // coronación del muro cortado (planta): pañete claro
          col = mix(vec3(0.62, 0.60, 0.55), ladr, vertical);
          rough = 0.9;
        } else if (cat < 40.0) {
          col = vec3(0.50, 0.49, 0.46) * (0.92 + 0.14 * rn(vRP.xz * 1.2));     // losas: concreto pulido
          rough = 0.7;
        } else if (cat < 60.0) {
          // cubierta: teja de barro real (foto), con las hiladas siguiendo la pendiente
          vec2 baja = length(n.xz) > 0.05 ? normalize(n.xz) : vec2(0.0, 1.0);
          vec2 uv = vec2(dot(vRP.xz, vec2(-baja.y, baja.x)), dot(vRP.xz, baja) / max(abs(n.y), 0.35));
          col = foto(uTeja, uv / 0.75, vec3(0.30, 0.11, 0.055), 0.85) * (0.82 + 0.3 * big);
          // traslapo: cada hilada proyecta sombra sobre la siguiente
          float hil = fract(uv.y / 0.38);
          col *= 0.68 + 0.32 * smoothstep(0.0, 0.35, hil);
          float canalT = abs(fract(uv.x / 0.24) - 0.5) * 2.0;
          col *= 0.84 + 0.16 * (1.0 - canalT * canalT);
          rough = 0.88;
        } else if (cat > 71.0 && cat < 74.0) {
          // perfilería de ventanas: aluminio negro mate
          col = vec3(0.018, 0.018, 0.02);
          rough = 0.45; spec = vec3(0.25);
        } else if (cat < 80.0 || (cat > 100.0 && cat < 120.0)) {
          // vidrio: reflejo del cielo, de las fachadas de enfrente y del interior, con Fresnel real
          vec3 v = normalize(-fsInput.attributes.positionEC);
          vec3 nE = normalize(material.normalEC);
          float cosT = clamp(abs(dot(nE, v)), 0.0, 1.0);
          float fres = 0.04 + 0.96 * pow(1.0 - cosT, 5.0);
          // dirección reflejada en coordenadas del mundo (y = arriba en el modelo)
          vec3 rEC = reflect(-v, nE);
          vec3 rW = normalize((czm_inverseViewRotation * rEC));
          vec3 up = normalize(czm_inverseViewRotation * (czm_view * vec4(0.0, 0.0, 1.0, 0.0)).xyz);
          float alt = dot(rW, normalize(czm_viewerPositionWC));
          // cielo: horizonte claro, cenit azul, nubes suaves
          vec3 cielo = mix(vec3(0.78, 0.83, 0.88), vec3(0.36, 0.52, 0.74), smoothstep(0.0, 0.6, alt));
          float nube = smoothstep(0.55, 0.85, rn(rW.xz / max(alt, 0.08) * 1.6));
          cielo = mix(cielo, vec3(0.92), nube * 0.45 * smoothstep(0.02, 0.3, alt));
          // bajo el horizonte se refleja la ciudad: bandas oscuras de fachadas con ventanas
          float banda = step(0.5, rn(vec2(floor(atan(rW.z, rW.x) * 24.0), 3.0)));
          vec3 ciudad = mix(vec3(0.16, 0.15, 0.15), vec3(0.34, 0.30, 0.27), banda) * (0.8 + 0.4 * rn(floor(vRP.xy * 3.0)));
          vec3 refl = alt > 0.0 ? cielo : mix(ciudad, vec3(0.22, 0.24, 0.24), smoothstep(-0.05, -0.4, alt));
          refl = mix(refl, vec3(0.03, 0.04, 0.07), uNight);
          // interior: penumbra con cortinas claras al fondo
          vec3 interior = mix(vec3(0.035, 0.04, 0.045), vec3(0.20, 0.18, 0.15), rn(floor(vRP.xz * 0.9) + floor(vRP.y / 3.0)) * 0.6);
          interior += vec3(1.0, 0.72, 0.42) * uNight * step(0.45, rn(floor(vRP.xz * 0.7) + floor(vRP.y / 3.0) * 7.0)) * 0.9;
          // leve ondulación del vidrio flotado (los reflejos no son perfectamente planos)
          float onda = (rn(vec2(vRP.y * 2.0, vRP.x + vRP.z)) - 0.5) * 0.06;
          col = mix(interior, refl * (1.0 + onda), clamp(fres + 0.22, 0.0, 1.0));
          rough = 0.02;
          spec = vec3(0.9);
          material.emissive = vec3(0.0);
          material.diffuse = col * 0.35;
          material.roughness = rough;
          material.specular = spec;
          material.emissive = col * 0.65;
          return;
        } else if (cat < 100.0) {
          col = vec3(0.20, 0.11, 0.06) * (0.85 + 0.3 * rn(vec2(vRP.y * 14.0, vRP.x + vRP.z)));  // puertas: madera
          rough = 0.6;
        } else if (cat < 140.0) {
          col = vec3(0.045, 0.047, 0.05);                         // montantes: aluminio anodizado oscuro
          rough = 0.35; spec = vec3(0.35);
        } else if (cat < 160.0) {
          col = vec3(0.028, 0.028, 0.03);                         // barandas: hierro forjado negro, satinado
          rough = 0.3; spec = vec3(0.45);
        } else if (cat > 235.0 && cat < 245.0) {
          // matera de barro cocido, con manchas de humedad
          col = vec3(0.30, 0.12, 0.06) * (0.82 + 0.3 * rn(vRP.xz * 6.0 + vRP.y * 4.0)) * (0.85 + 0.15 * smoothstep(0.0, 0.25, fract(vRP.y)));
          rough = 0.92;
        } else if (cat > 245.0) {
          // hojas: tres tonos de verde con variación por hoja y algo de luz que las atraviesa
          col = czm_srgbToLinear(c.rgb) * (0.75 + 0.5 * rn(floor(vRP.xz * 18.0) + vRP.y * 11.0));
          rough = 0.6;
          spec = vec3(0.06);
          material.diffuse = col * mix(1.0, 0.35, uNight);
          material.roughness = rough;
          material.specular = spec;
          material.emissive = col * 0.28 * (1.0 - uNight);
          return;
        } else {
          col = vec3(0.52, 0.50, 0.47) * (0.92 + 0.14 * rn(vRP.xz * 1.5 + vRP.y)); // columnas, escaleras y vigas: concreto
        }
        material.diffuse = col * mix(1.0, 0.4, uNight);
        material.roughness = rough;
        material.specular = spec;
        material.emissive = col * 0.14 * (1.0 - uNight);
      }
    `})}async function ga(e,a){const t=Oe.secciones;let o;try{o=await fetch(t+"revit.json").then(v=>v.json())}catch{return null}const[n,s]=await Promise.all([Qt(t+"tex_ladrillo.webp",[107,84,76]),Qt(t+"tex_teja.webp",[90,52,28])]),c=pa(n,s),d=[];for(const v of o.niveles)try{const T=await Qe.fromGltfAsync({url:t+v.file,modelMatrix:a,upAxis:be.Y,forwardAxis:be.X,shadows:Ce.ENABLED,backFaceCulling:!1,show:!1});T.customShader=c,T.imageBasedLighting.imageBasedLightingFactor=new He(.45,.25),e.scene.primitives.add(T),d.push({...v,model:T,off:0,alpha:1,anim:null,shown:!1,target:0})}catch(T){console.warn("Nivel de Revit no cargado",v.file,T)}if(!d.length)return null;const g=5.5,h=16,f=new B,b=v=>{const T=B.fromTranslation(new w(0,0,v.off),f);v.model.modelMatrix=B.multiply(a,T,new B);const p=Math.max(0,Math.min(1,v.alpha));v.model.color=p>=.999?void 0:O.WHITE.withAlpha(p),v.model.show=p>.01},C=(v,T,p,S,E)=>{v.anim={o0:v.off,o1:T,a0:v.alpha,a1:p,start:S,dur:E},v.target=T},A=v=>1-Math.pow(1-v,3),L={niveles:d.map(v=>({i:v.i,nombre:v.nombre})),caja:o.caja,bloques:o.bloques??[],huella:o.huella??[],ready:!0,visible:!1,abierto:-1,play(){L.visible=!0,L.abierto=-1;const v=performance.now();d.forEach((T,p)=>{T.off=g,T.alpha=0,b(T),C(T,0,1,v+p*560,900)})},openAt(v){L.visible=!0,L.abierto=v;const T=performance.now();let p=0;for(const S of[...d].reverse())S.i>v&&C(S,h,0,T+p++*90,700);for(const S of d)S.i<=v&&C(S,0,1,T,700)},full(){L.visible=!0,L.abierto=-1;const v=performance.now();d.forEach((T,p)=>{(T.off!==0||T.alpha<1)&&C(T,0,1,v+p*90,800)})},hide(){L.visible=!1,L.abierto=-1;for(const v of d)v.anim=null,v.off=0,v.alpha=0,b(v)},setNight(v){c.setUniform("uNight",v)},update(v,T){if(L.visible)for(const p of d){const S=p.anim;if(!S||T<S.start)continue;const E=Math.min(1,(T-S.start)/S.dur),x=A(E);p.off=S.o0+(S.o1-S.o0)*x,p.alpha=S.a0+(S.a1-S.a0)*Math.min(1,E*1.6),b(p),E>=1&&(p.anim=null)}}};return L}function va(e,a){const t=document.createElement("style");t.textContent=`
    .pisos { position: fixed; left: 20px; top: 318px; z-index: 6; width: 244px; padding: 12px 10px 10px; border-radius: 14px;
      background: rgba(12,16,22,.72); border: 1px solid rgba(255,255,255,.13); backdrop-filter: blur(18px) saturate(140%);
      -webkit-backdrop-filter: blur(18px) saturate(140%); color: #eef2f7; font-family: ui-sans-serif,-apple-system,"Segoe UI",Inter,system-ui,sans-serif;
      display: grid; gap: 3px; }
    .pisos[hidden] { display: none; }
    .pisos small { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: #9dc4ea; padding: 0 6px 6px; }
    .pisos button { all: unset; box-sizing: border-box; width: 100%; padding: 8px 10px; border-radius: 9px; font-size: 12.5px; cursor: pointer;
      display: flex; justify-content: space-between; color: rgba(238,242,247,.72); }
    .pisos button:hover { background: rgba(255,255,255,.08); color: #eef2f7; }
    .pisos button.on { background: #e8eef6; color: #0a0e14; font-weight: 600; }
    .pisos button span { opacity: .6; font-variant-numeric: tabular-nums; }
    @media (max-width: 720px) { .pisos { top: auto; bottom: 250px; left: 12px; right: 12px; width: auto; grid-template-columns: repeat(4, 1fr); }
      .pisos small { grid-column: 1 / -1; } .pisos button span { display: none; } }
  `,document.head.appendChild(t);const o=document.createElement("aside");o.className="pisos",o.hidden=!0,o.innerHTML="<small>Pisos · modelo Revit</small>";const n=new Map,s=(d,g,h)=>{const f=document.createElement("button");f.innerHTML=`${g}<span>${h}</span>`,f.addEventListener("click",()=>a(d)),n.set(d,f),o.appendChild(f)};s(-1,"Edificio completo","");for(const d of[...e.niveles].reverse())s(d.i,d.nombre.charAt(0)+d.nombre.slice(1).toLowerCase(),`N${d.i+1}`);document.body.appendChild(o);const c=d=>n.forEach((g,h)=>g.classList.toggle("on",h===d));return c(-1),{show:d=>{o.hidden=!d},mark:c}}const ft={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function At(e){const a=/^#?([0-9a-f]{6})$/i.exec(e.trim());if(!a)return[1,1,1];const t=parseInt(a[1],16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}const ya=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function xa(e){const a={dia:{...ft.dia},tarde:{...ft.tarde},noche:{...ft.noche}};let t="dia";const o=document.createElement("button");o.id="btnLookStudio",o.className="look-toggle",o.textContent="⚙ Ajustar luz",o.title="Abrir editor de iluminación y color (L)",document.body.appendChild(o);const n=document.createElement("aside");n.id="lookPanel",n.className="look-panel",n.hidden=!0,n.innerHTML=`
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
  `,document.body.appendChild(n);const s=n.querySelector("#lpBody"),c=new Map;for(const b of ya){const C=document.createElement("section");C.className="lp-sec";const A=document.createElement("h4");A.textContent=b.title,C.appendChild(A);for(const L of b.items){const v=document.createElement("label");v.className="lp-row";const T=document.createElement("span");T.className="lp-lbl",T.textContent=L.label,v.appendChild(T);const p=document.createElement("input");p.type=L.type,L.type==="range"&&(p.min=String(L.min),p.max=String(L.max),p.step=String(L.step));const S=L.type==="range"?document.createElement("span"):void 0;S&&(S.className="lp-val"),p.addEventListener("input",()=>{const x=a[t];if(L.type==="range"){const z=parseFloat(p.value);x[L.key]=z,S&&(S.textContent=L.step&&L.step>=1?String(Math.round(z)):z.toFixed(2))}else x[L.key]=p.value;e(t,x)});const E=document.createElement("div");E.className="lp-ctrl",E.appendChild(p),S&&E.appendChild(S),v.appendChild(E),C.appendChild(v),c.set(L.key,{input:p,val:S})}s.appendChild(C)}const d={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function g(){const b=a[t],C=n.querySelector("#lpPresetName");C&&(C.textContent=d[t]);for(const[A,{input:L,val:v}]of c){const T=b[A];if(L.value=String(T),v&&typeof T=="number"){const p=parseFloat(L.step||"0.01");v.textContent=p>=1?String(Math.round(T)):T.toFixed(2)}}}const h=()=>{n.hidden=!n.hidden,o.classList.toggle("on",!n.hidden)};o.addEventListener("click",h),n.querySelector("#lpClose")?.addEventListener("click",h);const f=n.querySelector("#lpCopy");return f.addEventListener("click",async()=>{const b=JSON.stringify({active:t,presets:a},null,2);try{await navigator.clipboard.writeText(b),f.textContent="¡JSON copiado!",setTimeout(()=>f.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",b)}}),n.querySelector("#lpReset")?.addEventListener("click",()=>{a[t]={...ft[t]},g(),e(t,a[t])}),addEventListener("keydown",b=>{b.code==="KeyL"&&!b.ctrlKey&&!b.metaKey&&!b.altKey&&h()}),g(),{setActivePreset(b){t=b,g()},getPreset(b){return a[b]},toggle:h}}const ba={natural:{nombre:"Natural",o:{exposure:1.04,contrast:.2,saturation:1.05,tintColor:"#ffffff",vignette:.18,shadowDarkness:.45,bloomBrightness:-.6}},calido:{nombre:"Cálido",o:{exposure:1.06,contrast:.24,saturation:1.14,tintColor:"#fff0dc",vignette:.25,shadowDarkness:.42,bloomBrightness:-.5},sol:1.05},claro:{nombre:"Render claro",o:{exposure:1.16,contrast:.1,saturation:.96,tintColor:"#fbfcff",vignette:.08,shadowDarkness:.28,bloomBrightness:-.7}},cine:{nombre:"Cinematográfico",o:{exposure:.98,contrast:.42,saturation:.86,tintColor:"#f3ece3",vignette:.55,shadowDarkness:.5,bloomBrightness:-.45}},dramatico:{nombre:"Dramático",o:{exposure:.94,contrast:.55,saturation:1.1,tintColor:"#fff6ec",vignette:.62,shadowDarkness:.62,bloomBrightness:-.4},sol:1.12}};function wa(e,a,t){if(a==="panel")return e;const o=ba[a],n={...e,...o.o};return n.exposure=e.exposure+((o.o.exposure??e.exposure)-e.exposure)*(1-t),n.sunIntensity=e.sunIntensity*(o.sol??1),n}const eo=4.7*Math.PI/180,Ca="2026-11-16",to=-18.6*Math.PI/180,go=11.68;function Ma(e){const a=(e-go)*15*Math.PI/180,t=Math.sin(eo)*Math.sin(to)+Math.cos(eo)*Math.cos(to)*Math.cos(a);return Math.asin(t)*180/Math.PI}const oo=(e,a,t)=>{const o=Math.max(0,Math.min(1,(t-e)/(a-e)));return o*o*(3-2*o)},ao=e=>[1,3,5].map(a=>parseInt(e.slice(a,a+2),16)),ka=e=>"#"+e.map(a=>Math.round(Math.max(0,Math.min(255,a))).toString(16).padStart(2,"0")).join(""),Ke=(e,a,t)=>{const o=ao(e),n=ao(a);return ka(o.map((s,c)=>s+(n[c]-s)*t))};function io(e,a,t){const o={...e};for(const n of Object.keys(e)){const s=e[n],c=a[n];o[n]=typeof s=="number"&&typeof c=="number"?s+(c-s)*t:typeof s=="string"&&typeof c=="string"&&s.startsWith("#")?Ke(s,c,t):t<.5?s:c}return o}function Sa(e,a,t,o,n){const s=Ma(e),c=oo(2,-7,s),d=oo(26,6,s)*(1-c);let g=io(t,o,d);g=io(g,n,c),e<go&&(g={...g,sunColor:Ke(g.sunColor,"#fff1e2",.35*(1-c))});const h=a==="nublado"?1:a==="lluvia"?1.35:0;if(h){const A=Math.min(1,h);g={...g,sunIntensity:g.sunIntensity*(1-.68*A-(a==="lluvia"?.12:0)),shadowDarkness:g.shadowDarkness*(1-.6*A),cloudDensity:Math.max(g.cloudDensity,a==="lluvia"?1:.96),saturation:g.saturation*(1-.22*A),exposure:g.exposure*(1-(a==="lluvia"?.14:.06)),contrast:g.contrast*(1-.35*A),skyZenith:Ke(g.skyZenith,a==="lluvia"?"#5d636a":"#8a9097",.85*(1-c)),skyHorizon:Ke(g.skyHorizon,a==="lluvia"?"#868c93":"#b3b7bd",.85*(1-c)),sunColor:Ke(g.sunColor,"#dfe4ea",.6*A),hazeAmount:g.hazeAmount+(a==="lluvia"?.22:.1),hazeStart:g.hazeStart*(a==="lluvia"?.45:.7),bloomBrightness:g.bloomBrightness-.2}}const f=Math.floor(e),b=Math.floor((e-f)*60),C=fo.fromIso8601(`${Ca}T${String(f).padStart(2,"0")}:${String(b).padStart(2,"0")}:00-05:00`);return{look:g,night:c,tarde:d,fecha:C,lluvia:a==="lluvia"?1:0,etiqueta:`${String(f).padStart(2,"0")}:${String(b).padStart(2,"0")}`}}function za(){return new Dt({name:"hlf_lluvia",uniforms:{uRain:0,uTime:0},fragmentShader:`
      uniform sampler2D colorTexture;
      uniform float uRain;
      uniform float uTime;
      in vec2 v_textureCoordinates;
      float h11(float n) { return fract(sin(n * 127.1) * 43758.5453); }
      float capa(vec2 uv, float esc, float vel, float sem) {
        vec2 p = uv * vec2(esc, esc * 0.18);
        p.x += p.y * 0.12;                      // viento
        p.y += uTime * vel;
        float col = floor(p.x);
        float r = h11(col + sem);
        float y = fract(p.y + r * 7.0);
        float gota = smoothstep(0.0, 0.05, y) * (1.0 - smoothstep(0.05, 0.42, y));
        float ancho = 1.0 - smoothstep(0.0, 0.07, abs(fract(p.x) - 0.5));
        return gota * ancho * step(0.55, r);
      }
      void main() {
        vec4 c = texture(colorTexture, v_textureCoordinates);
        if (uRain <= 0.0) { out_FragColor = c; return; }
        vec2 uv = v_textureCoordinates;
        float v = capa(uv, 220.0, 1.6, 1.0) * 0.55 + capa(uv, 140.0, 1.2, 9.0) * 0.4 + capa(uv, 90.0, 0.9, 17.0) * 0.3;
        vec3 col = c.rgb * mix(1.0, 0.86, uRain);
        col = mix(col, vec3(0.80, 0.84, 0.88), clamp(v * 0.45 * uRain, 0.0, 0.45));
        out_FragColor = vec4(col, c.a);
      }
    `})}function Ta(e){const a=document.createElement("style");a.textContent=`
    .tiempo { position: fixed; left: 50%; transform: translateX(-50%); bottom: 82px; z-index: 6; display: flex; align-items: center; gap: 10px;
      padding: 8px 12px; border-radius: 14px; background: rgba(12,16,22,.62); border: 1px solid rgba(255,255,255,.13);
      backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%); color: #eef2f7;
      font: 500 12px ui-sans-serif,-apple-system,"Segoe UI",Inter,system-ui,sans-serif; width: min(820px, calc(100vw - 24px)); }
    .tiempo button { all: unset; cursor: pointer; padding: 6px 10px; border-radius: 9px; color: rgba(238,242,247,.75); white-space: nowrap; }
    .tiempo button:hover { background: rgba(255,255,255,.08); color: #fff; }
    .tiempo button.on { background: #e8eef6; color: #0a0e14; font-weight: 600; }
    .tiempo .play { width: 26px; text-align: center; font-size: 13px; }
    .tiempo input[type=range] { flex: 1; min-width: 80px; accent-color: #f2c48a; }
    .tiempo .h { font-variant-numeric: tabular-nums; min-width: 40px; text-align: right; font-weight: 600; }
    .tiempo select { background: rgba(255,255,255,.08); color: #eef2f7; border: 1px solid rgba(255,255,255,.16); border-radius: 9px; padding: 5px 8px; font: inherit; }
    .tiempo select option { color: #111; }
    .tiempo .sep { width: 1px; height: 18px; background: rgba(255,255,255,.14); }
    @media (max-width: 720px) { .tiempo { bottom: 74px; flex-wrap: wrap; } }
  `,document.head.appendChild(a);const t=document.createElement("div");t.className="tiempo",t.innerHTML=`
    <button class="play" title="Reproducir el paso del día">❚❚</button>
    <input type="range" min="5" max="21" step="0.05" aria-label="Hora del día">
    <span class="h">10:10</span>
    <span class="sep"></span>
    <button data-clima="sol" class="on" title="Día soleado">☀ Soleado</button>
    <button data-clima="nublado" title="Cielo nublado">☁ Nublado</button>
    <button data-clima="lluvia" title="Lluvia">☂ Lluvia</button>
    <span class="sep"></span>
    <select aria-label="Filtro de imagen" title="Filtro de imagen">
      <option value="natural" selected>Natural</option>
      <option value="calido">Cálido</option>
      <option value="claro">Render claro</option>
      <option value="cine">Cinematográfico</option>
      <option value="dramatico">Dramático</option>
      <option value="panel">Ajuste manual</option>
    </select>`,document.body.appendChild(t);const o=t.querySelector("input"),n=t.querySelector(".h"),s=t.querySelector(".play"),c=t.querySelector("select");c.addEventListener("change",()=>e.onFiltro(c.value)),o.value=String(e.hora),o.addEventListener("input",()=>e.onHora(Number(o.value)));let d=!0;return s.addEventListener("click",()=>{d=!d,s.textContent=d?"❚❚":"▶",e.onPlay(d)}),t.querySelectorAll("[data-clima]").forEach(g=>g.addEventListener("click",()=>{t.querySelectorAll("[data-clima]").forEach(h=>h.classList.toggle("on",h===g)),e.onClima(g.dataset.clima)})),{setHora(g,h){document.activeElement!==o&&(o.value=String(g)),n.textContent=h},setPlay(g){d=g,s.textContent=g?"❚❚":"▶"}}}jo.defaultAccessToken=Oe.ionToken;const j=e=>document.getElementById(e),Ut=j("cesiumContainer"),no=j("loading"),Pa=j("loadBar"),vo=j("loadLabel"),Ea=j("loadPct");function Re(e,a){vo.textContent=e;const t=Math.round(Math.max(0,Math.min(1,a))*100);Pa.style.width=t+"%",Ea.textContent=t+"%"}const $=new No(Ut,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:Ce.RECEIVE_ONLY,terrain:Oo.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Do.fromProviderAsync(ho.fromAssetId(Oe.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),F=$.scene;F.globe.enableLighting=!0;F.globe.showGroundAtmosphere=!0;F.globe.depthTestAgainstTerrain=!0;F.globe.maximumScreenSpaceError=2;F.fog.enabled=!1;F.fog.density=18e-5;F.fog.minimumBrightness=.04;F.highDynamicRange=!0;F.msaaSamples=4;F.postProcessStages.fxaa.enabled=!0;F.screenSpaceCameraController.enableCollisionDetection=!1;F.light=new Uo({intensity:3,color:O.fromCssColorString("#fff4e3")});const Te=$.shadowMap;Te.softShadows=!0;Te.size=4096;Te.maximumDistance=1200;Te.darkness=.24;Te.normalOffset=!0;{const e=Te;e._primitiveBias.depthBias=8e-4,e._primitiveBias.normalOffsetScale=1.6,e._primitiveBias.normalShadingSmooth=.35}const Fe=F.postProcessStages.ambientOcclusion;Fe.enabled=!0;Fe.uniforms.intensity=2.1;Fe.uniforms.bias=.08;Fe.uniforms.lengthCap=.35;Fe.uniforms.stepSize=1.4;Fe.uniforms.blurStepSize=1;const Pe=F.postProcessStages.bloom;Pe.enabled=!0;Pe.uniforms.glowOnly=!1;Pe.uniforms.contrast=128;Pe.uniforms.brightness=-.36;Pe.uniforms.delta=1;Pe.uniforms.sigma=2.6;Pe.uniforms.stepSize=1.5;const Aa=Ot(),Lt=e=>{const a=B.getColumn(Aa,e,new Ye);return new w(a.x,a.y,a.z)},Me=ea(Lt(0),Lt(1),Lt(2));F.postProcessStages.add(Me);const we=ta();F.postProcessStages.add(we);$.camera.frustum.fov=uo.toRadians(48);const so=(()=>{try{const e=F.context._gl,a=e.getExtension("WEBGL_debug_renderer_info");return a?String(e.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),La=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(so)&&!/Arc/i.test(so);let R=null,ie=La||matchMedia("(pointer: coarse)").matches?.5:1;function st(){const e=Math.min(window.devicePixelRatio||1,2);$.resolutionScale=e*(ie>=1?1:ie>=.5?.8:.62),Te.size=ie>=1?4096:ie>=.5?2048:1024,Te.softShadows=ie>=.5,Fe.enabled=ie>=1,Pe.enabled=ie>=.5,F.msaaSamples=ie>=1?4:1,$.shadows=ie>=.5,R?.tileset&&(R.tileset.maximumScreenSpaceError=ie>=1?8:ie>=.5?12:20)}st();$.clock.shouldAnimate=!1;$.clock.currentTime=fo.fromIso8601("2026-06-21T16:50:00-05:00");const U=new Zo($),Ct=e=>ce(Pt[e].e,Pt[e].n,Pt[e].u),Ra=Ct("hotel");U.flyTo({pivot:Ra,heading:vt.general.heading,pitch:vt.general.pitch,range:vt.general.range*1.8},0);U.groundHeight=e=>F.globe.getHeight(e);const _a=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let he=.04,Ie=1;function Mt(e){F.light.intensity=e.sunIntensity,F.light.color=O.fromCssColorString(e.sunColor),Te.darkness=e.shadowDarkness,Fe.uniforms.intensity=e.aoIntensity,Pe.uniforms.brightness=e.bloomBrightness,we.uniforms.uExposure=e.exposure,we.uniforms.uContrast=e.contrast,we.uniforms.uSaturation=e.saturation;const[a,t,o]=At(e.tintColor);we.uniforms.uTint=new w(a,t,o),we.uniforms.uVignette=e.vignette;const[n,s,c]=At(e.skyZenith);Me.uniforms.uSkyZenith=new w(n,s,c);const[d,g,h]=At(e.skyHorizon);Me.uniforms.uSkyHorizon=new w(d,g,h),Me.uniforms.uCloudDensity=e.cloudDensity,Me.uniforms.uCloudSpeed=e.cloudSpeed,R?.setLook({skyFill:e.skyFill,groundFill:e.groundFill,hazeAmount:e.hazeAmount,hazeStart:e.hazeStart})}const tt=xa((e,a)=>Mt(a));Mt(tt.getPreset("dia"));Me.uniforms.uNight=he;Me.uniforms.uTarde=Ie;we.uniforms.uNight=he;we.uniforms.uTarde=Ie;F.skyAtmosphere&&(F.skyAtmosphere.hueShift=0,F.skyAtmosphere.saturationShift=.08,F.skyAtmosphere.brightnessShift=-.04);const Ia={dia:10.17,tarde:16.83,noche:19.58};let fe=10.17,$e="sol",yo="natural",it=!1,_e=null,ot=-1;const xo=F.postProcessStages.add(za()),kt=Ta({hora:fe,onHora:e=>{fe=e,_e=null,it=!1,kt.setPlay(!1)},onClima:e=>{$e=e,ot=-1},onPlay:e=>{it=e},onFiltro:e=>{yo=e,ot=-1}});function Ha(){const e=Sa(fe,$e,tt.getPreset("dia"),tt.getPreset("tarde"),tt.getPreset("noche"));$.clock.currentTime=e.fecha,Mt(wa(e.look,yo,e.night)),he=e.night,Ie=e.tarde,R?.setNight(he),R?.setTarde(Ie),X?.setNight(he),Me.uniforms.uNight=he,Me.uniforms.uTarde=Ie,we.uniforms.uNight=he,we.uniforms.uTarde=Ie,xo.uniforms.uRain=e.lluvia,F.skyAtmosphere&&(F.skyAtmosphere.brightnessShift=-.55*he-($e==="lluvia"?.2:$e==="nublado"?.08:0),F.skyAtmosphere.saturationShift=.06-.3*he-($e==="sol"?0:.35));const a=j("clockLabel");a&&(a.textContent=e.etiqueta),kt.setHora(fe,e.etiqueta);const t=he>.5?"noche":Ie>.5?"tarde":"dia";document.querySelectorAll("[data-light]").forEach(o=>o.classList.toggle("on",o.dataset.light===t))}function Fa(e){it=!1,kt.setPlay(!1),_e={from:fe,to:Ia[e.id]??fe,start:performance.now()}}document.querySelectorAll("[data-light]").forEach(e=>{e.addEventListener("click",()=>{const a=_a.find(t=>t.id===e.dataset.light);a&&Fa(a)})});let qe=!1;const Ft=j("btnOrbit"),Bt=j("btnPedestrian");function ke(){qe=!1,Ft?.classList.remove("on")}function rt(e,a=2){ke();const t=vt[e];U.flyTo({pivot:Ct(t.place),heading:t.heading,pitch:t.pitch,range:t.range},a)}j("btnHome")?.addEventListener("click",()=>rt("general",2.2));j("btnAerial")?.addEventListener("click",()=>rt("aerial"));j("btnArch")?.addEventListener("click",()=>rt("arch"));Bt?.addEventListener("click",()=>{ke(),U.isWalking?U.exitWalk():U.enterWalk(re?wo(re):void 0)});U.onModeChange=e=>{Bt?.classList.toggle("on",e);const a=j("hint");a&&e&&(a.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",a.classList.remove("fade"),setTimeout(()=>a.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(e=>{e.addEventListener("click",()=>{ke();const a=e.dataset.place;if(a==="hotel"&&R){const t=R.buildings.find(o=>o.s==="Hotel");if(t){Be(null),Be(t);return}}U.flyTo({pivot:Ct(a),range:a==="hotel"?300:520,pitch:-.5},2)})});Ft?.addEventListener("click",()=>{qe=!qe,Ft.classList.toggle("on",qe),qe&&U.isWalking&&U.exitWalk()});Ut.addEventListener("pointerdown",ke);Ut.addEventListener("wheel",ke,{passive:!0});addEventListener("keydown",e=>{e.code==="Escape"&&(U.isWalking?U.exitWalk():Be(null)),(e.code==="KeyH"||e.code==="Home")&&rt("general",2.2),e.code==="KeyP"&&Bt?.click()});let re=null,at=null;const Na=9;let yt=null,X=null,Ue=null,Nt=!1,ro=!1;async function Da(){if(ro||(ro=!0,await xt(),!R||!X))return;ke();const e=X.caja,a={e:-110,n:150,u:10,h:-.75,p:-.62,r:1750},t={e:-175,n:235,u:10,h:-.05,p:-.5,r:640},o={e:(e[0]+e[2])/2,n:(e[1]+e[3])/2,u:12,h:.55,p:-.4,r:230},n=10500;let s=!1;await new Promise(c=>{const d=performance.now(),g=()=>{const h=Math.min(1,(performance.now()-d)/n),f=h*h*h*(h*(h*6-15)+10),b=A=>(1-f)*(1-f)*a[A]+2*(1-f)*f*t[A]+f*f*o[A],C=(1-f)*(1-f)*Math.log(a.r)+2*(1-f)*f*Math.log(t.r)+f*f*Math.log(o.r);U.flyTo({pivot:ce(b("e"),b("n"),b("u")),heading:b("h"),pitch:b("p"),range:Math.exp(C)},0),!s&&h>.62&&(s=!0,Oa()),h<1?requestAnimationFrame(g):c()};requestAnimationFrame(g)}),R?.startBackground(),it=!0,kt.setPlay(!0)}function Oa(){if(!R)return;const e=R.buildings.find(t=>t.s==="Hotel"),a=U.flyTo.bind(U);U.flyTo=()=>{};try{e?Be(e):St()}finally{U.flyTo=a}}let mt=null;function xt(){return mt||(mt=(async()=>{R&&(X=await ga($,R.matrix),X&&(X.setNight(he),Ue=va(X,e=>{if(!X)return;ke(),Ue?.mark(e),e<0?X.full():X.openAt(e);const a=X.caja;U.flyTo({pivot:ce((a[0]+a[2])/2,(a[1]+a[3])/2,12),pitch:e<0?-.42:-.95,range:e<0?230:150},1.4)}),Nt&&(Nt=!1,St(),xe&&($.entities.remove(xe),xe=null))))})(),mt)}function St(){!R||!X||(R.setRevitBlocks(X.bloques,X.huella),X.play(),Ue?.mark(-1),Ue?.show(!0))}function bo(){R&&(yt={start:performance.now()},R.setHotelFloors(0))}let xe=null;const pt=j("card");function Ua(e){return ce((e.bb[0]+e.bb[2])/2,(e.bb[1]+e.bb[3])/2,e.b+e.h*.5)}function wo(e){return ce((e.bb[0]+e.bb[2])/2,e.bb[1]-9,e.b)}function Be(e){const a=re?.s==="Hotel";if(re=e,xe&&($.entities.remove(xe),xe=null),!e||!R){pt&&(pt.hidden=!0),Ue?.show(!1);return}if(e.s!=="Hotel"?Ue?.show(!1):X?.visible&&Ue?.show(!0),e.s!=="Hotel"){const h=e.r.map(([b,C])=>ce(b,C,0,R.matrix)),f=2572+e.b-.5;xe=$.entities.add({polygon:{hierarchy:new Vo(h),height:f,extrudedHeight:f+e.h+2.2,material:O.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:O.fromCssColorString("#d7ebff"),shadows:Ce.DISABLED}})}const t=e.s==="Hotel";if(t&&!a){X?(St(),xe&&($.entities.remove(xe),xe=null)):(Nt=!0,xt(),bo()),ke();const h=X?.caja;U.flyTo(h?{pivot:ce((h[0]+h[2])/2,(h[1]+h[3])/2,12),heading:.55,pitch:-.4,range:230}:{pivot:Ct("hotel"),pitch:-.38,range:290},1.8)}const o=t&&R?R.buildings.filter(h=>h.s==="Hotel"):[e],n=h=>Math.abs(h.r.reduce((f,b,C)=>{const A=h.r[(C+1)%h.r.length];return f+b[0]*A[1]-A[0]*b[1]},0)/2),s=o.reduce((h,f)=>h+n(f),0),c=o.reduce((h,f)=>h+n(f)*f.p,0),d=Math.max(...o.map(h=>h.p)),g=Math.max(...o.map(h=>h.h));Math.abs(e.r.reduce((h,f,b)=>{const C=e.r[(b+1)%e.r.length];return h+f[0]*C[1]-C[0]*f[1]},0)/2),j("cardKind").textContent=t?"Proyecto":`Sector ${e.s}`,j("cardTitle").textContent=t?"Hotel La Fontana":`Edificación ${e.id+1}`,j("cardData").innerHTML=`<dt>Pisos</dt><dd>${t?"hasta "+d:e.p}</dd><dt>Altura</dt><dd>${g.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(s).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(c).toLocaleString("es-CO")} m²</dd>`,pt&&(pt.hidden=!1)}U.onPick=e=>{R&&Be(e?R.buildingAt(e):null)};j("cardClose")?.addEventListener("click",()=>Be(null));j("cardFocus")?.addEventListener("click",()=>{if(!re)return;ke();const e=Math.max(re.bb[2]-re.bb[0],re.bb[3]-re.bb[1],re.h);U.flyTo({pivot:Ua(re),pitch:-.42,range:Math.max(60,e*2.1)},1.7)});j("cardWalk")?.addEventListener("click",()=>{re&&(ke(),U.enterWalk(wo(re)))});const Rt=j("status"),lo=j("statusText");async function Ba(e=25e3){const a=performance.now()+e;let t=0;for(;performance.now()<a;){const o=F.globe.tilesLoaded,n=!R?.tileset||R.tileset.tilesLoaded;if(o&&n){if(t||(t=performance.now()),performance.now()-t>=600)break}else t=0;await new Promise(s=>setTimeout(s,150))}for(let o=0;o<8;o++)await new Promise(n=>requestAnimationFrame(n))}async function Va(){Re("Cargando el modelo del hotel...",.05),await new Promise(o=>setTimeout(o,30)),R=await ra($,(o,n)=>Re(o,.05+n*.2),(o,n,s)=>{Re(`Cargando secciones (${o}/${n}) · ${s}`,.25+o/Math.max(1,n)*.45),!(!Rt||!lo)&&(Rt.hidden=!1,lo.textContent=o<n?`Cargando secciones ${o}/${n} · ${s}`:`Modelo completo · ${n} secciones`,o>=n&&setTimeout(()=>Rt.classList.add("fade"),2600))}),R.setNight(he),R.setTarde(Ie),xt();const e=document.querySelector("[data-light].on")?.dataset.light||"dia";Mt(tt.getPreset(e)),st(),rt("general",0),U.flyTo({pivot:ce(-110,150,10),heading:-.75,pitch:-.62,range:1750},0),R.startBackground(),Re("Preparando el Hotel La Fontana...",.55),await xt(),Re("Cargando la ciudad y la vegetación...",.7),await R.done,Re("Cargando tráfico y parqueaderos...",.85),at=await ma($,R.matrix),at&&await at.ready,window.__ALL__=!0,Re("Renderizando...",.94),await Ba(12e3),Re("Listo",1);const a=j("btnEntrar");a&&(a.disabled=!1,a.textContent="Entrar",await new Promise(o=>a.addEventListener("click",()=>o(),{once:!0}))),no.classList.add("done"),Da(),setTimeout(()=>no.remove(),900);const t=j("hint");t&&setTimeout(()=>t.classList.add("fade"),9e3),window.__READY__=!0}const se={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Bo,viewer:$,cam:U,getSite:()=>R,enuToWorld:ce,select:Be,stats:se,playHotel:bo,playRevit:St,getRevit:()=>X,getTrafico:()=>at,setQuality:e=>{ie=e,st()}};Va().catch(e=>{console.error(e),vo.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(e?.message??e)});let co=performance.now(),_t=0;function Co(){const e=performance.now(),a=Math.min(.1,(e-co)/1e3);if(co=e,_e){const o=Math.min(1,(e-_e.start)/1800),n=o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2;fe=_e.from+(_e.to-_e.from)*n,o>=1&&(_e=null)}else it&&(fe+=a/7,fe>20.6&&(fe=5.6));if((Math.abs(fe-ot)>.004||ot<0)&&(ot=fe,Ha()),xo.uniforms.uTime=e*.001,yt&&R){const o=(e-yt.start)/550,n=Math.floor(o),s=o-n,c=1-Math.pow(1-Math.min(1,s*1.6),3);n>=Na?(R.setHotelFloors(99),yt=null):R.setHotelFloors(n+c)}X?.update(a,e),at?.update(a);const t=e*.001;if(R?.setTime(t),Me.uniforms.uTime=t,qe&&!U.isWalking&&U.flyTo({heading:U.state.heading+.16*a},0),U.update(a),se.frames++,e-se.t0>=2e3){se.fps=Math.round(se.frames*1e3/(e-se.t0)),se.frames=0,se.t0=e,window.__FPS__=se.fps;const o=!!R&&R.sections.loaded>=R.sections.total&&e-_t>8e3;R&&R.sections.loaded>=R.sections.total&&!_t&&(_t=e),o&&document.visibilityState==="visible"&&(se.fps<20&&ie>.25&&!window.__DBG__.lock?++se.low>=3&&(ie=ie>=1?.5:.25,se.low=0,st()):se.low=0)}requestAnimationFrame(Co)}requestAnimationFrame(Co);addEventListener("resize",st);
