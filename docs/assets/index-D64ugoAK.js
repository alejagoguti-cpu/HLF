var Xt=Object.defineProperty;var Gt=(e,o,a)=>o in e?Xt(e,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[o]=a;var z=(e,o,a)=>Gt(e,typeof o!="symbol"?o+"":o,a);import{C as x,a as Dt,T as ft,M as U,b as Te,c as De,H as Zt,P as Ot,d as Be,L as Kt,U as A,V as oe,e as Re,f as _e,g as et,h as tt,i as Tt,j as Jt,S as se,I as Ut,k as $t,R as Qt,l as Oe,A as ne,m as j,n as st,o as St,p as At,q as eo,r as to,s as oo,t as ao,J as Ue,u as io,v as no,w as so}from"./cesium-ICe9G6Ok.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&t(f)}).observe(document,{childList:!0,subtree:!0});function a(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function t(s){if(s.ep)return;s.ep=!0;const c=a(s);fetch(s.href,c)}})();const rt="/HLF/",ro=rt.endsWith("/")?rt:rt+"/",lo=ro+"cesium/";window.CESIUM_BASE_URL=lo;const Ke={longitude:-74.04145021,latitude:4.70207636,height:2572},lt={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},Je={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Se={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},co=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Et=-1.5533,Lt=-.012,uo=4200,ho=6,zt=1.7;class fo{constructor(o){z(this,"viewer");z(this,"canvas");z(this,"pivot",new x);z(this,"heading",.5);z(this,"pitch",-.6);z(this,"range",1200);z(this,"targetPivot",new x);z(this,"targetHeading",.5);z(this,"targetPitch",-.6);z(this,"targetRange",1200);z(this,"damping",9);z(this,"drag",null);z(this,"pointers",new Map);z(this,"pinch",null);z(this,"lastTap",0);z(this,"keys",new Set);z(this,"tween",null);z(this,"fov",Dt.toRadians(48));z(this,"walking",!1);z(this,"eye",new x);z(this,"eyeTarget",new x);z(this,"wHeading",0);z(this,"wPitch",0);z(this,"wHeadingT",0);z(this,"wPitchT",0);z(this,"onPick",null);z(this,"onModeChange",null);z(this,"groundHeight",null);this.viewer=o,this.canvas=o.scene.canvas,o.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:x.clone(this.targetPivot)}}setPivot(o,a=!0){if(a){const t=x.clone(this.viewer.camera.positionWC),s=x.subtract(t,o,new x),c=x.magnitude(s),f=ft.eastNorthUpToFixedFrame(o),h=U.inverseTransformation(f,new U),w=U.multiplyByPointAsVector(h,s,new x);if(c>1){const M=-Math.asin(Math.max(-1,Math.min(1,w.z/c)));if(M<Lt&&M>Et){let y=Math.atan2(-w.x,-w.y);for(;y-this.heading>Math.PI;)y-=Math.PI*2;for(;y-this.heading<-Math.PI;)y+=Math.PI*2;this.heading=this.targetHeading=y,this.pitch=this.targetPitch=M,this.range=this.targetRange=this.clamp(c),x.clone(o,this.pivot)}}}this.targetPivot=x.clone(o),this.tween=null}bind(){const o=this.canvas;o.style.touchAction="none",o.addEventListener("pointerdown",t=>{if(o.setPointerCapture(t.pointerId),this.pointers.set(t.pointerId,{x:t.offsetX,y:t.offsetY}),this.pointers.size===2){const[s,c]=[...this.pointers.values()];this.pinch={distance:Math.hypot(s.x-c.x,s.y-c.y),range:this.targetRange,cx:(s.x+c.x)/2,cy:(s.y+c.y)/2},this.drag=null;return}t.button===2||t.button===1||t.shiftKey?this.drag={id:t.pointerId,x:t.offsetX,y:t.offsetY,mode:"pan",moved:!1}:t.button===0&&(this.drag={id:t.pointerId,x:t.offsetX,y:t.offsetY,mode:"orbit",moved:!1}),this.tween=null}),o.addEventListener("pointermove",t=>{if(!this.pointers.has(t.pointerId))return;if(this.pointers.set(t.pointerId,{x:t.offsetX,y:t.offsetY}),this.pointers.size===2&&this.pinch){const[f,h]=[...this.pointers.values()],w=Math.hypot(f.x-h.x,f.y-h.y),M=(f.x+h.x)/2,y=(f.y+h.y)/2;this.walking?this.walk((this.pinch.cy-y)*.06,0):(w>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/w)),this.pan(this.pinch.cx-M,y-this.pinch.cy)),this.pinch.cx=M,this.pinch.cy=y;return}if(!this.drag||t.pointerId!==this.drag.id)return;const s=t.offsetX-this.drag.x,c=t.offsetY-this.drag.y;this.drag.x=t.offsetX,this.drag.y=t.offsetY,Math.abs(s)+Math.abs(c)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=s*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+c*.0028))):this.walk(c*.05,-s*.05):this.drag.mode==="orbit"?(this.targetHeading-=s*.0042,this.targetPitch=this.clampPitch(this.targetPitch-c*.0034)):this.pan(-s,c)});const a=t=>{if(this.pointers.delete(t.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&t.pointerId===this.drag.id){const s=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,s&&t.type==="pointerup"){const c=new Te(t.offsetX,t.offsetY),f=performance.now();if(t.pointerType!=="mouse"&&f-this.lastTap<320){this.lastTap=0,this.focusAt(c);return}this.lastTap=f;const h=this.pickWorld(c);h&&!this.walking&&this.setPivot(h,!0),this.onPick?.(h)}}};o.addEventListener("pointerup",a),o.addEventListener("pointercancel",a),o.addEventListener("contextmenu",t=>t.preventDefault()),o.addEventListener("wheel",t=>{t.preventDefault(),this.tween=null;const s=t.deltaMode===1?16:t.deltaMode===2?100:1,c=t.deltaY*s;if(this.walking){this.walk(-c*.02,0);return}const f=Math.exp(Math.max(-.45,Math.min(.45,c*.0016))),h=this.pickWorld(new Te(t.offsetX,t.offsetY)),w=this.clamp(this.targetRange*f);if(h&&f<1){const M=Math.min(.45,(this.targetRange-w)/this.targetRange)*.8,y=x.subtract(h,this.targetPivot,new x),m=x.magnitude(y);if(m>1){const u=Math.min(m,this.targetRange)*M/m;x.add(this.targetPivot,x.multiplyByScalar(y,u,y),this.targetPivot)}}this.targetRange=w},{passive:!1}),o.addEventListener("dblclick",t=>{t.preventDefault(),this.focusAt(new Te(t.offsetX,t.offsetY))}),addEventListener("keydown",t=>{t.target instanceof HTMLInputElement||(this.keys.add(t.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(t.code)&&t.preventDefault())}),addEventListener("keyup",t=>this.keys.delete(t.code)),addEventListener("blur",()=>this.keys.clear())}clamp(o,a=ho,t=uo){return Math.max(a,Math.min(t,o))}clampPitch(o){return Math.max(Et,Math.min(Lt,o))}moveHorizontal(o,a,t,s){const c=ft.eastNorthUpToFixedFrame(o),f=new x(Math.sin(a)*t+Math.cos(a)*s,Math.cos(a)*t-Math.sin(a)*s,0);U.multiplyByPoint(c,f,o)}pan(o,a){const t=this.canvas.clientHeight||1,s=2*this.range*Math.tan(this.fov/2)/t,c=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,a*s/c,o*s),this.tween=null}walk(o,a){this.moveHorizontal(this.eyeTarget,this.wHeading,o,a),this.snapEye()}snapEye(){const o=De.fromCartesian(this.eyeTarget),a=this.groundHeight?.(o);a!==void 0&&Number.isFinite(a)&&(o.height=a+zt,De.toCartesian(o,void 0,this.eyeTarget))}pickWorld(o){const a=this.viewer.scene;let t;if(a.pickPositionSupported&&a.pick(o,4,4)&&(t=a.pickPosition(o)),!t){const s=a.camera.getPickRay(o);s&&(t=a.globe.pick(s,a)??void 0)}return t??null}focusAt(o){const a=this.pickWorld(o);if(a){if(this.walking){x.clone(a,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:a,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(o,a=2){this.walking&&this.exitWalk(!1);const t={pivot:o.pivot??x.clone(this.targetPivot),heading:o.heading??this.targetHeading,pitch:o.pitch??this.targetPitch,range:o.range??this.targetRange};let s=t.heading;for(;s-this.targetHeading>Math.PI;)s-=Math.PI*2;for(;s-this.targetHeading<-Math.PI;)s+=Math.PI*2;if(t.heading=s,a<=.02){this.tween=null,this.targetPivot=x.clone(t.pivot),this.pivot=x.clone(t.pivot),this.heading=this.targetHeading=t.heading,this.pitch=this.targetPitch=t.pitch,this.range=this.targetRange=t.range;return}this.tween={from:{pivot:x.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:t,start:performance.now(),duration:a*1e3}}enterWalk(o){x.clone(o??this.targetPivot,this.eyeTarget),this.snapEye(),x.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(o=!0){if(!this.walking)return;this.walking=!1;const a=De.fromCartesian(this.eyeTarget);a.height-=zt-1;const t=De.toCartesian(a);this.pivot=x.clone(t),this.targetPivot=t,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,o?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(o){if(!this.keys.size)return;const a=this.keys,t=a.has("ShiftLeft")||a.has("ShiftRight")?3:1;let s=0,c=0;(a.has("KeyW")||a.has("ArrowUp"))&&(s+=1),(a.has("KeyS")||a.has("ArrowDown"))&&(s-=1),(a.has("KeyD")||a.has("ArrowRight"))&&(c+=1),(a.has("KeyA")||a.has("ArrowLeft"))&&(c-=1);let f=0;if(a.has("KeyQ")&&(f+=1),a.has("KeyE")&&(f-=1),this.walking){f&&(this.wHeadingT-=f*1.2*o),(s||c)&&this.walk(s*4.2*t*o,c*3.4*t*o);return}if(f&&(this.targetHeading+=f*.9*o,this.tween=null),(a.has("PageUp")||a.has("Equal")||a.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*o))),(a.has("PageDown")||a.has("Minus")||a.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*o))),a.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*o)),a.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*o)),!s&&!c)return;const h=Math.max(8,this.range*.6)*t*o;this.moveHorizontal(this.targetPivot,this.heading,s*h,c*h),this.tween=null}update(o){this.updateKeys(o);const a=1-Math.exp(-this.damping*o);if(this.walking){x.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*o),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*a,this.wPitch+=(this.wPitchT-this.wPitch)*a,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const t=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),s=co(t),{from:c,to:f}=this.tween;x.lerp(c.pivot,f.pivot,s,this.targetPivot),this.targetHeading=c.heading+(f.heading-c.heading)*s,this.targetPitch=c.pitch+(f.pitch-c.pitch)*s,this.targetRange=Math.exp(Math.log(c.range)+(Math.log(f.range)-Math.log(c.range))*s),t>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*a,this.pitch+=(this.targetPitch-this.pitch)*a,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*a),x.lerp(this.pivot,this.targetPivot,a,this.pivot),this.viewer.camera.lookAt(this.pivot,new Zt(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(U.IDENTITY)}}function mo(){return new _e({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const Bt=()=>({uAerial:{type:A.SAMPLER_2D,value:mo()},uAerialRect:{type:A.VEC4,value:new Re(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:A.FLOAT,value:0}}),Vt=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,ot=`
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
`;function po(){return new Be({uniforms:{uNight:{type:A.FLOAT,value:0},uTarde:{type:A.FLOAT,value:0},uSkyFill:{type:A.FLOAT,value:.24},uHazeAmount:{type:A.FLOAT,value:.08},uHazeStart:{type:A.FLOAT,value:1200},uHotelPisos:{type:A.FLOAT,value:99},uRevitBox:{type:A.VEC4,value:new Re(0,0,0,0)},uLean:{type:A.VEC2,value:new Te(0,0)},...Bt()},varyings:{vPosM:oe.VEC3,vUpEC:oe.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:ot+Vt+`
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
    `})}function go(e,o,a){return new Be({uniforms:{uNight:{type:A.FLOAT,value:0},uTarde:{type:A.FLOAT,value:0},uSkyFill:{type:A.FLOAT,value:.22},uHazeAmount:{type:A.FLOAT,value:.08},uHazeStart:{type:A.FLOAT,value:1200},uTime:{type:A.FLOAT,value:0},uFrame:{type:A.FLOAT,value:o},uTop:{type:A.FLOAT,value:a},uAtlas:{type:A.SAMPLER_2D,value:new _e({url:e,repeat:!1,minificationFilter:et.LINEAR_MIPMAP_LINEAR,magnificationFilter:tt.LINEAR})}},varyings:{vUV:oe.VEC2,vView:oe.VEC3,vRightT:oe.VEC2,vUpT:oe.VEC2,vUpEC:oe.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:ot+`
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
    `})}function vo(){return new Be({uniforms:{uNight:{type:A.FLOAT,value:0},uTarde:{type:A.FLOAT,value:0},uHazeAmount:{type:A.FLOAT,value:.08},uHazeStart:{type:A.FLOAT,value:1200}},lightingModel:Kt.UNLIT,fragmentShaderText:ot+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function yo(e,o,a){return new Ot({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:e,uNorth:o,uUp:a,uSkyZenith:new x(.16,.42,.82),uSkyHorizon:new x(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function xo(){return new Ot({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new x(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function wo(e){const o=a=>({type:A.SAMPLER_2D,value:new _e({url:e+a,repeat:!0,minificationFilter:et.LINEAR_MIPMAP_LINEAR,magnificationFilter:tt.LINEAR})});return new Be({uniforms:{uNight:{type:A.FLOAT,value:0},uTarde:{type:A.FLOAT,value:0},uGroundFill:{type:A.FLOAT,value:.12},uHazeAmount:{type:A.FLOAT,value:.08},uHazeStart:{type:A.FLOAT,value:1200},uAsfalto:o("tex_asfalto.webp"),uAnden:o("tex_anden.webp"),uPrado:o("tex_prado.webp"),uCiclo:o("tex_ciclo.webp"),...Bt()},varyings:{vG:oe.VEC3,vUpEC:oe.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:ot+Vt+`
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
    `})}function gt(){return ft.eastNorthUpToFixedFrame(x.fromDegrees(Ke.longitude,Ke.latitude,Ke.height))}function Ee(e,o,a,t=gt()){return U.multiplyByPoint(t,new x(e,o,a),new x)}const bo={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function Co(e,o,a){let t=!1;for(let s=0,c=a.length-1;s<a.length;c=s++){const[f,h]=a[s],[w,M]=a[c];h>o!=M>o&&e<(w-f)*(o-h)/(M-h)+f&&(t=!t)}return t}function Mo(e,o,a){let t=1/0;for(let s=0,c=a.length-1;s<a.length;c=s++){const[f,h]=a[c],[w,M]=a[s],y=w-f,m=M-h,u=Math.max(0,Math.min(1,((e-f)*y+(o-h)*m)/(y*y+m*m||1)));t=Math.min(t,Math.hypot(e-f-u*y,o-h-u*m))}return t}async function ko(e,o,a){const t=e.scene,s=gt(),c=U.inverseTransformation(s,new U),f=Se.secciones;o("Contexto urbano",.08);const[h,w,M,y]=await Promise.all([fetch(f+"recorte.json").then(l=>l.json()),fetch(f+"edificios.json").then(l=>l.json()),fetch(f+"arboles.json").then(l=>l.json()),fetch(f+"suelo.json").then(l=>l.json())]),m=()=>h.clips.map(l=>{const i=new $t({positions:x.fromDegreesArray(l.flat())}),r=i.computeRectangle();return i.computeRectangle=d=>Qt.clone(r,d),i});t.globe.clippingPolygons=new Tt({polygons:m()});const u=vo();let v=null;try{v=await Jt.fromUrl(Se.googleTiles,{maximumScreenSpaceError:10,shadows:se.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),v.clippingPolygons=new Tt({polygons:m()}),v.customShader=u,t.primitives.add(v)}catch(l){console.warn("Tiles de Google no disponibles",l)}const p=[-236,330],T=[];for(const l of w.secciones)T.push({key:l.key,file:l.file,kind:"edificios",label:l.key==="Hotel"?"Hotel La Fontana":`Edificaciones · sector ${l.key}`,dist:l.key==="Hotel"?-2:Math.hypot(l.c[0]-p[0],l.c[1]-p[1])});T.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),T.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),T.sort((l,i)=>l.dist-i.dist);const q={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},H=y.secciones.map(l=>({key:l.key,file:l.file,kind:"suelo",capa:q[l.key]?.[0]??0,label:q[l.key]?.[1]??l.key,dist:-3})),J=M.secciones.map(l=>({key:l.key,file:l.file,kind:"arboles",atlas:l.atlas,marco:l.marco,marcoSup:l.marcoSup,label:bo[l.key]??"Vegetación",dist:0})),_=[...H,...T.slice(0,4),...J.slice(0,3),...T.slice(4,9),...J.slice(3),...T.slice(9)],Y=po(),F=wo(f);(async()=>{try{const l=await Ut.fromAssetId(Se.imageryAssetId),i=18,r=l.tilingScheme,d=(V,ae)=>De.fromCartesian(Ee(V,ae,0,s)),n=r.positionToTileXY(d(-1010,930),i),g=r.positionToTileXY(d(1010,-940),i),S=g.x-n.x+1,E=g.y-n.y+1,k=l.tileWidth,b=document.createElement("canvas");b.width=S*k,b.height=E*k;const P=b.getContext("2d"),X=[];for(let V=n.y;V<=g.y;V++)for(let ae=n.x;ae<=g.x;ae++)X.push([ae,V]);const $=async([V,ae])=>{for(let bt=0;bt<40;bt++){const Ct=l.requestImage(V,ae,i);if(Ct){try{const Ne=await Ct,Mt=(V-n.x)*k,kt=(ae-n.y)*k;typeof ImageBitmap<"u"&&Ne instanceof ImageBitmap?(P.save(),P.translate(Mt,kt+k),P.scale(1,-1),P.drawImage(Ne,0,0,k,k),P.restore()):P.drawImage(Ne,Mt,kt,k,k)}catch{}return}await new Promise(Ne=>setTimeout(Ne,120))}};P.fillStyle="#6a6f62",P.fillRect(0,0,b.width,b.height);const L=Array.from({length:6},async()=>{for(;X.length;)await $(X.shift())});await Promise.all(L);const B=document.createElement("canvas");B.width=B.height=4096,B.getContext("2d").drawImage(b,0,0,4096,4096);const R=await new Promise(V=>B.toBlob(V,"image/jpeg",.92));if(!R)return;const O=URL.createObjectURL(R);window.__AERIAL_URL__=O;const Z=r.tileXYToRectangle(n.x,n.y,i),te=r.tileXYToRectangle(g.x,g.y,i),ve=(V,ae)=>U.multiplyByPoint(c,x.fromRadians(V,ae,Ke.height),new x),ye=ve(Z.west,te.south),qe=ve(te.east,Z.north),nt=new Re(ye.x,ye.y,qe.x,qe.y);for(const V of[Y,F])V.setUniform("uAerial",new _e({url:O,repeat:!1,minificationFilter:et.LINEAR_MIPMAP_LINEAR,magnificationFilter:tt.LINEAR})),V.setUniform("uAerialRect",nt),V.setUniform("uAerialOn",1)}catch(l){console.warn("Foto aérea no disponible",l)}})();const re=[],He=[];let pe=0,ke=0,le=.22,ce=.08,de=1200;const ge={total:_.length,loaded:0,failed:[]},ue=async l=>{try{const i=await Oe.fromGltfAsync({url:f+l.file,modelMatrix:s,upAxis:ne.Y,forwardAxis:ne.X,shadows:l.kind==="arboles"?se.CAST_ONLY:l.kind==="suelo"?se.RECEIVE_ONLY:se.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:l.kind!=="arboles"});if(l.kind==="suelo")i.customShader=F;else if(l.kind==="arboles"){const r=go(f+l.atlas,l.marco,l.marcoSup);r.setUniform("uNight",pe),r.setUniform("uTarde",ke),r.setUniform("uSkyFill",le),r.setUniform("uHazeAmount",ce),r.setUniform("uHazeStart",de),re.push(r),i.customShader=r}else l.kind!=="cubierta_pbr"&&(i.customShader=Y);i.imageBasedLighting.imageBasedLightingFactor=l.kind==="cubierta_pbr"?new Te(.85,.55):new Te(.75,.45),t.primitives.add(i),l.kind==="arboles"&&He.push(i),await new Promise(r=>{if(i.ready)return r();const d=i.readyEvent.addEventListener(()=>{d(),r()});setTimeout(r,2e4)})}catch(i){console.error("Sección no cargada",l.file,i),ge.failed.push(l.file)}ge.loaded++,a?.(ge.loaded,ge.total,l.label)},Le=H.length+7;for(let l=0;l<Math.min(Le,_.length);l++)o(_[l].label,.2+.75*l/Le),await ue(_[l]);const We=(async()=>{for(let l=Le;l<_.length;l++)await ue(_[l]),await new Promise(i=>setTimeout(i,60))})();return{matrix:s,inverse:c,tileset:v,buildings:w.edificios,treeCount:M.total,sections:ge,done:We,setNight(l){u.setUniform("uNight",l),Y.setUniform("uNight",l),pe=l,F.setUniform("uNight",l);for(const i of re)i.setUniform("uNight",l)},setTarde(l){u.setUniform("uTarde",l),Y.setUniform("uTarde",l),ke=l,F.setUniform("uTarde",l);for(const i of re)i.setUniform("uTarde",l)},setTime(l){for(const i of re)i.setUniform("uTime",l)},setLook(l){if(l.skyFill!==void 0){le=l.skyFill,Y.setUniform("uSkyFill",le);for(const i of re)i.setUniform("uSkyFill",le)}if(l.groundFill!==void 0&&F.setUniform("uGroundFill",l.groundFill),l.hazeAmount!==void 0){ce=l.hazeAmount,Y.setUniform("uHazeAmount",ce),F.setUniform("uHazeAmount",ce),u.setUniform("uHazeAmount",ce);for(const i of re)i.setUniform("uHazeAmount",ce)}if(l.hazeStart!==void 0){de=l.hazeStart,Y.setUniform("uHazeStart",de),F.setUniform("uHazeStart",de),u.setUniform("uHazeStart",de);for(const i of re)i.setUniform("uHazeStart",de)}},setRevitZone(l){Y.setUniform("uRevitBox",l?new Re(l[0]-1,l[1]-1,l[2]+1,l[3]+1):new Re(0,0,0,0))},setHotelFloors(l){Y.setUniform("uHotelPisos",l)},setTreesVisible(l){for(const i of He)i.show=l},buildingAt(l){const i=U.multiplyByPoint(c,l,new x);let r=null,d=1.2;for(const n of w.edificios){if(i.x<n.bb[0]-1.5||i.x>n.bb[2]+1.5||i.y<n.bb[1]-1.5||i.y>n.bb[3]+1.5||i.z>n.b+n.h+2.5)continue;if(Co(i.x,i.y,n.r))return n;const g=Mo(i.x,i.y,n.r);g<d&&(d=g,r=n)}return r}}}const Ye=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Pt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],It=3.2;async function To(e,o,a=110){const t=Se.secciones;let s,c,f;try{s=await fetch(t+"vias_campo.json").then(r=>r.json());const i=new Uint8Array(await fetch(t+"vias_campo.bin").then(r=>r.arrayBuffer()));c=i.subarray(0,s.w*s.h),f=i.subarray(s.w*s.h)}catch{return null}const{cell:h,x0:w,y0:M,w:y,h:m}=s,u=(i,r)=>{const d=(i-w)/h-.5,n=(r-M)/h-.5,g=Math.floor(d),S=Math.floor(n);if(g<0||S<0||g>=y-1||S>=m-1)return 0;const E=d-g,k=n-S,b=S*y+g;return((c[b]*(1-E)+c[b+1]*E)*(1-k)+(c[b+y]*(1-E)+c[b+y+1]*E)*k)*.5},v=(i,r)=>{const d=Math.max(0,Math.min(y-1,Math.floor((i-w)/h))),n=Math.max(0,Math.min(m-1,Math.floor((r-M)/h))),g=n*y+d;if(c[g]>0)return f[g]*.1-2;let S=0,E=0;for(let k=-2;k<=2;k++){const b=n+k;if(!(b<0||b>=m))for(let P=-2;P<=2;P++){const X=d+P;if(X<0||X>=y)continue;const $=b*y+X;if(c[$]===0)continue;const L=1/(P*P+k*k+.5);S+=L,E+=(f[$]*.1-2)*L}}return S>0?E/S:1},p=[],T=[],q=[];for(let i=2;i<m-2;i++)for(let r=2;r<y-2;r++){const d=i*y+r,n=w+(r+.5)*h,g=M+(i+.5)*h,S=Math.hypot(n+180,g-250);if(S>520)continue;const E=c[d]*.5;if(E>=2.6&&E<=5&&p.push(d),E>=6&&S<460&&q.push({e:n,n:g,d:E}),c[d]===0&&S<430){let k=!1;for(let b=-2;b<=2&&!k;b++)for(let P=-2;P<=2;P++)if(c[(i+b)*y+(r+P)]>0){k=!0;break}k&&T.push(d)}}if(!p.length)return null;q.sort((i,r)=>r.d-i.d);const H=[],J=(i,r,d)=>U.multiplyByPoint(o,new x(i,r,d),new x);for(const i of q){if(H.length>=6)break;if(H.some(k=>Math.hypot(k.e-i.e,k.n-i.n)<90))continue;const r=v(i.e,i.n),d=i.e+6.5,n=i.n+6.5,g=v(d,n);e.entities.add({position:J(d,n,g+2.4),cylinder:{length:4.8,topRadius:.11,bottomRadius:.14,material:j.fromCssColorString("#242933")}});const S=e.entities.add({position:J(d-.6,n,g+4.5),box:{dimensions:new x(.45,.45,1.05),material:j.LIME}}),E=e.entities.add({position:J(d,n-.6,g+4.5),box:{dimensions:new x(.45,.45,1.05),material:j.RED}});H.push({e:i.e,n:i.n,u:r,faseOffset:H.length*4.5,nsLuz:S,ewLuz:E,nsEstado:"green",ewEstado:"red"})}const _=(()=>{let i=12345;return()=>(i=i*1664525+1013904223>>>0)/4294967296})(),Y=(i,r,d)=>{const n=Math.cos(d),g=Math.sin(d);if(i>=-168&&i<=-118&&Math.abs(g)>.35)return i<-143?g<-.2?12:-1e6:g>.2?12:-1e6;const S=263-(i+420)*(51/380);return Math.abs(r-S)<26&&Math.abs(n)>.35?r>S?n>.2?12:-1e6:n<-.2?12:-1e6:i>=-255&&i<=-210&&r<222&&Math.abs(g)>.35?g<-.2?10:-1e6:r<175&&i<-215&&Math.abs(n)>.35?n>.2?10:-1e6:i<-385&&r<265&&Math.abs(g)>.35?g<-.2?10:-1e6:0},F=[],re=(i,r,d)=>F.some(n=>n!==d&&Math.hypot(n.e-i,n.n-r)<8.5),He=i=>{for(let r=0;r<45;r++){const d=p[Math.floor(_()*p.length)],n=w+(d%y+.5)*h,g=M+(Math.floor(d/y)+.5)*h;if(re(n,g,i))continue;let S=0,E=-1e9;for(let k=0;k<16;k++){const b=k/16*Math.PI*2,P=n+Math.cos(b)*10,X=g+Math.sin(b)*10,$=u(P,X),L=Y(P,X,b);if(L<-1e4)continue;const B=u(n+Math.sin(b)*2.5,g-Math.cos(b)*2.5),R=u(n-Math.sin(b)*2.5,g+Math.cos(b)*2.5),O=-Math.abs($-It)+(R>B?1.5:0)+L;$>1.5&&O>E&&(E=O,S=b)}if(E>-1e8){i.e=n,i.n=g,i.th=S,i.vActual=i.v*.5;return}}};for(let i=0;i<a;i++){const r=_(),d=r<.2?"taxi":r<.48?"suv":"sedan",n={e:0,n:0,th:0,v:6.5+_()*5,vActual:0,model:null,u:0,tipo:d};He(n),F.push(n)}const pe=[];if(T.length>0)for(let i=0;i<42;i++){const r=T[Math.floor(_()*T.length)],d=w+(r%y+.5)*h,n=M+(Math.floor(r/y)+.5)*h;pe.push({e:d,n,th:_()*Math.PI*2,v:1.15+_()*.45,model:null,u:v(d,n)+.16,conPerro:i%3===0})}const ke=[],le=(i,r,d,n,g,S,E,k=.68)=>{for(let b=0;b<g;b++){const P=g===1?(i+r)*.5:i+b/(g-1)*(r-i);for(let X=0;X<S;X++){if(_()>k)continue;const $=S===1?(d+n)*.5:d+X/(S-1)*(n-d);if(u(P,$)>.3)continue;const L=_(),B=L<.08?"taxi":L<.42?"suv":"sedan",R=_()<.5?0:Math.PI,O=v(P,$);ke.push({e:P+(_()-.5)*.25,n:$+(_()-.5)*.25,u:O>-1.5?O:3.55,th:E+R+(_()-.5)*.07,tipo:B,model:null})}}};le(92,134,-22,62,4,15,.05,.7),le(52,108,114,146,5,4,.12,.62),le(58,106,-104,-56,4,6,.1,.65),le(-132,-98,-46,32,3,12,.04,.68);const ce=new x,de=new At,ge=new U,ue=(i,r=.08)=>{i.model&&(x.fromElements(i.e,i.n,i.u+r,ce),At.fromRotationZ(i.th,de),U.fromRotationTranslation(de,ce,ge),i.model.modelMatrix=U.multiply(o,ge,new U))};(async()=>{for(let i=0;i<F.length;i++){const r=F[i],d=r.tipo==="taxi"?"carro_taxi.glb":r.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const n=await Oe.fromGltfAsync({url:t+d,upAxis:ne.Y,forwardAxis:ne.X,shadows:se.ENABLED,color:r.tipo==="taxi"?j.WHITE:j.fromCssColorString(Ye[i%Ye.length]),colorBlendMode:st.MIX,colorBlendAmount:r.tipo==="taxi"?0:.28});e.scene.primitives.add(n),r.model=n,r.u=v(r.e,r.n),ue(r)}catch{}i%6===5&&await new Promise(n=>setTimeout(n,35))}for(let i=0;i<pe.length;i++){const r=pe[i];try{const d=await Oe.fromGltfAsync({url:t+(r.conPerro?"persona_perro.glb":"persona.glb"),upAxis:ne.Y,forwardAxis:ne.X,shadows:se.ENABLED,color:j.fromCssColorString(Pt[i%Pt.length]),colorBlendMode:st.MIX,colorBlendAmount:.25});e.scene.primitives.add(d),r.model=d,ue(r,0)}catch{}i%6===5&&await new Promise(d=>setTimeout(d,35))}for(let i=0;i<ke.length;i++){const r=ke[i],d=r.tipo==="taxi"?"carro_taxi.glb":r.tipo==="suv"?"carro_suv.glb":"carro.glb";try{const n=await Oe.fromGltfAsync({url:t+d,upAxis:ne.Y,forwardAxis:ne.X,shadows:se.ENABLED,color:r.tipo==="taxi"?j.WHITE:j.fromCssColorString(Ye[i*3%Ye.length]),colorBlendMode:st.MIX,colorBlendAmount:r.tipo==="taxi"?0:.28});e.scene.primitives.add(n),r.model=n,ue(r)}catch{}i%8===7&&await new Promise(n=>setTimeout(n,30))}})();let Le=!0,We=0;const l=(i,r)=>u(i,r)===0&&u(i+4,r)+u(i-4,r)+u(i,r+4)+u(i,r-4)>.5;return{count:a,debug:()=>F.map(i=>[Math.round(i.e),Math.round(i.n),+i.u.toFixed(1),i.model?1:0]),setVisible(i){Le=i;for(const r of F)r.model&&(r.model.show=i);for(const r of ke)r.model&&(r.model.show=i);for(const r of pe)r.model&&(r.model.show=i);for(const r of H)r.nsLuz.show=i,r.ewLuz.show=i},update(i){if(!Le)return;const r=Math.min(.08,Math.max(.001,i));We+=r;for(const d of H){const n=(We+d.faseOffset)%24,g=n<10?"green":n<12?"yellow":"red",S=n>=12&&n<22?"green":n>=22?"yellow":"red";g!==d.nsEstado&&(d.nsEstado=g,d.nsLuz.box.material.color=new St(g==="green"?j.LIME:g==="yellow"?j.YELLOW:j.RED)),S!==d.ewEstado&&(d.ewEstado=S,d.ewLuz.box.material.color=new St(S==="green"?j.LIME:S==="yellow"?j.YELLOW:j.RED))}for(let d=0;d<F.length;d++){const n=F[d];if(!n.model)continue;let g=0,S=-1e9;for(let L=-4;L<=4;L++){const B=L*.13,R=n.th+B,O=n.e+Math.cos(R)*9,Z=n.n+Math.sin(R)*9,te=u(O,Z);if(te<1.1||u(n.e+Math.cos(R)*4.5,n.n+Math.sin(R)*4.5)<.9)continue;const ye=Y(O,Z,R);if(ye<-1e4)continue;const qe=u(O+Math.sin(R)*2.5,Z-Math.cos(R)*2.5),nt=u(O-Math.sin(R)*2.5,Z+Math.cos(R)*2.5),V=-Math.abs(Math.min(te,6)-It)-Math.abs(B)*1.6+(nt>=qe?.6:0)+ye;V>S&&(S=V,g=B)}if(S<-1e8||Math.hypot(n.e+180,n.n-250)>580){He(n),n.u=v(n.e,n.n),ue(n);continue}const E=Math.cos(n.th),k=Math.sin(n.th);let b=1;for(let L=0;L<F.length;L++){if(L===d||!F[L].model)continue;const B=F[L],R=B.e-n.e,O=B.n-n.n,Z=R*R+O*O;if(Z>225)continue;const te=R*E+O*k,ve=Math.abs(-R*k+O*E);if(te>0&&te<12.5&&ve<2.35){const ye=te<6.4?0:(te-6.4)/6.1;ye<b&&(b=ye)}else Z<22&&L<d&&(b=0)}const P=Math.abs(E)>Math.abs(k);for(const L of H){if((P?L.ewEstado:L.nsEstado)==="green")continue;const R=L.e-n.e,O=L.n-n.n,Z=R*E+O*k,te=Math.abs(-R*k+O*E);if(Z>7&&Z<21&&te<9){const ve=Z<10.5?0:(Z-10.5)/10.5;ve<b&&(b=ve)}}const X=1-Math.min(.55,Math.abs(g)*1.4),$=n.v*X*b;if(n.vActual+=($-n.vActual)*Math.min(1,r*4.5),n.vActual>.05){n.th+=Math.max(-1.4*r,Math.min(1.4*r,g));const L=n.e+Math.cos(n.th)*n.vActual*r,B=n.n+Math.sin(n.th)*n.vActual*r;u(L,B)>=.7?(n.e=L,n.n=B):n.th+=.6;const R=Math.max(v(n.e,n.n),v(n.e+Math.cos(n.th)*1.4,n.n+Math.sin(n.th)*1.4),v(n.e-Math.cos(n.th)*1.4,n.n-Math.sin(n.th)*1.4));n.u+=(R-n.u)*Math.min(1,r*8)}ue(n)}for(const d of pe){if(!d.model)continue;const n=d.e+Math.cos(d.th)*d.v*r,g=d.n+Math.sin(d.th)*d.v*r;l(n,g)&&Math.hypot(n+180,g-250)<430?(d.e=n,d.n=g,d.u+=(v(d.e,d.n)+.16-d.u)*Math.min(1,r*4)):d.th+=.9+_()*1.2,ue(d,0)}}}}async function Rt(e,o){try{const a=new Image;a.decoding="async",a.src=e,await a.decode();const t=document.createElement("canvas");t.width=a.naturalWidth,t.height=a.naturalHeight;const s=t.getContext("2d");s.drawImage(a,0,0);const c=s.getImageData(0,0,t.width,t.height);return new _e({typedArray:new Uint8Array(c.data.buffer),width:t.width,height:t.height,repeat:!0,minificationFilter:et.LINEAR_MIPMAP_LINEAR,magnificationFilter:tt.LINEAR})}catch{return new _e({typedArray:new Uint8Array([...o,255]),width:1,height:1})}}function So(e,o){return new Be({uniforms:{uNight:{type:A.FLOAT,value:0},uLadrillo:{type:A.SAMPLER_2D,value:e},uTeja:{type:A.SAMPLER_2D,value:o}},varyings:{vRP:oe.VEC3,vRN:oe.VEC3},vertexShaderText:`
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
    `})}async function Ao(e,o){const a=Se.secciones;let t;try{t=await fetch(a+"revit.json").then(u=>u.json())}catch{return null}const[s,c]=await Promise.all([Rt(a+"tex_ladrillo.webp",[107,84,76]),Rt(a+"tex_teja.webp",[90,52,28])]),f=So(s,c),h=[];for(const u of t.niveles)try{const v=await Oe.fromGltfAsync({url:a+u.file,modelMatrix:o,upAxis:ne.Y,forwardAxis:ne.X,shadows:se.ENABLED,backFaceCulling:!1,show:!1});v.customShader=f,v.imageBasedLighting.imageBasedLightingFactor=new Te(.45,.25),e.scene.primitives.add(v),h.push({...u,model:v,off:0,target:0,delay:0,shown:!1})}catch(v){console.warn("Nivel de Revit no cargado",u.file,v)}if(!h.length)return null;const w=46,M=new U,y=u=>{const v=U.fromTranslation(new x(0,0,u.off),M);u.model.modelMatrix=U.multiply(o,v,new U)},m={niveles:h.map(u=>({i:u.i,nombre:u.nombre})),caja:t.caja,ready:!0,visible:!1,abierto:-1,play(){m.visible=!0,m.abierto=-1;const u=performance.now();h.forEach((v,p)=>{v.off=w,v.target=0,v.delay=u+p*620,v.shown=!1,v.model.show=!1,y(v)})},openAt(u){m.visible=!0,m.abierto=u;const v=performance.now();let p=0;for(const T of[...h].reverse())T.i>u&&(T.target=w,T.delay=v+p++*110);for(const T of h)T.i<=u&&(T.target=0,T.delay=v,T.shown||(T.off=w))},full(){m.visible=!0,m.abierto=-1;const u=performance.now();h.forEach((v,p)=>{(v.target!==0||!v.shown)&&(v.target=0,v.delay=u+p*110,v.shown||(v.off=w))})},hide(){m.visible=!1,m.abierto=-1;for(const u of h)u.model.show=!1,u.shown=!1,u.off=0,u.target=0},setNight(u){f.setUniform("uNight",u)},update(u,v){if(m.visible)for(const p of h){if(v<p.delay)continue;p.target===0&&!p.shown&&(p.shown=!0,p.model.show=!0);const T=p.target-p.off;if(Math.abs(T)<.01){p.off!==p.target&&(p.off=p.target,y(p)),p.target!==0&&p.shown&&(p.shown=!1,p.model.show=!1);continue}const q=p.target===0?1-Math.exp(-5.2*u):1-Math.exp(-4*u);p.off+=T*q,y(p)}}};return m}function Eo(e,o){const a=document.createElement("style");a.textContent=`
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
  `,document.head.appendChild(a);const t=document.createElement("aside");t.className="pisos",t.hidden=!0,t.innerHTML="<small>Pisos · modelo Revit</small>";const s=new Map,c=(h,w,M)=>{const y=document.createElement("button");y.innerHTML=`${w}<span>${M}</span>`,y.addEventListener("click",()=>o(h)),s.set(h,y),t.appendChild(y)};c(-1,"Edificio completo","");for(const h of[...e.niveles].reverse())c(h.i,h.nombre.charAt(0)+h.nombre.slice(1).toLowerCase(),`N${h.i+1}`);document.body.appendChild(t);const f=h=>s.forEach((w,M)=>w.classList.toggle("on",M===h));return f(-1),{show:h=>{t.hidden=!h},mark:f}}const Xe={dia:{sunIntensity:4.55,sunColor:"#ffffff",shadowDarkness:.69,aoIntensity:4,skyFill:.36,groundFill:0,exposure:1.28,contrast:.29,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:.2,skyZenith:"#000000",skyHorizon:"#c2c2d1",cloudDensity:1,cloudSpeed:3,hazeAmount:.5,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function ct(e){const o=/^#?([0-9a-f]{6})$/i.exec(e.trim());if(!o)return[1,1,1];const a=parseInt(o[1],16);return[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]}const Lo=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function zo(e){const o={dia:{...Xe.dia},tarde:{...Xe.tarde},noche:{...Xe.noche}};let a="dia";const t=document.createElement("button");t.id="btnLookStudio",t.className="look-toggle",t.textContent="⚙ Ajustar luz",t.title="Abrir editor de iluminación y color (L)",document.body.appendChild(t);const s=document.createElement("aside");s.id="lookPanel",s.className="look-panel",s.hidden=!0,s.innerHTML=`
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
  `,document.body.appendChild(s);const c=s.querySelector("#lpBody"),f=new Map;for(const m of Lo){const u=document.createElement("section");u.className="lp-sec";const v=document.createElement("h4");v.textContent=m.title,u.appendChild(v);for(const p of m.items){const T=document.createElement("label");T.className="lp-row";const q=document.createElement("span");q.className="lp-lbl",q.textContent=p.label,T.appendChild(q);const H=document.createElement("input");H.type=p.type,p.type==="range"&&(H.min=String(p.min),H.max=String(p.max),H.step=String(p.step));const J=p.type==="range"?document.createElement("span"):void 0;J&&(J.className="lp-val"),H.addEventListener("input",()=>{const Y=o[a];if(p.type==="range"){const F=parseFloat(H.value);Y[p.key]=F,J&&(J.textContent=p.step&&p.step>=1?String(Math.round(F)):F.toFixed(2))}else Y[p.key]=H.value;e(a,Y)});const _=document.createElement("div");_.className="lp-ctrl",_.appendChild(H),J&&_.appendChild(J),T.appendChild(_),u.appendChild(T),f.set(p.key,{input:H,val:J})}c.appendChild(u)}const h={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function w(){const m=o[a],u=s.querySelector("#lpPresetName");u&&(u.textContent=h[a]);for(const[v,{input:p,val:T}]of f){const q=m[v];if(p.value=String(q),T&&typeof q=="number"){const H=parseFloat(p.step||"0.01");T.textContent=H>=1?String(Math.round(q)):q.toFixed(2)}}}const M=()=>{s.hidden=!s.hidden,t.classList.toggle("on",!s.hidden)};t.addEventListener("click",M),s.querySelector("#lpClose")?.addEventListener("click",M);const y=s.querySelector("#lpCopy");return y.addEventListener("click",async()=>{const m=JSON.stringify({active:a,presets:o},null,2);try{await navigator.clipboard.writeText(m),y.textContent="¡JSON copiado!",setTimeout(()=>y.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",m)}}),s.querySelector("#lpReset")?.addEventListener("click",()=>{o[a]={...Xe[a]},w(),e(a,o[a])}),addEventListener("keydown",m=>{m.code==="KeyL"&&!m.ctrlKey&&!m.metaKey&&!m.altKey&&M()}),w(),{setActivePreset(m){a=m,w()},getPreset(m){return o[m]},toggle:M}}so.defaultAccessToken=Se.ionToken;const D=e=>document.getElementById(e),vt=D("cesiumContainer"),_t=D("loading"),Po=D("loadBar"),jt=D("loadLabel"),Io=D("loadPct");function ze(e,o){jt.textContent=e;const a=Math.round(Math.max(0,Math.min(1,o))*100);Po.style.width=a+"%",Io.textContent=a+"%"}const W=new eo(vt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:se.RECEIVE_ONLY,terrain:oo.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:to.fromProviderAsync(Ut.fromAssetId(Se.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),I=W.scene;I.globe.enableLighting=!0;I.globe.showGroundAtmosphere=!0;I.globe.depthTestAgainstTerrain=!0;I.globe.maximumScreenSpaceError=2;I.fog.enabled=!1;I.fog.density=18e-5;I.fog.minimumBrightness=.04;I.highDynamicRange=!0;I.msaaSamples=4;I.postProcessStages.fxaa.enabled=!0;I.screenSpaceCameraController.enableCollisionDetection=!1;I.light=new ao({intensity:3,color:j.fromCssColorString("#fff4e3")});const he=W.shadowMap;he.softShadows=!0;he.size=4096;he.maximumDistance=1200;he.darkness=.24;he.normalOffset=!0;{const e=he;e._primitiveBias.depthBias=8e-4,e._primitiveBias.normalOffsetScale=1.6,e._primitiveBias.normalShadingSmooth=.35}const Me=I.postProcessStages.ambientOcclusion;Me.enabled=!0;Me.uniforms.intensity=2.1;Me.uniforms.bias=.08;Me.uniforms.lengthCap=.35;Me.uniforms.stepSize=1.4;Me.uniforms.blurStepSize=1;const fe=I.postProcessStages.bloom;fe.enabled=!0;fe.uniforms.glowOnly=!1;fe.uniforms.contrast=128;fe.uniforms.brightness=-.36;fe.uniforms.delta=1;fe.uniforms.sigma=2.6;fe.uniforms.stepSize=1.5;const Ro=gt(),dt=e=>{const o=U.getColumn(Ro,e,new Re);return new x(o.x,o.y,o.z)},Ce=yo(dt(0),dt(1),dt(2));I.postProcessStages.add(Ce);const be=xo();I.postProcessStages.add(be);W.camera.frustum.fov=Dt.toRadians(48);const Ft=(()=>{try{const e=I.context._gl,o=e.getExtension("WEBGL_debug_renderer_info");return o?String(e.getParameter(o.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),_o=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(Ft)&&!/Arc/i.test(Ft);let C=null,K=_o||matchMedia("(pointer: coarse)").matches?.5:1;function Ve(){const e=Math.min(window.devicePixelRatio||1,2);W.resolutionScale=e*(K>=1?1:K>=.5?.8:.62),he.size=K>=1?4096:K>=.5?2048:1024,he.softShadows=K>=.5,Me.enabled=K>=1,fe.enabled=K>=.5,I.msaaSamples=K>=1?4:1,W.shadows=K>=.5,C?.tileset&&(C.tileset.maximumScreenSpaceError=K>=1?8:K>=.5?12:20)}Ve();W.clock.shouldAnimate=!1;W.clock.currentTime=Ue.fromIso8601("2026-06-21T10:10:00-05:00");const N=new fo(W),at=e=>Ee(lt[e].e,lt[e].n,lt[e].u),Fo=at("hotel");N.flyTo({pivot:Fo,heading:Je.general.heading,pitch:Je.general.pitch,range:Je.general.range*1.8},0);N.groundHeight=e=>I.globe.getHeight(e);const Ho=[{id:"dia",iso:"2026-06-21T10:10:00-05:00",night:0,tarde:0,fog:18e-5,label:"10:10",sun:4.55,color:"#ffffff"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let we=0,Pe=0,xe=null;const No=e=>Ue.toDate(Ue.fromIso8601(e)).getTime();function it(e){I.light.intensity=e.sunIntensity,I.light.color=j.fromCssColorString(e.sunColor),he.darkness=e.shadowDarkness,Me.uniforms.intensity=e.aoIntensity,fe.uniforms.brightness=e.bloomBrightness,be.uniforms.uExposure=e.exposure,be.uniforms.uContrast=e.contrast,be.uniforms.uSaturation=e.saturation;const[o,a,t]=ct(e.tintColor);be.uniforms.uTint=new x(o,a,t),be.uniforms.uVignette=e.vignette;const[s,c,f]=ct(e.skyZenith);Ce.uniforms.uSkyZenith=new x(s,c,f);const[h,w,M]=ct(e.skyHorizon);Ce.uniforms.uSkyHorizon=new x(h,w,M),Ce.uniforms.uCloudDensity=e.cloudDensity,Ce.uniforms.uCloudSpeed=e.cloudSpeed,C?.setLook({skyFill:e.skyFill,groundFill:e.groundFill,hazeAmount:e.hazeAmount,hazeStart:e.hazeStart})}const Qe=zo((e,o)=>it(o));it(Qe.getPreset("dia"));function Do(e){xe={from:Ue.toDate(W.clock.currentTime).getTime(),to:No(e.iso),start:performance.now(),dur:1600},I.fog.density=e.fog,Qe.setActivePreset(e.id),it(Qe.getPreset(e.id)),I.skyAtmosphere&&(I.skyAtmosphere.hueShift=0,I.skyAtmosphere.saturationShift=e.id==="tarde"?.08:e.id==="noche"?-.25:.06,I.skyAtmosphere.brightnessShift=e.id==="noche"?-.55:e.id==="tarde"?-.04:0);const a=we,t=Pe,s=performance.now(),c=()=>{const h=Math.min(1,(performance.now()-s)/1400),w=h*h*(3-2*h);we=a+(e.night-a)*w,Pe=t+(e.tarde-t)*w,C?.setNight(we),G?.setNight(we),C?.setTarde(Pe),Ce.uniforms.uNight=we,Ce.uniforms.uTarde=Pe,be.uniforms.uNight=we,be.uniforms.uTarde=Pe,h<1&&requestAnimationFrame(c)};requestAnimationFrame(c),document.querySelectorAll("[data-light]").forEach(h=>h.classList.toggle("on",h.dataset.light===e.id));const f=D("clockLabel");f&&(f.textContent=e.label)}document.querySelectorAll("[data-light]").forEach(e=>{e.addEventListener("click",()=>{const o=Ho.find(a=>a.id===e.dataset.light);o&&Do(o)})});let Ie=!1;const mt=D("btnOrbit"),yt=D("btnPedestrian");function me(){Ie=!1,mt?.classList.remove("on")}function je(e,o=2){me();const a=Je[e];N.flyTo({pivot:at(a.place),heading:a.heading,pitch:a.pitch,range:a.range},o)}D("btnHome")?.addEventListener("click",()=>je("general",2.2));D("btnAerial")?.addEventListener("click",()=>je("aerial"));D("btnArch")?.addEventListener("click",()=>je("arch"));yt?.addEventListener("click",()=>{me(),N.isWalking?N.exitWalk():N.enterWalk(ee?qt(ee):void 0)});N.onModeChange=e=>{yt?.classList.toggle("on",e);const o=D("hint");o&&e&&(o.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",o.classList.remove("fade"),setTimeout(()=>o.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(e=>{e.addEventListener("click",()=>{me();const o=e.dataset.place;if(o==="hotel"&&C){const a=C.buildings.find(t=>t.s==="Hotel");if(a){Fe(null),Fe(a);return}}N.flyTo({pivot:at(o),range:o==="hotel"?300:520,pitch:-.5},2)})});mt?.addEventListener("click",()=>{Ie=!Ie,mt.classList.toggle("on",Ie),Ie&&N.isWalking&&N.exitWalk()});vt.addEventListener("pointerdown",me);vt.addEventListener("wheel",me,{passive:!0});addEventListener("keydown",e=>{e.code==="Escape"&&(N.isWalking?N.exitWalk():Fe(null)),(e.code==="KeyH"||e.code==="Home")&&je("general",2.2),e.code==="KeyP"&&yt?.click()});let ee=null,xt=null;const Oo=9;let $e=null,G=null,Ae=null,pt=!1,Ge=null;function Uo(){return Ge||(Ge=(async()=>{C&&(G=await Ao(W,C.matrix),G&&(G.setNight(we),Ae=Eo(G,e=>{if(!G)return;me(),Ae?.mark(e),e<0?G.full():G.openAt(e);const o=G.caja;N.flyTo({pivot:Ee((o[0]+o[2])/2,(o[1]+o[3])/2,12),pitch:e<0?-.42:-.95,range:e<0?230:150},1.4)}),pt&&(pt=!1,C.setHotelFloors(99),wt(),ie&&(W.entities.remove(ie),ie=null))))})(),Ge)}function wt(){!C||!G||(C.setRevitZone(G.caja),G.play(),Ae?.mark(-1),Ae?.show(!0))}function Wt(){C&&($e={start:performance.now()},C.setHotelFloors(0))}let ie=null;const Ze=D("card");function Bo(e){return Ee((e.bb[0]+e.bb[2])/2,(e.bb[1]+e.bb[3])/2,e.b+e.h*.5)}function qt(e){return Ee((e.bb[0]+e.bb[2])/2,e.bb[1]-9,e.b)}function Fe(e){const o=ee?.s==="Hotel";if(ee=e,ie&&(W.entities.remove(ie),ie=null),!e||!C){Ze&&(Ze.hidden=!0),Ae?.show(!1);return}e.s!=="Hotel"?Ae?.show(!1):G?.visible&&Ae?.show(!0);const a=e.r.map(([m,u])=>Ee(m,u,0,C.matrix)),t=2572+e.b-.5;ie=W.entities.add({polygon:{hierarchy:new no(a),height:t,extrudedHeight:t+e.h+2.2,material:j.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:j.fromCssColorString("#d7ebff"),shadows:se.DISABLED}});const s=e.s==="Hotel";s&&!o&&(G?(wt(),ie&&(W.entities.remove(ie),ie=null)):(pt=!0,Uo(),Wt()),me(),N.flyTo({pivot:at("hotel"),pitch:-.38,range:290},1.8));const c=s&&C?C.buildings.filter(m=>m.s==="Hotel"):[e],f=m=>Math.abs(m.r.reduce((u,v,p)=>{const T=m.r[(p+1)%m.r.length];return u+v[0]*T[1]-T[0]*v[1]},0)/2),h=c.reduce((m,u)=>m+f(u),0),w=c.reduce((m,u)=>m+f(u)*u.p,0),M=Math.max(...c.map(m=>m.p)),y=Math.max(...c.map(m=>m.h));Math.abs(e.r.reduce((m,u,v)=>{const p=e.r[(v+1)%e.r.length];return m+u[0]*p[1]-p[0]*u[1]},0)/2),D("cardKind").textContent=s?"Proyecto":`Sector ${e.s}`,D("cardTitle").textContent=s?"Hotel La Fontana":`Edificación ${e.id+1}`,D("cardData").innerHTML=`<dt>Pisos</dt><dd>${s?"hasta "+M:e.p}</dd><dt>Altura</dt><dd>${y.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(h).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(w).toLocaleString("es-CO")} m²</dd>`,Ze&&(Ze.hidden=!1)}N.onPick=e=>{C&&Fe(e?C.buildingAt(e):null)};D("cardClose")?.addEventListener("click",()=>Fe(null));D("cardFocus")?.addEventListener("click",()=>{if(!ee)return;me();const e=Math.max(ee.bb[2]-ee.bb[0],ee.bb[3]-ee.bb[1],ee.h);N.flyTo({pivot:Bo(ee),pitch:-.42,range:Math.max(60,e*2.1)},1.7)});D("cardWalk")?.addEventListener("click",()=>{ee&&(me(),N.enterWalk(qt(ee)))});const ut=D("status"),Ht=D("statusText");async function Vo(){const e=performance.now()+8e3;for(;performance.now()<e;){const o=I.globe.tilesLoaded,a=!C?.tileset||C.tileset.tilesLoaded;if(o&&a)break;await new Promise(t=>setTimeout(t,150))}await new Promise(o=>requestAnimationFrame(()=>requestAnimationFrame(o)))}async function jo(){ze("Cargando el modelo del hotel...",.05),await new Promise(a=>setTimeout(a,30)),C=await ko(W,(a,t)=>ze(a,.05+t*.25),(a,t,s)=>{ze(`Cargando secciones (${a}/${t}) · ${s}`,.3+a/Math.max(1,t)*.5),!(!ut||!Ht)&&(ut.hidden=!1,Ht.textContent=a<t?`Cargando secciones ${a}/${t} · ${s}`:`Modelo completo · ${t} secciones`,a>=t&&setTimeout(()=>ut.classList.add("fade"),2600))}),C.setNight(we),C.setTarde(Pe);const e=document.querySelector("[data-light].on")?.dataset.light||"dia";it(Qe.getPreset(e)),Ve(),await C.done,ze("Cargando tráfico y parqueaderos...",.85),xt=await To(W,C.matrix),window.__ALL__=!0,ze("Renderizando escena 3D...",.94),await Vo(),ze("Listo",1),je("general",2.4),_t.classList.add("done"),setTimeout(()=>_t.remove(),900);const o=D("hint");o&&setTimeout(()=>o.classList.add("fade"),9e3),window.__READY__=!0}const Q={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:io,viewer:W,cam:N,getSite:()=>C,enuToWorld:Ee,select:Fe,stats:Q,playHotel:Wt,playRevit:wt,getRevit:()=>G,getTrafico:()=>xt,setQuality:e=>{K=e,Ve()}};jo().catch(e=>{console.error(e),jt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(e?.message??e)});let Nt=performance.now(),ht=0;function Yt(){const e=performance.now(),o=Math.min(.1,(e-Nt)/1e3);if(Nt=e,xe){const t=Math.min(1,(e-xe.start)/xe.dur),s=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;W.clock.currentTime=Ue.fromDate(new Date(xe.from+(xe.to-xe.from)*s)),t>=1&&(xe=null)}if($e&&C){const t=(e-$e.start)/550,s=Math.floor(t),c=t-s,f=1-Math.pow(1-Math.min(1,c*1.6),3);s>=Oo?(C.setHotelFloors(99),$e=null):C.setHotelFloors(s+f)}G?.update(o,e),xt?.update(o);const a=e*.001;if(C?.setTime(a),Ce.uniforms.uTime=a,Ie&&!N.isWalking&&N.flyTo({heading:N.state.heading+.16*o},0),N.update(o),Q.frames++,e-Q.t0>=2e3){Q.fps=Math.round(Q.frames*1e3/(e-Q.t0)),Q.frames=0,Q.t0=e,window.__FPS__=Q.fps;const t=!!C&&C.sections.loaded>=C.sections.total&&e-ht>8e3;C&&C.sections.loaded>=C.sections.total&&!ht&&(ht=e),t&&document.visibilityState==="visible"&&(Q.fps<20&&K>.25&&!window.__DBG__.lock?++Q.low>=3&&(K=K>=1?.5:.25,Q.low=0,Ve()):Q.low=0)}requestAnimationFrame(Yt)}requestAnimationFrame(Yt);addEventListener("resize",Ve);
