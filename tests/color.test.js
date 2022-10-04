const {color} = require('../src/color')

test('colors are (red, green, blue) tuples', () => {
	const c = color(-0.5, 0.4, 1.7)
	expect(c.r).toBe(-0.5)
	expect(c.g).toBe(0.4)
	expect(c.b).toBe(1.7)
})
