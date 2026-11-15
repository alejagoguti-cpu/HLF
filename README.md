# UNICENTRO · Visor 3D

Visor web en tiempo real de la escena urbana del proyecto Unreal **MyProject3**
(UNICENTRO / contexto andino), reconstruida como glTF y renderizada con Three.js.

## Qué incluye

- Geometría real exportada desde Unreal (`Content/Main.fbx` → `public/models/unicentro.glb`).
- Iluminación física: cielo Preetham, sol direccional con sombras suaves, IBL (PMREM).
- Materiales PBR por tipología (asfalto, concreto, ladrillo, teja, fachada, vidrio, agua, vegetación).
- Horizonte andino procedural + niebla atmosférica.
- Cámara: **orbitar** (arrastrar), **zoom** (rueda), **avanzar** (WASD), altura (Q/E), turbo (Shift).
- Post-proceso: bloom discreto, grading y antialiasing (SMAA).

## Desarrollo

```bash
npm install
npx serve .        # o cualquier servidor estático
```

Abre `http://localhost:3000`.

## Estructura

```
index.html
src/main.js      # escena, luces, cámara, post-proceso
src/style.css
public/models/   # unicentro.glb (generado)
```

## Regenerar el modelo

Desde la raíz del proyecto Unreal:

```bash
FBX2glTF.exe -i "Content/Main.fbx" -o "unicentro" -b -d --pbr-metallic-roughness
```

El resultado se copia a `public/models/unicentro.glb`.
