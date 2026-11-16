var no=Object.defineProperty;var so=(o,i,e)=>i in o?no(o,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[i]=e;var H=(o,i,e)=>so(o,typeof i!="symbol"?i+"":i,e);import{C as x,a as Kt,T as zt,M as U,b as Ae,c as Xe,H as ro,P as Zt,d as qe,L as lo,U as A,V as se,e as je,f as We,g as ut,h as ht,i as ot,j as co,S as be,I as $t,k as uo,l as ho,m as O,n as vt,R as fo,o as Je,A as ve,p as Nt,q as mo,r as po,s as go,t as Ke,u as Ot,v as Tt,G as vo,B as yo,w as yt,x as xo,y as bo,z as wo,D as Co,J as $e,E as Mo,F as ko,K as So}from"./cesium-NqgYyKJC.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function e(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(s){if(s.ep)return;s.ep=!0;const l=e(s);fetch(s.href,l)}})();const xt="/HLF/",zo=xt.endsWith("/")?xt:xt+"/",To=zo+"cesium/";window.CESIUM_BASE_URL=To;const rt={longitude:-74.04145021,latitude:4.70207636,height:2572},bt={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},lt={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Ne={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},Po=o=>o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2,Dt=-1.5533,Ut=-.012,Eo=4200,Ao=6,Bt=1.7;class Lo{constructor(i){H(this,"viewer");H(this,"canvas");H(this,"pivot",new x);H(this,"heading",.5);H(this,"pitch",-.6);H(this,"range",1200);H(this,"targetPivot",new x);H(this,"targetHeading",.5);H(this,"targetPitch",-.6);H(this,"targetRange",1200);H(this,"damping",9);H(this,"drag",null);H(this,"pointers",new Map);H(this,"pinch",null);H(this,"lastTap",0);H(this,"keys",new Set);H(this,"tween",null);H(this,"fov",Kt.toRadians(48));H(this,"walking",!1);H(this,"eye",new x);H(this,"eyeTarget",new x);H(this,"wHeading",0);H(this,"wPitch",0);H(this,"wHeadingT",0);H(this,"wPitchT",0);H(this,"onPick",null);H(this,"onModeChange",null);H(this,"groundHeight",null);this.viewer=i,this.canvas=i.scene.canvas,i.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:x.clone(this.targetPivot)}}setPivot(i,e=!0){if(e){const a=x.clone(this.viewer.camera.positionWC),s=x.subtract(a,i,new x),l=x.magnitude(s),u=zt.eastNorthUpToFixedFrame(i),d=U.inverseTransformation(u,new U),C=U.multiplyByPointAsVector(d,s,new x);if(l>1){const f=-Math.asin(Math.max(-1,Math.min(1,C.z/l)));if(f<Ut&&f>Dt){let m=Math.atan2(-C.x,-C.y);for(;m-this.heading>Math.PI;)m-=Math.PI*2;for(;m-this.heading<-Math.PI;)m+=Math.PI*2;this.heading=this.targetHeading=m,this.pitch=this.targetPitch=f,this.range=this.targetRange=this.clamp(l),x.clone(i,this.pivot)}}}this.targetPivot=x.clone(i),this.tween=null}bind(){const i=this.canvas;i.style.touchAction="none",i.addEventListener("pointerdown",a=>{if(i.setPointerCapture(a.pointerId),this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2){const[s,l]=[...this.pointers.values()];this.pinch={distance:Math.hypot(s.x-l.x,s.y-l.y),range:this.targetRange,cx:(s.x+l.x)/2,cy:(s.y+l.y)/2},this.drag=null;return}a.button===2||a.button===1||a.shiftKey?this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"pan",moved:!1}:a.button===0&&(this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"orbit",moved:!1}),this.tween=null}),i.addEventListener("pointermove",a=>{if(!this.pointers.has(a.pointerId))return;if(this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2&&this.pinch){const[u,d]=[...this.pointers.values()],C=Math.hypot(u.x-d.x,u.y-d.y),f=(u.x+d.x)/2,m=(u.y+d.y)/2;this.walking?this.walk((this.pinch.cy-m)*.06,0):(C>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/C)),this.pan(this.pinch.cx-f,m-this.pinch.cy)),this.pinch.cx=f,this.pinch.cy=m;return}if(!this.drag||a.pointerId!==this.drag.id)return;const s=a.offsetX-this.drag.x,l=a.offsetY-this.drag.y;this.drag.x=a.offsetX,this.drag.y=a.offsetY,Math.abs(s)+Math.abs(l)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=s*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+l*.0028))):this.walk(l*.05,-s*.05):this.drag.mode==="orbit"?(this.targetHeading-=s*.0042,this.targetPitch=this.clampPitch(this.targetPitch-l*.0034)):this.pan(-s,l)});const e=a=>{if(this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&a.pointerId===this.drag.id){const s=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,s&&a.type==="pointerup"){const l=new Ae(a.offsetX,a.offsetY),u=performance.now();if(a.pointerType!=="mouse"&&u-this.lastTap<320){this.lastTap=0,this.focusAt(l);return}this.lastTap=u;const d=this.pickWorld(l);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};i.addEventListener("pointerup",e),i.addEventListener("pointercancel",e),i.addEventListener("contextmenu",a=>a.preventDefault()),i.addEventListener("wheel",a=>{a.preventDefault(),this.tween=null;const s=a.deltaMode===1?16:a.deltaMode===2?100:1,l=a.deltaY*s;if(this.walking){this.walk(-l*.02,0);return}const u=Math.exp(Math.max(-.45,Math.min(.45,l*.0016))),d=this.pickWorld(new Ae(a.offsetX,a.offsetY)),C=this.clamp(this.targetRange*u);if(d&&u<1){const f=Math.min(.45,(this.targetRange-C)/this.targetRange)*.8,m=x.subtract(d,this.targetPivot,new x),b=x.magnitude(m);if(b>1){const h=Math.min(b,this.targetRange)*f/b;x.add(this.targetPivot,x.multiplyByScalar(m,h,m),this.targetPivot)}}this.targetRange=C},{passive:!1}),i.addEventListener("dblclick",a=>{a.preventDefault(),this.focusAt(new Ae(a.offsetX,a.offsetY))}),addEventListener("keydown",a=>{a.target instanceof HTMLInputElement||(this.keys.add(a.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(a.code)&&a.preventDefault())}),addEventListener("keyup",a=>this.keys.delete(a.code)),addEventListener("blur",()=>this.keys.clear())}clamp(i,e=Ao,a=Eo){return Math.max(e,Math.min(a,i))}clampPitch(i){return Math.max(Dt,Math.min(Ut,i))}moveHorizontal(i,e,a,s){const l=zt.eastNorthUpToFixedFrame(i),u=new x(Math.sin(e)*a+Math.cos(e)*s,Math.cos(e)*a-Math.sin(e)*s,0);U.multiplyByPoint(l,u,i)}pan(i,e){const a=this.canvas.clientHeight||1,s=2*this.range*Math.tan(this.fov/2)/a,l=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,e*s/l,i*s),this.tween=null}walk(i,e){this.moveHorizontal(this.eyeTarget,this.wHeading,i,e),this.snapEye()}snapEye(){const i=Xe.fromCartesian(this.eyeTarget),e=this.groundHeight?.(i);e!==void 0&&Number.isFinite(e)&&(i.height=e+Bt,Xe.toCartesian(i,void 0,this.eyeTarget))}pickWorld(i){const e=this.viewer.scene;let a;if(e.pickPositionSupported&&e.pick(i,4,4)&&(a=e.pickPosition(i)),!a){const s=e.camera.getPickRay(i);s&&(a=e.globe.pick(s,e)??void 0)}return a??null}focusAt(i){const e=this.pickWorld(i);if(e){if(this.walking){x.clone(e,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:e,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(i,e=2){this.walking&&this.exitWalk(!1);const a={pivot:i.pivot??x.clone(this.targetPivot),heading:i.heading??this.targetHeading,pitch:i.pitch??this.targetPitch,range:i.range??this.targetRange};let s=a.heading;for(;s-this.targetHeading>Math.PI;)s-=Math.PI*2;for(;s-this.targetHeading<-Math.PI;)s+=Math.PI*2;if(a.heading=s,e<=.02){this.tween=null,this.targetPivot=x.clone(a.pivot),this.pivot=x.clone(a.pivot),this.heading=this.targetHeading=a.heading,this.pitch=this.targetPitch=a.pitch,this.range=this.targetRange=a.range;return}this.tween={from:{pivot:x.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:a,start:performance.now(),duration:e*1e3}}enterWalk(i){x.clone(i??this.targetPivot,this.eyeTarget),this.snapEye(),x.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(i=!0){if(!this.walking)return;this.walking=!1;const e=Xe.fromCartesian(this.eyeTarget);e.height-=Bt-1;const a=Xe.toCartesian(e);this.pivot=x.clone(a),this.targetPivot=a,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,i?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(i){if(!this.keys.size)return;const e=this.keys,a=e.has("ShiftLeft")||e.has("ShiftRight")?3:1;let s=0,l=0;(e.has("KeyW")||e.has("ArrowUp"))&&(s+=1),(e.has("KeyS")||e.has("ArrowDown"))&&(s-=1),(e.has("KeyD")||e.has("ArrowRight"))&&(l+=1),(e.has("KeyA")||e.has("ArrowLeft"))&&(l-=1);let u=0;if(e.has("KeyQ")&&(u+=1),e.has("KeyE")&&(u-=1),this.walking){u&&(this.wHeadingT-=u*1.2*i),(s||l)&&this.walk(s*4.2*a*i,l*3.4*a*i);return}if(u&&(this.targetHeading+=u*.9*i,this.tween=null),(e.has("PageUp")||e.has("Equal")||e.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*i))),(e.has("PageDown")||e.has("Minus")||e.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*i))),e.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*i)),e.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*i)),!s&&!l)return;const d=Math.max(8,this.range*.6)*a*i;this.moveHorizontal(this.targetPivot,this.heading,s*d,l*d),this.tween=null}update(i){this.updateKeys(i);const e=1-Math.exp(-this.damping*i);if(this.walking){x.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*i),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*e,this.wPitch+=(this.wPitchT-this.wPitch)*e,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const a=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),s=Po(a),{from:l,to:u}=this.tween;x.lerp(l.pivot,u.pivot,s,this.targetPivot),this.targetHeading=l.heading+(u.heading-l.heading)*s,this.targetPitch=l.pitch+(u.pitch-l.pitch)*s,this.targetRange=Math.exp(Math.log(l.range)+(Math.log(u.range)-Math.log(l.range))*s),a>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*e,this.pitch+=(this.targetPitch-this.pitch)*e,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*e),x.lerp(this.pivot,this.targetPivot,e,this.pivot),this.viewer.camera.lookAt(this.pivot,new ro(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(U.IDENTITY)}}function Ro(){return new We({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const Qt=()=>({uAerial:{type:A.SAMPLER_2D,value:Ro()},uAerialRect:{type:A.VEC4,value:new je(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:A.FLOAT,value:0}}),eo=`
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
`;function _o(){return new qe({uniforms:{uNight:{type:A.FLOAT,value:0},uTarde:{type:A.FLOAT,value:0},uSkyFill:{type:A.FLOAT,value:.24},uHazeAmount:{type:A.FLOAT,value:.08},uHazeStart:{type:A.FLOAT,value:1200},uHotelPisos:{type:A.FLOAT,value:99},uRevitBox:{type:A.VEC4,value:new je(0,0,0,0)},uLean:{type:A.VEC2,value:new Ae(0,0)},...Qt()},varyings:{vPosM:se.VEC3,vUpEC:se.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Qe+eo+`
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
    `})}function Io(o,i,e){return new qe({uniforms:{uNight:{type:A.FLOAT,value:0},uTarde:{type:A.FLOAT,value:0},uSkyFill:{type:A.FLOAT,value:.22},uHazeAmount:{type:A.FLOAT,value:.08},uHazeStart:{type:A.FLOAT,value:1200},uTime:{type:A.FLOAT,value:0},uFrame:{type:A.FLOAT,value:i},uTop:{type:A.FLOAT,value:e},uAtlas:{type:A.SAMPLER_2D,value:new We({url:o,repeat:!1,minificationFilter:ht.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})}},varyings:{vUV:se.VEC2,vView:se.VEC3,vRightT:se.VEC2,vUpT:se.VEC2,vUpEC:se.VEC3},vertexShaderText:`
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
    `})}function Fo(){return new qe({uniforms:{uNight:{type:A.FLOAT,value:0},uTarde:{type:A.FLOAT,value:0},uHazeAmount:{type:A.FLOAT,value:.08},uHazeStart:{type:A.FLOAT,value:1200}},lightingModel:lo.UNLIT,fragmentShaderText:Qe+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function Ho(o,i,e){return new Zt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:o,uNorth:i,uUp:e,uSkyZenith:new x(.16,.42,.82),uSkyHorizon:new x(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function No(){return new Zt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new x(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function Oo(o){const i=e=>({type:A.SAMPLER_2D,value:new We({url:o+e,repeat:!0,minificationFilter:ht.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})});return new qe({uniforms:{uNight:{type:A.FLOAT,value:0},uTarde:{type:A.FLOAT,value:0},uGroundFill:{type:A.FLOAT,value:.12},uHazeAmount:{type:A.FLOAT,value:.08},uHazeStart:{type:A.FLOAT,value:1200},uAsfalto:i("tex_asfalto.webp"),uAnden:i("tex_anden.webp"),uPrado:i("tex_prado.webp"),uCiclo:i("tex_ciclo.webp"),...Qt()},varyings:{vG:se.VEC3,vUpEC:se.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Qe+eo+`
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
    `})}function Do(){return new qe({uniforms:{uNight:{type:A.FLOAT,value:0},uTarde:{type:A.FLOAT,value:0},uSkyFill:{type:A.FLOAT,value:.24},uHazeAmount:{type:A.FLOAT,value:.08},uHazeStart:{type:A.FLOAT,value:1200}},varyings:{vPosM:se.VEC3,vUpEC:se.VEC3},vertexShaderText:`
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
    `})}function At(){return zt.eastNorthUpToFixedFrame(x.fromDegrees(rt.longitude,rt.latitude,rt.height))}function de(o,i,e,a=At()){return U.multiplyByPoint(a,new x(o,i,e),new x)}const Uo={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function Bo(o,i,e){let a=!1;for(let s=0,l=e.length-1;s<e.length;l=s++){const[u,d]=e[s],[C,f]=e[l];d>i!=f>i&&o<(C-u)*(i-d)/(f-d)+u&&(a=!a)}return a}function Vo(o,i,e){let a=1/0;for(let s=0,l=e.length-1;s<e.length;l=s++){const[u,d]=e[l],[C,f]=e[s],m=C-u,b=f-d,h=Math.max(0,Math.min(1,((o-u)*m+(i-d)*b)/(m*m+b*b||1)));a=Math.min(a,Math.hypot(o-u-h*m,i-d-h*b))}return a}async function jo(o,i,e){const a=o.scene,s=At(),l=U.inverseTransformation(s,new U),u=Ne.secciones;i("Contexto urbano",.08);const[d,C,f,m]=await Promise.all([fetch(u+"recorte.json").then(t=>t.json()),fetch(u+"edificios.json").then(t=>t.json()),fetch(u+"arboles.json").then(t=>t.json()),fetch(u+"suelo.json").then(t=>t.json())]),b=()=>d.clips.map(t=>{const n=new vt({positions:x.fromDegreesArray(t.flat())}),c=n.computeRectangle();return n.computeRectangle=r=>fo.clone(c,r),n});a.globe.clippingPolygons=new ot({polygons:b()});const h=Fo();let y=null;try{y=await co.fromUrl(Ne.googleTiles,{maximumScreenSpaceError:10,shadows:be.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),y.clippingPolygons=new ot({polygons:b()}),y.customShader=h,a.primitives.add(y)}catch(t){console.warn("Tiles de Google no disponibles",t)}const w=[-236,330],M=[];for(const t of C.secciones){const n=t.key==="Hotel";M.push({key:t.key,file:n?"hotel_fachadas.glb":t.file,kind:n?"cubierta_pbr":"edificios",label:n?"Hotel La Fontana 3D":`Edificaciones · sector ${t.key}`,dist:n?-2:Math.hypot(t.c[0]-w[0],t.c[1]-w[1])})}M.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),M.push({key:"hotel_plazoleta",file:"hotel_plazoleta.glb",kind:"cubierta_pbr",label:"Plazoleta y acceso · Hotel",dist:-.8}),M.push({key:"torres_vecinas",file:"torres_vecinas.glb",kind:"cubierta_pbr",label:"Torres vecinas PBR",dist:-.6}),M.push({key:"esquina_ak15",file:"esquina_ak15.glb",kind:"cubierta_pbr",label:"Esquina Ak 15 PBR",dist:-.55}),M.push({key:"metro127",file:"metro127.glb",kind:"cubierta_pbr",label:"Metro 127 · Sonesta PBR",dist:-.52}),M.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),M.sort((t,n)=>t.dist-n.dist);const D={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},p=m.secciones.map(t=>({key:t.key,file:t.file,kind:"suelo",capa:D[t.key]?.[0]??0,label:D[t.key]?.[1]??t.key,dist:-3})),P=f.secciones.map(t=>({key:t.key,file:t.file,kind:"arboles",atlas:t.atlas,marco:t.marco,marcoSup:t.marcoSup,label:Uo[t.key]??"Vegetación",dist:0})),T=[...p,...M.slice(0,4),...P.slice(0,3),...M.slice(4,9),...P.slice(3),...M.slice(9)],v=_o(),k=Do(),L=Oo(u),X=(async()=>{try{const t=await $t.fromAssetId(Ne.imageryAssetId),n=18,c=t.tilingScheme,r=(V,ae)=>Xe.fromCartesian(de(V,ae,0,s)),g=c.positionToTileXY(r(-1010,930),n),S=c.positionToTileXY(r(1010,-940),n),R=S.x-g.x+1,F=S.y-g.y+1,z=t.tileWidth,I=document.createElement("canvas");I.width=R*z,I.height=F*z;const q=I.getContext("2d"),$=[];for(let V=g.y;V<=S.y;V++)for(let ae=g.x;ae<=S.x;ae++)$.push([ae,V]);const ce=async([V,ae])=>{for(let Te=0;Te<40;Te++){const It=t.requestImage(V,ae,n);if(It){try{const Ge=await It,Ft=(V-g.x)*z,Ht=(ae-g.y)*z;typeof ImageBitmap<"u"&&Ge instanceof ImageBitmap?(q.save(),q.translate(Ft,Ht+z),q.scale(1,-1),q.drawImage(Ge,0,0,z,z),q.restore()):q.drawImage(Ge,Ft,Ht,z,z)}catch{}return}await new Promise(Ge=>setTimeout(Ge,120))}};q.fillStyle="#6a6f62",q.fillRect(0,0,I.width,I.height);const Fe=Array.from({length:6},async()=>{for(;$.length;)await ce($.shift())});await Promise.all(Fe);const me=document.createElement("canvas");me.width=me.height=4096,me.getContext("2d").drawImage(I,0,0,4096,4096);const N=await new Promise(V=>me.toBlob(V,"image/jpeg",.92));if(!N)return;const Q=URL.createObjectURL(N);window.__AERIAL_URL__=Q;const j=c.tileXYToRectangle(g.x,g.y,n),ee=c.tileXYToRectangle(S.x,S.y,n),te=(V,ae)=>U.multiplyByPoint(l,x.fromRadians(V,ae,rt.height),new x),he=te(j.west,ee.south),pe=te(ee.east,j.north),He=new je(he.x,he.y,pe.x,pe.y);for(const V of[v,L])V.setUniform("uAerial",new We({url:Q,repeat:!1,minificationFilter:ht.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})),V.setUniform("uAerialRect",He),V.setUniform("uAerialOn",1)}catch(t){console.warn("Foto aérea no disponible",t)}})(),Y=[],Z=[],K=[];let Me=null;const ue=new uo(new x(0,-1,0),1e3);let Re=0,ze=0,re=.22,fe=.08,le=1200;const _e={total:T.length,loaded:0,failed:[]},Ye=async t=>{try{const n=await Je.fromGltfAsync({url:u+t.file,modelMatrix:s,upAxis:ve.Y,forwardAxis:ve.X,shadows:t.kind==="arboles"?be.CAST_ONLY:t.kind==="suelo"?be.RECEIVE_ONLY:be.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:t.kind!=="arboles"});if(t.kind==="suelo")n.customShader=L;else if(t.kind==="arboles"){const r=Io(u+t.atlas,t.marco,t.marcoSup);r.setUniform("uNight",Re),r.setUniform("uTarde",ze),r.setUniform("uSkyFill",re),r.setUniform("uHazeAmount",fe),r.setUniform("uHazeStart",le),Y.push(r),n.customShader=r}else t.key==="Hotel"||t.key==="hotel_plazoleta"||t.key==="hotel_cubiertas"?n.customShader=k:t.kind!=="cubierta_pbr"&&(n.customShader=v);const c=t.key==="Hotel"||t.key==="hotel_plazoleta"||t.key==="hotel_cubiertas";n.imageBasedLighting.imageBasedLightingFactor=c?new Ae(1,.75):t.kind==="cubierta_pbr"?new Ae(.85,.55):new Ae(.68,.38),a.primitives.add(n),t.kind==="arboles"&&Z.push(n),(t.key==="Hotel"||t.key==="hotel_cubiertas")&&K.push(n),await new Promise(r=>{if(n.ready)return r();const g=n.readyEvent.addEventListener(()=>{g(),r()});setTimeout(r,2e4)})}catch(n){console.error("Sección no cargada",t.file,n),_e.failed.push(t.file)}_e.loaded++,e?.(_e.loaded,_e.total,t.label)},Ie=p.length+7;for(let t=0;t<Math.min(Ie,T.length);t++)i(T[t].label,.2+.75*t/Ie),await Ye(T[t]);const gt=(async()=>{for(let t=Ie;t<T.length;t++)await Ye(T[t]),await new Promise(n=>setTimeout(n,60));await X})();return{matrix:s,inverse:l,tileset:y,buildings:C.edificios,treeCount:f.total,sections:_e,done:gt,setNight(t){h.setUniform("uNight",t),v.setUniform("uNight",t),k.setUniform("uNight",t),Re=t,L.setUniform("uNight",t);for(const n of Y)n.setUniform("uNight",t)},setTarde(t){h.setUniform("uTarde",t),v.setUniform("uTarde",t),k.setUniform("uTarde",t),ze=t,L.setUniform("uTarde",t);for(const n of Y)n.setUniform("uTarde",t)},setTime(t){for(const n of Y)n.setUniform("uTime",t)},setLook(t){if(t.skyFill!==void 0){re=t.skyFill,v.setUniform("uSkyFill",re),k.setUniform("uSkyFill",re);for(const n of Y)n.setUniform("uSkyFill",re)}if(t.groundFill!==void 0&&L.setUniform("uGroundFill",t.groundFill),t.hazeAmount!==void 0){fe=t.hazeAmount,v.setUniform("uHazeAmount",fe),k.setUniform("uHazeAmount",fe),L.setUniform("uHazeAmount",fe),h.setUniform("uHazeAmount",fe);for(const n of Y)n.setUniform("uHazeAmount",fe)}if(t.hazeStart!==void 0){le=t.hazeStart,v.setUniform("uHazeStart",le),k.setUniform("uHazeStart",le),L.setUniform("uHazeStart",le),h.setUniform("uHazeStart",le);for(const n of Y)n.setUniform("uHazeStart",le)}},setRevitBlocks(t){const n=C.edificios.filter(c=>t.includes(c.id)).map(c=>{const r=c.r.reduce((S,R)=>S+R[0],0)/c.r.length,g=c.r.reduce((S,R)=>S+R[1],0)/c.r.length;return new vt({positions:c.r.map(([S,R])=>{const F=S-r,z=R-g,I=Math.hypot(F,z)||1;return de(S+F/I*1,R+z/I*1,0,s)})})});for(const c of K)c.clippingPolygons=n.length?new ot({polygons:n}):void 0},setRevitZone(t){if(!t){Me=t?[[t[0],t[1]],[t[2],t[1]],[t[2],t[3]],[t[0],t[3]]].map(([n,c])=>de(n,c,0,s)):null;for(const n of K)n.clippingPolygons=Me?new ot({polygons:[new vt({positions:Me})]}):void 0;v.setUniform("uRevitBox",t?new je(t[0]-1,t[1]-1,t[2]+1,t[3]+1):new je(0,0,0,0))}},setHotelFloors(t){const n=t<98;ue.distance=3.2+t*3.05;for(const c of K)n&&!c.clippingPlanes&&(c.clippingPlanes=new ho({planes:[ue],edgeWidth:2,edgeColor:O.fromCssColorString("#d7ebff")})),c.clippingPlanes&&(c.clippingPlanes.enabled=n);v.setUniform("uHotelPisos",t)},setTreesVisible(t){for(const n of Z)n.show=t},buildingAt(t){const n=U.multiplyByPoint(l,t,new x);let c=null,r=1.2;for(const g of C.edificios){if(n.x<g.bb[0]-1.5||n.x>g.bb[2]+1.5||n.y<g.bb[1]-1.5||n.y>g.bb[3]+1.5||n.z>g.b+g.h+2.5)continue;if(Bo(n.x,n.y,g.r))return g;const S=Vo(n.x,n.y,g.r);S<r&&(r=S,c=g)}return c}}}const Wo=O.fromCssColorString("#ff2b1a"),qo=O.fromCssColorString("#ffc400"),Yo=O.fromCssColorString("#00e862"),Ue=O.fromCssColorString("#1a1d22");function wt(o){const i=document.createElement("canvas");i.width=128,i.height=128;const e=i.getContext("2d");if(e.clearRect(0,0,128,128),o==="pare"){e.beginPath();for(let a=0;a<8;a++){const s=(a+.5)*Math.PI/4,l=64+Math.cos(s)*58,u=64+Math.sin(s)*58;a===0?e.moveTo(l,u):e.lineTo(l,u)}e.closePath(),e.fillStyle="#c81e1e",e.fill(),e.lineWidth=5,e.strokeStyle="#ffffff",e.stroke(),e.fillStyle="#ffffff",e.font="bold 31px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("PARE",64,66)}else o==="peaton"?(e.beginPath(),e.moveTo(64,6),e.lineTo(122,64),e.lineTo(64,122),e.lineTo(6,64),e.closePath(),e.fillStyle="#f5b800",e.fill(),e.lineWidth=4,e.strokeStyle="#18181b",e.stroke(),e.fillStyle="#18181b",e.beginPath(),e.arc(64,38,7,0,Math.PI*2),e.fill(),e.fillRect(59,47,10,22),e.fillRect(54,69,7,20),e.fillRect(67,69,7,20)):(e.beginPath(),e.arc(64,64,56,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.lineWidth=11,e.strokeStyle="#c81e1e",e.stroke(),e.fillStyle="#111827",e.font="bold 46px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("30",64,67));return i.toDataURL("image/png")}function Go(o,i,e,a,s){const l=(p,P,T)=>U.multiplyByPoint(i,new x(p,P,T),new x),u=[],d=e+7.2,C=a+7.2,f=s(d,C),m=O.fromCssColorString("#2a303a"),b=O.fromCssColorString("#14171c"),h=O.fromCssColorString("#eab308"),y=(p,P,T,v)=>{const k=v?.42:.3,L=v?.3:.42;u.push(o.entities.add({position:l(p,P,T),box:{dimensions:new x(k,L,1.18),material:b}}));const X=(ue,Re)=>{const ze=o.entities.add({position:l(p,P,T+ue),box:{dimensions:new x(v?.24:.33,v?.33:.24,.24),material:Re}});return u.push(ze),ze},Y=X(.36,Ue),Z=X(0,Ue),K=X(-.36,Ue);return{red:Y,yellow:Z,green:K,setState:ue=>{Y.box.material=new Ke(ue==="red"?Wo:Ue),Z.box.material=new Ke(ue==="yellow"?qo:Ue),K.box.material=new Ke(ue==="green"?Yo:Ue)}}};if(Math.abs(e+148.8)<12&&Math.abs(a-216.3)<12){const p=[{px:-159.5,py:232,dx:4.2,dy:0,isNS:!0},{px:-163.5,py:226.5,dx:0,dy:-4,isNS:!1},{px:-163,py:203,dx:0,dy:4,isNS:!1},{px:-133.5,py:231.5,dx:4.2,dy:0,isNS:!0},{px:-133,py:202.5,dx:0,dy:4,isNS:!1}],P=[],T=[];for(const k of p){const L=s(k.px,k.py);u.push(o.entities.add({position:l(k.px,k.py,L+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:m}}),o.entities.add({position:l(k.px,k.py,L+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:h}}),o.entities.add({position:l(k.px+k.dx*.5,k.py+k.dy*.5,L+5.65),box:{dimensions:new x(Math.max(.14,Math.abs(k.dx)),Math.max(.14,Math.abs(k.dy)),.14),material:m}}));const X=y(k.px+k.dx*.78,k.py+k.dy*.78,L+5.1,k.isNS);(k.isNS?P:T).push(X)}const v=k=>({red:k[0].red,yellow:k[0].yellow,green:k[0].green,setState:L=>{for(const X of k)X.setState(L)}});return{ns:v(P),ew:v(T),setVisible(k){for(const L of u)L.show=k}}}u.push(o.entities.add({position:l(d,C,f+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:m}}),o.entities.add({position:l(d,C,f+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:h}}));const w=4.6;u.push(o.entities.add({position:l(d-w*.5,C,f+5.65),box:{dimensions:new x(w,.14,.14),material:m}}),o.entities.add({position:l(d,C-w*.5,f+5.65),box:{dimensions:new x(.14,w,.14),material:m}}));const M=y(d-3.4,C,f+5.1,!0),D=y(d,C-3.4,f+5.1,!1);return{ns:M,ew:D,setVisible(p){for(const P of u)P.show=p}}}function Xo(o,i,e,a,s){const l=(p,P,T)=>U.multiplyByPoint(i,new x(p,P,T),new x),u=[],d=Nt.fromColor(O.fromCssColorString("#f3f4f6").withAlpha(.92)),C=Nt.fromColor(O.fromCssColorString("#f5b800").withAlpha(.92)),f=(p,P,T,v,k,L)=>{if(a(p,P)<.8)return;const X=s(p,P)+.07;l(p,P,X);const Y=Tt.fromRotationZ(k),Z=U.fromRotationTranslation(Y,new x(p,P,X)),K=U.multiply(i,Z,new U);u.push(new vo({geometry:yo.fromDimensions({dimensions:new x(T,v,.04)}),modelMatrix:K,attributes:{color:L}}))},m=Math.atan2(-51,380);for(const p of e){if(Math.abs(p.e+148.8)<12&&Math.abs(p.n-216.3)<12){const T=[{bx:-154,by:230,horiz:!0,ang:0},{bx:-164.5,by:221.5,horiz:!1,ang:m},{bx:-164.5,by:210.5,horiz:!1,ang:m},{bx:-154,by:202.5,horiz:!0,ang:0},{bx:-129,by:229,horiz:!1,ang:m},{bx:-128.5,by:211.5,horiz:!1,ang:m},{bx:-136.5,by:202.5,horiz:!0,ang:0}];for(const v of T)for(let k=-3;k<=3;k++){const L=v.horiz?v.bx+k*1.1:v.bx,X=v.horiz?v.by:v.by+k*1.05;f(L,X,v.horiz?.52:2.8,v.horiz?2.8:.52,v.ang,d)}continue}const P=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const T of P){const v=p.e+T.de,k=p.n+T.dn;if(a(v,k)<1.2)continue;for(let Y=-3;Y<=3;Y++){const Z=T.horiz?v+Y*1.15:v,K=T.horiz?k:k+Y*1.15;f(Z,K,T.horiz?.52:2.8,T.horiz?2.8:.52,0,d)}const L=v+(T.de===0?0:Math.sign(T.de)*2.1),X=k+(T.dn===0?0:Math.sign(T.dn)*2.1);f(L,X,T.horiz?6.8:.42,T.horiz?.42:6.8,0,d)}}for(let p=-80;p<=440;p+=8)f(-154,p,.18,3.2,0,d),f(-132,p,.18,3.2,0,d);for(let p=-420;p<=160;p+=8){const P=263-(p+420)*.13421052631578947;f(p,P+7.5,3.2,.18,m,d),f(p,P-7.5,3.2,.18,m,d),f(p,P,4.5,.18,m,C)}for(let p=-160;p<=360;p+=8)f(158,p,.18,3.2,0,d);let b=null;u.length>0&&(b=new mo({geometryInstances:u,appearance:new po({flat:!0,translucent:!0}),asynchronous:!1}),o.scene.primitives.add(b));const h=[],y=wt("pare"),w=wt("peaton"),M=wt("vel30"),D=O.fromCssColorString("#9ca3af");return e.forEach((p,P)=>{const T=[{e:p.e-7.2,n:p.n-7.2,tex:y},{e:p.e+7.2,n:p.n-7.2,tex:P%2===0?w:M}];for(const v of T){const k=s(v.e,v.n);h.push(o.entities.add({position:l(v.e,v.n,k+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:D}}),o.entities.add({position:l(v.e,v.n,k+2.45),billboard:{image:v.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:go.CENTER}}))}}),{setVisible(p){b&&(b.show=p);for(const P of h)P.show=p}}}function Jo(o,i){const e=(M,D,p)=>U.multiplyByPoint(i,new x(M,D,p),new x),a=[],d=O.fromCssColorString("#7a7771"),C=O.fromCssColorString("#3d3833"),f=O.fromCssColorString("#24471b"),m=O.fromCssColorString("#3d7f8f").withAlpha(.88),b=O.fromCssColorString("#ffbe55");a.push(o.entities.add({position:e(-225,263.5,4.17+.32),cylinder:{length:.64,topRadius:3.3,bottomRadius:3.6,material:d,slices:12}}),o.entities.add({position:e(-225,263.5,4.17+.56),cylinder:{length:.24,topRadius:3.45,bottomRadius:3.55,material:f,slices:12}}),o.entities.add({position:e(-225,263.5,4.17+.66),cylinder:{length:.08,topRadius:2.95,bottomRadius:2.95,material:m,slices:24}}),o.entities.add({position:e(-225,263.5,4.17+1.35),cylinder:{length:1.9,topRadius:.34,bottomRadius:.48,material:C}}),o.entities.add({position:e(-225,263.5,4.17+1.35),cylinder:{length:.18,topRadius:1.95,bottomRadius:1.55,material:C,slices:24}}),o.entities.add({position:e(-225,263.5,4.17+2.2),cylinder:{length:.16,topRadius:1.15,bottomRadius:.85,material:C,slices:24}}));let h=0;const y=new Ke(new Ot(()=>{const M=.62+.18*Math.sin(h*7);return O.fromCssColorString("#d9f4ff").withAlpha(M)},!1)),w=new Ke(new Ot(()=>{const M=.46+.16*Math.cos(h*5.5);return O.fromCssColorString("#bce8f7").withAlpha(M)},!1));a.push(o.entities.add({position:e(-225,263.5,4.17+2.85),cylinder:{length:1.25,topRadius:.08,bottomRadius:.36,material:y,slices:16}}),o.entities.add({position:e(-225,263.5,4.17+1.78),cylinder:{length:.85,topRadius:1.08,bottomRadius:1.22,material:w,slices:24}}),o.entities.add({position:e(-225,263.5,4.17+1.02),cylinder:{length:.72,topRadius:1.88,bottomRadius:2.08,material:w,slices:24}}));for(let M=-246;M<=-202;M+=8.5)a.push(o.entities.add({position:e(M,255.8,4.17+1.1),cylinder:{length:2.2,topRadius:.04,bottomRadius:.05,material:C}}),o.entities.add({position:e(M,255.8,4.17+2.3),ellipsoid:{radii:new x(.16,.16,.22),material:b}}));return{update(M){h=M},setVisible(M){for(const D of a)D.show=M}}}const at=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Vt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],jt=3.2;async function Ko(o,i,e=110){const a=Ne.secciones;let s,l,u;try{s=await fetch(a+"vias_campo.json").then(n=>n.json());const t=new Uint8Array(await fetch(a+"vias_campo.bin").then(n=>n.arrayBuffer()));l=t.subarray(0,s.w*s.h),u=t.subarray(s.w*s.h)}catch{return null}const{cell:d,x0:C,y0:f,w:m,h:b}=s,h=(t,n)=>{const c=(t-C)/d-.5,r=(n-f)/d-.5,g=Math.floor(c),S=Math.floor(r);if(g<0||S<0||g>=m-1||S>=b-1)return 0;const R=c-g,F=r-S,z=S*m+g;return((l[z]*(1-R)+l[z+1]*R)*(1-F)+(l[z+m]*(1-R)+l[z+m+1]*R)*F)*.5},y=(t,n)=>{const c=Math.max(0,Math.min(m-1,Math.floor((t-C)/d))),r=Math.max(0,Math.min(b-1,Math.floor((n-f)/d))),g=r*m+c;if(l[g]>0)return u[g]*.1-2;let S=0,R=0;for(let F=-2;F<=2;F++){const z=r+F;if(!(z<0||z>=b))for(let I=-2;I<=2;I++){const q=c+I;if(q<0||q>=m)continue;const $=z*m+q;if(l[$]===0)continue;const ce=1/(I*I+F*F+.5);S+=ce,R+=(u[$]*.1-2)*ce}}return S>0?R/S:1},w=[],M=[],D=[];for(let t=2;t<b-2;t++)for(let n=2;n<m-2;n++){const c=t*m+n,r=C+(n+.5)*d,g=f+(t+.5)*d,S=Math.hypot(r+180,g-250);if(S>520)continue;const R=l[c]*.5;if(R>=2.6&&R<=5&&w.push(c),R>=6&&S<460&&D.push({e:r,n:g,d:R}),l[c]===0&&S<430){let F=!1;for(let z=-2;z<=2&&!F;z++)for(let I=-2;I<=2;I++)if(l[(t+z)*m+(n+I)]>0){F=!0;break}F&&M.push(c)}}if(!w.length)return null;D.sort((t,n)=>n.d-t.d);const p=[];for(const t of D){if(p.length>=6)break;if(p.some(r=>Math.hypot(r.e-t.e,r.n-t.n)<90))continue;const n=y(t.e,t.n),c=Go(o,i,t.e,t.n,y);c.ns.setState("green"),c.ew.setState("red"),p.push({e:t.e,n:t.n,u:n,faseOffset:p.length*4.5,rig:c,nsEstado:"green",ewEstado:"red"})}const P=Xo(o,i,p,h,y),T=Jo(o,i),v=(()=>{let t=12345;return()=>(t=t*1664525+1013904223>>>0)/4294967296})(),k=(t,n,c)=>{const r=Math.cos(c),g=Math.sin(c);if(t>=-168&&t<=-118&&Math.abs(g)>.35)return t<-143?g<-.2?12:-1e6:g>.2?12:-1e6;const S=263-(t+420)*(51/380);return Math.abs(n-S)<26&&Math.abs(r)>.35?n>S?r>.2?12:-1e6:r<-.2?12:-1e6:t>=-255&&t<=-210&&n<222&&Math.abs(g)>.35?g<-.2?10:-1e6:n<175&&t<-215&&Math.abs(r)>.35?r>.2?10:-1e6:t<-385&&n<265&&Math.abs(g)>.35?g<-.2?10:-1e6:0},L=[],X=(t,n,c)=>L.some(r=>r!==c&&Math.hypot(r.e-t,r.n-n)<8.5),Y=t=>{for(let n=0;n<45;n++){const c=w[Math.floor(v()*w.length)],r=C+(c%m+.5)*d,g=f+(Math.floor(c/m)+.5)*d;if(X(r,g,t))continue;let S=0,R=-1e9;for(let F=0;F<16;F++){const z=F/16*Math.PI*2,I=r+Math.cos(z)*10,q=g+Math.sin(z)*10,$=h(I,q),ce=k(I,q,z);if(ce<-1e4)continue;const Fe=h(r+Math.sin(z)*2.5,g-Math.cos(z)*2.5),me=h(r-Math.sin(z)*2.5,g+Math.cos(z)*2.5),N=-Math.abs($-jt)+(me>Fe?1.5:0)+ce;$>1.5&&N>R&&(R=N,S=z)}if(R>-1e8){t.e=r,t.n=g,t.th=S,t.vActual=t.v*.5;return}}};for(let t=0;t<e;t++){const n=v(),c=n<.12?"sitp_azul":n<.2?"sitp_amarillo":n<.38?"taxi":n<.54?"moto":n<.68?"hatch":n<.84?"suv":"sedan",S={e:0,n:0,th:0,v:c==="moto"?8+v()*4.5:c==="sitp_azul"||c==="sitp_amarillo"?5.2+v()*3:6.5+v()*5,vActual:0,model:null,u:0,tipo:c};Y(S),L.push(S)}const Z=[];if(M.length>0)for(let t=0;t<42;t++){const n=M[Math.floor(v()*M.length)],c=C+(n%m+.5)*d,r=f+(Math.floor(n/m)+.5)*d;Z.push({e:c,n:r,th:v()*Math.PI*2,v:1.15+v()*.45,model:null,u:y(c,r)+.16,conPerro:t%3===0})}const K=[],Me=(t,n,c,r,g,S,R,F=.68)=>{for(let z=0;z<g;z++){const I=g===1?(t+n)*.5:t+z/(g-1)*(n-t);for(let q=0;q<S;q++){if(v()>F)continue;const $=S===1?(c+r)*.5:c+q/(S-1)*(r-c);if(h(I,$)>.3)continue;const ce=v(),Fe=ce<.08?"taxi":ce<.42?"suv":"sedan",me=v()<.5?0:Math.PI,N=y(I,$);K.push({e:I+(v()-.5)*.25,n:$+(v()-.5)*.25,u:N>-1.5?N:3.55,th:R+me+(v()-.5)*.07,tipo:Fe,model:null})}}};Me(92,134,-22,62,4,15,.05,.7),Me(52,108,114,146,5,4,.12,.62),Me(58,106,-104,-56,4,6,.1,.65),Me(-132,-98,-46,32,3,12,.04,.68);const ue=new x,Re=new Tt,ze=new U,re=(t,n=.08)=>{t.model&&(x.fromElements(t.e,t.n,t.u+n,ue),Tt.fromRotationZ(t.th,Re),U.fromRotationTranslation(Re,ue,ze),t.model.modelMatrix=U.multiply(i,ze,new U))},fe={sedan:"carro.glb",suv:"carro_suv.glb",hatch:"carro_hatch.glb",taxi:"carro_taxi.glb",moto:"carro_moto.glb",sitp_azul:"sitp_azul.glb",sitp_amarillo:"sitp_amarillo.glb"},le=t=>t==="taxi"||t==="sitp_azul"||t==="sitp_amarillo",_e=(async()=>{for(let t=0;t<L.length;t++){const n=L[t],c=fe[n.tipo];try{const r=await Je.fromGltfAsync({url:a+c,upAxis:ve.Y,forwardAxis:ve.X,shadows:be.ENABLED,color:le(n.tipo)?O.WHITE:O.fromCssColorString(at[t%at.length]),colorBlendMode:yt.MIX,colorBlendAmount:le(n.tipo)?0:.32});o.scene.primitives.add(r),n.model=r,n.u=y(n.e,n.n),re(n)}catch{}t%6===5&&await new Promise(r=>setTimeout(r,35))}for(let t=0;t<Z.length;t++){const n=Z[t];try{const c=await Je.fromGltfAsync({url:a+(n.conPerro?"persona_perro.glb":"persona.glb"),upAxis:ve.Y,forwardAxis:ve.X,shadows:be.ENABLED,color:O.fromCssColorString(Vt[t%Vt.length]),colorBlendMode:yt.MIX,colorBlendAmount:.25});o.scene.primitives.add(c),n.model=c,re(n,0)}catch{}t%6===5&&await new Promise(c=>setTimeout(c,35))}for(let t=0;t<K.length;t++){const n=K[t],c=fe[n.tipo];try{const r=await Je.fromGltfAsync({url:a+c,upAxis:ve.Y,forwardAxis:ve.X,shadows:be.ENABLED,color:le(n.tipo)?O.WHITE:O.fromCssColorString(at[t*3%at.length]),colorBlendMode:yt.MIX,colorBlendAmount:le(n.tipo)?0:.32});o.scene.primitives.add(r),n.model=r,re(n)}catch{}t%8===7&&await new Promise(r=>setTimeout(r,30))}})();let Ye=!0,Ie=0;const gt=(t,n)=>h(t,n)===0&&h(t+4,n)+h(t-4,n)+h(t,n+4)+h(t,n-4)>.5;return{ready:_e,count:e,debug:()=>L.map(t=>[Math.round(t.e),Math.round(t.n),+t.u.toFixed(1),t.model?1:0]),setVisible(t){Ye=t;for(const n of L)n.model&&(n.model.show=t);for(const n of K)n.model&&(n.model.show=t);for(const n of Z)n.model&&(n.model.show=t);for(const n of p)n.rig.setVisible(t);P.setVisible(t),T.setVisible(t)},update(t){if(!Ye)return;const n=Math.min(.08,Math.max(.001,t));Ie+=n,T.update(Ie);for(const c of p){const r=(Ie+c.faseOffset)%24,g=r<10?"green":r<12?"yellow":"red",S=r>=12&&r<22?"green":r>=22?"yellow":"red";g!==c.nsEstado&&(c.nsEstado=g,c.rig.ns.setState(g)),S!==c.ewEstado&&(c.ewEstado=S,c.rig.ew.setState(S))}for(let c=0;c<L.length;c++){const r=L[c];if(!r.model)continue;let g=0,S=-1e9;for(let N=-4;N<=4;N++){const Q=N*.13,j=r.th+Q,ee=r.e+Math.cos(j)*9,te=r.n+Math.sin(j)*9,he=h(ee,te);if(he<1.1||h(r.e+Math.cos(j)*4.5,r.n+Math.sin(j)*4.5)<.9)continue;const He=k(ee,te,j);if(He<-1e4)continue;const V=h(ee+Math.sin(j)*2.5,te-Math.cos(j)*2.5),ae=h(ee-Math.sin(j)*2.5,te+Math.cos(j)*2.5),Te=-Math.abs(Math.min(he,6)-jt)-Math.abs(Q)*1.6+(ae>=V?.6:0)+He;Te>S&&(S=Te,g=Q)}if(S<-1e8||Math.hypot(r.e+180,r.n-250)>580){Y(r),r.u=y(r.e,r.n),re(r);continue}const R=Math.cos(r.th),F=Math.sin(r.th);let z=1;const I=r.tipo==="sitp_azul"||r.tipo==="sitp_amarillo",q=I?9.5:6.4,$=I?16.5:12.5;for(let N=0;N<L.length;N++){if(N===c||!L[N].model)continue;const Q=L[N],j=Q.e-r.e,ee=Q.n-r.n,te=j*j+ee*ee;if(te>320)continue;const he=Q.tipo==="sitp_azul"||Q.tipo==="sitp_amarillo",pe=q+(he?3:0),He=$+(he?3:0),V=j*R+ee*F,ae=Math.abs(-j*F+ee*R);if(V>0&&V<He&&ae<2.45){const Te=V<pe?0:(V-pe)/(He-pe);Te<z&&(z=Te)}else te<(I||he?42:22)&&N<c&&(z=0)}const ce=Math.abs(R)>Math.abs(F);for(const N of p){if((ce?N.ewEstado:N.nsEstado)==="green")continue;const j=N.e-r.e,ee=N.n-r.n,te=j*R+ee*F,he=Math.abs(-j*F+ee*R);if(te>7&&te<21&&he<9){const pe=te<10.5?0:(te-10.5)/10.5;pe<z&&(z=pe)}}const Fe=1-Math.min(.55,Math.abs(g)*1.4),me=r.v*Fe*z;if(r.vActual+=(me-r.vActual)*Math.min(1,n*4.5),r.vActual>.05){r.th+=Math.max(-1.4*n,Math.min(1.4*n,g));const N=r.e+Math.cos(r.th)*r.vActual*n,Q=r.n+Math.sin(r.th)*r.vActual*n;h(N,Q)>=.7?(r.e=N,r.n=Q):r.th+=.6;const j=Math.max(y(r.e,r.n),y(r.e+Math.cos(r.th)*1.4,r.n+Math.sin(r.th)*1.4),y(r.e-Math.cos(r.th)*1.4,r.n-Math.sin(r.th)*1.4));r.u+=(j-r.u)*Math.min(1,n*8)}re(r)}for(const c of Z){if(!c.model)continue;const r=c.e+Math.cos(c.th)*c.v*n,g=c.n+Math.sin(c.th)*c.v*n;gt(r,g)&&Math.hypot(r+180,g-250)<430?(c.e=r,c.n=g,c.u+=(y(c.e,c.n)+.16-c.u)*Math.min(1,n*4)):c.th+=.9+v()*1.2,re(c,0)}}}}async function Wt(o,i){try{const e=new Image;e.decoding="async",e.src=o,await e.decode();const a=document.createElement("canvas");a.width=e.naturalWidth,a.height=e.naturalHeight;const s=a.getContext("2d");s.drawImage(e,0,0);const l=s.getImageData(0,0,a.width,a.height);return new We({typedArray:new Uint8Array(l.data.buffer),width:a.width,height:a.height,repeat:!0,minificationFilter:ht.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})}catch{return new We({typedArray:new Uint8Array([...i,255]),width:1,height:1})}}function Zo(o,i){return new qe({uniforms:{uNight:{type:A.FLOAT,value:0},uLadrillo:{type:A.SAMPLER_2D,value:o},uTeja:{type:A.SAMPLER_2D,value:i}},varyings:{vRP:se.VEC3,vRN:se.VEC3},vertexShaderText:`
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
    `})}async function $o(o,i){const e=Ne.secciones;let a;try{a=await fetch(e+"revit.json").then(h=>h.json())}catch{return null}const[s,l]=await Promise.all([Wt(e+"tex_ladrillo.webp",[107,84,76]),Wt(e+"tex_teja.webp",[90,52,28])]),u=Zo(s,l),d=[];for(const h of a.niveles)try{const y=await Je.fromGltfAsync({url:e+h.file,modelMatrix:i,upAxis:ve.Y,forwardAxis:ve.X,shadows:be.ENABLED,backFaceCulling:!1,show:!1});y.customShader=u,y.imageBasedLighting.imageBasedLightingFactor=new Ae(.45,.25),o.scene.primitives.add(y),d.push({...h,model:y,off:0,target:0,delay:0,shown:!1})}catch(y){console.warn("Nivel de Revit no cargado",h.file,y)}if(!d.length)return null;const C=46,f=new U,m=h=>{const y=U.fromTranslation(new x(0,0,h.off),f);h.model.modelMatrix=U.multiply(i,y,new U)},b={niveles:d.map(h=>({i:h.i,nombre:h.nombre})),caja:a.caja,bloques:a.bloques??[],ready:!0,visible:!1,abierto:-1,play(){b.visible=!0,b.abierto=-1;const h=performance.now();d.forEach((y,w)=>{y.off=C,y.target=0,y.delay=h+w*620,y.shown=!1,y.model.show=!1,m(y)})},openAt(h){b.visible=!0,b.abierto=h;const y=performance.now();let w=0;for(const M of[...d].reverse())M.i>h&&(M.target=C,M.delay=y+w++*110);for(const M of d)M.i<=h&&(M.target=0,M.delay=y,M.shown||(M.off=C))},full(){b.visible=!0,b.abierto=-1;const h=performance.now();d.forEach((y,w)=>{(y.target!==0||!y.shown)&&(y.target=0,y.delay=h+w*110,y.shown||(y.off=C))})},hide(){b.visible=!1,b.abierto=-1;for(const h of d)h.model.show=!1,h.shown=!1,h.off=0,h.target=0},setNight(h){u.setUniform("uNight",h)},update(h,y){if(b.visible)for(const w of d){if(y<w.delay)continue;w.target===0&&!w.shown&&(w.shown=!0,w.model.show=!0);const M=w.target-w.off;if(Math.abs(M)<.01){w.off!==w.target&&(w.off=w.target,m(w)),w.target!==0&&w.shown&&(w.shown=!1,w.model.show=!1);continue}const D=w.target===0?1-Math.exp(-5.2*h):1-Math.exp(-4*h);w.off+=M*D,m(w)}}};return b}function Qo(o,i){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);const a=document.createElement("aside");a.className="pisos",a.hidden=!0,a.innerHTML="<small>Pisos · modelo Revit</small>";const s=new Map,l=(d,C,f)=>{const m=document.createElement("button");m.innerHTML=`${C}<span>${f}</span>`,m.addEventListener("click",()=>i(d)),s.set(d,m),a.appendChild(m)};l(-1,"Edificio completo","");for(const d of[...o.niveles].reverse())l(d.i,d.nombre.charAt(0)+d.nombre.slice(1).toLowerCase(),`N${d.i+1}`);document.body.appendChild(a);const u=d=>s.forEach((C,f)=>C.classList.toggle("on",f===d));return u(-1),{show:d=>{a.hidden=!d},mark:u}}const it={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function Ct(o){const i=/^#?([0-9a-f]{6})$/i.exec(o.trim());if(!i)return[1,1,1];const e=parseInt(i[1],16);return[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}const ea=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function ta(o){const i={dia:{...it.dia},tarde:{...it.tarde},noche:{...it.noche}};let e="dia";const a=document.createElement("button");a.id="btnLookStudio",a.className="look-toggle",a.textContent="⚙ Ajustar luz",a.title="Abrir editor de iluminación y color (L)",document.body.appendChild(a);const s=document.createElement("aside");s.id="lookPanel",s.className="look-panel",s.hidden=!0,s.innerHTML=`
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
  `,document.body.appendChild(s);const l=s.querySelector("#lpBody"),u=new Map;for(const b of ea){const h=document.createElement("section");h.className="lp-sec";const y=document.createElement("h4");y.textContent=b.title,h.appendChild(y);for(const w of b.items){const M=document.createElement("label");M.className="lp-row";const D=document.createElement("span");D.className="lp-lbl",D.textContent=w.label,M.appendChild(D);const p=document.createElement("input");p.type=w.type,w.type==="range"&&(p.min=String(w.min),p.max=String(w.max),p.step=String(w.step));const P=w.type==="range"?document.createElement("span"):void 0;P&&(P.className="lp-val"),p.addEventListener("input",()=>{const v=i[e];if(w.type==="range"){const k=parseFloat(p.value);v[w.key]=k,P&&(P.textContent=w.step&&w.step>=1?String(Math.round(k)):k.toFixed(2))}else v[w.key]=p.value;o(e,v)});const T=document.createElement("div");T.className="lp-ctrl",T.appendChild(p),P&&T.appendChild(P),M.appendChild(T),h.appendChild(M),u.set(w.key,{input:p,val:P})}l.appendChild(h)}const d={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function C(){const b=i[e],h=s.querySelector("#lpPresetName");h&&(h.textContent=d[e]);for(const[y,{input:w,val:M}]of u){const D=b[y];if(w.value=String(D),M&&typeof D=="number"){const p=parseFloat(w.step||"0.01");M.textContent=p>=1?String(Math.round(D)):D.toFixed(2)}}}const f=()=>{s.hidden=!s.hidden,a.classList.toggle("on",!s.hidden)};a.addEventListener("click",f),s.querySelector("#lpClose")?.addEventListener("click",f);const m=s.querySelector("#lpCopy");return m.addEventListener("click",async()=>{const b=JSON.stringify({active:e,presets:i},null,2);try{await navigator.clipboard.writeText(b),m.textContent="¡JSON copiado!",setTimeout(()=>m.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",b)}}),s.querySelector("#lpReset")?.addEventListener("click",()=>{i[e]={...it[e]},C(),o(e,i[e])}),addEventListener("keydown",b=>{b.code==="KeyL"&&!b.ctrlKey&&!b.metaKey&&!b.altKey&&f()}),C(),{setActivePreset(b){e=b,C()},getPreset(b){return i[b]},toggle:f}}So.defaultAccessToken=Ne.ionToken;const W=o=>document.getElementById(o),Lt=W("cesiumContainer"),qt=W("loading"),oa=W("loadBar"),to=W("loadLabel"),aa=W("loadPct");function Be(o,i){to.textContent=o;const e=Math.round(Math.max(0,Math.min(1,i))*100);oa.style.width=e+"%",aa.textContent=e+"%"}const J=new xo(Lt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:be.RECEIVE_ONLY,terrain:wo.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:bo.fromProviderAsync($t.fromAssetId(Ne.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),_=J.scene;_.globe.enableLighting=!0;_.globe.showGroundAtmosphere=!0;_.globe.depthTestAgainstTerrain=!0;_.globe.maximumScreenSpaceError=2;_.fog.enabled=!1;_.fog.density=18e-5;_.fog.minimumBrightness=.04;_.highDynamicRange=!0;_.msaaSamples=4;_.postProcessStages.fxaa.enabled=!0;_.screenSpaceCameraController.enableCollisionDetection=!1;_.light=new Co({intensity:3,color:O.fromCssColorString("#fff4e3")});const ke=J.shadowMap;ke.softShadows=!0;ke.size=4096;ke.maximumDistance=1200;ke.darkness=.24;ke.normalOffset=!0;{const o=ke;o._primitiveBias.depthBias=8e-4,o._primitiveBias.normalOffsetScale=1.6,o._primitiveBias.normalShadingSmooth=.35}const Le=_.postProcessStages.ambientOcclusion;Le.enabled=!0;Le.uniforms.intensity=2.1;Le.uniforms.bias=.08;Le.uniforms.lengthCap=.35;Le.uniforms.stepSize=1.4;Le.uniforms.blurStepSize=1;const Se=_.postProcessStages.bloom;Se.enabled=!0;Se.uniforms.glowOnly=!1;Se.uniforms.contrast=128;Se.uniforms.brightness=-.36;Se.uniforms.delta=1;Se.uniforms.sigma=2.6;Se.uniforms.stepSize=1.5;const ia=At(),Mt=o=>{const i=U.getColumn(ia,o,new je);return new x(i.x,i.y,i.z)},we=Ho(Mt(0),Mt(1),Mt(2));_.postProcessStages.add(we);const xe=No();_.postProcessStages.add(xe);J.camera.frustum.fov=Kt.toRadians(48);const Yt=(()=>{try{const o=_.context._gl,i=o.getExtension("WEBGL_debug_renderer_info");return i?String(o.getParameter(i.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),na=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Yt)&&!/Arc/i.test(Yt);let E=null,oe=na||matchMedia("(pointer: coarse)").matches?.5:1;function et(){const o=Math.min(window.devicePixelRatio||1,2);J.resolutionScale=o*(oe>=1?1:oe>=.5?.8:.62),ke.size=oe>=1?4096:oe>=.5?2048:1024,ke.softShadows=oe>=.5,Le.enabled=oe>=1,Se.enabled=oe>=.5,_.msaaSamples=oe>=1?4:1,J.shadows=oe>=.5,E?.tileset&&(E.tileset.maximumScreenSpaceError=oe>=1?8:oe>=.5?12:20)}et();J.clock.shouldAnimate=!1;J.clock.currentTime=$e.fromIso8601("2026-06-21T16:50:00-05:00");const B=new Lo(J),ft=o=>de(bt[o].e,bt[o].n,bt[o].u),sa=ft("hotel");B.flyTo({pivot:sa,heading:lt.general.heading,pitch:lt.general.pitch,range:lt.general.range*1.8},0);B.groundHeight=o=>_.globe.getHeight(o);const ra=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let ye=.04,Ee=1,Pe=null;const la=o=>$e.toDate($e.fromIso8601(o)).getTime();function mt(o){_.light.intensity=o.sunIntensity,_.light.color=O.fromCssColorString(o.sunColor),ke.darkness=o.shadowDarkness,Le.uniforms.intensity=o.aoIntensity,Se.uniforms.brightness=o.bloomBrightness,xe.uniforms.uExposure=o.exposure,xe.uniforms.uContrast=o.contrast,xe.uniforms.uSaturation=o.saturation;const[i,e,a]=Ct(o.tintColor);xe.uniforms.uTint=new x(i,e,a),xe.uniforms.uVignette=o.vignette;const[s,l,u]=Ct(o.skyZenith);we.uniforms.uSkyZenith=new x(s,l,u);const[d,C,f]=Ct(o.skyHorizon);we.uniforms.uSkyHorizon=new x(d,C,f),we.uniforms.uCloudDensity=o.cloudDensity,we.uniforms.uCloudSpeed=o.cloudSpeed,E?.setLook({skyFill:o.skyFill,groundFill:o.groundFill,hazeAmount:o.hazeAmount,hazeStart:o.hazeStart})}const dt=ta((o,i)=>mt(i));mt(dt.getPreset("dia"));we.uniforms.uNight=ye;we.uniforms.uTarde=Ee;xe.uniforms.uNight=ye;xe.uniforms.uTarde=Ee;_.skyAtmosphere&&(_.skyAtmosphere.hueShift=0,_.skyAtmosphere.saturationShift=.08,_.skyAtmosphere.brightnessShift=-.04);function ca(o){Pe={from:$e.toDate(J.clock.currentTime).getTime(),to:la(o.iso),start:performance.now(),dur:1600},_.fog.density=o.fog,dt.setActivePreset(o.id),mt(dt.getPreset(o.id)),_.skyAtmosphere&&(_.skyAtmosphere.hueShift=0,_.skyAtmosphere.saturationShift=o.id==="tarde"?.08:o.id==="noche"?-.25:.06,_.skyAtmosphere.brightnessShift=o.id==="noche"?-.55:o.id==="tarde"?-.04:0);const e=ye,a=Ee,s=performance.now(),l=()=>{const d=Math.min(1,(performance.now()-s)/1400),C=d*d*(3-2*d);ye=e+(o.night-e)*C,Ee=a+(o.tarde-a)*C,E?.setNight(ye),G?.setNight(ye),E?.setTarde(Ee),we.uniforms.uNight=ye,we.uniforms.uTarde=Ee,xe.uniforms.uNight=ye,xe.uniforms.uTarde=Ee,d<1&&requestAnimationFrame(l)};requestAnimationFrame(l),document.querySelectorAll("[data-light]").forEach(d=>d.classList.toggle("on",d.dataset.light===o.id));const u=W("clockLabel");u&&(u.textContent=o.label)}document.querySelectorAll("[data-light]").forEach(o=>{o.addEventListener("click",()=>{const i=ra.find(e=>e.id===o.dataset.light);i&&ca(i)})});let Ve=!1;const Pt=W("btnOrbit"),Rt=W("btnPedestrian");function Ce(){Ve=!1,Pt?.classList.remove("on")}function tt(o,i=2){Ce();const e=lt[o];B.flyTo({pivot:ft(e.place),heading:e.heading,pitch:e.pitch,range:e.range},i)}W("btnHome")?.addEventListener("click",()=>tt("general",2.2));W("btnAerial")?.addEventListener("click",()=>tt("aerial"));W("btnArch")?.addEventListener("click",()=>tt("arch"));Rt?.addEventListener("click",()=>{Ce(),B.isWalking?B.exitWalk():B.enterWalk(ne?ao(ne):void 0)});B.onModeChange=o=>{Rt?.classList.toggle("on",o);const i=W("hint");i&&o&&(i.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",i.classList.remove("fade"),setTimeout(()=>i.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(o=>{o.addEventListener("click",()=>{Ce();const i=o.dataset.place;if(i==="hotel"&&E){const e=E.buildings.find(a=>a.s==="Hotel");if(e){De(null),De(e);return}}B.flyTo({pivot:ft(i),range:i==="hotel"?300:520,pitch:-.5},2)})});Pt?.addEventListener("click",()=>{Ve=!Ve,Pt.classList.toggle("on",Ve),Ve&&B.isWalking&&B.exitWalk()});Lt.addEventListener("pointerdown",Ce);Lt.addEventListener("wheel",Ce,{passive:!0});addEventListener("keydown",o=>{o.code==="Escape"&&(B.isWalking?B.exitWalk():De(null)),(o.code==="KeyH"||o.code==="Home")&&tt("general",2.2),o.code==="KeyP"&&Rt?.click()});let ne=null,Ze=null;const da=9;let ct=null,G=null,Oe=null,Et=!1,Gt=!1;async function ua(){if(Gt||(Gt=!0,await _t(),!E||!G))return;Ce();const o=G.caja;B.flyTo({pivot:de((o[0]+o[2])/2,(o[1]+o[3])/2,12),heading:.55,pitch:-.4,range:230},.01);const i=E.buildings.find(e=>e.s==="Hotel");i?De(i):pt()}let nt=null;function _t(){return nt||(nt=(async()=>{E&&(G=await $o(J,E.matrix),G&&(G.setNight(ye),Oe=Qo(G,o=>{if(!G)return;Ce(),Oe?.mark(o),o<0?G.full():G.openAt(o);const i=G.caja;B.flyTo({pivot:de((i[0]+i[2])/2,(i[1]+i[3])/2,12),pitch:o<0?-.42:-.95,range:o<0?230:150},1.4)}),Et&&(Et=!1,pt(),ge&&(J.entities.remove(ge),ge=null))))})(),nt)}function pt(){!E||!G||(E.setRevitBlocks(G.bloques),G.play(),Oe?.mark(-1),Oe?.show(!0))}function oo(){E&&(ct={start:performance.now()},E.setHotelFloors(0))}let ge=null;const st=W("card");function ha(o){return de((o.bb[0]+o.bb[2])/2,(o.bb[1]+o.bb[3])/2,o.b+o.h*.5)}function ao(o){return de((o.bb[0]+o.bb[2])/2,o.bb[1]-9,o.b)}function De(o){const i=ne?.s==="Hotel";if(ne=o,ge&&(J.entities.remove(ge),ge=null),!o||!E){st&&(st.hidden=!0),Oe?.show(!1);return}if(o.s!=="Hotel"?Oe?.show(!1):G?.visible&&Oe?.show(!0),o.s!=="Hotel"){const f=o.r.map(([b,h])=>de(b,h,0,E.matrix)),m=2572+o.b-.5;ge=J.entities.add({polygon:{hierarchy:new ko(f),height:m,extrudedHeight:m+o.h+2.2,material:O.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:O.fromCssColorString("#d7ebff"),shadows:be.DISABLED}})}const e=o.s==="Hotel";if(e&&!i){G?(pt(),ge&&(J.entities.remove(ge),ge=null)):(Et=!0,_t(),oo()),Ce();const f=G?.caja;B.flyTo(f?{pivot:de((f[0]+f[2])/2,(f[1]+f[3])/2,12),heading:.55,pitch:-.4,range:230}:{pivot:ft("hotel"),pitch:-.38,range:290},1.8)}const a=e&&E?E.buildings.filter(f=>f.s==="Hotel"):[o],s=f=>Math.abs(f.r.reduce((m,b,h)=>{const y=f.r[(h+1)%f.r.length];return m+b[0]*y[1]-y[0]*b[1]},0)/2),l=a.reduce((f,m)=>f+s(m),0),u=a.reduce((f,m)=>f+s(m)*m.p,0),d=Math.max(...a.map(f=>f.p)),C=Math.max(...a.map(f=>f.h));Math.abs(o.r.reduce((f,m,b)=>{const h=o.r[(b+1)%o.r.length];return f+m[0]*h[1]-h[0]*m[1]},0)/2),W("cardKind").textContent=e?"Proyecto":`Sector ${o.s}`,W("cardTitle").textContent=e?"Hotel La Fontana":`Edificación ${o.id+1}`,W("cardData").innerHTML=`<dt>Pisos</dt><dd>${e?"hasta "+d:o.p}</dd><dt>Altura</dt><dd>${C.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(l).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(u).toLocaleString("es-CO")} m²</dd>`,st&&(st.hidden=!1)}B.onPick=o=>{E&&De(o?E.buildingAt(o):null)};W("cardClose")?.addEventListener("click",()=>De(null));W("cardFocus")?.addEventListener("click",()=>{if(!ne)return;Ce();const o=Math.max(ne.bb[2]-ne.bb[0],ne.bb[3]-ne.bb[1],ne.h);B.flyTo({pivot:ha(ne),pitch:-.42,range:Math.max(60,o*2.1)},1.7)});W("cardWalk")?.addEventListener("click",()=>{ne&&(Ce(),B.enterWalk(ao(ne)))});const kt=W("status"),Xt=W("statusText");async function fa(){const o=performance.now()+25e3;let i=0;for(;performance.now()<o;){const e=_.globe.tilesLoaded,a=!E?.tileset||E.tileset.tilesLoaded;if(e&&a){if(i||(i=performance.now()),performance.now()-i>=600)break}else i=0;await new Promise(s=>setTimeout(s,150))}for(let e=0;e<8;e++)await new Promise(a=>requestAnimationFrame(a))}async function ma(){Be("Cargando el modelo del hotel...",.05),await new Promise(e=>setTimeout(e,30)),E=await jo(J,(e,a)=>Be(e,.05+a*.2),(e,a,s)=>{Be(`Cargando secciones (${e}/${a}) · ${s}`,.25+e/Math.max(1,a)*.45),!(!kt||!Xt)&&(kt.hidden=!1,Xt.textContent=e<a?`Cargando secciones ${e}/${a} · ${s}`:`Modelo completo · ${a} secciones`,e>=a&&setTimeout(()=>kt.classList.add("fade"),2600))}),E.setNight(ye),E.setTarde(Ee),_t();const o=document.querySelector("[data-light].on")?.dataset.light||"dia";mt(dt.getPreset(o)),et(),tt("general",0);{const e=[-248.4,249.1,-178,305.3];B.flyTo({pivot:de((e[0]+e[2])/2,(e[1]+e[3])/2,12),heading:.55,pitch:-.4,range:230},0)}await E.done,Be("Cargando tráfico y parqueaderos...",.78),Ze=await Ko(J,E.matrix),Ze&&await Ze.ready,window.__ALL__=!0,Be("Renderizando texturas y 3D Tiles...",.9),await fa(),Be("Listo",1),qt.classList.add("done"),ua(),setTimeout(()=>qt.remove(),900);const i=W("hint");i&&setTimeout(()=>i.classList.add("fade"),9e3),window.__READY__=!0}const ie={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Mo,viewer:J,cam:B,getSite:()=>E,enuToWorld:de,select:De,stats:ie,playHotel:oo,playRevit:pt,getRevit:()=>G,getTrafico:()=>Ze,setQuality:o=>{oe=o,et()}};ma().catch(o=>{console.error(o),to.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(o?.message??o)});let Jt=performance.now(),St=0;function io(){const o=performance.now(),i=Math.min(.1,(o-Jt)/1e3);if(Jt=o,Pe){const a=Math.min(1,(o-Pe.start)/Pe.dur),s=a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2;J.clock.currentTime=$e.fromDate(new Date(Pe.from+(Pe.to-Pe.from)*s)),a>=1&&(Pe=null)}if(ct&&E){const a=(o-ct.start)/550,s=Math.floor(a),l=a-s,u=1-Math.pow(1-Math.min(1,l*1.6),3);s>=da?(E.setHotelFloors(99),ct=null):E.setHotelFloors(s+u)}G?.update(i,o),Ze?.update(i);const e=o*.001;if(E?.setTime(e),we.uniforms.uTime=e,Ve&&!B.isWalking&&B.flyTo({heading:B.state.heading+.16*i},0),B.update(i),ie.frames++,o-ie.t0>=2e3){ie.fps=Math.round(ie.frames*1e3/(o-ie.t0)),ie.frames=0,ie.t0=o,window.__FPS__=ie.fps;const a=!!E&&E.sections.loaded>=E.sections.total&&o-St>8e3;E&&E.sections.loaded>=E.sections.total&&!St&&(St=o),a&&document.visibilityState==="visible"&&(ie.fps<20&&oe>.25&&!window.__DBG__.lock?++ie.low>=3&&(oe=oe>=1?.5:.25,ie.low=0,et()):ie.low=0)}requestAnimationFrame(io)}requestAnimationFrame(io);addEventListener("resize",et);
