var Qt=Object.defineProperty;var eo=(t,a,e)=>a in t?Qt(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e;var N=(t,a,e)=>eo(t,typeof a!="symbol"?a+"":a,e);import{C as b,a as Wt,T as Ct,M as V,b as _e,c as Ge,H as to,P as qt,d as qe,L as oo,U as L,V as he,e as Ve,f as je,g as ct,h as dt,i as Lt,j as ao,S as xe,I as Yt,k as io,R as no,l as Xe,A as ge,m as D,n as Rt,o as so,p as ro,q as lo,r as Je,s as It,t as Mt,G as co,B as uo,u as mt,v as ho,w as fo,x as mo,y as po,J as Ke,z as go,D as vo,E as yo}from"./cesium-j17Lq24u.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const pt="/HLF/",xo=pt.endsWith("/")?pt:pt+"/",bo=xo+"cesium/";window.CESIUM_BASE_URL=bo;const nt={longitude:-74.04145021,latitude:4.70207636,height:2572},gt={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},st={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},He={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},wo=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,_t=-1.5533,Ft=-.012,Co=4200,Mo=6,Ht=1.7;class ko{constructor(a){N(this,"viewer");N(this,"canvas");N(this,"pivot",new b);N(this,"heading",.5);N(this,"pitch",-.6);N(this,"range",1200);N(this,"targetPivot",new b);N(this,"targetHeading",.5);N(this,"targetPitch",-.6);N(this,"targetRange",1200);N(this,"damping",9);N(this,"drag",null);N(this,"pointers",new Map);N(this,"pinch",null);N(this,"lastTap",0);N(this,"keys",new Set);N(this,"tween",null);N(this,"fov",Wt.toRadians(48));N(this,"walking",!1);N(this,"eye",new b);N(this,"eyeTarget",new b);N(this,"wHeading",0);N(this,"wPitch",0);N(this,"wHeadingT",0);N(this,"wPitchT",0);N(this,"onPick",null);N(this,"onModeChange",null);N(this,"groundHeight",null);this.viewer=a,this.canvas=a.scene.canvas,a.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:b.clone(this.targetPivot)}}setPivot(a,e=!0){if(e){const o=b.clone(this.viewer.camera.positionWC),i=b.subtract(o,a,new b),r=b.magnitude(i),h=Ct.eastNorthUpToFixedFrame(a),d=V.inverseTransformation(h,new V),w=V.multiplyByPointAsVector(d,i,new b);if(r>1){const M=-Math.asin(Math.max(-1,Math.min(1,w.z/r)));if(M<Ft&&M>_t){let g=Math.atan2(-w.x,-w.y);for(;g-this.heading>Math.PI;)g-=Math.PI*2;for(;g-this.heading<-Math.PI;)g+=Math.PI*2;this.heading=this.targetHeading=g,this.pitch=this.targetPitch=M,this.range=this.targetRange=this.clamp(r),b.clone(a,this.pivot)}}}this.targetPivot=b.clone(a),this.tween=null}bind(){const a=this.canvas;a.style.touchAction="none",a.addEventListener("pointerdown",o=>{if(a.setPointerCapture(o.pointerId),this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2){const[i,r]=[...this.pointers.values()];this.pinch={distance:Math.hypot(i.x-r.x,i.y-r.y),range:this.targetRange,cx:(i.x+r.x)/2,cy:(i.y+r.y)/2},this.drag=null;return}o.button===2||o.button===1||o.shiftKey?this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"pan",moved:!1}:o.button===0&&(this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"orbit",moved:!1}),this.tween=null}),a.addEventListener("pointermove",o=>{if(!this.pointers.has(o.pointerId))return;if(this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2&&this.pinch){const[h,d]=[...this.pointers.values()],w=Math.hypot(h.x-d.x,h.y-d.y),M=(h.x+d.x)/2,g=(h.y+d.y)/2;this.walking?this.walk((this.pinch.cy-g)*.06,0):(w>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/w)),this.pan(this.pinch.cx-M,g-this.pinch.cy)),this.pinch.cx=M,this.pinch.cy=g;return}if(!this.drag||o.pointerId!==this.drag.id)return;const i=o.offsetX-this.drag.x,r=o.offsetY-this.drag.y;this.drag.x=o.offsetX,this.drag.y=o.offsetY,Math.abs(i)+Math.abs(r)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=i*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+r*.0028))):this.walk(r*.05,-i*.05):this.drag.mode==="orbit"?(this.targetHeading-=i*.0042,this.targetPitch=this.clampPitch(this.targetPitch-r*.0034)):this.pan(-i,r)});const e=o=>{if(this.pointers.delete(o.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&o.pointerId===this.drag.id){const i=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,i&&o.type==="pointerup"){const r=new _e(o.offsetX,o.offsetY),h=performance.now();if(o.pointerType!=="mouse"&&h-this.lastTap<320){this.lastTap=0,this.focusAt(r);return}this.lastTap=h;const d=this.pickWorld(r);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};a.addEventListener("pointerup",e),a.addEventListener("pointercancel",e),a.addEventListener("contextmenu",o=>o.preventDefault()),a.addEventListener("wheel",o=>{o.preventDefault(),this.tween=null;const i=o.deltaMode===1?16:o.deltaMode===2?100:1,r=o.deltaY*i;if(this.walking){this.walk(-r*.02,0);return}const h=Math.exp(Math.max(-.45,Math.min(.45,r*.0016))),d=this.pickWorld(new _e(o.offsetX,o.offsetY)),w=this.clamp(this.targetRange*h);if(d&&h<1){const M=Math.min(.45,(this.targetRange-w)/this.targetRange)*.8,g=b.subtract(d,this.targetPivot,new b),m=b.magnitude(g);if(m>1){const u=Math.min(m,this.targetRange)*M/m;b.add(this.targetPivot,b.multiplyByScalar(g,u,g),this.targetPivot)}}this.targetRange=w},{passive:!1}),a.addEventListener("dblclick",o=>{o.preventDefault(),this.focusAt(new _e(o.offsetX,o.offsetY))}),addEventListener("keydown",o=>{o.target instanceof HTMLInputElement||(this.keys.add(o.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(o.code)&&o.preventDefault())}),addEventListener("keyup",o=>this.keys.delete(o.code)),addEventListener("blur",()=>this.keys.clear())}clamp(a,e=Mo,o=Co){return Math.max(e,Math.min(o,a))}clampPitch(a){return Math.max(_t,Math.min(Ft,a))}moveHorizontal(a,e,o,i){const r=Ct.eastNorthUpToFixedFrame(a),h=new b(Math.sin(e)*o+Math.cos(e)*i,Math.cos(e)*o-Math.sin(e)*i,0);V.multiplyByPoint(r,h,a)}pan(a,e){const o=this.canvas.clientHeight||1,i=2*this.range*Math.tan(this.fov/2)/o,r=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,e*i/r,a*i),this.tween=null}walk(a,e){this.moveHorizontal(this.eyeTarget,this.wHeading,a,e),this.snapEye()}snapEye(){const a=Ge.fromCartesian(this.eyeTarget),e=this.groundHeight?.(a);e!==void 0&&Number.isFinite(e)&&(a.height=e+Ht,Ge.toCartesian(a,void 0,this.eyeTarget))}pickWorld(a){const e=this.viewer.scene;let o;if(e.pickPositionSupported&&e.pick(a,4,4)&&(o=e.pickPosition(a)),!o){const i=e.camera.getPickRay(a);i&&(o=e.globe.pick(i,e)??void 0)}return o??null}focusAt(a){const e=this.pickWorld(a);if(e){if(this.walking){b.clone(e,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:e,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(a,e=2){this.walking&&this.exitWalk(!1);const o={pivot:a.pivot??b.clone(this.targetPivot),heading:a.heading??this.targetHeading,pitch:a.pitch??this.targetPitch,range:a.range??this.targetRange};let i=o.heading;for(;i-this.targetHeading>Math.PI;)i-=Math.PI*2;for(;i-this.targetHeading<-Math.PI;)i+=Math.PI*2;if(o.heading=i,e<=.02){this.tween=null,this.targetPivot=b.clone(o.pivot),this.pivot=b.clone(o.pivot),this.heading=this.targetHeading=o.heading,this.pitch=this.targetPitch=o.pitch,this.range=this.targetRange=o.range;return}this.tween={from:{pivot:b.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:o,start:performance.now(),duration:e*1e3}}enterWalk(a){b.clone(a??this.targetPivot,this.eyeTarget),this.snapEye(),b.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(a=!0){if(!this.walking)return;this.walking=!1;const e=Ge.fromCartesian(this.eyeTarget);e.height-=Ht-1;const o=Ge.toCartesian(e);this.pivot=b.clone(o),this.targetPivot=o,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,a?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(a){if(!this.keys.size)return;const e=this.keys,o=e.has("ShiftLeft")||e.has("ShiftRight")?3:1;let i=0,r=0;(e.has("KeyW")||e.has("ArrowUp"))&&(i+=1),(e.has("KeyS")||e.has("ArrowDown"))&&(i-=1),(e.has("KeyD")||e.has("ArrowRight"))&&(r+=1),(e.has("KeyA")||e.has("ArrowLeft"))&&(r-=1);let h=0;if(e.has("KeyQ")&&(h+=1),e.has("KeyE")&&(h-=1),this.walking){h&&(this.wHeadingT-=h*1.2*a),(i||r)&&this.walk(i*4.2*o*a,r*3.4*o*a);return}if(h&&(this.targetHeading+=h*.9*a,this.tween=null),(e.has("PageUp")||e.has("Equal")||e.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*a))),(e.has("PageDown")||e.has("Minus")||e.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*a))),e.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*a)),e.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*a)),!i&&!r)return;const d=Math.max(8,this.range*.6)*o*a;this.moveHorizontal(this.targetPivot,this.heading,i*d,r*d),this.tween=null}update(a){this.updateKeys(a);const e=1-Math.exp(-this.damping*a);if(this.walking){b.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*a),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*e,this.wPitch+=(this.wPitchT-this.wPitch)*e,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const o=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),i=wo(o),{from:r,to:h}=this.tween;b.lerp(r.pivot,h.pivot,i,this.targetPivot),this.targetHeading=r.heading+(h.heading-r.heading)*i,this.targetPitch=r.pitch+(h.pitch-r.pitch)*i,this.targetRange=Math.exp(Math.log(r.range)+(Math.log(h.range)-Math.log(r.range))*i),o>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*e,this.pitch+=(this.targetPitch-this.pitch)*e,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*e),b.lerp(this.pivot,this.targetPivot,e,this.pivot),this.viewer.camera.lookAt(this.pivot,new to(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(V.IDENTITY)}}function So(){return new je({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const Gt=()=>({uAerial:{type:L.SAMPLER_2D,value:So()},uAerialRect:{type:L.VEC4,value:new Ve(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:L.FLOAT,value:0}}),Xt=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,$e=`
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
`;function To(){return new qe({uniforms:{uNight:{type:L.FLOAT,value:0},uTarde:{type:L.FLOAT,value:0},uSkyFill:{type:L.FLOAT,value:.24},uHazeAmount:{type:L.FLOAT,value:.08},uHazeStart:{type:L.FLOAT,value:1200},uHotelPisos:{type:L.FLOAT,value:99},uRevitBox:{type:L.VEC4,value:new Ve(0,0,0,0)},uLean:{type:L.VEC2,value:new _e(0,0)},...Gt()},varyings:{vPosM:he.VEC3,vUpEC:he.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:$e+Xt+`
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
    `})}function zo(t,a,e){return new qe({uniforms:{uNight:{type:L.FLOAT,value:0},uTarde:{type:L.FLOAT,value:0},uSkyFill:{type:L.FLOAT,value:.22},uHazeAmount:{type:L.FLOAT,value:.08},uHazeStart:{type:L.FLOAT,value:1200},uTime:{type:L.FLOAT,value:0},uFrame:{type:L.FLOAT,value:a},uTop:{type:L.FLOAT,value:e},uAtlas:{type:L.SAMPLER_2D,value:new je({url:t,repeat:!1,minificationFilter:dt.LINEAR_MIPMAP_LINEAR,magnificationFilter:ct.LINEAR})}},varyings:{vUV:he.VEC2,vView:he.VEC3,vRightT:he.VEC2,vUpT:he.VEC2,vUpEC:he.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:$e+`
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
    `})}function Ao(){return new qe({uniforms:{uNight:{type:L.FLOAT,value:0},uTarde:{type:L.FLOAT,value:0},uHazeAmount:{type:L.FLOAT,value:.08},uHazeStart:{type:L.FLOAT,value:1200}},lightingModel:oo.UNLIT,fragmentShaderText:$e+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function Eo(t,a,e){return new qt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:t,uNorth:a,uUp:e,uSkyZenith:new b(.16,.42,.82),uSkyHorizon:new b(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function Po(){return new qt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new b(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function Lo(t){const a=e=>({type:L.SAMPLER_2D,value:new je({url:t+e,repeat:!0,minificationFilter:dt.LINEAR_MIPMAP_LINEAR,magnificationFilter:ct.LINEAR})});return new qe({uniforms:{uNight:{type:L.FLOAT,value:0},uTarde:{type:L.FLOAT,value:0},uGroundFill:{type:L.FLOAT,value:.12},uHazeAmount:{type:L.FLOAT,value:.08},uHazeStart:{type:L.FLOAT,value:1200},uAsfalto:a("tex_asfalto.webp"),uAnden:a("tex_anden.webp"),uPrado:a("tex_prado.webp"),uCiclo:a("tex_ciclo.webp"),...Gt()},varyings:{vG:he.VEC3,vUpEC:he.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:$e+Xt+`
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
    `})}function Ro(){return new qe({uniforms:{uNight:{type:L.FLOAT,value:0},uTarde:{type:L.FLOAT,value:0},uSkyFill:{type:L.FLOAT,value:.24},uHazeAmount:{type:L.FLOAT,value:.08},uHazeStart:{type:L.FLOAT,value:1200}},varyings:{vPosM:he.VEC3,vUpEC:he.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:$e+`
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
    `})}function Tt(){return Ct.eastNorthUpToFixedFrame(b.fromDegrees(nt.longitude,nt.latitude,nt.height))}function Oe(t,a,e,o=Tt()){return V.multiplyByPoint(o,new b(t,a,e),new b)}const Io={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function _o(t,a,e){let o=!1;for(let i=0,r=e.length-1;i<e.length;r=i++){const[h,d]=e[i],[w,M]=e[r];d>a!=M>a&&t<(w-h)*(a-d)/(M-d)+h&&(o=!o)}return o}function Fo(t,a,e){let o=1/0;for(let i=0,r=e.length-1;i<e.length;r=i++){const[h,d]=e[r],[w,M]=e[i],g=w-h,m=M-d,u=Math.max(0,Math.min(1,((t-h)*g+(a-d)*m)/(g*g+m*m||1)));o=Math.min(o,Math.hypot(t-h-u*g,a-d-u*m))}return o}async function Ho(t,a,e){const o=t.scene,i=Tt(),r=V.inverseTransformation(i,new V),h=He.secciones;a("Contexto urbano",.08);const[d,w,M,g]=await Promise.all([fetch(h+"recorte.json").then(l=>l.json()),fetch(h+"edificios.json").then(l=>l.json()),fetch(h+"arboles.json").then(l=>l.json()),fetch(h+"suelo.json").then(l=>l.json())]),m=()=>d.clips.map(l=>{const C=new io({positions:b.fromDegreesArray(l.flat())}),le=C.computeRectangle();return C.computeRectangle=n=>no.clone(le,n),C});o.globe.clippingPolygons=new Lt({polygons:m()});const u=Ao();let y=null;try{y=await ao.fromUrl(He.googleTiles,{maximumScreenSpaceError:10,shadows:xe.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),y.clippingPolygons=new Lt({polygons:m()}),y.customShader=u,o.primitives.add(y)}catch(l){console.warn("Tiles de Google no disponibles",l)}const v=[-236,330],k=[];for(const l of w.secciones){const C=l.key==="Hotel";k.push({key:l.key,file:C?"hotel_fachadas.glb":l.file,kind:C?"cubierta_pbr":"edificios",label:C?"Hotel La Fontana 3D":`Edificaciones · sector ${l.key}`,dist:C?-2:Math.hypot(l.c[0]-v[0],l.c[1]-v[1])})}k.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),k.push({key:"hotel_plazoleta",file:"hotel_plazoleta.glb",kind:"cubierta_pbr",label:"Plazoleta y acceso · Hotel",dist:-.8}),k.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),k.sort((l,C)=>l.dist-C.dist);const U={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},p=g.secciones.map(l=>({key:l.key,file:l.file,kind:"suelo",capa:U[l.key]?.[0]??0,label:U[l.key]?.[1]??l.key,dist:-3})),E=M.secciones.map(l=>({key:l.key,file:l.file,kind:"arboles",atlas:l.atlas,marco:l.marco,marcoSup:l.marcoSup,label:Io[l.key]??"Vegetación",dist:0})),T=[...p,...k.slice(0,4),...E.slice(0,3),...k.slice(4,9),...E.slice(3),...k.slice(9)],x=To(),S=Ro(),R=Lo(h),X=(async()=>{try{const l=await Yt.fromAssetId(He.imageryAssetId),C=18,le=l.tilingScheme,n=(B,J)=>Ge.fromCartesian(Oe(B,J,0,i)),s=le.positionToTileXY(n(-1010,930),C),f=le.positionToTileXY(n(1010,-940),C),c=f.x-s.x+1,z=f.y-s.y+1,A=l.tileWidth,F=document.createElement("canvas");F.width=c*A,F.height=z*A;const _=F.getContext("2d"),I=[];for(let B=s.y;B<=f.y;B++)for(let J=s.x;J<=f.x;J++)I.push([J,B]);const j=async([B,J])=>{for(let Pe=0;Pe<40;Pe++){const we=l.requestImage(B,J,C);if(we){try{const Ce=await we,Le=(B-s.x)*A,Pt=(J-s.y)*A;typeof ImageBitmap<"u"&&Ce instanceof ImageBitmap?(_.save(),_.translate(Le,Pt+A),_.scale(1,-1),_.drawImage(Ce,0,0,A,A),_.restore()):_.drawImage(Ce,Le,Pt,A,A)}catch{}return}await new Promise(Ce=>setTimeout(Ce,120))}};_.fillStyle="#6a6f62",_.fillRect(0,0,F.width,F.height);const ne=Array.from({length:6},async()=>{for(;I.length;)await j(I.shift())});await Promise.all(ne);const K=document.createElement("canvas");K.width=K.height=4096,K.getContext("2d").drawImage(F,0,0,4096,4096);const ce=await new Promise(B=>K.toBlob(B,"image/jpeg",.92));if(!ce)return;const Ae=URL.createObjectURL(ce);window.__AERIAL_URL__=Ae;const Ee=le.tileXYToRectangle(s.x,s.y,C),O=le.tileXYToRectangle(f.x,f.y,C),ee=(B,J)=>V.multiplyByPoint(r,b.fromRadians(B,J,nt.height),new b),W=ee(Ee.west,O.south),te=ee(O.east,Ee.north),se=new Ve(W.x,W.y,te.x,te.y);for(const B of[x,R])B.setUniform("uAerial",new je({url:Ae,repeat:!1,minificationFilter:dt.LINEAR_MIPMAP_LINEAR,magnificationFilter:ct.LINEAR})),B.setUniform("uAerialRect",se),B.setUniform("uAerialOn",1)}catch(l){console.warn("Foto aérea no disponible",l)}})(),G=[],Q=[];let ae=0,Te=0,ie=.22,fe=.08,re=1200;const me={total:T.length,loaded:0,failed:[]},Ye=async l=>{try{const C=await Xe.fromGltfAsync({url:h+l.file,modelMatrix:i,upAxis:ge.Y,forwardAxis:ge.X,shadows:l.kind==="arboles"?xe.CAST_ONLY:l.kind==="suelo"?xe.RECEIVE_ONLY:xe.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:l.kind!=="arboles"});if(l.kind==="suelo")C.customShader=R;else if(l.kind==="arboles"){const n=zo(h+l.atlas,l.marco,l.marcoSup);n.setUniform("uNight",ae),n.setUniform("uTarde",Te),n.setUniform("uSkyFill",ie),n.setUniform("uHazeAmount",fe),n.setUniform("uHazeStart",re),G.push(n),C.customShader=n}else l.key==="Hotel"||l.key==="hotel_plazoleta"||l.key==="hotel_cubiertas"?C.customShader=S:l.kind!=="cubierta_pbr"&&(C.customShader=x);const le=l.key==="Hotel"||l.key==="hotel_plazoleta"||l.key==="hotel_cubiertas";C.imageBasedLighting.imageBasedLightingFactor=le?new _e(1,.75):l.kind==="cubierta_pbr"?new _e(.85,.55):new _e(.68,.38),o.primitives.add(C),l.kind==="arboles"&&Q.push(C),await new Promise(n=>{if(C.ready)return n();const s=C.readyEvent.addEventListener(()=>{s(),n()});setTimeout(n,2e4)})}catch(C){console.error("Sección no cargada",l.file,C),me.failed.push(l.file)}me.loaded++,e?.(me.loaded,me.total,l.label)},ze=p.length+7;for(let l=0;l<Math.min(ze,T.length);l++)a(T[l].label,.2+.75*l/ze),await Ye(T[l]);const ft=(async()=>{for(let l=ze;l<T.length;l++)await Ye(T[l]),await new Promise(C=>setTimeout(C,60));await X})();return{matrix:i,inverse:r,tileset:y,buildings:w.edificios,treeCount:M.total,sections:me,done:ft,setNight(l){u.setUniform("uNight",l),x.setUniform("uNight",l),S.setUniform("uNight",l),ae=l,R.setUniform("uNight",l);for(const C of G)C.setUniform("uNight",l)},setTarde(l){u.setUniform("uTarde",l),x.setUniform("uTarde",l),S.setUniform("uTarde",l),Te=l,R.setUniform("uTarde",l);for(const C of G)C.setUniform("uTarde",l)},setTime(l){for(const C of G)C.setUniform("uTime",l)},setLook(l){if(l.skyFill!==void 0){ie=l.skyFill,x.setUniform("uSkyFill",ie),S.setUniform("uSkyFill",ie);for(const C of G)C.setUniform("uSkyFill",ie)}if(l.groundFill!==void 0&&R.setUniform("uGroundFill",l.groundFill),l.hazeAmount!==void 0){fe=l.hazeAmount,x.setUniform("uHazeAmount",fe),S.setUniform("uHazeAmount",fe),R.setUniform("uHazeAmount",fe),u.setUniform("uHazeAmount",fe);for(const C of G)C.setUniform("uHazeAmount",fe)}if(l.hazeStart!==void 0){re=l.hazeStart,x.setUniform("uHazeStart",re),S.setUniform("uHazeStart",re),R.setUniform("uHazeStart",re),u.setUniform("uHazeStart",re);for(const C of G)C.setUniform("uHazeStart",re)}},setRevitZone(l){x.setUniform("uRevitBox",l?new Ve(l[0]-1,l[1]-1,l[2]+1,l[3]+1):new Ve(0,0,0,0))},setHotelFloors(l){x.setUniform("uHotelPisos",l)},setTreesVisible(l){for(const C of Q)C.show=l},buildingAt(l){const C=V.multiplyByPoint(r,l,new b);let le=null,n=1.2;for(const s of w.edificios){if(C.x<s.bb[0]-1.5||C.x>s.bb[2]+1.5||C.y<s.bb[1]-1.5||C.y>s.bb[3]+1.5||C.z>s.b+s.h+2.5)continue;if(_o(C.x,C.y,s.r))return s;const f=Fo(C.x,C.y,s.r);f<n&&(n=f,le=s)}return le}}}const No=D.fromCssColorString("#ff2b1a"),Oo=D.fromCssColorString("#ffc400"),Do=D.fromCssColorString("#00e862"),De=D.fromCssColorString("#1a1d22");function vt(t){const a=document.createElement("canvas");a.width=128,a.height=128;const e=a.getContext("2d");if(e.clearRect(0,0,128,128),t==="pare"){e.beginPath();for(let o=0;o<8;o++){const i=(o+.5)*Math.PI/4,r=64+Math.cos(i)*58,h=64+Math.sin(i)*58;o===0?e.moveTo(r,h):e.lineTo(r,h)}e.closePath(),e.fillStyle="#c81e1e",e.fill(),e.lineWidth=5,e.strokeStyle="#ffffff",e.stroke(),e.fillStyle="#ffffff",e.font="bold 31px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("PARE",64,66)}else t==="peaton"?(e.beginPath(),e.moveTo(64,6),e.lineTo(122,64),e.lineTo(64,122),e.lineTo(6,64),e.closePath(),e.fillStyle="#f5b800",e.fill(),e.lineWidth=4,e.strokeStyle="#18181b",e.stroke(),e.fillStyle="#18181b",e.beginPath(),e.arc(64,38,7,0,Math.PI*2),e.fill(),e.fillRect(59,47,10,22),e.fillRect(54,69,7,20),e.fillRect(67,69,7,20)):(e.beginPath(),e.arc(64,64,56,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.lineWidth=11,e.strokeStyle="#c81e1e",e.stroke(),e.fillStyle="#111827",e.font="bold 46px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("30",64,67));return a.toDataURL("image/png")}function Uo(t,a,e,o,i){const r=(p,E,T)=>V.multiplyByPoint(a,new b(p,E,T),new b),h=[],d=e+7.2,w=o+7.2,M=i(d,w),g=D.fromCssColorString("#2a303a"),m=D.fromCssColorString("#14171c"),u=D.fromCssColorString("#eab308"),y=(p,E,T,x)=>{const S=x?.42:.3,R=x?.3:.42;h.push(t.entities.add({position:r(p,E,T),box:{dimensions:new b(S,R,1.18),material:m}}));const X=(ie,fe)=>{const re=t.entities.add({position:r(p,E,T+ie),box:{dimensions:new b(x?.24:.33,x?.33:.24,.24),material:fe}});return h.push(re),re},G=X(.36,De),Q=X(0,De),ae=X(-.36,De);return{red:G,yellow:Q,green:ae,setState:ie=>{G.box.material=new Je(ie==="red"?No:De),Q.box.material=new Je(ie==="yellow"?Oo:De),ae.box.material=new Je(ie==="green"?Do:De)}}};if(Math.abs(e+148.8)<12&&Math.abs(o-216.3)<12){const p=[{px:-159.5,py:232,dx:4.2,dy:0,isNS:!0},{px:-163.5,py:226.5,dx:0,dy:-4,isNS:!1},{px:-163,py:203,dx:0,dy:4,isNS:!1},{px:-133.5,py:231.5,dx:4.2,dy:0,isNS:!0},{px:-133,py:202.5,dx:0,dy:4,isNS:!1}],E=[],T=[];for(const S of p){const R=i(S.px,S.py);h.push(t.entities.add({position:r(S.px,S.py,R+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:g}}),t.entities.add({position:r(S.px,S.py,R+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:u}}),t.entities.add({position:r(S.px+S.dx*.5,S.py+S.dy*.5,R+5.65),box:{dimensions:new b(Math.max(.14,Math.abs(S.dx)),Math.max(.14,Math.abs(S.dy)),.14),material:g}}));const X=y(S.px+S.dx*.78,S.py+S.dy*.78,R+5.1,S.isNS);(S.isNS?E:T).push(X)}const x=S=>({red:S[0].red,yellow:S[0].yellow,green:S[0].green,setState:R=>{for(const X of S)X.setState(R)}});return{ns:x(E),ew:x(T),setVisible(S){for(const R of h)R.show=S}}}h.push(t.entities.add({position:r(d,w,M+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:g}}),t.entities.add({position:r(d,w,M+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:u}}));const v=4.6;h.push(t.entities.add({position:r(d-v*.5,w,M+5.65),box:{dimensions:new b(v,.14,.14),material:g}}),t.entities.add({position:r(d,w-v*.5,M+5.65),box:{dimensions:new b(.14,v,.14),material:g}}));const k=y(d-3.4,w,M+5.1,!0),U=y(d,w-3.4,M+5.1,!1);return{ns:k,ew:U,setVisible(p){for(const E of h)E.show=p}}}function Bo(t,a,e,o,i){const r=(p,E,T)=>V.multiplyByPoint(a,new b(p,E,T),new b),h=[],d=Rt.fromColor(D.fromCssColorString("#f3f4f6").withAlpha(.92)),w=Rt.fromColor(D.fromCssColorString("#f5b800").withAlpha(.92)),M=(p,E,T,x,S,R)=>{if(o(p,E)<.8)return;const X=i(p,E)+.07;r(p,E,X);const G=Mt.fromRotationZ(S),Q=V.fromRotationTranslation(G,new b(p,E,X)),ae=V.multiply(a,Q,new V);h.push(new co({geometry:uo.fromDimensions({dimensions:new b(T,x,.04)}),modelMatrix:ae,attributes:{color:R}}))},g=Math.atan2(-51,380);for(const p of e){if(Math.abs(p.e+148.8)<12&&Math.abs(p.n-216.3)<12){const T=[{bx:-154,by:230,horiz:!0,ang:0},{bx:-164.5,by:221.5,horiz:!1,ang:g},{bx:-164.5,by:210.5,horiz:!1,ang:g},{bx:-154,by:202.5,horiz:!0,ang:0},{bx:-129,by:229,horiz:!1,ang:g},{bx:-128.5,by:211.5,horiz:!1,ang:g},{bx:-136.5,by:202.5,horiz:!0,ang:0}];for(const x of T)for(let S=-3;S<=3;S++){const R=x.horiz?x.bx+S*1.1:x.bx,X=x.horiz?x.by:x.by+S*1.05;M(R,X,x.horiz?.52:2.8,x.horiz?2.8:.52,x.ang,d)}continue}const E=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const T of E){const x=p.e+T.de,S=p.n+T.dn;if(o(x,S)<1.2)continue;for(let G=-3;G<=3;G++){const Q=T.horiz?x+G*1.15:x,ae=T.horiz?S:S+G*1.15;M(Q,ae,T.horiz?.52:2.8,T.horiz?2.8:.52,0,d)}const R=x+(T.de===0?0:Math.sign(T.de)*2.1),X=S+(T.dn===0?0:Math.sign(T.dn)*2.1);M(R,X,T.horiz?6.8:.42,T.horiz?.42:6.8,0,d)}}for(let p=-80;p<=440;p+=8)M(-154,p,.18,3.2,0,d),M(-132,p,.18,3.2,0,d);for(let p=-420;p<=160;p+=8){const E=263-(p+420)*.13421052631578947;M(p,E+7.5,3.2,.18,g,d),M(p,E-7.5,3.2,.18,g,d),M(p,E,4.5,.18,g,w)}for(let p=-160;p<=360;p+=8)M(158,p,.18,3.2,0,d);let m=null;h.length>0&&(m=new so({geometryInstances:h,appearance:new ro({flat:!0,translucent:!0}),asynchronous:!1}),t.scene.primitives.add(m));const u=[],y=vt("pare"),v=vt("peaton"),k=vt("vel30"),U=D.fromCssColorString("#9ca3af");return e.forEach((p,E)=>{const T=[{e:p.e-7.2,n:p.n-7.2,tex:y},{e:p.e+7.2,n:p.n-7.2,tex:E%2===0?v:k}];for(const x of T){const S=i(x.e,x.n);u.push(t.entities.add({position:r(x.e,x.n,S+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:U}}),t.entities.add({position:r(x.e,x.n,S+2.45),billboard:{image:x.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:lo.CENTER}}))}}),{setVisible(p){m&&(m.show=p);for(const E of u)E.show=p}}}function Vo(t,a){const e=(k,U,p)=>V.multiplyByPoint(a,new b(k,U,p),new b),o=[],d=D.fromCssColorString("#7a7771"),w=D.fromCssColorString("#3d3833"),M=D.fromCssColorString("#24471b"),g=D.fromCssColorString("#3d7f8f").withAlpha(.88),m=D.fromCssColorString("#ffbe55");o.push(t.entities.add({position:e(-225,263.5,4.17+.32),cylinder:{length:.64,topRadius:3.3,bottomRadius:3.6,material:d,slices:12}}),t.entities.add({position:e(-225,263.5,4.17+.56),cylinder:{length:.24,topRadius:3.45,bottomRadius:3.55,material:M,slices:12}}),t.entities.add({position:e(-225,263.5,4.17+.66),cylinder:{length:.08,topRadius:2.95,bottomRadius:2.95,material:g,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+1.35),cylinder:{length:1.9,topRadius:.34,bottomRadius:.48,material:w}}),t.entities.add({position:e(-225,263.5,4.17+1.35),cylinder:{length:.18,topRadius:1.95,bottomRadius:1.55,material:w,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+2.2),cylinder:{length:.16,topRadius:1.15,bottomRadius:.85,material:w,slices:24}}));let u=0;const y=new Je(new It(()=>{const k=.62+.18*Math.sin(u*7);return D.fromCssColorString("#d9f4ff").withAlpha(k)},!1)),v=new Je(new It(()=>{const k=.46+.16*Math.cos(u*5.5);return D.fromCssColorString("#bce8f7").withAlpha(k)},!1));o.push(t.entities.add({position:e(-225,263.5,4.17+2.85),cylinder:{length:1.25,topRadius:.08,bottomRadius:.36,material:y,slices:16}}),t.entities.add({position:e(-225,263.5,4.17+1.78),cylinder:{length:.85,topRadius:1.08,bottomRadius:1.22,material:v,slices:24}}),t.entities.add({position:e(-225,263.5,4.17+1.02),cylinder:{length:.72,topRadius:1.88,bottomRadius:2.08,material:v,slices:24}}));for(let k=-246;k<=-202;k+=8.5)o.push(t.entities.add({position:e(k,255.8,4.17+1.1),cylinder:{length:2.2,topRadius:.04,bottomRadius:.05,material:w}}),t.entities.add({position:e(k,255.8,4.17+2.3),ellipsoid:{radii:new b(.16,.16,.22),material:m}}));return{update(k){u=k},setVisible(k){for(const U of o)U.show=k}}}const tt=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Nt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],Ot=3.2;async function jo(t,a,e=110){const o=He.secciones;let i,r,h;try{i=await fetch(o+"vias_campo.json").then(s=>s.json());const n=new Uint8Array(await fetch(o+"vias_campo.bin").then(s=>s.arrayBuffer()));r=n.subarray(0,i.w*i.h),h=n.subarray(i.w*i.h)}catch{return null}const{cell:d,x0:w,y0:M,w:g,h:m}=i,u=(n,s)=>{const f=(n-w)/d-.5,c=(s-M)/d-.5,z=Math.floor(f),A=Math.floor(c);if(z<0||A<0||z>=g-1||A>=m-1)return 0;const F=f-z,_=c-A,I=A*g+z;return((r[I]*(1-F)+r[I+1]*F)*(1-_)+(r[I+g]*(1-F)+r[I+g+1]*F)*_)*.5},y=(n,s)=>{const f=Math.max(0,Math.min(g-1,Math.floor((n-w)/d))),c=Math.max(0,Math.min(m-1,Math.floor((s-M)/d))),z=c*g+f;if(r[z]>0)return h[z]*.1-2;let A=0,F=0;for(let _=-2;_<=2;_++){const I=c+_;if(!(I<0||I>=m))for(let j=-2;j<=2;j++){const ne=f+j;if(ne<0||ne>=g)continue;const K=I*g+ne;if(r[K]===0)continue;const ce=1/(j*j+_*_+.5);A+=ce,F+=(h[K]*.1-2)*ce}}return A>0?F/A:1},v=[],k=[],U=[];for(let n=2;n<m-2;n++)for(let s=2;s<g-2;s++){const f=n*g+s,c=w+(s+.5)*d,z=M+(n+.5)*d,A=Math.hypot(c+180,z-250);if(A>520)continue;const F=r[f]*.5;if(F>=2.6&&F<=5&&v.push(f),F>=6&&A<460&&U.push({e:c,n:z,d:F}),r[f]===0&&A<430){let _=!1;for(let I=-2;I<=2&&!_;I++)for(let j=-2;j<=2;j++)if(r[(n+I)*g+(s+j)]>0){_=!0;break}_&&k.push(f)}}if(!v.length)return null;U.sort((n,s)=>s.d-n.d);const p=[];for(const n of U){if(p.length>=6)break;if(p.some(c=>Math.hypot(c.e-n.e,c.n-n.n)<90))continue;const s=y(n.e,n.n),f=Uo(t,a,n.e,n.n,y);f.ns.setState("green"),f.ew.setState("red"),p.push({e:n.e,n:n.n,u:s,faseOffset:p.length*4.5,rig:f,nsEstado:"green",ewEstado:"red"})}const E=Bo(t,a,p,u,y),T=Vo(t,a),x=(()=>{let n=12345;return()=>(n=n*1664525+1013904223>>>0)/4294967296})(),S=(n,s,f)=>{const c=Math.cos(f),z=Math.sin(f);if(n>=-168&&n<=-118&&Math.abs(z)>.35)return n<-143?z<-.2?12:-1e6:z>.2?12:-1e6;const A=263-(n+420)*(51/380);return Math.abs(s-A)<26&&Math.abs(c)>.35?s>A?c>.2?12:-1e6:c<-.2?12:-1e6:n>=-255&&n<=-210&&s<222&&Math.abs(z)>.35?z<-.2?10:-1e6:s<175&&n<-215&&Math.abs(c)>.35?c>.2?10:-1e6:n<-385&&s<265&&Math.abs(z)>.35?z<-.2?10:-1e6:0},R=[],X=(n,s,f)=>R.some(c=>c!==f&&Math.hypot(c.e-n,c.n-s)<8.5),G=n=>{for(let s=0;s<45;s++){const f=v[Math.floor(x()*v.length)],c=w+(f%g+.5)*d,z=M+(Math.floor(f/g)+.5)*d;if(X(c,z,n))continue;let A=0,F=-1e9;for(let _=0;_<16;_++){const I=_/16*Math.PI*2,j=c+Math.cos(I)*10,ne=z+Math.sin(I)*10,K=u(j,ne),ce=S(j,ne,I);if(ce<-1e4)continue;const Ae=u(c+Math.sin(I)*2.5,z-Math.cos(I)*2.5),Ee=u(c-Math.sin(I)*2.5,z+Math.cos(I)*2.5),O=-Math.abs(K-Ot)+(Ee>Ae?1.5:0)+ce;K>1.5&&O>F&&(F=O,A=I)}if(F>-1e8){n.e=c,n.n=z,n.th=A,n.vActual=n.v*.5;return}}};for(let n=0;n<e;n++){const s=x(),f=s<.12?"sitp_azul":s<.2?"sitp_amarillo":s<.38?"taxi":s<.54?"moto":s<.68?"hatch":s<.84?"suv":"sedan",A={e:0,n:0,th:0,v:f==="moto"?8+x()*4.5:f==="sitp_azul"||f==="sitp_amarillo"?5.2+x()*3:6.5+x()*5,vActual:0,model:null,u:0,tipo:f};G(A),R.push(A)}const Q=[];if(k.length>0)for(let n=0;n<42;n++){const s=k[Math.floor(x()*k.length)],f=w+(s%g+.5)*d,c=M+(Math.floor(s/g)+.5)*d;Q.push({e:f,n:c,th:x()*Math.PI*2,v:1.15+x()*.45,model:null,u:y(f,c)+.16,conPerro:n%3===0})}const ae=[],Te=(n,s,f,c,z,A,F,_=.68)=>{for(let I=0;I<z;I++){const j=z===1?(n+s)*.5:n+I/(z-1)*(s-n);for(let ne=0;ne<A;ne++){if(x()>_)continue;const K=A===1?(f+c)*.5:f+ne/(A-1)*(c-f);if(u(j,K)>.3)continue;const ce=x(),Ae=ce<.08?"taxi":ce<.42?"suv":"sedan",Ee=x()<.5?0:Math.PI,O=y(j,K);ae.push({e:j+(x()-.5)*.25,n:K+(x()-.5)*.25,u:O>-1.5?O:3.55,th:F+Ee+(x()-.5)*.07,tipo:Ae,model:null})}}};Te(92,134,-22,62,4,15,.05,.7),Te(52,108,114,146,5,4,.12,.62),Te(58,106,-104,-56,4,6,.1,.65),Te(-132,-98,-46,32,3,12,.04,.68);const ie=new b,fe=new Mt,re=new V,me=(n,s=.08)=>{n.model&&(b.fromElements(n.e,n.n,n.u+s,ie),Mt.fromRotationZ(n.th,fe),V.fromRotationTranslation(fe,ie,re),n.model.modelMatrix=V.multiply(a,re,new V))},Ye={sedan:"carro.glb",suv:"carro_suv.glb",hatch:"carro_hatch.glb",taxi:"carro_taxi.glb",moto:"carro_moto.glb",sitp_azul:"sitp_azul.glb",sitp_amarillo:"sitp_amarillo.glb"},ze=n=>n==="taxi"||n==="sitp_azul"||n==="sitp_amarillo",ft=(async()=>{for(let n=0;n<R.length;n++){const s=R[n],f=Ye[s.tipo];try{const c=await Xe.fromGltfAsync({url:o+f,upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,color:ze(s.tipo)?D.WHITE:D.fromCssColorString(tt[n%tt.length]),colorBlendMode:mt.MIX,colorBlendAmount:ze(s.tipo)?0:.32});t.scene.primitives.add(c),s.model=c,s.u=y(s.e,s.n),me(s)}catch{}n%6===5&&await new Promise(c=>setTimeout(c,35))}for(let n=0;n<Q.length;n++){const s=Q[n];try{const f=await Xe.fromGltfAsync({url:o+(s.conPerro?"persona_perro.glb":"persona.glb"),upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,color:D.fromCssColorString(Nt[n%Nt.length]),colorBlendMode:mt.MIX,colorBlendAmount:.25});t.scene.primitives.add(f),s.model=f,me(s,0)}catch{}n%6===5&&await new Promise(f=>setTimeout(f,35))}for(let n=0;n<ae.length;n++){const s=ae[n],f=Ye[s.tipo];try{const c=await Xe.fromGltfAsync({url:o+f,upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,color:ze(s.tipo)?D.WHITE:D.fromCssColorString(tt[n*3%tt.length]),colorBlendMode:mt.MIX,colorBlendAmount:ze(s.tipo)?0:.32});t.scene.primitives.add(c),s.model=c,me(s)}catch{}n%8===7&&await new Promise(c=>setTimeout(c,30))}})();let l=!0,C=0;const le=(n,s)=>u(n,s)===0&&u(n+4,s)+u(n-4,s)+u(n,s+4)+u(n,s-4)>.5;return{ready:ft,count:e,debug:()=>R.map(n=>[Math.round(n.e),Math.round(n.n),+n.u.toFixed(1),n.model?1:0]),setVisible(n){l=n;for(const s of R)s.model&&(s.model.show=n);for(const s of ae)s.model&&(s.model.show=n);for(const s of Q)s.model&&(s.model.show=n);for(const s of p)s.rig.setVisible(n);E.setVisible(n),T.setVisible(n)},update(n){if(!l)return;const s=Math.min(.08,Math.max(.001,n));C+=s,T.update(C);for(const f of p){const c=(C+f.faseOffset)%24,z=c<10?"green":c<12?"yellow":"red",A=c>=12&&c<22?"green":c>=22?"yellow":"red";z!==f.nsEstado&&(f.nsEstado=z,f.rig.ns.setState(z)),A!==f.ewEstado&&(f.ewEstado=A,f.rig.ew.setState(A))}for(let f=0;f<R.length;f++){const c=R[f];if(!c.model)continue;let z=0,A=-1e9;for(let O=-4;O<=4;O++){const ee=O*.13,W=c.th+ee,te=c.e+Math.cos(W)*9,se=c.n+Math.sin(W)*9,B=u(te,se);if(B<1.1||u(c.e+Math.cos(W)*4.5,c.n+Math.sin(W)*4.5)<.9)continue;const Pe=S(te,se,W);if(Pe<-1e4)continue;const we=u(te+Math.sin(W)*2.5,se-Math.cos(W)*2.5),Ce=u(te-Math.sin(W)*2.5,se+Math.cos(W)*2.5),Le=-Math.abs(Math.min(B,6)-Ot)-Math.abs(ee)*1.6+(Ce>=we?.6:0)+Pe;Le>A&&(A=Le,z=ee)}if(A<-1e8||Math.hypot(c.e+180,c.n-250)>580){G(c),c.u=y(c.e,c.n),me(c);continue}const F=Math.cos(c.th),_=Math.sin(c.th);let I=1;const j=c.tipo==="sitp_azul"||c.tipo==="sitp_amarillo",ne=j?9.5:6.4,K=j?16.5:12.5;for(let O=0;O<R.length;O++){if(O===f||!R[O].model)continue;const ee=R[O],W=ee.e-c.e,te=ee.n-c.n,se=W*W+te*te;if(se>320)continue;const B=ee.tipo==="sitp_azul"||ee.tipo==="sitp_amarillo",J=ne+(B?3:0),Pe=K+(B?3:0),we=W*F+te*_,Ce=Math.abs(-W*_+te*F);if(we>0&&we<Pe&&Ce<2.45){const Le=we<J?0:(we-J)/(Pe-J);Le<I&&(I=Le)}else se<(j||B?42:22)&&O<f&&(I=0)}const ce=Math.abs(F)>Math.abs(_);for(const O of p){if((ce?O.ewEstado:O.nsEstado)==="green")continue;const W=O.e-c.e,te=O.n-c.n,se=W*F+te*_,B=Math.abs(-W*_+te*F);if(se>7&&se<21&&B<9){const J=se<10.5?0:(se-10.5)/10.5;J<I&&(I=J)}}const Ae=1-Math.min(.55,Math.abs(z)*1.4),Ee=c.v*Ae*I;if(c.vActual+=(Ee-c.vActual)*Math.min(1,s*4.5),c.vActual>.05){c.th+=Math.max(-1.4*s,Math.min(1.4*s,z));const O=c.e+Math.cos(c.th)*c.vActual*s,ee=c.n+Math.sin(c.th)*c.vActual*s;u(O,ee)>=.7?(c.e=O,c.n=ee):c.th+=.6;const W=Math.max(y(c.e,c.n),y(c.e+Math.cos(c.th)*1.4,c.n+Math.sin(c.th)*1.4),y(c.e-Math.cos(c.th)*1.4,c.n-Math.sin(c.th)*1.4));c.u+=(W-c.u)*Math.min(1,s*8)}me(c)}for(const f of Q){if(!f.model)continue;const c=f.e+Math.cos(f.th)*f.v*s,z=f.n+Math.sin(f.th)*f.v*s;le(c,z)&&Math.hypot(c+180,z-250)<430?(f.e=c,f.n=z,f.u+=(y(f.e,f.n)+.16-f.u)*Math.min(1,s*4)):f.th+=.9+x()*1.2,me(f,0)}}}}async function Dt(t,a){try{const e=new Image;e.decoding="async",e.src=t,await e.decode();const o=document.createElement("canvas");o.width=e.naturalWidth,o.height=e.naturalHeight;const i=o.getContext("2d");i.drawImage(e,0,0);const r=i.getImageData(0,0,o.width,o.height);return new je({typedArray:new Uint8Array(r.data.buffer),width:o.width,height:o.height,repeat:!0,minificationFilter:dt.LINEAR_MIPMAP_LINEAR,magnificationFilter:ct.LINEAR})}catch{return new je({typedArray:new Uint8Array([...a,255]),width:1,height:1})}}function Wo(t,a){return new qe({uniforms:{uNight:{type:L.FLOAT,value:0},uLadrillo:{type:L.SAMPLER_2D,value:t},uTeja:{type:L.SAMPLER_2D,value:a}},varyings:{vRP:he.VEC3,vRN:he.VEC3},vertexShaderText:`
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
    `})}async function qo(t,a){const e=He.secciones;let o;try{o=await fetch(e+"revit.json").then(u=>u.json())}catch{return null}const[i,r]=await Promise.all([Dt(e+"tex_ladrillo.webp",[107,84,76]),Dt(e+"tex_teja.webp",[90,52,28])]),h=Wo(i,r),d=[];for(const u of o.niveles)try{const y=await Xe.fromGltfAsync({url:e+u.file,modelMatrix:a,upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,backFaceCulling:!1,show:!1});y.customShader=h,y.imageBasedLighting.imageBasedLightingFactor=new _e(.45,.25),t.scene.primitives.add(y),d.push({...u,model:y,off:0,target:0,delay:0,shown:!1})}catch(y){console.warn("Nivel de Revit no cargado",u.file,y)}if(!d.length)return null;const w=46,M=new V,g=u=>{const y=V.fromTranslation(new b(0,0,u.off),M);u.model.modelMatrix=V.multiply(a,y,new V)},m={niveles:d.map(u=>({i:u.i,nombre:u.nombre})),caja:o.caja,ready:!0,visible:!1,abierto:-1,play(){m.visible=!0,m.abierto=-1;const u=performance.now();d.forEach((y,v)=>{y.off=w,y.target=0,y.delay=u+v*620,y.shown=!1,y.model.show=!1,g(y)})},openAt(u){m.visible=!0,m.abierto=u;const y=performance.now();let v=0;for(const k of[...d].reverse())k.i>u&&(k.target=w,k.delay=y+v++*110);for(const k of d)k.i<=u&&(k.target=0,k.delay=y,k.shown||(k.off=w))},full(){m.visible=!0,m.abierto=-1;const u=performance.now();d.forEach((y,v)=>{(y.target!==0||!y.shown)&&(y.target=0,y.delay=u+v*110,y.shown||(y.off=w))})},hide(){m.visible=!1,m.abierto=-1;for(const u of d)u.model.show=!1,u.shown=!1,u.off=0,u.target=0},setNight(u){h.setUniform("uNight",u)},update(u,y){if(m.visible)for(const v of d){if(y<v.delay)continue;v.target===0&&!v.shown&&(v.shown=!0,v.model.show=!0);const k=v.target-v.off;if(Math.abs(k)<.01){v.off!==v.target&&(v.off=v.target,g(v)),v.target!==0&&v.shown&&(v.shown=!1,v.model.show=!1);continue}const U=v.target===0?1-Math.exp(-5.2*u):1-Math.exp(-4*u);v.off+=k*U,g(v)}}};return m}function Yo(t,a){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);const o=document.createElement("aside");o.className="pisos",o.hidden=!0,o.innerHTML="<small>Pisos · modelo Revit</small>";const i=new Map,r=(d,w,M)=>{const g=document.createElement("button");g.innerHTML=`${w}<span>${M}</span>`,g.addEventListener("click",()=>a(d)),i.set(d,g),o.appendChild(g)};r(-1,"Edificio completo","");for(const d of[...t.niveles].reverse())r(d.i,d.nombre.charAt(0)+d.nombre.slice(1).toLowerCase(),`N${d.i+1}`);document.body.appendChild(o);const h=d=>i.forEach((w,M)=>w.classList.toggle("on",M===d));return h(-1),{show:d=>{o.hidden=!d},mark:h}}const ot={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function yt(t){const a=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(!a)return[1,1,1];const e=parseInt(a[1],16);return[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}const Go=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function Xo(t){const a={dia:{...ot.dia},tarde:{...ot.tarde},noche:{...ot.noche}};let e="dia";const o=document.createElement("button");o.id="btnLookStudio",o.className="look-toggle",o.textContent="⚙ Ajustar luz",o.title="Abrir editor de iluminación y color (L)",document.body.appendChild(o);const i=document.createElement("aside");i.id="lookPanel",i.className="look-panel",i.hidden=!0,i.innerHTML=`
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
  `,document.body.appendChild(i);const r=i.querySelector("#lpBody"),h=new Map;for(const m of Go){const u=document.createElement("section");u.className="lp-sec";const y=document.createElement("h4");y.textContent=m.title,u.appendChild(y);for(const v of m.items){const k=document.createElement("label");k.className="lp-row";const U=document.createElement("span");U.className="lp-lbl",U.textContent=v.label,k.appendChild(U);const p=document.createElement("input");p.type=v.type,v.type==="range"&&(p.min=String(v.min),p.max=String(v.max),p.step=String(v.step));const E=v.type==="range"?document.createElement("span"):void 0;E&&(E.className="lp-val"),p.addEventListener("input",()=>{const x=a[e];if(v.type==="range"){const S=parseFloat(p.value);x[v.key]=S,E&&(E.textContent=v.step&&v.step>=1?String(Math.round(S)):S.toFixed(2))}else x[v.key]=p.value;t(e,x)});const T=document.createElement("div");T.className="lp-ctrl",T.appendChild(p),E&&T.appendChild(E),k.appendChild(T),u.appendChild(k),h.set(v.key,{input:p,val:E})}r.appendChild(u)}const d={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function w(){const m=a[e],u=i.querySelector("#lpPresetName");u&&(u.textContent=d[e]);for(const[y,{input:v,val:k}]of h){const U=m[y];if(v.value=String(U),k&&typeof U=="number"){const p=parseFloat(v.step||"0.01");k.textContent=p>=1?String(Math.round(U)):U.toFixed(2)}}}const M=()=>{i.hidden=!i.hidden,o.classList.toggle("on",!i.hidden)};o.addEventListener("click",M),i.querySelector("#lpClose")?.addEventListener("click",M);const g=i.querySelector("#lpCopy");return g.addEventListener("click",async()=>{const m=JSON.stringify({active:e,presets:a},null,2);try{await navigator.clipboard.writeText(m),g.textContent="¡JSON copiado!",setTimeout(()=>g.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",m)}}),i.querySelector("#lpReset")?.addEventListener("click",()=>{a[e]={...ot[e]},w(),t(e,a[e])}),addEventListener("keydown",m=>{m.code==="KeyL"&&!m.ctrlKey&&!m.metaKey&&!m.altKey&&M()}),w(),{setActivePreset(m){e=m,w()},getPreset(m){return a[m]},toggle:M}}yo.defaultAccessToken=He.ionToken;const Y=t=>document.getElementById(t),zt=Y("cesiumContainer"),Ut=Y("loading"),Jo=Y("loadBar"),Jt=Y("loadLabel"),Zo=Y("loadPct");function Ue(t,a){Jt.textContent=t;const e=Math.round(Math.max(0,Math.min(1,a))*100);Jo.style.width=e+"%",Zo.textContent=e+"%"}const Z=new ho(zt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:xe.RECEIVE_ONLY,terrain:mo.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:fo.fromProviderAsync(Yt.fromAssetId(He.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),H=Z.scene;H.globe.enableLighting=!0;H.globe.showGroundAtmosphere=!0;H.globe.depthTestAgainstTerrain=!0;H.globe.maximumScreenSpaceError=2;H.fog.enabled=!1;H.fog.density=18e-5;H.fog.minimumBrightness=.04;H.highDynamicRange=!0;H.msaaSamples=4;H.postProcessStages.fxaa.enabled=!0;H.screenSpaceCameraController.enableCollisionDetection=!1;H.light=new po({intensity:3,color:D.fromCssColorString("#fff4e3")});const Me=Z.shadowMap;Me.softShadows=!0;Me.size=4096;Me.maximumDistance=1200;Me.darkness=.24;Me.normalOffset=!0;{const t=Me;t._primitiveBias.depthBias=8e-4,t._primitiveBias.normalOffsetScale=1.6,t._primitiveBias.normalShadingSmooth=.35}const Fe=H.postProcessStages.ambientOcclusion;Fe.enabled=!0;Fe.uniforms.intensity=2.1;Fe.uniforms.bias=.08;Fe.uniforms.lengthCap=.35;Fe.uniforms.stepSize=1.4;Fe.uniforms.blurStepSize=1;const ke=H.postProcessStages.bloom;ke.enabled=!0;ke.uniforms.glowOnly=!1;ke.uniforms.contrast=128;ke.uniforms.brightness=-.36;ke.uniforms.delta=1;ke.uniforms.sigma=2.6;ke.uniforms.stepSize=1.5;const Ko=Tt(),xt=t=>{const a=V.getColumn(Ko,t,new Ve);return new b(a.x,a.y,a.z)},be=Eo(xt(0),xt(1),xt(2));H.postProcessStages.add(be);const ye=Po();H.postProcessStages.add(ye);Z.camera.frustum.fov=Wt.toRadians(48);const Bt=(()=>{try{const t=H.context._gl,a=t.getExtension("WEBGL_debug_renderer_info");return a?String(t.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),$o=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Bt)&&!/Arc/i.test(Bt);let P=null,oe=$o||matchMedia("(pointer: coarse)").matches?.5:1;function Qe(){const t=Math.min(window.devicePixelRatio||1,2);Z.resolutionScale=t*(oe>=1?1:oe>=.5?.8:.62),Me.size=oe>=1?4096:oe>=.5?2048:1024,Me.softShadows=oe>=.5,Fe.enabled=oe>=1,ke.enabled=oe>=.5,H.msaaSamples=oe>=1?4:1,Z.shadows=oe>=.5,P?.tileset&&(P.tileset.maximumScreenSpaceError=oe>=1?8:oe>=.5?12:20)}Qe();Z.clock.shouldAnimate=!1;Z.clock.currentTime=Ke.fromIso8601("2026-06-21T16:50:00-05:00");const q=new ko(Z),ut=t=>Oe(gt[t].e,gt[t].n,gt[t].u),Qo=ut("hotel");q.flyTo({pivot:Qo,heading:st.general.heading,pitch:st.general.pitch,range:st.general.range*1.8},0);q.groundHeight=t=>H.globe.getHeight(t);const ea=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let ve=.04,Ie=1,Re=null;const ta=t=>Ke.toDate(Ke.fromIso8601(t)).getTime();function ht(t){H.light.intensity=t.sunIntensity,H.light.color=D.fromCssColorString(t.sunColor),Me.darkness=t.shadowDarkness,Fe.uniforms.intensity=t.aoIntensity,ke.uniforms.brightness=t.bloomBrightness,ye.uniforms.uExposure=t.exposure,ye.uniforms.uContrast=t.contrast,ye.uniforms.uSaturation=t.saturation;const[a,e,o]=yt(t.tintColor);ye.uniforms.uTint=new b(a,e,o),ye.uniforms.uVignette=t.vignette;const[i,r,h]=yt(t.skyZenith);be.uniforms.uSkyZenith=new b(i,r,h);const[d,w,M]=yt(t.skyHorizon);be.uniforms.uSkyHorizon=new b(d,w,M),be.uniforms.uCloudDensity=t.cloudDensity,be.uniforms.uCloudSpeed=t.cloudSpeed,P?.setLook({skyFill:t.skyFill,groundFill:t.groundFill,hazeAmount:t.hazeAmount,hazeStart:t.hazeStart})}const lt=Xo((t,a)=>ht(a));ht(lt.getPreset("dia"));be.uniforms.uNight=ve;be.uniforms.uTarde=Ie;ye.uniforms.uNight=ve;ye.uniforms.uTarde=Ie;H.skyAtmosphere&&(H.skyAtmosphere.hueShift=0,H.skyAtmosphere.saturationShift=.08,H.skyAtmosphere.brightnessShift=-.04);function oa(t){Re={from:Ke.toDate(Z.clock.currentTime).getTime(),to:ta(t.iso),start:performance.now(),dur:1600},H.fog.density=t.fog,lt.setActivePreset(t.id),ht(lt.getPreset(t.id)),H.skyAtmosphere&&(H.skyAtmosphere.hueShift=0,H.skyAtmosphere.saturationShift=t.id==="tarde"?.08:t.id==="noche"?-.25:.06,H.skyAtmosphere.brightnessShift=t.id==="noche"?-.55:t.id==="tarde"?-.04:0);const e=ve,o=Ie,i=performance.now(),r=()=>{const d=Math.min(1,(performance.now()-i)/1400),w=d*d*(3-2*d);ve=e+(t.night-e)*w,Ie=o+(t.tarde-o)*w,P?.setNight(ve),$?.setNight(ve),P?.setTarde(Ie),be.uniforms.uNight=ve,be.uniforms.uTarde=Ie,ye.uniforms.uNight=ve,ye.uniforms.uTarde=Ie,d<1&&requestAnimationFrame(r)};requestAnimationFrame(r),document.querySelectorAll("[data-light]").forEach(d=>d.classList.toggle("on",d.dataset.light===t.id));const h=Y("clockLabel");h&&(h.textContent=t.label)}document.querySelectorAll("[data-light]").forEach(t=>{t.addEventListener("click",()=>{const a=ea.find(e=>e.id===t.dataset.light);a&&oa(a)})});let Be=!1;const kt=Y("btnOrbit"),At=Y("btnPedestrian");function Se(){Be=!1,kt?.classList.remove("on")}function et(t,a=2){Se();const e=st[t];q.flyTo({pivot:ut(e.place),heading:e.heading,pitch:e.pitch,range:e.range},a)}Y("btnHome")?.addEventListener("click",()=>et("general",2.2));Y("btnAerial")?.addEventListener("click",()=>et("aerial"));Y("btnArch")?.addEventListener("click",()=>et("arch"));At?.addEventListener("click",()=>{Se(),q.isWalking?q.exitWalk():q.enterWalk(ue?Kt(ue):void 0)});q.onModeChange=t=>{At?.classList.toggle("on",t);const a=Y("hint");a&&t&&(a.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",a.classList.remove("fade"),setTimeout(()=>a.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(t=>{t.addEventListener("click",()=>{Se();const a=t.dataset.place;if(a==="hotel"&&P){const e=P.buildings.find(o=>o.s==="Hotel");if(e){We(null),We(e);return}}q.flyTo({pivot:ut(a),range:a==="hotel"?300:520,pitch:-.5},2)})});kt?.addEventListener("click",()=>{Be=!Be,kt.classList.toggle("on",Be),Be&&q.isWalking&&q.exitWalk()});zt.addEventListener("pointerdown",Se);zt.addEventListener("wheel",Se,{passive:!0});addEventListener("keydown",t=>{t.code==="Escape"&&(q.isWalking?q.exitWalk():We(null)),(t.code==="KeyH"||t.code==="Home")&&et("general",2.2),t.code==="KeyP"&&At?.click()});let ue=null,Ze=null;const aa=9;let rt=null,$=null,Ne=null,St=!1,at=null;function ia(){return at||(at=(async()=>{P&&($=await qo(Z,P.matrix),$&&($.setNight(ve),Ne=Yo($,t=>{if(!$)return;Se(),Ne?.mark(t),t<0?$.full():$.openAt(t);const a=$.caja;q.flyTo({pivot:Oe((a[0]+a[2])/2,(a[1]+a[3])/2,12),pitch:t<0?-.42:-.95,range:t<0?230:150},1.4)}),St&&(St=!1,P.setHotelFloors(99),Et(),pe&&(Z.entities.remove(pe),pe=null))))})(),at)}function Et(){!P||!$||(P.setRevitZone($.caja),$.play(),Ne?.mark(-1),Ne?.show(!0))}function Zt(){P&&(rt={start:performance.now()},P.setHotelFloors(0))}let pe=null;const it=Y("card");function na(t){return Oe((t.bb[0]+t.bb[2])/2,(t.bb[1]+t.bb[3])/2,t.b+t.h*.5)}function Kt(t){return Oe((t.bb[0]+t.bb[2])/2,t.bb[1]-9,t.b)}function We(t){const a=ue?.s==="Hotel";if(ue=t,pe&&(Z.entities.remove(pe),pe=null),!t||!P){it&&(it.hidden=!0),Ne?.show(!1);return}t.s!=="Hotel"?Ne?.show(!1):$?.visible&&Ne?.show(!0);const e=t.r.map(([m,u])=>Oe(m,u,0,P.matrix)),o=2572+t.b-.5;pe=Z.entities.add({polygon:{hierarchy:new vo(e),height:o,extrudedHeight:o+t.h+2.2,material:D.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:D.fromCssColorString("#d7ebff"),shadows:xe.DISABLED}});const i=t.s==="Hotel";i&&!a&&($?(Et(),pe&&(Z.entities.remove(pe),pe=null)):(St=!0,ia(),Zt()),Se(),q.flyTo({pivot:ut("hotel"),pitch:-.38,range:290},1.8));const r=i&&P?P.buildings.filter(m=>m.s==="Hotel"):[t],h=m=>Math.abs(m.r.reduce((u,y,v)=>{const k=m.r[(v+1)%m.r.length];return u+y[0]*k[1]-k[0]*y[1]},0)/2),d=r.reduce((m,u)=>m+h(u),0),w=r.reduce((m,u)=>m+h(u)*u.p,0),M=Math.max(...r.map(m=>m.p)),g=Math.max(...r.map(m=>m.h));Math.abs(t.r.reduce((m,u,y)=>{const v=t.r[(y+1)%t.r.length];return m+u[0]*v[1]-v[0]*u[1]},0)/2),Y("cardKind").textContent=i?"Proyecto":`Sector ${t.s}`,Y("cardTitle").textContent=i?"Hotel La Fontana":`Edificación ${t.id+1}`,Y("cardData").innerHTML=`<dt>Pisos</dt><dd>${i?"hasta "+M:t.p}</dd><dt>Altura</dt><dd>${g.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(d).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(w).toLocaleString("es-CO")} m²</dd>`,it&&(it.hidden=!1)}q.onPick=t=>{P&&We(t?P.buildingAt(t):null)};Y("cardClose")?.addEventListener("click",()=>We(null));Y("cardFocus")?.addEventListener("click",()=>{if(!ue)return;Se();const t=Math.max(ue.bb[2]-ue.bb[0],ue.bb[3]-ue.bb[1],ue.h);q.flyTo({pivot:na(ue),pitch:-.42,range:Math.max(60,t*2.1)},1.7)});Y("cardWalk")?.addEventListener("click",()=>{ue&&(Se(),q.enterWalk(Kt(ue)))});const bt=Y("status"),Vt=Y("statusText");async function sa(){const t=performance.now()+25e3;let a=0;for(;performance.now()<t;){const e=H.globe.tilesLoaded,o=!P?.tileset||P.tileset.tilesLoaded;if(e&&o){if(a||(a=performance.now()),performance.now()-a>=600)break}else a=0;await new Promise(i=>setTimeout(i,150))}for(let e=0;e<8;e++)await new Promise(o=>requestAnimationFrame(o))}async function ra(){Ue("Cargando el modelo del hotel...",.05),await new Promise(e=>setTimeout(e,30)),P=await Ho(Z,(e,o)=>Ue(e,.05+o*.2),(e,o,i)=>{Ue(`Cargando secciones (${e}/${o}) · ${i}`,.25+e/Math.max(1,o)*.45),!(!bt||!Vt)&&(bt.hidden=!1,Vt.textContent=e<o?`Cargando secciones ${e}/${o} · ${i}`:`Modelo completo · ${o} secciones`,e>=o&&setTimeout(()=>bt.classList.add("fade"),2600))}),P.setNight(ve),P.setTarde(Ie);const t=document.querySelector("[data-light].on")?.dataset.light||"dia";ht(lt.getPreset(t)),Qe(),et("general",0),await P.done,Ue("Cargando tráfico y parqueaderos...",.78),Ze=await jo(Z,P.matrix),Ze&&await Ze.ready,window.__ALL__=!0,Ue("Renderizando texturas y 3D Tiles...",.9),await sa(),Ue("Listo",1),Ut.classList.add("done"),setTimeout(()=>Ut.remove(),900);const a=Y("hint");a&&setTimeout(()=>a.classList.add("fade"),9e3),window.__READY__=!0}const de={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:go,viewer:Z,cam:q,getSite:()=>P,enuToWorld:Oe,select:We,stats:de,playHotel:Zt,playRevit:Et,getRevit:()=>$,getTrafico:()=>Ze,setQuality:t=>{oe=t,Qe()}};ra().catch(t=>{console.error(t),Jt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(t?.message??t)});let jt=performance.now(),wt=0;function $t(){const t=performance.now(),a=Math.min(.1,(t-jt)/1e3);if(jt=t,Re){const o=Math.min(1,(t-Re.start)/Re.dur),i=o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2;Z.clock.currentTime=Ke.fromDate(new Date(Re.from+(Re.to-Re.from)*i)),o>=1&&(Re=null)}if(rt&&P){const o=(t-rt.start)/550,i=Math.floor(o),r=o-i,h=1-Math.pow(1-Math.min(1,r*1.6),3);i>=aa?(P.setHotelFloors(99),rt=null):P.setHotelFloors(i+h)}$?.update(a,t),Ze?.update(a);const e=t*.001;if(P?.setTime(e),be.uniforms.uTime=e,Be&&!q.isWalking&&q.flyTo({heading:q.state.heading+.16*a},0),q.update(a),de.frames++,t-de.t0>=2e3){de.fps=Math.round(de.frames*1e3/(t-de.t0)),de.frames=0,de.t0=t,window.__FPS__=de.fps;const o=!!P&&P.sections.loaded>=P.sections.total&&t-wt>8e3;P&&P.sections.loaded>=P.sections.total&&!wt&&(wt=t),o&&document.visibilityState==="visible"&&(de.fps<20&&oe>.25&&!window.__DBG__.lock?++de.low>=3&&(oe=oe>=1?.5:.25,de.low=0,Qe()):de.low=0)}requestAnimationFrame($t)}requestAnimationFrame($t);addEventListener("resize",Qe);
