const fs = require('fs')
const { exec } = require('child_process')

const { point } = require('./src/tuple')
const { ray } = require('./src/ray')
const { Canvas } = require('./src/canvas')
const { color } = require('./src/color')
const { sphere } = require('./src/sphere')
const { material } = require('./src/materials')
const { point_light } = require('./src/light')

const origin = point(0, 0, -5)
const wall_z = 10
const wall_size = 7
const canvas_pixels = 500
const half = wall_size / 2
const pixel_size = wall_size / canvas_pixels

const canvas = new Canvas(canvas_pixels, canvas_pixels)
const red = color(1, 0, 0)
const shape = sphere()
shape.material = material(color(1, 0.2, 1))

const light = point_light(point(-10, 10, -10), color(1, 1, 1))

for (const y of Array(canvas_pixels).keys()) {
  const world_y = half - pixel_size * y
  for (const x of Array(canvas_pixels).keys()) {
    const world_x = -half + pixel_size * x

    const position = point(world_x, world_y, wall_z)

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
