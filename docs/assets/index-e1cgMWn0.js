var To=Object.defineProperty;var Po=(e,a,t)=>a in e?To(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t;var B=(e,a,t)=>Po(e,typeof a!="symbol"?a+"":a,t);import{C as b,a as mo,T as _t,M as q,b as He,c as $e,H as Eo,P as Nt,d as We,L as Ao,U as I,V as ce,e as Xe,f as Ze,g as bt,h as wt,i as ct,j as Lo,S as ge,I as po,k as Ro,l as _o,m as U,n as ut,R as Io,o as tt,A as we,p as Zt,q as Fo,r as Ho,s as No,t as ot,u as Jt,v as It,G as Do,B as Oo,w as St,J as go,x as Bo,y as Uo,z as Vo,D as jo,E as Wo,F as qo,K as Yo}from"./cesium-NqgYyKJC.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const zt="/HLF/",Go=zt.endsWith("/")?zt:zt+"/",Xo=Go+"cesium/";window.CESIUM_BASE_URL=Xo;const pt={longitude:-74.04145021,latitude:4.70207636,height:2572},Tt={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},gt={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Ue={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},Zo=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Kt=-1.5533,$t=-.012,Jo=4200,Ko=6,Qt=1.7;class $o{constructor(a){B(this,"viewer");B(this,"canvas");B(this,"pivot",new b);B(this,"heading",.5);B(this,"pitch",-.6);B(this,"range",1200);B(this,"targetPivot",new b);B(this,"targetHeading",.5);B(this,"targetPitch",-.6);B(this,"targetRange",1200);B(this,"damping",9);B(this,"drag",null);B(this,"pointers",new Map);B(this,"pinch",null);B(this,"lastTap",0);B(this,"keys",new Set);B(this,"tween",null);B(this,"fov",mo.toRadians(48));B(this,"walking",!1);B(this,"eye",new b);B(this,"eyeTarget",new b);B(this,"wHeading",0);B(this,"wPitch",0);B(this,"wHeadingT",0);B(this,"wPitchT",0);B(this,"onPick",null);B(this,"onModeChange",null);B(this,"groundHeight",null);this.viewer=a,this.canvas=a.scene.canvas,a.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:b.clone(this.targetPivot)}}setPivot(a,t=!0){if(t){const o=b.clone(this.viewer.camera.positionWC),i=b.subtract(o,a,new b),s=b.magnitude(i),c=_t.eastNorthUpToFixedFrame(a),d=q.inverseTransformation(c,new q),g=q.multiplyByPointAsVector(d,i,new b);if(s>1){const f=-Math.asin(Math.max(-1,Math.min(1,g.z/s)));if(f<$t&&f>Kt){let h=Math.atan2(-g.x,-g.y);for(;h-this.heading>Math.PI;)h-=Math.PI*2;for(;h-this.heading<-Math.PI;)h+=Math.PI*2;this.heading=this.targetHeading=h,this.pitch=this.targetPitch=f,this.range=this.targetRange=this.clamp(s),b.clone(a,this.pivot)}}}this.targetPivot=b.clone(a),this.tween=null}bind(){const a=this.canvas;a.style.touchAction="none",a.addEventListener("pointerdown",o=>{if(a.setPointerCapture(o.pointerId),this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2){const[i,s]=[...this.pointers.values()];this.pinch={distance:Math.hypot(i.x-s.x,i.y-s.y),range:this.targetRange,cx:(i.x+s.x)/2,cy:(i.y+s.y)/2},this.drag=null;return}o.button===2||o.button===1||o.shiftKey?this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"pan",moved:!1}:o.button===0&&(this.drag={id:o.pointerId,x:o.offsetX,y:o.offsetY,mode:"orbit",moved:!1}),this.tween=null}),a.addEventListener("pointermove",o=>{if(!this.pointers.has(o.pointerId))return;if(this.pointers.set(o.pointerId,{x:o.offsetX,y:o.offsetY}),this.pointers.size===2&&this.pinch){const[c,d]=[...this.pointers.values()],g=Math.hypot(c.x-d.x,c.y-d.y),f=(c.x+d.x)/2,h=(c.y+d.y)/2;this.walking?this.walk((this.pinch.cy-h)*.06,0):(g>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/g)),this.pan(this.pinch.cx-f,h-this.pinch.cy)),this.pinch.cx=f,this.pinch.cy=h;return}if(!this.drag||o.pointerId!==this.drag.id)return;const i=o.offsetX-this.drag.x,s=o.offsetY-this.drag.y;this.drag.x=o.offsetX,this.drag.y=o.offsetY,Math.abs(i)+Math.abs(s)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=i*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+s*.0028))):this.walk(s*.05,-i*.05):this.drag.mode==="orbit"?(this.targetHeading-=i*.0042,this.targetPitch=this.clampPitch(this.targetPitch-s*.0034)):this.pan(-i,s)});const t=o=>{if(this.pointers.delete(o.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&o.pointerId===this.drag.id){const i=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,i&&o.type==="pointerup"){const s=new He(o.offsetX,o.offsetY),c=performance.now();if(o.pointerType!=="mouse"&&c-this.lastTap<320){this.lastTap=0,this.focusAt(s);return}this.lastTap=c;const d=this.pickWorld(s);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};a.addEventListener("pointerup",t),a.addEventListener("pointercancel",t),a.addEventListener("contextmenu",o=>o.preventDefault()),a.addEventListener("wheel",o=>{o.preventDefault(),this.tween=null;const i=o.deltaMode===1?16:o.deltaMode===2?100:1,s=o.deltaY*i;if(this.walking){this.walk(-s*.02,0);return}const c=Math.exp(Math.max(-.45,Math.min(.45,s*.0016))),d=this.pickWorld(new He(o.offsetX,o.offsetY)),g=this.clamp(this.targetRange*c);if(d&&c<1){const f=Math.min(.45,(this.targetRange-g)/this.targetRange)*.8,h=b.subtract(d,this.targetPivot,new b),x=b.magnitude(h);if(x>1){const w=Math.min(x,this.targetRange)*f/x;b.add(this.targetPivot,b.multiplyByScalar(h,w,h),this.targetPivot)}}this.targetRange=g},{passive:!1}),a.addEventListener("dblclick",o=>{o.preventDefault(),this.focusAt(new He(o.offsetX,o.offsetY))}),addEventListener("keydown",o=>{o.target instanceof HTMLInputElement||(this.keys.add(o.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(o.code)&&o.preventDefault())}),addEventListener("keyup",o=>this.keys.delete(o.code)),addEventListener("blur",()=>this.keys.clear())}clamp(a,t=Ko,o=Jo){return Math.max(t,Math.min(o,a))}clampPitch(a){return Math.max(Kt,Math.min($t,a))}moveHorizontal(a,t,o,i){const s=_t.eastNorthUpToFixedFrame(a),c=new b(Math.sin(t)*o+Math.cos(t)*i,Math.cos(t)*o-Math.sin(t)*i,0);q.multiplyByPoint(s,c,a)}pan(a,t){const o=this.canvas.clientHeight||1,i=2*this.range*Math.tan(this.fov/2)/o,s=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,t*i/s,a*i),this.tween=null}walk(a,t){this.moveHorizontal(this.eyeTarget,this.wHeading,a,t),this.snapEye()}snapEye(){const a=$e.fromCartesian(this.eyeTarget),t=this.groundHeight?.(a);t!==void 0&&Number.isFinite(t)&&(a.height=t+Qt,$e.toCartesian(a,void 0,this.eyeTarget))}pickWorld(a){const t=this.viewer.scene;let o;if(t.pickPositionSupported&&t.pick(a,4,4)&&(o=t.pickPosition(a)),!o){const i=t.camera.getPickRay(a);i&&(o=t.globe.pick(i,t)??void 0)}return o??null}focusAt(a){const t=this.pickWorld(a);if(t){if(this.walking){b.clone(t,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:t,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(a,t=2){this.walking&&this.exitWalk(!1);const o={pivot:a.pivot??b.clone(this.targetPivot),heading:a.heading??this.targetHeading,pitch:a.pitch??this.targetPitch,range:a.range??this.targetRange};let i=o.heading;for(;i-this.targetHeading>Math.PI;)i-=Math.PI*2;for(;i-this.targetHeading<-Math.PI;)i+=Math.PI*2;if(o.heading=i,t<=.02){this.tween=null,this.targetPivot=b.clone(o.pivot),this.pivot=b.clone(o.pivot),this.heading=this.targetHeading=o.heading,this.pitch=this.targetPitch=o.pitch,this.range=this.targetRange=o.range;return}this.tween={from:{pivot:b.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:o,start:performance.now(),duration:t*1e3}}enterWalk(a){b.clone(a??this.targetPivot,this.eyeTarget),this.snapEye(),b.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(a=!0){if(!this.walking)return;this.walking=!1;const t=$e.fromCartesian(this.eyeTarget);t.height-=Qt-1;const o=$e.toCartesian(t);this.pivot=b.clone(o),this.targetPivot=o,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,a?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(a){if(!this.keys.size)return;const t=this.keys,o=t.has("ShiftLeft")||t.has("ShiftRight")?3:1;let i=0,s=0;(t.has("KeyW")||t.has("ArrowUp"))&&(i+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(i-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(s+=1),(t.has("KeyA")||t.has("ArrowLeft"))&&(s-=1);let c=0;if(t.has("KeyQ")&&(c+=1),t.has("KeyE")&&(c-=1),this.walking){c&&(this.wHeadingT-=c*1.2*a),(i||s)&&this.walk(i*4.2*o*a,s*3.4*o*a);return}if(c&&(this.targetHeading+=c*.9*a,this.tween=null),(t.has("PageUp")||t.has("Equal")||t.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*a))),(t.has("PageDown")||t.has("Minus")||t.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*a))),t.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*a)),t.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*a)),!i&&!s)return;const d=Math.max(8,this.range*.6)*o*a;this.moveHorizontal(this.targetPivot,this.heading,i*d,s*d),this.tween=null}update(a){this.updateKeys(a);const t=1-Math.exp(-this.damping*a);if(this.walking){b.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*a),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*t,this.wPitch+=(this.wPitchT-this.wPitch)*t,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const o=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),i=Zo(o),{from:s,to:c}=this.tween;b.lerp(s.pivot,c.pivot,i,this.targetPivot),this.targetHeading=s.heading+(c.heading-s.heading)*i,this.targetPitch=s.pitch+(c.pitch-s.pitch)*i,this.targetRange=Math.exp(Math.log(s.range)+(Math.log(c.range)-Math.log(s.range))*i),o>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*t,this.pitch+=(this.targetPitch-this.pitch)*t,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*t),b.lerp(this.pivot,this.targetPivot,t,this.pivot),this.viewer.camera.lookAt(this.pivot,new Eo(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(q.IDENTITY)}}function Qo(){return new Ze({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const vo=()=>({uAerial:{type:I.SAMPLER_2D,value:Qo()},uAerialRect:{type:I.VEC4,value:new Xe(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:I.FLOAT,value:0}}),yo=`
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`,st=`
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
`;function ea(){return new We({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uSkyFill:{type:I.FLOAT,value:.24},uHazeAmount:{type:I.FLOAT,value:.08},uHazeStart:{type:I.FLOAT,value:1200},uHotelPisos:{type:I.FLOAT,value:99},uRevitBox:{type:I.VEC4,value:new Xe(0,0,0,0)},uLean:{type:I.VEC2,value:new He(0,0)},...vo()},varyings:{vPosM:ce.VEC3,vUpEC:ce.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:st+yo+`
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
    `})}function ta(e,a,t){return new We({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uSkyFill:{type:I.FLOAT,value:.22},uHazeAmount:{type:I.FLOAT,value:.08},uHazeStart:{type:I.FLOAT,value:1200},uTime:{type:I.FLOAT,value:0},uFrame:{type:I.FLOAT,value:a},uTop:{type:I.FLOAT,value:t},uAtlas:{type:I.SAMPLER_2D,value:new Ze({url:e,repeat:!1,minificationFilter:wt.LINEAR_MIPMAP_LINEAR,magnificationFilter:bt.LINEAR})}},varyings:{vUV:ce.VEC2,vView:ce.VEC3,vRightT:ce.VEC2,vUpT:ce.VEC2,vUpEC:ce.VEC3},vertexShaderText:`
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
    `,fragmentShaderText:st+`
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
    `})}function oa(){return new We({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uHazeAmount:{type:I.FLOAT,value:.08},uHazeStart:{type:I.FLOAT,value:1200}},lightingModel:Ao.UNLIT,fragmentShaderText:st+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function aa(e,a,t){return new Nt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:e,uNorth:a,uUp:t,uSkyZenith:new b(.16,.42,.82),uSkyHorizon:new b(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function ia(){return new Nt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new b(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function na(e){const a=t=>({type:I.SAMPLER_2D,value:new Ze({url:e+t,repeat:!0,minificationFilter:wt.LINEAR_MIPMAP_LINEAR,magnificationFilter:bt.LINEAR})});return new We({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uGroundFill:{type:I.FLOAT,value:.12},uHazeAmount:{type:I.FLOAT,value:.08},uHazeStart:{type:I.FLOAT,value:1200},uAsfalto:a("tex_asfalto.webp"),uAnden:a("tex_anden.webp"),uPrado:a("tex_prado.webp"),uCiclo:a("tex_ciclo.webp"),...vo()},varyings:{vG:ce.VEC3,vUpEC:ce.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:st+yo+`
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
    `})}function sa(){return new We({uniforms:{uNight:{type:I.FLOAT,value:0},uTarde:{type:I.FLOAT,value:0},uSkyFill:{type:I.FLOAT,value:.24},uHazeAmount:{type:I.FLOAT,value:.08},uHazeStart:{type:I.FLOAT,value:1200}},varyings:{vPosM:ce.VEC3,vUpEC:ce.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:st+`
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
    `})}function Dt(){return _t.eastNorthUpToFixedFrame(b.fromDegrees(pt.longitude,pt.latitude,pt.height))}function ue(e,a,t,o=Dt()){return q.multiplyByPoint(o,new b(e,a,t),new b)}const ra={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function la(e,a,t){let o=!1;for(let i=0,s=t.length-1;i<t.length;s=i++){const[c,d]=t[i],[g,f]=t[s];d>a!=f>a&&e<(g-c)*(a-d)/(f-d)+c&&(o=!o)}return o}function ca(e,a,t){let o=1/0;for(let i=0,s=t.length-1;i<t.length;s=i++){const[c,d]=t[s],[g,f]=t[i],h=g-c,x=f-d,w=Math.max(0,Math.min(1,((e-c)*h+(a-d)*x)/(h*h+x*x||1)));o=Math.min(o,Math.hypot(e-c-w*h,a-d-w*x))}return o}async function ua(e,a,t){const o=e.scene,i=Dt(),s=q.inverseTransformation(i,new q),c=Ue.secciones;a("Contexto urbano",.08);const[d,g,f,h]=await Promise.all([fetch(c+"recorte.json").then(n=>n.json()),fetch(c+"edificios.json").then(n=>n.json()),fetch(c+"arboles.json").then(n=>n.json()),fetch(c+"suelo.json").then(n=>n.json())]),x=()=>d.clips.map(n=>{const u=new ut({positions:b.fromDegreesArray(n.flat())}),A=u.computeRectangle();return u.computeRectangle=z=>Io.clone(A,z),u});o.globe.clippingPolygons=new ct({polygons:x()});const w=oa();let T=null;try{T=await Lo.fromUrl(Ue.googleTiles,{maximumScreenSpaceError:10,shadows:ge.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),T.clippingPolygons=new ct({polygons:x()}),T.customShader=w,o.primitives.add(T)}catch(n){console.warn("Tiles de Google no disponibles",n)}const P=[-236,330],v=[];for(const n of g.secciones){const u=n.key==="Hotel";v.push({key:n.key,file:u?"hotel_fachadas.glb":n.file,kind:u?"cubierta_pbr":"edificios",label:u?"Hotel La Fontana 3D":`Edificaciones · sector ${n.key}`,dist:u?-2:Math.hypot(n.c[0]-P[0],n.c[1]-P[1])})}v.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),v.push({key:"hotel_plazoleta",file:"hotel_plazoleta.glb",kind:"cubierta_pbr",label:"Plazoleta y acceso · Hotel",dist:-.8}),v.push({key:"torres_vecinas",file:"torres_vecinas.glb",kind:"cubierta_pbr",label:"Torres vecinas PBR",dist:-.6}),v.push({key:"esquina_ak15",file:"esquina_ak15.glb",kind:"cubierta_pbr",label:"Esquina Ak 15 PBR",dist:-.55}),v.push({key:"metro127",file:"metro127.glb",kind:"cubierta_pbr",label:"Metro 127 · Sonesta PBR",dist:-.52}),v.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),v.sort((n,u)=>n.dist-u.dist);const S={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},p=h.secciones.map(n=>({key:n.key,file:n.file,kind:"suelo",capa:S[n.key]?.[0]??0,label:S[n.key]?.[1]??n.key,dist:-3})),C=f.secciones.map(n=>({key:n.key,file:n.file,kind:"arboles",atlas:n.atlas,marco:n.marco,marcoSup:n.marcoSup,label:ra[n.key]??"Vegetación",dist:0}));let E=[];try{E=(await fetch(c+"arboles3d.json").then(n=>n.json())).secciones}catch{}const M=E.map(n=>({key:"3d_"+n.key,file:n.file,kind:"arbol3d",label:"Arbolado del hotel",dist:0})),k=[...p,...v.slice(0,4),...M,...C.slice(0,3),...v.slice(4,9),...C.slice(3),...v.slice(9)],F=ea(),K=new We({uniforms:{uNight:{type:I.FLOAT,value:0}},fragmentShaderText:`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.baseColor.rgb;
        float l = dot(c, vec3(0.3333));
        if (l < 0.02) c = vec3(0.16, 0.24, 0.10);
        material.diffuse = c * mix(1.05, 0.3, uNight);
        material.specular = vec3(0.02);
        material.roughness = 0.9;
        material.emissive = c * 0.22 * (1.0 - uNight);
      }
    `}),J=sa(),Z=na(c),ne=(async()=>{try{const n=await po.fromAssetId(Ue.imageryAssetId),u=18,A=n.tilingScheme,z=(ee,xe)=>$e.fromCartesian(ue(ee,xe,0,i)),_=A.positionToTileXY(z(-1010,930),u),W=A.positionToTileXY(z(1010,-940),u),oe=W.x-_.x+1,ae=W.y-_.y+1,H=n.tileWidth,G=document.createElement("canvas");G.width=oe*H,G.height=ae*H;const D=G.getContext("2d"),Q=[];for(let ee=_.y;ee<=W.y;ee++)for(let xe=_.x;xe<=W.x;xe++)Q.push([xe,ee]);const ie=async([ee,xe])=>{for(let qt=0;qt<40;qt++){const Yt=n.requestImage(ee,xe,u);if(Yt){try{const Ke=await Yt,Gt=(ee-_.x)*H,Xt=(xe-_.y)*H;typeof ImageBitmap<"u"&&Ke instanceof ImageBitmap?(D.save(),D.translate(Gt,Xt+H),D.scale(1,-1),D.drawImage(Ke,0,0,H,H),D.restore()):D.drawImage(Ke,Gt,Xt,H,H)}catch{}return}await new Promise(Ke=>setTimeout(Ke,120))}};D.fillStyle="#6a6f62",D.fillRect(0,0,G.width,G.height);const ye=Array.from({length:6},async()=>{for(;Q.length;)await ie(Q.shift())});await Promise.all(ye);const de=document.createElement("canvas");de.width=de.height=4096,de.getContext("2d").drawImage(G,0,0,4096,4096);const Le=await new Promise(ee=>de.toBlob(ee,"image/jpeg",.92));if(!Le)return;const Pe=URL.createObjectURL(Le);window.__AERIAL_URL__=Pe;const qe=A.tileXYToRectangle(_.x,_.y,u),Re=A.tileXYToRectangle(W.x,W.y,u),Vt=(ee,xe)=>q.multiplyByPoint(s,b.fromRadians(ee,xe,pt.height),new b),jt=Vt(qe.west,Re.south),Wt=Vt(Re.east,qe.north),zo=new Xe(jt.x,jt.y,Wt.x,Wt.y);for(const ee of[F,Z])ee.setUniform("uAerial",new Ze({url:Pe,repeat:!1,minificationFilter:wt.LINEAR_MIPMAP_LINEAR,magnificationFilter:bt.LINEAR})),ee.setUniform("uAerialRect",zo),ee.setUniform("uAerialOn",1)}catch(n){console.warn("Foto aérea no disponible",n)}})(),se=[],me=[],Se=[];let ze=null;const Te=new Ro(new b(0,-1,0),1e3);let Je=0,De=0,Oe=.22,ve=.08,pe=1200;const Be={total:k.length,loaded:0,failed:[]},l=async n=>{try{const u=await tt.fromGltfAsync({url:c+n.file,modelMatrix:i,upAxis:we.Y,forwardAxis:we.X,shadows:n.kind==="arbol3d"?ge.ENABLED:n.kind==="arboles"?ge.CAST_ONLY:n.kind==="suelo"?ge.RECEIVE_ONLY:ge.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:n.kind!=="arboles"});if(n.kind==="arbol3d")u.customShader=K;else if(n.kind==="suelo")u.customShader=Z;else if(n.kind==="arboles"){const z=ta(c+n.atlas,n.marco,n.marcoSup);z.setUniform("uNight",Je),z.setUniform("uTarde",De),z.setUniform("uSkyFill",Oe),z.setUniform("uHazeAmount",ve),z.setUniform("uHazeStart",pe),se.push(z),u.customShader=z}else n.key==="Hotel"||n.key==="hotel_plazoleta"||n.key==="hotel_cubiertas"?u.customShader=J:n.kind!=="cubierta_pbr"&&(u.customShader=F);const A=n.key==="Hotel"||n.key==="hotel_plazoleta"||n.key==="hotel_cubiertas";u.imageBasedLighting.imageBasedLightingFactor=A?new He(1,.75):n.kind==="cubierta_pbr"?new He(.85,.55):new He(.68,.38),o.primitives.add(u),n.kind==="arboles"&&me.push(u),(n.key==="Hotel"||n.key==="hotel_cubiertas")&&Se.push(u),await new Promise(z=>{if(u.ready)return z();const _=u.readyEvent.addEventListener(()=>{_(),z()});setTimeout(z,2e4)})}catch(u){console.error("Sección no cargada",n.file,u),Be.failed.push(n.file)}Be.loaded++,t?.(Be.loaded,Be.total,n.label)},m=p.length+7,y=async(n,u,A)=>{let z=0,_=0;await Promise.all(Array.from({length:Math.min(u,n.length)},async()=>{for(;z<n.length;){const W=n[z++];await l(W),A?.(++_)}}))},r=k.slice(0,m);await y(r,5,n=>a(r[Math.min(n,r.length-1)].label,.2+.75*n/r.length));let L=()=>{};const N=new Promise(n=>{L=n,setTimeout(n,16e3)}),j=(async()=>{await N,await y(k.slice(m),3),await ne})();return{startBackground:()=>L(),matrix:i,inverse:s,tileset:T,buildings:g.edificios,treeCount:f.total,sections:Be,done:j,setNight(n){w.setUniform("uNight",n),F.setUniform("uNight",n),J.setUniform("uNight",n),Je=n,Z.setUniform("uNight",n);for(const u of se)u.setUniform("uNight",n)},setTarde(n){w.setUniform("uTarde",n),F.setUniform("uTarde",n),J.setUniform("uTarde",n),De=n,Z.setUniform("uTarde",n);for(const u of se)u.setUniform("uTarde",n)},setTime(n){for(const u of se)u.setUniform("uTime",n)},setLook(n){if(n.skyFill!==void 0){Oe=n.skyFill,F.setUniform("uSkyFill",Oe),J.setUniform("uSkyFill",Oe);for(const u of se)u.setUniform("uSkyFill",Oe)}if(n.groundFill!==void 0&&Z.setUniform("uGroundFill",n.groundFill),n.hazeAmount!==void 0){ve=n.hazeAmount,F.setUniform("uHazeAmount",ve),J.setUniform("uHazeAmount",ve),Z.setUniform("uHazeAmount",ve),w.setUniform("uHazeAmount",ve);for(const u of se)u.setUniform("uHazeAmount",ve)}if(n.hazeStart!==void 0){pe=n.hazeStart,F.setUniform("uHazeStart",pe),J.setUniform("uHazeStart",pe),Z.setUniform("uHazeStart",pe),w.setUniform("uHazeStart",pe);for(const u of se)u.setUniform("uHazeStart",pe)}},setRevitBlocks(n,u=[]){const A=g.edificios.filter(z=>n.includes(z.id)).map(z=>{const _=z.r.reduce((oe,ae)=>oe+ae[0],0)/z.r.length,W=z.r.reduce((oe,ae)=>oe+ae[1],0)/z.r.length;return new ut({positions:z.r.map(([oe,ae])=>{const H=oe-_,G=ae-W,D=Math.hypot(H,G)||1;return ue(oe+H/D*1,ae+G/D*1,0,i)})})});for(const z of u)A.push(new ut({positions:z.map(([_,W])=>ue(_,W,0,i))}));for(const z of Se)z.clippingPolygons=A.length?new ct({polygons:A}):void 0},setRevitZone(n){if(!n){ze=n?[[n[0],n[1]],[n[2],n[1]],[n[2],n[3]],[n[0],n[3]]].map(([u,A])=>ue(u,A,0,i)):null;for(const u of Se)u.clippingPolygons=ze?new ct({polygons:[new ut({positions:ze})]}):void 0;F.setUniform("uRevitBox",n?new Xe(n[0]-1,n[1]-1,n[2]+1,n[3]+1):new Xe(0,0,0,0))}},setHotelFloors(n){const u=n<98;Te.distance=3.2+n*3.05;for(const A of Se)u&&!A.clippingPlanes&&(A.clippingPlanes=new _o({planes:[Te],edgeWidth:2,edgeColor:U.fromCssColorString("#d7ebff")})),A.clippingPlanes&&(A.clippingPlanes.enabled=u);F.setUniform("uHotelPisos",n)},setTreesVisible(n){for(const u of me)u.show=n},buildingAt(n){const u=q.multiplyByPoint(s,n,new b);let A=null,z=1.2;for(const _ of g.edificios){if(u.x<_.bb[0]-1.5||u.x>_.bb[2]+1.5||u.y<_.bb[1]-1.5||u.y>_.bb[3]+1.5||u.z>_.b+_.h+2.5)continue;if(la(u.x,u.y,_.r))return _;const W=ca(u.x,u.y,_.r);W<z&&(z=W,A=_)}return A}}}const da=U.fromCssColorString("#ff2b1a"),fa=U.fromCssColorString("#ffc400"),ha=U.fromCssColorString("#00e862"),Ye=U.fromCssColorString("#1a1d22");function Pt(e){const a=document.createElement("canvas");a.width=128,a.height=128;const t=a.getContext("2d");if(t.clearRect(0,0,128,128),e==="pare"){t.beginPath();for(let o=0;o<8;o++){const i=(o+.5)*Math.PI/4,s=64+Math.cos(i)*58,c=64+Math.sin(i)*58;o===0?t.moveTo(s,c):t.lineTo(s,c)}t.closePath(),t.fillStyle="#c81e1e",t.fill(),t.lineWidth=5,t.strokeStyle="#ffffff",t.stroke(),t.fillStyle="#ffffff",t.font="bold 31px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("PARE",64,66)}else e==="peaton"?(t.beginPath(),t.moveTo(64,6),t.lineTo(122,64),t.lineTo(64,122),t.lineTo(6,64),t.closePath(),t.fillStyle="#f5b800",t.fill(),t.lineWidth=4,t.strokeStyle="#18181b",t.stroke(),t.fillStyle="#18181b",t.beginPath(),t.arc(64,38,7,0,Math.PI*2),t.fill(),t.fillRect(59,47,10,22),t.fillRect(54,69,7,20),t.fillRect(67,69,7,20)):(t.beginPath(),t.arc(64,64,56,0,Math.PI*2),t.fillStyle="#ffffff",t.fill(),t.lineWidth=11,t.strokeStyle="#c81e1e",t.stroke(),t.fillStyle="#111827",t.font="bold 46px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("30",64,67));return a.toDataURL("image/png")}function ma(e,a,t,o,i){const s=(p,C,E)=>q.multiplyByPoint(a,new b(p,C,E),new b),c=[],d=t+7.2,g=o+7.2,f=i(d,g),h=U.fromCssColorString("#2a303a"),x=U.fromCssColorString("#14171c"),w=U.fromCssColorString("#eab308"),T=(p,C,E,M)=>{const k=M?.42:.3,F=M?.3:.42;c.push(e.entities.add({position:s(p,C,E),box:{dimensions:new b(k,F,1.18),material:x}}));const K=(me,Se)=>{const ze=e.entities.add({position:s(p,C,E+me),box:{dimensions:new b(M?.24:.33,M?.33:.24,.24),material:Se}});return c.push(ze),ze},J=K(.36,Ye),Z=K(0,Ye),ne=K(-.36,Ye);return{red:J,yellow:Z,green:ne,setState:me=>{J.box.material=new ot(me==="red"?da:Ye),Z.box.material=new ot(me==="yellow"?fa:Ye),ne.box.material=new ot(me==="green"?ha:Ye)}}};if(Math.abs(t+148.8)<12&&Math.abs(o-216.3)<12){const p=[{px:-159.5,py:232,dx:4.2,dy:0,isNS:!0},{px:-163.5,py:226.5,dx:0,dy:-4,isNS:!1},{px:-163,py:203,dx:0,dy:4,isNS:!1},{px:-133.5,py:231.5,dx:4.2,dy:0,isNS:!0},{px:-133,py:202.5,dx:0,dy:4,isNS:!1}],C=[],E=[];for(const k of p){const F=i(k.px,k.py);c.push(e.entities.add({position:s(k.px,k.py,F+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:h}}),e.entities.add({position:s(k.px,k.py,F+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:w}}),e.entities.add({position:s(k.px+k.dx*.5,k.py+k.dy*.5,F+5.65),box:{dimensions:new b(Math.max(.14,Math.abs(k.dx)),Math.max(.14,Math.abs(k.dy)),.14),material:h}}));const K=T(k.px+k.dx*.78,k.py+k.dy*.78,F+5.1,k.isNS);(k.isNS?C:E).push(K)}const M=k=>({red:k[0].red,yellow:k[0].yellow,green:k[0].green,setState:F=>{for(const K of k)K.setState(F)}});return{ns:M(C),ew:M(E),setVisible(k){for(const F of c)F.show=k}}}c.push(e.entities.add({position:s(d,g,f+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:h}}),e.entities.add({position:s(d,g,f+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:w}}));const P=4.6;c.push(e.entities.add({position:s(d-P*.5,g,f+5.65),box:{dimensions:new b(P,.14,.14),material:h}}),e.entities.add({position:s(d,g-P*.5,f+5.65),box:{dimensions:new b(.14,P,.14),material:h}}));const v=T(d-3.4,g,f+5.1,!0),S=T(d,g-3.4,f+5.1,!1);return{ns:v,ew:S,setVisible(p){for(const C of c)C.show=p}}}function pa(e,a,t,o,i){const s=(p,C,E)=>q.multiplyByPoint(a,new b(p,C,E),new b),c=[],d=Zt.fromColor(U.fromCssColorString("#f3f4f6").withAlpha(.92)),g=Zt.fromColor(U.fromCssColorString("#f5b800").withAlpha(.92)),f=(p,C,E,M,k,F)=>{if(o(p,C)<.8)return;const K=i(p,C)+.07;s(p,C,K);const J=It.fromRotationZ(k),Z=q.fromRotationTranslation(J,new b(p,C,K)),ne=q.multiply(a,Z,new q);c.push(new Do({geometry:Oo.fromDimensions({dimensions:new b(E,M,.04)}),modelMatrix:ne,attributes:{color:F}}))},h=Math.atan2(-51,380);for(const p of t){if(Math.abs(p.e+148.8)<12&&Math.abs(p.n-216.3)<12){const E=[{bx:-154,by:230,horiz:!0,ang:0},{bx:-164.5,by:221.5,horiz:!1,ang:h},{bx:-164.5,by:210.5,horiz:!1,ang:h},{bx:-154,by:202.5,horiz:!0,ang:0},{bx:-129,by:229,horiz:!1,ang:h},{bx:-128.5,by:211.5,horiz:!1,ang:h},{bx:-136.5,by:202.5,horiz:!0,ang:0}];for(const M of E)for(let k=-3;k<=3;k++){const F=M.horiz?M.bx+k*1.1:M.bx,K=M.horiz?M.by:M.by+k*1.05;f(F,K,M.horiz?.52:2.8,M.horiz?2.8:.52,M.ang,d)}continue}const C=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const E of C){const M=p.e+E.de,k=p.n+E.dn;if(o(M,k)<1.2)continue;for(let J=-3;J<=3;J++){const Z=E.horiz?M+J*1.15:M,ne=E.horiz?k:k+J*1.15;f(Z,ne,E.horiz?.52:2.8,E.horiz?2.8:.52,0,d)}const F=M+(E.de===0?0:Math.sign(E.de)*2.1),K=k+(E.dn===0?0:Math.sign(E.dn)*2.1);f(F,K,E.horiz?6.8:.42,E.horiz?.42:6.8,0,d)}}for(let p=-80;p<=440;p+=8)f(-154,p,.18,3.2,0,d),f(-132,p,.18,3.2,0,d);for(let p=-420;p<=160;p+=8){const C=263-(p+420)*.13421052631578947;f(p,C+7.5,3.2,.18,h,d),f(p,C-7.5,3.2,.18,h,d),f(p,C,4.5,.18,h,g)}for(let p=-160;p<=360;p+=8)f(158,p,.18,3.2,0,d);let x=null;c.length>0&&(x=new Fo({geometryInstances:c,appearance:new Ho({flat:!0,translucent:!0}),asynchronous:!1}),e.scene.primitives.add(x));const w=[],T=Pt("pare"),P=Pt("peaton"),v=Pt("vel30"),S=U.fromCssColorString("#9ca3af");return t.forEach((p,C)=>{const E=[{e:p.e-7.2,n:p.n-7.2,tex:T},{e:p.e+7.2,n:p.n-7.2,tex:C%2===0?P:v}];for(const M of E){const k=i(M.e,M.n);w.push(e.entities.add({position:s(M.e,M.n,k+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:S}}),e.entities.add({position:s(M.e,M.n,k+2.45),billboard:{image:M.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:No.CENTER}}))}}),{setVisible(p){x&&(x.show=p);for(const C of w)C.show=p}}}function ga(e,a){const t=(v,S,p)=>q.multiplyByPoint(a,new b(v,S,p),new b),o=[],d=U.fromCssColorString("#7a7771"),g=U.fromCssColorString("#3d3833"),f=U.fromCssColorString("#24471b"),h=U.fromCssColorString("#3d7f8f").withAlpha(.88),x=U.fromCssColorString("#ffbe55");o.push(e.entities.add({position:t(-225,263.5,4.17+.32),cylinder:{length:.64,topRadius:3.3,bottomRadius:3.6,material:d,slices:12}}),e.entities.add({position:t(-225,263.5,4.17+.56),cylinder:{length:.24,topRadius:3.45,bottomRadius:3.55,material:f,slices:12}}),e.entities.add({position:t(-225,263.5,4.17+.66),cylinder:{length:.08,topRadius:2.95,bottomRadius:2.95,material:h,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+1.35),cylinder:{length:1.9,topRadius:.34,bottomRadius:.48,material:g}}),e.entities.add({position:t(-225,263.5,4.17+1.35),cylinder:{length:.18,topRadius:1.95,bottomRadius:1.55,material:g,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+2.2),cylinder:{length:.16,topRadius:1.15,bottomRadius:.85,material:g,slices:24}}));let w=0;const T=new ot(new Jt(()=>{const v=.62+.18*Math.sin(w*7);return U.fromCssColorString("#d9f4ff").withAlpha(v)},!1)),P=new ot(new Jt(()=>{const v=.46+.16*Math.cos(w*5.5);return U.fromCssColorString("#bce8f7").withAlpha(v)},!1));o.push(e.entities.add({position:t(-225,263.5,4.17+2.85),cylinder:{length:1.25,topRadius:.08,bottomRadius:.36,material:T,slices:16}}),e.entities.add({position:t(-225,263.5,4.17+1.78),cylinder:{length:.85,topRadius:1.08,bottomRadius:1.22,material:P,slices:24}}),e.entities.add({position:t(-225,263.5,4.17+1.02),cylinder:{length:.72,topRadius:1.88,bottomRadius:2.08,material:P,slices:24}}));for(let v=-246;v<=-202;v+=8.5)o.push(e.entities.add({position:t(v,255.8,4.17+1.1),cylinder:{length:2.2,topRadius:.04,bottomRadius:.05,material:g}}),e.entities.add({position:t(v,255.8,4.17+2.3),ellipsoid:{radii:new b(.16,.16,.22),material:x}}));return{update(v){w=v},setVisible(v){for(const S of o)S.show=v}}}const dt=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],eo=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],to=3.2;async function va(e,a,t=110){const o=Ue.secciones;let i,s,c;try{i=await fetch(o+"vias_campo.json").then(m=>m.json());const l=new Uint8Array(await fetch(o+"vias_campo.bin").then(m=>m.arrayBuffer()));s=l.subarray(0,i.w*i.h),c=l.subarray(i.w*i.h)}catch{return null}const{cell:d,x0:g,y0:f,w:h,h:x}=i,w=(l,m)=>{const y=(l-g)/d-.5,r=(m-f)/d-.5,L=Math.floor(y),N=Math.floor(r);if(L<0||N<0||L>=h-1||N>=x-1)return 0;const j=y-L,n=r-N,u=N*h+L;return((s[u]*(1-j)+s[u+1]*j)*(1-n)+(s[u+h]*(1-j)+s[u+h+1]*j)*n)*.5},T=(l,m)=>{const y=Math.max(0,Math.min(h-1,Math.floor((l-g)/d))),r=Math.max(0,Math.min(x-1,Math.floor((m-f)/d))),L=r*h+y;if(s[L]>0)return c[L]*.1-2;let N=0,j=0;for(let n=-2;n<=2;n++){const u=r+n;if(!(u<0||u>=x))for(let A=-2;A<=2;A++){const z=y+A;if(z<0||z>=h)continue;const _=u*h+z;if(s[_]===0)continue;const W=1/(A*A+n*n+.5);N+=W,j+=(c[_]*.1-2)*W}}return N>0?j/N:1},P=[],v=[],S=[];for(let l=2;l<x-2;l++)for(let m=2;m<h-2;m++){const y=l*h+m,r=g+(m+.5)*d,L=f+(l+.5)*d,N=Math.hypot(r+180,L-250);if(N>520)continue;const j=s[y]*.5;if(j>=2.6&&j<=5&&P.push(y),j>=6&&N<460&&S.push({e:r,n:L,d:j}),s[y]===0&&N<430){let n=!1;for(let u=-2;u<=2&&!n;u++)for(let A=-2;A<=2;A++)if(s[(l+u)*h+(m+A)]>0){n=!0;break}n&&v.push(y)}}if(!P.length)return null;S.sort((l,m)=>m.d-l.d);const p=[];for(const l of S){if(p.length>=6)break;if(p.some(r=>Math.hypot(r.e-l.e,r.n-l.n)<90))continue;const m=T(l.e,l.n),y=ma(e,a,l.e,l.n,T);y.ns.setState("green"),y.ew.setState("red"),p.push({e:l.e,n:l.n,u:m,faseOffset:p.length*4.5,rig:y,nsEstado:"green",ewEstado:"red"})}const C=pa(e,a,p,w,T),E=ga(e,a),M=(()=>{let l=12345;return()=>(l=l*1664525+1013904223>>>0)/4294967296})(),k=(l,m,y)=>{const r=Math.cos(y),L=Math.sin(y);if(l>=-168&&l<=-118&&Math.abs(L)>.35)return l<-143?L<-.2?12:-1e6:L>.2?12:-1e6;const N=263-(l+420)*(51/380);return Math.abs(m-N)<26&&Math.abs(r)>.35?m>N?r>.2?12:-1e6:r<-.2?12:-1e6:l>=-255&&l<=-210&&m<222&&Math.abs(L)>.35?L<-.2?10:-1e6:m<175&&l<-215&&Math.abs(r)>.35?r>.2?10:-1e6:l<-385&&m<265&&Math.abs(L)>.35?L<-.2?10:-1e6:0},F=[],K=(l,m,y)=>F.some(r=>r!==y&&Math.hypot(r.e-l,r.n-m)<8.5),J=l=>{for(let m=0;m<45;m++){const y=P[Math.floor(M()*P.length)],r=g+(y%h+.5)*d,L=f+(Math.floor(y/h)+.5)*d;if(K(r,L,l))continue;let N=0,j=-1e9;for(let n=0;n<16;n++){const u=n/16*Math.PI*2,A=r+Math.cos(u)*10,z=L+Math.sin(u)*10,_=w(A,z),W=k(A,z,u);if(W<-1e4)continue;const oe=w(r+Math.sin(u)*2.5,L-Math.cos(u)*2.5),ae=w(r-Math.sin(u)*2.5,L+Math.cos(u)*2.5),H=-Math.abs(_-to)+(ae>oe?1.5:0)+W;_>1.5&&H>j&&(j=H,N=u)}if(j>-1e8){l.e=r,l.n=L,l.th=N,l.vActual=l.v*.5;return}}};for(let l=0;l<t;l++){const m=M(),y=m<.12?"sitp_azul":m<.2?"sitp_amarillo":m<.38?"taxi":m<.54?"moto":m<.68?"hatch":m<.84?"suv":"sedan",N={e:0,n:0,th:0,v:y==="moto"?8+M()*4.5:y==="sitp_azul"||y==="sitp_amarillo"?5.2+M()*3:6.5+M()*5,vActual:0,model:null,u:0,tipo:y};J(N),F.push(N)}const Z=[];if(v.length>0)for(let l=0;l<42;l++){const m=v[Math.floor(M()*v.length)],y=g+(m%h+.5)*d,r=f+(Math.floor(m/h)+.5)*d;Z.push({e:y,n:r,th:M()*Math.PI*2,v:1.15+M()*.45,model:null,u:T(y,r)+.16,conPerro:l%3===0})}const ne=[],se=(l,m,y,r,L,N,j,n=.68)=>{for(let u=0;u<L;u++){const A=L===1?(l+m)*.5:l+u/(L-1)*(m-l);for(let z=0;z<N;z++){if(M()>n)continue;const _=N===1?(y+r)*.5:y+z/(N-1)*(r-y);if(w(A,_)>.3)continue;const W=M(),oe=W<.08?"taxi":W<.42?"suv":"sedan",ae=M()<.5?0:Math.PI,H=T(A,_);ne.push({e:A+(M()-.5)*.25,n:_+(M()-.5)*.25,u:H>-1.5?H:3.55,th:j+ae+(M()-.5)*.07,tipo:oe,model:null})}}};se(92,134,-22,62,4,15,.05,.7),se(52,108,114,146,5,4,.12,.62),se(58,106,-104,-56,4,6,.1,.65),se(-132,-98,-46,32,3,12,.04,.68);const me=new b,Se=new It,ze=new q,Te=(l,m=.08)=>{l.model&&(b.fromElements(l.e,l.n,l.u+m,me),It.fromRotationZ(l.th,Se),q.fromRotationTranslation(Se,me,ze),l.model.modelMatrix=q.multiply(a,ze,new q))},Je={sedan:"carro.glb",suv:"carro_suv.glb",hatch:"carro_hatch.glb",taxi:"carro_taxi.glb",moto:"carro_moto.glb",sitp_azul:"sitp_azul.glb",sitp_amarillo:"sitp_amarillo.glb"},De=l=>l==="taxi"||l==="sitp_azul"||l==="sitp_amarillo",Oe=(async()=>{for(let l=0;l<F.length;l++){const m=F[l],y=Je[m.tipo];try{const r=await tt.fromGltfAsync({url:o+y,upAxis:we.Y,forwardAxis:we.X,shadows:ge.ENABLED,color:De(m.tipo)?U.WHITE:U.fromCssColorString(dt[l%dt.length]),colorBlendMode:St.MIX,colorBlendAmount:De(m.tipo)?0:.32});e.scene.primitives.add(r),m.model=r,m.u=T(m.e,m.n),Te(m)}catch{}l%6===5&&await new Promise(r=>setTimeout(r,35))}for(let l=0;l<Z.length;l++){const m=Z[l];try{const y=await tt.fromGltfAsync({url:o+(m.conPerro?"persona_perro.glb":"persona.glb"),upAxis:we.Y,forwardAxis:we.X,shadows:ge.ENABLED,color:U.fromCssColorString(eo[l%eo.length]),colorBlendMode:St.MIX,colorBlendAmount:.25});e.scene.primitives.add(y),m.model=y,Te(m,0)}catch{}l%6===5&&await new Promise(y=>setTimeout(y,35))}for(let l=0;l<ne.length;l++){const m=ne[l],y=Je[m.tipo];try{const r=await tt.fromGltfAsync({url:o+y,upAxis:we.Y,forwardAxis:we.X,shadows:ge.ENABLED,color:De(m.tipo)?U.WHITE:U.fromCssColorString(dt[l*3%dt.length]),colorBlendMode:St.MIX,colorBlendAmount:De(m.tipo)?0:.32});e.scene.primitives.add(r),m.model=r,Te(m)}catch{}l%8===7&&await new Promise(r=>setTimeout(r,30))}})();let ve=!0,pe=0;const Be=(l,m)=>w(l,m)===0&&w(l+4,m)+w(l-4,m)+w(l,m+4)+w(l,m-4)>.5;return{ready:Oe,count:t,debug:()=>F.map(l=>[Math.round(l.e),Math.round(l.n),+l.u.toFixed(1),l.model?1:0]),setVisible(l){ve=l;for(const m of F)m.model&&(m.model.show=l);for(const m of ne)m.model&&(m.model.show=l);for(const m of Z)m.model&&(m.model.show=l);for(const m of p)m.rig.setVisible(l);C.setVisible(l),E.setVisible(l)},update(l){if(!ve)return;const m=Math.min(.08,Math.max(.001,l));pe+=m,E.update(pe);for(const y of p){const r=(pe+y.faseOffset)%24,L=r<10?"green":r<12?"yellow":"red",N=r>=12&&r<22?"green":r>=22?"yellow":"red";L!==y.nsEstado&&(y.nsEstado=L,y.rig.ns.setState(L)),N!==y.ewEstado&&(y.ewEstado=N,y.rig.ew.setState(N))}for(let y=0;y<F.length;y++){const r=F[y];if(!r.model)continue;let L=0,N=-1e9;for(let H=-4;H<=4;H++){const G=H*.13,D=r.th+G,Q=r.e+Math.cos(D)*9,ie=r.n+Math.sin(D)*9,ye=w(Q,ie);if(ye<1.1||w(r.e+Math.cos(D)*4.5,r.n+Math.sin(D)*4.5)<.9)continue;const Le=k(Q,ie,D);if(Le<-1e4)continue;const Pe=w(Q+Math.sin(D)*2.5,ie-Math.cos(D)*2.5),qe=w(Q-Math.sin(D)*2.5,ie+Math.cos(D)*2.5),Re=-Math.abs(Math.min(ye,6)-to)-Math.abs(G)*1.6+(qe>=Pe?.6:0)+Le;Re>N&&(N=Re,L=G)}if(N<-1e8||Math.hypot(r.e+180,r.n-250)>580){J(r),r.u=T(r.e,r.n),Te(r);continue}const j=Math.cos(r.th),n=Math.sin(r.th);let u=1;const A=r.tipo==="sitp_azul"||r.tipo==="sitp_amarillo",z=A?9.5:6.4,_=A?16.5:12.5;for(let H=0;H<F.length;H++){if(H===y||!F[H].model)continue;const G=F[H],D=G.e-r.e,Q=G.n-r.n,ie=D*D+Q*Q;if(ie>320)continue;const ye=G.tipo==="sitp_azul"||G.tipo==="sitp_amarillo",de=z+(ye?3:0),Le=_+(ye?3:0),Pe=D*j+Q*n,qe=Math.abs(-D*n+Q*j);if(Pe>0&&Pe<Le&&qe<2.45){const Re=Pe<de?0:(Pe-de)/(Le-de);Re<u&&(u=Re)}else ie<(A||ye?42:22)&&H<y&&(u=0)}const W=Math.abs(j)>Math.abs(n);for(const H of p){if((W?H.ewEstado:H.nsEstado)==="green")continue;const D=H.e-r.e,Q=H.n-r.n,ie=D*j+Q*n,ye=Math.abs(-D*n+Q*j);if(ie>7&&ie<21&&ye<9){const de=ie<10.5?0:(ie-10.5)/10.5;de<u&&(u=de)}}const oe=1-Math.min(.55,Math.abs(L)*1.4),ae=r.v*oe*u;if(r.vActual+=(ae-r.vActual)*Math.min(1,m*4.5),r.vActual>.05){r.th+=Math.max(-1.4*m,Math.min(1.4*m,L));const H=r.e+Math.cos(r.th)*r.vActual*m,G=r.n+Math.sin(r.th)*r.vActual*m;w(H,G)>=.7?(r.e=H,r.n=G):r.th+=.6;const D=Math.max(T(r.e,r.n),T(r.e+Math.cos(r.th)*1.4,r.n+Math.sin(r.th)*1.4),T(r.e-Math.cos(r.th)*1.4,r.n-Math.sin(r.th)*1.4));r.u+=(D-r.u)*Math.min(1,m*8)}Te(r)}for(const y of Z){if(!y.model)continue;const r=y.e+Math.cos(y.th)*y.v*m,L=y.n+Math.sin(y.th)*y.v*m;Be(r,L)&&Math.hypot(r+180,L-250)<430?(y.e=r,y.n=L,y.u+=(T(y.e,y.n)+.16-y.u)*Math.min(1,m*4)):y.th+=.9+M()*1.2,Te(y,0)}}}}async function oo(e,a){try{const t=new Image;t.decoding="async",t.src=e,await t.decode();const o=document.createElement("canvas");o.width=t.naturalWidth,o.height=t.naturalHeight;const i=o.getContext("2d");i.drawImage(t,0,0);const s=i.getImageData(0,0,o.width,o.height);return new Ze({typedArray:new Uint8Array(s.data.buffer),width:o.width,height:o.height,repeat:!0,minificationFilter:wt.LINEAR_MIPMAP_LINEAR,magnificationFilter:bt.LINEAR})}catch{return new Ze({typedArray:new Uint8Array([...a,255]),width:1,height:1})}}function ya(e,a){return new We({uniforms:{uNight:{type:I.FLOAT,value:0},uLadrillo:{type:I.SAMPLER_2D,value:e},uTeja:{type:I.SAMPLER_2D,value:a}},varyings:{vRP:ce.VEC3,vRN:ce.VEC3},vertexShaderText:`
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
    `})}async function xa(e,a){const t=Ue.secciones;let o;try{o=await fetch(t+"revit.json").then(v=>v.json())}catch{return null}const[i,s]=await Promise.all([oo(t+"tex_ladrillo.webp",[107,84,76]),oo(t+"tex_teja.webp",[90,52,28])]),c=ya(i,s),d=[];for(const v of o.niveles)try{const S=await tt.fromGltfAsync({url:t+v.file,modelMatrix:a,upAxis:we.Y,forwardAxis:we.X,shadows:ge.ENABLED,backFaceCulling:!1,show:!1});S.customShader=c,S.imageBasedLighting.imageBasedLightingFactor=new He(.45,.25),e.scene.primitives.add(S),d.push({...v,model:S,off:0,alpha:1,anim:null,shown:!1,target:0})}catch(S){console.warn("Nivel de Revit no cargado",v.file,S)}if(!d.length)return null;const g=5.5,f=16,h=new q,x=v=>{const S=q.fromTranslation(new b(0,0,v.off),h);v.model.modelMatrix=q.multiply(a,S,new q);const p=Math.max(0,Math.min(1,v.alpha));v.model.color=p>=.999?void 0:U.WHITE.withAlpha(p),v.model.show=p>.01},w=(v,S,p,C,E)=>{v.anim={o0:v.off,o1:S,a0:v.alpha,a1:p,start:C,dur:E},v.target=S},T=v=>1-Math.pow(1-v,3),P={niveles:d.map(v=>({i:v.i,nombre:v.nombre})),caja:o.caja,bloques:o.bloques??[],huella:o.huella??[],ready:!0,visible:!1,abierto:-1,play(){P.visible=!0,P.abierto=-1;const v=performance.now();d.forEach((S,p)=>{S.off=g,S.alpha=0,x(S),w(S,0,1,v+p*560,900)})},openAt(v){P.visible=!0,P.abierto=v;const S=performance.now();let p=0;for(const C of[...d].reverse())C.i>v&&w(C,f,0,S+p++*90,700);for(const C of d)C.i<=v&&w(C,0,1,S,700)},full(){P.visible=!0,P.abierto=-1;const v=performance.now();d.forEach((S,p)=>{(S.off!==0||S.alpha<1)&&w(S,0,1,v+p*90,800)})},hide(){P.visible=!1,P.abierto=-1;for(const v of d)v.anim=null,v.off=0,v.alpha=0,x(v)},setNight(v){c.setUniform("uNight",v)},update(v,S){if(P.visible)for(const p of d){const C=p.anim;if(!C||S<C.start)continue;const E=Math.min(1,(S-C.start)/C.dur),M=T(E);p.off=C.o0+(C.o1-C.o0)*M,p.alpha=C.a0+(C.a1-C.a0)*Math.min(1,E*1.6),x(p),E>=1&&(p.anim=null)}}};return P}function ba(e,a){const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t);const o=document.createElement("aside");o.className="pisos",o.hidden=!0,o.innerHTML="<small>Pisos · modelo Revit</small>";const i=new Map,s=(d,g,f)=>{const h=document.createElement("button");h.innerHTML=`${g}<span>${f}</span>`,h.addEventListener("click",()=>a(d)),i.set(d,h),o.appendChild(h)};s(-1,"Edificio completo","");for(const d of[...e.niveles].reverse())s(d.i,d.nombre.charAt(0)+d.nombre.slice(1).toLowerCase(),`N${d.i+1}`);document.body.appendChild(o);const c=d=>i.forEach((g,f)=>g.classList.toggle("on",f===d));return c(-1),{show:d=>{o.hidden=!d},mark:c}}const ft={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function Et(e){const a=/^#?([0-9a-f]{6})$/i.exec(e.trim());if(!a)return[1,1,1];const t=parseInt(a[1],16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}const wa=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function Ca(e){const a={dia:{...ft.dia},tarde:{...ft.tarde},noche:{...ft.noche}};let t="dia";const o=document.createElement("button");o.id="btnLookStudio",o.className="look-toggle",o.textContent="⚙ Ajustar luz",o.title="Abrir editor de iluminación y color (L)",document.body.appendChild(o);const i=document.createElement("aside");i.id="lookPanel",i.className="look-panel",i.hidden=!0,i.innerHTML=`
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
  `,document.body.appendChild(i);const s=i.querySelector("#lpBody"),c=new Map;for(const x of wa){const w=document.createElement("section");w.className="lp-sec";const T=document.createElement("h4");T.textContent=x.title,w.appendChild(T);for(const P of x.items){const v=document.createElement("label");v.className="lp-row";const S=document.createElement("span");S.className="lp-lbl",S.textContent=P.label,v.appendChild(S);const p=document.createElement("input");p.type=P.type,P.type==="range"&&(p.min=String(P.min),p.max=String(P.max),p.step=String(P.step));const C=P.type==="range"?document.createElement("span"):void 0;C&&(C.className="lp-val"),p.addEventListener("input",()=>{const M=a[t];if(P.type==="range"){const k=parseFloat(p.value);M[P.key]=k,C&&(C.textContent=P.step&&P.step>=1?String(Math.round(k)):k.toFixed(2))}else M[P.key]=p.value;e(t,M)});const E=document.createElement("div");E.className="lp-ctrl",E.appendChild(p),C&&E.appendChild(C),v.appendChild(E),w.appendChild(v),c.set(P.key,{input:p,val:C})}s.appendChild(w)}const d={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function g(){const x=a[t],w=i.querySelector("#lpPresetName");w&&(w.textContent=d[t]);for(const[T,{input:P,val:v}]of c){const S=x[T];if(P.value=String(S),v&&typeof S=="number"){const p=parseFloat(P.step||"0.01");v.textContent=p>=1?String(Math.round(S)):S.toFixed(2)}}}const f=()=>{i.hidden=!i.hidden,o.classList.toggle("on",!i.hidden)};o.addEventListener("click",f),i.querySelector("#lpClose")?.addEventListener("click",f);const h=i.querySelector("#lpCopy");return h.addEventListener("click",async()=>{const x=JSON.stringify({active:t,presets:a},null,2);try{await navigator.clipboard.writeText(x),h.textContent="¡JSON copiado!",setTimeout(()=>h.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",x)}}),i.querySelector("#lpReset")?.addEventListener("click",()=>{a[t]={...ft[t]},g(),e(t,a[t])}),addEventListener("keydown",x=>{x.code==="KeyL"&&!x.ctrlKey&&!x.metaKey&&!x.altKey&&f()}),g(),{setActivePreset(x){t=x,g()},getPreset(x){return a[x]},toggle:f}}const Ma={planos:{nombre:"Planos finales",o:{exposure:1.06,contrast:.18,saturation:1.08,tintColor:"#fff8f0",vignette:.1,shadowDarkness:.36,bloomBrightness:-.65,skyFill:.34,groundFill:.18,skyZenith:"#5f86b3",skyHorizon:"#d9dee0",hazeAmount:.06,hazeStart:600},sol:1},natural:{nombre:"Natural",o:{exposure:1.04,contrast:.2,saturation:1.05,tintColor:"#ffffff",vignette:.18,shadowDarkness:.45,bloomBrightness:-.6}},calido:{nombre:"Cálido",o:{exposure:1.06,contrast:.24,saturation:1.14,tintColor:"#fff0dc",vignette:.25,shadowDarkness:.42,bloomBrightness:-.5},sol:1.05},claro:{nombre:"Render claro",o:{exposure:1.16,contrast:.1,saturation:.96,tintColor:"#fbfcff",vignette:.08,shadowDarkness:.28,bloomBrightness:-.7}},cine:{nombre:"Cinematográfico",o:{exposure:.98,contrast:.42,saturation:.86,tintColor:"#f3ece3",vignette:.55,shadowDarkness:.5,bloomBrightness:-.45}},dramatico:{nombre:"Dramático",o:{exposure:.94,contrast:.55,saturation:1.1,tintColor:"#fff6ec",vignette:.62,shadowDarkness:.62,bloomBrightness:-.4},sol:1.12}};function ka(e,a,t){if(a==="panel")return e;const o=Ma[a],i={...e,...o.o};return i.exposure=e.exposure+((o.o.exposure??e.exposure)-e.exposure)*(1-t),i.sunIntensity=e.sunIntensity*(o.sol??1),i}const ao=4.7*Math.PI/180,Sa="2026-11-16",io=-18.6*Math.PI/180,xo=11.68;function za(e){const a=(e-xo)*15*Math.PI/180,t=Math.sin(ao)*Math.sin(io)+Math.cos(ao)*Math.cos(io)*Math.cos(a);return Math.asin(t)*180/Math.PI}const no=(e,a,t)=>{const o=Math.max(0,Math.min(1,(t-e)/(a-e)));return o*o*(3-2*o)},so=e=>[1,3,5].map(a=>parseInt(e.slice(a,a+2),16)),Ta=e=>"#"+e.map(a=>Math.round(Math.max(0,Math.min(255,a))).toString(16).padStart(2,"0")).join(""),Qe=(e,a,t)=>{const o=so(e),i=so(a);return Ta(o.map((s,c)=>s+(i[c]-s)*t))};function ro(e,a,t){const o={...e};for(const i of Object.keys(e)){const s=e[i],c=a[i];o[i]=typeof s=="number"&&typeof c=="number"?s+(c-s)*t:typeof s=="string"&&typeof c=="string"&&s.startsWith("#")?Qe(s,c,t):t<.5?s:c}return o}function Pa(e,a,t,o,i){const s=za(e),c=no(2,-7,s),d=no(26,6,s)*(1-c);let g=ro(t,o,d);g=ro(g,i,c),e<xo&&(g={...g,sunColor:Qe(g.sunColor,"#fff1e2",.35*(1-c))});const f=a==="nublado"?1:a==="lluvia"?1.35:0;if(f){const T=Math.min(1,f);g={...g,sunIntensity:g.sunIntensity*(1-.68*T-(a==="lluvia"?.12:0)),shadowDarkness:g.shadowDarkness*(1-.6*T),cloudDensity:Math.max(g.cloudDensity,a==="lluvia"?1:.96),saturation:g.saturation*(1-.22*T),exposure:g.exposure*(1-(a==="lluvia"?.14:.06)),contrast:g.contrast*(1-.35*T),skyZenith:Qe(g.skyZenith,a==="lluvia"?"#5d636a":"#8a9097",.85*(1-c)),skyHorizon:Qe(g.skyHorizon,a==="lluvia"?"#868c93":"#b3b7bd",.85*(1-c)),sunColor:Qe(g.sunColor,"#dfe4ea",.6*T),hazeAmount:g.hazeAmount+(a==="lluvia"?.22:.1),hazeStart:g.hazeStart*(a==="lluvia"?.45:.7),bloomBrightness:g.bloomBrightness-.2}}const h=Math.floor(e),x=Math.floor((e-h)*60),w=go.fromIso8601(`${Sa}T${String(h).padStart(2,"0")}:${String(x).padStart(2,"0")}:00-05:00`);return{look:g,night:c,tarde:d,fecha:w,lluvia:a==="lluvia"?1:0,etiqueta:`${String(h).padStart(2,"0")}:${String(x).padStart(2,"0")}`}}function Ea(){return new Nt({name:"hlf_lluvia",uniforms:{uRain:0,uTime:0},fragmentShader:`
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
    `})}function Aa(e){const a=document.createElement("style");a.textContent=`
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
  `,document.head.appendChild(a);const t=document.createElement("div");t.className="tiempo",t.innerHTML=`
    <span class="lbl">Filtro</span>
    <select aria-label="Filtro de imagen" title="Filtro de imagen">
      <option value="planos" selected>Planos finales</option>
      <option value="natural">Natural</option>
      <option value="calido">Cálido</option>
      <option value="claro">Render claro</option>
      <option value="cine">Cinematográfico</option>
      <option value="dramatico">Dramático</option>
      <option value="panel">Ajuste manual</option>
    </select>`,document.body.appendChild(t);const o=t.querySelector("input")??document.createElement("input"),i=t.querySelector(".h")??document.createElement("span"),s=t.querySelector(".play")??document.createElement("button"),c=t.querySelector("select");c.addEventListener("change",()=>e.onFiltro(c.value)),o.value=String(e.hora),o.addEventListener("input",()=>e.onHora(Number(o.value)));let d=!0;return s.addEventListener("click",()=>{d=!d,s.textContent=d?"❚❚":"▶",e.onPlay(d)}),t.querySelectorAll("[data-clima]").forEach(g=>g.addEventListener("click",()=>{t.querySelectorAll("[data-clima]").forEach(f=>f.classList.toggle("on",f===g)),e.onClima(g.dataset.clima)})),{setHora(g,f){document.activeElement!==o&&(o.value=String(g)),i.textContent=f},setPlay(g){d=g,s.textContent=g?"❚❚":"▶"}}}Yo.defaultAccessToken=Ue.ionToken;const Y=e=>document.getElementById(e),Ot=Y("cesiumContainer"),lo=Y("loading"),La=Y("loadBar"),bo=Y("loadLabel"),Ra=Y("loadPct");function _e(e,a){bo.textContent=e;const t=Math.round(Math.max(0,Math.min(1,a))*100);La.style.width=t+"%",Ra.textContent=t+"%"}const $=new Bo(Ot,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:ge.RECEIVE_ONLY,terrain:Vo.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:Uo.fromProviderAsync(po.fromAssetId(Ue.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),O=$.scene;O.globe.enableLighting=!0;O.globe.showGroundAtmosphere=!0;O.globe.depthTestAgainstTerrain=!0;O.globe.maximumScreenSpaceError=2;O.fog.enabled=!1;O.fog.density=18e-5;O.fog.minimumBrightness=.04;O.highDynamicRange=!0;O.msaaSamples=4;O.postProcessStages.fxaa.enabled=!0;O.screenSpaceCameraController.enableCollisionDetection=!1;O.light=new jo({intensity:3,color:U.fromCssColorString("#fff4e3")});const Ee=$.shadowMap;Ee.softShadows=!0;Ee.size=4096;Ee.maximumDistance=1200;Ee.darkness=.24;Ee.normalOffset=!0;{const e=Ee;e._primitiveBias.depthBias=8e-4,e._primitiveBias.normalOffsetScale=1.6,e._primitiveBias.normalShadingSmooth=.35}const Ne=O.postProcessStages.ambientOcclusion;Ne.enabled=!0;Ne.uniforms.intensity=2.1;Ne.uniforms.bias=.08;Ne.uniforms.lengthCap=.35;Ne.uniforms.stepSize=1.4;Ne.uniforms.blurStepSize=1;const Ae=O.postProcessStages.bloom;Ae.enabled=!0;Ae.uniforms.glowOnly=!1;Ae.uniforms.contrast=128;Ae.uniforms.brightness=-.36;Ae.uniforms.delta=1;Ae.uniforms.sigma=2.6;Ae.uniforms.stepSize=1.5;const _a=Dt(),At=e=>{const a=q.getColumn(_a,e,new Xe);return new b(a.x,a.y,a.z)},Me=aa(At(0),At(1),At(2));O.postProcessStages.add(Me);const Ce=ia();O.postProcessStages.add(Ce);$.camera.frustum.fov=mo.toRadians(48);const co=(()=>{try{const e=O.context._gl,a=e.getExtension("WEBGL_debug_renderer_info");return a?String(e.getParameter(a.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),Ia=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(co)&&!/Arc/i.test(co);let R=null,te=Ia||matchMedia("(pointer: coarse)").matches?.5:1;function rt(){const e=Math.min(window.devicePixelRatio||1,2);$.resolutionScale=e*(te>=1?1:te>=.5?.8:.62),Ee.size=te>=1?4096:te>=.5?2048:1024,Ee.softShadows=te>=.5,Ne.enabled=te>=1,Ae.enabled=te>=.5,O.msaaSamples=te>=1?4:1,$.shadows=te>=.5,R?.tileset&&(R.tileset.maximumScreenSpaceError=te>=1?8:te>=.5?12:20)}rt();$.clock.shouldAnimate=!1;$.clock.currentTime=go.fromIso8601("2026-06-21T16:50:00-05:00");const V=new $o($),Ct=e=>ue(Tt[e].e,Tt[e].n,Tt[e].u),Fa=Ct("hotel");V.flyTo({pivot:Fa,heading:gt.general.heading,pitch:gt.general.pitch,range:gt.general.range*1.8},0);V.groundHeight=e=>O.globe.getHeight(e);const Ha=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let fe=.04,Fe=1;function Mt(e){O.light.intensity=e.sunIntensity,O.light.color=U.fromCssColorString(e.sunColor),Ee.darkness=e.shadowDarkness,Ne.uniforms.intensity=e.aoIntensity,Ae.uniforms.brightness=e.bloomBrightness,Ce.uniforms.uExposure=e.exposure,Ce.uniforms.uContrast=e.contrast,Ce.uniforms.uSaturation=e.saturation;const[a,t,o]=Et(e.tintColor);Ce.uniforms.uTint=new b(a,t,o),Ce.uniforms.uVignette=e.vignette;const[i,s,c]=Et(e.skyZenith);Me.uniforms.uSkyZenith=new b(i,s,c);const[d,g,f]=Et(e.skyHorizon);Me.uniforms.uSkyHorizon=new b(d,g,f),Me.uniforms.uCloudDensity=e.cloudDensity,Me.uniforms.uCloudSpeed=e.cloudSpeed,R?.setLook({skyFill:e.skyFill,groundFill:e.groundFill,hazeAmount:e.hazeAmount,hazeStart:e.hazeStart})}const at=Ca((e,a)=>Mt(a));Mt(at.getPreset("dia"));Me.uniforms.uNight=fe;Me.uniforms.uTarde=Fe;Ce.uniforms.uNight=fe;Ce.uniforms.uTarde=Fe;O.skyAtmosphere&&(O.skyAtmosphere.hueShift=0,O.skyAtmosphere.saturationShift=.08,O.skyAtmosphere.brightnessShift=-.04);const Na={dia:10.17,tarde:16.83,noche:19.58};let he=10.17,et="sol",wo="planos",yt=!1,Ie=null,it=-1;const Co=O.postProcessStages.add(Ea()),Bt=Aa({hora:he,onHora:e=>{he=e,Ie=null,yt=!1,Bt.setPlay(!1)},onClima:e=>{et=e,it=-1},onPlay:e=>{yt=e},onFiltro:e=>{wo=e,it=-1}});function Da(){const e=Pa(he,et,at.getPreset("dia"),at.getPreset("tarde"),at.getPreset("noche"));$.clock.currentTime=e.fecha,Mt(ka(e.look,wo,e.night)),fe=e.night,Fe=e.tarde,R?.setNight(fe),R?.setTarde(Fe),X?.setNight(fe),Me.uniforms.uNight=fe,Me.uniforms.uTarde=Fe,Ce.uniforms.uNight=fe,Ce.uniforms.uTarde=Fe,Co.uniforms.uRain=e.lluvia,O.skyAtmosphere&&(O.skyAtmosphere.brightnessShift=-.55*fe-(et==="lluvia"?.2:et==="nublado"?.08:0),O.skyAtmosphere.saturationShift=.06-.3*fe-(et==="sol"?0:.35));const a=Y("clockLabel");a&&(a.textContent=e.etiqueta),Bt.setHora(he,e.etiqueta);const t=fe>.5?"noche":Fe>.5?"tarde":"dia";document.querySelectorAll("[data-light]").forEach(o=>o.classList.toggle("on",o.dataset.light===t))}function Oa(e){yt=!1,Bt.setPlay(!1),Ie={from:he,to:Na[e.id]??he,start:performance.now()}}document.querySelectorAll("[data-light]").forEach(e=>{e.addEventListener("click",()=>{const a=Ha.find(t=>t.id===e.dataset.light);a&&Oa(a)})});let Ge=!1;const Ft=Y("btnOrbit"),Ut=Y("btnPedestrian");function ke(){Ge=!1,Ft?.classList.remove("on")}function lt(e,a=2){ke();const t=gt[e];V.flyTo({pivot:Ct(t.place),heading:t.heading,pitch:t.pitch,range:t.range},a)}Y("btnHome")?.addEventListener("click",()=>lt("general",2.2));Y("btnAerial")?.addEventListener("click",()=>lt("aerial"));Y("btnArch")?.addEventListener("click",()=>lt("arch"));Ut?.addEventListener("click",()=>{ke(),V.isWalking?V.exitWalk():V.enterWalk(le?ko(le):void 0)});V.onModeChange=e=>{Ut?.classList.toggle("on",e);const a=Y("hint");a&&e&&(a.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",a.classList.remove("fade"),setTimeout(()=>a.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(e=>{e.addEventListener("click",()=>{ke();const a=e.dataset.place;if(a==="hotel"&&R){const t=R.buildings.find(o=>o.s==="Hotel");if(t){je(null),je(t);return}}V.flyTo({pivot:Ct(a),range:a==="hotel"?300:520,pitch:-.5},2)})});Ft?.addEventListener("click",()=>{Ge=!Ge,Ft.classList.toggle("on",Ge),Ge&&V.isWalking&&V.exitWalk()});Ot.addEventListener("pointerdown",ke);Ot.addEventListener("wheel",ke,{passive:!0});addEventListener("keydown",e=>{e.code==="Escape"&&(V.isWalking?V.exitWalk():je(null)),(e.code==="KeyH"||e.code==="Home")&&lt("general",2.2),e.code==="KeyP"&&Ut?.click()});let le=null,nt=null;const Ba=9;let vt=null,X=null,Ve=null,Ht=!1,uo=!1;async function Ua(){if(uo||(uo=!0,await xt(),!R||!X))return;ke();const e=X.caja,a={e:-110,n:150,u:10,h:-.75,p:-.62,r:1750},t={e:-175,n:235,u:10,h:-.05,p:-.5,r:640},o={e:(e[0]+e[2])/2,n:(e[1]+e[3])/2,u:12,h:.55,p:-.4,r:230},i=10500;let s=!1;await new Promise(c=>{const d=performance.now(),g=()=>{const f=Math.min(1,(performance.now()-d)/i),h=f*f*f*(f*(f*6-15)+10),x=T=>(1-h)*(1-h)*a[T]+2*(1-h)*h*t[T]+h*h*o[T],w=(1-h)*(1-h)*Math.log(a.r)+2*(1-h)*h*Math.log(t.r)+h*h*Math.log(o.r);V.flyTo({pivot:ue(x("e"),x("n"),x("u")),heading:x("h"),pitch:x("p"),range:Math.exp(w)},0),!s&&f>.62&&(s=!0,Va()),f<1?requestAnimationFrame(g):c()};requestAnimationFrame(g)}),R?.startBackground()}function Va(){if(!R)return;const e=R.buildings.find(t=>t.s==="Hotel"),a=V.flyTo.bind(V);V.flyTo=()=>{};try{e?je(e):kt()}finally{V.flyTo=a}}let ht=null;function xt(){return ht||(ht=(async()=>{R&&(X=await xa($,R.matrix),X&&(X.setNight(fe),R.setRevitBlocks(X.bloques,X.huella),Ve=ba(X,e=>{if(!X)return;ke(),Ve?.mark(e),e<0?X.full():X.openAt(e);const a=X.caja;V.flyTo({pivot:ue((a[0]+a[2])/2,(a[1]+a[3])/2,12),pitch:e<0?-.42:-.95,range:e<0?230:150},1.4)}),Ht&&(Ht=!1,kt(),be&&($.entities.remove(be),be=null))))})(),ht)}function kt(){!R||!X||(R.setRevitBlocks(X.bloques,X.huella),X.play(),Ve?.mark(-1),Ve?.show(!0))}function Mo(){R&&(vt={start:performance.now()},R.setHotelFloors(0))}let be=null;const mt=Y("card");function ja(e){return ue((e.bb[0]+e.bb[2])/2,(e.bb[1]+e.bb[3])/2,e.b+e.h*.5)}function ko(e){return ue((e.bb[0]+e.bb[2])/2,e.bb[1]-9,e.b)}function je(e){const a=le?.s==="Hotel";if(le=e,be&&($.entities.remove(be),be=null),!e||!R){mt&&(mt.hidden=!0),Ve?.show(!1);return}if(e.s!=="Hotel"?Ve?.show(!1):X?.visible&&Ve?.show(!0),e.s!=="Hotel"){const f=e.r.map(([x,w])=>ue(x,w,0,R.matrix)),h=2572+e.b-.5;be=$.entities.add({polygon:{hierarchy:new qo(f),height:h,extrudedHeight:h+e.h+2.2,material:U.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:U.fromCssColorString("#d7ebff"),shadows:ge.DISABLED}})}const t=e.s==="Hotel";if(t&&!a){X?(kt(),be&&($.entities.remove(be),be=null)):(Ht=!0,xt(),Mo()),ke();const f=X?.caja;V.flyTo(f?{pivot:ue((f[0]+f[2])/2,(f[1]+f[3])/2,12),heading:.55,pitch:-.4,range:230}:{pivot:Ct("hotel"),pitch:-.38,range:290},1.8)}const o=t&&R?R.buildings.filter(f=>f.s==="Hotel"):[e],i=f=>Math.abs(f.r.reduce((h,x,w)=>{const T=f.r[(w+1)%f.r.length];return h+x[0]*T[1]-T[0]*x[1]},0)/2),s=o.reduce((f,h)=>f+i(h),0),c=o.reduce((f,h)=>f+i(h)*h.p,0),d=Math.max(...o.map(f=>f.p)),g=Math.max(...o.map(f=>f.h));Math.abs(e.r.reduce((f,h,x)=>{const w=e.r[(x+1)%e.r.length];return f+h[0]*w[1]-w[0]*h[1]},0)/2),Y("cardKind").textContent=t?"Proyecto":`Sector ${e.s}`,Y("cardTitle").textContent=t?"Hotel La Fontana":`Edificación ${e.id+1}`,Y("cardData").innerHTML=`<dt>Pisos</dt><dd>${t?"hasta "+d:e.p}</dd><dt>Altura</dt><dd>${g.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(s).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(c).toLocaleString("es-CO")} m²</dd>`,mt&&(mt.hidden=!1)}V.onPick=e=>{R&&je(e?R.buildingAt(e):null)};Y("cardClose")?.addEventListener("click",()=>je(null));Y("cardFocus")?.addEventListener("click",()=>{if(!le)return;ke();const e=Math.max(le.bb[2]-le.bb[0],le.bb[3]-le.bb[1],le.h);V.flyTo({pivot:ja(le),pitch:-.42,range:Math.max(60,e*2.1)},1.7)});Y("cardWalk")?.addEventListener("click",()=>{le&&(ke(),V.enterWalk(ko(le)))});const Lt=Y("status"),fo=Y("statusText");async function Wa(e=25e3){const a=performance.now()+e;let t=0;for(;performance.now()<a;){const o=O.globe.tilesLoaded,i=!R?.tileset||R.tileset.tilesLoaded;if(o&&i){if(t||(t=performance.now()),performance.now()-t>=600)break}else t=0;await new Promise(s=>setTimeout(s,150))}for(let o=0;o<8;o++)await new Promise(i=>requestAnimationFrame(i))}async function qa(){_e("Cargando el modelo del hotel...",.05),await new Promise(o=>setTimeout(o,30)),R=await ua($,(o,i)=>_e(o,.05+i*.2),(o,i,s)=>{_e(`Cargando secciones (${o}/${i}) · ${s}`,.25+o/Math.max(1,i)*.45),!(!Lt||!fo)&&(Lt.hidden=!1,fo.textContent=o<i?`Cargando secciones ${o}/${i} · ${s}`:`Modelo completo · ${i} secciones`,o>=i&&setTimeout(()=>Lt.classList.add("fade"),2600))}),R.setNight(fe),R.setTarde(Fe),xt();const e=document.querySelector("[data-light].on")?.dataset.light||"dia";Mt(at.getPreset(e)),rt(),lt("general",0),V.flyTo({pivot:ue(-110,150,10),heading:-.75,pitch:-.62,range:1750},0),R.startBackground(),_e("Preparando el Hotel La Fontana...",.55),await xt(),_e("Cargando la ciudad y la vegetación...",.7),await R.done,_e("Cargando tráfico y parqueaderos...",.85),nt=await va($,R.matrix),nt&&await nt.ready,window.__ALL__=!0,_e("Renderizando...",.94),await Wa(12e3),_e("Listo",1);const a=Y("btnEntrar");a&&(a.disabled=!1,a.textContent="Entrar",await new Promise(o=>a.addEventListener("click",()=>o(),{once:!0}))),lo.classList.add("done"),Ua(),setTimeout(()=>lo.remove(),900);const t=Y("hint");t&&setTimeout(()=>t.classList.add("fade"),9e3),window.__READY__=!0}const re={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Wo,viewer:$,cam:V,getSite:()=>R,enuToWorld:ue,select:je,stats:re,playHotel:Mo,playRevit:kt,getRevit:()=>X,getTrafico:()=>nt,setQuality:e=>{te=e,rt()}};qa().catch(e=>{console.error(e),bo.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(e?.message??e)});let ho=performance.now(),Rt=0;function So(){const e=performance.now(),a=Math.min(.1,(e-ho)/1e3);if(ho=e,Ie){const o=Math.min(1,(e-Ie.start)/1800),i=o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2;he=Ie.from+(Ie.to-Ie.from)*i,o>=1&&(Ie=null)}else yt&&(he+=a/7,he>20.6&&(he=5.6));if((Math.abs(he-it)>.004||it<0)&&(it=he,Da()),Co.uniforms.uTime=e*.001,vt&&R){const o=(e-vt.start)/550,i=Math.floor(o),s=o-i,c=1-Math.pow(1-Math.min(1,s*1.6),3);i>=Ba?(R.setHotelFloors(99),vt=null):R.setHotelFloors(i+c)}X?.update(a,e),nt?.update(a);const t=e*.001;if(R?.setTime(t),Me.uniforms.uTime=t,Ge&&!V.isWalking&&V.flyTo({heading:V.state.heading+.16*a},0),V.update(a),re.frames++,e-re.t0>=2e3){re.fps=Math.round(re.frames*1e3/(e-re.t0)),re.frames=0,re.t0=e,window.__FPS__=re.fps;const o=!!R&&R.sections.loaded>=R.sections.total&&e-Rt>8e3;R&&R.sections.loaded>=R.sections.total&&!Rt&&(Rt=e),o&&document.visibilityState==="visible"&&(re.fps<20&&te>.25&&!window.__DBG__.lock?++re.low>=3&&(te=te>=1?.5:.25,re.low=0,rt()):re.low=0)}requestAnimationFrame(So)}requestAnimationFrame(So);addEventListener("resize",rt);
