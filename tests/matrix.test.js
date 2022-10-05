const { matrix, I } = require('../src/matrix')
const { tuple } = require('../src/tuple')

test('constructing and inspecting a 4x4 matrix', () => {
	const M = matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 7.5, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 16.5]
	])
	expect(M.get(0, 0)).toBe(1)
	expect(M.get(0, 3)).toBe(4)
	expect(M.get(1, 0)).toBe(5.5)
	expect(M.get(1, 2)).toBe(7.5)
	expect(M.get(2, 2)).toBe(11)
	expect(M.get(3, 0)).toBe(13.5)
	expect(M.get(3, 2)).toBe(15.5)
})

test('a 2x2 matrix ought to be representable', () => {
	const M = matrix([[-3, 5], [1, -2]])
	expect(M.get(0, 0)).toBe(-3)
	expect(M.get(0, 1)).toBe(5)
	expect(M.get(1, 0)).toBe(1)
	expect(M.get(1, 1)).toBe(-2)
})

test('a 3x3 matrix ought to be representable', () => {
	const M = matrix([[-3, 5, 0], [1, -2, 7], [0, 1, 1]])
	expect(M.get(0, 0)).toBe(-3)
	expect(M.get(1, 1)).toBe(-2)
	expect(M.get(2, 2)).toBe(1)
})

test('matrix equality with identical matrices', () => {
	const M1 = matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 7.5, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 16.5]
	])
	const M2 = matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 7.5, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 16.5]
	])
	expect(M1.eq(M2)).toBe(true)
})

test('matrix equality with non-identical matrices', () => {
	const M1 = matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 7.5, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 16.5]
	])
	const M2 = matrix([
		[1, 2, 3, 4],
		[5.5, 6.5, 75, 8.5],
		[9, 10, 11, 12],
		[13.5, 14.5, 15.5, 16.5]
	])
	expect(M1.eq(M2)).toBe(false)
})

test('multiplying two matrices', () => {
	const A = matrix([
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 8, 7, 6],
		[5, 4, 3, 2]
	])
	const B = matrix([
		[-2, 1, 2, 3],
		[3, 2, 1, -1],
		[4, 3, 6, 5],
		[1, 2, 7, 8]
	])
	const M = matrix([
		[20, 22, 50, 48],
		[44, 54, 114, 108],
		[40, 58, 110, 102],
		[16, 26, 46, 42]
	])
	expect(A.mul(B)).toStrictEqual(M)
})

test('a matrix multiplied by a tuple', () => {
	const M = matrix([[1, 2, 3, 4], [2, 4, 4, 2], [8, 6, 4, 1], [0, 0, 0, 1]])
	const t = tuple(1, 2, 3, 1)
	expect(M.mul(t)).toStrictEqual(tuple(18, 24, 33, 1))
})

test('multiplying a matrix by the identity matrix', () => {
	const A = matrix([
		[0, 1, 2, 4], 
		[1, 2, 4, 8], 
		[2, 4, 8, 16], 
		[4, 8, 16, 32]
	])
	expect(A.mul(I).eq(A)).toBe(true)
})

test('multiplying the identity matrix by a tuple', () => {
	let a = tuple(1, 2, 3, 4)
	expect(I.mul(a)).toStrictEqual(a)
})