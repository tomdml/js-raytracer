const { ray } = require('../src/ray')
const { point, vector } = require('../src/tuple')
const { sphere } = require('../src/sphere')
const { I } = require('../src/matrix')

const root3over3 = (3 ** 0.5) / 3

test('a ray intersects a sphere at two points', () => {
	const r = ray(point(0, 0, -5), vector(0, 0, 1))
	const s = sphere()

	const xs = s.intersect(r)

	expect(xs.length).toBe(2)
	expect(xs.at(0).t).toBe(4.0)
	expect(xs.at(1).t).toBe(6.0)
})

test('a ray intersects a sphere at a tangent', () => {
	const r = ray(point(0, 1, -5), vector(0, 0, 1))
	const s = sphere()

	const xs = s.intersect(r)

	expect(xs.length).toBe(2)
	expect(xs.at(0).t).toBe(5.0)
	expect(xs.at(1).t).toBe(5.0)
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
	expect(xs.at(0).t).toBe(-1.0)
	expect(xs.at(1).t).toBe(1.0)

})


test('a sphere is behind a ray', () => {
	const r = ray(point(0, 0, 5), vector(0, 0, 1))
	const s = sphere()

	const xs = s.intersect(r)

	expect(xs.length).toBe(2)
	expect(xs.at(0).t).toBe(-6.0)
	expect(xs.at(1).t).toBe(-4.0)

})

test('intersect sets the object on the intersection', () => {
	const r = ray(point(0, 0, -5), vector(0, 0, 1))
	const s = sphere()

	const xs = s.intersect(r)

	expect(xs.length).toBe(2)
	expect(xs.at(1).object).toBe(s)
	expect(xs.at(0).object).toBe(s)
})

test('a spheres default transformation', () => {
	const s = sphere()
	expect(s.transform).toBe(I)
})

test('changing a spheres transformation', () => {
	const s = sphere()
	const t = I.translation(2, 3, 4)
	s.transform = t

	expect(s.transform).toBe(t)
})

test('intersecting a scaled sphere with a ray', () => {
	const r = ray(point(0, 0, -5), vector(0, 0, 1))
	const s = sphere()

	s.transform = I.scaling(2, 2, 2)
	const xs = s.intersect(r)

	expect(xs.length).toBe(2)
	expect(xs.at(0).t).toBe(3)
	expect(xs.at(1).t).toBe(7)
})

test('intersecting a translated sphere with a ray', () => {
	const r = ray(point(0, 0, -5), vector(0, 0, 1))
	const s = sphere()

	s.transform = I.translation(5, 0, 0)
	const xs = s.intersect(r)

	expect(xs.length).toBe(0)
})

test('the normal on a sphere at a point on the x axis', () => {
	const s = sphere()
	const n = s.normal_at(point(1, 0, 0))

	expect(n).toStrictEqual(vector(1, 0, 0))
})

test('the normal on a sphere at a point on the y axis', () => {
	const s = sphere()
	const n = s.normal_at(point(0, 1, 0))

	expect(n).toStrictEqual(vector(0, 1, 0))
})

test('the normal on a sphere at a point on the z axis', () => {
	const s = sphere()
	const n = s.normal_at(point(0, 0, 1))

	expect(n).toStrictEqual(vector(0, 0, 1))
})

test('the normal on a sphere at a nonaxial point', () => {

	const s = sphere()
	const n = s.normal_at(point(root3over3, root3over3, root3over3))

	expect(n).toStrictEqual(vector(root3over3, root3over3, root3over3))
})

test('the normal is a normalised vector', () => {
	const s = sphere() 
	const n = s.normal_at(point(root3over3, root3over3, root3over3))
	expect(n).toStrictEqual(n.norm)
})