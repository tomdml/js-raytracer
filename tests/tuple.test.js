const {tuple, point, vector} = require('../src/tuple')

test('a tuple with w=1.0 is a point', () => {
	const a = tuple(4.3, -4.2, 3.1, 1.0)
	expect(a.x).toBe(4.3)
	expect(a.y).toBe(-4.2)
	expect(a.z).toBe(3.1)
	expect(a.w).toBe(1.0)
})

test('a tuple with w=0.0 is a vector', () => {
	const a = tuple(4.3, -4.2, 3.1, 0.0)
	expect(a.x).toBe(4.3)
	expect(a.y).toBe(-4.2)
	expect(a.z).toBe(3.1)
	expect(a.w).toBe(0.0)
})

test('point() creates tuples with w=1', () => {
	const p = point(4, -4, 3)
	expect(p).toStrictEqual(tuple(4, -4, 3, 1))
})
	
test('vector() creates tuples with w=1', () => {
	const p = vector(4, -4, 3)
	expect(p).toStrictEqual(tuple(4, -4, 3, 0))
})
	
test('adding two tuples', () => {
	const a1 = tuple(3, -2, 5, 1)
	const a2 = tuple(-2, 3, 1, 0)
	expect(a1.add(a2)).toStrictEqual(tuple(1, 1, 6, 1))
})

test('subtracting two points', () => {
	const p1 = point(3, 2, 1)
	const p2 = point(5, 6, 7)
	expect(p1.sub(p2)).toStrictEqual(vector(-2, -4, -6))
})

test('subtracting a vector from a point', () => {
	const p = point(3, 2, 1)
	const v = vector(5, 6, 7)
	expect(p.sub(v)).toStrictEqual(point(-2, -4, -6))
})

test('subtracting two vectors', () => {
	const v1 = vector(3, 2, 1)
	const v2 = vector(5, 6, 7)
	expect(v1.sub(v2)).toStrictEqual(vector(-2, -4, -6))
})

test('negating a tuple', () => {
	const a = tuple(1, -2, 3, -4)
	expect(a.neg()).toStrictEqual(tuple(-1, 2, -3, 4))
})

test('multiplying a tuple by a scalar', () => {
	const a = tuple(1, -2, 3, -4)
	expect(a.mul(3.5)).toStrictEqual(tuple(3.5, -7, 10.5, -14))
})

test('multiplying a tuple by a fraction', () => {
	const a = tuple(1, -2, 3, -4)
	expect(a.mul(0.5)).toStrictEqual(tuple(0.5, -1, 1.5, -2))
})

test('dividing a tuple by a scalar', () => {
	const a = tuple(1, -2, 3, -4)
	expect(a.div(2)).toStrictEqual(tuple(0.5, -1, 1.5, -2))
})

test('computing the magnitude of a vector(1, 0, 0)', () => {
	const v = vector(1, 0, 0)
	expect(v.abs()).toBe(1)
})

test('computing the magnitude of a vector(0, 1, 0)', () => {
	const v = vector(0, 1, 0)
	expect(v.abs()).toBe(1)
})

test('computing the magnitude of a vector(0, 0, 1)', () => {
	const v = vector(0, 0, 1)
	expect(v.abs()).toBe(1)
})

test('computing the magnitude of a vector(1, 2, 3)', () => {
	const v = vector(1, 2, 3)
	expect(v.abs()).toBe(14 ** 0.5)
})

test('computing the magnitude of a vector(-1, -2, -3)', () => {
	const v = vector(-1, -2, -3)
	expect(v.abs()).toBe(14 ** 0.5)
})

test('normalising vector(4, 0, 0) gives (1, 0, 0)', () => {
	const v = vector(4, 0, 0)
	expect(v.norm()).toStrictEqual(vector(1, 0, 0))
})

test('normalising vector(1, 2, 3)', () => {
	const v = vector(1, 2, 3)
	expect(v.norm()).toStrictEqual(vector(1/(14**0.5), 2/(14**0.5), 3/(14**0.5)))
})