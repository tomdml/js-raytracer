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