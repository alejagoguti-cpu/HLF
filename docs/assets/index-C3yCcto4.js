var Xt=Object.defineProperty;var Zt=(t,a,i)=>a in t?Xt(t,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[a]=i;var A=(t,a,i)=>Zt(t,typeof a!="symbol"?a+"":a,i);import{C as y,a as Ot,T as dt,M as O,b as Ce,c as Ne,H as Kt,P as Dt,d as De,L as Jt,U as T,V as oe,e as Ee,f as Le,g as $e,h as Qe,i as Mt,j as $t,S as re,I as Ut,k as Qt,R as eo,l as Ke,A as ye,m as Y,n as kt,o as Tt,p as St,q as to,r as oo,s as ao,t as io,J as Oe,u as no,v as so,w as ro}from"./cesium-ICe9G6Ok.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function i(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(n){if(n.ep)return;n.ep=!0;const l=i(n);fetch(n.href,l)}})();const at="/HLF/",lo=at.endsWith("/")?at:at+"/",co=lo+"cesium/";window.CESIUM_BASE_URL=co;const Ge={longitude:-74.04145021,latitude:4.70207636,height:2572},it={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},Xe={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Me={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},uo=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,At=-1.5533,Et=-.012,ho=4200,fo=6,Lt=1.7;class mo{constructor(a){A(this,"viewer");A(this,"canvas");A(this,"pivot",new y);A(this,"heading",.5);A(this,"pitch",-.6);A(this,"range",1200);A(this,"targetPivot",new y);A(this,"targetHeading",.5);A(this,"targetPitch",-.6);A(this,"targetRange",1200);A(this,"damping",9);A(this,"drag",null);A(this,"pointers",new Map);A(this,"pinch",null);A(this,"lastTap",0);A(this,"keys",new Set);A(this,"tween",null);A(this,"fov",Ot.toRadians(48));A(this,"walking",!1);A(this,"eye",new y);A(this,"eyeTarget",new y);A(this,"wHeading",0);A(this,"wPitch",0);A(this,"wHeadingT",0);A(this,"wPitchT",0);A(this,"onPick",null);A(this,"onModeChange",null);A(this,"groundHeight",null);this.viewer=a,this.canvas=a.scene.canvas,a.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:y.clone(this.targetPivot)}}setPivot(a,i=!0){if(i){const o=y.clone(this.viewer.camera.positionWC),n=y.subtract(o,a,new y),l=y.magnitude(n),h=dt.eastNorthUpToFixedFrame(a),u=O.inverseTransformation(h,new O),w=O.multiplyByPointAsVector(u,n,new y);if(l>1){const b=-Math.asin(Math.max(-1,Math.min(1,w.z/l)));if(b<Et&&b>At){let g=Math.atan2(-w.x,-w.y);for(;g-this.heading>Math.PI;)g-=Math.PI*2;for(;g-this.heading<-Math.PI;)g+=Math.PI*2;this.heading=this.targetHeading=g,this.pitch=this.targetPitch=b,this.range=this.targetRange=this.clamp(l),y.clone(a,this.pivot)}}}this.targetPivot=y.clone(a),this.tween=null}bind(){const a=this.canvas;a.style.touchAction="none",a.addEventListener("pointerdown",o=>{if(a.setPointerCapture(o.pointerId),this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2){const[n,l]=[...this.pointers.values()];this.pinch={distance:Math.hypot(n.x-l.x,n.y-l.y),range:this.targetRange,cx:(n.x+l.x)/2,cy:(n.y+l.y)/2},this.drag=null;return}o.button===2||o.button===1||o.shiftKey?this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"pan",moved:!1}:o.button===0&&(this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"orbit",moved:!1}),this.tween=null}),a.addEventListener("pointermove",o=>{if(!this.pointers.has(o.pointerId))return;if(this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2&&this.pinch){const[h,u]=[...this.pointers.values()],w=Math.hypot(h.x-u.x,h.y-u.y),b=(h.x+u.x)/2,g=(h.y+u.y)/2;this.walking?this.walk((this.pinch.cy-g)*.06,0):(w>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/w)),this.pan(this.pinch.cx-b,g-this.pinch.cy)),this.pinch.cx=b,this.pinch.cy=g;return}if(!this.drag||o.pointerId!==this.drag.id)return;const n=o.offsetX-this.drag.x,l=o.offsetY-this.drag.y;this.drag.x=o.offsetX,this.drag.y=o.offsetY,Math.abs(n)+Math.abs(l)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=n*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+l*.0028))):this.walk(l*.05,-n*.05):this.drag.mode==="orbit"?(this.targetHeading-=n*.0042,this.targetPitch=this.clampPitch(this.targetPitch-l*.0034)):this.pan(-n,l)});const i=o=>{if(this.pointers.delete(o.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&o.pointerId===this.drag.id){const n=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,n&&o.type==="pointerup"){const l=new Ce(o.offsetX,o.offsetY),h=performance.now();if(o.pointerType!=="mouse"&&h-this.lastTap<320){this.lastTap=0,this.focusAt(l);return}this.lastTap=h;const u=this.pickWorld(l);u&&!this.walking&&this.setPivot(u,!0),this.onPick?.(u)}}};a.addEventListener("pointerup",i),a.addEventListener("pointercancel",i),a.addEventListener("contextmenu",o=>o.preventDefault()),a.addEventListener("wheel",o=>{o.preventDefault(),this.tween=null;const n=o.deltaMode===1?16:o.deltaMode===2?100:1,l=o.deltaY*n;if(this.walking){this.walk(-l*.02,0);return}const h=Math.exp(Math.max(-.45,Math.min(.45,l*.0016))),u=this.pickWorld(new Ce(o.offsetX,o.offsetY)),w=this.clamp(this.targetRange*h);if(u&&h<1){const b=Math.min(.45,(this.targetRange-w)/this.targetRange)*.8,g=y.subtract(u,this.targetPivot,new y),f=y.magnitude(g);if(f>1){const d=Math.min(f,this.targetRange)*b/f;y.add(this.targetPivot,y.multiplyByScalar(g,d,g),this.targetPivot)}}this.targetRange=w},{passive:!1}),a.addEventListener("dblclick",o=>{o.preventDefault(),this.focusAt(new Ce(o.offsetX,o.offsetY))}),addEventListener("keydown",o=>{o.target instanceof HTMLInputElement||(this.keys.add(o.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(o.code)&&o.preventDefault())}),addEventListener("keyup",o=>this.keys.delete(o.code)),addEventListener("blur",()=>this.keys.clear())}clamp(a,i=fo,o=ho){return Math.max(i,Math.min(o,a))}clampPitch(a){return Math.max(At,Math.min(Et,a))}moveHorizontal(a,i,o,n){const l=dt.eastNorthUpToFixedFrame(a),h=new y(Math.sin(i)*o+Math.cos(i)*n,Math.cos(i)*o-Math.sin(i)*n,0);O.multiplyByPoint(l,h,a)}pan(a,i){const o=this.canvas.clientHeight||1,n=2*this.range*Math.tan(this.fov/2)/o,l=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,i*n/l,a*n),this.tween=null}walk(a,i){this.moveHorizontal(this.eyeTarget,this.wHeading,a,i),this.snapEye()}snapEye(){const a=Ne.fromCartesian(this.eyeTarget),i=this.groundHeight?.(a);i!==void 0&&Number.isFinite(i)&&(a.height=i+Lt,Ne.toCartesian(a,void 0,this.eyeTarget))}pickWorld(a){const i=this.viewer.scene;let o;if(i.pickPositionSupported&&i.pick(a,4,4)&&(o=i.pickPosition(a)),!o){const n=i.camera.getPickRay(a);n&&(o=i.globe.pick(n,i)??void 0)}return o??null}focusAt(a){const i=this.pickWorld(a);if(i){if(this.walking){y.clone(i,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:i,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(a,i=2){this.walking&&this.exitWalk(!1);const o={pivot:a.pivot??y.clone(this.targetPivot),heading:a.heading??this.targetHeading,pitch:a.pitch??this.targetPitch,range:a.range??this.targetRange};let n=o.heading;for(;n-this.targetHeading>Math.PI;)n-=Math.PI*2;for(;n-this.targetHeading<-Math.PI;)n+=Math.PI*2;if(o.heading=n,i<=.02){this.tween=null,this.targetPivot=y.clone(o.pivot),this.pivot=y.clone(o.pivot),this.heading=this.targetHeading=o.heading,this.pitch=this.targetPitch=o.pitch,this.range=this.targetRange=o.range;return}this.tween={from:{pivot:y.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:o,start:performance.now(),duration:i*1e3}}enterWalk(a){y.clone(a??this.targetPivot,this.eyeTarget),this.snapEye(),y.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(a=!0){if(!this.walking)return;this.walking=!1;const i=Ne.fromCartesian(this.eyeTarget);i.height-=Lt-1;const o=Ne.toCartesian(i);this.pivot=y.clone(o),this.targetPivot=o,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,a?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(a){if(!this.keys.size)return;const i=this.keys,o=i.has("ShiftLeft")||i.has("ShiftRight")?3:1;let n=0,l=0;(i.has("KeyW")||i.has("ArrowUp"))&&(n+=1),(i.has("KeyS")||i.has("ArrowDown"))&&(n-=1),(i.has("KeyD")||i.has("ArrowRight"))&&(l+=1),(i.has("KeyA")||i.has("ArrowLeft"))&&(l-=1);let h=0;if(i.has("KeyQ")&&(h+=1),i.has("KeyE")&&(h-=1),this.walking){h&&(this.wHeadingT-=h*1.2*a),(n||l)&&this.walk(n*4.2*o*a,l*3.4*o*a);return}if(h&&(this.targetHeading+=h*.9*a,this.tween=null),(i.has("PageUp")||i.has("Equal")||i.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*a))),(i.has("PageDown")||i.has("Minus")||i.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*a))),i.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*a)),i.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*a)),!n&&!l)return;const u=Math.max(8,this.range*.6)*o*a;this.moveHorizontal(this.targetPivot,this.heading,n*u,l*u),this.tween=null}update(a){this.updateKeys(a);const i=1-Math.exp(-this.damping*a);if(this.walking){y.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*a),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*i,this.wPitch+=(this.wPitchT-this.wPitch)*i,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const o=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),n=uo(o),{from:l,to:h}=this.tween;y.lerp(l.pivot,h.pivot,n,this.targetPivot),this.targetHeading=l.heading+(h.heading-l.heading)*n,this.targetPitch=l.pitch+(h.pitch-l.pitch)*n,this.targetRange=Math.exp(Math.log(l.range)+(Math.log(h.range)-Math.log(l.range))*n),o>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*i,this.pitch+=(this.targetPitch-this.pitch)*i,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*i),y.lerp(this.pivot,this.targetPivot,i,this.pivot),this.viewer.camera.lookAt(this.pivot,new Kt(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(O.IDENTITY)}}function po(){return new Le({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const Vt=()=>({uAerial:{type:T.SAMPLER_2D,value:po()},uAerialRect:{type:T.VEC4,value:new Ee(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:T.FLOAT,value:0}}),jt=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,et=`
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
`;function go(){return new De({uniforms:{uNight:{type:T.FLOAT,value:0},uTarde:{type:T.FLOAT,value:0},uSkyFill:{type:T.FLOAT,value:.24},uHazeAmount:{type:T.FLOAT,value:.08},uHazeStart:{type:T.FLOAT,value:1200},uHotelPisos:{type:T.FLOAT,value:99},uRevitBox:{type:T.VEC4,value:new Ee(0,0,0,0)},uLean:{type:T.VEC2,value:new Ce(0,0)},...Vt()},varyings:{vPosM:oe.VEC3,vUpEC:oe.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:et+jt+`
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
    `})}function vo(t,a,i){return new De({uniforms:{uNight:{type:T.FLOAT,value:0},uTarde:{type:T.FLOAT,value:0},uSkyFill:{type:T.FLOAT,value:.22},uHazeAmount:{type:T.FLOAT,value:.08},uHazeStart:{type:T.FLOAT,value:1200},uTime:{type:T.FLOAT,value:0},uFrame:{type:T.FLOAT,value:a},uTop:{type:T.FLOAT,value:i},uAtlas:{type:T.SAMPLER_2D,value:new Le({url:t,repeat:!1,minificationFilter:$e.LINEAR_MIPMAP_LINEAR,magnificationFilter:Qe.LINEAR})}},varyings:{vUV:oe.VEC2,vView:oe.VEC3,vRightT:oe.VEC2,vUpT:oe.VEC2,vUpEC:oe.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:et+`
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
    `})}function yo(){return new De({uniforms:{uNight:{type:T.FLOAT,value:0},uTarde:{type:T.FLOAT,value:0},uHazeAmount:{type:T.FLOAT,value:.08},uHazeStart:{type:T.FLOAT,value:1200}},lightingModel:Jt.UNLIT,fragmentShaderText:et+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function xo(t,a,i){return new Dt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:t,uNorth:a,uUp:i,uSkyZenith:new y(.16,.42,.82),uSkyHorizon:new y(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function wo(){return new Dt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new y(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function bo(t){const a=i=>({type:T.SAMPLER_2D,value:new Le({url:t+i,repeat:!0,minificationFilter:$e.LINEAR_MIPMAP_LINEAR,magnificationFilter:Qe.LINEAR})});return new De({uniforms:{uNight:{type:T.FLOAT,value:0},uTarde:{type:T.FLOAT,value:0},uGroundFill:{type:T.FLOAT,value:.12},uHazeAmount:{type:T.FLOAT,value:.08},uHazeStart:{type:T.FLOAT,value:1200},uAsfalto:a("tex_asfalto.webp"),uAnden:a("tex_anden.webp"),uPrado:a("tex_prado.webp"),uCiclo:a("tex_ciclo.webp"),...Vt()},varyings:{vG:oe.VEC3,vUpEC:oe.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:et+jt+`
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
    `})}function mt(){return dt.eastNorthUpToFixedFrame(y.fromDegrees(Ge.longitude,Ge.latitude,Ge.height))}function Te(t,a,i,o=mt()){return O.multiplyByPoint(o,new y(t,a,i),new y)}const Co={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function Mo(t,a,i){let o=!1;for(let n=0,l=i.length-1;n<i.length;l=n++){const[h,u]=i[n],[w,b]=i[l];u>a!=b>a&&t<(w-h)*(a-u)/(b-u)+h&&(o=!o)}return o}function ko(t,a,i){let o=1/0;for(let n=0,l=i.length-1;n<i.length;l=n++){const[h,u]=i[l],[w,b]=i[n],g=w-h,f=b-u,d=Math.max(0,Math.min(1,((t-h)*g+(a-u)*f)/(g*g+f*f||1)));o=Math.min(o,Math.hypot(t-h-d*g,a-u-d*f))}return o}async function To(t,a,i){const o=t.scene,n=mt(),l=O.inverseTransformation(n,new O),h=Me.secciones;a("Contexto urbano",.08);const[u,w,b,g]=await Promise.all([fetch(h+"recorte.json").then(e=>e.json()),fetch(h+"edificios.json").then(e=>e.json()),fetch(h+"arboles.json").then(e=>e.json()),fetch(h+"suelo.json").then(e=>e.json())]),f=()=>u.clips.map(e=>{const r=new Qt({positions:y.fromDegreesArray(e.flat())}),s=r.computeRectangle();return r.computeRectangle=v=>eo.clone(s,v),r});o.globe.clippingPolygons=new Mt({polygons:f()});const d=yo();let p=null;try{p=await $t.fromUrl(Me.googleTiles,{maximumScreenSpaceError:10,shadows:re.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),p.clippingPolygons=new Mt({polygons:f()}),p.customShader=d,o.primitives.add(p)}catch(e){console.warn("Tiles de Google no disponibles",e)}const m=[-236,330],M=[];for(const e of w.secciones)M.push({key:e.key,file:e.file,kind:"edificios",label:e.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${e.key}`,dist:e.key==="Hotel"?-2:Math.hypot(e.c[0]-m[0],e.c[1]-m[1])});M.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),M.sort((e,r)=>e.dist-r.dist);const V={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},_=g.secciones.map(e=>({key:e.key,file:e.file,kind:"suelo",capa:V[e.key]?.[0]??0,label:V[e.key]?.[1]??e.key,dist:-3})),K=b.secciones.map(e=>({key:e.key,file:e.file,kind:"arboles",atlas:e.atlas,marco:e.marco,marcoSup:e.marcoSup,label:Co[e.key]??"Vegetación",dist:0})),D=[..._,...M.slice(0,4),...K.slice(0,3),...M.slice(4,9),...K.slice(3),...M.slice(9)],j=go(),I=bo(h);(async()=>{try{const e=await Ut.fromAssetId(Me.imageryAssetId),r=18,s=e.tilingScheme,v=(W,ae)=>Ne.fromCartesian(Te(W,ae,0,n)),x=s.positionToTileXY(v(-1010,930),r),k=s.positionToTileXY(v(1010,-940),r),L=k.x-x.x+1,S=k.y-x.y+1,P=e.tileWidth,G=document.createElement("canvas");G.width=L*P,G.height=S*P;const B=G.getContext("2d"),E=[];for(let W=x.y;W<=k.y;W++)for(let ae=x.x;ae<=k.x;ae++)E.push([ae,W]);const J=async([W,ae])=>{for(let xt=0;xt<40;xt++){const wt=e.requestImage(W,ae,r);if(wt){try{const He=await wt,bt=(W-x.x)*P,Ct=(ae-x.y)*P;typeof ImageBitmap<"u"&&He instanceof ImageBitmap?(B.save(),B.translate(bt,Ct+P),B.scale(1,-1),B.drawImage(He,0,0,P,P),B.restore()):B.drawImage(He,bt,Ct,P,P)}catch{}return}await new Promise(He=>setTimeout(He,120))}};B.fillStyle="#6a6f62",B.fillRect(0,0,G.width,G.height);const R=Array.from({length:6},async()=>{for(;E.length;)await J(E.shift())});await Promise.all(R);const N=document.createElement("canvas");N.width=N.height=4096,N.getContext("2d").drawImage(G,0,0,4096,4096);const X=await new Promise(W=>N.toBlob(W,"image/jpeg",.92));if(!X)return;const te=URL.createObjectURL(X);window.__AERIAL_URL__=te;const fe=s.tileXYToRectangle(x.x,x.y,r),me=s.tileXYToRectangle(k.x,k.y,r),je=(W,ae)=>O.multiplyByPoint(l,y.fromRadians(W,ae,Ge.height),new y),Be=je(fe.west,me.south),Fe=je(me.east,fe.north),Gt=new Ee(Be.x,Be.y,Fe.x,Fe.y);for(const W of[j,I])W.setUniform("uAerial",new Le({url:te,repeat:!1,minificationFilter:$e.LINEAR_MIPMAP_LINEAR,magnificationFilter:Qe.LINEAR})),W.setUniform("uAerialRect",Gt),W.setUniform("uAerialOn",1)}catch(e){console.warn("Foto aérea no disponible",e)}})();const ne=[],Pe=[];let ue=0,Ie=0,be=.22,se=.08,ee=1200;const he={total:D.length,loaded:0,failed:[]},Re=async e=>{try{const r=await Ke.fromGltfAsync({url:h+e.file,modelMatrix:n,upAxis:ye.Y,forwardAxis:ye.X,shadows:e.kind==="arboles"?re.CAST_ONLY:e.kind==="suelo"?re.RECEIVE_ONLY:re.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:e.kind!=="arboles"});if(e.kind==="suelo")r.customShader=I;else if(e.kind==="arboles"){const s=vo(h+e.atlas,e.marco,e.marcoSup);s.setUniform("uNight",ue),s.setUniform("uTarde",Ie),s.setUniform("uSkyFill",be),s.setUniform("uHazeAmount",se),s.setUniform("uHazeStart",ee),ne.push(s),r.customShader=s}else e.kind!=="cubierta_pbr"&&(r.customShader=j);r.imageBasedLighting.imageBasedLightingFactor=e.kind==="cubierta_pbr"?new Ce(.85,.55):new Ce(.75,.45),o.primitives.add(r),e.kind==="arboles"&&Pe.push(r),await new Promise(s=>{if(r.ready)return s();const v=r.readyEvent.addEventListener(()=>{v(),s()});setTimeout(s,2e4)})}catch(r){console.error("Sección no cargada",e.file,r),he.failed.push(e.file)}he.loaded++,i?.(he.loaded,he.total,e.label)},_e=_.length+7;for(let e=0;e<Math.min(_e,D.length);e++)a(D[e].label,.2+.75*e/_e),await Re(D[e]);const c=(async()=>{for(let e=_e;e<D.length;e++)await Re(D[e]),await new Promise(r=>setTimeout(r,60))})();return{matrix:n,inverse:l,tileset:p,buildings:w.edificios,treeCount:b.total,sections:he,done:c,setNight(e){d.setUniform("uNight",e),j.setUniform("uNight",e),ue=e,I.setUniform("uNight",e);for(const r of ne)r.setUniform("uNight",e)},setTarde(e){d.setUniform("uTarde",e),j.setUniform("uTarde",e),Ie=e,I.setUniform("uTarde",e);for(const r of ne)r.setUniform("uTarde",e)},setTime(e){for(const r of ne)r.setUniform("uTime",e)},setLook(e){if(e.skyFill!==void 0){be=e.skyFill,j.setUniform("uSkyFill",be);for(const r of ne)r.setUniform("uSkyFill",be)}if(e.groundFill!==void 0&&I.setUniform("uGroundFill",e.groundFill),e.hazeAmount!==void 0){se=e.hazeAmount,j.setUniform("uHazeAmount",se),I.setUniform("uHazeAmount",se),d.setUniform("uHazeAmount",se);for(const r of ne)r.setUniform("uHazeAmount",se)}if(e.hazeStart!==void 0){ee=e.hazeStart,j.setUniform("uHazeStart",ee),I.setUniform("uHazeStart",ee),d.setUniform("uHazeStart",ee);for(const r of ne)r.setUniform("uHazeStart",ee)}},setRevitZone(e){j.setUniform("uRevitBox",e?new Ee(e[0]-1,e[1]-1,e[2]+1,e[3]+1):new Ee(0,0,0,0))},setHotelFloors(e){j.setUniform("uHotelPisos",e)},setTreesVisible(e){for(const r of Pe)r.show=e},buildingAt(e){const r=O.multiplyByPoint(l,e,new y);let s=null,v=1.2;for(const x of w.edificios){if(r.x<x.bb[0]-1.5||r.x>x.bb[2]+1.5||r.y<x.bb[1]-1.5||r.y>x.bb[3]+1.5||r.z>x.b+x.h+2.5)continue;if(Mo(r.x,r.y,x.r))return x;const k=ko(r.x,r.y,x.r);k<v&&(v=k,s=x)}return s}}}const zt=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Pt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],It=3.2;async function So(t,a,i=110){const o=Me.secciones;let n,l,h;try{n=await fetch(o+"vias_campo.json").then(e=>e.json());const c=new Uint8Array(await fetch(o+"vias_campo.bin").then(e=>e.arrayBuffer()));l=c.subarray(0,n.w*n.h),h=c.subarray(n.w*n.h)}catch{return null}const{cell:u,x0:w,y0:b,w:g,h:f}=n,d=(c,e)=>{const r=(c-w)/u-.5,s=(e-b)/u-.5,v=Math.floor(r),x=Math.floor(s);if(v<0||x<0||v>=g-1||x>=f-1)return 0;const k=r-v,L=s-x,S=x*g+v;return((l[S]*(1-k)+l[S+1]*k)*(1-L)+(l[S+g]*(1-k)+l[S+g+1]*k)*L)*.5},p=(c,e)=>{const r=Math.max(0,Math.min(g-1,Math.floor((c-w)/u))),s=Math.max(0,Math.min(f-1,Math.floor((e-b)/u))),v=s*g+r;if(l[v]>0)return h[v]*.1-2;let x=0,k=0;for(let L=-2;L<=2;L++){const S=s+L;if(!(S<0||S>=f))for(let P=-2;P<=2;P++){const G=r+P;if(G<0||G>=g)continue;const B=S*g+G;if(l[B]===0)continue;const E=1/(P*P+L*L+.5);x+=E,k+=(h[B]*.1-2)*E}}return x>0?k/x:1},m=[],M=[],V=[];for(let c=2;c<f-2;c++)for(let e=2;e<g-2;e++){const r=c*g+e,s=w+(e+.5)*u,v=b+(c+.5)*u,x=Math.hypot(s+180,v-250);if(x>520)continue;const k=l[r]*.5;if(k>=2.6&&k<=5&&m.push(r),k>=6&&x<460&&V.push({e:s,n:v,d:k}),l[r]===0&&x<430){let L=!1;for(let S=-2;S<=2&&!L;S++)for(let P=-2;P<=2;P++)if(l[(c+S)*g+(e+P)]>0){L=!0;break}L&&M.push(r)}}if(!m.length)return null;V.sort((c,e)=>e.d-c.d);const _=[],K=(c,e,r)=>O.multiplyByPoint(a,new y(c,e,r),new y);for(const c of V){if(_.length>=6)break;if(_.some(L=>Math.hypot(L.e-c.e,L.n-c.n)<90))continue;const e=p(c.e,c.n),r=c.e+6.5,s=c.n+6.5,v=p(r,s);t.entities.add({position:K(r,s,v+2.4),cylinder:{length:4.8,topRadius:.11,bottomRadius:.14,material:Y.fromCssColorString("#242933")}});const x=t.entities.add({position:K(r-.6,s,v+4.5),box:{dimensions:new y(.45,.45,1.05),material:Y.LIME}}),k=t.entities.add({position:K(r,s-.6,v+4.5),box:{dimensions:new y(.45,.45,1.05),material:Y.RED}});_.push({e:c.e,n:c.n,u:e,faseOffset:_.length*4.5,nsLuz:x,ewLuz:k,nsEstado:"green",ewEstado:"red"})}const D=(()=>{let c=12345;return()=>(c=c*1664525+1013904223>>>0)/4294967296})(),j=(c,e,r)=>{const s=Math.cos(r),v=Math.sin(r);if(c>=-168&&c<=-118&&Math.abs(v)>.35)return c<-143?v<-.2?12:-1e6:v>.2?12:-1e6;const x=263-(c+420)*(51/380);return Math.abs(e-x)<26&&Math.abs(s)>.35?e>x?s>.2?12:-1e6:s<-.2?12:-1e6:c>=-255&&c<=-210&&e<222&&Math.abs(v)>.35?v<-.2?10:-1e6:e<175&&c<-215&&Math.abs(s)>.35?s>.2?10:-1e6:c<-385&&e<265&&Math.abs(v)>.35?v<-.2?10:-1e6:0},I=[],ne=(c,e,r)=>I.some(s=>s!==r&&Math.hypot(s.e-c,s.n-e)<8.5),Pe=c=>{for(let e=0;e<45;e++){const r=m[Math.floor(D()*m.length)],s=w+(r%g+.5)*u,v=b+(Math.floor(r/g)+.5)*u;if(ne(s,v,c))continue;let x=0,k=-1e9;for(let L=0;L<16;L++){const S=L/16*Math.PI*2,P=s+Math.cos(S)*10,G=v+Math.sin(S)*10,B=d(P,G),E=j(P,G,S);if(E<-1e4)continue;const J=d(s+Math.sin(S)*2.5,v-Math.cos(S)*2.5),R=d(s-Math.sin(S)*2.5,v+Math.cos(S)*2.5),N=-Math.abs(B-It)+(R>J?1.5:0)+E;B>1.5&&N>k&&(k=N,x=S)}if(k>-1e8){c.e=s,c.n=v,c.th=x,c.vActual=c.v*.5;return}}};for(let c=0;c<i;c++){const e=D(),r=e<.2?"taxi":e<.48?"suv":"sedan",s={e:0,n:0,th:0,v:6.5+D()*5,vActual:0,model:null,u:0,tipo:r};Pe(s),I.push(s)}const ue=[];if(M.length>0)for(let c=0;c<42;c++){const e=M[Math.floor(D()*M.length)],r=w+(e%g+.5)*u,s=b+(Math.floor(e/g)+.5)*u;ue.push({e:r,n:s,th:D()*Math.PI*2,v:1.15+D()*.45,model:null,u:p(r,s)+.16,conPerro:c%3===0})}const Ie=new y,be=new St,se=new O,ee=(c,e=.08)=>{c.model&&(y.fromElements(c.e,c.n,c.u+e,Ie),St.fromRotationZ(c.th,be),O.fromRotationTranslation(be,Ie,se),c.model.modelMatrix=O.multiply(a,se,new O))};(async()=>{for(let c=0;c<I.length;c++){const e=I[c],r=e.tipo==="taxi"?"carro_taxi.glb":e.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const s=await Ke.fromGltfAsync({url:o+r,upAxis:ye.Y,forwardAxis:ye.X,shadows:re.ENABLED,color:e.tipo==="taxi"?Y.WHITE:Y.fromCssColorString(zt[c%zt.length]),colorBlendMode:kt.MIX,colorBlendAmount:e.tipo==="taxi"?0:.28});t.scene.primitives.add(s),e.model=s,e.u=p(e.e,e.n),ee(e)}catch{}c%6===5&&await new Promise(s=>setTimeout(s,35))}for(let c=0;c<ue.length;c++){const e=ue[c];try{const r=await Ke.fromGltfAsync({url:o+(e.conPerro?"persona_perro.glb":"persona.glb"),upAxis:ye.Y,forwardAxis:ye.X,shadows:re.ENABLED,color:Y.fromCssColorString(Pt[c%Pt.length]),colorBlendMode:kt.MIX,colorBlendAmount:.25});t.scene.primitives.add(r),e.model=r,ee(e,0)}catch{}c%6===5&&await new Promise(r=>setTimeout(r,35))}})();let he=!0,Re=0;const _e=(c,e)=>d(c,e)===0&&d(c+4,e)+d(c-4,e)+d(c,e+4)+d(c,e-4)>.5;return{count:i,debug:()=>I.map(c=>[Math.round(c.e),Math.round(c.n),+c.u.toFixed(1),c.model?1:0]),setVisible(c){he=c;for(const e of I)e.model&&(e.model.show=c);for(const e of ue)e.model&&(e.model.show=c);for(const e of _)e.nsLuz.show=c,e.ewLuz.show=c},update(c){if(!he)return;const e=Math.min(.08,Math.max(.001,c));Re+=e;for(const r of _){const s=(Re+r.faseOffset)%24,v=s<10?"green":s<12?"yellow":"red",x=s>=12&&s<22?"green":s>=22?"yellow":"red";v!==r.nsEstado&&(r.nsEstado=v,r.nsLuz.box.material.color=new Tt(v==="green"?Y.LIME:v==="yellow"?Y.YELLOW:Y.RED)),x!==r.ewEstado&&(r.ewEstado=x,r.ewLuz.box.material.color=new Tt(x==="green"?Y.LIME:x==="yellow"?Y.YELLOW:Y.RED))}for(let r=0;r<I.length;r++){const s=I[r];if(!s.model)continue;let v=0,x=-1e9;for(let E=-4;E<=4;E++){const J=E*.13,R=s.th+J,N=s.e+Math.cos(R)*9,X=s.n+Math.sin(R)*9,te=d(N,X);if(te<1.1||d(s.e+Math.cos(R)*4.5,s.n+Math.sin(R)*4.5)<.9)continue;const me=j(N,X,R);if(me<-1e4)continue;const je=d(N+Math.sin(R)*2.5,X-Math.cos(R)*2.5),Be=d(N-Math.sin(R)*2.5,X+Math.cos(R)*2.5),Fe=-Math.abs(Math.min(te,6)-It)-Math.abs(J)*1.6+(Be>=je?.6:0)+me;Fe>x&&(x=Fe,v=J)}if(x<-1e8||Math.hypot(s.e+180,s.n-250)>580){Pe(s),s.u=p(s.e,s.n),ee(s);continue}const k=Math.cos(s.th),L=Math.sin(s.th);let S=1;for(let E=0;E<I.length;E++){if(E===r||!I[E].model)continue;const J=I[E],R=J.e-s.e,N=J.n-s.n,X=R*R+N*N;if(X>225)continue;const te=R*k+N*L,fe=Math.abs(-R*L+N*k);if(te>0&&te<12.5&&fe<2.35){const me=te<6.4?0:(te-6.4)/6.1;me<S&&(S=me)}else X<22&&E<r&&(S=0)}const P=Math.abs(k)>Math.abs(L);for(const E of _){if((P?E.ewEstado:E.nsEstado)==="green")continue;const R=E.e-s.e,N=E.n-s.n,X=R*k+N*L,te=Math.abs(-R*L+N*k);if(X>7&&X<21&&te<9){const fe=X<10.5?0:(X-10.5)/10.5;fe<S&&(S=fe)}}const G=1-Math.min(.55,Math.abs(v)*1.4),B=s.v*G*S;if(s.vActual+=(B-s.vActual)*Math.min(1,e*4.5),s.vActual>.05){s.th+=Math.max(-1.4*e,Math.min(1.4*e,v));const E=s.e+Math.cos(s.th)*s.vActual*e,J=s.n+Math.sin(s.th)*s.vActual*e;d(E,J)>=.7?(s.e=E,s.n=J):s.th+=.6;const R=Math.max(p(s.e,s.n),p(s.e+Math.cos(s.th)*1.4,s.n+Math.sin(s.th)*1.4),p(s.e-Math.cos(s.th)*1.4,s.n-Math.sin(s.th)*1.4));s.u+=(R-s.u)*Math.min(1,e*8)}ee(s)}for(const r of ue){if(!r.model)continue;const s=r.e+Math.cos(r.th)*r.v*e,v=r.n+Math.sin(r.th)*r.v*e;_e(s,v)&&Math.hypot(s+180,v-250)<430?(r.e=s,r.n=v,r.u+=(p(r.e,r.n)+.16-r.u)*Math.min(1,e*4)):r.th+=.9+D()*1.2,ee(r,0)}}}}async function Rt(t,a){try{const i=new Image;i.decoding="async",i.src=t,await i.decode();const o=document.createElement("canvas");o.width=i.naturalWidth,o.height=i.naturalHeight;const n=o.getContext("2d");n.drawImage(i,0,0);const l=n.getImageData(0,0,o.width,o.height);return new Le({typedArray:new Uint8Array(l.data.buffer),width:o.width,height:o.height,repeat:!0,minificationFilter:$e.LINEAR_MIPMAP_LINEAR,magnificationFilter:Qe.LINEAR})}catch{return new Le({typedArray:new Uint8Array([...a,255]),width:1,height:1})}}function Ao(t,a){return new De({uniforms:{uNight:{type:T.FLOAT,value:0},uLadrillo:{type:T.SAMPLER_2D,value:t},uTeja:{type:T.SAMPLER_2D,value:a}},varyings:{vRP:oe.VEC3,vRN:oe.VEC3},vertexShaderText:`
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
    `})}async function Eo(t,a){const i=Me.secciones;let o;try{o=await fetch(i+"revit.json").then(d=>d.json())}catch{return null}const[n,l]=await Promise.all([Rt(i+"tex_ladrillo.webp",[107,84,76]),Rt(i+"tex_teja.webp",[90,52,28])]),h=Ao(n,l),u=[];for(const d of o.niveles)try{const p=await Ke.fromGltfAsync({url:i+d.file,modelMatrix:a,upAxis:ye.Y,forwardAxis:ye.X,shadows:re.ENABLED,backFaceCulling:!1,show:!1});p.customShader=h,p.imageBasedLighting.imageBasedLightingFactor=new Ce(.45,.25),t.scene.primitives.add(p),u.push({...d,model:p,off:0,target:0,delay:0,shown:!1})}catch(p){console.warn("Nivel de Revit no cargado",d.file,p)}if(!u.length)return null;const w=46,b=new O,g=d=>{const p=O.fromTranslation(new y(0,0,d.off),b);d.model.modelMatrix=O.multiply(a,p,new O)},f={niveles:u.map(d=>({i:d.i,nombre:d.nombre})),caja:o.caja,ready:!0,visible:!1,abierto:-1,play(){f.visible=!0,f.abierto=-1;const d=performance.now();u.forEach((p,m)=>{p.off=w,p.target=0,p.delay=d+m*620,p.shown=!1,p.model.show=!1,g(p)})},openAt(d){f.visible=!0,f.abierto=d;const p=performance.now();let m=0;for(const M of[...u].reverse())M.i>d&&(M.target=w,M.delay=p+m++*110);for(const M of u)M.i<=d&&(M.target=0,M.delay=p,M.shown||(M.off=w))},full(){f.visible=!0,f.abierto=-1;const d=performance.now();u.forEach((p,m)=>{(p.target!==0||!p.shown)&&(p.target=0,p.delay=d+m*110,p.shown||(p.off=w))})},hide(){f.visible=!1,f.abierto=-1;for(const d of u)d.model.show=!1,d.shown=!1,d.off=0,d.target=0},setNight(d){h.setUniform("uNight",d)},update(d,p){if(f.visible)for(const m of u){if(p<m.delay)continue;m.target===0&&!m.shown&&(m.shown=!0,m.model.show=!0);const M=m.target-m.off;if(Math.abs(M)<.01){m.off!==m.target&&(m.off=m.target,g(m)),m.target!==0&&m.shown&&(m.shown=!1,m.model.show=!1);continue}const V=m.target===0?1-Math.exp(-5.2*d):1-Math.exp(-4*d);m.off+=M*V,g(m)}}};return f}function Lo(t,a){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i);const o=document.createElement("aside");o.className="pisos",o.hidden=!0,o.innerHTML="<small>Pisos · modelo Revit</small>";const n=new Map,l=(u,w,b)=>{const g=document.createElement("button");g.innerHTML=`${w}<span>${b}</span>`,g.addEventListener("click",()=>a(u)),n.set(u,g),o.appendChild(g)};l(-1,"Edificio completo","");for(const u of[...t.niveles].reverse())l(u.i,u.nombre.charAt(0)+u.nombre.slice(1).toLowerCase(),`N${u.i+1}`);document.body.appendChild(o);const h=u=>n.forEach((w,b)=>w.classList.toggle("on",b===u));return h(-1),{show:u=>{o.hidden=!u},mark:h}}const We={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.65,sunColor:"#6b8fd4",shadowDarkness:.24,aoIntensity:2.1,skyFill:.22,groundFill:.1,exposure:1,contrast:.22,saturation:.95,tintColor:"#d6e6ff",vignette:.28,bloomBrightness:-.36,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.65,cloudSpeed:.8,hazeAmount:.08,hazeStart:1200}};function nt(t){const a=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(!a)return[1,1,1];const i=parseInt(a[1],16);return[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}const zo=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function Po(t){const a={dia:{...We.dia},tarde:{...We.tarde},noche:{...We.noche}};let i="dia";const o=document.createElement("button");o.id="btnLookStudio",o.className="look-toggle",o.textContent="⚙ Ajustar luz",o.title="Abrir editor de iluminación y color (L)",document.body.appendChild(o);const n=document.createElement("aside");n.id="lookPanel",n.className="look-panel",n.hidden=!0,n.innerHTML=`
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
  `,document.body.appendChild(n);const l=n.querySelector("#lpBody"),h=new Map;for(const f of zo){const d=document.createElement("section");d.className="lp-sec";const p=document.createElement("h4");p.textContent=f.title,d.appendChild(p);for(const m of f.items){const M=document.createElement("label");M.className="lp-row";const V=document.createElement("span");V.className="lp-lbl",V.textContent=m.label,M.appendChild(V);const _=document.createElement("input");_.type=m.type,m.type==="range"&&(_.min=String(m.min),_.max=String(m.max),_.step=String(m.step));const K=m.type==="range"?document.createElement("span"):void 0;K&&(K.className="lp-val"),_.addEventListener("input",()=>{const j=a[i];if(m.type==="range"){const I=parseFloat(_.value);j[m.key]=I,K&&(K.textContent=m.step&&m.step>=1?String(Math.round(I)):I.toFixed(2))}else j[m.key]=_.value;t(i,j)});const D=document.createElement("div");D.className="lp-ctrl",D.appendChild(_),K&&D.appendChild(K),M.appendChild(D),d.appendChild(M),h.set(m.key,{input:_,val:K})}l.appendChild(d)}const u={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function w(){const f=a[i],d=n.querySelector("#lpPresetName");d&&(d.textContent=u[i]);for(const[p,{input:m,val:M}]of h){const V=f[p];if(m.value=String(V),M&&typeof V=="number"){const _=parseFloat(m.step||"0.01");M.textContent=_>=1?String(Math.round(V)):V.toFixed(2)}}}const b=()=>{n.hidden=!n.hidden,o.classList.toggle("on",!n.hidden)};o.addEventListener("click",b),n.querySelector("#lpClose")?.addEventListener("click",b);const g=n.querySelector("#lpCopy");return g.addEventListener("click",async()=>{const f=JSON.stringify({active:i,presets:a},null,2);try{await navigator.clipboard.writeText(f),g.textContent="¡JSON copiado!",setTimeout(()=>g.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",f)}}),n.querySelector("#lpReset")?.addEventListener("click",()=>{a[i]={...We[i]},w(),t(i,a[i])}),addEventListener("keydown",f=>{f.code==="KeyL"&&!f.ctrlKey&&!f.metaKey&&!f.altKey&&b()}),w(),{setActivePreset(f){i=f,w()},getPreset(f){return a[f]},toggle:b}}ro.defaultAccessToken=Me.ionToken;const H=t=>document.getElementById(t),pt=H("cesiumContainer"),_t=H("loading"),Io=H("loadBar"),Bt=H("loadLabel"),Ro=H("loadPct");function st(t,a){Bt.textContent=t;const i=Math.round(Math.max(0,Math.min(1,a))*100);Io.style.width=i+"%",Ro.textContent=i+"%"}const U=new to(pt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:re.RECEIVE_ONLY,terrain:ao.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:oo.fromProviderAsync(Ut.fromAssetId(Me.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),z=U.scene;z.globe.enableLighting=!0;z.globe.showGroundAtmosphere=!0;z.globe.depthTestAgainstTerrain=!0;z.globe.maximumScreenSpaceError=2;z.fog.enabled=!1;z.fog.density=18e-5;z.fog.minimumBrightness=.04;z.highDynamicRange=!0;z.msaaSamples=4;z.postProcessStages.fxaa.enabled=!0;z.screenSpaceCameraController.enableCollisionDetection=!1;z.light=new io({intensity:3,color:Y.fromCssColorString("#fff4e3")});const le=U.shadowMap;le.softShadows=!0;le.size=4096;le.maximumDistance=1200;le.darkness=.24;le.normalOffset=!0;{const t=le;t._primitiveBias.depthBias=8e-4,t._primitiveBias.normalOffsetScale=1.6,t._primitiveBias.normalShadingSmooth=.35}const we=z.postProcessStages.ambientOcclusion;we.enabled=!0;we.uniforms.intensity=2.1;we.uniforms.bias=.08;we.uniforms.lengthCap=.35;we.uniforms.stepSize=1.4;we.uniforms.blurStepSize=1;const ce=z.postProcessStages.bloom;ce.enabled=!0;ce.uniforms.glowOnly=!1;ce.uniforms.contrast=128;ce.uniforms.brightness=-.36;ce.uniforms.delta=1;ce.uniforms.sigma=2.6;ce.uniforms.stepSize=1.5;const _o=mt(),rt=t=>{const a=O.getColumn(_o,t,new Ee);return new y(a.x,a.y,a.z)},xe=xo(rt(0),rt(1),rt(2));z.postProcessStages.add(xe);const ve=wo();z.postProcessStages.add(ve);U.camera.frustum.fov=Ot.toRadians(48);const Ft=(()=>{try{const t=z.context._gl,a=t.getExtension("WEBGL_debug_renderer_info");return a?String(t.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),Fo=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Ft)&&!/Arc/i.test(Ft);let C=null,Z=Fo||matchMedia("(pointer: coarse)").matches?.5:1;function Ue(){const t=Math.min(window.devicePixelRatio||1,2);U.resolutionScale=t*(Z>=1?1:Z>=.5?.8:.62),le.size=Z>=1?4096:Z>=.5?2048:1024,le.softShadows=Z>=.5,we.enabled=Z>=1,ce.enabled=Z>=.5,z.msaaSamples=Z>=1?4:1,U.shadows=Z>=.5,C?.tileset&&(C.tileset.maximumScreenSpaceError=Z>=1?8:Z>=.5?12:20)}Ue();U.clock.shouldAnimate=!1;U.clock.currentTime=Oe.fromIso8601("2026-06-21T10:10:00-05:00");const F=new mo(U),tt=t=>Te(it[t].e,it[t].n,it[t].u),Ho=tt("hotel");F.flyTo({pivot:Ho,heading:Xe.general.heading,pitch:Xe.general.pitch,range:Xe.general.range*1.8},0);F.groundHeight=t=>z.globe.getHeight(t);const No=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,tarde:0,fog:18e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.65,color:"#6b8fd4"}];let ge=0,Se=0,pe=null;const Oo=t=>Oe.toDate(Oe.fromIso8601(t)).getTime();function ot(t){z.light.intensity=t.sunIntensity,z.light.color=Y.fromCssColorString(t.sunColor),le.darkness=t.shadowDarkness,we.uniforms.intensity=t.aoIntensity,ce.uniforms.brightness=t.bloomBrightness,ve.uniforms.uExposure=t.exposure,ve.uniforms.uContrast=t.contrast,ve.uniforms.uSaturation=t.saturation;const[a,i,o]=nt(t.tintColor);ve.uniforms.uTint=new y(a,i,o),ve.uniforms.uVignette=t.vignette;const[n,l,h]=nt(t.skyZenith);xe.uniforms.uSkyZenith=new y(n,l,h);const[u,w,b]=nt(t.skyHorizon);xe.uniforms.uSkyHorizon=new y(u,w,b),xe.uniforms.uCloudDensity=t.cloudDensity,xe.uniforms.uCloudSpeed=t.cloudSpeed,C?.setLook({skyFill:t.skyFill,groundFill:t.groundFill,hazeAmount:t.hazeAmount,hazeStart:t.hazeStart})}const Je=Po((t,a)=>ot(a));ot(Je.getPreset("dia"));function Do(t){pe={from:Oe.toDate(U.clock.currentTime).getTime(),to:Oo(t.iso),start:performance.now(),dur:1600},z.fog.density=t.fog,Je.setActivePreset(t.id),ot(Je.getPreset(t.id)),z.skyAtmosphere&&(z.skyAtmosphere.hueShift=0,z.skyAtmosphere.saturationShift=t.id==="tarde"?.08:t.id==="noche"?-.25:.06,z.skyAtmosphere.brightnessShift=t.id==="noche"?-.55:t.id==="tarde"?-.04:0);const i=ge,o=Se,n=performance.now(),l=()=>{const u=Math.min(1,(performance.now()-n)/1400),w=u*u*(3-2*u);ge=i+(t.night-i)*w,Se=o+(t.tarde-o)*w,C?.setNight(ge),q?.setNight(ge),C?.setTarde(Se),xe.uniforms.uNight=ge,xe.uniforms.uTarde=Se,ve.uniforms.uNight=ge,ve.uniforms.uTarde=Se,u<1&&requestAnimationFrame(l)};requestAnimationFrame(l),document.querySelectorAll("[data-light]").forEach(u=>u.classList.toggle("on",u.dataset.light===t.id));const h=H("clockLabel");h&&(h.textContent=t.label)}document.querySelectorAll("[data-light]").forEach(t=>{t.addEventListener("click",()=>{const a=No.find(i=>i.id===t.dataset.light);a&&Do(a)})});let Ae=!1;const ut=H("btnOrbit"),gt=H("btnPedestrian");function de(){Ae=!1,ut?.classList.remove("on")}function Ve(t,a=2){de();const i=Xe[t];F.flyTo({pivot:tt(i.place),heading:i.heading,pitch:i.pitch,range:i.range},a)}H("btnHome")?.addEventListener("click",()=>Ve("general",2.2));H("btnAerial")?.addEventListener("click",()=>Ve("aerial"));H("btnArch")?.addEventListener("click",()=>Ve("arch"));gt?.addEventListener("click",()=>{de(),F.isWalking?F.exitWalk():F.enterWalk(Q?Yt(Q):void 0)});F.onModeChange=t=>{gt?.classList.toggle("on",t);const a=H("hint");a&&t&&(a.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",a.classList.remove("fade"),setTimeout(()=>a.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(t=>{t.addEventListener("click",()=>{de();const a=t.dataset.place;if(a==="hotel"&&C){const i=C.buildings.find(o=>o.s==="Hotel");if(i){ze(null),ze(i);return}}F.flyTo({pivot:tt(a),range:a==="hotel"?300:520,pitch:-.5},2)})});ut?.addEventListener("click",()=>{Ae=!Ae,ut.classList.toggle("on",Ae),Ae&&F.isWalking&&F.exitWalk()});pt.addEventListener("pointerdown",de);pt.addEventListener("wheel",de,{passive:!0});addEventListener("keydown",t=>{t.code==="Escape"&&(F.isWalking?F.exitWalk():ze(null)),(t.code==="KeyH"||t.code==="Home")&&Ve("general",2.2),t.code==="KeyP"&&gt?.click()});let Q=null,vt=null;const Uo=9;let Ze=null,q=null,ke=null,ht=!1,Ye=null;function ft(){return Ye||(Ye=(async()=>{C&&(q=await Eo(U,C.matrix),q&&(q.setNight(ge),ke=Lo(q,t=>{if(!q)return;de(),ke?.mark(t),t<0?q.full():q.openAt(t);const a=q.caja;F.flyTo({pivot:Te((a[0]+a[2])/2,(a[1]+a[3])/2,12),pitch:t<0?-.42:-.95,range:t<0?230:150},1.4)}),ht&&(ht=!1,C.setHotelFloors(99),yt(),ie&&(U.entities.remove(ie),ie=null))))})(),Ye)}function yt(){!C||!q||(C.setRevitZone(q.caja),q.play(),ke?.mark(-1),ke?.show(!0))}function Wt(){C&&(Ze={start:performance.now()},C.setHotelFloors(0))}let ie=null;const qe=H("card");function Vo(t){return Te((t.bb[0]+t.bb[2])/2,(t.bb[1]+t.bb[3])/2,t.b+t.h*.5)}function Yt(t){return Te((t.bb[0]+t.bb[2])/2,t.bb[1]-9,t.b)}function ze(t){const a=Q?.s==="Hotel";if(Q=t,ie&&(U.entities.remove(ie),ie=null),!t||!C){qe&&(qe.hidden=!0),ke?.show(!1);return}t.s!=="Hotel"?ke?.show(!1):q?.visible&&ke?.show(!0);const i=t.r.map(([f,d])=>Te(f,d,0,C.matrix)),o=2572+t.b-.5;ie=U.entities.add({polygon:{hierarchy:new so(i),height:o,extrudedHeight:o+t.h+2.2,material:Y.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:Y.fromCssColorString("#d7ebff"),shadows:re.DISABLED}});const n=t.s==="Hotel";n&&!a&&(q?(yt(),ie&&(U.entities.remove(ie),ie=null)):(ht=!0,ft(),Wt()),de(),F.flyTo({pivot:tt("hotel"),pitch:-.38,range:290},1.8));const l=n&&C?C.buildings.filter(f=>f.s==="Hotel"):[t],h=f=>Math.abs(f.r.reduce((d,p,m)=>{const M=f.r[(m+1)%f.r.length];return d+p[0]*M[1]-M[0]*p[1]},0)/2),u=l.reduce((f,d)=>f+h(d),0),w=l.reduce((f,d)=>f+h(d)*d.p,0),b=Math.max(...l.map(f=>f.p)),g=Math.max(...l.map(f=>f.h));Math.abs(t.r.reduce((f,d,p)=>{const m=t.r[(p+1)%t.r.length];return f+d[0]*m[1]-m[0]*d[1]},0)/2),H("cardKind").textContent=n?"Proyecto":`Sector ${t.s}`,H("cardTitle").textContent=n?"Hotel La Fontana":`Edificación ${t.id+1}`,H("cardData").innerHTML=`<dt>Pisos</dt><dd>${n?"hasta "+b:t.p}</dd><dt>Altura</dt><dd>${g.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(u).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(w).toLocaleString("es-CO")} m²</dd>`,qe&&(qe.hidden=!1)}F.onPick=t=>{C&&ze(t?C.buildingAt(t):null)};H("cardClose")?.addEventListener("click",()=>ze(null));H("cardFocus")?.addEventListener("click",()=>{if(!Q)return;de();const t=Math.max(Q.bb[2]-Q.bb[0],Q.bb[3]-Q.bb[1],Q.h);F.flyTo({pivot:Vo(Q),pitch:-.42,range:Math.max(60,t*2.1)},1.7)});H("cardWalk")?.addEventListener("click",()=>{Q&&(de(),F.enterWalk(Yt(Q)))});const lt=H("status"),Ht=H("statusText");async function jo(){st("Contexto geográfico",.04),await new Promise(i=>setTimeout(i,30)),C=await To(U,(i,o)=>st(i,o),(i,o,n)=>{!lt||!Ht||(lt.hidden=!1,Ht.textContent=i<o?`Cargando secciones ${i}/${o} · ${n}`:`Modelo completo · ${o} secciones`,i>=o&&setTimeout(()=>lt.classList.add("fade"),2600))}),C.setNight(ge),ft(),C.setTarde(Se);const t=document.querySelector("[data-light].on")?.dataset.light||"dia";ot(Je.getPreset(t)),Ue(),st("Listo",1),Ve("general",2.4),_t.classList.add("done"),setTimeout(()=>_t.remove(),900);const a=H("hint");a&&setTimeout(()=>a.classList.add("fade"),9e3),window.__READY__=!0,C.done.then(async()=>{vt=await So(U,C.matrix),await ft(),window.__ALL__=!0})}const $={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:no,viewer:U,cam:F,getSite:()=>C,enuToWorld:Te,select:ze,stats:$,playHotel:Wt,playRevit:yt,getRevit:()=>q,getTrafico:()=>vt,setQuality:t=>{Z=t,Ue()}};jo().catch(t=>{console.error(t),Bt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(t?.message??t)});let Nt=performance.now(),ct=0;function qt(){const t=performance.now(),a=Math.min(.1,(t-Nt)/1e3);if(Nt=t,pe){const o=Math.min(1,(t-pe.start)/pe.dur),n=o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2;U.clock.currentTime=Oe.fromDate(new Date(pe.from+(pe.to-pe.from)*n)),o>=1&&(pe=null)}if(Ze&&C){const o=(t-Ze.start)/550,n=Math.floor(o),l=o-n,h=1-Math.pow(1-Math.min(1,l*1.6),3);n>=Uo?(C.setHotelFloors(99),Ze=null):C.setHotelFloors(n+h)}q?.update(a,t),vt?.update(a);const i=t*.001;if(C?.setTime(i),xe.uniforms.uTime=i,Ae&&!F.isWalking&&F.flyTo({heading:F.state.heading+.16*a},0),F.update(a),$.frames++,t-$.t0>=2e3){$.fps=Math.round($.frames*1e3/(t-$.t0)),$.frames=0,$.t0=t,window.__FPS__=$.fps;const o=!!C&&C.sections.loaded>=C.sections.total&&t-ct>8e3;C&&C.sections.loaded>=C.sections.total&&!ct&&(ct=t),o&&document.visibilityState==="visible"&&($.fps<20&&Z>.25&&!window.__DBG__.lock?++$.low>=3&&(Z=Z>=1?.5:.25,$.low=0,Ue()):$.low=0)}requestAnimationFrame(qt)}requestAnimationFrame(qt);addEventListener("resize",Ue);
