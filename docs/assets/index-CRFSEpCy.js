var ro=Object.defineProperty;var lo=(t,i,e)=>i in t?ro(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e;var N=(t,i,e)=>lo(t,typeof i!="symbol"?i+"":i,e);import{C as b,a as $t,T as Pt,M as V,b as Le,c as Xe,H as co,P as Qt,d as qe,L as uo,U as R,V as re,e as je,f as We,g as pt,h as gt,i as it,j as ho,S as xe,I as eo,k as fo,l as mo,m as O,n as nt,R as po,o as Je,A as ge,p as Dt,q as go,r as vo,s as yo,t as Ke,u as Ut,v as Et,G as xo,B as bo,w as bt,x as wo,y as Co,z as Mo,D as ko,J as $e,E as So,F as zo,K as To}from"./cesium-NqgYyKJC.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const wt="/HLF/",Po=wt.endsWith("/")?wt:wt+"/",Eo=Po+"cesium/";window.CESIUM_BASE_URL=Eo;const dt={longitude:-74.04145021,latitude:4.70207636,height:2572},Ct={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},ut={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},He={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},Ao=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Bt=-1.5533,Vt=-.012,Lo=4200,Ro=6,jt=1.7;class _o{constructor(i){N(this,"viewer");N(this,"canvas");N(this,"pivot",new b);N(this,"heading",.5);N(this,"pitch",-.6);N(this,"range",1200);N(this,"targetPivot",new b);N(this,"targetHeading",.5);N(this,"targetPitch",-.6);N(this,"targetRange",1200);N(this,"damping",9);N(this,"drag",null);N(this,"pointers",new Map);N(this,"pinch",null);N(this,"lastTap",0);N(this,"keys",new Set);N(this,"tween",null);N(this,"fov",$t.toRadians(48));N(this,"walking",!1);N(this,"eye",new b);N(this,"eyeTarget",new b);N(this,"wHeading",0);N(this,"wPitch",0);N(this,"wHeadingT",0);N(this,"wPitchT",0);N(this,"onPick",null);N(this,"onModeChange",null);N(this,"groundHeight",null);this.viewer=i,this.canvas=i.scene.canvas,i.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:b.clone(this.targetPivot)}}setPivot(i,e=!0){if(e){const a=b.clone(this.viewer.camera.positionWC),s=b.subtract(a,i,new b),r=b.magnitude(s),u=Pt.eastNorthUpToFixedFrame(i),c=V.inverseTransformation(u,new V),M=V.multiplyByPointAsVector(c,s,new b);if(r>1){const f=-Math.asin(Math.max(-1,Math.min(1,M.z/r)));if(f<Vt&&f>Bt){let m=Math.atan2(-M.x,-M.y);for(;m-this.heading>Math.PI;)m-=Math.PI*2;for(;m-this.heading<-Math.PI;)m+=Math.PI*2;this.heading=this.targetHeading=m,this.pitch=this.targetPitch=f,this.range=this.targetRange=this.clamp(r),b.clone(i,this.pivot)}}}this.targetPivot=b.clone(i),this.tween=null}bind(){const i=this.canvas;i.style.touchAction="none",i.addEventListener("pointerdown",a=>{if(i.setPointerCapture(a.pointerId),this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2){const[s,r]=[...this.pointers.values()];this.pinch={distance:Math.hypot(s.x-r.x,s.y-r.y),range:this.targetRange,cx:(s.x+r.x)/2,cy:(s.y+r.y)/2},this.drag=null;return}a.button===2||a.button===1||a.shiftKey?this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"pan",moved:!1}:a.button===0&&(this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"orbit",moved:!1}),this.tween=null}),i.addEventListener("pointermove",a=>{if(!this.pointers.has(a.pointerId))return;if(this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2&&this.pinch){const[u,c]=[...this.pointers.values()],M=Math.hypot(u.x-c.x,u.y-c.y),f=(u.x+c.x)/2,m=(u.y+c.y)/2;this.walking?this.walk((this.pinch.cy-m)*.06,0):(M>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/M)),this.pan(this.pinch.cx-f,m-this.pinch.cy)),this.pinch.cx=f,this.pinch.cy=m;return}if(!this.drag||a.pointerId!==this.drag.id)return;const s=a.offsetX-this.drag.x,r=a.offsetY-this.drag.y;this.drag.x=a.offsetX,this.drag.y=a.offsetY,Math.abs(s)+Math.abs(r)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=s*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+r*.0028))):this.walk(r*.05,-s*.05):this.drag.mode==="orbit"?(this.targetHeading-=s*.0042,this.targetPitch=this.clampPitch(this.targetPitch-r*.0034)):this.pan(-s,r)});const e=a=>{if(this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&a.pointerId===this.drag.id){const s=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,s&&a.type==="pointerup"){const r=new Le(a.offsetX,a.offsetY),u=performance.now();if(a.pointerType!=="mouse"&&u-this.lastTap<320){this.lastTap=0,this.focusAt(r);return}this.lastTap=u;const c=this.pickWorld(r);c&&!this.walking&&this.setPivot(c,!0),this.onPick?.(c)}}};i.addEventListener("pointerup",e),i.addEventListener("pointercancel",e),i.addEventListener("contextmenu",a=>a.preventDefault()),i.addEventListener("wheel",a=>{a.preventDefault(),this.tween=null;const s=a.deltaMode===1?16:a.deltaMode===2?100:1,r=a.deltaY*s;if(this.walking){this.walk(-r*.02,0);return}const u=Math.exp(Math.max(-.45,Math.min(.45,r*.0016))),c=this.pickWorld(new Le(a.offsetX,a.offsetY)),M=this.clamp(this.targetRange*u);if(c&&u<1){const f=Math.min(.45,(this.targetRange-M)/this.targetRange)*.8,m=b.subtract(c,this.targetPivot,new b),w=b.magnitude(m);if(w>1){const h=Math.min(w,this.targetRange)*f/w;b.add(this.targetPivot,b.multiplyByScalar(m,h,m),this.targetPivot)}}this.targetRange=M},{passive:!1}),i.addEventListener("dblclick",a=>{a.preventDefault(),this.focusAt(new Le(a.offsetX,a.offsetY))}),addEventListener("keydown",a=>{a.target instanceof HTMLInputElement||(this.keys.add(a.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(a.code)&&a.preventDefault())}),addEventListener("keyup",a=>this.keys.delete(a.code)),addEventListener("blur",()=>this.keys.clear())}clamp(i,e=Ro,a=Lo){return Math.max(e,Math.min(a,i))}clampPitch(i){return Math.max(Bt,Math.min(Vt,i))}moveHorizontal(i,e,a,s){const r=Pt.eastNorthUpToFixedFrame(i),u=new b(Math.sin(e)*a+Math.cos(e)*s,Math.cos(e)*a-Math.sin(e)*s,0);V.multiplyByPoint(r,u,i)}pan(i,e){const a=this.canvas.clientHeight||1,s=2*this.range*Math.tan(this.fov/2)/a,r=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,e*s/r,i*s),this.tween=null}walk(i,e){this.moveHorizontal(this.eyeTarget,this.wHeading,i,e),this.snapEye()}snapEye(){const i=Xe.fromCartesian(this.eyeTarget),e=this.groundHeight?.(i);e!==void 0&&Number.isFinite(e)&&(i.height=e+jt,Xe.toCartesian(i,void 0,this.eyeTarget))}pickWorld(i){const e=this.viewer.scene;let a;if(e.pickPositionSupported&&e.pick(i,4,4)&&(a=e.pickPosition(i)),!a){const s=e.camera.getPickRay(i);s&&(a=e.globe.pick(s,e)??void 0)}return a??null}focusAt(i){const e=this.pickWorld(i);if(e){if(this.walking){b.clone(e,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:e,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(i,e=2){this.walking&&this.exitWalk(!1);const a={pivot:i.pivot??b.clone(this.targetPivot),heading:i.heading??this.targetHeading,pitch:i.pitch??this.targetPitch,range:i.range??this.targetRange};let s=a.heading;for(;s-this.targetHeading>Math.PI;)s-=Math.PI*2;for(;s-this.targetHeading<-Math.PI;)s+=Math.PI*2;if(a.heading=s,e<=.02){this.tween=null,this.targetPivot=b.clone(a.pivot),this.pivot=b.clone(a.pivot),this.heading=this.targetHeading=a.heading,this.pitch=this.targetPitch=a.pitch,this.range=this.targetRange=a.range;return}this.tween={from:{pivot:b.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:a,start:performance.now(),duration:e*1e3}}enterWalk(i){b.clone(i??this.targetPivot,this.eyeTarget),this.snapEye(),b.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(i=!0){if(!this.walking)return;this.walking=!1;const e=Xe.fromCartesian(this.eyeTarget);e.height-=jt-1;const a=Xe.toCartesian(e);this.pivot=b.clone(a),this.targetPivot=a,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,i?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(i){if(!this.keys.size)return;const e=this.keys,a=e.has("ShiftLeft")||e.has("ShiftRight")?3:1;let s=0,r=0;(e.has("KeyW")||e.has("ArrowUp"))&&(s+=1),(e.has("KeyS")||e.has("ArrowDown"))&&(s-=1),(e.has("KeyD")||e.has("ArrowRight"))&&(r+=1),(e.has("KeyA")||e.has("ArrowLeft"))&&(r-=1);let u=0;if(e.has("KeyQ")&&(u+=1),e.has("KeyE")&&(u-=1),this.walking){u&&(this.wHeadingT-=u*1.2*i),(s||r)&&this.walk(s*4.2*a*i,r*3.4*a*i);return}if(u&&(this.targetHeading+=u*.9*i,this.tween=null),(e.has("PageUp")||e.has("Equal")||e.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*i))),(e.has("PageDown")||e.has("Minus")||e.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*i))),e.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*i)),e.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*i)),!s&&!r)return;const c=Math.max(8,this.range*.6)*a*i;this.moveHorizontal(this.targetPivot,this.heading,s*c,r*c),this.tween=null}update(i){this.updateKeys(i);const e=1-Math.exp(-this.damping*i);if(this.walking){b.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*i),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*e,this.wPitch+=(this.wPitchT-this.wPitch)*e,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const a=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),s=Ao(a),{from:r,to:u}=this.tween;b.lerp(r.pivot,u.pivot,s,this.targetPivot),this.targetHeading=r.heading+(u.heading-r.heading)*s,this.targetPitch=r.pitch+(u.pitch-r.pitch)*s,this.targetRange=Math.exp(Math.log(r.range)+(Math.log(u.range)-Math.log(r.range))*s),a>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*e,this.pitch+=(this.targetPitch-this.pitch)*e,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*e),b.lerp(this.pivot,this.targetPivot,e,this.pivot),this.viewer.camera.lookAt(this.pivot,new co(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(V.IDENTITY)}}function Io(){return new We({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const to=()=>({uAerial:{type:R.SAMPLER_2D,value:Io()},uAerialRect:{type:R.VEC4,value:new je(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:R.FLOAT,value:0}}),oo=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,Qe=`
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
`;function Fo(){return new qe({uniforms:{uNight:{type:R.FLOAT,value:0},uTarde:{type:R.FLOAT,value:0},uSkyFill:{type:R.FLOAT,value:.24},uHazeAmount:{type:R.FLOAT,value:.08},uHazeStart:{type:R.FLOAT,value:1200},uHotelPisos:{type:R.FLOAT,value:99},uRevitBox:{type:R.VEC4,value:new je(0,0,0,0)},uLean:{type:R.VEC2,value:new Le(0,0)},...to()},varyings:{vPosM:re.VEC3,vUpEC:re.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Qe+oo+`
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
    `})}function Ho(t,i,e){return new qe({uniforms:{uNight:{type:R.FLOAT,value:0},uTarde:{type:R.FLOAT,value:0},uSkyFill:{type:R.FLOAT,value:.22},uHazeAmount:{type:R.FLOAT,value:.08},uHazeStart:{type:R.FLOAT,value:1200},uTime:{type:R.FLOAT,value:0},uFrame:{type:R.FLOAT,value:i},uTop:{type:R.FLOAT,value:e},uAtlas:{type:R.SAMPLER_2D,value:new We({url:t,repeat:!1,minificationFilter:gt.LINEAR_MIPMAP_LINEAR,magnificationFilter:pt.LINEAR})}},varyings:{vUV:re.VEC2,vView:re.VEC3,vRightT:re.VEC2,vUpT:re.VEC2,vUpEC:re.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:Qe+`
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
    `})}function No(){return new qe({uniforms:{uNight:{type:R.FLOAT,value:0},uTarde:{type:R.FLOAT,value:0},uHazeAmount:{type:R.FLOAT,value:.08},uHazeStart:{type:R.FLOAT,value:1200}},lightingModel:uo.UNLIT,fragmentShaderText:Qe+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function Oo(t,i,e){return new Qt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:t,uNorth:i,uUp:e,uSkyZenith:new b(.16,.42,.82),uSkyHorizon:new b(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function Do(){return new Qt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new b(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function Uo(t){const i=e=>({type:R.SAMPLER_2D,value:new We({url:t+e,repeat:!0,minificationFilter:gt.LINEAR_MIPMAP_LINEAR,magnificationFilter:pt.LINEAR})});return new qe({uniforms:{uNight:{type:R.FLOAT,value:0},uTarde:{type:R.FLOAT,value:0},uGroundFill:{type:R.FLOAT,value:.12},uHazeAmount:{type:R.FLOAT,value:.08},uHazeStart:{type:R.FLOAT,value:1200},uAsfalto:i("tex_asfalto.webp"),uAnden:i("tex_anden.webp"),uPrado:i("tex_prado.webp"),uCiclo:i("tex_ciclo.webp"),...to()},varyings:{vG:re.VEC3,vUpEC:re.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Qe+oo+`
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
    `})}function Bo(){return new qe({uniforms:{uNight:{type:R.FLOAT,value:0},uTarde:{type:R.FLOAT,value:0},uSkyFill:{type:R.FLOAT,value:.24},uHazeAmount:{type:R.FLOAT,value:.08},uHazeStart:{type:R.FLOAT,value:1200}},varyings:{vPosM:re.VEC3,vUpEC:re.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Qe+`
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
    `})}function Rt(){return Pt.eastNorthUpToFixedFrame(b.fromDegrees(dt.longitude,dt.latitude,dt.height))}function ie(t,i,e,a=Rt()){return V.multiplyByPoint(a,new b(t,i,e),new b)}const Vo={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function jo(t,i,e){let a=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){const[u,c]=e[s],[M,f]=e[r];c>i!=f>i&&t<(M-u)*(i-c)/(f-c)+u&&(a=!a)}return a}function Wo(t,i,e){let a=1/0;for(let s=0,r=e.length-1;s<e.length;r=s++){const[u,c]=e[r],[M,f]=e[s],m=M-u,w=f-c,h=Math.max(0,Math.min(1,((t-u)*m+(i-c)*w)/(m*m+w*w||1)));a=Math.min(a,Math.hypot(t-u-h*m,i-c-h*w))}return a}async function qo(t,i,e){const a=t.scene,s=Rt(),r=V.inverseTransformation(s,new V),u=He.secciones;i("Contexto urbano",.08);const[c,M,f,m]=await Promise.all([fetch(u+"recorte.json").then(o=>o.json()),fetch(u+"edificios.json").then(o=>o.json()),fetch(u+"arboles.json").then(o=>o.json()),fetch(u+"suelo.json").then(o=>o.json())]),w=()=>c.clips.map(o=>{const n=new nt({positions:b.fromDegreesArray(o.flat())}),v=n.computeRectangle();return n.computeRectangle=g=>po.clone(v,g),n});a.globe.clippingPolygons=new it({polygons:w()});const h=No();let x=null;try{x=await ho.fromUrl(He.googleTiles,{maximumScreenSpaceError:10,shadows:xe.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),x.clippingPolygons=new it({polygons:w()}),x.customShader=h,a.primitives.add(x)}catch(o){console.warn("Tiles de Google no disponibles",o)}const C=[-236,330],k=[];for(const o of M.secciones){const n=o.key==="Hotel";k.push({key:o.key,file:n?"hotel_fachadas.glb":o.file,kind:n?"cubierta_pbr":"edificios",label:n?"Hotel La Fontana 3D":`Edificaciones · sector ${o.key}`,dist:n?-2:Math.hypot(o.c[0]-C[0],o.c[1]-C[1])})}k.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),k.push({key:"hotel_plazoleta",file:"hotel_plazoleta.glb",kind:"cubierta_pbr",label:"Plazoleta y acceso · Hotel",dist:-.8}),k.push({key:"torres_vecinas",file:"torres_vecinas.glb",kind:"cubierta_pbr",label:"Torres vecinas PBR",dist:-.6}),k.push({key:"esquina_ak15",file:"esquina_ak15.glb",kind:"cubierta_pbr",label:"Esquina Ak 15 PBR",dist:-.55}),k.push({key:"metro127",file:"metro127.glb",kind:"cubierta_pbr",label:"Metro 127 · Sonesta PBR",dist:-.52}),k.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),k.sort((o,n)=>o.dist-n.dist);const U={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},p=m.secciones.map(o=>({key:o.key,file:o.file,kind:"suelo",capa:U[o.key]?.[0]??0,label:U[o.key]?.[1]??o.key,dist:-3})),A=f.secciones.map(o=>({key:o.key,file:o.file,kind:"arboles",atlas:o.atlas,marco:o.marco,marcoSup:o.marcoSup,label:Vo[o.key]??"Vegetación",dist:0})),P=[...p,...k.slice(0,4),...A.slice(0,3),...k.slice(4,9),...A.slice(3),...k.slice(9)],y=Fo(),S=Bo(),_=Uo(u),K=(async()=>{try{const o=await eo.fromAssetId(He.imageryAssetId),n=18,v=o.tilingScheme,g=(q,me)=>Xe.fromCartesian(ie(q,me,0,s)),z=v.positionToTileXY(g(-1010,930),n),E=v.positionToTileXY(g(1010,-940),n),T=E.x-z.x+1,H=E.y-z.y+1,B=o.tileWidth,G=document.createElement("canvas");G.width=T*B,G.height=H*B;const j=G.getContext("2d"),Me=[];for(let q=z.y;q<=E.y;q++)for(let me=z.x;me<=E.x;me++)Me.push([me,q]);const Fe=async([q,me])=>{for(let Ft=0;Ft<40;Ft++){const Ht=o.requestImage(q,me,n);if(Ht){try{const Ge=await Ht,Nt=(q-z.x)*B,Ot=(me-z.y)*B;typeof ImageBitmap<"u"&&Ge instanceof ImageBitmap?(j.save(),j.translate(Nt,Ot+B),j.scale(1,-1),j.drawImage(Ge,0,0,B,B),j.restore()):j.drawImage(Ge,Nt,Ot,B,B)}catch{}return}await new Promise(Ge=>setTimeout(Ge,120))}};j.fillStyle="#6a6f62",j.fillRect(0,0,G.width,G.height);const D=Array.from({length:6},async()=>{for(;Me.length;)await Fe(Me.shift())});await Promise.all(D);const $=document.createElement("canvas");$.width=$.height=4096,$.getContext("2d").drawImage(G,0,0,4096,4096);const W=await new Promise(q=>$.toBlob(q,"image/jpeg",.92));if(!W)return;const te=URL.createObjectURL(W);window.__AERIAL_URL__=te;const oe=v.tileXYToRectangle(z.x,z.y,n),ue=v.tileXYToRectangle(E.x,E.y,n),fe=(q,me)=>V.multiplyByPoint(r,b.fromRadians(q,me,dt.height),new b),Pe=fe(oe.west,ue.south),ke=fe(ue.east,oe.north),Ye=new je(Pe.x,Pe.y,ke.x,ke.y);for(const q of[y,_])q.setUniform("uAerial",new We({url:te,repeat:!1,minificationFilter:gt.LINEAR_MIPMAP_LINEAR,magnificationFilter:pt.LINEAR})),q.setUniform("uAerialRect",Ye),q.setUniform("uAerialOn",1)}catch(o){console.warn("Foto aérea no disponible",o)}})(),X=[],ee=[],Q=[];let Ce=null;const de=new fo(new b(0,-1,0),1e3);let _e=0,Te=0,le=.22,he=.08,ce=1200;const Ie={total:P.length,loaded:0,failed:[]},ot=async o=>{try{const n=await Je.fromGltfAsync({url:u+o.file,modelMatrix:s,upAxis:ge.Y,forwardAxis:ge.X,shadows:o.kind==="arboles"?xe.CAST_ONLY:o.kind==="suelo"?xe.RECEIVE_ONLY:xe.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:o.kind!=="arboles"});if(o.kind==="suelo")n.customShader=_;else if(o.kind==="arboles"){const g=Ho(u+o.atlas,o.marco,o.marcoSup);g.setUniform("uNight",_e),g.setUniform("uTarde",Te),g.setUniform("uSkyFill",le),g.setUniform("uHazeAmount",he),g.setUniform("uHazeStart",ce),X.push(g),n.customShader=g}else o.key==="Hotel"||o.key==="hotel_plazoleta"||o.key==="hotel_cubiertas"?n.customShader=S:o.kind!=="cubierta_pbr"&&(n.customShader=y);const v=o.key==="Hotel"||o.key==="hotel_plazoleta"||o.key==="hotel_cubiertas";n.imageBasedLighting.imageBasedLightingFactor=v?new Le(1,.75):o.kind==="cubierta_pbr"?new Le(.85,.55):new Le(.68,.38),a.primitives.add(n),o.kind==="arboles"&&ee.push(n),(o.key==="Hotel"||o.key==="hotel_cubiertas")&&Q.push(n),await new Promise(g=>{if(n.ready)return g();const z=n.readyEvent.addEventListener(()=>{z(),g()});setTimeout(g,2e4)})}catch(n){console.error("Sección no cargada",o.file,n),Ie.failed.push(o.file)}Ie.loaded++,e?.(Ie.loaded,Ie.total,o.label)},De=p.length+7,at=async(o,n,v)=>{let g=0,z=0;await Promise.all(Array.from({length:Math.min(n,o.length)},async()=>{for(;g<o.length;){const E=o[g++];await ot(E),v?.(++z)}}))},l=P.slice(0,De);await at(l,5,o=>i(l[Math.min(o,l.length-1)].label,.2+.75*o/l.length));const d=(async()=>{await at(P.slice(De),3),await K})();return{matrix:s,inverse:r,tileset:x,buildings:M.edificios,treeCount:f.total,sections:Ie,done:d,setNight(o){h.setUniform("uNight",o),y.setUniform("uNight",o),S.setUniform("uNight",o),_e=o,_.setUniform("uNight",o);for(const n of X)n.setUniform("uNight",o)},setTarde(o){h.setUniform("uTarde",o),y.setUniform("uTarde",o),S.setUniform("uTarde",o),Te=o,_.setUniform("uTarde",o);for(const n of X)n.setUniform("uTarde",o)},setTime(o){for(const n of X)n.setUniform("uTime",o)},setLook(o){if(o.skyFill!==void 0){le=o.skyFill,y.setUniform("uSkyFill",le),S.setUniform("uSkyFill",le);for(const n of X)n.setUniform("uSkyFill",le)}if(o.groundFill!==void 0&&_.setUniform("uGroundFill",o.groundFill),o.hazeAmount!==void 0){he=o.hazeAmount,y.setUniform("uHazeAmount",he),S.setUniform("uHazeAmount",he),_.setUniform("uHazeAmount",he),h.setUniform("uHazeAmount",he);for(const n of X)n.setUniform("uHazeAmount",he)}if(o.hazeStart!==void 0){ce=o.hazeStart,y.setUniform("uHazeStart",ce),S.setUniform("uHazeStart",ce),_.setUniform("uHazeStart",ce),h.setUniform("uHazeStart",ce);for(const n of X)n.setUniform("uHazeStart",ce)}},setRevitBlocks(o,n=[]){const v=M.edificios.filter(g=>o.includes(g.id)).map(g=>{const z=g.r.reduce((T,H)=>T+H[0],0)/g.r.length,E=g.r.reduce((T,H)=>T+H[1],0)/g.r.length;return new nt({positions:g.r.map(([T,H])=>{const B=T-z,G=H-E,j=Math.hypot(B,G)||1;return ie(T+B/j*1,H+G/j*1,0,s)})})});for(const g of n)v.push(new nt({positions:g.map(([z,E])=>ie(z,E,0,s))}));for(const g of Q)g.clippingPolygons=v.length?new it({polygons:v}):void 0},setRevitZone(o){if(!o){Ce=o?[[o[0],o[1]],[o[2],o[1]],[o[2],o[3]],[o[0],o[3]]].map(([n,v])=>ie(n,v,0,s)):null;for(const n of Q)n.clippingPolygons=Ce?new it({polygons:[new nt({positions:Ce})]}):void 0;y.setUniform("uRevitBox",o?new je(o[0]-1,o[1]-1,o[2]+1,o[3]+1):new je(0,0,0,0))}},setHotelFloors(o){const n=o<98;de.distance=3.2+o*3.05;for(const v of Q)n&&!v.clippingPlanes&&(v.clippingPlanes=new mo({planes:[de],edgeWidth:2,edgeColor:O.fromCssColorString("#d7ebff")})),v.clippingPlanes&&(v.clippingPlanes.enabled=n);y.setUniform("uHotelPisos",o)},setTreesVisible(o){for(const n of ee)n.show=o},buildingAt(o){const n=V.multiplyByPoint(r,o,new b);let v=null,g=1.2;for(const z of M.edificios){if(n.x<z.bb[0]-1.5||n.x>z.bb[2]+1.5||n.y<z.bb[1]-1.5||n.y>z.bb[3]+1.5||n.z>z.b+z.h+2.5)continue;if(jo(n.x,n.y,z.r))return z;const E=Wo(n.x,n.y,z.r);E<g&&(g=E,v=z)}return v}}}const Yo=O.fromCssColorString("#ff2b1a"),Go=O.fromCssColorString("#ffc400"),Xo=O.fromCssColorString("#00e862"),Ue=O.fromCssColorString("#1a1d22");function Mt(t){const i=document.createElement("canvas");i.width=128,i.height=128;const e=i.getContext("2d");if(e.clearRect(0,0,128,128),t==="pare"){e.beginPath();for(let a=0;a<8;a++){const s=(a+.5)*Math.PI/4,r=64+Math.cos(s)*58,u=64+Math.sin(s)*58;a===0?e.moveTo(r,u):e.lineTo(r,u)}e.closePath(),e.fillStyle="#c81e1e",e.fill(),e.lineWidth=5,e.strokeStyle="#ffffff",e.stroke(),e.fillStyle="#ffffff",e.font="bold 31px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("PARE",64,66)}else t==="peaton"?(e.beginPath(),e.moveTo(64,6),e.lineTo(122,64),e.lineTo(64,122),e.lineTo(6,64),e.closePath(),e.fillStyle="#f5b800",e.fill(),e.lineWidth=4,e.strokeStyle="#18181b",e.stroke(),e.fillStyle="#18181b",e.beginPath(),e.arc(64,38,7,0,Math.PI*2),e.fill(),e.fillRect(59,47,10,22),e.fillRect(54,69,7,20),e.fillRect(67,69,7,20)):(e.beginPath(),e.arc(64,64,56,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.lineWidth=11,e.strokeStyle="#c81e1e",e.stroke(),e.fillStyle="#111827",e.font="bold 46px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("30",64,67));return i.toDataURL("image/png")}function Jo(t,i,e,a,s){const r=(p,A,P)=>V.multiplyByPoint(i,new b(p,A,P),new b),u=[],c=e+7.2,M=a+7.2,f=s(c,M),m=O.fromCssColorString("#2a303a"),w=O.fromCssColorString("#14171c"),h=O.fromCssColorString("#eab308"),x=(p,A,P,y)=>{const S=y?.42:.3,_=y?.3:.42;u.push(t.entities.add({position:r(p,A,P),box:{dimensions:new b(S,_,1.18),material:w}}));const K=(de,_e)=>{const Te=t.entities.add({position:r(p,A,P+de),box:{dimensions:new b(y?.24:.33,y?.33:.24,.24),material:_e}});return u.push(Te),Te},X=K(.36,Ue),ee=K(0,Ue),Q=K(-.36,Ue);return{red:X,yellow:ee,green:Q,setState:de=>{X.box.material=new Ke(de==="red"?Yo:Ue),ee.box.material=new Ke(de==="yellow"?Go:Ue),Q.box.material=new Ke(de==="green"?Xo:Ue)}}};if(Math.abs(e+148.8)<12&&Math.abs(a-216.3)<12){const p=[{px:-159.5,py:232,dx:4.2,dy:0,isNS:!0},{px:-163.5,py:226.5,dx:0,dy:-4,isNS:!1},{px:-163,py:203,dx:0,dy:4,isNS:!1},{px:-133.5,py:231.5,dx:4.2,dy:0,isNS:!0},{px:-133,py:202.5,dx:0,dy:4,isNS:!1}],A=[],P=[];for(const S of p){const _=s(S.px,S.py);u.push(t.entities.add({position:r(S.px,S.py,_+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:m}}),t.entities.add({position:r(S.px,S.py,_+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:h}}),t.entities.add({position:r(S.px+S.dx*.5,S.py+S.dy*.5,_+5.65),box:{dimensions:new b(Math.max(.14,Math.abs(S.dx)),Math.max(.14,Math.abs(S.dy)),.14),material:m}}));const K=x(S.px+S.dx*.78,S.py+S.dy*.78,_+5.1,S.isNS);(S.isNS?A:P).push(K)}const y=S=>({red:S[0].red,yellow:S[0].yellow,green:S[0].green,setState:_=>{for(const K of S)K.setState(_)}});return{ns:y(A),ew:y(P),setVisible(S){for(const _ of u)_.show=S}}}u.push(t.entities.add({position:r(c,M,f+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:m}}),t.entities.add({position:r(c,M,f+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:h}}));const C=4.6;u.push(t.entities.add({position:r(c-C*.5,M,f+5.65),box:{dimensions:new b(C,.14,.14),material:m}}),t.entities.add({position:r(c,M-C*.5,f+5.65),box:{dimensions:new b(.14,C,.14),material:m}}));const k=x(c-3.4,M,f+5.1,!0),U=x(c,M-3.4,f+5.1,!1);return{ns:k,ew:U,setVisible(p){for(const A of u)A.show=p}}}function Ko(t,i,e,a,s){const r=(p,A,P)=>V.multiplyByPoint(i,new b(p,A,P),new b),u=[],c=Dt.fromColor(O.fromCssColorString("#f3f4f6").withAlpha(.92)),M=Dt.fromColor(O.fromCssColorString("#f5b800").withAlpha(.92)),f=(p,A,P,y,S,_)=>{if(a(p,A)<.8)return;const K=s(p,A)+.07;r(p,A,K);const X=Et.fromRotationZ(S),ee=V.fromRotationTranslation(X,new b(p,A,K)),Q=V.multiply(i,ee,new V);u.push(new xo({geometry:bo.fromDimensions({dimensions:new b(P,y,.04)}),modelMatrix:Q,attributes:{color:_}}))},m=Math.atan2(-51,380);for(const p of e){if(Math.abs(p.e+148.8)<12&&Math.abs(p.n-216.3)<12){const P=[{bx:-154,by:230,horiz:!0,ang:0},{bx:-164.5,by:221.5,horiz:!1,ang:m},{bx:-164.5,by:210.5,horiz:!1,ang:m},{bx:-154,by:202.5,horiz:!0,ang:0},{bx:-129,by:229,horiz:!1,ang:m},{bx:-128.5,by:211.5,horiz:!1,ang:m},{bx:-136.5,by:202.5,horiz:!0,ang:0}];for(const y of P)for(let S=-3;S<=3;S++){const _=y.horiz?y.bx+S*1.1:y.bx,K=y.horiz?y.by:y.by+S*1.05;f(_,K,y.horiz?.52:2.8,y.horiz?2.8:.52,y.ang,c)}continue}const A=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const P of A){const y=p.e+P.de,S=p.n+P.dn;if(a(y,S)<1.2)continue;for(let X=-3;X<=3;X++){const ee=P.horiz?y+X*1.15:y,Q=P.horiz?S:S+X*1.15;f(ee,Q,P.horiz?.52:2.8,P.horiz?2.8:.52,0,c)}const _=y+(P.de===0?0:Math.sign(P.de)*2.1),K=S+(P.dn===0?0:Math.sign(P.dn)*2.1);f(_,K,P.horiz?6.8:.42,P.horiz?.42:6.8,0,c)}}for(let p=-80;p<=440;p+=8)f(-154,p,.18,3.2,0,c),f(-132,p,.18,3.2,0,c);for(let p=-420;p<=160;p+=8){const A=263-(p+420)*.13421052631578947;f(p,A+7.5,3.2,.18,m,c),f(p,A-7.5,3.2,.18,m,c),f(p,A,4.5,.18,m,M)}for(let p=-160;p<=360;p+=8)f(158,p,.18,3.2,0,c);let w=null;u.length>0&&(w=new go({geometryInstances:u,appearance:new vo({flat:!0,translucent:!0}),asynchronous:!1}),t.scene.primitives.add(w));const h=[],x=Mt("pare"),C=Mt("peaton"),k=Mt("vel30"),U=O.fromCssColorString("#9ca3af");return e.forEach((p,A)=>{const P=[{e:p.e-7.2,n:p.n-7.2,tex:x},{e:p.e+7.2,n:p.n-7.2,tex:A%2===0?C:k}];for(const y of P){const S=s(y.e,y.n);h.push(t.entities.add({position:r(y.e,y.n,S+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:U}}),t.entities.add({position:r(y.e,y.n,S+2.45),billboard:{image:y.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:yo.CENTER}}))}}),{setVisible(p){w&&(w.show=p);for(const A of h)A.show=p}}}function Zo(t,i){const e=(k,U,p)=>V.multiplyByPoint(i,new b(k,U,p),new b),a=[],c=O.fromCssColorString("#7a7771"),M=O.fromCssColorString("#3d3833"),f=O.fromCssColorString("#24471b"),m=O.fromCssColorString("#3d7f8f").withAlpha(.88),w=O.fromCssColorString("#ffbe55");a.push(t.entities.add({position:e(-225,263.5,4.17+.32),cylinder:{length:.64,topRadius:3.3,bottomRadius:3.6,material:c,slices:12}}),t.entities.add({position:e(-225,263.5,4.17+.56),cylinder:{length:.24,topRadius:3.45,bottomRadius:3.55,material:f,slices:12}}),t.entities.add({position:e(-225,263.5,4.17+.66),cylinder:{length:.08,topRadius:2.95,bottomRadius:2.95,material:m,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+1.35),cylinder:{length:1.9,topRadius:.34,bottomRadius:.48,material:M}}),t.entities.add({position:e(-225,263.5,4.17+1.35),cylinder:{length:.18,topRadius:1.95,bottomRadius:1.55,material:M,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+2.2),cylinder:{length:.16,topRadius:1.15,bottomRadius:.85,material:M,slices:24}}));let h=0;const x=new Ke(new Ut(()=>{const k=.62+.18*Math.sin(h*7);return O.fromCssColorString("#d9f4ff").withAlpha(k)},!1)),C=new Ke(new Ut(()=>{const k=.46+.16*Math.cos(h*5.5);return O.fromCssColorString("#bce8f7").withAlpha(k)},!1));a.push(t.entities.add({position:e(-225,263.5,4.17+2.85),cylinder:{length:1.25,topRadius:.08,bottomRadius:.36,material:x,slices:16}}),t.entities.add({position:e(-225,263.5,4.17+1.78),cylinder:{length:.85,topRadius:1.08,bottomRadius:1.22,material:C,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+1.02),cylinder:{length:.72,topRadius:1.88,bottomRadius:2.08,material:C,slices:24}}));for(let k=-246;k<=-202;k+=8.5)a.push(t.entities.add({position:e(k,255.8,4.17+1.1),cylinder:{length:2.2,topRadius:.04,bottomRadius:.05,material:M}}),t.entities.add({position:e(k,255.8,4.17+2.3),ellipsoid:{radii:new b(.16,.16,.22),material:w}}));return{update(k){h=k},setVisible(k){for(const U of a)U.show=k}}}const st=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Wt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],qt=3.2;async function $o(t,i,e=110){const a=He.secciones;let s,r,u;try{s=await fetch(a+"vias_campo.json").then(d=>d.json());const l=new Uint8Array(await fetch(a+"vias_campo.bin").then(d=>d.arrayBuffer()));r=l.subarray(0,s.w*s.h),u=l.subarray(s.w*s.h)}catch{return null}const{cell:c,x0:M,y0:f,w:m,h:w}=s,h=(l,d)=>{const o=(l-M)/c-.5,n=(d-f)/c-.5,v=Math.floor(o),g=Math.floor(n);if(v<0||g<0||v>=m-1||g>=w-1)return 0;const z=o-v,E=n-g,T=g*m+v;return((r[T]*(1-z)+r[T+1]*z)*(1-E)+(r[T+m]*(1-z)+r[T+m+1]*z)*E)*.5},x=(l,d)=>{const o=Math.max(0,Math.min(m-1,Math.floor((l-M)/c))),n=Math.max(0,Math.min(w-1,Math.floor((d-f)/c))),v=n*m+o;if(r[v]>0)return u[v]*.1-2;let g=0,z=0;for(let E=-2;E<=2;E++){const T=n+E;if(!(T<0||T>=w))for(let H=-2;H<=2;H++){const B=o+H;if(B<0||B>=m)continue;const G=T*m+B;if(r[G]===0)continue;const j=1/(H*H+E*E+.5);g+=j,z+=(u[G]*.1-2)*j}}return g>0?z/g:1},C=[],k=[],U=[];for(let l=2;l<w-2;l++)for(let d=2;d<m-2;d++){const o=l*m+d,n=M+(d+.5)*c,v=f+(l+.5)*c,g=Math.hypot(n+180,v-250);if(g>520)continue;const z=r[o]*.5;if(z>=2.6&&z<=5&&C.push(o),z>=6&&g<460&&U.push({e:n,n:v,d:z}),r[o]===0&&g<430){let E=!1;for(let T=-2;T<=2&&!E;T++)for(let H=-2;H<=2;H++)if(r[(l+T)*m+(d+H)]>0){E=!0;break}E&&k.push(o)}}if(!C.length)return null;U.sort((l,d)=>d.d-l.d);const p=[];for(const l of U){if(p.length>=6)break;if(p.some(n=>Math.hypot(n.e-l.e,n.n-l.n)<90))continue;const d=x(l.e,l.n),o=Jo(t,i,l.e,l.n,x);o.ns.setState("green"),o.ew.setState("red"),p.push({e:l.e,n:l.n,u:d,faseOffset:p.length*4.5,rig:o,nsEstado:"green",ewEstado:"red"})}const A=Ko(t,i,p,h,x),P=Zo(t,i),y=(()=>{let l=12345;return()=>(l=l*1664525+1013904223>>>0)/4294967296})(),S=(l,d,o)=>{const n=Math.cos(o),v=Math.sin(o);if(l>=-168&&l<=-118&&Math.abs(v)>.35)return l<-143?v<-.2?12:-1e6:v>.2?12:-1e6;const g=263-(l+420)*(51/380);return Math.abs(d-g)<26&&Math.abs(n)>.35?d>g?n>.2?12:-1e6:n<-.2?12:-1e6:l>=-255&&l<=-210&&d<222&&Math.abs(v)>.35?v<-.2?10:-1e6:d<175&&l<-215&&Math.abs(n)>.35?n>.2?10:-1e6:l<-385&&d<265&&Math.abs(v)>.35?v<-.2?10:-1e6:0},_=[],K=(l,d,o)=>_.some(n=>n!==o&&Math.hypot(n.e-l,n.n-d)<8.5),X=l=>{for(let d=0;d<45;d++){const o=C[Math.floor(y()*C.length)],n=M+(o%m+.5)*c,v=f+(Math.floor(o/m)+.5)*c;if(K(n,v,l))continue;let g=0,z=-1e9;for(let E=0;E<16;E++){const T=E/16*Math.PI*2,H=n+Math.cos(T)*10,B=v+Math.sin(T)*10,G=h(H,B),j=S(H,B,T);if(j<-1e4)continue;const Me=h(n+Math.sin(T)*2.5,v-Math.cos(T)*2.5),Fe=h(n-Math.sin(T)*2.5,v+Math.cos(T)*2.5),D=-Math.abs(G-qt)+(Fe>Me?1.5:0)+j;G>1.5&&D>z&&(z=D,g=T)}if(z>-1e8){l.e=n,l.n=v,l.th=g,l.vActual=l.v*.5;return}}};for(let l=0;l<e;l++){const d=y(),o=d<.12?"sitp_azul":d<.2?"sitp_amarillo":d<.38?"taxi":d<.54?"moto":d<.68?"hatch":d<.84?"suv":"sedan",g={e:0,n:0,th:0,v:o==="moto"?8+y()*4.5:o==="sitp_azul"||o==="sitp_amarillo"?5.2+y()*3:6.5+y()*5,vActual:0,model:null,u:0,tipo:o};X(g),_.push(g)}const ee=[];if(k.length>0)for(let l=0;l<42;l++){const d=k[Math.floor(y()*k.length)],o=M+(d%m+.5)*c,n=f+(Math.floor(d/m)+.5)*c;ee.push({e:o,n,th:y()*Math.PI*2,v:1.15+y()*.45,model:null,u:x(o,n)+.16,conPerro:l%3===0})}const Q=[],Ce=(l,d,o,n,v,g,z,E=.68)=>{for(let T=0;T<v;T++){const H=v===1?(l+d)*.5:l+T/(v-1)*(d-l);for(let B=0;B<g;B++){if(y()>E)continue;const G=g===1?(o+n)*.5:o+B/(g-1)*(n-o);if(h(H,G)>.3)continue;const j=y(),Me=j<.08?"taxi":j<.42?"suv":"sedan",Fe=y()<.5?0:Math.PI,D=x(H,G);Q.push({e:H+(y()-.5)*.25,n:G+(y()-.5)*.25,u:D>-1.5?D:3.55,th:z+Fe+(y()-.5)*.07,tipo:Me,model:null})}}};Ce(92,134,-22,62,4,15,.05,.7),Ce(52,108,114,146,5,4,.12,.62),Ce(58,106,-104,-56,4,6,.1,.65),Ce(-132,-98,-46,32,3,12,.04,.68);const de=new b,_e=new Et,Te=new V,le=(l,d=.08)=>{l.model&&(b.fromElements(l.e,l.n,l.u+d,de),Et.fromRotationZ(l.th,_e),V.fromRotationTranslation(_e,de,Te),l.model.modelMatrix=V.multiply(i,Te,new V))},he={sedan:"carro.glb",suv:"carro_suv.glb",hatch:"carro_hatch.glb",taxi:"carro_taxi.glb",moto:"carro_moto.glb",sitp_azul:"sitp_azul.glb",sitp_amarillo:"sitp_amarillo.glb"},ce=l=>l==="taxi"||l==="sitp_azul"||l==="sitp_amarillo",Ie=(async()=>{for(let l=0;l<_.length;l++){const d=_[l],o=he[d.tipo];try{const n=await Je.fromGltfAsync({url:a+o,upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,color:ce(d.tipo)?O.WHITE:O.fromCssColorString(st[l%st.length]),colorBlendMode:bt.MIX,colorBlendAmount:ce(d.tipo)?0:.32});t.scene.primitives.add(n),d.model=n,d.u=x(d.e,d.n),le(d)}catch{}l%6===5&&await new Promise(n=>setTimeout(n,35))}for(let l=0;l<ee.length;l++){const d=ee[l];try{const o=await Je.fromGltfAsync({url:a+(d.conPerro?"persona_perro.glb":"persona.glb"),upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,color:O.fromCssColorString(Wt[l%Wt.length]),colorBlendMode:bt.MIX,colorBlendAmount:.25});t.scene.primitives.add(o),d.model=o,le(d,0)}catch{}l%6===5&&await new Promise(o=>setTimeout(o,35))}for(let l=0;l<Q.length;l++){const d=Q[l],o=he[d.tipo];try{const n=await Je.fromGltfAsync({url:a+o,upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,color:ce(d.tipo)?O.WHITE:O.fromCssColorString(st[l*3%st.length]),colorBlendMode:bt.MIX,colorBlendAmount:ce(d.tipo)?0:.32});t.scene.primitives.add(n),d.model=n,le(d)}catch{}l%8===7&&await new Promise(n=>setTimeout(n,30))}})();let ot=!0,De=0;const at=(l,d)=>h(l,d)===0&&h(l+4,d)+h(l-4,d)+h(l,d+4)+h(l,d-4)>.5;return{ready:Ie,count:e,debug:()=>_.map(l=>[Math.round(l.e),Math.round(l.n),+l.u.toFixed(1),l.model?1:0]),setVisible(l){ot=l;for(const d of _)d.model&&(d.model.show=l);for(const d of Q)d.model&&(d.model.show=l);for(const d of ee)d.model&&(d.model.show=l);for(const d of p)d.rig.setVisible(l);A.setVisible(l),P.setVisible(l)},update(l){if(!ot)return;const d=Math.min(.08,Math.max(.001,l));De+=d,P.update(De);for(const o of p){const n=(De+o.faseOffset)%24,v=n<10?"green":n<12?"yellow":"red",g=n>=12&&n<22?"green":n>=22?"yellow":"red";v!==o.nsEstado&&(o.nsEstado=v,o.rig.ns.setState(v)),g!==o.ewEstado&&(o.ewEstado=g,o.rig.ew.setState(g))}for(let o=0;o<_.length;o++){const n=_[o];if(!n.model)continue;let v=0,g=-1e9;for(let D=-4;D<=4;D++){const $=D*.13,W=n.th+$,te=n.e+Math.cos(W)*9,oe=n.n+Math.sin(W)*9,ue=h(te,oe);if(ue<1.1||h(n.e+Math.cos(W)*4.5,n.n+Math.sin(W)*4.5)<.9)continue;const Pe=S(te,oe,W);if(Pe<-1e4)continue;const ke=h(te+Math.sin(W)*2.5,oe-Math.cos(W)*2.5),Ye=h(te-Math.sin(W)*2.5,oe+Math.cos(W)*2.5),q=-Math.abs(Math.min(ue,6)-qt)-Math.abs($)*1.6+(Ye>=ke?.6:0)+Pe;q>g&&(g=q,v=$)}if(g<-1e8||Math.hypot(n.e+180,n.n-250)>580){X(n),n.u=x(n.e,n.n),le(n);continue}const z=Math.cos(n.th),E=Math.sin(n.th);let T=1;const H=n.tipo==="sitp_azul"||n.tipo==="sitp_amarillo",B=H?9.5:6.4,G=H?16.5:12.5;for(let D=0;D<_.length;D++){if(D===o||!_[D].model)continue;const $=_[D],W=$.e-n.e,te=$.n-n.n,oe=W*W+te*te;if(oe>320)continue;const ue=$.tipo==="sitp_azul"||$.tipo==="sitp_amarillo",fe=B+(ue?3:0),Pe=G+(ue?3:0),ke=W*z+te*E,Ye=Math.abs(-W*E+te*z);if(ke>0&&ke<Pe&&Ye<2.45){const q=ke<fe?0:(ke-fe)/(Pe-fe);q<T&&(T=q)}else oe<(H||ue?42:22)&&D<o&&(T=0)}const j=Math.abs(z)>Math.abs(E);for(const D of p){if((j?D.ewEstado:D.nsEstado)==="green")continue;const W=D.e-n.e,te=D.n-n.n,oe=W*z+te*E,ue=Math.abs(-W*E+te*z);if(oe>7&&oe<21&&ue<9){const fe=oe<10.5?0:(oe-10.5)/10.5;fe<T&&(T=fe)}}const Me=1-Math.min(.55,Math.abs(v)*1.4),Fe=n.v*Me*T;if(n.vActual+=(Fe-n.vActual)*Math.min(1,d*4.5),n.vActual>.05){n.th+=Math.max(-1.4*d,Math.min(1.4*d,v));const D=n.e+Math.cos(n.th)*n.vActual*d,$=n.n+Math.sin(n.th)*n.vActual*d;h(D,$)>=.7?(n.e=D,n.n=$):n.th+=.6;const W=Math.max(x(n.e,n.n),x(n.e+Math.cos(n.th)*1.4,n.n+Math.sin(n.th)*1.4),x(n.e-Math.cos(n.th)*1.4,n.n-Math.sin(n.th)*1.4));n.u+=(W-n.u)*Math.min(1,d*8)}le(n)}for(const o of ee){if(!o.model)continue;const n=o.e+Math.cos(o.th)*o.v*d,v=o.n+Math.sin(o.th)*o.v*d;at(n,v)&&Math.hypot(n+180,v-250)<430?(o.e=n,o.n=v,o.u+=(x(o.e,o.n)+.16-o.u)*Math.min(1,d*4)):o.th+=.9+y()*1.2,le(o,0)}}}}async function Yt(t,i){try{const e=new Image;e.decoding="async",e.src=t,await e.decode();const a=document.createElement("canvas");a.width=e.naturalWidth,a.height=e.naturalHeight;const s=a.getContext("2d");s.drawImage(e,0,0);const r=s.getImageData(0,0,a.width,a.height);return new We({typedArray:new Uint8Array(r.data.buffer),width:a.width,height:a.height,repeat:!0,minificationFilter:gt.LINEAR_MIPMAP_LINEAR,magnificationFilter:pt.LINEAR})}catch{return new We({typedArray:new Uint8Array([...i,255]),width:1,height:1})}}function Qo(t,i){return new qe({uniforms:{uNight:{type:R.FLOAT,value:0},uLadrillo:{type:R.SAMPLER_2D,value:t},uTeja:{type:R.SAMPLER_2D,value:i}},varyings:{vRP:re.VEC3,vRN:re.VEC3},vertexShaderText:`
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
    `})}async function ea(t,i){const e=He.secciones;let a;try{a=await fetch(e+"revit.json").then(h=>h.json())}catch{return null}const[s,r]=await Promise.all([Yt(e+"tex_ladrillo.webp",[107,84,76]),Yt(e+"tex_teja.webp",[90,52,28])]),u=Qo(s,r),c=[];for(const h of a.niveles)try{const x=await Je.fromGltfAsync({url:e+h.file,modelMatrix:i,upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,backFaceCulling:!1,show:!1});x.customShader=u,x.imageBasedLighting.imageBasedLightingFactor=new Le(.45,.25),t.scene.primitives.add(x),c.push({...h,model:x,off:0,target:0,delay:0,shown:!1})}catch(x){console.warn("Nivel de Revit no cargado",h.file,x)}if(!c.length)return null;const M=46,f=new V,m=h=>{const x=V.fromTranslation(new b(0,0,h.off),f);h.model.modelMatrix=V.multiply(i,x,new V)},w={niveles:c.map(h=>({i:h.i,nombre:h.nombre})),caja:a.caja,bloques:a.bloques??[],huella:a.huella??[],ready:!0,visible:!1,abierto:-1,play(){w.visible=!0,w.abierto=-1;const h=performance.now();c.forEach((x,C)=>{x.off=M,x.target=0,x.delay=h+C*620,x.shown=!1,x.model.show=!1,m(x)})},openAt(h){w.visible=!0,w.abierto=h;const x=performance.now();let C=0;for(const k of[...c].reverse())k.i>h&&(k.target=M,k.delay=x+C++*110);for(const k of c)k.i<=h&&(k.target=0,k.delay=x,k.shown||(k.off=M))},full(){w.visible=!0,w.abierto=-1;const h=performance.now();c.forEach((x,C)=>{(x.target!==0||!x.shown)&&(x.target=0,x.delay=h+C*110,x.shown||(x.off=M))})},hide(){w.visible=!1,w.abierto=-1;for(const h of c)h.model.show=!1,h.shown=!1,h.off=0,h.target=0},setNight(h){u.setUniform("uNight",h)},update(h,x){if(w.visible)for(const C of c){if(x<C.delay)continue;C.target===0&&!C.shown&&(C.shown=!0,C.model.show=!0);const k=C.target-C.off;if(Math.abs(k)<.01){C.off!==C.target&&(C.off=C.target,m(C)),C.target!==0&&C.shown&&(C.shown=!1,C.model.show=!1);continue}const U=C.target===0?1-Math.exp(-5.2*h):1-Math.exp(-4*h);C.off+=k*U,m(C)}}};return w}function ta(t,i){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);const a=document.createElement("aside");a.className="pisos",a.hidden=!0,a.innerHTML="<small>Pisos · modelo Revit</small>";const s=new Map,r=(c,M,f)=>{const m=document.createElement("button");m.innerHTML=`${M}<span>${f}</span>`,m.addEventListener("click",()=>i(c)),s.set(c,m),a.appendChild(m)};r(-1,"Edificio completo","");for(const c of[...t.niveles].reverse())r(c.i,c.nombre.charAt(0)+c.nombre.slice(1).toLowerCase(),`N${c.i+1}`);document.body.appendChild(a);const u=c=>s.forEach((M,f)=>M.classList.toggle("on",f===c));return u(-1),{show:c=>{a.hidden=!c},mark:u}}const rt={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function kt(t){const i=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(!i)return[1,1,1];const e=parseInt(i[1],16);return[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}const oa=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function aa(t){const i={dia:{...rt.dia},tarde:{...rt.tarde},noche:{...rt.noche}};let e="dia";const a=document.createElement("button");a.id="btnLookStudio",a.className="look-toggle",a.textContent="⚙ Ajustar luz",a.title="Abrir editor de iluminación y color (L)",document.body.appendChild(a);const s=document.createElement("aside");s.id="lookPanel",s.className="look-panel",s.hidden=!0,s.innerHTML=`
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
  `,document.body.appendChild(s);const r=s.querySelector("#lpBody"),u=new Map;for(const w of oa){const h=document.createElement("section");h.className="lp-sec";const x=document.createElement("h4");x.textContent=w.title,h.appendChild(x);for(const C of w.items){const k=document.createElement("label");k.className="lp-row";const U=document.createElement("span");U.className="lp-lbl",U.textContent=C.label,k.appendChild(U);const p=document.createElement("input");p.type=C.type,C.type==="range"&&(p.min=String(C.min),p.max=String(C.max),p.step=String(C.step));const A=C.type==="range"?document.createElement("span"):void 0;A&&(A.className="lp-val"),p.addEventListener("input",()=>{const y=i[e];if(C.type==="range"){const S=parseFloat(p.value);y[C.key]=S,A&&(A.textContent=C.step&&C.step>=1?String(Math.round(S)):S.toFixed(2))}else y[C.key]=p.value;t(e,y)});const P=document.createElement("div");P.className="lp-ctrl",P.appendChild(p),A&&P.appendChild(A),k.appendChild(P),h.appendChild(k),u.set(C.key,{input:p,val:A})}r.appendChild(h)}const c={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function M(){const w=i[e],h=s.querySelector("#lpPresetName");h&&(h.textContent=c[e]);for(const[x,{input:C,val:k}]of u){const U=w[x];if(C.value=String(U),k&&typeof U=="number"){const p=parseFloat(C.step||"0.01");k.textContent=p>=1?String(Math.round(U)):U.toFixed(2)}}}const f=()=>{s.hidden=!s.hidden,a.classList.toggle("on",!s.hidden)};a.addEventListener("click",f),s.querySelector("#lpClose")?.addEventListener("click",f);const m=s.querySelector("#lpCopy");return m.addEventListener("click",async()=>{const w=JSON.stringify({active:e,presets:i},null,2);try{await navigator.clipboard.writeText(w),m.textContent="¡JSON copiado!",setTimeout(()=>m.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",w)}}),s.querySelector("#lpReset")?.addEventListener("click",()=>{i[e]={...rt[e]},M(),t(e,i[e])}),addEventListener("keydown",w=>{w.code==="KeyL"&&!w.ctrlKey&&!w.metaKey&&!w.altKey&&f()}),M(),{setActivePreset(w){e=w,M()},getPreset(w){return i[w]},toggle:f}}To.defaultAccessToken=He.ionToken;const Y=t=>document.getElementById(t),_t=Y("cesiumContainer"),Gt=Y("loading"),ia=Y("loadBar"),ao=Y("loadLabel"),na=Y("loadPct");function Be(t,i){ao.textContent=t;const e=Math.round(Math.max(0,Math.min(1,i))*100);ia.style.width=e+"%",na.textContent=e+"%"}const Z=new wo(_t,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:xe.RECEIVE_ONLY,terrain:Mo.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Co.fromProviderAsync(eo.fromAssetId(He.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),I=Z.scene;I.globe.enableLighting=!0;I.globe.showGroundAtmosphere=!0;I.globe.depthTestAgainstTerrain=!0;I.globe.maximumScreenSpaceError=2;I.fog.enabled=!1;I.fog.density=18e-5;I.fog.minimumBrightness=.04;I.highDynamicRange=!0;I.msaaSamples=4;I.postProcessStages.fxaa.enabled=!0;I.screenSpaceCameraController.enableCollisionDetection=!1;I.light=new ko({intensity:3,color:O.fromCssColorString("#fff4e3")});const Se=Z.shadowMap;Se.softShadows=!0;Se.size=4096;Se.maximumDistance=1200;Se.darkness=.24;Se.normalOffset=!0;{const t=Se;t._primitiveBias.depthBias=8e-4,t._primitiveBias.normalOffsetScale=1.6,t._primitiveBias.normalShadingSmooth=.35}const Re=I.postProcessStages.ambientOcclusion;Re.enabled=!0;Re.uniforms.intensity=2.1;Re.uniforms.bias=.08;Re.uniforms.lengthCap=.35;Re.uniforms.stepSize=1.4;Re.uniforms.blurStepSize=1;const ze=I.postProcessStages.bloom;ze.enabled=!0;ze.uniforms.glowOnly=!1;ze.uniforms.contrast=128;ze.uniforms.brightness=-.36;ze.uniforms.delta=1;ze.uniforms.sigma=2.6;ze.uniforms.stepSize=1.5;const sa=Rt(),St=t=>{const i=V.getColumn(sa,t,new je);return new b(i.x,i.y,i.z)},be=Oo(St(0),St(1),St(2));I.postProcessStages.add(be);const ye=Do();I.postProcessStages.add(ye);Z.camera.frustum.fov=$t.toRadians(48);const Xt=(()=>{try{const t=I.context._gl,i=t.getExtension("WEBGL_debug_renderer_info");return i?String(t.getParameter(i.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),ra=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Xt)&&!/Arc/i.test(Xt);let L=null,ae=ra||matchMedia("(pointer: coarse)").matches?.5:1;function et(){const t=Math.min(window.devicePixelRatio||1,2);Z.resolutionScale=t*(ae>=1?1:ae>=.5?.8:.62),Se.size=ae>=1?4096:ae>=.5?2048:1024,Se.softShadows=ae>=.5,Re.enabled=ae>=1,ze.enabled=ae>=.5,I.msaaSamples=ae>=1?4:1,Z.shadows=ae>=.5,L?.tileset&&(L.tileset.maximumScreenSpaceError=ae>=1?8:ae>=.5?12:20)}et();Z.clock.shouldAnimate=!1;Z.clock.currentTime=$e.fromIso8601("2026-06-21T16:50:00-05:00");const F=new _o(Z),vt=t=>ie(Ct[t].e,Ct[t].n,Ct[t].u),la=vt("hotel");F.flyTo({pivot:la,heading:ut.general.heading,pitch:ut.general.pitch,range:ut.general.range*1.8},0);F.groundHeight=t=>I.globe.getHeight(t);const ca=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let ve=.04,Ae=1,Ee=null;const da=t=>$e.toDate($e.fromIso8601(t)).getTime();function yt(t){I.light.intensity=t.sunIntensity,I.light.color=O.fromCssColorString(t.sunColor),Se.darkness=t.shadowDarkness,Re.uniforms.intensity=t.aoIntensity,ze.uniforms.brightness=t.bloomBrightness,ye.uniforms.uExposure=t.exposure,ye.uniforms.uContrast=t.contrast,ye.uniforms.uSaturation=t.saturation;const[i,e,a]=kt(t.tintColor);ye.uniforms.uTint=new b(i,e,a),ye.uniforms.uVignette=t.vignette;const[s,r,u]=kt(t.skyZenith);be.uniforms.uSkyZenith=new b(s,r,u);const[c,M,f]=kt(t.skyHorizon);be.uniforms.uSkyHorizon=new b(c,M,f),be.uniforms.uCloudDensity=t.cloudDensity,be.uniforms.uCloudSpeed=t.cloudSpeed,L?.setLook({skyFill:t.skyFill,groundFill:t.groundFill,hazeAmount:t.hazeAmount,hazeStart:t.hazeStart})}const ft=aa((t,i)=>yt(i));yt(ft.getPreset("dia"));be.uniforms.uNight=ve;be.uniforms.uTarde=Ae;ye.uniforms.uNight=ve;ye.uniforms.uTarde=Ae;I.skyAtmosphere&&(I.skyAtmosphere.hueShift=0,I.skyAtmosphere.saturationShift=.08,I.skyAtmosphere.brightnessShift=-.04);function ua(t){Ee={from:$e.toDate(Z.clock.currentTime).getTime(),to:da(t.iso),start:performance.now(),dur:1600},I.fog.density=t.fog,ft.setActivePreset(t.id),yt(ft.getPreset(t.id)),I.skyAtmosphere&&(I.skyAtmosphere.hueShift=0,I.skyAtmosphere.saturationShift=t.id==="tarde"?.08:t.id==="noche"?-.25:.06,I.skyAtmosphere.brightnessShift=t.id==="noche"?-.55:t.id==="tarde"?-.04:0);const e=ve,a=Ae,s=performance.now(),r=()=>{const c=Math.min(1,(performance.now()-s)/1400),M=c*c*(3-2*c);ve=e+(t.night-e)*M,Ae=a+(t.tarde-a)*M,L?.setNight(ve),J?.setNight(ve),L?.setTarde(Ae),be.uniforms.uNight=ve,be.uniforms.uTarde=Ae,ye.uniforms.uNight=ve,ye.uniforms.uTarde=Ae,c<1&&requestAnimationFrame(r)};requestAnimationFrame(r),document.querySelectorAll("[data-light]").forEach(c=>c.classList.toggle("on",c.dataset.light===t.id));const u=Y("clockLabel");u&&(u.textContent=t.label)}document.querySelectorAll("[data-light]").forEach(t=>{t.addEventListener("click",()=>{const i=ca.find(e=>e.id===t.dataset.light);i&&ua(i)})});let Ve=!1;const At=Y("btnOrbit"),It=Y("btnPedestrian");function we(){Ve=!1,At?.classList.remove("on")}function tt(t,i=2){we();const e=ut[t];F.flyTo({pivot:vt(e.place),heading:e.heading,pitch:e.pitch,range:e.range},i)}Y("btnHome")?.addEventListener("click",()=>tt("general",2.2));Y("btnAerial")?.addEventListener("click",()=>tt("aerial"));Y("btnArch")?.addEventListener("click",()=>tt("arch"));It?.addEventListener("click",()=>{we(),F.isWalking?F.exitWalk():F.enterWalk(se?no(se):void 0)});F.onModeChange=t=>{It?.classList.toggle("on",t);const i=Y("hint");i&&t&&(i.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",i.classList.remove("fade"),setTimeout(()=>i.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(t=>{t.addEventListener("click",()=>{we();const i=t.dataset.place;if(i==="hotel"&&L){const e=L.buildings.find(a=>a.s==="Hotel");if(e){Oe(null),Oe(e);return}}F.flyTo({pivot:vt(i),range:i==="hotel"?300:520,pitch:-.5},2)})});At?.addEventListener("click",()=>{Ve=!Ve,At.classList.toggle("on",Ve),Ve&&F.isWalking&&F.exitWalk()});_t.addEventListener("pointerdown",we);_t.addEventListener("wheel",we,{passive:!0});addEventListener("keydown",t=>{t.code==="Escape"&&(F.isWalking?F.exitWalk():Oe(null)),(t.code==="KeyH"||t.code==="Home")&&tt("general",2.2),t.code==="KeyP"&&It?.click()});let se=null,Ze=null;const ha=9;let ht=null,J=null,Ne=null,Lt=!1,Jt=!1;async function fa(){if(Jt||(Jt=!0,await mt(),!L||!J))return;we();const t=J.caja,i=ie((t[0]+t[2])/2,(t[1]+t[3])/2,12);F.flyTo({pivot:ie(-110,150,10),heading:-.75,pitch:-.62,range:1750},0),await new Promise(s=>setTimeout(s,400)),F.flyTo({pivot:ie(-170,230,10),heading:-.1,pitch:-.55,range:820},3.6),await new Promise(s=>setTimeout(s,3500)),F.flyTo({pivot:i,heading:.55,pitch:-.4,range:230},4.2),await new Promise(s=>setTimeout(s,2600));const e=L.buildings.find(s=>s.s==="Hotel"),a=F.flyTo.bind(F);F.flyTo=()=>{};try{e?Oe(e):xt()}finally{F.flyTo=a}}let lt=null;function mt(){return lt||(lt=(async()=>{L&&(J=await ea(Z,L.matrix),J&&(J.setNight(ve),Ne=ta(J,t=>{if(!J)return;we(),Ne?.mark(t),t<0?J.full():J.openAt(t);const i=J.caja;F.flyTo({pivot:ie((i[0]+i[2])/2,(i[1]+i[3])/2,12),pitch:t<0?-.42:-.95,range:t<0?230:150},1.4)}),Lt&&(Lt=!1,xt(),pe&&(Z.entities.remove(pe),pe=null))))})(),lt)}function xt(){!L||!J||(L.setRevitBlocks(J.bloques,J.huella),J.play(),Ne?.mark(-1),Ne?.show(!0))}function io(){L&&(ht={start:performance.now()},L.setHotelFloors(0))}let pe=null;const ct=Y("card");function ma(t){return ie((t.bb[0]+t.bb[2])/2,(t.bb[1]+t.bb[3])/2,t.b+t.h*.5)}function no(t){return ie((t.bb[0]+t.bb[2])/2,t.bb[1]-9,t.b)}function Oe(t){const i=se?.s==="Hotel";if(se=t,pe&&(Z.entities.remove(pe),pe=null),!t||!L){ct&&(ct.hidden=!0),Ne?.show(!1);return}if(t.s!=="Hotel"?Ne?.show(!1):J?.visible&&Ne?.show(!0),t.s!=="Hotel"){const f=t.r.map(([w,h])=>ie(w,h,0,L.matrix)),m=2572+t.b-.5;pe=Z.entities.add({polygon:{hierarchy:new zo(f),height:m,extrudedHeight:m+t.h+2.2,material:O.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:O.fromCssColorString("#d7ebff"),shadows:xe.DISABLED}})}const e=t.s==="Hotel";if(e&&!i){J?(xt(),pe&&(Z.entities.remove(pe),pe=null)):(Lt=!0,mt(),io()),we();const f=J?.caja;F.flyTo(f?{pivot:ie((f[0]+f[2])/2,(f[1]+f[3])/2,12),heading:.55,pitch:-.4,range:230}:{pivot:vt("hotel"),pitch:-.38,range:290},1.8)}const a=e&&L?L.buildings.filter(f=>f.s==="Hotel"):[t],s=f=>Math.abs(f.r.reduce((m,w,h)=>{const x=f.r[(h+1)%f.r.length];return m+w[0]*x[1]-x[0]*w[1]},0)/2),r=a.reduce((f,m)=>f+s(m),0),u=a.reduce((f,m)=>f+s(m)*m.p,0),c=Math.max(...a.map(f=>f.p)),M=Math.max(...a.map(f=>f.h));Math.abs(t.r.reduce((f,m,w)=>{const h=t.r[(w+1)%t.r.length];return f+m[0]*h[1]-h[0]*m[1]},0)/2),Y("cardKind").textContent=e?"Proyecto":`Sector ${t.s}`,Y("cardTitle").textContent=e?"Hotel La Fontana":`Edificación ${t.id+1}`,Y("cardData").innerHTML=`<dt>Pisos</dt><dd>${e?"hasta "+c:t.p}</dd><dt>Altura</dt><dd>${M.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(r).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(u).toLocaleString("es-CO")} m²</dd>`,ct&&(ct.hidden=!1)}F.onPick=t=>{L&&Oe(t?L.buildingAt(t):null)};Y("cardClose")?.addEventListener("click",()=>Oe(null));Y("cardFocus")?.addEventListener("click",()=>{if(!se)return;we();const t=Math.max(se.bb[2]-se.bb[0],se.bb[3]-se.bb[1],se.h);F.flyTo({pivot:ma(se),pitch:-.42,range:Math.max(60,t*2.1)},1.7)});Y("cardWalk")?.addEventListener("click",()=>{se&&(we(),F.enterWalk(no(se)))});const zt=Y("status"),Kt=Y("statusText");async function pa(t=25e3){const i=performance.now()+t;let e=0;for(;performance.now()<i;){const a=I.globe.tilesLoaded,s=!L?.tileset||L.tileset.tilesLoaded;if(a&&s){if(e||(e=performance.now()),performance.now()-e>=600)break}else e=0;await new Promise(r=>setTimeout(r,150))}for(let a=0;a<8;a++)await new Promise(s=>requestAnimationFrame(s))}async function ga(){Be("Cargando el modelo del hotel...",.05),await new Promise(e=>setTimeout(e,30)),L=await qo(Z,(e,a)=>Be(e,.05+a*.2),(e,a,s)=>{Be(`Cargando secciones (${e}/${a}) · ${s}`,.25+e/Math.max(1,a)*.45),!(!zt||!Kt)&&(zt.hidden=!1,Kt.textContent=e<a?`Cargando secciones ${e}/${a} · ${s}`:`Modelo completo · ${a} secciones`,e>=a&&setTimeout(()=>zt.classList.add("fade"),2600))}),L.setNight(ve),L.setTarde(Ae),mt();const t=document.querySelector("[data-light].on")?.dataset.light||"dia";yt(ft.getPreset(t)),et(),tt("general",0),F.flyTo({pivot:ie(-110,150,10),heading:-.75,pitch:-.62,range:1750},0),Be("Preparando el Hotel La Fontana...",.8),await mt(),Be("Renderizando...",.92),await pa(5e3),Be("Listo",1),(async()=>(await L.done,Ze=await $o(Z,L.matrix),Ze&&await Ze.ready,window.__ALL__=!0))(),Gt.classList.add("done"),fa(),setTimeout(()=>Gt.remove(),900);const i=Y("hint");i&&setTimeout(()=>i.classList.add("fade"),9e3),window.__READY__=!0}const ne={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:So,viewer:Z,cam:F,getSite:()=>L,enuToWorld:ie,select:Oe,stats:ne,playHotel:io,playRevit:xt,getRevit:()=>J,getTrafico:()=>Ze,setQuality:t=>{ae=t,et()}};ga().catch(t=>{console.error(t),ao.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(t?.message??t)});let Zt=performance.now(),Tt=0;function so(){const t=performance.now(),i=Math.min(.1,(t-Zt)/1e3);if(Zt=t,Ee){const a=Math.min(1,(t-Ee.start)/Ee.dur),s=a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2;Z.clock.currentTime=$e.fromDate(new Date(Ee.from+(Ee.to-Ee.from)*s)),a>=1&&(Ee=null)}if(ht&&L){const a=(t-ht.start)/550,s=Math.floor(a),r=a-s,u=1-Math.pow(1-Math.min(1,r*1.6),3);s>=ha?(L.setHotelFloors(99),ht=null):L.setHotelFloors(s+u)}J?.update(i,t),Ze?.update(i);const e=t*.001;if(L?.setTime(e),be.uniforms.uTime=e,Ve&&!F.isWalking&&F.flyTo({heading:F.state.heading+.16*i},0),F.update(i),ne.frames++,t-ne.t0>=2e3){ne.fps=Math.round(ne.frames*1e3/(t-ne.t0)),ne.frames=0,ne.t0=t,window.__FPS__=ne.fps;const a=!!L&&L.sections.loaded>=L.sections.total&&t-Tt>8e3;L&&L.sections.loaded>=L.sections.total&&!Tt&&(Tt=t),a&&document.visibilityState==="visible"&&(ne.fps<20&&ae>.25&&!window.__DBG__.lock?++ne.low>=3&&(ae=ae>=1?.5:.25,ne.low=0,et()):ne.low=0)}requestAnimationFrame(so)}requestAnimationFrame(so);addEventListener("resize",et);
