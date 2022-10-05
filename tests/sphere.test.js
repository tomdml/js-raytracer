const { ray } = require('../src/ray')
const { point, vector } = require('../src/tuple')
const { sphere } = require('../src/sphere')


test('a ray intersects a sphere at two points', () => {
	const r = ray(point(0, 0, -5), vector(0, 0, 1))
	const s = sphere()

	const xs = s.intersect(r)

	expect(xs.length).toBe(2)
	expect(xs.at(0)).toBe(4.0)
	expect(xs.at(1)).toBe(6.0)
})

test('a ray intersects a sphere at a tangent', () => {
	const r = ray(point(0, 1, -5), vector(0, 0, 1))
	const s = sphere()

	const xs = s.intersect(r)

	expect(xs.length).toBe(2)
	expect(xs.at(0)).toBe(5.0)
	expect(xs.at(1)).toBe(5.0)
})

test('a ray misses a sphere', () => {
	const r = ray(point(0, 2, -5), vector(0, 0, 1))
	const s = sphere()

	const xs = s.intersect(r)

	expect(xs.length).toBe(0)

})

test('a ray originates inside a sphere', () => {
	const r = ray(point(0, 0, 0), vector(0, 0, 1))
	const s = sphere()

	const xs = s.intersect(r)

	expect(xs.length).toBe(2)
	expect(xs.at(0)).toBe(-1.0)
	expect(xs.at(1)).toBe(1.0)

})


test('a sphere is behind a ray', () => {
	const r = ray(point(0, 0, 5), vector(0, 0, 1))
	const s = sphere()

	const xs = s.intersect(r)

	expect(xs.length).toBe(2)
	expect(xs.at(0)).toBe(-6.0)
	expect(xs.at(1)).toBe(-4.0)

})
