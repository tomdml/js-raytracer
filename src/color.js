class Color {

	constructor(r, g, b) {
		this.r = r
		this.g = g
		this.b = b
	}

}

function color(r, g, b) {
	return new Color(r, g, b)
}

module.exports = { color }