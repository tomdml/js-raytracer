const { matrix, I } = require('./src/matrix')

const A = matrix([
	[8, -5, 9, 2],
	[7, 5, 6, 1],
	[-6, 0, 9, 6],
	[-3, 0, -9, -4]
])

console.log(A.T.inverse)
console.log(A.inverse.T)