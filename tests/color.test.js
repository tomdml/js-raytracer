const {color} = require('../src/color')

test('colors are (red, green, blue) tuples', () => {
	const c = color(-0.5, 0.4, 1.7)
	expect(c.r).toBe(-0.5)
	expect(c.g).toBe(0.4)
	expect(c.b).toBe(1.7)
})

test('adding colors', () => {
	const c1 = color(0.9, 0.6, 0.75)
	const c2 = color(0.7, 0.1, 0.25)
	expect(c1.add(c2)).toStrictEqual(color(1.6, 0.7, 1.0))
})

test('subtracting colors', () => {
	const c1 = color(0.9, 0.6, 0.75)
	const c2 = color(0.7, 0.1, 0.25)
	expect(c1.sub(c2)).toBeShallowCloseTo(color(0.2, 0.5, 0.5))
})

test('multiplying a color by a scalar', () => {
	const c = color(0.2, 0.3, 0.4)
	expect(c.mul(2)).toStrictEqual(color(0.4, 0.6, 0.8))
})

test('multiplying colors', () => {
	const c1 = color(1, 0.2, 0.4)
	const c2 = color(0.9, 1, 0.1)
	expect(c1.mul(c2)).toBeShallowCloseTo(color(0.9, 0.2, 0.04))
})