const {Tuple, Point, Vector} = require('../src/Tuple')

test('a Tuple with w=1.0 is a Point', () => {
	const a = new Tuple(4.3, -4.2, 3.1, 1.0)
	expect(a.x).toBe(4.3)
	expect(a.y).toBe(-4.2)
	expect(a.z).toBe(3.1)
	expect(a.w).toBe(1.0)
})

test('a Tuple with w=0.0 is a Vector', () => {
	const a = new Tuple(4.3, -4.2, 3.1, 0.0)
	expect(a.x).toBe(4.3)
	expect(a.y).toBe(-4.2)
	expect(a.z).toBe(3.1)
	expect(a.w).toBe(0.0)
})

test('Point() creates Tuples with w=1', () => {
	const p = new Point(4, -4, 3)
	expect(p).toStrictEqual(new Tuple(4, -4, 3, 1))
})
	
test('Vector() creates Tuples with w=1', () => {
	const p = new Vector(4, -4, 3)
	expect(p).toStrictEqual(new Tuple(4, -4, 3, 0))
})
	
test('adding two Tuples', () => {
	const a1 = new Tuple(3, -2, 5, 1)
	const a2 = new Tuple(-2, 3, 1, 0)
	expect(a1.add(a2)).toStrictEqual(new Tuple(1, 1, 6, 1))
})

test('subtracting two Points', () => {
	const p1 = new Point(3, 2, 1)
	const p2 = new Point(5, 6, 7)
	expect(p1.sub(p2)).toStrictEqual(new Vector(-2, -4, -6))
})

test('subtracting a Vector from a Point', () => {
	const p = new Point(3, 2, 1)
	const v = new Vector(5, 6, 7)
	expect(p.sub(v)).toStrictEqual(new Point(-2, -4, -6))
})

test('subtracting two Vectors', () => {
	const v1 = new Vector(3, 2, 1)
	const v2 = new Vector(5, 6, 7)
	expect(v1.sub(v2)).toStrictEqual(new Vector(-2, -4, -6))
})

test('negating a Tuple', () => {
	const a = new Tuple(1, -2, 3, -4)
	expect(a.neg()).toStrictEqual(new Tuple(-1, 2, -3, 4))
})
