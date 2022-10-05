const { ray } = require('../src/ray')
const { point, vector } = require('../src/tuple')


test('creating and querying a ray', () => {
	const origin = point(1, 2, 3)
	const direction = vector(4, 5, 6)

	const r = ray(origin, direction)

	expect(r.origin).toBe(origin)
	expect(r.direction).toBe(direction)
})