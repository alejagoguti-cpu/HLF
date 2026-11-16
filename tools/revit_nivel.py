# -*- coding: utf-8 -*-
# Exporta la geometria arquitectonica de UN nivel de Revit a JSON (solo lectura).
# El nivel se lee de build/revit/_nivel.txt. Salida: build/revit/nivel_<i>.json
# { nivel, elev_m, cats: { muros: {V:[x,y,z...] (m, coords internas de Revit), T:[i,j,k...]}, ... } }
from Autodesk.Revit.DB import *
import json, io
OUT = r"C:\Users\aleja\HLF\build\revit"
IDX = int(io.open(OUT + r"\_nivel.txt", encoding="utf-8").read().strip())
lv = sorted([(l.Elevation, l.Name) for l in FilteredElementCollector(doc).OfClass(Level)])
CATS = [("muros", BuiltInCategory.OST_Walls), ("losas", BuiltInCategory.OST_Floors), ("cubiertas", BuiltInCategory.OST_Roofs),
        ("ventanas", BuiltInCategory.OST_Windows), ("puertas", BuiltInCategory.OST_Doors), ("paneles", BuiltInCategory.OST_CurtainWallPanels),
        ("montantes", BuiltInCategory.OST_CurtainWallMullions), ("barandas", BuiltInCategory.OST_StairsRailing),
        ("columnas", BuiltInCategory.OST_StructuralColumns), ("escaleras", BuiltInCategory.OST_Stairs), ("vigas", BuiltInCategory.OST_StructuralFraming)]
opt = Options(); opt.DetailLevel = ViewDetailLevel.Coarse; opt.ComputeReferences = False; opt.IncludeNonVisibleObjects = False
F = 0.3048
def nivel_de(z):
    k = 0
    for i, (el, n) in enumerate(lv):
        if z >= el - 1.0: k = i
    return k
def volcar(geo, V, T):
    for g in geo:
        if isinstance(g, Solid):
            if g.Faces.Size == 0: continue
            for f in g.Faces:
                m = f.Triangulate()
                if m is None: continue
                base = len(V) // 3
                for p in m.Vertices: V.extend((round(p.X * F, 3), round(p.Y * F, 3), round(p.Z * F, 3)))
                for i in range(m.NumTriangles):
                    t = m.get_Triangle(i)
                    T.extend((base + int(t.get_Index(0)), base + int(t.get_Index(1)), base + int(t.get_Index(2))))
        elif isinstance(g, GeometryInstance):
            volcar(g.GetInstanceGeometry(), V, T)
        elif isinstance(g, Mesh):
            base = len(V) // 3
            for p in g.Vertices: V.extend((round(p.X * F, 3), round(p.Y * F, 3), round(p.Z * F, 3)))
            for i in range(g.NumTriangles):
                t = g.get_Triangle(i)
                T.extend((base + int(t.get_Index(0)), base + int(t.get_Index(1)), base + int(t.get_Index(2))))
res = {"nivel": lv[IDX][1], "elev_m": round(lv[IDX][0] * F, 3), "cats": {}}
rep = {}; fallos = 0
for name, c in CATS:
    V = []; T = []; n = 0
    for e in FilteredElementCollector(doc).OfCategory(c).WhereElementIsNotElementType().ToElements():
        bb = e.get_BoundingBox(None)
        if bb is None or nivel_de(bb.Min.Z) != IDX: continue
        try:
            geo = e.get_Geometry(opt)
            if geo is not None:
                volcar(geo, V, T); n += 1
        except Exception as ex:
            fallos += 1
    if n:
        res["cats"][name] = {"V": V, "T": T}
        rep[name] = [n, len(T) // 3]
with io.open(OUT + r"\nivel_%d.json" % IDX, "w", encoding="utf-8") as fh:
    fh.write(json.dumps(res, separators=(",", ":")))
__output__ = {"nivel": lv[IDX][1], "elementos_tris": rep, "fallos": fallos}
