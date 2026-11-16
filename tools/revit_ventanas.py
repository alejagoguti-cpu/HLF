# -*- coding: utf-8 -*-
# Ventanas de Revit: caja, orientacion y nivel (solo lectura) -> build/revit/ventanas.json
from Autodesk.Revit.DB import *
import json, io
F = 0.3048
lv = sorted([(l.Elevation, l.Name) for l in FilteredElementCollector(doc).OfClass(Level)])
def nivel_de(z):
    k = 0
    for i, (el, n) in enumerate(lv):
        if z >= el - 1.0: k = i
    return k
out = []
for e in FilteredElementCollector(doc).OfCategory(BuiltInCategory.OST_Windows).WhereElementIsNotElementType().ToElements():
    bb = e.get_BoundingBox(None)
    if bb is None: continue
    try:
        f = e.FacingOrientation
        h = e.HandOrientation
    except Exception:
        continue
    out.append({"n": nivel_de(bb.Min.Z), "min": [round(bb.Min.X*F,3), round(bb.Min.Y*F,3), round(bb.Min.Z*F,3)],
                "max": [round(bb.Max.X*F,3), round(bb.Max.Y*F,3), round(bb.Max.Z*F,3)],
                "f": [round(f.X,4), round(f.Y,4)], "h": [round(h.X,4), round(h.Y,4)]})
with io.open(r"C:\Users\aleja\HLF\build\revit\ventanas.json", "w", encoding="utf-8") as fh:
    fh.write(json.dumps(out))
__output__ = {"ventanas": len(out)}
