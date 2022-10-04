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
	