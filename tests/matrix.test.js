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
	const a = tuple(1, 2, 3, 4)
	expect(I.mul(a)).toStrictEqual(a)
})

test('transposing a matrix', () => {
	const A = matrix([
		[0, 9, 3, 0],
		[9, 8, 0, 8],
		[1, 8, 5, 3],
		[0, 0, 5, 8]
	])

	const T = matrix([
		[0, 9, 1, 0],
		[9, 8, 8, 0],
		[3, 0, 5, 5],
		[0, 8, 3, 8]
	])

	expect(A.T.eq(T)).toBe(true)
})

test('transposing the identity matrix', () => {
	expect(I.T.eq(I)).toBe(true)
})

test('calculating the determinant of a 2x2 matrix', () => {
	const A = matrix([[1, 5], [-3, 2]])
	expect(A.determinant).toBe(17)
})

test('a submatrix of a 3x3 matrix is a 2x2 matrix', () => {
	const A = matrix([[1, 5, 0], [-3, 2, 7], [0, 6, -3]])
	expect(A.submatrix(0, 2).eq(matrix([[-3, 2], [0, 6]]))).toBe(true)
})

test('a submatrix of a 4x4 matrix is a 3x3 matrix', () => {
	const A = matrix([
		[-6, 1, 1, 6],
		[-8, 5, 8, 6],
		[-1, 0, 8, 2],
		[-7, 1, -1, 1]
	])

	expect(A.submatrix(2, 1).eq(matrix([[-6, 1, 6], [-8, 8, 6], [-7, -1, 1]]))).toBe(true)
})

test('calculating the minor of a 3x3 matrix', () => {
	const A = matrix([[3, 5, 0], [2, -1, -7], [6, -1, 5]])
	const B = A.submatrix(1, 0)

	expect(B.determinant).toBe(25)
	expect(A.minor(1,0)).toBe(25)
})

test('calculating the cofactor of a 3x3 matrix', () => {
	const A = matrix([[3, 5, 0], [2, -1, -7], [6, -1, 5]])

	expect(A.minor(0, 0)).toBe(-12)
	expect(A.cofactor(0, 0)).toBe(-12)
	expect(A.minor(1, 0)).toBe(25)
	expect(A.cofactor(1, 0)).toBe(-25)
})

test('calculating the determinant of a 3x3 matrix', () => {
	const A = matrix([[1, 2, 6], [-5, 8, -4], [2, 6, 4]])

	expect(A.cofactor(0, 0)).toBe(56)
	expect(A.cofactor(0, 1)).toBe(12)
	expect(A.cofactor(0, 2)).toBe(-46)
	expect(A.determinant).toBe(-196)
})

test('calculating the determinant of a 4x4 matrix', () => {
	const A = matrix([
		[-2, -8, 3, 5],
		[-3, 1, 7, 3],
		[1, 2, -9, 6],
		[-6, 7, 7, -9]
	])

	expect(A.cofactor(0, 0)).toBe(690)
	expect(A.cofactor(0, 1)).toBe(447)
	expect(A.cofactor(0, 2)).toBe(210)
	expect(A.cofactor(0, 3)).toBe(51)
	expect(A.determinant).toBe(-4071)
})

test('testing an invertible matrix for invertibility', () => {
	const A = matrix([
		[6, 4, 4, 4],
		[5, 5, 7, 6],
		[4, -9, 3, -7],
		[9, 1, 7, -6]
	])

	expect(A.determinant).toBe(-2120)
	expect(A.invertible).toBe(true)
})

test('testing an noninvertible matrix for invertibility', () => {
	const A = matrix([
		[-4, 2, -2, -3],
		[9, 6, 2, 6],
		[0, -5, 1, -5],
		[0, 0, 0, 0]
	])

	expect(A.determinant).toBe(0)
	expect(A.invertible).toBe(false)
})

test('calculating the inverse of a matrix', () => {
	const A = matrix([
		[-5, 2, 6, -8],
		[1, -5, 1, 8],
		[7, 7, -6, -7],
		[1, -3, 7, 4]
	])

	const B = A.inverse

	const expected = matrix([
		[0.21805,  0.45113,  0.24060, -0.04511],
		[-0.80827, -1.45677, -0.44361, 0.52068],
		[-0.07895, -0.22368, -0.05263, 0.19737],
		[-0.52256, -0.81391, -0.30075, 0.30639]
	])

	expect(A.determinant).toBe(532)
	expect(A.cofactor(2, 3)).toBe(-160)
	expect(B.get(3, 2)).toBe(-160/532)
	expect(A.cofactor(3, 2)).toBe(105)
	expect(B.get(2, 3)).toBe(105/532)
	expect(B).closeToMatrix(expected)
})

test('calculating the inverse of a second matrix', () => {
	const A = matrix([
		[8, -5, 9, 2],
		[7, 5, 6, 1],
		[-6, 0, 9, 6],
		[-3, 0, -9, -4]
	])

	const expected = matrix([
		[-0.15385, -0.15385, -0.28205, -0.53846],
		[-0.07692, 0.12308, 0.02564, 0.03077],
		[0.35897, 0.35897, 0.43590, 0.92308],
		[-0.69231, -0.69231, -0.76923, -1.92308]
	])

	expect(A.inverse).closeToMatrix(expected)
})

test('calculating the inverse of a third matrix', () => {
	const A = matrix([
		[9, 3, 0, 9],
		[-5, -2, -6, -3],
		[-4, 9, 6, 4],
		[-7, 6, 6, 2]
	])

	const expected = matrix([
		[-0.04074, -0.07778, 0.14444, -0.22222],
		[-0.07778, 0.03333, 0.36667, -0.33333],
		[-0.02901, -0.14630, -0.10926, 0.12963],
		[0.17778, 0.06667, -0.26667, 0.33333],
	])

	expect(A.inverse).closeToMatrix(expected)
})

test('multiplying a product by its inverse', () => {
	const A = matrix([
		[3, -9, 7, 3],
		[3, -8, 2, -9],
		[-4, 4, 4, 1],
		[6, -2, 0, 5]
	])

	const B = matrix([
		[8, 2, 2, 2],
		[3, -1, 7, 0],
		[7, 0, 5, 4],
		[6, -2, 0, 5]
	])

	let C = A.mul(B)

	expect(C.mul(B.inverse)).closeToMatrix(A)
})

