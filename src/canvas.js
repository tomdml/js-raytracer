const { color } = require('./color')


class Canvas {

	constructor(width, height) {
		this.width = width
		this.height = height

		this.grid = Array.from({ length: height}, () => 
			Array.from({ length: width}), () => color(0, 0, 0)
		)
	}

	write_pixel(x, y, pixel) {
		this.grid[y][x] = pixel
	}

	pixel_at(x, y) {
		return this.grid[y][x]
	}

}


module.exports = { Canvas }