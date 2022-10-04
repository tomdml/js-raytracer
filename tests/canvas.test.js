const { Canvas } = require('../src/canvas')
const { color } = require('../src/color')

test('creating a canvas', () => {
	const c = new Canvas(10, 20)
	expect(c.width).toBe(10)
	expect(c.height).toBe(20)
})

test('writing pixels to a canvas', () => {
	const c = new Canvas(10, 20)
	const red = color(1, 0, 0)
	c.write_pixel(2, 3, red)
	expect(c.pixel_at(2, 3)).toBe(red)
})

test('constructing the PPM header', () => {
	const c = new Canvas(5, 3)
	let ppm_header = c._ppm_header()
	expect(ppm_header).toMatch(/^P3\n5 3\n255?/)
})

test('constructing the PPM pixel data', () => {
	const c = new Canvas(5, 3)
	const c1 = color(1.5, 0, 0)
	const c2 = color(0, 0.5, 0)
	const c3 = color(-0.5, 0, 1)

	c.write_pixel(0, 0, c1)
	c.write_pixel(2, 1, c2)
	c.write_pixel(4, 2, c3)
	const ppm_body = c._ppm_body()

	expect(ppm_body).toMatch(`255 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 128 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 255`)
})

test('PPM files are terminated by a newline character', () => {
	const c = new Canvas(5, 3)
	let ppm = c.to_ppm()
	expect(ppm).toMatch(/^.*\n/)
})