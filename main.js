const fs = require('fs')
const { exec } = require('child_process')

const { point } = require('./src/tuple')
const { ray } = require('./src/ray')
const { Canvas } = require('./src/canvas')
const { color } = require('./src/color')
const { sphere } = require('./src/sphere')
const { material } = require('./src/materials')
const { pointLight } = require('./src/light')

const origin = point(0, 0, -5)
const wallZ = 10
const wallSize = 7
const canvasPixels = 100
const half = wallSize / 2
const pixelSize = wallSize / canvasPixels

const canvas = new Canvas(canvasPixels, canvasPixels)
const shape = sphere({ _material: material({ _color: color(1, 0.2, 1) }) })
const light = pointLight(point(-10, 10, -10), color(1, 1, 1))

for (const y of Array(canvasPixels).keys()) {
  const worldY = half - pixelSize * y
  for (const x of Array(canvasPixels).keys()) {
    const worldX = -half + pixelSize * x

    const position = point(worldX, worldY, wallZ)

    const r = ray(origin, position.sub(origin).norm)
    const xs = shape.intersect(r)
    if (xs.hit) {
      const p = r.position(xs.hit.t)
      const normal = xs.hit.object.normal_at(p)
      const eye = r.direction.neg()
      const c = xs.hit.object.material.lighting(light, p, eye, normal)
      canvas.write_pixel(x, y, c)
    }
  }
}

fs.writeFileSync('/tmp/rt-output.ppm', canvas.to_ppm())
exec('open /tmp/rt-output.ppm')
