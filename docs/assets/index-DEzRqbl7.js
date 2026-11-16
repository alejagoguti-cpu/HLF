var Qt=Object.defineProperty;var eo=(t,a,e)=>a in t?Qt(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e;var F=(t,a,e)=>eo(t,typeof a!="symbol"?a+"":a,e);import{C as x,a as Wt,T as xt,M as B,b as Ee,c as Be,H as to,P as qt,d as De,L as oo,U as E,V as re,e as He,f as Ne,g as st,h as rt,i as Lt,j as ao,S as ve,I as Yt,k as io,R as no,l as je,A as me,m as N,n as Rt,o as so,p as ro,q as lo,r as We,s as It,t as bt,G as co,B as uo,u as ut,v as fo,w as ho,x as mo,y as po,J as Ye,z as go,D as vo,E as yo}from"./cesium-j17Lq24u.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const f of l.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function e(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(n){if(n.ep)return;n.ep=!0;const l=e(n);fetch(n.href,l)}})();const ft="/HLF/",xo=ft.endsWith("/")?ft:ft+"/",bo=xo+"cesium/";window.CESIUM_BASE_URL=bo;const ot={longitude:-74.04145021,latitude:4.70207636,height:2572},ht={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},at={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},ze={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},wo=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Ft=-1.5533,_t=-.012,Co=4200,Mo=6,Ht=1.7;class ko{constructor(a){F(this,"viewer");F(this,"canvas");F(this,"pivot",new x);F(this,"heading",.5);F(this,"pitch",-.6);F(this,"range",1200);F(this,"targetPivot",new x);F(this,"targetHeading",.5);F(this,"targetPitch",-.6);F(this,"targetRange",1200);F(this,"damping",9);F(this,"drag",null);F(this,"pointers",new Map);F(this,"pinch",null);F(this,"lastTap",0);F(this,"keys",new Set);F(this,"tween",null);F(this,"fov",Wt.toRadians(48));F(this,"walking",!1);F(this,"eye",new x);F(this,"eyeTarget",new x);F(this,"wHeading",0);F(this,"wPitch",0);F(this,"wHeadingT",0);F(this,"wPitchT",0);F(this,"onPick",null);F(this,"onModeChange",null);F(this,"groundHeight",null);this.viewer=a,this.canvas=a.scene.canvas,a.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:x.clone(this.targetPivot)}}setPivot(a,e=!0){if(e){const o=x.clone(this.viewer.camera.positionWC),n=x.subtract(o,a,new x),l=x.magnitude(n),f=xt.eastNorthUpToFixedFrame(a),d=B.inverseTransformation(f,new B),b=B.multiplyByPointAsVector(d,n,new x);if(l>1){const w=-Math.asin(Math.max(-1,Math.min(1,b.z/l)));if(w<_t&&w>Ft){let y=Math.atan2(-b.x,-b.y);for(;y-this.heading>Math.PI;)y-=Math.PI*2;for(;y-this.heading<-Math.PI;)y+=Math.PI*2;this.heading=this.targetHeading=y,this.pitch=this.targetPitch=w,this.range=this.targetRange=this.clamp(l),x.clone(a,this.pivot)}}}this.targetPivot=x.clone(a),this.tween=null}bind(){const a=this.canvas;a.style.touchAction="none",a.addEventListener("pointerdown",o=>{if(a.setPointerCapture(o.pointerId),this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2){const[n,l]=[...this.pointers.values()];this.pinch={distance:Math.hypot(n.x-l.x,n.y-l.y),range:this.targetRange,cx:(n.x+l.x)/2,cy:(n.y+l.y)/2},this.drag=null;return}o.button===2||o.button===1||o.shiftKey?this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"pan",moved:!1}:o.button===0&&(this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"orbit",moved:!1}),this.tween=null}),a.addEventListener("pointermove",o=>{if(!this.pointers.has(o.pointerId))return;if(this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2&&this.pinch){const[f,d]=[...this.pointers.values()],b=Math.hypot(f.x-d.x,f.y-d.y),w=(f.x+d.x)/2,y=(f.y+d.y)/2;this.walking?this.walk((this.pinch.cy-y)*.06,0):(b>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/b)),this.pan(this.pinch.cx-w,y-this.pinch.cy)),this.pinch.cx=w,this.pinch.cy=y;return}if(!this.drag||o.pointerId!==this.drag.id)return;const n=o.offsetX-this.drag.x,l=o.offsetY-this.drag.y;this.drag.x=o.offsetX,this.drag.y=o.offsetY,Math.abs(n)+Math.abs(l)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=n*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+l*.0028))):this.walk(l*.05,-n*.05):this.drag.mode==="orbit"?(this.targetHeading-=n*.0042,this.targetPitch=this.clampPitch(this.targetPitch-l*.0034)):this.pan(-n,l)});const e=o=>{if(this.pointers.delete(o.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&o.pointerId===this.drag.id){const n=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,n&&o.type==="pointerup"){const l=new Ee(o.offsetX,o.offsetY),f=performance.now();if(o.pointerType!=="mouse"&&f-this.lastTap<320){this.lastTap=0,this.focusAt(l);return}this.lastTap=f;const d=this.pickWorld(l);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};a.addEventListener("pointerup",e),a.addEventListener("pointercancel",e),a.addEventListener("contextmenu",o=>o.preventDefault()),a.addEventListener("wheel",o=>{o.preventDefault(),this.tween=null;const n=o.deltaMode===1?16:o.deltaMode===2?100:1,l=o.deltaY*n;if(this.walking){this.walk(-l*.02,0);return}const f=Math.exp(Math.max(-.45,Math.min(.45,l*.0016))),d=this.pickWorld(new Ee(o.offsetX,o.offsetY)),b=this.clamp(this.targetRange*f);if(d&&f<1){const w=Math.min(.45,(this.targetRange-b)/this.targetRange)*.8,y=x.subtract(d,this.targetPivot,new x),m=x.magnitude(y);if(m>1){const u=Math.min(m,this.targetRange)*w/m;x.add(this.targetPivot,x.multiplyByScalar(y,u,y),this.targetPivot)}}this.targetRange=b},{passive:!1}),a.addEventListener("dblclick",o=>{o.preventDefault(),this.focusAt(new Ee(o.offsetX,o.offsetY))}),addEventListener("keydown",o=>{o.target instanceof HTMLInputElement||(this.keys.add(o.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(o.code)&&o.preventDefault())}),addEventListener("keyup",o=>this.keys.delete(o.code)),addEventListener("blur",()=>this.keys.clear())}clamp(a,e=Mo,o=Co){return Math.max(e,Math.min(o,a))}clampPitch(a){return Math.max(Ft,Math.min(_t,a))}moveHorizontal(a,e,o,n){const l=xt.eastNorthUpToFixedFrame(a),f=new x(Math.sin(e)*o+Math.cos(e)*n,Math.cos(e)*o-Math.sin(e)*n,0);B.multiplyByPoint(l,f,a)}pan(a,e){const o=this.canvas.clientHeight||1,n=2*this.range*Math.tan(this.fov/2)/o,l=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,e*n/l,a*n),this.tween=null}walk(a,e){this.moveHorizontal(this.eyeTarget,this.wHeading,a,e),this.snapEye()}snapEye(){const a=Be.fromCartesian(this.eyeTarget),e=this.groundHeight?.(a);e!==void 0&&Number.isFinite(e)&&(a.height=e+Ht,Be.toCartesian(a,void 0,this.eyeTarget))}pickWorld(a){const e=this.viewer.scene;let o;if(e.pickPositionSupported&&e.pick(a,4,4)&&(o=e.pickPosition(a)),!o){const n=e.camera.getPickRay(a);n&&(o=e.globe.pick(n,e)??void 0)}return o??null}focusAt(a){const e=this.pickWorld(a);if(e){if(this.walking){x.clone(e,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:e,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(a,e=2){this.walking&&this.exitWalk(!1);const o={pivot:a.pivot??x.clone(this.targetPivot),heading:a.heading??this.targetHeading,pitch:a.pitch??this.targetPitch,range:a.range??this.targetRange};let n=o.heading;for(;n-this.targetHeading>Math.PI;)n-=Math.PI*2;for(;n-this.targetHeading<-Math.PI;)n+=Math.PI*2;if(o.heading=n,e<=.02){this.tween=null,this.targetPivot=x.clone(o.pivot),this.pivot=x.clone(o.pivot),this.heading=this.targetHeading=o.heading,this.pitch=this.targetPitch=o.pitch,this.range=this.targetRange=o.range;return}this.tween={from:{pivot:x.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:o,start:performance.now(),duration:e*1e3}}enterWalk(a){x.clone(a??this.targetPivot,this.eyeTarget),this.snapEye(),x.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(a=!0){if(!this.walking)return;this.walking=!1;const e=Be.fromCartesian(this.eyeTarget);e.height-=Ht-1;const o=Be.toCartesian(e);this.pivot=x.clone(o),this.targetPivot=o,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,a?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(a){if(!this.keys.size)return;const e=this.keys,o=e.has("ShiftLeft")||e.has("ShiftRight")?3:1;let n=0,l=0;(e.has("KeyW")||e.has("ArrowUp"))&&(n+=1),(e.has("KeyS")||e.has("ArrowDown"))&&(n-=1),(e.has("KeyD")||e.has("ArrowRight"))&&(l+=1),(e.has("KeyA")||e.has("ArrowLeft"))&&(l-=1);let f=0;if(e.has("KeyQ")&&(f+=1),e.has("KeyE")&&(f-=1),this.walking){f&&(this.wHeadingT-=f*1.2*a),(n||l)&&this.walk(n*4.2*o*a,l*3.4*o*a);return}if(f&&(this.targetHeading+=f*.9*a,this.tween=null),(e.has("PageUp")||e.has("Equal")||e.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*a))),(e.has("PageDown")||e.has("Minus")||e.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*a))),e.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*a)),e.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*a)),!n&&!l)return;const d=Math.max(8,this.range*.6)*o*a;this.moveHorizontal(this.targetPivot,this.heading,n*d,l*d),this.tween=null}update(a){this.updateKeys(a);const e=1-Math.exp(-this.damping*a);if(this.walking){x.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*a),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*e,this.wPitch+=(this.wPitchT-this.wPitch)*e,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const o=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),n=wo(o),{from:l,to:f}=this.tween;x.lerp(l.pivot,f.pivot,n,this.targetPivot),this.targetHeading=l.heading+(f.heading-l.heading)*n,this.targetPitch=l.pitch+(f.pitch-l.pitch)*n,this.targetRange=Math.exp(Math.log(l.range)+(Math.log(f.range)-Math.log(l.range))*n),o>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*e,this.pitch+=(this.targetPitch-this.pitch)*e,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*e),x.lerp(this.pivot,this.targetPivot,e,this.pivot),this.viewer.camera.lookAt(this.pivot,new to(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(B.IDENTITY)}}function So(){return new Ne({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const Gt=()=>({uAerial:{type:E.SAMPLER_2D,value:So()},uAerialRect:{type:E.VEC4,value:new He(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:E.FLOAT,value:0}}),Xt=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,Ge=`
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
`;function To(){return new De({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uSkyFill:{type:E.FLOAT,value:.24},uHazeAmount:{type:E.FLOAT,value:.08},uHazeStart:{type:E.FLOAT,value:1200},uHotelPisos:{type:E.FLOAT,value:99},uRevitBox:{type:E.VEC4,value:new He(0,0,0,0)},uLean:{type:E.VEC2,value:new Ee(0,0)},...Gt()},varyings:{vPosM:re.VEC3,vUpEC:re.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Ge+Xt+`
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
    `})}function Ao(t,a,e){return new De({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uSkyFill:{type:E.FLOAT,value:.22},uHazeAmount:{type:E.FLOAT,value:.08},uHazeStart:{type:E.FLOAT,value:1200},uTime:{type:E.FLOAT,value:0},uFrame:{type:E.FLOAT,value:a},uTop:{type:E.FLOAT,value:e},uAtlas:{type:E.SAMPLER_2D,value:new Ne({url:t,repeat:!1,minificationFilter:rt.LINEAR_MIPMAP_LINEAR,magnificationFilter:st.LINEAR})}},varyings:{vUV:re.VEC2,vView:re.VEC3,vRightT:re.VEC2,vUpT:re.VEC2,vUpEC:re.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:Ge+`
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
    `})}function Eo(){return new De({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uHazeAmount:{type:E.FLOAT,value:.08},uHazeStart:{type:E.FLOAT,value:1200}},lightingModel:oo.UNLIT,fragmentShaderText:Ge+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function zo(t,a,e){return new qt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:t,uNorth:a,uUp:e,uSkyZenith:new x(.16,.42,.82),uSkyHorizon:new x(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function Po(){return new qt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new x(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function Lo(t){const a=e=>({type:E.SAMPLER_2D,value:new Ne({url:t+e,repeat:!0,minificationFilter:rt.LINEAR_MIPMAP_LINEAR,magnificationFilter:st.LINEAR})});return new De({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uGroundFill:{type:E.FLOAT,value:.12},uHazeAmount:{type:E.FLOAT,value:.08},uHazeStart:{type:E.FLOAT,value:1200},uAsfalto:a("tex_asfalto.webp"),uAnden:a("tex_anden.webp"),uPrado:a("tex_prado.webp"),uCiclo:a("tex_ciclo.webp"),...Gt()},varyings:{vG:re.VEC3,vUpEC:re.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Ge+Xt+`
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
    `})}function Ro(){return new De({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uSkyFill:{type:E.FLOAT,value:.24},uHazeAmount:{type:E.FLOAT,value:.08},uHazeStart:{type:E.FLOAT,value:1200}},varyings:{vPosM:re.VEC3,vUpEC:re.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Ge+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float dist = length(fsInput.attributes.positionEC);
        float hz = hlfHaze(dist, uHazeStart, uHazeAmount);
        vec3 col = material.diffuse;
        vec3 nEC = normalize(material.normalEC);
        vec3 upEC = normalize(vUpEC);
        vec3 skyFill = hlfSkyFill(nEC, upEC, uNight, uTarde);

        // Iluminación protagonista del Hotel La Fontana:
        // 1. Luz clave suave de plazoleta (realza ladrillo, derrames 3D y arbustos incluso en sombra)
        vec3 keyDirEC = normalize(czm_viewRotation * vec3(0.45, -0.72, 0.52));
        float keyDiff = max(0.0, dot(nEC, keyDirEC)) * 0.55 + 0.45;
        vec3 heroFill = col * mix(vec3(1.08, 0.96, 0.86), vec3(0.18, 0.24, 0.36), uNight) * keyDiff * mix(0.62, 0.35, uNight);

        // 2. Bañadores verticales cálidos (wall-washers) sobre machones de ladrillo (estilo foto real)
        float pierWave = pow(0.5 + 0.5 * cos((vPosM.x + vPosM.z) * 1.45), 2.5);
        float heightFade = smoothstep(3.8, 5.2, vPosM.y) * smoothstep(23.5, 6.0, vPosM.y);
        float baseWash = smoothstep(8.8, 4.3, vPosM.y) * step(3.8, vPosM.y);
        // Solo sobre superficies opacas (no vidrio brillante)
        float esOpaco = step(0.18, material.roughness);
        vec3 warmBeam = vec3(1.0, 0.62, 0.24) * col * esOpaco * (
          pierWave * heightFade * mix(0.28, 0.95, uNight) +
          baseWash * mix(0.42, 1.15, uNight)
        );

        // 3. Calidez sutil en ventanas (vidrio con reflejo y vida interior)
        float esVidrio = 1.0 - esOpaco;
        float winSeed = fract(sin(dot(floor(vec2(vPosM.x + vPosM.z, vPosM.y) * 0.32), vec2(12.9898, 78.233))) * 43758.5453);
        float winOn = step(0.42, winSeed);
        vec3 winGlow = vec3(1.0, 0.72, 0.38) * esVidrio * winOn * mix(0.12, 1.35, uNight);

        material.diffuse = col * mix(1.12, 0.42, uNight) * (1.0 - hz);
        material.emissive = (material.emissive + heroFill + col * skyFill * 0.22 + warmBeam + winGlow) * (1.0 - hz) + hlfHazeColor(uNight, uTarde) * hz;
      }
    `})}function Mt(){return xt.eastNorthUpToFixedFrame(x.fromDegrees(ot.longitude,ot.latitude,ot.height))}function Le(t,a,e,o=Mt()){return B.multiplyByPoint(o,new x(t,a,e),new x)}const Io={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function Fo(t,a,e){let o=!1;for(let n=0,l=e.length-1;n<e.length;l=n++){const[f,d]=e[n],[b,w]=e[l];d>a!=w>a&&t<(b-f)*(a-d)/(w-d)+f&&(o=!o)}return o}function _o(t,a,e){let o=1/0;for(let n=0,l=e.length-1;n<e.length;l=n++){const[f,d]=e[l],[b,w]=e[n],y=b-f,m=w-d,u=Math.max(0,Math.min(1,((t-f)*y+(a-d)*m)/(y*y+m*m||1)));o=Math.min(o,Math.hypot(t-f-u*y,a-d-u*m))}return o}async function Ho(t,a,e){const o=t.scene,n=Mt(),l=B.inverseTransformation(n,new B),f=ze.secciones;a("Contexto urbano",.08);const[d,b,w,y]=await Promise.all([fetch(f+"recorte.json").then(c=>c.json()),fetch(f+"edificios.json").then(c=>c.json()),fetch(f+"arboles.json").then(c=>c.json()),fetch(f+"suelo.json").then(c=>c.json())]),m=()=>d.clips.map(c=>{const i=new io({positions:x.fromDegreesArray(c.flat())}),r=i.computeRectangle();return i.computeRectangle=h=>no.clone(r,h),i});o.globe.clippingPolygons=new Lt({polygons:m()});const u=Eo();let g=null;try{g=await ao.fromUrl(ze.googleTiles,{maximumScreenSpaceError:10,shadows:ve.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),g.clippingPolygons=new Lt({polygons:m()}),g.customShader=u,o.primitives.add(g)}catch(c){console.warn("Tiles de Google no disponibles",c)}const v=[-236,330],C=[];for(const c of b.secciones){const i=c.key==="Hotel";C.push({key:c.key,file:i?"hotel_fachadas.glb":c.file,kind:i?"cubierta_pbr":"edificios",label:i?"Hotel La Fontana 3D":`Edificaciones · sector ${c.key}`,dist:i?-2:Math.hypot(c.c[0]-v[0],c.c[1]-v[1])})}C.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),C.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),C.sort((c,i)=>c.dist-i.dist);const D={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},p=y.secciones.map(c=>({key:c.key,file:c.file,kind:"suelo",capa:D[c.key]?.[0]??0,label:D[c.key]?.[1]??c.key,dist:-3})),z=w.secciones.map(c=>({key:c.key,file:c.file,kind:"arboles",atlas:c.atlas,marco:c.marco,marcoSup:c.marcoSup,label:Io[c.key]??"Vegetación",dist:0})),T=[...p,...C.slice(0,4),...z.slice(0,3),...C.slice(4,9),...z.slice(3),...C.slice(9)],k=To(),U=Ro(),V=Lo(f),le=(async()=>{try{const c=await Yt.fromAssetId(ze.imageryAssetId),i=18,r=c.tilingScheme,h=(X,fe)=>Be.fromCartesian(Le(X,fe,0,n)),s=r.positionToTileXY(h(-1010,930),i),M=r.positionToTileXY(h(1010,-940),i),L=M.x-s.x+1,_=M.y-s.y+1,P=c.tileWidth,S=document.createElement("canvas");S.width=L*P,S.height=_*P;const H=S.getContext("2d"),Z=[];for(let X=s.y;X<=M.y;X++)for(let fe=s.x;fe<=M.x;fe++)Z.push([fe,X]);const ie=async([X,fe])=>{for(let At=0;At<40;At++){const Et=c.requestImage(X,fe,i);if(Et){try{const Ve=await Et,zt=(X-s.x)*P,Pt=(fe-s.y)*P;typeof ImageBitmap<"u"&&Ve instanceof ImageBitmap?(H.save(),H.translate(zt,Pt+P),H.scale(1,-1),H.drawImage(Ve,0,0,P,P),H.restore()):H.drawImage(Ve,zt,Pt,P,P)}catch{}return}await new Promise(Ve=>setTimeout(Ve,120))}};H.fillStyle="#6a6f62",H.fillRect(0,0,S.width,S.height);const I=Array.from({length:6},async()=>{for(;Z.length;)await ie(Z.shift())});await Promise.all(I);const G=document.createElement("canvas");G.width=G.height=4096,G.getContext("2d").drawImage(S,0,0,4096,4096);const O=await new Promise(X=>G.toBlob(X,"image/jpeg",.92));if(!O)return;const q=URL.createObjectURL(O);window.__AERIAL_URL__=q;const Q=r.tileXYToRectangle(s.x,s.y,i),ue=r.tileXYToRectangle(M.x,M.y,i),Me=(X,fe)=>B.multiplyByPoint(l,x.fromRadians(X,fe,ot.height),new x),ke=Me(Q.west,ue.south),Ke=Me(ue.east,Q.north),dt=new He(ke.x,ke.y,Ke.x,Ke.y);for(const X of[k,V])X.setUniform("uAerial",new Ne({url:q,repeat:!1,minificationFilter:rt.LINEAR_MIPMAP_LINEAR,magnificationFilter:st.LINEAR})),X.setUniform("uAerialRect",dt),X.setUniform("uAerialOn",1)}catch(c){console.warn("Foto aérea no disponible",c)}})(),Y=[],$=[];let te=0,Ce=0,oe=.22,ce=.08,ae=1200;const de={total:T.length,loaded:0,failed:[]},Ze=async c=>{try{const i=await je.fromGltfAsync({url:f+c.file,modelMatrix:n,upAxis:me.Y,forwardAxis:me.X,shadows:c.kind==="arboles"?ve.CAST_ONLY:c.kind==="suelo"?ve.RECEIVE_ONLY:ve.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:c.kind!=="arboles"});if(c.kind==="suelo")i.customShader=V;else if(c.kind==="arboles"){const r=Ao(f+c.atlas,c.marco,c.marcoSup);r.setUniform("uNight",te),r.setUniform("uTarde",Ce),r.setUniform("uSkyFill",oe),r.setUniform("uHazeAmount",ce),r.setUniform("uHazeStart",ae),Y.push(r),i.customShader=r}else c.key==="Hotel"?i.customShader=U:c.kind!=="cubierta_pbr"&&(i.customShader=k);i.imageBasedLighting.imageBasedLightingFactor=c.kind==="cubierta_pbr"?new Ee(.85,.55):new Ee(.75,.45),o.primitives.add(i),c.kind==="arboles"&&$.push(i),await new Promise(r=>{if(i.ready)return r();const h=i.readyEvent.addEventListener(()=>{h(),r()});setTimeout(r,2e4)})}catch(i){console.error("Sección no cargada",c.file,i),de.failed.push(c.file)}de.loaded++,e?.(de.loaded,de.total,c.label)},Re=p.length+7;for(let c=0;c<Math.min(Re,T.length);c++)a(T[c].label,.2+.75*c/Re),await Ze(T[c]);const Ue=(async()=>{for(let c=Re;c<T.length;c++)await Ze(T[c]),await new Promise(i=>setTimeout(i,60));await le})();return{matrix:n,inverse:l,tileset:g,buildings:b.edificios,treeCount:w.total,sections:de,done:Ue,setNight(c){u.setUniform("uNight",c),k.setUniform("uNight",c),U.setUniform("uNight",c),te=c,V.setUniform("uNight",c);for(const i of Y)i.setUniform("uNight",c)},setTarde(c){u.setUniform("uTarde",c),k.setUniform("uTarde",c),U.setUniform("uTarde",c),Ce=c,V.setUniform("uTarde",c);for(const i of Y)i.setUniform("uTarde",c)},setTime(c){for(const i of Y)i.setUniform("uTime",c)},setLook(c){if(c.skyFill!==void 0){oe=c.skyFill,k.setUniform("uSkyFill",oe),U.setUniform("uSkyFill",oe);for(const i of Y)i.setUniform("uSkyFill",oe)}if(c.groundFill!==void 0&&V.setUniform("uGroundFill",c.groundFill),c.hazeAmount!==void 0){ce=c.hazeAmount,k.setUniform("uHazeAmount",ce),U.setUniform("uHazeAmount",ce),V.setUniform("uHazeAmount",ce),u.setUniform("uHazeAmount",ce);for(const i of Y)i.setUniform("uHazeAmount",ce)}if(c.hazeStart!==void 0){ae=c.hazeStart,k.setUniform("uHazeStart",ae),U.setUniform("uHazeStart",ae),V.setUniform("uHazeStart",ae),u.setUniform("uHazeStart",ae);for(const i of Y)i.setUniform("uHazeStart",ae)}},setRevitZone(c){k.setUniform("uRevitBox",c?new He(c[0]-1,c[1]-1,c[2]+1,c[3]+1):new He(0,0,0,0))},setHotelFloors(c){k.setUniform("uHotelPisos",c)},setTreesVisible(c){for(const i of $)i.show=c},buildingAt(c){const i=B.multiplyByPoint(l,c,new x);let r=null,h=1.2;for(const s of b.edificios){if(i.x<s.bb[0]-1.5||i.x>s.bb[2]+1.5||i.y<s.bb[1]-1.5||i.y>s.bb[3]+1.5||i.z>s.b+s.h+2.5)continue;if(Fo(i.x,i.y,s.r))return s;const M=_o(i.x,i.y,s.r);M<h&&(h=M,r=s)}return r}}}const No=N.fromCssColorString("#ff2b1a"),Oo=N.fromCssColorString("#ffc400"),Do=N.fromCssColorString("#00e862"),Ie=N.fromCssColorString("#1a1d22");function mt(t){const a=document.createElement("canvas");a.width=128,a.height=128;const e=a.getContext("2d");if(e.clearRect(0,0,128,128),t==="pare"){e.beginPath();for(let o=0;o<8;o++){const n=(o+.5)*Math.PI/4,l=64+Math.cos(n)*58,f=64+Math.sin(n)*58;o===0?e.moveTo(l,f):e.lineTo(l,f)}e.closePath(),e.fillStyle="#c81e1e",e.fill(),e.lineWidth=5,e.strokeStyle="#ffffff",e.stroke(),e.fillStyle="#ffffff",e.font="bold 31px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("PARE",64,66)}else t==="peaton"?(e.beginPath(),e.moveTo(64,6),e.lineTo(122,64),e.lineTo(64,122),e.lineTo(6,64),e.closePath(),e.fillStyle="#f5b800",e.fill(),e.lineWidth=4,e.strokeStyle="#18181b",e.stroke(),e.fillStyle="#18181b",e.beginPath(),e.arc(64,38,7,0,Math.PI*2),e.fill(),e.fillRect(59,47,10,22),e.fillRect(54,69,7,20),e.fillRect(67,69,7,20)):(e.beginPath(),e.arc(64,64,56,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.lineWidth=11,e.strokeStyle="#c81e1e",e.stroke(),e.fillStyle="#111827",e.font="bold 46px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("30",64,67));return a.toDataURL("image/png")}function Uo(t,a,e,o,n){const l=(p,z,T)=>B.multiplyByPoint(a,new x(p,z,T),new x),f=[],d=e+7.2,b=o+7.2,w=n(d,b),y=N.fromCssColorString("#2a303a"),m=N.fromCssColorString("#14171c"),u=N.fromCssColorString("#eab308");f.push(t.entities.add({position:l(d,b,w+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:y}}),t.entities.add({position:l(d,b,w+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:u}}));const g=4.6;f.push(t.entities.add({position:l(d-g*.5,b,w+5.65),box:{dimensions:new x(g,.14,.14),material:y}}),t.entities.add({position:l(d,b-g*.5,w+5.65),box:{dimensions:new x(.14,g,.14),material:y}}));const v=(p,z,T,k)=>{const U=k?.42:.3,V=k?.3:.42;f.push(t.entities.add({position:l(p,z,T),box:{dimensions:new x(U,V,1.18),material:m}}));const le=(oe,ce)=>{const ae=t.entities.add({position:l(p,z,T+oe),box:{dimensions:new x(k?.24:.33,k?.33:.24,.24),material:ce}});return f.push(ae),ae},Y=le(.36,Ie),$=le(0,Ie),te=le(-.36,Ie);return{red:Y,yellow:$,green:te,setState:oe=>{Y.box.material=new We(oe==="red"?No:Ie),$.box.material=new We(oe==="yellow"?Oo:Ie),te.box.material=new We(oe==="green"?Do:Ie)}}},C=v(d-3.4,b,w+5.1,!0),D=v(d,b-3.4,w+5.1,!1);return{ns:C,ew:D,setVisible(p){for(const z of f)z.show=p}}}function Vo(t,a,e,o,n){const l=(p,z,T)=>B.multiplyByPoint(a,new x(p,z,T),new x),f=[],d=Rt.fromColor(N.fromCssColorString("#f3f4f6").withAlpha(.92)),b=Rt.fromColor(N.fromCssColorString("#f5b800").withAlpha(.92)),w=(p,z,T,k,U,V)=>{if(o(p,z)<.8)return;const le=n(p,z)+.07;l(p,z,le);const Y=bt.fromRotationZ(U),$=B.fromRotationTranslation(Y,new x(p,z,le)),te=B.multiply(a,$,new B);f.push(new co({geometry:uo.fromDimensions({dimensions:new x(T,k,.04)}),modelMatrix:te,attributes:{color:V}}))};for(const p of e){const z=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const T of z){const k=p.e+T.de,U=p.n+T.dn;if(o(k,U)<1.2)continue;for(let Y=-3;Y<=3;Y++){const $=T.horiz?k+Y*1.15:k,te=T.horiz?U:U+Y*1.15;w($,te,T.horiz?.52:2.8,T.horiz?2.8:.52,0,d)}const V=k+(T.de===0?0:Math.sign(T.de)*2.1),le=U+(T.dn===0?0:Math.sign(T.dn)*2.1);w(V,le,T.horiz?6.8:.42,T.horiz?.42:6.8,0,d)}}for(let p=-80;p<=440;p+=8)w(-154,p,.18,3.2,0,d),w(-132,p,.18,3.2,0,d);const y=Math.atan2(-51,380);for(let p=-420;p<=160;p+=8){const z=263-(p+420)*.13421052631578947;w(p,z+7.5,3.2,.18,y,d),w(p,z-7.5,3.2,.18,y,d),w(p,z,4.5,.18,y,b)}for(let p=-160;p<=360;p+=8)w(158,p,.18,3.2,0,d);let m=null;f.length>0&&(m=new so({geometryInstances:f,appearance:new ro({flat:!0,translucent:!0}),asynchronous:!1}),t.scene.primitives.add(m));const u=[],g=mt("pare"),v=mt("peaton"),C=mt("vel30"),D=N.fromCssColorString("#9ca3af");return e.forEach((p,z)=>{const T=[{e:p.e-7.2,n:p.n-7.2,tex:g},{e:p.e+7.2,n:p.n-7.2,tex:z%2===0?v:C}];for(const k of T){const U=n(k.e,k.n);u.push(t.entities.add({position:l(k.e,k.n,U+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:D}}),t.entities.add({position:l(k.e,k.n,U+2.45),billboard:{image:k.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:lo.CENTER}}))}}),{setVisible(p){m&&(m.show=p);for(const z of u)z.show=p}}}function Bo(t,a){const e=(C,D,p)=>B.multiplyByPoint(a,new x(C,D,p),new x),o=[],d=N.fromCssColorString("#7a7771"),b=N.fromCssColorString("#3d3833"),w=N.fromCssColorString("#24471b"),y=N.fromCssColorString("#3d7f8f").withAlpha(.88),m=N.fromCssColorString("#ffbe55");o.push(t.entities.add({position:e(-225,263.5,4.17+.32),cylinder:{length:.64,topRadius:3.3,bottomRadius:3.6,material:d,slices:12}}),t.entities.add({position:e(-225,263.5,4.17+.56),cylinder:{length:.24,topRadius:3.45,bottomRadius:3.55,material:w,slices:12}}),t.entities.add({position:e(-225,263.5,4.17+.66),cylinder:{length:.08,topRadius:2.95,bottomRadius:2.95,material:y,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+1.35),cylinder:{length:1.9,topRadius:.34,bottomRadius:.48,material:b}}),t.entities.add({position:e(-225,263.5,4.17+1.35),cylinder:{length:.18,topRadius:1.95,bottomRadius:1.55,material:b,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+2.2),cylinder:{length:.16,topRadius:1.15,bottomRadius:.85,material:b,slices:24}}));let u=0;const g=new We(new It(()=>{const C=.62+.18*Math.sin(u*7);return N.fromCssColorString("#d9f4ff").withAlpha(C)},!1)),v=new We(new It(()=>{const C=.46+.16*Math.cos(u*5.5);return N.fromCssColorString("#bce8f7").withAlpha(C)},!1));o.push(t.entities.add({position:e(-225,263.5,4.17+2.85),cylinder:{length:1.25,topRadius:.08,bottomRadius:.36,material:g,slices:16}}),t.entities.add({position:e(-225,263.5,4.17+1.78),cylinder:{length:.85,topRadius:1.08,bottomRadius:1.22,material:v,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+1.02),cylinder:{length:.72,topRadius:1.88,bottomRadius:2.08,material:v,slices:24}})),o.push(t.entities.add({position:e(-225,272.1,4.17+3.45),box:{dimensions:new x(8.6,2.7,.22),material:N.fromCssColorString("#16191e")}}),t.entities.add({position:e(-225,271.8,4.17+.28),box:{dimensions:new x(8.2,2.8,.56),material:d}}));for(let C=-246;C<=-202;C+=8.5)o.push(t.entities.add({position:e(C,255.8,4.17+1.1),cylinder:{length:2.2,topRadius:.04,bottomRadius:.05,material:b}}),t.entities.add({position:e(C,255.8,4.17+2.3),ellipsoid:{radii:new x(.16,.16,.22),material:m}}));return{update(C){u=C},setVisible(C){for(const D of o)D.show=C}}}const $e=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Nt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],Ot=3.2;async function jo(t,a,e=110){const o=ze.secciones;let n,l,f;try{n=await fetch(o+"vias_campo.json").then(r=>r.json());const i=new Uint8Array(await fetch(o+"vias_campo.bin").then(r=>r.arrayBuffer()));l=i.subarray(0,n.w*n.h),f=i.subarray(n.w*n.h)}catch{return null}const{cell:d,x0:b,y0:w,w:y,h:m}=n,u=(i,r)=>{const h=(i-b)/d-.5,s=(r-w)/d-.5,M=Math.floor(h),L=Math.floor(s);if(M<0||L<0||M>=y-1||L>=m-1)return 0;const _=h-M,P=s-L,S=L*y+M;return((l[S]*(1-_)+l[S+1]*_)*(1-P)+(l[S+y]*(1-_)+l[S+y+1]*_)*P)*.5},g=(i,r)=>{const h=Math.max(0,Math.min(y-1,Math.floor((i-b)/d))),s=Math.max(0,Math.min(m-1,Math.floor((r-w)/d))),M=s*y+h;if(l[M]>0)return f[M]*.1-2;let L=0,_=0;for(let P=-2;P<=2;P++){const S=s+P;if(!(S<0||S>=m))for(let H=-2;H<=2;H++){const Z=h+H;if(Z<0||Z>=y)continue;const ie=S*y+Z;if(l[ie]===0)continue;const I=1/(H*H+P*P+.5);L+=I,_+=(f[ie]*.1-2)*I}}return L>0?_/L:1},v=[],C=[],D=[];for(let i=2;i<m-2;i++)for(let r=2;r<y-2;r++){const h=i*y+r,s=b+(r+.5)*d,M=w+(i+.5)*d,L=Math.hypot(s+180,M-250);if(L>520)continue;const _=l[h]*.5;if(_>=2.6&&_<=5&&v.push(h),_>=6&&L<460&&D.push({e:s,n:M,d:_}),l[h]===0&&L<430){let P=!1;for(let S=-2;S<=2&&!P;S++)for(let H=-2;H<=2;H++)if(l[(i+S)*y+(r+H)]>0){P=!0;break}P&&C.push(h)}}if(!v.length)return null;D.sort((i,r)=>r.d-i.d);const p=[];for(const i of D){if(p.length>=6)break;if(p.some(s=>Math.hypot(s.e-i.e,s.n-i.n)<90))continue;const r=g(i.e,i.n),h=Uo(t,a,i.e,i.n,g);h.ns.setState("green"),h.ew.setState("red"),p.push({e:i.e,n:i.n,u:r,faseOffset:p.length*4.5,rig:h,nsEstado:"green",ewEstado:"red"})}const z=Vo(t,a,p,u,g),T=Bo(t,a),k=(()=>{let i=12345;return()=>(i=i*1664525+1013904223>>>0)/4294967296})(),U=(i,r,h)=>{const s=Math.cos(h),M=Math.sin(h);if(i>=-168&&i<=-118&&Math.abs(M)>.35)return i<-143?M<-.2?12:-1e6:M>.2?12:-1e6;const L=263-(i+420)*(51/380);return Math.abs(r-L)<26&&Math.abs(s)>.35?r>L?s>.2?12:-1e6:s<-.2?12:-1e6:i>=-255&&i<=-210&&r<222&&Math.abs(M)>.35?M<-.2?10:-1e6:r<175&&i<-215&&Math.abs(s)>.35?s>.2?10:-1e6:i<-385&&r<265&&Math.abs(M)>.35?M<-.2?10:-1e6:0},V=[],le=(i,r,h)=>V.some(s=>s!==h&&Math.hypot(s.e-i,s.n-r)<8.5),Y=i=>{for(let r=0;r<45;r++){const h=v[Math.floor(k()*v.length)],s=b+(h%y+.5)*d,M=w+(Math.floor(h/y)+.5)*d;if(le(s,M,i))continue;let L=0,_=-1e9;for(let P=0;P<16;P++){const S=P/16*Math.PI*2,H=s+Math.cos(S)*10,Z=M+Math.sin(S)*10,ie=u(H,Z),I=U(H,Z,S);if(I<-1e4)continue;const G=u(s+Math.sin(S)*2.5,M-Math.cos(S)*2.5),O=u(s-Math.sin(S)*2.5,M+Math.cos(S)*2.5),q=-Math.abs(ie-Ot)+(O>G?1.5:0)+I;ie>1.5&&q>_&&(_=q,L=S)}if(_>-1e8){i.e=s,i.n=M,i.th=L,i.vActual=i.v*.5;return}}};for(let i=0;i<e;i++){const r=k(),h=r<.2?"taxi":r<.48?"suv":"sedan",s={e:0,n:0,th:0,v:6.5+k()*5,vActual:0,model:null,u:0,tipo:h};Y(s),V.push(s)}const $=[];if(C.length>0)for(let i=0;i<42;i++){const r=C[Math.floor(k()*C.length)],h=b+(r%y+.5)*d,s=w+(Math.floor(r/y)+.5)*d;$.push({e:h,n:s,th:k()*Math.PI*2,v:1.15+k()*.45,model:null,u:g(h,s)+.16,conPerro:i%3===0})}const te=[],Ce=(i,r,h,s,M,L,_,P=.68)=>{for(let S=0;S<M;S++){const H=M===1?(i+r)*.5:i+S/(M-1)*(r-i);for(let Z=0;Z<L;Z++){if(k()>P)continue;const ie=L===1?(h+s)*.5:h+Z/(L-1)*(s-h);if(u(H,ie)>.3)continue;const I=k(),G=I<.08?"taxi":I<.42?"suv":"sedan",O=k()<.5?0:Math.PI,q=g(H,ie);te.push({e:H+(k()-.5)*.25,n:ie+(k()-.5)*.25,u:q>-1.5?q:3.55,th:_+O+(k()-.5)*.07,tipo:G,model:null})}}};Ce(92,134,-22,62,4,15,.05,.7),Ce(52,108,114,146,5,4,.12,.62),Ce(58,106,-104,-56,4,6,.1,.65),Ce(-132,-98,-46,32,3,12,.04,.68);const oe=new x,ce=new bt,ae=new B,de=(i,r=.08)=>{i.model&&(x.fromElements(i.e,i.n,i.u+r,oe),bt.fromRotationZ(i.th,ce),B.fromRotationTranslation(ce,oe,ae),i.model.modelMatrix=B.multiply(a,ae,new B))},Ze=(async()=>{for(let i=0;i<V.length;i++){const r=V[i],h=r.tipo==="taxi"?"carro_taxi.glb":r.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const s=await je.fromGltfAsync({url:o+h,upAxis:me.Y,forwardAxis:me.X,shadows:ve.ENABLED,color:r.tipo==="taxi"?N.WHITE:N.fromCssColorString($e[i%$e.length]),colorBlendMode:ut.MIX,colorBlendAmount:r.tipo==="taxi"?0:.28});t.scene.primitives.add(s),r.model=s,r.u=g(r.e,r.n),de(r)}catch{}i%6===5&&await new Promise(s=>setTimeout(s,35))}for(let i=0;i<$.length;i++){const r=$[i];try{const h=await je.fromGltfAsync({url:o+(r.conPerro?"persona_perro.glb":"persona.glb"),upAxis:me.Y,forwardAxis:me.X,shadows:ve.ENABLED,color:N.fromCssColorString(Nt[i%Nt.length]),colorBlendMode:ut.MIX,colorBlendAmount:.25});t.scene.primitives.add(h),r.model=h,de(r,0)}catch{}i%6===5&&await new Promise(h=>setTimeout(h,35))}for(let i=0;i<te.length;i++){const r=te[i],h=r.tipo==="taxi"?"carro_taxi.glb":r.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const s=await je.fromGltfAsync({url:o+h,upAxis:me.Y,forwardAxis:me.X,shadows:ve.ENABLED,color:r.tipo==="taxi"?N.WHITE:N.fromCssColorString($e[i*3%$e.length]),colorBlendMode:ut.MIX,colorBlendAmount:r.tipo==="taxi"?0:.28});t.scene.primitives.add(s),r.model=s,de(r)}catch{}i%8===7&&await new Promise(s=>setTimeout(s,30))}})();let Re=!0,Ue=0;const c=(i,r)=>u(i,r)===0&&u(i+4,r)+u(i-4,r)+u(i,r+4)+u(i,r-4)>.5;return{ready:Ze,count:e,debug:()=>V.map(i=>[Math.round(i.e),Math.round(i.n),+i.u.toFixed(1),i.model?1:0]),setVisible(i){Re=i;for(const r of V)r.model&&(r.model.show=i);for(const r of te)r.model&&(r.model.show=i);for(const r of $)r.model&&(r.model.show=i);for(const r of p)r.rig.setVisible(i);z.setVisible(i),T.setVisible(i)},update(i){if(!Re)return;const r=Math.min(.08,Math.max(.001,i));Ue+=r,T.update(Ue);for(const h of p){const s=(Ue+h.faseOffset)%24,M=s<10?"green":s<12?"yellow":"red",L=s>=12&&s<22?"green":s>=22?"yellow":"red";M!==h.nsEstado&&(h.nsEstado=M,h.rig.ns.setState(M)),L!==h.ewEstado&&(h.ewEstado=L,h.rig.ew.setState(L))}for(let h=0;h<V.length;h++){const s=V[h];if(!s.model)continue;let M=0,L=-1e9;for(let I=-4;I<=4;I++){const G=I*.13,O=s.th+G,q=s.e+Math.cos(O)*9,Q=s.n+Math.sin(O)*9,ue=u(q,Q);if(ue<1.1||u(s.e+Math.cos(O)*4.5,s.n+Math.sin(O)*4.5)<.9)continue;const ke=U(q,Q,O);if(ke<-1e4)continue;const Ke=u(q+Math.sin(O)*2.5,Q-Math.cos(O)*2.5),dt=u(q-Math.sin(O)*2.5,Q+Math.cos(O)*2.5),X=-Math.abs(Math.min(ue,6)-Ot)-Math.abs(G)*1.6+(dt>=Ke?.6:0)+ke;X>L&&(L=X,M=G)}if(L<-1e8||Math.hypot(s.e+180,s.n-250)>580){Y(s),s.u=g(s.e,s.n),de(s);continue}const _=Math.cos(s.th),P=Math.sin(s.th);let S=1;for(let I=0;I<V.length;I++){if(I===h||!V[I].model)continue;const G=V[I],O=G.e-s.e,q=G.n-s.n,Q=O*O+q*q;if(Q>225)continue;const ue=O*_+q*P,Me=Math.abs(-O*P+q*_);if(ue>0&&ue<12.5&&Me<2.35){const ke=ue<6.4?0:(ue-6.4)/6.1;ke<S&&(S=ke)}else Q<22&&I<h&&(S=0)}const H=Math.abs(_)>Math.abs(P);for(const I of p){if((H?I.ewEstado:I.nsEstado)==="green")continue;const O=I.e-s.e,q=I.n-s.n,Q=O*_+q*P,ue=Math.abs(-O*P+q*_);if(Q>7&&Q<21&&ue<9){const Me=Q<10.5?0:(Q-10.5)/10.5;Me<S&&(S=Me)}}const Z=1-Math.min(.55,Math.abs(M)*1.4),ie=s.v*Z*S;if(s.vActual+=(ie-s.vActual)*Math.min(1,r*4.5),s.vActual>.05){s.th+=Math.max(-1.4*r,Math.min(1.4*r,M));const I=s.e+Math.cos(s.th)*s.vActual*r,G=s.n+Math.sin(s.th)*s.vActual*r;u(I,G)>=.7?(s.e=I,s.n=G):s.th+=.6;const O=Math.max(g(s.e,s.n),g(s.e+Math.cos(s.th)*1.4,s.n+Math.sin(s.th)*1.4),g(s.e-Math.cos(s.th)*1.4,s.n-Math.sin(s.th)*1.4));s.u+=(O-s.u)*Math.min(1,r*8)}de(s)}for(const h of $){if(!h.model)continue;const s=h.e+Math.cos(h.th)*h.v*r,M=h.n+Math.sin(h.th)*h.v*r;c(s,M)&&Math.hypot(s+180,M-250)<430?(h.e=s,h.n=M,h.u+=(g(h.e,h.n)+.16-h.u)*Math.min(1,r*4)):h.th+=.9+k()*1.2,de(h,0)}}}}async function Dt(t,a){try{const e=new Image;e.decoding="async",e.src=t,await e.decode();const o=document.createElement("canvas");o.width=e.naturalWidth,o.height=e.naturalHeight;const n=o.getContext("2d");n.drawImage(e,0,0);const l=n.getImageData(0,0,o.width,o.height);return new Ne({typedArray:new Uint8Array(l.data.buffer),width:o.width,height:o.height,repeat:!0,minificationFilter:rt.LINEAR_MIPMAP_LINEAR,magnificationFilter:st.LINEAR})}catch{return new Ne({typedArray:new Uint8Array([...a,255]),width:1,height:1})}}function Wo(t,a){return new De({uniforms:{uNight:{type:E.FLOAT,value:0},uLadrillo:{type:E.SAMPLER_2D,value:t},uTeja:{type:E.SAMPLER_2D,value:a}},varyings:{vRP:re.VEC3,vRN:re.VEC3},vertexShaderText:`
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
    `})}async function qo(t,a){const e=ze.secciones;let o;try{o=await fetch(e+"revit.json").then(u=>u.json())}catch{return null}const[n,l]=await Promise.all([Dt(e+"tex_ladrillo.webp",[107,84,76]),Dt(e+"tex_teja.webp",[90,52,28])]),f=Wo(n,l),d=[];for(const u of o.niveles)try{const g=await je.fromGltfAsync({url:e+u.file,modelMatrix:a,upAxis:me.Y,forwardAxis:me.X,shadows:ve.ENABLED,backFaceCulling:!1,show:!1});g.customShader=f,g.imageBasedLighting.imageBasedLightingFactor=new Ee(.45,.25),t.scene.primitives.add(g),d.push({...u,model:g,off:0,target:0,delay:0,shown:!1})}catch(g){console.warn("Nivel de Revit no cargado",u.file,g)}if(!d.length)return null;const b=46,w=new B,y=u=>{const g=B.fromTranslation(new x(0,0,u.off),w);u.model.modelMatrix=B.multiply(a,g,new B)},m={niveles:d.map(u=>({i:u.i,nombre:u.nombre})),caja:o.caja,ready:!0,visible:!1,abierto:-1,play(){m.visible=!0,m.abierto=-1;const u=performance.now();d.forEach((g,v)=>{g.off=b,g.target=0,g.delay=u+v*620,g.shown=!1,g.model.show=!1,y(g)})},openAt(u){m.visible=!0,m.abierto=u;const g=performance.now();let v=0;for(const C of[...d].reverse())C.i>u&&(C.target=b,C.delay=g+v++*110);for(const C of d)C.i<=u&&(C.target=0,C.delay=g,C.shown||(C.off=b))},full(){m.visible=!0,m.abierto=-1;const u=performance.now();d.forEach((g,v)=>{(g.target!==0||!g.shown)&&(g.target=0,g.delay=u+v*110,g.shown||(g.off=b))})},hide(){m.visible=!1,m.abierto=-1;for(const u of d)u.model.show=!1,u.shown=!1,u.off=0,u.target=0},setNight(u){f.setUniform("uNight",u)},update(u,g){if(m.visible)for(const v of d){if(g<v.delay)continue;v.target===0&&!v.shown&&(v.shown=!0,v.model.show=!0);const C=v.target-v.off;if(Math.abs(C)<.01){v.off!==v.target&&(v.off=v.target,y(v)),v.target!==0&&v.shown&&(v.shown=!1,v.model.show=!1);continue}const D=v.target===0?1-Math.exp(-5.2*u):1-Math.exp(-4*u);v.off+=C*D,y(v)}}};return m}function Yo(t,a){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);const o=document.createElement("aside");o.className="pisos",o.hidden=!0,o.innerHTML="<small>Pisos · modelo Revit</small>";const n=new Map,l=(d,b,w)=>{const y=document.createElement("button");y.innerHTML=`${b}<span>${w}</span>`,y.addEventListener("click",()=>a(d)),n.set(d,y),o.appendChild(y)};l(-1,"Edificio completo","");for(const d of[...t.niveles].reverse())l(d.i,d.nombre.charAt(0)+d.nombre.slice(1).toLowerCase(),`N${d.i+1}`);document.body.appendChild(o);const f=d=>n.forEach((b,w)=>b.classList.toggle("on",w===d));return f(-1),{show:d=>{o.hidden=!d},mark:f}}const Qe={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function pt(t){const a=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(!a)return[1,1,1];const e=parseInt(a[1],16);return[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}const Go=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function Xo(t){const a={dia:{...Qe.dia},tarde:{...Qe.tarde},noche:{...Qe.noche}};let e="dia";const o=document.createElement("button");o.id="btnLookStudio",o.className="look-toggle",o.textContent="⚙ Ajustar luz",o.title="Abrir editor de iluminación y color (L)",document.body.appendChild(o);const n=document.createElement("aside");n.id="lookPanel",n.className="look-panel",n.hidden=!0,n.innerHTML=`
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
  `,document.body.appendChild(n);const l=n.querySelector("#lpBody"),f=new Map;for(const m of Go){const u=document.createElement("section");u.className="lp-sec";const g=document.createElement("h4");g.textContent=m.title,u.appendChild(g);for(const v of m.items){const C=document.createElement("label");C.className="lp-row";const D=document.createElement("span");D.className="lp-lbl",D.textContent=v.label,C.appendChild(D);const p=document.createElement("input");p.type=v.type,v.type==="range"&&(p.min=String(v.min),p.max=String(v.max),p.step=String(v.step));const z=v.type==="range"?document.createElement("span"):void 0;z&&(z.className="lp-val"),p.addEventListener("input",()=>{const k=a[e];if(v.type==="range"){const U=parseFloat(p.value);k[v.key]=U,z&&(z.textContent=v.step&&v.step>=1?String(Math.round(U)):U.toFixed(2))}else k[v.key]=p.value;t(e,k)});const T=document.createElement("div");T.className="lp-ctrl",T.appendChild(p),z&&T.appendChild(z),C.appendChild(T),u.appendChild(C),f.set(v.key,{input:p,val:z})}l.appendChild(u)}const d={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function b(){const m=a[e],u=n.querySelector("#lpPresetName");u&&(u.textContent=d[e]);for(const[g,{input:v,val:C}]of f){const D=m[g];if(v.value=String(D),C&&typeof D=="number"){const p=parseFloat(v.step||"0.01");C.textContent=p>=1?String(Math.round(D)):D.toFixed(2)}}}const w=()=>{n.hidden=!n.hidden,o.classList.toggle("on",!n.hidden)};o.addEventListener("click",w),n.querySelector("#lpClose")?.addEventListener("click",w);const y=n.querySelector("#lpCopy");return y.addEventListener("click",async()=>{const m=JSON.stringify({active:e,presets:a},null,2);try{await navigator.clipboard.writeText(m),y.textContent="¡JSON copiado!",setTimeout(()=>y.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",m)}}),n.querySelector("#lpReset")?.addEventListener("click",()=>{a[e]={...Qe[e]},b(),t(e,a[e])}),addEventListener("keydown",m=>{m.code==="KeyL"&&!m.ctrlKey&&!m.metaKey&&!m.altKey&&w()}),b(),{setActivePreset(m){e=m,b()},getPreset(m){return a[m]},toggle:w}}yo.defaultAccessToken=ze.ionToken;const W=t=>document.getElementById(t),kt=W("cesiumContainer"),Ut=W("loading"),Jo=W("loadBar"),Jt=W("loadLabel"),Zo=W("loadPct");function Fe(t,a){Jt.textContent=t;const e=Math.round(Math.max(0,Math.min(1,a))*100);Jo.style.width=e+"%",Zo.textContent=e+"%"}const J=new fo(kt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:ve.RECEIVE_ONLY,terrain:mo.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:ho.fromProviderAsync(Yt.fromAssetId(ze.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),R=J.scene;R.globe.enableLighting=!0;R.globe.showGroundAtmosphere=!0;R.globe.depthTestAgainstTerrain=!0;R.globe.maximumScreenSpaceError=2;R.fog.enabled=!1;R.fog.density=18e-5;R.fog.minimumBrightness=.04;R.highDynamicRange=!0;R.msaaSamples=4;R.postProcessStages.fxaa.enabled=!0;R.screenSpaceCameraController.enableCollisionDetection=!1;R.light=new po({intensity:3,color:N.fromCssColorString("#fff4e3")});const xe=J.shadowMap;xe.softShadows=!0;xe.size=4096;xe.maximumDistance=1200;xe.darkness=.24;xe.normalOffset=!0;{const t=xe;t._primitiveBias.depthBias=8e-4,t._primitiveBias.normalOffsetScale=1.6,t._primitiveBias.normalShadingSmooth=.35}const Ae=R.postProcessStages.ambientOcclusion;Ae.enabled=!0;Ae.uniforms.intensity=2.1;Ae.uniforms.bias=.08;Ae.uniforms.lengthCap=.35;Ae.uniforms.stepSize=1.4;Ae.uniforms.blurStepSize=1;const be=R.postProcessStages.bloom;be.enabled=!0;be.uniforms.glowOnly=!1;be.uniforms.contrast=128;be.uniforms.brightness=-.36;be.uniforms.delta=1;be.uniforms.sigma=2.6;be.uniforms.stepSize=1.5;const Ko=Mt(),gt=t=>{const a=B.getColumn(Ko,t,new He);return new x(a.x,a.y,a.z)},ye=zo(gt(0),gt(1),gt(2));R.postProcessStages.add(ye);const ge=Po();R.postProcessStages.add(ge);J.camera.frustum.fov=Wt.toRadians(48);const Vt=(()=>{try{const t=R.context._gl,a=t.getExtension("WEBGL_debug_renderer_info");return a?String(t.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),$o=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Vt)&&!/Arc/i.test(Vt);let A=null,ee=$o||matchMedia("(pointer: coarse)").matches?.5:1;function Xe(){const t=Math.min(window.devicePixelRatio||1,2);J.resolutionScale=t*(ee>=1?1:ee>=.5?.8:.62),xe.size=ee>=1?4096:ee>=.5?2048:1024,xe.softShadows=ee>=.5,Ae.enabled=ee>=1,be.enabled=ee>=.5,R.msaaSamples=ee>=1?4:1,J.shadows=ee>=.5,A?.tileset&&(A.tileset.maximumScreenSpaceError=ee>=1?8:ee>=.5?12:20)}Xe();J.clock.shouldAnimate=!1;J.clock.currentTime=Ye.fromIso8601("2026-06-21T16:50:00-05:00");const j=new ko(J),lt=t=>Le(ht[t].e,ht[t].n,ht[t].u),Qo=lt("hotel");j.flyTo({pivot:Qo,heading:at.general.heading,pitch:at.general.pitch,range:at.general.range*1.8},0);j.groundHeight=t=>R.globe.getHeight(t);const ea=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let pe=.04,Te=1,Se=null;const ta=t=>Ye.toDate(Ye.fromIso8601(t)).getTime();function ct(t){R.light.intensity=t.sunIntensity,R.light.color=N.fromCssColorString(t.sunColor),xe.darkness=t.shadowDarkness,Ae.uniforms.intensity=t.aoIntensity,be.uniforms.brightness=t.bloomBrightness,ge.uniforms.uExposure=t.exposure,ge.uniforms.uContrast=t.contrast,ge.uniforms.uSaturation=t.saturation;const[a,e,o]=pt(t.tintColor);ge.uniforms.uTint=new x(a,e,o),ge.uniforms.uVignette=t.vignette;const[n,l,f]=pt(t.skyZenith);ye.uniforms.uSkyZenith=new x(n,l,f);const[d,b,w]=pt(t.skyHorizon);ye.uniforms.uSkyHorizon=new x(d,b,w),ye.uniforms.uCloudDensity=t.cloudDensity,ye.uniforms.uCloudSpeed=t.cloudSpeed,A?.setLook({skyFill:t.skyFill,groundFill:t.groundFill,hazeAmount:t.hazeAmount,hazeStart:t.hazeStart})}const nt=Xo((t,a)=>ct(a));ct(nt.getPreset("dia"));ye.uniforms.uNight=pe;ye.uniforms.uTarde=Te;ge.uniforms.uNight=pe;ge.uniforms.uTarde=Te;R.skyAtmosphere&&(R.skyAtmosphere.hueShift=0,R.skyAtmosphere.saturationShift=.08,R.skyAtmosphere.brightnessShift=-.04);function oa(t){Se={from:Ye.toDate(J.clock.currentTime).getTime(),to:ta(t.iso),start:performance.now(),dur:1600},R.fog.density=t.fog,nt.setActivePreset(t.id),ct(nt.getPreset(t.id)),R.skyAtmosphere&&(R.skyAtmosphere.hueShift=0,R.skyAtmosphere.saturationShift=t.id==="tarde"?.08:t.id==="noche"?-.25:.06,R.skyAtmosphere.brightnessShift=t.id==="noche"?-.55:t.id==="tarde"?-.04:0);const e=pe,o=Te,n=performance.now(),l=()=>{const d=Math.min(1,(performance.now()-n)/1400),b=d*d*(3-2*d);pe=e+(t.night-e)*b,Te=o+(t.tarde-o)*b,A?.setNight(pe),K?.setNight(pe),A?.setTarde(Te),ye.uniforms.uNight=pe,ye.uniforms.uTarde=Te,ge.uniforms.uNight=pe,ge.uniforms.uTarde=Te,d<1&&requestAnimationFrame(l)};requestAnimationFrame(l),document.querySelectorAll("[data-light]").forEach(d=>d.classList.toggle("on",d.dataset.light===t.id));const f=W("clockLabel");f&&(f.textContent=t.label)}document.querySelectorAll("[data-light]").forEach(t=>{t.addEventListener("click",()=>{const a=ea.find(e=>e.id===t.dataset.light);a&&oa(a)})});let _e=!1;const wt=W("btnOrbit"),St=W("btnPedestrian");function we(){_e=!1,wt?.classList.remove("on")}function Je(t,a=2){we();const e=at[t];j.flyTo({pivot:lt(e.place),heading:e.heading,pitch:e.pitch,range:e.range},a)}W("btnHome")?.addEventListener("click",()=>Je("general",2.2));W("btnAerial")?.addEventListener("click",()=>Je("aerial"));W("btnArch")?.addEventListener("click",()=>Je("arch"));St?.addEventListener("click",()=>{we(),j.isWalking?j.exitWalk():j.enterWalk(se?Kt(se):void 0)});j.onModeChange=t=>{St?.classList.toggle("on",t);const a=W("hint");a&&t&&(a.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",a.classList.remove("fade"),setTimeout(()=>a.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(t=>{t.addEventListener("click",()=>{we();const a=t.dataset.place;if(a==="hotel"&&A){const e=A.buildings.find(o=>o.s==="Hotel");if(e){Oe(null),Oe(e);return}}j.flyTo({pivot:lt(a),range:a==="hotel"?300:520,pitch:-.5},2)})});wt?.addEventListener("click",()=>{_e=!_e,wt.classList.toggle("on",_e),_e&&j.isWalking&&j.exitWalk()});kt.addEventListener("pointerdown",we);kt.addEventListener("wheel",we,{passive:!0});addEventListener("keydown",t=>{t.code==="Escape"&&(j.isWalking?j.exitWalk():Oe(null)),(t.code==="KeyH"||t.code==="Home")&&Je("general",2.2),t.code==="KeyP"&&St?.click()});let se=null,qe=null;const aa=9;let it=null,K=null,Pe=null,Ct=!1,et=null;function ia(){return et||(et=(async()=>{A&&(K=await qo(J,A.matrix),K&&(K.setNight(pe),Pe=Yo(K,t=>{if(!K)return;we(),Pe?.mark(t),t<0?K.full():K.openAt(t);const a=K.caja;j.flyTo({pivot:Le((a[0]+a[2])/2,(a[1]+a[3])/2,12),pitch:t<0?-.42:-.95,range:t<0?230:150},1.4)}),Ct&&(Ct=!1,A.setHotelFloors(99),Tt(),he&&(J.entities.remove(he),he=null))))})(),et)}function Tt(){!A||!K||(A.setRevitZone(K.caja),K.play(),Pe?.mark(-1),Pe?.show(!0))}function Zt(){A&&(it={start:performance.now()},A.setHotelFloors(0))}let he=null;const tt=W("card");function na(t){return Le((t.bb[0]+t.bb[2])/2,(t.bb[1]+t.bb[3])/2,t.b+t.h*.5)}function Kt(t){return Le((t.bb[0]+t.bb[2])/2,t.bb[1]-9,t.b)}function Oe(t){const a=se?.s==="Hotel";if(se=t,he&&(J.entities.remove(he),he=null),!t||!A){tt&&(tt.hidden=!0),Pe?.show(!1);return}t.s!=="Hotel"?Pe?.show(!1):K?.visible&&Pe?.show(!0);const e=t.r.map(([m,u])=>Le(m,u,0,A.matrix)),o=2572+t.b-.5;he=J.entities.add({polygon:{hierarchy:new vo(e),height:o,extrudedHeight:o+t.h+2.2,material:N.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:N.fromCssColorString("#d7ebff"),shadows:ve.DISABLED}});const n=t.s==="Hotel";n&&!a&&(K?(Tt(),he&&(J.entities.remove(he),he=null)):(Ct=!0,ia(),Zt()),we(),j.flyTo({pivot:lt("hotel"),pitch:-.38,range:290},1.8));const l=n&&A?A.buildings.filter(m=>m.s==="Hotel"):[t],f=m=>Math.abs(m.r.reduce((u,g,v)=>{const C=m.r[(v+1)%m.r.length];return u+g[0]*C[1]-C[0]*g[1]},0)/2),d=l.reduce((m,u)=>m+f(u),0),b=l.reduce((m,u)=>m+f(u)*u.p,0),w=Math.max(...l.map(m=>m.p)),y=Math.max(...l.map(m=>m.h));Math.abs(t.r.reduce((m,u,g)=>{const v=t.r[(g+1)%t.r.length];return m+u[0]*v[1]-v[0]*u[1]},0)/2),W("cardKind").textContent=n?"Proyecto":`Sector ${t.s}`,W("cardTitle").textContent=n?"Hotel La Fontana":`Edificación ${t.id+1}`,W("cardData").innerHTML=`<dt>Pisos</dt><dd>${n?"hasta "+w:t.p}</dd><dt>Altura</dt><dd>${y.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(d).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(b).toLocaleString("es-CO")} m²</dd>`,tt&&(tt.hidden=!1)}j.onPick=t=>{A&&Oe(t?A.buildingAt(t):null)};W("cardClose")?.addEventListener("click",()=>Oe(null));W("cardFocus")?.addEventListener("click",()=>{if(!se)return;we();const t=Math.max(se.bb[2]-se.bb[0],se.bb[3]-se.bb[1],se.h);j.flyTo({pivot:na(se),pitch:-.42,range:Math.max(60,t*2.1)},1.7)});W("cardWalk")?.addEventListener("click",()=>{se&&(we(),j.enterWalk(Kt(se)))});const vt=W("status"),Bt=W("statusText");async function sa(){const t=performance.now()+25e3;let a=0;for(;performance.now()<t;){const e=R.globe.tilesLoaded,o=!A?.tileset||A.tileset.tilesLoaded;if(e&&o){if(a||(a=performance.now()),performance.now()-a>=600)break}else a=0;await new Promise(n=>setTimeout(n,150))}for(let e=0;e<8;e++)await new Promise(o=>requestAnimationFrame(o))}async function ra(){Fe("Cargando el modelo del hotel...",.05),await new Promise(e=>setTimeout(e,30)),A=await Ho(J,(e,o)=>Fe(e,.05+o*.2),(e,o,n)=>{Fe(`Cargando secciones (${e}/${o}) · ${n}`,.25+e/Math.max(1,o)*.45),!(!vt||!Bt)&&(vt.hidden=!1,Bt.textContent=e<o?`Cargando secciones ${e}/${o} · ${n}`:`Modelo completo · ${o} secciones`,e>=o&&setTimeout(()=>vt.classList.add("fade"),2600))}),A.setNight(pe),A.setTarde(Te);const t=document.querySelector("[data-light].on")?.dataset.light||"dia";ct(nt.getPreset(t)),Xe(),Je("general",0),await A.done,Fe("Cargando tráfico y parqueaderos...",.78),qe=await jo(J,A.matrix),qe&&await qe.ready,window.__ALL__=!0,Fe("Renderizando texturas y 3D Tiles...",.9),await sa(),Fe("Listo",1),Ut.classList.add("done"),setTimeout(()=>Ut.remove(),900);const a=W("hint");a&&setTimeout(()=>a.classList.add("fade"),9e3),window.__READY__=!0}const ne={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:go,viewer:J,cam:j,getSite:()=>A,enuToWorld:Le,select:Oe,stats:ne,playHotel:Zt,playRevit:Tt,getRevit:()=>K,getTrafico:()=>qe,setQuality:t=>{ee=t,Xe()}};ra().catch(t=>{console.error(t),Jt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(t?.message??t)});let jt=performance.now(),yt=0;function $t(){const t=performance.now(),a=Math.min(.1,(t-jt)/1e3);if(jt=t,Se){const o=Math.min(1,(t-Se.start)/Se.dur),n=o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2;J.clock.currentTime=Ye.fromDate(new Date(Se.from+(Se.to-Se.from)*n)),o>=1&&(Se=null)}if(it&&A){const o=(t-it.start)/550,n=Math.floor(o),l=o-n,f=1-Math.pow(1-Math.min(1,l*1.6),3);n>=aa?(A.setHotelFloors(99),it=null):A.setHotelFloors(n+f)}K?.update(a,t),qe?.update(a);const e=t*.001;if(A?.setTime(e),ye.uniforms.uTime=e,_e&&!j.isWalking&&j.flyTo({heading:j.state.heading+.16*a},0),j.update(a),ne.frames++,t-ne.t0>=2e3){ne.fps=Math.round(ne.frames*1e3/(t-ne.t0)),ne.frames=0,ne.t0=t,window.__FPS__=ne.fps;const o=!!A&&A.sections.loaded>=A.sections.total&&t-yt>8e3;A&&A.sections.loaded>=A.sections.total&&!yt&&(yt=t),o&&document.visibilityState==="visible"&&(ne.fps<20&&ee>.25&&!window.__DBG__.lock?++ne.low>=3&&(ee=ee>=1?.5:.25,ne.low=0,Xe()):ne.low=0)}requestAnimationFrame($t)}requestAnimationFrame($t);addEventListener("resize",Xe);
