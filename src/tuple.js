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
			-this.w,
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

	get abs() {
		// vector operation: w should be zero here
		return (
			this.x ** 2 + 
			this.y ** 2 + 
			this.z ** 2 + 
			this.w ** 2
		) ** 0.5
	}

	get norm() {
		// vector operation: w should be zero here
		let magnitude = this.abs
		return new Tuple(
			this.x / magnitude,
			this.y / magnitude,
			this.z / magnitude,
			this.w / magnitude,
		)
	}

	dot(other) {
		// vector operation: w should be zero here
		return this.x * other.x +
			   this.y * other.y +
			   this.z * other.z +
			   this.w * other.w
	}

	cross(other) {
		// vector operation: w should be zero here so we're only implementing 3d cross
		return new Tuple(
			this.y * other.z - this.z * other.y,
			this.z * other.x - this.x * other.z,
			this.x * other.y - this.y * other.x,
			0
		)
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