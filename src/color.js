class Color {

	constructor(r, g, b) {
		this.r = r
		this.g = g
		this.b = b
	}

	add(other) {
		return new Color(
			this.r + other.r,
			this.g + other.g,
			this.b + other.b,
		)
	}

	sub(other) {
		return new Color(
			this.r - other.r,
			this.g - other.g,
			this.b - other.b,
		)
	}

	mul(other) {
		if (typeof(other) === 'number') {
			return new Color(
				this.r * other,
				this.g * other,
				this.b * other,
			)
		}

	}

}

function color(r, g, b) {
	return new Color(r, g, b)
}

module.exports = { color }