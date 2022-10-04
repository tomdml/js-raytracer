class Tuple {

	constructor(x, y, z, w) {
		this.x = x
		this.y = y
		this.z = z
		this.w = w
	}

	add(other) {
		return new Tuple(
			this.x + other.x,
			this.y + other.y,
			this.z + other.z,
			this.w + other.w,
		)
	}

	sub(other) {
		return new Tuple(
			this.x - other.x,
			this.y - other.y,
			this.z - other.z,
			this.w - other.w,
		)
	}

	neg() {
		return new Tuple(
			-this.x,
			-this.y,
			-this.z,
			-this.w
		)
	}

	mul(scalar) {
		return new Tuple(
			this.x * scalar,
			this.y * scalar,
			this.z * scalar,
			this.w * scalar,
		)
	}

	div(scalar) {
		return new Tuple(
			this.x / scalar,
			this.y / scalar,
			this.z / scalar,
			this.w / scalar,
		)
	}

	abs() {
		// vector operation: w should be zero here
		// does this need to be within a vector class?
		return (this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2) ** 0.5
	}
}

// class Vector extends Tuple {

// 	constructor(x, y, z) {
// 		super(x, y, z, 0)
// 	}

// }

// class Point extends Tuple {

// 	constructor(x, y, z) {
// 		super(x, y, z, 1)
// 	}
// }

function tuple(x, y, z, w) {
	return new Tuple(x, y, z, w)
}

function vector(x, y, z) {
	return tuple(x, y, z, 0)
}

function point(x, y, z) {
	return tuple(x, y, z, 1)
}

module.exports = {tuple, point, vector}