var Wt=Object.defineProperty;var Yt=(t,a,i)=>a in t?Wt(t,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[a]=i;var S=(t,a,i)=>Yt(t,typeof a!="symbol"?a+"":a,i);import{C as g,a as Rt,T as rt,M as O,b as Ce,c as Fe,H as qt,P as _t,d as Ne,L as Gt,U as k,V as oe,e as Ae,f as Ze,g as ct,h as ut,i as xt,j as Xt,S as se,I as Ft,k as Zt,R as Kt,l as Ge,A as ve,m as W,n as wt,o as bt,p as Ct,q as Jt,r as $t,s as Qt,t as eo,J as He,u as to,v as oo,w as ao}from"./cesium-ICe9G6Ok.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function i(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(n){if(n.ep)return;n.ep=!0;const l=i(n);fetch(n.href,l)}})();const et="/HLF/",io=et.endsWith("/")?et:et+"/",no=io+"cesium/";window.CESIUM_BASE_URL=no;const We={longitude:-74.04145021,latitude:4.70207636,height:2572},tt={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},Ye={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Me={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},so=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Mt=-1.5533,kt=-.012,ro=4200,lo=6,Tt=1.7;class co{constructor(a){S(this,"viewer");S(this,"canvas");S(this,"pivot",new g);S(this,"heading",.5);S(this,"pitch",-.6);S(this,"range",1200);S(this,"targetPivot",new g);S(this,"targetHeading",.5);S(this,"targetPitch",-.6);S(this,"targetRange",1200);S(this,"damping",9);S(this,"drag",null);S(this,"pointers",new Map);S(this,"pinch",null);S(this,"lastTap",0);S(this,"keys",new Set);S(this,"tween",null);S(this,"fov",Rt.toRadians(48));S(this,"walking",!1);S(this,"eye",new g);S(this,"eyeTarget",new g);S(this,"wHeading",0);S(this,"wPitch",0);S(this,"wHeadingT",0);S(this,"wPitchT",0);S(this,"onPick",null);S(this,"onModeChange",null);S(this,"groundHeight",null);this.viewer=a,this.canvas=a.scene.canvas,a.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:g.clone(this.targetPivot)}}setPivot(a,i=!0){if(i){const o=g.clone(this.viewer.camera.positionWC),n=g.subtract(o,a,new g),l=g.magnitude(n),h=rt.eastNorthUpToFixedFrame(a),m=O.inverseTransformation(h,new O),x=O.multiplyByPointAsVector(m,n,new g);if(l>1){const y=-Math.asin(Math.max(-1,Math.min(1,x.z/l)));if(y<kt&&y>Mt){let d=Math.atan2(-x.x,-x.y);for(;d-this.heading>Math.PI;)d-=Math.PI*2;for(;d-this.heading<-Math.PI;)d+=Math.PI*2;this.heading=this.targetHeading=d,this.pitch=this.targetPitch=y,this.range=this.targetRange=this.clamp(l),g.clone(a,this.pivot)}}}this.targetPivot=g.clone(a),this.tween=null}bind(){const a=this.canvas;a.style.touchAction="none",a.addEventListener("pointerdown",o=>{if(a.setPointerCapture(o.pointerId),this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2){const[n,l]=[...this.pointers.values()];this.pinch={distance:Math.hypot(n.x-l.x,n.y-l.y),range:this.targetRange,cx:(n.x+l.x)/2,cy:(n.y+l.y)/2},this.drag=null;return}o.button===2||o.button===1||o.shiftKey?this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"pan",moved:!1}:o.button===0&&(this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"orbit",moved:!1}),this.tween=null}),a.addEventListener("pointermove",o=>{if(!this.pointers.has(o.pointerId))return;if(this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2&&this.pinch){const[h,m]=[...this.pointers.values()],x=Math.hypot(h.x-m.x,h.y-m.y),y=(h.x+m.x)/2,d=(h.y+m.y)/2;this.walking?this.walk((this.pinch.cy-d)*.06,0):(x>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/x)),this.pan(this.pinch.cx-y,d-this.pinch.cy)),this.pinch.cx=y,this.pinch.cy=d;return}if(!this.drag||o.pointerId!==this.drag.id)return;const n=o.offsetX-this.drag.x,l=o.offsetY-this.drag.y;this.drag.x=o.offsetX,this.drag.y=o.offsetY,Math.abs(n)+Math.abs(l)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=n*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+l*.0028))):this.walk(l*.05,-n*.05):this.drag.mode==="orbit"?(this.targetHeading-=n*.0042,this.targetPitch=this.clampPitch(this.targetPitch-l*.0034)):this.pan(-n,l)});const i=o=>{if(this.pointers.delete(o.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&o.pointerId===this.drag.id){const n=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,n&&o.type==="pointerup"){const l=new Ce(o.offsetX,o.offsetY),h=performance.now();if(o.pointerType!=="mouse"&&h-this.lastTap<320){this.lastTap=0,this.focusAt(l);return}this.lastTap=h;const m=this.pickWorld(l);m&&!this.walking&&this.setPivot(m,!0),this.onPick?.(m)}}};a.addEventListener("pointerup",i),a.addEventListener("pointercancel",i),a.addEventListener("contextmenu",o=>o.preventDefault()),a.addEventListener("wheel",o=>{o.preventDefault(),this.tween=null;const n=o.deltaMode===1?16:o.deltaMode===2?100:1,l=o.deltaY*n;if(this.walking){this.walk(-l*.02,0);return}const h=Math.exp(Math.max(-.45,Math.min(.45,l*.0016))),m=this.pickWorld(new Ce(o.offsetX,o.offsetY)),x=this.clamp(this.targetRange*h);if(m&&h<1){const y=Math.min(.45,(this.targetRange-x)/this.targetRange)*.8,d=g.subtract(m,this.targetPivot,new g),u=g.magnitude(d);if(u>1){const f=Math.min(u,this.targetRange)*y/u;g.add(this.targetPivot,g.multiplyByScalar(d,f,d),this.targetPivot)}}this.targetRange=x},{passive:!1}),a.addEventListener("dblclick",o=>{o.preventDefault(),this.focusAt(new Ce(o.offsetX,o.offsetY))}),addEventListener("keydown",o=>{o.target instanceof HTMLInputElement||(this.keys.add(o.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(o.code)&&o.preventDefault())}),addEventListener("keyup",o=>this.keys.delete(o.code)),addEventListener("blur",()=>this.keys.clear())}clamp(a,i=lo,o=ro){return Math.max(i,Math.min(o,a))}clampPitch(a){return Math.max(Mt,Math.min(kt,a))}moveHorizontal(a,i,o,n){const l=rt.eastNorthUpToFixedFrame(a),h=new g(Math.sin(i)*o+Math.cos(i)*n,Math.cos(i)*o-Math.sin(i)*n,0);O.multiplyByPoint(l,h,a)}pan(a,i){const o=this.canvas.clientHeight||1,n=2*this.range*Math.tan(this.fov/2)/o,l=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,i*n/l,a*n),this.tween=null}walk(a,i){this.moveHorizontal(this.eyeTarget,this.wHeading,a,i),this.snapEye()}snapEye(){const a=Fe.fromCartesian(this.eyeTarget),i=this.groundHeight?.(a);i!==void 0&&Number.isFinite(i)&&(a.height=i+Tt,Fe.toCartesian(a,void 0,this.eyeTarget))}pickWorld(a){const i=this.viewer.scene;let o;if(i.pickPositionSupported&&i.pick(a,4,4)&&(o=i.pickPosition(a)),!o){const n=i.camera.getPickRay(a);n&&(o=i.globe.pick(n,i)??void 0)}return o??null}focusAt(a){const i=this.pickWorld(a);if(i){if(this.walking){g.clone(i,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:i,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(a,i=2){this.walking&&this.exitWalk(!1);const o={pivot:a.pivot??g.clone(this.targetPivot),heading:a.heading??this.targetHeading,pitch:a.pitch??this.targetPitch,range:a.range??this.targetRange};let n=o.heading;for(;n-this.targetHeading>Math.PI;)n-=Math.PI*2;for(;n-this.targetHeading<-Math.PI;)n+=Math.PI*2;if(o.heading=n,i<=.02){this.tween=null,this.targetPivot=g.clone(o.pivot),this.pivot=g.clone(o.pivot),this.heading=this.targetHeading=o.heading,this.pitch=this.targetPitch=o.pitch,this.range=this.targetRange=o.range;return}this.tween={from:{pivot:g.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:o,start:performance.now(),duration:i*1e3}}enterWalk(a){g.clone(a??this.targetPivot,this.eyeTarget),this.snapEye(),g.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(a=!0){if(!this.walking)return;this.walking=!1;const i=Fe.fromCartesian(this.eyeTarget);i.height-=Tt-1;const o=Fe.toCartesian(i);this.pivot=g.clone(o),this.targetPivot=o,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,a?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(a){if(!this.keys.size)return;const i=this.keys,o=i.has("ShiftLeft")||i.has("ShiftRight")?3:1;let n=0,l=0;(i.has("KeyW")||i.has("ArrowUp"))&&(n+=1),(i.has("KeyS")||i.has("ArrowDown"))&&(n-=1),(i.has("KeyD")||i.has("ArrowRight"))&&(l+=1),(i.has("KeyA")||i.has("ArrowLeft"))&&(l-=1);let h=0;if(i.has("KeyQ")&&(h+=1),i.has("KeyE")&&(h-=1),this.walking){h&&(this.wHeadingT-=h*1.2*a),(n||l)&&this.walk(n*4.2*o*a,l*3.4*o*a);return}if(h&&(this.targetHeading+=h*.9*a,this.tween=null),(i.has("PageUp")||i.has("Equal")||i.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*a))),(i.has("PageDown")||i.has("Minus")||i.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*a))),i.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*a)),i.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*a)),!n&&!l)return;const m=Math.max(8,this.range*.6)*o*a;this.moveHorizontal(this.targetPivot,this.heading,n*m,l*m),this.tween=null}update(a){this.updateKeys(a);const i=1-Math.exp(-this.damping*a);if(this.walking){g.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*a),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*i,this.wPitch+=(this.wPitchT-this.wPitch)*i,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const o=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),n=so(o),{from:l,to:h}=this.tween;g.lerp(l.pivot,h.pivot,n,this.targetPivot),this.targetHeading=l.heading+(h.heading-l.heading)*n,this.targetPitch=l.pitch+(h.pitch-l.pitch)*n,this.targetRange=Math.exp(Math.log(l.range)+(Math.log(h.range)-Math.log(l.range))*n),o>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*i,this.pitch+=(this.targetPitch-this.pitch)*i,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*i),g.lerp(this.pivot,this.targetPivot,i,this.pivot),this.viewer.camera.lookAt(this.pivot,new qt(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(O.IDENTITY)}}function uo(){return new Ze({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const Ht=()=>({uAerial:{type:k.SAMPLER_2D,value:uo()},uAerialRect:{type:k.VEC4,value:new Ae(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:k.FLOAT,value:0}}),Nt=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,Ke=`
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
`;function ho(){return new Ne({uniforms:{uNight:{type:k.FLOAT,value:0},uTarde:{type:k.FLOAT,value:0},uSkyFill:{type:k.FLOAT,value:.24},uHazeAmount:{type:k.FLOAT,value:.08},uHazeStart:{type:k.FLOAT,value:1200},uHotelPisos:{type:k.FLOAT,value:99},uRevitBox:{type:k.VEC4,value:new Ae(0,0,0,0)},uLean:{type:k.VEC2,value:new Ce(0,0)},...Ht()},varyings:{vPosM:oe.VEC3,vUpEC:oe.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Ke+Nt+`
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
    `})}function fo(t,a,i){return new Ne({uniforms:{uNight:{type:k.FLOAT,value:0},uTarde:{type:k.FLOAT,value:0},uSkyFill:{type:k.FLOAT,value:.22},uHazeAmount:{type:k.FLOAT,value:.08},uHazeStart:{type:k.FLOAT,value:1200},uTime:{type:k.FLOAT,value:0},uFrame:{type:k.FLOAT,value:a},uTop:{type:k.FLOAT,value:i},uAtlas:{type:k.SAMPLER_2D,value:new Ze({url:t,repeat:!1,minificationFilter:ct.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})}},varyings:{vUV:oe.VEC2,vView:oe.VEC3,vRightT:oe.VEC2,vUpT:oe.VEC2,vUpEC:oe.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:Ke+`
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
    `})}function mo(){return new Ne({uniforms:{uNight:{type:k.FLOAT,value:0},uTarde:{type:k.FLOAT,value:0},uHazeAmount:{type:k.FLOAT,value:.08},uHazeStart:{type:k.FLOAT,value:1200}},lightingModel:Gt.UNLIT,fragmentShaderText:Ke+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function po(t,a,i){return new _t({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:t,uNorth:a,uUp:i,uSkyZenith:new g(.16,.42,.82),uSkyHorizon:new g(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function go(){return new _t({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new g(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function vo(t){const a=i=>({type:k.SAMPLER_2D,value:new Ze({url:t+i,repeat:!0,minificationFilter:ct.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})});return new Ne({uniforms:{uNight:{type:k.FLOAT,value:0},uTarde:{type:k.FLOAT,value:0},uGroundFill:{type:k.FLOAT,value:.12},uHazeAmount:{type:k.FLOAT,value:.08},uHazeStart:{type:k.FLOAT,value:1200},uAsfalto:a("tex_asfalto.webp"),uAnden:a("tex_anden.webp"),uPrado:a("tex_prado.webp"),uCiclo:a("tex_ciclo.webp"),...Ht()},varyings:{vG:oe.VEC3,vUpEC:oe.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Ke+Nt+`
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
    `})}function dt(){return rt.eastNorthUpToFixedFrame(g.fromDegrees(We.longitude,We.latitude,We.height))}function Te(t,a,i,o=dt()){return O.multiplyByPoint(o,new g(t,a,i),new g)}const yo={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function xo(t,a,i){let o=!1;for(let n=0,l=i.length-1;n<i.length;l=n++){const[h,m]=i[n],[x,y]=i[l];m>a!=y>a&&t<(x-h)*(a-m)/(y-m)+h&&(o=!o)}return o}function wo(t,a,i){let o=1/0;for(let n=0,l=i.length-1;n<i.length;l=n++){const[h,m]=i[l],[x,y]=i[n],d=x-h,u=y-m,f=Math.max(0,Math.min(1,((t-h)*d+(a-m)*u)/(d*d+u*u||1)));o=Math.min(o,Math.hypot(t-h-f*d,a-m-f*u))}return o}async function bo(t,a,i){const o=t.scene,n=dt(),l=O.inverseTransformation(n,new O),h=Me.secciones;a("Contexto urbano",.08);const[m,x,y,d]=await Promise.all([fetch(h+"recorte.json").then(e=>e.json()),fetch(h+"edificios.json").then(e=>e.json()),fetch(h+"arboles.json").then(e=>e.json()),fetch(h+"suelo.json").then(e=>e.json())]),u=()=>m.clips.map(e=>{const r=new Zt({positions:g.fromDegreesArray(e.flat())}),s=r.computeRectangle();return r.computeRectangle=p=>Kt.clone(s,p),r});o.globe.clippingPolygons=new xt({polygons:u()});const f=mo();let w=null;try{w=await Xt.fromUrl(Me.googleTiles,{maximumScreenSpaceError:10,shadows:se.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),w.clippingPolygons=new xt({polygons:u()}),w.customShader=f,o.primitives.add(w)}catch(e){console.warn("Tiles de Google no disponibles",e)}const M=[-236,330],P=[];for(const e of x.secciones)P.push({key:e.key,file:e.file,kind:"edificios",label:e.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${e.key}`,dist:e.key==="Hotel"?-2:Math.hypot(e.c[0]-M[0],e.c[1]-M[1])});P.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),P.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),P.sort((e,r)=>e.dist-r.dist);const q={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},_=d.secciones.map(e=>({key:e.key,file:e.file,kind:"suelo",capa:q[e.key]?.[0]??0,label:q[e.key]?.[1]??e.key,dist:-3})),K=y.secciones.map(e=>({key:e.key,file:e.file,kind:"arboles",atlas:e.atlas,marco:e.marco,marcoSup:e.marcoSup,label:yo[e.key]??"Vegetación",dist:0})),D=[..._,...P.slice(0,4),...K.slice(0,3),...P.slice(4,9),...K.slice(3),...P.slice(9)],V=ho(),I=vo(h);(async()=>{try{const e=await Ft.fromAssetId(Me.imageryAssetId),r=18,s=e.tilingScheme,p=(j,ae)=>Fe.fromCartesian(Te(j,ae,0,n)),v=s.positionToTileXY(p(-1010,930),r),b=s.positionToTileXY(p(1010,-940),r),A=b.x-v.x+1,T=b.y-v.y+1,z=e.tileWidth,G=document.createElement("canvas");G.width=A*z,G.height=T*z;const B=G.getContext("2d"),E=[];for(let j=v.y;j<=b.y;j++)for(let ae=v.x;ae<=b.x;ae++)E.push([ae,j]);const J=async([j,ae])=>{for(let pt=0;pt<40;pt++){const gt=e.requestImage(j,ae,r);if(gt){try{const _e=await gt,vt=(j-v.x)*z,yt=(ae-v.y)*z;typeof ImageBitmap<"u"&&_e instanceof ImageBitmap?(B.save(),B.translate(vt,yt+z),B.scale(1,-1),B.drawImage(_e,0,0,z,z),B.restore()):B.drawImage(_e,vt,yt,z,z)}catch{}return}await new Promise(_e=>setTimeout(_e,120))}};B.fillStyle="#6a6f62",B.fillRect(0,0,G.width,G.height);const R=Array.from({length:6},async()=>{for(;E.length;)await J(E.shift())});await Promise.all(R);const N=document.createElement("canvas");N.width=N.height=4096,N.getContext("2d").drawImage(G,0,0,4096,4096);const X=await new Promise(j=>N.toBlob(j,"image/jpeg",.92));if(!X)return;const te=URL.createObjectURL(X);window.__AERIAL_URL__=te;const he=s.tileXYToRectangle(v.x,v.y,r),fe=s.tileXYToRectangle(b.x,b.y,r),Ue=(j,ae)=>O.multiplyByPoint(l,g.fromRadians(j,ae,We.height),new g),Ve=Ue(he.west,fe.south),Re=Ue(fe.east,he.north),jt=new Ae(Ve.x,Ve.y,Re.x,Re.y);for(const j of[V,I])j.setUniform("uAerial",new Ze({url:te,repeat:!1,minificationFilter:ct.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})),j.setUniform("uAerialRect",jt),j.setUniform("uAerialOn",1)}catch(e){console.warn("Foto aérea no disponible",e)}})();const ie=[],Le=[];let ue=0,ze=0,we=.22,ne=.08,ee=1200;const de={total:D.length,loaded:0,failed:[]},Pe=async e=>{try{const r=await Ge.fromGltfAsync({url:h+e.file,modelMatrix:n,upAxis:ve.Y,forwardAxis:ve.X,shadows:e.kind==="arboles"?se.CAST_ONLY:e.kind==="suelo"?se.RECEIVE_ONLY:se.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:e.kind!=="arboles"});if(e.kind==="suelo")r.customShader=I;else if(e.kind==="arboles"){const s=fo(h+e.atlas,e.marco,e.marcoSup);s.setUniform("uNight",ue),s.setUniform("uTarde",ze),s.setUniform("uSkyFill",we),s.setUniform("uHazeAmount",ne),s.setUniform("uHazeStart",ee),ie.push(s),r.customShader=s}else e.kind!=="cubierta_pbr"&&(r.customShader=V);r.imageBasedLighting.imageBasedLightingFactor=e.kind==="cubierta_pbr"?new Ce(.85,.55):new Ce(.75,.45),o.primitives.add(r),e.kind==="arboles"&&Le.push(r),await new Promise(s=>{if(r.ready)return s();const p=r.readyEvent.addEventListener(()=>{p(),s()});setTimeout(s,2e4)})}catch(r){console.error("Sección no cargada",e.file,r),de.failed.push(e.file)}de.loaded++,i?.(de.loaded,de.total,e.label)},Ie=_.length+7;for(let e=0;e<Math.min(Ie,D.length);e++)a(D[e].label,.2+.75*e/Ie),await Pe(D[e]);const c=(async()=>{for(let e=Ie;e<D.length;e++)await Pe(D[e]),await new Promise(r=>setTimeout(r,60))})();return{matrix:n,inverse:l,tileset:w,buildings:x.edificios,treeCount:y.total,sections:de,done:c,setNight(e){f.setUniform("uNight",e),V.setUniform("uNight",e),ue=e,I.setUniform("uNight",e);for(const r of ie)r.setUniform("uNight",e)},setTarde(e){f.setUniform("uTarde",e),V.setUniform("uTarde",e),ze=e,I.setUniform("uTarde",e);for(const r of ie)r.setUniform("uTarde",e)},setTime(e){for(const r of ie)r.setUniform("uTime",e)},setLook(e){if(e.skyFill!==void 0){we=e.skyFill,V.setUniform("uSkyFill",we);for(const r of ie)r.setUniform("uSkyFill",we)}if(e.groundFill!==void 0&&I.setUniform("uGroundFill",e.groundFill),e.hazeAmount!==void 0){ne=e.hazeAmount,V.setUniform("uHazeAmount",ne),I.setUniform("uHazeAmount",ne),f.setUniform("uHazeAmount",ne);for(const r of ie)r.setUniform("uHazeAmount",ne)}if(e.hazeStart!==void 0){ee=e.hazeStart,V.setUniform("uHazeStart",ee),I.setUniform("uHazeStart",ee),f.setUniform("uHazeStart",ee);for(const r of ie)r.setUniform("uHazeStart",ee)}},setRevitZone(e){V.setUniform("uRevitBox",e?new Ae(e[0]-1,e[1]-1,e[2]+1,e[3]+1):new Ae(0,0,0,0))},setHotelFloors(e){V.setUniform("uHotelPisos",e)},setTreesVisible(e){for(const r of Le)r.show=e},buildingAt(e){const r=O.multiplyByPoint(l,e,new g);let s=null,p=1.2;for(const v of x.edificios){if(r.x<v.bb[0]-1.5||r.x>v.bb[2]+1.5||r.y<v.bb[1]-1.5||r.y>v.bb[3]+1.5||r.z>v.b+v.h+2.5)continue;if(xo(r.x,r.y,v.r))return v;const b=wo(r.x,r.y,v.r);b<p&&(p=b,s=v)}return s}}}const St=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Et=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],At=3.2;async function Co(t,a,i=110){const o=Me.secciones;let n,l,h;try{n=await fetch(o+"vias_campo.json").then(e=>e.json());const c=new Uint8Array(await fetch(o+"vias_campo.bin").then(e=>e.arrayBuffer()));l=c.subarray(0,n.w*n.h),h=c.subarray(n.w*n.h)}catch{return null}const{cell:m,x0:x,y0:y,w:d,h:u}=n,f=(c,e)=>{const r=(c-x)/m-.5,s=(e-y)/m-.5,p=Math.floor(r),v=Math.floor(s);if(p<0||v<0||p>=d-1||v>=u-1)return 0;const b=r-p,A=s-v,T=v*d+p;return((l[T]*(1-b)+l[T+1]*b)*(1-A)+(l[T+d]*(1-b)+l[T+d+1]*b)*A)*.5},w=(c,e)=>{const r=Math.max(0,Math.min(d-1,Math.floor((c-x)/m))),s=Math.max(0,Math.min(u-1,Math.floor((e-y)/m))),p=s*d+r;if(l[p]>0)return h[p]*.1-2;let v=0,b=0;for(let A=-2;A<=2;A++){const T=s+A;if(!(T<0||T>=u))for(let z=-2;z<=2;z++){const G=r+z;if(G<0||G>=d)continue;const B=T*d+G;if(l[B]===0)continue;const E=1/(z*z+A*A+.5);v+=E,b+=(h[B]*.1-2)*E}}return v>0?b/v:1},M=[],P=[],q=[];for(let c=2;c<u-2;c++)for(let e=2;e<d-2;e++){const r=c*d+e,s=x+(e+.5)*m,p=y+(c+.5)*m,v=Math.hypot(s+180,p-250);if(v>520)continue;const b=l[r]*.5;if(b>=2.6&&b<=5&&M.push(r),b>=6&&v<460&&q.push({e:s,n:p,d:b}),l[r]===0&&v<430){let A=!1;for(let T=-2;T<=2&&!A;T++)for(let z=-2;z<=2;z++)if(l[(c+T)*d+(e+z)]>0){A=!0;break}A&&P.push(r)}}if(!M.length)return null;q.sort((c,e)=>e.d-c.d);const _=[],K=(c,e,r)=>O.multiplyByPoint(a,new g(c,e,r),new g);for(const c of q){if(_.length>=6)break;if(_.some(A=>Math.hypot(A.e-c.e,A.n-c.n)<90))continue;const e=w(c.e,c.n),r=c.e+6.5,s=c.n+6.5,p=w(r,s);t.entities.add({position:K(r,s,p+2.4),cylinder:{length:4.8,topRadius:.11,bottomRadius:.14,material:W.fromCssColorString("#242933")}});const v=t.entities.add({position:K(r-.6,s,p+4.5),box:{dimensions:new g(.45,.45,1.05),material:W.LIME}}),b=t.entities.add({position:K(r,s-.6,p+4.5),box:{dimensions:new g(.45,.45,1.05),material:W.RED}});_.push({e:c.e,n:c.n,u:e,faseOffset:_.length*4.5,nsLuz:v,ewLuz:b,nsEstado:"green",ewEstado:"red"})}const D=(()=>{let c=12345;return()=>(c=c*1664525+1013904223>>>0)/4294967296})(),V=(c,e,r)=>{const s=Math.cos(r),p=Math.sin(r);if(c>=-168&&c<=-118&&Math.abs(p)>.35)return c<-143?p<-.2?12:-1e6:p>.2?12:-1e6;const v=263-(c+420)*(51/380);return Math.abs(e-v)<26&&Math.abs(s)>.35?e>v?s>.2?12:-1e6:s<-.2?12:-1e6:c>=-255&&c<=-210&&e<222&&Math.abs(p)>.35?p<-.2?10:-1e6:e<175&&c<-215&&Math.abs(s)>.35?s>.2?10:-1e6:c<-385&&e<265&&Math.abs(p)>.35?p<-.2?10:-1e6:0},I=[],ie=(c,e,r)=>I.some(s=>s!==r&&Math.hypot(s.e-c,s.n-e)<8.5),Le=c=>{for(let e=0;e<45;e++){const r=M[Math.floor(D()*M.length)],s=x+(r%d+.5)*m,p=y+(Math.floor(r/d)+.5)*m;if(ie(s,p,c))continue;let v=0,b=-1e9;for(let A=0;A<16;A++){const T=A/16*Math.PI*2,z=s+Math.cos(T)*10,G=p+Math.sin(T)*10,B=f(z,G),E=V(z,G,T);if(E<-1e4)continue;const J=f(s+Math.sin(T)*2.5,p-Math.cos(T)*2.5),R=f(s-Math.sin(T)*2.5,p+Math.cos(T)*2.5),N=-Math.abs(B-At)+(R>J?1.5:0)+E;B>1.5&&N>b&&(b=N,v=T)}if(b>-1e8){c.e=s,c.n=p,c.th=v,c.vActual=c.v*.5;return}}};for(let c=0;c<i;c++){const e=D(),r=e<.2?"taxi":e<.48?"suv":"sedan",s={e:0,n:0,th:0,v:6.5+D()*5,vActual:0,model:null,u:0,tipo:r};Le(s),I.push(s)}const ue=[];if(P.length>0)for(let c=0;c<42;c++){const e=P[Math.floor(D()*P.length)],r=x+(e%d+.5)*m,s=y+(Math.floor(e/d)+.5)*m;ue.push({e:r,n:s,th:D()*Math.PI*2,v:1.15+D()*.45,model:null,u:w(r,s)+.16,conPerro:c%3===0})}const ze=new g,we=new Ct,ne=new O,ee=(c,e=.08)=>{c.model&&(g.fromElements(c.e,c.n,c.u+e,ze),Ct.fromRotationZ(c.th,we),O.fromRotationTranslation(we,ze,ne),c.model.modelMatrix=O.multiply(a,ne,new O))};(async()=>{for(let c=0;c<I.length;c++){const e=I[c],r=e.tipo==="taxi"?"carro_taxi.glb":e.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const s=await Ge.fromGltfAsync({url:o+r,upAxis:ve.Y,forwardAxis:ve.X,shadows:se.ENABLED,color:e.tipo==="taxi"?W.WHITE:W.fromCssColorString(St[c%St.length]),colorBlendMode:wt.MIX,colorBlendAmount:e.tipo==="taxi"?0:.28});t.scene.primitives.add(s),e.model=s,e.u=w(e.e,e.n),ee(e)}catch{}c%6===5&&await new Promise(s=>setTimeout(s,35))}for(let c=0;c<ue.length;c++){const e=ue[c];try{const r=await Ge.fromGltfAsync({url:o+(e.conPerro?"persona_perro.glb":"persona.glb"),upAxis:ve.Y,forwardAxis:ve.X,shadows:se.ENABLED,color:W.fromCssColorString(Et[c%Et.length]),colorBlendMode:wt.MIX,colorBlendAmount:.25});t.scene.primitives.add(r),e.model=r,ee(e,0)}catch{}c%6===5&&await new Promise(r=>setTimeout(r,35))}})();let de=!0,Pe=0;const Ie=(c,e)=>f(c,e)===0&&f(c+4,e)+f(c-4,e)+f(c,e+4)+f(c,e-4)>.5;return{count:i,debug:()=>I.map(c=>[Math.round(c.e),Math.round(c.n),+c.u.toFixed(1),c.model?1:0]),setVisible(c){de=c;for(const e of I)e.model&&(e.model.show=c);for(const e of ue)e.model&&(e.model.show=c);for(const e of _)e.nsLuz.show=c,e.ewLuz.show=c},update(c){if(!de)return;const e=Math.min(.08,Math.max(.001,c));Pe+=e;for(const r of _){const s=(Pe+r.faseOffset)%24,p=s<10?"green":s<12?"yellow":"red",v=s>=12&&s<22?"green":s>=22?"yellow":"red";p!==r.nsEstado&&(r.nsEstado=p,r.nsLuz.box.material.color=new bt(p==="green"?W.LIME:p==="yellow"?W.YELLOW:W.RED)),v!==r.ewEstado&&(r.ewEstado=v,r.ewLuz.box.material.color=new bt(v==="green"?W.LIME:v==="yellow"?W.YELLOW:W.RED))}for(let r=0;r<I.length;r++){const s=I[r];if(!s.model)continue;let p=0,v=-1e9;for(let E=-4;E<=4;E++){const J=E*.13,R=s.th+J,N=s.e+Math.cos(R)*9,X=s.n+Math.sin(R)*9,te=f(N,X);if(te<1.1||f(s.e+Math.cos(R)*4.5,s.n+Math.sin(R)*4.5)<.9)continue;const fe=V(N,X,R);if(fe<-1e4)continue;const Ue=f(N+Math.sin(R)*2.5,X-Math.cos(R)*2.5),Ve=f(N-Math.sin(R)*2.5,X+Math.cos(R)*2.5),Re=-Math.abs(Math.min(te,6)-At)-Math.abs(J)*1.6+(Ve>=Ue?.6:0)+fe;Re>v&&(v=Re,p=J)}if(v<-1e8||Math.hypot(s.e+180,s.n-250)>580){Le(s),s.u=w(s.e,s.n),ee(s);continue}const b=Math.cos(s.th),A=Math.sin(s.th);let T=1;for(let E=0;E<I.length;E++){if(E===r||!I[E].model)continue;const J=I[E],R=J.e-s.e,N=J.n-s.n,X=R*R+N*N;if(X>225)continue;const te=R*b+N*A,he=Math.abs(-R*A+N*b);if(te>0&&te<12.5&&he<2.35){const fe=te<6.4?0:(te-6.4)/6.1;fe<T&&(T=fe)}else X<22&&E<r&&(T=0)}const z=Math.abs(b)>Math.abs(A);for(const E of _){if((z?E.ewEstado:E.nsEstado)==="green")continue;const R=E.e-s.e,N=E.n-s.n,X=R*b+N*A,te=Math.abs(-R*A+N*b);if(X>7&&X<21&&te<9){const he=X<10.5?0:(X-10.5)/10.5;he<T&&(T=he)}}const G=1-Math.min(.55,Math.abs(p)*1.4),B=s.v*G*T;if(s.vActual+=(B-s.vActual)*Math.min(1,e*4.5),s.vActual>.05){s.th+=Math.max(-1.4*e,Math.min(1.4*e,p));const E=s.e+Math.cos(s.th)*s.vActual*e,J=s.n+Math.sin(s.th)*s.vActual*e;f(E,J)>=.7?(s.e=E,s.n=J):s.th+=.6;const R=Math.max(w(s.e,s.n),w(s.e+Math.cos(s.th)*1.4,s.n+Math.sin(s.th)*1.4),w(s.e-Math.cos(s.th)*1.4,s.n-Math.sin(s.th)*1.4));s.u+=(R-s.u)*Math.min(1,e*8)}ee(s)}for(const r of ue){if(!r.model)continue;const s=r.e+Math.cos(r.th)*r.v*e,p=r.n+Math.sin(r.th)*r.v*e;Ie(s,p)&&Math.hypot(s+180,p-250)<430?(r.e=s,r.n=p,r.u+=(w(r.e,r.n)+.16-r.u)*Math.min(1,e*4)):r.th+=.9+D()*1.2,ee(r,0)}}}}function Mo(){return new Ne({uniforms:{uNight:{type:k.FLOAT,value:0}},varyings:{vRP:oe.VEC3,vRN:oe.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vRP = vsInput.attributes.positionMC;
        vRN = vsInput.attributes.normalMC;
      }
    `,fragmentShaderText:`
      float rh(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec4 c = fsInput.attributes.color_0;
        float cat = floor(c.a * 255.0 + 0.5);
        vec3 col = czm_srgbToLinear(c.rgb);
        float rough = 0.85;
        vec3 spec = vec3(0.04);
        float dist = length(fsInput.attributes.positionEC);
        float near = 1.0 - smoothstep(40.0, 160.0, dist);
        vec3 n = normalize(vRN);
        float vertical = 1.0 - smoothstep(0.3, 0.7, abs(n.y));

        if (cat < 20.0) {
          // muros: ladrillo a la vista del hotel (hiladas de 7 cm, trabado), solo en paramentos
          float along = abs(n.x) > abs(n.z) ? vRP.z : vRP.x;
          float hil = fract(vRP.y / 0.075);
          float trab = fract(along / 0.25 + step(1.0, mod(floor(vRP.y / 0.075), 2.0)) * 0.5);
          float junta = max(1.0 - smoothstep(0.0, 0.16, hil), 1.0 - smoothstep(0.0, 0.06, trab));
          float pieza = rh(floor(vec2(along / 0.25, vRP.y / 0.075)));
          col *= mix(1.0, 0.86 + 0.26 * pieza, near * vertical);
          col = mix(col, col * vec3(0.80, 0.79, 0.78), junta * near * vertical * 0.8);
          // coronación del muro cortado: se lee la planta
          col = mix(col, vec3(0.82, 0.80, 0.76), (1.0 - vertical) * 0.85);
        } else if (cat < 40.0) {
          col *= 0.94 + 0.10 * rh(floor(vRP.xz * 1.6));          // losas: concreto
        } else if (cat < 60.0) {
          float canal = abs(fract(dot(vRP.xz, vec2(0.7, 0.7)) * 3.0) - 0.5) * 2.0;
          col *= 0.78 + 0.26 * (1.0 - canal * canal * near);      // cubiertas: teja
        } else if (cat < 80.0 || (cat > 100.0 && cat < 120.0)) {
          // ventanas y paneles de muro cortina: vidrio
          vec3 v = normalize(-fsInput.attributes.positionEC);
          float fres = pow(1.0 - clamp(abs(dot(normalize(material.normalEC), v)), 0.0, 1.0), 4.0);
          col = mix(col * 0.55, vec3(0.62, 0.70, 0.78), 0.25 + 0.6 * fres);
          rough = 0.1;
          spec = vec3(0.06);
        } else if (cat > 120.0 && cat < 160.0) {
          rough = 0.45;                                           // montantes y barandas: metal oscuro
        }
        material.diffuse = col * mix(1.0, 0.4, uNight);
        material.roughness = rough;
        material.specular = spec;
        material.emissive = col * 0.16 * (1.0 - uNight);
      }
    `})}async function ko(t,a){const i=Me.secciones;let o;try{o=await fetch(i+"revit.json").then(d=>d.json())}catch{return null}const n=Mo(),l=[];for(const d of o.niveles)try{const u=await Ge.fromGltfAsync({url:i+d.file,modelMatrix:a,upAxis:ve.Y,forwardAxis:ve.X,shadows:se.ENABLED,backFaceCulling:!1,show:!1});u.customShader=n,u.imageBasedLighting.imageBasedLightingFactor=new Ce(.45,.25),t.scene.primitives.add(u),l.push({...d,model:u,off:0,target:0,delay:0,shown:!1})}catch(u){console.warn("Nivel de Revit no cargado",d.file,u)}if(!l.length)return null;const h=46,m=new O,x=d=>{const u=O.fromTranslation(new g(0,0,d.off),m);d.model.modelMatrix=O.multiply(a,u,new O)},y={niveles:l.map(d=>({i:d.i,nombre:d.nombre})),caja:o.caja,ready:!0,visible:!1,abierto:-1,play(){y.visible=!0,y.abierto=-1;const d=performance.now();l.forEach((u,f)=>{u.off=h,u.target=0,u.delay=d+f*620,u.shown=!1,u.model.show=!1,x(u)})},openAt(d){y.visible=!0,y.abierto=d;const u=performance.now();let f=0;for(const w of[...l].reverse())w.i>d&&(w.target=h,w.delay=u+f++*110);for(const w of l)w.i<=d&&(w.target=0,w.delay=u,w.shown||(w.off=h))},full(){y.visible=!0,y.abierto=-1;const d=performance.now();l.forEach((u,f)=>{(u.target!==0||!u.shown)&&(u.target=0,u.delay=d+f*110,u.shown||(u.off=h))})},hide(){y.visible=!1,y.abierto=-1;for(const d of l)d.model.show=!1,d.shown=!1,d.off=0,d.target=0},setNight(d){n.setUniform("uNight",d)},update(d,u){if(y.visible)for(const f of l){if(u<f.delay)continue;f.target===0&&!f.shown&&(f.shown=!0,f.model.show=!0);const w=f.target-f.off;if(Math.abs(w)<.01){f.off!==f.target&&(f.off=f.target,x(f)),f.target!==0&&f.shown&&(f.shown=!1,f.model.show=!1);continue}const M=f.target===0?1-Math.exp(-5.2*d):1-Math.exp(-4*d);f.off+=w*M,x(f)}}};return y}function To(t,a){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i);const o=document.createElement("aside");o.className="pisos",o.hidden=!0,o.innerHTML="<small>Pisos · modelo Revit</small>";const n=new Map,l=(m,x,y)=>{const d=document.createElement("button");d.innerHTML=`${x}<span>${y}</span>`,d.addEventListener("click",()=>a(m)),n.set(m,d),o.appendChild(d)};l(-1,"Edificio completo","");for(const m of[...t.niveles].reverse())l(m.i,m.nombre.charAt(0)+m.nombre.slice(1).toLowerCase(),`N${m.i+1}`);document.body.appendChild(o);const h=m=>n.forEach((x,y)=>x.classList.toggle("on",y===m));return h(-1),{show:m=>{o.hidden=!m},mark:h}}const Be={dia:{sunIntensity:5.55,sunColor:"#dad1c3",shadowDarkness:.3,aoIntensity:0,skyFill:0,groundFill:0,exposure:1.12,contrast:.6,saturation:.68,tintColor:"#ffffff",vignette:.5,bloomBrightness:.2,skyZenith:"#7f92ad",skyHorizon:"#c0cfdd",cloudDensity:1,cloudSpeed:1.75,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.65,sunColor:"#6b8fd4",shadowDarkness:.24,aoIntensity:2.1,skyFill:.22,groundFill:.1,exposure:1,contrast:.22,saturation:.95,tintColor:"#d6e6ff",vignette:.28,bloomBrightness:-.36,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.65,cloudSpeed:.8,hazeAmount:.08,hazeStart:1200}};function ot(t){const a=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(!a)return[1,1,1];const i=parseInt(a[1],16);return[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}const So=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function Eo(t){const a={dia:{...Be.dia},tarde:{...Be.tarde},noche:{...Be.noche}};let i="dia";const o=document.createElement("button");o.id="btnLookStudio",o.className="look-toggle",o.textContent="⚙ Ajustar luz",o.title="Abrir editor de iluminación y color (L)",document.body.appendChild(o);const n=document.createElement("aside");n.id="lookPanel",n.className="look-panel",n.hidden=!0,n.innerHTML=`
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
  `,document.body.appendChild(n);const l=n.querySelector("#lpBody"),h=new Map;for(const u of So){const f=document.createElement("section");f.className="lp-sec";const w=document.createElement("h4");w.textContent=u.title,f.appendChild(w);for(const M of u.items){const P=document.createElement("label");P.className="lp-row";const q=document.createElement("span");q.className="lp-lbl",q.textContent=M.label,P.appendChild(q);const _=document.createElement("input");_.type=M.type,M.type==="range"&&(_.min=String(M.min),_.max=String(M.max),_.step=String(M.step));const K=M.type==="range"?document.createElement("span"):void 0;K&&(K.className="lp-val"),_.addEventListener("input",()=>{const V=a[i];if(M.type==="range"){const I=parseFloat(_.value);V[M.key]=I,K&&(K.textContent=M.step&&M.step>=1?String(Math.round(I)):I.toFixed(2))}else V[M.key]=_.value;t(i,V)});const D=document.createElement("div");D.className="lp-ctrl",D.appendChild(_),K&&D.appendChild(K),P.appendChild(D),f.appendChild(P),h.set(M.key,{input:_,val:K})}l.appendChild(f)}const m={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function x(){const u=a[i],f=n.querySelector("#lpPresetName");f&&(f.textContent=m[i]);for(const[w,{input:M,val:P}]of h){const q=u[w];if(M.value=String(q),P&&typeof q=="number"){const _=parseFloat(M.step||"0.01");P.textContent=_>=1?String(Math.round(q)):q.toFixed(2)}}}const y=()=>{n.hidden=!n.hidden,o.classList.toggle("on",!n.hidden)};o.addEventListener("click",y),n.querySelector("#lpClose")?.addEventListener("click",y);const d=n.querySelector("#lpCopy");return d.addEventListener("click",async()=>{const u=JSON.stringify({active:i,presets:a},null,2);try{await navigator.clipboard.writeText(u),d.textContent="¡JSON copiado!",setTimeout(()=>d.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",u)}}),n.querySelector("#lpReset")?.addEventListener("click",()=>{a[i]={...Be[i]},x(),t(i,a[i])}),addEventListener("keydown",u=>{u.code==="KeyL"&&!u.ctrlKey&&!u.metaKey&&!u.altKey&&y()}),x(),{setActivePreset(u){i=u,x()},getPreset(u){return a[u]},toggle:y}}ao.defaultAccessToken=Me.ionToken;const H=t=>document.getElementById(t),ht=H("cesiumContainer"),Lt=H("loading"),Ao=H("loadBar"),Ot=H("loadLabel"),Lo=H("loadPct");function at(t,a){Ot.textContent=t;const i=Math.round(Math.max(0,Math.min(1,a))*100);Ao.style.width=i+"%",Lo.textContent=i+"%"}const U=new Jt(ht,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:se.RECEIVE_ONLY,terrain:Qt.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:$t.fromProviderAsync(Ft.fromAssetId(Me.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),L=U.scene;L.globe.enableLighting=!0;L.globe.showGroundAtmosphere=!0;L.globe.depthTestAgainstTerrain=!0;L.globe.maximumScreenSpaceError=2;L.fog.enabled=!1;L.fog.density=18e-5;L.fog.minimumBrightness=.04;L.highDynamicRange=!0;L.msaaSamples=4;L.postProcessStages.fxaa.enabled=!0;L.screenSpaceCameraController.enableCollisionDetection=!1;L.light=new eo({intensity:3,color:W.fromCssColorString("#fff4e3")});const re=U.shadowMap;re.softShadows=!0;re.size=4096;re.maximumDistance=1200;re.darkness=.24;re.normalOffset=!0;{const t=re;t._primitiveBias.depthBias=8e-4,t._primitiveBias.normalOffsetScale=1.6,t._primitiveBias.normalShadingSmooth=.35}const xe=L.postProcessStages.ambientOcclusion;xe.enabled=!0;xe.uniforms.intensity=2.1;xe.uniforms.bias=.08;xe.uniforms.lengthCap=.35;xe.uniforms.stepSize=1.4;xe.uniforms.blurStepSize=1;const le=L.postProcessStages.bloom;le.enabled=!0;le.uniforms.glowOnly=!1;le.uniforms.contrast=128;le.uniforms.brightness=-.36;le.uniforms.delta=1;le.uniforms.sigma=2.6;le.uniforms.stepSize=1.5;const zo=dt(),it=t=>{const a=O.getColumn(zo,t,new Ae);return new g(a.x,a.y,a.z)},ye=po(it(0),it(1),it(2));L.postProcessStages.add(ye);const ge=go();L.postProcessStages.add(ge);U.camera.frustum.fov=Rt.toRadians(48);const zt=(()=>{try{const t=L.context._gl,a=t.getExtension("WEBGL_debug_renderer_info");return a?String(t.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),Po=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(zt)&&!/Arc/i.test(zt);let C=null,Z=Po||matchMedia("(pointer: coarse)").matches?.5:1;function Oe(){const t=Math.min(window.devicePixelRatio||1,2);U.resolutionScale=t*(Z>=1?1:Z>=.5?.8:.62),re.size=Z>=1?4096:Z>=.5?2048:1024,re.softShadows=Z>=.5,xe.enabled=Z>=1,le.enabled=Z>=.5,L.msaaSamples=Z>=1?4:1,U.shadows=Z>=.5,C?.tileset&&(C.tileset.maximumScreenSpaceError=Z>=1?8:Z>=.5?12:20)}Oe();U.clock.shouldAnimate=!1;U.clock.currentTime=He.fromIso8601("2026-06-21T10:10:00-05:00");const F=new co(U),Je=t=>Te(tt[t].e,tt[t].n,tt[t].u),Io=Je("hotel");F.flyTo({pivot:Io,heading:Ye.general.heading,pitch:Ye.general.pitch,range:Ye.general.range*1.8},0);F.groundHeight=t=>L.globe.getHeight(t);const Ro=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,tarde:0,fog:18e-5,label:"10:10",sun:5.55,color:"#dad1c3"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.65,color:"#6b8fd4"}];let pe=0,Se=0,me=null;const _o=t=>He.toDate(He.fromIso8601(t)).getTime();function $e(t){L.light.intensity=t.sunIntensity,L.light.color=W.fromCssColorString(t.sunColor),re.darkness=t.shadowDarkness,xe.uniforms.intensity=t.aoIntensity,le.uniforms.brightness=t.bloomBrightness,ge.uniforms.uExposure=t.exposure,ge.uniforms.uContrast=t.contrast,ge.uniforms.uSaturation=t.saturation;const[a,i,o]=ot(t.tintColor);ge.uniforms.uTint=new g(a,i,o),ge.uniforms.uVignette=t.vignette;const[n,l,h]=ot(t.skyZenith);ye.uniforms.uSkyZenith=new g(n,l,h);const[m,x,y]=ot(t.skyHorizon);ye.uniforms.uSkyHorizon=new g(m,x,y),ye.uniforms.uCloudDensity=t.cloudDensity,ye.uniforms.uCloudSpeed=t.cloudSpeed,C?.setLook({skyFill:t.skyFill,groundFill:t.groundFill,hazeAmount:t.hazeAmount,hazeStart:t.hazeStart})}const Xe=Eo((t,a)=>$e(a));$e(Xe.getPreset("dia"));function Fo(t){me={from:He.toDate(U.clock.currentTime).getTime(),to:_o(t.iso),start:performance.now(),dur:1600},L.fog.density=t.fog,Xe.setActivePreset(t.id),$e(Xe.getPreset(t.id)),L.skyAtmosphere&&(L.skyAtmosphere.hueShift=0,L.skyAtmosphere.saturationShift=t.id==="tarde"?.08:t.id==="noche"?-.25:.06,L.skyAtmosphere.brightnessShift=t.id==="noche"?-.55:t.id==="tarde"?-.04:0);const i=pe,o=Se,n=performance.now(),l=()=>{const m=Math.min(1,(performance.now()-n)/1400),x=m*m*(3-2*m);pe=i+(t.night-i)*x,Se=o+(t.tarde-o)*x,C?.setNight(pe),Y?.setNight(pe),C?.setTarde(Se),ye.uniforms.uNight=pe,ye.uniforms.uTarde=Se,ge.uniforms.uNight=pe,ge.uniforms.uTarde=Se,m<1&&requestAnimationFrame(l)};requestAnimationFrame(l),document.querySelectorAll("[data-light]").forEach(m=>m.classList.toggle("on",m.dataset.light===t.id));const h=H("clockLabel");h&&(h.textContent=t.label)}document.querySelectorAll("[data-light]").forEach(t=>{t.addEventListener("click",()=>{const a=Ro.find(i=>i.id===t.dataset.light);a&&Fo(a)})});let Ee=!1;const lt=H("btnOrbit"),ft=H("btnPedestrian");function ce(){Ee=!1,lt?.classList.remove("on")}function De(t,a=2){ce();const i=Ye[t];F.flyTo({pivot:Je(i.place),heading:i.heading,pitch:i.pitch,range:i.range},a)}H("btnHome")?.addEventListener("click",()=>De("general",2.2));H("btnAerial")?.addEventListener("click",()=>De("aerial"));H("btnArch")?.addEventListener("click",()=>De("arch"));ft?.addEventListener("click",()=>{ce(),F.isWalking?F.exitWalk():F.enterWalk(Q?Vt(Q):void 0)});F.onModeChange=t=>{ft?.classList.toggle("on",t);const a=H("hint");a&&t&&(a.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",a.classList.remove("fade"),setTimeout(()=>a.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(t=>{t.addEventListener("click",()=>{ce();const a=t.dataset.place;F.flyTo({pivot:Je(a),range:a==="hotel"?300:520,pitch:-.5},2)})});lt?.addEventListener("click",()=>{Ee=!Ee,lt.classList.toggle("on",Ee),Ee&&F.isWalking&&F.exitWalk()});ht.addEventListener("pointerdown",ce);ht.addEventListener("wheel",ce,{passive:!0});addEventListener("keydown",t=>{t.code==="Escape"&&(F.isWalking?F.exitWalk():Qe(null)),(t.code==="KeyH"||t.code==="Home")&&De("general",2.2),t.code==="KeyP"&&ft?.click()});let Q=null,mt=null;const Ho=9;let qe=null,Y=null,ke=null;function Dt(){!C||!Y||(C.setRevitZone(Y.caja),Y.play(),ke?.mark(-1),ke?.show(!0))}function Ut(){C&&(qe={start:performance.now()},C.setHotelFloors(0))}let be=null;const je=H("card");function No(t){return Te((t.bb[0]+t.bb[2])/2,(t.bb[1]+t.bb[3])/2,t.b+t.h*.5)}function Vt(t){return Te((t.bb[0]+t.bb[2])/2,t.bb[1]-9,t.b)}function Qe(t){const a=Q?.s==="Hotel";if(Q=t,be&&(U.entities.remove(be),be=null),!t||!C){je&&(je.hidden=!0),ke?.show(!1);return}t.s!=="Hotel"?ke?.show(!1):Y?.visible&&ke?.show(!0);const i=t.r.map(([u,f])=>Te(u,f,0,C.matrix)),o=2572+t.b-.5;be=U.entities.add({polygon:{hierarchy:new oo(i),height:o,extrudedHeight:o+t.h+2.2,material:W.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:W.fromCssColorString("#d7ebff"),shadows:se.DISABLED}});const n=t.s==="Hotel";n&&!a&&(Y?(Dt(),be&&(U.entities.remove(be),be=null)):Ut(),ce(),F.flyTo({pivot:Je("hotel"),pitch:-.38,range:290},1.8));const l=n&&C?C.buildings.filter(u=>u.s==="Hotel"):[t],h=u=>Math.abs(u.r.reduce((f,w,M)=>{const P=u.r[(M+1)%u.r.length];return f+w[0]*P[1]-P[0]*w[1]},0)/2),m=l.reduce((u,f)=>u+h(f),0),x=l.reduce((u,f)=>u+h(f)*f.p,0),y=Math.max(...l.map(u=>u.p)),d=Math.max(...l.map(u=>u.h));Math.abs(t.r.reduce((u,f,w)=>{const M=t.r[(w+1)%t.r.length];return u+f[0]*M[1]-M[0]*f[1]},0)/2),H("cardKind").textContent=n?"Proyecto":`Sector ${t.s}`,H("cardTitle").textContent=n?"Hotel La Fontana":`Edificación ${t.id+1}`,H("cardData").innerHTML=`<dt>Pisos</dt><dd>${n?"hasta "+y:t.p}</dd><dt>Altura</dt><dd>${d.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(m).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(x).toLocaleString("es-CO")} m²</dd>`,je&&(je.hidden=!1)}F.onPick=t=>{C&&Qe(t?C.buildingAt(t):null)};H("cardClose")?.addEventListener("click",()=>Qe(null));H("cardFocus")?.addEventListener("click",()=>{if(!Q)return;ce();const t=Math.max(Q.bb[2]-Q.bb[0],Q.bb[3]-Q.bb[1],Q.h);F.flyTo({pivot:No(Q),pitch:-.42,range:Math.max(60,t*2.1)},1.7)});H("cardWalk")?.addEventListener("click",()=>{Q&&(ce(),F.enterWalk(Vt(Q)))});const nt=H("status"),Pt=H("statusText");async function Oo(){at("Contexto geográfico",.04),await new Promise(i=>setTimeout(i,30)),C=await bo(U,(i,o)=>at(i,o),(i,o,n)=>{!nt||!Pt||(nt.hidden=!1,Pt.textContent=i<o?`Cargando secciones ${i}/${o} · ${n}`:`Modelo completo · ${o} secciones`,i>=o&&setTimeout(()=>nt.classList.add("fade"),2600))}),C.setNight(pe),C.setTarde(Se);const t=document.querySelector("[data-light].on")?.dataset.light||"dia";$e(Xe.getPreset(t)),Oe(),at("Listo",1),De("general",2.4),Lt.classList.add("done"),setTimeout(()=>Lt.remove(),900);const a=H("hint");a&&setTimeout(()=>a.classList.add("fade"),9e3),window.__READY__=!0,C.done.then(async()=>{mt=await Co(U,C.matrix),Y=await ko(U,C.matrix),Y&&(Y.setNight(pe),ke=To(Y,i=>{if(!Y)return;ce(),ke?.mark(i),i<0?Y.full():Y.openAt(i);const o=Y.caja;F.flyTo({pivot:Te((o[0]+o[2])/2,(o[1]+o[3])/2,12),pitch:i<0?-.42:-.95,range:i<0?230:150},1.4)})),window.__ALL__=!0})}const $={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:to,viewer:U,cam:F,getSite:()=>C,enuToWorld:Te,select:Qe,stats:$,playHotel:Ut,playRevit:Dt,getRevit:()=>Y,getTrafico:()=>mt,setQuality:t=>{Z=t,Oe()}};Oo().catch(t=>{console.error(t),Ot.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(t?.message??t)});let It=performance.now(),st=0;function Bt(){const t=performance.now(),a=Math.min(.1,(t-It)/1e3);if(It=t,me){const o=Math.min(1,(t-me.start)/me.dur),n=o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2;U.clock.currentTime=He.fromDate(new Date(me.from+(me.to-me.from)*n)),o>=1&&(me=null)}if(qe&&C){const o=(t-qe.start)/550,n=Math.floor(o),l=o-n,h=1-Math.pow(1-Math.min(1,l*1.6),3);n>=Ho?(C.setHotelFloors(99),qe=null):C.setHotelFloors(n+h)}Y?.update(a,t),mt?.update(a);const i=t*.001;if(C?.setTime(i),ye.uniforms.uTime=i,Ee&&!F.isWalking&&F.flyTo({heading:F.state.heading+.16*a},0),F.update(a),$.frames++,t-$.t0>=2e3){$.fps=Math.round($.frames*1e3/(t-$.t0)),$.frames=0,$.t0=t,window.__FPS__=$.fps;const o=!!C&&C.sections.loaded>=C.sections.total&&t-st>8e3;C&&C.sections.loaded>=C.sections.total&&!st&&(st=t),o&&document.visibilityState==="visible"&&($.fps<20&&Z>.25&&!window.__DBG__.lock?++$.low>=3&&(Z=Z>=1?.5:.25,$.low=0,Oe()):$.low=0)}requestAnimationFrame(Bt)}requestAnimationFrame(Bt);addEventListener("resize",Oe);
