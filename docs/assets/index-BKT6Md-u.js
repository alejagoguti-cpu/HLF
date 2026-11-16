var Lo=Object.defineProperty;var Ro=(e,o,t)=>o in e?Lo(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t;var U=(e,o,t)=>Ro(e,typeof o!="symbol"?o+"":o,t);import{C as x,a as vo,T as _t,M as Y,b as Pe,c as et,H as Io,P as Ot,d as We,L as yo,U as _,V as de,e as Je,f as Ze,g as Ct,h as St,i as ht,j as _o,S as ve,I as xo,k as Fo,l as No,m as j,n as mt,R as Ho,o as at,A as Ce,p as Jt,q as Oo,r as Do,s as Bo,t as it,u as Zt,v as Ft,G as Uo,B as Vo,w as Et,J as bo,x as jo,y as Wo,z as qo,D as Yo,E as Go,F as Xo,K as $o,N as Jo}from"./cesium-8DXw046g.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const zt="/HLF/",Zo=zt.endsWith("/")?zt:zt+"/",Ko=Zo+"cesium/";window.CESIUM_BASE_URL=Ko;const yt={longitude:-74.04145021,latitude:4.70207636,height:2572},nt={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},xt={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},je={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},Qo=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Kt=-1.5533,Qt=-.012,ea=4200,ta=6,eo=1.7;class oa{constructor(o){U(this,"viewer");U(this,"canvas");U(this,"pivot",new x);U(this,"heading",.5);U(this,"pitch",-.6);U(this,"range",1200);U(this,"targetPivot",new x);U(this,"targetHeading",.5);U(this,"targetPitch",-.6);U(this,"targetRange",1200);U(this,"damping",9);U(this,"drag",null);U(this,"pointers",new Map);U(this,"pinch",null);U(this,"lastTap",0);U(this,"keys",new Set);U(this,"tween",null);U(this,"fov",vo.toRadians(48));U(this,"walking",!1);U(this,"eye",new x);U(this,"eyeTarget",new x);U(this,"wHeading",0);U(this,"wPitch",0);U(this,"wHeadingT",0);U(this,"wPitchT",0);U(this,"onPick",null);U(this,"onModeChange",null);U(this,"groundHeight",null);this.viewer=o,this.canvas=o.scene.canvas,o.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:x.clone(this.targetPivot)}}setPivot(o,t=!0){if(t){const a=x.clone(this.viewer.camera.positionWC),i=x.subtract(a,o,new x),s=x.magnitude(i),u=_t.eastNorthUpToFixedFrame(o),h=Y.inverseTransformation(u,new Y),d=Y.multiplyByPointAsVector(h,i,new x);if(s>1){const r=-Math.asin(Math.max(-1,Math.min(1,d.z/s)));if(r<Qt&&r>Kt){let f=Math.atan2(-d.x,-d.y);for(;f-this.heading>Math.PI;)f-=Math.PI*2;for(;f-this.heading<-Math.PI;)f+=Math.PI*2;this.heading=this.targetHeading=f,this.pitch=this.targetPitch=r,this.range=this.targetRange=this.clamp(s),x.clone(o,this.pivot)}}}this.targetPivot=x.clone(o),this.tween=null}bind(){const o=this.canvas;o.style.touchAction="none",o.addEventListener("pointerdown",a=>{if(o.setPointerCapture(a.pointerId),this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2){const[i,s]=[...this.pointers.values()];this.pinch={distance:Math.hypot(i.x-s.x,i.y-s.y),range:this.targetRange,cx:(i.x+s.x)/2,cy:(i.y+s.y)/2},this.drag=null;return}a.button===2||a.button===1||a.shiftKey?this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"pan",moved:!1}:a.button===0&&(this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"orbit",moved:!1}),this.tween=null}),o.addEventListener("pointermove",a=>{if(!this.pointers.has(a.pointerId))return;if(this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2&&this.pinch){const[u,h]=[...this.pointers.values()],d=Math.hypot(u.x-h.x,u.y-h.y),r=(u.x+h.x)/2,f=(u.y+h.y)/2;this.walking?this.walk((this.pinch.cy-f)*.06,0):(d>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/d)),this.pan(this.pinch.cx-r,f-this.pinch.cy)),this.pinch.cx=r,this.pinch.cy=f;return}if(!this.drag||a.pointerId!==this.drag.id)return;const i=a.offsetX-this.drag.x,s=a.offsetY-this.drag.y;this.drag.x=a.offsetX,this.drag.y=a.offsetY,Math.abs(i)+Math.abs(s)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=i*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+s*.0028))):this.walk(s*.05,-i*.05):this.drag.mode==="orbit"?(this.targetHeading-=i*.0042,this.targetPitch=this.clampPitch(this.targetPitch-s*.0034)):this.pan(-i,s)});const t=a=>{if(this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&a.pointerId===this.drag.id){const i=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,i&&a.type==="pointerup"){const s=new Pe(a.offsetX,a.offsetY),u=performance.now();if(a.pointerType!=="mouse"&&u-this.lastTap<320){this.lastTap=0,this.focusAt(s);return}this.lastTap=u;const h=this.pickWorld(s);h&&!this.walking&&this.setPivot(h,!0),this.onPick?.(h)}}};o.addEventListener("pointerup",t),o.addEventListener("pointercancel",t),o.addEventListener("contextmenu",a=>a.preventDefault()),o.addEventListener("wheel",a=>{a.preventDefault(),this.tween=null;const i=a.deltaMode===1?16:a.deltaMode===2?100:1,s=a.deltaY*i;if(this.walking){this.walk(-s*.02,0);return}const u=Math.exp(Math.max(-.45,Math.min(.45,s*.0016))),h=this.pickWorld(new Pe(a.offsetX,a.offsetY)),d=this.clamp(this.targetRange*u);if(h&&u<1){const r=Math.min(.45,(this.targetRange-d)/this.targetRange)*.8,f=x.subtract(h,this.targetPivot,new x),w=x.magnitude(f);if(w>1){const b=Math.min(w,this.targetRange)*r/w;x.add(this.targetPivot,x.multiplyByScalar(f,b,f),this.targetPivot)}}this.targetRange=d},{passive:!1}),o.addEventListener("dblclick",a=>{a.preventDefault(),this.focusAt(new Pe(a.offsetX,a.offsetY))}),addEventListener("keydown",a=>{a.target instanceof HTMLInputElement||(this.keys.add(a.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(a.code)&&a.preventDefault())}),addEventListener("keyup",a=>this.keys.delete(a.code)),addEventListener("blur",()=>this.keys.clear())}clamp(o,t=ta,a=ea){return Math.max(t,Math.min(a,o))}clampPitch(o){return Math.max(Kt,Math.min(Qt,o))}moveHorizontal(o,t,a,i){const s=_t.eastNorthUpToFixedFrame(o),u=new x(Math.sin(t)*a+Math.cos(t)*i,Math.cos(t)*a-Math.sin(t)*i,0);Y.multiplyByPoint(s,u,o)}pan(o,t){const a=this.canvas.clientHeight||1,i=2*this.range*Math.tan(this.fov/2)/a,s=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,t*i/s,o*i),this.tween=null}walk(o,t){this.moveHorizontal(this.eyeTarget,this.wHeading,o,t),this.snapEye()}snapEye(){const o=et.fromCartesian(this.eyeTarget),t=this.groundHeight?.(o);t!==void 0&&Number.isFinite(t)&&(o.height=t+eo,et.toCartesian(o,void 0,this.eyeTarget))}pickWorld(o){const t=this.viewer.scene;let a;if(t.pickPositionSupported&&t.pick(o,4,4)&&(a=t.pickPosition(o)),!a){const i=t.camera.getPickRay(o);i&&(a=t.globe.pick(i,t)??void 0)}return a??null}focusAt(o){const t=this.pickWorld(o);if(t){if(this.walking){x.clone(t,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:t,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(o,t=2){this.walking&&this.exitWalk(!1);const a={pivot:o.pivot??x.clone(this.targetPivot),heading:o.heading??this.targetHeading,pitch:o.pitch??this.targetPitch,range:o.range??this.targetRange};let i=a.heading;for(;i-this.targetHeading>Math.PI;)i-=Math.PI*2;for(;i-this.targetHeading<-Math.PI;)i+=Math.PI*2;if(a.heading=i,t<=.02){this.tween=null,this.targetPivot=x.clone(a.pivot),this.pivot=x.clone(a.pivot),this.heading=this.targetHeading=a.heading,this.pitch=this.targetPitch=a.pitch,this.range=this.targetRange=a.range;return}this.tween={from:{pivot:x.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:a,start:performance.now(),duration:t*1e3}}enterWalk(o){x.clone(o??this.targetPivot,this.eyeTarget),this.snapEye(),x.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(o=!0){if(!this.walking)return;this.walking=!1;const t=et.fromCartesian(this.eyeTarget);t.height-=eo-1;const a=et.toCartesian(t);this.pivot=x.clone(a),this.targetPivot=a,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,o?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(o){if(!this.keys.size)return;const t=this.keys,a=t.has("ShiftLeft")||t.has("ShiftRight")?3:1;let i=0,s=0;(t.has("KeyW")||t.has("ArrowUp"))&&(i+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(i-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(s+=1),(t.has("KeyA")||t.has("ArrowLeft"))&&(s-=1);let u=0;if(t.has("KeyQ")&&(u+=1),t.has("KeyE")&&(u-=1),this.walking){u&&(this.wHeadingT-=u*1.2*o),(i||s)&&this.walk(i*4.2*a*o,s*3.4*a*o);return}if(u&&(this.targetHeading+=u*.9*o,this.tween=null),(t.has("PageUp")||t.has("Equal")||t.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*o))),(t.has("PageDown")||t.has("Minus")||t.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*o))),t.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*o)),t.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*o)),!i&&!s)return;const h=Math.max(8,this.range*.6)*a*o;this.moveHorizontal(this.targetPivot,this.heading,i*h,s*h),this.tween=null}update(o){this.updateKeys(o);const t=1-Math.exp(-this.damping*o);if(this.walking){x.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*o),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*t,this.wPitch+=(this.wPitchT-this.wPitch)*t,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const a=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),i=Qo(a),{from:s,to:u}=this.tween;x.lerp(s.pivot,u.pivot,i,this.targetPivot),this.targetHeading=s.heading+(u.heading-s.heading)*i,this.targetPitch=s.pitch+(u.pitch-s.pitch)*i,this.targetRange=Math.exp(Math.log(s.range)+(Math.log(u.range)-Math.log(s.range))*i),a>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*t,this.pitch+=(this.targetPitch-this.pitch)*t,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*t),x.lerp(this.pivot,this.targetPivot,t,this.pivot),this.viewer.camera.lookAt(this.pivot,new Io(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(Y.IDENTITY)}}function aa(){return new Ze({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const wo=()=>({uAerial:{type:_.SAMPLER_2D,value:aa()},uAerialRect:{type:_.VEC4,value:new Je(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:_.FLOAT,value:0}}),Co=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,dt=`
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
`;function ia(){return new We({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uSkyFill:{type:_.FLOAT,value:.24},uHazeAmount:{type:_.FLOAT,value:.08},uHazeStart:{type:_.FLOAT,value:1200},uHotelPisos:{type:_.FLOAT,value:99},uRevitBox:{type:_.VEC4,value:new Je(0,0,0,0)},uLean:{type:_.VEC2,value:new Pe(0,0)},...wo()},varyings:{vPosM:de.VEC3,vUpEC:de.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:dt+Co+`
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
          /* ---------- cubierta arquitectónica masterplan: gravilla técnica, paneles solares, HVAC y pretiles ---------- */
          vec3 gravaOsc = mix(vec3(0.24, 0.25, 0.26), vec3(0.32, 0.33, 0.34), rnd);
          vec3 gravaClara = mix(vec3(0.36, 0.36, 0.35), vec3(0.44, 0.43, 0.42), rnd2);
          vec3 manto = mix(vec3(0.18, 0.19, 0.20), vec3(0.26, 0.27, 0.28), fract(rnd * 4.31));
          vec3 barro = mix(vec3(0.55, 0.35, 0.26), vec3(0.65, 0.42, 0.32), rnd2);

          float esTeja = step(pisos, 2.5) * step(0.60, fract(rnd * 3.17));
          col = mix(gravaOsc, gravaClara, step(0.45, fract(rnd * 7.31)));
          col = mix(col, manto, step(0.72, fract(rnd * 11.13)));
          col = mix(col, barro, esTeja);

          // Textura de grano de gravilla y desgaste a diferentes escalas
          col *= 0.88 + 0.15 * vnoise(uv * 0.45) + 0.08 * vnoise(uv * 2.8);

          // Juntas de impermeabilización y pasarelas de mantenimiento
          vec2 gridRoof = fract(uv / 4.5);
          float junta = smoothstep(0.04, 0.0, abs(gridRoof.x - 0.5) - 0.47) + smoothstep(0.04, 0.0, abs(gridRoof.y - 0.5) - 0.47);
          col = mix(col, col * 0.70, clamp(junta, 0.0, 1.0) * (1.0 - esTeja));

          // 1. PANELES SOLARES FOTOVOLTAICOS (Photovoltaic Solar Arrays)
          float tieneSolar = step(3.0, pisos) * (1.0 - esTeja) * step(0.30, fract(rnd * 17.19));
          if (tieneSolar > 0.5) {
            vec2 pUV = uv * 0.45;
            vec2 sCell = fract(pUV);
            vec2 sId = floor(pUV);
            float hayBateria = step(0.25, h21(sId + rnd * 5.0));
            if (hayBateria > 0.5) {
              vec2 panelRep = fract(uv * vec2(0.55, 0.95)); // celdas de 1.8m x 1.0m
              float bordePanel = smoothstep(0.05, 0.08, panelRep.x) * (1.0 - smoothstep(0.92, 0.95, panelRep.x)) *
                                 smoothstep(0.06, 0.09, panelRep.y) * (1.0 - smoothstep(0.91, 0.94, panelRep.y));
              
              vec3 cSilicio = vec3(0.04, 0.09, 0.20) * (0.85 + 0.25 * fract(panelRep.y * 6.0));
              vec3 cMarcoAlum = vec3(0.70, 0.72, 0.76);
              vec3 cPanel = mix(cMarcoAlum, cSilicio, bordePanel);
              float sombraFila = smoothstep(0.0, 0.12, panelRep.y);
              cPanel *= 0.72 + 0.28 * sombraFila;

              col = mix(col, cPanel, 0.94);
              rough = mix(rough, mix(0.35, 0.08, bordePanel), 0.94);
              spec = mix(spec, vec3(0.20, 0.26, 0.35), bordePanel * 0.94);
            }
          }

          // 2. EQUIPOS TÉCNICOS HVAC, DUCTOS Y CAJAS DE ASCENSOR
          float tieneHVAC = step(3.5, pisos) * (1.0 - esTeja);
          if (tieneHVAC > 0.5) {
            vec2 hvacUV = uv * 0.22 + rnd * 13.0;
            vec2 hId = floor(hvacUV);
            vec2 hF = fract(hvacUV);
            float hBoxRnd = h21(hId + 31.7);
            if (hBoxRnd > 0.65) {
              vec2 bSize = vec2(0.35, 0.28);
              float enCaja = step(0.5 - bSize.x, hF.x) * step(hF.x, 0.5 + bSize.x) *
                             step(0.5 - bSize.y, hF.y) * step(hF.y, 0.5 + bSize.y);
              float rejilla = step(0.5, fract(hF.x * 24.0));
              vec3 cMetalHVAC = mix(vec3(0.52, 0.54, 0.58), vec3(0.20, 0.21, 0.22), rejilla * 0.65);
              float enSombra = step(0.5 - bSize.x + 0.08, hF.x) * step(hF.x, 0.5 + bSize.x + 0.14) *
                               step(0.5 - bSize.y - 0.12, hF.y) * step(hF.y, 0.5 + bSize.y) * (1.0 - enCaja);
              col = mix(col, col * 0.42, enSombra * 0.88);
              col = mix(col, cMetalHVAC, enCaja);
              rough = mix(rough, 0.38, enCaja);
              spec = mix(spec, vec3(0.14), enCaja);
            }
          }

          // 3. TECHOS VERDES / CUBIERTAS VEGETALES SEDUM
          float tieneSedum = step(3.0, pisos) * (1.0 - esTeja) * step(0.78, fract(rnd * 29.3));
          if (tieneSedum > 0.5) {
            vec2 sedumF = fract(uv * 0.35 + rnd * 7.0);
            float enJardin = step(0.15, sedumF.x) * step(sedumF.x, 0.85) * step(0.15, sedumF.y) * step(sedumF.y, 0.85);
            vec3 cSedum = mix(vec3(0.20, 0.32, 0.15), vec3(0.32, 0.44, 0.20), vnoise(uv * 2.0));
            cSedum = mix(cSedum, vec3(0.46, 0.36, 0.20), 0.25 * vnoise(uv * 5.0));
            col = mix(col, cSedum, enJardin * 0.95);
            rough = mix(rough, 0.95, enJardin);
          }

          // Si hay ortofoto aérea nítida, se modula con el relieve técnico
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
    `})}function na(e,o,t){return new We({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uSkyFill:{type:_.FLOAT,value:.22},uHazeAmount:{type:_.FLOAT,value:.08},uHazeStart:{type:_.FLOAT,value:1200},uTime:{type:_.FLOAT,value:0},uFrame:{type:_.FLOAT,value:o},uTop:{type:_.FLOAT,value:t},uAtlas:{type:_.SAMPLER_2D,value:new Ze({url:e,repeat:!1,minificationFilter:St.LINEAR_MIPMAP_LINEAR,magnificationFilter:Ct.LINEAR})}},varyings:{vUV:de.VEC2,vView:de.VEC3,vRightT:de.VEC2,vUpT:de.VEC2,vUpEC:de.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:dt+`
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
    `})}function sa(){return new We({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uHazeAmount:{type:_.FLOAT,value:.08},uHazeStart:{type:_.FLOAT,value:1200}},lightingModel:yo.UNLIT,fragmentShaderText:dt+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function ra(e,o,t){return new Ot({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:e,uNorth:o,uUp:t,uSkyZenith:new x(.16,.42,.82),uSkyHorizon:new x(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function la(){return new Ot({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new x(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function ca(e){const o=t=>({type:_.SAMPLER_2D,value:new Ze({url:e+t,repeat:!0,minificationFilter:St.LINEAR_MIPMAP_LINEAR,magnificationFilter:Ct.LINEAR})});return new We({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uGroundFill:{type:_.FLOAT,value:.12},uHazeAmount:{type:_.FLOAT,value:.08},uHazeStart:{type:_.FLOAT,value:1200},uAsfalto:o("tex_asfalto.webp"),uAnden:o("tex_anden.webp"),uPrado:o("tex_prado.webp"),uCiclo:o("tex_ciclo.webp"),...wo()},varyings:{vG:de.VEC3,vUpEC:de.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:dt+Co+`
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
    `})}function da(){return new We({uniforms:{uNight:{type:_.FLOAT,value:0},uTarde:{type:_.FLOAT,value:0},uSkyFill:{type:_.FLOAT,value:.24},uHazeAmount:{type:_.FLOAT,value:.08},uHazeStart:{type:_.FLOAT,value:1200}},varyings:{vPosM:de.VEC3,vUpEC:de.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:dt+`
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
    `})}function Dt(){return _t.eastNorthUpToFixedFrame(x.fromDegrees(yt.longitude,yt.latitude,yt.height))}function K(e,o,t,a=Dt()){return Y.multiplyByPoint(a,new x(e,o,t),new x)}const ua={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function fa(e,o,t){let a=!1;for(let i=0,s=t.length-1;i<t.length;s=i++){const[u,h]=t[i],[d,r]=t[s];h>o!=r>o&&e<(d-u)*(o-h)/(r-h)+u&&(a=!a)}return a}function ha(e,o,t){let a=1/0;for(let i=0,s=t.length-1;i<t.length;s=i++){const[u,h]=t[s],[d,r]=t[i],f=d-u,w=r-h,b=Math.max(0,Math.min(1,((e-u)*f+(o-h)*w)/(f*f+w*w||1)));a=Math.min(a,Math.hypot(e-u-b*f,o-h-b*w))}return a}async function ma(e,o,t){const a=e.scene,i=Dt(),s=Y.inverseTransformation(i,new Y),u=je.secciones;o("Contexto urbano",.08);const[h,d,r,f]=await Promise.all([fetch(u+"recorte.json").then(n=>n.json()),fetch(u+"edificios.json").then(n=>n.json()),fetch(u+"arboles.json").then(n=>n.json()),fetch(u+"suelo.json").then(n=>n.json())]),w=()=>h.clips.map(n=>{const m=new mt({positions:x.fromDegreesArray(n.flat())}),L=m.computeRectangle();return m.computeRectangle=E=>Ho.clone(L,E),m});a.globe.clippingPolygons=new ht({polygons:w()});const b=sa();let z=null;try{z=await _o.fromUrl(je.googleTiles,{maximumScreenSpaceError:10,shadows:ve.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),z.clippingPolygons=new ht({polygons:w()}),z.customShader=b,a.primitives.add(z)}catch(n){console.warn("Tiles de Google no disponibles",n)}const T=[-236,330],v=[];for(const n of d.secciones){const m=n.key==="Hotel";v.push({key:n.key,file:m?"hotel_fachadas.glb":n.file,kind:m?"cubierta_pbr":"edificios",label:m?"Hotel La Fontana 3D":`Edificaciones · sector ${n.key}`,dist:m?-2:Math.hypot(n.c[0]-T[0],n.c[1]-T[1])})}v.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),v.push({key:"hotel_plazoleta",file:"hotel_plazoleta.glb",kind:"cubierta_pbr",label:"Plazoleta y acceso · Hotel",dist:-.8}),v.push({key:"torres_vecinas",file:"torres_vecinas.glb",kind:"cubierta_pbr",label:"Torres vecinas PBR",dist:-.6}),v.push({key:"esquina_ak15",file:"esquina_ak15.glb",kind:"cubierta_pbr",label:"Esquina Ak 15 PBR",dist:-.55}),v.push({key:"metro127",file:"metro127.glb",kind:"cubierta_pbr",label:"Metro 127 · Sonesta PBR",dist:-.52}),v.push({key:"clinica127",file:"clinica127.glb",kind:"cubierta_pbr",label:"Clínica 127 Colsubsidio PBR",dist:-.51}),v.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),v.sort((n,m)=>n.dist-m.dist);const k={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},g=f.secciones.map(n=>({key:n.key,file:n.file,kind:"suelo",capa:k[n.key]?.[0]??0,label:k[n.key]?.[1]??n.key,dist:-3})),C=r.secciones.map(n=>({key:n.key,file:n.file,kind:"arboles",atlas:n.atlas,marco:n.marco,marcoSup:n.marcoSup,label:ua[n.key]??"Vegetación",dist:0}));let A=[];try{A=(await fetch(u+"arboles3d.json").then(n=>n.json())).secciones}catch{}const S=A.map(n=>({key:"3d_"+n.key,file:n.file,kind:"arbol3d",label:"Arbolado del hotel",dist:0})),M=[...g,...v.slice(0,4),...S,...C.slice(0,3),...v.slice(4,9),...C.slice(3),...v.slice(9)],F=ia(),Z=new We({lightingModel:yo.UNLIT,uniforms:{uNight:{type:_.FLOAT,value:0}},fragmentShaderText:`
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
    `}),J=da(),$=ca(u),ne=(async()=>{try{const n=await xo.fromAssetId(je.imageryAssetId),m=18,L=n.tilingScheme,E=(te,be)=>et.fromCartesian(K(te,be,0,i)),I=L.positionToTileXY(E(-1010,930),m),q=L.positionToTileXY(E(1010,-940),m),oe=q.x-I.x+1,ae=q.y-I.y+1,N=n.tileWidth,X=document.createElement("canvas");X.width=oe*N,X.height=ae*N;const D=X.getContext("2d"),ee=[];for(let te=I.y;te<=q.y;te++)for(let be=I.x;be<=q.x;be++)ee.push([be,te]);const ie=async([te,be])=>{for(let Yt=0;Yt<40;Yt++){const Gt=n.requestImage(te,be,m);if(Gt){try{const Qe=await Gt,Xt=(te-I.x)*N,$t=(be-I.y)*N;typeof ImageBitmap<"u"&&Qe instanceof ImageBitmap?(D.save(),D.translate(Xt,$t+N),D.scale(1,-1),D.drawImage(Qe,0,0,N,N),D.restore()):D.drawImage(Qe,Xt,$t,N,N)}catch{}return}await new Promise(Qe=>setTimeout(Qe,120))}};D.fillStyle="#6a6f62",D.fillRect(0,0,X.width,X.height);const xe=Array.from({length:6},async()=>{for(;ee.length;)await ie(ee.shift())});await Promise.all(xe);const ue=document.createElement("canvas");ue.width=ue.height=4096,ue.getContext("2d").drawImage(X,0,0,4096,4096);const _e=await new Promise(te=>ue.toBlob(te,"image/jpeg",.92));if(!_e)return;const ze=URL.createObjectURL(_e);window.__AERIAL_URL__=ze;const Ye=L.tileXYToRectangle(I.x,I.y,m),Fe=L.tileXYToRectangle(q.x,q.y,m),jt=(te,be)=>Y.multiplyByPoint(s,x.fromRadians(te,be,yt.height),new x),Wt=jt(Ye.west,Fe.south),qt=jt(Fe.east,Ye.north),Ao=new Je(Wt.x,Wt.y,qt.x,qt.y);for(const te of[F,$])te.setUniform("uAerial",new Ze({url:ze,repeat:!1,minificationFilter:St.LINEAR_MIPMAP_LINEAR,magnificationFilter:Ct.LINEAR})),te.setUniform("uAerialRect",Ao),te.setUniform("uAerialOn",1)}catch(n){console.warn("Foto aérea no disponible",n)}})(),se=[],pe=[],ke=[];let Te=null;const Ee=new Fo(new x(0,-1,0),1e3);let Ke=0,Be=0,Ue=.22,ye=.08,ge=1200;const Ve={total:M.length,loaded:0,failed:[]},c=async n=>{try{const m=await at.fromGltfAsync({url:u+n.file,modelMatrix:i,upAxis:Ce.Y,forwardAxis:Ce.X,shadows:n.kind==="arbol3d"?ve.ENABLED:n.kind==="arboles"?ve.CAST_ONLY:n.kind==="suelo"?ve.RECEIVE_ONLY:ve.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:n.kind!=="arboles"});if(n.kind==="arbol3d")m.customShader=Z;else if(n.kind==="suelo")m.customShader=$;else if(n.kind==="arboles"){const E=na(u+n.atlas,n.marco,n.marcoSup);E.setUniform("uNight",Ke),E.setUniform("uTarde",Be),E.setUniform("uSkyFill",Ue),E.setUniform("uHazeAmount",ye),E.setUniform("uHazeStart",ge),se.push(E),m.customShader=E}else n.key==="Hotel"||n.key==="hotel_plazoleta"||n.key==="hotel_cubiertas"?m.customShader=J:n.kind!=="cubierta_pbr"&&(m.customShader=F);const L=n.key==="Hotel"||n.key==="hotel_plazoleta"||n.key==="hotel_cubiertas";m.imageBasedLighting.imageBasedLightingFactor=L?new Pe(1,.75):n.kind==="cubierta_pbr"?new Pe(.85,.55):new Pe(.68,.38),a.primitives.add(m),n.kind==="arboles"&&pe.push(m),(n.key==="Hotel"||n.key==="hotel_cubiertas")&&ke.push(m),await new Promise(E=>{if(m.ready)return E();const I=m.readyEvent.addEventListener(()=>{I(),E()});setTimeout(E,2e4)})}catch(m){console.error("Sección no cargada",n.file,m),Ve.failed.push(n.file)}Ve.loaded++,t?.(Ve.loaded,Ve.total,n.label)},p=g.length+7,y=async(n,m,L)=>{let E=0,I=0;await Promise.all(Array.from({length:Math.min(m,n.length)},async()=>{for(;E<n.length;){const q=n[E++];await c(q),L?.(++I)}}))},l=M.slice(0,p);await y(l,5,n=>o(l[Math.min(n,l.length-1)].label,.2+.75*n/l.length));let R=()=>{};const H=new Promise(n=>{R=n,setTimeout(n,16e3)}),W=(async()=>{await H,await y(M.slice(p),3),await ne})();return{startBackground:()=>R(),matrix:i,inverse:s,tileset:z,buildings:d.edificios,treeCount:r.total,sections:Ve,done:W,setNight(n){b.setUniform("uNight",n),F.setUniform("uNight",n),J.setUniform("uNight",n),Ke=n,$.setUniform("uNight",n);for(const m of se)m.setUniform("uNight",n)},setTarde(n){b.setUniform("uTarde",n),F.setUniform("uTarde",n),J.setUniform("uTarde",n),Be=n,$.setUniform("uTarde",n);for(const m of se)m.setUniform("uTarde",n)},setTime(n){for(const m of se)m.setUniform("uTime",n)},setLook(n){if(n.skyFill!==void 0){Ue=n.skyFill,F.setUniform("uSkyFill",Ue),J.setUniform("uSkyFill",Ue);for(const m of se)m.setUniform("uSkyFill",Ue)}if(n.groundFill!==void 0&&$.setUniform("uGroundFill",n.groundFill),n.hazeAmount!==void 0){ye=n.hazeAmount,F.setUniform("uHazeAmount",ye),J.setUniform("uHazeAmount",ye),$.setUniform("uHazeAmount",ye),b.setUniform("uHazeAmount",ye);for(const m of se)m.setUniform("uHazeAmount",ye)}if(n.hazeStart!==void 0){ge=n.hazeStart,F.setUniform("uHazeStart",ge),J.setUniform("uHazeStart",ge),$.setUniform("uHazeStart",ge),b.setUniform("uHazeStart",ge);for(const m of se)m.setUniform("uHazeStart",ge)}},setRevitBlocks(n,m=[]){const L=d.edificios.filter(E=>n.includes(E.id)).map(E=>{const I=E.r.reduce((oe,ae)=>oe+ae[0],0)/E.r.length,q=E.r.reduce((oe,ae)=>oe+ae[1],0)/E.r.length;return new mt({positions:E.r.map(([oe,ae])=>{const N=oe-I,X=ae-q,D=Math.hypot(N,X)||1;return K(oe+N/D*1,ae+X/D*1,0,i)})})});for(const E of m)L.push(new mt({positions:E.map(([I,q])=>K(I,q,0,i))}));for(const E of ke)E.clippingPolygons=L.length?new ht({polygons:L}):void 0},setRevitZone(n){if(!n){Te=n?[[n[0],n[1]],[n[2],n[1]],[n[2],n[3]],[n[0],n[3]]].map(([m,L])=>K(m,L,0,i)):null;for(const m of ke)m.clippingPolygons=Te?new ht({polygons:[new mt({positions:Te})]}):void 0;F.setUniform("uRevitBox",n?new Je(n[0]-1,n[1]-1,n[2]+1,n[3]+1):new Je(0,0,0,0))}},setHotelFloors(n){const m=n<98;Ee.distance=3.2+n*3.05;for(const L of ke)m&&!L.clippingPlanes&&(L.clippingPlanes=new No({planes:[Ee],edgeWidth:2,edgeColor:j.fromCssColorString("#d7ebff")})),L.clippingPlanes&&(L.clippingPlanes.enabled=m);F.setUniform("uHotelPisos",n)},setTreesVisible(n){for(const m of pe)m.show=n},buildingAt(n){const m=Y.multiplyByPoint(s,n,new x);let L=null,E=1.2;for(const I of d.edificios){if(m.x<I.bb[0]-1.5||m.x>I.bb[2]+1.5||m.y<I.bb[1]-1.5||m.y>I.bb[3]+1.5||m.z>I.b+I.h+2.5)continue;if(fa(m.x,m.y,I.r))return I;const q=ha(m.x,m.y,I.r);q<E&&(E=q,L=I)}return L}}}const pa=j.fromCssColorString("#ff2b1a"),ga=j.fromCssColorString("#ffc400"),va=j.fromCssColorString("#00e862"),Ge=j.fromCssColorString("#1a1d22");function Pt(e){const o=document.createElement("canvas");o.width=128,o.height=128;const t=o.getContext("2d");if(t.clearRect(0,0,128,128),e==="pare"){t.beginPath();for(let a=0;a<8;a++){const i=(a+.5)*Math.PI/4,s=64+Math.cos(i)*58,u=64+Math.sin(i)*58;a===0?t.moveTo(s,u):t.lineTo(s,u)}t.closePath(),t.fillStyle="#c81e1e",t.fill(),t.lineWidth=5,t.strokeStyle="#ffffff",t.stroke(),t.fillStyle="#ffffff",t.font="bold 31px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("PARE",64,66)}else e==="peaton"?(t.beginPath(),t.moveTo(64,6),t.lineTo(122,64),t.lineTo(64,122),t.lineTo(6,64),t.closePath(),t.fillStyle="#f5b800",t.fill(),t.lineWidth=4,t.strokeStyle="#18181b",t.stroke(),t.fillStyle="#18181b",t.beginPath(),t.arc(64,38,7,0,Math.PI*2),t.fill(),t.fillRect(59,47,10,22),t.fillRect(54,69,7,20),t.fillRect(67,69,7,20)):(t.beginPath(),t.arc(64,64,56,0,Math.PI*2),t.fillStyle="#ffffff",t.fill(),t.lineWidth=11,t.strokeStyle="#c81e1e",t.stroke(),t.fillStyle="#111827",t.font="bold 46px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("30",64,67));return o.toDataURL("image/png")}function ya(e,o,t,a,i){const s=(g,C,A)=>Y.multiplyByPoint(o,new x(g,C,A),new x),u=[],h=t+7.2,d=a+7.2,r=i(h,d),f=j.fromCssColorString("#2a303a"),w=j.fromCssColorString("#14171c"),b=j.fromCssColorString("#eab308"),z=(g,C,A,S)=>{const M=S?.42:.3,F=S?.3:.42;u.push(e.entities.add({position:s(g,C,A),box:{dimensions:new x(M,F,1.18),material:w}}));const Z=(pe,ke)=>{const Te=e.entities.add({position:s(g,C,A+pe),box:{dimensions:new x(S?.24:.33,S?.33:.24,.24),material:ke}});return u.push(Te),Te},J=Z(.36,Ge),$=Z(0,Ge),ne=Z(-.36,Ge);return{red:J,yellow:$,green:ne,setState:pe=>{J.box.material=new it(pe==="red"?pa:Ge),$.box.material=new it(pe==="yellow"?ga:Ge),ne.box.material=new it(pe==="green"?va:Ge)}}};if(Math.abs(t+148.8)<12&&Math.abs(a-216.3)<12){const g=[{px:-159.5,py:232,dx:4.2,dy:0,isNS:!0},{px:-163.5,py:226.5,dx:0,dy:-4,isNS:!1},{px:-163,py:203,dx:0,dy:4,isNS:!1},{px:-133.5,py:231.5,dx:4.2,dy:0,isNS:!0},{px:-133,py:202.5,dx:0,dy:4,isNS:!1}],C=[],A=[];for(const M of g){const F=i(M.px,M.py);u.push(e.entities.add({position:s(M.px,M.py,F+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:f}}),e.entities.add({position:s(M.px,M.py,F+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:b}}),e.entities.add({position:s(M.px+M.dx*.5,M.py+M.dy*.5,F+5.65),box:{dimensions:new x(Math.max(.14,Math.abs(M.dx)),Math.max(.14,Math.abs(M.dy)),.14),material:f}}));const Z=z(M.px+M.dx*.78,M.py+M.dy*.78,F+5.1,M.isNS);(M.isNS?C:A).push(Z)}const S=M=>({red:M[0].red,yellow:M[0].yellow,green:M[0].green,setState:F=>{for(const Z of M)Z.setState(F)}});return{ns:S(C),ew:S(A),setVisible(M){for(const F of u)F.show=M}}}u.push(e.entities.add({position:s(h,d,r+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:f}}),e.entities.add({position:s(h,d,r+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:b}}));const T=4.6;u.push(e.entities.add({position:s(h-T*.5,d,r+5.65),box:{dimensions:new x(T,.14,.14),material:f}}),e.entities.add({position:s(h,d-T*.5,r+5.65),box:{dimensions:new x(.14,T,.14),material:f}}));const v=z(h-3.4,d,r+5.1,!0),k=z(h,d-3.4,r+5.1,!1);return{ns:v,ew:k,setVisible(g){for(const C of u)C.show=g}}}function xa(e,o,t,a,i){const s=(g,C,A)=>Y.multiplyByPoint(o,new x(g,C,A),new x),u=[],h=Jt.fromColor(j.fromCssColorString("#f3f4f6").withAlpha(.92)),d=Jt.fromColor(j.fromCssColorString("#f5b800").withAlpha(.92)),r=(g,C,A,S,M,F)=>{if(a(g,C)<.8)return;const Z=i(g,C)+.07;s(g,C,Z);const J=Ft.fromRotationZ(M),$=Y.fromRotationTranslation(J,new x(g,C,Z)),ne=Y.multiply(o,$,new Y);u.push(new Uo({geometry:Vo.fromDimensions({dimensions:new x(A,S,.04)}),modelMatrix:ne,attributes:{color:F}}))},f=Math.atan2(-51,380);for(const g of t){if(Math.abs(g.e+148.8)<12&&Math.abs(g.n-216.3)<12){const A=[{bx:-154,by:230,horiz:!0,ang:0},{bx:-164.5,by:221.5,horiz:!1,ang:f},{bx:-164.5,by:210.5,horiz:!1,ang:f},{bx:-154,by:202.5,horiz:!0,ang:0},{bx:-129,by:229,horiz:!1,ang:f},{bx:-128.5,by:211.5,horiz:!1,ang:f},{bx:-136.5,by:202.5,horiz:!0,ang:0}];for(const S of A)for(let M=-3;M<=3;M++){const F=S.horiz?S.bx+M*1.1:S.bx,Z=S.horiz?S.by:S.by+M*1.05;r(F,Z,S.horiz?.52:2.8,S.horiz?2.8:.52,S.ang,h)}continue}const C=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const A of C){const S=g.e+A.de,M=g.n+A.dn;if(a(S,M)<1.2)continue;for(let J=-3;J<=3;J++){const $=A.horiz?S+J*1.15:S,ne=A.horiz?M:M+J*1.15;r($,ne,A.horiz?.52:2.8,A.horiz?2.8:.52,0,h)}const F=S+(A.de===0?0:Math.sign(A.de)*2.1),Z=M+(A.dn===0?0:Math.sign(A.dn)*2.1);r(F,Z,A.horiz?6.8:.42,A.horiz?.42:6.8,0,h)}}for(let g=-80;g<=440;g+=8)r(-154,g,.18,3.2,0,h),r(-132,g,.18,3.2,0,h);for(let g=-420;g<=160;g+=8){const C=263-(g+420)*.13421052631578947;r(g,C+7.5,3.2,.18,f,h),r(g,C-7.5,3.2,.18,f,h),r(g,C,4.5,.18,f,d)}for(let g=-160;g<=360;g+=8)r(158,g,.18,3.2,0,h);let w=null;u.length>0&&(w=new Oo({geometryInstances:u,appearance:new Do({flat:!0,translucent:!0}),asynchronous:!1}),e.scene.primitives.add(w));const b=[],z=Pt("pare"),T=Pt("peaton"),v=Pt("vel30"),k=j.fromCssColorString("#9ca3af");return t.forEach((g,C)=>{const A=[{e:g.e-7.2,n:g.n-7.2,tex:z},{e:g.e+7.2,n:g.n-7.2,tex:C%2===0?T:v}];for(const S of A){const M=i(S.e,S.n);b.push(e.entities.add({position:s(S.e,S.n,M+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:k}}),e.entities.add({position:s(S.e,S.n,M+2.45),billboard:{image:S.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:Bo.CENTER}}))}}),{setVisible(g){w&&(w.show=g);for(const C of b)C.show=g}}}function ba(e,o){const t=(v,k,g)=>Y.multiplyByPoint(o,new x(v,k,g),new x),a=[],h=j.fromCssColorString("#7a7771"),d=j.fromCssColorString("#3d3833"),r=j.fromCssColorString("#24471b"),f=j.fromCssColorString("#3d7f8f").withAlpha(.88),w=j.fromCssColorString("#ffbe55");a.push(e.entities.add({position:t(-225,263.5,4.17+.32),cylinder:{length:.64,topRadius:3.3,bottomRadius:3.6,material:h,slices:12}}),e.entities.add({position:t(-225,263.5,4.17+.56),cylinder:{length:.24,topRadius:3.45,bottomRadius:3.55,material:r,slices:12}}),e.entities.add({position:t(-225,263.5,4.17+.66),cylinder:{length:.08,topRadius:2.95,bottomRadius:2.95,material:f,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+1.35),cylinder:{length:1.9,topRadius:.34,bottomRadius:.48,material:d}}),e.entities.add({position:t(-225,263.5,4.17+1.35),cylinder:{length:.18,topRadius:1.95,bottomRadius:1.55,material:d,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+2.2),cylinder:{length:.16,topRadius:1.15,bottomRadius:.85,material:d,slices:24}}));let b=0;const z=new it(new Zt(()=>{const v=.62+.18*Math.sin(b*7);return j.fromCssColorString("#d9f4ff").withAlpha(v)},!1)),T=new it(new Zt(()=>{const v=.46+.16*Math.cos(b*5.5);return j.fromCssColorString("#bce8f7").withAlpha(v)},!1));a.push(e.entities.add({position:t(-225,263.5,4.17+2.85),cylinder:{length:1.25,topRadius:.08,bottomRadius:.36,material:z,slices:16}}),e.entities.add({position:t(-225,263.5,4.17+1.78),cylinder:{length:.85,topRadius:1.08,bottomRadius:1.22,material:T,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+1.02),cylinder:{length:.72,topRadius:1.88,bottomRadius:2.08,material:T,slices:24}}));for(let v=-246;v<=-202;v+=8.5)a.push(e.entities.add({position:t(v,255.8,4.17+1.1),cylinder:{length:2.2,topRadius:.04,bottomRadius:.05,material:d}}),e.entities.add({position:t(v,255.8,4.17+2.3),ellipsoid:{radii:new x(.16,.16,.22),material:w}}));return{update(v){b=v},setVisible(v){for(const k of a)k.show=v}}}const pt=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],to=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],oo=3.2;async function wa(e,o,t=110){const a=je.secciones;let i,s,u;try{i=await fetch(a+"vias_campo.json").then(p=>p.json());const c=new Uint8Array(await fetch(a+"vias_campo.bin").then(p=>p.arrayBuffer()));s=c.subarray(0,i.w*i.h),u=c.subarray(i.w*i.h)}catch{return null}const{cell:h,x0:d,y0:r,w:f,h:w}=i,b=(c,p)=>{const y=(c-d)/h-.5,l=(p-r)/h-.5,R=Math.floor(y),H=Math.floor(l);if(R<0||H<0||R>=f-1||H>=w-1)return 0;const W=y-R,n=l-H,m=H*f+R;return((s[m]*(1-W)+s[m+1]*W)*(1-n)+(s[m+f]*(1-W)+s[m+f+1]*W)*n)*.5},z=(c,p)=>{const y=Math.max(0,Math.min(f-1,Math.floor((c-d)/h))),l=Math.max(0,Math.min(w-1,Math.floor((p-r)/h))),R=l*f+y;if(s[R]>0)return u[R]*.1-2;let H=0,W=0;for(let n=-2;n<=2;n++){const m=l+n;if(!(m<0||m>=w))for(let L=-2;L<=2;L++){const E=y+L;if(E<0||E>=f)continue;const I=m*f+E;if(s[I]===0)continue;const q=1/(L*L+n*n+.5);H+=q,W+=(u[I]*.1-2)*q}}return H>0?W/H:1},T=[],v=[],k=[];for(let c=2;c<w-2;c++)for(let p=2;p<f-2;p++){const y=c*f+p,l=d+(p+.5)*h,R=r+(c+.5)*h,H=Math.hypot(l+180,R-250);if(H>520)continue;const W=s[y]*.5;if(W>=2.6&&W<=5&&T.push(y),W>=6&&H<460&&k.push({e:l,n:R,d:W}),s[y]===0&&H<430){let n=!1;for(let m=-2;m<=2&&!n;m++)for(let L=-2;L<=2;L++)if(s[(c+m)*f+(p+L)]>0){n=!0;break}n&&v.push(y)}}if(!T.length)return null;k.sort((c,p)=>p.d-c.d);const g=[];for(const c of k){if(g.length>=6)break;if(g.some(l=>Math.hypot(l.e-c.e,l.n-c.n)<90))continue;const p=z(c.e,c.n),y=ya(e,o,c.e,c.n,z);y.ns.setState("green"),y.ew.setState("red"),g.push({e:c.e,n:c.n,u:p,faseOffset:g.length*4.5,rig:y,nsEstado:"green",ewEstado:"red"})}const C=xa(e,o,g,b,z),A=ba(e,o),S=(()=>{let c=12345;return()=>(c=c*1664525+1013904223>>>0)/4294967296})(),M=(c,p,y)=>{const l=Math.cos(y),R=Math.sin(y);if(c>=-168&&c<=-118&&Math.abs(R)>.35)return c<-143?R<-.2?12:-1e6:R>.2?12:-1e6;const H=263-(c+420)*(51/380);return Math.abs(p-H)<26&&Math.abs(l)>.35?p>H?l>.2?12:-1e6:l<-.2?12:-1e6:c>=-255&&c<=-210&&p<222&&Math.abs(R)>.35?R<-.2?10:-1e6:p<175&&c<-215&&Math.abs(l)>.35?l>.2?10:-1e6:c<-385&&p<265&&Math.abs(R)>.35?R<-.2?10:-1e6:0},F=[],Z=(c,p,y)=>F.some(l=>l!==y&&Math.hypot(l.e-c,l.n-p)<8.5),J=c=>{for(let p=0;p<45;p++){const y=T[Math.floor(S()*T.length)],l=d+(y%f+.5)*h,R=r+(Math.floor(y/f)+.5)*h;if(Z(l,R,c))continue;let H=0,W=-1e9;for(let n=0;n<16;n++){const m=n/16*Math.PI*2,L=l+Math.cos(m)*10,E=R+Math.sin(m)*10,I=b(L,E),q=M(L,E,m);if(q<-1e4)continue;const oe=b(l+Math.sin(m)*2.5,R-Math.cos(m)*2.5),ae=b(l-Math.sin(m)*2.5,R+Math.cos(m)*2.5),N=-Math.abs(I-oo)+(ae>oe?1.5:0)+q;I>1.5&&N>W&&(W=N,H=m)}if(W>-1e8){c.e=l,c.n=R,c.th=H,c.vActual=c.v*.5;return}}};for(let c=0;c<t;c++){const p=S(),y=p<.12?"sitp_azul":p<.2?"sitp_amarillo":p<.38?"taxi":p<.54?"moto":p<.68?"hatch":p<.84?"suv":"sedan",H={e:0,n:0,th:0,v:y==="moto"?8+S()*4.5:y==="sitp_azul"||y==="sitp_amarillo"?5.2+S()*3:6.5+S()*5,vActual:0,model:null,u:0,tipo:y};J(H),F.push(H)}const $=[];if(v.length>0)for(let c=0;c<42;c++){const p=v[Math.floor(S()*v.length)],y=d+(p%f+.5)*h,l=r+(Math.floor(p/f)+.5)*h;$.push({e:y,n:l,th:S()*Math.PI*2,v:1.15+S()*.45,model:null,u:z(y,l)+.16,conPerro:c%3===0})}const ne=[],se=(c,p,y,l,R,H,W,n=.68)=>{for(let m=0;m<R;m++){const L=R===1?(c+p)*.5:c+m/(R-1)*(p-c);for(let E=0;E<H;E++){if(S()>n)continue;const I=H===1?(y+l)*.5:y+E/(H-1)*(l-y);if(b(L,I)>.3)continue;const q=S(),oe=q<.08?"taxi":q<.42?"suv":"sedan",ae=S()<.5?0:Math.PI,N=z(L,I);ne.push({e:L+(S()-.5)*.25,n:I+(S()-.5)*.25,u:N>-1.5?N:3.55,th:W+ae+(S()-.5)*.07,tipo:oe,model:null})}}};se(92,134,-22,62,4,15,.05,.7),se(52,108,114,146,5,4,.12,.62),se(58,106,-104,-56,4,6,.1,.65),se(-132,-98,-46,32,3,12,.04,.68);const pe=new x,ke=new Ft,Te=new Y,Ee=(c,p=.08)=>{c.model&&(x.fromElements(c.e,c.n,c.u+p,pe),Ft.fromRotationZ(c.th,ke),Y.fromRotationTranslation(ke,pe,Te),c.model.modelMatrix=Y.multiply(o,Te,new Y))},Ke={sedan:"carro.glb",suv:"carro_suv.glb",hatch:"carro_hatch.glb",taxi:"carro_taxi.glb",moto:"carro_moto.glb",sitp_azul:"sitp_azul.glb",sitp_amarillo:"sitp_amarillo.glb"},Be=c=>c==="taxi"||c==="sitp_azul"||c==="sitp_amarillo",Ue=(async()=>{for(let c=0;c<F.length;c++){const p=F[c],y=Ke[p.tipo];try{const l=await at.fromGltfAsync({url:a+y,upAxis:Ce.Y,forwardAxis:Ce.X,shadows:ve.ENABLED,color:Be(p.tipo)?j.WHITE:j.fromCssColorString(pt[c%pt.length]),colorBlendMode:Et.MIX,colorBlendAmount:Be(p.tipo)?0:.32});e.scene.primitives.add(l),p.model=l,p.u=z(p.e,p.n),Ee(p)}catch{}c%6===5&&await new Promise(l=>setTimeout(l,35))}for(let c=0;c<$.length;c++){const p=$[c];try{const y=await at.fromGltfAsync({url:a+(p.conPerro?"persona_perro.glb":"persona.glb"),upAxis:Ce.Y,forwardAxis:Ce.X,shadows:ve.ENABLED,color:j.fromCssColorString(to[c%to.length]),colorBlendMode:Et.MIX,colorBlendAmount:.25});e.scene.primitives.add(y),p.model=y,Ee(p,0)}catch{}c%6===5&&await new Promise(y=>setTimeout(y,35))}for(let c=0;c<ne.length;c++){const p=ne[c],y=Ke[p.tipo];try{const l=await at.fromGltfAsync({url:a+y,upAxis:Ce.Y,forwardAxis:Ce.X,shadows:ve.ENABLED,color:Be(p.tipo)?j.WHITE:j.fromCssColorString(pt[c*3%pt.length]),colorBlendMode:Et.MIX,colorBlendAmount:Be(p.tipo)?0:.32});e.scene.primitives.add(l),p.model=l,Ee(p)}catch{}c%8===7&&await new Promise(l=>setTimeout(l,30))}})();let ye=!0,ge=0;const Ve=(c,p)=>b(c,p)===0&&b(c+4,p)+b(c-4,p)+b(c,p+4)+b(c,p-4)>.5;return{ready:Ue,count:t,debug:()=>F.map(c=>[Math.round(c.e),Math.round(c.n),+c.u.toFixed(1),c.model?1:0]),setVisible(c){ye=c;for(const p of F)p.model&&(p.model.show=c);for(const p of ne)p.model&&(p.model.show=c);for(const p of $)p.model&&(p.model.show=c);for(const p of g)p.rig.setVisible(c);C.setVisible(c),A.setVisible(c)},update(c){if(!ye)return;const p=Math.min(.08,Math.max(.001,c));ge+=p,A.update(ge);for(const y of g){const l=(ge+y.faseOffset)%24,R=l<10?"green":l<12?"yellow":"red",H=l>=12&&l<22?"green":l>=22?"yellow":"red";R!==y.nsEstado&&(y.nsEstado=R,y.rig.ns.setState(R)),H!==y.ewEstado&&(y.ewEstado=H,y.rig.ew.setState(H))}for(let y=0;y<F.length;y++){const l=F[y];if(!l.model)continue;let R=0,H=-1e9;for(let N=-4;N<=4;N++){const X=N*.13,D=l.th+X,ee=l.e+Math.cos(D)*9,ie=l.n+Math.sin(D)*9,xe=b(ee,ie);if(xe<1.1||b(l.e+Math.cos(D)*4.5,l.n+Math.sin(D)*4.5)<.9)continue;const _e=M(ee,ie,D);if(_e<-1e4)continue;const ze=b(ee+Math.sin(D)*2.5,ie-Math.cos(D)*2.5),Ye=b(ee-Math.sin(D)*2.5,ie+Math.cos(D)*2.5),Fe=-Math.abs(Math.min(xe,6)-oo)-Math.abs(X)*1.6+(Ye>=ze?.6:0)+_e;Fe>H&&(H=Fe,R=X)}if(H<-1e8||Math.hypot(l.e+180,l.n-250)>580){J(l),l.u=z(l.e,l.n),Ee(l);continue}const W=Math.cos(l.th),n=Math.sin(l.th);let m=1;const L=l.tipo==="sitp_azul"||l.tipo==="sitp_amarillo",E=L?9.5:6.4,I=L?16.5:12.5;for(let N=0;N<F.length;N++){if(N===y||!F[N].model)continue;const X=F[N],D=X.e-l.e,ee=X.n-l.n,ie=D*D+ee*ee;if(ie>320)continue;const xe=X.tipo==="sitp_azul"||X.tipo==="sitp_amarillo",ue=E+(xe?3:0),_e=I+(xe?3:0),ze=D*W+ee*n,Ye=Math.abs(-D*n+ee*W);if(ze>0&&ze<_e&&Ye<2.45){const Fe=ze<ue?0:(ze-ue)/(_e-ue);Fe<m&&(m=Fe)}else ie<(L||xe?42:22)&&N<y&&(m=0)}const q=Math.abs(W)>Math.abs(n);for(const N of g){if((q?N.ewEstado:N.nsEstado)==="green")continue;const D=N.e-l.e,ee=N.n-l.n,ie=D*W+ee*n,xe=Math.abs(-D*n+ee*W);if(ie>7&&ie<21&&xe<9){const ue=ie<10.5?0:(ie-10.5)/10.5;ue<m&&(m=ue)}}const oe=1-Math.min(.55,Math.abs(R)*1.4),ae=l.v*oe*m;if(l.vActual+=(ae-l.vActual)*Math.min(1,p*4.5),l.vActual>.05){l.th+=Math.max(-1.4*p,Math.min(1.4*p,R));const N=l.e+Math.cos(l.th)*l.vActual*p,X=l.n+Math.sin(l.th)*l.vActual*p;b(N,X)>=.7?(l.e=N,l.n=X):l.th+=.6;const D=Math.max(z(l.e,l.n),z(l.e+Math.cos(l.th)*1.4,l.n+Math.sin(l.th)*1.4),z(l.e-Math.cos(l.th)*1.4,l.n-Math.sin(l.th)*1.4));l.u+=(D-l.u)*Math.min(1,p*8)}Ee(l)}for(const y of $){if(!y.model)continue;const l=y.e+Math.cos(y.th)*y.v*p,R=y.n+Math.sin(y.th)*y.v*p;Ve(l,R)&&Math.hypot(l+180,R-250)<430?(y.e=l,y.n=R,y.u+=(z(y.e,y.n)+.16-y.u)*Math.min(1,p*4)):y.th+=.9+S()*1.2,Ee(y,0)}}}}async function ao(e,o){try{const t=new Image;t.decoding="async",t.src=e,await t.decode();const a=document.createElement("canvas");a.width=t.naturalWidth,a.height=t.naturalHeight;const i=a.getContext("2d");i.drawImage(t,0,0);const s=i.getImageData(0,0,a.width,a.height);return new Ze({typedArray:new Uint8Array(s.data.buffer),width:a.width,height:a.height,repeat:!0,minificationFilter:St.LINEAR_MIPMAP_LINEAR,magnificationFilter:Ct.LINEAR})}catch{return new Ze({typedArray:new Uint8Array([...o,255]),width:1,height:1})}}function Ca(e,o){return new We({uniforms:{uNight:{type:_.FLOAT,value:0},uLadrillo:{type:_.SAMPLER_2D,value:e},uTeja:{type:_.SAMPLER_2D,value:o}},varyings:{vRP:de.VEC3,vRN:de.VEC3},vertexShaderText:`
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
    `})}async function Sa(e,o){const t=je.secciones;let a;try{a=await fetch(t+"revit.json").then(v=>v.json())}catch{return null}const[i,s]=await Promise.all([ao(t+"tex_ladrillo_hlf.webp",[190,112,74]),ao(t+"tex_teja.webp",[90,52,28])]),u=Ca(i,s),h=[];for(const v of a.niveles)try{const k=await at.fromGltfAsync({url:t+v.file,modelMatrix:o,upAxis:Ce.Y,forwardAxis:Ce.X,shadows:ve.ENABLED,backFaceCulling:!1,show:!1});k.customShader=u,k.imageBasedLighting.imageBasedLightingFactor=new Pe(.45,.25),e.scene.primitives.add(k),h.push({...v,model:k,off:0,alpha:1,anim:null,shown:!1,target:0})}catch(k){console.warn("Nivel de Revit no cargado",v.file,k)}if(!h.length)return null;const d=5.5,r=16,f=new Y,w=v=>{const k=Y.fromTranslation(new x(0,0,v.off),f);v.model.modelMatrix=Y.multiply(o,k,new Y);const g=Math.max(0,Math.min(1,v.alpha));v.model.color=g>=.999?void 0:j.WHITE.withAlpha(g),v.model.show=g>.01},b=(v,k,g,C,A)=>{v.anim={o0:v.off,o1:k,a0:v.alpha,a1:g,start:C,dur:A},v.target=k},z=v=>1-Math.pow(1-v,3),T={niveles:h.map(v=>({i:v.i,nombre:v.nombre})),caja:a.caja,bloques:a.bloques??[],huella:a.huella??[],ready:!0,visible:!1,abierto:-1,play(){T.visible=!0,T.abierto=-1;const v=performance.now();h.forEach((k,g)=>{k.off=d,k.alpha=0,w(k),b(k,0,1,v+g*700,1100)})},openAt(v){T.visible=!0,T.abierto=v;const k=performance.now();let g=0;for(const C of[...h].reverse())C.i>v&&b(C,r,0,k+g++*90,700);for(const C of h)C.i<=v&&b(C,0,1,k,700)},full(){T.visible=!0,T.abierto=-1;const v=performance.now();h.forEach((k,g)=>{(k.off!==0||k.alpha<1)&&b(k,0,1,v+g*90,800)})},hide(){T.visible=!1,T.abierto=-1;for(const v of h)v.anim=null,v.off=0,v.alpha=0,w(v)},setNight(v){u.setUniform("uNight",v)},update(v,k){if(T.visible)for(const g of h){const C=g.anim;if(!C||k<C.start)continue;const A=Math.min(1,(k-C.start)/C.dur),S=z(A);g.off=C.o0+(C.o1-C.o0)*S,g.alpha=C.a0+(C.a1-C.a0)*Math.min(1,A*1.6),w(g),A>=1&&(g.anim=null)}}};return T}function Ma(e,o){const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t);const a=document.createElement("aside");a.className="pisos",a.hidden=!0,a.innerHTML="<small>Pisos · modelo Revit</small>";const i=new Map,s=(h,d,r)=>{const f=document.createElement("button");f.innerHTML=`${d}<span>${r}</span>`,f.addEventListener("click",()=>o(h)),i.set(h,f),a.appendChild(f)};s(-1,"Edificio completo","");for(const h of[...e.niveles].reverse())s(h.i,h.nombre.charAt(0)+h.nombre.slice(1).toLowerCase(),`N${h.i+1}`);document.body.appendChild(a);const u=h=>i.forEach((d,r)=>d.classList.toggle("on",r===h));return u(-1),{show:h=>{a.hidden=!h},mark:u}}const gt={dia:{sunIntensity:5.6,sunColor:"#fff8f0",shadowDarkness:.44,aoIntensity:3.2,skyFill:.3,groundFill:.16,exposure:1.03,contrast:.16,saturation:1,tintColor:"#ffffff",vignette:.06,bloomBrightness:-.72,skyZenith:"#3a6ea5",skyHorizon:"#c8dff5",cloudDensity:.4,cloudSpeed:.8,hazeAmount:.02,hazeStart:2e3},tarde:{sunIntensity:5.2,sunColor:"#fff1de",shadowDarkness:.46,aoIntensity:3.2,skyFill:.28,groundFill:.18,exposure:1.03,contrast:.18,saturation:1.02,tintColor:"#fffaf2",vignette:.08,bloomBrightness:-.7,skyZenith:"#4478b0",skyHorizon:"#f2dac0",cloudDensity:.45,cloudSpeed:.8,hazeAmount:.03,hazeStart:1800},noche:{sunIntensity:.7,sunColor:"#7a9ee0",shadowDarkness:.82,aoIntensity:2.7,skyFill:.38,groundFill:.12,exposure:1.08,contrast:.35,saturation:.92,tintColor:"#cbd7e8",vignette:.06,bloomBrightness:-.58,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.25,hazeStart:600}};function At(e){const o=/^#?([0-9a-f]{6})$/i.exec(e.trim());if(!o)return[1,1,1];const t=parseInt(o[1],16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}const ka=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function Ta(e){const o={dia:{...gt.dia},tarde:{...gt.tarde},noche:{...gt.noche}};let t="dia";const a=document.createElement("button");a.id="btnLookStudio",a.className="look-toggle",a.textContent="⚙ Ajustar luz",a.title="Abrir editor de iluminación y color (L)",document.body.appendChild(a);const i=document.createElement("aside");i.id="lookPanel",i.className="look-panel",i.hidden=!0,i.innerHTML=`
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
  `,document.body.appendChild(i);const s=i.querySelector("#lpBody"),u=new Map;for(const w of ka){const b=document.createElement("section");b.className="lp-sec";const z=document.createElement("h4");z.textContent=w.title,b.appendChild(z);for(const T of w.items){const v=document.createElement("label");v.className="lp-row";const k=document.createElement("span");k.className="lp-lbl",k.textContent=T.label,v.appendChild(k);const g=document.createElement("input");g.type=T.type,T.type==="range"&&(g.min=String(T.min),g.max=String(T.max),g.step=String(T.step));const C=T.type==="range"?document.createElement("span"):void 0;C&&(C.className="lp-val"),g.addEventListener("input",()=>{const S=o[t];if(T.type==="range"){const M=parseFloat(g.value);S[T.key]=M,C&&(C.textContent=T.step&&T.step>=1?String(Math.round(M)):M.toFixed(2))}else S[T.key]=g.value;e(t,S)});const A=document.createElement("div");A.className="lp-ctrl",A.appendChild(g),C&&A.appendChild(C),v.appendChild(A),b.appendChild(v),u.set(T.key,{input:g,val:C})}s.appendChild(b)}const h={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function d(){const w=o[t],b=i.querySelector("#lpPresetName");b&&(b.textContent=h[t]);for(const[z,{input:T,val:v}]of u){const k=w[z];if(T.value=String(k),v&&typeof k=="number"){const g=parseFloat(T.step||"0.01");v.textContent=g>=1?String(Math.round(k)):k.toFixed(2)}}}const r=()=>{i.hidden=!i.hidden,a.classList.toggle("on",!i.hidden)};a.addEventListener("click",r),i.querySelector("#lpClose")?.addEventListener("click",r);const f=i.querySelector("#lpCopy");return f.addEventListener("click",async()=>{const w=JSON.stringify({active:t,presets:o},null,2);try{await navigator.clipboard.writeText(w),f.textContent="¡JSON copiado!",setTimeout(()=>f.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",w)}}),i.querySelector("#lpReset")?.addEventListener("click",()=>{o[t]={...gt[t]},d(),e(t,o[t])}),addEventListener("keydown",w=>{w.code==="KeyL"&&!w.ctrlKey&&!w.metaKey&&!w.altKey&&r()}),d(),{setActivePreset(w){t=w,d()},getPreset(w){return o[w]},toggle:r}}const Ea={planos:{nombre:"Planos finales",o:{exposure:1.03,contrast:.16,saturation:1,tintColor:"#ffffff",vignette:.06,shadowDarkness:.44,bloomBrightness:-.72,skyFill:.3,groundFill:.16,skyZenith:"#3a6ea5",skyHorizon:"#c8dff5",hazeAmount:.02,hazeStart:2e3},sol:1},natural:{nombre:"Natural",o:{exposure:1.03,contrast:.16,saturation:1,tintColor:"#ffffff",vignette:.06,shadowDarkness:.44,bloomBrightness:-.72}},calido:{nombre:"Cálido",o:{exposure:1.04,contrast:.18,saturation:1.04,tintColor:"#fff8ed",vignette:.08,shadowDarkness:.43,bloomBrightness:-.68},sol:1.02},claro:{nombre:"Render claro",o:{exposure:1.1,contrast:.14,saturation:.98,tintColor:"#fbfcff",vignette:.04,shadowDarkness:.36,bloomBrightness:-.75}},cine:{nombre:"Cinematográfico",o:{exposure:1,contrast:.28,saturation:.96,tintColor:"#f7efe4",vignette:.22,shadowDarkness:.48,bloomBrightness:-.6}},dramatico:{nombre:"Dramático",o:{exposure:.96,contrast:.36,saturation:1.02,tintColor:"#fff6ec",vignette:.28,shadowDarkness:.54,bloomBrightness:-.55},sol:1.06}};function za(e,o,t){if(o==="panel")return e;const a=Ea[o],i={...e,...a.o};return i.exposure=e.exposure+((a.o.exposure??e.exposure)-e.exposure)*(1-t),i.sunIntensity=e.sunIntensity*(a.sol??1),i}const io=4.7*Math.PI/180,Pa="2026-11-16",no=-18.6*Math.PI/180,So=11.68;function Aa(e){const o=(e-So)*15*Math.PI/180,t=Math.sin(io)*Math.sin(no)+Math.cos(io)*Math.cos(no)*Math.cos(o);return Math.asin(t)*180/Math.PI}const so=(e,o,t)=>{const a=Math.max(0,Math.min(1,(t-e)/(o-e)));return a*a*(3-2*a)},ro=e=>[1,3,5].map(o=>parseInt(e.slice(o,o+2),16)),La=e=>"#"+e.map(o=>Math.round(Math.max(0,Math.min(255,o))).toString(16).padStart(2,"0")).join(""),tt=(e,o,t)=>{const a=ro(e),i=ro(o);return La(a.map((s,u)=>s+(i[u]-s)*t))};function lo(e,o,t){const a={...e};for(const i of Object.keys(e)){const s=e[i],u=o[i];a[i]=typeof s=="number"&&typeof u=="number"?s+(u-s)*t:typeof s=="string"&&typeof u=="string"&&s.startsWith("#")?tt(s,u,t):t<.5?s:u}return a}function Ra(e,o,t,a,i){const s=Aa(e),u=so(2,-7,s),h=so(26,6,s)*(1-u);let d=lo(t,a,h);d=lo(d,i,u),e<So&&(d={...d,sunColor:tt(d.sunColor,"#fff1e2",.35*(1-u))});const r=o==="nublado"?1:o==="lluvia"?1.35:0;if(r){const z=Math.min(1,r);d={...d,sunIntensity:d.sunIntensity*(1-.68*z-(o==="lluvia"?.12:0)),shadowDarkness:d.shadowDarkness*(1-.6*z),cloudDensity:Math.max(d.cloudDensity,o==="lluvia"?1:.96),saturation:d.saturation*(1-.22*z),exposure:d.exposure*(1-(o==="lluvia"?.14:.06)),contrast:d.contrast*(1-.35*z),skyZenith:tt(d.skyZenith,o==="lluvia"?"#5d636a":"#8a9097",.85*(1-u)),skyHorizon:tt(d.skyHorizon,o==="lluvia"?"#868c93":"#b3b7bd",.85*(1-u)),sunColor:tt(d.sunColor,"#dfe4ea",.6*z),hazeAmount:d.hazeAmount+(o==="lluvia"?.22:.1),hazeStart:d.hazeStart*(o==="lluvia"?.45:.7),bloomBrightness:d.bloomBrightness-.2}}const f=Math.floor(e),w=Math.floor((e-f)*60),b=bo.fromIso8601(`${Pa}T${String(f).padStart(2,"0")}:${String(w).padStart(2,"0")}:00-05:00`);return{look:d,night:u,tarde:h,fecha:b,lluvia:o==="lluvia"?1:0,etiqueta:`${String(f).padStart(2,"0")}:${String(w).padStart(2,"0")}`}}function Ia(){return new Ot({name:"hlf_lluvia",uniforms:{uRain:0,uTime:0},fragmentShader:`
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
    </select>`,document.body.appendChild(t);const a=t.querySelector("input")??document.createElement("input"),i=t.querySelector(".h")??document.createElement("span"),s=t.querySelector(".play")??document.createElement("button"),u=t.querySelector("select");u.addEventListener("change",()=>e.onFiltro(u.value)),a.value=String(e.hora),a.addEventListener("input",()=>e.onHora(Number(a.value)));let h=!0;return s.addEventListener("click",()=>{h=!h,s.textContent=h?"❚❚":"▶",e.onPlay(h)}),t.querySelectorAll("[data-clima]").forEach(d=>d.addEventListener("click",()=>{t.querySelectorAll("[data-clima]").forEach(r=>r.classList.toggle("on",r===d)),e.onClima(d.dataset.clima)})),{setHora(d,r){document.activeElement!==a&&(a.value=String(d)),i.textContent=r},setPlay(d){h=d,s.textContent=d?"❚❚":"▶"}}}const Fa=[{id:"hotel",label:"HOTEL LA FONTANA",category:"PROYECTO PRINCIPAL",enu:[-210,352,26],camera:{heading:.55,pitch:-.42,range:240,dur:2}},{id:"piso2",label:"REMODELACIÓN PISO 2",category:"INTERVENCIÓN BIM",enu:[-256,320,12],camera:{heading:.19,pitch:-1.55,range:68,dur:2}},{id:"plazoleta",label:"PLAZOLETA DE LA FUENTE",category:"ESPACIO PÚBLICO",enu:[-232,328,5],camera:{heading:.45,pitch:-.28,range:110,dur:1.8}},{id:"clinica127",label:"CLÍNICA 127 COLSUBSIDIO",category:"TORRE CORPORATIVA",enu:[-325,207,40],camera:{heading:.85,pitch:-.32,range:160,dur:2}},{id:"torres",label:"TORRES SANTA BÁRBARA",category:"RESIDENCIAL",enu:[-320,395,45],camera:{heading:.35,pitch:-.35,range:210,dur:2}},{id:"metro127",label:"METRO 127 · SONESTA",category:"HOTEL Y COMERCIO",enu:[-195,145,28],camera:{heading:1.25,pitch:-.34,range:190,dur:2}},{id:"panpaya",label:"PAN PA' YA · OLÍMPICA",category:"ZONA COMERCIAL",enu:[-84,300,16],camera:{heading:2.45,pitch:-.3,range:140,dur:2}},{id:"unicentro",label:"UNICENTRO BOGOTÁ",category:"CENTRO COMERCIAL",enu:[10,0,20],camera:{heading:.65,pitch:-.45,range:420,dur:2.2}}];function Na(e,o){const t=document.createElement("div");t.className="mp-pins-overlay",e.container.appendChild(t);const a=Fa.map(d=>{const r=document.createElement("div");r.className="mp-pin",r.innerHTML=`
      <div class="mp-pin-card">
        <span class="mp-pin-flag"></span>
        <div class="mp-pin-content">
          ${d.category?`<span class="mp-pin-cat">${d.category}</span>`:""}
          <strong class="mp-pin-title">${d.label}</strong>
        </div>
      </div>
      <div class="mp-pin-line"></div>
      <div class="mp-pin-anchor"></div>
    `,r.addEventListener("click",w=>{w.stopPropagation(),o&&o(d)}),t.appendChild(r);const f=K(d.enu[0],d.enu[1],d.enu[2]);return{pin:d,el:r,worldPos:f}});let i=!0;const s=new Pe;function u(){if(!i){t.style.display="none";return}t.style.display="block";const d=e.scene,r=d.camera;for(const f of a){const w=x.subtract(f.worldPos,r.positionWC,new x);if(x.dot(w,r.directionWC)<=0){f.el.style.display="none";continue}const z=x.distance(r.positionWC,f.worldPos);if(z>3500){f.el.style.display="none";continue}const T=jo.worldToWindowCoordinates(d,f.worldPos,s);if(!T){f.el.style.display="none";continue}f.el.style.display="block",f.el.style.transform=`translate3d(${Math.round(T.x)}px, ${Math.round(T.y)}px, 0)`;const v=Math.max(.75,Math.min(1.05,1200/(z+300))),k=z>2600?Math.max(0,(3500-z)/900):1;f.el.style.opacity=k.toFixed(2),f.el.querySelector(".mp-pin-card").style.transform=`scale(${v.toFixed(2)})`}}const h=e.scene.preRender.addEventListener(u);return{container:t,get visible(){return i},setVisible(d){i=d,d||(t.style.display="none")},update:u,destroy(){h(),t.remove()}}}Jo.defaultAccessToken=je.ionToken;const G=e=>document.getElementById(e),Bt=G("cesiumContainer"),co=G("loading"),Ha=G("loadBar"),Mo=G("loadLabel"),Oa=G("loadPct");function Ne(e,o){Mo.textContent=e;const t=Math.round(Math.max(0,Math.min(1,o))*100);Ha.style.width=t+"%",Oa.textContent=t+"%"}const Q=new Wo(Bt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:ve.RECEIVE_ONLY,terrain:Yo.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:qo.fromProviderAsync(xo.fromAssetId(je.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),B=Q.scene;B.globe.enableLighting=!0;B.globe.showGroundAtmosphere=!0;B.globe.depthTestAgainstTerrain=!0;B.globe.maximumScreenSpaceError=2;B.fog.enabled=!1;B.fog.density=18e-5;B.fog.minimumBrightness=.04;B.highDynamicRange=!0;B.msaaSamples=4;B.postProcessStages.fxaa.enabled=!0;B.screenSpaceCameraController.enableCollisionDetection=!1;B.light=new Go({intensity:3,color:j.fromCssColorString("#fff4e3")});const Le=Q.shadowMap;Le.softShadows=!0;Le.size=4096;Le.maximumDistance=1200;Le.darkness=.24;Le.normalOffset=!0;{const e=Le;e._primitiveBias.depthBias=8e-4,e._primitiveBias.normalOffsetScale=1.6,e._primitiveBias.normalShadingSmooth=.35}const De=B.postProcessStages.ambientOcclusion;De.enabled=!0;De.uniforms.intensity=2.1;De.uniforms.bias=.08;De.uniforms.lengthCap=.35;De.uniforms.stepSize=1.4;De.uniforms.blurStepSize=1;const Ie=B.postProcessStages.bloom;Ie.enabled=!0;Ie.uniforms.glowOnly=!1;Ie.uniforms.contrast=128;Ie.uniforms.brightness=-.36;Ie.uniforms.delta=1;Ie.uniforms.sigma=2.6;Ie.uniforms.stepSize=1.5;const Da=Dt(),Lt=e=>{const o=Y.getColumn(Da,e,new Je);return new x(o.x,o.y,o.z)},Me=ra(Lt(0),Lt(1),Lt(2));B.postProcessStages.add(Me);const Se=la();B.postProcessStages.add(Se);Q.camera.frustum.fov=vo.toRadians(48);const uo=(()=>{try{const e=B.context._gl,o=e.getExtension("WEBGL_debug_renderer_info");return o?String(e.getParameter(o.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),Ba=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(uo)&&!/Arc/i.test(uo);let P=null,le=Ba||matchMedia("(pointer: coarse)").matches?.5:1;function ut(){const e=Math.min(window.devicePixelRatio||1,2);Q.resolutionScale=e,Le.size=le>=1?4096:le>=.5?2048:1024,Le.softShadows=le>=.5,De.enabled=le>=1,Ie.enabled=le>=.5,B.msaaSamples=le>=.5?4:2,Q.shadows=le>=.5,P?.tileset&&(P.tileset.maximumScreenSpaceError=le>=1?8:le>=.5?12:20)}ut();Q.clock.shouldAnimate=!1;Q.clock.currentTime=bo.fromIso8601("2026-06-21T16:50:00-05:00");const O=new oa(Q),Mt=e=>K(nt[e].e,nt[e].n,nt[e].u),Ua=Mt("hotel");O.flyTo({pivot:Ua,heading:xt.general.heading,pitch:xt.general.pitch,range:xt.general.range*1.8},0);O.groundHeight=e=>B.globe.getHeight(e);const Va=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let fe=.04,Oe=1;function kt(e){B.light.intensity=e.sunIntensity,B.light.color=j.fromCssColorString(e.sunColor),Le.darkness=e.shadowDarkness,De.uniforms.intensity=e.aoIntensity,Ie.uniforms.brightness=e.bloomBrightness,Se.uniforms.uExposure=e.exposure,Se.uniforms.uContrast=e.contrast,Se.uniforms.uSaturation=e.saturation;const[o,t,a]=At(e.tintColor);Se.uniforms.uTint=new x(o,t,a),Se.uniforms.uVignette=e.vignette;const[i,s,u]=At(e.skyZenith);Me.uniforms.uSkyZenith=new x(i,s,u);const[h,d,r]=At(e.skyHorizon);Me.uniforms.uSkyHorizon=new x(h,d,r),Me.uniforms.uCloudDensity=e.cloudDensity,Me.uniforms.uCloudSpeed=e.cloudSpeed,P?.setLook({skyFill:e.skyFill,groundFill:e.groundFill,hazeAmount:e.hazeAmount,hazeStart:e.hazeStart})}const st=Ta((e,o)=>kt(o));kt(st.getPreset("dia"));Me.uniforms.uNight=fe;Me.uniforms.uTarde=Oe;Se.uniforms.uNight=fe;Se.uniforms.uTarde=Oe;B.skyAtmosphere&&(B.skyAtmosphere.hueShift=0,B.skyAtmosphere.saturationShift=.08,B.skyAtmosphere.brightnessShift=-.04);const ja={dia:10.17,tarde:16.83,noche:19.58};let he=10.17,ot="sol",ko="planos",wt=!1,He=null,rt=-1;const To=B.postProcessStages.add(Ia()),Ut=_a({hora:he,onHora:e=>{he=e,He=null,wt=!1,Ut.setPlay(!1)},onClima:e=>{ot=e,rt=-1},onPlay:e=>{wt=e},onFiltro:e=>{ko=e,rt=-1}});function Wa(){const e=Ra(he,ot,st.getPreset("dia"),st.getPreset("tarde"),st.getPreset("noche"));Q.clock.currentTime=e.fecha,kt(za(e.look,ko,e.night)),fe=e.night,Oe=e.tarde,P?.setNight(fe),P?.setTarde(Oe),V?.setNight(fe),Me.uniforms.uNight=fe,Me.uniforms.uTarde=Oe,Se.uniforms.uNight=fe,Se.uniforms.uTarde=Oe,To.uniforms.uRain=e.lluvia,B.skyAtmosphere&&(B.skyAtmosphere.brightnessShift=-.55*fe-(ot==="lluvia"?.2:ot==="nublado"?.08:0),B.skyAtmosphere.saturationShift=.06-.3*fe-(ot==="sol"?0:.35));const o=G("clockLabel");o&&(o.textContent=e.etiqueta),Ut.setHora(he,e.etiqueta);const t=fe>.5?"noche":Oe>.5?"tarde":"dia";document.querySelectorAll("[data-light]").forEach(a=>a.classList.toggle("on",a.dataset.light===t))}function qa(e){wt=!1,Ut.setPlay(!1),He={from:he,to:ja[e.id]??he,start:performance.now()}}document.querySelectorAll("[data-light]").forEach(e=>{e.addEventListener("click",()=>{const o=Va.find(t=>t.id===e.dataset.light);o&&qa(o)})});let Xe=!1;const Nt=G("btnOrbit"),Vt=G("btnPedestrian"),qe=G("btnPiso2");function me(){Xe=!1,Nt?.classList.remove("on")}function ft(e,o=2){me(),qe?.classList.remove("on");const t=xt[e];O.flyTo({pivot:Mt(t.place),heading:t.heading,pitch:t.pitch,range:t.range},o)}G("btnHome")?.addEventListener("click",()=>ft("general",2.2));G("btnAerial")?.addEventListener("click",()=>ft("aerial"));G("btnArch")?.addEventListener("click",()=>ft("arch"));Vt?.addEventListener("click",()=>{me(),qe?.classList.remove("on"),O.isWalking?O.exitWalk():O.enterWalk(ce?zo(ce):void 0)});O.onModeChange=e=>{Vt?.classList.toggle("on",e);const o=G("hint");o&&e&&(o.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",o.classList.remove("fade"),setTimeout(()=>o.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(e=>{e.addEventListener("click",()=>{me();const o=e.dataset.place;if(o==="hotel"&&P){const t=P.buildings.find(a=>a.s==="Hotel");if(t){Re(null),Re(t);return}}O.flyTo({pivot:Mt(o),range:o==="hotel"?300:520,pitch:-.5},2)})});Nt?.addEventListener("click",()=>{Xe=!Xe,Nt.classList.toggle("on",Xe),Xe&&O.isWalking&&O.exitWalk()});const fo=Na(Q,e=>{if(me(),e.id==="piso2"){qe?.click();return}if(e.id==="hotel"&&P){const t=P.buildings.find(a=>a.s==="Hotel");if(t){Re(null),Re(t);return}}const o=K(e.enu[0],e.enu[1],e.enu[2]);O.flyTo({pivot:o,heading:e.camera.heading,pitch:e.camera.pitch,range:e.camera.range},e.camera.dur??2)}),ho=G("btnPins");ho?.addEventListener("click",()=>{const e=!fo.visible;fo.setVisible(e),ho.classList.toggle("on",e)});Bt.addEventListener("pointerdown",me);Bt.addEventListener("wheel",me,{passive:!0});addEventListener("keydown",e=>{e.code==="Escape"&&(O.isWalking?O.exitWalk():Re(null)),(e.code==="KeyH"||e.code==="Home")&&ft("general",2.2),e.code==="KeyP"&&Vt?.click()});let ce=null,lt=null;const Ya=9;let bt=null,V=null,Ae=null,Ht=!1,mo=!1;async function Ga(){if(mo||(mo=!0,await ct(),!P||!V))return;me(),V.caja;const e={e:-110,n:150,u:10,h:-.75,p:-.62,r:1750},o={e:-175,n:235,u:10,h:-.05,p:-.5,r:640},t={e:nt.hotel.e-34,n:nt.hotel.n+21,u:12,h:.55,p:-.48,r:360},a=10500;let i=!1;await new Promise(s=>{const u=performance.now(),h=()=>{const d=Math.min(1,(performance.now()-u)/a),r=d*d*d*(d*(d*6-15)+10),f=b=>(1-r)*(1-r)*e[b]+2*(1-r)*r*o[b]+r*r*t[b],w=(1-r)*(1-r)*Math.log(e.r)+2*(1-r)*r*Math.log(o.r)+r*r*Math.log(t.r);O.flyTo({pivot:K(f("e"),f("n"),f("u")),heading:f("h"),pitch:f("p"),range:Math.exp(w)},0),d<1?requestAnimationFrame(h):s()};requestAnimationFrame(h)}),i||(i=!0,Xa()),P?.startBackground()}function Xa(){if(!P)return;const e=P.buildings.find(t=>t.s==="Hotel"),o=O.flyTo.bind(O);O.flyTo=()=>{};try{e?(Re(e),$e&&($e.hidden=!0)):Tt()}finally{O.flyTo=o}}let vt=null;function ct(){return vt||(vt=(async()=>{P&&(V=await Sa(Q,P.matrix),V&&(V.setNight(fe),P.setRevitBlocks(V.bloques,V.huella),Ae=Ma(V,e=>{if(V)if(me(),Ae?.mark(e),qe?.classList.toggle("on",e===1),e<0){V.full();const o=V.caja;O.flyTo({pivot:K((o[0]+o[2])/2,(o[1]+o[3])/2,12),heading:.55,pitch:-.42,range:230},1.4)}else if(e===1)V.openAt(1),O.flyTo({pivot:K(-222,278,12),heading:.1928,pitch:-1.55,range:105},1.2);else{V.openAt(e);const o=V.caja;O.flyTo({pivot:K((o[0]+o[2])/2,(o[1]+o[3])/2,12),pitch:-.95,range:150},1.4)}}),Ht&&(Ht=!1,Tt(),we&&(Q.entities.remove(we),we=null))))})(),vt)}async function $a(){me(),O.isWalking&&O.exitWalk(),await ct(),V&&(P?.setRevitBlocks(V.bloques,V.huella),V.openAt(1),Ae?.mark(1),Ae?.show(!0),qe?.classList.add("on"),O.flyTo({pivot:K(-222,278,12),heading:.1928,pitch:-1.55,range:105},1.3))}qe?.addEventListener("click",()=>void $a());function Tt(){!P||!V||(P.setRevitBlocks(V.bloques,V.huella),V.play(),Ae?.mark(-1),Ae?.show(!0))}function Eo(){P&&(bt={start:performance.now()},P.setHotelFloors(0))}let we=null;const $e=G("card");function Ja(e){return K((e.bb[0]+e.bb[2])/2,(e.bb[1]+e.bb[3])/2,e.b+e.h*.5)}function zo(e){return K((e.bb[0]+e.bb[2])/2,e.bb[1]-9,e.b)}function Re(e){const o=ce?.s==="Hotel";if(ce=e,e?.s!=="Hotel"&&qe?.classList.remove("on"),we&&(Q.entities.remove(we),we=null),!e||!P){$e&&($e.hidden=!0),Ae?.show(!1);return}if(e.s!=="Hotel"?Ae?.show(!1):V?.visible&&Ae?.show(!0),e.s!=="Hotel"){const r=e.r.map(([w,b])=>K(w,b,0,P.matrix)),f=2572+e.b-.5;we=Q.entities.add({polygon:{hierarchy:new $o(r),height:f,extrudedHeight:f+e.h+2.2,material:j.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:j.fromCssColorString("#d7ebff"),shadows:ve.DISABLED}})}const t=e.s==="Hotel";if(t&&!o){V?(Tt(),we&&(Q.entities.remove(we),we=null)):(Ht=!0,ct(),Eo()),me();const r=V?.caja;O.flyTo(r?{pivot:K((r[0]+r[2])/2,(r[1]+r[3])/2,12),heading:.55,pitch:-.4,range:230}:{pivot:Mt("hotel"),pitch:-.38,range:290},1.8)}const a=t&&P?P.buildings.filter(r=>r.s==="Hotel"):[e],i=r=>Math.abs(r.r.reduce((f,w,b)=>{const z=r.r[(b+1)%r.r.length];return f+w[0]*z[1]-z[0]*w[1]},0)/2),s=a.reduce((r,f)=>r+i(f),0),u=a.reduce((r,f)=>r+i(f)*f.p,0),h=Math.max(...a.map(r=>r.p)),d=Math.max(...a.map(r=>r.h));Math.abs(e.r.reduce((r,f,w)=>{const b=e.r[(w+1)%e.r.length];return r+f[0]*b[1]-b[0]*f[1]},0)/2),G("cardKind").textContent=t?"Proyecto":`Sector ${e.s}`,G("cardTitle").textContent=t?"Hotel La Fontana":`Edificación ${e.id+1}`,G("cardData").innerHTML=`<dt>Pisos</dt><dd>${t?"hasta "+h:e.p}</dd><dt>Altura</dt><dd>${d.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(s).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(u).toLocaleString("es-CO")} m²</dd>`,$e&&($e.hidden=!1)}O.onPick=e=>{P&&Re(e?P.buildingAt(e):null)};G("cardClose")?.addEventListener("click",()=>Re(null));G("cardFocus")?.addEventListener("click",()=>{if(!ce)return;me();const e=Math.max(ce.bb[2]-ce.bb[0],ce.bb[3]-ce.bb[1],ce.h);O.flyTo({pivot:Ja(ce),pitch:-.42,range:Math.max(60,e*2.1)},1.7)});G("cardWalk")?.addEventListener("click",()=>{ce&&(me(),O.enterWalk(zo(ce)))});const Rt=G("status"),po=G("statusText");async function Za(e=25e3){const o=performance.now()+e;let t=0;for(;performance.now()<o;){const a=B.globe.tilesLoaded,i=!P?.tileset||P.tileset.tilesLoaded;if(a&&i){if(t||(t=performance.now()),performance.now()-t>=600)break}else t=0;await new Promise(s=>setTimeout(s,150))}for(let a=0;a<8;a++)await new Promise(i=>requestAnimationFrame(i))}async function Ka(){Ne("Cargando el modelo del hotel...",.05),await new Promise(a=>setTimeout(a,30)),P=await ma(Q,(a,i)=>Ne(a,.05+i*.2),(a,i,s)=>{Ne(`Cargando secciones (${a}/${i}) · ${s}`,.25+a/Math.max(1,i)*.45),!(!Rt||!po)&&(Rt.hidden=!1,po.textContent=a<i?`Cargando secciones ${a}/${i} · ${s}`:`Modelo completo · ${i} secciones`,a>=i&&setTimeout(()=>Rt.classList.add("fade"),2600))}),P.setNight(fe),P.setTarde(Oe),ct();const e=document.querySelector("[data-light].on")?.dataset.light||"dia";kt(st.getPreset(e)),ut(),ft("general",0),O.flyTo({pivot:K(-110,150,10),heading:-.75,pitch:-.62,range:1750},0),P.startBackground(),Ne("Preparando el Hotel La Fontana...",.55),await ct(),Ne("Cargando la ciudad y la vegetación...",.7),await P.done,Ne("Cargando tráfico y parqueaderos...",.85),lt=await wa(Q,P.matrix),lt&&await lt.ready,window.__ALL__=!0,Ne("Renderizando...",.94),await Za(12e3),Ne("Listo",1);const o=G("btnEntrar");o&&(o.disabled=!1,o.textContent="Entrar",await new Promise(a=>o.addEventListener("click",()=>a(),{once:!0}))),co.classList.add("done"),Ga(),setTimeout(()=>co.remove(),900);const t=G("hint");t&&setTimeout(()=>t.classList.add("fade"),9e3),window.__READY__=!0}const re={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Xo,viewer:Q,cam:O,getSite:()=>P,enuToWorld:K,select:Re,stats:re,playHotel:Eo,playRevit:Tt,getRevit:()=>V,getTrafico:()=>lt,setQuality:e=>{le=e,ut()}};Ka().catch(e=>{console.error(e),Mo.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(e?.message??e)});let go=performance.now(),It=0;function Po(){const e=performance.now(),o=Math.min(.1,(e-go)/1e3);if(go=e,He){const a=Math.min(1,(e-He.start)/1800),i=a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2;he=He.from+(He.to-He.from)*i,a>=1&&(He=null)}else wt&&(he+=o/7,he>20.6&&(he=5.6));if((Math.abs(he-rt)>.004||rt<0)&&(rt=he,Wa()),To.uniforms.uTime=e*.001,bt&&P){const a=(e-bt.start)/550,i=Math.floor(a),s=a-i,u=1-Math.pow(1-Math.min(1,s*1.6),3);i>=Ya?(P.setHotelFloors(99),bt=null):P.setHotelFloors(i+u)}V?.update(o,e),lt?.update(o);const t=e*.001;if(P?.setTime(t),Me.uniforms.uTime=t,Xe&&!O.isWalking&&O.flyTo({heading:O.state.heading+.16*o},0),O.update(o),re.frames++,e-re.t0>=2e3){re.fps=Math.round(re.frames*1e3/(e-re.t0)),re.frames=0,re.t0=e,window.__FPS__=re.fps;const a=!!P&&P.sections.loaded>=P.sections.total&&e-It>8e3;P&&P.sections.loaded>=P.sections.total&&!It&&(It=e),a&&document.visibilityState==="visible"&&(re.fps<20&&le>.25&&!window.__DBG__.lock?++re.low>=3&&(le=le>=1?.5:.25,re.low=0,ut()):re.low=0)}requestAnimationFrame(Po)}requestAnimationFrame(Po);addEventListener("resize",ut);
