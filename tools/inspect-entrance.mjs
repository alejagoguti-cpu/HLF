import { readFileSync, existsSync } from 'node:fs';

const A = JSON.parse(readFileSync('build/revit/alineacion.json', 'utf8'));
const TH = (A.th * Math.PI) / 180, CT = Math.cos(TH), ST = Math.sin(TH);
const S = 1.000614, AA = (0.0849 * Math.PI) / 180, CA = Math.cos(AA), SA = Math.sin(AA);

const toEnu = ([rx, ry, rz]) => {
  const X = (rx - A.rx) * CT - (ry - A.ry) * ST;
  const Y = (rx - A.rx) * ST + (ry - A.ry) * CT;
  const mx = X + A.cx, my = Y + A.cy;
  const e = (mx * CA - my * SA) * S;
  const n = (mx * SA + my * CA) * S;
  const u = rz + A.z;
  return [e, n, u];
};

const nWall = (e) => 277.20 + (e - (-241.31)) * (6.58 / 33.98);

const canopy = {};
for (let lvl = 0; lvl <= 2; lvl++) {
  const f = `build/revit/nivel_${lvl}.json`;
  if (!existsSync(f)) continue;
  const d = JSON.parse(readFileSync(f, 'utf8'));
  for (const [cat, m] of Object.entries(d.cats)) {
    for (let t = 0; t < m.T.length; t += 3) {
      const v = [0, 1, 2].map((k) => toEnu([m.V[m.T[t + k] * 3], m.V[m.T[t + k] * 3 + 1], m.V[m.T[t + k] * 3 + 2]]));
      const ce = (v[0][0] + v[1][0] + v[2][0]) / 3;
      const cn = (v[0][1] + v[1][1] + v[2][1]) / 3;
      const cu = (v[0][2] + v[1][2] + v[2][2]) / 3;
      if (ce >= -227 && ce <= -212 && cu >= 4.0 && cu <= 8.5) {
        if (cn <= nWall(ce) + 0.15) {
          canopy[`Lvl ${lvl} ${cat}`] = (canopy[`Lvl ${lvl} ${cat}`] || 0) + 1;
        }
      }
    }
  }
}
console.log('Outside facade in entrance canopy zone:', canopy);
