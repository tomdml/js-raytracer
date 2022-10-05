const { tuple } = require('./tuple')

class Matrix {

	constructor(arg) {
		if (arg === 4) this.data = [[,,,],[,,,],[,,,],[,,,]]
		else this.data = [...arg]
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


module.exports = { matrix, I }