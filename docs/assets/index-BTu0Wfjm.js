var io=Object.defineProperty;var no=(o,i,t)=>i in o?io(o,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[i]=t;var H=(o,i,t)=>no(o,typeof i!="symbol"?i+"":i,t);import{C as b,a as Xt,T as St,M as U,b as Pe,c as Xe,H as so,P as Jt,d as qe,L as ro,U as E,V as se,e as Ve,f as je,g as ut,h as ht,i as ot,j as lo,S as xe,I as Kt,k as co,l as uo,m as O,n as gt,R as ho,o as Je,A as ge,p as Ht,q as fo,r as mo,s as po,t as Ke,u as Nt,v as Tt,G as go,B as vo,w as vt,x as yo,y as xo,z as bo,D as wo,J as $e,E as Co,F as Mo,K as ko}from"./cesium-NqgYyKJC.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&a(h)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();const yt="/HLF/",So=yt.endsWith("/")?yt:yt+"/",To=So+"cesium/";window.CESIUM_BASE_URL=To;const rt={longitude:-74.04145021,latitude:4.70207636,height:2572},xt={hotel:{name:"Hotel La Fontana",e:-236,n:330,u:18},unicentro:{name:"Unicentro",e:10,n:0,u:14}},lt={general:{place:"hotel",range:1250,pitch:-.52,heading:.55},aerial:{place:"hotel",range:420,pitch:-.62,heading:2.35},arch:{place:"hotel",range:210,pitch:-.2,heading:3.35}},Ne={secciones:"secciones/",googleTiles:"https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4",ionToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts",imageryAssetId:2},zo=o=>o<.5?4*o*o*o:1-Math.pow(-2*o+2,3)/2,Ot=-1.5533,Dt=-.012,Ao=4200,Eo=6,Ut=1.7;class Po{constructor(i){H(this,"viewer");H(this,"canvas");H(this,"pivot",new b);H(this,"heading",.5);H(this,"pitch",-.6);H(this,"range",1200);H(this,"targetPivot",new b);H(this,"targetHeading",.5);H(this,"targetPitch",-.6);H(this,"targetRange",1200);H(this,"damping",9);H(this,"drag",null);H(this,"pointers",new Map);H(this,"pinch",null);H(this,"lastTap",0);H(this,"keys",new Set);H(this,"tween",null);H(this,"fov",Xt.toRadians(48));H(this,"walking",!1);H(this,"eye",new b);H(this,"eyeTarget",new b);H(this,"wHeading",0);H(this,"wPitch",0);H(this,"wHeadingT",0);H(this,"wPitchT",0);H(this,"onPick",null);H(this,"onModeChange",null);H(this,"groundHeight",null);this.viewer=i,this.canvas=i.scene.canvas,i.scene.screenSpaceCameraController.enableInputs=!1,this.bind()}get isWalking(){return this.walking}get state(){return{heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange,pivot:b.clone(this.targetPivot)}}setPivot(i,t=!0){if(t){const a=b.clone(this.viewer.camera.positionWC),s=b.subtract(a,i,new b),l=b.magnitude(s),h=St.eastNorthUpToFixedFrame(i),d=U.inverseTransformation(h,new U),w=U.multiplyByPointAsVector(d,s,new b);if(l>1){const C=-Math.asin(Math.max(-1,Math.min(1,w.z/l)));if(C<Dt&&C>Ot){let p=Math.atan2(-w.x,-w.y);for(;p-this.heading>Math.PI;)p-=Math.PI*2;for(;p-this.heading<-Math.PI;)p+=Math.PI*2;this.heading=this.targetHeading=p,this.pitch=this.targetPitch=C,this.range=this.targetRange=this.clamp(l),b.clone(i,this.pivot)}}}this.targetPivot=b.clone(i),this.tween=null}bind(){const i=this.canvas;i.style.touchAction="none",i.addEventListener("pointerdown",a=>{if(i.setPointerCapture(a.pointerId),this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2){const[s,l]=[...this.pointers.values()];this.pinch={distance:Math.hypot(s.x-l.x,s.y-l.y),range:this.targetRange,cx:(s.x+l.x)/2,cy:(s.y+l.y)/2},this.drag=null;return}a.button===2||a.button===1||a.shiftKey?this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"pan",moved:!1}:a.button===0&&(this.drag={id:a.pointerId,x:a.offsetX,y:a.offsetY,mode:"orbit",moved:!1}),this.tween=null}),i.addEventListener("pointermove",a=>{if(!this.pointers.has(a.pointerId))return;if(this.pointers.set(a.pointerId,{x:a.offsetX,y:a.offsetY}),this.pointers.size===2&&this.pinch){const[h,d]=[...this.pointers.values()],w=Math.hypot(h.x-d.x,h.y-d.y),C=(h.x+d.x)/2,p=(h.y+d.y)/2;this.walking?this.walk((this.pinch.cy-p)*.06,0):(w>0&&this.pinch.distance>0&&(this.targetRange=this.clamp(this.pinch.range*this.pinch.distance/w)),this.pan(this.pinch.cx-C,p-this.pinch.cy)),this.pinch.cx=C,this.pinch.cy=p;return}if(!this.drag||a.pointerId!==this.drag.id)return;const s=a.offsetX-this.drag.x,l=a.offsetY-this.drag.y;this.drag.x=a.offsetX,this.drag.y=a.offsetY,Math.abs(s)+Math.abs(l)>1.5&&(this.drag.moved=!0),this.tween=null,this.walking?this.drag.mode==="orbit"?(this.wHeadingT-=s*.0032,this.wPitchT=Math.max(-1.2,Math.min(1.2,this.wPitchT+l*.0028))):this.walk(l*.05,-s*.05):this.drag.mode==="orbit"?(this.targetHeading-=s*.0042,this.targetPitch=this.clampPitch(this.targetPitch-l*.0034)):this.pan(-s,l)});const t=a=>{if(this.pointers.delete(a.pointerId),this.pointers.size<2&&(this.pinch=null),this.drag&&a.pointerId===this.drag.id){const s=!this.drag.moved&&this.drag.mode==="orbit";if(this.drag=null,s&&a.type==="pointerup"){const l=new Pe(a.offsetX,a.offsetY),h=performance.now();if(a.pointerType!=="mouse"&&h-this.lastTap<320){this.lastTap=0,this.focusAt(l);return}this.lastTap=h;const d=this.pickWorld(l);d&&!this.walking&&this.setPivot(d,!0),this.onPick?.(d)}}};i.addEventListener("pointerup",t),i.addEventListener("pointercancel",t),i.addEventListener("contextmenu",a=>a.preventDefault()),i.addEventListener("wheel",a=>{a.preventDefault(),this.tween=null;const s=a.deltaMode===1?16:a.deltaMode===2?100:1,l=a.deltaY*s;if(this.walking){this.walk(-l*.02,0);return}const h=Math.exp(Math.max(-.45,Math.min(.45,l*.0016))),d=this.pickWorld(new Pe(a.offsetX,a.offsetY)),w=this.clamp(this.targetRange*h);if(d&&h<1){const C=Math.min(.45,(this.targetRange-w)/this.targetRange)*.8,p=b.subtract(d,this.targetPivot,new b),f=b.magnitude(p);if(f>1){const u=Math.min(f,this.targetRange)*C/f;b.add(this.targetPivot,b.multiplyByScalar(p,u,p),this.targetPivot)}}this.targetRange=w},{passive:!1}),i.addEventListener("dblclick",a=>{a.preventDefault(),this.focusAt(new Pe(a.offsetX,a.offsetY))}),addEventListener("keydown",a=>{a.target instanceof HTMLInputElement||(this.keys.add(a.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"].includes(a.code)&&a.preventDefault())}),addEventListener("keyup",a=>this.keys.delete(a.code)),addEventListener("blur",()=>this.keys.clear())}clamp(i,t=Eo,a=Ao){return Math.max(t,Math.min(a,i))}clampPitch(i){return Math.max(Ot,Math.min(Dt,i))}moveHorizontal(i,t,a,s){const l=St.eastNorthUpToFixedFrame(i),h=new b(Math.sin(t)*a+Math.cos(t)*s,Math.cos(t)*a-Math.sin(t)*s,0);U.multiplyByPoint(l,h,i)}pan(i,t){const a=this.canvas.clientHeight||1,s=2*this.range*Math.tan(this.fov/2)/a,l=Math.max(.35,Math.sin(-this.pitch));this.moveHorizontal(this.targetPivot,this.heading,t*s/l,i*s),this.tween=null}walk(i,t){this.moveHorizontal(this.eyeTarget,this.wHeading,i,t),this.snapEye()}snapEye(){const i=Xe.fromCartesian(this.eyeTarget),t=this.groundHeight?.(i);t!==void 0&&Number.isFinite(t)&&(i.height=t+Ut,Xe.toCartesian(i,void 0,this.eyeTarget))}pickWorld(i){const t=this.viewer.scene;let a;if(t.pickPositionSupported&&t.pick(i,4,4)&&(a=t.pickPosition(i)),!a){const s=t.camera.getPickRay(i);s&&(a=t.globe.pick(s,t)??void 0)}return a??null}focusAt(i){const t=this.pickWorld(i);if(t){if(this.walking){b.clone(t,this.eyeTarget),this.snapEye();return}this.flyTo({pivot:t,heading:this.targetHeading,pitch:Math.min(this.targetPitch,-.3),range:this.clamp(Math.max(70,this.targetRange*.42),50,420)},1.6)}}flyTo(i,t=2){this.walking&&this.exitWalk(!1);const a={pivot:i.pivot??b.clone(this.targetPivot),heading:i.heading??this.targetHeading,pitch:i.pitch??this.targetPitch,range:i.range??this.targetRange};let s=a.heading;for(;s-this.targetHeading>Math.PI;)s-=Math.PI*2;for(;s-this.targetHeading<-Math.PI;)s+=Math.PI*2;if(a.heading=s,t<=.02){this.tween=null,this.targetPivot=b.clone(a.pivot),this.pivot=b.clone(a.pivot),this.heading=this.targetHeading=a.heading,this.pitch=this.targetPitch=a.pitch,this.range=this.targetRange=a.range;return}this.tween={from:{pivot:b.clone(this.targetPivot),heading:this.targetHeading,pitch:this.targetPitch,range:this.targetRange},to:a,start:performance.now(),duration:t*1e3}}enterWalk(i){b.clone(i??this.targetPivot,this.eyeTarget),this.snapEye(),b.clone(this.viewer.camera.positionWC,this.eye),this.wHeading=this.wHeadingT=this.heading,this.wPitch=this.pitch,this.wPitchT=0,this.walking=!0,this.tween=null,this.onModeChange?.(!0)}exitWalk(i=!0){if(!this.walking)return;this.walking=!1;const t=Xe.fromCartesian(this.eyeTarget);t.height-=Ut-1;const a=Xe.toCartesian(t);this.pivot=b.clone(a),this.targetPivot=a,this.heading=this.targetHeading=this.wHeading,this.pitch=-.05,this.range=8,i?this.onModeChange?.(!1):this.onModeChange?.(!1)}updateKeys(i){if(!this.keys.size)return;const t=this.keys,a=t.has("ShiftLeft")||t.has("ShiftRight")?3:1;let s=0,l=0;(t.has("KeyW")||t.has("ArrowUp"))&&(s+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(s-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(l+=1),(t.has("KeyA")||t.has("ArrowLeft"))&&(l-=1);let h=0;if(t.has("KeyQ")&&(h+=1),t.has("KeyE")&&(h-=1),this.walking){h&&(this.wHeadingT-=h*1.2*i),(s||l)&&this.walk(s*4.2*a*i,l*3.4*a*i);return}if(h&&(this.targetHeading+=h*.9*i,this.tween=null),(t.has("PageUp")||t.has("Equal")||t.has("NumpadAdd"))&&(this.targetRange=this.clamp(this.targetRange*(1-.9*i))),(t.has("PageDown")||t.has("Minus")||t.has("NumpadSubtract"))&&(this.targetRange=this.clamp(this.targetRange*(1+.9*i))),t.has("KeyR")&&(this.targetPitch=this.clampPitch(this.targetPitch-.7*i)),t.has("KeyF")&&(this.targetPitch=this.clampPitch(this.targetPitch+.7*i)),!s&&!l)return;const d=Math.max(8,this.range*.6)*a*i;this.moveHorizontal(this.targetPivot,this.heading,s*d,l*d),this.tween=null}update(i){this.updateKeys(i);const t=1-Math.exp(-this.damping*i);if(this.walking){b.lerp(this.eye,this.eyeTarget,1-Math.exp(-5*i),this.eye),this.wHeading+=(this.wHeadingT-this.wHeading)*t,this.wPitch+=(this.wPitchT-this.wPitch)*t,this.viewer.camera.setView({destination:this.eye,orientation:{heading:this.wHeading,pitch:this.wPitch,roll:0}});return}if(this.tween){const a=Math.min(1,(performance.now()-this.tween.start)/this.tween.duration),s=zo(a),{from:l,to:h}=this.tween;b.lerp(l.pivot,h.pivot,s,this.targetPivot),this.targetHeading=l.heading+(h.heading-l.heading)*s,this.targetPitch=l.pitch+(h.pitch-l.pitch)*s,this.targetRange=Math.exp(Math.log(l.range)+(Math.log(h.range)-Math.log(l.range))*s),a>=1&&(this.tween=null)}this.heading+=(this.targetHeading-this.heading)*t,this.pitch+=(this.targetPitch-this.pitch)*t,this.range=Math.exp(Math.log(this.range)+(Math.log(this.targetRange)-Math.log(this.range))*t),b.lerp(this.pivot,this.targetPivot,t,this.pivot),this.viewer.camera.lookAt(this.pivot,new so(this.heading,this.pitch,this.range)),this.viewer.camera.lookAtTransform(U.IDENTITY)}}function Lo(){return new je({typedArray:new Uint8Array([128,128,128,255]),width:1,height:1})}const Zt=()=>({uAerial:{type:E.SAMPLER_2D,value:Lo()},uAerialRect:{type:E.VEC4,value:new Ve(-1e3,-1e3,1e3,1e3)},uAerialOn:{type:E.FLOAT,value:0}}),$t=`
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
`;function Ro(){return new qe({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uSkyFill:{type:E.FLOAT,value:.24},uHazeAmount:{type:E.FLOAT,value:.08},uHazeStart:{type:E.FLOAT,value:1200},uHotelPisos:{type:E.FLOAT,value:99},uRevitBox:{type:E.VEC4,value:new Ve(0,0,0,0)},uLean:{type:E.VEC2,value:new Pe(0,0)},...Zt()},varyings:{vPosM:se.VEC3,vUpEC:se.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Qe+$t+`
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
    `})}function Io(o,i,t){return new qe({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uSkyFill:{type:E.FLOAT,value:.22},uHazeAmount:{type:E.FLOAT,value:.08},uHazeStart:{type:E.FLOAT,value:1200},uTime:{type:E.FLOAT,value:0},uFrame:{type:E.FLOAT,value:i},uTop:{type:E.FLOAT,value:t},uAtlas:{type:E.SAMPLER_2D,value:new je({url:o,repeat:!1,minificationFilter:ht.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})}},varyings:{vUV:se.VEC2,vView:se.VEC3,vRightT:se.VEC2,vUpT:se.VEC2,vUpEC:se.VEC3},vertexShaderText:`
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
    `})}function _o(){return new qe({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uHazeAmount:{type:E.FLOAT,value:.08},uHazeStart:{type:E.FLOAT,value:1200}},lightingModel:ro.UNLIT,fragmentShaderText:Qe+`
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(1.01, 0.99, 0.97), uTarde * 0.35);
        c = mix(c, c * vec3(0.11, 0.14, 0.22), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight, uTarde), hlfHaze(length(fsInput.attributes.positionEC), uHazeStart, uHazeAmount));
      }
    `})}function Fo(o,i,t){return new Jt({name:"hlf_sky",uniforms:{uNight:0,uTarde:0,uTime:0,uEast:o,uNorth:i,uUp:t,uSkyZenith:new b(.16,.42,.82),uSkyHorizon:new b(.72,.83,.94),uCloudDensity:.85,uCloudSpeed:1},fragmentShader:`
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
    `})}function Ho(){return new Jt({name:"hlf_grade",uniforms:{uNight:0,uTarde:0,uExposure:1,uContrast:.22,uSaturation:1.06,uTint:new b(1,1,1),uVignette:.24},fragmentShader:`
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
    `})}function No(o){const i=t=>({type:E.SAMPLER_2D,value:new je({url:o+t,repeat:!0,minificationFilter:ht.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})});return new qe({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uGroundFill:{type:E.FLOAT,value:.12},uHazeAmount:{type:E.FLOAT,value:.08},uHazeStart:{type:E.FLOAT,value:1200},uAsfalto:i("tex_asfalto.webp"),uAnden:i("tex_anden.webp"),uPrado:i("tex_prado.webp"),uCiclo:i("tex_ciclo.webp"),...Zt()},varyings:{vG:se.VEC3,vUpEC:se.VEC3},vertexShaderText:`
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
        vUpEC = normalize((czm_modelView * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      }
    `,fragmentShaderText:Qe+$t+`
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
    `})}function Oo(){return new qe({uniforms:{uNight:{type:E.FLOAT,value:0},uTarde:{type:E.FLOAT,value:0},uSkyFill:{type:E.FLOAT,value:.24},uHazeAmount:{type:E.FLOAT,value:.08},uHazeStart:{type:E.FLOAT,value:1200}},varyings:{vPosM:se.VEC3,vUpEC:se.VEC3},vertexShaderText:`
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
    `})}function Et(){return St.eastNorthUpToFixedFrame(b.fromDegrees(rt.longitude,rt.latitude,rt.height))}function Ce(o,i,t,a=Et()){return U.multiplyByPoint(a,new b(o,i,t),new b)}const Do={island_tree_01:"Arbolado · copa media",island_tree_02:"Arbolado · copa ancha",island_tree_03:"Arbolado · copa baja",jacaranda_tree:"Arbolado · gran porte",tree_small_02:"Arbolado · joven",fir_sapling_medium:"Coníferas",shrub_02:"Arbustos"};function Uo(o,i,t){let a=!1;for(let s=0,l=t.length-1;s<t.length;l=s++){const[h,d]=t[s],[w,C]=t[l];d>i!=C>i&&o<(w-h)*(i-d)/(C-d)+h&&(a=!a)}return a}function Bo(o,i,t){let a=1/0;for(let s=0,l=t.length-1;s<t.length;l=s++){const[h,d]=t[l],[w,C]=t[s],p=w-h,f=C-d,u=Math.max(0,Math.min(1,((o-h)*p+(i-d)*f)/(p*p+f*f||1)));a=Math.min(a,Math.hypot(o-h-u*p,i-d-u*f))}return a}async function Vo(o,i,t){const a=o.scene,s=Et(),l=U.inverseTransformation(s,new U),h=Ne.secciones;i("Contexto urbano",.08);const[d,w,C,p]=await Promise.all([fetch(h+"recorte.json").then(e=>e.json()),fetch(h+"edificios.json").then(e=>e.json()),fetch(h+"arboles.json").then(e=>e.json()),fetch(h+"suelo.json").then(e=>e.json())]),f=()=>d.clips.map(e=>{const n=new gt({positions:b.fromDegreesArray(e.flat())}),c=n.computeRectangle();return n.computeRectangle=r=>ho.clone(c,r),n});a.globe.clippingPolygons=new ot({polygons:f()});const u=_o();let y=null;try{y=await lo.fromUrl(Ne.googleTiles,{maximumScreenSpaceError:10,shadows:xe.DISABLED,dynamicScreenSpaceError:!0,dynamicScreenSpaceErrorDensity:.0022,dynamicScreenSpaceErrorFactor:4,showCreditsOnScreen:!0,cullWithChildrenBounds:!0,cacheBytes:384*1024*1024,maximumCacheOverflowBytes:256*1024*1024}),y.clippingPolygons=new ot({polygons:f()}),y.customShader=u,a.primitives.add(y)}catch(e){console.warn("Tiles de Google no disponibles",e)}const g=[-236,330],M=[];for(const e of w.secciones){const n=e.key==="Hotel";M.push({key:e.key,file:n?"hotel_fachadas.glb":e.file,kind:n?"cubierta_pbr":"edificios",label:n?"Hotel La Fontana 3D":`Edificaciones · sector ${e.key}`,dist:n?-2:Math.hypot(e.c[0]-g[0],e.c[1]-g[1])})}M.push({key:"hotel_cubiertas",file:"hotel_cubiertas.glb",kind:"cubierta",label:"Cubiertas del hotel",dist:-1}),M.push({key:"hotel_plazoleta",file:"hotel_plazoleta.glb",kind:"cubierta_pbr",label:"Plazoleta y acceso · Hotel",dist:-.8}),M.push({key:"unicentro_cubierta",file:"unicentro_cubierta.glb",kind:"cubierta_pbr",label:"Cubierta · Unicentro",dist:-.5}),M.sort((e,n)=>e.dist-n.dist);const D={Terreno:[0,"Terreno"],Vias:[1,"Vías"],Andenes:[2,"Andenes"],Separadores:[3,"Separadores"],Ciclorrutas:[4,"Ciclorrutas"],Agua:[5,"Canal · agua"],Canal_Fondo:[6,"Canal"],Canal_Muros:[6,"Canal · muros"],Puentes:[7,"Puentes"]},m=p.secciones.map(e=>({key:e.key,file:e.file,kind:"suelo",capa:D[e.key]?.[0]??0,label:D[e.key]?.[1]??e.key,dist:-3})),A=C.secciones.map(e=>({key:e.key,file:e.file,kind:"arboles",atlas:e.atlas,marco:e.marco,marcoSup:e.marcoSup,label:Do[e.key]??"Vegetación",dist:0})),z=[...m,...M.slice(0,4),...A.slice(0,3),...M.slice(4,9),...A.slice(3),...M.slice(9)],x=Ro(),k=Oo(),L=No(h),G=(async()=>{try{const e=await Kt.fromAssetId(Ne.imageryAssetId),n=18,c=e.tilingScheme,r=(B,ae)=>Xe.fromCartesian(Ce(B,ae,0,s)),v=c.positionToTileXY(r(-1010,930),n),S=c.positionToTileXY(r(1010,-940),n),R=S.x-v.x+1,F=S.y-v.y+1,T=e.tileWidth,_=document.createElement("canvas");_.width=R*T,_.height=F*T;const q=_.getContext("2d"),$=[];for(let B=v.y;B<=S.y;B++)for(let ae=v.x;ae<=S.x;ae++)$.push([ae,B]);const ce=async([B,ae])=>{for(let ze=0;ze<40;ze++){const It=e.requestImage(B,ae,n);if(It){try{const Ge=await It,_t=(B-v.x)*T,Ft=(ae-v.y)*T;typeof ImageBitmap<"u"&&Ge instanceof ImageBitmap?(q.save(),q.translate(_t,Ft+T),q.scale(1,-1),q.drawImage(Ge,0,0,T,T),q.restore()):q.drawImage(Ge,_t,Ft,T,T)}catch{}return}await new Promise(Ge=>setTimeout(Ge,120))}};q.fillStyle="#6a6f62",q.fillRect(0,0,_.width,_.height);const Fe=Array.from({length:6},async()=>{for(;$.length;)await ce($.shift())});await Promise.all(Fe);const fe=document.createElement("canvas");fe.width=fe.height=4096,fe.getContext("2d").drawImage(_,0,0,4096,4096);const N=await new Promise(B=>fe.toBlob(B,"image/jpeg",.92));if(!N)return;const Q=URL.createObjectURL(N);window.__AERIAL_URL__=Q;const V=c.tileXYToRectangle(v.x,v.y,n),ee=c.tileXYToRectangle(S.x,S.y,n),te=(B,ae)=>U.multiplyByPoint(l,b.fromRadians(B,ae,rt.height),new b),ue=te(V.west,ee.south),me=te(ee.east,V.north),He=new Ve(ue.x,ue.y,me.x,me.y);for(const B of[x,L])B.setUniform("uAerial",new je({url:Q,repeat:!1,minificationFilter:ht.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})),B.setUniform("uAerialRect",He),B.setUniform("uAerialOn",1)}catch(e){console.warn("Foto aérea no disponible",e)}})(),Y=[],Z=[],J=[];let we=null;const de=new co(new b(0,-1,0),1e3);let Re=0,Te=0,re=.22,he=.08,le=1200;const Ie={total:z.length,loaded:0,failed:[]},Ye=async e=>{try{const n=await Je.fromGltfAsync({url:h+e.file,modelMatrix:s,upAxis:ge.Y,forwardAxis:ge.X,shadows:e.kind==="arboles"?xe.CAST_ONLY:e.kind==="suelo"?xe.RECEIVE_ONLY:xe.ENABLED,backFaceCulling:!1,incrementallyLoadTextures:!1,cull:e.kind!=="arboles"});if(e.kind==="suelo")n.customShader=L;else if(e.kind==="arboles"){const r=Io(h+e.atlas,e.marco,e.marcoSup);r.setUniform("uNight",Re),r.setUniform("uTarde",Te),r.setUniform("uSkyFill",re),r.setUniform("uHazeAmount",he),r.setUniform("uHazeStart",le),Y.push(r),n.customShader=r}else e.key==="Hotel"||e.key==="hotel_plazoleta"||e.key==="hotel_cubiertas"?n.customShader=k:e.kind!=="cubierta_pbr"&&(n.customShader=x);const c=e.key==="Hotel"||e.key==="hotel_plazoleta"||e.key==="hotel_cubiertas";n.imageBasedLighting.imageBasedLightingFactor=c?new Pe(1,.75):e.kind==="cubierta_pbr"?new Pe(.85,.55):new Pe(.68,.38),a.primitives.add(n),e.kind==="arboles"&&Z.push(n),(e.key==="Hotel"||e.key==="hotel_cubiertas")&&J.push(n),await new Promise(r=>{if(n.ready)return r();const v=n.readyEvent.addEventListener(()=>{v(),r()});setTimeout(r,2e4)})}catch(n){console.error("Sección no cargada",e.file,n),Ie.failed.push(e.file)}Ie.loaded++,t?.(Ie.loaded,Ie.total,e.label)},_e=m.length+7;for(let e=0;e<Math.min(_e,z.length);e++)i(z[e].label,.2+.75*e/_e),await Ye(z[e]);const pt=(async()=>{for(let e=_e;e<z.length;e++)await Ye(z[e]),await new Promise(n=>setTimeout(n,60));await G})();return{matrix:s,inverse:l,tileset:y,buildings:w.edificios,treeCount:C.total,sections:Ie,done:pt,setNight(e){u.setUniform("uNight",e),x.setUniform("uNight",e),k.setUniform("uNight",e),Re=e,L.setUniform("uNight",e);for(const n of Y)n.setUniform("uNight",e)},setTarde(e){u.setUniform("uTarde",e),x.setUniform("uTarde",e),k.setUniform("uTarde",e),Te=e,L.setUniform("uTarde",e);for(const n of Y)n.setUniform("uTarde",e)},setTime(e){for(const n of Y)n.setUniform("uTime",e)},setLook(e){if(e.skyFill!==void 0){re=e.skyFill,x.setUniform("uSkyFill",re),k.setUniform("uSkyFill",re);for(const n of Y)n.setUniform("uSkyFill",re)}if(e.groundFill!==void 0&&L.setUniform("uGroundFill",e.groundFill),e.hazeAmount!==void 0){he=e.hazeAmount,x.setUniform("uHazeAmount",he),k.setUniform("uHazeAmount",he),L.setUniform("uHazeAmount",he),u.setUniform("uHazeAmount",he);for(const n of Y)n.setUniform("uHazeAmount",he)}if(e.hazeStart!==void 0){le=e.hazeStart,x.setUniform("uHazeStart",le),k.setUniform("uHazeStart",le),L.setUniform("uHazeStart",le),u.setUniform("uHazeStart",le);for(const n of Y)n.setUniform("uHazeStart",le)}},setRevitBlocks(e){const n=w.edificios.filter(c=>e.includes(c.id)).map(c=>{const r=c.r.reduce((S,R)=>S+R[0],0)/c.r.length,v=c.r.reduce((S,R)=>S+R[1],0)/c.r.length;return new gt({positions:c.r.map(([S,R])=>{const F=S-r,T=R-v,_=Math.hypot(F,T)||1;return Ce(S+F/_*.6,R+T/_*.6,0,s)})})});for(const c of J)c.clippingPolygons=n.length?new ot({polygons:n}):void 0},setRevitZone(e){if(!e){we=e?[[e[0],e[1]],[e[2],e[1]],[e[2],e[3]],[e[0],e[3]]].map(([n,c])=>Ce(n,c,0,s)):null;for(const n of J)n.clippingPolygons=we?new ot({polygons:[new gt({positions:we})]}):void 0;x.setUniform("uRevitBox",e?new Ve(e[0]-1,e[1]-1,e[2]+1,e[3]+1):new Ve(0,0,0,0))}},setHotelFloors(e){const n=e<98;de.distance=3.2+e*3.05;for(const c of J)n&&!c.clippingPlanes&&(c.clippingPlanes=new uo({planes:[de],edgeWidth:2,edgeColor:O.fromCssColorString("#d7ebff")})),c.clippingPlanes&&(c.clippingPlanes.enabled=n);x.setUniform("uHotelPisos",e)},setTreesVisible(e){for(const n of Z)n.show=e},buildingAt(e){const n=U.multiplyByPoint(l,e,new b);let c=null,r=1.2;for(const v of w.edificios){if(n.x<v.bb[0]-1.5||n.x>v.bb[2]+1.5||n.y<v.bb[1]-1.5||n.y>v.bb[3]+1.5||n.z>v.b+v.h+2.5)continue;if(Uo(n.x,n.y,v.r))return v;const S=Bo(n.x,n.y,v.r);S<r&&(r=S,c=v)}return c}}}const jo=O.fromCssColorString("#ff2b1a"),Wo=O.fromCssColorString("#ffc400"),qo=O.fromCssColorString("#00e862"),De=O.fromCssColorString("#1a1d22");function bt(o){const i=document.createElement("canvas");i.width=128,i.height=128;const t=i.getContext("2d");if(t.clearRect(0,0,128,128),o==="pare"){t.beginPath();for(let a=0;a<8;a++){const s=(a+.5)*Math.PI/4,l=64+Math.cos(s)*58,h=64+Math.sin(s)*58;a===0?t.moveTo(l,h):t.lineTo(l,h)}t.closePath(),t.fillStyle="#c81e1e",t.fill(),t.lineWidth=5,t.strokeStyle="#ffffff",t.stroke(),t.fillStyle="#ffffff",t.font="bold 31px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("PARE",64,66)}else o==="peaton"?(t.beginPath(),t.moveTo(64,6),t.lineTo(122,64),t.lineTo(64,122),t.lineTo(6,64),t.closePath(),t.fillStyle="#f5b800",t.fill(),t.lineWidth=4,t.strokeStyle="#18181b",t.stroke(),t.fillStyle="#18181b",t.beginPath(),t.arc(64,38,7,0,Math.PI*2),t.fill(),t.fillRect(59,47,10,22),t.fillRect(54,69,7,20),t.fillRect(67,69,7,20)):(t.beginPath(),t.arc(64,64,56,0,Math.PI*2),t.fillStyle="#ffffff",t.fill(),t.lineWidth=11,t.strokeStyle="#c81e1e",t.stroke(),t.fillStyle="#111827",t.font="bold 46px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("30",64,67));return i.toDataURL("image/png")}function Yo(o,i,t,a,s){const l=(m,A,z)=>U.multiplyByPoint(i,new b(m,A,z),new b),h=[],d=t+7.2,w=a+7.2,C=s(d,w),p=O.fromCssColorString("#2a303a"),f=O.fromCssColorString("#14171c"),u=O.fromCssColorString("#eab308"),y=(m,A,z,x)=>{const k=x?.42:.3,L=x?.3:.42;h.push(o.entities.add({position:l(m,A,z),box:{dimensions:new b(k,L,1.18),material:f}}));const G=(de,Re)=>{const Te=o.entities.add({position:l(m,A,z+de),box:{dimensions:new b(x?.24:.33,x?.33:.24,.24),material:Re}});return h.push(Te),Te},Y=G(.36,De),Z=G(0,De),J=G(-.36,De);return{red:Y,yellow:Z,green:J,setState:de=>{Y.box.material=new Ke(de==="red"?jo:De),Z.box.material=new Ke(de==="yellow"?Wo:De),J.box.material=new Ke(de==="green"?qo:De)}}};if(Math.abs(t+148.8)<12&&Math.abs(a-216.3)<12){const m=[{px:-159.5,py:232,dx:4.2,dy:0,isNS:!0},{px:-163.5,py:226.5,dx:0,dy:-4,isNS:!1},{px:-163,py:203,dx:0,dy:4,isNS:!1},{px:-133.5,py:231.5,dx:4.2,dy:0,isNS:!0},{px:-133,py:202.5,dx:0,dy:4,isNS:!1}],A=[],z=[];for(const k of m){const L=s(k.px,k.py);h.push(o.entities.add({position:l(k.px,k.py,L+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:p}}),o.entities.add({position:l(k.px,k.py,L+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:u}}),o.entities.add({position:l(k.px+k.dx*.5,k.py+k.dy*.5,L+5.65),box:{dimensions:new b(Math.max(.14,Math.abs(k.dx)),Math.max(.14,Math.abs(k.dy)),.14),material:p}}));const G=y(k.px+k.dx*.78,k.py+k.dy*.78,L+5.1,k.isNS);(k.isNS?A:z).push(G)}const x=k=>({red:k[0].red,yellow:k[0].yellow,green:k[0].green,setState:L=>{for(const G of k)G.setState(L)}});return{ns:x(A),ew:x(z),setVisible(k){for(const L of h)L.show=k}}}h.push(o.entities.add({position:l(d,w,C+2.9),cylinder:{length:5.8,topRadius:.09,bottomRadius:.13,material:p}}),o.entities.add({position:l(d,w,C+1.2),cylinder:{length:.45,topRadius:.132,bottomRadius:.132,material:u}}));const g=4.6;h.push(o.entities.add({position:l(d-g*.5,w,C+5.65),box:{dimensions:new b(g,.14,.14),material:p}}),o.entities.add({position:l(d,w-g*.5,C+5.65),box:{dimensions:new b(.14,g,.14),material:p}}));const M=y(d-3.4,w,C+5.1,!0),D=y(d,w-3.4,C+5.1,!1);return{ns:M,ew:D,setVisible(m){for(const A of h)A.show=m}}}function Go(o,i,t,a,s){const l=(m,A,z)=>U.multiplyByPoint(i,new b(m,A,z),new b),h=[],d=Ht.fromColor(O.fromCssColorString("#f3f4f6").withAlpha(.92)),w=Ht.fromColor(O.fromCssColorString("#f5b800").withAlpha(.92)),C=(m,A,z,x,k,L)=>{if(a(m,A)<.8)return;const G=s(m,A)+.07;l(m,A,G);const Y=Tt.fromRotationZ(k),Z=U.fromRotationTranslation(Y,new b(m,A,G)),J=U.multiply(i,Z,new U);h.push(new go({geometry:vo.fromDimensions({dimensions:new b(z,x,.04)}),modelMatrix:J,attributes:{color:L}}))},p=Math.atan2(-51,380);for(const m of t){if(Math.abs(m.e+148.8)<12&&Math.abs(m.n-216.3)<12){const z=[{bx:-154,by:230,horiz:!0,ang:0},{bx:-164.5,by:221.5,horiz:!1,ang:p},{bx:-164.5,by:210.5,horiz:!1,ang:p},{bx:-154,by:202.5,horiz:!0,ang:0},{bx:-129,by:229,horiz:!1,ang:p},{bx:-128.5,by:211.5,horiz:!1,ang:p},{bx:-136.5,by:202.5,horiz:!0,ang:0}];for(const x of z)for(let k=-3;k<=3;k++){const L=x.horiz?x.bx+k*1.1:x.bx,G=x.horiz?x.by:x.by+k*1.05;C(L,G,x.horiz?.52:2.8,x.horiz?2.8:.52,x.ang,d)}continue}const A=[{de:0,dn:9.5,horiz:!0},{de:0,dn:-9.5,horiz:!0},{de:9.5,dn:0,horiz:!1},{de:-9.5,dn:0,horiz:!1}];for(const z of A){const x=m.e+z.de,k=m.n+z.dn;if(a(x,k)<1.2)continue;for(let Y=-3;Y<=3;Y++){const Z=z.horiz?x+Y*1.15:x,J=z.horiz?k:k+Y*1.15;C(Z,J,z.horiz?.52:2.8,z.horiz?2.8:.52,0,d)}const L=x+(z.de===0?0:Math.sign(z.de)*2.1),G=k+(z.dn===0?0:Math.sign(z.dn)*2.1);C(L,G,z.horiz?6.8:.42,z.horiz?.42:6.8,0,d)}}for(let m=-80;m<=440;m+=8)C(-154,m,.18,3.2,0,d),C(-132,m,.18,3.2,0,d);for(let m=-420;m<=160;m+=8){const A=263-(m+420)*.13421052631578947;C(m,A+7.5,3.2,.18,p,d),C(m,A-7.5,3.2,.18,p,d),C(m,A,4.5,.18,p,w)}for(let m=-160;m<=360;m+=8)C(158,m,.18,3.2,0,d);let f=null;h.length>0&&(f=new fo({geometryInstances:h,appearance:new mo({flat:!0,translucent:!0}),asynchronous:!1}),o.scene.primitives.add(f));const u=[],y=bt("pare"),g=bt("peaton"),M=bt("vel30"),D=O.fromCssColorString("#9ca3af");return t.forEach((m,A)=>{const z=[{e:m.e-7.2,n:m.n-7.2,tex:y},{e:m.e+7.2,n:m.n-7.2,tex:A%2===0?g:M}];for(const x of z){const k=s(x.e,x.n);u.push(o.entities.add({position:l(x.e,x.n,k+1.15),cylinder:{length:2.3,topRadius:.035,bottomRadius:.035,material:D}}),o.entities.add({position:l(x.e,x.n,k+2.45),billboard:{image:x.tex,width:.72,height:.72,sizeInMeters:!0,verticalOrigin:po.CENTER}}))}}),{setVisible(m){f&&(f.show=m);for(const A of u)A.show=m}}}function Xo(o,i){const t=(M,D,m)=>U.multiplyByPoint(i,new b(M,D,m),new b),a=[],d=O.fromCssColorString("#7a7771"),w=O.fromCssColorString("#3d3833"),C=O.fromCssColorString("#24471b"),p=O.fromCssColorString("#3d7f8f").withAlpha(.88),f=O.fromCssColorString("#ffbe55");a.push(o.entities.add({position:t(-225,263.5,4.17+.32),cylinder:{length:.64,topRadius:3.3,bottomRadius:3.6,material:d,slices:12}}),o.entities.add({position:t(-225,263.5,4.17+.56),cylinder:{length:.24,topRadius:3.45,bottomRadius:3.55,material:C,slices:12}}),o.entities.add({position:t(-225,263.5,4.17+.66),cylinder:{length:.08,topRadius:2.95,bottomRadius:2.95,material:p,slices:24}}),o.entities.add({position:t(-225,263.5,4.17+1.35),cylinder:{length:1.9,topRadius:.34,bottomRadius:.48,material:w}}),o.entities.add({position:t(-225,263.5,4.17+1.35),cylinder:{length:.18,topRadius:1.95,bottomRadius:1.55,material:w,slices:24}}),o.entities.add({position:t(-225,263.5,4.17+2.2),cylinder:{length:.16,topRadius:1.15,bottomRadius:.85,material:w,slices:24}}));let u=0;const y=new Ke(new Nt(()=>{const M=.62+.18*Math.sin(u*7);return O.fromCssColorString("#d9f4ff").withAlpha(M)},!1)),g=new Ke(new Nt(()=>{const M=.46+.16*Math.cos(u*5.5);return O.fromCssColorString("#bce8f7").withAlpha(M)},!1));a.push(o.entities.add({position:t(-225,263.5,4.17+2.85),cylinder:{length:1.25,topRadius:.08,bottomRadius:.36,material:y,slices:16}}),o.entities.add({position:t(-225,263.5,4.17+1.78),cylinder:{length:.85,topRadius:1.08,bottomRadius:1.22,material:g,slices:24}}),o.entities.add({position:t(-225,263.5,4.17+1.02),cylinder:{length:.72,topRadius:1.88,bottomRadius:2.08,material:g,slices:24}}));for(let M=-246;M<=-202;M+=8.5)a.push(o.entities.add({position:t(M,255.8,4.17+1.1),cylinder:{length:2.2,topRadius:.04,bottomRadius:.05,material:w}}),o.entities.add({position:t(M,255.8,4.17+2.3),ellipsoid:{radii:new b(.16,.16,.22),material:f}}));return{update(M){u=M},setVisible(M){for(const D of a)D.show=M}}}const at=["#e9e9e6","#d8d9db","#272a30","#4b5563","#8c9197","#b8bcc0","#7a1f1c","#27405f","#c9c2b4","#3b4a3f","#a33b2a"],Bt=["#2b4c7e","#991b1b","#1f2937","#3f6212","#7c2d12","#475569","#d97706","#f3f4f6"],Vt=3.2;async function Jo(o,i,t=110){const a=Ne.secciones;let s,l,h;try{s=await fetch(a+"vias_campo.json").then(n=>n.json());const e=new Uint8Array(await fetch(a+"vias_campo.bin").then(n=>n.arrayBuffer()));l=e.subarray(0,s.w*s.h),h=e.subarray(s.w*s.h)}catch{return null}const{cell:d,x0:w,y0:C,w:p,h:f}=s,u=(e,n)=>{const c=(e-w)/d-.5,r=(n-C)/d-.5,v=Math.floor(c),S=Math.floor(r);if(v<0||S<0||v>=p-1||S>=f-1)return 0;const R=c-v,F=r-S,T=S*p+v;return((l[T]*(1-R)+l[T+1]*R)*(1-F)+(l[T+p]*(1-R)+l[T+p+1]*R)*F)*.5},y=(e,n)=>{const c=Math.max(0,Math.min(p-1,Math.floor((e-w)/d))),r=Math.max(0,Math.min(f-1,Math.floor((n-C)/d))),v=r*p+c;if(l[v]>0)return h[v]*.1-2;let S=0,R=0;for(let F=-2;F<=2;F++){const T=r+F;if(!(T<0||T>=f))for(let _=-2;_<=2;_++){const q=c+_;if(q<0||q>=p)continue;const $=T*p+q;if(l[$]===0)continue;const ce=1/(_*_+F*F+.5);S+=ce,R+=(h[$]*.1-2)*ce}}return S>0?R/S:1},g=[],M=[],D=[];for(let e=2;e<f-2;e++)for(let n=2;n<p-2;n++){const c=e*p+n,r=w+(n+.5)*d,v=C+(e+.5)*d,S=Math.hypot(r+180,v-250);if(S>520)continue;const R=l[c]*.5;if(R>=2.6&&R<=5&&g.push(c),R>=6&&S<460&&D.push({e:r,n:v,d:R}),l[c]===0&&S<430){let F=!1;for(let T=-2;T<=2&&!F;T++)for(let _=-2;_<=2;_++)if(l[(e+T)*p+(n+_)]>0){F=!0;break}F&&M.push(c)}}if(!g.length)return null;D.sort((e,n)=>n.d-e.d);const m=[];for(const e of D){if(m.length>=6)break;if(m.some(r=>Math.hypot(r.e-e.e,r.n-e.n)<90))continue;const n=y(e.e,e.n),c=Yo(o,i,e.e,e.n,y);c.ns.setState("green"),c.ew.setState("red"),m.push({e:e.e,n:e.n,u:n,faseOffset:m.length*4.5,rig:c,nsEstado:"green",ewEstado:"red"})}const A=Go(o,i,m,u,y),z=Xo(o,i),x=(()=>{let e=12345;return()=>(e=e*1664525+1013904223>>>0)/4294967296})(),k=(e,n,c)=>{const r=Math.cos(c),v=Math.sin(c);if(e>=-168&&e<=-118&&Math.abs(v)>.35)return e<-143?v<-.2?12:-1e6:v>.2?12:-1e6;const S=263-(e+420)*(51/380);return Math.abs(n-S)<26&&Math.abs(r)>.35?n>S?r>.2?12:-1e6:r<-.2?12:-1e6:e>=-255&&e<=-210&&n<222&&Math.abs(v)>.35?v<-.2?10:-1e6:n<175&&e<-215&&Math.abs(r)>.35?r>.2?10:-1e6:e<-385&&n<265&&Math.abs(v)>.35?v<-.2?10:-1e6:0},L=[],G=(e,n,c)=>L.some(r=>r!==c&&Math.hypot(r.e-e,r.n-n)<8.5),Y=e=>{for(let n=0;n<45;n++){const c=g[Math.floor(x()*g.length)],r=w+(c%p+.5)*d,v=C+(Math.floor(c/p)+.5)*d;if(G(r,v,e))continue;let S=0,R=-1e9;for(let F=0;F<16;F++){const T=F/16*Math.PI*2,_=r+Math.cos(T)*10,q=v+Math.sin(T)*10,$=u(_,q),ce=k(_,q,T);if(ce<-1e4)continue;const Fe=u(r+Math.sin(T)*2.5,v-Math.cos(T)*2.5),fe=u(r-Math.sin(T)*2.5,v+Math.cos(T)*2.5),N=-Math.abs($-Vt)+(fe>Fe?1.5:0)+ce;$>1.5&&N>R&&(R=N,S=T)}if(R>-1e8){e.e=r,e.n=v,e.th=S,e.vActual=e.v*.5;return}}};for(let e=0;e<t;e++){const n=x(),c=n<.12?"sitp_azul":n<.2?"sitp_amarillo":n<.38?"taxi":n<.54?"moto":n<.68?"hatch":n<.84?"suv":"sedan",S={e:0,n:0,th:0,v:c==="moto"?8+x()*4.5:c==="sitp_azul"||c==="sitp_amarillo"?5.2+x()*3:6.5+x()*5,vActual:0,model:null,u:0,tipo:c};Y(S),L.push(S)}const Z=[];if(M.length>0)for(let e=0;e<42;e++){const n=M[Math.floor(x()*M.length)],c=w+(n%p+.5)*d,r=C+(Math.floor(n/p)+.5)*d;Z.push({e:c,n:r,th:x()*Math.PI*2,v:1.15+x()*.45,model:null,u:y(c,r)+.16,conPerro:e%3===0})}const J=[],we=(e,n,c,r,v,S,R,F=.68)=>{for(let T=0;T<v;T++){const _=v===1?(e+n)*.5:e+T/(v-1)*(n-e);for(let q=0;q<S;q++){if(x()>F)continue;const $=S===1?(c+r)*.5:c+q/(S-1)*(r-c);if(u(_,$)>.3)continue;const ce=x(),Fe=ce<.08?"taxi":ce<.42?"suv":"sedan",fe=x()<.5?0:Math.PI,N=y(_,$);J.push({e:_+(x()-.5)*.25,n:$+(x()-.5)*.25,u:N>-1.5?N:3.55,th:R+fe+(x()-.5)*.07,tipo:Fe,model:null})}}};we(92,134,-22,62,4,15,.05,.7),we(52,108,114,146,5,4,.12,.62),we(58,106,-104,-56,4,6,.1,.65),we(-132,-98,-46,32,3,12,.04,.68);const de=new b,Re=new Tt,Te=new U,re=(e,n=.08)=>{e.model&&(b.fromElements(e.e,e.n,e.u+n,de),Tt.fromRotationZ(e.th,Re),U.fromRotationTranslation(Re,de,Te),e.model.modelMatrix=U.multiply(i,Te,new U))},he={sedan:"carro.glb",suv:"carro_suv.glb",hatch:"carro_hatch.glb",taxi:"carro_taxi.glb",moto:"carro_moto.glb",sitp_azul:"sitp_azul.glb",sitp_amarillo:"sitp_amarillo.glb"},le=e=>e==="taxi"||e==="sitp_azul"||e==="sitp_amarillo",Ie=(async()=>{for(let e=0;e<L.length;e++){const n=L[e],c=he[n.tipo];try{const r=await Je.fromGltfAsync({url:a+c,upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,color:le(n.tipo)?O.WHITE:O.fromCssColorString(at[e%at.length]),colorBlendMode:vt.MIX,colorBlendAmount:le(n.tipo)?0:.32});o.scene.primitives.add(r),n.model=r,n.u=y(n.e,n.n),re(n)}catch{}e%6===5&&await new Promise(r=>setTimeout(r,35))}for(let e=0;e<Z.length;e++){const n=Z[e];try{const c=await Je.fromGltfAsync({url:a+(n.conPerro?"persona_perro.glb":"persona.glb"),upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,color:O.fromCssColorString(Bt[e%Bt.length]),colorBlendMode:vt.MIX,colorBlendAmount:.25});o.scene.primitives.add(c),n.model=c,re(n,0)}catch{}e%6===5&&await new Promise(c=>setTimeout(c,35))}for(let e=0;e<J.length;e++){const n=J[e],c=he[n.tipo];try{const r=await Je.fromGltfAsync({url:a+c,upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,color:le(n.tipo)?O.WHITE:O.fromCssColorString(at[e*3%at.length]),colorBlendMode:vt.MIX,colorBlendAmount:le(n.tipo)?0:.32});o.scene.primitives.add(r),n.model=r,re(n)}catch{}e%8===7&&await new Promise(r=>setTimeout(r,30))}})();let Ye=!0,_e=0;const pt=(e,n)=>u(e,n)===0&&u(e+4,n)+u(e-4,n)+u(e,n+4)+u(e,n-4)>.5;return{ready:Ie,count:t,debug:()=>L.map(e=>[Math.round(e.e),Math.round(e.n),+e.u.toFixed(1),e.model?1:0]),setVisible(e){Ye=e;for(const n of L)n.model&&(n.model.show=e);for(const n of J)n.model&&(n.model.show=e);for(const n of Z)n.model&&(n.model.show=e);for(const n of m)n.rig.setVisible(e);A.setVisible(e),z.setVisible(e)},update(e){if(!Ye)return;const n=Math.min(.08,Math.max(.001,e));_e+=n,z.update(_e);for(const c of m){const r=(_e+c.faseOffset)%24,v=r<10?"green":r<12?"yellow":"red",S=r>=12&&r<22?"green":r>=22?"yellow":"red";v!==c.nsEstado&&(c.nsEstado=v,c.rig.ns.setState(v)),S!==c.ewEstado&&(c.ewEstado=S,c.rig.ew.setState(S))}for(let c=0;c<L.length;c++){const r=L[c];if(!r.model)continue;let v=0,S=-1e9;for(let N=-4;N<=4;N++){const Q=N*.13,V=r.th+Q,ee=r.e+Math.cos(V)*9,te=r.n+Math.sin(V)*9,ue=u(ee,te);if(ue<1.1||u(r.e+Math.cos(V)*4.5,r.n+Math.sin(V)*4.5)<.9)continue;const He=k(ee,te,V);if(He<-1e4)continue;const B=u(ee+Math.sin(V)*2.5,te-Math.cos(V)*2.5),ae=u(ee-Math.sin(V)*2.5,te+Math.cos(V)*2.5),ze=-Math.abs(Math.min(ue,6)-Vt)-Math.abs(Q)*1.6+(ae>=B?.6:0)+He;ze>S&&(S=ze,v=Q)}if(S<-1e8||Math.hypot(r.e+180,r.n-250)>580){Y(r),r.u=y(r.e,r.n),re(r);continue}const R=Math.cos(r.th),F=Math.sin(r.th);let T=1;const _=r.tipo==="sitp_azul"||r.tipo==="sitp_amarillo",q=_?9.5:6.4,$=_?16.5:12.5;for(let N=0;N<L.length;N++){if(N===c||!L[N].model)continue;const Q=L[N],V=Q.e-r.e,ee=Q.n-r.n,te=V*V+ee*ee;if(te>320)continue;const ue=Q.tipo==="sitp_azul"||Q.tipo==="sitp_amarillo",me=q+(ue?3:0),He=$+(ue?3:0),B=V*R+ee*F,ae=Math.abs(-V*F+ee*R);if(B>0&&B<He&&ae<2.45){const ze=B<me?0:(B-me)/(He-me);ze<T&&(T=ze)}else te<(_||ue?42:22)&&N<c&&(T=0)}const ce=Math.abs(R)>Math.abs(F);for(const N of m){if((ce?N.ewEstado:N.nsEstado)==="green")continue;const V=N.e-r.e,ee=N.n-r.n,te=V*R+ee*F,ue=Math.abs(-V*F+ee*R);if(te>7&&te<21&&ue<9){const me=te<10.5?0:(te-10.5)/10.5;me<T&&(T=me)}}const Fe=1-Math.min(.55,Math.abs(v)*1.4),fe=r.v*Fe*T;if(r.vActual+=(fe-r.vActual)*Math.min(1,n*4.5),r.vActual>.05){r.th+=Math.max(-1.4*n,Math.min(1.4*n,v));const N=r.e+Math.cos(r.th)*r.vActual*n,Q=r.n+Math.sin(r.th)*r.vActual*n;u(N,Q)>=.7?(r.e=N,r.n=Q):r.th+=.6;const V=Math.max(y(r.e,r.n),y(r.e+Math.cos(r.th)*1.4,r.n+Math.sin(r.th)*1.4),y(r.e-Math.cos(r.th)*1.4,r.n-Math.sin(r.th)*1.4));r.u+=(V-r.u)*Math.min(1,n*8)}re(r)}for(const c of Z){if(!c.model)continue;const r=c.e+Math.cos(c.th)*c.v*n,v=c.n+Math.sin(c.th)*c.v*n;pt(r,v)&&Math.hypot(r+180,v-250)<430?(c.e=r,c.n=v,c.u+=(y(c.e,c.n)+.16-c.u)*Math.min(1,n*4)):c.th+=.9+x()*1.2,re(c,0)}}}}async function jt(o,i){try{const t=new Image;t.decoding="async",t.src=o,await t.decode();const a=document.createElement("canvas");a.width=t.naturalWidth,a.height=t.naturalHeight;const s=a.getContext("2d");s.drawImage(t,0,0);const l=s.getImageData(0,0,a.width,a.height);return new je({typedArray:new Uint8Array(l.data.buffer),width:a.width,height:a.height,repeat:!0,minificationFilter:ht.LINEAR_MIPMAP_LINEAR,magnificationFilter:ut.LINEAR})}catch{return new je({typedArray:new Uint8Array([...i,255]),width:1,height:1})}}function Ko(o,i){return new qe({uniforms:{uNight:{type:E.FLOAT,value:0},uLadrillo:{type:E.SAMPLER_2D,value:o},uTeja:{type:E.SAMPLER_2D,value:i}},varyings:{vRP:se.VEC3,vRN:se.VEC3},vertexShaderText:`
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
    `})}async function Zo(o,i){const t=Ne.secciones;let a;try{a=await fetch(t+"revit.json").then(u=>u.json())}catch{return null}const[s,l]=await Promise.all([jt(t+"tex_ladrillo.webp",[107,84,76]),jt(t+"tex_teja.webp",[90,52,28])]),h=Ko(s,l),d=[];for(const u of a.niveles)try{const y=await Je.fromGltfAsync({url:t+u.file,modelMatrix:i,upAxis:ge.Y,forwardAxis:ge.X,shadows:xe.ENABLED,backFaceCulling:!1,show:!1});y.customShader=h,y.imageBasedLighting.imageBasedLightingFactor=new Pe(.45,.25),o.scene.primitives.add(y),d.push({...u,model:y,off:0,target:0,delay:0,shown:!1})}catch(y){console.warn("Nivel de Revit no cargado",u.file,y)}if(!d.length)return null;const w=46,C=new U,p=u=>{const y=U.fromTranslation(new b(0,0,u.off),C);u.model.modelMatrix=U.multiply(i,y,new U)},f={niveles:d.map(u=>({i:u.i,nombre:u.nombre})),caja:a.caja,bloques:a.bloques??[],ready:!0,visible:!1,abierto:-1,play(){f.visible=!0,f.abierto=-1;const u=performance.now();d.forEach((y,g)=>{y.off=w,y.target=0,y.delay=u+g*620,y.shown=!1,y.model.show=!1,p(y)})},openAt(u){f.visible=!0,f.abierto=u;const y=performance.now();let g=0;for(const M of[...d].reverse())M.i>u&&(M.target=w,M.delay=y+g++*110);for(const M of d)M.i<=u&&(M.target=0,M.delay=y,M.shown||(M.off=w))},full(){f.visible=!0,f.abierto=-1;const u=performance.now();d.forEach((y,g)=>{(y.target!==0||!y.shown)&&(y.target=0,y.delay=u+g*110,y.shown||(y.off=w))})},hide(){f.visible=!1,f.abierto=-1;for(const u of d)u.model.show=!1,u.shown=!1,u.off=0,u.target=0},setNight(u){h.setUniform("uNight",u)},update(u,y){if(f.visible)for(const g of d){if(y<g.delay)continue;g.target===0&&!g.shown&&(g.shown=!0,g.model.show=!0);const M=g.target-g.off;if(Math.abs(M)<.01){g.off!==g.target&&(g.off=g.target,p(g)),g.target!==0&&g.shown&&(g.shown=!1,g.model.show=!1);continue}const D=g.target===0?1-Math.exp(-5.2*u):1-Math.exp(-4*u);g.off+=M*D,p(g)}}};return f}function $o(o,i){const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t);const a=document.createElement("aside");a.className="pisos",a.hidden=!0,a.innerHTML="<small>Pisos · modelo Revit</small>";const s=new Map,l=(d,w,C)=>{const p=document.createElement("button");p.innerHTML=`${w}<span>${C}</span>`,p.addEventListener("click",()=>i(d)),s.set(d,p),a.appendChild(p)};l(-1,"Edificio completo","");for(const d of[...o.niveles].reverse())l(d.i,d.nombre.charAt(0)+d.nombre.slice(1).toLowerCase(),`N${d.i+1}`);document.body.appendChild(a);const h=d=>s.forEach((w,C)=>w.classList.toggle("on",C===d));return h(-1),{show:d=>{a.hidden=!d},mark:h}}const it={dia:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},tarde:{sunIntensity:5.75,sunColor:"#ffe3c4",shadowDarkness:.38,aoIntensity:4,skyFill:.22,groundFill:.12,exposure:1.08,contrast:.39,saturation:.52,tintColor:"#dedede",vignette:.5,bloomBrightness:-.8,skyZenith:"#74777b",skyHorizon:"#c2c2d1",cloudDensity:.85,cloudSpeed:1,hazeAmount:0,hazeStart:2500},noche:{sunIntensity:.6,sunColor:"#6b8fd4",shadowDarkness:.85,aoIntensity:2.7,skyFill:.38,groundFill:.1,exposure:1.08,contrast:.41,saturation:.5,tintColor:"#bec7d5",vignette:.05,bloomBrightness:-.6,skyZenith:"#040611",skyHorizon:"#0a0f1f",cloudDensity:.24,cloudSpeed:.8,hazeAmount:.33,hazeStart:450}};function wt(o){const i=/^#?([0-9a-f]{6})$/i.exec(o.trim());if(!i)return[1,1,1];const t=parseInt(i[1],16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]}const Qo=[{title:"Sol y Sombras",items:[{key:"sunIntensity",label:"Intensidad sol",min:.2,max:6,step:.05,type:"range"},{key:"sunColor",label:"Color sol",type:"color"},{key:"shadowDarkness",label:"Luz en sombra",min:.05,max:.85,step:.01,type:"range"},{key:"aoIntensity",label:"Oclusión (AO)",min:0,max:4,step:.05,type:"range"},{key:"skyFill",label:"Relleno fachadas",min:0,max:.6,step:.01,type:"range"},{key:"groundFill",label:"Relleno suelo",min:0,max:.4,step:.01,type:"range"}]},{title:"Color y Cámara",items:[{key:"exposure",label:"Exposición",min:.6,max:1.6,step:.02,type:"range"},{key:"contrast",label:"Contraste",min:0,max:.6,step:.01,type:"range"},{key:"saturation",label:"Saturación",min:.4,max:1.6,step:.02,type:"range"},{key:"tintColor",label:"Tinte color",type:"color"},{key:"vignette",label:"Viñeta",min:0,max:.5,step:.01,type:"range"},{key:"bloomBrightness",label:"Bloom",min:-.8,max:.2,step:.02,type:"range"}]},{title:"Cielo, Nubes y Neblina",items:[{key:"skyZenith",label:"Cielo cenit",type:"color"},{key:"skyHorizon",label:"Cielo horizonte",type:"color"},{key:"cloudDensity",label:"Densidad nubes",min:0,max:1,step:.02,type:"range"},{key:"cloudSpeed",label:"Velocidad nubes",min:0,max:3,step:.05,type:"range"},{key:"hazeAmount",label:"Neblina",min:0,max:.5,step:.01,type:"range"},{key:"hazeStart",label:"Inicio neblina (m)",min:200,max:2500,step:50,type:"range"}]}];function ea(o){const i={dia:{...it.dia},tarde:{...it.tarde},noche:{...it.noche}};let t="dia";const a=document.createElement("button");a.id="btnLookStudio",a.className="look-toggle",a.textContent="⚙ Ajustar luz",a.title="Abrir editor de iluminación y color (L)",document.body.appendChild(a);const s=document.createElement("aside");s.id="lookPanel",s.className="look-panel",s.hidden=!0,s.innerHTML=`
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
  `,document.body.appendChild(s);const l=s.querySelector("#lpBody"),h=new Map;for(const f of Qo){const u=document.createElement("section");u.className="lp-sec";const y=document.createElement("h4");y.textContent=f.title,u.appendChild(y);for(const g of f.items){const M=document.createElement("label");M.className="lp-row";const D=document.createElement("span");D.className="lp-lbl",D.textContent=g.label,M.appendChild(D);const m=document.createElement("input");m.type=g.type,g.type==="range"&&(m.min=String(g.min),m.max=String(g.max),m.step=String(g.step));const A=g.type==="range"?document.createElement("span"):void 0;A&&(A.className="lp-val"),m.addEventListener("input",()=>{const x=i[t];if(g.type==="range"){const k=parseFloat(m.value);x[g.key]=k,A&&(A.textContent=g.step&&g.step>=1?String(Math.round(k)):k.toFixed(2))}else x[g.key]=m.value;o(t,x)});const z=document.createElement("div");z.className="lp-ctrl",z.appendChild(m),A&&z.appendChild(A),M.appendChild(z),u.appendChild(M),h.set(g.key,{input:m,val:A})}l.appendChild(u)}const d={dia:"Día · 10:10",tarde:"Tarde · 16:50",noche:"Noche · 19:35"};function w(){const f=i[t],u=s.querySelector("#lpPresetName");u&&(u.textContent=d[t]);for(const[y,{input:g,val:M}]of h){const D=f[y];if(g.value=String(D),M&&typeof D=="number"){const m=parseFloat(g.step||"0.01");M.textContent=m>=1?String(Math.round(D)):D.toFixed(2)}}}const C=()=>{s.hidden=!s.hidden,a.classList.toggle("on",!s.hidden)};a.addEventListener("click",C),s.querySelector("#lpClose")?.addEventListener("click",C);const p=s.querySelector("#lpCopy");return p.addEventListener("click",async()=>{const f=JSON.stringify({active:t,presets:i},null,2);try{await navigator.clipboard.writeText(f),p.textContent="¡JSON copiado!",setTimeout(()=>p.textContent="Copiar JSON",1800)}catch{prompt("Copia este JSON:",f)}}),s.querySelector("#lpReset")?.addEventListener("click",()=>{i[t]={...it[t]},w(),o(t,i[t])}),addEventListener("keydown",f=>{f.code==="KeyL"&&!f.ctrlKey&&!f.metaKey&&!f.altKey&&C()}),w(),{setActivePreset(f){t=f,w()},getPreset(f){return i[f]},toggle:C}}ko.defaultAccessToken=Ne.ionToken;const W=o=>document.getElementById(o),Pt=W("cesiumContainer"),Wt=W("loading"),ta=W("loadBar"),Qt=W("loadLabel"),oa=W("loadPct");function Ue(o,i){Qt.textContent=o;const t=Math.round(Math.max(0,Math.min(1,i))*100);ta.style.width=t+"%",oa.textContent=t+"%"}const X=new yo(Pt,{animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!1,infoBox:!1,selectionIndicator:!1,shadows:!0,terrainShadows:xe.RECEIVE_ONLY,terrain:bo.fromWorldTerrain({requestWaterMask:!1,requestVertexNormals:!0}),baseLayer:xo.fromProviderAsync(Kt.fromAssetId(Ne.imageryAssetId),{}),contextOptions:{webgl:{alpha:!1,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}},requestRenderMode:!1,useBrowserRecommendedResolution:!1}),I=X.scene;I.globe.enableLighting=!0;I.globe.showGroundAtmosphere=!0;I.globe.depthTestAgainstTerrain=!0;I.globe.maximumScreenSpaceError=2;I.fog.enabled=!1;I.fog.density=18e-5;I.fog.minimumBrightness=.04;I.highDynamicRange=!0;I.msaaSamples=4;I.postProcessStages.fxaa.enabled=!0;I.screenSpaceCameraController.enableCollisionDetection=!1;I.light=new wo({intensity:3,color:O.fromCssColorString("#fff4e3")});const Me=X.shadowMap;Me.softShadows=!0;Me.size=4096;Me.maximumDistance=1200;Me.darkness=.24;Me.normalOffset=!0;{const o=Me;o._primitiveBias.depthBias=8e-4,o._primitiveBias.normalOffsetScale=1.6,o._primitiveBias.normalShadingSmooth=.35}const Le=I.postProcessStages.ambientOcclusion;Le.enabled=!0;Le.uniforms.intensity=2.1;Le.uniforms.bias=.08;Le.uniforms.lengthCap=.35;Le.uniforms.stepSize=1.4;Le.uniforms.blurStepSize=1;const ke=I.postProcessStages.bloom;ke.enabled=!0;ke.uniforms.glowOnly=!1;ke.uniforms.contrast=128;ke.uniforms.brightness=-.36;ke.uniforms.delta=1;ke.uniforms.sigma=2.6;ke.uniforms.stepSize=1.5;const aa=Et(),Ct=o=>{const i=U.getColumn(aa,o,new Ve);return new b(i.x,i.y,i.z)},be=Fo(Ct(0),Ct(1),Ct(2));I.postProcessStages.add(be);const ye=Ho();I.postProcessStages.add(ye);X.camera.frustum.fov=Xt.toRadians(48);const qt=(()=>{try{const o=I.context._gl,i=o.getExtension("WEBGL_debug_renderer_info");return i?String(o.getParameter(i.UNMASKED_RENDERER_WEBGL)):""}catch{return""}})(),ia=/Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(qt)&&!/Arc/i.test(qt);let P=null,oe=ia||matchMedia("(pointer: coarse)").matches?.5:1;function et(){const o=Math.min(window.devicePixelRatio||1,2);X.resolutionScale=o*(oe>=1?1:oe>=.5?.8:.62),Me.size=oe>=1?4096:oe>=.5?2048:1024,Me.softShadows=oe>=.5,Le.enabled=oe>=1,ke.enabled=oe>=.5,I.msaaSamples=oe>=1?4:1,X.shadows=oe>=.5,P?.tileset&&(P.tileset.maximumScreenSpaceError=oe>=1?8:oe>=.5?12:20)}et();X.clock.shouldAnimate=!1;X.clock.currentTime=$e.fromIso8601("2026-06-21T16:50:00-05:00");const j=new Po(X),ft=o=>Ce(xt[o].e,xt[o].n,xt[o].u),na=ft("hotel");j.flyTo({pivot:na,heading:lt.general.heading,pitch:lt.general.pitch,range:lt.general.range*1.8},0);j.groundHeight=o=>I.globe.getHeight(o);const sa=[{id:"dia",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"10:10",sun:5.75,color:"#ffe3c4"},{id:"tarde",iso:"2026-06-21T16:50:00-05:00",night:.04,tarde:1,fog:22e-5,label:"16:50",sun:5.75,color:"#ffe3c4"},{id:"noche",iso:"2026-06-21T19:35:00-05:00",night:1,tarde:0,fog:22e-5,label:"19:35",sun:.6,color:"#6b8fd4"}];let ve=.04,Ee=1,Ae=null;const ra=o=>$e.toDate($e.fromIso8601(o)).getTime();function mt(o){I.light.intensity=o.sunIntensity,I.light.color=O.fromCssColorString(o.sunColor),Me.darkness=o.shadowDarkness,Le.uniforms.intensity=o.aoIntensity,ke.uniforms.brightness=o.bloomBrightness,ye.uniforms.uExposure=o.exposure,ye.uniforms.uContrast=o.contrast,ye.uniforms.uSaturation=o.saturation;const[i,t,a]=wt(o.tintColor);ye.uniforms.uTint=new b(i,t,a),ye.uniforms.uVignette=o.vignette;const[s,l,h]=wt(o.skyZenith);be.uniforms.uSkyZenith=new b(s,l,h);const[d,w,C]=wt(o.skyHorizon);be.uniforms.uSkyHorizon=new b(d,w,C),be.uniforms.uCloudDensity=o.cloudDensity,be.uniforms.uCloudSpeed=o.cloudSpeed,P?.setLook({skyFill:o.skyFill,groundFill:o.groundFill,hazeAmount:o.hazeAmount,hazeStart:o.hazeStart})}const dt=ea((o,i)=>mt(i));mt(dt.getPreset("dia"));be.uniforms.uNight=ve;be.uniforms.uTarde=Ee;ye.uniforms.uNight=ve;ye.uniforms.uTarde=Ee;I.skyAtmosphere&&(I.skyAtmosphere.hueShift=0,I.skyAtmosphere.saturationShift=.08,I.skyAtmosphere.brightnessShift=-.04);function la(o){Ae={from:$e.toDate(X.clock.currentTime).getTime(),to:ra(o.iso),start:performance.now(),dur:1600},I.fog.density=o.fog,dt.setActivePreset(o.id),mt(dt.getPreset(o.id)),I.skyAtmosphere&&(I.skyAtmosphere.hueShift=0,I.skyAtmosphere.saturationShift=o.id==="tarde"?.08:o.id==="noche"?-.25:.06,I.skyAtmosphere.brightnessShift=o.id==="noche"?-.55:o.id==="tarde"?-.04:0);const t=ve,a=Ee,s=performance.now(),l=()=>{const d=Math.min(1,(performance.now()-s)/1400),w=d*d*(3-2*d);ve=t+(o.night-t)*w,Ee=a+(o.tarde-a)*w,P?.setNight(ve),K?.setNight(ve),P?.setTarde(Ee),be.uniforms.uNight=ve,be.uniforms.uTarde=Ee,ye.uniforms.uNight=ve,ye.uniforms.uTarde=Ee,d<1&&requestAnimationFrame(l)};requestAnimationFrame(l),document.querySelectorAll("[data-light]").forEach(d=>d.classList.toggle("on",d.dataset.light===o.id));const h=W("clockLabel");h&&(h.textContent=o.label)}document.querySelectorAll("[data-light]").forEach(o=>{o.addEventListener("click",()=>{const i=sa.find(t=>t.id===o.dataset.light);i&&la(i)})});let Be=!1;const zt=W("btnOrbit"),Lt=W("btnPedestrian");function Se(){Be=!1,zt?.classList.remove("on")}function tt(o,i=2){Se();const t=lt[o];j.flyTo({pivot:ft(t.place),heading:t.heading,pitch:t.pitch,range:t.range},i)}W("btnHome")?.addEventListener("click",()=>tt("general",2.2));W("btnAerial")?.addEventListener("click",()=>tt("aerial"));W("btnArch")?.addEventListener("click",()=>tt("arch"));Lt?.addEventListener("click",()=>{Se(),j.isWalking?j.exitWalk():j.enterWalk(ne?oo(ne):void 0)});j.onModeChange=o=>{Lt?.classList.toggle("on",o);const i=W("hint");i&&o&&(i.textContent="Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto",i.classList.remove("fade"),setTimeout(()=>i.classList.add("fade"),7e3))};document.querySelectorAll("[data-place]").forEach(o=>{o.addEventListener("click",()=>{Se();const i=o.dataset.place;if(i==="hotel"&&P){const t=P.buildings.find(a=>a.s==="Hotel");if(t){We(null),We(t);return}}j.flyTo({pivot:ft(i),range:i==="hotel"?300:520,pitch:-.5},2)})});zt?.addEventListener("click",()=>{Be=!Be,zt.classList.toggle("on",Be),Be&&j.isWalking&&j.exitWalk()});Pt.addEventListener("pointerdown",Se);Pt.addEventListener("wheel",Se,{passive:!0});addEventListener("keydown",o=>{o.code==="Escape"&&(j.isWalking?j.exitWalk():We(null)),(o.code==="KeyH"||o.code==="Home")&&tt("general",2.2),o.code==="KeyP"&&Lt?.click()});let ne=null,Ze=null;const ca=9;let ct=null,K=null,Oe=null,At=!1,nt=null;function eo(){return nt||(nt=(async()=>{P&&(K=await Zo(X,P.matrix),K&&(K.setNight(ve),Oe=$o(K,o=>{if(!K)return;Se(),Oe?.mark(o),o<0?K.full():K.openAt(o);const i=K.caja;j.flyTo({pivot:Ce((i[0]+i[2])/2,(i[1]+i[3])/2,12),pitch:o<0?-.42:-.95,range:o<0?230:150},1.4)}),At&&(At=!1,Rt(),pe&&(X.entities.remove(pe),pe=null))))})(),nt)}function Rt(){!P||!K||(P.setRevitBlocks(K.bloques),K.play(),Oe?.mark(-1),Oe?.show(!0))}function to(){P&&(ct={start:performance.now()},P.setHotelFloors(0))}let pe=null;const st=W("card");function da(o){return Ce((o.bb[0]+o.bb[2])/2,(o.bb[1]+o.bb[3])/2,o.b+o.h*.5)}function oo(o){return Ce((o.bb[0]+o.bb[2])/2,o.bb[1]-9,o.b)}function We(o){const i=ne?.s==="Hotel";if(ne=o,pe&&(X.entities.remove(pe),pe=null),!o||!P){st&&(st.hidden=!0),Oe?.show(!1);return}o.s!=="Hotel"?Oe?.show(!1):K?.visible&&Oe?.show(!0);const t=o.r.map(([f,u])=>Ce(f,u,0,P.matrix)),a=2572+o.b-.5;pe=X.entities.add({polygon:{hierarchy:new Mo(t),height:a,extrudedHeight:a+o.h+2.2,material:O.fromCssColorString("#9dc4ea").withAlpha(.2),outline:!0,outlineColor:O.fromCssColorString("#d7ebff"),shadows:xe.DISABLED}});const s=o.s==="Hotel";s&&!i&&(K?(Rt(),pe&&(X.entities.remove(pe),pe=null)):(At=!0,eo(),to()),Se(),j.flyTo({pivot:ft("hotel"),pitch:-.38,range:290},1.8));const l=s&&P?P.buildings.filter(f=>f.s==="Hotel"):[o],h=f=>Math.abs(f.r.reduce((u,y,g)=>{const M=f.r[(g+1)%f.r.length];return u+y[0]*M[1]-M[0]*y[1]},0)/2),d=l.reduce((f,u)=>f+h(u),0),w=l.reduce((f,u)=>f+h(u)*u.p,0),C=Math.max(...l.map(f=>f.p)),p=Math.max(...l.map(f=>f.h));Math.abs(o.r.reduce((f,u,y)=>{const g=o.r[(y+1)%o.r.length];return f+u[0]*g[1]-g[0]*u[1]},0)/2),W("cardKind").textContent=s?"Proyecto":`Sector ${o.s}`,W("cardTitle").textContent=s?"Hotel La Fontana":`Edificación ${o.id+1}`,W("cardData").innerHTML=`<dt>Pisos</dt><dd>${s?"hasta "+C:o.p}</dd><dt>Altura</dt><dd>${p.toFixed(1)} m</dd><dt>Huella</dt><dd>${Math.round(d).toLocaleString("es-CO")} m²</dd><dt>Área aprox.</dt><dd>${Math.round(w).toLocaleString("es-CO")} m²</dd>`,st&&(st.hidden=!1)}j.onPick=o=>{P&&We(o?P.buildingAt(o):null)};W("cardClose")?.addEventListener("click",()=>We(null));W("cardFocus")?.addEventListener("click",()=>{if(!ne)return;Se();const o=Math.max(ne.bb[2]-ne.bb[0],ne.bb[3]-ne.bb[1],ne.h);j.flyTo({pivot:da(ne),pitch:-.42,range:Math.max(60,o*2.1)},1.7)});W("cardWalk")?.addEventListener("click",()=>{ne&&(Se(),j.enterWalk(oo(ne)))});const Mt=W("status"),Yt=W("statusText");async function ua(){const o=performance.now()+25e3;let i=0;for(;performance.now()<o;){const t=I.globe.tilesLoaded,a=!P?.tileset||P.tileset.tilesLoaded;if(t&&a){if(i||(i=performance.now()),performance.now()-i>=600)break}else i=0;await new Promise(s=>setTimeout(s,150))}for(let t=0;t<8;t++)await new Promise(a=>requestAnimationFrame(a))}async function ha(){Ue("Cargando el modelo del hotel...",.05),await new Promise(t=>setTimeout(t,30)),P=await Vo(X,(t,a)=>Ue(t,.05+a*.2),(t,a,s)=>{Ue(`Cargando secciones (${t}/${a}) · ${s}`,.25+t/Math.max(1,a)*.45),!(!Mt||!Yt)&&(Mt.hidden=!1,Yt.textContent=t<a?`Cargando secciones ${t}/${a} · ${s}`:`Modelo completo · ${a} secciones`,t>=a&&setTimeout(()=>Mt.classList.add("fade"),2600))}),P.setNight(ve),P.setTarde(Ee),eo();const o=document.querySelector("[data-light].on")?.dataset.light||"dia";mt(dt.getPreset(o)),et(),tt("general",0),await P.done,Ue("Cargando tráfico y parqueaderos...",.78),Ze=await Jo(X,P.matrix),Ze&&await Ze.ready,window.__ALL__=!0,Ue("Renderizando texturas y 3D Tiles...",.9),await ua(),Ue("Listo",1),Wt.classList.add("done"),setTimeout(()=>Wt.remove(),900);const i=W("hint");i&&setTimeout(()=>i.classList.add("fade"),9e3),window.__READY__=!0}const ie={fps:0,frames:0,t0:performance.now(),low:0};window.__DBG__={Cesium:Co,viewer:X,cam:j,getSite:()=>P,enuToWorld:Ce,select:We,stats:ie,playHotel:to,playRevit:Rt,getRevit:()=>K,getTrafico:()=>Ze,setQuality:o=>{oe=o,et()}};ha().catch(o=>{console.error(o),Qt.textContent="No se pudo cargar la escena",window.__LOAD_ERROR__=String(o?.message??o)});let Gt=performance.now(),kt=0;function ao(){const o=performance.now(),i=Math.min(.1,(o-Gt)/1e3);if(Gt=o,Ae){const a=Math.min(1,(o-Ae.start)/Ae.dur),s=a<.5?4*a*a*a:1-Math.pow(-2*a+2,3)/2;X.clock.currentTime=$e.fromDate(new Date(Ae.from+(Ae.to-Ae.from)*s)),a>=1&&(Ae=null)}if(ct&&P){const a=(o-ct.start)/550,s=Math.floor(a),l=a-s,h=1-Math.pow(1-Math.min(1,l*1.6),3);s>=ca?(P.setHotelFloors(99),ct=null):P.setHotelFloors(s+h)}K?.update(i,o),Ze?.update(i);const t=o*.001;if(P?.setTime(t),be.uniforms.uTime=t,Be&&!j.isWalking&&j.flyTo({heading:j.state.heading+.16*i},0),j.update(i),ie.frames++,o-ie.t0>=2e3){ie.fps=Math.round(ie.frames*1e3/(o-ie.t0)),ie.frames=0,ie.t0=o,window.__FPS__=ie.fps;const a=!!P&&P.sections.loaded>=P.sections.total&&o-kt>8e3;P&&P.sections.loaded>=P.sections.total&&!kt&&(kt=o),a&&document.visibilityState==="visible"&&(ie.fps<20&&oe>.25&&!window.__DBG__.lock?++ie.low>=3&&(oe=oe>=1?.5:.25,ie.low=0,et()):ie.low=0)}requestAnimationFrame(ao)}requestAnimationFrame(ao);addEventListener("resize",et);
