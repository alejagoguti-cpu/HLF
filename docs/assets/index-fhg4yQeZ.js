var Jt=Object.defineProperty;var $t=(t,a,e)=>a in t?Jt(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e;var F=(t,a,e)=>$t(t,typeof a!="symbol"?a+"":a,e);import{C as x,a as Vt,T as yt,M as D,b as Ae,c as De,H as Qt,P as jt,d as je,L as eo,U as P,V as ce,e as Fe,f as He,g as at,h as it,i as Lt,j as to,S as pe,I as Wt,k as oo,R as ao,l as Ue,A as he,m as G,n as Pt,o as io,p as no,q as so,r as xt,G as ro,B as lo,s as ct,t as dt,u as co,v as uo,w as ho,x as fo,J as Ve,y as mo,z as po,D as go}from"./cesium-DZJXw6zM.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function e(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(n){if(n.ep)return;n.ep=!0;const l=e(n);fetch(n.href,l)}})();const ut="/HLF/",vo=ut.endsWith("/")?ut:ut+"/",yo=vo+"cesium/";window.CESIUM_BASE_URL=yo;const Qe={longitude:-74.04145021,latitude:4.70207636,height:2572},ht={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},et={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Ee={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},xo=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,It=-1.5533,Rt=-.012,bo=4200,wo=6,_t=1.7;class Co{constructor(a){F(this,"viewer");F(this,"canvas");F(this,"pivot",new x);F(this,"heading",.5);F(this,"pitch",-.6);F(this,"range",1200);F(this,"targetPivot",new x);F(this,"targetHeading",.5);F(this,"targetPitch",-.6);F(this,"targetRange",1200);F(this,"damping",9);F(this,"drag",null);F(this,"pointers",new Map);F(this,"pinch",null);F(this,"lastTap",0);F(this,"keys",new Set);F(this,"tween",null);F(this,"fov",Vt.toRadians(48));F(this,"walking",!1);F(this,"eye",new x);F(this,"eyeTarget",new x);F(this,"wHeading",0);F(this,"wPitch",0);F(this,"wHeadingT",0);F(this,"wPitchT",0);F(this,"onPick",null);F(this,"onModeChange",null);F(this,"groundHeight",null);this.viewer=a,this.canvas=a.scene.canvas,a.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:x.clone(this.targetPivot)}}setPivot(a,e=!0){if(e){const o=x.clone(this.viewer.camera.positionWC),n=x.subtract(o,a,new x),l=x.magnitude(n),u=yt.eastNorthUpToFixedFrame(a),d=D.inverseTransformation(u,new D),b=D.multiplyByPointAsVector(d,n,new x);if(l>1){const w=-Math.asin(Math.max(-1,Math.min(1,b.z/l)));if(w<Rt&&w>It){let y=Math.atan2(-b.x,-b.y);for(;y-this.heading>Math.PI;)y-=Math.PI*2;for(;y-this.heading<-Math.PI;)y+=Math.PI*2;this.heading=this.targetHeading=y,this.pitch=this.targetPitch=w,this.range=this.targetRange=this.clamp(l),x.clone(a,this.pivot)}}}this.targetPivot=x.clone(a),this.tween=null}bind(){const a=this.canvas;a.style.touchAction="none",a.addEventListener("pointerdown",o=>{if(a.setPointerCapture(o.pointerId),this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2){const[n,l]=[...this.pointers.values()];this.pinch={distance:Math.hypot(n.x-l.x,n.y-l.y),range:this.targetRange,cx:(n.x+l.x)/2,cy:(n.y+l.y)/2},this.drag=null;return}o.button===2||o.button===1||o.shiftKey?this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"pan",moved:!1}:o.button===0&&(this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"orbit",moved:!1}),this.tween=null}),a.addEventListener("pointermove",o=>{if(!this.pointers.has(o.pointerId))return;if(this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2&&this.pinch){const[u,d]=[...this.pointers.values()],b=Math.hypot(u.x-d.x,u.y-d.y),w=(u.x+d.x)/2,y=(u.y+d.y)/2;this.walking?this.walk((this.pinch.cy-y)*.06,0):(b>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/b)),this.pan(this.pinch.cx-w,y-this.pinch.cy)),this.pinch.cx=w,this.pinch.cy=y;return}if(!this.drag||o.pointerId!==this.drag.id)return;const n=o.offsetX-this.drag.x,l=o.offsetY-this.drag.y;this.drag.x=o.offsetX,this.drag.y=o.offsetY,Math.abs(n)+Math.abs(l)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=n*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+l*.0028))):this.walk(l*.05,-n*.05):this.drag.mode==="orbit"?(this.targetHeading-=n*.0042,this.targetPitch=this.clampPitch(this.targetPitch-l*.0034)):this.pan(-n,l)});const e=o=>{if(this.pointers.delete(o.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&o.pointerId===this.drag.id){const n=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,n&&o.type==="pointerup"){const l=new Ae(o.offsetX,o.offsetY),u=performance.now();if(o.pointerType!=="mouse"&&u-this.lastTap<320){this.lastTap=0,this.focusAt(l);return}this.lastTap=u;const d=this.pickWorld(l);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};a.addEventListener("pointerup",e),a.addEventListener("pointercancel",e),a.addEventListener("contextmenu",o=>o.preventDefault()),a.addEventListener("wheel",o=>{o.preventDefault(),this.tween=null;const n=o.deltaMode===1?16:o.deltaMode===2?100:1,l=o.deltaY*n;if(this.walking){this.walk(-l*.02,0);return}const u=Math.exp(Math.max(-.45,Math.min(.45,l*.0016))),d=this.pickWorld(new Ae(o.offsetX,o.offsetY)),b=this.clamp(this.targetRange*u);if(d&&u<1){const w=Math.min(.45,(this.targetRange-b)/this.targetRange)*.8,y=x.subtract(d,this.targetPivot,new x),m=x.magnitude(y);if(m>1){const h=Math.min(m,this.targetRange)*w/m;x.add(this.targetPivot,x.multiplyByScalar(y,h,y),this.targetPivot)}}this.targetRange=b},{passive:!1}),a.addEventListener("dblclick",o=>{o.preventDefault(),this.focusAt(new Ae(o.offsetX,o.offsetY))}),addEventListener("keydown",o=>{o.target instanceof HTMLInputElement||(this.keys.add(o.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(o.code)&&o.preventDefault())}),addEventListener("keyup",o=>this.keys.delete(o.code)),addEventListener("blur",()=>this.keys.clear())}clamp(a,e=wo,o=bo){return Math.max(e,Math.min(o,a))}clampPitch(a){return Math.max(It,Math.min(Rt,a))}moveHorizontal(a,e,o,n){const l=yt.eastNorthUpToFixedFrame(a),u=new x(Math.sin(e)*o+Math.cos(e)*n,Math.cos(e)*o-Math.sin(e)*n,0);D.multiplyByPoint(l,u,a)}pan(a,e){const o=this.canvas.clientHeight||1,n=2*this.range*Math.tan(this.fov/2)/o,l=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,e*n/l,a*n),this.tween=null}walk(a,e){this.moveHorizontal(this.eyeTarget,this.wHeading,a,e),this.snapEye()}snapEye(){const a=De.fromCartesian(this.eyeTarget),e=this.groundHeight?.(a);e!==void 0&&Number.isFinite(e)&&(a.height=e+_t,De.toCartesian(a,void 0,this.eyeTarget))}pickWorld(a){const e=this.viewer.scene;let o;if(e.pickPositionSupported&&e.pick(a,4,4)&&(o=e.pickPosition(a)),!o){const n=e.camera.getPickRay(a);n&&(o=e.globe.pick(n,e)??void 0)}return o??null}focusAt(a){const e=this.pickWorld(a);if(e){if(this.walking){x.clone(e,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:e,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(a,e=2){this.walking&&this.exitWalk(!1);const o={pivot:a.pivot??x.clone(this.targetPivot),heading:a.heading??this.targetHeading,pitch:a.pitch??this.targetPitch,range:a.range??this.targetRange};let n=o.heading;for(;n-this.targetHeading>Math.PI;)n-=Math.PI*2;for(;n-this.targetHeading<-Math.PI;)n+=Math.PI*2;if(o.heading=n,e<=.02){this.tween=null,this.targetPivot=x.clone(o.pivot),this.pivot=x.clone(o.pivot),this.heading=this.targetHeading=o.heading,this.pitch=this.targetPitch=o.pitch,this.range=this.targetRange=o.range;return}this.tween={from:{pivot:x.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:o,start:performance.now(),duration:e*1e3}}enterWalk(a){x.clone(a??this.targetPivot,this.eyeTarget),this.snapEye(),x.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(a=!0){if(!this.walking)return;this.walking=!1;const e=De.fromCartesian(this.eyeTarget);e.height-=_t-1;const o=De.toCartesian(e);this.pivot=x.clone(o),this.targetPivot=o,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,a?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(a){if(!this.keys.size)return;const e=this.keys,o=e.has("ShiftLeft")||e.has("ShiftRight")?3:1;let n=0,l=0;(e.has("KeyW")||e.has("ArrowUp"))&&(n+=1),(e.has("KeyS")||e.has("ArrowDown"))&&(n-=1),(e.has("KeyD")||e.has("ArrowRight"))&&(l+=1),(e.has("KeyA")||e.has("ArrowLeft"))&&(l-=1);let u=0;if(e.has("KeyQ")&&(u+=1),e.has("KeyE")&&(u-=1),this.walking){u&&(this.wHeadingT-=u*1.2*a),(n||l)&&this.walk(n*4.2*o*a,l*3.4*o*a);return}if(u&&(this.targetHeading+=u*.9*a,this.tween=null),(e.has("PageUp")||e.has("Equal")||e.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*a))),(e.has("PageDown")||e.has("Minus")||e.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*a))),e.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*a)),e.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*a)),!n&&!l)return;const d=Math.max(8,this.range*.6)*o*a;this.moveHorizontal(this.targetPivot,this.heading,n*d,l*d),this.tween=null}update(a){this.updateKeys(a);const e=1-Math.exp(-this.damping*a);if(this.walking){x.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*a),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*e,this.wPitch+=(this.wPitchT-this.wPitch)*e,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const o=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),n=xo(o),{from:l,to:u}=this.tween;x.lerp(l.pivot,u.pivot,n,this.targetPivot),this.targetHeading=l.heading+(u.heading-l.heading)*n,this.targetPitch=l.pitch+(u.pitch-l.pitch)*n,this.targetRange=Math.exp(Math.log(l.range)+(Math.log(u.range)-Math.log(l.range))*n),o>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*e,this.pitch+=(this.targetPitch-this.pitch)*e,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*e),x.lerp(this.pivot,this.targetPivot,e,this.pivot),this.viewer.camera.lookAt(this.pivot,new Qt(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(D.IDENTITY)}}function Mo(){return new He({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const qt=()=>({uAerial:{type:P.SAMPLER_2D,value:Mo()},uAerialRect:{type:P.VEC4,value:new Fe(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:P.FLOAT,value:0}}),Yt=`
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
`;function ko(){return new je({uniforms:{uNight:{type:P.FLOAT,value:0},uTarde:{type:P.FLOAT,value:0},uSkyFill:{type:P.FLOAT,value:.24},uHazeAmount:{type:P.FLOAT,value:.08},uHazeStart:{type:P.FLOAT,value:1200},uHotelPisos:{type:P.FLOAT,value:99},uRevitBox:{type:P.VEC4,value:new Fe(0,0,0,0)},uLean:{type:P.VEC2,value:new Ae(0,0)},...qt()},varyings:{vPosM:ce.VEC3,vUpEC:ce.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:nt+Yt+`
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
    `})}function So(t,a,e){return new je({uniforms:{uNight:{type:P.FLOAT,value:0},uTarde:{type:P.FLOAT,value:0},uSkyFill:{type:P.FLOAT,value:.22},uHazeAmount:{type:P.FLOAT,value:.08},uHazeStart:{type:P.FLOAT,value:1200},uTime:{type:P.FLOAT,value:0},uFrame:{type:P.FLOAT,value:a},uTop:{type:P.FLOAT,value:e},uAtlas:{type:P.SAMPLER_2D,value:new He({url:t,repeat:!1,minificationFilter:it.LINEAR_MIPMAP_LINEAR,magnificationFilter:at.LINEAR})}},varyings:{vUV:ce.VEC2,vView:ce.VEC3,vRightT:ce.VEC2,vUpT:ce.VEC2,vUpEC:ce.VEC3},vertexShaderText:`
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
    `})}function To(){return new je({uniforms:{uNight:{type:P.FLOAT,value:0},uTarde:{type:P.FLOAT,value:0},uHazeAmount:{type:P.FLOAT,value:.08},uHazeStart:{type:P.FLOAT,value:1200}},lightingModel:eo.UNLIT,fragmentShaderText:nt+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function Ao(t,a,e){return new jt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:t,uNorth:a,uUp:e,uSkyZenith:new x(.16,.42,.82),uSkyHorizon:new x(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function Eo(){return new jt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new x(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function zo(t){const a=e=>({type:P.SAMPLER_2D,value:new He({url:t+e,repeat:!0,minificationFilter:it.LINEAR_MIPMAP_LINEAR,magnificationFilter:at.LINEAR})});return new je({uniforms:{uNight:{type:P.FLOAT,value:0},uTarde:{type:P.FLOAT,value:0},uGroundFill:{type:P.FLOAT,value:.12},uHazeAmount:{type:P.FLOAT,value:.08},uHazeStart:{type:P.FLOAT,value:1200},uAsfalto:a("tex_asfalto.webp"),uAnden:a("tex_anden.webp"),uPrado:a("tex_prado.webp"),uCiclo:a("tex_ciclo.webp"),...qt()},varyings:{vG:ce.VEC3,vUpEC:ce.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:nt+Yt+`
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
    `})}function Ct(){return yt.eastNorthUpToFixedFrame(x.fromDegrees(Qe.longitude,Qe.latitude,Qe.height))}function Le(t,a,e,o=Ct()){return D.multiplyByPoint(o,new x(t,a,e),new x)}const Lo={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function Po(t,a,e){let o=!1;for(let n=0,l=e.length-1;n<e.length;l=n++){const[u,d]=e[n],[b,w]=e[l];d>a!=w>a&&t<(b-u)*(a-d)/(w-d)+u&&(o=!o)}return o}function Io(t,a,e){let o=1/0;for(let n=0,l=e.length-1;n<e.length;l=n++){const[u,d]=e[l],[b,w]=e[n],y=b-u,m=w-d,h=Math.max(0,Math.min(1,((t-u)*y+(a-d)*m)/(y*y+m*m||1)));o=Math.min(o,Math.hypot(t-u-h*y,a-d-h*m))}return o}async function Ro(t,a,e){const o=t.scene,n=Ct(),l=D.inverseTransformation(n,new D),u=Ee.secciones;a("Contexto urbano",.08);const[d,b,w,y]=await Promise.all([fetch(u+"recorte.json").then(c=>c.json()),fetch(u+"edificios.json").then(c=>c.json()),fetch(u+"arboles.json").then(c=>c.json()),fetch(u+"suelo.json").then(c=>c.json())]),m=()=>d.clips.map(c=>{const i=new oo({positions:x.fromDegreesArray(c.flat())}),r=i.computeRectangle();return i.computeRectangle=f=>ao.clone(r,f),i});o.globe.clippingPolygons=new Lt({polygons:m()});const h=To();let g=null;try{g=await to.fromUrl(Ee.googleTiles,{maximumScreenSpaceError:10,shadows:pe.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),g.clippingPolygons=new Lt({polygons:m()}),g.customShader=h,o.primitives.add(g)}catch(c){console.warn("Tiles de Google no disponibles",c)}const v=[-236,330],k=[];for(const c of b.secciones)k.push({key:c.key,file:c.file,kind:"edificios",label:c.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${c.key}`,dist:c.key==="Hotel"?-2:Math.hypot(c.c[0]-v[0],c.c[1]-v[1])});k.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),k.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),k.sort((c,i)=>c.dist-i.dist);const V={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},p=y.secciones.map(c=>({key:c.key,file:c.file,kind:"suelo",capa:V[c.key]?.[0]??0,label:V[c.key]?.[1]??c.key,dist:-3})),A=w.secciones.map(c=>({key:c.key,file:c.file,kind:"arboles",atlas:c.atlas,marco:c.marco,marcoSup:c.marcoSup,label:Lo[c.key]??"Vegetación",dist:0})),M=[...p,...k.slice(0,4),...A.slice(0,3),...k.slice(4,9),...A.slice(3),...k.slice(9)],E=ko(),z=zo(u),ve=(async()=>{try{const c=await Wt.fromAssetId(Ee.imageryAssetId),i=18,r=c.tilingScheme,f=(Y,de)=>De.fromCartesian(Le(Y,de,0,n)),s=r.positionToTileXY(f(-1010,930),i),C=r.positionToTileXY(f(1010,-940),i),I=C.x-s.x+1,H=C.y-s.y+1,L=c.tileWidth,S=document.createElement("canvas");S.width=I*L,S.height=H*L;const N=S.getContext("2d"),K=[];for(let Y=s.y;Y<=C.y;Y++)for(let de=s.x;de<=C.x;de++)K.push([de,Y]);const ie=async([Y,de])=>{for(let Tt=0;Tt<40;Tt++){const At=c.requestImage(Y,de,i);if(At){try{const Oe=await At,Et=(Y-s.x)*L,zt=(de-s.y)*L;typeof ImageBitmap<"u"&&Oe instanceof ImageBitmap?(N.save(),N.translate(Et,zt+L),N.scale(1,-1),N.drawImage(Oe,0,0,L,L),N.restore()):N.drawImage(Oe,Et,zt,L,L)}catch{}return}await new Promise(Oe=>setTimeout(Oe,120))}};N.fillStyle="#6a6f62",N.fillRect(0,0,S.width,S.height);const _=Array.from({length:6},async()=>{for(;K.length;)await ie(K.shift())});await Promise.all(_);const q=document.createElement("canvas");q.width=q.height=4096,q.getContext("2d").drawImage(S,0,0,4096,4096);const O=await new Promise(Y=>q.toBlob(Y,"image/jpeg",.92));if(!O)return;const j=URL.createObjectURL(O);window.__AERIAL_URL__=j;const ee=r.tileXYToRectangle(s.x,s.y,i),re=r.tileXYToRectangle(C.x,C.y,i),Ce=(Y,de)=>D.multiplyByPoint(l,x.fromRadians(Y,de,Qe.height),new x),Me=Ce(ee.west,re.south),Xe=Ce(re.east,ee.north),lt=new Fe(Me.x,Me.y,Xe.x,Xe.y);for(const Y of[E,z])Y.setUniform("uAerial",new He({url:j,repeat:!1,minificationFilter:it.LINEAR_MIPMAP_LINEAR,magnificationFilter:at.LINEAR})),Y.setUniform("uAerialRect",lt),Y.setUniform("uAerialOn",1)}catch(c){console.warn("Foto aérea no disponible",c)}})(),W=[],X=[];let oe=0,ae=0,we=.22,$=.08,le=1200;const Q={total:M.length,loaded:0,failed:[]},Ye=async c=>{try{const i=await Ue.fromGltfAsync({url:u+c.file,modelMatrix:n,upAxis:he.Y,forwardAxis:he.X,shadows:c.kind==="arboles"?pe.CAST_ONLY:c.kind==="suelo"?pe.RECEIVE_ONLY:pe.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:c.kind!=="arboles"});if(c.kind==="suelo")i.customShader=z;else if(c.kind==="arboles"){const r=So(u+c.atlas,c.marco,c.marcoSup);r.setUniform("uNight",oe),r.setUniform("uTarde",ae),r.setUniform("uSkyFill",we),r.setUniform("uHazeAmount",$),r.setUniform("uHazeStart",le),W.push(r),i.customShader=r}else c.kind!=="cubierta_pbr"&&(i.customShader=E);i.imageBasedLighting.imageBasedLightingFactor=c.kind==="cubierta_pbr"?new Ae(.85,.55):new Ae(.75,.45),o.primitives.add(i),c.kind==="arboles"&&X.push(i),await new Promise(r=>{if(i.ready)return r();const f=i.readyEvent.addEventListener(()=>{f(),r()});setTimeout(r,2e4)})}catch(i){console.error("Sección no cargada",c.file,i),Q.failed.push(c.file)}Q.loaded++,e?.(Q.loaded,Q.total,c.label)},Pe=p.length+7;for(let c=0;c<Math.min(Pe,M.length);c++)a(M[c].label,.2+.75*c/Pe),await Ye(M[c]);const Ge=(async()=>{for(let c=Pe;c<M.length;c++)await Ye(M[c]),await new Promise(i=>setTimeout(i,60));await ve})();return{matrix:n,inverse:l,tileset:g,buildings:b.edificios,treeCount:w.total,sections:Q,done:Ge,setNight(c){h.setUniform("uNight",c),E.setUniform("uNight",c),oe=c,z.setUniform("uNight",c);for(const i of W)i.setUniform("uNight",c)},setTarde(c){h.setUniform("uTarde",c),E.setUniform("uTarde",c),ae=c,z.setUniform("uTarde",c);for(const i of W)i.setUniform("uTarde",c)},setTime(c){for(const i of W)i.setUniform("uTime",c)},setLook(c){if(c.skyFill!==void 0){we=c.skyFill,E.setUniform("uSkyFill",we);for(const i of W)i.setUniform("uSkyFill",we)}if(c.groundFill!==void 0&&z.setUniform("uGroundFill",c.groundFill),c.hazeAmount!==void 0){$=c.hazeAmount,E.setUniform("uHazeAmount",$),z.setUniform("uHazeAmount",$),h.setUniform("uHazeAmount",$);for(const i of W)i.setUniform("uHazeAmount",$)}if(c.hazeStart!==void 0){le=c.hazeStart,E.setUniform("uHazeStart",le),z.setUniform("uHazeStart",le),h.setUniform("uHazeStart",le);for(const i of W)i.setUniform("uHazeStart",le)}},setRevitZone(c){E.setUniform("uRevitBox",c?new Fe(c[0]-1,c[1]-1,c[2]+1,c[3]+1):new Fe(0,0,0,0))},setHotelFloors(c){E.setUniform("uHotelPisos",c)},setTreesVisible(c){for(const i of X)i.show=c},buildingAt(c){const i=D.multiplyByPoint(l,c,new x);let r=null,f=1.2;for(const s of b.edificios){if(i.x<s.bb[0]-1.5||i.x>s.bb[2]+1.5||i.y<s.bb[1]-1.5||i.y>s.bb[3]+1.5||i.z>s.b+s.h+2.5)continue;if(Po(i.x,i.y,s.r))return s;const C=Io(i.x,i.y,s.r);C<f&&(f=C,r=s)}return r}}}const _o=G.fromCssColorString("#ff2b1a"),Fo=G.fromCssColorString("#ffc400"),Ho=G.fromCssColorString("#00e862"),Ie=G.fromCssColorString("#1a1d22");function ft(t){const a=document.createElement("canvas");a.width=128,a.height=128;const e=a.getContext("2d");if(e.clearRect(0,0,128,128),t==="pare"){e.beginPath();for(let o=0;o<8;o++){const n=(o+.5)*Math.PI/4,l=64+Math.cos(n)*58,u=64+Math.sin(n)*58;o===0?e.moveTo(l,u):e.lineTo(l,u)}e.closePath(),e.fillStyle="#c81e1e",e.fill(),e.lineWidth=5,e.strokeStyle="#ffffff",e.stroke(),e.fillStyle="#ffffff",e.font="bold 31px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("PARE",64,66)}else t==="peaton"?(e.beginPath(),e.moveTo(64,6),e.lineTo(122,64),e.lineTo(64,122),e.lineTo(6,64),e.closePath(),e.fillStyle="#f5b800",e.fill(),e.lineWidth=4,e.strokeStyle="#18181b",e.stroke(),e.fillStyle="#18181b",e.beginPath(),e.arc(64,38,7,0,Math.PI*2),e.fill(),e.fillRect(59,47,10,22),e.fillRect(54,69,7,20),e.fillRect(67,69,7,20)):(e.beginPath(),e.arc(64,64,56,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.lineWidth=11,e.strokeStyle="#c81e1e",e.stroke(),e.fillStyle="#111827",e.font="bold 46px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("30",64,67));return a.toDataURL("image/png")}function No(t,a,e,o,n){const l=(p,A,M)=>D.multiplyByPoint(a,new x(p,A,M),new x),u=[],d=e+7.2,b=o+7.2,w=n(d,b),y=G.fromCssColorString("#2a303a"),m=G.fromCssColorString("#14171c"),h=G.fromCssColorString("#eab308");u.push(t.entities.add({position:l(d,b,w+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:y}}),t.entities.add({position:l(d,b,w+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:h}}));const g=4.6;u.push(t.entities.add({position:l(d-g*.5,b,w+5.65),box:{dimensions:new x(g,.14,.14),material:y}}),t.entities.add({position:l(d,b-g*.5,w+5.65),box:{dimensions:new x(.14,g,.14),material:y}}));const v=(p,A,M,E)=>{const z=E?.42:.3,ve=E?.3:.42;u.push(t.entities.add({position:l(p,A,M),box:{dimensions:new x(z,ve,1.18),material:m}}));const W=($,le)=>{const Q=t.entities.add({position:l(p,A,M+$),box:{dimensions:new x(E?.24:.33,E?.33:.24,.24),material:le}});return u.push(Q),Q},X=W(.36,Ie),oe=W(0,Ie),ae=W(-.36,Ie);return{red:X,yellow:oe,green:ae,setState:$=>{X.box.material=new ct($==="red"?_o:Ie),oe.box.material=new ct($==="yellow"?Fo:Ie),ae.box.material=new ct($==="green"?Ho:Ie)}}},k=v(d-3.4,b,w+5.1,!0),V=v(d,b-3.4,w+5.1,!1);return{ns:k,ew:V,setVisible(p){for(const A of u)A.show=p}}}function Oo(t,a,e,o,n){const l=(p,A,M)=>D.multiplyByPoint(a,new x(p,A,M),new x),u=[],d=Pt.fromColor(G.fromCssColorString("#f3f4f6").withAlpha(.92)),b=Pt.fromColor(G.fromCssColorString("#f5b800").withAlpha(.92)),w=(p,A,M,E,z,ve)=>{if(o(p,A)<.8)return;const W=n(p,A)+.07;l(p,A,W);const X=xt.fromRotationZ(z),oe=D.fromRotationTranslation(X,new x(p,A,W)),ae=D.multiply(a,oe,new D);u.push(new ro({geometry:lo.fromDimensions({dimensions:new x(M,E,.04)}),modelMatrix:ae,attributes:{color:ve}}))};for(const p of e){const A=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const M of A){const E=p.e+M.de,z=p.n+M.dn;if(o(E,z)<1.2)continue;for(let X=-3;X<=3;X++){const oe=M.horiz?E+X*1.15:E,ae=M.horiz?z:z+X*1.15;w(oe,ae,M.horiz?.52:2.8,M.horiz?2.8:.52,0,d)}const ve=E+(M.de===0?0:Math.sign(M.de)*2.1),W=z+(M.dn===0?0:Math.sign(M.dn)*2.1);w(ve,W,M.horiz?6.8:.42,M.horiz?.42:6.8,0,d)}}for(let p=-80;p<=440;p+=8)w(-154,p,.18,3.2,0,d),w(-132,p,.18,3.2,0,d);const y=Math.atan2(-51,380);for(let p=-420;p<=160;p+=8){const A=263-(p+420)*.13421052631578947;w(p,A+7.5,3.2,.18,y,d),w(p,A-7.5,3.2,.18,y,d),w(p,A,4.5,.18,y,b)}for(let p=-160;p<=360;p+=8)w(158,p,.18,3.2,0,d);let m=null;u.length>0&&(m=new io({geometryInstances:u,appearance:new no({flat:!0,translucent:!0}),asynchronous:!1}),t.scene.primitives.add(m));const h=[],g=ft("pare"),v=ft("peaton"),k=ft("vel30"),V=G.fromCssColorString("#9ca3af");return e.forEach((p,A)=>{const M=[{e:p.e-7.2,n:p.n-7.2,tex:g},{e:p.e+7.2,n:p.n-7.2,tex:A%2===0?v:k}];for(const E of M){const z=n(E.e,E.n);h.push(t.entities.add({position:l(E.e,E.n,z+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:V}}),t.entities.add({position:l(E.e,E.n,z+2.45),billboard:{image:E.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:so.CENTER}}))}}),{setVisible(p){m&&(m.show=p);for(const A of h)A.show=p}}}const Ze=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Ft=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],Ht=3.2;async function Do(t,a,e=110){const o=Ee.secciones;let n,l,u;try{n=await fetch(o+"vias_campo.json").then(r=>r.json());const i=new Uint8Array(await fetch(o+"vias_campo.bin").then(r=>r.arrayBuffer()));l=i.subarray(0,n.w*n.h),u=i.subarray(n.w*n.h)}catch{return null}const{cell:d,x0:b,y0:w,w:y,h:m}=n,h=(i,r)=>{const f=(i-b)/d-.5,s=(r-w)/d-.5,C=Math.floor(f),I=Math.floor(s);if(C<0||I<0||C>=y-1||I>=m-1)return 0;const H=f-C,L=s-I,S=I*y+C;return((l[S]*(1-H)+l[S+1]*H)*(1-L)+(l[S+y]*(1-H)+l[S+y+1]*H)*L)*.5},g=(i,r)=>{const f=Math.max(0,Math.min(y-1,Math.floor((i-b)/d))),s=Math.max(0,Math.min(m-1,Math.floor((r-w)/d))),C=s*y+f;if(l[C]>0)return u[C]*.1-2;let I=0,H=0;for(let L=-2;L<=2;L++){const S=s+L;if(!(S<0||S>=m))for(let N=-2;N<=2;N++){const K=f+N;if(K<0||K>=y)continue;const ie=S*y+K;if(l[ie]===0)continue;const _=1/(N*N+L*L+.5);I+=_,H+=(u[ie]*.1-2)*_}}return I>0?H/I:1},v=[],k=[],V=[];for(let i=2;i<m-2;i++)for(let r=2;r<y-2;r++){const f=i*y+r,s=b+(r+.5)*d,C=w+(i+.5)*d,I=Math.hypot(s+180,C-250);if(I>520)continue;const H=l[f]*.5;if(H>=2.6&&H<=5&&v.push(f),H>=6&&I<460&&V.push({e:s,n:C,d:H}),l[f]===0&&I<430){let L=!1;for(let S=-2;S<=2&&!L;S++)for(let N=-2;N<=2;N++)if(l[(i+S)*y+(r+N)]>0){L=!0;break}L&&k.push(f)}}if(!v.length)return null;V.sort((i,r)=>r.d-i.d);const p=[];for(const i of V){if(p.length>=6)break;if(p.some(s=>Math.hypot(s.e-i.e,s.n-i.n)<90))continue;const r=g(i.e,i.n),f=No(t,a,i.e,i.n,g);f.ns.setState("green"),f.ew.setState("red"),p.push({e:i.e,n:i.n,u:r,faseOffset:p.length*4.5,rig:f,nsEstado:"green",ewEstado:"red"})}const A=Oo(t,a,p,h,g),M=(()=>{let i=12345;return()=>(i=i*1664525+1013904223>>>0)/4294967296})(),E=(i,r,f)=>{const s=Math.cos(f),C=Math.sin(f);if(i>=-168&&i<=-118&&Math.abs(C)>.35)return i<-143?C<-.2?12:-1e6:C>.2?12:-1e6;const I=263-(i+420)*(51/380);return Math.abs(r-I)<26&&Math.abs(s)>.35?r>I?s>.2?12:-1e6:s<-.2?12:-1e6:i>=-255&&i<=-210&&r<222&&Math.abs(C)>.35?C<-.2?10:-1e6:r<175&&i<-215&&Math.abs(s)>.35?s>.2?10:-1e6:i<-385&&r<265&&Math.abs(C)>.35?C<-.2?10:-1e6:0},z=[],ve=(i,r,f)=>z.some(s=>s!==f&&Math.hypot(s.e-i,s.n-r)<8.5),W=i=>{for(let r=0;r<45;r++){const f=v[Math.floor(M()*v.length)],s=b+(f%y+.5)*d,C=w+(Math.floor(f/y)+.5)*d;if(ve(s,C,i))continue;let I=0,H=-1e9;for(let L=0;L<16;L++){const S=L/16*Math.PI*2,N=s+Math.cos(S)*10,K=C+Math.sin(S)*10,ie=h(N,K),_=E(N,K,S);if(_<-1e4)continue;const q=h(s+Math.sin(S)*2.5,C-Math.cos(S)*2.5),O=h(s-Math.sin(S)*2.5,C+Math.cos(S)*2.5),j=-Math.abs(ie-Ht)+(O>q?1.5:0)+_;ie>1.5&&j>H&&(H=j,I=S)}if(H>-1e8){i.e=s,i.n=C,i.th=I,i.vActual=i.v*.5;return}}};for(let i=0;i<e;i++){const r=M(),f=r<.2?"taxi":r<.48?"suv":"sedan",s={e:0,n:0,th:0,v:6.5+M()*5,vActual:0,model:null,u:0,tipo:f};W(s),z.push(s)}const X=[];if(k.length>0)for(let i=0;i<42;i++){const r=k[Math.floor(M()*k.length)],f=b+(r%y+.5)*d,s=w+(Math.floor(r/y)+.5)*d;X.push({e:f,n:s,th:M()*Math.PI*2,v:1.15+M()*.45,model:null,u:g(f,s)+.16,conPerro:i%3===0})}const oe=[],ae=(i,r,f,s,C,I,H,L=.68)=>{for(let S=0;S<C;S++){const N=C===1?(i+r)*.5:i+S/(C-1)*(r-i);for(let K=0;K<I;K++){if(M()>L)continue;const ie=I===1?(f+s)*.5:f+K/(I-1)*(s-f);if(h(N,ie)>.3)continue;const _=M(),q=_<.08?"taxi":_<.42?"suv":"sedan",O=M()<.5?0:Math.PI,j=g(N,ie);oe.push({e:N+(M()-.5)*.25,n:ie+(M()-.5)*.25,u:j>-1.5?j:3.55,th:H+O+(M()-.5)*.07,tipo:q,model:null})}}};ae(92,134,-22,62,4,15,.05,.7),ae(52,108,114,146,5,4,.12,.62),ae(58,106,-104,-56,4,6,.1,.65),ae(-132,-98,-46,32,3,12,.04,.68);const we=new x,$=new xt,le=new D,Q=(i,r=.08)=>{i.model&&(x.fromElements(i.e,i.n,i.u+r,we),xt.fromRotationZ(i.th,$),D.fromRotationTranslation($,we,le),i.model.modelMatrix=D.multiply(a,le,new D))},Ye=(async()=>{for(let i=0;i<z.length;i++){const r=z[i],f=r.tipo==="taxi"?"carro_taxi.glb":r.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const s=await Ue.fromGltfAsync({url:o+f,upAxis:he.Y,forwardAxis:he.X,shadows:pe.ENABLED,color:r.tipo==="taxi"?G.WHITE:G.fromCssColorString(Ze[i%Ze.length]),colorBlendMode:dt.MIX,colorBlendAmount:r.tipo==="taxi"?0:.28});t.scene.primitives.add(s),r.model=s,r.u=g(r.e,r.n),Q(r)}catch{}i%6===5&&await new Promise(s=>setTimeout(s,35))}for(let i=0;i<X.length;i++){const r=X[i];try{const f=await Ue.fromGltfAsync({url:o+(r.conPerro?"persona_perro.glb":"persona.glb"),upAxis:he.Y,forwardAxis:he.X,shadows:pe.ENABLED,color:G.fromCssColorString(Ft[i%Ft.length]),colorBlendMode:dt.MIX,colorBlendAmount:.25});t.scene.primitives.add(f),r.model=f,Q(r,0)}catch{}i%6===5&&await new Promise(f=>setTimeout(f,35))}for(let i=0;i<oe.length;i++){const r=oe[i],f=r.tipo==="taxi"?"carro_taxi.glb":r.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const s=await Ue.fromGltfAsync({url:o+f,upAxis:he.Y,forwardAxis:he.X,shadows:pe.ENABLED,color:r.tipo==="taxi"?G.WHITE:G.fromCssColorString(Ze[i*3%Ze.length]),colorBlendMode:dt.MIX,colorBlendAmount:r.tipo==="taxi"?0:.28});t.scene.primitives.add(s),r.model=s,Q(r)}catch{}i%8===7&&await new Promise(s=>setTimeout(s,30))}})();let Pe=!0,Ge=0;const c=(i,r)=>h(i,r)===0&&h(i+4,r)+h(i-4,r)+h(i,r+4)+h(i,r-4)>.5;return{ready:Ye,count:e,debug:()=>z.map(i=>[Math.round(i.e),Math.round(i.n),+i.u.toFixed(1),i.model?1:0]),setVisible(i){Pe=i;for(const r of z)r.model&&(r.model.show=i);for(const r of oe)r.model&&(r.model.show=i);for(const r of X)r.model&&(r.model.show=i);for(const r of p)r.rig.setVisible(i);A.setVisible(i)},update(i){if(!Pe)return;const r=Math.min(.08,Math.max(.001,i));Ge+=r;for(const f of p){const s=(Ge+f.faseOffset)%24,C=s<10?"green":s<12?"yellow":"red",I=s>=12&&s<22?"green":s>=22?"yellow":"red";C!==f.nsEstado&&(f.nsEstado=C,f.rig.ns.setState(C)),I!==f.ewEstado&&(f.ewEstado=I,f.rig.ew.setState(I))}for(let f=0;f<z.length;f++){const s=z[f];if(!s.model)continue;let C=0,I=-1e9;for(let _=-4;_<=4;_++){const q=_*.13,O=s.th+q,j=s.e+Math.cos(O)*9,ee=s.n+Math.sin(O)*9,re=h(j,ee);if(re<1.1||h(s.e+Math.cos(O)*4.5,s.n+Math.sin(O)*4.5)<.9)continue;const Me=E(j,ee,O);if(Me<-1e4)continue;const Xe=h(j+Math.sin(O)*2.5,ee-Math.cos(O)*2.5),lt=h(j-Math.sin(O)*2.5,ee+Math.cos(O)*2.5),Y=-Math.abs(Math.min(re,6)-Ht)-Math.abs(q)*1.6+(lt>=Xe?.6:0)+Me;Y>I&&(I=Y,C=q)}if(I<-1e8||Math.hypot(s.e+180,s.n-250)>580){W(s),s.u=g(s.e,s.n),Q(s);continue}const H=Math.cos(s.th),L=Math.sin(s.th);let S=1;for(let _=0;_<z.length;_++){if(_===f||!z[_].model)continue;const q=z[_],O=q.e-s.e,j=q.n-s.n,ee=O*O+j*j;if(ee>225)continue;const re=O*H+j*L,Ce=Math.abs(-O*L+j*H);if(re>0&&re<12.5&&Ce<2.35){const Me=re<6.4?0:(re-6.4)/6.1;Me<S&&(S=Me)}else ee<22&&_<f&&(S=0)}const N=Math.abs(H)>Math.abs(L);for(const _ of p){if((N?_.ewEstado:_.nsEstado)==="green")continue;const O=_.e-s.e,j=_.n-s.n,ee=O*H+j*L,re=Math.abs(-O*L+j*H);if(ee>7&&ee<21&&re<9){const Ce=ee<10.5?0:(ee-10.5)/10.5;Ce<S&&(S=Ce)}}const K=1-Math.min(.55,Math.abs(C)*1.4),ie=s.v*K*S;if(s.vActual+=(ie-s.vActual)*Math.min(1,r*4.5),s.vActual>.05){s.th+=Math.max(-1.4*r,Math.min(1.4*r,C));const _=s.e+Math.cos(s.th)*s.vActual*r,q=s.n+Math.sin(s.th)*s.vActual*r;h(_,q)>=.7?(s.e=_,s.n=q):s.th+=.6;const O=Math.max(g(s.e,s.n),g(s.e+Math.cos(s.th)*1.4,s.n+Math.sin(s.th)*1.4),g(s.e-Math.cos(s.th)*1.4,s.n-Math.sin(s.th)*1.4));s.u+=(O-s.u)*Math.min(1,r*8)}Q(s)}for(const f of X){if(!f.model)continue;const s=f.e+Math.cos(f.th)*f.v*r,C=f.n+Math.sin(f.th)*f.v*r;c(s,C)&&Math.hypot(s+180,C-250)<430?(f.e=s,f.n=C,f.u+=(g(f.e,f.n)+.16-f.u)*Math.min(1,r*4)):f.th+=.9+M()*1.2,Q(f,0)}}}}async function Nt(t,a){try{const e=new Image;e.decoding="async",e.src=t,await e.decode();const o=document.createElement("canvas");o.width=e.naturalWidth,o.height=e.naturalHeight;const n=o.getContext("2d");n.drawImage(e,0,0);const l=n.getImageData(0,0,o.width,o.height);return new He({typedArray:new Uint8Array(l.data.buffer),width:o.width,height:o.height,repeat:!0,minificationFilter:it.LINEAR_MIPMAP_LINEAR,magnificationFilter:at.LINEAR})}catch{return new He({typedArray:new Uint8Array([...a,255]),width:1,height:1})}}function Uo(t,a){return new je({uniforms:{uNight:{type:P.FLOAT,value:0},uLadrillo:{type:P.SAMPLER_2D,value:t},uTeja:{type:P.SAMPLER_2D,value:a}},varyings:{vRP:ce.VEC3,vRN:ce.VEC3},vertexShaderText:`
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
    `})}async function Bo(t,a){const e=Ee.secciones;let o;try{o=await fetch(e+"revit.json").then(h=>h.json())}catch{return null}const[n,l]=await Promise.all([Nt(e+"tex_ladrillo.webp",[107,84,76]),Nt(e+"tex_teja.webp",[90,52,28])]),u=Uo(n,l),d=[];for(const h of o.niveles)try{const g=await Ue.fromGltfAsync({url:e+h.file,modelMatrix:a,upAxis:he.Y,forwardAxis:he.X,shadows:pe.ENABLED,backFaceCulling:!1,show:!1});g.customShader=u,g.imageBasedLighting.imageBasedLightingFactor=new Ae(.45,.25),t.scene.primitives.add(g),d.push({...h,model:g,off:0,target:0,delay:0,shown:!1})}catch(g){console.warn("Nivel de Revit no cargado",h.file,g)}if(!d.length)return null;const b=46,w=new D,y=h=>{const g=D.fromTranslation(new x(0,0,h.off),w);h.model.modelMatrix=D.multiply(a,g,new D)},m={niveles:d.map(h=>({i:h.i,nombre:h.nombre})),caja:o.caja,ready:!0,visible:!1,abierto:-1,play(){m.visible=!0,m.abierto=-1;const h=performance.now();d.forEach((g,v)=>{g.off=b,g.target=0,g.delay=h+v*620,g.shown=!1,g.model.show=!1,y(g)})},openAt(h){m.visible=!0,m.abierto=h;const g=performance.now();let v=0;for(const k of[...d].reverse())k.i>h&&(k.target=b,k.delay=g+v++*110);for(const k of d)k.i<=h&&(k.target=0,k.delay=g,k.shown||(k.off=b))},full(){m.visible=!0,m.abierto=-1;const h=performance.now();d.forEach((g,v)=>{(g.target!==0||!g.shown)&&(g.target=0,g.delay=h+v*110,g.shown||(g.off=b))})},hide(){m.visible=!1,m.abierto=-1;for(const h of d)h.model.show=!1,h.shown=!1,h.off=0,h.target=0},setNight(h){u.setUniform("uNight",h)},update(h,g){if(m.visible)for(const v of d){if(g<v.delay)continue;v.target===0&&!v.shown&&(v.shown=!0,v.model.show=!0);const k=v.target-v.off;if(Math.abs(k)<.01){v.off!==v.target&&(v.off=v.target,y(v)),v.target!==0&&v.shown&&(v.shown=!1,v.model.show=!1);continue}const V=v.target===0?1-Math.exp(-5.2*h):1-Math.exp(-4*h);v.off+=k*V,y(v)}}};return m}function Vo(t,a){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);const o=document.createElement("aside");o.className="pisos",o.hidden=!0,o.innerHTML="<small>Pisos · modelo Revit</small>";const n=new Map,l=(d,b,w)=>{const y=document.createElement("button");y.innerHTML=`${b}<span>${w}</span>`,y.addEventListener("click",()=>a(d)),n.set(d,y),o.appendChild(y)};l(-1,"Edificio completo","");for(const d of[...t.niveles].reverse())l(d.i,d.nombre.charAt(0)+d.nombre.slice(1).toLowerCase(),`N${d.i+1}`);document.body.appendChild(o);const u=d=>n.forEach((b,w)=>b.classList.toggle("on",w===d));return u(-1),{show:d=>{o.hidden=!d},mark:u}}const Ke={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function mt(t){const a=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(!a)return[1,1,1];const e=parseInt(a[1],16);return[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}const jo=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function Wo(t){const a={dia:{...Ke.dia},tarde:{...Ke.tarde},noche:{...Ke.noche}};let e="dia";const o=document.createElement("button");o.id="btnLookStudio",o.className="look-toggle",o.textContent="⚙ Ajustar luz",o.title="Abrir editor de iluminación y color (L)",document.body.appendChild(o);const n=document.createElement("aside");n.id="lookPanel",n.className="look-panel",n.hidden=!0,n.innerHTML=`
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
  `,document.body.appendChild(n);const l=n.querySelector("#lpBody"),u=new Map;for(const m of jo){const h=document.createElement("section");h.className="lp-sec";const g=document.createElement("h4");g.textContent=m.title,h.appendChild(g);for(const v of m.items){const k=document.createElement("label");k.className="lp-row";const V=document.createElement("span");V.className="lp-lbl",V.textContent=v.label,k.appendChild(V);const p=document.createElement("input");p.type=v.type,v.type==="range"&&(p.min=String(v.min),p.max=String(v.max),p.step=String(v.step));const A=v.type==="range"?document.createElement("span"):void 0;A&&(A.className="lp-val"),p.addEventListener("input",()=>{const E=a[e];if(v.type==="range"){const z=parseFloat(p.value);E[v.key]=z,A&&(A.textContent=v.step&&v.step>=1?String(Math.round(z)):z.toFixed(2))}else E[v.key]=p.value;t(e,E)});const M=document.createElement("div");M.className="lp-ctrl",M.appendChild(p),A&&M.appendChild(A),k.appendChild(M),h.appendChild(k),u.set(v.key,{input:p,val:A})}l.appendChild(h)}const d={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function b(){const m=a[e],h=n.querySelector("#lpPresetName");h&&(h.textContent=d[e]);for(const[g,{input:v,val:k}]of u){const V=m[g];if(v.value=String(V),k&&typeof V=="number"){const p=parseFloat(v.step||"0.01");k.textContent=p>=1?String(Math.round(V)):V.toFixed(2)}}}const w=()=>{n.hidden=!n.hidden,o.classList.toggle("on",!n.hidden)};o.addEventListener("click",w),n.querySelector("#lpClose")?.addEventListener("click",w);const y=n.querySelector("#lpCopy");return y.addEventListener("click",async()=>{const m=JSON.stringify({active:e,presets:a},null,2);try{await navigator.clipboard.writeText(m),y.textContent="¡JSON copiado!",setTimeout(()=>y.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",m)}}),n.querySelector("#lpReset")?.addEventListener("click",()=>{a[e]={...Ke[e]},b(),t(e,a[e])}),addEventListener("keydown",m=>{m.code==="KeyL"&&!m.ctrlKey&&!m.metaKey&&!m.altKey&&w()}),b(),{setActivePreset(m){e=m,b()},getPreset(m){return a[m]},toggle:w}}go.defaultAccessToken=Ee.ionToken;const B=t=>document.getElementById(t),Mt=B("cesiumContainer"),Ot=B("loading"),qo=B("loadBar"),Gt=B("loadLabel"),Yo=B("loadPct");function Re(t,a){Gt.textContent=t;const e=Math.round(Math.max(0,Math.min(1,a))*100);qo.style.width=e+"%",Yo.textContent=e+"%"}const Z=new co(Mt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:pe.RECEIVE_ONLY,terrain:ho.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:uo.fromProviderAsync(Wt.fromAssetId(Ee.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),R=Z.scene;R.globe.enableLighting=!0;R.globe.showGroundAtmosphere=!0;R.globe.depthTestAgainstTerrain=!0;R.globe.maximumScreenSpaceError=2;R.fog.enabled=!1;R.fog.density=18e-5;R.fog.minimumBrightness=.04;R.highDynamicRange=!0;R.msaaSamples=4;R.postProcessStages.fxaa.enabled=!0;R.screenSpaceCameraController.enableCollisionDetection=!1;R.light=new fo({intensity:3,color:G.fromCssColorString("#fff4e3")});const ye=Z.shadowMap;ye.softShadows=!0;ye.size=4096;ye.maximumDistance=1200;ye.darkness=.24;ye.normalOffset=!0;{const t=ye;t._primitiveBias.depthBias=8e-4,t._primitiveBias.normalOffsetScale=1.6,t._primitiveBias.normalShadingSmooth=.35}const Te=R.postProcessStages.ambientOcclusion;Te.enabled=!0;Te.uniforms.intensity=2.1;Te.uniforms.bias=.08;Te.uniforms.lengthCap=.35;Te.uniforms.stepSize=1.4;Te.uniforms.blurStepSize=1;const xe=R.postProcessStages.bloom;xe.enabled=!0;xe.uniforms.glowOnly=!1;xe.uniforms.contrast=128;xe.uniforms.brightness=-.36;xe.uniforms.delta=1;xe.uniforms.sigma=2.6;xe.uniforms.stepSize=1.5;const Go=Ct(),pt=t=>{const a=D.getColumn(Go,t,new Fe);return new x(a.x,a.y,a.z)},ge=Ao(pt(0),pt(1),pt(2));R.postProcessStages.add(ge);const me=Eo();R.postProcessStages.add(me);Z.camera.frustum.fov=Vt.toRadians(48);const Dt=(()=>{try{const t=R.context._gl,a=t.getExtension("WEBGL_debug_renderer_info");return a?String(t.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),Xo=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Dt)&&!/Arc/i.test(Dt);let T=null,te=Xo||matchMedia("(pointer: coarse)").matches?.5:1;function We(){const t=Math.min(window.devicePixelRatio||1,2);Z.resolutionScale=t*(te>=1?1:te>=.5?.8:.62),ye.size=te>=1?4096:te>=.5?2048:1024,ye.softShadows=te>=.5,Te.enabled=te>=1,xe.enabled=te>=.5,R.msaaSamples=te>=1?4:1,Z.shadows=te>=.5,T?.tileset&&(T.tileset.maximumScreenSpaceError=te>=1?8:te>=.5?12:20)}We();Z.clock.shouldAnimate=!1;Z.clock.currentTime=Ve.fromIso8601("2026-06-21T16:50:00-05:00");const U=new Co(Z),st=t=>Le(ht[t].e,ht[t].n,ht[t].u),Zo=st("hotel");U.flyTo({pivot:Zo,heading:et.general.heading,pitch:et.general.pitch,range:et.general.range*1.8},0);U.groundHeight=t=>R.globe.getHeight(t);const Ko=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let fe=.04,Se=1,ke=null;const Jo=t=>Ve.toDate(Ve.fromIso8601(t)).getTime();function rt(t){R.light.intensity=t.sunIntensity,R.light.color=G.fromCssColorString(t.sunColor),ye.darkness=t.shadowDarkness,Te.uniforms.intensity=t.aoIntensity,xe.uniforms.brightness=t.bloomBrightness,me.uniforms.uExposure=t.exposure,me.uniforms.uContrast=t.contrast,me.uniforms.uSaturation=t.saturation;const[a,e,o]=mt(t.tintColor);me.uniforms.uTint=new x(a,e,o),me.uniforms.uVignette=t.vignette;const[n,l,u]=mt(t.skyZenith);ge.uniforms.uSkyZenith=new x(n,l,u);const[d,b,w]=mt(t.skyHorizon);ge.uniforms.uSkyHorizon=new x(d,b,w),ge.uniforms.uCloudDensity=t.cloudDensity,ge.uniforms.uCloudSpeed=t.cloudSpeed,T?.setLook({skyFill:t.skyFill,groundFill:t.groundFill,hazeAmount:t.hazeAmount,hazeStart:t.hazeStart})}const ot=Wo((t,a)=>rt(a));rt(ot.getPreset("dia"));ge.uniforms.uNight=fe;ge.uniforms.uTarde=Se;me.uniforms.uNight=fe;me.uniforms.uTarde=Se;R.skyAtmosphere&&(R.skyAtmosphere.hueShift=0,R.skyAtmosphere.saturationShift=.08,R.skyAtmosphere.brightnessShift=-.04);function $o(t){ke={from:Ve.toDate(Z.clock.currentTime).getTime(),to:Jo(t.iso),start:performance.now(),dur:1600},R.fog.density=t.fog,ot.setActivePreset(t.id),rt(ot.getPreset(t.id)),R.skyAtmosphere&&(R.skyAtmosphere.hueShift=0,R.skyAtmosphere.saturationShift=t.id==="tarde"?.08:t.id==="noche"?-.25:.06,R.skyAtmosphere.brightnessShift=t.id==="noche"?-.55:t.id==="tarde"?-.04:0);const e=fe,o=Se,n=performance.now(),l=()=>{const d=Math.min(1,(performance.now()-n)/1400),b=d*d*(3-2*d);fe=e+(t.night-e)*b,Se=o+(t.tarde-o)*b,T?.setNight(fe),J?.setNight(fe),T?.setTarde(Se),ge.uniforms.uNight=fe,ge.uniforms.uTarde=Se,me.uniforms.uNight=fe,me.uniforms.uTarde=Se,d<1&&requestAnimationFrame(l)};requestAnimationFrame(l),document.querySelectorAll("[data-light]").forEach(d=>d.classList.toggle("on",d.dataset.light===t.id));const u=B("clockLabel");u&&(u.textContent=t.label)}document.querySelectorAll("[data-light]").forEach(t=>{t.addEventListener("click",()=>{const a=Ko.find(e=>e.id===t.dataset.light);a&&$o(a)})});let _e=!1;const bt=B("btnOrbit"),kt=B("btnPedestrian");function be(){_e=!1,bt?.classList.remove("on")}function qe(t,a=2){be();const e=et[t];U.flyTo({pivot:st(e.place),heading:e.heading,pitch:e.pitch,range:e.range},a)}B("btnHome")?.addEventListener("click",()=>qe("general",2.2));B("btnAerial")?.addEventListener("click",()=>qe("aerial"));B("btnArch")?.addEventListener("click",()=>qe("arch"));kt?.addEventListener("click",()=>{be(),U.isWalking?U.exitWalk():U.enterWalk(se?Zt(se):void 0)});U.onModeChange=t=>{kt?.classList.toggle("on",t);const a=B("hint");a&&t&&(a.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",a.classList.remove("fade"),setTimeout(()=>a.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(t=>{t.addEventListener("click",()=>{be();const a=t.dataset.place;if(a==="hotel"&&T){const e=T.buildings.find(o=>o.s==="Hotel");if(e){Ne(null),Ne(e);return}}U.flyTo({pivot:st(a),range:a==="hotel"?300:520,pitch:-.5},2)})});bt?.addEventListener("click",()=>{_e=!_e,bt.classList.toggle("on",_e),_e&&U.isWalking&&U.exitWalk()});Mt.addEventListener("pointerdown",be);Mt.addEventListener("wheel",be,{passive:!0});addEventListener("keydown",t=>{t.code==="Escape"&&(U.isWalking?U.exitWalk():Ne(null)),(t.code==="KeyH"||t.code==="Home")&&qe("general",2.2),t.code==="KeyP"&&kt?.click()});let se=null,Be=null;const Qo=9;let tt=null,J=null,ze=null,wt=!1,Je=null;function ea(){return Je||(Je=(async()=>{T&&(J=await Bo(Z,T.matrix),J&&(J.setNight(fe),ze=Vo(J,t=>{if(!J)return;be(),ze?.mark(t),t<0?J.full():J.openAt(t);const a=J.caja;U.flyTo({pivot:Le((a[0]+a[2])/2,(a[1]+a[3])/2,12),pitch:t<0?-.42:-.95,range:t<0?230:150},1.4)}),wt&&(wt=!1,T.setHotelFloors(99),St(),ue&&(Z.entities.remove(ue),ue=null))))})(),Je)}function St(){!T||!J||(T.setRevitZone(J.caja),J.play(),ze?.mark(-1),ze?.show(!0))}function Xt(){T&&(tt={start:performance.now()},T.setHotelFloors(0))}let ue=null;const $e=B("card");function ta(t){return Le((t.bb[0]+t.bb[2])/2,(t.bb[1]+t.bb[3])/2,t.b+t.h*.5)}function Zt(t){return Le((t.bb[0]+t.bb[2])/2,t.bb[1]-9,t.b)}function Ne(t){const a=se?.s==="Hotel";if(se=t,ue&&(Z.entities.remove(ue),ue=null),!t||!T){$e&&($e.hidden=!0),ze?.show(!1);return}t.s!=="Hotel"?ze?.show(!1):J?.visible&&ze?.show(!0);const e=t.r.map(([m,h])=>Le(m,h,0,T.matrix)),o=2572+t.b-.5;ue=Z.entities.add({polygon:{hierarchy:new po(e),height:o,extrudedHeight:o+t.h+2.2,material:G.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:G.fromCssColorString("#d7ebff"),shadows:pe.DISABLED}});const n=t.s==="Hotel";n&&!a&&(J?(St(),ue&&(Z.entities.remove(ue),ue=null)):(wt=!0,ea(),Xt()),be(),U.flyTo({pivot:st("hotel"),pitch:-.38,range:290},1.8));const l=n&&T?T.buildings.filter(m=>m.s==="Hotel"):[t],u=m=>Math.abs(m.r.reduce((h,g,v)=>{const k=m.r[(v+1)%m.r.length];return h+g[0]*k[1]-k[0]*g[1]},0)/2),d=l.reduce((m,h)=>m+u(h),0),b=l.reduce((m,h)=>m+u(h)*h.p,0),w=Math.max(...l.map(m=>m.p)),y=Math.max(...l.map(m=>m.h));Math.abs(t.r.reduce((m,h,g)=>{const v=t.r[(g+1)%t.r.length];return m+h[0]*v[1]-v[0]*h[1]},0)/2),B("cardKind").textContent=n?"Proyecto":`Sector ${t.s}`,B("cardTitle").textContent=n?"Hotel La Fontana":`Edificación ${t.id+1}`,B("cardData").innerHTML=`<dt>Pisos</dt><dd>${n?"hasta "+w:t.p}</dd><dt>Altura</dt><dd>${y.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(d).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(b).toLocaleString("es-CO")} m²</dd>`,$e&&($e.hidden=!1)}U.onPick=t=>{T&&Ne(t?T.buildingAt(t):null)};B("cardClose")?.addEventListener("click",()=>Ne(null));B("cardFocus")?.addEventListener("click",()=>{if(!se)return;be();const t=Math.max(se.bb[2]-se.bb[0],se.bb[3]-se.bb[1],se.h);U.flyTo({pivot:ta(se),pitch:-.42,range:Math.max(60,t*2.1)},1.7)});B("cardWalk")?.addEventListener("click",()=>{se&&(be(),U.enterWalk(Zt(se)))});const gt=B("status"),Ut=B("statusText");async function oa(){const t=performance.now()+25e3;let a=0;for(;performance.now()<t;){const e=R.globe.tilesLoaded,o=!T?.tileset||T.tileset.tilesLoaded;if(e&&o){if(a||(a=performance.now()),performance.now()-a>=600)break}else a=0;await new Promise(n=>setTimeout(n,150))}for(let e=0;e<8;e++)await new Promise(o=>requestAnimationFrame(o))}async function aa(){Re("Cargando el modelo del hotel...",.05),await new Promise(e=>setTimeout(e,30)),T=await Ro(Z,(e,o)=>Re(e,.05+o*.2),(e,o,n)=>{Re(`Cargando secciones (${e}/${o}) · ${n}`,.25+e/Math.max(1,o)*.45),!(!gt||!Ut)&&(gt.hidden=!1,Ut.textContent=e<o?`Cargando secciones ${e}/${o} · ${n}`:`Modelo completo · ${o} secciones`,e>=o&&setTimeout(()=>gt.classList.add("fade"),2600))}),T.setNight(fe),T.setTarde(Se);const t=document.querySelector("[data-light].on")?.dataset.light||"dia";rt(ot.getPreset(t)),We(),qe("general",0),await T.done,Re("Cargando tráfico y parqueaderos...",.78),Be=await Do(Z,T.matrix),Be&&await Be.ready,window.__ALL__=!0,Re("Renderizando texturas y 3D Tiles...",.9),await oa(),Re("Listo",1),Ot.classList.add("done"),setTimeout(()=>Ot.remove(),900);const a=B("hint");a&&setTimeout(()=>a.classList.add("fade"),9e3),window.__READY__=!0}const ne={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:mo,viewer:Z,cam:U,getSite:()=>T,enuToWorld:Le,select:Ne,stats:ne,playHotel:Xt,playRevit:St,getRevit:()=>J,getTrafico:()=>Be,setQuality:t=>{te=t,We()}};aa().catch(t=>{console.error(t),Gt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(t?.message??t)});let Bt=performance.now(),vt=0;function Kt(){const t=performance.now(),a=Math.min(.1,(t-Bt)/1e3);if(Bt=t,ke){const o=Math.min(1,(t-ke.start)/ke.dur),n=o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2;Z.clock.currentTime=Ve.fromDate(new Date(ke.from+(ke.to-ke.from)*n)),o>=1&&(ke=null)}if(tt&&T){const o=(t-tt.start)/550,n=Math.floor(o),l=o-n,u=1-Math.pow(1-Math.min(1,l*1.6),3);n>=Qo?(T.setHotelFloors(99),tt=null):T.setHotelFloors(n+u)}J?.update(a,t),Be?.update(a);const e=t*.001;if(T?.setTime(e),ge.uniforms.uTime=e,_e&&!U.isWalking&&U.flyTo({heading:U.state.heading+.16*a},0),U.update(a),ne.frames++,t-ne.t0>=2e3){ne.fps=Math.round(ne.frames*1e3/(t-ne.t0)),ne.frames=0,ne.t0=t,window.__FPS__=ne.fps;const o=!!T&&T.sections.loaded>=T.sections.total&&t-vt>8e3;T&&T.sections.loaded>=T.sections.total&&!vt&&(vt=t),o&&document.visibilityState==="visible"&&(ne.fps<20&&te>.25&&!window.__DBG__.lock?++ne.low>=3&&(te=te>=1?.5:.25,ne.low=0,We()):ne.low=0)}requestAnimationFrame(Kt)}requestAnimationFrame(Kt);addEventListener("resize",We);
