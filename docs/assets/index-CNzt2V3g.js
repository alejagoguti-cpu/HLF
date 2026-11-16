var $t=Object.defineProperty;var Qt=(t,a,e)=>a in t?$t(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e;var H=(t,a,e)=>Qt(t,typeof a!="symbol"?a+"":a,e);import{C as x,a as jt,T as yt,M as B,b as ze,c as Be,H as eo,P as Wt,d as Ye,L as to,U as L,V as fe,e as He,f as Ne,g as it,h as nt,i as Pt,j as oo,S as ye,I as qt,k as ao,R as io,l as Ve,A as pe,m as N,n as Lt,o as no,p as so,q as ro,r as je,s as Rt,t as xt,G as lo,B as co,u as dt,v as uo,w as fo,x as ho,y as mo,J as qe,z as po,D as go,E as vo}from"./cesium-j17Lq24u.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const ut="/HLF/",yo=ut.endsWith("/")?ut:ut+"/",xo=yo+"cesium/";window.CESIUM_BASE_URL=xo;const et={longitude:-74.04145021,latitude:4.70207636,height:2572},ft={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},tt={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Pe={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},bo=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,It=-1.5533,_t=-.012,wo=4200,Co=6,Ft=1.7;class Mo{constructor(a){H(this,"viewer");H(this,"canvas");H(this,"pivot",new x);H(this,"heading",.5);H(this,"pitch",-.6);H(this,"range",1200);H(this,"targetPivot",new x);H(this,"targetHeading",.5);H(this,"targetPitch",-.6);H(this,"targetRange",1200);H(this,"damping",9);H(this,"drag",null);H(this,"pointers",new Map);H(this,"pinch",null);H(this,"lastTap",0);H(this,"keys",new Set);H(this,"tween",null);H(this,"fov",jt.toRadians(48));H(this,"walking",!1);H(this,"eye",new x);H(this,"eyeTarget",new x);H(this,"wHeading",0);H(this,"wPitch",0);H(this,"wHeadingT",0);H(this,"wPitchT",0);H(this,"onPick",null);H(this,"onModeChange",null);H(this,"groundHeight",null);this.viewer=a,this.canvas=a.scene.canvas,a.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:x.clone(this.targetPivot)}}setPivot(a,e=!0){if(e){const o=x.clone(this.viewer.camera.positionWC),i=x.subtract(o,a,new x),r=x.magnitude(i),h=yt.eastNorthUpToFixedFrame(a),d=B.inverseTransformation(h,new B),b=B.multiplyByPointAsVector(d,i,new x);if(r>1){const w=-Math.asin(Math.max(-1,Math.min(1,b.z/r)));if(w<_t&&w>It){let y=Math.atan2(-b.x,-b.y);for(;y-this.heading>Math.PI;)y-=Math.PI*2;for(;y-this.heading<-Math.PI;)y+=Math.PI*2;this.heading=this.targetHeading=y,this.pitch=this.targetPitch=w,this.range=this.targetRange=this.clamp(r),x.clone(a,this.pivot)}}}this.targetPivot=x.clone(a),this.tween=null}bind(){const a=this.canvas;a.style.touchAction="none",a.addEventListener("pointerdown",o=>{if(a.setPointerCapture(o.pointerId),this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2){const[i,r]=[...this.pointers.values()];this.pinch={distance:Math.hypot(i.x-r.x,i.y-r.y),range:this.targetRange,cx:(i.x+r.x)/2,cy:(i.y+r.y)/2},this.drag=null;return}o.button===2||o.button===1||o.shiftKey?this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"pan",moved:!1}:o.button===0&&(this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"orbit",moved:!1}),this.tween=null}),a.addEventListener("pointermove",o=>{if(!this.pointers.has(o.pointerId))return;if(this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2&&this.pinch){const[h,d]=[...this.pointers.values()],b=Math.hypot(h.x-d.x,h.y-d.y),w=(h.x+d.x)/2,y=(h.y+d.y)/2;this.walking?this.walk((this.pinch.cy-y)*.06,0):(b>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/b)),this.pan(this.pinch.cx-w,y-this.pinch.cy)),this.pinch.cx=w,this.pinch.cy=y;return}if(!this.drag||o.pointerId!==this.drag.id)return;const i=o.offsetX-this.drag.x,r=o.offsetY-this.drag.y;this.drag.x=o.offsetX,this.drag.y=o.offsetY,Math.abs(i)+Math.abs(r)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=i*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+r*.0028))):this.walk(r*.05,-i*.05):this.drag.mode==="orbit"?(this.targetHeading-=i*.0042,this.targetPitch=this.clampPitch(this.targetPitch-r*.0034)):this.pan(-i,r)});const e=o=>{if(this.pointers.delete(o.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&o.pointerId===this.drag.id){const i=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,i&&o.type==="pointerup"){const r=new ze(o.offsetX,o.offsetY),h=performance.now();if(o.pointerType!=="mouse"&&h-this.lastTap<320){this.lastTap=0,this.focusAt(r);return}this.lastTap=h;const d=this.pickWorld(r);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};a.addEventListener("pointerup",e),a.addEventListener("pointercancel",e),a.addEventListener("contextmenu",o=>o.preventDefault()),a.addEventListener("wheel",o=>{o.preventDefault(),this.tween=null;const i=o.deltaMode===1?16:o.deltaMode===2?100:1,r=o.deltaY*i;if(this.walking){this.walk(-r*.02,0);return}const h=Math.exp(Math.max(-.45,Math.min(.45,r*.0016))),d=this.pickWorld(new ze(o.offsetX,o.offsetY)),b=this.clamp(this.targetRange*h);if(d&&h<1){const w=Math.min(.45,(this.targetRange-b)/this.targetRange)*.8,y=x.subtract(d,this.targetPivot,new x),m=x.magnitude(y);if(m>1){const f=Math.min(m,this.targetRange)*w/m;x.add(this.targetPivot,x.multiplyByScalar(y,f,y),this.targetPivot)}}this.targetRange=b},{passive:!1}),a.addEventListener("dblclick",o=>{o.preventDefault(),this.focusAt(new ze(o.offsetX,o.offsetY))}),addEventListener("keydown",o=>{o.target instanceof HTMLInputElement||(this.keys.add(o.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(o.code)&&o.preventDefault())}),addEventListener("keyup",o=>this.keys.delete(o.code)),addEventListener("blur",()=>this.keys.clear())}clamp(a,e=Co,o=wo){return Math.max(e,Math.min(o,a))}clampPitch(a){return Math.max(It,Math.min(_t,a))}moveHorizontal(a,e,o,i){const r=yt.eastNorthUpToFixedFrame(a),h=new x(Math.sin(e)*o+Math.cos(e)*i,Math.cos(e)*o-Math.sin(e)*i,0);B.multiplyByPoint(r,h,a)}pan(a,e){const o=this.canvas.clientHeight||1,i=2*this.range*Math.tan(this.fov/2)/o,r=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,e*i/r,a*i),this.tween=null}walk(a,e){this.moveHorizontal(this.eyeTarget,this.wHeading,a,e),this.snapEye()}snapEye(){const a=Be.fromCartesian(this.eyeTarget),e=this.groundHeight?.(a);e!==void 0&&Number.isFinite(e)&&(a.height=e+Ft,Be.toCartesian(a,void 0,this.eyeTarget))}pickWorld(a){const e=this.viewer.scene;let o;if(e.pickPositionSupported&&e.pick(a,4,4)&&(o=e.pickPosition(a)),!o){const i=e.camera.getPickRay(a);i&&(o=e.globe.pick(i,e)??void 0)}return o??null}focusAt(a){const e=this.pickWorld(a);if(e){if(this.walking){x.clone(e,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:e,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(a,e=2){this.walking&&this.exitWalk(!1);const o={pivot:a.pivot??x.clone(this.targetPivot),heading:a.heading??this.targetHeading,pitch:a.pitch??this.targetPitch,range:a.range??this.targetRange};let i=o.heading;for(;i-this.targetHeading>Math.PI;)i-=Math.PI*2;for(;i-this.targetHeading<-Math.PI;)i+=Math.PI*2;if(o.heading=i,e<=.02){this.tween=null,this.targetPivot=x.clone(o.pivot),this.pivot=x.clone(o.pivot),this.heading=this.targetHeading=o.heading,this.pitch=this.targetPitch=o.pitch,this.range=this.targetRange=o.range;return}this.tween={from:{pivot:x.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:o,start:performance.now(),duration:e*1e3}}enterWalk(a){x.clone(a??this.targetPivot,this.eyeTarget),this.snapEye(),x.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(a=!0){if(!this.walking)return;this.walking=!1;const e=Be.fromCartesian(this.eyeTarget);e.height-=Ft-1;const o=Be.toCartesian(e);this.pivot=x.clone(o),this.targetPivot=o,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,a?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(a){if(!this.keys.size)return;const e=this.keys,o=e.has("ShiftLeft")||e.has("ShiftRight")?3:1;let i=0,r=0;(e.has("KeyW")||e.has("ArrowUp"))&&(i+=1),(e.has("KeyS")||e.has("ArrowDown"))&&(i-=1),(e.has("KeyD")||e.has("ArrowRight"))&&(r+=1),(e.has("KeyA")||e.has("ArrowLeft"))&&(r-=1);let h=0;if(e.has("KeyQ")&&(h+=1),e.has("KeyE")&&(h-=1),this.walking){h&&(this.wHeadingT-=h*1.2*a),(i||r)&&this.walk(i*4.2*o*a,r*3.4*o*a);return}if(h&&(this.targetHeading+=h*.9*a,this.tween=null),(e.has("PageUp")||e.has("Equal")||e.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*a))),(e.has("PageDown")||e.has("Minus")||e.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*a))),e.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*a)),e.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*a)),!i&&!r)return;const d=Math.max(8,this.range*.6)*o*a;this.moveHorizontal(this.targetPivot,this.heading,i*d,r*d),this.tween=null}update(a){this.updateKeys(a);const e=1-Math.exp(-this.damping*a);if(this.walking){x.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*a),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*e,this.wPitch+=(this.wPitchT-this.wPitch)*e,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const o=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),i=bo(o),{from:r,to:h}=this.tween;x.lerp(r.pivot,h.pivot,i,this.targetPivot),this.targetHeading=r.heading+(h.heading-r.heading)*i,this.targetPitch=r.pitch+(h.pitch-r.pitch)*i,this.targetRange=Math.exp(Math.log(r.range)+(Math.log(h.range)-Math.log(r.range))*i),o>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*e,this.pitch+=(this.targetPitch-this.pitch)*e,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*e),x.lerp(this.pivot,this.targetPivot,e,this.pivot),this.viewer.camera.lookAt(this.pivot,new eo(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(B.IDENTITY)}}function ko(){return new Ne({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const Yt=()=>({uAerial:{type:L.SAMPLER_2D,value:ko()},uAerialRect:{type:L.VEC4,value:new He(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:L.FLOAT,value:0}}),Gt=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,st=`
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
`;function So(){return new Ye({uniforms:{uNight:{type:L.FLOAT,value:0},uTarde:{type:L.FLOAT,value:0},uSkyFill:{type:L.FLOAT,value:.24},uHazeAmount:{type:L.FLOAT,value:.08},uHazeStart:{type:L.FLOAT,value:1200},uHotelPisos:{type:L.FLOAT,value:99},uRevitBox:{type:L.VEC4,value:new He(0,0,0,0)},uLean:{type:L.VEC2,value:new ze(0,0)},...Yt()},varyings:{vPosM:fe.VEC3,vUpEC:fe.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:st+Gt+`
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
    `})}function To(t,a,e){return new Ye({uniforms:{uNight:{type:L.FLOAT,value:0},uTarde:{type:L.FLOAT,value:0},uSkyFill:{type:L.FLOAT,value:.22},uHazeAmount:{type:L.FLOAT,value:.08},uHazeStart:{type:L.FLOAT,value:1200},uTime:{type:L.FLOAT,value:0},uFrame:{type:L.FLOAT,value:a},uTop:{type:L.FLOAT,value:e},uAtlas:{type:L.SAMPLER_2D,value:new Ne({url:t,repeat:!1,minificationFilter:nt.LINEAR_MIPMAP_LINEAR,magnificationFilter:it.LINEAR})}},varyings:{vUV:fe.VEC2,vView:fe.VEC3,vRightT:fe.VEC2,vUpT:fe.VEC2,vUpEC:fe.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:st+`
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
    `})}function Ao(){return new Ye({uniforms:{uNight:{type:L.FLOAT,value:0},uTarde:{type:L.FLOAT,value:0},uHazeAmount:{type:L.FLOAT,value:.08},uHazeStart:{type:L.FLOAT,value:1200}},lightingModel:to.UNLIT,fragmentShaderText:st+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function Eo(t,a,e){return new Wt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:t,uNorth:a,uUp:e,uSkyZenith:new x(.16,.42,.82),uSkyHorizon:new x(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function zo(){return new Wt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new x(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function Po(t){const a=e=>({type:L.SAMPLER_2D,value:new Ne({url:t+e,repeat:!0,minificationFilter:nt.LINEAR_MIPMAP_LINEAR,magnificationFilter:it.LINEAR})});return new Ye({uniforms:{uNight:{type:L.FLOAT,value:0},uTarde:{type:L.FLOAT,value:0},uGroundFill:{type:L.FLOAT,value:.12},uHazeAmount:{type:L.FLOAT,value:.08},uHazeStart:{type:L.FLOAT,value:1200},uAsfalto:a("tex_asfalto.webp"),uAnden:a("tex_anden.webp"),uPrado:a("tex_prado.webp"),uCiclo:a("tex_ciclo.webp"),...Yt()},varyings:{vG:fe.VEC3,vUpEC:fe.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:st+Gt+`
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
    `})}function Ct(){return yt.eastNorthUpToFixedFrame(x.fromDegrees(et.longitude,et.latitude,et.height))}function Re(t,a,e,o=Ct()){return B.multiplyByPoint(o,new x(t,a,e),new x)}const Lo={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function Ro(t,a,e){let o=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){const[h,d]=e[i],[b,w]=e[r];d>a!=w>a&&t<(b-h)*(a-d)/(w-d)+h&&(o=!o)}return o}function Io(t,a,e){let o=1/0;for(let i=0,r=e.length-1;i<e.length;r=i++){const[h,d]=e[r],[b,w]=e[i],y=b-h,m=w-d,f=Math.max(0,Math.min(1,((t-h)*y+(a-d)*m)/(y*y+m*m||1)));o=Math.min(o,Math.hypot(t-h-f*y,a-d-f*m))}return o}async function _o(t,a,e){const o=t.scene,i=Ct(),r=B.inverseTransformation(i,new B),h=Pe.secciones;a("Contexto urbano",.08);const[d,b,w,y]=await Promise.all([fetch(h+"recorte.json").then(l=>l.json()),fetch(h+"edificios.json").then(l=>l.json()),fetch(h+"arboles.json").then(l=>l.json()),fetch(h+"suelo.json").then(l=>l.json())]),m=()=>d.clips.map(l=>{const M=new ao({positions:x.fromDegreesArray(l.flat())}),n=M.computeRectangle();return M.computeRectangle=c=>io.clone(n,c),M});o.globe.clippingPolygons=new Pt({polygons:m()});const f=Ao();let g=null;try{g=await oo.fromUrl(Pe.googleTiles,{maximumScreenSpaceError:10,shadows:ye.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),g.clippingPolygons=new Pt({polygons:m()}),g.customShader=f,o.primitives.add(g)}catch(l){console.warn("Tiles de Google no disponibles",l)}const v=[-236,330],C=[];for(const l of b.secciones){const M=l.key==="Hotel";C.push({key:l.key,file:M?"hotel_fachadas.glb":l.file,kind:M?"cubierta_pbr":"edificios",label:M?"Hotel La Fontana 3D":`Edificaciones · sector ${l.key}`,dist:M?-2:Math.hypot(l.c[0]-v[0],l.c[1]-v[1])})}C.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),C.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),C.sort((l,M)=>l.dist-M.dist);const U={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},p=y.secciones.map(l=>({key:l.key,file:l.file,kind:"suelo",capa:U[l.key]?.[0]??0,label:U[l.key]?.[1]??l.key,dist:-3})),z=w.secciones.map(l=>({key:l.key,file:l.file,kind:"arboles",atlas:l.atlas,marco:l.marco,marcoSup:l.marcoSup,label:Lo[l.key]??"Vegetación",dist:0})),A=[...p,...C.slice(0,4),...z.slice(0,3),...C.slice(4,9),...z.slice(3),...C.slice(9)],k=So(),O=Po(h),Y=(async()=>{try{const l=await qt.fromAssetId(Pe.imageryAssetId),M=18,n=l.tilingScheme,c=(X,se)=>Be.fromCartesian(Re(X,se,0,i)),u=n.positionToTileXY(c(-1010,930),M),s=n.positionToTileXY(c(1010,-940),M),S=s.x-u.x+1,R=s.y-u.y+1,P=l.tileWidth,_=document.createElement("canvas");_.width=S*P,_.height=R*P;const T=_.getContext("2d"),V=[];for(let X=u.y;X<=s.y;X++)for(let se=u.x;se<=s.x;se++)V.push([se,X]);const ie=async([X,se])=>{for(let Tt=0;Tt<40;Tt++){const At=l.requestImage(X,se,M);if(At){try{const Ue=await At,Et=(X-u.x)*P,zt=(se-u.y)*P;typeof ImageBitmap<"u"&&Ue instanceof ImageBitmap?(T.save(),T.translate(Et,zt+P),T.scale(1,-1),T.drawImage(Ue,0,0,P,P),T.restore()):T.drawImage(Ue,Et,zt,P,P)}catch{}return}await new Promise(Ue=>setTimeout(Ue,120))}};T.fillStyle="#6a6f62",T.fillRect(0,0,_.width,_.height);const ne=Array.from({length:6},async()=>{for(;V.length;)await ie(V.shift())});await Promise.all(ne);const I=document.createElement("canvas");I.width=I.height=4096,I.getContext("2d").drawImage(_,0,0,4096,4096);const Z=await new Promise(X=>I.toBlob(X,"image/jpeg",.92));if(!Z)return;const D=URL.createObjectURL(Z);window.__AERIAL_URL__=D;const q=n.tileXYToRectangle(u.x,u.y,M),te=n.tileXYToRectangle(s.x,s.y,M),ce=(X,se)=>B.multiplyByPoint(r,x.fromRadians(X,se,et.height),new x),ke=ce(q.west,te.south),Se=ce(te.east,q.north),ct=new He(ke.x,ke.y,Se.x,Se.y);for(const X of[k,O])X.setUniform("uAerial",new Ne({url:D,repeat:!1,minificationFilter:nt.LINEAR_MIPMAP_LINEAR,magnificationFilter:it.LINEAR})),X.setUniform("uAerialRect",ct),X.setUniform("uAerialOn",1)}catch(l){console.warn("Foto aérea no disponible",l)}})(),G=[],$=[];let Q=0,ae=0,he=.22,ee=.08,de=1200;const ue={total:A.length,loaded:0,failed:[]},be=async l=>{try{const M=await Ve.fromGltfAsync({url:h+l.file,modelMatrix:i,upAxis:pe.Y,forwardAxis:pe.X,shadows:l.kind==="arboles"?ye.CAST_ONLY:l.kind==="suelo"?ye.RECEIVE_ONLY:ye.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:l.kind!=="arboles"});if(l.kind==="suelo")M.customShader=O;else if(l.kind==="arboles"){const n=To(h+l.atlas,l.marco,l.marcoSup);n.setUniform("uNight",Q),n.setUniform("uTarde",ae),n.setUniform("uSkyFill",he),n.setUniform("uHazeAmount",ee),n.setUniform("uHazeStart",de),G.push(n),M.customShader=n}else l.kind!=="cubierta_pbr"&&(M.customShader=k);M.imageBasedLighting.imageBasedLightingFactor=l.kind==="cubierta_pbr"?new ze(.85,.55):new ze(.75,.45),o.primitives.add(M),l.kind==="arboles"&&$.push(M),await new Promise(n=>{if(M.ready)return n();const c=M.readyEvent.addEventListener(()=>{c(),n()});setTimeout(n,2e4)})}catch(M){console.error("Sección no cargada",l.file,M),ue.failed.push(l.file)}ue.loaded++,e?.(ue.loaded,ue.total,l.label)},De=p.length+7;for(let l=0;l<Math.min(De,A.length);l++)a(A[l].label,.2+.75*l/De),await be(A[l]);const Je=(async()=>{for(let l=De;l<A.length;l++)await be(A[l]),await new Promise(M=>setTimeout(M,60));await Y})();return{matrix:i,inverse:r,tileset:g,buildings:b.edificios,treeCount:w.total,sections:ue,done:Je,setNight(l){f.setUniform("uNight",l),k.setUniform("uNight",l),Q=l,O.setUniform("uNight",l);for(const M of G)M.setUniform("uNight",l)},setTarde(l){f.setUniform("uTarde",l),k.setUniform("uTarde",l),ae=l,O.setUniform("uTarde",l);for(const M of G)M.setUniform("uTarde",l)},setTime(l){for(const M of G)M.setUniform("uTime",l)},setLook(l){if(l.skyFill!==void 0){he=l.skyFill,k.setUniform("uSkyFill",he);for(const M of G)M.setUniform("uSkyFill",he)}if(l.groundFill!==void 0&&O.setUniform("uGroundFill",l.groundFill),l.hazeAmount!==void 0){ee=l.hazeAmount,k.setUniform("uHazeAmount",ee),O.setUniform("uHazeAmount",ee),f.setUniform("uHazeAmount",ee);for(const M of G)M.setUniform("uHazeAmount",ee)}if(l.hazeStart!==void 0){de=l.hazeStart,k.setUniform("uHazeStart",de),O.setUniform("uHazeStart",de),f.setUniform("uHazeStart",de);for(const M of G)M.setUniform("uHazeStart",de)}},setRevitZone(l){k.setUniform("uRevitBox",l?new He(l[0]-1,l[1]-1,l[2]+1,l[3]+1):new He(0,0,0,0))},setHotelFloors(l){k.setUniform("uHotelPisos",l)},setTreesVisible(l){for(const M of $)M.show=l},buildingAt(l){const M=B.multiplyByPoint(r,l,new x);let n=null,c=1.2;for(const u of b.edificios){if(M.x<u.bb[0]-1.5||M.x>u.bb[2]+1.5||M.y<u.bb[1]-1.5||M.y>u.bb[3]+1.5||M.z>u.b+u.h+2.5)continue;if(Ro(M.x,M.y,u.r))return u;const s=Io(M.x,M.y,u.r);s<c&&(c=s,n=u)}return n}}}const Fo=N.fromCssColorString("#ff2b1a"),Ho=N.fromCssColorString("#ffc400"),No=N.fromCssColorString("#00e862"),Ie=N.fromCssColorString("#1a1d22");function ht(t){const a=document.createElement("canvas");a.width=128,a.height=128;const e=a.getContext("2d");if(e.clearRect(0,0,128,128),t==="pare"){e.beginPath();for(let o=0;o<8;o++){const i=(o+.5)*Math.PI/4,r=64+Math.cos(i)*58,h=64+Math.sin(i)*58;o===0?e.moveTo(r,h):e.lineTo(r,h)}e.closePath(),e.fillStyle="#c81e1e",e.fill(),e.lineWidth=5,e.strokeStyle="#ffffff",e.stroke(),e.fillStyle="#ffffff",e.font="bold 31px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("PARE",64,66)}else t==="peaton"?(e.beginPath(),e.moveTo(64,6),e.lineTo(122,64),e.lineTo(64,122),e.lineTo(6,64),e.closePath(),e.fillStyle="#f5b800",e.fill(),e.lineWidth=4,e.strokeStyle="#18181b",e.stroke(),e.fillStyle="#18181b",e.beginPath(),e.arc(64,38,7,0,Math.PI*2),e.fill(),e.fillRect(59,47,10,22),e.fillRect(54,69,7,20),e.fillRect(67,69,7,20)):(e.beginPath(),e.arc(64,64,56,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.lineWidth=11,e.strokeStyle="#c81e1e",e.stroke(),e.fillStyle="#111827",e.font="bold 46px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("30",64,67));return a.toDataURL("image/png")}function Oo(t,a,e,o,i){const r=(p,z,A)=>B.multiplyByPoint(a,new x(p,z,A),new x),h=[],d=e+7.2,b=o+7.2,w=i(d,b),y=N.fromCssColorString("#2a303a"),m=N.fromCssColorString("#14171c"),f=N.fromCssColorString("#eab308");h.push(t.entities.add({position:r(d,b,w+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:y}}),t.entities.add({position:r(d,b,w+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:f}}));const g=4.6;h.push(t.entities.add({position:r(d-g*.5,b,w+5.65),box:{dimensions:new x(g,.14,.14),material:y}}),t.entities.add({position:r(d,b-g*.5,w+5.65),box:{dimensions:new x(.14,g,.14),material:y}}));const v=(p,z,A,k)=>{const O=k?.42:.3,Y=k?.3:.42;h.push(t.entities.add({position:r(p,z,A),box:{dimensions:new x(O,Y,1.18),material:m}}));const G=(ee,de)=>{const ue=t.entities.add({position:r(p,z,A+ee),box:{dimensions:new x(k?.24:.33,k?.33:.24,.24),material:de}});return h.push(ue),ue},$=G(.36,Ie),Q=G(0,Ie),ae=G(-.36,Ie);return{red:$,yellow:Q,green:ae,setState:ee=>{$.box.material=new je(ee==="red"?Fo:Ie),Q.box.material=new je(ee==="yellow"?Ho:Ie),ae.box.material=new je(ee==="green"?No:Ie)}}},C=v(d-3.4,b,w+5.1,!0),U=v(d,b-3.4,w+5.1,!1);return{ns:C,ew:U,setVisible(p){for(const z of h)z.show=p}}}function Do(t,a,e,o,i){const r=(p,z,A)=>B.multiplyByPoint(a,new x(p,z,A),new x),h=[],d=Lt.fromColor(N.fromCssColorString("#f3f4f6").withAlpha(.92)),b=Lt.fromColor(N.fromCssColorString("#f5b800").withAlpha(.92)),w=(p,z,A,k,O,Y)=>{if(o(p,z)<.8)return;const G=i(p,z)+.07;r(p,z,G);const $=xt.fromRotationZ(O),Q=B.fromRotationTranslation($,new x(p,z,G)),ae=B.multiply(a,Q,new B);h.push(new lo({geometry:co.fromDimensions({dimensions:new x(A,k,.04)}),modelMatrix:ae,attributes:{color:Y}}))};for(const p of e){const z=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const A of z){const k=p.e+A.de,O=p.n+A.dn;if(o(k,O)<1.2)continue;for(let $=-3;$<=3;$++){const Q=A.horiz?k+$*1.15:k,ae=A.horiz?O:O+$*1.15;w(Q,ae,A.horiz?.52:2.8,A.horiz?2.8:.52,0,d)}const Y=k+(A.de===0?0:Math.sign(A.de)*2.1),G=O+(A.dn===0?0:Math.sign(A.dn)*2.1);w(Y,G,A.horiz?6.8:.42,A.horiz?.42:6.8,0,d)}}for(let p=-80;p<=440;p+=8)w(-154,p,.18,3.2,0,d),w(-132,p,.18,3.2,0,d);const y=Math.atan2(-51,380);for(let p=-420;p<=160;p+=8){const z=263-(p+420)*.13421052631578947;w(p,z+7.5,3.2,.18,y,d),w(p,z-7.5,3.2,.18,y,d),w(p,z,4.5,.18,y,b)}for(let p=-160;p<=360;p+=8)w(158,p,.18,3.2,0,d);let m=null;h.length>0&&(m=new no({geometryInstances:h,appearance:new so({flat:!0,translucent:!0}),asynchronous:!1}),t.scene.primitives.add(m));const f=[],g=ht("pare"),v=ht("peaton"),C=ht("vel30"),U=N.fromCssColorString("#9ca3af");return e.forEach((p,z)=>{const A=[{e:p.e-7.2,n:p.n-7.2,tex:g},{e:p.e+7.2,n:p.n-7.2,tex:z%2===0?v:C}];for(const k of A){const O=i(k.e,k.n);f.push(t.entities.add({position:r(k.e,k.n,O+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:U}}),t.entities.add({position:r(k.e,k.n,O+2.45),billboard:{image:k.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:ro.CENTER}}))}}),{setVisible(p){m&&(m.show=p);for(const z of f)z.show=p}}}function Uo(t,a){const e=(C,U,p)=>B.multiplyByPoint(a,new x(C,U,p),new x),o=[],d=N.fromCssColorString("#7a7771"),b=N.fromCssColorString("#3d3833"),w=N.fromCssColorString("#24471b"),y=N.fromCssColorString("#3d7f8f").withAlpha(.88),m=N.fromCssColorString("#ffbe55");o.push(t.entities.add({position:e(-225,263.5,4.17+.32),cylinder:{length:.64,topRadius:3.3,bottomRadius:3.6,material:d,slices:12}}),t.entities.add({position:e(-225,263.5,4.17+.56),cylinder:{length:.24,topRadius:3.45,bottomRadius:3.55,material:w,slices:12}}),t.entities.add({position:e(-225,263.5,4.17+.66),cylinder:{length:.08,topRadius:2.95,bottomRadius:2.95,material:y,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+1.35),cylinder:{length:1.9,topRadius:.34,bottomRadius:.48,material:b}}),t.entities.add({position:e(-225,263.5,4.17+1.35),cylinder:{length:.18,topRadius:1.95,bottomRadius:1.55,material:b,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+2.2),cylinder:{length:.16,topRadius:1.15,bottomRadius:.85,material:b,slices:24}}));let f=0;const g=new je(new Rt(()=>{const C=.62+.18*Math.sin(f*7);return N.fromCssColorString("#d9f4ff").withAlpha(C)},!1)),v=new je(new Rt(()=>{const C=.46+.16*Math.cos(f*5.5);return N.fromCssColorString("#bce8f7").withAlpha(C)},!1));o.push(t.entities.add({position:e(-225,263.5,4.17+2.85),cylinder:{length:1.25,topRadius:.08,bottomRadius:.36,material:g,slices:16}}),t.entities.add({position:e(-225,263.5,4.17+1.78),cylinder:{length:.85,topRadius:1.08,bottomRadius:1.22,material:v,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+1.02),cylinder:{length:.72,topRadius:1.88,bottomRadius:2.08,material:v,slices:24}})),o.push(t.entities.add({position:e(-225,272.1,4.17+3.45),box:{dimensions:new x(8.6,2.7,.22),material:N.fromCssColorString("#16191e")}}),t.entities.add({position:e(-225,271.8,4.17+.28),box:{dimensions:new x(8.2,2.8,.56),material:d}}));for(let C=-246;C<=-202;C+=8.5)o.push(t.entities.add({position:e(C,255.8,4.17+1.1),cylinder:{length:2.2,topRadius:.04,bottomRadius:.05,material:b}}),t.entities.add({position:e(C,255.8,4.17+2.3),ellipsoid:{radii:new x(.16,.16,.22),material:m}}));return{update(C){f=C},setVisible(C){for(const U of o)U.show=C}}}const Ze=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Ht=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],Nt=3.2;async function Bo(t,a,e=110){const o=Pe.secciones;let i,r,h;try{i=await fetch(o+"vias_campo.json").then(c=>c.json());const n=new Uint8Array(await fetch(o+"vias_campo.bin").then(c=>c.arrayBuffer()));r=n.subarray(0,i.w*i.h),h=n.subarray(i.w*i.h)}catch{return null}const{cell:d,x0:b,y0:w,w:y,h:m}=i,f=(n,c)=>{const u=(n-b)/d-.5,s=(c-w)/d-.5,S=Math.floor(u),R=Math.floor(s);if(S<0||R<0||S>=y-1||R>=m-1)return 0;const P=u-S,_=s-R,T=R*y+S;return((r[T]*(1-P)+r[T+1]*P)*(1-_)+(r[T+y]*(1-P)+r[T+y+1]*P)*_)*.5},g=(n,c)=>{const u=Math.max(0,Math.min(y-1,Math.floor((n-b)/d))),s=Math.max(0,Math.min(m-1,Math.floor((c-w)/d))),S=s*y+u;if(r[S]>0)return h[S]*.1-2;let R=0,P=0;for(let _=-2;_<=2;_++){const T=s+_;if(!(T<0||T>=m))for(let V=-2;V<=2;V++){const ie=u+V;if(ie<0||ie>=y)continue;const ne=T*y+ie;if(r[ne]===0)continue;const I=1/(V*V+_*_+.5);R+=I,P+=(h[ne]*.1-2)*I}}return R>0?P/R:1},v=[],C=[],U=[];for(let n=2;n<m-2;n++)for(let c=2;c<y-2;c++){const u=n*y+c,s=b+(c+.5)*d,S=w+(n+.5)*d,R=Math.hypot(s+180,S-250);if(R>520)continue;const P=r[u]*.5;if(P>=2.6&&P<=5&&v.push(u),P>=6&&R<460&&U.push({e:s,n:S,d:P}),r[u]===0&&R<430){let _=!1;for(let T=-2;T<=2&&!_;T++)for(let V=-2;V<=2;V++)if(r[(n+T)*y+(c+V)]>0){_=!0;break}_&&C.push(u)}}if(!v.length)return null;U.sort((n,c)=>c.d-n.d);const p=[];for(const n of U){if(p.length>=6)break;if(p.some(s=>Math.hypot(s.e-n.e,s.n-n.n)<90))continue;const c=g(n.e,n.n),u=Oo(t,a,n.e,n.n,g);u.ns.setState("green"),u.ew.setState("red"),p.push({e:n.e,n:n.n,u:c,faseOffset:p.length*4.5,rig:u,nsEstado:"green",ewEstado:"red"})}const z=Do(t,a,p,f,g),A=Uo(t,a),k=(()=>{let n=12345;return()=>(n=n*1664525+1013904223>>>0)/4294967296})(),O=(n,c,u)=>{const s=Math.cos(u),S=Math.sin(u);if(n>=-168&&n<=-118&&Math.abs(S)>.35)return n<-143?S<-.2?12:-1e6:S>.2?12:-1e6;const R=263-(n+420)*(51/380);return Math.abs(c-R)<26&&Math.abs(s)>.35?c>R?s>.2?12:-1e6:s<-.2?12:-1e6:n>=-255&&n<=-210&&c<222&&Math.abs(S)>.35?S<-.2?10:-1e6:c<175&&n<-215&&Math.abs(s)>.35?s>.2?10:-1e6:n<-385&&c<265&&Math.abs(S)>.35?S<-.2?10:-1e6:0},Y=[],G=(n,c,u)=>Y.some(s=>s!==u&&Math.hypot(s.e-n,s.n-c)<8.5),$=n=>{for(let c=0;c<45;c++){const u=v[Math.floor(k()*v.length)],s=b+(u%y+.5)*d,S=w+(Math.floor(u/y)+.5)*d;if(G(s,S,n))continue;let R=0,P=-1e9;for(let _=0;_<16;_++){const T=_/16*Math.PI*2,V=s+Math.cos(T)*10,ie=S+Math.sin(T)*10,ne=f(V,ie),I=O(V,ie,T);if(I<-1e4)continue;const Z=f(s+Math.sin(T)*2.5,S-Math.cos(T)*2.5),D=f(s-Math.sin(T)*2.5,S+Math.cos(T)*2.5),q=-Math.abs(ne-Nt)+(D>Z?1.5:0)+I;ne>1.5&&q>P&&(P=q,R=T)}if(P>-1e8){n.e=s,n.n=S,n.th=R,n.vActual=n.v*.5;return}}};for(let n=0;n<e;n++){const c=k(),u=c<.2?"taxi":c<.48?"suv":"sedan",s={e:0,n:0,th:0,v:6.5+k()*5,vActual:0,model:null,u:0,tipo:u};$(s),Y.push(s)}const Q=[];if(C.length>0)for(let n=0;n<42;n++){const c=C[Math.floor(k()*C.length)],u=b+(c%y+.5)*d,s=w+(Math.floor(c/y)+.5)*d;Q.push({e:u,n:s,th:k()*Math.PI*2,v:1.15+k()*.45,model:null,u:g(u,s)+.16,conPerro:n%3===0})}const ae=[],he=(n,c,u,s,S,R,P,_=.68)=>{for(let T=0;T<S;T++){const V=S===1?(n+c)*.5:n+T/(S-1)*(c-n);for(let ie=0;ie<R;ie++){if(k()>_)continue;const ne=R===1?(u+s)*.5:u+ie/(R-1)*(s-u);if(f(V,ne)>.3)continue;const I=k(),Z=I<.08?"taxi":I<.42?"suv":"sedan",D=k()<.5?0:Math.PI,q=g(V,ne);ae.push({e:V+(k()-.5)*.25,n:ne+(k()-.5)*.25,u:q>-1.5?q:3.55,th:P+D+(k()-.5)*.07,tipo:Z,model:null})}}};he(92,134,-22,62,4,15,.05,.7),he(52,108,114,146,5,4,.12,.62),he(58,106,-104,-56,4,6,.1,.65),he(-132,-98,-46,32,3,12,.04,.68);const ee=new x,de=new xt,ue=new B,be=(n,c=.08)=>{n.model&&(x.fromElements(n.e,n.n,n.u+c,ee),xt.fromRotationZ(n.th,de),B.fromRotationTranslation(de,ee,ue),n.model.modelMatrix=B.multiply(a,ue,new B))},De=(async()=>{for(let n=0;n<Y.length;n++){const c=Y[n],u=c.tipo==="taxi"?"carro_taxi.glb":c.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const s=await Ve.fromGltfAsync({url:o+u,upAxis:pe.Y,forwardAxis:pe.X,shadows:ye.ENABLED,color:c.tipo==="taxi"?N.WHITE:N.fromCssColorString(Ze[n%Ze.length]),colorBlendMode:dt.MIX,colorBlendAmount:c.tipo==="taxi"?0:.28});t.scene.primitives.add(s),c.model=s,c.u=g(c.e,c.n),be(c)}catch{}n%6===5&&await new Promise(s=>setTimeout(s,35))}for(let n=0;n<Q.length;n++){const c=Q[n];try{const u=await Ve.fromGltfAsync({url:o+(c.conPerro?"persona_perro.glb":"persona.glb"),upAxis:pe.Y,forwardAxis:pe.X,shadows:ye.ENABLED,color:N.fromCssColorString(Ht[n%Ht.length]),colorBlendMode:dt.MIX,colorBlendAmount:.25});t.scene.primitives.add(u),c.model=u,be(c,0)}catch{}n%6===5&&await new Promise(u=>setTimeout(u,35))}for(let n=0;n<ae.length;n++){const c=ae[n],u=c.tipo==="taxi"?"carro_taxi.glb":c.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const s=await Ve.fromGltfAsync({url:o+u,upAxis:pe.Y,forwardAxis:pe.X,shadows:ye.ENABLED,color:c.tipo==="taxi"?N.WHITE:N.fromCssColorString(Ze[n*3%Ze.length]),colorBlendMode:dt.MIX,colorBlendAmount:c.tipo==="taxi"?0:.28});t.scene.primitives.add(s),c.model=s,be(c)}catch{}n%8===7&&await new Promise(s=>setTimeout(s,30))}})();let Je=!0,l=0;const M=(n,c)=>f(n,c)===0&&f(n+4,c)+f(n-4,c)+f(n,c+4)+f(n,c-4)>.5;return{ready:De,count:e,debug:()=>Y.map(n=>[Math.round(n.e),Math.round(n.n),+n.u.toFixed(1),n.model?1:0]),setVisible(n){Je=n;for(const c of Y)c.model&&(c.model.show=n);for(const c of ae)c.model&&(c.model.show=n);for(const c of Q)c.model&&(c.model.show=n);for(const c of p)c.rig.setVisible(n);z.setVisible(n),A.setVisible(n)},update(n){if(!Je)return;const c=Math.min(.08,Math.max(.001,n));l+=c,A.update(l);for(const u of p){const s=(l+u.faseOffset)%24,S=s<10?"green":s<12?"yellow":"red",R=s>=12&&s<22?"green":s>=22?"yellow":"red";S!==u.nsEstado&&(u.nsEstado=S,u.rig.ns.setState(S)),R!==u.ewEstado&&(u.ewEstado=R,u.rig.ew.setState(R))}for(let u=0;u<Y.length;u++){const s=Y[u];if(!s.model)continue;let S=0,R=-1e9;for(let I=-4;I<=4;I++){const Z=I*.13,D=s.th+Z,q=s.e+Math.cos(D)*9,te=s.n+Math.sin(D)*9,ce=f(q,te);if(ce<1.1||f(s.e+Math.cos(D)*4.5,s.n+Math.sin(D)*4.5)<.9)continue;const Se=O(q,te,D);if(Se<-1e4)continue;const ct=f(q+Math.sin(D)*2.5,te-Math.cos(D)*2.5),X=f(q-Math.sin(D)*2.5,te+Math.cos(D)*2.5),se=-Math.abs(Math.min(ce,6)-Nt)-Math.abs(Z)*1.6+(X>=ct?.6:0)+Se;se>R&&(R=se,S=Z)}if(R<-1e8||Math.hypot(s.e+180,s.n-250)>580){$(s),s.u=g(s.e,s.n),be(s);continue}const P=Math.cos(s.th),_=Math.sin(s.th);let T=1;for(let I=0;I<Y.length;I++){if(I===u||!Y[I].model)continue;const Z=Y[I],D=Z.e-s.e,q=Z.n-s.n,te=D*D+q*q;if(te>225)continue;const ce=D*P+q*_,ke=Math.abs(-D*_+q*P);if(ce>0&&ce<12.5&&ke<2.35){const Se=ce<6.4?0:(ce-6.4)/6.1;Se<T&&(T=Se)}else te<22&&I<u&&(T=0)}const V=Math.abs(P)>Math.abs(_);for(const I of p){if((V?I.ewEstado:I.nsEstado)==="green")continue;const D=I.e-s.e,q=I.n-s.n,te=D*P+q*_,ce=Math.abs(-D*_+q*P);if(te>7&&te<21&&ce<9){const ke=te<10.5?0:(te-10.5)/10.5;ke<T&&(T=ke)}}const ie=1-Math.min(.55,Math.abs(S)*1.4),ne=s.v*ie*T;if(s.vActual+=(ne-s.vActual)*Math.min(1,c*4.5),s.vActual>.05){s.th+=Math.max(-1.4*c,Math.min(1.4*c,S));const I=s.e+Math.cos(s.th)*s.vActual*c,Z=s.n+Math.sin(s.th)*s.vActual*c;f(I,Z)>=.7?(s.e=I,s.n=Z):s.th+=.6;const D=Math.max(g(s.e,s.n),g(s.e+Math.cos(s.th)*1.4,s.n+Math.sin(s.th)*1.4),g(s.e-Math.cos(s.th)*1.4,s.n-Math.sin(s.th)*1.4));s.u+=(D-s.u)*Math.min(1,c*8)}be(s)}for(const u of Q){if(!u.model)continue;const s=u.e+Math.cos(u.th)*u.v*c,S=u.n+Math.sin(u.th)*u.v*c;M(s,S)&&Math.hypot(s+180,S-250)<430?(u.e=s,u.n=S,u.u+=(g(u.e,u.n)+.16-u.u)*Math.min(1,c*4)):u.th+=.9+k()*1.2,be(u,0)}}}}async function Ot(t,a){try{const e=new Image;e.decoding="async",e.src=t,await e.decode();const o=document.createElement("canvas");o.width=e.naturalWidth,o.height=e.naturalHeight;const i=o.getContext("2d");i.drawImage(e,0,0);const r=i.getImageData(0,0,o.width,o.height);return new Ne({typedArray:new Uint8Array(r.data.buffer),width:o.width,height:o.height,repeat:!0,minificationFilter:nt.LINEAR_MIPMAP_LINEAR,magnificationFilter:it.LINEAR})}catch{return new Ne({typedArray:new Uint8Array([...a,255]),width:1,height:1})}}function Vo(t,a){return new Ye({uniforms:{uNight:{type:L.FLOAT,value:0},uLadrillo:{type:L.SAMPLER_2D,value:t},uTeja:{type:L.SAMPLER_2D,value:a}},varyings:{vRP:fe.VEC3,vRN:fe.VEC3},vertexShaderText:`
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
          col = foto(uTeja, uv / 1.3, vec3(0.36, 0.125, 0.06), 0.8) * (0.86 + 0.28 * big);
          rough = 0.88;
        } else if (cat < 80.0 || (cat > 100.0 && cat < 120.0)) {
          // ventanas y muro cortina: vidrio con reflejo del cielo y marco claro en el borde
          vec3 v = normalize(-fsInput.attributes.positionEC);
          float fres = pow(1.0 - clamp(abs(dot(normalize(material.normalEC), v)), 0.0, 1.0), 4.0);
          col = mix(vec3(0.07, 0.10, 0.12), vec3(0.45, 0.56, 0.66), 0.18 + 0.7 * fres);
          rough = 0.06;
          spec = vec3(0.08);
        } else if (cat < 100.0) {
          col = vec3(0.20, 0.11, 0.06) * (0.85 + 0.3 * rn(vec2(vRP.y * 14.0, vRP.x + vRP.z)));  // puertas: madera
          rough = 0.6;
        } else if (cat < 140.0) {
          col = vec3(0.045, 0.047, 0.05);                         // montantes: aluminio anodizado oscuro
          rough = 0.35; spec = vec3(0.35);
        } else if (cat < 160.0) {
          col = vec3(0.028, 0.028, 0.03);                         // barandas: hierro forjado negro, satinado
          rough = 0.3; spec = vec3(0.45);
        } else {
          col = vec3(0.52, 0.50, 0.47) * (0.92 + 0.14 * rn(vRP.xz * 1.5 + vRP.y)); // columnas, escaleras y vigas: concreto
        }
        material.diffuse = col * mix(1.0, 0.4, uNight);
        material.roughness = rough;
        material.specular = spec;
        material.emissive = col * 0.14 * (1.0 - uNight);
      }
    `})}async function jo(t,a){const e=Pe.secciones;let o;try{o=await fetch(e+"revit.json").then(f=>f.json())}catch{return null}const[i,r]=await Promise.all([Ot(e+"tex_ladrillo.webp",[107,84,76]),Ot(e+"tex_teja.webp",[90,52,28])]),h=Vo(i,r),d=[];for(const f of o.niveles)try{const g=await Ve.fromGltfAsync({url:e+f.file,modelMatrix:a,upAxis:pe.Y,forwardAxis:pe.X,shadows:ye.ENABLED,backFaceCulling:!1,show:!1});g.customShader=h,g.imageBasedLighting.imageBasedLightingFactor=new ze(.45,.25),t.scene.primitives.add(g),d.push({...f,model:g,off:0,target:0,delay:0,shown:!1})}catch(g){console.warn("Nivel de Revit no cargado",f.file,g)}if(!d.length)return null;const b=46,w=new B,y=f=>{const g=B.fromTranslation(new x(0,0,f.off),w);f.model.modelMatrix=B.multiply(a,g,new B)},m={niveles:d.map(f=>({i:f.i,nombre:f.nombre})),caja:o.caja,ready:!0,visible:!1,abierto:-1,play(){m.visible=!0,m.abierto=-1;const f=performance.now();d.forEach((g,v)=>{g.off=b,g.target=0,g.delay=f+v*620,g.shown=!1,g.model.show=!1,y(g)})},openAt(f){m.visible=!0,m.abierto=f;const g=performance.now();let v=0;for(const C of[...d].reverse())C.i>f&&(C.target=b,C.delay=g+v++*110);for(const C of d)C.i<=f&&(C.target=0,C.delay=g,C.shown||(C.off=b))},full(){m.visible=!0,m.abierto=-1;const f=performance.now();d.forEach((g,v)=>{(g.target!==0||!g.shown)&&(g.target=0,g.delay=f+v*110,g.shown||(g.off=b))})},hide(){m.visible=!1,m.abierto=-1;for(const f of d)f.model.show=!1,f.shown=!1,f.off=0,f.target=0},setNight(f){h.setUniform("uNight",f)},update(f,g){if(m.visible)for(const v of d){if(g<v.delay)continue;v.target===0&&!v.shown&&(v.shown=!0,v.model.show=!0);const C=v.target-v.off;if(Math.abs(C)<.01){v.off!==v.target&&(v.off=v.target,y(v)),v.target!==0&&v.shown&&(v.shown=!1,v.model.show=!1);continue}const U=v.target===0?1-Math.exp(-5.2*f):1-Math.exp(-4*f);v.off+=C*U,y(v)}}};return m}function Wo(t,a){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);const o=document.createElement("aside");o.className="pisos",o.hidden=!0,o.innerHTML="<small>Pisos · modelo Revit</small>";const i=new Map,r=(d,b,w)=>{const y=document.createElement("button");y.innerHTML=`${b}<span>${w}</span>`,y.addEventListener("click",()=>a(d)),i.set(d,y),o.appendChild(y)};r(-1,"Edificio completo","");for(const d of[...t.niveles].reverse())r(d.i,d.nombre.charAt(0)+d.nombre.slice(1).toLowerCase(),`N${d.i+1}`);document.body.appendChild(o);const h=d=>i.forEach((b,w)=>b.classList.toggle("on",w===d));return h(-1),{show:d=>{o.hidden=!d},mark:h}}const Ke={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function mt(t){const a=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(!a)return[1,1,1];const e=parseInt(a[1],16);return[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}const qo=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function Yo(t){const a={dia:{...Ke.dia},tarde:{...Ke.tarde},noche:{...Ke.noche}};let e="dia";const o=document.createElement("button");o.id="btnLookStudio",o.className="look-toggle",o.textContent="⚙ Ajustar luz",o.title="Abrir editor de iluminación y color (L)",document.body.appendChild(o);const i=document.createElement("aside");i.id="lookPanel",i.className="look-panel",i.hidden=!0,i.innerHTML=`
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
  `,document.body.appendChild(i);const r=i.querySelector("#lpBody"),h=new Map;for(const m of qo){const f=document.createElement("section");f.className="lp-sec";const g=document.createElement("h4");g.textContent=m.title,f.appendChild(g);for(const v of m.items){const C=document.createElement("label");C.className="lp-row";const U=document.createElement("span");U.className="lp-lbl",U.textContent=v.label,C.appendChild(U);const p=document.createElement("input");p.type=v.type,v.type==="range"&&(p.min=String(v.min),p.max=String(v.max),p.step=String(v.step));const z=v.type==="range"?document.createElement("span"):void 0;z&&(z.className="lp-val"),p.addEventListener("input",()=>{const k=a[e];if(v.type==="range"){const O=parseFloat(p.value);k[v.key]=O,z&&(z.textContent=v.step&&v.step>=1?String(Math.round(O)):O.toFixed(2))}else k[v.key]=p.value;t(e,k)});const A=document.createElement("div");A.className="lp-ctrl",A.appendChild(p),z&&A.appendChild(z),C.appendChild(A),f.appendChild(C),h.set(v.key,{input:p,val:z})}r.appendChild(f)}const d={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function b(){const m=a[e],f=i.querySelector("#lpPresetName");f&&(f.textContent=d[e]);for(const[g,{input:v,val:C}]of h){const U=m[g];if(v.value=String(U),C&&typeof U=="number"){const p=parseFloat(v.step||"0.01");C.textContent=p>=1?String(Math.round(U)):U.toFixed(2)}}}const w=()=>{i.hidden=!i.hidden,o.classList.toggle("on",!i.hidden)};o.addEventListener("click",w),i.querySelector("#lpClose")?.addEventListener("click",w);const y=i.querySelector("#lpCopy");return y.addEventListener("click",async()=>{const m=JSON.stringify({active:e,presets:a},null,2);try{await navigator.clipboard.writeText(m),y.textContent="¡JSON copiado!",setTimeout(()=>y.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",m)}}),i.querySelector("#lpReset")?.addEventListener("click",()=>{a[e]={...Ke[e]},b(),t(e,a[e])}),addEventListener("keydown",m=>{m.code==="KeyL"&&!m.ctrlKey&&!m.metaKey&&!m.altKey&&w()}),b(),{setActivePreset(m){e=m,b()},getPreset(m){return a[m]},toggle:w}}vo.defaultAccessToken=Pe.ionToken;const W=t=>document.getElementById(t),Mt=W("cesiumContainer"),Dt=W("loading"),Go=W("loadBar"),Xt=W("loadLabel"),Xo=W("loadPct");function _e(t,a){Xt.textContent=t;const e=Math.round(Math.max(0,Math.min(1,a))*100);Go.style.width=e+"%",Xo.textContent=e+"%"}const J=new uo(Mt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:ye.RECEIVE_ONLY,terrain:ho.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:fo.fromProviderAsync(qt.fromAssetId(Pe.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),F=J.scene;F.globe.enableLighting=!0;F.globe.showGroundAtmosphere=!0;F.globe.depthTestAgainstTerrain=!0;F.globe.maximumScreenSpaceError=2;F.fog.enabled=!1;F.fog.density=18e-5;F.fog.minimumBrightness=.04;F.highDynamicRange=!0;F.msaaSamples=4;F.postProcessStages.fxaa.enabled=!0;F.screenSpaceCameraController.enableCollisionDetection=!1;F.light=new mo({intensity:3,color:N.fromCssColorString("#fff4e3")});const we=J.shadowMap;we.softShadows=!0;we.size=4096;we.maximumDistance=1200;we.darkness=.24;we.normalOffset=!0;{const t=we;t._primitiveBias.depthBias=8e-4,t._primitiveBias.normalOffsetScale=1.6,t._primitiveBias.normalShadingSmooth=.35}const Ee=F.postProcessStages.ambientOcclusion;Ee.enabled=!0;Ee.uniforms.intensity=2.1;Ee.uniforms.bias=.08;Ee.uniforms.lengthCap=.35;Ee.uniforms.stepSize=1.4;Ee.uniforms.blurStepSize=1;const Ce=F.postProcessStages.bloom;Ce.enabled=!0;Ce.uniforms.glowOnly=!1;Ce.uniforms.contrast=128;Ce.uniforms.brightness=-.36;Ce.uniforms.delta=1;Ce.uniforms.sigma=2.6;Ce.uniforms.stepSize=1.5;const Jo=Ct(),pt=t=>{const a=B.getColumn(Jo,t,new He);return new x(a.x,a.y,a.z)},xe=Eo(pt(0),pt(1),pt(2));F.postProcessStages.add(xe);const ve=zo();F.postProcessStages.add(ve);J.camera.frustum.fov=jt.toRadians(48);const Ut=(()=>{try{const t=F.context._gl,a=t.getExtension("WEBGL_debug_renderer_info");return a?String(t.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),Zo=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Ut)&&!/Arc/i.test(Ut);let E=null,oe=Zo||matchMedia("(pointer: coarse)").matches?.5:1;function Ge(){const t=Math.min(window.devicePixelRatio||1,2);J.resolutionScale=t*(oe>=1?1:oe>=.5?.8:.62),we.size=oe>=1?4096:oe>=.5?2048:1024,we.softShadows=oe>=.5,Ee.enabled=oe>=1,Ce.enabled=oe>=.5,F.msaaSamples=oe>=1?4:1,J.shadows=oe>=.5,E?.tileset&&(E.tileset.maximumScreenSpaceError=oe>=1?8:oe>=.5?12:20)}Ge();J.clock.shouldAnimate=!1;J.clock.currentTime=qe.fromIso8601("2026-06-21T16:50:00-05:00");const j=new Mo(J),rt=t=>Re(ft[t].e,ft[t].n,ft[t].u),Ko=rt("hotel");j.flyTo({pivot:Ko,heading:tt.general.heading,pitch:tt.general.pitch,range:tt.general.range*1.8},0);j.groundHeight=t=>F.globe.getHeight(t);const $o=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let ge=.04,Ae=1,Te=null;const Qo=t=>qe.toDate(qe.fromIso8601(t)).getTime();function lt(t){F.light.intensity=t.sunIntensity,F.light.color=N.fromCssColorString(t.sunColor),we.darkness=t.shadowDarkness,Ee.uniforms.intensity=t.aoIntensity,Ce.uniforms.brightness=t.bloomBrightness,ve.uniforms.uExposure=t.exposure,ve.uniforms.uContrast=t.contrast,ve.uniforms.uSaturation=t.saturation;const[a,e,o]=mt(t.tintColor);ve.uniforms.uTint=new x(a,e,o),ve.uniforms.uVignette=t.vignette;const[i,r,h]=mt(t.skyZenith);xe.uniforms.uSkyZenith=new x(i,r,h);const[d,b,w]=mt(t.skyHorizon);xe.uniforms.uSkyHorizon=new x(d,b,w),xe.uniforms.uCloudDensity=t.cloudDensity,xe.uniforms.uCloudSpeed=t.cloudSpeed,E?.setLook({skyFill:t.skyFill,groundFill:t.groundFill,hazeAmount:t.hazeAmount,hazeStart:t.hazeStart})}const at=Yo((t,a)=>lt(a));lt(at.getPreset("dia"));xe.uniforms.uNight=ge;xe.uniforms.uTarde=Ae;ve.uniforms.uNight=ge;ve.uniforms.uTarde=Ae;F.skyAtmosphere&&(F.skyAtmosphere.hueShift=0,F.skyAtmosphere.saturationShift=.08,F.skyAtmosphere.brightnessShift=-.04);function ea(t){Te={from:qe.toDate(J.clock.currentTime).getTime(),to:Qo(t.iso),start:performance.now(),dur:1600},F.fog.density=t.fog,at.setActivePreset(t.id),lt(at.getPreset(t.id)),F.skyAtmosphere&&(F.skyAtmosphere.hueShift=0,F.skyAtmosphere.saturationShift=t.id==="tarde"?.08:t.id==="noche"?-.25:.06,F.skyAtmosphere.brightnessShift=t.id==="noche"?-.55:t.id==="tarde"?-.04:0);const e=ge,o=Ae,i=performance.now(),r=()=>{const d=Math.min(1,(performance.now()-i)/1400),b=d*d*(3-2*d);ge=e+(t.night-e)*b,Ae=o+(t.tarde-o)*b,E?.setNight(ge),K?.setNight(ge),E?.setTarde(Ae),xe.uniforms.uNight=ge,xe.uniforms.uTarde=Ae,ve.uniforms.uNight=ge,ve.uniforms.uTarde=Ae,d<1&&requestAnimationFrame(r)};requestAnimationFrame(r),document.querySelectorAll("[data-light]").forEach(d=>d.classList.toggle("on",d.dataset.light===t.id));const h=W("clockLabel");h&&(h.textContent=t.label)}document.querySelectorAll("[data-light]").forEach(t=>{t.addEventListener("click",()=>{const a=$o.find(e=>e.id===t.dataset.light);a&&ea(a)})});let Fe=!1;const bt=W("btnOrbit"),kt=W("btnPedestrian");function Me(){Fe=!1,bt?.classList.remove("on")}function Xe(t,a=2){Me();const e=tt[t];j.flyTo({pivot:rt(e.place),heading:e.heading,pitch:e.pitch,range:e.range},a)}W("btnHome")?.addEventListener("click",()=>Xe("general",2.2));W("btnAerial")?.addEventListener("click",()=>Xe("aerial"));W("btnArch")?.addEventListener("click",()=>Xe("arch"));kt?.addEventListener("click",()=>{Me(),j.isWalking?j.exitWalk():j.enterWalk(le?Zt(le):void 0)});j.onModeChange=t=>{kt?.classList.toggle("on",t);const a=W("hint");a&&t&&(a.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",a.classList.remove("fade"),setTimeout(()=>a.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(t=>{t.addEventListener("click",()=>{Me();const a=t.dataset.place;if(a==="hotel"&&E){const e=E.buildings.find(o=>o.s==="Hotel");if(e){Oe(null),Oe(e);return}}j.flyTo({pivot:rt(a),range:a==="hotel"?300:520,pitch:-.5},2)})});bt?.addEventListener("click",()=>{Fe=!Fe,bt.classList.toggle("on",Fe),Fe&&j.isWalking&&j.exitWalk()});Mt.addEventListener("pointerdown",Me);Mt.addEventListener("wheel",Me,{passive:!0});addEventListener("keydown",t=>{t.code==="Escape"&&(j.isWalking?j.exitWalk():Oe(null)),(t.code==="KeyH"||t.code==="Home")&&Xe("general",2.2),t.code==="KeyP"&&kt?.click()});let le=null,We=null;const ta=9;let ot=null,K=null,Le=null,wt=!1,$e=null;function oa(){return $e||($e=(async()=>{E&&(K=await jo(J,E.matrix),K&&(K.setNight(ge),Le=Wo(K,t=>{if(!K)return;Me(),Le?.mark(t),t<0?K.full():K.openAt(t);const a=K.caja;j.flyTo({pivot:Re((a[0]+a[2])/2,(a[1]+a[3])/2,12),pitch:t<0?-.42:-.95,range:t<0?230:150},1.4)}),wt&&(wt=!1,E.setHotelFloors(99),St(),me&&(J.entities.remove(me),me=null))))})(),$e)}function St(){!E||!K||(E.setRevitZone(K.caja),K.play(),Le?.mark(-1),Le?.show(!0))}function Jt(){E&&(ot={start:performance.now()},E.setHotelFloors(0))}let me=null;const Qe=W("card");function aa(t){return Re((t.bb[0]+t.bb[2])/2,(t.bb[1]+t.bb[3])/2,t.b+t.h*.5)}function Zt(t){return Re((t.bb[0]+t.bb[2])/2,t.bb[1]-9,t.b)}function Oe(t){const a=le?.s==="Hotel";if(le=t,me&&(J.entities.remove(me),me=null),!t||!E){Qe&&(Qe.hidden=!0),Le?.show(!1);return}t.s!=="Hotel"?Le?.show(!1):K?.visible&&Le?.show(!0);const e=t.r.map(([m,f])=>Re(m,f,0,E.matrix)),o=2572+t.b-.5;me=J.entities.add({polygon:{hierarchy:new go(e),height:o,extrudedHeight:o+t.h+2.2,material:N.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:N.fromCssColorString("#d7ebff"),shadows:ye.DISABLED}});const i=t.s==="Hotel";i&&!a&&(K?(St(),me&&(J.entities.remove(me),me=null)):(wt=!0,oa(),Jt()),Me(),j.flyTo({pivot:rt("hotel"),pitch:-.38,range:290},1.8));const r=i&&E?E.buildings.filter(m=>m.s==="Hotel"):[t],h=m=>Math.abs(m.r.reduce((f,g,v)=>{const C=m.r[(v+1)%m.r.length];return f+g[0]*C[1]-C[0]*g[1]},0)/2),d=r.reduce((m,f)=>m+h(f),0),b=r.reduce((m,f)=>m+h(f)*f.p,0),w=Math.max(...r.map(m=>m.p)),y=Math.max(...r.map(m=>m.h));Math.abs(t.r.reduce((m,f,g)=>{const v=t.r[(g+1)%t.r.length];return m+f[0]*v[1]-v[0]*f[1]},0)/2),W("cardKind").textContent=i?"Proyecto":`Sector ${t.s}`,W("cardTitle").textContent=i?"Hotel La Fontana":`Edificación ${t.id+1}`,W("cardData").innerHTML=`<dt>Pisos</dt><dd>${i?"hasta "+w:t.p}</dd><dt>Altura</dt><dd>${y.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(d).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(b).toLocaleString("es-CO")} m²</dd>`,Qe&&(Qe.hidden=!1)}j.onPick=t=>{E&&Oe(t?E.buildingAt(t):null)};W("cardClose")?.addEventListener("click",()=>Oe(null));W("cardFocus")?.addEventListener("click",()=>{if(!le)return;Me();const t=Math.max(le.bb[2]-le.bb[0],le.bb[3]-le.bb[1],le.h);j.flyTo({pivot:aa(le),pitch:-.42,range:Math.max(60,t*2.1)},1.7)});W("cardWalk")?.addEventListener("click",()=>{le&&(Me(),j.enterWalk(Zt(le)))});const gt=W("status"),Bt=W("statusText");async function ia(){const t=performance.now()+25e3;let a=0;for(;performance.now()<t;){const e=F.globe.tilesLoaded,o=!E?.tileset||E.tileset.tilesLoaded;if(e&&o){if(a||(a=performance.now()),performance.now()-a>=600)break}else a=0;await new Promise(i=>setTimeout(i,150))}for(let e=0;e<8;e++)await new Promise(o=>requestAnimationFrame(o))}async function na(){_e("Cargando el modelo del hotel...",.05),await new Promise(e=>setTimeout(e,30)),E=await _o(J,(e,o)=>_e(e,.05+o*.2),(e,o,i)=>{_e(`Cargando secciones (${e}/${o}) · ${i}`,.25+e/Math.max(1,o)*.45),!(!gt||!Bt)&&(gt.hidden=!1,Bt.textContent=e<o?`Cargando secciones ${e}/${o} · ${i}`:`Modelo completo · ${o} secciones`,e>=o&&setTimeout(()=>gt.classList.add("fade"),2600))}),E.setNight(ge),E.setTarde(Ae);const t=document.querySelector("[data-light].on")?.dataset.light||"dia";lt(at.getPreset(t)),Ge(),Xe("general",0),await E.done,_e("Cargando tráfico y parqueaderos...",.78),We=await Bo(J,E.matrix),We&&await We.ready,window.__ALL__=!0,_e("Renderizando texturas y 3D Tiles...",.9),await ia(),_e("Listo",1),Dt.classList.add("done"),setTimeout(()=>Dt.remove(),900);const a=W("hint");a&&setTimeout(()=>a.classList.add("fade"),9e3),window.__READY__=!0}const re={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:po,viewer:J,cam:j,getSite:()=>E,enuToWorld:Re,select:Oe,stats:re,playHotel:Jt,playRevit:St,getRevit:()=>K,getTrafico:()=>We,setQuality:t=>{oe=t,Ge()}};na().catch(t=>{console.error(t),Xt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(t?.message??t)});let Vt=performance.now(),vt=0;function Kt(){const t=performance.now(),a=Math.min(.1,(t-Vt)/1e3);if(Vt=t,Te){const o=Math.min(1,(t-Te.start)/Te.dur),i=o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2;J.clock.currentTime=qe.fromDate(new Date(Te.from+(Te.to-Te.from)*i)),o>=1&&(Te=null)}if(ot&&E){const o=(t-ot.start)/550,i=Math.floor(o),r=o-i,h=1-Math.pow(1-Math.min(1,r*1.6),3);i>=ta?(E.setHotelFloors(99),ot=null):E.setHotelFloors(i+h)}K?.update(a,t),We?.update(a);const e=t*.001;if(E?.setTime(e),xe.uniforms.uTime=e,Fe&&!j.isWalking&&j.flyTo({heading:j.state.heading+.16*a},0),j.update(a),re.frames++,t-re.t0>=2e3){re.fps=Math.round(re.frames*1e3/(t-re.t0)),re.frames=0,re.t0=t,window.__FPS__=re.fps;const o=!!E&&E.sections.loaded>=E.sections.total&&t-vt>8e3;E&&E.sections.loaded>=E.sections.total&&!vt&&(vt=t),o&&document.visibilityState==="visible"&&(re.fps<20&&oe>.25&&!window.__DBG__.lock?++re.low>=3&&(oe=oe>=1?.5:.25,re.low=0,Ge()):re.low=0)}requestAnimationFrame(Kt)}requestAnimationFrame(Kt);addEventListener("resize",Ge);
