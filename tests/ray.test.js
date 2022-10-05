const { ray } = require('../src/ray')
const { point, vector } = require('../src/tuple')


test('creating and querying a ray', () => {
	const origin = point(1, 2, 3)
	const direction = vector(4, 5, 6)

	const r = ray(origin, direction)

	expect(r.origin).toBe(origin)
	expect(r.direction).toBe(direction)
})

test('computing a point from a distance', () => {
	const r = ray(point(2, 3, 4), vector(1, 0, 0))

	expect(r.position(0)).toStrictEqual(point(2, 3, 4))
	expect(r.position(1)).toStrictEqual(point(3, 3, 4))
	expect(r.position(-1)).toStrictEqual(point(1, 3, 4))
	expect(r.position(2.5)).toStrictEqual(point(4.5, 3, 4))

})