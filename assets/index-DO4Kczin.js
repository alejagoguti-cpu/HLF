var Ao=Object.defineProperty;var Lo=(e,o,t)=>o in e?Ao(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t;var V=(e,o,t)=>Lo(e,typeof o!="symbol"?o+"":o,t);import{C as w,a as go,T as Rt,M as Y,b as Ae,c as et,H as Ro,P as Ht,d as qe,L as vo,U as I,V as de,e as $e,f as Je,g as xt,h as bt,i as ut,j as Io,S as ve,I as yo,k as _o,l as No,m as W,n as ft,R as Ho,o as at,A as ke,p as Zt,q as Fo,r as Oo,s as Do,t as it,u as $t,v as It,G as Bo,B as Uo,w as Mt,J as xo,x as Vo,y as jo,z as Wo,D as qo,E as Yo,F as Go,K as Xo,N as Zo}from"./cesium-8DXw046g.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const St="/HLF/",$o=St.endsWith("/")?St:St+"/",Jo=$o+"cesium/";window.CESIUM_BASE_URL=Jo;const gt={longitude:-74.04145021,latitude:4.70207636,height:2572},Tt={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},Ko={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},We={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},Qo=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Jt=-1.5533,Kt=-.012,ea=4200,ta=6,Qt=1.7;class oa{constructor(o){V(this,"viewer");V(this,"canvas");V(this,"pivot",new w);V(this,"heading",.5);V(this,"pitch",-.6);V(this,"range",1200);V(this,"targetPivot",new w);V(this,"targetHeading",.5);V(this,"targetPitch",-.6);V(this,"targetRange",1200);V(this,"damping",9);V(this,"drag",null);V(this,"pointers",new Map);V(this,"pinch",null);V(this,"lastTap",0);V(this,"keys",new Set);V(this,"tween",null);V(this,"fov",go.toRadians(48));V(this,"walking",!1);V(this,"eye",new w);V(this,"eyeTarget",new w);V(this,"wHeading",0);V(this,"wPitch",0);V(this,"wHeadingT",0);V(this,"wPitchT",0);V(this,"onPick",null);V(this,"onModeChange",null);V(this,"groundHeight",null);this.viewer=o,this.canvas=o.scene.canvas,o.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:w.clone(this.targetPivot)}}setPivot(o,t=!0){if(t){const a=w.clone(this.viewer.camera.positionWC),i=w.subtract(a,o,new w),s=w.magnitude(i),c=Rt.eastNorthUpToFixedFrame(o),p=Y.inverseTransformation(c,new Y),u=Y.multiplyByPointAsVector(p,i,new w);if(s>1){const d=-Math.asin(Math.max(-1,Math.min(1,u.z/s)));if(d<Kt&&d>Jt){let h=Math.atan2(-u.x,-u.y);for(;h-this.heading>Math.PI;)h-=Math.PI*2;for(;h-this.heading<-Math.PI;)h+=Math.PI*2;this.heading=this.targetHeading=h,this.pitch=this.targetPitch=d,this.range=this.targetRange=this.clamp(s),w.clone(o,this.pivot)}}}this.targetPivot=w.clone(o),this.tween=null}bind(){const o=this.canvas;o.style.touchAction="none",o.addEventListener("pointerdown",a=>{if(o.setPointerCapture(a.pointerId),this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2){const[i,s]=[...this.pointers.values()];this.pinch={distance:Math.hypot(i.x-s.x,i.y-s.y),range:this.targetRange,cx:(i.x+s.x)/2,cy:(i.y+s.y)/2},this.drag=null;return}a.button===2||a.button===1||a.shiftKey?this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"pan",moved:!1}:a.button===0&&(this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"orbit",moved:!1}),this.tween=null}),o.addEventListener("pointermove",a=>{if(!this.pointers.has(a.pointerId))return;if(this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2&&this.pinch){const[c,p]=[...this.pointers.values()],u=Math.hypot(c.x-p.x,c.y-p.y),d=(c.x+p.x)/2,h=(c.y+p.y)/2;this.walking?this.walk((this.pinch.cy-h)*.06,0):(u>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/u)),this.pan(this.pinch.cx-d,h-this.pinch.cy)),this.pinch.cx=d,this.pinch.cy=h;return}if(!this.drag||a.pointerId!==this.drag.id)return;const i=a.offsetX-this.drag.x,s=a.offsetY-this.drag.y;this.drag.x=a.offsetX,this.drag.y=a.offsetY,Math.abs(i)+Math.abs(s)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=i*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+s*.0028))):this.walk(s*.05,-i*.05):this.drag.mode==="orbit"?(this.targetHeading-=i*.0042,this.targetPitch=this.clampPitch(this.targetPitch-s*.0034)):this.pan(-i,s)});const t=a=>{if(this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&a.pointerId===this.drag.id){const i=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,i&&a.type==="pointerup"){const s=new Ae(a.offsetX,a.offsetY),c=performance.now();if(a.pointerType!=="mouse"&&c-this.lastTap<320){this.lastTap=0,this.focusAt(s);return}this.lastTap=c;const p=this.pickWorld(s);p&&!this.walking&&this.setPivot(p,!0),this.onPick?.(p)}}};o.addEventListener("pointerup",t),o.addEventListener("pointercancel",t),o.addEventListener("contextmenu",a=>a.preventDefault()),o.addEventListener("wheel",a=>{a.preventDefault(),this.tween=null;const i=a.deltaMode===1?16:a.deltaMode===2?100:1,s=a.deltaY*i;if(this.walking){this.walk(-s*.02,0);return}const c=Math.exp(Math.max(-.45,Math.min(.45,s*.0016))),p=this.pickWorld(new Ae(a.offsetX,a.offsetY)),u=this.clamp(this.targetRange*c);if(p&&c<1){const d=Math.min(.45,(this.targetRange-u)/this.targetRange)*.8,h=w.subtract(p,this.targetPivot,new w),b=w.magnitude(h);if(b>1){const g=Math.min(b,this.targetRange)*d/b;w.add(this.targetPivot,w.multiplyByScalar(h,g,h),this.targetPivot)}}this.targetRange=u},{passive:!1}),o.addEventListener("dblclick",a=>{a.preventDefault(),this.focusAt(new Ae(a.offsetX,a.offsetY))}),addEventListener("keydown",a=>{a.target instanceof HTMLInputElement||(this.keys.add(a.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(a.code)&&a.preventDefault())}),addEventListener("keyup",a=>this.keys.delete(a.code)),addEventListener("blur",()=>this.keys.clear())}clamp(o,t=ta,a=ea){return Math.max(t,Math.min(a,o))}clampPitch(o){return Math.max(Jt,Math.min(Kt,o))}moveHorizontal(o,t,a,i){const s=Rt.eastNorthUpToFixedFrame(o),c=new w(Math.sin(t)*a+Math.cos(t)*i,Math.cos(t)*a-Math.sin(t)*i,0);Y.multiplyByPoint(s,c,o)}pan(o,t){const a=this.canvas.clientHeight||1,i=2*this.range*Math.tan(this.fov/2)/a,s=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,t*i/s,o*i),this.tween=null}walk(o,t){this.moveHorizontal(this.eyeTarget,this.wHeading,o,t),this.snapEye()}snapEye(){const o=et.fromCartesian(this.eyeTarget),t=this.groundHeight?.(o);t!==void 0&&Number.isFinite(t)&&(o.height=t+Qt,et.toCartesian(o,void 0,this.eyeTarget))}pickWorld(o){const t=this.viewer.scene;let a;if(t.pickPositionSupported&&t.pick(o,4,4)&&(a=t.pickPosition(o)),!a){const i=t.camera.getPickRay(o);i&&(a=t.globe.pick(i,t)??void 0)}return a??null}focusAt(o){const t=this.pickWorld(o);if(t){if(this.walking){w.clone(t,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:t,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(o,t=2){this.walking&&this.exitWalk(!1);const a={pivot:o.pivot??w.clone(this.targetPivot),heading:o.heading??this.targetHeading,pitch:o.pitch??this.targetPitch,range:o.range??this.targetRange};let i=a.heading;for(;i-this.targetHeading>Math.PI;)i-=Math.PI*2;for(;i-this.targetHeading<-Math.PI;)i+=Math.PI*2;if(a.heading=i,t<=.02){this.tween=null,this.targetPivot=w.clone(a.pivot),this.pivot=w.clone(a.pivot),this.heading=this.targetHeading=a.heading,this.pitch=this.targetPitch=a.pitch,this.range=this.targetRange=a.range;return}this.tween={from:{pivot:w.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:a,start:performance.now(),duration:t*1e3}}enterWalk(o){w.clone(o??this.targetPivot,this.eyeTarget),this.snapEye(),w.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(o=!0){if(!this.walking)return;this.walking=!1;const t=et.fromCartesian(this.eyeTarget);t.height-=Qt-1;const a=et.toCartesian(t);this.pivot=w.clone(a),this.targetPivot=a,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,o?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(o){if(!this.keys.size)return;const t=this.keys,a=t.has("ShiftLeft")||t.has("ShiftRight")?3:1;let i=0,s=0;(t.has("KeyW")||t.has("ArrowUp"))&&(i+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(i-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(s+=1),(t.has("KeyA")||t.has("ArrowLeft"))&&(s-=1);let c=0;if(t.has("KeyQ")&&(c+=1),t.has("KeyE")&&(c-=1),this.walking){c&&(this.wHeadingT-=c*1.2*o),(i||s)&&this.walk(i*4.2*a*o,s*3.4*a*o);return}if(c&&(this.targetHeading+=c*.9*o,this.tween=null),(t.has("PageUp")||t.has("Equal")||t.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*o))),(t.has("PageDown")||t.has("Minus")||t.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*o))),t.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*o)),t.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*o)),!i&&!s)return;const p=Math.max(8,this.range*.6)*a*o;this.moveHorizontal(this.targetPivot,this.heading,i*p,s*p),this.tween=null}update(o){this.updateKeys(o);const t=1-Math.exp(-this.damping*o);if(this.walking){w.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*o),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*t,this.wPitch+=(this.wPitchT-this.wPitch)*t,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const a=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),i=Qo(a),{from:s,to:c}=this.tween;w.lerp(s.pivot,c.pivot,i,this.targetPivot),this.targetHeading=s.heading+(c.heading-s.heading)*i,this.targetPitch=s.pitch+(c.pitch-s.pitch)*i,this.targetRange=Math.exp(Math.log(s.range)+(Math.log(c.range)-Math.log(s.range))*i),a>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*t,this.pitch+=(this.targetPitch-this.pitch)*t,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*t),w.lerp(this.pivot,this.targetPivot,t,this.pivot),this.viewer.camera.lookAt(this.pivot,new Ro(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(Y.IDENTITY)}}function aa(){return new Je({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const bo=()=>({uAerial:{type:I.SAMPLER_2D,value:aa()},uAerialRect:{type:I.VEC4,value:new $e(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:I.FLOAT,value:0}}),wo=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,ct=`
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
`;function ia(){return new qe({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uSkyFill:{type:I.FLOAT,value:.24},uHazeAmount:{type:I.FLOAT,value:.08},uHazeStart:{type:I.FLOAT,value:1200},uHotelPisos:{type:I.FLOAT,value:99},uRevitBox:{type:I.VEC4,value:new $e(0,0,0,0)},uLean:{type:I.VEC2,value:new Ae(0,0)},...bo()},varyings:{vPosM:de.VEC3,vUpEC:de.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:ct+wo+`
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
          if (uAerialOn > 0.5) {
            vec3 foto = hlfAerial(uv + uLean * pisos * 3.0);
            float fotoLum = dot(foto, vec3(0.3333));
            if (fotoLum < 0.80 && fotoLum > 0.06) {
              col = mix(col, foto * 1.04, 0.45);
            }
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
    `})}function na(e,o,t){return new qe({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uSkyFill:{type:I.FLOAT,value:.22},uHazeAmount:{type:I.FLOAT,value:.08},uHazeStart:{type:I.FLOAT,value:1200},uTime:{type:I.FLOAT,value:0},uFrame:{type:I.FLOAT,value:o},uTop:{type:I.FLOAT,value:t},uAtlas:{type:I.SAMPLER_2D,value:new Je({url:e,repeat:!1,minificationFilter:bt.LINEAR_MIPMAP_LINEAR,magnificationFilter:xt.LINEAR})}},varyings:{vUV:de.VEC2,vView:de.VEC3,vRightT:de.VEC2,vUpT:de.VEC2,vUpEC:de.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:ct+`
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
        // follaje botánico natural y sobrio, sin saturación artificial
        rgb *= mix(vec3(0.96, 1.02, 0.94), vec3(1.02, 1.03, 0.98), vView.z);
        // sombra interior natural de la copa
        vec2 d = (vUV - vec2(0.5, 0.55)) * 2.0;
        float borde = clamp(length(d), 0.0, 1.0);
        rgb *= mix(0.78, 1.15, borde * borde) * mix(0.82, 1.08, smoothstep(0.05, 0.6, vUV.y));

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
    `})}function sa(){return new qe({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uHazeAmount:{type:I.FLOAT,value:.08},uHazeStart:{type:I.FLOAT,value:1200}},lightingModel:vo.UNLIT,fragmentShaderText:ct+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function ra(e,o,t){return new Ht({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:e,uNorth:o,uUp:t,uSkyZenith:new w(.16,.42,.82),uSkyHorizon:new w(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function la(){return new Ht({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new w(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function ca(e){const o=t=>({type:I.SAMPLER_2D,value:new Je({url:e+t,repeat:!0,minificationFilter:bt.LINEAR_MIPMAP_LINEAR,magnificationFilter:xt.LINEAR})});return new qe({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uGroundFill:{type:I.FLOAT,value:.12},uHazeAmount:{type:I.FLOAT,value:.08},uHazeStart:{type:I.FLOAT,value:1200},uAsfalto:o("tex_asfalto.webp"),uAnden:o("tex_anden.webp"),uPrado:o("tex_prado.webp"),uCiclo:o("tex_ciclo.webp"),...bo()},varyings:{vG:de.VEC3,vUpEC:de.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:ct+wo+`
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
    `})}function da(){return new qe({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uSkyFill:{type:I.FLOAT,value:.24},uHazeAmount:{type:I.FLOAT,value:.08},uHazeStart:{type:I.FLOAT,value:1200}},varyings:{vPosM:de.VEC3,vUpEC:de.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:ct+`
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
    `})}function Ft(){return Rt.eastNorthUpToFixedFrame(w.fromDegrees(gt.longitude,gt.latitude,gt.height))}function J(e,o,t,a=Ft()){return Y.multiplyByPoint(a,new w(e,o,t),new w)}const ua={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function fa(e,o,t){let a=!1;for(let i=0,s=t.length-1;i<t.length;s=i++){const[c,p]=t[i],[u,d]=t[s];p>o!=d>o&&e<(u-c)*(o-p)/(d-p)+c&&(a=!a)}return a}function ha(e,o,t){let a=1/0;for(let i=0,s=t.length-1;i<t.length;s=i++){const[c,p]=t[s],[u,d]=t[i],h=u-c,b=d-p,g=Math.max(0,Math.min(1,((e-c)*h+(o-p)*b)/(h*h+b*b||1)));a=Math.min(a,Math.hypot(e-c-g*h,o-p-g*b))}return a}async function ma(e,o,t){const a=e.scene,i=Ft(),s=Y.inverseTransformation(i,new Y),c=We.secciones;o("Contexto urbano",.08);const[p,u,d,h]=await Promise.all([fetch(c+"recorte.json").then(n=>n.json()),fetch(c+"edificios.json").then(n=>n.json()),fetch(c+"arboles.json").then(n=>n.json()),fetch(c+"suelo.json").then(n=>n.json())]),b=()=>p.clips.map(n=>{const f=new ft({positions:w.fromDegreesArray(n.flat())}),E=f.computeRectangle();return f.computeRectangle=T=>Ho.clone(E,T),f});a.globe.clippingPolygons=new ut({polygons:b()});const g=sa();let C=null;try{C=await Io.fromUrl(We.googleTiles,{maximumScreenSpaceError:10,shadows:ve.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),C.clippingPolygons=new ut({polygons:b()}),C.customShader=g,a.primitives.add(C)}catch(n){console.warn("Tiles de Google no disponibles",n)}const S=[-236,330],x=[];for(const n of u.secciones){const f=n.key==="Hotel";x.push({key:n.key,file:f?"hotel_fachadas.glb":n.file,kind:f?"cubierta_pbr":"edificios",label:f?"Hotel La Fontana 3D":`Edificaciones · sector ${n.key}`,dist:f?-2:Math.hypot(n.c[0]-S[0],n.c[1]-S[1])})}x.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),x.push({key:"hotel_plazoleta",file:"hotel_plazoleta.glb",kind:"cubierta_pbr",label:"Plazoleta y acceso · Hotel",dist:-.8}),x.push({key:"torres_vecinas",file:"torres_vecinas.glb",kind:"cubierta_pbr",label:"Torres vecinas PBR",dist:-.6}),x.push({key:"esquina_ak15",file:"esquina_ak15.glb",kind:"cubierta_pbr",label:"Esquina Ak 15 PBR",dist:-.55}),x.push({key:"metro127",file:"metro127.glb",kind:"cubierta_pbr",label:"Metro 127 · Sonesta PBR",dist:-.52}),x.push({key:"clinica127",file:"clinica127.glb",kind:"cubierta_pbr",label:"Clínica 127 Colsubsidio PBR",dist:-.51}),x.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),x.sort((n,f)=>n.dist-f.dist);const B={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},y=h.secciones.map(n=>({key:n.key,file:n.file,kind:"suelo",capa:B[n.key]?.[0]??0,label:B[n.key]?.[1]??n.key,dist:-3})),A=d.secciones.map(n=>({key:n.key,file:n.file,kind:"arboles",atlas:n.atlas,marco:n.marco,marcoSup:n.marcoSup,label:ua[n.key]??"Vegetación",dist:0}));let L=[];try{L=(await fetch(c+"arboles3d.json").then(n=>n.json())).secciones}catch{}const k=L.map(n=>({key:"3d_"+n.key,file:n.file,kind:"arbol3d",label:"Arbolado del hotel",dist:0})),M=[...y,...x.slice(0,4),...k,...A.slice(0,3),...x.slice(4,9),...A.slice(3),...x.slice(9)],_=ia(),K=new qe({lightingModel:vo.UNLIT,uniforms:{uNight:{type:I.FLOAT,value:0}},fragmentShaderText:`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.baseColor.rgb;
        if (dot(c, vec3(0.3333)) < 0.02) c = vec3(0.20, 0.30, 0.12);
        vec3 n = normalize(fsInput.attributes.normalEC);
        if (dot(n, -fsInput.attributes.positionEC) < 0.0) n = -n;
        vec3 pW = (czm_inverseView * vec4(fsInput.attributes.positionEC, 1.0)).xyz;
        vec3 up = normalize(czm_viewRotation * normalize(pW));
        vec3 sunDir = normalize(czm_lightDirectionEC);
        float hemi = dot(n, up) * 0.5 + 0.5;
        vec3 amb = mix(vec3(0.60, 0.57, 0.50), vec3(0.89, 0.93, 0.96), hemi) * 0.95;
        float nl = max(dot(n, sunDir), 0.0);
        float trans = max(dot(-n, sunDir), 0.0) * 0.35;
        vec3 sol = vec3(1.0, 0.94, 0.86) * (nl * 0.85 + trans);
        vec3 col = c * (amb + sol) * 1.04;
        if (any(isnan(col))) col = c;
        vec3 finalCol = mix(col, c * vec3(0.18, 0.22, 0.32), uNight);
        material.emissive = finalCol;
        material.diffuse = finalCol;
      }
    `}),$=da(),Z=ca(c),ne=(async()=>{try{const n=await yo.fromAssetId(We.imageryAssetId),f=18,E=n.tilingScheme,T=(te,we)=>et.fromCartesian(J(te,we,0,i)),R=E.positionToTileXY(T(-1010,930),f),q=E.positionToTileXY(T(1010,-940),f),oe=q.x-R.x+1,ae=q.y-R.y+1,N=n.tileWidth,X=document.createElement("canvas");X.width=oe*N,X.height=ae*N;const D=X.getContext("2d"),ee=[];for(let te=R.y;te<=q.y;te++)for(let we=R.x;we<=q.x;we++)ee.push([we,te]);const ie=async([te,we])=>{for(let qt=0;qt<40;qt++){const Yt=n.requestImage(te,we,f);if(Yt){try{const Qe=await Yt,Gt=(te-R.x)*N,Xt=(we-R.y)*N;typeof ImageBitmap<"u"&&Qe instanceof ImageBitmap?(D.save(),D.translate(Gt,Xt+N),D.scale(1,-1),D.drawImage(Qe,0,0,N,N),D.restore()):D.drawImage(Qe,Gt,Xt,N,N)}catch{}return}await new Promise(Qe=>setTimeout(Qe,120))}};D.fillStyle="#6a6f62",D.fillRect(0,0,X.width,X.height);const be=Array.from({length:6},async()=>{for(;ee.length;)await ie(ee.shift())});await Promise.all(be);const ue=document.createElement("canvas");ue.width=ue.height=4096,ue.getContext("2d").drawImage(X,0,0,4096,4096);const Ne=await new Promise(te=>ue.toBlob(te,"image/jpeg",.92));if(!Ne)return;const Pe=URL.createObjectURL(Ne);window.__AERIAL_URL__=Pe;const Ye=E.tileXYToRectangle(R.x,R.y,f),He=E.tileXYToRectangle(q.x,q.y,f),Vt=(te,we)=>Y.multiplyByPoint(s,w.fromRadians(te,we,gt.height),new w),jt=Vt(Ye.west,He.south),Wt=Vt(He.east,Ye.north),Po=new $e(jt.x,jt.y,Wt.x,Wt.y);for(const te of[_,Z])te.setUniform("uAerial",new Je({url:Pe,repeat:!1,minificationFilter:bt.LINEAR_MIPMAP_LINEAR,magnificationFilter:xt.LINEAR})),te.setUniform("uAerialRect",Po),te.setUniform("uAerialOn",1)}catch(n){console.warn("Foto aérea no disponible",n)}})(),se=[],pe=[],Te=[];let ze=null;const Ee=new _o(new w(0,-1,0),1e3);let Ke=0,Ue=0,Ve=.22,xe=.08,ge=1200;const je={total:M.length,loaded:0,failed:[]},l=async n=>{try{const f=await at.fromGltfAsync({url:c+n.file,modelMatrix:i,upAxis:ke.Y,forwardAxis:ke.X,shadows:n.kind==="arbol3d"?ve.ENABLED:n.kind==="arboles"?ve.CAST_ONLY:n.kind==="suelo"?ve.RECEIVE_ONLY:ve.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:n.kind!=="arboles"});if(n.kind==="arbol3d")f.customShader=K;else if(n.kind==="suelo")f.customShader=Z;else if(n.kind==="arboles"){const T=na(c+n.atlas,n.marco,n.marcoSup);T.setUniform("uNight",Ke),T.setUniform("uTarde",Ue),T.setUniform("uSkyFill",Ve),T.setUniform("uHazeAmount",xe),T.setUniform("uHazeStart",ge),se.push(T),f.customShader=T}else n.key==="Hotel"||n.key==="hotel_plazoleta"||n.key==="hotel_cubiertas"?f.customShader=$:n.kind!=="cubierta_pbr"&&(f.customShader=_);const E=n.key==="Hotel"||n.key==="hotel_plazoleta"||n.key==="hotel_cubiertas";f.imageBasedLighting.imageBasedLightingFactor=E?new Ae(1,.75):n.kind==="cubierta_pbr"?new Ae(.85,.55):new Ae(.68,.38),a.primitives.add(f),n.kind==="arboles"&&pe.push(f),(n.key==="Hotel"||n.key==="hotel_cubiertas")&&Te.push(f),await new Promise(T=>{if(f.ready)return T();const R=f.readyEvent.addEventListener(()=>{R(),T()});setTimeout(T,2e4)})}catch(f){console.error("Sección no cargada",n.file,f),je.failed.push(n.file)}je.loaded++,t?.(je.loaded,je.total,n.label)},m=y.length+7,v=async(n,f,E)=>{let T=0,R=0;await Promise.all(Array.from({length:Math.min(f,n.length)},async()=>{for(;T<n.length;){const q=n[T++];await l(q),E?.(++R)}}))},r=M.slice(0,m);await v(r,5,n=>o(r[Math.min(n,r.length-1)].label,.2+.75*n/r.length));let P=()=>{};const H=new Promise(n=>{P=n,setTimeout(n,16e3)}),j=(async()=>{await H,await v(M.slice(m),3),await ne})();return{startBackground:()=>P(),matrix:i,inverse:s,tileset:C,buildings:u.edificios,treeCount:d.total,sections:je,done:j,setNight(n){g.setUniform("uNight",n),_.setUniform("uNight",n),$.setUniform("uNight",n),Ke=n,Z.setUniform("uNight",n);for(const f of se)f.setUniform("uNight",n)},setTarde(n){g.setUniform("uTarde",n),_.setUniform("uTarde",n),$.setUniform("uTarde",n),Ue=n,Z.setUniform("uTarde",n);for(const f of se)f.setUniform("uTarde",n)},setTime(n){for(const f of se)f.setUniform("uTime",n)},setLook(n){if(n.skyFill!==void 0){Ve=n.skyFill,_.setUniform("uSkyFill",Ve),$.setUniform("uSkyFill",Ve);for(const f of se)f.setUniform("uSkyFill",Ve)}if(n.groundFill!==void 0&&Z.setUniform("uGroundFill",n.groundFill),n.hazeAmount!==void 0){xe=n.hazeAmount,_.setUniform("uHazeAmount",xe),$.setUniform("uHazeAmount",xe),Z.setUniform("uHazeAmount",xe),g.setUniform("uHazeAmount",xe);for(const f of se)f.setUniform("uHazeAmount",xe)}if(n.hazeStart!==void 0){ge=n.hazeStart,_.setUniform("uHazeStart",ge),$.setUniform("uHazeStart",ge),Z.setUniform("uHazeStart",ge),g.setUniform("uHazeStart",ge);for(const f of se)f.setUniform("uHazeStart",ge)}},setRevitBlocks(n,f=[]){const E=u.edificios.filter(T=>n.includes(T.id)).map(T=>{const R=T.r.reduce((oe,ae)=>oe+ae[0],0)/T.r.length,q=T.r.reduce((oe,ae)=>oe+ae[1],0)/T.r.length;return new ft({positions:T.r.map(([oe,ae])=>{const N=oe-R,X=ae-q,D=Math.hypot(N,X)||1;return J(oe+N/D*1,ae+X/D*1,0,i)})})});for(const T of f)E.push(new ft({positions:T.map(([R,q])=>J(R,q,0,i))}));for(const T of Te)T.clippingPolygons=E.length?new ut({polygons:E}):void 0},setRevitZone(n){if(!n){ze=n?[[n[0],n[1]],[n[2],n[1]],[n[2],n[3]],[n[0],n[3]]].map(([f,E])=>J(f,E,0,i)):null;for(const f of Te)f.clippingPolygons=ze?new ut({polygons:[new ft({positions:ze})]}):void 0;_.setUniform("uRevitBox",n?new $e(n[0]-1,n[1]-1,n[2]+1,n[3]+1):new $e(0,0,0,0))}},setHotelFloors(n){const f=n<98;Ee.distance=3.2+n*3.05;for(const E of Te)f&&!E.clippingPlanes&&(E.clippingPlanes=new No({planes:[Ee],edgeWidth:2,edgeColor:W.fromCssColorString("#d7ebff")})),E.clippingPlanes&&(E.clippingPlanes.enabled=f);_.setUniform("uHotelPisos",n)},setTreesVisible(n){for(const f of pe)f.show=n},buildingAt(n){const f=Y.multiplyByPoint(s,n,new w);let E=null,T=1.2;for(const R of u.edificios){if(f.x<R.bb[0]-1.5||f.x>R.bb[2]+1.5||f.y<R.bb[1]-1.5||f.y>R.bb[3]+1.5||f.z>R.b+R.h+2.5)continue;if(fa(f.x,f.y,R.r))return R;const q=ha(f.x,f.y,R.r);q<T&&(T=q,E=R)}return E}}}const pa=W.fromCssColorString("#ff2b1a"),ga=W.fromCssColorString("#ffc400"),va=W.fromCssColorString("#00e862"),Ge=W.fromCssColorString("#1a1d22");function zt(e){const o=document.createElement("canvas");o.width=128,o.height=128;const t=o.getContext("2d");if(t.clearRect(0,0,128,128),e==="pare"){t.beginPath();for(let a=0;a<8;a++){const i=(a+.5)*Math.PI/4,s=64+Math.cos(i)*58,c=64+Math.sin(i)*58;a===0?t.moveTo(s,c):t.lineTo(s,c)}t.closePath(),t.fillStyle="#c81e1e",t.fill(),t.lineWidth=5,t.strokeStyle="#ffffff",t.stroke(),t.fillStyle="#ffffff",t.font="bold 31px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("PARE",64,66)}else e==="peaton"?(t.beginPath(),t.moveTo(64,6),t.lineTo(122,64),t.lineTo(64,122),t.lineTo(6,64),t.closePath(),t.fillStyle="#f5b800",t.fill(),t.lineWidth=4,t.strokeStyle="#18181b",t.stroke(),t.fillStyle="#18181b",t.beginPath(),t.arc(64,38,7,0,Math.PI*2),t.fill(),t.fillRect(59,47,10,22),t.fillRect(54,69,7,20),t.fillRect(67,69,7,20)):(t.beginPath(),t.arc(64,64,56,0,Math.PI*2),t.fillStyle="#ffffff",t.fill(),t.lineWidth=11,t.strokeStyle="#c81e1e",t.stroke(),t.fillStyle="#111827",t.font="bold 46px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("30",64,67));return o.toDataURL("image/png")}function ya(e,o,t,a,i){const s=(y,A,L)=>Y.multiplyByPoint(o,new w(y,A,L),new w),c=[],p=t+7.2,u=a+7.2,d=i(p,u),h=W.fromCssColorString("#2a303a"),b=W.fromCssColorString("#14171c"),g=W.fromCssColorString("#eab308"),C=(y,A,L,k)=>{const M=k?.42:.3,_=k?.3:.42;c.push(e.entities.add({position:s(y,A,L),box:{dimensions:new w(M,_,1.18),material:b}}));const K=(pe,Te)=>{const ze=e.entities.add({position:s(y,A,L+pe),box:{dimensions:new w(k?.24:.33,k?.33:.24,.24),material:Te}});return c.push(ze),ze},$=K(.36,Ge),Z=K(0,Ge),ne=K(-.36,Ge);return{red:$,yellow:Z,green:ne,setState:pe=>{$.box.material=new it(pe==="red"?pa:Ge),Z.box.material=new it(pe==="yellow"?ga:Ge),ne.box.material=new it(pe==="green"?va:Ge)}}};if(Math.abs(t+148.8)<12&&Math.abs(a-216.3)<12){const y=[{px:-159.5,py:232,dx:4.2,dy:0,isNS:!0},{px:-163.5,py:226.5,dx:0,dy:-4,isNS:!1},{px:-163,py:203,dx:0,dy:4,isNS:!1},{px:-133.5,py:231.5,dx:4.2,dy:0,isNS:!0},{px:-133,py:202.5,dx:0,dy:4,isNS:!1}],A=[],L=[];for(const M of y){const _=i(M.px,M.py);c.push(e.entities.add({position:s(M.px,M.py,_+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:h}}),e.entities.add({position:s(M.px,M.py,_+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:g}}),e.entities.add({position:s(M.px+M.dx*.5,M.py+M.dy*.5,_+5.65),box:{dimensions:new w(Math.max(.14,Math.abs(M.dx)),Math.max(.14,Math.abs(M.dy)),.14),material:h}}));const K=C(M.px+M.dx*.78,M.py+M.dy*.78,_+5.1,M.isNS);(M.isNS?A:L).push(K)}const k=M=>({red:M[0].red,yellow:M[0].yellow,green:M[0].green,setState:_=>{for(const K of M)K.setState(_)}});return{ns:k(A),ew:k(L),setVisible(M){for(const _ of c)_.show=M}}}c.push(e.entities.add({position:s(p,u,d+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:h}}),e.entities.add({position:s(p,u,d+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:g}}));const S=4.6;c.push(e.entities.add({position:s(p-S*.5,u,d+5.65),box:{dimensions:new w(S,.14,.14),material:h}}),e.entities.add({position:s(p,u-S*.5,d+5.65),box:{dimensions:new w(.14,S,.14),material:h}}));const x=C(p-3.4,u,d+5.1,!0),B=C(p,u-3.4,d+5.1,!1);return{ns:x,ew:B,setVisible(y){for(const A of c)A.show=y}}}function xa(e,o,t,a,i){const s=(y,A,L)=>Y.multiplyByPoint(o,new w(y,A,L),new w),c=[],p=Zt.fromColor(W.fromCssColorString("#f3f4f6").withAlpha(.92)),u=Zt.fromColor(W.fromCssColorString("#f5b800").withAlpha(.92)),d=(y,A,L,k,M,_)=>{if(a(y,A)<.8)return;const K=i(y,A)+.07;s(y,A,K);const $=It.fromRotationZ(M),Z=Y.fromRotationTranslation($,new w(y,A,K)),ne=Y.multiply(o,Z,new Y);c.push(new Bo({geometry:Uo.fromDimensions({dimensions:new w(L,k,.04)}),modelMatrix:ne,attributes:{color:_}}))},h=Math.atan2(-51,380);for(const y of t){if(Math.abs(y.e+148.8)<12&&Math.abs(y.n-216.3)<12){const L=[{bx:-154,by:230,horiz:!0,ang:0},{bx:-164.5,by:221.5,horiz:!1,ang:h},{bx:-164.5,by:210.5,horiz:!1,ang:h},{bx:-154,by:202.5,horiz:!0,ang:0},{bx:-129,by:229,horiz:!1,ang:h},{bx:-128.5,by:211.5,horiz:!1,ang:h},{bx:-136.5,by:202.5,horiz:!0,ang:0}];for(const k of L)for(let M=-3;M<=3;M++){const _=k.horiz?k.bx+M*1.1:k.bx,K=k.horiz?k.by:k.by+M*1.05;d(_,K,k.horiz?.52:2.8,k.horiz?2.8:.52,k.ang,p)}continue}const A=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const L of A){const k=y.e+L.de,M=y.n+L.dn;if(a(k,M)<1.2)continue;for(let $=-3;$<=3;$++){const Z=L.horiz?k+$*1.15:k,ne=L.horiz?M:M+$*1.15;d(Z,ne,L.horiz?.52:2.8,L.horiz?2.8:.52,0,p)}const _=k+(L.de===0?0:Math.sign(L.de)*2.1),K=M+(L.dn===0?0:Math.sign(L.dn)*2.1);d(_,K,L.horiz?6.8:.42,L.horiz?.42:6.8,0,p)}}for(let y=-80;y<=440;y+=8)d(-154,y,.18,3.2,0,p),d(-132,y,.18,3.2,0,p);for(let y=-420;y<=160;y+=8){const A=263-(y+420)*.13421052631578947;d(y,A+7.5,3.2,.18,h,p),d(y,A-7.5,3.2,.18,h,p),d(y,A,4.5,.18,h,u)}for(let y=-160;y<=360;y+=8)d(158,y,.18,3.2,0,p);let b=null;c.length>0&&(b=new Fo({geometryInstances:c,appearance:new Oo({flat:!0,translucent:!0}),asynchronous:!1}),e.scene.primitives.add(b));const g=[],C=zt("pare"),S=zt("peaton"),x=zt("vel30"),B=W.fromCssColorString("#9ca3af");return t.forEach((y,A)=>{const L=[{e:y.e-7.2,n:y.n-7.2,tex:C},{e:y.e+7.2,n:y.n-7.2,tex:A%2===0?S:x}];for(const k of L){const M=i(k.e,k.n);g.push(e.entities.add({position:s(k.e,k.n,M+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:B}}),e.entities.add({position:s(k.e,k.n,M+2.45),billboard:{image:k.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:Do.CENTER}}))}}),{setVisible(y){b&&(b.show=y);for(const A of g)A.show=y}}}function ba(e,o){const t=(x,B,y)=>Y.multiplyByPoint(o,new w(x,B,y),new w),a=[],p=W.fromCssColorString("#7a7771"),u=W.fromCssColorString("#3d3833"),d=W.fromCssColorString("#24471b"),h=W.fromCssColorString("#3d7f8f").withAlpha(.88),b=W.fromCssColorString("#ffbe55");a.push(e.entities.add({position:t(-225,263.5,4.17+.32),cylinder:{length:.64,topRadius:3.3,bottomRadius:3.6,material:p,slices:12}}),e.entities.add({position:t(-225,263.5,4.17+.56),cylinder:{length:.24,topRadius:3.45,bottomRadius:3.55,material:d,slices:12}}),e.entities.add({position:t(-225,263.5,4.17+.66),cylinder:{length:.08,topRadius:2.95,bottomRadius:2.95,material:h,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+1.35),cylinder:{length:1.9,topRadius:.34,bottomRadius:.48,material:u}}),e.entities.add({position:t(-225,263.5,4.17+1.35),cylinder:{length:.18,topRadius:1.95,bottomRadius:1.55,material:u,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+2.2),cylinder:{length:.16,topRadius:1.15,bottomRadius:.85,material:u,slices:24}}));let g=0;const C=new it(new $t(()=>{const x=.62+.18*Math.sin(g*7);return W.fromCssColorString("#d9f4ff").withAlpha(x)},!1)),S=new it(new $t(()=>{const x=.46+.16*Math.cos(g*5.5);return W.fromCssColorString("#bce8f7").withAlpha(x)},!1));a.push(e.entities.add({position:t(-225,263.5,4.17+2.85),cylinder:{length:1.25,topRadius:.08,bottomRadius:.36,material:C,slices:16}}),e.entities.add({position:t(-225,263.5,4.17+1.78),cylinder:{length:.85,topRadius:1.08,bottomRadius:1.22,material:S,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+1.02),cylinder:{length:.72,topRadius:1.88,bottomRadius:2.08,material:S,slices:24}}));for(let x=-246;x<=-202;x+=8.5)a.push(e.entities.add({position:t(x,255.8,4.17+1.1),cylinder:{length:2.2,topRadius:.04,bottomRadius:.05,material:u}}),e.entities.add({position:t(x,255.8,4.17+2.3),ellipsoid:{radii:new w(.16,.16,.22),material:b}}));return{update(x){g=x},setVisible(x){for(const B of a)B.show=x}}}const ht=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],eo=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],to=3.2;async function wa(e,o,t=110){const a=We.secciones;let i,s,c;try{i=await fetch(a+"vias_campo.json").then(m=>m.json());const l=new Uint8Array(await fetch(a+"vias_campo.bin").then(m=>m.arrayBuffer()));s=l.subarray(0,i.w*i.h),c=l.subarray(i.w*i.h)}catch{return null}const{cell:p,x0:u,y0:d,w:h,h:b}=i,g=(l,m)=>{const v=(l-u)/p-.5,r=(m-d)/p-.5,P=Math.floor(v),H=Math.floor(r);if(P<0||H<0||P>=h-1||H>=b-1)return 0;const j=v-P,n=r-H,f=H*h+P;return((s[f]*(1-j)+s[f+1]*j)*(1-n)+(s[f+h]*(1-j)+s[f+h+1]*j)*n)*.5},C=(l,m)=>{const v=Math.max(0,Math.min(h-1,Math.floor((l-u)/p))),r=Math.max(0,Math.min(b-1,Math.floor((m-d)/p))),P=r*h+v;if(s[P]>0)return c[P]*.1-2;let H=0,j=0;for(let n=-2;n<=2;n++){const f=r+n;if(!(f<0||f>=b))for(let E=-2;E<=2;E++){const T=v+E;if(T<0||T>=h)continue;const R=f*h+T;if(s[R]===0)continue;const q=1/(E*E+n*n+.5);H+=q,j+=(c[R]*.1-2)*q}}return H>0?j/H:1},S=[],x=[],B=[];for(let l=2;l<b-2;l++)for(let m=2;m<h-2;m++){const v=l*h+m,r=u+(m+.5)*p,P=d+(l+.5)*p,H=Math.hypot(r+180,P-250);if(H>520)continue;const j=s[v]*.5;if(j>=2.6&&j<=5&&S.push(v),j>=6&&H<460&&B.push({e:r,n:P,d:j}),s[v]===0&&H<430){let n=!1;for(let f=-2;f<=2&&!n;f++)for(let E=-2;E<=2;E++)if(s[(l+f)*h+(m+E)]>0){n=!0;break}n&&x.push(v)}}if(!S.length)return null;B.sort((l,m)=>m.d-l.d);const y=[];for(const l of B){if(y.length>=6)break;if(y.some(r=>Math.hypot(r.e-l.e,r.n-l.n)<90))continue;const m=C(l.e,l.n),v=ya(e,o,l.e,l.n,C);v.ns.setState("green"),v.ew.setState("red"),y.push({e:l.e,n:l.n,u:m,faseOffset:y.length*4.5,rig:v,nsEstado:"green",ewEstado:"red"})}const A=xa(e,o,y,g,C),L=ba(e,o),k=(()=>{let l=12345;return()=>(l=l*1664525+1013904223>>>0)/4294967296})(),M=(l,m,v)=>{const r=Math.cos(v),P=Math.sin(v);if(l>=-168&&l<=-118&&Math.abs(P)>.35)return l<-143?P<-.2?12:-1e6:P>.2?12:-1e6;const H=263-(l+420)*(51/380);return Math.abs(m-H)<26&&Math.abs(r)>.35?m>H?r>.2?12:-1e6:r<-.2?12:-1e6:l>=-255&&l<=-210&&m<222&&Math.abs(P)>.35?P<-.2?10:-1e6:m<175&&l<-215&&Math.abs(r)>.35?r>.2?10:-1e6:l<-385&&m<265&&Math.abs(P)>.35?P<-.2?10:-1e6:0},_=[],K=(l,m,v)=>_.some(r=>r!==v&&Math.hypot(r.e-l,r.n-m)<8.5),$=l=>{for(let m=0;m<45;m++){const v=S[Math.floor(k()*S.length)],r=u+(v%h+.5)*p,P=d+(Math.floor(v/h)+.5)*p;if(K(r,P,l))continue;let H=0,j=-1e9;for(let n=0;n<16;n++){const f=n/16*Math.PI*2,E=r+Math.cos(f)*10,T=P+Math.sin(f)*10,R=g(E,T),q=M(E,T,f);if(q<-1e4)continue;const oe=g(r+Math.sin(f)*2.5,P-Math.cos(f)*2.5),ae=g(r-Math.sin(f)*2.5,P+Math.cos(f)*2.5),N=-Math.abs(R-to)+(ae>oe?1.5:0)+q;R>1.5&&N>j&&(j=N,H=f)}if(j>-1e8){l.e=r,l.n=P,l.th=H,l.vActual=l.v*.5;return}}};for(let l=0;l<t;l++){const m=k(),v=m<.12?"sitp_azul":m<.2?"sitp_amarillo":m<.38?"taxi":m<.54?"moto":m<.68?"hatch":m<.84?"suv":"sedan",H={e:0,n:0,th:0,v:v==="moto"?8+k()*4.5:v==="sitp_azul"||v==="sitp_amarillo"?5.2+k()*3:6.5+k()*5,vActual:0,model:null,u:0,tipo:v};$(H),_.push(H)}const Z=[];if(x.length>0)for(let l=0;l<42;l++){const m=x[Math.floor(k()*x.length)],v=u+(m%h+.5)*p,r=d+(Math.floor(m/h)+.5)*p;Z.push({e:v,n:r,th:k()*Math.PI*2,v:1.15+k()*.45,model:null,u:C(v,r)+.16,conPerro:l%3===0})}const ne=[],se=(l,m,v,r,P,H,j,n=.68)=>{for(let f=0;f<P;f++){const E=P===1?(l+m)*.5:l+f/(P-1)*(m-l);for(let T=0;T<H;T++){if(k()>n)continue;const R=H===1?(v+r)*.5:v+T/(H-1)*(r-v);if(g(E,R)>.3)continue;const q=k(),oe=q<.08?"taxi":q<.42?"suv":"sedan",ae=k()<.5?0:Math.PI,N=C(E,R);ne.push({e:E+(k()-.5)*.25,n:R+(k()-.5)*.25,u:N>-1.5?N:3.55,th:j+ae+(k()-.5)*.07,tipo:oe,model:null})}}};se(92,134,-22,62,4,15,.05,.7),se(52,108,114,146,5,4,.12,.62),se(58,106,-104,-56,4,6,.1,.65),se(-132,-98,-46,32,3,12,.04,.68);const pe=new w,Te=new It,ze=new Y,Ee=(l,m=.08)=>{l.model&&(w.fromElements(l.e,l.n,l.u+m,pe),It.fromRotationZ(l.th,Te),Y.fromRotationTranslation(Te,pe,ze),l.model.modelMatrix=Y.multiply(o,ze,new Y))},Ke={sedan:"carro.glb",suv:"carro_suv.glb",hatch:"carro_hatch.glb",taxi:"carro_taxi.glb",moto:"carro_moto.glb",sitp_azul:"sitp_azul.glb",sitp_amarillo:"sitp_amarillo.glb"},Ue=l=>l==="taxi"||l==="sitp_azul"||l==="sitp_amarillo",Ve=(async()=>{for(let l=0;l<_.length;l++){const m=_[l],v=Ke[m.tipo];try{const r=await at.fromGltfAsync({url:a+v,upAxis:ke.Y,forwardAxis:ke.X,shadows:ve.ENABLED,color:Ue(m.tipo)?W.WHITE:W.fromCssColorString(ht[l%ht.length]),colorBlendMode:Mt.MIX,colorBlendAmount:Ue(m.tipo)?0:.32});e.scene.primitives.add(r),m.model=r,m.u=C(m.e,m.n),Ee(m)}catch{}l%6===5&&await new Promise(r=>setTimeout(r,35))}for(let l=0;l<Z.length;l++){const m=Z[l];try{const v=await at.fromGltfAsync({url:a+(m.conPerro?"persona_perro.glb":"persona.glb"),upAxis:ke.Y,forwardAxis:ke.X,shadows:ve.ENABLED,color:W.fromCssColorString(eo[l%eo.length]),colorBlendMode:Mt.MIX,colorBlendAmount:.25});e.scene.primitives.add(v),m.model=v,Ee(m,0)}catch{}l%6===5&&await new Promise(v=>setTimeout(v,35))}for(let l=0;l<ne.length;l++){const m=ne[l],v=Ke[m.tipo];try{const r=await at.fromGltfAsync({url:a+v,upAxis:ke.Y,forwardAxis:ke.X,shadows:ve.ENABLED,color:Ue(m.tipo)?W.WHITE:W.fromCssColorString(ht[l*3%ht.length]),colorBlendMode:Mt.MIX,colorBlendAmount:Ue(m.tipo)?0:.32});e.scene.primitives.add(r),m.model=r,Ee(m)}catch{}l%8===7&&await new Promise(r=>setTimeout(r,30))}})();let xe=!0,ge=0;const je=(l,m)=>g(l,m)===0&&g(l+4,m)+g(l-4,m)+g(l,m+4)+g(l,m-4)>.5;return{ready:Ve,count:t,debug:()=>_.map(l=>[Math.round(l.e),Math.round(l.n),+l.u.toFixed(1),l.model?1:0]),setVisible(l){xe=l;for(const m of _)m.model&&(m.model.show=l);for(const m of ne)m.model&&(m.model.show=l);for(const m of Z)m.model&&(m.model.show=l);for(const m of y)m.rig.setVisible(l);A.setVisible(l),L.setVisible(l)},update(l){if(!xe)return;const m=Math.min(.08,Math.max(.001,l));ge+=m,L.update(ge);for(const v of y){const r=(ge+v.faseOffset)%24,P=r<10?"green":r<12?"yellow":"red",H=r>=12&&r<22?"green":r>=22?"yellow":"red";P!==v.nsEstado&&(v.nsEstado=P,v.rig.ns.setState(P)),H!==v.ewEstado&&(v.ewEstado=H,v.rig.ew.setState(H))}for(let v=0;v<_.length;v++){const r=_[v];if(!r.model)continue;let P=0,H=-1e9;for(let N=-4;N<=4;N++){const X=N*.13,D=r.th+X,ee=r.e+Math.cos(D)*9,ie=r.n+Math.sin(D)*9,be=g(ee,ie);if(be<1.1||g(r.e+Math.cos(D)*4.5,r.n+Math.sin(D)*4.5)<.9)continue;const Ne=M(ee,ie,D);if(Ne<-1e4)continue;const Pe=g(ee+Math.sin(D)*2.5,ie-Math.cos(D)*2.5),Ye=g(ee-Math.sin(D)*2.5,ie+Math.cos(D)*2.5),He=-Math.abs(Math.min(be,6)-to)-Math.abs(X)*1.6+(Ye>=Pe?.6:0)+Ne;He>H&&(H=He,P=X)}if(H<-1e8||Math.hypot(r.e+180,r.n-250)>580){$(r),r.u=C(r.e,r.n),Ee(r);continue}const j=Math.cos(r.th),n=Math.sin(r.th);let f=1;const E=r.tipo==="sitp_azul"||r.tipo==="sitp_amarillo",T=E?9.5:6.4,R=E?16.5:12.5;for(let N=0;N<_.length;N++){if(N===v||!_[N].model)continue;const X=_[N],D=X.e-r.e,ee=X.n-r.n,ie=D*D+ee*ee;if(ie>320)continue;const be=X.tipo==="sitp_azul"||X.tipo==="sitp_amarillo",ue=T+(be?3:0),Ne=R+(be?3:0),Pe=D*j+ee*n,Ye=Math.abs(-D*n+ee*j);if(Pe>0&&Pe<Ne&&Ye<2.45){const He=Pe<ue?0:(Pe-ue)/(Ne-ue);He<f&&(f=He)}else ie<(E||be?42:22)&&N<v&&(f=0)}const q=Math.abs(j)>Math.abs(n);for(const N of y){if((q?N.ewEstado:N.nsEstado)==="green")continue;const D=N.e-r.e,ee=N.n-r.n,ie=D*j+ee*n,be=Math.abs(-D*n+ee*j);if(ie>7&&ie<21&&be<9){const ue=ie<10.5?0:(ie-10.5)/10.5;ue<f&&(f=ue)}}const oe=1-Math.min(.55,Math.abs(P)*1.4),ae=r.v*oe*f;if(r.vActual+=(ae-r.vActual)*Math.min(1,m*4.5),r.vActual>.05){r.th+=Math.max(-1.4*m,Math.min(1.4*m,P));const N=r.e+Math.cos(r.th)*r.vActual*m,X=r.n+Math.sin(r.th)*r.vActual*m;g(N,X)>=.7?(r.e=N,r.n=X):r.th+=.6;const D=Math.max(C(r.e,r.n),C(r.e+Math.cos(r.th)*1.4,r.n+Math.sin(r.th)*1.4),C(r.e-Math.cos(r.th)*1.4,r.n-Math.sin(r.th)*1.4));r.u+=(D-r.u)*Math.min(1,m*8)}Ee(r)}for(const v of Z){if(!v.model)continue;const r=v.e+Math.cos(v.th)*v.v*m,P=v.n+Math.sin(v.th)*v.v*m;je(r,P)&&Math.hypot(r+180,P-250)<430?(v.e=r,v.n=P,v.u+=(C(v.e,v.n)+.16-v.u)*Math.min(1,m*4)):v.th+=.9+k()*1.2,Ee(v,0)}}}}async function oo(e,o){try{const t=new Image;t.decoding="async",t.src=e,await t.decode();const a=document.createElement("canvas");a.width=t.naturalWidth,a.height=t.naturalHeight;const i=a.getContext("2d");i.drawImage(t,0,0);const s=i.getImageData(0,0,a.width,a.height);return new Je({typedArray:new Uint8Array(s.data.buffer),width:a.width,height:a.height,repeat:!0,minificationFilter:bt.LINEAR_MIPMAP_LINEAR,magnificationFilter:xt.LINEAR})}catch{return new Je({typedArray:new Uint8Array([...o,255]),width:1,height:1})}}function Ca(e,o){return new qe({uniforms:{uNight:{type:I.FLOAT,value:0},uLadrillo:{type:I.SAMPLER_2D,value:e},uTeja:{type:I.SAMPLER_2D,value:o}},varyings:{vRP:de.VEC3,vRN:de.VEC3},vertexShaderText:`
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
          // ladrillo real del hotel: la foto tal cual, a escala (≈5 piezas de 25 cm por 1,3 m)
          vec3 ladr = czm_srgbToLinear(texture(uLadrillo, vec2(along, vRP.y) / 1.28).rgb);
          ladr *= 0.9 + 0.18 * big;   // paños un poco más tostados o claros, como en la obra
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
    `})}async function ka(e,o){const t=We.secciones;let a;try{a=await fetch(t+"revit.json").then(g=>g.json())}catch{return null}const[i,s]=await Promise.all([oo(t+"tex_ladrillo_hlf.webp",[190,112,74]),oo(t+"tex_teja.webp",[90,52,28])]),c=Ca(i,s),p=[];for(const g of a.niveles)try{const C=await at.fromGltfAsync({url:t+g.file,modelMatrix:o,upAxis:ke.Y,forwardAxis:ke.X,shadows:ve.ENABLED,backFaceCulling:!1,show:!1});C.customShader=c,C.imageBasedLighting.imageBasedLightingFactor=new Ae(.45,.25),e.scene.primitives.add(C),p.push({...g,model:C,off:0,shown:!1,anim:null})}catch(C){console.warn("Nivel de Revit no cargado",g.file,C)}if(!p.length)return null;const u=new Y,d=g=>{const C=Y.fromTranslation(new w(0,0,g.off),u);g.model.modelMatrix=Y.multiply(o,C,new Y),g.model.show=g.shown},h=g=>1-Math.pow(1-g,3),b={niveles:p.map(g=>({i:g.i,nombre:g.nombre})),caja:a.caja,bloques:a.bloques??[],huella:a.huella??[],ready:!0,visible:!1,abierto:-1,play(){b.visible=!0,b.abierto=-1;for(const g of p)g.off=0,g.shown=!0,g.anim=null,d(g)},openAt(g){b.visible=!0,b.abierto=g;const C=performance.now();let S=0;for(const x of[...p].reverse())if(x.i>g){const B=22+(x.i-g)*7.5;x.shown=!0,d(x),x.anim={o0:x.off,o1:B,start:C+S++*70,dur:900,hideAtEnd:!0}}for(const x of p)x.i<=g&&(x.shown=!0,x.off!==0&&(x.anim={o0:x.off,o1:0,start:C,dur:600}),d(x))},full(){b.visible=!0,b.abierto=-1;const g=performance.now();let C=0;for(const S of p)S.shown=!0,S.off!==0?S.anim={o0:S.off,o1:0,start:g+C++*60,dur:800}:d(S)},hide(){b.visible=!1,b.abierto=-1;for(const g of p)g.anim=null,g.off=0,g.shown=!1,d(g)},setNight(g){c.setUniform("uNight",g)},update(g,C){if(b.visible)for(const S of p){const x=S.anim;if(!x||C<x.start)continue;const B=Math.min(1,(C-x.start)/x.dur),y=h(B);S.off=x.o0+(x.o1-x.o0)*y,B>=1&&(x.hideAtEnd&&(S.shown=!1),S.anim=null),d(S)}}};return b}function Ma(e,o){const t=document.createElement("style");t.textContent=`
    .pisos { position: fixed; left: 20px; top: 318px; z-index: 6; width: 244px; padding: 12px 10px 10px; border-radius: 14px;
      background: rgba(12,16,22,.72); border: 1px solid rgba(255,255,255,.13); backdrop-filter: blur(18px) saturate(140%);
      -webkit-backdrop-filter: blur(18px) saturate(140%); color: #eef2f7; font-family: ui-sans-serif,-apple-system,"Segoe UI",Inter,system-ui,sans-serif;
      display: grid; gap: 3px; }
    .pisos[hidden] { display: none; }
    .pisos button { all: unset; box-sizing: border-box; width: 100%; padding: 8px 10px; border-radius: 9px; font-size: 12.5px; cursor: pointer;
      display: flex; justify-content: space-between; color: rgba(238,242,247,.72); }
    .pisos button:hover { background: rgba(255,255,255,.08); color: #eef2f7; }
    .pisos button.on { background: #e8eef6; color: #0a0e14; font-weight: 600; }
    .pisos button span { opacity: .6; font-variant-numeric: tabular-nums; }
    @media (max-width: 720px) { .pisos { top: auto; bottom: 250px; left: 12px; right: 12px; width: auto; grid-template-columns: repeat(4, 1fr); }
      .pisos button span { display: none; } }
  `,document.head.appendChild(t);const a=document.createElement("aside");a.className="pisos",a.hidden=!0,a.innerHTML="";const i=new Map,s=(p,u,d)=>{const h=document.createElement("button");h.innerHTML=`${u}<span>${d}</span>`,h.addEventListener("click",()=>o(p)),i.set(p,h),a.appendChild(h)};s(-1,"Edificio completo",""),s(1,"Piso 2","N2"),document.body.appendChild(a);const c=p=>i.forEach((u,d)=>u.classList.toggle("on",d===p));return c(-1),{show:p=>{a.hidden=!p},mark:c}}const mt={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function Et(e){const o=/^#?([0-9a-f]{6})$/i.exec(e.trim());if(!o)return[1,1,1];const t=parseInt(o[1],16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}const Sa=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function Ta(e){const o={dia:{...mt.dia},tarde:{...mt.tarde},noche:{...mt.noche}};let t="dia";const a=document.createElement("button");a.id="btnLookStudio",a.className="look-toggle",a.textContent="⚙ Ajustar luz",a.title="Abrir editor de iluminación y color (L)",document.body.appendChild(a);const i=document.createElement("aside");i.id="lookPanel",i.className="look-panel",i.hidden=!0,i.innerHTML=`
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
  `,document.body.appendChild(i);const s=i.querySelector("#lpBody"),c=new Map;for(const b of Sa){const g=document.createElement("section");g.className="lp-sec";const C=document.createElement("h4");C.textContent=b.title,g.appendChild(C);for(const S of b.items){const x=document.createElement("label");x.className="lp-row";const B=document.createElement("span");B.className="lp-lbl",B.textContent=S.label,x.appendChild(B);const y=document.createElement("input");y.type=S.type,S.type==="range"&&(y.min=String(S.min),y.max=String(S.max),y.step=String(S.step));const A=S.type==="range"?document.createElement("span"):void 0;A&&(A.className="lp-val"),y.addEventListener("input",()=>{const k=o[t];if(S.type==="range"){const M=parseFloat(y.value);k[S.key]=M,A&&(A.textContent=S.step&&S.step>=1?String(Math.round(M)):M.toFixed(2))}else k[S.key]=y.value;e(t,k)});const L=document.createElement("div");L.className="lp-ctrl",L.appendChild(y),A&&L.appendChild(A),x.appendChild(L),g.appendChild(x),c.set(S.key,{input:y,val:A})}s.appendChild(g)}const p={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function u(){const b=o[t],g=i.querySelector("#lpPresetName");g&&(g.textContent=p[t]);for(const[C,{input:S,val:x}]of c){const B=b[C];if(S.value=String(B),x&&typeof B=="number"){const y=parseFloat(S.step||"0.01");x.textContent=y>=1?String(Math.round(B)):B.toFixed(2)}}}const d=()=>{i.hidden=!i.hidden,a.classList.toggle("on",!i.hidden)};a.addEventListener("click",d),i.querySelector("#lpClose")?.addEventListener("click",d);const h=i.querySelector("#lpCopy");return h.addEventListener("click",async()=>{const b=JSON.stringify({active:t,presets:o},null,2);try{await navigator.clipboard.writeText(b),h.textContent="¡JSON copiado!",setTimeout(()=>h.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",b)}}),i.querySelector("#lpReset")?.addEventListener("click",()=>{o[t]={...mt[t]},u(),e(t,o[t])}),addEventListener("keydown",b=>{b.code==="KeyL"&&!b.ctrlKey&&!b.metaKey&&!b.altKey&&d()}),u(),{setActivePreset(b){t=b,u()},getPreset(b){return o[b]},toggle:d}}const za={planos:{nombre:"Planos finales",o:{exposure:1.06,contrast:.18,saturation:1.08,tintColor:"#fff8f0",vignette:.1,shadowDarkness:.36,bloomBrightness:-.65,skyFill:.34,groundFill:.18,skyZenith:"#5f86b3",skyHorizon:"#d9dee0",hazeAmount:.06,hazeStart:600},sol:1},natural:{nombre:"Natural",o:{exposure:1.04,contrast:.2,saturation:1.05,tintColor:"#ffffff",vignette:.18,shadowDarkness:.45,bloomBrightness:-.6}},calido:{nombre:"Cálido",o:{exposure:1.06,contrast:.24,saturation:1.14,tintColor:"#fff0dc",vignette:.25,shadowDarkness:.42,bloomBrightness:-.5},sol:1.05},claro:{nombre:"Render claro",o:{exposure:1.16,contrast:.1,saturation:.96,tintColor:"#fbfcff",vignette:.08,shadowDarkness:.28,bloomBrightness:-.7}},cine:{nombre:"Cinematográfico",o:{exposure:.98,contrast:.42,saturation:.86,tintColor:"#f3ece3",vignette:.55,shadowDarkness:.5,bloomBrightness:-.45}},dramatico:{nombre:"Dramático",o:{exposure:.94,contrast:.55,saturation:1.1,tintColor:"#fff6ec",vignette:.62,shadowDarkness:.62,bloomBrightness:-.4},sol:1.12}};function Ea(e,o,t){if(o==="panel")return e;const a=za[o],i={...e,...a.o};return i.exposure=e.exposure+((a.o.exposure??e.exposure)-e.exposure)*(1-t),i.sunIntensity=e.sunIntensity*(a.sol??1),i}const ao=4.7*Math.PI/180,Pa="2026-11-16",io=-18.6*Math.PI/180,Co=11.68;function Aa(e){const o=(e-Co)*15*Math.PI/180,t=Math.sin(ao)*Math.sin(io)+Math.cos(ao)*Math.cos(io)*Math.cos(o);return Math.asin(t)*180/Math.PI}const no=(e,o,t)=>{const a=Math.max(0,Math.min(1,(t-e)/(o-e)));return a*a*(3-2*a)},so=e=>[1,3,5].map(o=>parseInt(e.slice(o,o+2),16)),La=e=>"#"+e.map(o=>Math.round(Math.max(0,Math.min(255,o))).toString(16).padStart(2,"0")).join(""),tt=(e,o,t)=>{const a=so(e),i=so(o);return La(a.map((s,c)=>s+(i[c]-s)*t))};function ro(e,o,t){const a={...e};for(const i of Object.keys(e)){const s=e[i],c=o[i];a[i]=typeof s=="number"&&typeof c=="number"?s+(c-s)*t:typeof s=="string"&&typeof c=="string"&&s.startsWith("#")?tt(s,c,t):t<.5?s:c}return a}function Ra(e,o,t,a,i){const s=Aa(e),c=no(2,-7,s),p=no(26,6,s)*(1-c);let u=ro(t,a,p);u=ro(u,i,c),e<Co&&(u={...u,sunColor:tt(u.sunColor,"#fff1e2",.35*(1-c))});const d=o==="nublado"?1:o==="lluvia"?1.35:0;if(d){const C=Math.min(1,d);u={...u,sunIntensity:u.sunIntensity*(1-.68*C-(o==="lluvia"?.12:0)),shadowDarkness:u.shadowDarkness*(1-.6*C),cloudDensity:Math.max(u.cloudDensity,o==="lluvia"?1:.96),saturation:u.saturation*(1-.22*C),exposure:u.exposure*(1-(o==="lluvia"?.14:.06)),contrast:u.contrast*(1-.35*C),skyZenith:tt(u.skyZenith,o==="lluvia"?"#5d636a":"#8a9097",.85*(1-c)),skyHorizon:tt(u.skyHorizon,o==="lluvia"?"#868c93":"#b3b7bd",.85*(1-c)),sunColor:tt(u.sunColor,"#dfe4ea",.6*C),hazeAmount:u.hazeAmount+(o==="lluvia"?.22:.1),hazeStart:u.hazeStart*(o==="lluvia"?.45:.7),bloomBrightness:u.bloomBrightness-.2}}const h=Math.floor(e),b=Math.floor((e-h)*60),g=xo.fromIso8601(`${Pa}T${String(h).padStart(2,"0")}:${String(b).padStart(2,"0")}:00-05:00`);return{look:u,night:c,tarde:p,fecha:g,lluvia:o==="lluvia"?1:0,etiqueta:`${String(h).padStart(2,"0")}:${String(b).padStart(2,"0")}`}}function Ia(){return new Ht({name:"hlf_lluvia",uniforms:{uRain:0,uTime:0},fragmentShader:`
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
    `})}function _a(e){const o=document.createElement("style");o.textContent=`
    .tiempo { position: fixed; left: 50%; transform: translateX(-50%); bottom: 82px; z-index: 6; display: flex; align-items: center; gap: 10px;
      padding: 8px 12px; border-radius: 14px; background: rgba(12,16,22,.62); border: 1px solid rgba(255,255,255,.13);
      backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%); color: #eef2f7;
      font: 500 12px ui-sans-serif,-apple-system,"Segoe UI",Inter,system-ui,sans-serif; width: auto; }
    .tiempo .lbl { color: rgba(238,242,247,.6); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; padding-left: 4px; }
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
  `,document.head.appendChild(o);const t=document.createElement("div");t.className="tiempo",t.innerHTML=`
    <span class="lbl">Filtro</span>
    <select aria-label="Filtro de imagen" title="Filtro de imagen">
      <option value="planos" selected>Planos finales</option>
      <option value="natural">Natural</option>
      <option value="calido">Cálido</option>
      <option value="claro">Render claro</option>
      <option value="cine">Cinematográfico</option>
      <option value="dramatico">Dramático</option>
      <option value="panel">Ajuste manual</option>
    </select>`,document.body.appendChild(t);const a=t.querySelector("input")??document.createElement("input"),i=t.querySelector(".h")??document.createElement("span"),s=t.querySelector(".play")??document.createElement("button"),c=t.querySelector("select");c.addEventListener("change",()=>e.onFiltro(c.value)),a.value=String(e.hora),a.addEventListener("input",()=>e.onHora(Number(a.value)));let p=!0;return s.addEventListener("click",()=>{p=!p,s.textContent=p?"❚❚":"▶",e.onPlay(p)}),t.querySelectorAll("[data-clima]").forEach(u=>u.addEventListener("click",()=>{t.querySelectorAll("[data-clima]").forEach(d=>d.classList.toggle("on",d===u)),e.onClima(u.dataset.clima)})),{setHora(u,d){document.activeElement!==a&&(a.value=String(u)),i.textContent=d},setPlay(u){p=u,s.textContent=u?"❚❚":"▶"}}}const Na=[{id:"hotel",label:"HOTEL LA FONTANA",category:"PROYECTO PRINCIPAL",enu:[-210,352,26],camera:{heading:.55,pitch:-.42,range:240,dur:2}},{id:"piso2",label:"REMODELACIÓN PISO 2",category:"INTERVENCIÓN BIM",enu:[-256,320,12],camera:{heading:.19,pitch:-1.55,range:68,dur:2}},{id:"plazoleta",label:"PLAZOLETA DE LA FUENTE",category:"ESPACIO PÚBLICO",enu:[-232,328,5],camera:{heading:.45,pitch:-.28,range:110,dur:1.8}},{id:"clinica127",label:"CLÍNICA 127 COLSUBSIDIO",category:"TORRE CORPORATIVA",enu:[-325,207,40],camera:{heading:.85,pitch:-.32,range:160,dur:2}},{id:"torres",label:"TORRES SANTA BÁRBARA",category:"RESIDENCIAL",enu:[-320,395,45],camera:{heading:.35,pitch:-.35,range:210,dur:2}},{id:"metro127",label:"METRO 127 · SONESTA",category:"HOTEL Y COMERCIO",enu:[-195,145,28],camera:{heading:1.25,pitch:-.34,range:190,dur:2}},{id:"panpaya",label:"PAN PA' YA · OLÍMPICA",category:"ZONA COMERCIAL",enu:[-84,300,16],camera:{heading:2.45,pitch:-.3,range:140,dur:2}},{id:"unicentro",label:"UNICENTRO BOGOTÁ",category:"CENTRO COMERCIAL",enu:[10,0,20],camera:{heading:.65,pitch:-.45,range:420,dur:2.2}}];function Ha(e,o){const t=document.createElement("div");t.className="mp-pins-overlay",e.container.appendChild(t);const a=Na.map(u=>{const d=document.createElement("div");d.className="mp-pin",d.innerHTML=`
      <div class="mp-pin-card">
        <span class="mp-pin-flag"></span>
        <div class="mp-pin-content">
          ${u.category?`<span class="mp-pin-cat">${u.category}</span>`:""}
          <strong class="mp-pin-title">${u.label}</strong>
        </div>
      </div>
      <div class="mp-pin-line"></div>
      <div class="mp-pin-anchor"></div>
    `,d.addEventListener("click",b=>{b.stopPropagation(),o&&o(u)}),t.appendChild(d);const h=J(u.enu[0],u.enu[1],u.enu[2]);return{pin:u,el:d,worldPos:h}});let i=!1;t.style.display="none";const s=new Ae;function c(){if(!i){t.style.display="none";return}t.style.display="block";const u=e.scene,d=u.camera;for(const h of a){const b=w.subtract(h.worldPos,d.positionWC,new w);if(w.dot(b,d.directionWC)<=0){h.el.style.display="none";continue}const C=w.distance(d.positionWC,h.worldPos);if(C>3500){h.el.style.display="none";continue}const S=Vo.worldToWindowCoordinates(u,h.worldPos,s);if(!S){h.el.style.display="none";continue}h.el.style.display="block",h.el.style.transform=`translate3d(${Math.round(S.x)}px, ${Math.round(S.y)}px, 0)`;const x=Math.max(.75,Math.min(1.05,1200/(C+300))),B=C>2600?Math.max(0,(3500-C)/900):1;h.el.style.opacity=B.toFixed(2),h.el.querySelector(".mp-pin-card").style.transform=`scale(${x.toFixed(2)})`}}const p=e.scene.preRender.addEventListener(c);return{container:t,get visible(){return i},setVisible(u){i=u,u||(t.style.display="none")},update:c,destroy(){p(),t.remove()}}}Zo.defaultAccessToken=We.ionToken;const G=e=>document.getElementById(e),Ot=G("cesiumContainer"),lo=G("loading"),Fa=G("loadBar"),ko=G("loadLabel"),Oa=G("loadPct");function Fe(e,o){ko.textContent=e;const t=Math.round(Math.max(0,Math.min(1,o))*100);Fa.style.width=t+"%",Oa.textContent=t+"%"}const Q=new jo(Ot,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:ve.RECEIVE_ONLY,terrain:qo.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Wo.fromProviderAsync(yo.fromAssetId(We.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),U=Q.scene;U.globe.enableLighting=!0;U.globe.showGroundAtmosphere=!0;U.globe.depthTestAgainstTerrain=!0;U.globe.maximumScreenSpaceError=2;U.fog.enabled=!1;U.fog.density=18e-5;U.fog.minimumBrightness=.04;U.highDynamicRange=!0;U.msaaSamples=4;U.postProcessStages.fxaa.enabled=!0;U.screenSpaceCameraController.enableCollisionDetection=!1;U.light=new Yo({intensity:3,color:W.fromCssColorString("#fff4e3")});const Re=Q.shadowMap;Re.softShadows=!0;Re.size=4096;Re.maximumDistance=1200;Re.darkness=.24;Re.normalOffset=!0;{const e=Re;e._primitiveBias.depthBias=8e-4,e._primitiveBias.normalOffsetScale=1.6,e._primitiveBias.normalShadingSmooth=.35}const Be=U.postProcessStages.ambientOcclusion;Be.enabled=!0;Be.uniforms.intensity=2.1;Be.uniforms.bias=.08;Be.uniforms.lengthCap=.35;Be.uniforms.stepSize=1.4;Be.uniforms.blurStepSize=1;const _e=U.postProcessStages.bloom;_e.enabled=!0;_e.uniforms.glowOnly=!1;_e.uniforms.contrast=128;_e.uniforms.brightness=-.36;_e.uniforms.delta=1;_e.uniforms.sigma=2.6;_e.uniforms.stepSize=1.5;const Da=Ft(),Pt=e=>{const o=Y.getColumn(Da,e,new $e);return new w(o.x,o.y,o.z)},Se=ra(Pt(0),Pt(1),Pt(2));U.postProcessStages.add(Se);const Me=la();U.postProcessStages.add(Me);Q.camera.frustum.fov=go.toRadians(48);const co=(()=>{try{const e=U.context._gl,o=e.getExtension("WEBGL_debug_renderer_info");return o?String(e.getParameter(o.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),Ba=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(co)&&!/Arc/i.test(co);let z=null,le=Ba||matchMedia("(pointer: coarse)").matches?.5:1;function dt(){const e=Math.min(window.devicePixelRatio||1,2);Q.resolutionScale=e,Re.size=le>=1?4096:le>=.5?2048:1024,Re.softShadows=le>=.5,Be.enabled=le>=1,_e.enabled=le>=.5,U.msaaSamples=le>=.5?4:2,Q.shadows=le>=.5,z?.tileset&&(z.tileset.maximumScreenSpaceError=le>=1?8:le>=.5?12:20)}dt();Q.clock.shouldAnimate=!1;Q.clock.currentTime=xo.fromIso8601("2026-06-21T16:50:00-05:00");const F=new oa(Q),Dt=e=>J(Tt[e].e,Tt[e].n,Tt[e].u);F.flyTo({pivot:J(-228,305,12),heading:.55,pitch:-.42,range:240},0);F.groundHeight=e=>U.globe.getHeight(e);const Ua=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let fe=.04,De=1;function wt(e){U.light.intensity=e.sunIntensity,U.light.color=W.fromCssColorString(e.sunColor),Re.darkness=e.shadowDarkness,Be.uniforms.intensity=e.aoIntensity,_e.uniforms.brightness=e.bloomBrightness,Me.uniforms.uExposure=e.exposure,Me.uniforms.uContrast=e.contrast,Me.uniforms.uSaturation=e.saturation;const[o,t,a]=Et(e.tintColor);Me.uniforms.uTint=new w(o,t,a),Me.uniforms.uVignette=e.vignette;const[i,s,c]=Et(e.skyZenith);Se.uniforms.uSkyZenith=new w(i,s,c);const[p,u,d]=Et(e.skyHorizon);Se.uniforms.uSkyHorizon=new w(p,u,d),Se.uniforms.uCloudDensity=e.cloudDensity,Se.uniforms.uCloudSpeed=e.cloudSpeed,z?.setLook({skyFill:e.skyFill,groundFill:e.groundFill,hazeAmount:e.hazeAmount,hazeStart:e.hazeStart})}const nt=Ta((e,o)=>wt(o));wt(nt.getPreset("dia"));Se.uniforms.uNight=fe;Se.uniforms.uTarde=De;Me.uniforms.uNight=fe;Me.uniforms.uTarde=De;U.skyAtmosphere&&(U.skyAtmosphere.hueShift=0,U.skyAtmosphere.saturationShift=.08,U.skyAtmosphere.brightnessShift=-.04);const Va={dia:10.17,tarde:16.83,noche:19.58};let he=10.17,ot="sol",Mo="planos",yt=!1,Oe=null,st=-1;const So=U.postProcessStages.add(Ia()),Bt=_a({hora:he,onHora:e=>{he=e,Oe=null,yt=!1,Bt.setPlay(!1)},onClima:e=>{ot=e,st=-1},onPlay:e=>{yt=e},onFiltro:e=>{Mo=e,st=-1}});function ja(){const e=Ra(he,ot,nt.getPreset("dia"),nt.getPreset("tarde"),nt.getPreset("noche"));Q.clock.currentTime=e.fecha,wt(Ea(e.look,Mo,e.night)),fe=e.night,De=e.tarde,z?.setNight(fe),z?.setTarde(De),O?.setNight(fe),Se.uniforms.uNight=fe,Se.uniforms.uTarde=De,Me.uniforms.uNight=fe,Me.uniforms.uTarde=De,So.uniforms.uRain=e.lluvia,U.skyAtmosphere&&(U.skyAtmosphere.brightnessShift=-.55*fe-(ot==="lluvia"?.2:ot==="nublado"?.08:0),U.skyAtmosphere.saturationShift=.06-.3*fe-(ot==="sol"?0:.35));const o=G("clockLabel");o&&(o.textContent=e.etiqueta),Bt.setHora(he,e.etiqueta);const t=fe>.5?"noche":De>.5?"tarde":"dia";document.querySelectorAll("[data-light]").forEach(a=>a.classList.toggle("on",a.dataset.light===t))}function Wa(e){yt=!1,Bt.setPlay(!1),Oe={from:he,to:Va[e.id]??he,start:performance.now()}}document.querySelectorAll("[data-light]").forEach(e=>{e.addEventListener("click",()=>{const o=Ua.find(t=>t.id===e.dataset.light);o&&Wa(o)})});let Xe=!1;const _t=G("btnOrbit"),Ut=G("btnPedestrian"),Le=G("btnPiso2");function me(){Xe=!1,_t?.classList.remove("on")}function Ct(e,o=2){me(),Le?.classList.remove("on"),O&&O.abierto>=0&&(O.full(),ye?.mark(-1));const t=Ko[e];F.flyTo({pivot:Dt(t.place),heading:t.heading,pitch:t.pitch,range:t.range},o)}G("btnHome")?.addEventListener("click",()=>Ct("general",2.2));G("btnAerial")?.addEventListener("click",()=>Ct("aerial"));G("btnArch")?.addEventListener("click",()=>Ct("arch"));Ut?.addEventListener("click",()=>{me(),Le?.classList.remove("on"),F.isWalking?F.exitWalk():F.enterWalk(ce?zo(ce):void 0)});F.onModeChange=e=>{Ut?.classList.toggle("on",e);const o=G("hint");o&&e&&(o.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",o.classList.remove("fade"),setTimeout(()=>o.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(e=>{e.addEventListener("click",()=>{me();const o=e.dataset.place;if(o==="hotel"&&z){const t=z.buildings.find(a=>a.s==="Hotel");if(t){Ie(null),Ie(t);return}}F.flyTo({pivot:Dt(o),range:o==="hotel"?300:520,pitch:-.5},2)})});_t?.addEventListener("click",()=>{Xe=!Xe,_t.classList.toggle("on",Xe),Xe&&F.isWalking&&F.exitWalk()});const uo=Ha(Q,e=>{if(me(),e.id==="piso2"){Le?.click();return}if(e.id==="hotel"&&z){const t=z.buildings.find(a=>a.s==="Hotel");if(t){Ie(null),Ie(t);return}}const o=J(e.enu[0],e.enu[1],e.enu[2]);F.flyTo({pivot:o,heading:e.camera.heading,pitch:e.camera.pitch,range:e.camera.range},e.camera.dur??2)}),fo=G("btnPins");fo?.addEventListener("click",()=>{const e=!uo.visible;uo.setVisible(e),fo.classList.toggle("on",e)});Ot.addEventListener("pointerdown",me);Ot.addEventListener("wheel",me,{passive:!0});addEventListener("keydown",e=>{e.code==="Escape"&&(F.isWalking?F.exitWalk():Ie(null)),(e.code==="KeyH"||e.code==="Home")&&Ct("general",2.2),e.code==="KeyP"&&Ut?.click()});let ce=null,rt=null;const qa=9;let vt=null,O=null,ye=null,Nt=!1,ho=!1;async function Ya(){ho||(ho=!0,await lt(),!(!z||!O)&&(me(),Ga(),z?.startBackground()))}function Ga(){if(!z)return;const e=z.buildings.find(t=>t.s==="Hotel"),o=F.flyTo.bind(F);F.flyTo=()=>{};try{e?(Ie(e),Ze&&(Ze.hidden=!0)):kt()}finally{F.flyTo=o}}let pt=null;function lt(){return pt||(pt=(async()=>{z&&(O=await ka(Q,z.matrix),O&&(O.setNight(fe),z.setRevitBlocks(O.bloques,O.huella),ye=Ma(O,e=>{if(O)if(me(),ye?.mark(e),Le?.classList.toggle("on",e===1),e<0){O.full();const o=O.caja;F.flyTo({pivot:J((o[0]+o[2])/2,(o[1]+o[3])/2,12),heading:.55,pitch:-.42,range:240},2)}else if(e===1)O.openAt(1),F.flyTo({pivot:J(-222,278,12),heading:.1928,pitch:-1.55,range:105},2.5);else{O.openAt(e);const o=O.caja;F.flyTo({pivot:J((o[0]+o[2])/2,(o[1]+o[3])/2,12),pitch:-.95,range:150},2)}}),Nt&&(Nt=!1,kt(),Ce&&(Q.entities.remove(Ce),Ce=null))))})(),pt)}async function Xa(){if(me(),F.isWalking&&F.exitWalk(),await lt(),!O)return;if(z?.setRevitBlocks(O.bloques,O.huella),Le?.classList.contains("on")&&O.abierto===1){Le?.classList.remove("on"),ye?.mark(-1),O.full();const o=O.caja;F.flyTo({pivot:J((o[0]+o[2])/2,(o[1]+o[3])/2,12),heading:.55,pitch:-.42,range:240},2)}else Le?.classList.add("on"),ye?.mark(1),ye?.show(!0),O.openAt(1),F.flyTo({pivot:J(-222,278,12),heading:.1928,pitch:-1.55,range:105},2.5)}Le?.addEventListener("click",()=>void Xa());function kt(){!z||!O||(z.setRevitBlocks(O.bloques,O.huella),O.play(),ye?.mark(-1),ye?.show(!0))}function To(){z&&(vt={start:performance.now()},z.setHotelFloors(0))}let Ce=null;const Ze=G("card");function Za(e){return J((e.bb[0]+e.bb[2])/2,(e.bb[1]+e.bb[3])/2,e.b+e.h*.5)}function zo(e){return J((e.bb[0]+e.bb[2])/2,e.bb[1]-9,e.b)}function Ie(e){const o=ce?.s==="Hotel";if(ce=e,e?.s!=="Hotel"&&Le?.classList.remove("on"),Ce&&(Q.entities.remove(Ce),Ce=null),!e||!z){Ze&&(Ze.hidden=!0),ye?.show(!1);return}if(e.s!=="Hotel"?ye?.show(!1):O?.visible&&ye?.show(!0),e.s!=="Hotel"){const d=e.r.map(([b,g])=>J(b,g,0,z.matrix)),h=2572+e.b-.5;Ce=Q.entities.add({polygon:{hierarchy:new Xo(d),height:h,extrudedHeight:h+e.h+2.2,material:W.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:W.fromCssColorString("#d7ebff"),shadows:ve.DISABLED}})}const t=e.s==="Hotel";if(t&&!o){O?(kt(),Ce&&(Q.entities.remove(Ce),Ce=null)):(Nt=!0,lt(),To()),me();const d=O?.caja;F.flyTo(d?{pivot:J((d[0]+d[2])/2,(d[1]+d[3])/2,12),heading:.55,pitch:-.4,range:230}:{pivot:Dt("hotel"),pitch:-.38,range:290},1.8)}const a=t&&z?z.buildings.filter(d=>d.s==="Hotel"):[e],i=d=>Math.abs(d.r.reduce((h,b,g)=>{const C=d.r[(g+1)%d.r.length];return h+b[0]*C[1]-C[0]*b[1]},0)/2),s=a.reduce((d,h)=>d+i(h),0),c=a.reduce((d,h)=>d+i(h)*h.p,0),p=Math.max(...a.map(d=>d.p)),u=Math.max(...a.map(d=>d.h));Math.abs(e.r.reduce((d,h,b)=>{const g=e.r[(b+1)%e.r.length];return d+h[0]*g[1]-g[0]*h[1]},0)/2),G("cardKind").textContent=t?"Proyecto":`Sector ${e.s}`,G("cardTitle").textContent=t?"Hotel La Fontana":`Edificación ${e.id+1}`,G("cardData").innerHTML=`<dt>Pisos</dt><dd>${t?"hasta "+p:e.p}</dd><dt>Altura</dt><dd>${u.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(s).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(c).toLocaleString("es-CO")} m²</dd>`,Ze&&(Ze.hidden=!1)}F.onPick=e=>{z&&Ie(e?z.buildingAt(e):null)};G("cardClose")?.addEventListener("click",()=>Ie(null));G("cardFocus")?.addEventListener("click",()=>{if(!ce)return;me();const e=Math.max(ce.bb[2]-ce.bb[0],ce.bb[3]-ce.bb[1],ce.h);F.flyTo({pivot:Za(ce),pitch:-.42,range:Math.max(60,e*2.1)},1.7)});G("cardWalk")?.addEventListener("click",()=>{ce&&(me(),F.enterWalk(zo(ce)))});const At=G("status"),mo=G("statusText");async function $a(e=25e3){const o=performance.now()+e;let t=0;for(;performance.now()<o;){const a=U.globe.tilesLoaded,i=!z?.tileset||z.tileset.tilesLoaded;if(a&&i){if(t||(t=performance.now()),performance.now()-t>=600)break}else t=0;await new Promise(s=>setTimeout(s,150))}for(let a=0;a<8;a++)await new Promise(i=>requestAnimationFrame(i))}async function Ja(){Fe("Cargando el modelo del hotel...",.05),await new Promise(a=>setTimeout(a,30)),z=await ma(Q,(a,i)=>Fe(a,.05+i*.2),(a,i,s)=>{Fe(`Cargando secciones (${a}/${i}) · ${s}`,.25+a/Math.max(1,i)*.45),!(!At||!mo)&&(At.hidden=!1,mo.textContent=a<i?`Cargando secciones ${a}/${i} · ${s}`:`Modelo completo · ${i} secciones`,a>=i&&setTimeout(()=>At.classList.add("fade"),2600))}),z.setNight(fe),z.setTarde(De),lt();const e=document.querySelector("[data-light].on")?.dataset.light||"dia";wt(nt.getPreset(e)),dt(),F.flyTo({pivot:J(-228,305,12),heading:.55,pitch:-.42,range:240},0),z.startBackground(),Fe("Preparando el Hotel La Fontana...",.55),await lt(),Fe("Cargando la ciudad y la vegetación...",.7),await z.done,Fe("Cargando tráfico y parqueaderos...",.85),rt=await wa(Q,z.matrix),rt&&await rt.ready,window.__ALL__=!0,Fe("Renderizando...",.94),await $a(12e3),Fe("Listo",1);const o=G("btnEntrar");o&&(o.disabled=!1,o.textContent="Entrar",await new Promise(a=>o.addEventListener("click",()=>a(),{once:!0}))),lo.classList.add("done"),Ya(),setTimeout(()=>lo.remove(),900);const t=G("hint");t&&setTimeout(()=>t.classList.add("fade"),9e3),window.__READY__=!0}const re={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Go,viewer:Q,cam:F,getSite:()=>z,enuToWorld:J,select:Ie,stats:re,playHotel:To,playRevit:kt,getRevit:()=>O,getTrafico:()=>rt,setQuality:e=>{le=e,dt()}};Ja().catch(e=>{console.error(e),ko.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(e?.message??e)});let po=performance.now(),Lt=0;function Eo(){const e=performance.now(),o=Math.min(.1,(e-po)/1e3);if(po=e,Oe){const a=Math.min(1,(e-Oe.start)/1800),i=a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2;he=Oe.from+(Oe.to-Oe.from)*i,a>=1&&(Oe=null)}else yt&&(he+=o/7,he>20.6&&(he=5.6));if((Math.abs(he-st)>.004||st<0)&&(st=he,ja()),So.uniforms.uTime=e*.001,vt&&z){const a=(e-vt.start)/550,i=Math.floor(a),s=a-i,c=1-Math.pow(1-Math.min(1,s*1.6),3);i>=qa?(z.setHotelFloors(99),vt=null):z.setHotelFloors(i+c)}O?.update(o,e),rt?.update(o);const t=e*.001;if(z?.setTime(t),Se.uniforms.uTime=t,Xe&&!F.isWalking&&F.flyTo({heading:F.state.heading+.16*o},0),F.update(o),re.frames++,e-re.t0>=2e3){re.fps=Math.round(re.frames*1e3/(e-re.t0)),re.frames=0,re.t0=e,window.__FPS__=re.fps;const a=!!z&&z.sections.loaded>=z.sections.total&&e-Lt>8e3;z&&z.sections.loaded>=z.sections.total&&!Lt&&(Lt=e),a&&document.visibilityState==="visible"&&(re.fps<20&&le>.25&&!window.__DBG__.lock?++re.low>=3&&(le=le>=1?.5:.25,re.low=0,dt()):re.low=0)}requestAnimationFrame(Eo)}requestAnimationFrame(Eo);addEventListener("resize",dt);
