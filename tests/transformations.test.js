const { Matrix, I, matrix } = require('../src/matrix')
const { point, vector } = require('../src/tuple')

test('multiplying by a translation matrix', () => {
	const transform = Matrix.translation(5, -3, 2)
	const p = point(-3, 4, 5)

	expect(transform.mul(p)).toStrictEqual(point(2, 1, 7))
})

test('multiplying by the inverse of a translation matrix', () => {
	const transform = Matrix.translation(5, -3, 2)
	const p = point(-3, 4, 5)

	expect(transform.inverse.mul(p)).toStrictEqual(point(-8, 7, 3))
})

test('translation does not affect vectors', () => {
	const transform = Matrix.translation(5, -3, 2)
	const v = vector(-3, 4, 5)

	expect(transform.mul(v)).toStrictEqual(v)
})

test('a scaling matrix applied to a point', () => {
	const transform = Matrix.scaling(2, 3, 4)
	const p = point(-4, 6, 8)

	expect(transform.mul(p)).toStrictEqual(point(-8, 18, 32))
})

test('a scaling matrix applied to a vector', () => {
	const transform = Matrix.scaling(2, 3, 4)
	const v = vector(-4, 6, 8)

	expect(transform.mul(v)).toStrictEqual(vector(-8, 18, 32))
})


test('a scaling matrix applied to a vector', () => {
	const transform = Matrix.scaling(2, 3, 4)
	const inv = transform.inverse
	const v = vector(-4, 6, 8)

	expect(inv.mul(v)).toStrictEqual(vector(-2, 2, 2))
})

test('reflection is scaling by a negative value', () => {
	const transform = Matrix.scaling(-1, 1, 1)
	const p = point(2, 3, 4)

	expect(transform.mul(p)).toStrictEqual(point(-2, 3, 4))
})