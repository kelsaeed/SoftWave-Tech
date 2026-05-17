// Removes the white background from the droplet image by flood-filling
// from the borders, so the droplet's own highlights stay intact.
import { readFileSync, writeFileSync } from 'node:fs'
import { PNG } from 'pngjs'

const src = '../public/assets/water/water-drop.png'
const out = '../public/assets/water/water-drop-clear.png'

const png = PNG.sync.read(readFileSync(src))
const { width: w, height: h, data } = png

const idx = (x, y) => (y * w + x) * 4
const isBg = (i) => {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  // near-white and not very colourful = background
  const min = Math.min(r, g, b)
  return min > 225 && Math.max(r, g, b) - min < 26
}

const seen = new Uint8Array(w * h)
const stack = []
for (let x = 0; x < w; x++) {
  stack.push([x, 0], [x, h - 1])
}
for (let y = 0; y < h; y++) {
  stack.push([0, y], [w - 1, y])
}

while (stack.length) {
  const [x, y] = stack.pop()
  if (x < 0 || y < 0 || x >= w || y >= h) continue
  const p = y * w + x
  if (seen[p]) continue
  const i = idx(x, y)
  if (!isBg(i)) continue
  seen[p] = 1
  data[i + 3] = 0 // transparent
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
}

// soften the cut edge a touch
for (let y = 1; y < h - 1; y++) {
  for (let x = 1; x < w - 1; x++) {
    const i = idx(x, y)
    if (data[i + 3] === 0) continue
    let clear = 0
    if (data[idx(x + 1, y) + 3] === 0) clear++
    if (data[idx(x - 1, y) + 3] === 0) clear++
    if (data[idx(x, y + 1) + 3] === 0) clear++
    if (data[idx(x, y - 1) + 3] === 0) clear++
    if (clear) data[i + 3] = Math.min(data[i + 3], 255 - clear * 55)
  }
}

writeFileSync(out, PNG.sync.write(png))
console.log('wrote', out)
