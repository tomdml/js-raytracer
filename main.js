const fs = require('fs')
const { exec } = require("child_process")

const { point } = require('./src/tuple')
const { ray } = require('./src/ray')
const { Canvas } = require('./src/canvas')
const { color } = require('./src/color')
const { sphere } = require('./src/sphere')

const origin = point(0, 0, -5)
const wall_z = 10
const wall_size = 7
const canvas_pixels = 100
const half = wall_size / 2
const pixel_size = wall_size / canvas_pixels

const canvas = new Canvas(100, 100)
const red = color(1, 0, 0)
const shape = sphere()

for (const y of Array(canvas_pixels).keys()) {
	const world_y = half - pixel_size * y
	for (const x of Array(canvas_pixels).keys()) {
		const world_x = -half + pixel_size * x

		const position = point(world_x, world_y, wall_z)

		const r = ray(origin, position.sub(origin).norm)
		const xs = shape.intersect(r)
		if (xs.hit) canvas.write_pixel(x, y, red)
	}

}

fs.writeFileSync('/tmp/rt-output.ppm', canvas.to_ppm())
exec("open /tmp/rt-output.ppm")