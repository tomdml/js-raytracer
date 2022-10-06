const { color } = require('./color')

class Canvas {
  constructor (width, height) {
    this.width = width
    this.height = height

    this.grid = [...Array(height)].map(
      () => [...Array(width)].map(() => color(0, 0, 0)))
  }

  write_pixel (x, y, pixel) {
    this.grid[y][x] = pixel
  }

  pixel_at (x, y) {
    return this.grid[y][x]
  }

  get _ppm_header () {
    return `P3
${this.width} ${this.height}
255`
  }

  _ppm_body () {
    const make_integer = (value) => Math.ceil(Math.min(Math.max(0, value), 1) * 255)

    const pixel_to_ppm = (pixel) =>
			`${make_integer(pixel.r)} ${make_integer(pixel.g)} ${make_integer(pixel.b)}`

    return this.grid.map(row =>
      row.map(pixel => pixel_to_ppm(pixel)).join(' ')
    ).join('\n')
  }

  to_ppm () {
    return this._ppm_header + '\n' + this._ppm_body() + '\n'
  }
}

module.exports = { Canvas }
