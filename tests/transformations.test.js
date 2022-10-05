const { Matrix, I, matrix } = require('../src/matrix')
const { point, vector } = require('../src/tuple')

const root2 = 2 ** 0.5

test('multiplying by a translation matrix', () => {
	const transform = I.translation(5, -3, 2)
	const p = point(-3, 4, 5)

	expect(transform.mul(p)).toStrictEqual(point(2, 1, 7))
})

test('multiplying by the inverse of a translation matrix', () => {
	const transform = I.translation(5, -3, 2)
	const p = point(-3, 4, 5)

	expect(transform.inverse.mul(p)).toStrictEqual(point(-8, 7, 3))
})

test('translation does not affect vectors', () => {
	const transform = I.translation(5, -3, 2)
	const v = vector(-3, 4, 5)

	expect(transform.mul(v)).toStrictEqual(v)
})

test('a scaling matrix applied to a point', () => {
	const transform = I.scaling(2, 3, 4)
	const p = point(-4, 6, 8)

	expect(transform.mul(p)).toStrictEqual(point(-8, 18, 32))
})

test('a scaling matrix applied to a vector', () => {
	const transform = I.scaling(2, 3, 4)
	const v = vector(-4, 6, 8)

	expect(transform.mul(v)).toStrictEqual(vector(-8, 18, 32))
})


test('a scaling matrix applied to a vector', () => {
	const transform = I.scaling(2, 3, 4)
	const inv = transform.inverse
	const v = vector(-4, 6, 8)

	expect(inv.mul(v)).toStrictEqual(vector(-2, 2, 2))
})

test('reflection is scaling by a negative value', () => {
	const transform = I.scaling(-1, 1, 1)
	const p = point(2, 3, 4)

	expect(transform.mul(p)).toStrictEqual(point(-2, 3, 4))
})

test('rotating a point around the x axis', () => {
	const p = point(0, 1, 0)
	const half_quarter = I.rotation_x(Math.PI / 4)
	const full_quarter= I.rotation_x(Math.PI / 2)

	expect(half_quarter.mul(p)).toBeShallowCloseTo(point(0, root2/2, root2/2))
	expect(full_quarter.mul(p)).toBeShallowCloseTo(point(0, 0, 1))
})

test('the inverse of an x-rotation rotates in the opposite direction', () => {
	const p = point(0, 1, 0)
	const half_quarter = I.rotation_x(Math.PI / 4)
	const inv = half_quarter.inverse

	expect(inv.mul(p)).toBeShallowCloseTo(point(0, root2/2, -root2/2))
})

test('rotating a point around the y axis', () => {
	const p = point(0, 0, 1)
	const half_quarter = I.rotation_y(Math.PI / 4)
	const full_quarter= I.rotation_y(Math.PI / 2)

	expect(half_quarter.mul(p)).toBeShallowCloseTo(point(root2/2, 0, root2/2))
	expect(full_quarter.mul(p)).toBeShallowCloseTo(point(1, 0, 0))
})

test('rotating a point around the z axis', () => {
	const p = point(0, 1, 0)
	const half_quarter = I.rotation_z(Math.PI / 4)
	const full_quarter= I.rotation_z(Math.PI / 2)

	expect(half_quarter.mul(p)).toBeShallowCloseTo(point(-root2/2, root2/2, 0))
	expect(full_quarter.mul(p)).toBeShallowCloseTo(point(-1, 0, 0))
})

test('a shearing transformation moves x in proportion to y', () => {
	const transform = I.shearing(1, 0, 0, 0, 0, 0)
	const p = point(2, 3, 4)

	expect(transform.mul(p)).toStrictEqual(point(5, 3, 4))
})

test('a shearing transformation moves x in proportion to z', () => {
	const transform = I.shearing(0, 1, 0, 0, 0, 0)
	const p = point(2, 3, 4)

	expect(transform.mul(p)).toStrictEqual(point(6, 3, 4))
})

test('a shearing transformation moves y in proportion to x', () => {
	const transform = I.shearing(0, 0, 1, 0, 0, 0)
	const p = point(2, 3, 4)

	expect(transform.mul(p)).toStrictEqual(point(2, 5, 4))
})

test('a shearing transformation moves y in proportion to z', () => {
	const transform = I.shearing(0, 0, 0, 1, 0, 0)
	const p = point(2, 3, 4)

	expect(transform.mul(p)).toStrictEqual(point(2, 7, 4))
})

test('a shearing transformation moves z in proportion to x', () => {
	const transform = I.shearing(0, 0, 0, 0, 1, 0)
	const p = point(2, 3, 4)

	expect(transform.mul(p)).toStrictEqual(point(2, 3, 6))
})

test('a shearing transformation moves z in proportion to y', () => {
	const transform = I.shearing(0, 0, 0, 0, 0, 1)
	const p = point(2, 3, 4)

	expect(transform.mul(p)).toStrictEqual(point(2, 3, 7))
})

test('individual transformations are applied in sequence', () => {
	const p = point(1, 0, 1)
	const A = I.rotation_x(Math.PI/2)
	const B = I.scaling(5, 5, 5)
	const C = I.translation(10, 5, 7)

	let p2 = A.mul(p)
	expect(p2).toBeShallowCloseTo(point(1, -1, 0))

	let p3 = B.mul(p2)
	expect(p3).toBeShallowCloseTo(point(5, -5, 0))

	let p4 = C.mul(p3)
	expect(p4).toBeShallowCloseTo(point(15, 0, 7))
})


test('chained transformations must be applied in reverse order', () => {
	const p = point(1, 0, 1)

	const T = I.rotation_x(Math.PI/2).scaling(5, 5, 5).translation(10, 5, 7)

	expect(T.mul(p)).toBeShallowCloseTo(point(15, 0, 7))
})

