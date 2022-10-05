const { tuple } = require('./tuple')

class Matrix {

	constructor(arg) {
		if (arg === 4) this.data = [[,,,],[,,,],[,,,],[,,,]]
		else this.data = [...arg]
	}

	static translation(x, y, z) {
		return new Matrix([
			[1, 0, 0, x],
			[0, 1, 0, y],
			[0, 0, 1, z],
			[0, 0, 0, 1]
		])
	}

	static scaling(x, y, z) {
		return new Matrix([
			[x, 0, 0, 0],
			[0, y, 0, 0],
			[0, 0, z, 0],
			[0, 0, 0, 1]
		])
	}

	static rotation_x(r) {
		return new Matrix([
			[1, 0,           0,            0],
			[0, Math.cos(r), -Math.sin(r), 0],
			[0, Math.sin(r), Math.cos(r),  0],
			[0, 0,           0,            1]
		])
	}

	static rotation_y(r) {
		return new Matrix([
			[Math.cos(r),  0, Math.sin(r), 0],
			[0,            1, 0,           0],
			[-Math.sin(r), 0, Math.cos(r), 0],
			[0,            0, 0,           1]
		])
	}



	get(y, x) {
		return this.data[y][x]
	}

	set(y, x, data) {
		this.data[y][x] = data
	}

	eq(other) {
		// some optimisations to be made here (short circuiting on a False)
		let result = true
		this.data.forEach((row, y) => 
			row.forEach((item, x) => {
				if (item != other.get(y, x)) result = false
			})
		)

		return result
	}

	mul(other) {
		let A = this

		if (other.constructor.name == 'Tuple') {  // handle 4x1
			let b = other

			let result = tuple(...[0, 1, 2, 3].map(row =>
				A.get(row,0) * b.x + A.get(row, 1) * b.y + A.get(row, 2) * b.z + A.get(row, 3) * b.w
			))

			return result

		} else { // handle 4x4
			let B = other
			let result = new Matrix(4)

			this.data.forEach((row, y) => 
				row.forEach((_, x) => {
					let r = A.get(y, 0) * B.get(0, x) +
							A.get(y, 1) * B.get(1, x) +
							A.get(y, 2) * B.get(2, x) +
							A.get(y, 3) * B.get(3, x)

					result.set(y, x, r)
				})
			)

			return result
		}
	}

	get T() {
		let arr = this.data
		return new Matrix(
			arr[0].map((_, idx) => arr.map(row => row[idx]))
		)
	}

	get determinant() {
		if (this.data.length == 2) {
			// for [[a, b], [c, d]], determinant = ad - bc
			return this.get(0, 0) * this.get(1, 1) - this.get(0, 1) * this.get(1, 0)
		}

		let det = 0

		this.data[0].forEach((_, idx) => {
			det += this.get(0, idx) * this.cofactor(0, idx)
		})

		return det
	}

	submatrix(row, col) {
		return new Matrix(
			// drop the given row and col
			this.data
				.filter((_row, idx) => idx != row)
				.map(_row => _row.filter((_col, idx) => idx != col))
		)
	}

	minor(row, col) {
		return this.submatrix(row, col).determinant
	}

	cofactor(row, col) {
		return (row + col) % 2 ? -this.minor(row, col) : this.minor(row, col)
	}

	get invertible() {
		return this.determinant != 0
	}

	get inverse() {
		if (!this.invertible) throw new Error('Matrix is not invertible!')

		let result = new Matrix(4)
		let determinant = this.determinant

		this.data.forEach((row, row_idx) => 
			row.forEach((_, col_idx) => 
				result.set(col_idx, row_idx, this.cofactor(row_idx, col_idx) / determinant)
			)
		)

		return result
	}


}

function matrix(arr) {
	return new Matrix(arr)
}

const I = new Matrix([
	[1, 0, 0, 0], 
	[0, 1, 0, 0], 
	[0, 0, 1, 0], 
	[0, 0, 0, 1]]
)


module.exports = { Matrix, matrix, I }