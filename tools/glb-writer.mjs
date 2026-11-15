/** Escritor GLB mínimo (un buffer, primitivas indexadas, imágenes embebidas). */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export class Glb {
  constructor() {
    this.chunks = [];
    this.len = 0;
    this.j = {
      asset: { version: '2.0', generator: 'HLF build' },
      scene: 0,
      scenes: [{ nodes: [] }],
      nodes: [],
      meshes: [],
      materials: [],
      accessors: [],
      bufferViews: [],
      extensionsUsed: [],
      extensionsRequired: [],
    };
  }

  view(buf, target) {
    const pad = (4 - (this.len % 4)) % 4;
    if (pad) { this.chunks.push(Buffer.alloc(pad)); this.len += pad; }
    const bv = { buffer: 0, byteOffset: this.len, byteLength: buf.byteLength };
    if (target) bv.target = target;
    this.chunks.push(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength));
    this.len += buf.byteLength;
    this.j.bufferViews.push(bv);
    return this.j.bufferViews.length - 1;
  }

  /** arr: TypedArray; type: 'VEC3'… ; opts: {target, minmax, normalized} */
  acc(arr, type, opts = {}) {
    const n = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[type];
    const ct = arr instanceof Float32Array ? 5126 : arr instanceof Uint32Array ? 5125 : arr instanceof Uint16Array ? 5123 : 5121;
    const a = { bufferView: this.view(arr, opts.target), componentType: ct, count: arr.length / n, type };
    if (opts.normalized) a.normalized = true;
    if (opts.minmax) {
      const mn = new Array(n).fill(Infinity), mx = new Array(n).fill(-Infinity);
      for (let i = 0; i < arr.length; i++) {
        const k = i % n;
        if (arr[i] < mn[k]) mn[k] = arr[i];
        if (arr[i] > mx[k]) mx[k] = arr[i];
      }
      a.min = mn; a.max = mx;
    }
    this.j.accessors.push(a);
    return this.j.accessors.length - 1;
  }

  use(ext, required = true) {
    if (!this.j.extensionsUsed.includes(ext)) this.j.extensionsUsed.push(ext);
    if (required && !this.j.extensionsRequired.includes(ext)) this.j.extensionsRequired.push(ext);
  }

  image(bytes, mimeType) {
    this.j.images ??= [];
    this.j.textures ??= [];
    this.j.samplers ??= [{ magFilter: 9729, minFilter: 9987, wrapS: 33071, wrapT: 33071 }];
    this.j.images.push({ bufferView: this.view(bytes), mimeType });
    const src = this.j.images.length - 1;
    if (mimeType === 'image/webp') {
      this.use('EXT_texture_webp');
      this.j.textures.push({ sampler: 0, extensions: { EXT_texture_webp: { source: src } } });
    } else this.j.textures.push({ sampler: 0, source: src });
    return this.j.textures.length - 1;
  }

  write(path) {
    const j = this.j;
    if (!j.extensionsUsed.length) delete j.extensionsUsed;
    if (!j.extensionsRequired.length) delete j.extensionsRequired;
    const pad = (4 - (this.len % 4)) % 4;
    if (pad) { this.chunks.push(Buffer.alloc(pad)); this.len += pad; }
    j.buffers = [{ byteLength: this.len }];
    let js = Buffer.from(JSON.stringify(j), 'utf8');
    if (js.length % 4) js = Buffer.concat([js, Buffer.alloc(4 - (js.length % 4), 0x20)]);
    const head = Buffer.alloc(20);
    head.writeUInt32LE(0x46546c67, 0); head.writeUInt32LE(2, 4);
    head.writeUInt32LE(28 + js.length + this.len, 8);
    head.writeUInt32LE(js.length, 12); head.writeUInt32LE(0x4e4f534a, 16);
    const bh = Buffer.alloc(8);
    bh.writeUInt32LE(this.len, 0); bh.writeUInt32LE(0x004e4942, 4);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, Buffer.concat([head, js, bh, ...this.chunks]));
    return 28 + js.length + this.len;
  }
}
